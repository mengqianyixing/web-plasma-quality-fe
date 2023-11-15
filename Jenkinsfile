pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'node -v && pnpm -v'
        sh 'pnpm install --frozen-lockfile && pnpm build:docker'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /home/plasma_gz/nginx/web/psms/'
      }
    }

  }
}
