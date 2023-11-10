pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'node -v'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /home/psms2.0-test/psms-fe'
      }
    }

  }
}