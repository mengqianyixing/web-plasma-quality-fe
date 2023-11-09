pipeline {
  agent {
    docker {
      image 'node:16.20-alpine'
    }
  }

  stages {
    stage('Install pnpm') {
      steps {
        sh 'npm config set registry https://registry.npm.taobao.org'
        sh 'npm install -g pnpm@latest'
      }
    }

    stage('Install dependencies') {
      steps {
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
