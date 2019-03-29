$(function() {
    function e() {
        ht = data.length;
        for (var e = 0, t = ht; t > e; e++) ft[e] = new PIXI.Sprite(st), ft[e].anchor.x = .5, ft[e].anchor.y = .5, ft[e].position.x = Math.round(Math.random() * dt.width), ft[e].position.y = Math.round(Math.random() * dt.height), ft[e].scale.x = wt.size, ft[e].scale.y = wt.size, ft[e].scale_speed = wt.scale_speed, ft[e].year = data[e].year, ft[e].category = data[e].category, ft[e].i = data[e].i, ft[e].image = data[e].image, ft[e].video = data[e].video, ft[e].title = data[e].title, ft[e].link = data[e].link, ft[e].rating = data[e].rating, mt.addChild(ft[e]);
        $t.key = ht, dt.height = window.innerHeight - 20, dt.width = window.innerWidth - 275, xt.top = $("#screen1").offset().top, xt.bottom = xt.top + $("#screen1").height(), xt.left1 = $("#screen1").offset().left, xt.left2 = $("#screen2").offset().left, Et.background.play(), Et.sand.play(), P(), U(), requestAnimationFrame(C), O(), $("#loading").fadeOut(), data = null, clearTimeout(loader_stuck),
            function(e, t, a, o, n, i, r) {
                e.GoogleAnalyticsObject = n, e[n] = e[n] || function() {
                    (e[n].q = e[n].q || []).push(arguments)
                }, e[n].l = 1 * new Date, i = t.createElement(a), r = t.getElementsByTagName(a)[0], i.async = 1, i.src = o, r.parentNode.insertBefore(i, r)
            }(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-62026991-2", "auto"), ga("send", "pageview")
    }

    function a(e, t, a, n) {
        var i = [];
        e > t && (t = e), t == e && (e = Mt.history, t = Mt.history), t > Mt.max && (t = Mt.max), e < Mt.min && (e = Mt.min), a && n ? (gt[0] = a, gt[1] = n) : (gt[0] = o(e), gt[1] = o(t)), i[0] = e / Mt.max, i[1] = t / Mt.max, Mt.value1 = e, Mt.value2 = t, Mt.history = t, gt[0] == gt[1] ? (lt.slider_years[0].html(S(gt[0])), lt.slider_years[1].html("")) : (lt.slider_years[0].html(S(gt[0])), lt.slider_years[1].html(S(gt[1])));
        var r = $("#footer").width(),
            s = Math.round(i[0] * r),
            d = Math.round(i[1] * r),
            c = {
                left: s + "px",
                right: "auto"
            },
            u = {
                left: d + "px",
                right: "auto"
            };
        d > dt.width - 50 ? u = {
            right: "107px",
            left: "auto"
        } : u.right = "auto", s > dt.width - 70 ? c = {
            right: "160px",
            left: "auto"
        } : c.right = "auto", 115 > s && (c.left = "115px"), 125 > d && (u.left = "125px"), lt.slider_years[0].css(c), lt.slider_years[1].css(u), lt.hover_event.empty(), clearTimeout($.data(this, "wait")), $.data(this, "wait", setTimeout(function() {
            l()
        }, 3))
    }

    function o(e) {
        for (var t = 0, a = kt.jumps.length; a > t; t++) {
            var o = kt.slider[t + 1] ? kt.slider[t + 1] * Mt.max : gt[3];
            if (o > e) {
                var n = kt.years[t] + (e - kt.slider[t] * Mt.max) * kt.jumps[t];
                return n || (n = 2015), Math.round(n)
            }
        }
        return 0
    }

    function i(e) {
        for (var t = 0, a = kt.jumps.length; a > t; t++) {
            var o = kt.years[t + 1] ? kt.years[t + 1] : gt[3];
            if (o >= e) {
                var n = (e - kt.years[t]) / kt.jumps[t] + kt.slider[t] * Mt.max;
                return Math.round(n)
            }
        }
        return 0
    }

    function r() {
        for (var e = (gt[1] - gt[0], kt.years.length), t = 0; e > t; t++) {
            var a = kt.years[t],
                o = kt.years[t + 1];
            a < gt[1] && o > gt[0] || 0 == t && a > gt[0] || t == e - 1 && kt.years[e - 1] < gt[1] ? lt.periods_li.eq(t).addClass("bold") : lt.periods_li.eq(t).removeClass("bold")
        }
    }

    function s() {
        var e = gt[1] - gt[0];
        e || (e = 1);
        var t = .5,
            a = .03,
            o = 1,
            n = 3,
            i = Math.log(e / o + 9) / Math.log(10),
            r = (t - a) / Math.pow(i, n) + a;
        .08 > r && (r = .08), wt.size = r, bt.sensitivity = Math.round(20 + 40 * wt.size)
    }

    function d() {
        var e = gt[1] - gt[0];
        gt[0] == gt[1] && gt[1]++, wt.group = e / dt.width * wt.size * wt.spacing, wt.group = Math.round(100 * wt.group) / 100, 0 == wt.group && (wt.group = .1), wt.y.distance = wt.size * wt.spacing
    }

    function l() {
        s(), d(), r(), x(), b();
        for (var e = wt.size, t = wt.speed, a = 0, o = ht; o > a; a++) {
            var n = ft[a];
            n.gs = e, n.os = e, n.gy = yt.update[1] ? E(a) : I(a), n.gx = T(a), n.speed = Math.abs(Math.random() * t) + 2 * M(a) + 1, gt[1] - gt[0] < 30 && (n.speed = 2 * n.speed)
        }
        yt.update[1] || yt.selceted[1] || p(), N(), u(), Z("sand"), clearTimeout($.data(this, "wait")), $.data(this, "wait", setTimeout(function() {
            "dontknow" !== zt && gt[1] < -5e7 ? ($("#dontknow").html("WE KNOW VERY LITTLE ABOUT THIS TIME PERIOD"), $("#dontknow").removeClass().addClass("show"), zt = "dontknow") : "gothere" !== zt && gt[0] < -2e6 && gt[1] > 1500 ? ($("#dontknow").removeClass(), $("#dontknow").html("MOST EVENTS IN THIS PERIOD ARE OVER THERE"), $("#dontknow").removeClass().addClass("show arrow"), zt = "gothere") : "dontknow" == zt && gt[1] > -5e7 ? ($("#dontknow").empty(), $("#dontknow").removeClass(), zt = !1) : "gothere" == zt && (gt[0] > -2e6 || gt[1] < 1500) && ($("#dontknow").empty(), $("#dontknow").removeClass(), zt = !1)
        }, 100))
    }

    function c() {
        var e = !0;
        if ("round" == _t) {
            for (var t = $t.key, a = 0, o = ht; o > a; a++) {
                {
                    var n = ft[a];
                    n.gs
                }
                if (t >= a) {
                    var i = R(a),
                        r = D(a);
                    $t.loaded, n.z = 5 * Math.cos(a / (.5 * t)), n.gx = r + (r - $t.vpx) * (n.z / $t.depth / $t.vspo_x), n.gy = i + (i - $t.vpy) * (n.z / $t.depth / $t.vspo_x), n.gs = n.gy * (n.z / $t.depth + 1) / 3e3
                } else n.gs = .001;
                Math.abs(n.position.x - n.gx) > 25 && (e = !1, $t.loaded && (n.position.x = n.gx - 25)), Math.abs(n.position.y - n.gy) > 25 && (e = !1, $t.loaded && (n.position.y = n.gy - 25)), a == $t.target ? ($("#event").css("left", n.position.x + bt.marginx + "px"), $("#event").css("top", n.position.y + bt.marginy + "px"), n.speed = 10, 1 == n.os && (n.scale_speed = 2 * wt.scale_speed, n.gs = 2.5)) : n.os = 0
            }
            1 == e && ($t.loaded = !0)
        } else "graph" == _t ? l() : (K(), Q());
        Z("sand")
    }

    function u() {
        $("#graph_h2").text(e).removeClass();
        var e, t = gt[1] - gt[0],
            a = gt[0];
        if (t >= 1e9) {
            var o = Math.abs(Math.round(t / 1e9));
            o >= 100 && (o = 100 * Math.round(o / 100)), e = h(o) + "<span> billion years</span>"
        } else if (t >= 1e6) {
            var o = Math.abs(Math.round(t / 1e6));
            o >= 100 && (o = 100 * Math.round(o / 100)), e = h(o) + "<span> million years</span>"
        } else if (t >= 1e3) {
            var o = Math.abs(Math.round(t / 1e3));
            o >= 100 && (o = 100 * Math.round(o / 100)), e = h(o) + "<span> thousand years</span>"
        } else if (t >= 150) t = 100 * Math.round(t / 100), e = h(t) + " <span>years</span>";
        else if (t >= 99) {
            var o = Math.round(a / 100) + 1;
            e = "The " + h(o) + "<span> centery</span>"
        } else if (t > 15) e = h(t) + " <span>years</span>";
        else if (t > 9)
            if (a > 1910 && 2e3 > a) {
                var o = String(Math.floor(a / 10)).substr(2);
                switch (o) {
                    case "1":
                        o = "10's";
                        break;
                    case "2":
                        o = "twenties";
                        break;
                    case "3":
                        o = "thirties";
                        break;
                    case "4":
                        o = "forties";
                        break;
                    case "5":
                        o = "fifties";
                        break;
                    case "6":
                        o = "sixties";
                        break;
                    case "7":
                        o = "seventies";
                        break;
                    case "8":
                        o = "eighties";
                        break;
                    case "9":
                        o = "nineties"
                }
                e = "the " + o
            } else e = Math.floor(a / 10) + "0s";
        else e = t > 1 ? h(t) + " <span>years</span>" : "THE YEAR " + S(gt[0]);
        $("#graph_h2").html(e).removeClass(), document.getElementById("graph_h2").offsetWidth = document.getElementById("graph_h2").offsetWidth, $("#graph_h2").addClass("update")
    }

    function h(e) {
        var t = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "],
            a = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
        if ((e = e.toString()).length > 9) return "overflow";
        if (n = ("000000000" + e).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/), n) {
            var o = "";
            return o += 0 != n[1] ? (t[Number(n[1])] || a[n[1][0]] + " " + t[n[1][1]]) + "crore " : "", o += 0 != n[2] ? (t[Number(n[2])] || a[n[2][0]] + " " + t[n[2][1]]) + "lakh " : "", o += 0 != n[3] ? (t[Number(n[3])] || a[n[3][0]] + " " + t[n[3][1]]) + "thousand " : "", o += 0 != n[4] ? (t[Number(n[4])] || a[n[4][0]] + " " + t[n[4][1]]) + "hundred " : "", o += 0 != n[5] ? ("" != o ? "and " : "") + (t[Number(n[5])] || a[n[5][0]] + " " + t[n[5][1]]) : ""
        }
    }

    function p() {
        if (!Tt) {
            if (ut && ut.abort(), Tt = !0, yt.selceted[0]) var e = yt.selceted[0];
            else if (yt.hover) var e = yt.hover;
            else var e = !1;
            ut = $.ajax({
                type: "GET",
                url: "php/mvps.php",
                data: {
                    from: gt[0],
                    to: gt[1],
                    category: e
                },
                dataType: "json",
                success: function(e) {
                    vt = e, v()
                }
            })
        }
    }

    function v() {
        if (vt && "graph" == _t) {
            var e = "",
                t = 0;
            for (vt.length; t < vt.length; t++) {
                var a = vt[t],
                    o = ft[a.i].gx + bt.marginx,
                    n = ft[a.i].gy + bt.marginy,
                    i = !0;
                (n > dt.height - 75 || 350 > o || 50 > n) && (i = !1), i && (ft[a.i].gs = 1.5, ft[a.i].speed = 1e3, ft[a.i].os = wt.size + .3, e += y(a.i, a.image, a.title, a.year))
            }
            "graph" == _t && (Tt = !0, lt.mvps.html(e))
        }
    }

    function m() {
        if (!Tt) {
            ut && ut.abort();
            for (var e = 0, t = ht; t > e; e++) ft[e].os = wt.size;
            ut = $.ajax({
                type: "GET",
                url: "php/realted_events.php",
                data: {
                    from: gt[0],
                    to: gt[1],
                    category: ft[bt.i].category,
                    current: Math.round(ft[bt.i].year)
                },
                dataType: "json",
                success: function(e) {
                    for (var t = 0, a = ht; a > t; t++) ft[t].gs = wt.size;
                    Ct.open = !1, lt.hover_event.removeClass(), $("body").removeClass("hover");
                    for (var o = "", t = 0, a = e.length; a > t; t++) {
                        var n = e[t],
                            i = ft[n.i].gx + bt.marginx,
                            r = ft[n.i].gy + bt.marginy;
                        i + 10 < dt.width && i > 10 && r + 10 < dt.height && r > 10 && (ft[n.i].gs = 1.5, ft[n.i].os = wt.size + .3, o += y(n.i, n.image, n.title, n.year))
                    }
                    Tt = !0, lt.mvps.html(o)
                }
            })
        }
    }

    function g() {
        var e = $t.target,
            t = ft[e].category;
        ut = $.ajax({
            type: "GET",
            url: "php/realted_event.php",
            data: {
                i: e,
                category: t
            },
            dataType: "json",
            success: function(e) {
                x(), $t.target = e.i, L(e.i)
            }
        })
    }

    function f(e, t) {
        var a = "";
        bt.animation_done = !1, lt.hover_event.html(y(t, "", "", 0, "", "", !0));
        for (var o = 0, n = 0; n < e.length; n++)
            if (Number(ft[e[n]].rating) > o) {
                var i = e[n];
                o = Number(ft[e[n]].rating)
            } var r = ft[i].title,
            s = ft[i].year,
            d = ft[i].image.split(".")[0],
            l = ft[i].link,
            u = ft[i].video,
            h = ft[i].image;
        bt.id = d, bt.i = ft[i].i, bt.link = l, bt.title = r, bt.video = u, a += '<div class="event_title">' + r + ' <span class="year"> ' + S(s) + "</span></div>", a += '<div id="matirial">', a += '<div class="buttons"><div class="fullscreen"></div><div class="back"></div></div>', a += '<div id="hover_container">', a += '<div id="opener"><h1>' + r + "</h1>", a += "<ul>", "" !== u && (a += '<li class="video">WATCH VIDEO</li>'), l && l.length > 2 && (a += '<li class="wiki">READ WIKI PAGE</li>'), a += "graph" == _t ? '<li class="realted">RELATED EVENTS</li>' : '<li class="realted">RELATED EVENT</li>', a += "</ul>", a += "</div>", a += "</div>", lt.hover_event.find(".event").append(a), lt.hover_event.find(".image_content").css({
            background: "url(images/" + h + ") center center",
            "background-size": "cover"
        }), "round" == _t && c(), $(".event_image").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e) {
            "round" == _t && c(), bt.animation_done = !0, $(this).off(e)
        })
    }

    function y(e, t, a, o, n, i, r) {
        var s = ft[e].gx + bt.marginx,
            d = ft[e].gy + bt.marginy,
            o = S(o),
            l = gt[1] - gt[0];
        if (1 == l) var c = " big";
        else if (30 > l) var c = " meduim";
        else var c = "";
        if (r) var u = 'id="event"';
        else var u = "";
        var h = '<div class="event' + c + '" ' + u + ' i="' + e + '" style="left:' + s + "px; top:" + d + 'px;">';
        return h += '<div class="event_image">', h += '<div class="image_content" style="background:url(images/' + t + ') center center; background-size: cover;"></div>', h += "</div>", r || (h += '<div class="event_title">' + a + ' <span class="year"> ' + o + "</span></div>"), h += "</div>", h += "</div>"
    }

    function _(e) {
        if ("graph" == _t) var t = bt.i;
        else var t = $t.target;
        if ("wiki" == e) var a = ft[t].position.y - 188,
            o = window.innerHeight - (ft[t].position.y + 300),
            n = ft[t].position.x - 450,
            i = window.innerWidth - (ft[t].position.x + 385);
        else if ("opener" == e) var a = ft[t].position.y - 86,
            o = window.innerHeight - (ft[t].position.y + 160),
            n = ft[t].position.x - 230,
            i = window.innerWidth - (ft[t].position.x + 385);
        var r = $("#event");
        0 > a && r.css("margin-top", Math.abs(a) + "px"), 0 > o && r.css("margin-top", "-" + Math.abs(o) + "px"), 0 > n && r.css("margin-left", Math.abs(n) + "px"), 0 > i && r.css("margin-left", "-" + Math.abs(i) + "px")
    }

    function w() {
        for (var e = 0, t = ht; t > e; e++) ft[e].gs = wt.size, ft[e].os = wt.size;
        ft[bt.last_event].gs = 1.5
    }

    function x() {
        if (Ct.open) {
            for (var e = 0, t = ht; t > e; e++) ft[e].gs = wt.size;
            Ct.open = !1, lt.hover_event.removeClass(), $("body").removeClass("hover"), "graph" == _t ? (lt.hover_event.empty(), v()) : "round" == _t && (c(), $("#event").css({
                "margin-left": "0",
                "margin-top": "0"
            }))
        }
    }

    function b() {
        1 == Tt && (Tt = !1, lt.mvps.empty())
    }

    function M(e) {
        var t = ft[e].gx,
            a = ft[e].position.x,
            o = ft[e].gy,
            n = ft[e].position.y,
            i = Math.abs(t - a) + Math.abs(o - n);
        return i > 1e5 ? 3 : i > 1e4 ? 2 : i > 100 ? 1 : 0
    }

    function k(e, t, a, o) {
        var n = Math.abs(e - a),
            i = Math.abs(t - o);
        return [n, i]
    }

    function C() {
        for (var e = 0, t = ht; t > e; e++) {
            Math.abs(ft[e].gx - ft[e].position.x) < ft[e].speed ? ft[e].x = ft[e].gx : ft[e].gx > ft[e].position.x ? ft[e].x += ft[e].speed : ft[e].gx < ft[e].position.x && (ft[e].x -= ft[e].speed), Math.abs(ft[e].gy - ft[e].position.y) < ft[e].speed ? ft[e].position.y = ft[e].gy : ft[e].gy > ft[e].position.y ? ft[e].position.y += ft[e].speed : ft[e].gy < ft[e].position.y && (ft[e].position.y -= ft[e].speed); {
                .1 * Math.random()
            }
            Math.abs(ft[e].gs - ft[e].scale.x) < ft[e].scale_speed ? (ft[e].scale.y = ft[e].gs, ft[e].scale.x = ft[e].gs) : ft[e].gs > ft[e].scale.x && ft[e].gx == ft[e].position.x && ft[e].gy == ft[e].position.y ? (ft[e].scale.x += ft[e].scale_speed, ft[e].scale.y += ft[e].scale_speed) : ft[e].gs < ft[e].scale.x && (ft[e].scale.x -= ft[e].scale_speed, ft[e].scale.y -= ft[e].scale_speed), ft[e].visible = ft[e].position.x > dt.width || ft[e].position.x < 1 || ft[e].position.y > dt.height || ft[e].position.y < 1 ? !1 : !0
        }
        ct.render(mt), requestAnimationFrame(C)
    }

    function T(e) {
        var t, a = z(ft[e].year),
            o = dt.width,
            n = yt.update;
        if (n[0] && n[0] != ft[e].category && n[1] != ft[e].category) t = ft[e].position.x > dt.width / 2 ? dt.width : 0;
        else {
            var t = Math.round((a - gt[0]) / (gt[1] - gt[0]) * (o - 30)) + 30;
            t > o + 20 ? t = o + 20 : -20 > t && (t = -20), gt[0] == gt[1] && (t += 100)
        }
        return t > o + 20 ? t = o + 500 * Math.random() : 0 > t && (t = -500 * +Math.random()), t
    }

    function I(e) {
        var t, a = z(ft[e].year),
            o = dt.height,
            n = yt.update;
        return n[0] && n[0] != ft[e].category && n[1] != ft[e].category ? t = ft[e].position.y > dt.height / 2 ? o + 500 * Math.random() : -500 * +Math.random() : a !== z(wt.y.year) ? (wt.y.up = Math.round(dt.height / 2), wt.y.down = Math.round(dt.height / 2), wt.y.year = a, wt.y.direction = "down", t = wt.y.up) : "up" == wt.y.direction ? (wt.y.up += wt.y.distance, wt.y.direction = "down", t = wt.y.up) : (wt.y.direction = "up", wt.y.down -= wt.y.distance, t = wt.y.down), t > o + 20 ? t = o + 500 * Math.random() : 0 > t && (t = -500 * +Math.random()), t
    }

    function E(e) {
        var t, a = z(ft[e].year),
            o = dt.height,
            n = ft[e].category;
        return yt.update[0] == n || yt.update[1] == n ? (a !== z(wt.y.year) && (wt.y.up = Math.round(dt.height / 2), wt.y.down = Math.round(dt.height / 2), wt.y.year = a), yt.update[0] == n ? (wt.y.up += wt.y.distance, t = wt.y.up) : (wt.y.down -= wt.y.distance, t = wt.y.down)) : t = ft[e].position.y > dt.height / 2 ? o + 500 * Math.random() : -500 * +Math.random(), t > o + 20 ? t = o + 500 * Math.random() : 0 > t && (t = -500 * +Math.random()), t
    }

    function z(e) {
        return .1 == wt.group ? e : Math.floor(e / wt.group) * wt.group
    }

    function A() {
        if ("round" == _t && 0 == Ct.open) {
            var e = .8 * (bt.x - .5 * dt.width),
                t = .8 * (bt.y - .5 * dt.height);
            $t.vpx = .5 * dt.width - e / 2, $t.vpy = .5 * dt.height - t / 2, c(!1, !0)
        }
    }

    function W() {
        if (bt.x < dt.width)
            if (!wt.footer_open && !Ct.open && bt.x > 0 && bt.x < dt.width && !$("#screen2").is(":hover") && !$("#graph_toptext").is(":hover")) {
                if (lt.mouse_move.show(), lt.hover_event.html(""), lt.hover_event.removeClass(), B(), bt.x > dt.width - 200) {
                    var e = lt.current_year.outerWidth(),
                        t = dt.width - e - 12;
                    bt.x > t ? lt.current_year.css("margin-left", "-" + e + "px") : lt.current_year.css("margin-left", "0px")
                }
                for (var a, o = [], n = !1, i = 0, r = ht; r > i; i++) {
                    var s = ft[i],
                        d = k(bt.x, bt.y, s.position.x, s.position.y);
                    d[0] < bt.sensitivity && d[1] < bt.sensitivity && s.position.x == s.gx && s.position.y == s.gy ? (n = !0, d[0] < bt.sensitivity / 2 && d[1] < bt.sensitivity / 2 && o.push(i), d[0] < 3.5 && d[1] < 3.5 ? a = i : (ft[i].gs = 2 / (d[0] + d[1]) + .03, ft[i].gs < wt.size && (ft[i].gs = wt.size), ft[i].scale_speed = .02 * Math.random())) : (ft[i].scale_speed = wt.scale_speed, ft[i].gs = ft[i].os)
                }!a && o && (a = o[0]), n && Tt ? (x(), b()) : n || Tt || yt.selceted[1] || (v(), x()), a && n ? (bt.last_event = a, ft[a].scale_speed = wt.scale_speed, clearTimeout($.data(this, "before_extand")), bt.animation_done = !1, $.data(this, "before_extand", setTimeout(function() {
                    ft[a].gs = 1.6, o.length ? f(o, a) : ut.abort()
                }, 200))) : (clearTimeout($.data(this, "before_extand")), bt.last_event = 0)
            } else lt.mouse_move.hide();
        bt.y > dt.height - 80 && !Ct.open ? (lt.footer.addClass("open"), wt.footer_open = !0, lt.hover_event.empty()) : bt.y < dt.height - 180 && !Ct.open && (lt.footer.removeClass("open"), wt.footer_open = !1)
    }

    function B() {
        var e = gt[0],
            t = gt[1],
            a = t - e;
        bt.year = Math.round(bt.x / dt.width * a) + e, lt.mouse_move.css("left", bt.x + bt.marginx + "px"), $("#cursor").css("top", bt.y + bt.marginy + "px"), lt.current_year.html(S(bt.year))
    }

    function S(e) {
        return e = Math.floor(e), -1e9 >= e ? "-" + Math.round(e / -1e9 * 10) / 10 + " <span>Billion</sapn>" : -1e6 >= e ? "-" + Math.round(e / -1e6) + " <span>Million</sapn>" : -1e5 >= e ? (1e4 * Math.round(e / 1e4)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : -1e4 >= e ? (1e3 * Math.round(e / 1e3)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : -1e3 >= e ? (100 * Math.round(e / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : -100 >= e ? e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : e
    }

    function O() {
        for (var e = [{
                category: "art",
                count: 259
            }, {
                category: "assassinations",
                count: 66
            }, {
                category: "construction",
                count: 1010
            }, {
                category: "Constructions",
                count: 1
            }, {
                category: "disasters",
                count: 321
            }, {
                category: "discoveries",
                count: 231
            }, {
                category: "empiers",
                count: 3
            }, {
                category: "empires",
                count: 374
            }, {
                category: "evolution",
                count: 100
            }, {
                category: "human history",
                count: 3
            }, {
                category: "human prehistory",
                count: 134
            }, {
                category: "I dont know",
                count: 9
            }, {
                category: "invention",
                count: 1
            }, {
                category: "inventions",
                count: 715
            }, {
                category: "Literature",
                count: 1922
            }, {
                category: "music",
                count: 987
            }, {
                category: "nationality",
                count: 198
            }, {
                category: "natural history",
                count: 320
            }, {
                category: "others",
                count: 1
            }, {
                category: "politics",
                count: 1096
            }, {
                category: "religion",
                count: 140
            }, {
                category: "riots",
                count: 707
            }, {
                category: "sport",
                count: 2
            }, {
                category: "wars",
                count: 1583
            }, {
                category: "women rights",
                count: 260
            }], t = 0, a = e.length; a > t; t++) {
            var o = $("<li><div class='category'>" + e[t].category + "</div><div class='count'>" + e[t].count + "</div></li>");
            yt.list.push({
                $item: o,
                category: e[t].category,
                count: e[t].count
            }), lt.filters.append(o)
        }
        N(e)
    }

    function N(e) {
        e ? q(e) : (clearTimeout($.data(this, "updatefilters")), $.data(this, "updatefilters", setTimeout(function() {
            $.getJSON("php/filters_update.php", {
                from: gt[0],
                to: gt[1]
            }, function(e) {
                q(e)
            })
        }, 150)))
    }

    function q(e) {
        $("#graph_menu ul").css("opacity", "1.0");
        for (var t = 0, a = yt.list.length; a > t; t++) yt.list[t].count = 0;
        for (var o = 0, n = e.length; n > o; o++)
            for (var t = 0, i = yt.list.length; i > t; t++) yt.list[t].category == e[o].category && (yt.list[t].count = e[o].count);
        yt.list.sort(H);
        for (var r = 50, s = r, t = 0, a = yt.list.length; a > t; t++) 0 == yt.list[t].count ? yt.list[t].$item.hide() : yt.list[t].$item.show(), yt.list[t].$item.css("top", s - 50 + "px"), yt.list[t].$item.find(".count").text(yt.list[t].count), s += r
    }

    function H(e, t) {
        return e.count < t.count ? 1 : -1
    }

    function P() {
        for (var e = 0, t = kt.slider.length; t > e; e++) {
            var a = Math.round(kt.slider[e] * Mt.max),
                o = kt.slider[e + 1] ? Math.round(kt.slider[e + 1] * Mt.max) : Mt.max,
                n = kt.years[e],
                i = kt.years[e + 1] ? kt.years[e + 1] : gt[3],
                r = i - n,
                s = o - a;
            kt.jumps[e] = Math.abs(r / s)
        }
    }

    function j(e, t) {
        var o = i(e),
            n = i(t),
            r = o,
            s = n,
            d = 15,
            l = 0;
        d = Math.abs(o + n - (Mt.value1 + Mt.value2)) / 15, clearTimeout(Bt), Bt = setInterval(function() {
            l = 0, Math.abs(o - Mt.value1) <= d ? (r = o, l++) : o < Mt.value1 ? (r = Mt.value1 - d, l = !1) : o > Mt.value1 && (r = Mt.value1 + d, l = !1), Math.abs(n - Mt.value2) <= d ? (s = n, l++) : n < Mt.value2 ? (s = Mt.value2 - d, l = !1) : n > Mt.value2 && (s = Mt.value2 + d, l = !1), lt.slider.val([r, s]), a(r, s), 2 == l && clearTimeout(Bt)
        }, 50)
    }

    function D(e) {
        return .5 * dt.width + Math.cos(e / (.5 * ht) * $t.radius) * $t.radius
    }

    function R(e) {
        return .5 * dt.height + Math.sin(e / (.5 * ht) * $t.radius) * $t.radius
    }

    function G(e, t) {
        var a = $("#round_menu ul").scrollTop();
        $("#round_menu ul").scrollTop(0);
        var o = $("#round_menu ul").offset().top,
            n = $("#round_menu li:eq(" + e + ")"),
            i = n.position().top,
            r = n.height(),
            s = $t.select_top - o;
        $("#round_menu ul").scrollTop(a), t ? $("#round_menu ul").animate({
            scrollTop: i - s + r - 15
        }, {
            duration: 2e3,
            progress: function() {
                X()
            }
        }) : ($("#round_menu ul").scrollTop(i - o - s + 15), X())
    }

    function L(e) {
        if ("round" == _t) {
            var a = $t.key;
            lt.hover_event.empty(), lt.hover_event.removeClass(), Ct.open = !1, clearTimeout(pt), pt = setInterval(function() {
                var o = Math.abs(e - a);
                for (speed = 1 * (o / 60), 80 > o && (speed = 3), t = 0, i = speed; t < i; t++) a > e ? a -= 1 : e > a ? a += 1 : (ft[$t.target].os = 1, f([$t.target], $t.target), clearTimeout(pt));
                $("#round_year").html(S(ft[a].year)), $t.key = a;
                for (var n = 0, i = ht; i > n; n++) ft[n].speed = Math.abs(15 * Math.random());
                ft[a].speed = 7, A()
            }, 1)
        }
    }

    function X(e) {
        if ("round" == _t && !Ct.open) {
            var t = $("#round_menu ul");
            e && t.scrollTop(t.scrollTop() + -1 * e.wheelDeltaY / 2), clearTimeout($.data(this, "wait")), $.data(this, "wait", setTimeout(function() {
                var e, t, a, o, n = $t.select_top;
                $("#round_menu li").removeClass("select"), $("#round_menu li").each(function(i) {
                    var r, s = $("#round_menu li:eq(" + i + ")"),
                        d = s.offset().top;
                    return d + 20 > n ? (s.addClass("select"), r = 1 - (d - n) / 75, 0 > r && (r = 0), r > 1 && (r = 1), e = i, t = parseInt($t.stories[i - 1].i), $t.stories[i] ? (a = $t.stories[i].i - t, o = Math.round(r * a) + t, 1 == i ? $("#round_selected").addClass("first") : $("#round_selected").removeClass()) : ($("#round_selected").addClass("last"), o = t), $t.target !== t && (x(), $t.target = t, L(t)), !1) : void 0
                }), L(o)
            }, 10))
        }
    }

    function V() {
        yt.update = yt.selceted[0] ? yt.selceted : [yt.hover], clearTimeout($.data(this, "wait_before_update")), $.data(this, "wait_before_update", setTimeout(function() {
            l(!0)
        }, 150))
    }

    function Y() {
        for (var e = new PIXI.Texture.fromImage("svg/particle_color1.png"), t = 0, a = ht; a > t; t++) ft[t].texture = new PIXI.Texture(yt.selceted[0] && yt.selceted[1] && yt.selceted[0] == ft[t].category ? st : yt.selceted[0] && yt.selceted[1] && yt.selceted[1] == ft[t].category ? e : st)
    }

    function U() {
        if (Z("modes"), clearTimeout(pt), Ct.open = !1, lt.hover_event.removeClass(), lt.hover_event.empty(), b(), x(), $("#dontknow").removeClass().empty(), yt.selceted[1]) {
            yt.selceted = [], yt.update = [], yt.hover = !1, lt.filters.find("li").removeClass();
            for (var e = new PIXI.Texture.fromImage("svg/particle.png"), t = 0, a = ht; a > t; t++) ft[t].texture = new PIXI.Texture(e), ft[t].gs = wt.size
        }
        switch (_t) {
            case "home":
                $("body").removeClass().addClass("home"), wt.size = .08, dt.width = window.innerWidth - 275, $t.radius = .27 * window.innerHeight / 2, Tt = !1;
                for (var t = 0, a = ht; a > t; t++) t > 500 && (ft[t].speed = Math.abs(Math.random() * wt.speed)), ft[t].position.x < 0 && (ft[t].position.x = Math.random() * dt.width);
                gt[1] = 1890, gt[0] = 1250, $t.vpx = .4 * dt.width, $t.vpy = .4 * dt.height, F(), Q(), K();
                break;
            case "graph":
                $("body").removeClass().addClass("graph"), p(), dt.width = window.innerWidth - 290, j(gt[4], gt[5]), $("#graph_menu ul").animate({
                    scrollTop: 27
                }, {
                    duration: 1
                });
                break;
            case "round":
                1 == Wt && $("#round_tip").css("display", "table"), $("#round_h2").html("loading"), $("body").removeClass().addClass("round"), $t.loaded = !1, $t.select_top = $("#round_selected").offset().top + 40, $.getJSON("php/get_stories.php", {}, function(e) {
                    $t.radius = .27 * window.innerHeight, dt.width = window.innerWidth - 275, $("#round_h2").html("<span>Editorial </span> Stories"), $("#dice").css("opacity", "1"), $("#round_selected").css("opacity", "1");
                    for (var t = "<li></li>", a = 0, o = e.length; o > a; a++) {
                        var n = (e[a].i, S(Math.floor(e[a].year)));
                        n = String(n).replace(/(<([^>]+)>)/gi, ""), t += "<li><span>" + n + "</span>" + e[a].title + "</li>"
                    }
                    t += "<li></li>", $t.stories = e, $("#round_menu ul").html(t);
                    var i = $("#round_selected").offset().top,
                        r = $("#round_menu ul").offset().top,
                        s = i - r - 20,
                        d = i - r + 70;
                    $("#round_menu li:first-child").css("height", s + "px"), $("#round_menu li:last-child").css("height", d + "px"), $("#round_menu ul").scrollTop($("#round_menu li:eq(1)").offset().top + 20), $t.vpx = .25 * dt.width, $t.vpy = .3 * dt.height, clearTimeout($.data(this, "wait_e")), $("#round_menu ul").scrollTop(6300), G(89, !0)
                })
        }
    }

    function F() {
        var e = bt.x + bt.marginx,
            t = bt.y;
        clearTimeout($.data(this, "wait_e")), $.data(this, "wait_e", setTimeout(function() {
            if (t > xt.top && t < xt.bottom && e > xt.left2 && e < xt.left1) {
                var a = .6 * (bt.x - dt.width / 2 * .5),
                    o = .6 * (bt.y - dt.height / 2 * .5);
                $t.vpx = .5 * dt.width - a / 2, $t.vpy = .5 * dt.height - o / 2
            }
            if (Q(), t > xt.top && t < xt.bottom && e > xt.left1) {
                var n = bt.x / window.innerWidth;
                gt[0] = 500 * n + 1e3, K(!0)
            } else K()
        }, 3))
    }

    function J() {
        for (var e = 0, t = ht; t > e; e++) ft[e].gx = Math.random() * window.innerWidth, ft[e].gy = Math.random() * window.innerHeight
    }

    function K(e) {
        var t = .25 * window.innerHeight,
            a = t + window.innerHeight / 2.2 + 5;
        dt.width = window.innerWidth / 2.5, d(), wt.y.distance = 6;
        var o = wt.size / 1.2,
            n = window.innerWidth / 2 - 95;
        bt.marginx = 1500;
        for (var i = 0, r = ht - 5e3; r > i; i++) {
            var s = ft[i];
            s.gs = o, s.os = o, s.gx = T(i), s.gy = I(i), ft[i].speed = e ? 80 * wt.speed * Math.random() : 1 * wt.speed * Math.random(), s.gx < 1 ? s.gx = window.innerWidth : (s.gx += n, s.alpha = 1), (s.gy <= t || s.gy >= a || s.gx < 1) && (s.gy = s.position.y, s.gx = window.innerWidth)
        }
        dt.width = window.innerWidth - 290, bt.marginx = 275
    }

    function Q() {
        for (var e = 5e3, t = ht; t > e; e++) {
            particle = ft[e];
            var a = R(e),
                o = D(e);
            particle.gx = o, particle.gy = a, particle.z = 5 * Math.cos(e / (.5 * ht)), particle.gx = o + (o - $t.vpx) * (particle.z / $t.depth / $t.vspo_x) - (dt.width / 2 - 200) / 2 - 15, particle.gy = a + (a - $t.vpy) * (particle.z / $t.depth / $t.vspo_x) - .02 * window.innerHeight, particle.gs = particle.gy * (particle.z / $t.depth + 1) / 7e3
        }
    }

    function Z(e) {
        switch (e) {
            case "sand":
                Et.sand.currentTime > 4 && (Et.sand.currentTime = 0), Et.sand.volume = 0, at(), clearInterval($.data(this, "sand_ammount")), $.data(this, "sand_ammount", setInterval(function() {
                    at()
                }, 500));
                break;
            case "modes":
                Et.modes.play();
                break;
            case "zoom":
                Et.zoom.play();
                break;
            case "tap":
                Et.tap.play()
        }
    }

    function et() {
        Et.mute ? (Et.mute = !1, Et.sand.muted = !1, Et.modes.muted = !1, Et.tap.muted = !1, Et.background.muted = !1, Et.zoom.muted = !1, lt.sound.text("sound on")) : (Et.mute = !0, Et.sand.muted = !0, Et.modes.muted = !0, Et.tap.muted = !0, Et.zoom.muted = !0, Et.background.muted = !0, lt.sound.text("sound off"))
    }

    function tt(e) {
        if (e) var t = 1;
        else var t = 0;
        clearInterval($.data(this, "mute_audio")), $.data(this, "mute_audio", setInterval(function() {
            e ? (t -= .1, 0 == t && clearInterval($.data(this, "mute_audio"))) : (t += .1, .5 == t && clearInterval($.data(this, "mute_audio"))), 0 > t && (t = 0), Et.sand.volume = t, Et.modes.volume = t, Et.tap.volume = t, Et.zoom.volume = t, Et.background.volume = t
        }, 500))
    }

    function at() {
        for (var e = ht, t = 0, a = ht; a > t; t++) ft[t].gx == ft[t].position.x && ft[t].gy == ft[t].position.y && e--;
        e = Math.round(e / ht * 100) / 100 * 6, e > 1 && (e = 1), "round" == _t && (e /= 2), Et.sand.volume = e
    }
    var ot = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        nt = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        it = /Safari/.test(navigator.userAgent) && /Googlebot/.test(navigator.vendor),
        rt = {
            Android: function() {
                return navigator.userAgent.match(/Android/i)
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i)
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i)
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i)
            },
            any: function() {
                return rt.Android() || rt.BlackBerry() || rt.iOS() || rt.Opera() || rt.Windows()
            }
        };
    rt.any() && (window.location = "mobile.htm"), ot || nt || it || (window.location = "browser_support.htm");
    var st = new PIXI.Texture.fromImage("svg/particle.gif"),
        dt = {
            height: window.innerHeight - 50,
            width: window.innerWidth - 290
        },
        lt = {
            mvps: $("#mvps"),
            hover_event: $("#hover_event"),
            mouse_move: $("#mouse_move"),
            current_year: $("#current_year"),
            footer: $("#footer"),
            periods: $("#periods ul"),
            periods_li: $("#periods li"),
            canvas: document.getElementById("canvas"),
            slider: $("#slider"),
            slider_years: [$("#slider_years div:nth-child(1)"), $("#slider_years div:nth-child(2)")],
            filters: $("#graph_menu ul"),
            sound: $(".sound")
        },
        ct = new PIXI.WebGLRenderer(dt.width, dt.height, {
            transparent: !0,
            view: lt.canvas
        }, lt.canvas, !1, !0);
    document.body.appendChild(ct.view);
    var ut, ht, pt, vt, mt = new PIXI.Container,
        gt = [1600, 2e3, -138e8, 2015, 1600, 2e3],
        ft = [],
        yt = {
            hover: "",
            selceted: [],
            update: [],
            oldest: 0,
            list: []
        },
        _t = "graph",
        wt = {
            color: "#303438",
            speed: 20,
            scale_speed: .08,
            size: .05,
            group: 2,
            footer_open: !1,
            spacing: 75,
            y: {
                up: dt.height / 2,
                down: dt.height / 2,
                direction: "up",
                year: 0,
                distance: 0
            },
            x: {
                year: 0,
                amount: 0
            }
        },
        $t = {
            radius: 200,
            vpx: .5 * dt.width,
            vpy: .5 * dt.height,
            vspo_x: 1.5,
            vspo_y: 1.5,
            depth: -5,
            key: 0,
            z: 0,
            stories: [],
            target: 0,
            select_top: 0,
            loaded: !1
        },
        xt = {
            top: 0,
            left1: 0,
            left2: 0,
            bottom: 0
        },
        bt = {
            x: 0,
            y: 0,
            year: 0,
            particle: null,
            sensitivity: 2,
            last_event: 0,
            id: 0,
            link: "",
            title: "",
            marginx: 275,
            marginy: 15,
            video: "",
            animation_done: !1
        },
        Mt = {
            value1: 0,
            value2: 0,
            min: 1,
            max: 2e3,
            history: 0
        },
        kt = {
            slider: [0, .07, .12, .2, .27, .35, .42, .46, .5, .55, .63, .72, .85, 1],
            years: [-139e8, -46e8, -25e8, -542e6, -251e6, -65e6, -27e5, -5e4, -2500, 700, 1400, 1750, 1950],
            jumps: []
        },
        Ct = {
            open: !1
        },
        Tt = !1,
        It = !0,
        Et = {
            sand: document.getElementById("audio_sand"),
            modes: document.getElementById("audio_modes"),
            zoom: document.getElementById("audio_zoom"),
            tap: document.getElementById("audio_tap"),
            background: document.getElementById("audio_background"),
            mute: !1
        },
        zt = !1,
        At = !0,
        Wt = !0;
    ! function() {
        var e = $(".zoom").panzoom({
            cursor: !1,
            disablePan: !0
        });
        e.on("mousewheel.focal", function(e) {
            e.preventDefault();
            var t = e.delta || e.originalEvent.wheelDelta,
                o = Mt.value1,
                n = Mt.value2,
                i = bt.x / dt.width,
                r = 6;
            t > 0 ? (o += r * i, n -= r * (1 - i), $("#cursor").removeClass().addClass("zoomin")) : (o -= 7, n += 7, $("#cursor").removeClass().addClass("zoomout")), Z("zoom"), a(o, n, !0), lt.slider.val([o, n]), clearTimeout($.data(this, "remove_icon")), $.data(this, "remove_icon", setTimeout(function() {
                $("#cursor").removeClass()
            }, 150))
        })
    }(), lt.slider.noUiSlider({
        start: [0, 2e3],
        connect: !0,
        range: {
            min: Mt.min,
            max: Mt.max
        },
        behaviour: "drag",
        animate: !1
    }), lt.slider.on({
        slide: function() {
            var e = Math.round(lt.slider.val()[0]),
                t = Math.round(lt.slider.val()[1]);
            a(e, t)
        }
    }), Mt.value1 = Math.round(lt.slider.val()[0]), Mt.value2 = Math.round(lt.slider.val()[1]), e(), lt.mouse_move.click(function() {
        if (Z("tap"), bt.last_event) var e = setInterval(function() {
            bt.animation_done && (clearInterval(e), lt.hover_event.addClass("open"), $("body").addClass("hover"), Ct.open = !0, _("opener"), bt.animation_done = !1)
        }, 250)
    }), lt.hover_event.click(function() {
        Z("tap"), lt.hover_event.addClass("open"), $("body").addClass("hover"), Ct.open = !0, _("opener")
    }), $("#hover_event .wiki").click(function() {
        Z("tap"), lt.hover_event.addClass("open"), $("body").addClass("hover"), Ct.open = !0
    }), $("#hover_event .video").click(function() {
        Z("tap"), lt.hover_event.addClass("open"), $("body").addClass("hover"), Ct.open = !0
    }), lt.mvps.on("click", ".event", function() {
        Z("tap");
        var e = $(this).attr("i");
        bt.last_event = e, w(), lt.hover_event.removeClass().addClass("open"), ft[e].gs = 1.5, b(), f([e])
    }), $("#hover_event").on("click", ".video", function() {
        "graph" == _t && (w(), b()), Z("tap"), lt.hover_event.addClass("video"), bt.html = $("#matirial").html(), _("wiki"), $("#hover_container").html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="https://www.youtube.com/embed/' + bt.video + '?autoplay=1&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0&autohide=1&color=white&controls=0" frameborder="0">'), Et.mute ? $("#video").prop("volume", 0) : $("#video").prop("volume", .4)
    }), $("#hover_event").on("click", ".wiki", function() {
        Z("tap"), "graph" == _t && (w(), b()), lt.hover_event.addClass("wiki"), bt.html = $("#matirial").html(), _("wiki"), $("#hover_container").html("LOADING"), $.post("php/wiki_page.php", {
            link: bt.link,
            title: bt.title,
            year: Math.floor(ft[bt.i].year)
        }).done(function(e) {
            $("#hover_container").html(e)
        })
    }), $("#hover_event").on("click", ".realted", function() {
        Z("tap"), "graph" == _t ? m() : g()
    }), $("#hover_event").on("click", ".back", function() {
        Z("tap"), $("#matirial").html(bt.html), tt(!1), lt.hover_event.removeClass().addClass("open back_to_open")
    }), $("#hover_event").on("click", ".fullscreen", function() {
        Z("tap"), lt.hover_event.hasClass("fullscreen") ? (lt.hover_event.removeClass("fullscreen").addClass("fullscreen_back"), $("#matirial").finish()) : lt.hover_event.removeClass("fullscreen_back").addClass("fullscreen")
    }), $(document).mousemove(function(e) {
        0 == At && (bt.x = e.pageX - bt.marginx, bt.y = e.pageY, It = !1, "round" == _t ? A() : "graph" == _t ? W() : F())
    }), lt.periods_li.click(function() {
        Z("tap");
        var e = lt.periods_li.index(this) + 1,
            t = kt.years[e - 1],
            a = kt.years[e] ? kt.years[e] : gt[3];
        j(t, a)
    });
    var Bt;
    $("#dice").click(function() {
        Z("tap");
        var e = Math.round(Math.random() * $t.stories.length);
        G(e, !0)
    }), document.addEventListener("mousewheel", X), $("#graph_menu").on("mouseover", "li", function() {
        if (!Ct.open && !yt.selceted[0]) {
            var e = $(this).find(".category").html();
            yt.hover = e, V(), lt.hover_event.empty()
        }
    }), $("#graph_menu").mouseout(function() {
        Ct.open || yt.selceted[0] || (yt.hover = !1, V())
    }), lt.filters.on("click", "li", function() {
        Z("tap");
        var e = $(this).find(".category").html();
        x(), yt.hover = e, yt.selceted[0] == e ? yt.selceted.splice(0, 1) : yt.selceted[1] == e ? yt.selceted.splice(1, 1) : yt.selceted.length >= 2 ? (yt.selceted[yt.oldest] = e, yt.oldest = 0 == yt.oldest ? 1 : 0) : yt.selceted.push(e), lt.filters.find("li").each(function(e) {
            var t = lt.filters.find("li:eq(" + e + ") .category").html();
            t == yt.selceted[0] ? (lt.filters.find("li:eq(" + e + ")").removeClass().addClass("select"), yt.selceted[1] && lt.filters.find("li:eq(" + e + ")").addClass("color1")) : t == yt.selceted[1] ? (lt.filters.find("li:eq(" + e + ")").removeClass().addClass("select"), yt.selceted[0] && lt.filters.find("li:eq(" + e + ")").addClass("color2")) : lt.filters.find("li:eq(" + e + ")").removeClass()
        }), yt.update = yt.selceted[0] ? yt.selceted : [yt.hover], Y(e), l()
    }), $(".logo").click(function() {
        Z("tap"), _t = "home", U()
    }), $("#screen1").click(function() {
        Z("tap"), "round" == _t ? (J(), $.data(this, "wait", setTimeout(function() {
            _t = "graph", U()
        }, 400))) : "home" == _t ? (_t = "graph", U()) : (x(), tt(!1))
    }), $("#screen2").click(function() {
        Z("tap"), "graph" == _t ? (J(), $.data(this, "wait2", setTimeout(function() {
            _t = "round", U()
        }, 400))) : "home" == _t ? (_t = "round", U()) : ($("#matirial").html(bt.html), x())
    }), Et.sand.volume = 0, lt.sound.click(function() {
        et()
    }), document.addEventListener("visibilitychange", function() {
        Et.mute = document.hidden ? !1 : !0, et()
    }), $(".wiki").click(function() {
        window.open("https://www.wikipedia.org/")
    }), $("body").on("click", ".arrow", function() {
        j(1500, gt[1])
    }), $(window).resize(function() {
        location.reload()
    }), $("#graph_tip").click(function() {
        $(this).fadeOut("fast"), At = !1
    }), $("#round_tip").click(function() {
        $(this).fadeOut("fast"), Wt = !1
    })
});