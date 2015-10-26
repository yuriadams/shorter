module.exports = {
  html: ['<%= yeoman.dist %>/{,*/}*.html'],
  css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
  options: {
    assetsDirs: [
      '<%= yeoman.dist %>',
      '<%= yeoman.dist %>/images',
      '<%= yeoman.dist %>/styles'
    ]
  }
}
