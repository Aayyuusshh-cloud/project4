pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_USER = "${DOCKERHUB_CREDENTIALS_USR}"
        DOCKER_PASS = "${DOCKERHUB_CREDENTIALS_PSW}"
        BACKEND_IMAGE = "your-dockerhub-username/todo-backend"
        FRONTEND_IMAGE = "your-dockerhub-username/todo-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Aayyuusshh-cloud/project4.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                cd backend
                docker build -t $BACKEND_IMAGE:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                cd frontend
                docker build -t $FRONTEND_IMAGE:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                trivy image $BACKEND_IMAGE:${BUILD_NUMBER} || true
                trivy image $FRONTEND_IMAGE:${BUILD_NUMBER} || true
                '''
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                sh '''
                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                docker push $BACKEND_IMAGE:${BUILD_NUMBER}
                docker push $FRONTEND_IMAGE:${BUILD_NUMBER}
                '''
            }
        }
    }
}

