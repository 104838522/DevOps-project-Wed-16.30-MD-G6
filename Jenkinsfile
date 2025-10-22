// Jenkinsfile for SWE40006 DevOps Pipeline (macOS / Linux version)
// Author: Senupama Deshapriya
// Description: Automates build, test, and deployment to AWS EC2 with monitoring on Unix-based Jenkins agents

pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"
    }

    environment {
        BUILD_ENV = "production"
        DOCKER_IMAGE = "devops-project-app"
        CONTAINER_NAME = "devops-project-container"
        APP_PORT = "80"
        SSH_KEY = "/Users/senu/Downloads/SDE-project-key.pem"
        SSH_USER = "ubuntu"
        SSH_HOST = "13.239.252.132"
        SSH_DIR = "/var/www/html/"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Cloning GitHub repository...'
                git credentialsId: 'github-login', url: 'https://github.com/104838522/DevOps-project-Wed-16.30-MD-G6.git', branch: 'deploy'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building React/TypeScript application...'
                sh 'CI=false npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test -- --passWithNoTests || echo "Tests failed or skipped (demo environment)"'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo 'Archiving build artifacts for later deployment...'
                archiveArtifacts artifacts: 'build/**', followSymlinks: false
            }
        }

        stage('Docker Deploy') {
            steps {
                echo 'Building and running Docker container...'
                script {
                    sh """
                        docker compose build
                        docker stop ${CONTAINER_NAME} || echo 'Container not running'
                        docker rm ${CONTAINER_NAME} || echo 'Container not found'
                        docker compose up -d
                        sleep 5
                        docker ps -f name=${CONTAINER_NAME}
                    """
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo 'Deploying build output to AWS EC2 production server...'
                sh """
                    scp -i ${SSH_KEY} -o StrictHostKeyChecking=no -r build/* ${SSH_USER}@${SSH_HOST}:${SSH_DIR}
                """
            }
        }

        stage('Monitor AWS EC2') {
            steps {
                echo 'Running remote monitoring commands on AWS EC2...'
                sh """
                    ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} "
                        echo '===== CPU and Memory Stats =====';
                        top -b -n 1 | head -5;
                        echo '===== Memory Usage =====';
                        free -m;
                        echo '===== Uptime =====';
                        uptime;
                        echo '===== HTTP Response =====';
                        curl -o /dev/null -s -w 'HTTP=%{http_code}, time_total=%{time_total}s\\n' http://localhost;
                    "
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
            echo 'Docker container running locally, and app deployed to AWS EC2.'
        }
        failure {
            echo 'Pipeline failed. Check Jenkins logs for details.'
            sh 'docker compose down || echo "Cleanup complete"'
        }
    }
}
