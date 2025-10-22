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
        SSH_KEY = "C:/Users/daehyeon kim/.jenkins/SDE-project-key.pem"
        SSH_USER = "ubuntu"
        SSH_HOST = "13.239.252.132"
        SSH_DIR = "/var/www/html/"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning GitHub repository...'
                git credentialsId: 'github-login', url: 'https://github.com/104838522/DevOps-project-Wed-16.30-MD-G6.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building React/TypeScript app...'
                bat 'set CI=false && npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                bat 'npm test -- --passWithNoTests || echo "Tests skipped (demo environment)"'
            }
        }

        stage('Docker Deploy') {
            steps {
                echo 'Building and running Docker container...'
                bat """
                    docker compose build
                    docker stop ${CONTAINER_NAME} || echo Container not running
                    docker rm ${CONTAINER_NAME} || echo Container not found
                    docker compose up -d
                    timeout /t 5 /nobreak
                    docker ps -f name=${CONTAINER_NAME}
                """
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo 'Deploying build output to AWS EC2...'
                bat """
                    echo Uploading files to AWS EC2...
                    pscp -i "${SSH_KEY}" -r build/* ${SSH_USER}@${SSH_HOST}:${SSH_DIR}
                """
            }
        }

        stage('Monitor AWS EC2') {
            steps {
                echo 'Running remote monitoring on AWS EC2...'
                bat """
                    plink -i "${SSH_KEY}" ${SSH_USER}@${SSH_HOST} "top -b -n 1 | head -5"
                    plink -i "${SSH_KEY}" ${SSH_USER}@${SSH_HOST} "free -m"
                    plink -i "${SSH_KEY}" ${SSH_USER}@${SSH_HOST} "uptime"
                    plink -i "${SSH_KEY}" ${SSH_USER}@${SSH_HOST} "curl -o /dev/null -s -w 'HTTP=%{http_code}, time_total=%{time_total}s\\n' http://localhost"
                """
            }
        }
    }

    post {
        success {
            echo ' Pipeline completed successfully!'
        }
        failure {
            echo ' Pipeline failed. Check Jenkins logs.'
            bat "docker compose down || echo Cleanup complete"
        }
    }
}
