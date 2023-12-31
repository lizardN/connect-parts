(function(t) {
    "use strict";

    function e(t) {
        return RegExp("(^|\\s+)" + t + "(\\s+|$)")
    }

    function i(t, e) {
        var i = o(t, e) ? r : n;
        i(t, e)
    }
    var o, n, r;
    "classList" in document.documentElement ? (o = function(t, e) {
        return t.classList.contains(e)
    }, n = function(t, e) {
        t.classList.add(e)
    }, r = function(t, e) {
        t.classList.remove(e)
    }) : (o = function(t, i) {
        return e(i).test(t.className)
    }, n = function(t, e) {
        o(t, e) || (t.className = t.className + " " + e)
    }, r = function(t, i) {
        t.className = t.className.replace(e(i), " ")
    });
    var s = {
        hasClass: o,
        addClass: n,
        removeClass: r,
        toggleClass: i,
        has: o,
        add: n,
        remove: r,
        toggle: i
    };
    "function" == typeof define && define.amd ? define(s) : "object" == typeof exports ? module.exports = s : t.classie = s
})(window),
function(t) {
    "use strict";

    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        o = function() {};
    i.addEventListener ? o = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (o = function(t, i, o) {
        t[i + o] = o.handleEvent ? function() {
            var i = e(t);
            o.handleEvent.call(o, i)
        } : function() {
            var i = e(t);
            o.call(t, i)
        }, t.attachEvent("on" + i, t[i + o])
    });
    var n = function() {};
    i.removeEventListener ? n = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (n = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (o) {
            t[e + i] = void 0
        }
    });
    var r = {
        bind: o,
        unbind: n
    };
    "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function(t) {
    "use strict";

    function e(t) {
        "function" == typeof t && (e.isReady ? t() : s.push(t))
    }

    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== r.readyState;
        e.isReady || i || o()
    }

    function o() {
        e.isReady = !0;
        for (var t = 0, i = s.length; i > t; t++) {
            var o = s[t];
            o()
        }
    }

    function n(n) {
        return "complete" === r.readyState ? o() : (n.bind(r, "DOMContentLoaded", i), n.bind(r, "readystatechange", i), n.bind(t, "load", i)), e
    }
    var r = t.document,
        s = [];
    e.isReady = !1, "function" == typeof define && define.amd ? define(["eventie/eventie"], n) : "object" == typeof exports ? module.exports = n(require("eventie")) : t.docReady = n(t.eventie)
}(window),
function(t) {
    "use strict";

    function e(t) {
        if (t) {
            if ("string" == typeof o[t]) return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, n = 0, r = i.length; r > n; n++)
                if (e = i[n] + t, "string" == typeof o[e]) return e
        }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
        o = document.documentElement.style;
    "function" == typeof define && define.amd ? define(function() {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window),
function(t) {
    "use strict";

    function e(t) {
        var e = parseFloat(t),
            i = -1 === t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0, i = r.length; i > e; e++) {
            var o = r[e];
            t[o] = 0
        }
        return t
    }

    function o(o) {
        function s() {
            if (!f) {
                f = !0;
                var i = t.getComputedStyle;
                if (h = function() {
                        var t = i ? function(t) {
                            return i(t, null)
                        } : function(t) {
                            return t.currentStyle
                        };
                        return function(e) {
                            var i = t(e);
                            return i || n("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? " + "See http://bit.ly/getsizeiframe"), i
                        }
                    }(), p = o("boxSizing")) {
                    var r = document.createElement("div");
                    r.style.width = "200px", r.style.padding = "1px 2px 3px 4px", r.style.borderStyle = "solid", r.style.borderWidth = "1px 2px 3px 4px", r.style[p] = "border-box";
                    var s = document.body || document.documentElement;
                    s.appendChild(r);
                    var a = h(r);
                    c = 200 === e(a.width), s.removeChild(r)
                }
            }
        }

        function a(t) {
            if (s(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var o = h(t);
                if ("none" === o.display) return i();
                var n = {};
                n.width = t.offsetWidth, n.height = t.offsetHeight;
                for (var a = n.isBorderBox = !(!p || !o[p] || "border-box" !== o[p]), f = 0, l = r.length; l > f; f++) {
                    var d = r[f],
                        m = o[d];
                    m = u(t, m);
                    var y = parseFloat(m);
                    n[d] = isNaN(y) ? 0 : y
                }
                var g = n.paddingLeft + n.paddingRight,
                    v = n.paddingTop + n.paddingBottom,
                    b = n.marginLeft + n.marginRight,
                    x = n.marginTop + n.marginBottom,
                    w = n.borderLeftWidth + n.borderRightWidth,
                    I = n.borderTopWidth + n.borderBottomWidth,
                    _ = a && c,
                    z = e(o.width);
                z !== !1 && (n.width = z + (_ ? 0 : g + w));
                var L = e(o.height);
                return L !== !1 && (n.height = L + (_ ? 0 : v + I)), n.innerWidth = n.width - (g + w), n.innerHeight = n.height - (v + I), n.outerWidth = n.width + b, n.outerHeight = n.height + x, n
            }
        }

        function u(t, e) {
            if (getComputedStyle || -1 === e.indexOf("%")) return e;
            var i = t.style,
                o = i.left,
                n = t.runtimeStyle,
                r = n && n.left;
            return r && (n.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = o, r && (n.left = r), e
        }
        var h, p, c, f = !1;
        return a
    }
    var n = "undefined" == typeof console ? noop : function(t) {
            console.error(t)
        },
        r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define(["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("desandro-get-style-property")) : t.getSize = o(t.getStyleProperty)
}(window),
function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var o = t.prototype,
        n = this,
        r = n.EventEmitter;
    o.getListeners = function(t) {
        var e, i, o = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
        } else e = o[t] || (o[t] = []);
        return e
    }, o.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, o.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, o.addListener = function(t, i) {
        var o, n = this.getListenersAsObject(t),
            r = "object" == typeof i;
        for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
            listener: i,
            once: !1
        });
        return this
    }, o.on = i("addListener"), o.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, o.once = i("addOnceListener"), o.defineEvent = function(t) {
        return this.getListeners(t), this
    }, o.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, o.removeListener = function(t, i) {
        var o, n, r = this.getListenersAsObject(t);
        for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
        return this
    }, o.off = i("removeListener"), o.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, o.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, o.manipulateListeners = function(t, e, i) {
        var o, n, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--;) r.call(this, e, i[o]);
        else
            for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
        return this
    }, o.removeEvent = function(t) {
        var e, i = typeof t,
            o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
            for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this
    }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
        var i, o, n, r, s = this.getListenersAsObject(t);
        for (n in s)
            if (s.hasOwnProperty(n))
                for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, o.trigger = i("emitEvent"), o.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, o.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, o._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, o._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return n.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : n.EventEmitter = t
}.call(this),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(i, o) {
            return e(t, i, o)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
    }(window, function(t, e, i) {
        "use strict";

        function o(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function n(t) {
            return "[object Array]" === f.call(t)
        }

        function r(t) {
            var e = [];
            if (n(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0, o = t.length; o > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function s(t, e, i) {
            if (!(this instanceof s)) return new s(t, e);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = o({}, this.options), "function" == typeof e ? i = e : o(this.options, e), i && this.on("always", i), this.getImages(), h && (this.jqDeferred = new h.Deferred);
            var n = this;
            setTimeout(function() {
                n.check()
            })
        }

        function a(t) {
            this.img = t
        }

        function u(t) {
            this.src = t, l[t] = this
        }
        var h = t.jQuery,
            p = t.console,
            c = p !== void 0,
            f = Object.prototype.toString;
        s.prototype = new e, s.prototype.options = {}, s.prototype.getImages = function() {
            this.images = [];
            for (var t = 0, e = this.elements.length; e > t; t++) {
                var i = this.elements[t];
                "IMG" === i.nodeName && this.addImage(i);
                var o = i.nodeType;
                if (o && (1 === o || 9 === o || 11 === o))
                    for (var n = i.querySelectorAll("img"), r = 0, s = n.length; s > r; r++) {
                        var a = n[r];
                        this.addImage(a)
                    }
            }
        }, s.prototype.addImage = function(t) {
            var e = new a(t);
            this.images.push(e)
        }, s.prototype.check = function() {
            function t(t, n) {
                return e.options.debug && c && p.log("confirm", t, n), e.progress(t), i++, i === o && e.complete(), !0
            }
            var e = this,
                i = 0,
                o = this.images.length;
            if (this.hasAnyBroken = !1, !o) return this.complete(), void 0;
            for (var n = 0; o > n; n++) {
                var r = this.images[n];
                r.on("confirm", t), r.check()
            }
        }, s.prototype.progress = function(t) {
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
            var e = this;
            setTimeout(function() {
                e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
            })
        }, s.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var e = this;
            setTimeout(function() {
                if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                    var i = e.hasAnyBroken ? "reject" : "resolve";
                    e.jqDeferred[i](e)
                }
            })
        }, h && (h.fn.imagesLoaded = function(t, e) {
            var i = new s(this, t, e);
            return i.jqDeferred.promise(h(this))
        }), a.prototype = new e, a.prototype.check = function() {
            var t = l[this.img.src] || new u(this.img.src);
            if (t.isConfirmed) return this.confirm(t.isLoaded, "cached was confirmed"), void 0;
            if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var e = this;
            t.on("confirm", function(t, i) {
                return e.confirm(t.isLoaded, i), !0
            }), t.check()
        }, a.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("confirm", this, e)
        };
        var l = {};
        return u.prototype = new e, u.prototype.check = function() {
            if (!this.isChecked) {
                var t = new Image;
                i.bind(t, "load", this), i.bind(t, "error", this), t.src = this.src, this.isChecked = !0
            }
        }, u.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, u.prototype.onload = function(t) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(t)
        }, u.prototype.onerror = function(t) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
        }, u.prototype.confirm = function(t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
        }, u.prototype.unbindProxyEvents = function(t) {
            i.unbind(t.target, "load", this), i.unbind(t.target, "error", this)
        }, s
    }),
    function(t) {
        "use strict";

        function e(t, e) {
            return t[s](e)
        }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function o(t, e) {
            i(t);
            for (var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length; r > n; n++)
                if (o[n] === t) return !0;
            return !1
        }

        function n(t, o) {
            return i(t), e(t, o)
        }
        var r, s = function() {
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, o = e.length; o > i; i++) {
                var n = e[i],
                    r = n + "MatchesSelector";
                if (t[r]) return r
            }
        }();
        if (s) {
            var a = document.createElement("div"),
                u = e(a, "div");
            r = u ? e : n
        } else r = o;
        "function" == typeof define && define.amd ? define(function() {
            return r
        }) : "object" == typeof exports ? module.exports = r : window.matchesSelector = r
    }(Element.prototype),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function o(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }

        function n(t, n, r) {
            function a(t, e) {
                t && (this.element = t, this.layout = e, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var u = r("transition"),
                h = r("transform"),
                p = u && h,
                c = !!r("perspective"),
                f = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                }[u],
                l = ["transform", "transition", "transitionDuration", "transitionProperty"],
                d = function() {
                    for (var t = {}, e = 0, i = l.length; i > e; e++) {
                        var o = l[e],
                            n = r(o);
                        n && n !== o && (t[o] = n)
                    }
                    return t
                }();
            e(a.prototype, t.prototype), a.prototype._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, a.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, a.prototype.getSize = function() {
                this.size = n(this.element)
            }, a.prototype.css = function(t) {
                var e = this.element.style;
                for (var i in t) {
                    var o = d[i] || i;
                    e[o] = t[i]
                }
            }, a.prototype.getPosition = function() {
                var t = s(this.element),
                    e = this.layout.options,
                    i = e.isOriginLeft,
                    o = e.isOriginTop,
                    n = parseInt(t[i ? "left" : "right"], 10),
                    r = parseInt(t[o ? "top" : "bottom"], 10);
                n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
                var a = this.layout.size;
                n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
            }, a.prototype.layoutPosition = function() {
                var t = this.layout.size,
                    e = this.layout.options,
                    i = {};
                e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
            };
            var m = c ? function(t, e) {
                return "translate3d(" + t + "px, " + e + "px, 0)"
            } : function(t, e) {
                return "translate(" + t + "px, " + e + "px)"
            };
            a.prototype._transitionTo = function(t, e) {
                this.getPosition();
                var i = this.position.x,
                    o = this.position.y,
                    n = parseInt(t, 10),
                    r = parseInt(e, 10),
                    s = n === this.position.x && r === this.position.y;
                if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
                var a = t - i,
                    u = e - o,
                    h = {},
                    p = this.layout.options;
                a = p.isOriginLeft ? a : -a, u = p.isOriginTop ? u : -u, h.transform = m(a, u), this.transition({
                    to: h,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }, a.prototype.goTo = function(t, e) {
                this.setPosition(t, e), this.layoutPosition()
            }, a.prototype.moveTo = p ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
                this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
            }, a.prototype._nonTransition = function(t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
            }, a.prototype._transition = function(t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var o = this.element.offsetHeight;
                    o = null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            };
            var y = h && o(h) + ",opacity";
            a.prototype.enableTransition = function() {
                this.isTransitioning || (this.css({
                    transitionProperty: y,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(f, this, !1))
            }, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
                this.ontransitionend(t)
            }, a.prototype.onotransitionend = function(t) {
                this.ontransitionend(t)
            };
            var g = {
                "-webkit-transform": "transform",
                "-moz-transform": "transform",
                "-o-transform": "transform"
            };
            a.prototype.ontransitionend = function(t) {
                if (t.target === this.element) {
                    var e = this._transn,
                        o = g[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                        var n = e.onEnd[o];
                        n.call(this), delete e.onEnd[o]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, a.prototype.disableTransition = function() {
                this.removeTransitionStyles(), this.element.removeEventListener(f, this, !1), this.isTransitioning = !1
            }, a.prototype._removeStyles = function(t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e)
            };
            var v = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return a.prototype.removeTransitionStyles = function() {
                this.css(v)
            }, a.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, a.prototype.remove = function() {
                if (!u || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
                var t = this;
                this.on("transitionEnd", function() {
                    return t.removeElem(), !0
                }), this.hide()
            }, a.prototype.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0
                })
            }, a.prototype.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: {
                        opacity: function() {
                            this.isHidden && this.css({
                                display: "none"
                            })
                        }
                    }
                })
            }, a.prototype.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, a
        }
        var r = t.getComputedStyle,
            s = r ? function(t) {
                return r(t, null)
            } : function(t) {
                return t.currentStyle
            };
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === c.call(t)
        }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) {
            var i = l(e, t); - 1 !== i && e.splice(i, 1)
        }

        function r(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        }

        function s(i, s, c, l, d, m) {
            function y(t, i) {
                if ("string" == typeof t && (t = a.querySelector(t)), !t || !f(t)) return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
                this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
                var o = ++g;
                this.element.outlayerGUID = o, v[o] = this, this._create(), this.options.isInitLayout && this.layout()
            }
            var g = 0,
                v = {};
            return y.namespace = "outlayer", y.Item = m, y.defaults = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, e(y.prototype, c.prototype), y.prototype.option = function(t) {
                e(this.options, t)
            }, y.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, y.prototype.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }, y.prototype._itemize = function(t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
                    var s = e[n],
                        a = new i(s, this);
                    o.push(a)
                }
                return o
            }, y.prototype._filterFindItemElements = function(t) {
                t = o(t);
                for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
                    var s = t[n];
                    if (f(s))
                        if (e) {
                            d(s, e) && i.push(s);
                            for (var a = s.querySelectorAll(e), u = 0, h = a.length; h > u; u++) i.push(a[u])
                        } else i.push(s)
                }
                return i
            }, y.prototype.getItemElements = function() {
                for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
                return t
            }, y.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, t), this._isLayoutInited = !0
            }, y.prototype._init = y.prototype.layout, y.prototype._resetLayout = function() {
                this.getSize()
            }, y.prototype.getSize = function() {
                this.size = l(this.element)
            }, y.prototype._getMeasurement = function(t, e) {
                var i, o = this.options[t];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : f(o) && (i = o), this[t] = i ? l(i)[e] : o) : this[t] = 0
            }, y.prototype.layoutItems = function(t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
            }, y.prototype._getItemsForLayout = function(t) {
                for (var e = [], i = 0, o = t.length; o > i; i++) {
                    var n = t[i];
                    n.isIgnored || e.push(n)
                }
                return e
            }, y.prototype._layoutItems = function(t, e) {
                function i() {
                    o.emitEvent("layoutComplete", [o, t])
                }
                var o = this;
                if (!t || !t.length) return i(), void 0;
                this._itemsOn(t, "layout", i);
                for (var n = [], r = 0, s = t.length; s > r; r++) {
                    var a = t[r],
                        u = this._getItemLayoutPosition(a);
                    u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
                }
                this._processLayoutQueue(n)
            }, y.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, y.prototype._processLayoutQueue = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    this._positionItem(o.item, o.x, o.y, o.isInstant)
                }
            }, y.prototype._positionItem = function(t, e, i, o) {
                o ? t.goTo(e, i) : t.moveTo(e, i)
            }, y.prototype._postLayout = function() {
                this.resizeContainer()
            }, y.prototype.resizeContainer = function() {
                if (this.options.isResizingContainer) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
                }
            }, y.prototype._getContainerSize = p, y.prototype._setContainerMeasure = function(t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
                }
            }, y.prototype._itemsOn = function(t, e, i) {
                function o() {
                    return n++, n === r && i.call(s), !0
                }
                for (var n = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
                    var h = t[a];
                    h.on(e, o)
                }
            }, y.prototype.ignore = function(t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, y.prototype.unignore = function(t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, y.prototype.stamp = function(t) {
                if (t = this._find(t)) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        this.ignore(o)
                    }
                }
            }, y.prototype.unstamp = function(t) {
                if (t = this._find(t))
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        n(o, this.stamps), this.unignore(o)
                    }
            }, y.prototype._find = function(t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0
            }, y.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; e > t; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            }, y.prototype._getBoundingRect = function() {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }, y.prototype._manageStamp = p, y.prototype._getElementOffset = function(t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    o = l(t),
                    n = {
                        left: e.left - i.left - o.marginLeft,
                        top: e.top - i.top - o.marginTop,
                        right: i.right - e.right - o.marginRight,
                        bottom: i.bottom - e.bottom - o.marginBottom
                    };
                return n
            }, y.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, y.prototype.bindResize = function() {
                this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
            }, y.prototype.unbindResize = function() {
                this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
            }, y.prototype.onresize = function() {
                function t() {
                    e.resize(), delete e.resizeTimeout
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var e = this;
                this.resizeTimeout = setTimeout(t, 100)
            }, y.prototype.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, y.prototype.needsResizeLayout = function() {
                var t = l(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth
            }, y.prototype.addItems = function(t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e
            }, y.prototype.appended = function(t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, y.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
                }
            }, y.prototype.reveal = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.reveal()
                    }
            }, y.prototype.hide = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.hide()
                    }
            }, y.prototype.getItem = function(t) {
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    if (o.element === t) return o
                }
            }, y.prototype.getItems = function(t) {
                if (t && t.length) {
                    for (var e = [], i = 0, o = t.length; o > i; i++) {
                        var n = t[i],
                            r = this.getItem(n);
                        r && e.push(r)
                    }
                    return e
                }
            }, y.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (e && e.length) {
                    this._itemsOn(e, "remove", function() {
                        this.emitEvent("removeComplete", [this, e])
                    });
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        s.remove(), n(s, this.items)
                    }
                }
            }, y.prototype.destroy = function() {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "";
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    o.destroy()
                }
                this.unbindResize();
                var n = this.element.outlayerGUID;
                delete v[n], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
            }, y.data = function(t) {
                var e = t && t.outlayerGUID;
                return e && v[e]
            }, y.create = function(t, i) {
                function o() {
                    y.apply(this, arguments)
                }
                return Object.create ? o.prototype = Object.create(y.prototype) : e(o.prototype, y.prototype), o.prototype.constructor = o, o.defaults = e({}, y.defaults), e(o.defaults, i), o.prototype.settings = {}, o.namespace = t, o.data = y.data, o.Item = function() {
                    m.apply(this, arguments)
                }, o.Item.prototype = new m, s(function() {
                    for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, p = i.length; p > s; s++) {
                        var c, f = i[s],
                            l = f.getAttribute(n);
                        try {
                            c = l && JSON.parse(l)
                        } catch (d) {
                            u && u.error("Error parsing " + n + " on " + f.nodeName.toLowerCase() + (f.id ? "#" + f.id : "") + ": " + d);
                            continue
                        }
                        var m = new o(f, c);
                        h && h.data(f, t, m)
                    }
                }), h && h.bridget && h.bridget(t, o), o
            }, y.Item = m, y
        }
        var a = t.document,
            u = t.console,
            h = t.jQuery,
            p = function() {},
            c = Object.prototype.toString,
            f = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
                return t instanceof HTMLElement
            } : function(t) {
                return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
            },
            l = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : "object" == typeof exports ? module.exports = s(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            var o = t.create("masonry");
            return o.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var t = this.cols;
                for (this.colYs = []; t--;) this.colYs.push(0);
                this.maxY = 0
            }, o.prototype.measureColumns = function() {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth
                }
                this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, o.prototype.getContainerWidth = function() {
                var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                    i = e(t);
                this.containerWidth = i && i.innerWidth
            }, o.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    o = e && 1 > e ? "round" : "ceil",
                    n = Math[o](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), u = {
                        x: this.columnWidth * a,
                        y: s
                    }, h = s + t.size.outerHeight, p = this.cols + 1 - r.length, c = 0; p > c; c++) this.colYs[a + c] = h;
                return u
            }, o.prototype._getColGroup = function(t) {
                if (2 > t) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                    var n = this.colYs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, o.prototype._manageStamp = function(t) {
                var i = e(t),
                    o = this._getElementOffset(t),
                    n = this.options.isOriginLeft ? o.left : o.right,
                    r = n + i.outerWidth,
                    s = Math.floor(n / this.columnWidth);
                s = Math.max(0, s);
                var a = Math.floor(r / this.columnWidth);
                a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
                for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, h = s; a >= h; h++) this.colYs[h] = Math.max(u, this.colYs[h])
            }, o.prototype._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
            }, o.prototype._getContainerFitWidth = function() {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }, o.prototype.needsResizeLayout = function() {
                var t = this.containerWidth;
                return this.getContainerWidth(), t !== this.containerWidth
            }, o
        }
        var i = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; o > i; i++) {
                var n = t[i];
                if (n === e) return i
            }
            return -1
        };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            function e() {
                t.Item.apply(this, arguments)
            }
            e.prototype = new t.Item, e.prototype._create = function() {
                this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
            }, e.prototype.updateSortData = function() {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this)
                    }
                }
            };
            var i = e.prototype.destroy;
            return e.prototype.destroy = function() {
                i.apply(this, arguments), this.css({
                    display: ""
                })
            }, e
        }
        "function" == typeof define && define.amd ? define(["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            function i(t) {
                this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
            }
            return function() {
                function t(t) {
                    return function() {
                        return e.prototype[t].apply(this.isotope, arguments)
                    }
                }
                for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
                    var s = o[n];
                    i.prototype[s] = t(s)
                }
            }(), i.prototype.needsVerticalResizeLayout = function() {
                var e = t(this.isotope.element),
                    i = this.isotope.size && e;
                return i && e.innerHeight !== this.isotope.size.innerHeight
            }, i.prototype._getMeasurement = function() {
                this.isotope._getMeasurement.apply(this, arguments)
            }, i.prototype.getColumnWidth = function() {
                this.getSegmentSize("column", "Width")
            }, i.prototype.getRowHeight = function() {
                this.getSegmentSize("row", "Height")
            }, i.prototype.getSegmentSize = function(t, e) {
                var i = t + e,
                    o = "outer" + e;
                if (this._getMeasurement(i, o), !this[i]) {
                    var n = this.getFirstItemSize();
                    this[i] = n && n[o] || this.isotope.size["inner" + e]
                }
            }, i.prototype.getFirstItemSize = function() {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element)
            }, i.prototype.layout = function() {
                this.isotope.layout.apply(this.isotope, arguments)
            }, i.prototype.getSize = function() {
                this.isotope.getSize(), this.size = this.isotope.size
            }, i.modes = {}, i.create = function(t, e) {
                function o() {
                    i.apply(this, arguments)
                }
                return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
            }, i
        }
        "function" == typeof define && define.amd ? define(["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === p.call(t)
        }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) {
            var i = c(e, t); - 1 !== i && e.splice(i, 1)
        }

        function r(t, i, r, u, p) {
            function c(t, e) {
                return function(i, o) {
                    for (var n = 0, r = t.length; r > n; n++) {
                        var s = t[n],
                            a = i.sortData[s],
                            u = o.sortData[s];
                        if (a > u || u > a) {
                            var h = void 0 !== e[s] ? e[s] : e,
                                p = h ? 1 : -1;
                            return (a > u ? 1 : -1) * p
                        }
                    }
                    return 0
                }
            }
            var f = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
            f.Item = u, f.LayoutMode = p, f.prototype._create = function() {
                this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
                for (var e in p.modes) this._initLayoutMode(e)
            }, f.prototype.reloadItems = function() {
                this.itemGUID = 0, t.prototype.reloadItems.call(this)
            }, f.prototype._itemize = function() {
                for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
                    var n = e[i];
                    n.id = this.itemGUID++
                }
                return this._updateItemsSortData(e), e
            }, f.prototype._initLayoutMode = function(t) {
                var i = p.modes[t],
                    o = this.options[t] || {};
                this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
            }, f.prototype.layout = function() {
                return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
            }, f.prototype._layout = function() {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
            }, f.prototype.arrange = function(t) {
                this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
            }, f.prototype._init = f.prototype.arrange, f.prototype._getIsInstant = function() {
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                return this._isInstant = t, t
            }, f.prototype._filter = function(t) {
                function e() {
                    c.reveal(n), c.hide(r)
                }
                var i = this.options.filter;
                i = i || "*";
                for (var o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, u = t.length; u > a; a++) {
                    var h = t[a];
                    if (!h.isIgnored) {
                        var p = s(h);
                        p && o.push(h), p && h.isHidden ? n.push(h) : p || h.isHidden || r.push(h)
                    }
                }
                var c = this;
                return this._isInstant ? this._noTransition(e) : e(), o
            }, f.prototype._getFilterTest = function(t) {
                return s && this.options.isJQueryFiltering ? function(e) {
                    return s(e.element).is(t)
                } : "function" == typeof t ? function(e) {
                    return t(e.element)
                } : function(e) {
                    return r(e.element, t)
                }
            }, f.prototype.updateSortData = function(t) {
                var e;
                t ? (t = o(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
            }, f.prototype._getSorters = function() {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = l(i)
                }
            }, f.prototype._updateItemsSortData = function(t) {
                for (var e = t && t.length, i = 0; e && e > i; i++) {
                    var o = t[i];
                    o.updateSortData()
                }
            };
            var l = function() {
                function t(t) {
                    if ("string" != typeof t) return t;
                    var i = a(t).split(" "),
                        o = i[0],
                        n = o.match(/^\[(.+)\]$/),
                        r = n && n[1],
                        s = e(r, o),
                        u = f.sortDataParsers[i[1]];
                    return t = u ? function(t) {
                        return t && u(s(t))
                    } : function(t) {
                        return t && s(t)
                    }
                }

                function e(t, e) {
                    var i;
                    return i = t ? function(e) {
                        return e.getAttribute(t)
                    } : function(t) {
                        var i = t.querySelector(e);
                        return i && h(i)
                    }
                }
                return t
            }();
            f.sortDataParsers = {
                parseInt: function(t) {
                    return parseInt(t, 10)
                },
                parseFloat: function(t) {
                    return parseFloat(t)
                }
            }, f.prototype._sort = function() {
                var t = this.options.sortBy;
                if (t) {
                    var e = [].concat.apply(t, this.sortHistory),
                        i = c(e, this.options.sortAscending);
                    this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
                }
            }, f.prototype._mode = function() {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw Error("No layout mode: " + t);
                return e.options = this.options[t], e
            }, f.prototype._resetLayout = function() {
                t.prototype._resetLayout.call(this), this._mode()._resetLayout()
            }, f.prototype._getItemLayoutPosition = function(t) {
                return this._mode()._getItemLayoutPosition(t)
            }, f.prototype._manageStamp = function(t) {
                this._mode()._manageStamp(t)
            }, f.prototype._getContainerSize = function() {
                return this._mode()._getContainerSize()
            }, f.prototype.needsResizeLayout = function() {
                return this._mode().needsResizeLayout()
            }, f.prototype.appended = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i)
                }
            }, f.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps();
                    var o = this._filterRevealAdded(e);
                    this.layoutItems(i), this.filteredItems = o.concat(this.filteredItems)
                }
            }, f.prototype._filterRevealAdded = function(t) {
                var e = this._noTransition(function() {
                    return this._filter(t)
                });
                return this.layoutItems(e, !0), this.reveal(e), t
            }, f.prototype.insert = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i, o, n = e.length;
                    for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
                    var r = this._filter(e);
                    for (this._noTransition(function() {
                            this.hide(r)
                        }), i = 0; n > i; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
                    this.reveal(r)
                }
            };
            var d = f.prototype.remove;
            return f.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (d.call(this, t), e && e.length)
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        n(s, this.filteredItems)
                    }
            }, f.prototype.shuffle = function() {
                for (var t = 0, e = this.items.length; e > t; t++) {
                    var i = this.items[t];
                    i.sortData.random = Math.random()
                }
                this.options.sortBy = "random", this._sort(), this._layout()
            }, f.prototype._noTransition = function(t) {
                var e = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var i = t.call(this);
                return this.options.transitionDuration = e, i
            }, f.prototype.getFilteredItemElements = function() {
                for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
                return t
            }, f
        }
        var s = t.jQuery,
            a = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            u = document.documentElement,
            h = u.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            p = Object.prototype.toString,
            c = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "./item", "./layout-mode", "./layout-modes/masonry", "./layout-modes/fit-rows", "./layout-modes/vertical"], r) : "object" == typeof exports ? module.exports = r(require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("vertical", {
                horizontalAlignment: 0
            });
            return e.prototype._resetLayout = function() {
                this.y = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return this.y += t.size.outerHeight, {
                    x: e,
                    y: i
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.y
                }
            }, e
        }
        "function" == typeof define && define.amd ? define(["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("fitRows");
            return e.prototype._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
                var o = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.maxY
                }
            }, e
        }
        "function" == typeof define && define.amd ? define(["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t, i) {
            var o = t.create("masonry"),
                n = o.prototype._getElementOffset,
                r = o.prototype.layout,
                s = o.prototype._getMeasurement;
            e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
            var a = o.prototype.measureColumns;
            o.prototype.measureColumns = function() {
                this.items = this.isotope.filteredItems, a.call(this)
            };
            var u = o.prototype._manageStamp;
            return o.prototype._manageStamp = function() {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
            }, o
        }
        "function" == typeof define && define.amd ? define(["../layout-mode", "masonry/masonry"], i) : "object" == typeof exports ? module.exports = i(require("../layout-mode"), require("masonry-layout")) : i(t.Isotope.LayoutMode, t.Masonry)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("cellsByColumn");
            return e.prototype._resetLayout = function() {
                this.itemIndex = 0, this.getColumnWidth(), this.getRowHeight(), this.rows = Math.floor(this.isotope.size.innerHeight / this.rowHeight), this.rows = Math.max(this.rows, 1)
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = Math.floor(this.itemIndex / this.rows),
                    i = this.itemIndex % this.rows,
                    o = (e + .5) * this.columnWidth - t.size.outerWidth / 2,
                    n = (i + .5) * this.rowHeight - t.size.outerHeight / 2;
                return this.itemIndex++, {
                    x: o,
                    y: n
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    width: Math.ceil(this.itemIndex / this.rows) * this.columnWidth
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("cellsByRow");
            return e.prototype._resetLayout = function() {
                this.itemIndex = 0, this.getColumnWidth(), this.getRowHeight(), this.cols = Math.floor(this.isotope.size.innerWidth / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = this.itemIndex % this.cols,
                    i = Math.floor(this.itemIndex / this.cols),
                    o = (e + .5) * this.columnWidth - t.size.outerWidth / 2,
                    n = (i + .5) * this.rowHeight - t.size.outerHeight / 2;
                return this.itemIndex++, {
                    x: o,
                    y: n
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    height: Math.ceil(this.itemIndex / this.cols) * this.rowHeight
                }
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("fitColumns");
            return e.prototype._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxX = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize(), 0 !== this.y && t.size.outerHeight + this.y > this.isotope.size.innerHeight && (this.y = 0, this.x = this.maxX);
                var e = {
                    x: this.x,
                    y: this.y
                };
                return this.maxX = Math.max(this.maxX, this.x + t.size.outerWidth), this.y += t.size.outerHeight, e
            }, e.prototype._getContainerSize = function() {
                return {
                    width: this.maxX
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            var e = t.create("horizontal", {
                verticalAlignment: 0
            });
            return e.prototype._resetLayout = function() {
                this.x = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerHeight - t.size.outerHeight) * this.options.verticalAlignment,
                    i = this.x;
                return this.x += t.size.outerWidth, {
                    x: i,
                    y: e
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    width: this.x
                }
            }, e.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, e
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode")) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            var o = e.create("masonryHorizontal");
            return o.prototype._resetLayout = function() {
                this.getRowHeight(), this._getMeasurement("gutter", "outerHeight"), this.rowHeight += this.gutter, this.rows = Math.floor((this.isotope.size.innerHeight + this.gutter) / this.rowHeight), this.rows = Math.max(this.rows, 1);
                var t = this.rows;
                for (this.rowXs = []; t--;) this.rowXs.push(0);
                this.maxX = 0
            }, o.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = Math.ceil(t.size.outerHeight / this.rowHeight);
                e = Math.min(e, this.rows);
                for (var o = this._getRowGroup(e), n = Math.min.apply(Math, o), r = i(o, n), s = {
                        x: n,
                        y: this.rowHeight * r
                    }, a = n + t.size.outerWidth, u = this.rows + 1 - o.length, h = 0; u > h; h++) this.rowXs[r + h] = a;
                return s
            }, o.prototype._getRowGroup = function(t) {
                if (2 > t) return this.rowXs;
                for (var e = [], i = this.rows + 1 - t, o = 0; i > o; o++) {
                    var n = this.rowXs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, o.prototype._manageStamp = function(e) {
                var i = t(e),
                    o = this.isotope._getElementOffset(e),
                    n = this.isotope.options.isOriginTop ? o.top : o.bottom,
                    r = n + i.outerHeight,
                    s = Math.floor(n / this.rowHeight);
                s = Math.max(0, s);
                var a = Math.floor(r / this.rowHeight);
                a = Math.min(this.rows - 1, a);
                for (var u = (this.isotope.options.isOriginLeft ? o.left : o.right) + i.outerWidth, h = s; a >= h; h++) this.rowXs[h] = Math.max(u, this.rowXs[h])
            }, o.prototype._getContainerSize = function() {
                return this.maxX = Math.max.apply(Math, this.rowXs), {
                    width: this.maxX
                }
            }, o.prototype.needsResizeLayout = function() {
                return this.needsVerticalResizeLayout()
            }, o
        }
        var i = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; o > i; i++) {
                var n = t[i];
                if (n === e) return i
            }
            return -1
        };
        "function" == typeof define && define.amd ? define(["get-size/get-size", "isotope/js/layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("isotope-layout/js/layout-mode")) : e(t.getSize, t.Isotope.LayoutMode)
    }(window),
    function(t) {
        "use strict";

        function e() {
            function t(e) {
                for (var i in t.defaults) this[i] = t.defaults[i];
                for (i in e) this[i] = e[i]
            }
            return i.Rect = t, t.defaults = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }, t.prototype.contains = function(t) {
                var e = t.width || 0,
                    i = t.height || 0;
                return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
            }, t.prototype.overlaps = function(t) {
                var e = this.x + this.width,
                    i = this.y + this.height,
                    o = t.x + t.width,
                    n = t.y + t.height;
                return o > this.x && e > t.x && n > this.y && i > t.y
            }, t.prototype.getMaximalFreeRects = function(e) {
                if (!this.overlaps(e)) return !1;
                var i, o = [],
                    n = this.x + this.width,
                    r = this.y + this.height,
                    s = e.x + e.width,
                    a = e.y + e.height;
                return this.y < e.y && (i = new t({
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: e.y - this.y
                }), o.push(i)), n > s && (i = new t({
                    x: s,
                    y: this.y,
                    width: n - s,
                    height: this.height
                }), o.push(i)), r > a && (i = new t({
                    x: this.x,
                    y: a,
                    width: this.width,
                    height: r - a
                }), o.push(i)), this.x < e.x && (i = new t({
                    x: this.x,
                    y: this.y,
                    width: e.x - this.x,
                    height: this.height
                }), o.push(i)), o
            }, t.prototype.canFit = function(t) {
                return this.width >= t.width && this.height >= t.height
            }, t
        }
        var i = t.Packery = function() {};
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : (t.Packery = t.Packery || {}, t.Packery.Rect = e())
    }(window),
    function(t) {
        "use strict";

        function e(t) {
            function e(t, e, i) {
                this.width = t || 0, this.height = e || 0, this.sortDirection = i || "downwardLeftToRight", this.reset()
            }
            e.prototype.reset = function() {
                this.spaces = [], this.newSpaces = [];
                var e = new t({
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height
                });
                this.spaces.push(e), this.sorter = i[this.sortDirection] || i.downwardLeftToRight
            }, e.prototype.pack = function(t) {
                for (var e = 0, i = this.spaces.length; i > e; e++) {
                    var o = this.spaces[e];
                    if (o.canFit(t)) {
                        this.placeInSpace(t, o);
                        break
                    }
                }
            }, e.prototype.placeInSpace = function(t, e) {
                t.x = e.x, t.y = e.y, this.placed(t)
            }, e.prototype.placed = function(t) {
                for (var e = [], i = 0, o = this.spaces.length; o > i; i++) {
                    var n = this.spaces[i],
                        r = n.getMaximalFreeRects(t);
                    r ? e.push.apply(e, r) : e.push(n)
                }
                this.spaces = e, this.mergeSortSpaces()
            }, e.prototype.mergeSortSpaces = function() {
                e.mergeRects(this.spaces), this.spaces.sort(this.sorter)
            }, e.prototype.addSpace = function(t) {
                this.spaces.push(t), this.mergeSortSpaces()
            }, e.mergeRects = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    if (o) {
                        var n = t.slice(0);
                        n.splice(e, 1);
                        for (var r = 0, s = 0, a = n.length; a > s; s++) {
                            var u = n[s],
                                h = e > s ? 0 : 1;
                            o.contains(u) && (t.splice(s + h - r, 1), r++)
                        }
                    }
                }
                return t
            };
            var i = {
                downwardLeftToRight: function(t, e) {
                    return t.y - e.y || t.x - e.x
                },
                rightwardTopToBottom: function(t, e) {
                    return t.x - e.x || t.y - e.y
                }
            };
            return e
        }
        if ("function" == typeof define && define.amd) define(["./rect"], e);
        else if ("object" == typeof exports) module.exports = e(require("./rect"));
        else {
            var i = t.Packery = t.Packery || {};
            i.Packer = e(i.Rect)
        }
    }(window),
    function(t) {
        "use strict";

        function e(t, e, i) {
            var o = t("transform"),
                n = function() {
                    e.Item.apply(this, arguments)
                };
            n.prototype = new e.Item;
            var r = n.prototype._create;
            return n.prototype._create = function() {
                r.call(this), this.rect = new i, this.placeRect = new i
            }, n.prototype.dragStart = function() {
                this.getPosition(), this.removeTransitionStyles(), this.isTransitioning && o && (this.element.style[o] = "none"), this.getSize(), this.isPlacing = !0, this.needsPositioning = !1, this.positionPlaceRect(this.position.x, this.position.y), this.isTransitioning = !1, this.didDrag = !1
            }, n.prototype.dragMove = function(t, e) {
                this.didDrag = !0;
                var i = this.layout.size;
                t -= i.paddingLeft, e -= i.paddingTop, this.positionPlaceRect(t, e)
            }, n.prototype.dragStop = function() {
                this.getPosition();
                var t = this.position.x !== this.placeRect.x,
                    e = this.position.y !== this.placeRect.y;
                this.needsPositioning = t || e, this.didDrag = !1
            }, n.prototype.positionPlaceRect = function(t, e, i) {
                this.placeRect.x = this.getPlaceRectCoord(t, !0), this.placeRect.y = this.getPlaceRectCoord(e, !1, i)
            }, n.prototype.getPlaceRectCoord = function(t, e, i) {
                var o = e ? "Width" : "Height",
                    n = this.size["outer" + o],
                    r = this.layout[e ? "columnWidth" : "rowHeight"],
                    s = this.layout.size["inner" + o];
                e || (s = Math.max(s, this.layout.maxY), this.layout.rowHeight || (s -= this.layout.gutter));
                var a;
                if (r) {
                    r += this.layout.gutter, s += e ? this.layout.gutter : 0, t = Math.round(t / r);
                    var u;
                    u = this.layout.options.isHorizontal ? e ? "ceil" : "floor" : e ? "floor" : "ceil";
                    var h = Math[u](s / r);
                    h -= Math.ceil(n / r), a = h
                } else a = s - n;
                return t = i ? t : Math.min(t, a), t *= r || 1, Math.max(0, t)
            }, n.prototype.copyPlaceRectPosition = function() {
                this.rect.x = this.placeRect.x, this.rect.y = this.placeRect.y
            }, n.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this])
            }, n
        }
        "function" == typeof define && define.amd ? define(["get-style-property/get-style-property", "outlayer/outlayer", "./rect"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property"), require("outlayer"), require("./rect")) : t.Packery.Item = e(t.getStyleProperty, t.Outlayer, t.Packery.Rect)
    }(window),
    function(t) {
        "use strict";

        function e(t, e, i, o, n, r) {
            function s(t, e) {
                return t.position.y - e.position.y || t.position.x - e.position.x
            }

            function a(t, e) {
                return t.position.x - e.position.x || t.position.y - e.position.y
            }
            var u = i.create("packery");
            return u.Item = r, u.prototype._create = function() {
                i.prototype._create.call(this), this.packer = new n, this.stamp(this.options.stamped);
                var t = this;
                this.handleDraggabilly = {
                    dragStart: function(e) {
                        t.itemDragStart(e.element)
                    },
                    dragMove: function(e) {
                        t.itemDragMove(e.element, e.position.x, e.position.y)
                    },
                    dragEnd: function(e) {
                        t.itemDragEnd(e.element)
                    }
                }, this.handleUIDraggable = {
                    start: function(e) {
                        t.itemDragStart(e.currentTarget)
                    },
                    drag: function(e, i) {
                        t.itemDragMove(e.currentTarget, i.position.left, i.position.top)
                    },
                    stop: function(e) {
                        t.itemDragEnd(e.currentTarget)
                    }
                }
            }, u.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurements();
                var t = this.packer;
                this.options.isHorizontal ? (t.width = Number.POSITIVE_INFINITY, t.height = this.size.innerHeight + this.gutter, t.sortDirection = "rightwardTopToBottom") : (t.width = this.size.innerWidth + this.gutter, t.height = Number.POSITIVE_INFINITY, t.sortDirection = "downwardLeftToRight"), t.reset(), this.maxY = 0, this.maxX = 0
            }, u.prototype._getMeasurements = function() {
                this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width")
            }, u.prototype._getItemLayoutPosition = function(t) {
                return this._packItem(t), t.rect
            }, u.prototype._packItem = function(t) {
                this._setRectSize(t.element, t.rect), this.packer.pack(t.rect), this._setMaxXY(t.rect)
            }, u.prototype._setMaxXY = function(t) {
                this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY)
            }, u.prototype._setRectSize = function(t, i) {
                var o = e(t),
                    n = o.outerWidth,
                    r = o.outerHeight;
                if (n || r) {
                    var s = this.columnWidth + this.gutter,
                        a = this.rowHeight + this.gutter;
                    n = this.columnWidth ? Math.ceil(n / s) * s : n + this.gutter, r = this.rowHeight ? Math.ceil(r / a) * a : r + this.gutter
                }
                i.width = Math.min(n, this.packer.width), i.height = Math.min(r, this.packer.height)
            }, u.prototype._getContainerSize = function() {
                return this.options.isHorizontal ? {
                    width: this.maxX - this.gutter
                } : {
                    height: this.maxY - this.gutter
                }
            }, u.prototype._manageStamp = function(t) {
                var e, i = this.getItem(t);
                if (i && i.isPlacing) e = i.placeRect;
                else {
                    var n = this._getElementOffset(t);
                    e = new o({
                        x: this.options.isOriginLeft ? n.left : n.right,
                        y: this.options.isOriginTop ? n.top : n.bottom
                    })
                }
                this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e)
            }, u.prototype.sortItemsByPosition = function() {
                var t = this.options.isHorizontal ? a : s;
                this.items.sort(t)
            }, u.prototype.fit = function(t, e, i) {
                var o = this.getItem(t);
                o && (this._getMeasurements(), this.stamp(o.element), o.getSize(), o.isPlacing = !0, e = void 0 === e ? o.rect.x : e, i = void 0 === i ? o.rect.y : i, o.positionPlaceRect(e, i, !0), this._bindFitEvents(o), o.moveTo(o.placeRect.x, o.placeRect.y), this.layout(), this.unstamp(o.element), this.sortItemsByPosition(), o.isPlacing = !1, o.copyPlaceRectPosition())
            }, u.prototype._bindFitEvents = function(t) {
                function e() {
                    o++, 2 === o && i.emitEvent("fitComplete", [i, t])
                }
                var i = this,
                    o = 0;
                t.on("layout", function() {
                    return e(), !0
                }), this.on("layoutComplete", function() {
                    return e(), !0
                })
            }, u.prototype.resize = function() {
                var t = e(this.element),
                    i = this.size && t,
                    o = this.options.isHorizontal ? "innerHeight" : "innerWidth";
                i && t[o] === this.size[o] || this.layout()
            }, u.prototype.itemDragStart = function(t) {
                this.stamp(t);
                var e = this.getItem(t);
                e && e.dragStart()
            }, u.prototype.itemDragMove = function(t, e, i) {
                function o() {
                    r.layout(), delete r.dragTimeout
                }
                var n = this.getItem(t);
                n && n.dragMove(e, i);
                var r = this;
                this.clearDragTimeout(), this.dragTimeout = setTimeout(o, 40)
            }, u.prototype.clearDragTimeout = function() {
                this.dragTimeout && clearTimeout(this.dragTimeout)
            }, u.prototype.itemDragEnd = function(e) {
                var i, o = this.getItem(e);
                if (o && (i = o.didDrag, o.dragStop()), !o || !i && !o.needsPositioning) return this.unstamp(e), void 0;
                t.add(o.element, "is-positioning-post-drag");
                var n = this._getDragEndLayoutComplete(e, o);
                o.needsPositioning ? (o.on("layout", n), o.moveTo(o.placeRect.x, o.placeRect.y)) : o && o.copyPlaceRectPosition(), this.clearDragTimeout(), this.on("layoutComplete", n), this.layout()
            }, u.prototype._getDragEndLayoutComplete = function(e, i) {
                var o = i && i.needsPositioning,
                    n = 0,
                    r = o ? 2 : 1,
                    s = this;
                return function() {
                    return n++, n !== r ? !0 : (i && (t.remove(i.element, "is-positioning-post-drag"), i.isPlacing = !1, i.copyPlaceRectPosition()), s.unstamp(e), s.sortItemsByPosition(), o && s.emitEvent("dragItemPositioned", [s, i]), !0)
                }
            }, u.prototype.bindDraggabillyEvents = function(t) {
                t.on("dragStart", this.handleDraggabilly.dragStart), t.on("dragMove", this.handleDraggabilly.dragMove), t.on("dragEnd", this.handleDraggabilly.dragEnd)
            }, u.prototype.bindUIDraggableEvents = function(t) {
                t.on("dragstart", this.handleUIDraggable.start).on("drag", this.handleUIDraggable.drag).on("dragstop", this.handleUIDraggable.stop)
            }, u.Rect = o, u.Packer = n, u
        }
        "function" == typeof define && define.amd ? define(["classie/classie", "get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], e) : "object" == typeof exports ? module.exports = e(require("desandro-classie"), require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = e(t.classie, t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t, i, o) {
            var n = t.create("packery"),
                r = n.prototype._getElementOffset,
                s = n.prototype._getMeasurement;
            e(n.prototype, i.prototype), n.prototype._getElementOffset = r, n.prototype._getMeasurement = s;
            var a = n.prototype._resetLayout;
            n.prototype._resetLayout = function() {
                this.packer = this.packer || new i.Packer, a.apply(this, arguments)
            };
            var u = n.prototype._getItemLayoutPosition;
            n.prototype._getItemLayoutPosition = function(t) {
                return t.rect = t.rect || new i.Rect, u.call(this, t)
            };
            var h = n.prototype._manageStamp;
            return n.prototype._manageStamp = function() {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, h.apply(this, arguments)
            }, n.prototype.needsResizeLayout = function() {
                var t = o(this.element),
                    e = this.size && t,
                    i = this.options.isHorizontal ? "innerHeight" : "innerWidth";
                return e && t[i] !== this.size[i]
            }, n
        }
        "function" == typeof define && define.amd ? define(["isotope/js/layout-mode", "packery/js/packery", "get-size/get-size"], i) : "object" == typeof exports ? module.exports = i(require("isotope-layout/js/layout-mode"), require("packery"), require("get-size")) : i(t.Isotope.LayoutMode, t.Packery, t.getSize)
    }(window),
    function(t) {
        "use strict";

        function e() {}

        function i(t) {
            function i(e) {
                e.prototype.option || (e.prototype.option = function(e) {
                    t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                })
            }

            function n(e, i) {
                t.fn[e] = function(n) {
                    if ("string" == typeof n) {
                        for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                            var h = this[a],
                                p = t.data(h, e);
                            if (p)
                                if (t.isFunction(p[n]) && "_" !== n.charAt(0)) {
                                    var c = p[n].apply(p, s);
                                    if (void 0 !== c) return c
                                } else r("no such method '" + n + "' for " + e + " instance");
                            else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
                        }
                        return this
                    }
                    return this.each(function() {
                        var o = t.data(this, e);
                        o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
                    })
                }
            }
            if (t) {
                var r = "undefined" == typeof console ? e : function(t) {
                    console.error(t)
                };
                return t.bridget = function(t, e) {
                    i(e), n(t, e)
                }, t.bridget
            }
        }
        var o = Array.prototype.slice;
        "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof exports ? i(require("jquery")) : i(t.jQuery)
    }(window);
var hljs = new function() {
    function t(t) {
        return t.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function e(t) {
        return t.nodeName.toLowerCase()
    }

    function i(t, e) {
        var i = t && t.exec(e);
        return i && 0 == i.index
    }

    function o(t) {
        return Array.prototype.map.call(t.childNodes, function(t) {
            return 3 == t.nodeType ? v.useBR ? t.nodeValue.replace(/\n/g, "") : t.nodeValue : "br" == e(t) ? "\n" : o(t)
        }).join("")
    }

    function n(t) {
        var e = (t.className + " " + (t.parentNode ? t.parentNode.className : "")).split(/\s+/);
        return e = e.map(function(t) {
            return t.replace(/^language-/, "")
        }), e.filter(function(t) {
            return g(t) || "no-highlight" == t
        })[0]
    }

    function r(t, e) {
        var i = {};
        for (var o in t) i[o] = t[o];
        if (e)
            for (var o in e) i[o] = e[o];
        return i
    }

    function s(t) {
        var i = [];
        return function o(t, n) {
            for (var r = t.firstChild; r; r = r.nextSibling) 3 == r.nodeType ? n += r.nodeValue.length : "br" == e(r) ? n += 1 : 1 == r.nodeType && (i.push({
                event: "start",
                offset: n,
                node: r
            }), n = o(r, n), i.push({
                event: "stop",
                offset: n,
                node: r
            }));
            return n
        }(t, 0), i
    }

    function a(i, o, n) {
        function r() {
            return i.length && o.length ? i[0].offset != o[0].offset ? i[0].offset < o[0].offset ? i : o : "start" == o[0].event ? i : o : i.length ? i : o
        }

        function s(i) {
            function o(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            p += "<" + e(i) + Array.prototype.map.call(i.attributes, o).join("") + ">"
        }

        function a(t) {
            p += "</" + e(t) + ">"
        }

        function u(t) {
            ("start" == t.event ? s : a)(t.node)
        }
        for (var h = 0, p = "", c = []; i.length || o.length;) {
            var f = r();
            if (p += t(n.substr(h, f[0].offset - h)), h = f[0].offset, f == i) {
                c.reverse().forEach(a);
                do u(f.splice(0, 1)[0]), f = r(); while (f == i && f.length && f[0].offset == h);
                c.reverse().forEach(s)
            } else "start" == f[0].event ? c.push(f[0].node) : c.pop(), u(f.splice(0, 1)[0])
        }
        return p + t(n.substr(h))
    }

    function u(t) {
        function e(t) {
            return t && t.source || t
        }

        function i(i, o) {
            return RegExp(e(i), "m" + (t.cI ? "i" : "") + (o ? "g" : ""))
        }

        function o(n, s) {
            function a(e, i) {
                t.cI && (i = i.toLowerCase()), i.split(" ").forEach(function(t) {
                    var i = t.split("|");
                    u[i[0]] = [e, i[1] ? Number(i[1]) : 1]
                })
            }
            if (!n.compiled) {
                if (n.compiled = !0, n.k = n.k || n.bK, n.k) {
                    var u = {};
                    "string" == typeof n.k ? a("keyword", n.k) : Object.keys(n.k).forEach(function(t) {
                        a(t, n.k[t])
                    }), n.k = u
                }
                n.lR = i(n.l || /\b[A-Za-z0-9_]+\b/, !0), s && (n.bK && (n.b = n.bK.split(" ").join("|")), n.b || (n.b = /\B|\b/), n.bR = i(n.b), n.e || n.eW || (n.e = /\B|\b/), n.e && (n.eR = i(n.e)), n.tE = e(n.e) || "", n.eW && s.tE && (n.tE += (n.e ? "|" : "") + s.tE)), n.i && (n.iR = i(n.i)), void 0 === n.r && (n.r = 1), n.c || (n.c = []);
                var h = [];
                n.c.forEach(function(t) {
                    t.v ? t.v.forEach(function(e) {
                        h.push(r(t, e))
                    }) : h.push("self" == t ? n : t)
                }), n.c = h, n.c.forEach(function(t) {
                    o(t, n)
                }), n.starts && o(n.starts, s);
                var p = n.c.map(function(t) {
                    return t.bK ? "\\.?\\b(" + t.b + ")\\b\\.?" : t.b
                }).concat([n.tE]).concat([n.i]).map(e).filter(Boolean);
                n.t = p.length ? i(p.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }, n.continuation = {}
            }
        }
        o(t)
    }

    function h(e, o, n, r) {
        function s(t, e) {
            for (var o = 0; e.c.length > o; o++)
                if (i(e.c[o].bR, t)) return e.c[o]
        }

        function a(t, e) {
            return i(t.eR, e) ? t : t.eW ? a(t.parent, e) : void 0
        }

        function c(t, e) {
            return !n && i(e.iR, t)
        }

        function f(t, e) {
            var i = I.cI ? e[0].toLowerCase() : e[0];
            return t.k.hasOwnProperty(i) && t.k[i]
        }

        function l(t, e, i, o) {
            var n = o ? "" : v.classPrefix,
                r = '<span class="' + n,
                s = i ? "" : "</span>";
            return r += t + '">', r + e + s
        }

        function d() {
            var e = t(S);
            if (!_.k) return e;
            var i = "",
                o = 0;
            _.lR.lastIndex = 0;
            for (var n = _.lR.exec(e); n;) {
                i += e.substr(o, n.index - o);
                var r = f(_, n);
                r ? (E += r[1], i += l(r[0], n[0])) : i += n[0], o = _.lR.lastIndex, n = _.lR.exec(e)
            }
            return i + e.substr(o)
        }

        function m() {
            if (_.sL && !b[_.sL]) return t(S);
            var e = _.sL ? h(_.sL, S, !0, _.continuation.top) : p(S);
            return _.r > 0 && (E += e.r), "continuous" == _.subLanguageMode && (_.continuation.top = e.top), l(e.language, e.value, !1, !0)
        }

        function y() {
            return void 0 !== _.sL ? m() : d()
        }

        function x(e, i) {
            var o = e.cN ? l(e.cN, "", !0) : "";
            e.rB ? (z += o, S = "") : e.eB ? (z += t(i) + o, S = "") : (z += o, S = i), _ = Object.create(e, {
                parent: {
                    value: _
                }
            })
        }

        function w(e, i) {
            if (S += e, void 0 === i) return z += y(), 0;
            var o = s(i, _);
            if (o) return z += y(), x(o, i), o.rB ? 0 : i.length;
            var n = a(_, i);
            if (n) {
                var r = _;
                r.rE || r.eE || (S += i), z += y();
                do _.cN && (z += "</span>"), E += _.r, _ = _.parent; while (_ != n.parent);
                return r.eE && (z += t(i)), S = "", n.starts && x(n.starts, ""), r.rE ? 0 : i.length
            }
            if (c(i, _)) throw Error('Illegal lexeme "' + i + '" for mode "' + (_.cN || "<unnamed>") + '"');
            return S += i, i.length || 1
        }
        var I = g(e);
        if (!I) throw Error('Unknown language: "' + e + '"');
        u(I);
        for (var _ = r || I, z = "", L = _; L != I; L = L.parent) L.cN && (z = l(L.cN, z, !0));
        var S = "",
            E = 0;
        try {
            for (var R, M, C = 0;;) {
                if (_.t.lastIndex = C, R = _.t.exec(o), !R) break;
                M = w(o.substr(C, R.index - C), R[0]), C = R.index + M
            }
            w(o.substr(C));
            for (var L = _; L.parent; L = L.parent) L.cN && (z += "</span>");
            return {
                r: E,
                value: z,
                language: e,
                top: _
            }
        } catch (T) {
            if (-1 != T.message.indexOf("Illegal")) return {
                r: 0,
                value: t(o)
            };
            throw T
        }
    }

    function p(e, i) {
        i = i || v.languages || Object.keys(b);
        var o = {
                r: 0,
                value: t(e)
            },
            n = o;
        return i.forEach(function(t) {
            if (g(t)) {
                var i = h(t, e, !1);
                i.language = t, i.r > n.r && (n = i), i.r > o.r && (n = o, o = i)
            }
        }), n.language && (o.second_best = n), o
    }

    function c(t) {
        return v.tabReplace && (t = t.replace(/^((<[^>]+>|\t)+)/gm, function(t, e) {
            return e.replace(/\t/g, v.tabReplace)
        })), v.useBR && (t = t.replace(/\n/g, "<br>")), t
    }

    function f(t) {
        var e = o(t),
            i = n(t);
        if ("no-highlight" != i) {
            var r = i ? h(i, e, !0) : p(e),
                u = s(t);
            if (u.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
                f.innerHTML = r.value, r.value = a(u, s(f), e)
            }
            r.value = c(r.value), t.innerHTML = r.value, t.className += " hljs " + (!i && r.language || ""), t.result = {
                language: r.language,
                re: r.r
            }, r.second_best && (t.second_best = {
                language: r.second_best.language,
                re: r.second_best.r
            })
        }
    }

    function l(t) {
        v = r(v, t)
    }

    function d() {
        if (!d.called) {
            d.called = !0;
            var t = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(t, f)
        }
    }

    function m() {
        addEventListener("DOMContentLoaded", d, !1), addEventListener("load", d, !1)
    }

    function y(t, e) {
        var i = b[t] = e(this);
        i.aliases && i.aliases.forEach(function(e) {
            x[e] = t
        })
    }

    function g(t) {
        return b[t] || b[x[t]]
    }
    var v = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        b = {},
        x = {};
    this.highlight = h, this.highlightAuto = p, this.fixMarkup = c, this.highlightBlock = f, this.configure = l, this.initHighlighting = d, this.initHighlightingOnLoad = m, this.registerLanguage = y, this.getLanguage = g, this.inherit = r, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [this.BE]
    }, this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [this.BE]
    }, this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$"
    }, this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    }, this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    }, this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    }, this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    }, this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    }, this.REGEXP_MODE = {
        cN: "regexp",
        b: /\//,
        e: /\/[gim]*/,
        i: /\n/,
        c: [this.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [this.BE]
        }]
    }, this.TM = {
        cN: "title",
        b: this.IR,
        r: 0
    }, this.UTM = {
        cN: "title",
        b: this.UIR,
        r: 0
    }
};
hljs.registerLanguage("javascript", function(t) {
        return {
            aliases: ["js"],
            k: {
                keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
            },
            c: [{
                cN: "pi",
                b: /^\s*('|")use strict('|")/,
                r: 10
            }, t.ASM, t.QSM, t.CLCM, t.CBLCLM, t.CNM, {
                b: "(" + t.RSR + "|\\b(case|return|throw)\\b)\\s*",
                k: "return throw case",
                c: [t.CLCM, t.CBLCLM, t.REGEXP_MODE, {
                    b: /</,
                    e: />;/,
                    r: 0,
                    sL: "xml"
                }],
                r: 0
            }, {
                cN: "function",
                bK: "function",
                e: /\{/,
                c: [t.inherit(t.TM, {
                    b: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    c: [t.CLCM, t.CBLCLM],
                    i: /["'\(]/
                }],
                i: /\[|%/
            }, {
                b: /\$[(.]/
            }, {
                b: "\\." + t.IR,
                r: 0
            }]
        }
    }),
    function(t, e) {
        "use strict";

        function i(t, e) {
            t[d] = e
        }

        function o() {
            var e = document.querySelector("#page-nav");
            if (e) {
                var i = u(e).outerHeight;
                i >= t.innerHeight || new n(e)
            }
        }

        function n(e) {
            this.element = e, this.originalY = this.element.getBoundingClientRect().top + t.pageYOffset, eventie.bind(t, "scroll", this), this.isFixed = !1, this.onscroll()
        }

        function r(t, e, i) {
            var o = t.prototype[e],
                n = e + "Timeout";
            t.prototype[e] = function() {
                if (!this[n]) {
                    o.apply(this, arguments);
                    var t = this;
                    this[n] = setTimeout(function() {
                        o.apply(t, arguments), delete t[n]
                    }, i || 100)
                }
            }
        }
        var s = t.ID = {};
        s.pages = {};
        var a, u = t.getSize,
            h = t.Isotope;
        e.bridget("isotope", h);
        var p = t.getComputedStyle,
            c = p ? function(t) {
                return p(t, null)
            } : function(t) {
                return t.currentStyle
            };
        docReady(function() {
            a = document.querySelector("#notification"), e(".js-radio-button-group").radioButtonGroup();
            var t = document.body.getAttribute("data-page");
            t && "function" == typeof s[t] && s[t]();
            var i = document.querySelector("head"),
                n = c(i).fontFamily.replace(/['"]/g, "");
            ("desktop-ish" === n || "tablet-ish" === n) && o()
        }), s.getSomeItemElements = function() {
            for (var t = document.createDocumentFragment(), e = [], i = 0; 3 > i; i++) {
                var o = document.createElement("div"),
                    n = Math.random(),
                    r = n > .85 ? "w4" : n > .7 ? "w2" : "",
                    s = Math.random(),
                    a = s > .85 ? "h4" : s > .7 ? "h2" : "";
                o.className = "item " + r + " " + a, t.appendChild(o), e.push(o)
            }
        };
        var f, l = document.documentElement,
            d = void 0 !== l.textContent ? "textContent" : "innerText",
            m = getStyleProperty("transition"),
            y = m ? 1e3 : 1500;
        s.notify = function(t, e) {
            i(a, t), m && (a.style[m] = "none"), a.style.display = "block", a.style.opacity = "1", e && (f && clearTimeout(f), f = setTimeout(s.hideNotify, y))
        }, s.hideNotify = function() {
            m ? (a.style[m] = "opacity 1.0s", a.style.opacity = "0") : a.style.display = "none"
        }, e.fn.radioButtonGroup = function() {
            return this.each(function(t, i) {
                var o = e(i);
                o.find(":checked").parent().addClass("is-checked"), o.on("click", "input, button", function() {
                    o.find(".is-checked").removeClass("is-checked");
                    var t = e(this),
                        i = t.hasClass("button") ? t : t.parents(".button");
                    i.addClass("is-checked")
                })
            }), this
        }, hljs.configure({
            classPrefix: ""
        }), e.fn.displayIsotopeCode = function(t, e) {
            e = "string" == typeof e && -1 === e.indexOf("function") ? "'" + e + "'" : e;
            var i = "$container.isotope({ " + t + ": " + e + " })";
            i = hljs.highlight("js", i).value, this.html(i)
        }, n.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.prototype.onscroll = function() {
            var e = t.pageYOffset >= this.originalY;
            e !== this.isFixed && (classie.toggle(this.element, "is-fixed"), this.isFixed = e)
        }, r(n, "onscroll", 50)
    }(window, jQuery),
    function(t) {
        "use strict";
        var e = t.ID,
            i = getStyleProperty("transition"),
            o = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[i];
        e.appendix = function() {
            (function() {
                var t = $("#animate-item-size .isotope").isotope({
                    masonry: {
                        columnWidth: 60
                    }
                });
                t.on("click", ".item", function() {
                    $(this).toggleClass("is-expanded"), t.isotope("layout")
                })
            })(),
            function() {
                var t = $("#animate-item-size-responsive .isotope").isotope({
                    itemSelector: ".item",
                    masonry: {
                        columnWidth: ".grid-sizer"
                    }
                });
                t.on("click", ".item-content", function() {
                    var e = this,
                        n = getSize(e);
                    e.style[i] = "none", e.style.width = n.width + "px", e.style.height = n.height + "px";
                    var r = e.parentNode;
                    classie.toggleClass(r, "is-expanded");
                    var s = e.offsetWidth;
                    if (e.style[i] = "", i) {
                        var a = function() {
                            e.style.width = "", e.style.height = "", e.removeEventListener(o, a, !1)
                        };
                        e.addEventListener(o, a, !1)
                    }
                    var u = getSize(r);
                    e.style.width = u.width + "px", e.style.height = u.height + "px", s = null, t.isotope("layout")
                })
            }()
        }
    }(window),
    function(t, e) {
        "use strict";

        function i() {
            var t = new Date,
                e = t.getMinutes();
            e = 10 > e ? "0" + e : e;
            var i = t.getSeconds();
            return i = 10 > i ? "0" + i : i, [t.getHours(), e, i].join(":")
        }

        function o(t) {
            n.notify(t + " at " + i(), !0)
        }
        var n = t.ID;
        n.events = function() {
            (function() {
                var t = e("#layout-complete-demo .isotope").isotope({
                    masonry: {
                        columnWidth: 50
                    }
                });
                t.isotope("on", "layoutComplete", function(t, e) {
                    o("Isotope layout completed on " + e.length + " items")
                }), t.on("click", ".mini-item", function() {
                    e(this).toggleClass("gigante"), t.isotope("layout")
                })
            })(),
            function() {
                var t = e("#remove-complete-demo .isotope").isotope({
                    masonry: {
                        columnWidth: 50
                    }
                });
                t.isotope("on", "removeComplete", function(t, e) {
                    o("Removed " + e.length + " items")
                }), t.on("click", ".mini-item", function() {
                    t.isotope("remove", this).isotope("layout")
                })
            }()
        }
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = t.ID;
        i.filtering = function() {
            (function() {
                var t = e("#filtering-demo .isotope").isotope({
                        itemSelector: ".element-item",
                        layoutMode: "fitRows",
                        transitionDuration: "0.6s"
                    }),
                    i = {
                        numberGreaterThan50: function() {
                            var t = e(this).find(".number").text();
                            return parseInt(t, 10) > 50
                        },
                        ium: function() {
                            var t = e(this).find(".name").text();
                            return t.match(/ium$/)
                        }
                    },
                    o = {
                        numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
                        ium: "function() {\n  var name = $(this).find('.name').text();\n  return name.match( /ium$/ );\n}"
                    },
                    n = e("#filtering-demo .code-display code");
                e("#filtering-demo .button-group").on("click", "button", function() {
                    var r = e(this).attr("data-filter"),
                        s = i[r] || r,
                        a = o[r] || r;
                    t.isotope({
                        filter: s
                    }), n.displayIsotopeCode("filter", a)
                })
            })(),
            function() {
                var t = e("#combination-filters-demo"),
                    i = t.find(".isotope").isotope({
                        itemSelector: ".color-shape",
                        columnWidth: 80,
                        transitionDuration: "0.6s"
                    }),
                    o = t.find("pre code"),
                    n = {};
                t.on("click", ".button", function() {
                    var t = e(this),
                        r = t.parents(".button-group"),
                        s = r.attr("data-filter-group");
                    n[s] = t.attr("data-filter");
                    var a = "";
                    for (var u in n) a += n[u];
                    i.isotope({
                        filter: a
                    }), o.displayIsotopeCode("filter", a)
                })
            }()
        }
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = t.ID;
        i.index = function() {
            (function() {
                var t = e("#hero .isotope").isotope({
                        itemSelector: ".element-item",
                        layoutMode: "fitRows",
                        transitionDuration: "0.6s",
                        getSortData: {
                            name: ".name",
                            symbol: ".symbol",
                            number: ".number parseInt",
                            category: "[data-category]",
                            weight: function(t) {
                                var i = e(t).find(".weight").text();
                                return parseFloat(i.replace(/[\(\)]/g, ""))
                            }
                        }
                    }),
                    i = {
                        numberGreaterThan50: function() {
                            var t = e(this).find(".number").text();
                            return parseInt(t, 10) > 50
                        },
                        ium: function() {
                            var t = e(this).find(".name").text();
                            return t.match(/ium$/)
                        }
                    },
                    o = {
                        numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
                        ium: "function() {\n  var name = $(this).find('.name').text();\n  return name.match( /ium$/ );\n}"
                    },
                    n = e("#hero .code-display code");
                e("#hero .sort-by").on("click", "button", function() {
                    var i = e(this).attr("data-sort-by");
                    t.isotope({
                        sortBy: i
                    }), n.displayIsotopeCode("sortBy", i)
                }), e("#hero .filters").on("click", "button", function() {
                    var r = e(this).attr("data-filter"),
                        s = i[r] || r,
                        a = o[r] || r;
                    t.isotope({
                        filter: s
                    }), n.displayIsotopeCode("filter", a)
                })
            })(),
            function() {
                var t = e("#in-use-container");
                t.find(".in-use-item").hide(), t.isotope({
                    itemSelector: "none",
                    masonry: {
                        columnWidth: ".grid-sizer",
                        gutter: ".gutter-sizer"
                    }
                }), t.isotope("option", {
                    itemSelector: ".in-use-item"
                }), t.imagesLoaded().progress(function(i, o) {
                    var n = e(o.img).parents(".in-use-item");
                    n.show(), t.isotope("appended", n)
                })
            }()
        }
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = t.ID,
            o = e(t);
        i["layout-modes"] = function() {
            (function() {
                var t = e("#layout-modes-demo .isotope").isotope({
                        itemSelector: ".element-item",
                        layoutMode: "masonry",
                        transitionDuration: "0.6s",
                        masonry: {
                            columnWidth: 110
                        },
                        cellsByRow: {
                            columnWidth: 220,
                            rowHeight: 220
                        },
                        masonryHorizontal: {
                            rowHeight: 110
                        },
                        cellsByColumn: {
                            columnWidth: 220,
                            rowHeight: 220
                        }
                    }),
                    i = !1,
                    n = e("#layout-modes-demo .code-display code");
                e("#layout-modes-demo .button-group").on("click", "button", function() {
                    var r = e(this),
                        s = !!r.attr("data-is-horizontal");
                    if (i !== s) {
                        var a = s ? {
                            height: .7 * o.height()
                        } : {
                            width: "auto"
                        };
                        t.css(a), i = s
                    }
                    var u = r.attr("data-layout-mode-value");
                    t.isotope({
                        layoutMode: u
                    }), n.displayIsotopeCode("layoutMode", u)
                })
            })()
        }
    }(window, jQuery),
    function(t, e) {
        "use strict";

        function i() {
            var t = document.createElement("div"),
                e = Math.random(),
                i = Math.random(),
                o = e > .8 ? "w3" : e > .6 ? "w2" : "",
                n = i > .8 ? "h3" : i > .5 ? "h2" : "";
            return t.className = "mini-item " + o + " " + n, t
        }
        var o = t.ID;
        o.methods = function() {
            (function() {
                var t = e("#appended-demo"),
                    o = t.find(".isotope").isotope({
                        masonry: {
                            columnWidth: 50
                        }
                    });
                t.find("button").on("click", function() {
                    for (var t = [], e = 0; 3 > e; e++) {
                        var n = i();
                        t.push(n)
                    }
                    o.append(t).isotope("appended", t)
                })
            })(),
            function() {
                var t = e("#destroy-demo"),
                    i = {
                        masonry: {
                            columnWidth: 50
                        }
                    },
                    o = t.find(".isotope").isotope(i),
                    n = !0;
                t.find("button").on("click", function() {
                    n ? o.isotope("destroy") : o.isotope(i), n = !n
                })
            }(),
            function() {
                var t = e("#insert-demo"),
                    o = t.find(".isotope").isotope({
                        masonry: {
                            columnWidth: 50
                        },
                        filter: function() {
                            var t = e(this).find(".number").text();
                            return parseInt(t, 10) % 2
                        },
                        sortBy: "number",
                        getSortData: {
                            number: ".number parseInt"
                        }
                    });
                t.find("button").on("click", function() {
                    for (var t = [], n = 0; 3 > n; n++) {
                        var r = i(),
                            s = Math.floor(100 * Math.random());
                        e(r).append('<p class="number">' + s + "</p>"), t.push(r)
                    }
                    o.isotope("insert", t)
                })
            }(),
            function() {
                var t = e("#layout-demo .isotope").isotope({
                    masonry: {
                        columnWidth: 50
                    }
                });
                t.on("click", ".mini-item", function() {
                    e(this).toggleClass("gigante"), t.isotope("layout")
                })
            }(),
            function() {
                var t = e("#prepended-demo"),
                    o = t.find(".isotope").isotope({
                        masonry: {
                            columnWidth: 50
                        }
                    });
                t.find("button").on("click", function() {
                    for (var t = [], e = 0; 3 > e; e++) {
                        var n = i();
                        t.push(n)
                    }
                    o.prepend(t).isotope("prepended", t)
                })
            }(),
            function() {
                var t = e("#shuffle-demo"),
                    i = t.find(".isotope").isotope({
                        masonry: {
                            columnWidth: 50
                        }
                    });
                t.find(".button").on("click", function() {
                    i.isotope("shuffle")
                })
            }(),
            function() {
                var t = e("#stamp-demo"),
                    i = t.find(".isotope").isotope({
                        itemSelector: ".mini-item",
                        masonry: {
                            columnWidth: 50
                        }
                    }),
                    o = t.find(".stamp"),
                    n = !1;
                t.find("button").on("click", function() {
                    n ? i.isotope("unstamp", o) : i.isotope("stamp", o), i.isotope("layout"), n = !n
                })
            }(),
            function() {
                var t = e("#remove-demo .isotope").isotope({
                    masonry: {
                        columnWidth: 50
                    }
                });
                t.on("click", ".mini-item", function() {
                    t.isotope("remove", this).isotope("layout")
                })
            }()
        }
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = t.ID;
        i.sorting = function() {
            (function() {
                var t = e("#sorting-demo .button-group"),
                    i = e("#sorting-demo .isotope").isotope({
                        itemSelector: ".element-item",
                        layoutMode: "fitRows",
                        transitionDuration: "0.6s",
                        getSortData: {
                            name: ".name",
                            symbol: ".symbol",
                            number: ".number parseInt",
                            category: "[data-category]",
                            weight: function(t) {
                                var i = e(t).find(".weight").text();
                                return parseFloat(i.replace(/[\(\)]/g, ""))
                            }
                        }
                    }),
                    o = e("#sorting-demo .code-display code");
                t.on("click", "button", function() {
                    var t = e(this).attr("data-sort-by");
                    i.isotope({
                        sortBy: t
                    }), o.displayIsotopeCode("sortBy", t)
                })
            })(),
            function() {
                function t(t) {
                    return t.split(",")
                }
                var i = e("#multiple-sort-by-demo .button-group"),
                    o = e("#multiple-sort-by-demo .isotope").isotope({
                        layoutMode: "fitRows",
                        itemSelector: ".mini-item",
                        getSortData: {
                            color: "[data-color]",
                            number: ".number parseInt"
                        },
                        sortBy: ["color", "number"]
                    });
                i.on("click", "button", function() {
                    o.isotope({
                        sortBy: t(this.getAttribute("data-sort-by"))
                    })
                })
            }()
        }
    }(window, jQuery),
    function(t, e) {
        "use strict";
        var i = t.ID;
        i.vertical = function() {
            (function() {
                var t = e("#vertical-feature-demo .isotope").isotope({
                    itemSelector: "li",
                    layoutMode: "vertical",
                    transitionDuration: "0.6s",
                    getSortData: {
                        name: ".name",
                        symbol: ".symbol",
                        number: ".number parseInt",
                        category: ".category",
                        weight: function(t) {
                            var i = e(t).find(".weight").text();
                            return parseFloat(i.replace(/[\(\)]/g, ""))
                        }
                    }
                });
                e("#vertical-feature-demo .button-group").on("click", "button", function() {
                    var i = e(this).attr("data-sort-by");
                    t.isotope({
                        sortBy: i
                    })
                })
            })()
        }
    }(window, jQuery);