module.exports = exp = {}

exp.Main = class Main
  CLASS =
    title:           "yld-title"
    page:            "yld-page"
    header:          "yld-page-header"
    footer:          "yld-page-footer"
    summary:         "yld-summary"
    bibliography:    "yld-bibliography"
    imageography:    "yld-imageography"
    pagenbr:         "yld-pagenbr"
    "def-header":    "yld-def-header"
    "page-summary":  "yld-page-summary"
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
