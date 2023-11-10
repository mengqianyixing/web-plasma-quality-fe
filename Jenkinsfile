pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        sh 'node -v'
        sh 'pnpm -v'
        sh 'pnpm install'
      }
    }

    stage('Build') {
      steps {
        sh 'pnpm build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /home/psms2.0-test/psms-fe'
      }
    }

  }
}