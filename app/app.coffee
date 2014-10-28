M = {
  config: require 'jsprint/config'
}

class Jsprint
  # Configuration for Jsprint
  CONFIG = new M.config.Main()

  constructor: () ->
    #CONFIG.print()
    console.info? "Jsprint version:", CONFIG.getVersion()
    @init()

  init: ->
    @renderImgLegends()
    @headerFooter()
    @aRef()
    @createSummary()

  createSummary: ->
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
    header = @_getHeader()
    $("." + CONFIG.getClass("page")).each (i, page) ->
      pagenbr++
      $(page).find("." + CONFIG.getClass("title")).each (_, title) ->
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
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR + "." +
            JSP_TITLE3_NBR + "." + JSP_TITLE4_NBR
        $(title).text h_nbr + " " + t
        if nbrtitle % CONFIG.get("summary", "nbrtitle") is 0
          $("." + CONFIG.getClass("page-summary"))
            .last().after "</div><div class='" +
              CONFIG.getClass("page-summary") + " " +
              CONFIG.getClass("page") + "'><div class='" +
              CONFIG.getClass("summary") + "'></div>"
          $("." + CONFIG.getClass("page-summary")).last().prepend header
        $("." + CONFIG.getClass("summary"))
          .last().append "<div class='" + CONFIG.getClass("summary") +
          "-" + tag + " " + CONFIG.getClass("summary-entry") +
          "'>" + h_nbr + " " + t + "<div>" + pagenbr + "</div></div>"

  aRef: ->
    counter = 0
    $("a").each ->
      counter++
      link = undefined
      ref = undefined
      show = undefined
      text = undefined
      link = $(this).attr("href")
      text = $(this).text()
      ref = $(this).attr("ref")
      show = text
      show = ref + "(" + text + ")"  if ref isnt undefined
      $(this).append " <sup>[" + counter + "]</sup>"
      $("." + CONFIG.getClass("bibliography"))
        .append "<div>" + "<span class='index'>[" +
          counter + "] </span>" + "<span class='text'>" +
          show + ": " + "<span class='link'><a href='" + link + "'>" +
          link + "</a></div>"

  renderImgLegends: ->
    counter = 0
    $("img").each ->
      title = $(this).attr("title")
      ref   = $(this).attr("ref")
      if title? || ref?
        counter++
        $(this).after "
          <div class='#{CONFIG.getClass("img-legend")}'>
          #{title} <sup>#{counter}</sup></div>"
        # TODO: this should be a function (appendImageography)
        $("." + CONFIG.getClass("imageography")).append "
          <div>[#{counter}] #{title} <i>(#{ref}</i>)</div>"

  _getHeader: ->
    "<div class=" + CONFIG.getClass("header") + ">" +
      ($("." + CONFIG.getClass("def-header")).html() or "") + "</div>"

  headerFooter: ->
    $("." + CONFIG.getClass("page")).each (i, page) =>
      outof = undefined
      pagenbr = undefined
      pagenbr = i + 1
      $(page).prepend @_getHeader()
      $(page).append "<div class=" + CONFIG.getClass("footer") + "></div>"
      outof = ""
      outof = "/" +
        $(".#{CONFIG.getClass("page")}").length
      $(page).find("." + CONFIG.getClass("footer")).append "<div class=" +
        CONFIG.getClass("pagenbr") + ">" + pagenbr + outof +
        "</div>"

jsprint = new Jsprint()
