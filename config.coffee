# Brunch.io configuration file
{name} = require './package'

exports.config =
  modules:
    nameCleaner: (path) ->
      path.replace /^app/, name

  path:
    public: 'public'
  files:
    javascripts:
      joinTo:
        'vendor.js': /^vendor/
        'jsprint.js': /^app/
    stylesheets:
      joinTo: 'jsprint.css': /^app\/styles/
