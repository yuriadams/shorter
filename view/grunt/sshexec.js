module.exports = function(){
  return {
    clean: {
      command: 'rm -rf /opt/myfront*',
      options: {
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        password: '<%= secret.password %>'
      }
    },
    move_to_opt: {
      command: 'mv /home/hedleygois/myfront.tar.gz/myfront.tar.gz /opt/ && rm -rf /home/hedleygois/myfront.tar.gz/',
      options: {
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        password: '<%= secret.password %>'
      }
    },
    uncompress: {
      command: 'cd /opt/ && tar -xvf /opt/myfront.tar.gz',
      options: {
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        password: '<%= secret.password %>'
      }
    }
  };
}
