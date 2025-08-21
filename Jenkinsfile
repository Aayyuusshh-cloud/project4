pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "ayush319/todo-backend"
        FRONTEND_IMAGE = "ayush319/todo-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/aayyuusshh-cloud/project4.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                cd backend
                docker build -t $BACKEND_IMAGE:${BUILD_NUMBER} -t $BACKEND_IMAGE:latest .
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                cd frontend
                docker build -t $FRONTEND_IMAGE:${BUILD_NUMBER} -t $FRONTEND_IMAGE:latest .
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $BACKEND_IMAGE:${BUILD_NUMBER}
                    docker push $BACKEND_IMAGE:latest
                    docker push $FRONTEND_IMAGE:${BUILD_NUMBER}
                    docker push $FRONTEND_IMAGE:latest
                    '''
                }
            }
        }
    }

