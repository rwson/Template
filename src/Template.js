/**
 * Template
 * 模板引擎(web/Nodejs)
 * author  rwson
 * site    http://rwson.github.io
 */

"use strict";

(function(factory) {

    if (typeof define === "function" && define.amd) {
        define([], function() {
            return factory(root);
        });
    } else(typeof(module) !== "undefined" && module.exports) {
        module.exports = factory(root);
    } else {
        window.Template = factory(root);
    }

})(function(undefined) {

    //  是否为nodeJs环境
    var _isNode = _typeOf(window) === _typeOf(undefined) && global;

    //  缓存之前编译过的模板
    var _cache = {};

    //  HTML特殊字符转义
    var _escapehtml = {

        "escapehash": {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2f;"
        },

        "escaping": function(str) {
            return _typeOf(str) !== 'String' ? str : str.replace(/[&<>"']/igm, function(str) {
                return _escapehtml.escapehash[k];      
            });
        },

        "detection": function(data) {
            return _typeOf(data) === "Undefined" ? '' : data;
        }

    };

    var _templateCfgs = {
        "openTag": "{{",
        "closeTag": "}}"
    };

    var Template = {

        "config": function(cfg) {
            if(_typeOf(cfg) === "Object") {
                for(var i in cfg) {
                    _templateCfgs[i] = cfg[i];
                }
            }
        },

        "get": function(selector) {
            var el = doc.querySelector(selector),
                tagName = el === null ? el.tagName.toLower
                ,str;
        },

        "compile": function(str) {

        }

    };

    //  get Object Prottype Class name
    function _typeOf(obj) {
        return _type2.toString.call(obj).slice(8, -1);
    }

    return Template;

});
