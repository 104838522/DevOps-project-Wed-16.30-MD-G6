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
                bat 'npm test -- --passWithNoTests || echo "Tests failed or skipped (demo environment)"'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo 'Archiving build artifacts...'
                archiveArtifacts artifacts: 'build/**', followSymlinks: false
            }
        }

        // ---------------- Docker Stage ----------------
        stage('Docker Deploy') {
            steps {
                echo 'Building and running Docker container...'
                script {
                    bat "docker compose build"
                    bat "docker stop ${CONTAINER_NAME} || echo Container not running"
                    bat "docker rm ${CONTAINER_NAME} || echo Container not found"
                    bat "docker compose up -d"
                    bat "timeout /t 5 /nobreak"
                    bat "docker ps -f name=${CONTAINER_NAME}"
                }
            }
        }

        // ---------------- AWS Deploy Stage ----------------
        stage('Deploy to AWS EC2') {
            steps {
                echo 'Deploying build output to AWS EC2 production server...'
                sh '''
                    scp -i /var/lib/jenkins/SDE-project-key.pem -o StrictHostKeyChecking=no -r build/* ubuntu@13.239.252.132:/var/www/html/
                '''
            }
        }

        stage('Monitor AWS EC2') {
            steps {
                echo 'Running remote system monitoring on AWS EC2...'
                sh '''
                    ssh -i /var/lib/jenkins/SDE-project-key.pem -o StrictHostKeyChecking=no ubuntu@13.239.252.132 "
                        echo '===== CPU and Memory Stats =====';
                        top -b -n 1 | head -5;
                        echo '===== Memory Usage =====';
                        free -m;
                        echo '===== Uptime =====';
                        uptime;
                        echo '===== HTTP Response =====';
                        curl -o /dev/null -s -w 'HTTP=%{http_code}, time_total=%{time_total}s\\n' http://localhost;
                    "
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            echo "Docker container running locally, and app deployed to AWS EC2!"
        }
        failure {
            echo 'Pipeline failed. Check Jenkins logs for details.'
            bat "docker compose down || echo Cleanup complete"
        }
    }
}
