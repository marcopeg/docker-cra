all: run

# This makefile contains some convenience commands for deploying and publishing.

# For example, to build and run the docker container locally, just run:
# $ make

# or to publish the :latest version to the specified registry as :1.0.0, run:
# $ make publish version=1.0.0

# you probably need to make a login session to ECR:
# $ $(aws --profile=aws-profile --region=eu-west-1 --no-include-email  ecr get-login)

name ?= api
version ?= latest
registry ?= xxx.dkr.ecr.yyy.amazonaws.com

image:
	$(call blue, "Building docker image...")
	docker build --no-cache -t ${name}:${version} -f Dockerfile .
	docker tag ${name}:${version} ${name}:latest
	$(MAKE) clean

run: image
	$(call blue, "Running Docker image locally...")
	docker run -i -t --rm -p 8080:8080 ${name}:${version} 

publish: image
	$(call blue, "Publishing Docker image to registry...")
	docker tag ${name}:${version} ${registry}/${name}:${version}
	docker tag ${name}:${version} ${registry}/${name}:latest
	docker push ${registry}/${name}:${version} 
	docker push ${registry}/${name}:latest

clean: 
	@rm -f app 

define blue
	@tput setaf 6
	@echo $1
	@tput sgr0
endef
