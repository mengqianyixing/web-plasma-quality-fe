pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'node -v && pnpm -v'
        sh 'npm config set registry https://registry.npm.taobao.org'
        sh 'npm install -g pnpm@latest'
        sh 'pnpm install && pnpm build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /home/psms2.0-test/psms-fe'
      }
    }

  }
}