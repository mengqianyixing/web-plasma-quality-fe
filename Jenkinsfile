pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'export NODE_OPTIONS="--max-old-space-size=16384"'
        sh 'env | grep NODE_OPTIONS'
        sh 'node -v && pnpm -v'
        sh 'pnpm install --frozen-lockfile && pnpm build:docker'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /home/psms2.0-test/psms-fe'
      }
    }

  }
}