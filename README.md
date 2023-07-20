# Node.js App Periodic Deployment with Jenkins CI/CD

This repository contains an example Node.js application along with a Jenkins pipeline configuration for setting up a Continuous Integration and Continuous Deployment (CI/CD) process with periodic deployments.

## Overview

The purpose of this project is to demonstrate how to automate the build, test, and deployment of a Node.js application using Jenkins. The Jenkins pipeline is configured to perform periodic builds and deployments, ensuring that the latest changes are regularly deployed to the target environment.

## Features

- Automated build, test, and deployment of a Node.js application
- Jenkins pipeline with stages for cloning, building, testing, and deploying the application
- Periodic build triggered by a cron schedule (daily at midnight)
- Automatic deployment to a target server using NGINX
- Example Node.js application for demonstration purposes

## Prerequisites

To use this project, ensure you have the following:

- Node.js and npm installed on the target server for running the application
- Jenkins installed and configured to execute pipeline jobs
- NGINX installed on the target server for hosting the deployed application

## Usage

1. Clone this repository to your local machine.
2. Modify the Jenkins pipeline script (`Jenkinsfile`) to customize the build, test, and deployment steps according to your application and deployment requirements. Additionally, configure the Slack notification.
3. Install the Jenkins Slack plugin on your Jenkins instance. You can find the plugin [here](https://plugins.jenkins.io/slack/).
4. Set up a Slack workspace and create a new Incoming Webhook. This webhook will be used to send notifications to your Slack channel.
5. Add the Slack webhook URL as a Jenkins credential. Go to Jenkins > Manage Jenkins > Manage Credentials > (select appropriate domain) > Add Credentials. Choose "Secret text" as the credential type and paste your Slack webhook URL.
6. Update the Jenkinsfile to include the Slack notification step. You can send notifications for different stages of the pipeline (e.g., build success, deployment status, etc.).
7. Create a Jenkins job, specifying this repository as the source.
8. Configure the Jenkins job to run the pipeline using the provided Jenkinsfile.
9. Set up the necessary environment variables or configuration files for your deployment server and application.
10. Run the Jenkins job, and the pipeline will automatically clone the repository, build, test, and deploy the application to the specified target server. Slack notifications will be sent to the configured channel.

Below is an example of how to add Slack notifications to the Jenkinsfile:

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                // Clone the repository
                // ...
            }
        }

        stage('Build') {
            steps {
                // Build the application
                // ...
            }
        }

        stage('Test') {
            steps {
                // Run tests
                // ...
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application to the target server
                // ...
            }
        }
    }

    post {
        success {
            // Send a Slack notification when the pipeline is successful
            slackSend(
                color: 'good',
                message: "Pipeline succeeded! :white_check_mark:",
                channel: '#your_slack_channel',
                tokenCredentialId: 'your_slack_credential_id'
            )
        }

        failure {
            // Send a Slack notification when the pipeline fails
            slackSend(
                color: 'danger',
                message: "Pipeline failed! :x:",
                channel: '#your_slack_channel',
                tokenCredentialId: 'your_slack_credential_id'
            )
        }
    }
}
```
## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or enhancements, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

This project was inspired by the need for automating Node.js application deployments and the power of Jenkins for CI/CD processes.

## Contact

For any inquiries or questions, please contact [Eniola](https://github.com/eniolastyle).

---