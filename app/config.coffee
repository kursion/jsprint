module.exports = exp = {}

exp.Main = class Main
  CLASS =
    title:           "jsprint-title"
    page:            "jsprint-page"
    header:          "jsprint-page-header"
    footer:          "jsprint-page-footer"
    summary:         "jsprint-summary"
    bibliography:    "jsprint-bibliography"
    imageography:    "jsprint-imageography"
    pagenbr:         "jsprint-pagenbr"
    "def-header":    "jsprint-def-header"
    "page-summary":  "jsprint-page-summary"
    "summary-entry": "jsprint-summary-entry"
    "img-legend":    "jsprint-img-legend"
  VERSION = "1.1"
  CONFIG =
    summary:
      nbrtitle: 45

  constructor: -> null

  print: ->
    console.log "CLASSES", CLASS

  getClass: (className) -> CLASS[className]

  getVersion: -> VERSION

  get: (configName, option) -> CONFIG[configName][option]
