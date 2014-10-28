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
require.register("jsprint/app", function(exports, require, module) {
var Jsprint, M, jsprint;

M = {
  config: require('jsprint/config')
};

Jsprint = (function() {
  var CONFIG;

  CONFIG = new M.config.Main();

  function Jsprint() {
    if (typeof console.info === "function") {
      console.info("Jsprint version:", CONFIG.getVersion());
    }
    this.init();
  }

  Jsprint.prototype.init = function() {
    this.renderImgLegends();
    this.headerFooter();
    this.aRef();
    return this.createSummary();
  };

  Jsprint.prototype.createSummary = function() {
    var JSP_TITLE2_NBR, JSP_TITLE3_NBR, JSP_TITLE4_NBR, JSP_TITLE_NBR, header, nbrtitle, pagenbr;
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
    header = this._getHeader();
    return $("." + CONFIG.getClass("page")).each(function(i, page) {
      pagenbr++;
      return $(page).find("." + CONFIG.getClass("title")).each(function(_, title) {
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
        $(title).text(h_nbr + " " + t);
        if (nbrtitle % CONFIG.get("summary", "nbrtitle") === 0) {
          $("." + CONFIG.getClass("page-summary")).last().after("</div><div class='" + CONFIG.getClass("page-summary") + " " + CONFIG.getClass("page") + "'><div class='" + CONFIG.getClass("summary") + "'></div>");
          $("." + CONFIG.getClass("page-summary")).last().prepend(header);
        }
        return $("." + CONFIG.getClass("summary")).last().append("<div class='" + CONFIG.getClass("summary") + "-" + tag + " " + CONFIG.getClass("summary-entry") + "'>" + h_nbr + " " + t + "<div>" + pagenbr + "</div></div>");
      });
    });
  };

  Jsprint.prototype.aRef = function() {
    var counter;
    counter = 0;
    return $("a").each(function() {
      var link, ref, show, text;
      counter++;
      link = void 0;
      ref = void 0;
      show = void 0;
      text = void 0;
      link = $(this).attr("href");
      text = $(this).text();
      ref = $(this).attr("ref");
      show = text;
      if (ref !== void 0) {
        show = ref + "(" + text + ")";
      }
      $(this).append(" <sup>[" + counter + "]</sup>");
      return $("." + CONFIG.getClass("bibliography")).append("<div>" + "<span class='index'>[" + counter + "] </span>" + "<span class='text'>" + show + ": " + "<span class='link'><a href='" + link + "'>" + link + "</a></div>");
    });
  };

  Jsprint.prototype.renderImgLegends = function() {
    var counter;
    counter = 0;
    return $("img").each(function() {
      var ref, title;
      title = $(this).attr("title");
      ref = $(this).attr("ref");
      if ((title != null) || (ref != null)) {
        counter++;
        $(this).after("          <div class='" + (CONFIG.getClass("img-legend")) + "'>          " + title + " <sup>" + counter + "</sup></div>");
        return $("." + CONFIG.getClass("imageography")).append("          <div>[" + counter + "] " + title + " <i>(" + ref + "</i>)</div>");
      }
    });
  };

  Jsprint.prototype._getHeader = function() {
    return "<div class=" + CONFIG.getClass("header") + ">" + ($("." + CONFIG.getClass("def-header")).html() || "") + "</div>";
  };

  Jsprint.prototype.headerFooter = function() {
    var _this = this;
    return $("." + CONFIG.getClass("page")).each(function(i, page) {
      var outof, pagenbr;
      outof = void 0;
      pagenbr = void 0;
      pagenbr = i + 1;
      $(page).prepend(_this._getHeader());
      $(page).append("<div class=" + CONFIG.getClass("footer") + "></div>");
      outof = "";
      outof = "/" + $("." + (CONFIG.getClass("page"))).length;
      return $(page).find("." + CONFIG.getClass("footer")).append("<div class=" + CONFIG.getClass("pagenbr") + ">" + pagenbr + outof + "</div>");
    });
  };

  return Jsprint;

})();

jsprint = new Jsprint();
});

;require.register("jsprint/config", function(exports, require, module) {
var Main, exp;

module.exports = exp = {};

exp.Main = Main = (function() {
  var CLASS, CONFIG, VERSION;

  CLASS = {
    title: "jsprint-title",
    page: "jsprint-page",
    header: "jsprint-page-header",
    footer: "jsprint-page-footer",
    summary: "jsprint-summary",
    bibliography: "jsprint-bibliography",
    imageography: "jsprint-imageography",
    pagenbr: "jsprint-pagenbr",
    "def-header": "jsprint-def-header",
    "page-summary": "jsprint-page-summary",
    "summary-entry": "jsprint-summary-entry",
    "img-legend": "jsprint-img-legend"
  };

  VERSION = "1.1";

  CONFIG = {
    summary: {
      nbrtitle: 45
    }
  };

  function Main() {
    null;
  }

  Main.prototype.print = function() {
    return console.log("CLASSES", CLASS);
  };

  Main.prototype.getClass = function(className) {
    return CLASS[className];
  };

  Main.prototype.getVersion = function() {
    return VERSION;
  };

  Main.prototype.get = function(configName, option) {
    return CONFIG[configName][option];
  };

  return Main;

})();
});

;
//# sourceMappingURL=jsprint.js.map