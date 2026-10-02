FROM jenkins/jenkins:lts-jdk17
USER root
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*
USER jenkins
RUN jenkins-plugin-cli --plugins git github workflow-aggregator nodejs \
    sonar docker-workflow credentials-binding timestamper pipeline-aws
