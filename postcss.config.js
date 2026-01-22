module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'iOS >= 10',
        'Android >= 5'
      ]
    }
  }
}
