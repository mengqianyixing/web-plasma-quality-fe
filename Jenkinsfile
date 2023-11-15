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
          sh 'sudo docker cp $(docker ps -q):dist/* /home/plasma_gz/nginx/web/psms'
      }
    }

  }
}
