module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= yeoman.dist %>/{,*/}*',
        '!<%= yeoman.dist %>/.git{,*/}*'
      ]
    }]
  },
  local: {
    cwd: '.',
    dot: true,
    force: true,
    noWrite: true,
    src: ['myfront.tar.gz', 'myfront/']
  },
  server: '.tmp'
}
