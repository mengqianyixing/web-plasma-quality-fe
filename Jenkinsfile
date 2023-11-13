pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'whoami'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /home/psms2.0-test/psms-fe'
      }
    }

  }
}