/**
 * Template
 * 模板引擎(web/Nodejs)
 * author  rwson
 * site    http://rwson.github.io
 */

"use strict";

(function(factory) {

    //  require
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return factory();
        });

        //  NodeJs
    } else if (typeof module !== typeof undefined && module.exports) {
        module.exports = factory();
    } else {

        //  script tag
        window.Template = factory();
    }

})(function(undefined) {

    //  缓存
    var _cache = {};

    //  取值表达式正则
    var _valueReg = /<%=(\s\S+?)%>/;

    //  js可执行语句正则
    var _evaluateReg = /<%(\s\S+?)%>/;

    //  HTML特殊字符
    var _htmlReg = /<|>|&/g;

    //  特殊转义正则
    var _escapeReg = /<$(\s\S+?)$>/;

    //  特殊字符
    var _charReg = /\\|'|\r|\n|\t|\u2028|\u2029/g;

    //  最终的匹配语句
    var _matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|<\$([\s\S]+?)\$>|$/g;

    //  HTML转义
    var _escapeHtml = {

        "escapehash": {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;"
        },

        "escaping": function(char) {
            return _escapeHtml.escapehash[char];
        }
    };

    //  匹配特殊字符
    var _escapeCharater = {

        "escapehash": {
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2f;",
            "\\": "\\\\",
            "\r": "",
            "\n": "",
            "\t": "",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        },

        "escaping": function(char) {
            return _escapeCharater.escapehash[char];
        }
    };

    var Template = {

        compile: function(str) {
            var fnBody = "";
            var index = 0;
            if (!_cache[str]) {
                fnBody = "var _temp = '';_temp += '";
                str.replace(_matcher, function(match, value, evaluate, escapeStr, offset) {
                    fnBody += str.slice(index, offset).replace(_charReg, _escapeCharater.escaping);

                    //  可执行语句
                    if (evaluate) {
                        fnBody += "';" + evaluate + "_temp += '";
                    }

                    //  <%= xxx[.yyy] %> -> 普通的取值表达式
                    if (value) {
                        fnBody += "' + " + value + " + '";
                    }

                    //  <$ xxx $> -> HTML特殊字符转义
                    if (escapeStr) {
                        fnBody += "' + " + ("obj." + escapeStr).replace(_htmlReg, _escapeHtml.escaping) + " + '";
                    }

                    //  更新下一次截取字符串的偏移地址
                    index = offset + match.length;
                });
                fnBody += "';return _temp;";

                //  塞到缓存
                _cache[str] = fnBody;
            } else {
                fnBody = _cache[str];
            }
            return fnBody;
        },

        render: function(fnBody, data) {
            return new Function("obj", fnBody)(data);
        }
    };

    //  get protype class on
    function _typeOf(obj) {
        return {}.toString.call(obj).slice(8, -1);
    }

    return Template;

});
