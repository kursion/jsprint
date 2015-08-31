module.exports = exp = {}

exp.Main = class Main
  VERSION = "1.2"

  CLASS =
    "title":          "jsprint-title"
    "page":           "jsprint-page"
    "header":         "jsprint-page-header"
    "footer":         "jsprint-page-footer"
    "summary":        "jsprint-summary"
    "bibliography":   "jsprint-bibliography"
    "imageography":   "jsprint-imageography"
    "footer-pagenbr": "jsprint-pagenbr"
    "def-header":     "jsprint-def-header"
    "page-summary":   "jsprint-page-summary"
    "summary-entry":  "jsprint-summary-entry"
    "img-legend":     "jsprint-img-legend"

  CONFIG =
    summary:
      nbrtitle: 45

  constructor: -> null

  getClass: (className) -> CLASS[className]

  getClasses: -> [k] for k, v of CLASS

  getVersion: -> VERSION

  get: (configName, option) -> CONFIG[configName][option]
