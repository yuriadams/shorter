module.exports = function(grunt) {
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'myfront'
  };

  require('load-grunt-config')(grunt, {
    config: {
      yeoman: appConfig,
      secret: grunt.file.readJSON('homol.json')
    }
  });
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
};
