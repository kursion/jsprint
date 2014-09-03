module.exports = exp = {}

exp.Main = class Main
  CLASS =
    title:           "yld-title"
    page:            "jsprint-page"
    header:          "jsprint-page-header"
    footer:          "jsprint-page-footer"
    summary:         "yld-summary"
    bibliography:    "yld-bibliography"
    imageography:    "yld-imageography"
    pagenbr:         "jsprint-pagenbr"
    "def-header":    "yld-def-header"
    "page-summary":  "jsprint-page-summary"
    "summary-entry": "yld-summary-entry"
    "img-legend":    "yld-img-legend"
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
