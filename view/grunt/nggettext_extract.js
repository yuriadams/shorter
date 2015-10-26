module.exports = {
  pot: {
    files: {
      'po/template.pot': [
        '<%= yeoman.app %>/index.html',
        '<%= yeoman.app %>/partials/{,*/}*.html',
        '<%= yeoman.app %>/views/{,*/}*.html',
        '<%= yeoman.app %>/views/{,*/}/{,*/}*.html',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    }
  }
}
