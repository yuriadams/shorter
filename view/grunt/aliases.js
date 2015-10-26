module.exports = function(){
  // if (target === 'dist') {
  //   return grunt.task.run(['build', 'connect:dist:keepalive']);
  // }
  return {

    'serve': {
      description: 'Compile then start a connect web server',
      tasks: [
        'clean:server',
        'wiredep',
        'concurrent:server',
        'autoprefixer:server',
        'connect:livereload',
        'watch'
      ]
    },
    'test': {
      tasks: [
          'clean:server',
          'wiredep',
          'concurrent:test',
          'autoprefixer',
          'connect:test',
          'karma'
      ]
    },
    'build': {
      tasks: [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
      ]
    },
    'homol': {
      tasks: [
        'shell:preparesettingshomol',
        'build',
        'compress',
        'scp',
        'sshexec',
        'shell:cleansettings',
        'clean:local'
      ]
    },
    'default': {
      tasks: [
        'newer:jshint',
        'test',
        'build'
      ]
    }
  }
}
