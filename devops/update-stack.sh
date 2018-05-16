#!/bin/bash
set -euo pipefail
working_dir="$(dirname "$0")"
cd "$working_dir"

# Load config
source "$working_dir/stack-info.sh"

# Default Values
ENV=""
STACK_PARAMS=""
MODE_SYNC=true
MODE_DEBUG=false

# Overriddable Stack Params
STACK_PARAM_EC2_KEY_PAIR_NAME="UsePreviousValue=true"
STACK_PARAM_ENV_MODE="UsePreviousValue=true"
STACK_PARAM_ECR_VERSION="UsePreviousValue=true"
STACK_DB_PASSWD="UsePreviousValue=true"

function help() {
    echo "SHOW HELP..."
    exit 0
}

# Show help if no params were given
CHKP=${1:-} ; [ -z ${CHKP} ] && help

# Compose local properties with flag options
while [ "$#" -ne 0 ] ; do
    case "$1" in
        dev|stage|prod)
            ENV="$1"
            shift
            ;;
        -h|--help)
            help
            shift
            ;;
        --ec2-key)
            STACK_PARAM_EC2_KEY_PAIR_NAME="ParameterValue=${2}"
            shift 2
            ;;
        --mode) # boot | init | up
            STACK_PARAM_ENV_MODE="ParameterValue=${2}"
            shift 2
            ;;
        # --ecr-version)
        #     STACK_PARAM_ECR_VERSION="ParameterValue=${2}"
        #     shift 2
        #     ;;
        --no-sync)
            MODE_SYNC=false
            shift
            ;;
        --debug)
            MODE_SYNC=false
            MODE_DEBUG=true
            shift
            ;;
        *)
            help
            shift
            ;;
    esac
done

# Make sure we have an ENVIRONMENT after parsing all
[ -z ${ENV} ] && help

BUCKET_URL="https://s3-${AWS_BUCKET_REGION}.amazonaws.com/${AWS_BUCKET_NAME}/${STACK_NAME}/${ENV}"

# STACK_PARAMS="${STACK_PARAMS} ParameterKey=EnvironmentType,ParameterValue=${ENV}"
STACK_PARAMS="${STACK_PARAMS} ParameterKey=S3TemplateRoot,ParameterValue=${BUCKET_URL}"
STACK_PARAMS="${STACK_PARAMS} ParameterKey=EnvironmentMode,${STACK_PARAM_ENV_MODE}"
STACK_PARAMS="${STACK_PARAMS} ParameterKey=EC2KeyPairName,${STACK_PARAM_EC2_KEY_PAIR_NAME}"
# STACK_PARAMS="${STACK_PARAMS} ParameterKey=ECRVersion,${STACK_PARAM_ECR_VERSION}"
STACK_PARAMS="${STACK_PARAMS} ParameterKey=EnvironmentType,UsePreviousValue=true"

CMD="aws"
CMD="${CMD} --region=${STACK_REGION}"
CMD="${CMD} --profile=${AWS_CLI_PROFILE}"
CMD="${CMD} cloudformation update-stack"
CMD="${CMD} --stack-name "${STACK_NAME}-${ENV}""
CMD="${CMD} --template-url "${BUCKET_URL}/master.yaml""
CMD="${CMD} --parameters ${STACK_PARAMS}"
CMD="${CMD} --capabilities  ${STACK_CAPABILITIES}"

# Sync templates
printf "[$(date '+%FT%T%z')] %s\n" "Starting update stack for $ENV environment"
if [ $MODE_SYNC = true ] ; then
    printf "[$(date '+%FT%T%z')] %s\n" "Syncing templates to S3 bucket"
    "${working_dir}/sync-templates.sh" $ENV
else
    printf "[$(date '+%FT%T%z')] %s\n" "--nosync used, skipping S3 sync"
fi

# Execute AWS Statement
if [ $MODE_DEBUG = true ] ; then
    echo "--debug used, showing generated aws statement:"
    echo ""
    echo $CMD
else
    printf "[$(date '+%FT%T%z')] %s\n" "Initiating stack update for the ${STACK_NAME} [${ENV}] stack"
    $CMD
fi
