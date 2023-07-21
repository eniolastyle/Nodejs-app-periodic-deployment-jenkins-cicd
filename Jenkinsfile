pipeline {
    agent any

    triggers {
         cron('H/5 * * * *') // This schedules the job to run every 30 minutes
    }

    stages {

        stage("Cleanup Workspace"){
            steps {
                cleanWs()
            }
        }
        
        stage("Checkout from SCM"){
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/eniolastyle/Nodejs-app-periodic-deployment-jenkins-cicd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        npm install
                    '''
                }
                
            }
        }

        stage('Integration Testing') {
            steps {
                script {
                    def testResult = sh(
                        script: 'npm run test:integration',
                        returnStatus: true
                    )
                    
                    if (testResult != 0) {
                        error('Integration test failed! Aborting deployment.')
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                 echo 'Deploying App...'
            }
        }
    }

    post {
        always {
            echo 'Post-build: Cleanup'
            // Add any post-build cleanup steps here, if needed
        }
        success {
            echo 'Post-build: Sending Slack Notification - Build Succeeded'
            slackSend (
                channel: 'ufas-test',
                color: 'good',
                message: "Build Succeeded: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                tokenCredentialId: 'slack'
            )
        }
        failure {
            echo 'Post-build: Sending Slack Notification - Build Failed'
            slackSend (
                channel: 'ufas-test',
                color: 'danger',
                message: "Build Failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                tokenCredentialId: 'slack'
            )
        }
    }

}
