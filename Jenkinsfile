// Jenkinsfile for SWE40006 DevOps Pipeline
// Author: Daehyeon Kim (Repo & CI/Build Server Engineer)
// Description: Automates build and test process for a React/TypeScript project using NodeJS.

pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code from GitHub repository...'
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
                echo 'Building React TypeScript app...'
                bat 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo 'Archiving build output...'
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check Jenkins console output for details.'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
    }
}
