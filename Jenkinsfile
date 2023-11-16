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
        sshPublisher(publishers: [sshPublisherDesc(configName: 'chengdu182', transfers: [sshTransfer(cleanRemote: false, excludes: '', 
                     execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, 
                     patternSeparator: '[, ]+', remoteDirectory: 'psms', remoteDirectorySDF: false, removePrefix: 'dist', 
                     sourceFiles: 'dist/**/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
        echo 'Credentials SUCCESS'
      }
    }

  }
}