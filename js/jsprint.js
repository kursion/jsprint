function YL_Doc(){
  var _CONFIG = {}
  _CONFIG.class = {
    "title": "yld-title",
    "page": "yld-page",
    "def-header": "yld-def-header",
    "header": "yld-page-header",
    "footer": "yld-page-footer",
    "page-summary": "yld-page-summary",
    "summary": "yld-summary",
    "summary-entry": "yld-summary-entry",
    "img-legend": "yld-img-legend",
    "bibliography": "yld-bibliography",
    "imageography": "yld-imageography",
    "pagenbr": "yld-pagenbr"
  };
  _CONFIG.settings = {
    "title-nbr": true, // Show or hide number aside the titles
    "page-nbr": true,  // Show or hide page number
    "page-outof": true,
    "page-outof-symbole": "/",
    "auto-refresh": false,
    "auto-interval": 2000
  };
  _CONFIG.counters = {
    "img": 0,
    "a": 0,
  };
  _CONFIG.summary = {
    "nbrtitle" : 45 // Number of title per page
  };

  this.init = function(){
    imgLegends();
    aRef();
    headerFooter();
    createSummary();
    if(_CONFIG.settings["auto-refresh"]){
      setInterval("location.reload(true)", _CONFIG.settings["auto-interval"]);
    }
  };

  var imgLegends = function(){
    // Iteration over all the images
    $("img").each(function(){
      var title = $(this).attr("title");
      var ref = $(this).attr("ref");
      if( title ) {
        _CONFIG.counters["img"]++;
        $(this).after( "<div class='"+_CONFIG.class["img-legend"]+"'>"+title+" <sup>"+_CONFIG.counters["img"]+"</sup></div>");
        $("."+_CONFIG.class["imageography"]).append("<div>["+_CONFIG.counters["img"]+"] "+title+" <i>("+ref+"</i>)</div>");
      }
    });
  };

  // Creating references for all links
  var aRef = function(){
    $("a").each(function(){
      _CONFIG.counters["a"]++;
      var link = $(this).attr("href");
      var text = $(this).text();
      var ref = $(this).attr("ref");
      var show = text;
      if(ref !== undefined){ show = ref+"("+text+")"; }
      $(this).append(" <sup>["+_CONFIG.counters["a"]+"]</sup>");
      $("."+_CONFIG.class["bibliography"]).append("<div>"+
        "<span class='index'>["+_CONFIG.counters["a"]+"] </span>"+
        "<span class='text'>"+show+": "+
        "<span class='link'><a href='"+link+"'>"+link+"</a></div>");
    });
  };

  var _getHeader = function(){
    return "<div class="+_CONFIG.class["header"]+">"+
        ($("."+_CONFIG.class["def-header"]).html()||"")+"</div>"
  }

  // Creating summary from titles
  var headerFooter = function(){
    $("."+_CONFIG.class["page"]).each(function(i, page){
      var pagenbr = i+1;

      // Adding the header
      $(page).prepend(_getHeader());

      // Adding the footer
      $(page).append("<div class="+_CONFIG.class["footer"]+"></div>");

      // Adding page number
      var outof = "";
      if(_CONFIG.settings["page-outof"]){
      	outof = _CONFIG.settings["page-outof-symbole"]+$(".yld-page").length;
      }
      if(_CONFIG.settings["page-nbr"]){
        $(page).find("."+_CONFIG.class["footer"]).append(
          "<div class="+_CONFIG.class["pagenbr"]+">"+pagenbr+outof+"</div>");
      }
    });
  };

  var createSummary = function(){
    var JSP_TITLE_NBR = 0;
    var JSP_TITLE2_NBR = 0;
    var JSP_TITLE3_NBR = 0;
    var JSP_TITLE4_NBR = 0;
    var pagenbr = 0;
    var nbrtitle = 0;
    $("."+_CONFIG.class["page"]).each(function(i, page){
      pagenbr++;

      // Iteration over the title of the page
      $(page).find("."+_CONFIG.class["title"]).each(function(_, title){
        var t = $(title).text();
        var tag = $(this)[0].tagName;
        var h_nbr = "";
        nbrtitle++;

        // Refresh number of title for summary
        if(tag === "H1"){
          JSP_TITLE_NBR++; JSP_TITLE2_NBR = 0;
          h_nbr = JSP_TITLE_NBR;
        }
        if(tag === "H2"){
          JSP_TITLE2_NBR++; JSP_TITLE3_NBR = 0;
          h_nbr = JSP_TITLE_NBR+"."+JSP_TITLE2_NBR;
        }
        if(tag === "H3"){
          JSP_TITLE3_NBR++; JSP_TITLE4_NBR = 0;
          h_nbr = JSP_TITLE_NBR+"."+JSP_TITLE2_NBR+"."+JSP_TITLE3_NBR;
        }
        if(tag === "H4"){
          JSP_TITLE4_NBR++;
          h_nbr = JSP_TITLE_NBR+"."+JSP_TITLE2_NBR+"."+JSP_TITLE3_NBR+"."+JSP_TITLE4_NBR;
        }

        // Automatically add number to title
        if(_CONFIG.settings["page-nbr"]){
          $(title).text(h_nbr+" "+t);
        }

        if(nbrtitle%_CONFIG.summary["nbrtitle"] == 0){
          $("."+_CONFIG.class["page-summary"]).last().after("</div><div class='"+
          _CONFIG.class["page-summary"]+" "+
          _CONFIG.class["page"]+"'><div class='"+_CONFIG.class["summary"]+"'></div>" );
          $("."+_CONFIG.class["page-summary"]).last().prepend(_getHeader());
        }

        // Adding the title to the summary
        $("."+_CONFIG.class["summary"]).last().append(
          "<div class='"+_CONFIG.class["summary"]+"-"+tag+" "+
          _CONFIG.class["summary-entry"]+"'>"+h_nbr+" "+t+
          "<div>"+pagenbr+"</div></div>"
        );
      });
    });
  };

  // TODO: this is not working yet
  var adaptPage = function(){
    $("."+JSP_PAGE_CLASS).each(function(i, page){
    var totalH = 0;
    var pages = [$(this)];
    var page_elements = [];

    var tmp_content = [];
    $(this).children().each(function(){
      var elH = $(this).outerHeight();

      if( ( totalH + elH ) < JSP_PAGE_PIXEL ){
        tmp_content.push( $(this) );
        totalH += elH;
      }
      else{
        page_elements.push( tmp_content );
        tmp_content = [ $(this) ];
        totalH = elH;
        var new_page = createPage("?");
        pages[pages.length-1].after(new_page);
        pages.push(new_page);
      }
    });
    page_elements.push( tmp_content );

    // Adding previous elements
    for(var i=0; i<page_elements.length; i++){
      pages[i].text("").append(page_elements[i]);
    }
});
  };
}

var doc = new YL_Doc();
doc.init();
