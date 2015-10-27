module.exports = function(grunt) {
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'myfront'
  };

  require('load-grunt-config')(grunt, {
    config: {
      yeoman: appConfig
    }
  });
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
};
