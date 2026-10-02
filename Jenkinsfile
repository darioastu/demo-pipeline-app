// ============================================================
// Pipeline usando la GLOBAL SHARED LIBRARY "devops-lib"
// ============================================================
@Library('devops-lib') _

ciPipeline(
  appDir      : 'app',
  imageName   : 'toorstu/demo-pipeline-app',
  registry    : 'dockerhub',          // dockerhub | ecr | gar | acr
  credentialsId: 'dockerhub-creds',
  sonarServer : 'sonarqube'
)
