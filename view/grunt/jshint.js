module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish'),
    ignores: ['app/scripts/translations.js']
  },
  all: {
    src: [
      'Gruntfile.js',
      '<%= yeoman.app %>/scripts/{,*/}*.js'
    ]
  },
  test: {
    options: {
      jshintrc: 'test/.jshintrc'
    },
    src: ['test/spec/{,*/}*.js']
  }
}
