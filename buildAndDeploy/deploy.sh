#!/usr/bin/env bash

set -e
tagName=$1

cfn-create-or-update \
  --stack-name cricket-scorer-ui-${tagName} \
  --template-body file://buildAndDeploy/cricket-scorer-ui.yml \
  --parameters ParameterKey=tagName,ParameterValue=${tagName} \
  --wait

aws s3 sync build s3://cricket-scorer-ui-${tagName} --delete