#!/bin/bash
set -euo pipefail
working_dir="$(dirname "$0")"
cd "$working_dir"

# Load config
source "$working_dir/stack-info.sh"

function usage() {
    echo ""
    echo "Synchronize CloudFormation templates to S3 Buckets for use with stack creation and updates"
    echo ""
    echo "Usage:"
    echo "  $0 <dev|stg|prd> [--help|-h] [--list|-l] [--dryrun|-d] [--quiet|-q]"
    echo ""
    echo "Options:"
    echo "  --help|-h     Show usage (this text)"
    echo "  --list|-l     List configured buckets"
    echo "  --dryrun|-d   Dry run (do not actually upload anything)"
    echo "  --quiet|-q    Show output on errors only"
    echo ""
    exit 0
}
# Make sure we have at least one parameter
PARAM=${1:-} ; [ -z ${PARAM} ] && usage

declare ENVIRONMENT
declare OPTIONS
while [ "$#" -ne 0 ] ; do
    case "$1" in
        -h|--help)
            usage
            ;;
        -l|--list)
            for env in dev stg prd ; do
                echo "s3://${AWS_BUCKET_NAME}/${STACK_NAME}/${env}"
            done
            exit 0
            ;;
        -d|--dryrun)
            OPTIONS="${OPTIONS} --dryrun"
            shift
            ;;
        -q|--quiet)
            OPTIONS="${OPTIONS} --only-show-errors"
            shift
            ;;
        dev|stage|prod)
            ENVIRONMENT="$1"
            shift
            ;;
        *)
            usage
            ;;
    esac
done

BUCKET="s3://${AWS_BUCKET_NAME}/${STACK_NAME}/${ENVIRONMENT}"

# Fetches and syncs YAML templates from ./src
(cd src && aws --profile=${AWS_CLI_PROFILE} s3 sync ${OPTIONS} --exclude "*" --include "*.yaml" ./ "${BUCKET}")
