module.exports = {
  options: {
      host: '<%= secret.host %>',
      username: '<%= secret.username %>',
      password: '<%= secret.password %>'
  },
  homol: {
      files: [{
          cwd: '.',
          src: 'myfront.tar.gz',
          // path on the server
          dest: '/home/hedleygois/myfront.tar.gz'
      }]
  }
}
