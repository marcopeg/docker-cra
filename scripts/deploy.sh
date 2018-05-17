#
# This is a `humble-cli` script
# ------------------------------------------------------
# All the configuration info can be placed into the
# `.env` or `.env.local` file in the project's root
# ------------------------------------------------------
#
# Perform ECR Login
# $ humble deploy --login
# 
# Deploy a single service:
# $ humble deploy -l --env shared -v 1.2.3 --service wordpress
#
# Deploy the entire project:
# $ humble deploy -l --env shared --version 1.2.3 --all
#
# Setup humble here:
# https://github.com/marcopeg/humble-cli
#

#!/bin/bash
set -euo pipefail

HARCODED_VERSION=$(cat ./version.txt)
# HARCODED_VERSION="latest"

# Configuration
AWS_PROFILE=${AWS_PROFILE:-default}
AWS_REGION=${AWS_REGION:-eu-west-1}
AWS_ACCOUNT=${AWS_ACCOUNT:-xxx}
AWS_ECR_VERSION=${AWS_ECR_VERSION:-${HARCODED_VERSION}}
STACK_NAME=${STACK_NAME:-${PWD##*/}}
STACK_ENV=${STACK_ENV:-dev}

function help() {
    echo "SHOW HELP..."
    exit 0
}

function deployService() {
    (cd ./services/${1} && make publish name=${STACK_NAME}-${STACK_ENV}/${1} version=${AWS_ECR_VERSION} registry=${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com)
}

# Compose local properties with flag options
while [ "$#" -ne 0 ] ; do
    case "$1" in
        deploy)
            shift
            ;;
        -l|--login)
            $(aws --profile=${AWS_PROFILE} --region=${AWS_REGION} --no-include-email  ecr get-login)
            shift
            ;;
        dev|stage|prod)
            STACK_ENV=${1}
            shift
            ;;
        -e|--env)
            STACK_ENV=${2}
            shift
            shift
            ;;
        -v|--version)
            AWS_ECR_VERSION=${2}
            shift
            shift
            ;;
        -s|--service)
            echo ">> Deploy Service - ${STACK_NAME}-${STACK_ENV}/${2}?"
            echo "(v: ${AWS_ECR_VERSION})"
            enterToContinue
            deployService ${2}
            exit 0
            shift
            shift
            ;;
        -a|--all)
            echo ">> Deploy all services?"
            echo "(v${AWS_ECR_VERSION})"
            enterToContinue
            deployService "proxy"
            deployService "webapp"
            exit 0
            shift
            ;;
        -h|--help)
            help
            shift
            ;;
        *)
            help
            shift
            ;;
    esac
done
