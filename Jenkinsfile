pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'node -v && pnpm -v'
        sh 'pnpm config set registry https://registry.npmmirror.com'
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
      post {
        success {
           dingtalk (
              robot: 'f2f9880f-6eac-457a-a4af-cf498caa9b5d',
              type: 'LINK',
              title: '你有新的消息，请注意查收',
              text: ['测试链接类型的消息','分行显示，哈哈哈哈'],
              messageUrl: 'http://www.baidu.com',
              picUrl: 'https://www.picdiet.com/img/photographer_compressed.jpg'
           )
        }
      }
    }

  }
}
