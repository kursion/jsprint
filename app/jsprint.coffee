YL_Doc = undefined
doc = undefined
YL_Doc = ->
  aRef = undefined
  adaptPage = undefined
  createSummary = undefined
  headerFooter = undefined
  imgLegends = undefined
  _CONFIG = undefined
  _getHeader = undefined
  _CONFIG = {}
  _CONFIG["class"] =
    title: "yld-title"
    page: "yld-page"
    "def-header": "yld-def-header"
    header: "yld-page-header"
    footer: "yld-page-footer"
    "page-summary": "yld-page-summary"
    summary: "yld-summary"
    "summary-entry": "yld-summary-entry"
    "img-legend": "yld-img-legend"
    bibliography: "yld-bibliography"
    imageography: "yld-imageography"
    pagenbr: "yld-pagenbr"

  _CONFIG.settings =
    "title-nbr": true
    "page-nbr": true
    "page-outof": true
    "page-outof-symbole": "/"
    "auto-refresh": false
    "auto-interval": 2000

  _CONFIG.counters =
    img: 0
    a: 0

  _CONFIG.summary = nbrtitle: 45
  @init = ->
    imgLegends()
    aRef()
    headerFooter()
    createSummary()
    setInterval "location.reload(true)", _CONFIG.settings["auto-interval"]  if _CONFIG.settings["auto-refresh"]

  imgLegends = ->
    $("img").each ->
      ref = undefined
      title = undefined
      title = $(this).attr("title")
      ref = $(this).attr("ref")
      if title
        _CONFIG.counters["img"]++
        $(this).after "<div class='" + _CONFIG["class"]["img-legend"] + "'>" + title + " <sup>" + _CONFIG.counters["img"] + "</sup></div>"
        $("." + _CONFIG["class"]["imageography"]).append "<div>[" + _CONFIG.counters["img"] + "] " + title + " <i>(" + ref + "</i>)</div>"


  aRef = ->
    $("a").each ->
      link = undefined
      ref = undefined
      show = undefined
      text = undefined
      _CONFIG.counters["a"]++
      link = $(this).attr("href")
      text = $(this).text()
      ref = $(this).attr("ref")
      show = text
      show = ref + "(" + text + ")"  if ref isnt undefined
      $(this).append " <sup>[" + _CONFIG.counters["a"] + "]</sup>"
      $("." + _CONFIG["class"]["bibliography"]).append "<div>" + "<span class='index'>[" + _CONFIG.counters["a"] + "] </span>" + "<span class='text'>" + show + ": " + "<span class='link'><a href='" + link + "'>" + link + "</a></div>"


  _getHeader = ->
    "<div class=" + _CONFIG["class"]["header"] + ">" + ($("." + _CONFIG["class"]["def-header"]).html() or "") + "</div>"

  headerFooter = ->
    $("." + _CONFIG["class"]["page"]).each (i, page) ->
      outof = undefined
      pagenbr = undefined
      pagenbr = i + 1
      $(page).prepend _getHeader()
      $(page).append "<div class=" + _CONFIG["class"]["footer"] + "></div>"
      outof = ""
      outof = _CONFIG.settings["page-outof-symbole"] + $(".yld-page").length  if _CONFIG.settings["page-outof"]
      $(page).find("." + _CONFIG["class"]["footer"]).append "<div class=" + _CONFIG["class"]["pagenbr"] + ">" + pagenbr + outof + "</div>"  if _CONFIG.settings["page-nbr"]


  createSummary = ->
    JSP_TITLE2_NBR = undefined
    JSP_TITLE3_NBR = undefined
    JSP_TITLE4_NBR = undefined
    JSP_TITLE_NBR = undefined
    nbrtitle = undefined
    pagenbr = undefined
    JSP_TITLE_NBR = 0
    JSP_TITLE2_NBR = 0
    JSP_TITLE3_NBR = 0
    JSP_TITLE4_NBR = 0
    pagenbr = 0
    nbrtitle = 0
    $("." + _CONFIG["class"]["page"]).each (i, page) ->
      pagenbr++
      $(page).find("." + _CONFIG["class"]["title"]).each (_, title) ->
        h_nbr = undefined
        t = undefined
        tag = undefined
        t = $(title).text()
        tag = $(this)[0].tagName
        h_nbr = ""
        nbrtitle++
        if tag is "H1"
          JSP_TITLE_NBR++
          JSP_TITLE2_NBR = 0
          h_nbr = JSP_TITLE_NBR
        if tag is "H2"
          JSP_TITLE2_NBR++
          JSP_TITLE3_NBR = 0
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR
        if tag is "H3"
          JSP_TITLE3_NBR++
          JSP_TITLE4_NBR = 0
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR + "." + JSP_TITLE3_NBR
        if tag is "H4"
          JSP_TITLE4_NBR++
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR + "." + JSP_TITLE3_NBR + "." + JSP_TITLE4_NBR
        $(title).text h_nbr + " " + t  if _CONFIG.settings["page-nbr"]
        if nbrtitle % _CONFIG.summary["nbrtitle"] is 0
          $("." + _CONFIG["class"]["page-summary"]).last().after "</div><div class='" + _CONFIG["class"]["page-summary"] + " " + _CONFIG["class"]["page"] + "'><div class='" + _CONFIG["class"]["summary"] + "'></div>"
          $("." + _CONFIG["class"]["page-summary"]).last().prepend _getHeader()
        $("." + _CONFIG["class"]["summary"]).last().append "<div class='" + _CONFIG["class"]["summary"] + "-" + tag + " " + _CONFIG["class"]["summary-entry"] + "'>" + h_nbr + " " + t + "<div>" + pagenbr + "</div></div>"



  adaptPage = ->
    $("." + JSP_PAGE_CLASS).each (i, page) ->
      page_elements = undefined
      pages = undefined
      tmp_content = undefined
      totalH = undefined
      totalH = 0
      pages = [ $(this) ]
      page_elements = []
      tmp_content = []
      $(this).children().each ->
        elH = undefined
        new_page = undefined
        elH = $(this).outerHeight()
        if (totalH + elH) < JSP_PAGE_PIXEL
          tmp_content.push $(this)
          totalH += elH
        else
          page_elements.push tmp_content
          tmp_content = [ $(this) ]
          totalH = elH
          new_page = createPage("?")
          pages[pages.length - 1].after new_page
          pages.push new_page

      page_elements.push tmp_content
      i = 0
      while i < page_elements.length
        pages[i].text("").append page_elements[i]
        i++


doc = new YL_Doc()
doc.init()
