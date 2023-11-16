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
          def currentPath = sh(returnStdout: true, script: 'pwd')
          sh 'exit'
          sh 'sudo docker cp 4c1a8c18916e:${currentPath}/dist/* /home/plasma_gz/nginx/web/psms'
      }
    }

  }
}
