(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("jsprint/jsprint", function(exports, require, module) {
var YL_Doc, doc;

YL_Doc = void 0;

doc = void 0;

YL_Doc = function() {
  var aRef, adaptPage, createSummary, headerFooter, imgLegends, _CONFIG, _getHeader;
  aRef = void 0;
  adaptPage = void 0;
  createSummary = void 0;
  headerFooter = void 0;
  imgLegends = void 0;
  _CONFIG = void 0;
  _getHeader = void 0;
  _CONFIG = {};
  _CONFIG["class"] = {
    title: "yld-title",
    page: "yld-page",
    "def-header": "yld-def-header",
    header: "yld-page-header",
    footer: "yld-page-footer",
    "page-summary": "yld-page-summary",
    summary: "yld-summary",
    "summary-entry": "yld-summary-entry",
    "img-legend": "yld-img-legend",
    bibliography: "yld-bibliography",
    imageography: "yld-imageography",
    pagenbr: "yld-pagenbr"
  };
  _CONFIG.settings = {
    "title-nbr": true,
    "page-nbr": true,
    "page-outof": true,
    "page-outof-symbole": "/",
    "auto-refresh": false,
    "auto-interval": 2000
  };
  _CONFIG.counters = {
    img: 0,
    a: 0
  };
  _CONFIG.summary = {
    nbrtitle: 45
  };
  this.init = function() {
    imgLegends();
    aRef();
    headerFooter();
    createSummary();
    if (_CONFIG.settings["auto-refresh"]) {
      return setInterval("location.reload(true)", _CONFIG.settings["auto-interval"]);
    }
  };
  imgLegends = function() {
    return $("img").each(function() {
      var ref, title;
      ref = void 0;
      title = void 0;
      title = $(this).attr("title");
      ref = $(this).attr("ref");
      if (title) {
        _CONFIG.counters["img"]++;
        $(this).after("<div class='" + _CONFIG["class"]["img-legend"] + "'>" + title + " <sup>" + _CONFIG.counters["img"] + "</sup></div>");
        return $("." + _CONFIG["class"]["imageography"]).append("<div>[" + _CONFIG.counters["img"] + "] " + title + " <i>(" + ref + "</i>)</div>");
      }
    });
  };
  aRef = function() {
    return $("a").each(function() {
      var link, ref, show, text;
      link = void 0;
      ref = void 0;
      show = void 0;
      text = void 0;
      _CONFIG.counters["a"]++;
      link = $(this).attr("href");
      text = $(this).text();
      ref = $(this).attr("ref");
      show = text;
      if (ref !== void 0) {
        show = ref + "(" + text + ")";
      }
      $(this).append(" <sup>[" + _CONFIG.counters["a"] + "]</sup>");
      return $("." + _CONFIG["class"]["bibliography"]).append("<div>" + "<span class='index'>[" + _CONFIG.counters["a"] + "] </span>" + "<span class='text'>" + show + ": " + "<span class='link'><a href='" + link + "'>" + link + "</a></div>");
    });
  };
  _getHeader = function() {
    return "<div class=" + _CONFIG["class"]["header"] + ">" + ($("." + _CONFIG["class"]["def-header"]).html() || "") + "</div>";
  };
  headerFooter = function() {
    return $("." + _CONFIG["class"]["page"]).each(function(i, page) {
      var outof, pagenbr;
      outof = void 0;
      pagenbr = void 0;
      pagenbr = i + 1;
      $(page).prepend(_getHeader());
      $(page).append("<div class=" + _CONFIG["class"]["footer"] + "></div>");
      outof = "";
      if (_CONFIG.settings["page-outof"]) {
        outof = _CONFIG.settings["page-outof-symbole"] + $(".yld-page").length;
      }
      if (_CONFIG.settings["page-nbr"]) {
        return $(page).find("." + _CONFIG["class"]["footer"]).append("<div class=" + _CONFIG["class"]["pagenbr"] + ">" + pagenbr + outof + "</div>");
      }
    });
  };
  createSummary = function() {
    var JSP_TITLE2_NBR, JSP_TITLE3_NBR, JSP_TITLE4_NBR, JSP_TITLE_NBR, nbrtitle, pagenbr;
    JSP_TITLE2_NBR = void 0;
    JSP_TITLE3_NBR = void 0;
    JSP_TITLE4_NBR = void 0;
    JSP_TITLE_NBR = void 0;
    nbrtitle = void 0;
    pagenbr = void 0;
    JSP_TITLE_NBR = 0;
    JSP_TITLE2_NBR = 0;
    JSP_TITLE3_NBR = 0;
    JSP_TITLE4_NBR = 0;
    pagenbr = 0;
    nbrtitle = 0;
    return $("." + _CONFIG["class"]["page"]).each(function(i, page) {
      pagenbr++;
      return $(page).find("." + _CONFIG["class"]["title"]).each(function(_, title) {
        var h_nbr, t, tag;
        h_nbr = void 0;
        t = void 0;
        tag = void 0;
        t = $(title).text();
        tag = $(this)[0].tagName;
        h_nbr = "";
        nbrtitle++;
        if (tag === "H1") {
          JSP_TITLE_NBR++;
          JSP_TITLE2_NBR = 0;
          h_nbr = JSP_TITLE_NBR;
        }
        if (tag === "H2") {
          JSP_TITLE2_NBR++;
          JSP_TITLE3_NBR = 0;
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR;
        }
        if (tag === "H3") {
          JSP_TITLE3_NBR++;
          JSP_TITLE4_NBR = 0;
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR + "." + JSP_TITLE3_NBR;
        }
        if (tag === "H4") {
          JSP_TITLE4_NBR++;
          h_nbr = JSP_TITLE_NBR + "." + JSP_TITLE2_NBR + "." + JSP_TITLE3_NBR + "." + JSP_TITLE4_NBR;
        }
        if (_CONFIG.settings["page-nbr"]) {
          $(title).text(h_nbr + " " + t);
        }
        if (nbrtitle % _CONFIG.summary["nbrtitle"] === 0) {
          $("." + _CONFIG["class"]["page-summary"]).last().after("</div><div class='" + _CONFIG["class"]["page-summary"] + " " + _CONFIG["class"]["page"] + "'><div class='" + _CONFIG["class"]["summary"] + "'></div>");
          $("." + _CONFIG["class"]["page-summary"]).last().prepend(_getHeader());
        }
        return $("." + _CONFIG["class"]["summary"]).last().append("<div class='" + _CONFIG["class"]["summary"] + "-" + tag + " " + _CONFIG["class"]["summary-entry"] + "'>" + h_nbr + " " + t + "<div>" + pagenbr + "</div></div>");
      });
    });
  };
  return adaptPage = function() {
    return $("." + JSP_PAGE_CLASS).each(function(i, page) {
      var page_elements, pages, tmp_content, totalH, _results;
      page_elements = void 0;
      pages = void 0;
      tmp_content = void 0;
      totalH = void 0;
      totalH = 0;
      pages = [$(this)];
      page_elements = [];
      tmp_content = [];
      $(this).children().each(function() {
        var elH, new_page;
        elH = void 0;
        new_page = void 0;
        elH = $(this).outerHeight();
        if ((totalH + elH) < JSP_PAGE_PIXEL) {
          tmp_content.push($(this));
          return totalH += elH;
        } else {
          page_elements.push(tmp_content);
          tmp_content = [$(this)];
          totalH = elH;
          new_page = createPage("?");
          pages[pages.length - 1].after(new_page);
          return pages.push(new_page);
        }
      });
      page_elements.push(tmp_content);
      i = 0;
      _results = [];
      while (i < page_elements.length) {
        pages[i].text("").append(page_elements[i]);
        _results.push(i++);
      }
      return _results;
    });
  };
};

doc = new YL_Doc();

doc.init();
});

;
//# sourceMappingURL=jsprint.js.map