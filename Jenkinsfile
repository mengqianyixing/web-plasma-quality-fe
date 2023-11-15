pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'node -v && pnpm -v && node -e \'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))\''
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