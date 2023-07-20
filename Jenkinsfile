pipeline {
    agent any

    triggers {
        cron('H 0 * * *') // This schedules the job to run daily at midnight
    }

    stages {

        stage("Cleanup Workspace"){
            steps {
                cleanWs()
            }
        }
        
        stage("Checkout from SCM"){
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/ABSQUARE1/Nodejs-app-periodic-deployment-jenkins-cicd/'
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

}
