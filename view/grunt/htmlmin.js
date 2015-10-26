module.exports = {
  dist: {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    },
    files: [{
      expand: true,
      cwd: '<%= yeoman.dist %>',
      src: ['*.html', 'views/{,*/}*.html', 'partials/{,*/}*.html'],
      dest: '<%= yeoman.dist %>'
    }]
  }
}
