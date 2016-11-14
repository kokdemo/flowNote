// flowchart.js, v1.6.4
// Copyright (c)yyyy Adriano Raiano (adrai).
// Distributed under MIT license
// http://adrai.github.io/flowchart.js

! function (t, i) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = i(require("Raphael"));
    else if ("function" == typeof define && define.amd) define(["Raphael"], i);
    else {
        var e = i("object" == typeof exports ? require("Raphael") : t.Raphael);
        for (var r in e)("object" == typeof exports ? exports : t)[r] = e[r]
    }
}(this, function (t) {
    return function (t) {
        function i(r) {
            if (e[r]) return e[r].exports;
            var s = e[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(s.exports, s, s.exports, i), s.loaded = !0, s.exports
        }
        var e = {};
        return i.m = t, i.c = e, i.p = "", i(0)
    }([function (t, i, e) {
        e(8);
        var r = e(4);
        e(14);
        var s = {
            parse: r
        };
        "undefined" != typeof window && (window.flowchart = s), t.exports = s
    }, function (t, i) {
        function e(t, i) {
            if (!t || "function" == typeof t) return i;
            var r = {};
            for (var s in i) r[s] = i[s];
            for (s in t) t[s] && ("object" == typeof r[s] ? r[s] = e(r[s], t[s]) : r[s] = t[s]);
            return r
        }

        function r(t, i) {
            if ("function" == typeof Object.create) t.super_ = i, t.prototype = Object.create(i.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            else {
                t.super_ = i;
                var e = function () {};
                e.prototype = i.prototype, t.prototype = new e, t.prototype.constructor = t
            }
        }
        t.exports = {
            defaults: e,
            inherits: r
        }
    }, function (t, i, e) {
        function r(t, i, e) {
            this.chart = t, this.group = this.chart.paper.set(), this.symbol = e, this.connectedTo = [], this.symbolType = i.symbolType, this.flowstate = i.flowstate || "future", this.next_direction = i.next && i.direction_next ? i.direction_next : void 0, this.text = this.chart.paper.text(0, 0, i.text), i.key && (this.text.node.id = i.key + "t"), this.text.node.setAttribute("class", this.getAttr("class") + "t"), this.text.attr({
                "text-anchor": "start",
                x: this.getAttr("text-margin"),
                fill: this.getAttr("font-color"),
                "font-size": this.getAttr("font-size")
            });
            var r = this.getAttr("font"),
                s = this.getAttr("font-family"),
                o = this.getAttr("font-weight");
            r && this.text.attr({
                font: r
            }), s && this.text.attr({
                "font-family": s
            }), o && this.text.attr({
                "font-weight": o
            }), i.link && this.text.attr("href", i.link), i.target && this.text.attr("target", i.target);
            var n = this.getAttr("maxWidth");
            if (n) {
                for (var h = i.text.split(" "), a = "", x = 0, y = h.length; x < y; x++) {
                    var l = h[x];
                    this.text.attr("text", a + " " + l), a += this.text.getBBox().width > n ? "\n" + l : " " + l
                }
                this.text.attr("text", a.substring(1))
            }
            if (this.group.push(this.text), e) {
                var g = this.getAttr("text-margin");
                e.attr({
                    fill: this.getAttr("fill"),
                    stroke: this.getAttr("element-color"),
                    "stroke-width": this.getAttr("line-width"),
                    width: this.text.getBBox().width + 2 * g,
                    height: this.text.getBBox().height + 2 * g
                }), e.node.setAttribute("class", this.getAttr("class")), i.link && e.attr("href", i.link), i.target && e.attr("target", i.target), i.key && (e.node.id = i.key), this.group.push(e), e.insertBefore(this.text), this.text.attr({
                    y: e.getBBox().height / 2
                }), this.initialize()
            }
        }
        var s = e(3),
            o = s.drawLine,
            n = s.checkLineIntersection;
        r.prototype.getAttr = function (t) {
            if (this.chart) {
                var i, e = this.chart.options ? this.chart.options[t] : void 0,
                    r = this.chart.options.symbols ? this.chart.options.symbols[this.symbolType][t] : void 0;
                return this.chart.options.flowstate && this.chart.options.flowstate[this.flowstate] && (i = this.chart.options.flowstate[this.flowstate][t]), i || r || e
            }
        }, r.prototype.initialize = function () {
            this.group.transform("t" + this.getAttr("line-width") + "," + this.getAttr("line-width")), this.width = this.group.getBBox().width, this.height = this.group.getBBox().height
        }, r.prototype.getCenter = function () {
            return {
                x: this.getX() + this.width / 2,
                y: this.getY() + this.height / 2
            }
        }, r.prototype.getX = function () {
            return this.group.getBBox().x
        }, r.prototype.getY = function () {
            return this.group.getBBox().y
        }, r.prototype.shiftX = function (t) {
            this.group.transform("t" + (this.getX() + t) + "," + this.getY())
        }, r.prototype.setX = function (t) {
            this.group.transform("t" + t + "," + this.getY())
        }, r.prototype.shiftY = function (t) {
            this.group.transform("t" + this.getX() + "," + (this.getY() + t))
        }, r.prototype.setY = function (t) {
            this.group.transform("t" + this.getX() + "," + t)
        }, r.prototype.getTop = function () {
            var t = this.getY(),
                i = this.getX() + this.width / 2;
            return {
                x: i,
                y: t
            }
        }, r.prototype.getBottom = function () {
            var t = this.getY() + this.height,
                i = this.getX() + this.width / 2;
            return {
                x: i,
                y: t
            }
        }, r.prototype.getLeft = function () {
            var t = this.getY() + this.group.getBBox().height / 2,
                i = this.getX();
            return {
                x: i,
                y: t
            }
        }, r.prototype.getRight = function () {
            var t = this.getY() + this.group.getBBox().height / 2,
                i = this.getX() + this.group.getBBox().width;
            return {
                x: i,
                y: t
            }
        }, r.prototype.render = function () {
            if (this.next) {
                var t = this.getAttr("line-length");
                if ("right" === this.next_direction) {
                    var i = this.getRight();
                    if (!this.next.isPositioned) {
                        this.next.setY(i.y - this.next.height / 2), this.next.shiftX(this.group.getBBox().x + this.width + t);
                        var e = this;
                        ! function s() {
                            for (var i, r = !1, o = 0, n = e.chart.symbols.length; o < n; o++) {
                                i = e.chart.symbols[o];
                                var h = Math.abs(i.getCenter().x - e.next.getCenter().x);
                                if (i.getCenter().y > e.next.getCenter().y && h <= e.next.width / 2) {
                                    r = !0;
                                    break
                                }
                            }
                            r && (e.next.setX(i.getX() + i.width + t), s())
                        }(), this.next.isPositioned = !0, this.next.render()
                    }
                } else {
                    var r = this.getBottom();
                    this.next.isPositioned || (this.next.shiftY(this.getY() + this.height + t), this.next.setX(r.x - this.next.width / 2), this.next.isPositioned = !0, this.next.render())
                }
            }
        }, r.prototype.renderLines = function () {
            this.next && (this.next_direction ? this.drawLineTo(this.next, "", this.next_direction) : this.drawLineTo(this.next))
        }, r.prototype.drawLineTo = function (t, i, e) {
            this.connectedTo.indexOf(t) < 0 && this.connectedTo.push(t);
            var r, s = this.getCenter().x,
                h = this.getCenter().y,
                a = this.getRight(),
                x = this.getBottom(),
                y = this.getLeft(),
                l = t.getCenter().x,
                g = t.getCenter().y,
                f = t.getTop(),
                p = t.getRight(),
                c = t.getLeft(),
                u = s === l,
                d = h === g,
                m = h < g,
                b = h > g || this === t,
                v = s > l,
                w = s < l,
                k = 0,
                _ = this.getAttr("line-length"),
                B = this.getAttr("line-width");
            if (e && "bottom" !== e || !u || !m)
                if (e && "right" !== e || !d || !w)
                    if (e && "left" !== e || !d || !v)
                        if (e && "right" !== e || !u || !b)
                            if (e && "right" !== e || !u || !m)
                                if (e && "bottom" !== e || !v)
                                    if (e && "bottom" !== e || !w)
                                        if (e && "right" === e && v) r = o(this.chart, a, [{
                                            x: a.x + _ / 2,
                                            y: a.y
                                        }, {
                                            x: a.x + _ / 2,
                                            y: f.y - _ / 2
                                        }, {
                                            x: f.x,
                                            y: f.y - _ / 2
                                        }, {
                                            x: f.x,
                                            y: f.y
                                        }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + _ / 2;
                                        else if (e && "right" === e && w) r = o(this.chart, a, [{
                x: f.x,
                y: a.y
            }, {
                x: f.x,
                y: f.y
            }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + _ / 2;
            else if (e && "bottom" === e && u && b) r = o(this.chart, x, [{
                x: x.x,
                y: x.y + _ / 2
            }, {
                x: a.x + _ / 2,
                y: x.y + _ / 2
            }, {
                x: a.x + _ / 2,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i), this.bottomStart = !0, t.topEnd = !0, k = x.x + _ / 2;
            else if ("left" === e && u && b) {
                var A = y.x - _ / 2;
                c.x < y.x && (A = c.x - _ / 2), r = o(this.chart, y, [{
                    x: A,
                    y: y.y
                }, {
                    x: A,
                    y: f.y - _ / 2
                }, {
                    x: f.x,
                    y: f.y - _ / 2
                }, {
                    x: f.x,
                    y: f.y
                }], i), this.leftStart = !0, t.topEnd = !0, k = y.x
            } else "left" === e && (r = o(this.chart, y, [{
                x: f.x + (y.x - f.x) / 2,
                y: y.y
            }, {
                x: f.x + (y.x - f.x) / 2,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i), this.leftStart = !0, t.topEnd = !0, k = y.x);
            else r = o(this.chart, x, [{
                x: x.x,
                y: x.y + _ / 2
            }, {
                x: x.x + (x.x - f.x) / 2,
                y: x.y + _ / 2
            }, {
                x: x.x + (x.x - f.x) / 2,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i), this.bottomStart = !0, t.topEnd = !0, k = x.x + (x.x - f.x) / 2;
            else r = this.leftEnd && b ? o(this.chart, x, [{
                x: x.x,
                y: x.y + _ / 2
            }, {
                x: x.x + (x.x - f.x) / 2,
                y: x.y + _ / 2
            }, {
                x: x.x + (x.x - f.x) / 2,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i) : o(this.chart, x, [{
                x: x.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i), this.bottomStart = !0, t.topEnd = !0, k = x.x + (x.x - f.x) / 2;
            else r = o(this.chart, a, [{
                x: a.x + _ / 2,
                y: a.y
            }, {
                x: a.x + _ / 2,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + _ / 2;
            else r = o(this.chart, a, [{
                x: a.x + _ / 2,
                y: a.y
            }, {
                x: a.x + _ / 2,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y - _ / 2
            }, {
                x: f.x,
                y: f.y
            }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + _ / 2;
            else r = o(this.chart, y, p, i), this.leftStart = !0, t.rightEnd = !0, k = p.x;
            else r = o(this.chart, a, c, i), this.rightStart = !0, t.leftEnd = !0, k = c.x;
            else r = o(this.chart, x, f, i), this.bottomStart = !0, t.topEnd = !0, k = x.x;
            if (r) {
                for (var L = 0, M = this.chart.lines.length; L < M; L++)
                    for (var O, X = this.chart.lines[L], T = X.attr("path"), Y = r.attr("path"), C = 0, S = T.length - 1; C < S; C++) {
                        var j = [];
                        j.push(["M", T[C][1], T[C][2]]), j.push(["L", T[C + 1][1], T[C + 1][2]]);
                        for (var E = j[0][1], z = j[0][2], P = j[1][1], R = j[1][2], F = 0, I = Y.length - 1; F < I; F++) {
                            var W = [];
                            W.push(["M", Y[F][1], Y[F][2]]), W.push(["L", Y[F + 1][1], Y[F + 1][2]]);
                            var N = W[0][1],
                                V = W[0][2],
                                q = W[1][1],
                                G = W[1][2],
                                Q = n(E, z, P, R, N, V, q, G);
                            if (Q.onLine1 && Q.onLine2) {
                                var $;
                                V === G ? N > q ? ($ = ["L", Q.x + 2 * B, V], Y.splice(F + 1, 0, $), $ = ["C", Q.x + 2 * B, V, Q.x, V - 4 * B, Q.x - 2 * B, V], Y.splice(F + 2, 0, $), r.attr("path", Y)) : ($ = ["L", Q.x - 2 * B, V], Y.splice(F + 1, 0, $), $ = ["C", Q.x - 2 * B, V, Q.x, V - 4 * B, Q.x + 2 * B, V], Y.splice(F + 2, 0, $), r.attr("path", Y)) : V > G ? ($ = ["L", N, Q.y + 2 * B], Y.splice(F + 1, 0, $), $ = ["C", N, Q.y + 2 * B, N + 4 * B, Q.y, N, Q.y - 2 * B], Y.splice(F + 2, 0, $), r.attr("path", Y)) : ($ = ["L", N, Q.y - 2 * B], Y.splice(F + 1, 0, $), $ = ["C", N, Q.y - 2 * B, N + 4 * B, Q.y, N, Q.y + 2 * B], Y.splice(F + 2, 0, $), r.attr("path", Y)), F += 2, O += 2
                            }
                        }
                    }
                this.chart.lines.push(r)
            }(!this.chart.maxXFromLine || this.chart.maxXFromLine && k > this.chart.maxXFromLine) && (this.chart.maxXFromLine = k)
        }, t.exports = r
    }, function (t, i) {
        function e(t, i, e) {
            var r, s, o = "M{0},{1}";
            for (r = 2, s = 2 * e.length + 2; r < s; r += 2) o += " L{" + r + "},{" + (r + 1) + "}";
            var n = [i.x, i.y];
            for (r = 0, s = e.length; r < s; r++) n.push(e[r].x), n.push(e[r].y);
            var h = t.paper.path(o, n);
            h.attr("stroke", t.options["element-color"]), h.attr("stroke-width", t.options["line-width"]);
            var a = t.options.font,
                x = t.options["font-family"],
                y = t.options["font-weight"];
            return a && h.attr({
                font: a
            }), x && h.attr({
                "font-family": x
            }), y && h.attr({
                "font-weight": y
            }), h
        }

        function r(t, i, e, r) {
            var s, o;
            "[object Array]" !== Object.prototype.toString.call(e) && (e = [e]);
            var n = "M{0},{1}";
            for (s = 2, o = 2 * e.length + 2; s < o; s += 2) n += " L{" + s + "},{" + (s + 1) + "}";
            var h = [i.x, i.y];
            for (s = 0, o = e.length; s < o; s++) h.push(e[s].x), h.push(e[s].y);
            var a = t.paper.path(n, h);
            a.attr({
                stroke: t.options["line-color"],
                "stroke-width": t.options["line-width"],
                "arrow-end": t.options["arrow-end"]
            });
            var x = t.options.font,
                y = t.options["font-family"],
                l = t.options["font-weight"];
            if (x && a.attr({
                    font: x
                }), y && a.attr({
                    "font-family": y
                }), l && a.attr({
                    "font-weight": l
                }), r) {
                var g = !1,
                    f = t.paper.text(0, 0, r),
                    p = !1,
                    c = e[0];
                i.y === c.y && (p = !0);
                var u = 0,
                    d = 0;
                g ? (u = i.x > c.x ? i.x - (i.x - c.x) / 2 : c.x - (c.x - i.x) / 2, d = i.y > c.y ? i.y - (i.y - c.y) / 2 : c.y - (c.y - i.y) / 2, p ? (u -= f.getBBox().width / 2, d -= t.options["text-margin"]) : (u += t.options["text-margin"], d -= f.getBBox().height / 2)) : (u = i.x, d = i.y, p ? (u += t.options["text-margin"] / 2, d -= t.options["text-margin"]) : (u += t.options["text-margin"] / 2, d += t.options["text-margin"])), f.attr({
                    "text-anchor": "start",
                    "font-size": t.options["font-size"],
                    fill: t.options["font-color"],
                    x: u,
                    y: d
                }), x && f.attr({
                    font: x
                }), y && f.attr({
                    "font-family": y
                }), l && f.attr({
                    "font-weight": l
                })
            }
            return a
        }

        function s(t, i, e, r, s, o, n, h) {
            var a, x, y, l, g, f = {
                x: null,
                y: null,
                onLine1: !1,
                onLine2: !1
            };
            return a = (h - o) * (e - t) - (n - s) * (r - i), 0 === a ? f : (x = i - o, y = t - s, l = (n - s) * x - (h - o) * y, g = (e - t) * x - (r - i) * y, x = l / a, y = g / a, f.x = t + x * (e - t), f.y = i + x * (r - i), x > 0 && x < 1 && (f.onLine1 = !0), y > 0 && y < 1 && (f.onLine2 = !0), f)
        }
        t.exports = {
            drawPath: e,
            drawLine: r,
            checkLineIntersection: s
        }
    }, function (t, i, e) {
        function r(t) {
            function i(t) {
                var i = t.indexOf("(") + 1,
                    e = t.indexOf(")");
                return i >= 0 && e >= 0 ? r.symbols[t.substring(0, i - 1)] : r.symbols[t]
            }

            function e(t) {
                var i = "next",
                    e = t.indexOf("(") + 1,
                    r = t.indexOf(")");
                return e >= 0 && r >= 0 && (i = X.substring(e, r), i.indexOf(",") < 0 && "yes" !== i && "no" !== i && (i = "next, " + i)), i
            }
            t = t || "", t = t.trim();
            for (var r = {
                    symbols: {},
                    start: null,
                    drawSVG: function (t, i) {
                        function e(t) {
                            if (g[t.key]) return g[t.key];
                            switch (t.symbolType) {
                                case "start":
                                    g[t.key] = new o(l, t);
                                    break;
                                case "end":
                                    g[t.key] = new n(l, t);
                                    break;
                                case "operation":
                                    g[t.key] = new h(l, t);
                                    break;
                                case "inputoutput":
                                    g[t.key] = new a(l, t);
                                    break;
                                case "subroutine":
                                    g[t.key] = new x(l, t);
                                    break;
                                case "condition":
                                    g[t.key] = new y(l, t);
                                    break;
                                default:
                                    return new Error("Wrong symbol type!")
                            }
                            return g[t.key]
                        }
                        var r = this;
                        this.diagram && this.diagram.clean();
                        var l = new s(t, i);
                        this.diagram = l;
                        var g = {};
                        ! function f(t, i, s) {
                            var o = e(t);
                            return r.start === t ? l.startWith(o) : i && s && !i.pathOk && (i instanceof y ? (s.yes === t && i.yes(o), s.no === t && i.no(o)) : i.then(o)), o.pathOk ? o : (o instanceof y ? (t.yes && f(t.yes, o, t), t.no && f(t.no, o, t)) : t.next && f(t.next, o, t), o)
                        }(this.start), l.render()
                    },
                    clean: function () {
                        this.diagram.clean()
                    }
                }, l = [], g = 0, f = 1, p = t.length; f < p; f++)
                if ("\n" === t[f] && "\\" !== t[f - 1]) {
                    var c = t.substring(g, f);
                    g = f + 1, l.push(c.replace(/\\\n/g, "\n"))
                }
            g < t.length && l.push(t.substr(g));
            for (var u = 1, d = l.length; u < d;) {
                var m = l[u];
                m.indexOf("->") < 0 && m.indexOf("=>") < 0 ? (l[u - 1] += "\n" + m, l.splice(u, 1), d--) : u++
            }
            for (; l.length > 0;) {
                var b = l.splice(0, 1)[0];
                if (b.indexOf("=>") >= 0) {
                    var v, w = b.split("=>"),
                        k = {
                            key: w[0],
                            symbolType: w[1],
                            text: null,
                            link: null,
                            target: null,
                            flowstate: null
                        };
                    if (k.symbolType.indexOf(": ") >= 0 && (v = k.symbolType.split(": "), k.symbolType = v.shift(), k.text = v.join(": ")), k.text && k.text.indexOf(":>") >= 0 ? (v = k.text.split(":>"), k.text = v.shift(), k.link = v.join(":>")) : k.symbolType.indexOf(":>") >= 0 && (v = k.symbolType.split(":>"), k.symbolType = v.shift(), k.link = v.join(":>")), k.symbolType.indexOf("\n") >= 0 && (k.symbolType = k.symbolType.split("\n")[0]), k.link) {
                        var _ = k.link.indexOf("[") + 1,
                            B = k.link.indexOf("]");
                        _ >= 0 && B >= 0 && (k.target = k.link.substring(_, B), k.link = k.link.substring(0, _ - 1))
                    }
                    if (k.text && k.text.indexOf("|") >= 0) {
                        var A = k.text.split("|");
                        k.flowstate = A.pop().trim(), k.text = A.join("|")
                    }
                    r.symbols[k.key] = k
                } else if (b.indexOf("->") >= 0)
                    for (var L = b.split("->"), M = 0, O = L.length; M < O; M++) {
                        var X = L[M],
                            T = i(X),
                            Y = e(X),
                            C = null;
                        if (Y.indexOf(",") >= 0) {
                            var S = Y.split(",");
                            Y = S[0], C = S[1].trim()
                        }
                        if (r.start || (r.start = T), M + 1 < O) {
                            var j = L[M + 1];
                            T[Y] = i(j), T["direction_" + Y] = C, C = null
                        }
                    }
            }
            return r
        }
        var s = e(6),
            o = e(12),
            n = e(9),
            h = e(11),
            a = e(10),
            x = e(13),
            y = e(5);
        t.exports = r
    }, function (t, i, e) {
        function r(t, i) {
            i = i || {}, s.call(this, t, i), this.textMargin = this.getAttr("text-margin"), this.yes_direction = "bottom", this.no_direction = "right", i.yes && i.direction_yes && i.no && !i.direction_no ? "right" === i.direction_yes ? (this.no_direction = "bottom", this.yes_direction = "right") : (this.no_direction = "right", this.yes_direction = "bottom") : i.yes && !i.direction_yes && i.no && i.direction_no ? "right" === i.direction_no ? (this.yes_direction = "bottom", this.no_direction = "right") : (this.yes_direction = "right", this.no_direction = "bottom") : (this.yes_direction = "bottom", this.no_direction = "right"), this.yes_direction = this.yes_direction || "bottom", this.no_direction = this.no_direction || "right", this.text.attr({
                x: 2 * this.textMargin
            });
            var e = this.text.getBBox().width + 3 * this.textMargin;
            e += e / 2;
            var r = this.text.getBBox().height + 2 * this.textMargin;
            r += r / 2, r = Math.max(.5 * e, r);
            var o = e / 4,
                n = r / 4;
            this.text.attr({
                x: o + this.textMargin / 2
            });
            var a = {
                    x: o,
                    y: n
                },
                x = [{
                    x: o - e / 4,
                    y: n + r / 4
                }, {
                    x: o - e / 4 + e / 2,
                    y: n + r / 4 + r / 2
                }, {
                    x: o - e / 4 + e,
                    y: n + r / 4
                }, {
                    x: o - e / 4 + e / 2,
                    y: n + r / 4 - r / 2
                }, {
                    x: o - e / 4,
                    y: n + r / 4
                }],
                y = h(t, a, x);
            y.attr({
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                fill: this.getAttr("fill")
            }), i.link && y.attr("href", i.link), i.target && y.attr("target", i.target), i.key && (y.node.id = i.key), y.node.setAttribute("class", this.getAttr("class")), this.text.attr({
                y: y.getBBox().height / 2
            }), this.group.push(y), y.insertBefore(this.text), this.initialize()
        }
        var s = e(2),
            o = e(1).inherits,
            n = e(3),
            h = n.drawPath;
        o(r, s), r.prototype.render = function () {
            this.yes_direction && (this[this.yes_direction + "_symbol"] = this.yes_symbol), this.no_direction && (this[this.no_direction + "_symbol"] = this.no_symbol);
            var t = this.getAttr("line-length");
            if (this.bottom_symbol) {
                var i = this.getBottom();
                this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + t), this.bottom_symbol.setX(i.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, this.bottom_symbol.render())
            }
            if (this.right_symbol) {
                var e = this.getRight();
                if (!this.right_symbol.isPositioned) {
                    this.right_symbol.setY(e.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + t);
                    var r = this;
                    ! function s() {
                        for (var i, e = !1, o = 0, n = r.chart.symbols.length; o < n; o++) {
                            i = r.chart.symbols[o];
                            var h = Math.abs(i.getCenter().x - r.right_symbol.getCenter().x);
                            if (i.getCenter().y > r.right_symbol.getCenter().y && h <= r.right_symbol.width / 2) {
                                e = !0;
                                break
                            }
                        }
                        e && (r.right_symbol.setX(i.getX() + i.width + t), s())
                    }(), this.right_symbol.isPositioned = !0, this.right_symbol.render()
                }
            }
        }, r.prototype.renderLines = function () {
            this.yes_symbol && this.drawLineTo(this.yes_symbol, this.getAttr("yes-text"), this.yes_direction), this.no_symbol && this.drawLineTo(this.no_symbol, this.getAttr("no-text"), this.no_direction)
        }, t.exports = r
    }, function (t, i, e) {
        function r(t, i) {
            i = i || {}, this.paper = new s(t), this.options = o(i, n), this.symbols = [], this.lines = [], this.start = null
        }
        var s = e(15),
            o = e(1).defaults,
            n = e(7),
            h = e(5);
        r.prototype.handle = function (t) {
            this.symbols.indexOf(t) <= -1 && this.symbols.push(t);
            var i = this;
            return t instanceof h ? (t.yes = function (e) {
                return t.yes_symbol = e, t.no_symbol && (t.pathOk = !0), i.handle(e)
            }, t.no = function (e) {
                return t.no_symbol = e, t.yes_symbol && (t.pathOk = !0), i.handle(e)
            }) : t.then = function (e) {
                return t.next = e, t.pathOk = !0, i.handle(e)
            }, t
        }, r.prototype.startWith = function (t) {
            return this.start = t, this.handle(t)
        }, r.prototype.render = function () {
            var t, i, e = 0,
                r = 0,
                s = 0,
                o = 0,
                n = 0,
                h = 0,
                a = 0,
                x = 0;
            for (s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], t.width > e && (e = t.width), t.height > r && (r = t.height);
            for (s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], t.shiftX(this.options.x + (e - t.width) / 2 + this.options["line-width"]), t.shiftY(this.options.y + (r - t.height) / 2 + this.options["line-width"]);
            for (this.start.render(), s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], t.renderLines();
            for (n = this.maxXFromLine, s = 0, o = this.symbols.length; s < o; s++) {
                t = this.symbols[s];
                var y = t.getX() + t.width,
                    l = t.getY() + t.height;
                y > n && (n = y), l > h && (h = l)
            }
            for (s = 0, o = this.lines.length; s < o; s++) {
                i = this.lines[s].getBBox();
                var y = i.x,
                    l = i.y,
                    g = i.x2,
                    f = i.y2;
                y < a && (a = y), l < x && (x = l), g > n && (n = g), f > h && (h = f)
            }
            var p = this.options.scale,
                c = this.options["line-width"];
            a < 0 && (a -= c), x < 0 && (x -= c);
            var u = n + c - a,
                d = h + c - x;
            this.paper.setSize(u * p, d * p), this.paper.setViewBox(a, x, u, d, !0)
        }, r.prototype.clean = function () {
            if (this.paper) {
                var t = this.paper.canvas;
                t.parentNode.removeChild(t)
            }
        }, t.exports = r
    }, function (t, i) {
        t.exports = {
            x: 0,
            y: 0,
            "line-width": 3,
            "line-length": 50,
            "text-margin": 10,
            "font-size": 14,
            "font-color": "black",
            "line-color": "black",
            "element-color": "black",
            fill: "white",
            "yes-text": "yes",
            "no-text": "no",
            "arrow-end": "block",
            "class": "flowchart",
            scale: 1,
            symbols: {
                start: {},
                end: {},
                condition: {},
                inputoutput: {},
                operation: {},
                subroutine: {}
            }
        }
    }, function (t, i) {
        Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
            "use strict";
            if (null === this) throw new TypeError;
            var i = Object(this),
                e = i.length >>> 0;
            if (0 === e) return -1;
            var r = 0;
            if (arguments.length > 0 && (r = Number(arguments[1]), r != r ? r = 0 : 0 !== r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= e) return -1;
            for (var s = r >= 0 ? r : Math.max(e - Math.abs(r), 0); s < e; s++)
                if (s in i && i[s] === t) return s;
            return -1
        }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function (t) {
            "use strict";
            if (null === this) throw new TypeError;
            var i = Object(this),
                e = i.length >>> 0;
            if (0 === e) return -1;
            var r = e;
            arguments.length > 1 && (r = Number(arguments[1]), r != r ? r = 0 : 0 !== r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
            for (var s = r >= 0 ? Math.min(r, e - 1) : e - Math.abs(r); s >= 0; s--)
                if (s in i && i[s] === t) return s;
            return -1
        }), String.prototype.trim || (String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, "")
        })
    }, function (t, i, e) {
        function r(t, i) {
            var e = t.paper.rect(0, 0, 0, 0, 20);
            i = i || {}, i.text = i.text || "End", s.call(this, t, i, e)
        }
        var s = e(2),
            o = e(1).inherits;
        o(r, s), t.exports = r
    }, function (t, i, e) {
        function r(t, i) {
            i = i || {}, s.call(this, t, i), this.textMargin = this.getAttr("text-margin"), this.text.attr({
                x: 3 * this.textMargin
            });
            var e = this.text.getBBox().width + 4 * this.textMargin,
                r = this.text.getBBox().height + 2 * this.textMargin,
                o = this.textMargin,
                n = r / 2,
                a = {
                    x: o,
                    y: n
                },
                x = [{
                    x: o - this.textMargin,
                    y: r
                }, {
                    x: o - this.textMargin + e,
                    y: r
                }, {
                    x: o - this.textMargin + e + 2 * this.textMargin,
                    y: 0
                }, {
                    x: o - this.textMargin + 2 * this.textMargin,
                    y: 0
                }, {
                    x: o,
                    y: n
                }],
                y = h(t, a, x);
            y.attr({
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                fill: this.getAttr("fill")
            }), i.link && y.attr("href", i.link), i.target && y.attr("target", i.target), i.key && (y.node.id = i.key), y.node.setAttribute("class", this.getAttr("class")), this.text.attr({
                y: y.getBBox().height / 2
            }), this.group.push(y), y.insertBefore(this.text), this.initialize()
        }
        var s = e(2),
            o = e(1).inherits,
            n = e(3),
            h = n.drawPath;
        o(r, s), r.prototype.getLeft = function () {
            var t = this.getY() + this.group.getBBox().height / 2,
                i = this.getX() + this.textMargin;
            return {
                x: i,
                y: t
            }
        }, r.prototype.getRight = function () {
            var t = this.getY() + this.group.getBBox().height / 2,
                i = this.getX() + this.group.getBBox().width - this.textMargin;
            return {
                x: i,
                y: t
            }
        }, t.exports = r
    }, function (t, i, e) {
        function r(t, i) {
            var e = t.paper.rect(0, 0, 0, 0);
            i = i || {}, s.call(this, t, i, e)
        }
        var s = e(2),
            o = e(1).inherits;
        o(r, s), t.exports = r
    }, function (t, i, e) {
        function r(t, i) {
            var e = t.paper.rect(0, 0, 0, 0, 20);
            i = i || {}, i.text = i.text || "Start", s.call(this, t, i, e)
        }
        var s = e(2),
            o = e(1).inherits;
        o(r, s), t.exports = r
    }, function (t, i, e) {
        function r(t, i) {
            var e = t.paper.rect(0, 0, 0, 0);
            i = i || {}, s.call(this, t, i, e), e.attr({
                width: this.text.getBBox().width + 4 * this.getAttr("text-margin")
            }), this.text.attr({
                x: 2 * this.getAttr("text-margin")
            });
            var r = t.paper.rect(0, 0, 0, 0);
            r.attr({
                x: this.getAttr("text-margin"),
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
                height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
                fill: this.getAttr("fill")
            }), i.key && (r.node.id = i.key + "i");
            var o = this.getAttr("font"),
                n = this.getAttr("font-family"),
                h = this.getAttr("font-weight");
            o && r.attr({
                font: o
            }), n && r.attr({
                "font-family": n
            }), h && r.attr({
                "font-weight": h
            }), i.link && r.attr("href", i.link), i.target && r.attr("target", i.target), this.group.push(r), r.insertBefore(this.text), this.initialize()
        }
        var s = e(2),
            o = e(1).inherits;
        o(r, s), t.exports = r
    }, function (t, i, e) {
        if ("undefined" != typeof jQuery) {
            var r = e(4);
            ! function (t) {
                t.fn.flowChart = function (i) {
                    return this.each(function () {
                        var e = t(this),
                            s = r(e.text());
                        e.html(""), s.drawSVG(this, i)
                    })
                }
            }(jQuery)
        }
    }, function (i, e) {
        i.exports = t
    }])
});
//# sourceMappingURL=flowchart.min.js.map
