# Pipeline CI/CD – Jenkins + SonarQube + Docker Hub
Prueba weebhook
Flujo: **Webhook → Get Source → (Build ‖ Sonar) → Docker Build → Publish Image**

## Estructura
```
app/                 App Node.js (Express + Jest)
Dockerfile           Imagen multi-stage
sonar-project.properties
Jenkinsfile          Pipeline usando la shared library (devops-lib)
Jenkinsfile.standalone  Pipeline declarativo sin library
infra/               docker-compose con Jenkins + SonarQube
shared-library/      Global Shared Library (repo aparte)
```

## Puesta en marcha
1. `cd infra && DOCKER_GID=$(getent group docker | cut -d: -f3) docker compose up -d --build`
2. Jenkins: http://localhost:8080 (clave inicial: `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`)
3. SonarQube: http://localhost:9000 (admin/admin) → My Account → Security → generar token.
4. En Jenkins → Manage Jenkins:
   - **Tools**: NodeJS `node20`, SonarQube Scanner `sonar-scanner` (instalar automáticamente).
   - **System → SonarQube servers**: nombre `sonarqube`, URL `http://sonarqube:9000`, token como credencial *Secret text*.
   - **Credentials**: `dockerhub-creds` (Username/Password, usar un *Access Token* de Docker Hub).
   - **System → Global Pipeline Libraries**: nombre `devops-lib`, versión `main`, repo Git de `shared-library/`.
5. Crear job tipo *Pipeline* → *Pipeline script from SCM* → tu repo → marcar **GitHub hook trigger for GITScm polling**.
6. GitHub → repo → Settings → Webhooks: `http://<jenkins-publico>/github-webhook/`, content type `application/json`, evento *push*.
   En local exponer Jenkins con `ngrok http 8080`.

## Otros registries
| Registry | registryHost | Credencial Jenkins |
|---|---|---|
| ECR | `<acct>.dkr.ecr.<region>.amazonaws.com` | AWS credentials + `region` |
| GAR | `<region>-docker.pkg.dev/<proyecto>/<repo>` | Secret file (JSON SA con `Artifact Registry Writer`) |
| ACR | `<nombre>.azurecr.io` | Username/Password (SP con rol `AcrPush`) |
