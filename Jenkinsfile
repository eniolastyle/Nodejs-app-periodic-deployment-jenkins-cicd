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
                git branch: 'enitest', credentialsId: 'github', url: 'https://github.com/eniolastyle/Nodejs-app-periodic-deployment-jenkins-cicd'
            }
        }

        stage('Installing Dependencies') {
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

        stage('Deploying App') {
            steps {
                 echo 'Deploying App...'
            }
        }
    }

}
