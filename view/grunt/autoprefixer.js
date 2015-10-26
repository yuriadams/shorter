module.exports = {
  options: {
    browsers: ['last 1 version']
  },
  server: {
    options: {
      map: true,
    },
    files: [{
      expand: true,
      cwd: '.tmp/styles/',
      src: '{,*/}*.css',
      dest: '.tmp/styles/'
    }]
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/styles/',
      src: '{,*/}*.css',
      dest: '.tmp/styles/'
    }]
  }
}
