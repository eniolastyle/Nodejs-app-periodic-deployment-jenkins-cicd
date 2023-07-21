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
Screenshot showcasing the slack notification functionality
![Screenshot Slack Notification](https://github.com/eniolastyle/Nodejs-app-periodic-deployment-jenkins-cicd/assets/94724734/96ac2167-d221-46cf-8ab3-0d0cbc491110)


## Expanded Details

### Application Features

Automated Build, Test, and Deployment for Node.js Applications

The application provides a comprehensive and efficient solution for automating the entire development lifecycle of Node.js applications, from code changes to production deployment. With its robust capabilities and seamless integration, developers can focus on writing code while the application takes care of the repetitive and time-consuming tasks of building, testing, and deploying.

### Jenkins Pipeline with Stages

The heart of the automation process is the Jenkins pipeline, a powerful tool for orchestrating the development and deployment workflow. The pipeline is designed with different stages, each representing a crucial step in the lifecycle of the application.

1. Cloning Stage

The journey begins with the "Cloning" stage, where the application's source code is fetched from the version control repository (e.g., Git). Jenkins automatically clones the repository, ensuring that the latest changes are pulled into the pipeline, and making them ready for the subsequent stages.

2. Building Stage

In the "Building" stage, the application's source code is compiled, dependencies are resolved, and a production-ready build is generated. This ensures that potential issues, such as syntax errors or missing dependencies, are detected early in the process, allowing developers to catch and rectify them before proceeding further.

3. Testing Stage

Quality is at the core of the application, and the "Testing" stage ensures that the application meets its functional requirements and adheres to best coding practices. A suite of automated tests, including unit tests, integration tests, and end-to-end tests, is executed in this stage. Any detected issues are reported back to the development team for immediate attention, maintaining the integrity of the application's codebase.

4. Deployment Stage

The final step in the pipeline is the "Deployment" stage, where the application is deployed to the desired environment, such as staging or production. The deployment process is orchestrated carefully to minimize downtime and ensure a smooth transition. Automated deployment reduces human error and ensures consistency across environments, providing a reliable and stable application for end-users.

What the Jenkins Pipeline looks like on our end
![Screenshot of Jenkins Pipeline](https://github.com/eniolastyle/Nodejs-app-periodic-deployment-jenkins-cicd/assets/94724734/5542ea3e-abb4-459b-8389-9cfa256cd132)


### Advantages of Automation

The application's automated build, test, and deployment capabilities offer numerous benefits:

- Faster Time to Market: With automated processes, developers can deliver features and bug fixes rapidly, reducing the time from development to deployment.

- Consistency and Reliability: Automation ensures that the same process is followed consistently every time, resulting in a reliable and reproducible build and deployment process.

- Reduced Manual Errors: Manual interventions are prone to errors. Automation significantly reduces the risk of mistakes during the development lifecycle.

- Continuous Integration and Continuous Deployment (CI/CD): The application facilitates CI/CD practices, enabling frequent and automated code integration and deployment.

- Efficient Resource Utilization: Automation optimizes resource utilization by freeing up developers from repetitive tasks, allowing them to focus on higher-value activities.

- Increased Collaboration: The Jenkins pipeline provides a centralized platform for collaboration, making it easier for development and operations teams to work together seamlessly.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or enhancements, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

This project was inspired by the need for automating Node.js application deployments and the power of Jenkins for CI/CD processes.

## Contact

For any inquiries or questions, please contact [Eniola](https://github.com/eniolastyle).

---
