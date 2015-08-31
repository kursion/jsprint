M = {
  config: require 'jsprint/config'
  utils:  require 'jsprint/utils'
}

class Jsprint
  # Configuration for Jsprint
  CONFIG = new M.config.Main()

  constructor: () ->
    console.info? "Jsprint version:", CONFIG.getVersion()
    @init()

  init: ->
    @renderImgLegends()
    @renderHeader()
    @renderFooter()
    @renderLinkReferences()
    @createSummary()

  createSummary: ->
    # Generating tags

    # TODO: test new method
    # tags = []
    # tagsCounter = {}
    # for i in [1..10]
    #   tags.push "H#{i}"
    #   tagsCounter["H#{i}"] ||= 0
    #   tagsCounter["H#{i}"]++
    #
    # console.log tags, tagsCounter
    # console.log tags.join(" ")
    # $("." + CONFIG.getClass("page")).each((i, page) ->
    #   console.log i, page
    #   $(tags.join(" ")).each(  ->
    #     console.log i
    #   )
    # )

    # ----------------- Old
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

  renderLinkReferences: ->
    $("a").each (i) ->
      i++
      link = $(this).attr("href")
      text = $(this).text()
      ref  = $(this).attr("ref")
      show = text
      show = "#{ref} (#{text})"  if ref isnt undefined
      $(this).append(
        $("<sup/>").text(" [#{i}]")
      )
      line = $("<div/>").append(
        $("<span/>").attr("class", "index").text("[#{i}]")
        $("<span/>").attr("class", "text").text(" #{show}: ")
        $("<span/>").attr("class", "link").append(
          $("<a/>").attr("href", link).text(link)
        )
      )
      $(".#{CONFIG.getClass("bibliography")}").append(line)

  renderImgLegends: ->
    i = 0
    $("img").each ->
      title = $(this).attr("title")
      ref   = $(this).attr("ref")
      if title? || ref?
        i++
        legendDOM  = $("<div/>")
          .attr('class', CONFIG.getClass("img-legend"))
          .html("#{title}  <sup>#{i}</sup>")
        $(this).after(legendDOM)

        legendLineDOM = $("<div/>")
          .html("[#{i}] #{title} <i>(#{ref})</i>")
        M.utils.appendToClass(CONFIG.getClass("imageography"), legendLineDOM)

  _getHeader: ->
    defHeader = $(".#{CONFIG.getClass('def-header')}").html() or ""
    headerContent = $("<div/>")
      .attr("class", CONFIG.getClass("header"))
      .html(defHeader)

  _getFooter: (i) ->
    outof = $("<div/>")
      .attr("class", CONFIG.getClass("footer-pagenbr"))
      .text("#{i+1}/#{$(".#{CONFIG.getClass("page")}").length}")
    $("<div/>")
      .attr("class", CONFIG.getClass("footer"))
      .append(outof)

  renderHeader: ->
    $(".#{CONFIG.getClass("page")}").each (i, page) =>
      $(page).prepend @_getHeader()

  renderFooter: ->
    $(".#{CONFIG.getClass("page")}").each (i, page) =>
      $(page).append  @_getFooter(i)

  toString: ->
    return "Version: JSPrint #{CONFIG.getVersion()}\n
      CLASSES: #{CONFIG.getClasses()}"

jsprint = new Jsprint()
console.log jsprint.toString()
