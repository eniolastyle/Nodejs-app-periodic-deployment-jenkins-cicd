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

        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        npm install
                    '''
                }
                
            }
        }

        stage('Test') {
            steps {
                script {
                    sh '''
                        echo "Running Integration Testing..."
			npm run test:integration
                    '''
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
