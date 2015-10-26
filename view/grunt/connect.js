module.exports = function(){
  var appConfig = {
    app: require('../bower.json').appPath || 'app',
    dist: 'myfront'
  };

  return {
    options: {
      port: 9000,
      // Change this to '0.0.0.0' to access the server from outside.
      hostname: '0.0.0.0',
      livereload: 35729
    },
    livereload: {
      options: {
        open: true,
        middleware: function (connect) {
          return [
            connect.static('.tmp'),
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect().use(
              '/app/styles',
              connect.static('./app/styles')
            ),
            connect.static(appConfig.app)
          ];
        }
      }
    },
    test: {
      options: {
        port: 9001,
        middleware: function (connect) {
          return [
            connect.static('.tmp'),
            connect.static('test'),
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect.static(appConfig.app)
          ];
        }
      }
    },
    dist: {
      options: {
        open: true,
        base: '<%= yeoman.dist %>'
      }
    }
  }
}
