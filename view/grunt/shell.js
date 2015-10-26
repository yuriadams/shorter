module.exports = {
  preparesettingshomol: {
      command: [
          'cp app/scripts/services/settings.js app/scripts/services/settings.js.bkp',
          'rm app/scripts/services/settings.js',
          'cp app/config/environments/homol/settings.js app/scripts/services/'
      ].join('&&')
  },
  cleansettings: {
      command: [
          'rm app/scripts/services/settings.js',
          'cp app/scripts/services/settings.js.bkp app/scripts/services/settings.js',
          'rm app/scripts/services/settings.js.bkp'
      ].join('&&')
  }
}
