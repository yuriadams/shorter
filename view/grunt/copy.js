module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        '*.html',
        'views/{,*/}*.html',
        'partials/{,*/}*.html',
        'images/{,*/}*.{webp}',
        'styles/fonts/{,*/}*.*',
        'styles/adenilson.min.css',
        'styles/ajustes.temp.css',
        'styles/bootstrap.min.css'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= yeoman.dist %>/images',
      src: ['generated/*']
    },
    {
      expand: true,
      cwd: '.',
      src: 'bower_components/components-font-awesome/fonts/*',
      dest: '<%= yeoman.dist %>'
    },
    {
      expand: true,
      cwd: '.',
      flatten: true,
      dest: '<%= yeoman.dist %>/styles'
    },
    {
      expand: true,
      cwd: '.',
      src: './bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
      dest: '<%= yeoman.dist %>'
    }]
  },
  styles: {
    expand: true,
    cwd: '<%= yeoman.app %>/styles',
    dest: '.tmp/styles/',
    src: '{,*/}*.css'
  }
}
