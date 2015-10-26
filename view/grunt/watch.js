module.export = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
    tasks: ['newer:jshint:all'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  jsTest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['newer:jshint:test', 'karma']
  },
  compass: {
    files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
    tasks: ['compass:server', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files: [
      '<%= yeoman.app %>/{,*/}*.html',
      '.tmp/styles/{,*/}*.css',
      '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  }
}
