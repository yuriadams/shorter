module.exports = {
  all: {
    options: {
      module: 'app'
    },
    files: {
      '<%= yeoman.app %>/scripts/translations.js': ['po/*.po']
    }
  }
}
