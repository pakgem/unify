var ChatbotStories = (function (Aa) {
  "use strict";
  function Qe(r) {
    if (r === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return r;
  }
  function wn(r, e) {
    ((r.prototype = Object.create(e.prototype)),
      (r.prototype.constructor = r),
      (r.__proto__ = e));
  }
  var fe = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    Kt = { duration: 0.5, overwrite: !1, delay: 0 },
    ti,
    te,
    V,
    Se = 1e8,
    N = 1 / Se,
    ai = Math.PI * 2,
    ss = ai / 4,
    ls = 0,
    bn = Math.sqrt,
    cs = Math.cos,
    ds = Math.sin,
    $ = function (e) {
      return typeof e == "string";
    },
    W = function (e) {
      return typeof e == "function";
    },
    Ye = function (e) {
      return typeof e == "number";
    },
    ii = function (e) {
      return typeof e > "u";
    },
    Be = function (e) {
      return typeof e == "object";
    },
    ce = function (e) {
      return e !== !1;
    },
    ni = function () {
      return typeof window < "u";
    },
    ya = function (e) {
      return W(e) || $(e);
    },
    An =
      (typeof ArrayBuffer == "function" && ArrayBuffer.isView) ||
      function () {},
    ie = Array.isArray,
    us = /random\([^)]+\)/g,
    hs = /,\s*/g,
    yn = /(?:-?\.?\d|\.)+/gi,
    vn = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Dt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    ri = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    xn = /[+-]=-?[.\d]+/,
    ps = /[^,'"\[\]\s]+/gi,
    gs = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    G,
    Le,
    oi,
    si,
    we = {},
    va = {},
    _n,
    kn = function (e) {
      return (va = It(e, we)) && pe;
    },
    li = function (e, t) {
      return console.warn(
        "Invalid property",
        e,
        "set to",
        t,
        "Missing plugin? gsap.registerPlugin()",
      );
    },
    Xt = function (e, t) {
      return !t && console.warn(e);
    },
    Sn = function (e, t) {
      return (e && (we[e] = t) && va && (va[e] = t)) || we;
    },
    Jt = function () {
      return 0;
    },
    ms = { suppressEvents: !0, isStart: !0, kill: !1 },
    xa = { suppressEvents: !0, kill: !1 },
    fs = { suppressEvents: !0 },
    ci = {},
    at = [],
    di = {},
    Cn,
    be = {},
    ui = {},
    Tn = 30,
    _a = [],
    hi = "",
    pi = function (e) {
      var t = e[0],
        a,
        i;
      if ((Be(t) || W(t) || (e = [e]), !(a = (t._gsap || {}).harness))) {
        for (i = _a.length; i-- && !_a[i].targetTest(t); );
        a = _a[i];
      }
      for (i = e.length; i--; )
        (e[i] && (e[i]._gsap || (e[i]._gsap = new er(e[i], a)))) ||
          e.splice(i, 1);
      return e;
    },
    wt = function (e) {
      return e._gsap || pi(Te(e))[0]._gsap;
    },
    En = function (e, t, a) {
      return (a = e[t]) && W(a)
        ? e[t]()
        : (ii(a) && e.getAttribute && e.getAttribute(t)) || a;
    },
    de = function (e, t) {
      return (e = e.split(",")).forEach(t) || e;
    },
    j = function (e) {
      return Math.round(e * 1e5) / 1e5 || 0;
    },
    Q = function (e) {
      return Math.round(e * 1e7) / 1e7 || 0;
    },
    Rt = function (e, t) {
      var a = t.charAt(0),
        i = parseFloat(t.substr(2));
      return (
        (e = parseFloat(e)),
        a === "+" ? e + i : a === "-" ? e - i : a === "*" ? e * i : e / i
      );
    },
    ws = function (e, t) {
      for (var a = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < a; );
      return i < a;
    },
    ka = function () {
      var e = at.length,
        t = at.slice(0),
        a,
        i;
      for (di = {}, at.length = 0, a = 0; a < e; a++)
        ((i = t[a]),
          i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0));
    },
    gi = function (e) {
      return !!(e._initted || e._startAt || e.add);
    },
    Pn = function (e, t, a, i) {
      (at.length && !te && ka(),
        e.render(t, a, !!(te && t < 0 && gi(e))),
        at.length && !te && ka());
    },
    Mn = function (e) {
      var t = parseFloat(e);
      return (t || t === 0) && (e + "").match(ps).length < 2
        ? t
        : $(e)
          ? e.trim()
          : e;
    },
    Dn = function (e) {
      return e;
    },
    Ae = function (e, t) {
      for (var a in t) a in e || (e[a] = t[a]);
      return e;
    },
    bs = function (e) {
      return function (t, a) {
        for (var i in a)
          i in t || (i === "duration" && e) || i === "ease" || (t[i] = a[i]);
      };
    },
    It = function (e, t) {
      for (var a in t) e[a] = t[a];
      return e;
    },
    Rn = function r(e, t) {
      for (var a in t)
        a !== "__proto__" &&
          a !== "constructor" &&
          a !== "prototype" &&
          (e[a] = Be(t[a]) ? r(e[a] || (e[a] = {}), t[a]) : t[a]);
      return e;
    },
    Sa = function (e, t) {
      var a = {},
        i;
      for (i in e) i in t || (a[i] = e[i]);
      return a;
    },
    Zt = function (e) {
      var t = e.parent || G,
        a = e.keyframes ? bs(ie(e.keyframes)) : Ae;
      if (ce(e.inherit))
        for (; t; ) (a(e, t.vars.defaults), (t = t.parent || t._dp));
      return e;
    },
    As = function (e, t) {
      for (var a = e.length, i = a === t.length; i && a-- && e[a] === t[a]; );
      return a < 0;
    },
    In = function (e, t, a, i, n) {
      var o = e[i],
        s;
      if (n) for (s = t[n]; o && o[n] > s; ) o = o._prev;
      return (
        o
          ? ((t._next = o._next), (o._next = t))
          : ((t._next = e[a]), (e[a] = t)),
        t._next ? (t._next._prev = t) : (e[i] = t),
        (t._prev = o),
        (t.parent = t._dp = e),
        t
      );
    },
    Ca = function (e, t, a, i) {
      (a === void 0 && (a = "_first"), i === void 0 && (i = "_last"));
      var n = t._prev,
        o = t._next;
      (n ? (n._next = o) : e[a] === t && (e[a] = o),
        o ? (o._prev = n) : e[i] === t && (e[i] = n),
        (t._next = t._prev = t.parent = null));
    },
    it = function (e, t) {
      (e.parent &&
        (!t || e.parent.autoRemoveChildren) &&
        e.parent.remove &&
        e.parent.remove(e),
        (e._act = 0));
    },
    bt = function (e, t) {
      if (e && (!t || t._end > e._dur || t._start < 0))
        for (var a = e; a; ) ((a._dirty = 1), (a = a.parent));
      return e;
    },
    ys = function (e) {
      for (var t = e.parent; t && t.parent; )
        ((t._dirty = 1), t.totalDuration(), (t = t.parent));
      return e;
    },
    mi = function (e, t, a, i) {
      return (
        e._startAt &&
        (te
          ? e._startAt.revert(xa)
          : (e.vars.immediateRender && !e.vars.autoRevert) ||
            e._startAt.render(t, !0, i))
      );
    },
    vs = function r(e) {
      return !e || (e._ts && r(e.parent));
    },
    qn = function (e) {
      return e._repeat ? qt(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
    },
    qt = function (e, t) {
      var a = Math.floor((e = Q(e / t)));
      return e && a === e ? a - 1 : a;
    },
    Ta = function (e, t) {
      return (
        (e - t._start) * t._ts +
        (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
      );
    },
    Ea = function (e) {
      return (e._end = Q(
        e._start + (e._tDur / Math.abs(e._ts || e._rts || N) || 0),
      ));
    },
    Pa = function (e, t) {
      var a = e._dp;
      return (
        a &&
          a.smoothChildTiming &&
          e._ts &&
          ((e._start = Q(
            a._time -
              (e._ts > 0
                ? t / e._ts
                : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts),
          )),
          Ea(e),
          a._dirty || bt(a, e)),
        e
      );
    },
    Bn = function (e, t) {
      var a;
      if (
        ((t._time ||
          (!t._dur && t._initted) ||
          (t._start < e._time && (t._dur || !t.add))) &&
          ((a = Ta(e.rawTime(), t)),
          (!t._dur || ea(0, t.totalDuration(), a) - t._tTime > N) &&
            t.render(a, !0)),
        bt(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
      ) {
        if (e._dur < e.duration())
          for (a = e; a._dp; )
            (a.rawTime() >= 0 && a.totalTime(a._tTime), (a = a._dp));
        e._zTime = -N;
      }
    },
    Oe = function (e, t, a, i) {
      return (
        t.parent && it(t),
        (t._start = Q(
          (Ye(a) ? a : a || e !== G ? Ce(e, a, t) : e._time) + t._delay,
        )),
        (t._end = Q(
          t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0),
        )),
        In(e, t, "_first", "_last", e._sort ? "_start" : 0),
        fi(t) || (e._recent = t),
        i || Bn(e, t),
        e._ts < 0 && Pa(e, e._tTime),
        e
      );
    },
    Ln = function (e, t) {
      return (
        (we.ScrollTrigger || li("scrollTrigger", t)) &&
        we.ScrollTrigger.create(t, e)
      );
    },
    On = function (e, t, a, i, n) {
      if ((Si(e, t, n), !e._initted)) return 1;
      if (
        !a &&
        e._pt &&
        !te &&
        ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
        Cn !== ve.frame
      )
        return (at.push(e), (e._lazy = [n, i]), 1);
    },
    xs = function r(e) {
      var t = e.parent;
      return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || r(t));
    },
    fi = function (e) {
      var t = e.data;
      return t === "isFromStart" || t === "isStart";
    },
    _s = function (e, t, a, i) {
      var n = e.ratio,
        o =
          t < 0 ||
          (!t &&
            ((!e._start && xs(e) && !(!e._initted && fi(e))) ||
              ((e._ts < 0 || e._dp._ts < 0) && !fi(e))))
            ? 0
            : 1,
        s = e._rDelay,
        c = 0,
        l,
        d,
        u;
      if (
        (s &&
          e._repeat &&
          ((c = ea(0, e._tDur, t)),
          (d = qt(c, s)),
          e._yoyo && d & 1 && (o = 1 - o),
          d !== qt(e._tTime, s) &&
            ((n = 1 - o),
            e.vars.repeatRefresh && e._initted && e.invalidate())),
        o !== n || te || i || e._zTime === N || (!t && e._zTime))
      ) {
        if (!e._initted && On(e, t, i, a, c)) return;
        for (
          u = e._zTime,
            e._zTime = t || (a ? N : 0),
            a || (a = t && !u),
            e.ratio = o,
            e._from && (o = 1 - o),
            e._time = 0,
            e._tTime = c,
            l = e._pt;
          l;
        )
          (l.r(o, l.d), (l = l._next));
        (t < 0 && mi(e, t, a, !0),
          e._onUpdate && !a && ye(e, "onUpdate"),
          c && e._repeat && !a && e.parent && ye(e, "onRepeat"),
          (t >= e._tDur || t < 0) &&
            e.ratio === o &&
            (o && it(e, 1),
            !a &&
              !te &&
              (ye(e, o ? "onComplete" : "onReverseComplete", !0),
              e._prom && e._prom())));
      } else e._zTime || (e._zTime = t);
    },
    ks = function (e, t, a) {
      var i;
      if (a > t)
        for (i = e._first; i && i._start <= a; ) {
          if (i.data === "isPause" && i._start > t) return i;
          i = i._next;
        }
      else
        for (i = e._last; i && i._start >= a; ) {
          if (i.data === "isPause" && i._start < t) return i;
          i = i._prev;
        }
    },
    Bt = function (e, t, a, i) {
      var n = e._repeat,
        o = Q(t) || 0,
        s = e._tTime / e._tDur;
      return (
        s && !i && (e._time *= o / e._dur),
        (e._dur = o),
        (e._tDur = n ? (n < 0 ? 1e10 : Q(o * (n + 1) + e._rDelay * n)) : o),
        s > 0 && !i && Pa(e, (e._tTime = e._tDur * s)),
        e.parent && Ea(e),
        a || bt(e.parent, e),
        e
      );
    },
    Nn = function (e) {
      return e instanceof ue ? bt(e) : Bt(e, e._dur);
    },
    Ss = { _start: 0, endTime: Jt, totalDuration: Jt },
    Ce = function r(e, t, a) {
      var i = e.labels,
        n = e._recent || Ss,
        o = e.duration() >= Se ? n.endTime(!1) : e._dur,
        s,
        c,
        l;
      return $(t) && (isNaN(t) || t in i)
        ? ((c = t.charAt(0)),
          (l = t.substr(-1) === "%"),
          (s = t.indexOf("=")),
          c === "<" || c === ">"
            ? (s >= 0 && (t = t.replace(/=/, "")),
              (c === "<" ? n._start : n.endTime(n._repeat >= 0)) +
                (parseFloat(t.substr(1)) || 0) *
                  (l ? (s < 0 ? n : a).totalDuration() / 100 : 1))
            : s < 0
              ? (t in i || (i[t] = o), i[t])
              : ((c = parseFloat(t.charAt(s - 1) + t.substr(s + 1))),
                l && a && (c = (c / 100) * (ie(a) ? a[0] : a).totalDuration()),
                s > 1 ? r(e, t.substr(0, s - 1), a) + c : o + c))
        : t == null
          ? o
          : +t;
    },
    $t = function (e, t, a) {
      var i = Ye(t[1]),
        n = (i ? 2 : 1) + (e < 2 ? 0 : 1),
        o = t[n],
        s,
        c;
      if ((i && (o.duration = t[1]), (o.parent = a), e)) {
        for (s = o, c = a; c && !("immediateRender" in s); )
          ((s = c.vars.defaults || {}), (c = ce(c.vars.inherit) && c.parent));
        ((o.immediateRender = ce(s.immediateRender)),
          e < 2 ? (o.runBackwards = 1) : (o.startAt = t[n - 1]));
      }
      return new K(t[0], o, t[n + 1]);
    },
    nt = function (e, t) {
      return e || e === 0 ? t(e) : t;
    },
    ea = function (e, t, a) {
      return a < e ? e : a > t ? t : a;
    },
    ne = function (e, t) {
      return !$(e) || !(t = gs.exec(e)) ? "" : t[1];
    },
    Cs = function (e, t, a) {
      return nt(a, function (i) {
        return ea(e, t, i);
      });
    },
    wi = [].slice,
    Fn = function (e, t) {
      return (
        e &&
        Be(e) &&
        "length" in e &&
        ((!t && !e.length) || (e.length - 1 in e && Be(e[0]))) &&
        !e.nodeType &&
        e !== Le
      );
    },
    Ts = function (e, t, a) {
      return (
        a === void 0 && (a = []),
        e.forEach(function (i) {
          var n;
          return ($(i) && !t) || Fn(i, 1)
            ? (n = a).push.apply(n, Te(i))
            : a.push(i);
        }) || a
      );
    },
    Te = function (e, t, a) {
      return V && !t && V.selector
        ? V.selector(e)
        : $(e) && !a && (oi || !Ot())
          ? wi.call((t || si).querySelectorAll(e), 0)
          : ie(e)
            ? Ts(e, a)
            : Fn(e)
              ? wi.call(e, 0)
              : e
                ? [e]
                : [];
    },
    bi = function (e) {
      return (
        (e = Te(e)[0] || Xt("Invalid scope") || {}),
        function (t) {
          var a = e.current || e.nativeElement || e;
          return Te(
            t,
            a.querySelectorAll
              ? a
              : a === e
                ? Xt("Invalid scope") || si.createElement("div")
                : e,
          );
        }
      );
    },
    Un = function (e) {
      return e.sort(function () {
        return 0.5 - Math.random();
      });
    },
    zn = function (e) {
      if (W(e)) return e;
      var t = Be(e) ? e : { each: e },
        a = At(t.ease),
        i = t.from || 0,
        n = parseFloat(t.base) || 0,
        o = {},
        s = i > 0 && i < 1,
        c = isNaN(i) || s,
        l = t.axis,
        d = i,
        u = i;
      return (
        $(i)
          ? (d = u = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
          : !s && c && ((d = i[0]), (u = i[1])),
        function (h, m, f) {
          var p = (f || t).length,
            w = o[p],
            b,
            A,
            v,
            _,
            y,
            E,
            k,
            C,
            S;
          if (!w) {
            if (((S = t.grid === "auto" ? 0 : (t.grid || [1, Se])[1]), !S)) {
              for (
                k = -Se;
                k < (k = f[S++].getBoundingClientRect().left) && S < p;
              );
              S < p && S--;
            }
            for (
              w = o[p] = [],
                b = c ? Math.min(S, p) * d - 0.5 : i % S,
                A = S === Se ? 0 : c ? (p * u) / S - 0.5 : (i / S) | 0,
                k = 0,
                C = Se,
                E = 0;
              E < p;
              E++
            )
              ((v = (E % S) - b),
                (_ = A - ((E / S) | 0)),
                (w[E] = y =
                  l ? Math.abs(l === "y" ? _ : v) : bn(v * v + _ * _)),
                y > k && (k = y),
                y < C && (C = y));
            (i === "random" && Un(w),
              (w.max = k - C),
              (w.min = C),
              (w.v = p =
                (parseFloat(t.amount) ||
                  parseFloat(t.each) *
                    (S > p
                      ? p - 1
                      : l
                        ? l === "y"
                          ? p / S
                          : S
                        : Math.max(S, p / S)) ||
                  0) * (i === "edges" ? -1 : 1)),
              (w.b = p < 0 ? n - p : n),
              (w.u = ne(t.amount || t.each) || 0),
              (a = a && p < 0 ? Us(a) : a));
          }
          return (
            (p = (w[h] - w.min) / w.max || 0),
            Q(w.b + (a ? a(p) : p) * w.v) + w.u
          );
        }
      );
    },
    Ai = function (e) {
      var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
      return function (a) {
        var i = Q(Math.round(parseFloat(a) / e) * e * t);
        return (i - (i % 1)) / t + (Ye(a) ? 0 : ne(a));
      };
    },
    Hn = function (e, t) {
      var a = ie(e),
        i,
        n;
      return (
        !a &&
          Be(e) &&
          ((i = a = e.radius || Se),
          e.values
            ? ((e = Te(e.values)), (n = !Ye(e[0])) && (i *= i))
            : (e = Ai(e.increment))),
        nt(
          t,
          a
            ? W(e)
              ? function (o) {
                  return ((n = e(o)), Math.abs(n - o) <= i ? n : o);
                }
              : function (o) {
                  for (
                    var s = parseFloat(n ? o.x : o),
                      c = parseFloat(n ? o.y : 0),
                      l = Se,
                      d = 0,
                      u = e.length,
                      h,
                      m;
                    u--;
                  )
                    (n
                      ? ((h = e[u].x - s),
                        (m = e[u].y - c),
                        (h = h * h + m * m))
                      : (h = Math.abs(e[u] - s)),
                      h < l && ((l = h), (d = u)));
                  return (
                    (d = !i || l <= i ? e[d] : o),
                    n || d === o || Ye(o) ? d : d + ne(o)
                  );
                }
            : Ai(e),
        )
      );
    },
    Vn = function (e, t, a, i) {
      return nt(ie(e) ? !t : a === !0 ? !!(a = 0) : !i, function () {
        return ie(e)
          ? e[~~(Math.random() * e.length)]
          : (a = a || 1e-5) &&
              (i = a < 1 ? Math.pow(10, (a + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (e - a / 2 + Math.random() * (t - e + a * 0.99)) / a,
                ) *
                  a *
                  i,
              ) / i;
      });
    },
    Es = function () {
      for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
        t[a] = arguments[a];
      return function (i) {
        return t.reduce(function (n, o) {
          return o(n);
        }, i);
      };
    },
    Ps = function (e, t) {
      return function (a) {
        return e(parseFloat(a)) + (t || ne(a));
      };
    },
    Ms = function (e, t, a) {
      return Qn(e, t, 0, 1, a);
    },
    Gn = function (e, t, a) {
      return nt(a, function (i) {
        return e[~~t(i)];
      });
    },
    Ds = function r(e, t, a) {
      var i = t - e;
      return ie(e)
        ? Gn(e, r(0, e.length), t)
        : nt(a, function (n) {
            return ((i + ((n - e) % i)) % i) + e;
          });
    },
    Rs = function r(e, t, a) {
      var i = t - e,
        n = i * 2;
      return ie(e)
        ? Gn(e, r(0, e.length - 1), t)
        : nt(a, function (o) {
            return (
              (o = (n + ((o - e) % n)) % n || 0),
              e + (o > i ? n - o : o)
            );
          });
    },
    ta = function (e) {
      return e.replace(us, function (t) {
        var a = t.indexOf("[") + 1,
          i = t.substring(a || 7, a ? t.indexOf("]") : t.length - 1).split(hs);
        return Vn(a ? i : +i[0], a ? 0 : +i[1], +i[2] || 1e-5);
      });
    },
    Qn = function (e, t, a, i, n) {
      var o = t - e,
        s = i - a;
      return nt(n, function (c) {
        return a + (((c - e) / o) * s || 0);
      });
    },
    Is = function r(e, t, a, i) {
      var n = isNaN(e + t)
        ? 0
        : function (m) {
            return (1 - m) * e + m * t;
          };
      if (!n) {
        var o = $(e),
          s = {},
          c,
          l,
          d,
          u,
          h;
        if ((a === !0 && (i = 1) && (a = null), o))
          ((e = { p: e }), (t = { p: t }));
        else if (ie(e) && !ie(t)) {
          for (d = [], u = e.length, h = u - 2, l = 1; l < u; l++)
            d.push(r(e[l - 1], e[l]));
          (u--,
            (n = function (f) {
              f *= u;
              var p = Math.min(h, ~~f);
              return d[p](f - p);
            }),
            (a = t));
        } else i || (e = It(ie(e) ? [] : {}, e));
        if (!d) {
          for (c in t) _i.call(s, e, c, "get", t[c]);
          n = function (f) {
            return Ei(f, s) || (o ? e.p : e);
          };
        }
      }
      return nt(a, n);
    },
    Yn = function (e, t, a) {
      var i = e.labels,
        n = Se,
        o,
        s,
        c;
      for (o in i)
        ((s = i[o] - t),
          s < 0 == !!a && s && n > (s = Math.abs(s)) && ((c = o), (n = s)));
      return c;
    },
    ye = function (e, t, a) {
      var i = e.vars,
        n = i[t],
        o = V,
        s = e._ctx,
        c,
        l,
        d;
      if (n)
        return (
          (c = i[t + "Params"]),
          (l = i.callbackScope || e),
          a && at.length && ka(),
          s && (V = s),
          (d = c ? n.apply(l, c) : n.call(l)),
          (V = o),
          d
        );
    },
    aa = function (e) {
      return (
        it(e),
        e.scrollTrigger && e.scrollTrigger.kill(!!te),
        e.progress() < 1 && ye(e, "onInterrupt"),
        e
      );
    },
    Lt,
    Wn = [],
    jn = function (e) {
      if (e)
        if (((e = (!e.name && e.default) || e), ni() || e.headless)) {
          var t = e.name,
            a = W(e),
            i =
              t && !a && e.init
                ? function () {
                    this._props = [];
                  }
                : e,
            n = {
              init: Jt,
              render: Ei,
              add: _i,
              kill: Xs,
              modifier: Ks,
              rawVars: 0,
            },
            o = {
              targetTest: 0,
              get: 0,
              getSetter: Ti,
              aliases: {},
              register: 0,
            };
          if ((Ot(), e !== i)) {
            if (be[t]) return;
            (Ae(i, Ae(Sa(e, n), o)),
              It(i.prototype, It(n, Sa(e, o))),
              (be[(i.prop = t)] = i),
              e.targetTest && (_a.push(i), (ci[t] = 1)),
              (t =
                (t === "css"
                  ? "CSS"
                  : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"));
          }
          (Sn(t, i), e.register && e.register(pe, i, he));
        } else Wn.push(e);
    },
    F = 255,
    ia = {
      aqua: [0, F, F],
      lime: [0, F, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, F],
      navy: [0, 0, 128],
      white: [F, F, F],
      olive: [128, 128, 0],
      yellow: [F, F, 0],
      orange: [F, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [F, 0, 0],
      pink: [F, 192, 203],
      cyan: [0, F, F],
      transparent: [F, F, F, 0],
    },
    yi = function (e, t, a) {
      return (
        (e += e < 0 ? 1 : e > 1 ? -1 : 0),
        ((e * 6 < 1
          ? t + (a - t) * e * 6
          : e < 0.5
            ? a
            : e * 3 < 2
              ? t + (a - t) * (2 / 3 - e) * 6
              : t) *
          F +
          0.5) |
          0
      );
    },
    Kn = function (e, t, a) {
      var i = e ? (Ye(e) ? [e >> 16, (e >> 8) & F, e & F] : 0) : ia.black,
        n,
        o,
        s,
        c,
        l,
        d,
        u,
        h,
        m,
        f;
      if (!i) {
        if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), ia[e]))
          i = ia[e];
        else if (e.charAt(0) === "#") {
          if (
            (e.length < 6 &&
              ((n = e.charAt(1)),
              (o = e.charAt(2)),
              (s = e.charAt(3)),
              (e =
                "#" +
                n +
                n +
                o +
                o +
                s +
                s +
                (e.length === 5 ? e.charAt(4) + e.charAt(4) : ""))),
            e.length === 9)
          )
            return (
              (i = parseInt(e.substr(1, 6), 16)),
              [i >> 16, (i >> 8) & F, i & F, parseInt(e.substr(7), 16) / 255]
            );
          ((e = parseInt(e.substr(1), 16)),
            (i = [e >> 16, (e >> 8) & F, e & F]));
        } else if (e.substr(0, 3) === "hsl") {
          if (((i = f = e.match(yn)), !t))
            ((c = (+i[0] % 360) / 360),
              (l = +i[1] / 100),
              (d = +i[2] / 100),
              (o = d <= 0.5 ? d * (l + 1) : d + l - d * l),
              (n = d * 2 - o),
              i.length > 3 && (i[3] *= 1),
              (i[0] = yi(c + 1 / 3, n, o)),
              (i[1] = yi(c, n, o)),
              (i[2] = yi(c - 1 / 3, n, o)));
          else if (~e.indexOf("="))
            return ((i = e.match(vn)), a && i.length < 4 && (i[3] = 1), i);
        } else i = e.match(yn) || ia.transparent;
        i = i.map(Number);
      }
      return (
        t &&
          !f &&
          ((n = i[0] / F),
          (o = i[1] / F),
          (s = i[2] / F),
          (u = Math.max(n, o, s)),
          (h = Math.min(n, o, s)),
          (d = (u + h) / 2),
          u === h
            ? (c = l = 0)
            : ((m = u - h),
              (l = d > 0.5 ? m / (2 - u - h) : m / (u + h)),
              (c =
                u === n
                  ? (o - s) / m + (o < s ? 6 : 0)
                  : u === o
                    ? (s - n) / m + 2
                    : (n - o) / m + 4),
              (c *= 60)),
          (i[0] = ~~(c + 0.5)),
          (i[1] = ~~(l * 100 + 0.5)),
          (i[2] = ~~(d * 100 + 0.5))),
        a && i.length < 4 && (i[3] = 1),
        i
      );
    },
    Xn = function (e) {
      var t = [],
        a = [],
        i = -1;
      return (
        e.split(rt).forEach(function (n) {
          var o = n.match(Dt) || [];
          (t.push.apply(t, o), a.push((i += o.length + 1)));
        }),
        (t.c = a),
        t
      );
    },
    Jn = function (e, t, a) {
      var i = "",
        n = (e + i).match(rt),
        o = t ? "hsla(" : "rgba(",
        s = 0,
        c,
        l,
        d,
        u;
      if (!n) return e;
      if (
        ((n = n.map(function (h) {
          return (
            (h = Kn(h, t, 1)) &&
            o +
              (t
                ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3]
                : h.join(",")) +
              ")"
          );
        })),
        a && ((d = Xn(e)), (c = a.c), c.join(i) !== d.c.join(i)))
      )
        for (l = e.replace(rt, "1").split(Dt), u = l.length - 1; s < u; s++)
          i +=
            l[s] +
            (~c.indexOf(s)
              ? n.shift() || o + "0,0,0,0)"
              : (d.length ? d : n.length ? n : a).shift());
      if (!l)
        for (l = e.split(rt), u = l.length - 1; s < u; s++) i += l[s] + n[s];
      return i + l[u];
    },
    rt = (function () {
      var r =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        e;
      for (e in ia) r += "|" + e + "\\b";
      return new RegExp(r + ")", "gi");
    })(),
    qs = /hsl[a]?\(/,
    Zn = function (e) {
      var t = e.join(" "),
        a;
      if (((rt.lastIndex = 0), rt.test(t)))
        return (
          (a = qs.test(t)),
          (e[1] = Jn(e[1], a)),
          (e[0] = Jn(e[0], a, Xn(e[1]))),
          !0
        );
    },
    na,
    ve = (function () {
      var r = Date.now,
        e = 500,
        t = 33,
        a = r(),
        i = a,
        n = 1e3 / 240,
        o = n,
        s = [],
        c,
        l,
        d,
        u,
        h,
        m,
        f = function p(w) {
          var b = r() - i,
            A = w === !0,
            v,
            _,
            y,
            E;
          if (
            ((b > e || b < 0) && (a += b - t),
            (i += b),
            (y = i - a),
            (v = y - o),
            (v > 0 || A) &&
              ((E = ++u.frame),
              (h = y - u.time * 1e3),
              (u.time = y = y / 1e3),
              (o += v + (v >= n ? 4 : n - v)),
              (_ = 1)),
            A || (c = l(p)),
            _)
          )
            for (m = 0; m < s.length; m++) s[m](y, h, E, w);
        };
      return (
        (u = {
          time: 0,
          frame: 0,
          tick: function () {
            f(!0);
          },
          deltaRatio: function (w) {
            return h / (1e3 / (w || 60));
          },
          wake: function () {
            _n &&
              (!oi &&
                ni() &&
                ((Le = oi = window),
                (si = Le.document || {}),
                (we.gsap = pe),
                (Le.gsapVersions || (Le.gsapVersions = [])).push(pe.version),
                kn(va || Le.GreenSockGlobals || (!Le.gsap && Le) || {}),
                Wn.forEach(jn)),
              (d = typeof requestAnimationFrame < "u" && requestAnimationFrame),
              c && u.sleep(),
              (l =
                d ||
                function (w) {
                  return setTimeout(w, (o - u.time * 1e3 + 1) | 0);
                }),
              (na = 1),
              f(2));
          },
          sleep: function () {
            ((d ? cancelAnimationFrame : clearTimeout)(c), (na = 0), (l = Jt));
          },
          lagSmoothing: function (w, b) {
            ((e = w || 1 / 0), (t = Math.min(b || 33, e)));
          },
          fps: function (w) {
            ((n = 1e3 / (w || 240)), (o = u.time * 1e3 + n));
          },
          add: function (w, b, A) {
            var v = b
              ? function (_, y, E, k) {
                  (w(_, y, E, k), u.remove(v));
                }
              : w;
            return (u.remove(w), s[A ? "unshift" : "push"](v), Ot(), v);
          },
          remove: function (w, b) {
            ~(b = s.indexOf(w)) && s.splice(b, 1) && m >= b && m--;
          },
          _listeners: s,
        }),
        u
      );
    })(),
    Ot = function () {
      return !na && ve.wake();
    },
    R = {},
    Bs = /^[\d.\-M][\d.\-,\s]/,
    Ls = /["']/g,
    Os = function (e) {
      for (
        var t = {},
          a = e.substr(1, e.length - 3).split(":"),
          i = a[0],
          n = 1,
          o = a.length,
          s,
          c,
          l;
        n < o;
        n++
      )
        ((c = a[n]),
          (s = n !== o - 1 ? c.lastIndexOf(",") : c.length),
          (l = c.substr(0, s)),
          (t[i] = isNaN(l) ? l.replace(Ls, "").trim() : +l),
          (i = c.substr(s + 1).trim()));
      return t;
    },
    Ns = function (e) {
      var t = e.indexOf("(") + 1,
        a = e.indexOf(")"),
        i = e.indexOf("(", t);
      return e.substring(t, ~i && i < a ? e.indexOf(")", a + 1) : a);
    },
    Fs = function (e) {
      var t = (e + "").split("("),
        a = R[t[0]];
      return a && t.length > 1 && a.config
        ? a.config.apply(
            null,
            ~e.indexOf("{") ? [Os(t[1])] : Ns(e).split(",").map(Mn),
          )
        : R._CE && Bs.test(e)
          ? R._CE("", e)
          : a;
    },
    Us = function (e) {
      return function (t) {
        return 1 - e(1 - t);
      };
    },
    At = function (e, t) {
      return (e && (W(e) ? e : R[e] || Fs(e))) || t;
    },
    yt = function (e, t, a, i) {
      (a === void 0 &&
        (a = function (c) {
          return 1 - t(1 - c);
        }),
        i === void 0 &&
          (i = function (c) {
            return c < 0.5 ? t(c * 2) / 2 : 1 - t((1 - c) * 2) / 2;
          }));
      var n = { easeIn: t, easeOut: a, easeInOut: i },
        o;
      return (
        de(e, function (s) {
          ((R[s] = we[s] = n), (R[(o = s.toLowerCase())] = a));
          for (var c in n)
            R[
              o + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")
            ] = R[s + "." + c] = n[c];
        }),
        n
      );
    },
    $n = function (e) {
      return function (t) {
        return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
      };
    },
    vi = function r(e, t, a) {
      var i = t >= 1 ? t : 1,
        n = (a || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1),
        o = (n / ai) * (Math.asin(1 / i) || 0),
        s = function (d) {
          return d === 1 ? 1 : i * Math.pow(2, -10 * d) * ds((d - o) * n) + 1;
        },
        c =
          e === "out"
            ? s
            : e === "in"
              ? function (l) {
                  return 1 - s(1 - l);
                }
              : $n(s);
      return (
        (n = ai / n),
        (c.config = function (l, d) {
          return r(e, l, d);
        }),
        c
      );
    },
    xi = function r(e, t) {
      t === void 0 && (t = 1.70158);
      var a = function (o) {
          return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
        },
        i =
          e === "out"
            ? a
            : e === "in"
              ? function (n) {
                  return 1 - a(1 - n);
                }
              : $n(a);
      return (
        (i.config = function (n) {
          return r(e, n);
        }),
        i
      );
    };
  (de("Linear,Quad,Cubic,Quart,Quint,Strong", function (r, e) {
    var t = e < 5 ? e + 1 : e;
    yt(
      r + ",Power" + (t - 1),
      e
        ? function (a) {
            return Math.pow(a, t);
          }
        : function (a) {
            return a;
          },
      function (a) {
        return 1 - Math.pow(1 - a, t);
      },
      function (a) {
        return a < 0.5
          ? Math.pow(a * 2, t) / 2
          : 1 - Math.pow((1 - a) * 2, t) / 2;
      },
    );
  }),
    (R.Linear.easeNone = R.none = R.Linear.easeIn),
    yt("Elastic", vi("in"), vi("out"), vi()),
    (function (r, e) {
      var t = 1 / e,
        a = 2 * t,
        i = 2.5 * t,
        n = function (s) {
          return s < t
            ? r * s * s
            : s < a
              ? r * Math.pow(s - 1.5 / e, 2) + 0.75
              : s < i
                ? r * (s -= 2.25 / e) * s + 0.9375
                : r * Math.pow(s - 2.625 / e, 2) + 0.984375;
        };
      yt(
        "Bounce",
        function (o) {
          return 1 - n(1 - o);
        },
        n,
      );
    })(7.5625, 2.75),
    yt("Expo", function (r) {
      return Math.pow(2, 10 * (r - 1)) * r + r * r * r * r * r * r * (1 - r);
    }),
    yt("Circ", function (r) {
      return -(bn(1 - r * r) - 1);
    }),
    yt("Sine", function (r) {
      return r === 1 ? 1 : -cs(r * ss) + 1;
    }),
    yt("Back", xi("in"), xi("out"), xi()),
    (R.SteppedEase =
      R.steps =
      we.SteppedEase =
        {
          config: function (e, t) {
            e === void 0 && (e = 1);
            var a = 1 / e,
              i = e + (t ? 0 : 1),
              n = t ? 1 : 0,
              o = 1 - N;
            return function (s) {
              return (((i * ea(0, o, s)) | 0) + n) * a;
            };
          },
        }),
    (Kt.ease = R["quad.out"]),
    de(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (r) {
        return (hi += r + "," + r + "Params,");
      },
    ));
  var er = function (e, t) {
      ((this.id = ls++),
        (e._gsap = this),
        (this.target = e),
        (this.harness = t),
        (this.get = t ? t.get : En),
        (this.set = t ? t.getSetter : Ti));
    },
    ra = (function () {
      function r(t) {
        ((this.vars = t),
          (this._delay = +t.delay || 0),
          (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
            ((this._rDelay = t.repeatDelay || 0),
            (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
          (this._ts = 1),
          Bt(this, +t.duration, 1, 1),
          (this.data = t.data),
          V && ((this._ctx = V), V.data.push(this)),
          na || ve.wake());
      }
      var e = r.prototype;
      return (
        (e.delay = function (a) {
          return a || a === 0
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + a - this._delay),
              (this._delay = a),
              this)
            : this._delay;
        }),
        (e.duration = function (a) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a,
              )
            : this.totalDuration() && this._dur;
        }),
        (e.totalDuration = function (a) {
          return arguments.length
            ? ((this._dirty = 0),
              Bt(
                this,
                this._repeat < 0
                  ? a
                  : (a - this._repeat * this._rDelay) / (this._repeat + 1),
              ))
            : this._tDur;
        }),
        (e.totalTime = function (a, i) {
          if ((Ot(), !arguments.length)) return this._tTime;
          var n = this._dp;
          if (n && n.smoothChildTiming && this._ts) {
            for (
              Pa(this, a), !n._dp || n.parent || Bn(n, this);
              n && n.parent;
            )
              (n.parent._time !==
                n._start +
                  (n._ts >= 0
                    ? n._tTime / n._ts
                    : (n.totalDuration() - n._tTime) / -n._ts) &&
                n.totalTime(n._tTime, !0),
                (n = n.parent));
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && a < this._tDur) ||
                (this._ts < 0 && a > 0) ||
                (!this._tDur && !a)) &&
              Oe(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== a ||
              (!this._dur && !i) ||
              (this._initted && Math.abs(this._zTime) === N) ||
              (!this._initted && this._dur && a) ||
              (!a && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = a), Pn(this, a, i)),
            this
          );
        }),
        (e.time = function (a, i) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), a + qn(this)) %
                  (this._dur + this._rDelay) || (a ? this._dur : 0),
                i,
              )
            : this._time;
        }),
        (e.totalProgress = function (a, i) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * a, i)
            : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.rawTime() >= 0 && this._initted
                ? 1
                : 0;
        }),
        (e.progress = function (a, i) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && !(this.iteration() & 1) ? 1 - a : a) +
                  qn(this),
                i,
              )
            : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.rawTime() > 0
                ? 1
                : 0;
        }),
        (e.iteration = function (a, i) {
          var n = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (a - 1) * n, i)
            : this._repeat
              ? qt(this._tTime, n) + 1
              : 1;
        }),
        (e.timeScale = function (a, i) {
          if (!arguments.length) return this._rts === -N ? 0 : this._rts;
          if (this._rts === a) return this;
          var n =
            this.parent && this._ts ? Ta(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +a || 0),
            (this._ts = this._ps || a === -N ? 0 : this._rts),
            this.totalTime(
              ea(-Math.abs(this._delay), this.totalDuration(), n),
              i !== !1,
            ),
            Ea(this),
            ys(this)
          );
        }),
        (e.paused = function (a) {
          return arguments.length
            ? (this._ps !== a &&
                ((this._ps = a),
                a
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (Ot(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      this.progress() === 1 &&
                        Math.abs(this._zTime) !== N &&
                        (this._tTime -= N),
                    ))),
              this)
            : this._ps;
        }),
        (e.startTime = function (a) {
          if (arguments.length) {
            this._start = Q(a);
            var i = this.parent || this._dp;
            return (
              i &&
                (i._sort || !this.parent) &&
                Oe(i, this, this._start - this._delay),
              this
            );
          }
          return this._start;
        }),
        (e.endTime = function (a) {
          return (
            this._start +
            (ce(a) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (e.rawTime = function (a) {
          var i = this.parent || this._dp;
          return i
            ? a &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
                ? Ta(i.rawTime(a), this)
                : this._tTime
            : this._tTime;
        }),
        (e.revert = function (a) {
          a === void 0 && (a = fs);
          var i = te;
          return (
            (te = a),
            gi(this) &&
              (this.timeline && this.timeline.revert(a),
              this.totalTime(-0.01, a.suppressEvents)),
            this.data !== "nested" && a.kill !== !1 && this.kill(),
            (te = i),
            this
          );
        }),
        (e.globalTime = function (a) {
          for (var i = this, n = arguments.length ? a : i.rawTime(); i; )
            ((n = i._start + n / (Math.abs(i._ts) || 1)), (i = i._dp));
          return !this.parent && this._sat ? this._sat.globalTime(a) : n;
        }),
        (e.repeat = function (a) {
          return arguments.length
            ? ((this._repeat = a === 1 / 0 ? -2 : a), Nn(this))
            : this._repeat === -2
              ? 1 / 0
              : this._repeat;
        }),
        (e.repeatDelay = function (a) {
          if (arguments.length) {
            var i = this._time;
            return ((this._rDelay = a), Nn(this), i ? this.time(i) : this);
          }
          return this._rDelay;
        }),
        (e.yoyo = function (a) {
          return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
        }),
        (e.seek = function (a, i) {
          return this.totalTime(Ce(this, a), ce(i));
        }),
        (e.restart = function (a, i) {
          return (
            this.play().totalTime(a ? -this._delay : 0, ce(i)),
            this._dur || (this._zTime = -N),
            this
          );
        }),
        (e.play = function (a, i) {
          return (a != null && this.seek(a, i), this.reversed(!1).paused(!1));
        }),
        (e.reverse = function (a, i) {
          return (
            a != null && this.seek(a || this.totalDuration(), i),
            this.reversed(!0).paused(!1)
          );
        }),
        (e.pause = function (a, i) {
          return (a != null && this.seek(a, i), this.paused(!0));
        }),
        (e.resume = function () {
          return this.paused(!1);
        }),
        (e.reversed = function (a) {
          return arguments.length
            ? (!!a !== this.reversed() &&
                this.timeScale(-this._rts || (a ? -N : 0)),
              this)
            : this._rts < 0;
        }),
        (e.invalidate = function () {
          return ((this._initted = this._act = 0), (this._zTime = -N), this);
        }),
        (e.isActive = function () {
          var a = this.parent || this._dp,
            i = this._start,
            n;
          return !!(
            !a ||
            (this._ts &&
              this._initted &&
              a.isActive() &&
              (n = a.rawTime(!0)) >= i &&
              n < this.endTime(!0) - N)
          );
        }),
        (e.eventCallback = function (a, i, n) {
          var o = this.vars;
          return arguments.length > 1
            ? (i
                ? ((o[a] = i),
                  n && (o[a + "Params"] = n),
                  a === "onUpdate" && (this._onUpdate = i))
                : delete o[a],
              this)
            : o[a];
        }),
        (e.then = function (a) {
          var i = this,
            n = i._prom;
          return new Promise(function (o) {
            var s = W(a) ? a : Dn,
              c = function () {
                var d = i.then;
                ((i.then = null),
                  n && n(),
                  W(s) && (s = s(i)) && (s.then || s === i) && (i.then = d),
                  o(s),
                  (i.then = d));
              };
            (i._initted && i.totalProgress() === 1 && i._ts >= 0) ||
            (!i._tTime && i._ts < 0)
              ? c()
              : (i._prom = c);
          });
        }),
        (e.kill = function () {
          aa(this);
        }),
        r
      );
    })();
  Ae(ra.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -N,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var ue = (function (r) {
    wn(e, r);
    function e(a, i) {
      var n;
      return (
        a === void 0 && (a = {}),
        (n = r.call(this, a) || this),
        (n.labels = {}),
        (n.smoothChildTiming = !!a.smoothChildTiming),
        (n.autoRemoveChildren = !!a.autoRemoveChildren),
        (n._sort = ce(a.sortChildren)),
        G && Oe(a.parent || G, Qe(n), i),
        a.reversed && n.reverse(),
        a.paused && n.paused(!0),
        a.scrollTrigger && Ln(Qe(n), a.scrollTrigger),
        n
      );
    }
    var t = e.prototype;
    return (
      (t.to = function (i, n, o) {
        return ($t(0, arguments, this), this);
      }),
      (t.from = function (i, n, o) {
        return ($t(1, arguments, this), this);
      }),
      (t.fromTo = function (i, n, o, s) {
        return ($t(2, arguments, this), this);
      }),
      (t.set = function (i, n, o) {
        return (
          (n.duration = 0),
          (n.parent = this),
          Zt(n).repeatDelay || (n.repeat = 0),
          (n.immediateRender = !!n.immediateRender),
          new K(i, n, Ce(this, o), 1),
          this
        );
      }),
      (t.call = function (i, n, o) {
        return Oe(this, K.delayedCall(0, i, n), o);
      }),
      (t.staggerTo = function (i, n, o, s, c, l, d) {
        return (
          (o.duration = n),
          (o.stagger = o.stagger || s),
          (o.onComplete = l),
          (o.onCompleteParams = d),
          (o.parent = this),
          new K(i, o, Ce(this, c)),
          this
        );
      }),
      (t.staggerFrom = function (i, n, o, s, c, l, d) {
        return (
          (o.runBackwards = 1),
          (Zt(o).immediateRender = ce(o.immediateRender)),
          this.staggerTo(i, n, o, s, c, l, d)
        );
      }),
      (t.staggerFromTo = function (i, n, o, s, c, l, d, u) {
        return (
          (s.startAt = o),
          (Zt(s).immediateRender = ce(s.immediateRender)),
          this.staggerTo(i, n, s, c, l, d, u)
        );
      }),
      (t.render = function (i, n, o) {
        var s = this._time,
          c = this._dirty ? this.totalDuration() : this._tDur,
          l = this._dur,
          d = i <= 0 ? 0 : Q(i),
          u = this._zTime < 0 != i < 0 && (this._initted || !l),
          h,
          m,
          f,
          p,
          w,
          b,
          A,
          v,
          _,
          y,
          E,
          k;
        if (
          (this !== G && d > c && i >= 0 && (d = c),
          d !== this._tTime || o || u)
        ) {
          if (
            (s !== this._time &&
              l &&
              ((d += this._time - s), (i += this._time - s)),
            (h = d),
            (_ = this._start),
            (v = this._ts),
            (b = !v),
            u && (l || (s = this._zTime), (i || !n) && (this._zTime = i)),
            this._repeat)
          ) {
            if (
              ((E = this._yoyo),
              (w = l + this._rDelay),
              this._repeat < -1 && i < 0)
            )
              return this.totalTime(w * 100 + i, n, o);
            if (
              ((h = Q(d % w)),
              d === c
                ? ((p = this._repeat), (h = l))
                : ((y = Q(d / w)),
                  (p = ~~y),
                  p && p === y && ((h = l), p--),
                  h > l && (h = l)),
              (y = qt(this._tTime, w)),
              !s &&
                this._tTime &&
                y !== p &&
                this._tTime - y * w - this._dur <= 0 &&
                (y = p),
              E && p & 1 && ((h = l - h), (k = 1)),
              p !== y && !this._lock)
            ) {
              var C = E && y & 1,
                S = C === (E && p & 1);
              if (
                (p < y && (C = !C),
                (s = C ? 0 : d % l ? l : d),
                (this._lock = 1),
                (this.render(s || (k ? 0 : Q(p * w)), n, !l)._lock = 0),
                (this._tTime = d),
                !n && this.parent && ye(this, "onRepeat"),
                this.vars.repeatRefresh &&
                  !k &&
                  ((this.invalidate()._lock = 1), (y = p)),
                (s && s !== this._time) ||
                  b !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((l = this._dur),
                (c = this._tDur),
                S &&
                  ((this._lock = 2),
                  (s = C ? l : -1e-4),
                  this.render(s, !0),
                  this.vars.repeatRefresh && !k && this.invalidate()),
                (this._lock = 0),
                !this._ts && !b)
              )
                return this;
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((A = ks(this, Q(s), Q(h))), A && (d -= h - (h = A._start))),
            (this._tTime = d),
            (this._time = h),
            (this._act = !!v),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = i),
              (s = 0)),
            !s &&
              d &&
              l &&
              !n &&
              !y &&
              (ye(this, "onStart"), this._tTime !== d))
          )
            return this;
          if (h >= s && i >= 0)
            for (m = this._first; m; ) {
              if (
                ((f = m._next), (m._act || h >= m._start) && m._ts && A !== m)
              ) {
                if (m.parent !== this) return this.render(i, n, o);
                if (
                  (m.render(
                    m._ts > 0
                      ? (h - m._start) * m._ts
                      : (m._dirty ? m.totalDuration() : m._tDur) +
                          (h - m._start) * m._ts,
                    n,
                    o,
                  ),
                  h !== this._time || (!this._ts && !b))
                ) {
                  ((A = 0), f && (d += this._zTime = -N));
                  break;
                }
              }
              m = f;
            }
          else {
            m = this._last;
            for (var M = i < 0 ? i : h; m; ) {
              if (
                ((f = m._prev), (m._act || M <= m._end) && m._ts && A !== m)
              ) {
                if (m.parent !== this) return this.render(i, n, o);
                if (
                  (m.render(
                    m._ts > 0
                      ? (M - m._start) * m._ts
                      : (m._dirty ? m.totalDuration() : m._tDur) +
                          (M - m._start) * m._ts,
                    n,
                    o || (te && gi(m)),
                  ),
                  h !== this._time || (!this._ts && !b))
                ) {
                  ((A = 0), f && (d += this._zTime = M ? -N : N));
                  break;
                }
              }
              m = f;
            }
          }
          if (
            A &&
            !n &&
            (this.pause(),
            (A.render(h >= s ? 0 : -N)._zTime = h >= s ? 1 : -1),
            this._ts)
          )
            return ((this._start = _), Ea(this), this.render(i, n, o));
          (this._onUpdate && !n && ye(this, "onUpdate", !0),
            ((d === c && this._tTime >= this.totalDuration()) || (!d && s)) &&
              (_ === this._start || Math.abs(v) !== Math.abs(this._ts)) &&
              (this._lock ||
                ((i || !l) &&
                  ((d === c && this._ts > 0) || (!d && this._ts < 0)) &&
                  it(this, 1),
                !n &&
                  !(i < 0 && !s) &&
                  (d || s || !c) &&
                  (ye(
                    this,
                    d === c && i >= 0 ? "onComplete" : "onReverseComplete",
                    !0,
                  ),
                  this._prom &&
                    !(d < c && this.timeScale() > 0) &&
                    this._prom()))));
        }
        return this;
      }),
      (t.add = function (i, n) {
        var o = this;
        if ((Ye(n) || (n = Ce(this, n, i)), !(i instanceof ra))) {
          if (ie(i))
            return (
              i.forEach(function (s) {
                return o.add(s, n);
              }),
              this
            );
          if ($(i)) return this.addLabel(i, n);
          if (W(i)) i = K.delayedCall(0, i);
          else return this;
        }
        return this !== i ? Oe(this, i, n) : this;
      }),
      (t.getChildren = function (i, n, o, s) {
        (i === void 0 && (i = !0),
          n === void 0 && (n = !0),
          o === void 0 && (o = !0),
          s === void 0 && (s = -Se));
        for (var c = [], l = this._first; l; )
          (l._start >= s &&
            (l instanceof K
              ? n && c.push(l)
              : (o && c.push(l),
                i && c.push.apply(c, l.getChildren(!0, n, o)))),
            (l = l._next));
        return c;
      }),
      (t.getById = function (i) {
        for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
          if (n[o].vars.id === i) return n[o];
      }),
      (t.remove = function (i) {
        return $(i)
          ? this.removeLabel(i)
          : W(i)
            ? this.killTweensOf(i)
            : (i.parent === this && Ca(this, i),
              i === this._recent && (this._recent = this._last),
              bt(this));
      }),
      (t.totalTime = function (i, n) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = Q(
                ve.time -
                  (this._ts > 0
                    ? i / this._ts
                    : (this.totalDuration() - i) / -this._ts),
              )),
            r.prototype.totalTime.call(this, i, n),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (t.addLabel = function (i, n) {
        return ((this.labels[i] = Ce(this, n)), this);
      }),
      (t.removeLabel = function (i) {
        return (delete this.labels[i], this);
      }),
      (t.addPause = function (i, n, o) {
        var s = K.delayedCall(0, n || Jt, o);
        return (
          (s.data = "isPause"),
          (this._hasPause = 1),
          Oe(this, s, Ce(this, i))
        );
      }),
      (t.removePause = function (i) {
        var n = this._first;
        for (i = Ce(this, i); n; )
          (n._start === i && n.data === "isPause" && it(n), (n = n._next));
      }),
      (t.killTweensOf = function (i, n, o) {
        for (var s = this.getTweensOf(i, o), c = s.length; c--; )
          ot !== s[c] && s[c].kill(i, n);
        return this;
      }),
      (t.getTweensOf = function (i, n) {
        for (var o = [], s = Te(i), c = this._first, l = Ye(n), d; c; )
          (c instanceof K
            ? ws(c._targets, s) &&
              (l
                ? (!ot || (c._initted && c._ts)) &&
                  c.globalTime(0) <= n &&
                  c.globalTime(c.totalDuration()) > n
                : !n || c.isActive()) &&
              o.push(c)
            : (d = c.getTweensOf(s, n)).length && o.push.apply(o, d),
            (c = c._next));
        return o;
      }),
      (t.tweenTo = function (i, n) {
        n = n || {};
        var o = this,
          s = Ce(o, i),
          c = n,
          l = c.startAt,
          d = c.onStart,
          u = c.onStartParams,
          h = c.immediateRender,
          m,
          f = K.to(
            o,
            Ae(
              {
                ease: n.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: s,
                overwrite: "auto",
                duration:
                  n.duration ||
                  Math.abs(
                    (s - (l && "time" in l ? l.time : o._time)) / o.timeScale(),
                  ) ||
                  N,
                onStart: function () {
                  if ((o.pause(), !m)) {
                    var w =
                      n.duration ||
                      Math.abs(
                        (s - (l && "time" in l ? l.time : o._time)) /
                          o.timeScale(),
                      );
                    (f._dur !== w && Bt(f, w, 0, 1).render(f._time, !0, !0),
                      (m = 1));
                  }
                  d && d.apply(f, u || []);
                },
              },
              n,
            ),
          );
        return h ? f.render(0) : f;
      }),
      (t.tweenFromTo = function (i, n, o) {
        return this.tweenTo(n, Ae({ startAt: { time: Ce(this, i) } }, o));
      }),
      (t.recent = function () {
        return this._recent;
      }),
      (t.nextLabel = function (i) {
        return (i === void 0 && (i = this._time), Yn(this, Ce(this, i)));
      }),
      (t.previousLabel = function (i) {
        return (i === void 0 && (i = this._time), Yn(this, Ce(this, i), 1));
      }),
      (t.currentLabel = function (i) {
        return arguments.length
          ? this.seek(i, !0)
          : this.previousLabel(this._time + N);
      }),
      (t.shiftChildren = function (i, n, o) {
        o === void 0 && (o = 0);
        var s = this._first,
          c = this.labels,
          l;
        for (i = Q(i); s; )
          (s._start >= o && ((s._start += i), (s._end += i)), (s = s._next));
        if (n) for (l in c) c[l] >= o && (c[l] += i);
        return bt(this);
      }),
      (t.invalidate = function (i) {
        var n = this._first;
        for (this._lock = 0; n; ) (n.invalidate(i), (n = n._next));
        return r.prototype.invalidate.call(this, i);
      }),
      (t.clear = function (i) {
        i === void 0 && (i = !0);
        for (var n = this._first, o; n; )
          ((o = n._next), this.remove(n), (n = o));
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          i && (this.labels = {}),
          bt(this)
        );
      }),
      (t.totalDuration = function (i) {
        var n = 0,
          o = this,
          s = o._last,
          c = Se,
          l,
          d,
          u;
        if (arguments.length)
          return o.timeScale(
            (o._repeat < 0 ? o.duration() : o.totalDuration()) /
              (o.reversed() ? -i : i),
          );
        if (o._dirty) {
          for (u = o.parent; s; )
            ((l = s._prev),
              s._dirty && s.totalDuration(),
              (d = s._start),
              d > c && o._sort && s._ts && !o._lock
                ? ((o._lock = 1), (Oe(o, s, d - s._delay, 1)._lock = 0))
                : (c = d),
              d < 0 &&
                s._ts &&
                ((n -= d),
                ((!u && !o._dp) || (u && u.smoothChildTiming)) &&
                  ((o._start += Q(d / o._ts)), (o._time -= d), (o._tTime -= d)),
                o.shiftChildren(-d, !1, -1 / 0),
                (c = 0)),
              s._end > n && s._ts && (n = s._end),
              (s = l));
          (Bt(o, o === G && o._time > n ? o._time : n, 1, 1), (o._dirty = 0));
        }
        return o._tDur;
      }),
      (e.updateRoot = function (i) {
        if ((G._ts && (Pn(G, Ta(i, G)), (Cn = ve.frame)), ve.frame >= Tn)) {
          Tn += fe.autoSleep || 120;
          var n = G._first;
          if ((!n || !n._ts) && fe.autoSleep && ve._listeners.length < 2) {
            for (; n && !n._ts; ) n = n._next;
            n || ve.sleep();
          }
        }
      }),
      e
    );
  })(ra);
  Ae(ue.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var zs = function (e, t, a, i, n, o, s) {
      var c = new he(this._pt, e, t, 0, 1, or, null, n),
        l = 0,
        d = 0,
        u,
        h,
        m,
        f,
        p,
        w,
        b,
        A;
      for (
        c.b = a,
          c.e = i,
          a += "",
          i += "",
          (b = ~i.indexOf("random(")) && (i = ta(i)),
          o && ((A = [a, i]), o(A, e, t), (a = A[0]), (i = A[1])),
          h = a.match(ri) || [];
        (u = ri.exec(i));
      )
        ((f = u[0]),
          (p = i.substring(l, u.index)),
          m ? (m = (m + 1) % 5) : p.substr(-5) === "rgba(" && (m = 1),
          f !== h[d++] &&
            ((w = parseFloat(h[d - 1]) || 0),
            (c._pt = {
              _next: c._pt,
              p: p || d === 1 ? p : ",",
              s: w,
              c: f.charAt(1) === "=" ? Rt(w, f) - w : parseFloat(f) - w,
              m: m && m < 4 ? Math.round : 0,
            }),
            (l = ri.lastIndex)));
      return (
        (c.c = l < i.length ? i.substring(l, i.length) : ""),
        (c.fp = s),
        (xn.test(i) || b) && (c.e = 0),
        (this._pt = c),
        c
      );
    },
    _i = function (e, t, a, i, n, o, s, c, l, d) {
      W(i) && (i = i(n || 0, e, o));
      var u = e[t],
        h =
          a !== "get"
            ? a
            : W(u)
              ? l
                ? e[
                    t.indexOf("set") || !W(e["get" + t.substr(3)])
                      ? t
                      : "get" + t.substr(3)
                  ](l)
                : e[t]()
              : u,
        m = W(u) ? (l ? Ys : nr) : Ci,
        f;
      if (
        ($(i) &&
          (~i.indexOf("random(") && (i = ta(i)),
          i.charAt(1) === "=" &&
            ((f = Rt(h, i) + (ne(h) || 0)), (f || f === 0) && (i = f))),
        !d || h !== i || ki)
      )
        return !isNaN(h * i) && i !== ""
          ? ((f = new he(
              this._pt,
              e,
              t,
              +h || 0,
              i - (h || 0),
              typeof u == "boolean" ? js : rr,
              0,
              m,
            )),
            l && (f.fp = l),
            s && f.modifier(s, this, e),
            (this._pt = f))
          : (!u && !(t in e) && li(t, i),
            zs.call(this, e, t, h, i, m, c || fe.stringFilter, l));
    },
    Hs = function (e, t, a, i, n) {
      if (
        (W(e) && (e = oa(e, n, t, a, i)),
        !Be(e) || (e.style && e.nodeType) || ie(e) || An(e))
      )
        return $(e) ? oa(e, n, t, a, i) : e;
      var o = {},
        s;
      for (s in e) o[s] = oa(e[s], n, t, a, i);
      return o;
    },
    tr = function (e, t, a, i, n, o) {
      var s, c, l, d;
      if (
        be[e] &&
        (s = new be[e]()).init(
          n,
          s.rawVars ? t[e] : Hs(t[e], i, n, o, a),
          a,
          i,
          o,
        ) !== !1 &&
        ((a._pt = c = new he(a._pt, n, e, 0, 1, s.render, s, 0, s.priority)),
        a !== Lt)
      )
        for (l = a._ptLookup[a._targets.indexOf(n)], d = s._props.length; d--; )
          l[s._props[d]] = c;
      return s;
    },
    ot,
    ki,
    Si = function r(e, t, a) {
      var i = e.vars,
        n = i.ease,
        o = i.startAt,
        s = i.immediateRender,
        c = i.lazy,
        l = i.onUpdate,
        d = i.runBackwards,
        u = i.yoyoEase,
        h = i.keyframes,
        m = i.autoRevert,
        f = e._dur,
        p = e._startAt,
        w = e._targets,
        b = e.parent,
        A = b && b.data === "nested" ? b.vars.targets : w,
        v = e._overwrite === "auto" && !ti,
        _ = e.timeline,
        y = i.easeReverse || u,
        E,
        k,
        C,
        S,
        M,
        U,
        z,
        O,
        H,
        I,
        B,
        D,
        oe;
      if (
        (_ && (!h || !n) && (n = "none"),
        (e._ease = At(n, Kt.ease)),
        (e._rEase = y && (At(y) || e._ease)),
        (e._from = !_ && !!i.runBackwards),
        e._from && (e.ratio = 1),
        !_ || (h && !i.stagger))
      ) {
        if (
          ((O = w[0] ? wt(w[0]).harness : 0),
          (D = O && i[O.prop]),
          (E = Sa(i, ci)),
          p &&
            (p._zTime < 0 && p.progress(1),
            t < 0 && d && s && !m
              ? p.render(-1, !0)
              : p.revert(d && f ? xa : ms),
            (p._lazy = 0)),
          o)
        ) {
          if (
            (it(
              (e._startAt = K.set(
                w,
                Ae(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: b,
                    immediateRender: !0,
                    lazy: !p && ce(c),
                    startAt: null,
                    delay: 0,
                    onUpdate:
                      l &&
                      function () {
                        return ye(e, "onUpdate");
                      },
                    stagger: 0,
                  },
                  o,
                ),
              )),
            ),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            t < 0 && (te || (!s && !m)) && e._startAt.revert(xa),
            s && f && t <= 0 && a <= 0)
          ) {
            t && (e._zTime = t);
            return;
          }
        } else if (d && f && !p) {
          if (
            (t && (s = !1),
            (C = Ae(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: s && !p && ce(c),
                immediateRender: s,
                stagger: 0,
                parent: b,
              },
              E,
            )),
            D && (C[O.prop] = D),
            it((e._startAt = K.set(w, C))),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            t < 0 && (te ? e._startAt.revert(xa) : e._startAt.render(-1, !0)),
            (e._zTime = t),
            !s)
          )
            r(e._startAt, N, N);
          else if (!t) return;
        }
        for (
          e._pt = e._ptCache = 0, c = (f && ce(c)) || (c && !f), k = 0;
          k < w.length;
          k++
        ) {
          if (
            ((M = w[k]),
            (z = M._gsap || pi(w)[k]._gsap),
            (e._ptLookup[k] = I = {}),
            di[z.id] && at.length && ka(),
            (B = A === w ? k : A.indexOf(M)),
            O &&
              (H = new O()).init(M, D || E, e, B, A) !== !1 &&
              ((e._pt = S =
                new he(e._pt, M, H.name, 0, 1, H.render, H, 0, H.priority)),
              H._props.forEach(function (Ge) {
                I[Ge] = S;
              }),
              H.priority && (U = 1)),
            !O || D)
          )
            for (C in E)
              be[C] && (H = tr(C, E, e, B, M, A))
                ? H.priority && (U = 1)
                : (I[C] = S =
                    _i.call(e, M, C, "get", E[C], B, A, 0, i.stringFilter));
          (e._op && e._op[k] && e.kill(M, e._op[k]),
            v &&
              e._pt &&
              ((ot = e),
              G.killTweensOf(M, I, e.globalTime(t)),
              (oe = !e.parent),
              (ot = 0)),
            e._pt && c && (di[z.id] = 1));
        }
        (U && sr(e), e._onInit && e._onInit(e));
      }
      ((e._onUpdate = l),
        (e._initted = (!e._op || e._pt) && !oe),
        h && t <= 0 && _.render(Se, !0, !0));
    },
    Vs = function (e, t, a, i, n, o, s, c) {
      var l = ((e._pt && e._ptCache) || (e._ptCache = {}))[t],
        d,
        u,
        h,
        m;
      if (!l)
        for (
          l = e._ptCache[t] = [], h = e._ptLookup, m = e._targets.length;
          m--;
        ) {
          if (((d = h[m][t]), d && d.d && d.d._pt))
            for (d = d.d._pt; d && d.p !== t && d.fp !== t; ) d = d._next;
          if (!d)
            return (
              (ki = 1),
              (e.vars[t] = "+=0"),
              Si(e, s),
              (ki = 0),
              c
                ? Xt(
                    t +
                      " not eligible for reset. Try splitting into individual properties",
                  )
                : 1
            );
          l.push(d);
        }
      for (m = l.length; m--; )
        ((u = l[m]),
          (d = u._pt || u),
          (d.s = (i || i === 0) && !n ? i : d.s + (i || 0) + o * d.c),
          (d.c = a - d.s),
          u.e && (u.e = j(a) + ne(u.e)),
          u.b && (u.b = d.s + ne(u.b)));
    },
    Gs = function (e, t) {
      var a = e[0] ? wt(e[0]).harness : 0,
        i = a && a.aliases,
        n,
        o,
        s,
        c;
      if (!i) return t;
      n = It({}, t);
      for (o in i)
        if (o in n)
          for (c = i[o].split(","), s = c.length; s--; ) n[c[s]] = n[o];
      return n;
    },
    Qs = function (e, t, a, i) {
      var n = t.ease || i || "power1.inOut",
        o,
        s;
      if (ie(t))
        ((s = a[e] || (a[e] = [])),
          t.forEach(function (c, l) {
            return s.push({ t: (l / (t.length - 1)) * 100, v: c, e: n });
          }));
      else
        for (o in t)
          ((s = a[o] || (a[o] = [])),
            o === "ease" || s.push({ t: parseFloat(e), v: t[o], e: n }));
    },
    oa = function (e, t, a, i, n) {
      return W(e)
        ? e.call(t, a, i, n)
        : $(e) && ~e.indexOf("random(")
          ? ta(e)
          : e;
    },
    ar =
      hi +
      "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",
    ir = {};
  de(ar + ",id,stagger,delay,duration,paused,scrollTrigger", function (r) {
    return (ir[r] = 1);
  });
  var K = (function (r) {
    wn(e, r);
    function e(a, i, n, o) {
      var s;
      (typeof i == "number" && ((n.duration = i), (i = n), (n = null)),
        (s = r.call(this, o ? i : Zt(i)) || this));
      var c = s.vars,
        l = c.duration,
        d = c.delay,
        u = c.immediateRender,
        h = c.stagger,
        m = c.overwrite,
        f = c.keyframes,
        p = c.defaults,
        w = c.scrollTrigger,
        b = i.parent || G,
        A = (ie(a) || An(a) ? Ye(a[0]) : "length" in i) ? [a] : Te(a),
        v,
        _,
        y,
        E,
        k,
        C,
        S,
        M;
      if (
        ((s._targets = A.length
          ? pi(A)
          : Xt(
              "GSAP target " + a + " not found. https://gsap.com",
              !fe.nullTargetWarn,
            ) || []),
        (s._ptLookup = []),
        (s._overwrite = m),
        f || h || ya(l) || ya(d))
      ) {
        i = s.vars;
        var U = i.easeReverse || i.yoyoEase;
        if (
          ((v = s.timeline =
            new ue({
              data: "nested",
              defaults: p || {},
              targets: b && b.data === "nested" ? b.vars.targets : A,
            })),
          v.kill(),
          (v.parent = v._dp = Qe(s)),
          (v._start = 0),
          h || ya(l) || ya(d))
        ) {
          if (((E = A.length), (S = h && zn(h)), Be(h)))
            for (k in h) ~ar.indexOf(k) && (M || (M = {}), (M[k] = h[k]));
          for (_ = 0; _ < E; _++)
            ((y = Sa(i, ir)),
              (y.stagger = 0),
              U && (y.easeReverse = U),
              M && It(y, M),
              (C = A[_]),
              (y.duration = +oa(l, Qe(s), _, C, A)),
              (y.delay = (+oa(d, Qe(s), _, C, A) || 0) - s._delay),
              !h &&
                E === 1 &&
                y.delay &&
                ((s._delay = d = y.delay), (s._start += d), (y.delay = 0)),
              v.to(C, y, S ? S(_, C, A) : 0),
              (v._ease = R.none));
          v.duration() ? (l = d = 0) : (s.timeline = 0);
        } else if (f) {
          (Zt(Ae(v.vars.defaults, { ease: "none" })),
            (v._ease = At(f.ease || i.ease || "none")));
          var z = 0,
            O,
            H,
            I;
          if (ie(f))
            (f.forEach(function (B) {
              return v.to(A, B, ">");
            }),
              v.duration());
          else {
            y = {};
            for (k in f)
              k === "ease" || k === "easeEach" || Qs(k, f[k], y, f.easeEach);
            for (k in y)
              for (
                O = y[k].sort(function (B, D) {
                  return B.t - D.t;
                }),
                  z = 0,
                  _ = 0;
                _ < O.length;
                _++
              )
                ((H = O[_]),
                  (I = {
                    ease: H.e,
                    duration: ((H.t - (_ ? O[_ - 1].t : 0)) / 100) * l,
                  }),
                  (I[k] = H.v),
                  v.to(A, I, z),
                  (z += I.duration));
            v.duration() < l && v.to({}, { duration: l - v.duration() });
          }
        }
        l || s.duration((l = v.duration()));
      } else s.timeline = 0;
      return (
        m === !0 && !ti && ((ot = Qe(s)), G.killTweensOf(A), (ot = 0)),
        Oe(b, Qe(s), n),
        i.reversed && s.reverse(),
        i.paused && s.paused(!0),
        (u ||
          (!l &&
            !f &&
            s._start === Q(b._time) &&
            ce(u) &&
            vs(Qe(s)) &&
            b.data !== "nested")) &&
          ((s._tTime = -N), s.render(Math.max(0, -d) || 0)),
        w && Ln(Qe(s), w),
        s
      );
    }
    var t = e.prototype;
    return (
      (t.render = function (i, n, o) {
        var s = this._time,
          c = this._tDur,
          l = this._dur,
          d = i < 0,
          u = i > c - N && !d ? c : i < N ? 0 : i,
          h,
          m,
          f,
          p,
          w,
          b,
          A,
          v;
        if (!l) _s(this, i, n, o);
        else if (
          u !== this._tTime ||
          !i ||
          o ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 !== d) ||
          this._lazy
        ) {
          if (((h = u), (v = this.timeline), this._repeat)) {
            if (((p = l + this._rDelay), this._repeat < -1 && d))
              return this.totalTime(p * 100 + i, n, o);
            if (
              ((h = Q(u % p)),
              u === c
                ? ((f = this._repeat), (h = l))
                : ((w = Q(u / p)),
                  (f = ~~w),
                  f && f === w ? ((h = l), f--) : h > l && (h = l)),
              (b = this._yoyo && f & 1),
              b && (h = l - h),
              (w = qt(this._tTime, p)),
              h === s && !o && this._initted && f === w)
            )
              return ((this._tTime = u), this);
            f !== w &&
              this.vars.repeatRefresh &&
              !b &&
              !this._lock &&
              h !== p &&
              this._initted &&
              ((this._lock = o = 1),
              (this.render(Q(p * f), !0).invalidate()._lock = 0));
          }
          if (!this._initted) {
            if (On(this, d ? i : h, o, n, u)) return ((this._tTime = 0), this);
            if (s !== this._time && !(o && this.vars.repeatRefresh && f !== w))
              return this;
            if (l !== this._dur) return this.render(i, n, o);
          }
          if (this._rEase) {
            var _ = h < s;
            if (_ !== this._inv) {
              var y = _ ? s : l - s;
              ((this._inv = _),
                this._from && (this.ratio = 1 - this.ratio),
                (this._invRatio = this.ratio),
                (this._invTime = s),
                (this._invRecip = y ? (_ ? -1 : 1) / y : 0),
                (this._invScale = _ ? -this.ratio : 1 - this.ratio),
                (this._invEase = _ ? this._rEase : this._ease));
            }
            this.ratio = A =
              this._invRatio +
              this._invScale *
                this._invEase((h - this._invTime) * this._invRecip);
          } else this.ratio = A = this._ease(h / l);
          if (
            (this._from && (this.ratio = A = 1 - A),
            (this._tTime = u),
            (this._time = h),
            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
            !s && u && !n && !w && (ye(this, "onStart"), this._tTime !== u))
          )
            return this;
          for (m = this._pt; m; ) (m.r(A, m.d), (m = m._next));
          ((v && v.render(i < 0 ? i : v._dur * v._ease(h / this._dur), n, o)) ||
            (this._startAt && (this._zTime = i)),
            this._onUpdate &&
              !n &&
              (d && mi(this, i, n, o), ye(this, "onUpdate")),
            this._repeat &&
              f !== w &&
              this.vars.onRepeat &&
              !n &&
              this.parent &&
              ye(this, "onRepeat"),
            (u === this._tDur || !u) &&
              this._tTime === u &&
              (d && !this._onUpdate && mi(this, i, !0, !0),
              (i || !l) &&
                ((u === this._tDur && this._ts > 0) || (!u && this._ts < 0)) &&
                it(this, 1),
              !n &&
                !(d && !s) &&
                (u || s || b) &&
                (ye(this, u === c ? "onComplete" : "onReverseComplete", !0),
                this._prom &&
                  !(u < c && this.timeScale() > 0) &&
                  this._prom())));
        }
        return this;
      }),
      (t.targets = function () {
        return this._targets;
      }),
      (t.invalidate = function (i) {
        return (
          (!i || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(i),
          r.prototype.invalidate.call(this, i)
        );
      }),
      (t.resetTo = function (i, n, o, s, c) {
        (na || ve.wake(), this._ts || this.play());
        var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
          d;
        return (
          this._initted || Si(this, l),
          (d = this._ease(l / this._dur)),
          Vs(this, i, n, o, s, d, l, c)
            ? this.resetTo(i, n, o, s, 1)
            : (Pa(this, 0),
              this.parent ||
                In(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0,
                ),
              this.render(0))
        );
      }),
      (t.kill = function (i, n) {
        if ((n === void 0 && (n = "all"), !i && (!n || n === "all")))
          return (
            (this._lazy = this._pt = 0),
            this.parent
              ? aa(this)
              : this.scrollTrigger && this.scrollTrigger.kill(!!te),
            this
          );
        if (this.timeline) {
          var o = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(i, n, ot && ot.vars.overwrite !== !0)
              ._first || aa(this),
            this.parent &&
              o !== this.timeline.totalDuration() &&
              Bt(this, (this._dur * this.timeline._tDur) / o, 0, 1),
            this
          );
        }
        var s = this._targets,
          c = i ? Te(i) : s,
          l = this._ptLookup,
          d = this._pt,
          u,
          h,
          m,
          f,
          p,
          w,
          b;
        if ((!n || n === "all") && As(s, c))
          return (n === "all" && (this._pt = 0), aa(this));
        for (
          u = this._op = this._op || [],
            n !== "all" &&
              ($(n) &&
                ((p = {}),
                de(n, function (A) {
                  return (p[A] = 1);
                }),
                (n = p)),
              (n = Gs(s, n))),
            b = s.length;
          b--;
        )
          if (~c.indexOf(s[b])) {
            ((h = l[b]),
              n === "all"
                ? ((u[b] = n), (f = h), (m = {}))
                : ((m = u[b] = u[b] || {}), (f = n)));
            for (p in f)
              ((w = h && h[p]),
                w &&
                  ((!("kill" in w.d) || w.d.kill(p) === !0) &&
                    Ca(this, w, "_pt"),
                  delete h[p]),
                m !== "all" && (m[p] = 1));
          }
        return (this._initted && !this._pt && d && aa(this), this);
      }),
      (e.to = function (i, n) {
        return new e(i, n, arguments[2]);
      }),
      (e.from = function (i, n) {
        return $t(1, arguments);
      }),
      (e.delayedCall = function (i, n, o, s) {
        return new e(n, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: i,
          onComplete: n,
          onReverseComplete: n,
          onCompleteParams: o,
          onReverseCompleteParams: o,
          callbackScope: s,
        });
      }),
      (e.fromTo = function (i, n, o) {
        return $t(2, arguments);
      }),
      (e.set = function (i, n) {
        return ((n.duration = 0), n.repeatDelay || (n.repeat = 0), new e(i, n));
      }),
      (e.killTweensOf = function (i, n, o) {
        return G.killTweensOf(i, n, o);
      }),
      e
    );
  })(ra);
  (Ae(K.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    de("staggerTo,staggerFrom,staggerFromTo", function (r) {
      K[r] = function () {
        var e = new ue(),
          t = wi.call(arguments, 0);
        return (
          t.splice(r === "staggerFromTo" ? 5 : 4, 0, 0),
          e[r].apply(e, t)
        );
      };
    }));
  var Ci = function (e, t, a) {
      return (e[t] = a);
    },
    nr = function (e, t, a) {
      return e[t](a);
    },
    Ys = function (e, t, a, i) {
      return e[t](i.fp, a);
    },
    Ws = function (e, t, a) {
      return e.setAttribute(t, a);
    },
    Ti = function (e, t) {
      return W(e[t]) ? nr : ii(e[t]) && e.setAttribute ? Ws : Ci;
    },
    rr = function (e, t) {
      return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
    },
    js = function (e, t) {
      return t.set(t.t, t.p, !!(t.s + t.c * e), t);
    },
    or = function (e, t) {
      var a = t._pt,
        i = "";
      if (!e && t.b) i = t.b;
      else if (e === 1 && t.e) i = t.e;
      else {
        for (; a; )
          ((i =
            a.p +
            (a.m
              ? a.m(a.s + a.c * e)
              : Math.round((a.s + a.c * e) * 1e4) / 1e4) +
            i),
            (a = a._next));
        i += t.c;
      }
      t.set(t.t, t.p, i, t);
    },
    Ei = function (e, t) {
      for (var a = t._pt; a; ) (a.r(e, a.d), (a = a._next));
    },
    Ks = function (e, t, a, i) {
      for (var n = this._pt, o; n; )
        ((o = n._next), n.p === i && n.modifier(e, t, a), (n = o));
    },
    Xs = function (e) {
      for (var t = this._pt, a, i; t; )
        ((i = t._next),
          (t.p === e && !t.op) || t.op === e
            ? Ca(this, t, "_pt")
            : t.dep || (a = 1),
          (t = i));
      return !a;
    },
    Js = function (e, t, a, i) {
      i.mSet(e, t, i.m.call(i.tween, a, i.mt), i);
    },
    sr = function (e) {
      for (var t = e._pt, a, i, n, o; t; ) {
        for (a = t._next, i = n; i && i.pr > t.pr; ) i = i._next;
        ((t._prev = i ? i._prev : o) ? (t._prev._next = t) : (n = t),
          (t._next = i) ? (i._prev = t) : (o = t),
          (t = a));
      }
      e._pt = n;
    },
    he = (function () {
      function r(t, a, i, n, o, s, c, l, d) {
        ((this.t = a),
          (this.s = n),
          (this.c = o),
          (this.p = i),
          (this.r = s || rr),
          (this.d = c || this),
          (this.set = l || Ci),
          (this.pr = d || 0),
          (this._next = t),
          t && (t._prev = this));
      }
      var e = r.prototype;
      return (
        (e.modifier = function (a, i, n) {
          ((this.mSet = this.mSet || this.set),
            (this.set = Js),
            (this.m = a),
            (this.mt = n),
            (this.tween = i));
        }),
        r
      );
    })();
  (de(
    hi +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",
    function (r) {
      return (ci[r] = 1);
    },
  ),
    (we.TweenMax = we.TweenLite = K),
    (we.TimelineLite = we.TimelineMax = ue),
    (G = new ue({
      sortChildren: !1,
      defaults: Kt,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (fe.stringFilter = Zn));
  var vt = [],
    Ma = {},
    Zs = [],
    lr = 0,
    $s = 0,
    Pi = function (e) {
      return (Ma[e] || Zs).map(function (t) {
        return t();
      });
    },
    Mi = function () {
      var e = Date.now(),
        t = [];
      e - lr > 2 &&
        (Pi("matchMediaInit"),
        vt.forEach(function (a) {
          var i = a.queries,
            n = a.conditions,
            o,
            s,
            c,
            l;
          for (s in i)
            ((o = Le.matchMedia(i[s]).matches),
              o && (c = 1),
              o !== n[s] && ((n[s] = o), (l = 1)));
          l && (a.revert(), c && t.push(a));
        }),
        Pi("matchMediaRevert"),
        t.forEach(function (a) {
          return a.onMatch(a, function (i) {
            return a.add(null, i);
          });
        }),
        (lr = e),
        Pi("matchMedia"));
    },
    cr = (function () {
      function r(t, a) {
        ((this.selector = a && bi(a)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          (this.id = $s++),
          t && this.add(t));
      }
      var e = r.prototype;
      return (
        (e.add = function (a, i, n) {
          W(a) && ((n = i), (i = a), (a = W));
          var o = this,
            s = function () {
              var l = V,
                d = o.selector,
                u;
              return (
                l && l !== o && l.data.push(o),
                n && (o.selector = bi(n)),
                (V = o),
                (u = i.apply(o, arguments)),
                W(u) && o._r.push(u),
                (V = l),
                (o.selector = d),
                (o.isReverted = !1),
                u
              );
            };
          return (
            (o.last = s),
            a === W
              ? s(o, function (c) {
                  return o.add(null, c);
                })
              : a
                ? (o[a] = s)
                : s
          );
        }),
        (e.ignore = function (a) {
          var i = V;
          ((V = null), a(this), (V = i));
        }),
        (e.getTweens = function () {
          var a = [];
          return (
            this.data.forEach(function (i) {
              return i instanceof r
                ? a.push.apply(a, i.getTweens())
                : i instanceof K &&
                    !(i.parent && i.parent.data === "nested") &&
                    a.push(i);
            }),
            a
          );
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (e.kill = function (a, i) {
          var n = this;
          if (
            (a
              ? (function () {
                  for (var s = n.getTweens(), c = n.data.length, l; c--; )
                    ((l = n.data[c]),
                      l.data === "isFlip" &&
                        (l.revert(),
                        l.getChildren(!0, !0, !1).forEach(function (d) {
                          return s.splice(s.indexOf(d), 1);
                        })));
                  for (
                    s
                      .map(function (d) {
                        return {
                          g:
                            d._dur ||
                            d._delay ||
                            (d._sat && !d._sat.vars.immediateRender)
                              ? d.globalTime(0)
                              : -1 / 0,
                          t: d,
                        };
                      })
                      .sort(function (d, u) {
                        return u.g - d.g || -1 / 0;
                      })
                      .forEach(function (d) {
                        return d.t.revert(a);
                      }),
                      c = n.data.length;
                    c--;
                  )
                    ((l = n.data[c]),
                      l instanceof ue
                        ? l.data !== "nested" &&
                          (l.scrollTrigger && l.scrollTrigger.revert(),
                          l.kill())
                        : !(l instanceof K) && l.revert && l.revert(a));
                  (n._r.forEach(function (d) {
                    return d(a, n);
                  }),
                    (n.isReverted = !0));
                })()
              : this.data.forEach(function (s) {
                  return s.kill && s.kill();
                }),
            this.clear(),
            i)
          )
            for (var o = vt.length; o--; )
              vt[o].id === this.id && vt.splice(o, 1);
        }),
        (e.revert = function (a) {
          this.kill(a || {});
        }),
        r
      );
    })(),
    el = (function () {
      function r(t) {
        ((this.contexts = []), (this.scope = t), V && V.data.push(this));
      }
      var e = r.prototype;
      return (
        (e.add = function (a, i, n) {
          Be(a) || (a = { matches: a });
          var o = new cr(0, n || this.scope),
            s = (o.conditions = {}),
            c,
            l,
            d;
          (V && !o.selector && (o.selector = V.selector),
            this.contexts.push(o),
            (i = o.add("onMatch", i)),
            (o.queries = a));
          for (l in a)
            l === "all"
              ? (d = 1)
              : ((c = Le.matchMedia(a[l])),
                c &&
                  (vt.indexOf(o) < 0 && vt.push(o),
                  (s[l] = c.matches) && (d = 1),
                  c.addListener
                    ? c.addListener(Mi)
                    : c.addEventListener("change", Mi)));
          return (
            d &&
              i(o, function (u) {
                return o.add(null, u);
              }),
            this
          );
        }),
        (e.revert = function (a) {
          this.kill(a || {});
        }),
        (e.kill = function (a) {
          this.contexts.forEach(function (i) {
            return i.kill(a, !0);
          });
        }),
        r
      );
    })(),
    Da = {
      registerPlugin: function () {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        t.forEach(function (i) {
          return jn(i);
        });
      },
      timeline: function (e) {
        return new ue(e);
      },
      getTweensOf: function (e, t) {
        return G.getTweensOf(e, t);
      },
      getProperty: function (e, t, a, i) {
        $(e) && (e = Te(e)[0]);
        var n = wt(e || {}).get,
          o = a ? Dn : Mn;
        return (
          a === "native" && (a = ""),
          e &&
            (t
              ? o(((be[t] && be[t].get) || n)(e, t, a, i))
              : function (s, c, l) {
                  return o(((be[s] && be[s].get) || n)(e, s, c, l));
                })
        );
      },
      quickSetter: function (e, t, a) {
        if (((e = Te(e)), e.length > 1)) {
          var i = e.map(function (d) {
              return pe.quickSetter(d, t, a);
            }),
            n = i.length;
          return function (d) {
            for (var u = n; u--; ) i[u](d);
          };
        }
        e = e[0] || {};
        var o = be[t],
          s = wt(e),
          c = (s.harness && (s.harness.aliases || {})[t]) || t,
          l = o
            ? function (d) {
                var u = new o();
                ((Lt._pt = 0),
                  u.init(e, a ? d + a : d, Lt, 0, [e]),
                  u.render(1, u),
                  Lt._pt && Ei(1, Lt));
              }
            : s.set(e, c);
        return o
          ? l
          : function (d) {
              return l(e, c, a ? d + a : d, s, 1);
            };
      },
      quickTo: function (e, t, a) {
        var i,
          n = pe.to(
            e,
            Ae(
              ((i = {}), (i[t] = "+=0.1"), (i.paused = !0), (i.stagger = 0), i),
              a || {},
            ),
          ),
          o = function (c, l, d) {
            return n.resetTo(t, c, l, d);
          };
        return ((o.tween = n), o);
      },
      isTweening: function (e) {
        return G.getTweensOf(e, !0).length > 0;
      },
      defaults: function (e) {
        return (e && e.ease && (e.ease = At(e.ease, Kt.ease)), Rn(Kt, e || {}));
      },
      config: function (e) {
        return Rn(fe, e || {});
      },
      registerEffect: function (e) {
        var t = e.name,
          a = e.effect,
          i = e.plugins,
          n = e.defaults,
          o = e.extendTimeline;
        ((i || "").split(",").forEach(function (s) {
          return (
            s &&
            !be[s] &&
            !we[s] &&
            Xt(t + " effect requires " + s + " plugin.")
          );
        }),
          (ui[t] = function (s, c, l) {
            return a(Te(s), Ae(c || {}, n), l);
          }),
          o &&
            (ue.prototype[t] = function (s, c, l) {
              return this.add(ui[t](s, Be(c) ? c : (l = c) && {}, this), l);
            }));
      },
      registerEase: function (e, t) {
        R[e] = At(t);
      },
      parseEase: function (e, t) {
        return arguments.length ? At(e, t) : R;
      },
      getById: function (e) {
        return G.getById(e);
      },
      exportRoot: function (e, t) {
        e === void 0 && (e = {});
        var a = new ue(e),
          i,
          n;
        for (
          a.smoothChildTiming = ce(e.smoothChildTiming),
            G.remove(a),
            a._dp = 0,
            a._time = a._tTime = G._time,
            i = G._first;
          i;
        )
          ((n = i._next),
            (t ||
              !(
                !i._dur &&
                i instanceof K &&
                i.vars.onComplete === i._targets[0]
              )) &&
              Oe(a, i, i._start - i._delay),
            (i = n));
        return (Oe(G, a, 0), a);
      },
      context: function (e, t) {
        return e ? new cr(e, t) : V;
      },
      matchMedia: function (e) {
        return new el(e);
      },
      matchMediaRefresh: function () {
        return (
          vt.forEach(function (e) {
            var t = e.conditions,
              a,
              i;
            for (i in t) t[i] && ((t[i] = !1), (a = 1));
            a && e.revert();
          }) || Mi()
        );
      },
      addEventListener: function (e, t) {
        var a = Ma[e] || (Ma[e] = []);
        ~a.indexOf(t) || a.push(t);
      },
      removeEventListener: function (e, t) {
        var a = Ma[e],
          i = a && a.indexOf(t);
        i >= 0 && a.splice(i, 1);
      },
      utils: {
        wrap: Ds,
        wrapYoyo: Rs,
        distribute: zn,
        random: Vn,
        snap: Hn,
        normalize: Ms,
        getUnit: ne,
        clamp: Cs,
        splitColor: Kn,
        toArray: Te,
        selector: bi,
        mapRange: Qn,
        pipe: Es,
        unitize: Ps,
        interpolate: Is,
        shuffle: Un,
      },
      install: kn,
      effects: ui,
      ticker: ve,
      updateRoot: ue.updateRoot,
      plugins: be,
      globalTimeline: G,
      core: {
        PropTween: he,
        globals: Sn,
        Tween: K,
        Timeline: ue,
        Animation: ra,
        getCache: wt,
        _removeLinkedListItem: Ca,
        reverting: function () {
          return te;
        },
        context: function (e) {
          return (e && V && (V.data.push(e), (e._ctx = V)), V);
        },
        suppressOverwrites: function (e) {
          return (ti = e);
        },
      },
    };
  (de("to,from,fromTo,delayedCall,set,killTweensOf", function (r) {
    return (Da[r] = K[r]);
  }),
    ve.add(ue.updateRoot),
    (Lt = Da.to({}, { duration: 0 })));
  var tl = function (e, t) {
      for (var a = e._pt; a && a.p !== t && a.op !== t && a.fp !== t; )
        a = a._next;
      return a;
    },
    al = function (e, t) {
      var a = e._targets,
        i,
        n,
        o;
      for (i in t)
        for (n = a.length; n--; )
          ((o = e._ptLookup[n][i]),
            o &&
              (o = o.d) &&
              (o._pt && (o = tl(o, i)),
              o && o.modifier && o.modifier(t[i], e, a[n], i)));
    },
    Di = function (e, t) {
      return {
        name: e,
        headless: 1,
        rawVars: 1,
        init: function (i, n, o) {
          o._onInit = function (s) {
            var c, l;
            if (
              ($(n) &&
                ((c = {}),
                de(n, function (d) {
                  return (c[d] = 1);
                }),
                (n = c)),
              t)
            ) {
              c = {};
              for (l in n) c[l] = t(n[l]);
              n = c;
            }
            al(s, n);
          };
        },
      };
    },
    pe =
      Da.registerPlugin(
        {
          name: "attr",
          init: function (e, t, a, i, n) {
            var o, s, c;
            this.tween = a;
            for (o in t)
              ((c = e.getAttribute(o) || ""),
                (s = this.add(
                  e,
                  "setAttribute",
                  (c || 0) + "",
                  t[o],
                  i,
                  n,
                  0,
                  0,
                  o,
                )),
                (s.op = o),
                (s.b = c),
                this._props.push(o));
          },
          render: function (e, t) {
            for (var a = t._pt; a; )
              (te ? a.set(a.t, a.p, a.b, a) : a.r(e, a.d), (a = a._next));
          },
        },
        {
          name: "endArray",
          headless: 1,
          init: function (e, t) {
            for (var a = t.length; a--; )
              this.add(e, a, e[a] || 0, t[a], 0, 0, 0, 0, 0, 1);
          },
        },
        Di("roundProps", Ai),
        Di("modifiers"),
        Di("snap", Hn),
      ) || Da;
  ((K.version = ue.version = pe.version = "3.15.0"),
    (_n = 1),
    ni() && Ot(),
    R.Power0,
    R.Power1,
    R.Power2,
    R.Power3,
    R.Power4,
    R.Linear,
    R.Quad,
    R.Cubic,
    R.Quart,
    R.Quint,
    R.Strong,
    R.Elastic,
    R.Back,
    R.SteppedEase,
    R.Bounce,
    R.Sine,
    R.Expo,
    R.Circ);
  var dr,
    st,
    Nt,
    Ri,
    xt,
    ur,
    Ii,
    il = function () {
      return typeof window < "u";
    },
    We = {},
    _t = 180 / Math.PI,
    Ft = Math.PI / 180,
    Ut = Math.atan2,
    hr = 1e8,
    qi = /([A-Z])/g,
    nl = /(left|right|width|margin|padding|x)/i,
    rl = /[\s,\(]\S/,
    Ne = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    Bi = function (e, t) {
      return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
    },
    ol = function (e, t) {
      return t.set(
        t.t,
        t.p,
        e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
        t,
      );
    },
    sl = function (e, t) {
      return t.set(
        t.t,
        t.p,
        e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
        t,
      );
    },
    ll = function (e, t) {
      return t.set(
        t.t,
        t.p,
        e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
        t,
      );
    },
    cl = function (e, t) {
      var a = t.s + t.c * e;
      t.set(t.t, t.p, ~~(a + (a < 0 ? -0.5 : 0.5)) + t.u, t);
    },
    pr = function (e, t) {
      return t.set(t.t, t.p, e ? t.e : t.b, t);
    },
    gr = function (e, t) {
      return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
    },
    dl = function (e, t, a) {
      return (e.style[t] = a);
    },
    ul = function (e, t, a) {
      return e.style.setProperty(t, a);
    },
    hl = function (e, t, a) {
      return (e._gsap[t] = a);
    },
    pl = function (e, t, a) {
      return (e._gsap.scaleX = e._gsap.scaleY = a);
    },
    gl = function (e, t, a, i, n) {
      var o = e._gsap;
      ((o.scaleX = o.scaleY = a), o.renderTransform(n, o));
    },
    ml = function (e, t, a, i, n) {
      var o = e._gsap;
      ((o[t] = a), o.renderTransform(n, o));
    },
    Y = "transform",
    ge = Y + "Origin",
    fl = function r(e, t) {
      var a = this,
        i = this.target,
        n = i.style,
        o = i._gsap;
      if (e in We && n) {
        if (((this.tfm = this.tfm || {}), e !== "transform"))
          ((e = Ne[e] || e),
            ~e.indexOf(",")
              ? e.split(",").forEach(function (s) {
                  return (a.tfm[s] = je(i, s));
                })
              : (this.tfm[e] = o.x ? o[e] : je(i, e)),
            e === ge && (this.tfm.zOrigin = o.zOrigin));
        else
          return Ne.transform.split(",").forEach(function (s) {
            return r.call(a, s, t);
          });
        if (this.props.indexOf(Y) >= 0) return;
        (o.svg &&
          ((this.svgo = i.getAttribute("data-svg-origin")),
          this.props.push(ge, t, "")),
          (e = Y));
      }
      (n || t) && this.props.push(e, t, n[e]);
    },
    mr = function (e) {
      e.translate &&
        (e.removeProperty("translate"),
        e.removeProperty("scale"),
        e.removeProperty("rotate"));
    },
    wl = function () {
      var e = this.props,
        t = this.target,
        a = t.style,
        i = t._gsap,
        n,
        o;
      for (n = 0; n < e.length; n += 3)
        e[n + 1]
          ? e[n + 1] === 2
            ? t[e[n]](e[n + 2])
            : (t[e[n]] = e[n + 2])
          : e[n + 2]
            ? (a[e[n]] = e[n + 2])
            : a.removeProperty(
                e[n].substr(0, 2) === "--"
                  ? e[n]
                  : e[n].replace(qi, "-$1").toLowerCase(),
              );
      if (this.tfm) {
        for (o in this.tfm) i[o] = this.tfm[o];
        (i.svg &&
          (i.renderTransform(),
          t.setAttribute("data-svg-origin", this.svgo || "")),
          (n = Ii()),
          (!n || !n.isStart) &&
            !a[Y] &&
            (mr(a),
            i.zOrigin &&
              a[ge] &&
              ((a[ge] += " " + i.zOrigin + "px"),
              (i.zOrigin = 0),
              i.renderTransform()),
            (i.uncache = 1)));
      }
    },
    fr = function (e, t) {
      var a = { target: e, props: [], revert: wl, save: fl };
      return (
        e._gsap || pe.core.getCache(e),
        t &&
          e.style &&
          e.nodeType &&
          t.split(",").forEach(function (i) {
            return a.save(i);
          }),
        a
      );
    },
    wr,
    Li = function (e, t) {
      var a = st.createElementNS
        ? st.createElementNS(
            (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            e,
          )
        : st.createElement(e);
      return a && a.style ? a : st.createElement(e);
    },
    xe = function r(e, t, a) {
      var i = getComputedStyle(e);
      return (
        i[t] ||
        i.getPropertyValue(t.replace(qi, "-$1").toLowerCase()) ||
        i.getPropertyValue(t) ||
        (!a && r(e, zt(t) || t, 1)) ||
        ""
      );
    },
    br = "O,Moz,ms,Ms,Webkit".split(","),
    zt = function (e, t, a) {
      var i = t || xt,
        n = i.style,
        o = 5;
      if (e in n && !a) return e;
      for (
        e = e.charAt(0).toUpperCase() + e.substr(1);
        o-- && !(br[o] + e in n);
      );
      return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? br[o] : "") + e;
    },
    Oi = function () {
      il() &&
        window.document &&
        ((dr = window),
        (st = dr.document),
        (Nt = st.documentElement),
        (xt = Li("div") || { style: {} }),
        Li("div"),
        (Y = zt(Y)),
        (ge = Y + "Origin"),
        (xt.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (wr = !!zt("perspective")),
        (Ii = pe.core.reverting),
        (Ri = 1));
    },
    Ar = function (e) {
      var t = e.ownerSVGElement,
        a = Li(
          "svg",
          (t && t.getAttribute("xmlns")) || "http://www.w3.org/2000/svg",
        ),
        i = e.cloneNode(!0),
        n;
      ((i.style.display = "block"), a.appendChild(i), Nt.appendChild(a));
      try {
        n = i.getBBox();
      } catch {}
      return (a.removeChild(i), Nt.removeChild(a), n);
    },
    yr = function (e, t) {
      for (var a = t.length; a--; )
        if (e.hasAttribute(t[a])) return e.getAttribute(t[a]);
    },
    vr = function (e) {
      var t, a;
      try {
        t = e.getBBox();
      } catch {
        ((t = Ar(e)), (a = 1));
      }
      return (
        (t && (t.width || t.height)) || a || (t = Ar(e)),
        t && !t.width && !t.x && !t.y
          ? {
              x: +yr(e, ["x", "cx", "x1"]) || 0,
              y: +yr(e, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
          : t
      );
    },
    xr = function (e) {
      return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && vr(e));
    },
    lt = function (e, t) {
      if (t) {
        var a = e.style,
          i;
        (t in We && t !== ge && (t = Y),
          a.removeProperty
            ? ((i = t.substr(0, 2)),
              (i === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t),
              a.removeProperty(
                i === "--" ? t : t.replace(qi, "-$1").toLowerCase(),
              ))
            : a.removeAttribute(t));
      }
    },
    ct = function (e, t, a, i, n, o) {
      var s = new he(e._pt, t, a, 0, 1, o ? gr : pr);
      return ((e._pt = s), (s.b = i), (s.e = n), e._props.push(a), s);
    },
    _r = { deg: 1, rad: 1, turn: 1 },
    bl = { grid: 1, flex: 1 },
    dt = function r(e, t, a, i) {
      var n = parseFloat(a) || 0,
        o = (a + "").trim().substr((n + "").length) || "px",
        s = xt.style,
        c = nl.test(t),
        l = e.tagName.toLowerCase() === "svg",
        d = (l ? "client" : "offset") + (c ? "Width" : "Height"),
        u = 100,
        h = i === "px",
        m = i === "%",
        f,
        p,
        w,
        b;
      if (i === o || !n || _r[i] || _r[o]) return n;
      if (
        (o !== "px" && !h && (n = r(e, t, a, "px")),
        (b = e.getCTM && xr(e)),
        (m || o === "%") && (We[t] || ~t.indexOf("adius")))
      )
        return (
          (f = b ? e.getBBox()[c ? "width" : "height"] : e[d]),
          j(m ? (n / f) * u : (n / 100) * f)
        );
      if (
        ((s[c ? "width" : "height"] = u + (h ? o : i)),
        (p =
          (i !== "rem" && ~t.indexOf("adius")) ||
          (i === "em" && e.appendChild && !l)
            ? e
            : e.parentNode),
        b && (p = (e.ownerSVGElement || {}).parentNode),
        (!p || p === st || !p.appendChild) && (p = st.body),
        (w = p._gsap),
        w && m && w.width && c && w.time === ve.time && !w.uncache)
      )
        return j((n / w.width) * u);
      if (m && (t === "height" || t === "width")) {
        var A = e.style[t];
        ((e.style[t] = u + i), (f = e[d]), A ? (e.style[t] = A) : lt(e, t));
      } else
        ((m || o === "%") &&
          !bl[xe(p, "display")] &&
          (s.position = xe(e, "position")),
          p === e && (s.position = "static"),
          p.appendChild(xt),
          (f = xt[d]),
          p.removeChild(xt),
          (s.position = "absolute"));
      return (
        c && m && ((w = wt(p)), (w.time = ve.time), (w.width = p[d])),
        j(h ? (f * n) / u : f && n ? (u / f) * n : 0)
      );
    },
    je = function (e, t, a, i) {
      var n;
      return (
        Ri || Oi(),
        t in Ne &&
          t !== "transform" &&
          ((t = Ne[t]), ~t.indexOf(",") && (t = t.split(",")[0])),
        We[t] && t !== "transform"
          ? ((n = la(e, i)),
            (n =
              t !== "transformOrigin"
                ? n[t]
                : n.svg
                  ? n.origin
                  : Ia(xe(e, ge)) + " " + n.zOrigin + "px"))
          : ((n = e.style[t]),
            (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) &&
              (n =
                (Ra[t] && Ra[t](e, t, a)) ||
                xe(e, t) ||
                En(e, t) ||
                (t === "opacity" ? 1 : 0))),
        a && !~(n + "").trim().indexOf(" ") ? dt(e, t, n, a) + a : n
      );
    },
    Al = function (e, t, a, i) {
      if (!a || a === "none") {
        var n = zt(t, e, 1),
          o = n && xe(e, n, 1);
        o && o !== a
          ? ((t = n), (a = o))
          : t === "borderColor" && (a = xe(e, "borderTopColor"));
      }
      var s = new he(this._pt, e.style, t, 0, 1, or),
        c = 0,
        l = 0,
        d,
        u,
        h,
        m,
        f,
        p,
        w,
        b,
        A,
        v,
        _,
        y;
      if (
        ((s.b = a),
        (s.e = i),
        (a += ""),
        (i += ""),
        i.substring(0, 6) === "var(--" &&
          (i = xe(e, i.substring(4, i.indexOf(")")))),
        i === "auto" &&
          ((p = e.style[t]),
          (e.style[t] = i),
          (i = xe(e, t) || i),
          p ? (e.style[t] = p) : lt(e, t)),
        (d = [a, i]),
        Zn(d),
        (a = d[0]),
        (i = d[1]),
        (h = a.match(Dt) || []),
        (y = i.match(Dt) || []),
        y.length)
      ) {
        for (; (u = Dt.exec(i)); )
          ((w = u[0]),
            (A = i.substring(c, u.index)),
            f
              ? (f = (f + 1) % 5)
              : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") &&
                (f = 1),
            w !== (p = h[l++] || "") &&
              ((m = parseFloat(p) || 0),
              (_ = p.substr((m + "").length)),
              w.charAt(1) === "=" && (w = Rt(m, w) + _),
              (b = parseFloat(w)),
              (v = w.substr((b + "").length)),
              (c = Dt.lastIndex - v.length),
              v ||
                ((v = v || fe.units[t] || _),
                c === i.length && ((i += v), (s.e += v))),
              _ !== v && (m = dt(e, t, p, v) || 0),
              (s._pt = {
                _next: s._pt,
                p: A || l === 1 ? A : ",",
                s: m,
                c: b - m,
                m: (f && f < 4) || t === "zIndex" ? Math.round : 0,
              })));
        s.c = c < i.length ? i.substring(c, i.length) : "";
      } else s.r = t === "display" && i === "none" ? gr : pr;
      return (xn.test(i) && (s.e = 0), (this._pt = s), s);
    },
    kr = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    yl = function (e) {
      var t = e.split(" "),
        a = t[0],
        i = t[1] || "50%";
      return (
        (a === "top" || a === "bottom" || i === "left" || i === "right") &&
          ((e = a), (a = i), (i = e)),
        (t[0] = kr[a] || a),
        (t[1] = kr[i] || i),
        t.join(" ")
      );
    },
    vl = function (e, t) {
      if (t.tween && t.tween._time === t.tween._dur) {
        var a = t.t,
          i = a.style,
          n = t.u,
          o = a._gsap,
          s,
          c,
          l;
        if (n === "all" || n === !0) ((i.cssText = ""), (c = 1));
        else
          for (n = n.split(","), l = n.length; --l > -1; )
            ((s = n[l]),
              We[s] && ((c = 1), (s = s === "transformOrigin" ? ge : Y)),
              lt(a, s));
        c &&
          (lt(a, Y),
          o &&
            (o.svg && a.removeAttribute("transform"),
            (i.scale = i.rotate = i.translate = "none"),
            la(a, 1),
            (o.uncache = 1),
            mr(i)));
      }
    },
    Ra = {
      clearProps: function (e, t, a, i, n) {
        if (n.data !== "isFromStart") {
          var o = (e._pt = new he(e._pt, t, a, 0, 0, vl));
          return ((o.u = i), (o.pr = -10), (o.tween = n), e._props.push(a), 1);
        }
      },
    },
    sa = [1, 0, 0, 1, 0, 0],
    Sr = {},
    Cr = function (e) {
      return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
    },
    Tr = function (e) {
      var t = xe(e, Y);
      return Cr(t) ? sa : t.substr(7).match(vn).map(j);
    },
    Ni = function (e, t) {
      var a = e._gsap || wt(e),
        i = e.style,
        n = Tr(e),
        o,
        s,
        c,
        l;
      return a.svg && e.getAttribute("transform")
        ? ((c = e.transform.baseVal.consolidate().matrix),
          (n = [c.a, c.b, c.c, c.d, c.e, c.f]),
          n.join(",") === "1,0,0,1,0,0" ? sa : n)
        : (n === sa &&
            !e.offsetParent &&
            e !== Nt &&
            !a.svg &&
            ((c = i.display),
            (i.display = "block"),
            (o = e.parentNode),
            (!o || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
              ((l = 1), (s = e.nextElementSibling), Nt.appendChild(e)),
            (n = Tr(e)),
            c ? (i.display = c) : lt(e, "display"),
            l &&
              (s
                ? o.insertBefore(e, s)
                : o
                  ? o.appendChild(e)
                  : Nt.removeChild(e))),
          t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
    },
    Fi = function (e, t, a, i, n, o) {
      var s = e._gsap,
        c = n || Ni(e, !0),
        l = s.xOrigin || 0,
        d = s.yOrigin || 0,
        u = s.xOffset || 0,
        h = s.yOffset || 0,
        m = c[0],
        f = c[1],
        p = c[2],
        w = c[3],
        b = c[4],
        A = c[5],
        v = t.split(" "),
        _ = parseFloat(v[0]) || 0,
        y = parseFloat(v[1]) || 0,
        E,
        k,
        C,
        S;
      (a
        ? c !== sa &&
          (k = m * w - f * p) &&
          ((C = _ * (w / k) + y * (-p / k) + (p * A - w * b) / k),
          (S = _ * (-f / k) + y * (m / k) - (m * A - f * b) / k),
          (_ = C),
          (y = S))
        : ((E = vr(e)),
          (_ = E.x + (~v[0].indexOf("%") ? (_ / 100) * E.width : _)),
          (y =
            E.y + (~(v[1] || v[0]).indexOf("%") ? (y / 100) * E.height : y))),
        i || (i !== !1 && s.smooth)
          ? ((b = _ - l),
            (A = y - d),
            (s.xOffset = u + (b * m + A * p) - b),
            (s.yOffset = h + (b * f + A * w) - A))
          : (s.xOffset = s.yOffset = 0),
        (s.xOrigin = _),
        (s.yOrigin = y),
        (s.smooth = !!i),
        (s.origin = t),
        (s.originIsAbsolute = !!a),
        (e.style[ge] = "0px 0px"),
        o &&
          (ct(o, s, "xOrigin", l, _),
          ct(o, s, "yOrigin", d, y),
          ct(o, s, "xOffset", u, s.xOffset),
          ct(o, s, "yOffset", h, s.yOffset)),
        e.setAttribute("data-svg-origin", _ + " " + y));
    },
    la = function (e, t) {
      var a = e._gsap || new er(e);
      if ("x" in a && !t && !a.uncache) return a;
      var i = e.style,
        n = a.scaleX < 0,
        o = "px",
        s = "deg",
        c = getComputedStyle(e),
        l = xe(e, ge) || "0",
        d,
        u,
        h,
        m,
        f,
        p,
        w,
        b,
        A,
        v,
        _,
        y,
        E,
        k,
        C,
        S,
        M,
        U,
        z,
        O,
        H,
        I,
        B,
        D,
        oe,
        Ge,
        ft,
        qe,
        Pt,
        os,
        tt,
        Mt;
      return (
        (d = u = h = p = w = b = A = v = _ = 0),
        (m = f = 1),
        (a.svg = !!(e.getCTM && xr(e))),
        c.translate &&
          ((c.translate !== "none" ||
            c.scale !== "none" ||
            c.rotate !== "none") &&
            (i[Y] =
              (c.translate !== "none"
                ? "translate3d(" +
                  (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") +
              (c.scale !== "none"
                ? "scale(" + c.scale.split(" ").join(",") + ") "
                : "") +
              (c[Y] !== "none" ? c[Y] : "")),
          (i.scale = i.rotate = i.translate = "none")),
        (k = Ni(e, a.svg)),
        a.svg &&
          (a.uncache
            ? ((oe = e.getBBox()),
              (l = a.xOrigin - oe.x + "px " + (a.yOrigin - oe.y) + "px"),
              (D = ""))
            : (D = !t && e.getAttribute("data-svg-origin")),
          Fi(e, D || l, !!D || a.originIsAbsolute, a.smooth !== !1, k)),
        (y = a.xOrigin || 0),
        (E = a.yOrigin || 0),
        k !== sa &&
          ((U = k[0]),
          (z = k[1]),
          (O = k[2]),
          (H = k[3]),
          (d = I = k[4]),
          (u = B = k[5]),
          k.length === 6
            ? ((m = Math.sqrt(U * U + z * z)),
              (f = Math.sqrt(H * H + O * O)),
              (p = U || z ? Ut(z, U) * _t : 0),
              (A = O || H ? Ut(O, H) * _t + p : 0),
              A && (f *= Math.abs(Math.cos(A * Ft))),
              a.svg && ((d -= y - (y * U + E * O)), (u -= E - (y * z + E * H))))
            : ((Mt = k[6]),
              (os = k[7]),
              (ft = k[8]),
              (qe = k[9]),
              (Pt = k[10]),
              (tt = k[11]),
              (d = k[12]),
              (u = k[13]),
              (h = k[14]),
              (C = Ut(Mt, Pt)),
              (w = C * _t),
              C &&
                ((S = Math.cos(-C)),
                (M = Math.sin(-C)),
                (D = I * S + ft * M),
                (oe = B * S + qe * M),
                (Ge = Mt * S + Pt * M),
                (ft = I * -M + ft * S),
                (qe = B * -M + qe * S),
                (Pt = Mt * -M + Pt * S),
                (tt = os * -M + tt * S),
                (I = D),
                (B = oe),
                (Mt = Ge)),
              (C = Ut(-O, Pt)),
              (b = C * _t),
              C &&
                ((S = Math.cos(-C)),
                (M = Math.sin(-C)),
                (D = U * S - ft * M),
                (oe = z * S - qe * M),
                (Ge = O * S - Pt * M),
                (tt = H * M + tt * S),
                (U = D),
                (z = oe),
                (O = Ge)),
              (C = Ut(z, U)),
              (p = C * _t),
              C &&
                ((S = Math.cos(C)),
                (M = Math.sin(C)),
                (D = U * S + z * M),
                (oe = I * S + B * M),
                (z = z * S - U * M),
                (B = B * S - I * M),
                (U = D),
                (I = oe)),
              w &&
                Math.abs(w) + Math.abs(p) > 359.9 &&
                ((w = p = 0), (b = 180 - b)),
              (m = j(Math.sqrt(U * U + z * z + O * O))),
              (f = j(Math.sqrt(B * B + Mt * Mt))),
              (C = Ut(I, B)),
              (A = Math.abs(C) > 2e-4 ? C * _t : 0),
              (_ = tt ? 1 / (tt < 0 ? -tt : tt) : 0)),
          a.svg &&
            ((D = e.getAttribute("transform")),
            (a.forceCSS = e.setAttribute("transform", "") || !Cr(xe(e, Y))),
            D && e.setAttribute("transform", D))),
        Math.abs(A) > 90 &&
          Math.abs(A) < 270 &&
          (n
            ? ((m *= -1),
              (A += p <= 0 ? 180 : -180),
              (p += p <= 0 ? 180 : -180))
            : ((f *= -1), (A += A <= 0 ? 180 : -180))),
        (t = t || a.uncache),
        (a.x =
          d -
          ((a.xPercent =
            d &&
            ((!t && a.xPercent) ||
              (Math.round(e.offsetWidth / 2) === Math.round(-d) ? -50 : 0)))
            ? (e.offsetWidth * a.xPercent) / 100
            : 0) +
          o),
        (a.y =
          u -
          ((a.yPercent =
            u &&
            ((!t && a.yPercent) ||
              (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0)))
            ? (e.offsetHeight * a.yPercent) / 100
            : 0) +
          o),
        (a.z = h + o),
        (a.scaleX = j(m)),
        (a.scaleY = j(f)),
        (a.rotation = j(p) + s),
        (a.rotationX = j(w) + s),
        (a.rotationY = j(b) + s),
        (a.skewX = A + s),
        (a.skewY = v + s),
        (a.transformPerspective = _ + o),
        (a.zOrigin = parseFloat(l.split(" ")[2]) || (!t && a.zOrigin) || 0) &&
          (i[ge] = Ia(l)),
        (a.xOffset = a.yOffset = 0),
        (a.force3D = fe.force3D),
        (a.renderTransform = a.svg ? _l : wr ? Er : xl),
        (a.uncache = 0),
        a
      );
    },
    Ia = function (e) {
      return (e = e.split(" "))[0] + " " + e[1];
    },
    Ui = function (e, t, a) {
      var i = ne(t);
      return j(parseFloat(t) + parseFloat(dt(e, "x", a + "px", i))) + i;
    },
    xl = function (e, t) {
      ((t.z = "0px"),
        (t.rotationY = t.rotationX = "0deg"),
        (t.force3D = 0),
        Er(e, t));
    },
    kt = "0deg",
    ca = "0px",
    St = ") ",
    Er = function (e, t) {
      var a = t || this,
        i = a.xPercent,
        n = a.yPercent,
        o = a.x,
        s = a.y,
        c = a.z,
        l = a.rotation,
        d = a.rotationY,
        u = a.rotationX,
        h = a.skewX,
        m = a.skewY,
        f = a.scaleX,
        p = a.scaleY,
        w = a.transformPerspective,
        b = a.force3D,
        A = a.target,
        v = a.zOrigin,
        _ = "",
        y = (b === "auto" && e && e !== 1) || b === !0;
      if (v && (u !== kt || d !== kt)) {
        var E = parseFloat(d) * Ft,
          k = Math.sin(E),
          C = Math.cos(E),
          S;
        ((E = parseFloat(u) * Ft),
          (S = Math.cos(E)),
          (o = Ui(A, o, k * S * -v)),
          (s = Ui(A, s, -Math.sin(E) * -v)),
          (c = Ui(A, c, C * S * -v + v)));
      }
      (w !== ca && (_ += "perspective(" + w + St),
        (i || n) && (_ += "translate(" + i + "%, " + n + "%) "),
        (y || o !== ca || s !== ca || c !== ca) &&
          (_ +=
            c !== ca || y
              ? "translate3d(" + o + ", " + s + ", " + c + ") "
              : "translate(" + o + ", " + s + St),
        l !== kt && (_ += "rotate(" + l + St),
        d !== kt && (_ += "rotateY(" + d + St),
        u !== kt && (_ += "rotateX(" + u + St),
        (h !== kt || m !== kt) && (_ += "skew(" + h + ", " + m + St),
        (f !== 1 || p !== 1) && (_ += "scale(" + f + ", " + p + St),
        (A.style[Y] = _ || "translate(0, 0)"));
    },
    _l = function (e, t) {
      var a = t || this,
        i = a.xPercent,
        n = a.yPercent,
        o = a.x,
        s = a.y,
        c = a.rotation,
        l = a.skewX,
        d = a.skewY,
        u = a.scaleX,
        h = a.scaleY,
        m = a.target,
        f = a.xOrigin,
        p = a.yOrigin,
        w = a.xOffset,
        b = a.yOffset,
        A = a.forceCSS,
        v = parseFloat(o),
        _ = parseFloat(s),
        y,
        E,
        k,
        C,
        S;
      ((c = parseFloat(c)),
        (l = parseFloat(l)),
        (d = parseFloat(d)),
        d && ((d = parseFloat(d)), (l += d), (c += d)),
        c || l
          ? ((c *= Ft),
            (l *= Ft),
            (y = Math.cos(c) * u),
            (E = Math.sin(c) * u),
            (k = Math.sin(c - l) * -h),
            (C = Math.cos(c - l) * h),
            l &&
              ((d *= Ft),
              (S = Math.tan(l - d)),
              (S = Math.sqrt(1 + S * S)),
              (k *= S),
              (C *= S),
              d &&
                ((S = Math.tan(d)),
                (S = Math.sqrt(1 + S * S)),
                (y *= S),
                (E *= S))),
            (y = j(y)),
            (E = j(E)),
            (k = j(k)),
            (C = j(C)))
          : ((y = u), (C = h), (E = k = 0)),
        ((v && !~(o + "").indexOf("px")) || (_ && !~(s + "").indexOf("px"))) &&
          ((v = dt(m, "x", o, "px")), (_ = dt(m, "y", s, "px"))),
        (f || p || w || b) &&
          ((v = j(v + f - (f * y + p * k) + w)),
          (_ = j(_ + p - (f * E + p * C) + b))),
        (i || n) &&
          ((S = m.getBBox()),
          (v = j(v + (i / 100) * S.width)),
          (_ = j(_ + (n / 100) * S.height))),
        (S =
          "matrix(" +
          y +
          "," +
          E +
          "," +
          k +
          "," +
          C +
          "," +
          v +
          "," +
          _ +
          ")"),
        m.setAttribute("transform", S),
        A && (m.style[Y] = S));
    },
    kl = function (e, t, a, i, n) {
      var o = 360,
        s = $(n),
        c = parseFloat(n) * (s && ~n.indexOf("rad") ? _t : 1),
        l = c - i,
        d = i + l + "deg",
        u,
        h;
      return (
        s &&
          ((u = n.split("_")[1]),
          u === "short" &&
            ((l %= o), l !== l % (o / 2) && (l += l < 0 ? o : -o)),
          u === "cw" && l < 0
            ? (l = ((l + o * hr) % o) - ~~(l / o) * o)
            : u === "ccw" && l > 0 && (l = ((l - o * hr) % o) - ~~(l / o) * o)),
        (e._pt = h = new he(e._pt, t, a, i, l, ol)),
        (h.e = d),
        (h.u = "deg"),
        e._props.push(a),
        h
      );
    },
    Pr = function (e, t) {
      for (var a in t) e[a] = t[a];
      return e;
    },
    Sl = function (e, t, a) {
      var i = Pr({}, a._gsap),
        n = "perspective,force3D,transformOrigin,svgOrigin",
        o = a.style,
        s,
        c,
        l,
        d,
        u,
        h,
        m,
        f;
      i.svg
        ? ((l = a.getAttribute("transform")),
          a.setAttribute("transform", ""),
          (o[Y] = t),
          (s = la(a, 1)),
          lt(a, Y),
          a.setAttribute("transform", l))
        : ((l = getComputedStyle(a)[Y]),
          (o[Y] = t),
          (s = la(a, 1)),
          (o[Y] = l));
      for (c in We)
        ((l = i[c]),
          (d = s[c]),
          l !== d &&
            n.indexOf(c) < 0 &&
            ((m = ne(l)),
            (f = ne(d)),
            (u = m !== f ? dt(a, c, l, f) : parseFloat(l)),
            (h = parseFloat(d)),
            (e._pt = new he(e._pt, s, c, u, h - u, Bi)),
            (e._pt.u = f || 0),
            e._props.push(c)));
      Pr(s, i);
    };
  de("padding,margin,Width,Radius", function (r, e) {
    var t = "Top",
      a = "Right",
      i = "Bottom",
      n = "Left",
      o = (e < 3 ? [t, a, i, n] : [t + n, t + a, i + a, i + n]).map(
        function (s) {
          return e < 2 ? r + s : "border" + s + r;
        },
      );
    Ra[e > 1 ? "border" + r : r] = function (s, c, l, d, u) {
      var h, m;
      if (arguments.length < 4)
        return (
          (h = o.map(function (f) {
            return je(s, f, l);
          })),
          (m = h.join(" ")),
          m.split(h[0]).length === 5 ? h[0] : m
        );
      ((h = (d + "").split(" ")),
        (m = {}),
        o.forEach(function (f, p) {
          return (m[f] = h[p] = h[p] || h[((p - 1) / 2) | 0]);
        }),
        s.init(c, m, u));
    };
  });
  var Mr = {
    name: "css",
    register: Oi,
    targetTest: function (e) {
      return e.style && e.nodeType;
    },
    init: function (e, t, a, i, n) {
      var o = this._props,
        s = e.style,
        c = a.vars.startAt,
        l,
        d,
        u,
        h,
        m,
        f,
        p,
        w,
        b,
        A,
        v,
        _,
        y,
        E,
        k,
        C,
        S;
      (Ri || Oi(),
        (this.styles = this.styles || fr(e)),
        (C = this.styles.props),
        (this.tween = a));
      for (p in t)
        if (
          p !== "autoRound" &&
          ((d = t[p]), !(be[p] && tr(p, t, a, i, e, n)))
        ) {
          if (
            ((m = typeof d),
            (f = Ra[p]),
            m === "function" && ((d = d.call(a, i, e, n)), (m = typeof d)),
            m === "string" && ~d.indexOf("random(") && (d = ta(d)),
            f)
          )
            f(this, e, p, d, a) && (k = 1);
          else if (p.substr(0, 2) === "--")
            ((l = (getComputedStyle(e).getPropertyValue(p) + "").trim()),
              (d += ""),
              (rt.lastIndex = 0),
              rt.test(l) ||
                ((w = ne(l)),
                (b = ne(d)),
                b ? w !== b && (l = dt(e, p, l, b) + b) : w && (d += w)),
              this.add(s, "setProperty", l, d, i, n, 0, 0, p),
              o.push(p),
              C.push(p, 0, s[p]));
          else if (m !== "undefined") {
            if (
              (c && p in c
                ? ((l =
                    typeof c[p] == "function" ? c[p].call(a, i, e, n) : c[p]),
                  $(l) && ~l.indexOf("random(") && (l = ta(l)),
                  ne(l + "") ||
                    l === "auto" ||
                    (l += fe.units[p] || ne(je(e, p)) || ""),
                  (l + "").charAt(1) === "=" && (l = je(e, p)))
                : (l = je(e, p)),
              (h = parseFloat(l)),
              (A = m === "string" && d.charAt(1) === "=" && d.substr(0, 2)),
              A && (d = d.substr(2)),
              (u = parseFloat(d)),
              p in Ne &&
                (p === "autoAlpha" &&
                  (h === 1 && je(e, "visibility") === "hidden" && u && (h = 0),
                  C.push("visibility", 0, s.visibility),
                  ct(
                    this,
                    s,
                    "visibility",
                    h ? "inherit" : "hidden",
                    u ? "inherit" : "hidden",
                    !u,
                  )),
                p !== "scale" &&
                  p !== "transform" &&
                  ((p = Ne[p]), ~p.indexOf(",") && (p = p.split(",")[0]))),
              (v = p in We),
              v)
            ) {
              if (
                (this.styles.save(p),
                (S = d),
                m === "string" && d.substring(0, 6) === "var(--")
              ) {
                if (
                  ((d = xe(e, d.substring(4, d.indexOf(")")))),
                  d.substring(0, 5) === "calc(")
                ) {
                  var M = e.style.perspective;
                  ((e.style.perspective = d),
                    (d = xe(e, "perspective")),
                    M ? (e.style.perspective = M) : lt(e, "perspective"));
                }
                u = parseFloat(d);
              }
              if (
                (_ ||
                  ((y = e._gsap),
                  (y.renderTransform && !t.parseTransform) ||
                    la(e, t.parseTransform),
                  (E = t.smoothOrigin !== !1 && y.smooth),
                  (_ = this._pt =
                    new he(this._pt, s, Y, 0, 1, y.renderTransform, y, 0, -1)),
                  (_.dep = 1)),
                p === "scale")
              )
                ((this._pt = new he(
                  this._pt,
                  y,
                  "scaleY",
                  y.scaleY,
                  (A ? Rt(y.scaleY, A + u) : u) - y.scaleY || 0,
                  Bi,
                )),
                  (this._pt.u = 0),
                  o.push("scaleY", p),
                  (p += "X"));
              else if (p === "transformOrigin") {
                (C.push(ge, 0, s[ge]),
                  (d = yl(d)),
                  y.svg
                    ? Fi(e, d, 0, E, 0, this)
                    : ((b = parseFloat(d.split(" ")[2]) || 0),
                      b !== y.zOrigin && ct(this, y, "zOrigin", y.zOrigin, b),
                      ct(this, s, p, Ia(l), Ia(d))));
                continue;
              } else if (p === "svgOrigin") {
                Fi(e, d, 1, E, 0, this);
                continue;
              } else if (p in Sr) {
                kl(this, y, p, h, A ? Rt(h, A + d) : d);
                continue;
              } else if (p === "smoothOrigin") {
                ct(this, y, "smooth", y.smooth, d);
                continue;
              } else if (p === "force3D") {
                y[p] = d;
                continue;
              } else if (p === "transform") {
                Sl(this, d, e);
                continue;
              }
            } else p in s || (p = zt(p) || p);
            if (
              v ||
              ((u || u === 0) && (h || h === 0) && !rl.test(d) && p in s)
            )
              ((w = (l + "").substr((h + "").length)),
                u || (u = 0),
                (b = ne(d) || (p in fe.units ? fe.units[p] : w)),
                w !== b && (h = dt(e, p, l, b)),
                (this._pt = new he(
                  this._pt,
                  v ? y : s,
                  p,
                  h,
                  (A ? Rt(h, A + u) : u) - h,
                  !v && (b === "px" || p === "zIndex") && t.autoRound !== !1
                    ? cl
                    : Bi,
                )),
                (this._pt.u = b || 0),
                v && S !== d
                  ? ((this._pt.b = l), (this._pt.e = S), (this._pt.r = ll))
                  : w !== b &&
                    b !== "%" &&
                    ((this._pt.b = l), (this._pt.r = sl)));
            else if (p in s) Al.call(this, e, p, l, A ? A + d : d);
            else if (p in e) this.add(e, p, l || e[p], A ? A + d : d, i, n);
            else if (p !== "parseTransform") {
              li(p, d);
              continue;
            }
            (v ||
              (p in s
                ? C.push(p, 0, s[p])
                : typeof e[p] == "function"
                  ? C.push(p, 2, e[p]())
                  : C.push(p, 1, l || e[p])),
              o.push(p));
          }
        }
      k && sr(this);
    },
    render: function (e, t) {
      if (t.tween._time || !Ii())
        for (var a = t._pt; a; ) (a.r(e, a.d), (a = a._next));
      else t.styles.revert();
    },
    get: je,
    aliases: Ne,
    getSetter: function (e, t, a) {
      var i = Ne[t];
      return (
        i && i.indexOf(",") < 0 && (t = i),
        t in We && t !== ge && (e._gsap.x || je(e, "x"))
          ? a && ur === a
            ? t === "scale"
              ? pl
              : hl
            : (ur = a || {}) && (t === "scale" ? gl : ml)
          : e.style && !ii(e.style[t])
            ? dl
            : ~t.indexOf("-")
              ? ul
              : Ti(e, t)
      );
    },
    core: { _removeProperty: lt, _getMatrix: Ni },
  };
  ((pe.utils.checkPrefix = zt),
    (pe.core.getStyleSaver = fr),
    (function (r, e, t, a) {
      var i = de(r + "," + e + "," + t, function (n) {
        We[n] = 1;
      });
      (de(e, function (n) {
        ((fe.units[n] = "deg"), (Sr[n] = 1));
      }),
        (Ne[i[13]] = r + "," + e),
        de(a, function (n) {
          var o = n.split(":");
          Ne[o[1]] = i[o[0]];
        }));
    })(
      "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
      "rotation,rotationX,rotationY,skewX,skewY",
      "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
    ),
    de(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (r) {
        fe.units[r] = "px";
      },
    ),
    pe.registerPlugin(Mr));
  var g = pe.registerPlugin(Mr) || pe;
  g.core.Tween;
  const Fe = "Thinking",
    Ht = "Show more",
    Vt = "Show less";
  function zi(r, e) {
    const t = r.toLowerCase();
    return t.includes("vercel")
      ? "Reading the uploaded Vercel context to identify developer pains, AI app workflows, competitive traps, and GTM opportunities."
      : t.includes("developer personas")
        ? "Mapping engineering leaders, platform teams, founders, and frontend owners to account-fit and urgency signals."
        : t.includes("frontend cloud") || t.includes("ai app")
          ? "Extracting Next.js, preview deployments, global performance, enterprise controls, and Vercel AI SDK proof points."
          : t.includes("source") || t.includes("data")
            ? "Searching across company records, contact databases, technographics, commerce signals, and local business indexes to find matches."
            : t.includes("competitor") || t.includes("positioning")
              ? "Comparing the business context against known market alternatives, displacement angles, objections, and differentiation claims."
              : t.includes("messaging") || t.includes("proof")
                ? "Extracting repeatable claims, customer proof, pain language, and credible hooks that can become outbound strategy."
                : t.includes("company")
                  ? "Reviewing public company information, website copy, firmographics, and recent external signals to understand the account context."
                  : t.includes("icp") || t.includes("buyer")
                    ? "Mapping personas, buying committees, seniority, department ownership, and account-fit signals from the available evidence."
                    : t.includes("blog")
                      ? "Reading launch notes, blog posts, category language, and positioning themes to infer the strongest outreach angles."
                      : t.includes("career") || t.includes("hiring")
                        ? "Checking careers pages, new roles, team growth, and hiring language to understand near-term operating priorities."
                        : t.includes("gtm")
                          ? "Connecting signal strength, audience fit, and likely urgency to decide which outbound motion is most likely to convert."
                          : t.includes("funding") || t.includes("round")
                            ? "Reviewing recent funding announcements, raise dates, investor notes, and company updates from the past three months."
                            : t.includes("transcript") || t.includes("notes")
                              ? "Extracting CRM fields, next steps, risk language, and owner context from the conversation transcript."
                              : t.includes("logs") || t.includes("auth")
                                ? "Inspecting connector logs, authentication events, permission changes, and recent workspace activity."
                                : t.includes("account") || t.includes("signals")
                                  ? "Combining account history with public source changes and recent activity to prepare a concise research brief."
                                  : e % 2 === 0
                                    ? "Inspecting relevant records, comparing source confidence, and filtering out low-quality matches before returning results."
                                    : "Cross-checking the strongest evidence across sources so the final answer only includes useful, defensible results.";
  }
  function Hi(r) {
    return r <= 1 ? "4m 12s" : r <= 3 ? "4m 20s" : "4m 50s";
  }
  function Dr(r) {
    const e = Math.max(0, Math.floor(r)),
      t = Math.floor(e / 60),
      a = e % 60;
    return t > 0 ? `${t}m ${a}s` : `${a}s`;
  }
  const Cl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeUlEQVQ4jd3TsRFAYAyG4Td+1rGFRm8CnbOO0gL0GgOomcEWjmg07jj86aRN8tyXIsJYKN9rAXoceeCxDBABKavUvsBRmhgBInk1NhYNkF21rAkImcpLGXQmroZnQLfmptcCj4D5hB8A4vkLpwSLEZDeBjjNgc43yQ5kyxoFPrhHWwAAAABJRU5ErkJggg==",
    Tl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEVHcEz+tQD/vAD8tAD6K2D/tgAlxPkVwP8YwP//tgD+uAAOwP8Mwv/5K2DHLyeKAGkcwP8Aw/8Mv/+6IUj/rwD5K2GzAE24G0j//wChAFmwD0f9KkYXv//9tAD4KmC3H0a5H0jZJVTkJ1jwBUmcAAAAG3RSTlMAzFX6SZEOh0ZCD70sfxAFFmn6jRQod/YUM7hQnaq0AAAAdklEQVQYlY2PSRKDIBAAhz0oSFyzFIvJ/x8ZgYhcrLJPdHOYGYBrNIwQ1hSVyEUIklm3p8sQtyXTYfR3hzDnQD/v15NFZZNq7Q2o/4bHYrDkYrA2Be9DWLveJnLwowFRBR2HlTDrvEwJOymIO1ShPX4jip/c+QPspgsTY5Zd9wAAAABJRU5ErkJggg==",
    El =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUXFxfy6OiEgICfmZlpZWXWzs5NS0syMTFjYGBbWFjf1tZva2uclpbk29vDu7tFQkI4NjaLhoa7tLS0ra3q4eEkJCQHTzuzAAAATUlEQVQYlWNgoARwMDFxIvOZGBkZmeEsRkYubhYeuAAvKysfPwMDC1yACaIJVUCAjU0QWYAbbBBMgFVImBkMuGG2iKA4QJSdXZQiHwEAwJgBiwaJnkkAAAAASUVORK5CYII=",
    Rr =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGNQOhpHEmIY1TCqYfhqAACML0UQHuDXpwAAAABJRU5ErkJggg==",
    Pl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEVHcEwAc/8Ac/8Acv8Ac/8AcP8Ac/8Ac/8Ac/8Ac/8Ac/8Ac/8Ac/8AcP8Ac/8pWYqpAAAADnRSTlMAMm5b2g/F7aVJlYG0HQV+ULEAAABmSURBVBiVbY/bDsAgCEMRcF7X///c4dQMk/UJCs1JiUyKUNEKOi0x+o1EwDbGmBAyeBsXhJGDfS0VqA/MjH0544VczpiQeELcvYMN4ow/SHSQitrQ5INEu1vAQaysHk0EXUYTHcsDTdkETLWztHkAAAAASUVORK5CYII=",
    Ml =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAKlBMVEVHcExPtf0upv0bpP0Vk/3b8f7b8f7c8v5Tuf0XmP0Qkf0Ynf0Zof0bo/0p6qQOAAAAB3RSTlMA+1/j4+NfcZs3/QAAAF5JREFUGJVtz8sOwCAIRNERHxXQ///dKpBUk87unrABoDznHKPvJQLIMqB3QrYcGpAwvG9QDUgGO5Ut94Unsx2swXNB8sGT5YmBf0FuWCkHWB5QRE6ooBvaerd8UBteZt8ICiaoa+IAAAAASUVORK5CYII=",
    Ir =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2UlEQVQ4jZWSsW9OYRjFf+e9935J/wJt+B/UIBqKEE2DTfJFpWyiWiImi0FrtJGWLyKSJhIWk0mnaoi0BKMYSAzKYrFo73vfY7it7+vXNuFJnul5znnPc84rX8yHwQ+AlcrZ9axv9akmiWxRvkBBKEbsNIWwrLNKY9k3oA8AkUDzkq5xr3wnMICNuJwPOHILfADQGufXAPrVfoKAfdROrxjPbvs8OwCYKMYcPQ8e7ACDiIrjjWZw9QQTNmkWyyJMkZfPXGaLwK6OWRLZqDxJ7uV8Dnxkq7sBg5YQxh5oE+iFUhwSgC8V+xzTAtDYhqS7VpWFQd0t39Syp8sliceb9/Sh7i5JYpaZ8i1Q3y3hmDTLmuvrYCkOS3G4i8Qh0yOp3v1rXF5Q/aN8qNq4AHXOqfI5OiPC/Xb+3ORz4P7Ou5BPe223NnGi2OsqveR/TFQ4qFa5tE2Meg30gHdvVNVZWpDjsVB9b5xCPrxhJO9U0ThphavAj63xHiRrNEMg3ez+hTa9VblyPGuVd+Rqj8Q08HsDgQlO6UYA97RZSUjzMQ+Hslb1EED3WaZVXYkK+0FzQOpQkQdZI8AX0CeRjao3DjVmysX1nGte3GiV7/UznhBZE/QR8VlFOPMHnYnGfYh6xT4AAAAASUVORK5CYII=",
    Dl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEVHcEwAtv//cCD/WTcAw/+gTOIAtv//Njcky3H/czcky3Eky3FikcacmrbFi47/NTQizG8At///czeGTv+MRv/IQ6//cC9elcD/byiil7FflMHhlt8GAAAAD3RSTlMAO2o2Y3N9dHV3PDJ3d8DNbxI3AAAAZUlEQVQYlYWMSQ6AIBAEB2V1BdnU/z/UITLEC7FO3ZV0AyCjUsoYM0JF7ciBDFXsJI6eeCfpTIZORIxx2K61dY9w5xyvovTgCj0hfAihTCSdLHfOwCSjri0CH+yvKBP9FTDpueUHZzYHUnCSxBoAAAAASUVORK5CYII=",
    Rl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEX0XUj////0V0DzTDH3nJH0WUP0Vj/5r6f7ycTzPxv5uLHzUjv96+r96Ob4rKT83Nj2i3771dH+9vb1eWr7z8v2gXP1fW76w77+8O/yMADyIwD4oZcjV8HwAAAAZ0lEQVQYlY2PSRKAIAwEGWJYFBfABfX//5SDZTiaW3dNTU2U+nmGyAwsTDaM07x8hiJSAjr9Mmc471cR+sbGvDSJHYf3ToSiGaU0HdX0qfStUMN5OWQZUhsTIkmA7xBsw9XU6X/ffAC+LwMx3zJEQgAAAABJRU5ErkJggg==",
    Il =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUBARsAABkAAAwAAAAAABVKOkMXEiN8fIH/zc2RcnbntbWHam8HBRwZFCTzvr75w8P/0NBENj8nHyyog4fQo6S1jpD4wsKde391XGLDmZvsubmMAc49AAAAd0lEQVQYlW2PwRKDMAhElwRjTGyobaxt/v9DSxwOVrt7eCwDM4DR4SA34ifjHHcRQU0GzSHMtzkEA8GXON2nWAwePslTstQaBy3W3nhVbaRt41Tl7fpEjlk+a+loOtH25Wbw4GV4qFUdCwPMpGbDn0Mvujx3fv8L/hgFdRdpvpEAAAAASUVORK5CYII=",
    ql =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAAD///8nJydBQUGpqan29vYaGhqysrKHh4fY2Ng8PDzg4OCNjY3s7Ox0dHS5ubnm5uZdXV0WFhbBwcEICAhiYmKDg4OWlpYkJCS0tLQRERFISEg4ODhsbGw7gbjnAAAAdUlEQVQYlV3PRxKAIAwFUAQlIFJsIJb7X9ORgC27vCEhn9SUvIrW5NOT0hqrHfS3DmOVyg7YT21TZUGYPSuCUxxEEUggKYg85RIwRaFD0bjjkZjAB6aWGC4xuLQR+Y1c8d9N+0vCzsup67Ezyc30TvOE+8c/ARgLBHAKow9dAAAAAElFTkSuQmCC",
    Bl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+klEQVQ4jV2RzWtcZRyFz/m9985MZtLQzDgf+VhomXRqAhVJ28FGha6kC0Gr/hdSdNlKCVkUC250IypY0HVXLvwEqQubmsSFSuJNGnXVVjOt1aYzk8y973tchEr0WZ3Fw+HAIf5Hq9U+Cuh5QEYiC0E5gHNmWATClST5/qf9vnsYms1mvlZrXiDhdneLl8nBPZI5M/6YZfEHpD8GWK5anTxTrx+81ul0/L8FzWYzbzZ60Xt71yw0zNJXzThN8mcABedQJVEm7dc01ZdS/EajMXq10+l4A4AoGj0fgr0dRf4FwG2bYUPiNxJ+D0F/ACEPQKRXHOO093gnTYfOAYBrtdpHSTgzDIeAzvr60leVysTpQmH3Y+9d2wzPSTZCopgkKx+WyxOjUWQ1AIN6fcLzyJHjCxIyEn0AkDACsCCFLomeZNd7PbdSKvkFUn0A2wAO7+yUzhYK3dcNwMksi98n9UMI3CTR73bdPImixKtA2C2V/IKkB8713pK0EQLuDw1tT0s0V6lMPAqELoADgG6T1o6i7G8JqzdurCzdvXvrZq02uU2q4X005px+IzEA+IiEEZOQOsdJyUwSJSyaWXv/15IYApdItrMMcQi24z1vAsgZiZj0iVl4xoz1fH7n0xA0bOZempqabU9NzbYlvBjCn0sktsxYB3Q/l8MGqbkIYOj3D6zl890REocHg/wsyaFu180XizhmpnYIoRtFo+cBgOQUCWYZnpL4ravVxu45l54iuRICbq+vL1+uVsefjmOdMAtPSlwrFAYfeR/NJcnyfLk8USJtC1AaRfja3blza6tSGT/jvX3hnE5Uq+NlgAcBJRIXAfzlvXtCsmKtNjZM8pBz/rr3PJUky1cMAOK4/6ZZeC1N8ZnkCIAAd83QIDVO4llALcnRufB5mtrZOO5dwp64x8zMTC5Nh86R/EXCIe/j9+I4fVzCZAhYTdNSkss9eAXgY3Hcu7S6ujr4T8FDpqePz2SZXiZxUsK1vSWyEBhCsE82N79b2+//Azn7ZJedFPGXAAAAAElFTkSuQmCC",
    Ll =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGPojvlGEmIY1TCqYfhqAAAq1t0QMabSpAAAAABJRU5ErkJggg==",
    Ol =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGOwbvpGEmIY1TCqYfhqAACHB7MQtEO1oAAAAABJRU5ErkJggg==",
    Nl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVQ4jX2QMUhbYRSFv1dMhjyhL2BeMBmc0qWLXQVpHFzi4tSCS0XUwbmTWTJIBrM4CG4lggiddOjgJDgmm5B2cHk65EGSIb+Q/w0vw+nQmJo2euHCuXDvxznXkeQCH4F3QA54C6RHOmOt9aIoShtjEvPz8+3Z2dmy4zinjGoG+HZ5efnp9vaWMAzp9/uEYYi1FgDXdUmlUnieRxiG+f39/bqkL8Bnx3F6SOr4vq9SqaRGo6EgCBTHsaZVEARaX19XpVKRtXYgqeRI6mSzWb/b7bK5ucnq6irGGKy19Ho9oiga6ziOeXh44O7ujpWVFa6vr3/O8Kzq9TrGGAqFAslkkoWFBRKJBPl8Hs/zxm2tZXl5GSAzAQC4uLgY6zAMyeVyAJyfn3N1dcXc3Bzb29t/D55+AOjPKFUqFSUSCQE6OjqSJDUaDaXTacVxrMFgIN/3JakzFSBJvu/L8zx5nqdWq6UgCJ6OJgBv/o3wvA4ODjDGsLW1RRRFU3deBRSLRXZ2dmg2m1Sr1elLr0VotVrq9/sqFAoCXozwa3FxcSrcGIPneRwfH79sU1Kx2WyOvy5JtVpNu7u72tvbGzs6OzvT4eHhfw6cEaRWrVa/lstlBoPBhANjDMPhkHa7zePjI8YYut0uJycndDqd7hPABRpra2vvb25uJhwmk0lyuRyu65LJZMbz0tISGxsbP5xnUQrA9/v7+w+pVMpKstls1gBDwAK9kR4C7VGf/gbPbZWL1WleXwAAAABJRU5ErkJggg==",
    Fl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGP4Oo+bJMQwqmFUw/DVAAACRZ4QdD+g5wAAAABJRU5ErkJggg==",
    Ul =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEVHcEwAKZFgzf8odsEAKpEAKJBgzf9gzf8AKZFgzf9Qsuxhz/9h0P8AKZEAKZEAKpJgzf8AKZEAKZEAKZIAAG4AKf9gzf8AJY4AKZEDkv9j0f8ASbMAjP9Ht/wAiP8AD4kAG4sinv8AMJlHoN8AOaIrgNL2JF6mAAAAFXRSTlMADo0BaZ3sXcqaK0aywNVF6c79NxD+lfCrAAAAfElEQVQYlY2P2xKCMAxEQUBb8ILAJGlpC4j+/y8SxxKGB2bctz2TZLNJ8pfSu1Lqlm/gQYSsQkBO2LNeAgpCw3LXFTzxbZwLk71E0GDvQjAA+uczGj/eewsQJ1oaZ8sWzhIyeHb1aQsZLIj7PtqVsh6vVgDlrkyldXZUdAFXgAfvMnEX9AAAAABJRU5ErkJggg==",
    zl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZUlEQVQ4jX2TTUhUURiGnzMqM2NOzsbQfsckmsjwmhqpUQoVlom26EcIRIraBCmY0MqGwkRa6KZ0Ue0yF5L2Y7QaM0GQpEubxhloBhfO2J8Td4a5g42nhV69JviuzoHvfc/7vd93BP/DrVQhl+oRogFwASBREaggPPjUkLlcrJ5cihP7UgdStGwQXceQPSQsHkJqdE3ApTixSi8CZVOyAYlKUlQTUqNpAORtewCiAcBhc1C4q5DTxXVE/oSxbsmivKYRmQHR72HDdy4Z0sbP+fcCt+ICGTTIo60v+RIJMKKOUlp2jgU7qDNj7C5T2H+qnO7as+hazOin2gKyw3BWln8YX8RPps3BXHSORQSpNFj4Fca5Ixff5DjuqkpzKw3pCBTkmsCrz2/5nYxz72o/d57eQLdC0/3HDPd50Bej5JcWwevVQOvTkWvB+cJ+LpU38kOP0/m8jbrzbcSzJS+6b1N5rZnMHCsTT56Z43RZzDdfJIBEkmnPIqZrpAToCQ09rmFzZJGIxQn7v62fKu6iICsL036mlangNElh4eaVh3QNtKGlNJq6HuEd6md+1s++6gredHQbbDUdIUaQ8tayAz+1xXUI+1b6hjycrLmOni0Z7Gyn5OIFcg4W4J/4aApRqBYkw8bd+3WcY+4TxBMaiYSGkAJSIKVAj8UoqDjO7CfV3IFneRMPKD2Gizzndg7ll7BnbwnvJgf4myE5UnuZYGCawOQH9FjMeL2XGbVlWUBRnCSl1zyRTbFhlSMRnZ15g6SEHTi6OVn0khTN6z+TGW7FBdxFUISUK45ECMkIgmF86pi5/B9ga/KYLsUOOgAAAABJRU5ErkJggg==",
    Hl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEX///8AAAAkJCQMDAyBgYEWFhaqqqoaGhrc3NwFBQVqamq8vLx8fHympqZlZWX19fVQUFDy8vIoKCi3t7dgYGCRkZGbm5v4fqiUAAAAa0lEQVQYlWWOWxKAIAgApSwEUyut+x81Iu0x7ZezgyzG/EiTvWjCwaBAukWnwDPRKzAzl+U0YVQCIYJ7b1/lWxUue+8zEDVR5E0QxNZhxndFiD0i0iaLqwiRJSn5bwWfysV5/kfs1k7J/DgA2zoDaFhX6hEAAAAASUVORK5CYII=",
    Vl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEV6AF3////ewNeTMHuHGWzbutPhxtu8f62tY5yDEmjNn8K5eqrw4uyiTo6oWJX17PP7+Pr58/fQpsaUM33Ci7Xy5/DUrMqaP4XFkLjghu1BAAAAWklEQVQYla2PSw6AIBBDOx9EUcAvcP+TymL0BHTVvjRNCoyRd6rOY2YxsFDASoJt+irdRUpw2bKQR9hVj9MA7ypUEOgyoH3jJlnyv/EwEkXw84HSULmilUE/XidhAl42YZzTAAAAAElFTkSuQmCC",
    Gl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEX////J4doAXTO31cwAWy90qJdam4dQmIJmoY7U5uHs9PK/2tLw9vW01MvM4ty6188AUBtEknsAYDkAVihkpZJtqZcAUyIATxp/sqOUvrGszcN4doo7AAAAaUlEQVQYlY3PSRKAIAxE0VYUMAHjiMP9DyolWoWu+Mu3SQcoyHl0PTyRCN1QDbAjgsg0cYIGrUHN6gszO6UogwXM7DLAGppNXrB7fjaC4LAx3SUIABsdMwlY/5YS9rm+C/JsP1XKU8mrF0CSA/WBIjolAAAAAElFTkSuQmCC",
    Ql =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABE0lEQVQ4jZ3Tvy5EQRQG8N9dd/0LhY430IhEIfECWg1PolBotlV4FFGpeYENQWiERqETWVnWtSju7O647og4ycm958w533fmm5lMabvYRAPvfrc8fA/Rgh18/tNbGa6xGDE8YiLB3sNcFN/lKELQxwaOMZsA6GANR4GkA+0wToGp1MYr9hR62nmUbGABt+F/CeNhrcClUuB5IyHFAAKq0HxWWVvBaVQzZK2zOhGbdYUpgCyR/zNAtyb3VldY1WDAfIFlTIa4F3I/posBPnAfxeeJ6R6Ud2YIMDiqhvIinWAm0fyMVSORc7jy/X53lefdr/GXSu3NWNjnesTSDNNkNV7VbH8gyDa2MG30NlLWxCsOsPcFht5JrzhcXkgAAAAASUVORK5CYII=",
    qr =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEX///9/AADUtrbfzc2IAgTcxcWYVVT////////////Xv7+0hYWqeXjAl5aJICD7+Pj28vKRNDSjZmTw6OjPq6ro3dxrdh8QAAAACXRSTlPu////////7+F1O+6fAAAAhUlEQVQYlV2PWw7FIAhERRFb8W27/61evNXYdD4IORCGUYdTL7lDuVNkh8zoZCz1IkgJyEurBvCEGBmR7AQWE3gLCBtgu2/moDfg3PVV1g2dkIwJKeYJOgPlTlj9BGeJnEtAXEc1R5m9gIUag7d1b8hjoQG2ZSsEigHSf9snnBH5J9w3/g+hBQbGLvrOhQAAAABJRU5ErkJggg==",
    Yl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4jc2TsWoCURBFzzw2C8ZCgiQKKQTJIpgv0C9IF9Q6tZX/4G/4VVauSBYtAsElhaQISYr1ppBEAy7ytvLCNI85hzcMY72uHk3biRk1PCKRytzQ+p1s7QsfSlxRGMCMmvMBKldQuvz/FuQ1X4TQbEHUhqhtRPdwXYfxSMymOYLqDfSedkDjDoLAjqiV/4P6LTz0vabCr/ssBblbOEyWiZcVJDGkrycEErytRTKH51gkMSwX8P11XG6Dbva3l1IZwhDeNwVH+PzYlU+cROqH7COROpkbFpH8nvMPujhEsWwjq+gAAAAASUVORK5CYII=",
    Wl =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABE0lEQVQ4jcXSPUqDURCF4SefMYoJxkawSSepxUpEoitIKboHK7eQ3so1iI1iLSIiIhZiEUKwkHSCiIiFQkhCsMiIIn7xp3HgwnDnnHdmLjdzCYxjERXMYxYzmBiUtXGHG1zhDKfFarWduWQba2jiHB30cIGjAFTiJMhhAXNj5fJBFsd4wAo2MRqmFyxF9wMU474b8O1cqdTM4hAbWMYeTjCFWhjbYa7hPlZdRy7J57cy8QZZrGIXfRTwhBHvMR2TJqHdL1arnSSKPeyEGZ7R+mC+xWPk/WjUEbS0aHzK+1+JhgHqKfmfAI000U9X+NMELYO/0MV1mig7BNCLKSYN/sKvAQJQGCb4DlCPCf4P8PYGqfEKP29DzuPh+lUAAAAASUVORK5CYII=",
    Br =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEX///8iIiINDQ3U1NR5eXmysrKioqL///8AAAD////AwMCJiYns7OzJycmrq6uWlpY6OjpERERQUFBqamplZWXeFUpeAAAACHRSTlP2////////NOB4UscAAABqSURBVBiVdc/BDoQgDEXRIkVvAUVn/P9vlQUqmthN807StJVJrCuZ5JGrvHKV1hypA7/tOUI4IVJTsoI2GN1MgKxDB2akcIOv86suF2AbadVAA4/LM2jRa+2Pv7H47rA4UB6Xfj8j8n7/AHV0CGt04/+HAAAAAElFTkSuQmCC",
    jl = {
      adyen: Cl,
      airtable: Tl,
      brex: El,
      "bright layer": Rr,
      brightlayer: Rr,
      census: Pl,
      clearbit: Ml,
      "dbt labs": Ir,
      dbt: Ir,
      figma: Dl,
      gusto: Rl,
      hex: Il,
      linear: ql,
      mercury: Bl,
      "northstar ai": Ll,
      "northstar dev": Ol,
      notion: Nl,
      orbitgrid: Fl,
      paypal: Ul,
      plaid: zl,
      retool: Hl,
      rippling: Vl,
      sequoia: Gl,
      square: Ql,
      "stanford gsb": qr,
      stanford: qr,
      stripe: Yl,
      tesla: Wl,
      unify: Br,
      "unify gtm": Br,
      vercel:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAKlBMVEUAAAD///8nJye3t7cyMjKHh4f8/Pz39/ecnJwaGhoSEhI5OTnW1tbT09NHEhmuAAAAOklEQVQYlWNgoB5gZUUTYGNH5XMwMnIg8zkZgYALSYAZJMCM4HMzggE3XIAHIsALF2BhAgMWSt0OAwBMcQCayCv/8QAAAABJRU5ErkJggg==",
      webflow:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAKlBMVEUUbvUUb/UTbvX///8CavUAYvUObfUbdvalw/vn8P6IsfpdlPi80/zA1vx9PzTeAAAAAnRSTlP3SrtnEswAAABpSURBVBiVfY8LDsAgCEPRFpi63f+6Q7OvS0YU0heUIknyIyTJSweZdJCezPoZdwB3p3lm1AF0BRRoBXA7wQLUyDo62GroHpoP0HU8qMzXH6gFRY+xumH1aGo8fVCVRvI29nH6t4zIvP4Ox/kDQdeBOboAAAAASUVORK5CYII=",
      wharton:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMElEQVQ4jaWRX0hTcRzFP/duOsQsM5AsyYc0ih4q9WGEUGA5S9CoJJAsiiAo7a1/lCG1zNSih/Ch0CAsUSExMBLf1F5EKCFS0mFZqJubbmvOO++9v18PCabtZXSez/fD+Z6jkF+9IxlzNNVYlMQgT1yC4hfxWVYA+6Kbc4FRNRZAc/IuemzpxHQUTf8NsAIkpm9lS/ammA4TPTbwLgPSDtjJu1SwymAKSWVjD6YpaKwsxKKuDtv69D10DkV/IaIbnKnrouzgbs4X7KH84Vu0JSNqEhVshilWFgyGIxRVtdE96CInK429mZvp/ThB4a1W/AvaqoTEm6ZKim36hydgAnj8C1x43I1r2k8gHCGnoomciia8wUXGpua5+OQd074QAJOeoI7GDAApJx99+PJ9VtivvJBhbUn+Ckdk0rF6WXS7TRTf6RDqkRrpng9J3TBl/vVXctjlFhuPN/TDcolzIe35vstN+1VFYWLGz5IhKMzdLluuFSsoUFbbJUcmfUpG6no+udzkVjYruimfASgAlLZbCI4NAtkAJ/J2ytYbJUqc1QKAbghO13XR3jfypwAph9gwbKejw1yp8/C9LBxOX6nzjdANU66VbpjyVE2nwHF/FseDzL9WWFZv1RjSUjA66fWOT839M9fXnz4+f5v1AA56bo5H3RSAo86MpJL6AefrARFY0GQgpMm7Lf1iXUl9H4dqt621K9Ep1SqO+LNJCdarUqoiFI400Ku/hGqx1vkb3iELIMm4QLQAAAAASUVORK5CYII=",
    },
    Lr = [
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAMFBMVEVHcEwJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMJQwMy2V0jAAAAD3RSTlMAIE3h7w3QL5ivgDprwF6vhlRnAAAEyklEQVR4nO2a2bKsKBBFZQYR+f+/veDADGJ51O4Id72UirJkSDITh+HTp9c1JoIP10+0xsFPa/48QKwP4AP4AD6AD+AD+C8AEMCkESAvAQBOKUKIKsUn9gYAo/4IqfldACN6r490DKC1urMjegA0vrEfugC0Ht8G6CMAcJrgycnbC9BDIIVxqxE/N2K6AfB0WP92nwCmLVycMQ3M/Z8LrdMNoNHBdCR8L2lQmbuNDhDt/8UlAK1AVwMsTRAB4D8COBgG0r2ouguANocXu78FdHMc1sfA3wHQ5ihgansCuA1AyxaAmW9mGVeTpbwOgNLziw6sETGOzNpI1wAQmhlgU4GB9trZSwBAruX2Pg1FmNPyxrus8eNi01ibBUqaouQQwAnkg2Fw/7CpE7ojZOyAr6cGsAj2AwwTTq9KX6UFcNdplyFawM8AkGwYPACgwqtZH9wAkLYyfRogrQOBlwFCxwNmg9A/+K8ABpHWofxEzQ2Bn4Z/BjBllez2lmRsGt8AIHUmYeJSAmDBEKqLABjjLNACBZOPlRAV1/gSgJohhOmSXmjouuQ1gNJiVBoEVZknXwIoOzQN/yOVmaG/APhOLjo03pc7knVKfwDw/roWJYCwQFvWRP0AAILphCArdMPYV/8yhIK3IYHHIhoAQ9zEBbcOdE0EunRgpejYApjSonknlF3QSGhuzRnWAoiHedGxnbNVJ9O2RoHiReus1gHiPih71lAfyK2RxT6YhiZA5FxWXHvY7IUgSSQLjWUzAi2A6P1qsQVrjEQVGpB8ziAZD6QcICSoBjck94H3WyITnhmubYFtAgQmoxFdkbGAgEVmOeJie9DeBvDc7fBupih4OkZoLK0fUiFXwjWPObnJ5gewO3B3MU4x1vgo28VmLtQiwadqNCzHpZCYPB8BTuYoOnBF4DSO7Qg7eNZRHEqOi3z69KSIhGnq4VEtqzTtmWFHAjCUncTm3ULZQiw8YdNS2/pgFwUW3WznvivY1ULxUmOtVuytYFsoWrfMSukMPQ2vrSs48H5jVwPFALwHYAocDub/b2G2j7zamd5LAP4YvgPgW0C+A+BcSkTeAXC1wuElgGFEGCMFQ3/pWQA73ddZ9hbAroMWAKwUG14GmPmu0A5w+xFCBGD8KEoVL+3eXQMo2gG9eoQeAO1pn4KfewvA8tbFHFSYCnwHoPGlykMAutoJTwGUkzUPAuC3Aap98BhAbS/+MYDaZyl/DIBCACHnJwEwt45oaAlhmOXrA7A7WHH6CLM063XKJfMl+wDMWCXJmTEtU+2C8SeAoJeWJoBpSgjPyaZyFWBNzp8FyPYRD2XighDAZzLX1Ob9AOa5IUAwZOhoAqnTAMc500RiiACiVCrC5wEKW1Vt8QQgfsBpgNIuWlM2IA0BknT2eYCa6azJmooIgEUPOA9wZhNLr98xxADxA34AAKdGwWJtYoBo/+MHgMr2hSpyrY5NDBARNACYrPkEJQIOSi3DSQlgAN4c1gEk58U8cJlgIqWtpa3+DGAgLl6uAkzzKOqpYBCv6tt+QZLQRy7C8W3j/Bww0Q3A3WMnrC9pAHjr48ugwcP9bj/Cw6w3cQqeQAA0VSQXgwMwtmM0245cCJ75bsvZw+87P3369OnTp0//G/0DtJN6Z2FS0WoAAAAASUVORK5CYII=",
        keys: ["builtwith", "built with"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAKwUlEQVRoge2ZeXDV1RXHP/f3liyPEBOSx0teEkhCHigIRqlAoAUdwYXFQRBsUYeqVca61Rk7KDrQcaau2CqirVtBLdYNioDFCgJWC7KoqImYBZKQ5IUsvMDbt9/pHy/vmUgSQFNnnOE7c2d+c5dzz3bvPef84AzO4Ax+0lC9DYiIETgfuBwYBaQBYaAa2A68r5Ty9QcTImIBLgUmA8WACegAvgLeBT5XSkVPldhAEZklIp+IiC69wykivxeRXBHRvgfTmojkicgSEWnpY5+oiHwsIpeLSNrJiBaLyGoR8cVXRyIRaWxsksrKSqmtrRWfz9+VeEREPhKRS7+HADNFZFcnDRER8Xq9cujQIamsrBSn0ynRaLTrXl4ReUFEhnSlo7oQtAObiLmLIRAIsH79el577XWczmYikQiapjFw4ECmTr2Em266kaysQfHlrcAipdTaU2T+OuBPwCAAp9PJ88+/wLZtO/B4POi6jslkxG63s2DBAqZPv4KkJDNABPgUmKGUau1KMFtE/hPXeHl5hcyYMUtsNnuvbeTIc2XduvXi9ycs4hSRiSLS17lSInKxiByJa3zNmtekpGREn3vNnTtfqqqqulpki4hkACgRMQH3AA/oup68Y8eH3HvvEurq6gAYPHgwo0efS2ZmJoFAgAMHDlBdXUM0GmX48OGsWvUSQ4cOARBgK/AWscPeE8zANcAv/H6/euaZZ1m58ln8fj9Go5Hhwx04HA7MZjNtbe3s37+ftrY2AEpKhvHwww8xYcJ4lFJ+4AHgSUQkX0TKRUSczma59NIrJCcnT+z2Alm06Fb5+usD4nJ1iNfrE7fbLYcPH5Ynn3xKxo4dJ7t375FIJOHC8TPh6/TXnpqv81DK5s3vybBhDrHZ7FJSMkKee+55aWxsFLfbLV6vV1wul5SXl8vChTdKbm6+5OTkyezZc6WlpTW+1z4RyUVEron3PPXU0wmz3XzzInG73SIiouu6BEJBiXQ5VB0dHdIbfEF/jy0Ov98vZWWTxGazS2HhMFm7dt23GohGJBAKiq7riX2uvfb6BF+rV78Sn6qLyEwlIm8AVweDQcrKfk5TUxMFBfls2LAeq9WKN+DjHx9voKKhiqy0DOZMuAJHTmGfh3TJmsf04z5Pt6s1a2AGS+fdBcCGDRu5+eZFACxadAtLlz4AQEVDFes+eQ+X5xijCoYzf+IMUszJ1NfXM2PGlbS2tuJwlPDBB1swGAwALxmBnwFUVHxNU1MTAHPnzsFqtSIID761gpe3v00gHERTGtvLd7HqtuXkZFh7FWDfwS9ld9X+bn1TRo5PfG/d+gEA6enpzJ9/NQB1rY3c/sJS9tdWoIuQYk6mrrWRpfPupKCggJkzp/PSS6uoqqqmrq6eoqJCgHEaYAeor69PbFBaWgpAQ3szmz/fQSAcBEAXnQONNeyq/KxPC9hsORjSk7q1PLs9MV5bG7sgcnNzSE9PB2Bn5adUNh1EFwHAHwrwzp73aT3WDsB558V4EhHq6mrjpHKNxG6PbohGY6+2pjS070QbCoVBM/QpwICLhpIxZky3PktWQeJb01SCmU5+MSgNVPe9NE1DqfhcvetI/EM0oAlgyJBvH7j9+78AwHZWNldeOK0b0WLbEMY7SvsUoN0SxGBN7dbaLIHEeHyvhoZGPB43ABPPHstQa143OvPKppOZltGNJ4DCwgSvTsOyZcvKgJHZ2dm8+uoavF4vdXW1zJt3NampqUw+Zxw5GVaMmoGpYyaxfOH9ZA/M7JX5oITlEdd6IkS7qdMrAa5Pm4KmNEKhMJs2bSIUCpGSksKkSRNJT03jitKLiOgRbGdlc+f0X3PLtAVoStHc3MzixfcSCAQpLi7m7rt/Fye7ERH5ZfxuXrFipeTm5ovNZpfbbrtDWlp6jrGCwaDU1NT0OPa+d39kRO0d0lP7r+8bERHxeLwyZcrFYrPZpaioRN588y0Jh8M90mtsbJIbbrhJbDa75OUNkVWrXo4PhUXkSsOyZcuOA9MAa16enb179+F0Oqmqquabb75h5MhzyMrKSmjS5epg+fLlPProYzgcjm6uFyEqfzy6loZIe4/hhFv3c5mllCSzmfz8fDZvfg+fz8euXZ/g8/kYM2Y0SUlJiflffvklS5bcz/btO9B1nbKyCdx11x1YLBaAz4AnlMTi/nuAZYB527btLF58X+JWUkoxZswY8vPzcLvd7NmzF6/XC8DQoUNYvfpvOBwOBGGr7yt9ydG/q+NRf48CZGgWHsm6jkkpIwgFQ6xY8TTPPvtXfL5YWpGens4FF5yPxZLKoUO1lJdXIJ2nvLi4mMcff5Tx48cBBIH7gCcVJCLRF4DLRISdO3fxzDN/4eOPPyIQCJ7AiFKKESNGcMMNC7nqqtmkpqbSFHHJ4vZXZE+gptfcQKGYkOzgoawFWA3puN1u3njjTVatepmampoEs12RkpLClClTuPXWRYwde0G8+5/Eot8jXcPpXOBtYDyAy+Vi7959rF27jt2799Da2orFksqoUaOYNWsmF100hdzcXDRNwydBub31RX2Xv8qgo5/ARFcY0Jiccg7LsxeSrExEo1EaGhrZsmULGzduoqLiawKBAFarlfHjxzFnzmxKS88nPX1gnMQOYL5S6khMKV0gIoOBp4GZQBInQUSiVIeb5Q9H35DPg7WnlZVdmDSM+wfNpcg4OPYGnBwBYgq+SynVFu88wVclFme/S6clekJQwlSFnbLNV85G3z4Oh1vVicbvGwpFoTGbGQPGMjllJMNMNszK2NeSD4FZSqlj3en0ABF5D5h2uK1JXtz6usoamElGvhXyLVIfbVNfhOulMdyujkY9hI76iLZ4MZdkgqHXXKY7/YhOqOooxpwBJGVYyNQGkGccxGjzEPIMmUi9B9fhFtrdHdwy7VfxuOsdpdSV36XVp8jeoF/e2vkvmlxHVMr5OaRNL1HKpCUE171hjq8/QOhQB0mOLNIuL8aQkQxaL4JEhUirF/emKkJ1x0hyDEKbczYtKVFaosf4NHgQCUVxb6nC/3kzeYNyuG7y7D6V0acAJ4UCZYz5b7CqnejxACmjrJiKzsKYbUElxWIm8UeIHPESrD5K4KsWokf9sbWG0y5m9K8AWoqJAZcUoXtChJ0eIs0ePK1e1C4TWrIRzWJCJGYpCUTQ/WHQY6fFXJjBgKmFqOQfpsMfbAFjzgAybizF+0EtgfIWdE8o0Wj7znSjhpaRTOoFuaSW5fXuaqeBHyZAJ5TZwIBpRSSX2ggddBFxeoh2BNADESBmKUNGMiZ7GuaiDAyZKX3UBE8P/SIAAJrCONiCcbAFCUWRsA7RzkfNoKHMBjovgH5F/wnQBcpsQJn7Tnr6C/2vkh8ZP3kBTt2FRJDwqVW4fwgkrCP6qQcmvQmgA5iNpkQCHj58HM/mmhMS736HLoQbjgOxooLZaIqPhHqa3psAhwDyBtlUkbVAGtqbVaTNR6StX/5nnDKG24u61p+qe5rTWzD3C+DfQFKTq0X/7XMPcPBInab3kHD8P6BpCkdOESt/8yDW9EEAfmCiUuqEglRvAmjAE8CtgCkcCUtDe7MKR3srOvcvTEYT9kxb3H2CwHKl1JLTIiIimSLyZxEJ9Fgu+HHgF5GHRCS9Nz77PJES+1lRRqymXwT8OK9T7E9MNbAG2KPUaedLZ3AGZ/BTwf8ALVYCyo7Yf50AAAAASUVORK5CYII=",
        keys: ["contactout", "contact out"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAYFBMVEUfQO3w8v7///+7xfqWpvf9/f/DzPphePKdrPexvPlVbvF1ifSisPils/jb4Pz2+P5EX/BmffPV2/wmRu44Vu9CXvB8j/QjQ+3L0/ttg/MtTO7i5v08We/Q1/tQavHr7v3UMFLmAAAAkElEQVQ4jd2SzQ6CQAyE21mqgMCCoCg/8v5v6QbDwWxNueKcmvZL2mlL9FfK+EvnCHDgZFMqyBUAly0uUMYtHCpff8IG11YBpPbVmu/Y35QhndAdRQj6BxrNRQAow5MoQarVV2AYecpl7n8C9JJ54U6tBxenIAbiFe0FzBZ7hrRsWouyVm0eyz638TDmyx1ab/9IBsdakyN7AAAAAElFTkSuQmCC",
        keys: ["exa", "exa ai", "exa.ai"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAANlBMVEVHcEwAAAD///9ubm4CAgIAAAAAAAAEBAQCAgIBAQEqKiqNjY1PT0/09PS+vr7j4+OoqKjT09NxkOL0AAAACnRSTlMA////aYjBKqre7lcc0QAABcJJREFUeJzNW9ma6iAMnoqOFiiU93/ZYxdalmzoKCd3fqbkJxsBws8PQffr43cc3qLx93G9UzJw4bc3RWcwbo0g/lR6xNAg/vHX0jd6CNXwIfErBIH46+fEL3TltP/nti9pJO3w4elvRCjh9g35w4DGwwe9LyfEF78mH0HwRfkggi/ZP1LlB1/x/5SKWLh/W/4w5Png4/mnprGrARZKjdBD/jB0isCTjlh80QO1VWY2T1JWvzbC/WUFWOP8JaXJO9OO4vGaB5hwgWlyqnGoe3sOVJj0nZxtGe3WmgPmiRa/kG9Qw9jmgjMvfTOFEQ95b7CAEcz+0ILUEDexBbQvZIQ5ht8Sjq7828kAjNIYMPkEoZBTcwZikrmC0AUCJ30jmznpLBn5LlmHbDJsYKxrEjUEAYCrIA2qNudKnHXik+Pj55cdsNWsSbjyCH7ZIDjlCx17yEKGU9nIBcEpH57+BBv6VAKnAwbAYX9Emfpyee1DIQDLObRBlXyEjn8HwMTIH9zlgiZ+9mMeQGCH8JRvRgTk2kQBmFn5mlSxloQCASA6wMSwvDUCBSAGM+HGMx6fK8UgJpYFHED8mEp/E5egHDsJHMDE579ZCJEaBQUQPZAY/MiShJNZjgUFwBpAR/UuNsZV7JhIwgAYMo1ZMxc12LNCQ5M1qQIMwIR+pp1HytPJQ94+016AAFC44iwsHfcY2pkQAIHwgGpjeFhBgVbYVYAkZAQA6QEbigxEILammnRDGIAhQe901opMqbirE4YIAyA/OSh6A7PiR6TwdGAApNKqkdnKkxoOBGAlFlho1RS/AdkUCq+JIIDdBfhNgBEpIMYByAgCCGTkJmTRiVVsmEZBAF7mAsOaMCVsGwDQViAAgr8gL2bDZgQB0FIfXK0r2a8FPFwhALvJJCMriadELwS9BQKgpEGwKEvgg0dYSQEYYX5ZaBbtmIkRCQCSkYVEpMz/EsDcG0B3DcAu8yyEQggOKXtonkYnhMIwrYID7Pk6PaTLD84bw7BOROUpMXRYV/KkZZJrS0RlKlZAGV5W2apmSXgaU/G+Kdi/1/ANQXZmh/AcSswGFADwCWD8jP60A86z22H7IV+O9/2cfTp1Pmufb4r8rACeqeIxuT54APnZeBxpK/0tdW3hFcUDiYIB6Prj1OSu/lvC01CUDpXb5+az4O6U44G3pzCAAn+986l1zPPA6QsGkEU1eA2mc4wSHlASvTm9UJeR+tieTuhloU4uOZs2p9EGxNHLSlY9ieGJZ/fIRBAA+3LAbTsltIcUVjtiRzQ77Kw0188JcxfltuLZjYBtHzAAqsSt3B5XxK0ZxBP38NhH6DGdz4Cr7DwEng3M46lPKAAxElfkVV4DPKpaEFeemNVRreFHtf7wQyjxlTNC6gGNsEsAROPN4NJUBAi8+vgYgsT2iTiux9acTMUbMV0N1DaTujEpNe+MVenpnNsNm96VOpXzrEQdIVAAcrvGxSytEIMxJq2FZ4CHOUMhL61Sy0rqgaoO3ojcZtPXdodtcyXCbpnznOqjDzqYm9OoyimfhSAwD5DMlTMDQB+SinmUZigQnv9zZ1jc5fVZHhYzyRNvAe+8PmfXU/b6/rweKCdp437RlVY+fYSVP/INDKcVAHNqYHm2p274M8RfQQtH2sHDlUhP8UlWFLQ8PETNlGmmpSFkrWaSg8arrI0nC3zkeGA5IMgcU9RNdRc2Mtk8vYe5Gr3oY5J2nMib6aoF1wdnzFIVG+NCmZikDTdjQzMbdgYAkaiJaqFbUzufFULgQ+Wge2NDo+WKlKWZsKG3dGxv6dRoR+lKjV2lt5e6erVx4Pa8vad1eLmt9wliDudxjffONAsfzrbe11vr9Uovf3402Pdu7e7f3N6/vb/7A4f+Tzy6P3Lp/8yn/0On/k+9+j926//cr/+Dx/5PPj+vBO7R60Kdn/3+9H/4vNAnnn73fH7eLD2CePv5/8g+//8HuY9n5X1kJ20AAAAASUVORK5CYII=",
        keys: ["fullenrich", "full enrich"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtklEQVR4nO2dzW3bQBCFWYJLSAnpQI5IwtccE5OK3EHSQdKB3UHSQdKBS3A6cAk+B7JmAwJRINgSxZ9dvdmZ9wF71orvI3dI7JBFQQghhBBCCCEqCJ/qW1nVoRthvXiDng85E2FdXu6C3x/btnpkCIYJ68XFti2fDoW/P0JbfUXPlURG2ur+VPCvROCykD/d2Tw2eC4Lhtf5qSM09U/0fyIDGbLOTx1/2uUNgzC0zk++IrA+0ENoqs/nCp71gSK6sxAR/Ov6oPqOPhbukLZ6RAfP+gDA5rr6gQ765BWB9YH+27rUg4+VIz6+RYc562rQ1rexjoVL0AHGGgWhAGQC6DOXVwAw6OAoABh0cBQADDo4CgAGHRwFAIMOjgKAQQdHAcCgg6MAYNDBUQAw6OAoABh0cBQADDo4CgAGHVwuAoT14qKwCDq4HASQvd3Q4ePyfWEJdHCaBQg9XU9mrgjo4DQKEAZujzOxLQ0dnCYBwsDuZlPdzujgtAggEbqestyt7F2AELnrKbtlwasAIXHXUzbdTB4F2Cbsbs6u29mTAKEpf6Lmp7Y+8CBAaJc36PmprQ8sCxCUdj2pqg+sCiAKu5tV1gfWBAh7L6fMZUDrA/Sfj3cQy6y6m9XUB1oKpBkH7smSyAWKbbv8hf7zY0dYX/2/dKLnkr0AiIckU8emKb+9nLcomJcJATq6Mwt9IA6Odnl/bM6CnpslAXZ0Zxr6gOzW+VMbMETBPM0JsEPaGnZPHZryctAcV/jwzAqAWBYOrfN9iILwTAtwrtvGbVP9njIvURCeCwFSvk9wzkZLURCeKwFi1gdD1/neeazw4bkUYE59sLku72LNQRSE51aAsfXBtq2jP/cWBeG5F2BIfbD/+JYC1LauAH31wfOH5Zekv7XCn728AhxZFlIGvwMdHAU4sR0r9UudRUF4vAL8o3uYc7wGWLylAPVRWQov3xCM/dui4Ox1ewWYuh1r21QPseYgCsJzJ8DUbtoU3bWiIDxXAqT4huCc3bGiIDwXAsz9VnCq3bGiIDzTApz7G4Jju2dEQXhmBUBuFB3aPSMKwjMnwDm/FTy3PhAFczQjgNZmkb76QBTML3sBtHbTDqkPRMG8shYgh27avvpAFMwnSwFy7KZ9OYKSr5xnKQD6D8eT4CpvCXq6nijAiDMnKC1gT3U3w0AfgFijyLDbOcZu6NlYFUBzt/PYrqekWBegQ019gFrn+/AgALrbeUh3MwxPAiC6nVWs8314FOAcy0LMrqekeBUg1W1jiq6npHgXIGa3s9p1vg90cFoEmFMfZP0hKXRw2gQYUx90bx8vcgcdnEYBTtUH8Me3MUEHp1mAQ/VBqu5mGOjgchDANOjgKAAYdHAUAAw6OAoABh0cBQCDDo4CgEEHRwHAoIOjAGDQwVEAMOjgKAAYdHAUAAw6OAoABh0cBQCDDo4CgEEHRwGcfxRq7nhO/BJqN6jpnsm5y8YCWr4VeGyY2o6lGVlVD+iws+uysQg6dHXdtB7pXvEOCZ/rvC421+/uzrXOZ9ll44WUt41c553eNmbTTUvidtdm101L4nXXcp13Wh9k3U1LptcHY78BQIzUB3x8SwghhBBCCCGEFLH4C8u+Aoc9IfrwAAAAAElFTkSuQmCC",
        keys: ["harmonic"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAe1BMVEX/SAD49e74+/X/RQD49/H/OgD/PwD/NQD4+fL52sv9eU/4/vj49+/48Oj46+D8lnj54tb6vaf6yLX7rZT7uKD6w677pYr9hGH+bED8jWz9fFn7sJz/Ug78nYD+YjL7spr6z7v508T+WCL9jXL+VBn+Xin9c0n9ck/+aDmRqRtHAAAFLklEQVR4nO1a2WKqMBCFyYqERRYVr1qw6vX/v/DGtkLCJhWiD5fz2ErmZLbMTGJZM2bMmDFjxowZM3qAEKXofeIpsxaf2YaQ93BAdFu4AODy5Zm+Q76VAra/ACIgv/iS0knsRh2wS8BqMAOCtsH+80DGKo1Finzb5tthC1IUe1zaTThbNko+XWvybewP+2zj/XyH3eUoHZACawRsNxuwHjp41WcwhoFcSZdv42iAFzBHpQ3r5xmgrVsn4D+2KV1rX3HneQJ1F7jZ4DEBEul2c69PR2MLAT6AQM1uEDytArQRdRM4jwmgOoE/I9zQrzOwFw8Z0DqB+HkCJG46QfwowepBMDIMTl5DBZCf+hekNdbiNOJIoI1AlAz8TW8yQDuNAKTjcmEApULvysBiz/o2RVYKa+wdx52JZONwwEJg8MJyZ26Kehksy19iezP2QERkm4RhWOxPLOF3bUDYW52Q1U8k4PAwQRWDCKGUSOcnmY1LzWZ9jsC+U5gIJ64l6aE0A4aPHkdAi6/f4RHnQMfCSoUCzq5z+ZLA9IUs2Yu7Gbi/7TKDQQIWWfj8Hpeiq0g0ScCiVlWoQt7eLRglIB0hruLRv7Y5glkC0gzrsurjdls8miZg0XOVFvmyaQbjBGS/mpYJvyUeaZkHzDFgQRWPthaPspe27pnwaBFjHMjGL9Mij0szUHJdFWVjAmGUnUz11fSUV+djZNFv8etCwD1R3JTAwU8OhiggGrtKPBJpl0UItWbqpgaxtAy19mxRnY88YLvUbYj/pifWhpRAz45SpviNGraikPTWMM8Doar84e3b/2FQWIYYkKxD73UGjqloINce1WsMTKUEuouGMRg3regBoqsGA4FxwzIwZL7xFMi+NssBN8xzx3P1rCA8U4541MXzIqOMEMbOse4esPzNpG84SKKKAefCflSNCFrZ2sBmZ0IF6Ohpu6SqpcnFVxhAYkIFVPUAKULfJD3aSovtGSlTlYkAzxtbpOqgZcy0oAvoqBy/bc2wOufgBtxQnWVB3Fai7io3kO3i5ARIUmnAbQ10NUq88+ReQPJyf7xonWHRbUUR/k5OgIUVgT+tFka7Kk4NeCGrLNw1lGQKgenPgwGrs7CMRNi/RQPKTwwQqLbHO8ayyKgJlCjAeWsUoEuVC92B1z6/IbBUgqx1dbVeEZvJw5BmSiZstTCqjCSGXTv9Cuig7M9vSYU0qH6Am4fVBAxC5ZKqeeDLckH5//PXF93Q5uP8s8YAKZlSYuTouBXoqg71IdAqErpTL19xNO4mswMkUioC212elGnB2tf+dzEzN9uoQmSrHh9kUSzLYrQuuKod3H5ajgdJteobgx1GycfS8Wr9Kn/+Cu8BWP2OVWAOnNf+2FovTQKS2QPAC2OdWda422oB9sdcX00gX0xxe9Iuf0hzzn1Tb1Aq+Vx0j0rAORqTf9c/RJewQxcYPgw15lL+PdYgJxStoIUCdsOLgfkQkvIoK/UPX48riJV4taEE8HDNDDSE9JIUTvFRyk+/J1CI7ILCB+BYgkt9hMli9GOeNvmnnN+E8Jr8L2rkuN0nUZ7naZxdqZHhnGw39dFLpIlBksQXjD2Co6F+/KWmcnyX/EDbP09f/dqPOqoCcPHql37o6GuBFhqqMroJHPRE4736oSE66+WH92IX1Dqdmw8WLydQm4xO33A/AjqrPvh6C9z60fLeVPDFOx67kkB8WwE8A6PPIaCHVLiu6308eFdlDoiQ8/XI3vTc+YeDoavAGTNmzJgxY8aM/xP/ADYvOcaCsS5eAAAAAElFTkSuQmCC",
        keys: ["hubspot", "hub spot"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAUVBMVEVHcExlnvRjnPNCde1Heu5Fee47bexvqvZelvJimvNQhvBtqPVjnPM+cOxDd+5Vi/FRh/BIfO9po/RZkPJelvM1ZupMgO9Pg+85a+x0sPcxYemNZrUPAAAADHRSTlMAmdKVGl3L/ipGDnY5Am0CAAAHiElEQVR4nO1aaXeqOhSVMCMCohXa//9DXxJCcqZQtehd6y231Pul3n2GfYakHg4ffPDBB0+hPjLU7+RPvgUc/zH/93fyLv5MYi/1T/MmA2qRvizLd8mgEvhLY0D1JgMOlL4sl5938eMcOO/fmAFjgcIBMFBvbQQffPB2ZNXj2JG+SpSreIzRvADUOLajMk+rWpXsZkJdksbD7Vjg/m3N02rk+/BnJWl7wAYXg2BDa+kNzPs+MThKbdfRW+aQhtaZ0Drss6Mo7L03wXsP+AO3wVXtYkACkv+N3YcqbB2/N+G6kwHNUaJfww9B3NfPPinISpp7X38g+4vuxuB9e72qbBcD7Pgvt7LfsuwbG657laFuREqjVB7Ye1/2rUJI9txRm6rKQjuuE1R6i/TGpNa/on/JPvq1Iz2HQn3HmrBPyd2LIwj/rk3nIQOM7kPpv9WApvWNN2AHzTX1fTgq2nVs3z3e9+kqZinatYXRUwqNN1hhGo/Dxf5cPPpLv2DoB4tE2uCbY5ya9lyovdD4ggWGHprQBxuMGcM0HHkU4NAt19MW4Adjd/V8JBZ4/+PsLgbTxJpkhZzH5CUbuSOgx74bCxb+a4j/xbO7HGgT6K6ixOCPPv4lCD4besCEreAD+qEviACD83jojJjdVf2I6ZH6IH2PBdiv9NM0DUiIjZIWznF9Eenh4CP+S8R7FH3DPw1FgwNQsoVH2jdG5HyLhB8X3xAMmDxQCJQNPdT+SOVHZ/6a+FbWPi484r3BbQIqqMIp/9d1E7QeTE/YkfhXeo/b7TaBQkiQ+q30We2R8NPs0+hz563yAr9GGgwg4htx+nn0ofeu7q+i9z1Q/rCSO35gwJHHv+TBx/wt8v3Xygf8Ducb6IYRcnnoAPorGTu09FDlY3oNWIYg/CT6dOqQznNZO6/ofU+lD/nxSDwmT0N574n7q/YGlXLstrJr5EoofGeCEd+eXBELLkD3THrp7//Bn9FfLmLjscl/7QFhwQDch43H4g2X+BXJPtb+6yXQJN57qP218orfQ9A8cQkXkKuNytdTb7ql4uey1bA6wb2Hrlxk5YON7+KI72o8Bp15eaR2HtbxqePnDux7F9B3pHVT6Lua/7YaYN48TlofFRq5ku9w5iMLIITcM3ZM3p3MUx2SmP946pCNB05cuHGFoectOMP4dzADp+50SpeTvnzQIOsmAp/4cOMB9Dj7Z0hunuIgb/sLO9n3rsF9Yd2dQvxv69JxPkMDoPerEaeDdMHEdU/FJww9v3IJ7EZ8gN4yO9gUtGM0/ovr8KQViX7I/SQnH9Ivb4a/0CLc9h5vPFj6bN/jhe+DT8S3xiA95DAFV6I+d8gEyRdXDrDs+/DfxOB7z1fkh5pWP2w7SP6Wm/FPUuUheiq7EzShPlQq1nQvNPoXqfHxvov6DtD+ycXe08+nec70uRQLrxW37V7KPar8Gws+afxU/tYCMykTpj52zkT75oB2DnLaOKPOI6S+A+z6Zda1WtC+V94Vdz1x47HJnxb64D1pPCcqv1k/82yWleb661ln+6gnlh4l73DoF/p5tiuB2qr86EnL0zv1n03ybzD50IQTrP2T519O6DXte1j5Ej3fOAA5brpL4HHw5xXLutgo3Pe9APpI5wF9j0nvzHVPtR9MKNzGXitY97jzBHpa9iAAsbbLko/cn7/86bBSPP09qn1eeGji32T3ffZp7hf/wVVhU+UMKlL51PmpSPmH70D0ztojW53ndzxw4Xvh0a/mpceG7u2lR88E3XII9Dr5Lz16pmDqyvTonmV/JGHdFGb+glfyZyqWfLBwvPLsm8aDHzpPsacImgygTrD7JPfr0Dl3efYgovxZolRhHvvqJ9R4QfTZ0lE8hjRiQqP6yfaddembOD87Z8J3MP1I2/+avwx+HCJpqwfU+aZJ2Dd9/Du68S28cOE8BXbNv5jgrJC/eFfbq4b41EHLJlv4Ojz00dibA/1igmyAveqhhSdp78yiThHYMfXXjw1A7Nao4l1fSn7HDnsoADOih8HX9IsMonWQb7gP2Nm6TZcOEHuY/DUAG1+9TG3hCcmH2ybceLqO7Xsw+jOid1WwOT8LeebiskfCZ/teRHihBrf4tQUrvXTJQu5YOnrUQAsf8v5ufr0e4oUrQs8LH9cd1r5nj/YggAb9WQckn23bHV43Cf0seL9VAAG1cMVzxkddYdGPBB9oz+Ku7/dVPPvId3rMp/Qg/IR+qwBRFgoy8zt82mJnHZp7EH6IO67N1xgUcuj5FQ/v+Uj6yIBHVpemCPQ0/viSBfn/RYD9v5/eIGWl55Mf859k/wfj4fND3dHL5fsnrmEnBjyxu2ZFR93f7Hto5hH65zbXJoXu08aH2j7u+jT6P+mzfzirClh4XaTv0sZD6Yu/fLs47/jKM5Pkb3v/k//t74Y6D7j0Ztx46MzfLfoBVcr7Hlh4t6T/EzsBPIg6jZUejj6j3+8b/k1a0KZPln1GHz3/PIksT3Hlzdh7qvx8/4uLJssL2X3W9V/A7qDjUHwx96H2ivR17M6GyhghzjxN/vvd22525Hmapu64naZ5/Y7vSXzw/8R/Qg9B9jpEPycAAAAASUVORK5CYII=",
        keys: ["ocean", "ocean io", "ocean.io", "oceanio"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACS0lEQVR4nO3YMU4sQRRD0YpZGxJsBqdsAL2cjZI+dsBEVpnxPVKnX8hz1V31j95neeZpNziP3P4DeYYAiGB4AxDB8AkgguEMQATDIZAIhlsAEUzGNfCUU/g+BJA+sBkBpA9sRgDpA5sRQPrAZgSQPrAZAaQPbEYA6QObEUD6wGYEkD6wGQGkD2xGAOkDmxFA+sBmBJA+sBkBpA9sRgDpA5sRQPrAZgSQPrAZAaQPbEYA6QObEUD6wGYEkD6wGQGkD2xGAOkDmxFA+sBmBJA+sBkBpA9sRgDpA5sRQPrAZgSQPrAZAaQPbEYA6QObEUD6wGYEkD6wGQGkD2xGAOkDmxFA+sBmBJA+sBkBpA9sRgDpA5sRQPrAZgSQPrAZAaQPbEYA6QObEUD6wGYEkD6wGQGkD2xGAOkDmz19AB9vXz83H4XvQwAEsLwBeAMsnwA+AcsZgDPAcgjkELjcArgFLNdAroH7FP8P8Ojv+3z9frn5nPB9/P+AGQH8jQB4AyxvAD4ByyeAM8ByBuAQuBwCuQUstwCugVtzDTzl1P7/AKecCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCbCKCb3AHwzL/egAACfgQRwP0hWp/DJ+D+jyACuD9E63N4A9z/EUQA94dofQ5vgPs/gpIDAAAAAAAANX4BBmnORmJP8BcAAAAASUVORK5CYII=",
        keys: ["predictleads", "predict leads"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAE1klEQVR42u2dQWgcVRjHv9mZbHbbqG2JiKVIKKUEUuJiRaJ4UKnVg4Qi6FmklBKKB/HUU08i4kFEUGoOUkRK9CRFsAQpRUQKrWJKDTGUGorkUDUJyTbdnZ3X8//bZOs2m3Sz+f1u3+xkZvP2t9/75u2beVEIwWDrkqMJEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADqRZL1PEL35TSwbntlfkHh7Li9xXMkkXqxUJP7lpsRh7I0aHyMZABAAEACa76LXOiewro8/tLdH4uyhPld1lPQAub16xJC5M1yTsJZO6utLM/LXxw7ON/X+4uIOPX6X1kVppDVIdzon8Q8T5c1ck5AB6AIAAYAa4L77/JcHn3B9+hGNo+Mu3t/UCUOWahxNuv9gVOJq9XtVPNY+Po5ecN8BF9tuPV+Yce9/3L3BnyT8rzwlr7735BIZABAAEAA6ogYYnXhMtxRPqVKuz19vQvjXxVddn73DxYMtPv8liTN7X+L5Ja0Zdnbrl64WehqfoCzjDDZ+fbGV4w5kALoAQACgBlh1h0/+7JYN26Nh1wmeceMAhS3dolm46GoE1z6WbzwukvlP4IY7/hV9+Y6MO9j5yVvN1AhkALoAQACgBlh1h88mdsqGfNH1adFrNOMGErJpjW1MP4/aGTdfYbpRTUAGoAsABADjvoDV6HLXrWbP0WwPsmrL7XPjCid1nCDS+QyvDJxyR/iLDAAIAAgA93lvYIFma+evdPSW1gR5+a0gOn35IzIAIAAgAPyvGmA50Xn5RZtye5RoxjYmhLd1w7YvyQCAAIAAsFINUHfv30sDu1ynUnZ/QSu2M7H77SDET5EBAAEAAWDFcYDD/b3axedPuD0O0GybeVwg108GAAQABAAzS+qu+w+XXnf7+Gf85Gk228x3gqRkAEAAQAAws8SeLyVuaP8ofX4HU7PfyACAAIAAYGaJpbdUgvDoAX7ut06aE3hD4mW7RgYABAAEgBXnA+S47u+wIuBzCQsLc2QAQABAADCzxJLezD2L9m9XE+ymmTYRWXZW4kr0tVQEIwerZABAAEAAMLPECgtaA0SPfOv2eYdmaqtnBV/XDdGYW1fxK4kv/Ko13cg+MgAgACAArLheQPTF9IBTZNTNERyi2dZynV475579u9Dw+QvBrxlU0zWDcpUrrBkEdAGAANCSGqDuXsHBIVcDjDiHXnWv76JZ5beVc+46/kOJa+msxHGsz2W8k2mNcPHqHGsHA10AIABsyLqBviY4VOrTPivrc9ete5xjLrYjbr7B0/Zg583PunX4fnct5OZI1tU4C+545yVOw3cSl/+RZy2Hd5+9TQYABAAEgHasAe55AF8jDO3RPjPp7TFdb2DY1QCfunGEwgZfp591c+o+dl8R7eNTt45inHPX7dXZ9bxuJwMAAgACQLvUAE2f8PQfj6uCyVG3x/GW3peQhYr7j380fWbOB+6y/mfps4/pPHoyACAAIABQA7Ro3ODF/oclzhf9OoTD1ni9gh43uD/jzjguYbVyQeLy/M12GpsnAwACAAJAp9YA9x4nuNwlGyrbtEZIYv2tIMupxPnbet0/ly1KfGlquZ3H5skAgACAALBVawAgAwACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAALAmrkLQlhZu08sZn8AAAAASUVORK5CYII=",
        keys: ["salesforce"],
      },
      {
        url: "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EADsQAAICAQIBBwoEBgIDAAAAAAECAAMEBRESBiEiMUFRcSMyQlJhgZGhsdETFOHwFRZTVHLBYpMHNEP/xAAaAQACAwEBAAAAAAAAAAAAAAAAAgEDBAUG/8QALxEAAgIBAwIFAwMEAwAAAAAAAAECAxEEEjEhUQUTIjJBFGGhsdHhUnGB8CMzQv/aAAwDAQACEQMRAD8A9xgAoAKACgBWapruBpgIyLeK3+lX0m/T3yVFsZQb4MlqXLjNclcGiqhPWfpt9h85ohTH5GcMGbzdd1fKJN2o5PglhQfBdhNcK618FbRT32W2bl7HYnr4mJmyGFwVSQAW21kGu10I6irES9YfKK2TcXlHrmGd8fVcsbdlln4g+DbiLLT0T5ihd0lwzQ6Z/wCStRpYLqWLTk1+tX5N/wDYPhzTLZ4ZW/Y8Dq5/JutD5VaTrfCmLfwXnrot6L+4dR9285l2ltp9y6dy2M4y4LuZxxQAUAFABQAUAGXWpRW1lrBEUblieYSG8EpNvCMdrXKW68tTgFqauo2em32+sXfk2Q0+OsuTK2DcknrlsWPJEWxZojIokiNYJpjIqkiK6zTGRS0AZZdFlUkCZZcpCNDeGNuFwdUEMCCQQdwR2GGSDb8l+XWVhlcbWC+TjdQu23sTx9YfPx6pzdToYy9VfRlsLGuT0zFyKcuhL8axbKrBujqdwROQ04vD5NCeQsgBQAUAGW2pTW1lrBUUbknsEhtJZZKTbwjEa1qlmo28K7rjqegnf7T7ZllY5P7HUpoVa68lO4jRY7RHsEuiyqSI1izRCRTJEaxZpjIqcSPYsvjIqkiO6S6MiloGVlqkJgbwR1ITAgkNxGAirFcgwaLkpygv0TI4H4rMKxvKVer/AMl9v1mTUVRtWfkeLcT1jHvqyaUuodXqccSsvUROU008MvCSAFADK8pNQN1pxKj5Os9Mj0m7vd9Zjvsy9qOnpKNsd8uWUDSpM1sEwliYjAOJdFlbRHdZdGRVJEexZfGRVJEd1miMimUQDJ7JbGRU0DKeyWKZW0N4IymJg6K4byMBErkbwwGSuI5htNhyG1dsW8adkN5G4+SJ9Bz2eB+vjMl63eoeJv5lHIWr5f5LBeweeeinif3v7pXbPZHJdp6vMsUfgxJ5zuTzzm5O5gG0Yhg2EdCNAmWWplbRzGwr824U4tZsc93UB3k9gl0Hkpm4xWWaPD5FVFQ2fkszdq08w+J6/gJcsoxyvzwixHJHRQOlisx7zc/+jG3sqdkmDu5GaLYpC021E+klrEj47xvNkRuZndW5DZFCNbp1v5lR/wDNhwv7uw/KWxv7kZyZRqWRirqVZTsVI2IMt8wNohXI8wXaEWuQ7A2hUriOYYJNaEEEbgjtBiOZO09M0HO/iGm1XMd7R0LP8h9+v3ykCn5UX8eVXjg9Gtdz4n9PrMGqlmSj2OroIYg5dykMzG8YYyIGNGTFaBEEnYDcx0xGb/RtOr03DWpQPxDz2N6zfab4x2o4ttjslknxisHZdXVt+LYib9XEwECUsj1YOoZSCD1EGBB2AGS5caMltH8SpXa1Nhdt6S9W/iOb3eEZSwNHsYpa+eHmD7Qi1xd5G0KtcXeG0OlcTeG00vJC81ZVuOfNtXiHiP0+kmEsvBEkQ9TsNuo5Lnn8oQPAcw+k5trzNs7mnjtqivsRYhaMaSAwyUyAmFt+dxy3ULU3+IlkH6kVWr0P+x6LOmcEUAMHyk0zOGo35D1PbU53V0BbYdg9m0zz3J5N1M4OCRH0DVW0nIfiDPQ46VanqbsPjCFmCbatyL/+ccX+1v8AiPvH81Gf6eXcDm8qMXKw78c4t4/FrZNyRzbjaQ7UHktGUFcr8ws2hFribyMBVrkbyNoZa4u8NpP0kmnUMZxzeUA9x5j9Y0J+pESj0I1jcVjN3kmZH1Z3IrCSGSBsDDJAaTAhoad+sHYjqMnOCMG/0nNTPwkuUji22dfVbtnUrmpxycC6p1TcWTJYVCgBGycDEyv/AGMeqw97KN/jFcU+UMpyjwynzOSmHYCcWyyhuwb8S/Pn+crlSnwWrUS+epnM/SsnTnC3oOE+a6ndTMs1KD6miMoz4I4SVbxsBFT2Rd5G0KqRdxG0KqeyG8jAaocLq3cQYKfUVoiWjhsZe4kSH0Z2Y9VkGTvIGOEwJOGQA0yckYD4WdkYF34mO+xPnKecMPaI8LZQeUU20wtWJGjw+VOM4AyqnqbtK9Jfv8pthrIv3LBzLNBNe15LbG1LDythRk1MT6PFsfgeeXxthLhmWdVkPciXLCsUABZWPXlUPTcN0YbGLKKksMmMnF5RhLsdqL7KX85GKk984s8xk4v4OnH1JNHVWV7gwEVZG4jARVhuIwFqTidR3naTF5eBWsIi6tX+FqOSh/qEjwPOPrNNy22NHR00t1UX9iFvKjQcJkE4G7iAYJWlrTbqOPXkrxVO3Cw3I6xsOr27SypRc0pcFGoco1ScOUa7+XtL/tj/ANr/AHnR+lq7fqcf62/+r8L9hfy9pf8AbH/tf7w+lq7flkfWX/1fhfsZLVMGzBy3qdCKyx/DY9RXxnNurdcmnwdWixWwTT6j9P1HMxbEFFrsNwBUecH2bQrvsg/SxLaK5r1L/Jvp2jhigBj9aA/i2Rt3j48InC1bSulg6mnX/EiKomXJZgKFkbiGh4XmhuFwSsCv8TLpX/mD8OeX6dbrYr7lVjxBsHytxymVVkDzbF4T4j9PpOjrI4kpdzR4dZmDh2KAmYjpJDeKQSNJhkkQOx3B2PeJGQxk3Whasmo4wDkDJQeUXv8AaPZOvp71bH7nndVpnTLp7X/uC1mgyjbESxeGxVZe5hvIaT6MlNp5QOrFx6W4qqKkbvVAJChFcIaU5S6N5DRhAGZlV4dBttPMOodrHuErttjVHdIeuuVktqMa9jXWva/nOxYzzk5ucnJ/J2YwUUkh6iV5ICKJAo8SUxS00Sriua09SjYeJ/fznS8Ohmbn2MmplhbSZrWF+e0+yoDyg6Vf+Q/e3vnUur3wwVaa3yrFL4+TANuObqM456QaTtFYyRwmQTg5vIJHVWvVYtlTsjqdwynYiCk08oWUVJYfBocHlXaihc2kWgemh2Pw6vpNtevaXrWTl2+GRfWt4LarlNprjpPZWe5qz/reaVraXy8GOXh96+E/8jzyi0wdV7N4Vt9oPW0d/wAMj6HUdvyiJk8p6tiuLQzH1rOYfAfpKLPEYr2Ith4dL/2ylyMu/Mt/EyHLHsHYvgJzLbZ2vM2boVQrWIo4kpZLQZYorQRYCBF64IQ0uBR+XxlQ+d1t4z0ulp8qpR+fk5ds98myTNBWY7lXphouObSPJWHygHot3+/6+M5mrp2veuGdrw7U7o+VLlcGdJmI6o3eQSc3kAINIAcDIIHgyCGPUxRWFQyBGgymKxGgyGKI0GWQVhVMgRlto2IXf8w46Kno+0zp+H6bfLzZcLj+/wDBi1VuFsReTtmAUAGXVJfW1VqhkYbMp6iJDSawyYycWmuTA67pFmmXF03fFc9B/V9h/fPOPqKHU8/B6PR6uN8cP3FSTMxtG7wZJ2KA4GBGBwMggeshiMMpiisMpitCMMhiiMMpgVssdMwXy34m3WoHpHv9gmrS6V3PL9pk1FyrWFyaZEWtAqABQNgB2T0EYqKwuDlNtvLHRiBQAUAGXVV31NVaivWw2ZWG4IkSSksMaMnF5XJjNa5M3UFrtOBtp6zX6S+HePnOXfo5R6w6o7ml8RjP029H3+P4M2eY7EbH2zCdUQMgDoMAHKZAuAqmQKwimQIwymKIwybnYDrkYK2XumaNZZtZlg1p1hPSP2nQ0+glP1WdEc6/WJdIdWaOtFrQIgCqBsAOydmMVFYXBzG23ljpJAoAKACgAoAKAFbqWiYOo7m+ra3+qnM36++UW6euzldTTRq7qPa+nb4M3mcj8msk4d9dq+q/Rb7fSYZ6Ca9rydWrxat/9kcfkqbtH1KhtrMG7xReIfEbzLLT2x5izbDV0T4mv0/UjtTann1Ov+SkSpxkuUW74vhj66rX8yp28FJgot8IVziuWTcfStQuICYd3iy8I+csjp7ZcRZnnqqI8yRcYnJjIbY5VyVjuTpGaYeHzfveDDZ4jBexZL/B0vFwgDVXu/rtzn9Jvq01dXtXXuc63UWW+59CbNBQKACgAoAf/9k=",
        keys: ["the swarm", "swarm"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAYFBMVEUAAAD///8NDQ1ubm6AgID4+PjGxsaQkJDDw8OTk5NWVlbMzMwFBQXi4uJDQ0Pu7u6Hh4cYGBhfX18uLi7b29ugoKA0NDRkZGR6enqsrKwcHBwlJSVPT088PDy7u7t0dHRfXcMWAAAEGklEQVR4nO2b2ZaqMBBFK2JsBcMko6L+/19e0yqkQiGDkNzVi/PU0JqzhYyVFLC2hJfe3Wt0hNl0jK5ukXqCMAP9RpIW2XzOWFmRJj0AIo6Wcn8qisUHgCRc1v2pMOkCKC8m/AEuJQnA72bspe68DSByc/4AudABvLNJf4CzhwGEYf8HgVABgti0P0AcKABG3/9bTgNQ2vAHKN8A4moH4CpeAD92/AF+ngDClj9A8AtgoQW85UiAZOHx75Oi5AGQ2vMHSBlwxyaAw0EYGoNpXQTsbfoDeGBkEtStEKwMA41iqOwCVHCyC3CCjV0Ay/arVq1atepPaUNrxlDbZ20Z71CQpI6BMX/LPkmkiy8/PwMwFhwsAyy+Bu8HYMK1DMDYkgSDAIIFp+CDANhuuZX4MADW0xZON2/XiApdHesP7OUL9d+XXrglVWhgvKdnLLj6aYLg2PxXLuvd+qojznTV9yj6AnIYuP3ARgJkrT2SpC8akKKPt4IX4wDa/qw/HoIJ9LXzKICK2iPq75L3CFhruWMALgHhz269AOcdIsAj6QiAmPQfEpXM0J5OgvbQhgO42F/ZIunXFX0XbWUMBtD8D17955A5UoW+vZsA4GD/EBqAQRGBGH1dCWUOBKi4XsBIgNdmQptgGADuUJkMxI0F+I2kN9qOAsix/2/LHw2AOyRejAC4a/UPpgHADRHkgwG27ec/DSDy1HICfyCAQzz/aQAAqEMS/iCAENk3lWcSAB7MkiEARP3/AkDrEnebXoAQ+XMlED4NAGJU4K0PALddpm7HTwTQqvSjQ/oEoM3/UN80FUArNP0EgKcy2nGEyQBQolIVHh1Ae/5bXMx0AEygSAJU9dXhgH9/oZXyBQDuEjGAX18F7X/OBnD2GCXpkdFsfNsq5BsAbY6mAlyoeS/jxGbwVwBah6QAHKnX03r/3wPoM7waQK/6UgG59PgSAPIOgKpFxul9wG8BiOX384futbv0758BQB9n3wAb7e4uPJAKf146TA5dpiRA63aH5giRaTX+BRDtaEdN/gwAF9whvV+2T68BFwCACHU7dW2n2ugyAHBSCHizaHXJnnIJAHXJpS6zs47xan4A8GsCHPWs+h7CXADvaX+g9/fH8MaNAEBWBjxIiZO/m6sb3vYd8hY7Krxq1apVq/6AjO2vd9lbPFMrFYHlcTKDRXeU++WC1VO9AHdY+mBBj1Lw7AJ4IKzWwkwAo+IZxlT8B4fb7R/vt5ngkNtO8RDPJBdr59tl2EcCJJaOd5+SF4CthvAbXgJirW1Iz/3hV7KbBQJXTXaznu7HmOkx6aglPMqEX5P+7ZTPRz0wmG2SE0mvsjUaqggdab+yIhgZmrsTn5n11G+pJHUWS/66OL3J71JceGWY+7NWiLOfh6UniFDiP1JoL2rGECK2AAAAAElFTkSuQmCC",
        keys: ["v0", "v0 app", "v0.app"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAYFBMVEUAAAD////39/fPz89oaGh+fn5OTk6np6fAwMD7+/vr6+ssLCxRUVEwMDDw8PCEhISamppfX19XV1cRERHk5OTe3t4lJSWOjo48PDw1NTUbGxvW1taUlJRISEi5ublubm40NeWWAAAB0ElEQVR4nO2YabKCQAyEzeAGCgqK4H7/Wz6ktOQpsyCZzJ/+LtBdXZmuZCYTAAAAAAAAAAAAjGQVWD9ahNVfE6VBDUREUUj9aUakZuH0j00ATQSnYAa28cNAtgmlX7cBEJ3ngQxU9GQbRj/PXgbKIBGcFkRBIyjU20Ccy+vvOgEQLXfiBoq4a4AKcQPlP335Qp7SB1NhA/tPA4ms/uVTn+giqX/Nvg0kkrvR7Vuf6Cann39NQBvBXUr/1BtAE4FUG816JkAygnTZr98UssyCetfpE4msh2mkNxAdBQz0dJBoBKkyGVC1dwNbk75AG6Wx2QD5LmTtExSKILfpk/K7Hp6tBujsU39jfALPCDxeanVp128iOHgzsLCrP/D2aTJ3mIAHpac53Fk6qBOBn8UgT1wN7L1EcHCcgDYCH58ma3d9Ih8RWEu4S8Q/BbMh+j4icOjALopbf2AA7J8mK+cn+CLjLWTNKWKCtZALzSliIlkzGhj0BF8s+fTvgyegjYDtUjsaThFjBFyFXNk2YQ1xxaNf/xhAU8g8Z0plV9LBEsG19zvEjZIjAuc9qA+GQj6M0ad4fAQ/ddCb0W00JzUK8nckAAAAAAAAAAAAAAAAmPgDGWsRmgQEIL4AAAAASUVORK5CYII=",
        keys: ["vercel", "vercel com", "vercel.com"],
      },
      {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAdVBMVEUBVv////8AQv8ASv8AU/8AT/8ARf+yyP91mf8ASP8ATP8AUf/o8f/Y4/4AQP+LrP8AWf/4/P94nf9Lff4NYP/y+P8gaP9qlf/I2f7i7P+vxP9ejf7T4P5Vh/66z/6Usv+jvf+Bov82cf8qbP8dZP/D1f8AOP/EUwxbAAADHUlEQVR4nO2Za3eiMBCGMyTEcilCvWIVsa37/3/ioi4lgWTCYnrYPWeejzonPMI7TEDGCIIgCIIgCIIgCIIgCOJfg8tMhvMdXvBDAeklE3MJhBu48ZrPdBJ4DX94D2YRCIpWABZZMoNABh2bj2heAYDliCwmfs9ToAm4sxgnq1XkM689AVcWg+WtxmfTDgSgkvZzzM+PmiPzdhKGArBZ2bIo1m1NcZI/JwBwluZTHL50NYfAz2UwCkCZxy4BSLccXVmEURTFTkuzAMDOlEVN4JZFZGGeL6+v+/rTdalsAlBFwyz2BOAYWrOYtbf4ynESrAKmLPYF7FmMjt06DDWwCxiyOBC4ZdHUtG27Ps4TdqVQASjXehYNAlB+GfIqtJJ37OaNCgC8afYmgX7NjXipFVyxGecQgGui5MwsAPukl8Wo0r7fYJ3gEoBCyaJFQKu5C+z177EQOAUA6u97nk1ArTEJYPNthECXRbuAnte41r7bP5OBB2+P+YsIaFkUX9o3F2x0KncMjP39nocKqHmNFsrnaAYda3YUK+ksVrLI0+7jLb6Hy1L7ihqHLOQXR03d3jtF3OYw/XLsXcS6QNdUfuBu/eqqKfP25wanKoXi+uLeNiS5c1mFq6O4WLcHTLgM5Kj9qwiW+KLq8X9lb3hFOeUBi2/HBmHBWbwu0ZKXKftVERxGC7BEnrGSatrjlVyNyuLivg+MVht7STlxvxyKyr5oT4CFkb04nbphF8FutEDTZe/eBZoZ4m7IbwEW2oqfEBjRkJ2AtfgZgSZejoZcqA8jfGvK4nMCLMnQhtQEmDAVPyngaMhF73FMngbFTwugDdkXYGHS2355EGh6zNqQA4FmnveGgw8Be0MaBPrDwYuAtcdMAkxow8GPgG1CGgX04TB1FgwwTkiLAEu64VAb321MwtCQNoFuOGy8HZ7deqzfkHaBZjhcm4Jj7vk95m60ABNR/pFbXm9Np9eQmECj8BN/OugNiQv8EGpDnv1F/C9QGvJzpn922oZcznEF7oSiTov9aYY/NL7hUhpeXRIEQRAEQRAEQRAEQRD/Jb8BD/IjneuNTMAAAAAASUVORK5CYII=",
        keys: ["waterfall", "waterfall io", "waterfall.io", "waterfallio"],
      },
    ],
    Kl = new Map(Lr.flatMap(({ url: r, keys: e }) => e.map((t) => [qa(t), r]))),
    Xl = Lr.map(({ url: r, keys: e }) => {
      const t = e.map(qa),
        a = t.map(Nr);
      return { url: r, normalizedKeys: t, compactKeys: a };
    }),
    Jl = new Map([
      ["builtwith", "builtwith"],
      ["builtwithio", "builtwith"],
      ["contactout", "contactout"],
      ["fullenrich", "fullenrich"],
      ["fullenrichio", "fullenrich"],
      ["predictleads", "predictleads"],
      ["predictleadsio", "predictleads"],
      ["theirstack", "theirstack"],
      ["theirdata", "theirstack"],
      ["waterfallio", "waterfall"],
    ]);
  function Vi(r) {
    const e = qa(r),
      t = Kl.get(e);
    if (t) return t;
    const a = Nr(e);
    if (!a) return "";
    for (const { url: i, normalizedKeys: n, compactKeys: o } of Xl)
      if (
        n.some((s) => s && e.includes(s)) ||
        o.some((s) => s && a.includes(s))
      )
        return i;
    return "";
  }
  function Or(r) {
    return r.trim().charAt(0) || "?";
  }
  function Gi(r) {
    const e = qa(r).replace(/\s+/g, "");
    return e
      ? e.includes("unify") || e.includes("onprem")
        ? "on-prem"
        : e.includes("waterfall")
          ? "waterfall"
          : (Jl.get(e) ?? e)
      : "unknown";
  }
  function qa(r) {
    return r
      .toLowerCase()
      .replace(/\b(inc|llc|ltd|corp|corporation|company)\b\.?/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }
  function Nr(r) {
    return r.replace(/\s+/g, "");
  }
  const q = "https://i.pravatar.cc/96",
    Zl = {
      "andre park": `${q}?img=52`,
      "ava garcia": `${q}?img=46`,
      "chadley dupre": `${q}?img=59`,
      "chandler bree": `${q}?img=11`,
      "clara wong": `${q}?img=32`,
      "david kim": `${q}?img=33`,
      "ellen nelle": `${q}?img=47`,
      "evan brooks": `${q}?img=8`,
      "fatima ali": `${q}?img=45`,
      "jamie chen": `${q}?img=12`,
      "jules meyer": `${q}?img=14`,
      "leo martin": `${q}?img=56`,
      "liam price": `${q}?img=6`,
      "marcus reed": `${q}?img=53`,
      "maya patel": `${q}?img=5`,
      "miles kibble iii": `${q}?img=15`,
      "miles kibbles iii": `${q}?img=15`,
      "mr kibbles iii": `${q}?img=15`,
      "natalie dank": `${q}?img=49`,
      "nina kapoor": `${q}?img=31`,
      "noah singh": `${q}?img=4`,
      "owen lee": `${q}?img=7`,
      "patrick bateman": `${q}?img=68`,
      "priya rao": `${q}?img=21`,
      "rachel cho": `${q}?img=44`,
      "sam hollis": `${q}?img=13`,
      "sara nelson": `${q}?img=41`,
      "zoe carter": `${q}?img=23`,
    };
  function Fr(r) {
    return r.trim().toLowerCase().replace(/\s+/g, " ");
  }
  function $l(r) {
    const e = Fr(r)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return e ? `${q}?u=${encodeURIComponent(e)}` : "";
  }
  function Ba(r, e) {
    const t = Fr(r),
      a = e?.trim() || void 0;
    return Zl[t] ?? a ?? $l(r);
  }
  const Ur = `
<svg viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <path d="M5.71835 3.84074V0H0V5.12789C0 7.97387 2.13981 10.9988 6.10463 10.9988H8.4998V5.49938L7.40298 5.48406C6.46808 5.4708 5.71706 4.7386 5.71706 3.8395L5.71835 3.84074Z" fill="currentColor"/>
  <path d="M11.2814 7.15899V10.9997H16.9998V5.87225C16.9998 3.02586 14.86 0.000976562 10.8952 0.000976562H8.5V5.50036L9.59682 5.51568C10.5317 5.52893 11.2827 6.26113 11.2827 7.16023L11.2814 7.15899Z" fill="currentColor"/>
</svg>`;
  function zr(r) {
    const e = document.createElement("template");
    e.innerHTML = Ur.trim();
    const t = e.content.firstElementChild;
    return (t.classList.add(r), t);
  }
  const ec = "/media/chat-background.png",
    tc = ["/media/", "/data-logos/", "media/", "data-logos/"],
    Qi = (r) => r;
  function ac(r) {
    const e = nc(r.assetBaseUrl),
      t = rc(r.assetUrlMap);
    return (a) => {
      const i = a.trim();
      if (!i) return a;
      const n = oc(i, t);
      return n || (!e || !sc(i) ? a : `${e}/${i.replace(/^\/+/, "")}`);
    };
  }
  function ic(r, e) {
    r.style.setProperty("--wa-media-image", cc(e(ec)));
  }
  function nc(r) {
    return r?.trim().replace(/\/+$/, "") ?? "";
  }
  function rc(r) {
    const e = new Map();
    if (!r) return e;
    for (const [t, a] of Object.entries(r)) {
      const i = t.trim(),
        n = a.trim();
      if (!i || !n) continue;
      (e.set(i, n), e.set(La(i), n));
      const o = i.replace(/^\/+/, "");
      (e.set(o, n),
        e.set(`/${o}`, n),
        e.set(La(o), n),
        e.set(`/${La(o).replace(/^\/+/, "")}`, n));
    }
    return e;
  }
  function oc(r, e) {
    return e.get(r) ?? e.get(La(r)) ?? "";
  }
  function La(r) {
    try {
      return decodeURI(r);
    } catch {
      return r;
    }
  }
  function sc(r) {
    return lc(r) || r.startsWith("//") || r.startsWith("#")
      ? !1
      : tc.some((e) => r.startsWith(e));
  }
  function lc(r) {
    return /^[a-z][a-z0-9+.-]*:/i.test(r);
  }
  function cc(r) {
    return `url("${r.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\a ")}")`;
  }
  const dc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66">
<path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
<path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
<path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
<path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
<path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
</svg>`,
    uc = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="60 90.4 570.02 539.67">
<defs>
<linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="9.98908" y1="22.364901" x2="30.932199" y2="9.37495" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0" style="stop-color:rgb(12.54902%,65.490196%,98.039216%);stop-opacity:1;"/>
<stop offset="0.4" style="stop-color:rgb(23.137255%,83.529412%,100%);stop-opacity:1;"/>
<stop offset="1" style="stop-color:rgb(76.862745%,69.019608%,100%);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="linear1" gradientUnits="userSpaceOnUse" x1="17.197201" y1="26.7945" x2="28.856199" y2="8.12575" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0" style="stop-color:rgb(8.627451%,35.294118%,85.098039%);stop-opacity:1;"/>
<stop offset="0.5008" style="stop-color:rgb(9.411765%,50.196078%,89.803922%);stop-opacity:1;"/>
<stop offset="1" style="stop-color:rgb(52.156863%,52.941176%,100%);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="linear2" gradientUnits="userSpaceOnUse" x1="25.7005" y1="27.048401" x2="12.7563" y2="16.501301" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0.236946" style="stop-color:rgb(26.666667%,54.117647%,100%);stop-opacity:0;"/>
<stop offset="0.792113" style="stop-color:rgb(0%,19.607843%,69.411765%);stop-opacity:0.2;"/>
</linearGradient>
<linearGradient id="linear3" gradientUnits="userSpaceOnUse" x1="24.0534" y1="31.1099" x2="44.509998" y2="18.0177" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0" style="stop-color:rgb(10.196078%,26.27451%,65.098039%);stop-opacity:1;"/>
<stop offset="0.492267" style="stop-color:rgb(12.54902%,32.156863%,79.607843%);stop-opacity:1;"/>
<stop offset="1" style="stop-color:rgb(37.254902%,12.54902%,79.607843%);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="linear4" gradientUnits="userSpaceOnUse" x1="29.8281" y1="30.327299" x2="17.397499" y2="19.570801" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0" style="stop-color:rgb(0%,27.058824%,72.54902%);stop-opacity:0;"/>
<stop offset="0.669859" style="stop-color:rgb(5.098039%,12.156863%,41.176471%);stop-opacity:0.2;"/>
</linearGradient>
<radialGradient id="radial0" gradientUnits="userSpaceOnUse" cx="0" cy="0" fx="0" fy="0" r="1" gradientTransform="matrix(0.000000000000024802,-405.040512,438.393002,0.000000000000026844,360.027008,102.268202)">
<stop offset="0.568182" style="stop-color:rgb(15.294118%,37.254902%,94.117647%);stop-opacity:0;"/>
<stop offset="0.992424" style="stop-color:rgb(0%,12.941176%,46.666667%);stop-opacity:1;"/>
</radialGradient>
<linearGradient id="linear5" gradientUnits="userSpaceOnUse" x1="41.998001" y1="29.9431" x2="23.8517" y2="29.9431" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0" style="stop-color:rgb(30.196078%,76.862745%,100%);stop-opacity:1;"/>
<stop offset="0.196145" style="stop-color:rgb(5.882353%,68.627451%,100%);stop-opacity:1;"/>
</linearGradient>
<radialGradient id="radial1" gradientUnits="userSpaceOnUse" cx="0" cy="0" fx="0" fy="0" r="1" gradientTransform="matrix(122.73959,-122.73959,122.73959,122.73959,421.392002,568.675518)">
<stop offset="0.259477" style="stop-color:rgb(0%,37.647059%,81.960784%);stop-opacity:0.4;"/>
<stop offset="0.908166" style="stop-color:rgb(1.176471%,51.372549%,94.509804%);stop-opacity:0;"/>
</radialGradient>
<radialGradient id="radial2" gradientUnits="userSpaceOnUse" cx="0" cy="0" fx="0" fy="0" r="1" gradientTransform="matrix(357.407022,-468.445926,423.594568,323.187085,159.471002,697.080002)">
<stop offset="0.732317" style="stop-color:rgb(95.686275%,65.490196%,96.862745%);stop-opacity:0;"/>
<stop offset="1" style="stop-color:rgb(95.686275%,65.490196%,96.862745%);stop-opacity:0.501961;"/>
</radialGradient>
<radialGradient id="radial3" gradientUnits="userSpaceOnUse" cx="0" cy="0" fx="0" fy="0" r="1" gradientTransform="matrix(-170.860868,259.725406,-674.018133,-443.404152,278.562012,412.978506)">
<stop offset="0" style="stop-color:rgb(28.627451%,87.058824%,100%);stop-opacity:1;"/>
<stop offset="0.724349" style="stop-color:rgb(16.078431%,76.470588%,100%);stop-opacity:1;"/>
</radialGradient>
<linearGradient id="linear6" gradientUnits="userSpaceOnUse" x1="3.45756" y1="37.872299" x2="20.9291" y2="37.859699" gradientTransform="matrix(15,0,0,15,0,0)">
<stop offset="0.205882" style="stop-color:rgb(42.352941%,87.843137%,100%);stop-opacity:1;"/>
<stop offset="0.535" style="stop-color:rgb(31.372549%,83.529412%,100%);stop-opacity:0;"/>
</linearGradient>
<radialGradient id="radial4" gradientUnits="userSpaceOnUse" cx="0" cy="0" fx="0" fy="0" r="1" gradientTransform="matrix(215.76719,230.769125,-230.769125,215.76719,59.143649,354.231005)">
<stop offset="0.038877" style="stop-color:rgb(0%,56.862745%,100%);stop-opacity:1;"/>
<stop offset="0.919119" style="stop-color:rgb(9.411765%,23.921569%,67.843137%);stop-opacity:1;"/>
</radialGradient>
<radialGradient id="radial5" gradientUnits="userSpaceOnUse" cx="0" cy="0" fx="0" fy="0" r="1" gradientTransform="matrix(0.000000000000010287,167.999997,-193.782005,0.000000000000011866,180,491.158504)">
<stop offset="0.557796" style="stop-color:rgb(5.882353%,64.705882%,96.862745%);stop-opacity:0;"/>
<stop offset="1" style="stop-color:rgb(45.490196%,77.647059%,100%);stop-opacity:0.501961;"/>
</radialGradient>
</defs>
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear0);" d="M 463.984375 140.144531 L 119.636719 358.414062 L 90.023438 311.695312 L 90.023438 271.4375 C 90.023438 256.78125 97.445312 243.121094 109.742188 235.144531 L 309.910156 105.257812 C 340.40625 85.46875 379.6875 85.464844 410.1875 105.25 Z M 463.984375 140.144531 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear1);" d="M 407.101562 103.339844 C 408.136719 103.953125 409.164062 104.59375 410.183594 105.253906 L 566.398438 206.585938 L 179.0625 452.105469 L 119.625 358.335938 L 403.894531 177.800781 C 430.820312 160.699219 432 122.230469 407.101562 103.339844 Z M 407.101562 103.339844 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear2);" d="M 407.101562 103.339844 C 408.136719 103.953125 409.164062 104.59375 410.183594 105.253906 L 566.398438 206.585938 L 179.0625 452.105469 L 119.625 358.335938 L 403.894531 177.800781 C 430.820312 160.699219 432 122.230469 407.101562 103.339844 Z M 407.101562 103.339844 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear3);" d="M 333.601562 498.988281 L 179.066406 452.109375 L 507.628906 243.835938 C 535.300781 226.296875 535.230469 185.898438 507.496094 168.457031 L 506.015625 167.527344 L 510.277344 170.175781 L 610.273438 235.042969 C 622.574219 243.019531 629.996094 256.683594 629.996094 271.34375 L 629.996094 310.304688 Z M 333.601562 498.988281 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear4);" d="M 333.601562 498.988281 L 179.066406 452.109375 L 507.628906 243.835938 C 535.300781 226.296875 535.230469 185.898438 507.496094 168.457031 L 506.015625 167.527344 L 510.277344 170.175781 L 610.273438 235.042969 C 622.574219 243.019531 629.996094 256.683594 629.996094 271.34375 L 629.996094 310.304688 Z M 333.601562 498.988281 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#radial0);" d="M 410.1875 105.25 C 379.6875 85.464844 340.40625 85.46875 309.90625 105.257812 L 109.742188 235.144531 C 97.445312 243.121094 90.023438 256.78125 90.023438 271.4375 L 90.023438 273.40625 C 90.507812 288.121094 98.25 301.679688 110.757812 309.566406 L 359.644531 466.476562 L 609.160156 309.804688 C 622.121094 301.667969 629.984375 287.441406 629.984375 272.140625 L 629.984375 310.308594 L 629.992188 271.34375 C 629.992188 256.683594 622.566406 243.023438 610.269531 235.042969 Z M 410.1875 105.25 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear5);" d="M 315.769531 630.050781 L 536.21875 630.050781 C 587.996094 630.050781 629.96875 588.078125 629.96875 536.300781 L 629.96875 272.140625 C 629.96875 287.441406 622.105469 301.667969 609.148438 309.804688 L 281.242188 515.695312 C 263.554688 526.804688 252.820312 546.222656 252.820312 567.109375 C 252.824219 601.871094 281.003906 630.050781 315.769531 630.050781 Z M 315.769531 630.050781 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#radial1);" d="M 315.769531 630.050781 L 536.21875 630.050781 C 587.996094 630.050781 629.96875 588.078125 629.96875 536.300781 L 629.96875 272.140625 C 629.96875 287.441406 622.105469 301.667969 609.148438 309.804688 L 281.242188 515.695312 C 263.554688 526.804688 252.820312 546.222656 252.820312 567.109375 C 252.824219 601.871094 281.003906 630.050781 315.769531 630.050781 Z M 315.769531 630.050781 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#radial2);" d="M 315.769531 630.050781 L 536.21875 630.050781 C 587.996094 630.050781 629.96875 588.078125 629.96875 536.300781 L 629.96875 272.140625 C 629.96875 287.441406 622.105469 301.667969 609.148438 309.804688 L 281.242188 515.695312 C 263.554688 526.804688 252.820312 546.222656 252.820312 567.109375 C 252.824219 601.871094 281.003906 630.050781 315.769531 630.050781 Z M 315.769531 630.050781 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#radial3);" d="M 405.402344 630.035156 L 183.738281 630.035156 C 131.960938 630.035156 89.988281 588.0625 89.988281 536.285156 L 89.988281 271.945312 C 89.988281 287.21875 97.824219 301.421875 110.742188 309.566406 L 438.324219 516.085938 C 456.257812 527.390625 467.132812 547.113281 467.132812 568.3125 C 467.128906 602.402344 439.492188 630.035156 405.402344 630.035156 Z M 405.402344 630.035156 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#linear6);" d="M 405.402344 630.035156 L 183.738281 630.035156 C 131.960938 630.035156 89.988281 588.0625 89.988281 536.285156 L 89.988281 271.945312 C 89.988281 287.21875 97.824219 301.421875 110.742188 309.566406 L 438.324219 516.085938 C 456.257812 527.390625 467.132812 547.113281 467.132812 568.3125 C 467.128906 602.402344 439.492188 630.035156 405.402344 630.035156 Z M 405.402344 630.035156 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#radial4);" d="M 108.75 345 L 251.25 345 C 278.175781 345 300 366.824219 300 393.75 L 300 536.25 C 300 563.175781 278.175781 585 251.25 585 L 108.75 585 C 81.824219 585 60 563.175781 60 536.25 L 60 393.75 C 60 366.824219 81.824219 345 108.75 345 Z M 108.75 345 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:url(#radial5);" d="M 108.75 345 L 251.25 345 C 278.175781 345 300 366.824219 300 393.75 L 300 536.25 C 300 563.175781 278.175781 585 251.25 585 L 108.75 585 C 81.824219 585 60 563.175781 60 536.25 L 60 393.75 C 60 366.824219 81.824219 345 108.75 345 Z M 108.75 345 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 179.386719 534 C 159.539062 534 143.25 527.789062 130.511719 515.375 C 117.773438 502.960938 111.402344 486.757812 111.402344 466.769531 C 111.402344 445.660156 117.867188 428.589844 130.796875 415.550781 C 143.730469 402.515625 160.660156 396 181.59375 396 C 201.375 396 217.472656 402.238281 229.890625 414.714844 C 242.375 427.191406 248.617188 443.644531 248.617188 464.066406 C 248.617188 485.050781 242.148438 501.964844 229.21875 514.816406 C 216.351562 527.605469 199.742188 534 179.386719 534 Z M 179.960938 507.648438 C 190.777344 507.648438 199.484375 503.953125 206.078125 496.566406 C 212.671875 489.179688 215.96875 478.902344 215.96875 465.742188 C 215.96875 452.023438 212.765625 441.347656 206.367188 433.710938 C 199.964844 426.074219 191.417969 422.257812 180.730469 422.257812 C 169.71875 422.257812 160.851562 426.199219 154.132812 434.082031 C 147.410156 441.90625 144.050781 452.273438 144.050781 465.183594 C 144.050781 478.285156 147.410156 488.652344 154.132812 496.285156 C 160.851562 503.859375 169.460938 507.648438 179.960938 507.648438 Z M 179.960938 507.648438 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 179.332031 535.847656 C 159.5625 535.847656 143.332031 529.472656 130.640625 516.71875 C 117.953125 503.964844 111.605469 487.320312 111.605469 466.789062 C 111.605469 445.105469 118.046875 427.570312 130.929688 414.179688 C 143.8125 400.785156 160.679688 394.089844 181.53125 394.089844 C 201.234375 394.089844 217.273438 400.5 229.644531 413.316406 C 242.082031 426.136719 248.296875 443.035156 248.296875 464.015625 C 248.296875 485.566406 241.855469 502.945312 228.976562 516.144531 C 216.15625 529.28125 199.609375 535.847656 179.332031 535.847656 Z M 179.902344 508.78125 C 190.679688 508.78125 199.355469 504.984375 205.921875 497.398438 C 212.492188 489.808594 215.773438 479.253906 215.773438 465.734375 C 215.773438 451.640625 212.585938 440.675781 206.210938 432.832031 C 199.832031 424.988281 191.320312 421.066406 180.671875 421.066406 C 169.699219 421.066406 160.867188 425.113281 154.171875 433.214844 C 147.476562 441.246094 144.128906 451.898438 144.128906 465.160156 C 144.128906 478.617188 147.476562 489.265625 154.171875 497.109375 C 160.867188 504.890625 169.445312 508.78125 179.902344 508.78125 Z M 179.902344 508.78125 "/>
</g>
</svg>`;
  function Hr(r) {
    return typeof r.initialSequenceIndex == "number" &&
      Number.isFinite(r.initialSequenceIndex)
      ? Math.min(
          Math.max(0, Math.round(r.initialSequenceIndex)),
          Math.max(0, r.sequences.length - 1),
        )
      : Math.max(0, Math.floor((r.sequences.length - 1) / 2));
  }
  function Vr(r, e) {
    const t = Hr(r),
      a = [];
    for (let i = t + 1; i < r.sequences.length && a.length < e; i += 1)
      a.push(i);
    for (let i = t - 1; i >= 0 && a.length < e; i -= 1) a.push(i);
    for (; a.length < e; ) a.push(t);
    return a;
  }
  const Gr = "chatbot-stories:pause-for-thinking-interaction",
    hc = [
      "wa-message--component",
      ...[
        "table",
        "enrichment",
        "thinking",
        "result",
        "strategy",
        "sources",
        "mailbox",
        "style",
        "proximity",
        "game",
        "sequence",
        "drop",
        "file",
      ].map((r) => `wa-message--${r}`),
    ],
    pc = 1.28,
    x = (r) => Number((r * pc).toFixed(3)),
    gc = [3, 3, 3],
    mc = { "David Kim": "+1 (917) 234-3381" },
    se = {
      pressDuration: x(0.09),
      releaseDuration: x(0.2),
      loadingHoldDuration: x(0.78),
      successHoldDuration: x(0.12),
      learningRevealDuration: x(0.34),
      detailSwapDuration: 0.16,
      readyPopUpDuration: 0.12,
      readyPopSettleDuration: 0.22,
      settleHold: x(0.24),
    },
    Qr = "Learning your style",
    fc = "Voice calibrated",
    Yr = "73 tone & tactic rules defined",
    Yi = [
      { detail: "Analyzing tone", progress: 31, duration: 1.05, hold: 0.38 },
      { detail: "Investigating wins", progress: 64, duration: 1.2, hold: 0.46 },
      {
        detail: "Figuring out your voice",
        progress: 100,
        duration: 1.15,
        hold: 0.76,
      },
    ],
    wc = { gmail: no(dc), outlook: no(uc) },
    bc = [82, 86, 94, 74, 76, 90, 68, 70, 46, 18, 12, 8, 28, 54, 38, 0, 4],
    Ac = new Set([5, 8, 10, 16]),
    yc = [
      "M9.62137 135.631C9.62137 135.631 -4.10678 106.019 7.70875 69.6796",
      "M11.3787 60.2136C11.3787 60.2136 34.0777 2.91262 102.427 2.91262",
      "M197.058 103.718C197.058 103.718 200.942 20.068 113.252 3.7767",
      "M19.5631 158.35C21.2233 151.262 23.0582 140.369 22.3107 127.116C21.7184 116.583 20.0097 113.913 19.5145 104.777C19.2621 100.029 18.5437 83.4757 26.4951 65.9126C34.9709 47.1845 49.0971 36.6311 56.398 31.9612",
      "M66.1456 26.6117C71.4369 24.1359 96.4369 13.1262 126.097 23.0971C153.777 32.3981 167.068 53.7573 170.777 60.3301C177.078 71.4757 179.175 85.0583 181.252 95.932C182.883 104.495 183.68 111.757 184.087 116.922",
      "M184.427 150.524C184.515 142.883 184.602 135.243 184.699 127.602",
      "M30.6699 171.767C33.8641 164.67 37.8835 153.573 38.5923 139.67C39.3107 125.777 36.0777 121.699 35.7961 107.32C35.5631 95.5631 35.233 78.5534 45.5728 62.8738C58.4369 43.3689 79.8253 38.0291 85.602 36.8155C101.301 33.4951 114.262 36.7864 120.437 38.8058",
      "M129.709 42.7379C136.136 46.2524 146.456 53.0777 154.252 65.2136C160.437 74.8447 162.097 83.2524 165.194 98.9515C166.748 106.845 169.301 122.456 168.689 142.699C168.282 156.039 166.621 167.204 165.029 175.35",
      "M43.165 182.466C44.8738 178.65 46.5728 174.388 48.1456 169.699C49.6602 165.184 50.8349 160.922 51.7476 156.981",
      "M54.1068 146.456C54.6699 142.476 55.2718 136.388 54.8932 128.971C54.4951 121.262 53.3592 118.146 52.5631 110.359C51.7184 102.019 51.0194 95.1553 52.5631 87.7864C55.9126 71.7573 67.9806 62.1845 69.7864 60.7961C82.5631 50.9515 96.1942 50.9612 100.039 51.0194C111.505 51.2039 119.767 55.4078 122.379 56.835C131.981 62.0971 137.282 69.3495 139.583 72.9612",
      "M88.7087 199.709C89.8447 196.689 90.9903 193.67 92.1262 190.641C93.2816 187.573 94.4272 184.515 95.5728 181.456",
      "M105.913 199.777C108.777 192.884 111.67 184.68 114 175.282C116.466 165.34 117.767 156.282 118.417 148.524",
      "M124.214 196.961C127.447 188.175 130.951 176.689 133.311 162.951C136.252 145.816 136.068 132.913 135.874 122.233C135.388 96.6602 131.485 89.068 129.825 86.1651C127.748 82.5243 123.583 75.4466 114.932 71.0388C106.845 66.9223 99.2136 67.3592 97.0097 67.5437C91.9806 67.9806 88.0582 69.4951 85.6019 70.6602",
      "M144.515 188.553C148.485 174.864 152.505 155.534 152.388 132.233C152.291 112.165 149.175 95.2427 145.854 82.6019",
      "M77.6602 76.1553C73.8544 79.6117 68.8738 85.2524 67.2233 93.1456C65.4466 101.621 68.7087 107.049 70.4854 118.282C72.1359 128.767 71.2913 136.621 70.2524 146.204C69.1748 156.126 66.1553 171.942 56.5631 190.359",
      "M71.9224 196.039C76.0777 187.456 80.7088 175.825 83.7476 161.553C85.7767 152.019 88.4078 139.67 87.0097 125.252C86.4758 119.748 86.233 114.223 85.6117 108.728C84.4758 98.699 83.6214 95.9418 85.3787 92.2039C87.5728 87.5243 92.5437 84.0874 97.9418 83.3592C105.107 82.3981 111.67 86.4078 114.466 91.2718C114.913 92.0485 115.398 93.0874 116.563 99.6505C117.583 105.417 118.126 108.476 118.66 114.311C119.184 120.039 119.651 127.816 119.505 137.311",
      "M98.1747 172.204C100.495 161.476 102.466 148.019 102.592 132.466C102.709 118.631 101.34 106.495 99.5631 96.5437",
    ],
    vc = { duration: x(0.44), ease: "back.out(1.7)" },
    Wr = {
      startOverlap: "-=0.08",
      charsPerSecond: 54,
      minDuration: 0.36,
      maxDuration: 1.55,
    },
    ut = {
      startOverlap: "-=0.08",
      charsPerSecond: 86,
      labelCharsPerSecond: 72,
      minDuration: 0.28,
      maxDuration: 1.1,
    },
    xc = {
      charsPerSecond: ut.labelCharsPerSecond,
      minDuration: ut.minDuration,
      maxDuration: ut.maxDuration,
    },
    _c = { charsPerSecond: 62, minDuration: 0.18, maxDuration: 0.42 },
    Ke = {
      entranceStagger: x(0.055),
      minActiveHold: x(0.34),
      singleActiveHold: x(1.55),
      defaultActiveWindow: x(1.36),
      configuredStepActiveRatio: 0.56,
      maxActiveWindow: x(4.6),
      finishFactors: [0.46, 0.82, 0.58, 1, 0.7, 0.52, 0.94, 0.76, 0.64, 0.88],
    },
    Z = {
      faviconDropY: 5,
      faviconDropScale: 0.78,
      faviconDropDuration: x(0.12),
      checkStartY: -4,
      checkStartScale: 0.66,
      checkPopScale: 1.16,
      checkPopDuration: x(0.2),
      checkSettleDuration: x(0.1),
      checkOverlap: "-=0.065",
    },
    Oa = { detailOffsetY: 0, duration: x(0.24) },
    kc =
      "display,height,marginTop,minHeight,overflow,opacity,visibility,y,transform",
    Ee = { duration: x(0.34), returnDuration: x(0.38), ease: "power2.inOut" },
    jr = x(0.08),
    Me = { y: 0, duration: x(0.26), ease: "power2.inOut" },
    Gt = { duration: x(0.18), ease: "power2.out" },
    da = {
      templateHold: x(0.54),
      progressDuration: x(3.9),
      finalHold: x(0.34),
    },
    ae = {
      duration: x(2.2),
      finalHold: x(0.48),
      title: "Enrolling list in sequence",
      completeTitle: "Enrolled list in sequence",
      queueHold: x(0.44),
      mailboxHold: x(0.5),
      progressDelay: x(0.04),
      queueLabel: "Queuing personalized sequences",
      queueDetail:
        "Scheduling email, social, and call steps for every selected visitor.",
      mailboxLabel: "Selecting the best mailboxes for deliverability.",
      mailboxDetail: "Switching out recently used mailboxes.",
      sendLabel: (r, e) => `Sending the first email to ${r}/${e}`,
    },
    ee = {
      iconSize: 16,
      launchSplit: 0.18,
      launchDuration: x(0.18),
      fallDurationMin: x(0.78),
      fallDurationRange: x(0.34),
      apexYMin: 42,
      apexYRange: 58,
      launchXRange: 24,
      driftXRange: 132,
      fadeMargin: 24,
      exitOvershootMin: 56,
      exitOvershootRange: 64,
      minExitY: 170,
      minFadeStartY: 112,
      scaleRange: 0.22,
      rotationRange: 18,
    },
    Wi = { railCenterDuration: x(0.34), railCenterEase: "power3.out" },
    me = {
      compactWidth: 96,
      compactHeight: 30,
      collapsedWidth: 0,
      collapsedHeight: 0,
      showDuration: x(0.42),
      hideDuration: x(0.32),
      contentShowDelay: x(0.1),
      contentHideDuration: x(0.1),
      threadPushDuration: x(0.38),
      showEase: "expo.out",
      hideEase: "power3.in",
      contentEase: "power2.out",
      threadPushEase: "power3.out",
      threadGap: 44,
    },
    Sc =
      "left,right,bottom,width,height,minHeight,paddingTop,paddingRight,paddingBottom,paddingLeft,borderWidth,gap",
    ji = {
      paddingTop: "",
      paddingRight: "",
      paddingBottom: "",
      paddingLeft: "",
      borderWidth: "",
      gap: "",
    },
    ua = {
      scrollOutRatio: 1.02,
      minScrollOut: 420,
      duration: x(0.58),
      threadOverlap: "-=0.36",
    },
    Kr = 110,
    X = {
      revealDuration: x(0.42),
      revealEase: "power3.inOut",
      componentFollowDelay: 0.12,
      componentRevealDelay: 0.16,
      followDuration: x(0.24),
      followEase: "power2.out",
    },
    Ct = {
      scrollDistance: 160,
      offsetY: 78,
      scrollDuration: x(0.36),
      contentDuration: x(0.42),
      contentDelay: 0.04,
      contentEase: "power3.in",
      stagger: 0.015,
    },
    Cc = { cardDuration: x(0.28) },
    Xr = 4,
    Tc = "-=0.22",
    Jr = {
      from: { autoAlpha: 0, y: 5 },
      to: {
        autoAlpha: 1,
        y: 0,
        duration: x(0.24),
        ease: "power2.out",
        stagger: 0.035,
      },
    },
    Ec = [
      ["CRM", "Core Data", "Ad Intelligence"],
      ["Web Intent", "Product Analytics", "SMB Data", "Ecommerce"],
      ["Enrichment", "Company / Fundraising", "Tech Stack"],
      ["Web / SEO", "Relationships", "And more"],
    ],
    Na = { contentWidth: 1881, height: 1280 },
    Pc = 96,
    Zr =
      ".wa-cursor-file, .wa-file-landing-clone, .wa-file-landing-label, .wa-csv-drop, .wa-enrollment-mail",
    $r = "[data-marketing-data-sources-grid]",
    eo = "[data-data-table]",
    Ki = "[data-table-page-button]",
    Xi = "[data-table-page-range]",
    to = "[data-sequence-engagement]",
    Mc = "[data-sequence-card]",
    Dc = "[data-sequence-person-card]",
    ao = "[data-sequence-people-rail]",
    J = {
      duration: x(0.12),
      incomingLag: x(0.1),
      rowStagger: x(0.03),
      columnStagger: x(0.07),
      totalDuration: x(0.95),
      incomingY: -7,
      outgoingY: 7,
    },
    Fa = { in: g.parseEase("power2.out"), out: g.parseEase("power2.in") },
    Rc = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons",
    Ic = "https://www.google.com/s2/favicons",
    qc = {
      adyen: "adyen",
      airtable: "airtable",
      brex: "brex",
      "dbt labs": "dbt",
      figma: "figma",
      gusto: "gusto",
      hubspot: "hubspot",
      linear: "linear",
      linkedin: "linkedin",
      notion: "notion",
      paypal: "paypal",
      posthog: "posthog",
      retool: "retool",
      salesforce: "salesforce",
      square: "square",
      stripe: "stripe",
      tesla: "tesla",
      vercel: "vercel",
      webflow: "webflow",
    },
    Bc = {
      adyen: "adyen.com",
      airtable: "airtable.com",
      brex: "brex.com",
      "bright layer": "brightlayer.com",
      brightlayer: "brightlayer.com",
      census: "getcensus.com",
      clearbit: "clearbit.com",
      "clearbit inc": "clearbit.com",
      demandbase: "demandbase.com",
      "dbt labs": "getdbt.com",
      figma: "figma.com",
      gusto: "gusto.com",
      hex: "hex.tech",
      hubspot: "hubspot.com",
      linear: "linear.app",
      linkedin: "linkedin.com",
      mercury: "mercury.com",
      "northstar ai": "northstar.ai",
      "northstar dev": "northstardev.com",
      notion: "notion.so",
      orbitgrid: "orbitgrid.com",
      paypal: "paypal.com",
      plaid: "plaid.com",
      pylon: "usepylon.com",
      posthog: "posthog.com",
      retool: "retool.com",
      rippling: "rippling.com",
      salesforce: "salesforce.com",
      segment: "segment.com",
      snitcher: "snitcher.com",
      square: "squareup.com",
      stripe: "stripe.com",
      tesla: "tesla.com",
      unify: "unifygtm.com",
      "unify gtm": "unifygtm.com",
      vercel: "vercel.com",
      waterfall: "waterfall.com",
      webflow: "webflow.com",
    },
    Ji = {
      offscreenMargin: 280,
      pullInDuration: x(0.22),
      pullInEase: "power2.out",
    },
    Ue = {
      duration: x(0.34),
      stagger: 0.035,
      ease: "power3.out",
      rotations: [2, -5, 6, -8],
      shadowY: 16,
      shadowBlur: 28,
      shadowAlpha: 0.18,
    },
    ze = {
      rowStartHold: x(0.36),
      serviceRevealDuration: x(0.32),
      serviceLoadDuration: x(1.36),
      serviceLoadVariance: x(0.28),
      serviceSettleDuration: x(0.28),
      rowCompleteHold: x(0.32),
      rowOffsets: [0, x(0.16), x(0.28)],
    },
    Lc = [
      {
        label: "Work email",
        state: "complete",
        chips: [
          { label: "Unify", service: "on-prem", state: "complete" },
          { label: "Wiza", service: "wiza", state: "pending" },
          { label: "ContactOut", service: "contactout", state: "pending" },
          { label: "Prospeo", service: "prospeo", state: "pending" },
          { label: "Waterfall", service: "waterfall", state: "pending" },
        ],
      },
      {
        label: "Phone number",
        state: "complete",
        chips: [
          { label: "Unify", service: "on-prem", state: "complete" },
          { label: "ContactOut", service: "contactout", state: "pending" },
          { label: "Forager", service: "forager", state: "pending" },
          { label: "Wiza", service: "wiza", state: "pending" },
          { label: "Prospeo", service: "prospeo", state: "pending" },
        ],
      },
      {
        label: "Social profile",
        state: "complete",
        chips: [
          { label: "Unify", service: "on-prem", state: "failed" },
          { label: "ContactOut", service: "contactout", state: "complete" },
          { label: "Prospeo", service: "prospeo", state: "pending" },
          { label: "Wiza", service: "wiza", state: "pending" },
          { label: "Forager", service: "forager", state: "pending" },
        ],
      },
    ],
    io = {
      contactout:
        "M4.2 10.7V5.3h7.6v5.4H4.2Zm1.2-6.8h1.2m2.8 0h1.2M6 7.9h.1m3.8 0h.1",
      default:
        "M3.3 4.2 8 2l4.7 2.2M3.3 7.1 8 4.9l4.7 2.2M3.3 10 8 7.8l4.7 2.2M8 7.8v5.4",
      fullenrich:
        "M3.1 9.9a5 5 0 1 1 9.8 0M5.2 8.6a2.8 2.8 0 1 1 5.6 0M2.9 11.8h10.2",
      prospeo:
        "m8 2.7 4.4 2.5v5.6L8 13.3l-4.4-2.5V5.2L8 2.7Zm0 0v5.2m4.4-2.7L8 7.9 3.6 5.2",
      waterfall: "m3.2 6.2 3.1 3 1.7-1.6 1.7 1.6 3.1-3",
      wiza: "M8 2.4 5.2 11.8h5.6L8 2.4Zm-3.8 9.4h7.6",
    },
    He = {
      tableRow: {
        from: { autoAlpha: 0, y: 7 },
        to: {
          autoAlpha: 1,
          y: 0,
          duration: x(0.24),
          ease: "power2.out",
          stagger: 0.045,
        },
      },
      compactRow: {
        from: { autoAlpha: 0, y: 6 },
        to: {
          autoAlpha: 1,
          y: 0,
          duration: x(0.2),
          ease: "power2.out",
          stagger: 0.045,
        },
      },
      softRow: {
        from: { autoAlpha: 0, y: 7 },
        to: {
          autoAlpha: 1,
          y: 0,
          duration: x(0.24),
          ease: "power2.out",
          stagger: 0.045,
        },
      },
      smallCard: {
        from: {
          autoAlpha: 0,
          y: 12,
          scale: 0.985,
          transformOrigin: "center top",
        },
        to: {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: x(0.28),
          ease: "power2.out",
          stagger: 0.05,
        },
      },
      stackCard: {
        from: { autoAlpha: 0, y: 9, scale: 0.99 },
        to: {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: x(0.24),
          ease: "power2.out",
          stagger: 0.05,
        },
      },
      strategyCard: {
        from: {
          autoAlpha: 0,
          y: 20,
          scale: 0.985,
          transformOrigin: "center top",
        },
        to: {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: x(0.44),
          ease: "back.out(1.35)",
          stagger: 0.16,
        },
      },
      waterfallRow: {
        from: { autoAlpha: 0, y: 6 },
        to: {
          autoAlpha: 1,
          y: 0,
          duration: x(0.22),
          ease: "power2.out",
          stagger: 0.045,
        },
        position: "-=0.18",
      },
    };
  class Oc {
    constructor(e, t = {}) {
      ((this.root = e),
        (this.resolveAssetUrl = t.resolveAssetUrl ?? Qi),
        (this.stage = this.required(".wa-stage")),
        (this.browserWindow = this.required(".wa-window")),
        (this.chatShell = this.required("[data-chat-shell]")),
        (this.chatBody = this.required(".wa-chat-shell__body")),
        (this.thread = this.required("[data-chat-thread]")),
        (this.composer = this.required("[data-chat-input]")),
        (this.composerText = this.required("[data-composer-text]")),
        (this.composerContents = Array.from(this.composer.children).filter(
          (a) => a instanceof HTMLElement,
        )),
        this.chatShell.addEventListener("click", this.handleChatShellClick),
        (this.signupScene = this.required("[data-signup-scene]")),
        (this.signupLogo = this.required("[data-signup-logo-target]")),
        (this.signupEmail = this.required("[data-signup-email]")),
        (this.signupSubmit = this.required("[data-signup-submit]")),
        (this.status = this.root.querySelector("[data-chat-status]")),
        (this.prefersReducedMotion =
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
          !1),
        this.removeElements(
          "[data-thinking], [data-research-steps], [data-result-grid]",
        ),
        this.removeElements(Zr),
        this.clearMarketingPanels(),
        this.observeThreadContentFit());
    }
    root;
    stage;
    browserWindow;
    chatShell;
    chatBody;
    thread;
    composerText;
    composer;
    composerContents = [];
    signupScene;
    signupLogo;
    signupEmail;
    signupSubmit;
    status;
    messagePool = [];
    messageBodies = new WeakMap();
    cardPool = [];
    transientCleanups = [];
    messageIndex = 0;
    cardIndex = 0;
    scheduledScrollFrame = 0;
    scheduledScrollMessage = null;
    scrollTween = null;
    dropRevealWatchers = new WeakMap();
    lastStreamScrollAt = 0;
    prefersReducedMotion = !1;
    resolveAssetUrl;
    composerVisible = !1;
    activeTablePageTimelines = new Map();
    expectedDataTablePages = new Map();
    activeSequencePersonTimelines = new Map();
    threadContentFitFrame = null;
    threadContentResizeObserver = null;
    threadContentMutationObserver = null;
    maxVisibleThreadContentHeight = 0;
    windowSceneMeasure = null;
    handleChatShellClick = (e) => {
      if (this.handleThinkingToggleClick(e)) return;
      const t = this.findDataTableActionButton(e.target);
      if (t) {
        (e.preventDefault(),
          this.selectDataTableActionButton(t, { animate: !0 }));
        return;
      }
      const a = this.findDataTablePageButton(e.target);
      if (!a) return;
      const i = this.getDataTablePageButtonRuntime(a);
      if (!i) return;
      (e.preventDefault(),
        this.updateDataTablePageControlsForTable(i.table, i.page, i.pageRange),
        this.activeTablePageTimelines.get(i.tableId)?.kill());
      const n = this.dataTablePage(i.tableId, i.page, {
        updateExpected: !1,
        initialPage: i.initialPage,
        initialRangeText: i.initialRangeText,
      });
      (this.activeTablePageTimelines.set(i.tableId, n),
        n.eventCallback("onComplete", () => {
          this.activeTablePageTimelines.get(i.tableId) === n &&
            this.activeTablePageTimelines.delete(i.tableId);
        }));
    };
    handleThinkingToggleClick(e) {
      if (!(e.target instanceof Element)) return !1;
      const t = e.target.closest(".wa-thinking__chevron");
      if (t) {
        const o = t.closest(".wa-thinking");
        return !o?.dataset.thinkingCollapsed ||
          !this.ensurePausedForThinkingInteraction()
          ? !1
          : (e.preventDefault(),
            e.stopPropagation(),
            this.toggleThinkingSteps(o),
            !0);
      }
      const a = e.target.closest(".wa-thinking");
      if (a?.dataset.thinkingCollapsed)
        return this.ensurePausedForThinkingInteraction()
          ? (e.preventDefault(),
            e.stopPropagation(),
            this.toggleThinkingSteps(a),
            !0)
          : !1;
      const i = e.target.closest(".wa-research-step__chevron");
      if (i) {
        const o = i.closest(".wa-research-step");
        return !o ||
          o.dataset.stepState !== "complete" ||
          !this.ensurePausedForThinkingInteraction()
          ? !1
          : (e.preventDefault(),
            e.stopPropagation(),
            this.toggleThinkingStepDetail(o),
            !0);
      }
      const n = e.target.closest(".wa-research-step__label-row");
      if (n) {
        const o = n.closest(".wa-research-step");
        return !o ||
          o.dataset.stepState !== "complete" ||
          !this.ensurePausedForThinkingInteraction()
          ? !1
          : (e.preventDefault(),
            e.stopPropagation(),
            this.toggleThinkingStepDetail(o),
            !0);
      }
      return !1;
    }
    isPausedForThinkingInteraction() {
      return (
        this.root.dataset.storyPaused === "true" ||
        this.root.dataset.chatHistoryPaused === "true"
      );
    }
    ensurePausedForThinkingInteraction() {
      return this.isPausedForThinkingInteraction()
        ? !0
        : (this.root.dispatchEvent(
            new CustomEvent(Gr, { bubbles: !0, cancelable: !0 }),
          ),
          this.isPausedForThinkingInteraction());
    }
    reset() {
      (this.cancelScheduledScroll(),
        this.scrollTween?.kill(),
        (this.scrollTween = null),
        this.clearTransientElements(),
        this.clearMarketingPanels(),
        (this.messageIndex = 0),
        (this.cardIndex = 0),
        (this.composerText.textContent = ""),
        g.killTweensOf([
          this.composer,
          this.composerText,
          ...this.composerContents,
          this.thread,
        ]),
        this.clearDataTableState(),
        this.clearSequencePersonTimelines(),
        (this.signupEmail.textContent = ""),
        this.setSignupEmailFilled(!1),
        this.status?.replaceChildren(document.createTextNode("Ready")),
        this.clearCustomResults(),
        this.clearThreadContentFitState(),
        (this.thread.scrollTop = 0),
        g.set(this.thread, {
          clearProps:
            "maxHeight,minHeight,paddingTop,paddingBottom,borderWidth",
        }),
        g.set(this.signupScene, {
          autoAlpha: 0,
          y: 0,
          scale: 1,
          display: "none",
        }),
        g.set([this.signupLogo, this.signupSubmit], {
          clearProps: "transform,opacity,visibility",
        }),
        g.set(this.thread, { autoAlpha: 1, y: 0, display: "" }),
        this.resetComposerPresentation());
      for (const e of this.messagePool) e.style.display = "none";
      for (const e of this.cardPool) e.style.display = "none";
      this.requestThreadContentFitUpdate();
    }
    destroy() {
      (this.chatShell.removeEventListener("click", this.handleChatShellClick),
        this.threadContentFitFrame !== null &&
          (cancelAnimationFrame(this.threadContentFitFrame),
          (this.threadContentFitFrame = null)),
        this.threadContentResizeObserver?.disconnect(),
        this.threadContentMutationObserver?.disconnect(),
        this.windowSceneMeasure?.remove(),
        (this.windowSceneMeasure = null),
        this.clearDataTableState(),
        this.clearSequencePersonTimelines());
    }
    collapsePausedThinkingInteractions() {
      (this.queryElements(
        this.chatShell,
        '.wa-thinking[data-thinking-expanded="true"]',
      ).forEach((e) => {
        this.setThinkingStepsExpanded(e, !1, { animate: !1 });
      }),
        this.queryElements(
          this.chatShell,
          '.wa-research-step[data-detail-expanded="true"]',
        ).forEach((e) => {
          this.setThinkingStepDetailExpanded(e, !1, { animate: !1 });
        }));
    }
    prepareStoryStart() {
      this.resetComposerPresentation();
    }
    animateStorySwitchExit() {
      const e = this.getStorySwitchExitTargets(),
        t = g.timeline();
      if ((this.stopScrollMotion(), !e.length))
        return t.to({}, { duration: 0.001 });
      const a = this.getThreadBottomScrollTarget(),
        i = Math.min(a, this.thread.scrollTop + Ct.scrollDistance);
      return (
        g.killTweensOf(e),
        i > this.thread.scrollTop + 0.5 &&
          t.to(
            this.thread,
            {
              scrollTop: i,
              duration: Ct.scrollDuration,
              ease: "power2.inOut",
              overwrite: "auto",
            },
            0,
          ),
        t.to(
          e,
          {
            y: `-=${Ct.offsetY}`,
            autoAlpha: 0,
            duration: Ct.contentDuration,
            ease: Ct.contentEase,
            stagger: Ct.stagger,
            overwrite: "auto",
          },
          Ct.contentDelay,
        ),
        t
      );
    }
    setStatus(e) {
      const t = g.timeline();
      return (
        this.status &&
          t
            .to(this.status, {
              autoAlpha: 0,
              y: -3,
              duration: x(0.12),
              ease: "power1.out",
            })
            .call(() => {
              this.status && (this.status.textContent = e);
            })
            .to(this.status, {
              autoAlpha: 1,
              y: 0,
              duration: x(0.18),
              ease: "power2.out",
            }),
        t
      );
    }
    prepareSignup(e = "") {
      ((this.signupEmail.textContent = e),
        this.setSignupEmailFilled(!!e),
        g.set(this.signupScene, {
          display: "grid",
          autoAlpha: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
        }),
        g.set([this.signupLogo, this.signupSubmit], {
          clearProps: "transform,opacity,visibility",
        }),
        g.set([this.thread, this.composer], { autoAlpha: 0, y: 34 }),
        g.set(this.composer, this.getComposerHiddenVars()),
        g.set(this.composerContents, this.getComposerContentsHiddenVars()),
        this.setComposerVisibleState(!1));
    }
    setSignupEmailFilled(e) {
      ((this.signupScene.dataset.signupFilled = String(e)),
        e || delete this.signupScene.dataset.signupSubmitted);
    }
    typeComposer(e, t = 1.1) {
      const a = { count: 0 };
      let i = -1;
      return g.timeline().fromTo(
        a,
        { count: 0 },
        {
          count: e.length,
          duration: t,
          ease: "none",
          immediateRender: !1,
          onUpdate: () => {
            const n = Math.round(a.count);
            n !== i &&
              ((i = n), (this.composerText.textContent = e.slice(0, n)));
          },
          onComplete: () => {
            this.composerText.textContent = e;
          },
          onReverseComplete: () => {
            ((i = -1), (this.composerText.textContent = ""));
          },
        },
      );
    }
    sendComposerText() {
      return g.timeline().to(this.composerText, {
        autoAlpha: 0,
        y: -9,
        duration: x(0.18),
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    setComposerFocus(e) {
      return g
        .timeline()
        .to(
          {},
          { duration: 0.001, onStart: () => this.setComposerFocusState(e) },
        );
    }
    showComposer() {
      const e = g.timeline(),
        t = this.measureComposerFullFrame(),
        a = this.getComposerCompactFrame(t);
      return (
        e
          .set(this.composer, {
            ...this.getComposerHiddenVars(),
            ...ji,
            display: "grid",
            visibility: "visible",
            left: a.left,
            right: "auto",
            bottom: a.bottom,
            width: a.width,
            height: a.height,
            minHeight: a.height,
          })
          .set(this.composerContents, {
            visibility: "visible",
            opacity: 0,
            y: 0,
          })
          .call(() => this.setComposerVisibleState(!0))
          .set(
            this.thread,
            {
              "--wa-thread-base-bottom-padding": () =>
                `${Math.max(Kr, this.getComposerThreadInsetForFrame(t))}px`,
            },
            0,
          )
          .add(
            this.tweenThreadToBottom(me.threadPushDuration, me.threadPushEase),
            0,
          )
          .to(
            this.composer,
            {
              left: t.left,
              bottom: t.bottom,
              width: t.width,
              height: t.height,
              minHeight: t.height,
              duration: me.showDuration,
              ease: me.showEase,
              force3D: !0,
              autoRound: !1,
              overwrite: "auto",
              onUpdate: () => {
                this.composerVisible || this.setComposerVisibleState(!0);
              },
              onComplete: () => {
                this.composerVisible || this.setComposerVisibleState(!0);
              },
            },
            0,
          )
          .to(
            this.composerContents,
            {
              opacity: 1,
              duration: x(0.18),
              ease: me.contentEase,
              overwrite: "auto",
            },
            me.contentShowDelay,
          )
          .call(() => this.pinThreadToBottom()),
        e
      );
    }
    hideComposer() {
      const e = this.measureComposerFullFrame(),
        t = this.getComposerCollapsedFrame(e);
      return g
        .timeline()
        .set(this.composer, {
          ...ji,
          left: e.left,
          right: "auto",
          bottom: e.bottom,
          width: e.width,
          height: e.height,
          minHeight: e.height,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        })
        .to(
          this.composerContents,
          {
            opacity: 0,
            duration: me.contentHideDuration,
            ease: "power2.out",
            overwrite: "auto",
          },
          0,
        )
        .to(
          this.composer,
          {
            left: t.left,
            bottom: t.bottom,
            width: t.width,
            height: t.height,
            minHeight: t.height,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            borderWidth: 0,
            gap: 0,
            opacity: 1,
            duration: me.hideDuration,
            ease: me.hideEase,
            force3D: !0,
            autoRound: !1,
            overwrite: "auto",
            onStart: () => {
              (this.setComposerFocusState(!1),
                this.setComposerVisibleState(!1));
            },
            onComplete: () => {
              (g.set(this.composerContents, { visibility: "hidden" }),
                g.set(this.composer, { visibility: "hidden" }),
                this.thread.style.removeProperty(
                  "--wa-thread-base-bottom-padding",
                ),
                this.updateThreadContentFitState(),
                this.pinThreadToBottom());
            },
          },
          0,
        );
    }
    clearComposer() {
      return g.timeline().call(() => {
        ((this.composerText.textContent = ""),
          g.set(this.composerText, { autoAlpha: 1, y: 0 }));
      });
    }
    resetComposerPresentation() {
      (this.setComposerFocusState(!1),
        this.setComposerVisibleState(!1),
        g.set(this.composer, this.getComposerHiddenVars()),
        g.set(this.composerContents, this.getComposerContentsHiddenVars()),
        g.set(this.composerText, { autoAlpha: 1, y: 0 }));
    }
    clearDataTableState() {
      (this.activeTablePageTimelines.forEach((e) => e.kill()),
        this.activeTablePageTimelines.clear(),
        this.expectedDataTablePages.clear());
    }
    setComposerFocusState(e) {
      this.composer.dataset.focused = String(e);
    }
    setComposerVisibleState(e) {
      ((this.composerVisible = e),
        (this.composer.dataset.visible = String(e)),
        this.composer.setAttribute("aria-hidden", String(!e)));
    }
    getComposerHiddenVars() {
      return {
        opacity: 1,
        visibility: "hidden",
        y: 0,
        scaleX: 1,
        scaleY: 1,
        display: "",
        left: "",
        right: "",
        bottom: "",
        width: "",
        height: "",
        minHeight: "",
        ...ji,
      };
    }
    getComposerContentsHiddenVars() {
      return { visibility: "hidden", opacity: 0, y: 0 };
    }
    getComposerThreadInsetForFrame(e) {
      const t = this.chatShell.clientHeight - e.bottom - e.height,
        a = this.thread.offsetTop + this.thread.clientHeight,
        i = Math.max(0, a - t);
      return Math.ceil(i + me.threadGap);
    }
    measureComposerFullFrame() {
      g.set(this.composer, { clearProps: Sc });
      const e = this.chatShell.getBoundingClientRect(),
        t = this.composer.getBoundingClientRect();
      return {
        left: t.left - e.left,
        bottom: e.bottom - t.bottom,
        width: t.width,
        height: t.height,
      };
    }
    getComposerCompactFrame(e) {
      const t = Math.min(me.compactWidth, e.width),
        a = Math.min(me.compactHeight, e.height);
      return {
        left: e.left + (e.width - t) / 2,
        bottom: e.bottom + (e.height - a) / 2,
        width: t,
        height: a,
      };
    }
    getComposerCollapsedFrame(e) {
      const t = me.collapsedWidth,
        a = me.collapsedHeight;
      return {
        left: e.left + (e.width - t) / 2,
        bottom: e.bottom + (e.height - a) / 2,
        width: t,
        height: a,
      };
    }
    showSignup(e = "") {
      return g
        .timeline()
        .call(() => {
          ((this.signupEmail.textContent = e), this.setSignupEmailFilled(!!e));
        })
        .set(this.signupScene, {
          display: "grid",
          autoAlpha: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
        })
        .set([this.signupLogo, this.signupSubmit], {
          clearProps: "transform,opacity,visibility",
        })
        .set(this.thread, { autoAlpha: 0, y: 34 })
        .set(this.composer, this.getComposerHiddenVars())
        .set(this.composerContents, this.getComposerContentsHiddenVars())
        .call(() => this.setComposerVisibleState(!1));
    }
    typeSignupEmail(e, t = 0.86) {
      const a = { count: 0 };
      let i = -1;
      return g.timeline().fromTo(
        a,
        { count: 0 },
        {
          count: e.length,
          duration: t,
          ease: "none",
          immediateRender: !1,
          onUpdate: () => {
            const n = Math.round(a.count);
            if (n === i) return;
            i = n;
            const o = e.slice(0, n);
            ((this.signupEmail.textContent = o),
              this.setSignupEmailFilled(!!o));
          },
          onComplete: () => {
            ((this.signupEmail.textContent = e),
              this.setSignupEmailFilled(!!e));
          },
          onReverseComplete: () => {
            ((i = -1),
              (this.signupEmail.textContent = ""),
              this.setSignupEmailFilled(!1));
          },
        },
      );
    }
    submitSignup() {
      return g
        .timeline()
        .call(() => {
          this.signupScene.dataset.signupSubmitted = "true";
        })
        .to(this.signupSubmit, {
          scale: 0.9,
          duration: x(0.08),
          ease: "power2.out",
        })
        .to(this.signupSubmit, {
          scale: 1,
          duration: x(0.2),
          ease: "back.out(3.2)",
        });
    }
    transitionSignupToChat() {
      return g
        .timeline()
        .to(this.signupScene, {
          y: () => this.getSignupScrollOutDistance(),
          autoAlpha: 1,
          scale: 1,
          duration: ua.duration,
          ease: "power3.inOut",
        })
        .to(
          this.signupScene,
          { autoAlpha: 0, duration: x(0.08), ease: "power1.out" },
          ">-0.08",
        )
        .set(this.signupScene, { pointerEvents: "none" })
        .fromTo(
          this.thread,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: ua.duration, ease: "power3.out" },
          ua.threadOverlap,
        )
        .set(this.composer, this.getComposerHiddenVars())
        .set(this.composerContents, this.getComposerContentsHiddenVars())
        .call(() => this.setComposerVisibleState(!1));
    }
    getSignupScrollOutDistance() {
      const e = this.signupScene.getBoundingClientRect().height;
      return -Math.max(ua.minScrollOut, Math.round(e * ua.scrollOutRatio));
    }
    stopScrollMotion() {
      (this.cancelScheduledScroll(),
        this.scrollTween?.kill(),
        (this.scrollTween = null));
    }
    prepareForChatHistoryPause() {
      this.syncPausedThinkingLayouts();
    }
    scrollToLive(e = X.followDuration) {
      this.stopScrollMotion();
      const t = this.getThreadLiveScrollTarget();
      if (
        this.prefersReducedMotion ||
        Math.abs(this.thread.scrollTop - t) < 1
      ) {
        this.thread.scrollTop = t;
        return;
      }
      this.scrollTween = g.to(this.thread, {
        scrollTop: t,
        duration: e,
        ease: X.followEase,
        overwrite: "auto",
        onComplete: () => {
          this.scrollTween = null;
        },
      });
    }
    scrollToLiveTimeline(e = X.followDuration) {
      return this.scrollChatTarget(() => null, {
        align: "bottom",
        duration: e,
        fallback: "bottom",
      });
    }
    userMessage(e) {
      const t = this.claimMessage("user", e);
      return this.revealMessage(t);
    }
    assistantMessage(e) {
      const t = this.claimMessage("assistant", ""),
        a = t.querySelector("[data-message-body]"),
        i = g.timeline().add(this.revealMessage(t));
      return a
        ? i.add(
            this.streamText(a, e, {
              duration: this.getStreamDuration(e, Wr),
              targetForScroll: t,
            }),
            Wr.startOverlap,
          )
        : i;
    }
    thinkingState(e, t = 1.1, a = {}) {
      const i = this.normalizeThinkingInput(e),
        n = i.items.length > 1;
      return this.runThinkingSequence(i, {
        hold: t,
        itemStartY: n ? 10 : 6,
        headerDuration: n ? 0.24 : 0.28,
        afterStepHold: n ? t * 0.45 : t,
        finalHold: n ? t * 0.35 : 0,
        preserveScroll: a.preserveScroll ?? !1,
      });
    }
    prepareResultCard(e) {
      const t = this.claimCard(e);
      return {
        el: t,
        reveal: () => this.revealCard(t),
        highlight: (a) => this.highlightCardTarget(t, a),
      };
    }
    dataTable(e) {
      const t = this.createDataTable(e),
        a =
          e.scrollAnchor === "previous-message"
            ? this.getLastMessageBody()
            : null;
      return this.revealComponentItems(
        "table",
        t,
        ".wa-data-table__row",
        He.tableRow,
        a,
        { preserveScroll: e.preserveScroll ?? !1 },
      );
    }
    scrollDataTableFooterIntoView(e, t = X.revealDuration, a = {}) {
      const i = this.findDataTable(e),
        o =
          a.align === "top" || typeof a.bottomClearance == "number"
            ? (i?.querySelector(".wa-data-table__footer") ?? i)
            : i;
      if (!o) return;
      (this.stopScrollMotion(), this.updateThreadContentFitState());
      const s = typeof a.bottomClearance == "number",
        c = () => (
          this.updateThreadContentFitState(),
          typeof a.bottomClearance == "number"
            ? this.getElementBottomClearanceScrollTarget(
                o,
                a.bottomClearance,
                a.offset ?? 0,
              )
            : this.getElementScrollTarget(o, {
                align: a.align ?? "bottom",
                offset: a.offset ?? 0,
              })
        ),
        l = c();
      if (
        this.prefersReducedMotion ||
        (!s && Math.abs(this.thread.scrollTop - l) < 1)
      ) {
        this.thread.scrollTop = l;
        return;
      }
      const d = this.thread.scrollTop,
        u = { value: 0 };
      this.scrollTween = g.to(u, {
        value: 1,
        duration: t,
        ease: X.revealEase,
        overwrite: "auto",
        onUpdate: () => {
          const h = s ? c() : l;
          this.thread.scrollTop = d + (h - d) * u.value;
        },
        onComplete: () => {
          ((this.thread.scrollTop = s ? c() : l), (this.scrollTween = null));
        },
      });
    }
    scrollChatElementIntoView(e, t = {}) {
      return this.scrollChatTarget(
        () => {
          const a = this.queryElements(this.root, e);
          return t.match === "last"
            ? (a[a.length - 1] ?? null)
            : (a[0] ?? null);
        },
        {
          align: t.align ?? "top",
          duration: t.duration ?? X.revealDuration,
          offset: t.offset,
          fallback: "current",
        },
      );
    }
    scrollChatTarget(e, t) {
      const a = g.timeline();
      let i = this.thread.scrollTop,
        n = null;
      return (
        a.call(() => {
          ((n = e()),
            this.stopScrollMotion(),
            this.updateThreadContentFitState(),
            (i = n
              ? this.getElementScrollTarget(n, t)
              : this.getMissingScrollTarget(t.fallback ?? "current")));
        }),
        a.to(this.thread, {
          scrollTop: () => i,
          duration: t.duration,
          ease: X.revealEase,
          overwrite: "auto",
          onComplete: () => {
            this.scrollTween = null;
          },
        }),
        a.call(() => {
          i = n
            ? this.getElementScrollTarget(n, t)
            : this.getMissingScrollTarget(t.fallback ?? "current");
        }),
        a.to(this.thread, {
          scrollTop: () => i,
          duration: x(0.16),
          ease: "power2.out",
          overwrite: "auto",
        }),
        a
      );
    }
    getElementScrollTarget(e, t) {
      return t.align === "bottom"
        ? this.getElementBottomScrollTarget(e, t.offset ?? 0)
        : this.getAlignedElementScrollTarget(e, t.offset ?? 0);
    }
    getElementBottomClearanceScrollTarget(e, t, a = 0) {
      const i = e.getBoundingClientRect(),
        n = this.thread.getBoundingClientRect(),
        o = window.visualViewport
          ? window.visualViewport.offsetTop + window.visualViewport.height
          : window.innerHeight,
        s = Math.min(n.bottom, o),
        c = this.getThreadContentScale(),
        l = s - i.bottom,
        d = Math.max(0, t - l) / c,
        u = this.thread.scrollTop + d + a / c;
      return Math.min(this.getThreadBottomScrollTarget(), Math.max(0, u));
    }
    getMissingScrollTarget(e) {
      return e === "bottom"
        ? this.getThreadBottomScrollTarget()
        : this.thread.scrollTop;
    }
    dataTablePage(e, t, a = {}) {
      const i = g.timeline(),
        n = { value: 0 },
        o = a.updateExpected ?? !0,
        s = {
          canSwitch: !1,
          committed: !1,
          table: null,
          initialPage: null,
          initialRangeText: null,
          currentRows: [],
          targetRows: [],
          buttons: [],
          range: null,
          paginationDirection: null,
          cellSwaps: [],
        };
      return (
        i
          .to(n, {
            value: 1,
            duration: J.totalDuration,
            ease: "none",
            onStart: () => {
              o && this.expectedDataTablePages.set(e, t);
              const c = this.getDataTablePageRuntime(e, t);
              ((s.table = c?.table ?? null),
                (s.initialPage = a.initialPage ?? c?.activePage ?? null),
                (s.currentRows = c?.currentRows ?? []),
                (s.targetRows = c?.targetRows ?? []),
                (s.buttons = c?.buttons ?? []),
                (s.targetButton = c?.targetButton),
                (s.range = c?.range ?? null),
                (s.initialRangeText =
                  a.initialRangeText ?? s.range?.textContent ?? null),
                (s.canSwitch = !!(
                  s.table &&
                  s.targetRows.length &&
                  s.table.dataset.activePage !== String(t)
                )),
                s.canSwitch &&
                  ((n.value = 0),
                  g.set(s.currentRows, { autoAlpha: 1, y: 0 }),
                  (s.cellSwaps = this.prepareDataTablePageCellSwaps(
                    s.currentRows,
                    s.targetRows,
                  )),
                  this.updateDataTablePageControls(s, t),
                  this.startDataTablePaginationMotion(s, t),
                  this.setMotionHints(this.getDataTablePageMotionTargets(s))));
            },
            onUpdate: () => {
              s.canSwitch && this.renderDataTablePageCellSwaps(s, n.value);
            },
          })
          .call(() => {
            this.commitDataTablePageTransition(s, t);
          }),
        i.eventCallback("onInterrupt", () => {
          this.cleanupDataTablePageTransition(s);
        }),
        i
      );
    }
    prepareDataTablePageCellSwaps(e, t) {
      const a = [],
        i = Math.min(e.length, t.length);
      for (let n = 0; n < i; n += 1) {
        const o = this.queryElements(e[n], ".wa-data-table__cell"),
          s = this.queryElements(t[n], ".wa-data-table__cell"),
          c = Math.min(o.length, s.length);
        for (let l = 0; l < c; l += 1) {
          const d = this.getElementChildren(o[l]),
            u = this.createDataTablePageCellClone(s[l]);
          !d.length ||
            !u.childNodes.length ||
            ((o[l].dataset.cellSwapActive = "true"),
            o[l].append(u),
            this.setDataTablePageCellSwapState(d, 1, 0),
            this.setDataTablePageCellSwapState([u], 0, J.incomingY),
            a.push({
              cell: o[l],
              currentContent: d,
              clone: u,
              delay: this.getDataTablePageCellDelay(n, l),
            }));
        }
      }
      return a;
    }
    createDataTablePageCellClone(e) {
      const t = document.createElement("span");
      return (
        (t.className = "wa-data-table__cell-swap-clone"),
        t.setAttribute("aria-hidden", "true"),
        e.childNodes.forEach((a) => {
          t.append(a.cloneNode(!0));
        }),
        t
      );
    }
    renderDataTablePageCellSwaps(e, t) {
      const a = t * J.totalDuration;
      e.cellSwaps.forEach((i) => {
        const n = Qt((a - i.delay) / J.duration),
          o = Qt((a - i.delay - J.incomingLag) / J.duration),
          s = Fa.in(o),
          c = Fa.out(n);
        (this.setDataTablePageCellSwapState(
          i.currentContent,
          1 - c,
          this.interpolate(0, J.outgoingY, c),
        ),
          this.setDataTablePageCellSwapState(
            [i.clone],
            s,
            this.interpolate(J.incomingY, 0, s),
          ));
      });
    }
    getDataTablePageCellDelay(e, t) {
      return e * J.rowStagger + t * J.columnStagger;
    }
    setDataTablePageCellSwapState(e, t, a) {
      const i = t > 0.001,
        n = Qt(t).toFixed(3),
        o = Math.abs(a) < 0.01 ? "0" : a.toFixed(2);
      e.forEach((s) => {
        ((s.style.opacity = n),
          (s.style.transform = `translate3d(0, ${o}px, 0)`),
          (s.style.visibility = i ? "visible" : "hidden"));
      });
    }
    commitDataTablePageTransition(e, t) {
      !e.table ||
        !e.canSwitch ||
        ((e.committed = !0),
        (e.table.dataset.activePage = String(t)),
        e.currentRows.forEach((a) => {
          a.style.display = "none";
        }),
        e.targetRows.forEach((a) => {
          a.style.display = "grid";
        }),
        e.buttons.forEach((a) => {
          this.updateDataTablePageButton(a, t);
        }),
        e.range &&
          e.targetButton?.dataset.pageRange &&
          (e.range.textContent = e.targetButton.dataset.pageRange),
        g.set(e.targetRows, {
          autoAlpha: 1,
          y: 0,
          clearProps: "opacity,visibility,transform,translate,rotate,scale",
        }),
        this.cleanupDataTablePageTransition(e));
    }
    cleanupDataTablePageTransition(e) {
      const t = this.getDataTablePageMotionTargets(e);
      (t.length && this.clearMotionHints(t),
        e.cellSwaps.forEach((a) => {
          (a.clone.remove(),
            delete a.cell.dataset.cellSwapActive,
            g.set(a.currentContent, {
              clearProps: "opacity,visibility,transform,translate,rotate,scale",
            }));
        }),
        !e.committed &&
          e.canSwitch &&
          (g.set(e.currentRows, { autoAlpha: 1, y: 0 }),
          e.initialPage !== null &&
            Number.isFinite(e.initialPage) &&
            this.updateDataTablePageControls(
              e,
              e.initialPage,
              e.initialRangeText,
            )),
        (e.cellSwaps = []),
        e.table &&
          (delete e.table.dataset.paginationMotion,
          delete e.table.dataset.paginationDirection));
    }
    getDataTablePageMotionTargets(e) {
      return e.cellSwaps.flatMap((t) => [...t.currentContent, t.clone]);
    }
    startDataTablePaginationMotion(e, t) {
      e.table &&
        ((e.paginationDirection = this.getDataTablePaginationDirection(
          t,
          e.initialPage,
        )),
        (e.table.dataset.paginationDirection = e.paginationDirection),
        (e.table.dataset.paginationMotion = "true"));
    }
    getDataTablePaginationDirection(e, t) {
      return t !== null && e < t ? "previous" : "next";
    }
    getElementChildren(e) {
      return Array.from(e.children).filter((t) => t instanceof HTMLElement);
    }
    updateDataTablePageControls(
      e,
      t,
      a = e.targetButton?.dataset.pageRange ?? null,
    ) {
      this.updateDataTablePageControlsForElements(e.buttons, e.range, t, a);
    }
    updateDataTablePageControlsForTable(e, t, a) {
      this.updateDataTablePageControlsForElements(
        this.queryElements(e, Ki),
        e.querySelector(Xi),
        t,
        a,
      );
    }
    updateDataTablePageControlsForElements(e, t, a, i) {
      (e.forEach((n) => {
        this.updateDataTablePageButton(n, a);
      }),
        t && i !== null && (t.textContent = i));
    }
    updateDataTablePageButton(e, t) {
      const a = e.dataset.pageButtonRole ?? "dot",
        n = this.parseFiniteNumber(e.dataset.pageCount) ?? t,
        o =
          a === "previous"
            ? Math.max(1, t - 1)
            : a === "next"
              ? Math.min(n, t + 1)
              : this.parseFiniteNumber(e.dataset.tablePageButton),
        s = a === "dot" && o === t,
        c = (a === "previous" && t <= 1) || (a === "next" && t >= n);
      (o !== null && (e.dataset.tablePageButton = String(o)),
        (e.dataset.active = String(s)),
        e.toggleAttribute("disabled", c),
        e.setAttribute("aria-disabled", String(c)),
        e.setAttribute("aria-current", s ? "page" : "false"));
    }
    getDataTablePageRestores() {
      const e = [];
      return (
        this.expectedDataTablePages.forEach((t, a) => {
          const i = this.findDataTable(a),
            n = this.parseFiniteNumber(i?.dataset.activePage),
            o = i ? this.findDataTablePageDotButton(i, t) : null;
          !i ||
            !o ||
            n === null ||
            n === t ||
            e.push({ tableId: a, currentPage: n, expectedPage: t, target: o });
        }),
        e
      );
    }
    enrichmentPanel(e) {
      const t = this.createEnrichmentPanel(e),
        a = this.claimComponentMessage("enrichment", t),
        i = this.queryElements(t, ".wa-waterfall-row"),
        n = this.queryElements(t, ".wa-waterfall-chip"),
        o = this.queryElements(t, ".wa-waterfall-service-step"),
        s = this.revealPreparedItems(a, i, He.waterfallRow),
        c = t.querySelector(".wa-thinking__glyph");
      return (
        g.set(o, { autoAlpha: 0, y: 3, scale: 0.98 }),
        g.set(n, { scale: 1 }),
        s.call(() => this.setLocalLogoMode(c, "thinking"), void 0, 0),
        s.add(this.animateEnrichmentWaterfall(i), `+=${ze.rowStartHold}`),
        s.call(() => this.setLocalLogoMode(c, "done")),
        s
      );
    }
    strategyPlans(e) {
      const t = e.map((h) => this.createStrategyPlan(h)),
        a = document.createElement("div"),
        i = t.flatMap((h) =>
          this.queryElements(h, ".wa-strategy-plan__bullets li"),
        ),
        n = this.getLastMessageBody(),
        o = He.strategyCard,
        s = "strategyCardsIn",
        c = o.to.stagger,
        l = [...t, ...i];
      ((a.className = "wa-result-grid has-strategy-plans"),
        (a.dataset.strategyPlans = e.map((h) => h.id).join(" ")),
        a.append(...t),
        t.length && g.set(t, { ...o.from }),
        g.set(i, { ...Jr.from }));
      const d = this.claimComponentMessage("strategy", a),
        u = g
          .timeline()
          .add(this.revealMessage(d, n, Xr))
          .addLabel(s, Tc)
          .call(() => this.setMotionHints(l), void 0, s)
          .to(t, { ...o.to }, s);
      return (
        t.forEach((h, m) => {
          const f = this.queryElements(h, ".wa-strategy-plan__bullets li");
          f.length && u.to(f, { ...Jr.to }, `${s}+=${m * c}`);
        }),
        u
          .call(() => this.clearMotionHints(l))
          .call(
            () => this.animateMessageScrollIntoView(d, X.followDuration, n, Xr),
            void 0,
            "+=0.02",
          )
      );
    }
    strategyPlanHover(e, t) {
      return g.timeline().call(() => {
        const a = this.root.querySelector(e),
          i = a?.closest("[data-strategy-plans]");
        (i ? this.queryElements(i, ".wa-strategy-plan") : []).forEach((o) =>
          o.toggleAttribute("data-cursor-hover", t && o === a),
        );
      });
    }
    strategyPlanCursorHover(e, t, a) {
      const i = g.timeline();
      let n = [],
        o = null,
        s = null,
        c = !1;
      const l = (p) => {
          p !== o &&
            (o?.removeAttribute("data-cursor-hover"),
            (o = p),
            o?.setAttribute("data-cursor-hover", ""));
        },
        d = () => {
          (l(null), n.forEach((p) => p.removeAttribute("data-cursor-hover")));
        },
        u = () => {
          const p = this.root.getBoundingClientRect(),
            w = t.readPosition(),
            b = { x: p.left + w.x, y: p.top + w.y };
          for (const A of n) {
            const v = A.getBoundingClientRect();
            if (
              b.x >= v.left &&
              b.x <= v.right &&
              b.y >= v.top &&
              b.y <= v.bottom
            )
              return A;
          }
          return null;
        },
        h = () => {
          l(u());
        },
        m = () => {
          (s?.kill(), (s = null), c && (g.ticker.remove(h), (c = !1)), d());
        },
        f = () => {
          const p = this.root.querySelector(e),
            w = p?.matches("[data-strategy-plans]")
              ? p
              : p?.closest("[data-strategy-plans]");
          ((n = w ? this.queryElements(w, ".wa-strategy-plan") : []),
            d(),
            n.length &&
              (h(), g.ticker.add(h), (c = !0), (s = g.delayedCall(a, m))));
        };
      return (i.eventCallback("onInterrupt", m), i.call(f));
    }
    dataSourcesGrid(e) {
      const t = this.createDataSourcesGrid(e);
      return this.revealComponentItems(
        "sources",
        t,
        ".wa-data-source-card",
        He.smallCard,
      );
    }
    marketingDataSourcesGrid(e) {
      const t = this.createMarketingDataSourcesGrid(e),
        a = t.querySelector(".wa-data-source-grid__header"),
        i = this.compactElements(
          a,
          ...this.queryElements(t, ".wa-data-source-group"),
          ...this.queryElements(t, ".wa-data-vendor-logo"),
        );
      return (
        this.clearMarketingPanels(),
        (t.dataset.scrollAlign = "equal-inset"),
        g
          .timeline()
          .call(() => this.setMarketingDataGridScale(t))
          .add(
            this.revealComponentItems("sources", t, i, {
              from: { autoAlpha: 0, y: 10 },
              to: {
                autoAlpha: 1,
                y: 0,
                duration: Cc.cardDuration,
                ease: "power2.out",
                stagger: 0.025,
              },
              position: "-=0.16",
            }),
          )
      );
    }
    outreachStyleProfile(e, t = {}) {
      const a = this.createOutreachStyleProfile(e);
      return (
        t.scrollAlign && (a.dataset.scrollAlign = t.scrollAlign),
        this.revealComponentItems(
          "style",
          a,
          ".wa-style-profile__row, .wa-style-profile__example",
          He.softRow,
        )
      );
    }
    proximityLeadList(e) {
      const t = this.createProximityLeadList(e);
      return this.revealComponentItems(
        "table",
        t,
        ".wa-data-table__row",
        He.tableRow,
      );
    }
    mailboxConnection(e) {
      const t = this.createMailboxConnection(e),
        a = this.compactElements(
          t.querySelector(".wa-mailbox-connection__card"),
        );
      return this.revealComponentItems("mailbox", t, a, {
        from: { autoAlpha: 0, y: 10, scale: 0.99 },
        to: {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: x(0.28),
          ease: "power2.out",
          stagger: 0.045,
        },
        position: "-=0.2",
      });
    }
    connectMailbox(e) {
      const t = this.root.querySelector(
          `[data-mailbox-connection="${this.escapeSelectorValue(e)}"]`,
        ),
        a = t?.querySelector("[data-mailbox-connect]"),
        i = t?.querySelector("[data-mailbox-learning]"),
        n = t
          ? Array.from(t.querySelectorAll("[data-mailbox-thumbprint-path]"))
          : [],
        o = t?.querySelector("[data-mailbox-learning-progress]"),
        s = t?.querySelector(".wa-mailbox-learning__title"),
        c = t?.querySelector("[data-mailbox-learning-title-text]") ?? s,
        l = t?.querySelector("[data-mailbox-learning-ready-chevron]"),
        d = t?.querySelector(".wa-mailbox-learning__detail"),
        u = t?.querySelector(".wa-mailbox-learning__thumbprint"),
        h = t ? this.queryElements(t, ".wa-mailbox-connection__signal") : [],
        m = g.timeline();
      if (!t || !a || !i || !c || !d || !u || !n.length || !o) return m;
      const f = { value: 0 };
      return (
        m
          .call(() => {
            ((t.dataset.mailboxState = "loading"),
              (a.disabled = !0),
              a.setAttribute("aria-busy", "true"),
              a.setAttribute(
                "aria-label",
                a.dataset.mailboxLoadingLabel ?? "Connecting",
              ),
              (i.dataset.mailboxLearningState = "idle"),
              (c.textContent = Qr),
              (d.textContent = Yi[0].detail),
              g.set(i, { display: "none", autoAlpha: 0, y: 8, scale: 0.992 }),
              this.updateMailboxThumbprintFill(n, 0),
              g.set(o, { scaleX: 0, transformOrigin: "left center" }),
              g.set(u, { scale: 1, transformOrigin: "center center" }),
              g.set(this.compactElements(l), {
                autoAlpha: 0,
                y: -1,
                scale: 0.9,
              }));
          })
          .to(a, {
            scale: 0.985,
            duration: se.pressDuration,
            ease: "power2.out",
          })
          .to(a, {
            scale: 1,
            duration: se.releaseDuration,
            ease: "back.out(2.6)",
          })
          .to({}, { duration: se.loadingHoldDuration })
          .call(() => {
            ((t.dataset.mailboxState = "connected"),
              (a.disabled = !0),
              a.removeAttribute("aria-busy"),
              a.setAttribute(
                "aria-label",
                a.dataset.mailboxConnectedLabel ?? "Connected",
              ),
              (i.dataset.mailboxLearningState = "loading"));
          })
          .to({}, { duration: se.successHoldDuration })
          .set(i, { display: "grid", height: "auto" }, "-=0.04")
          .fromTo(
            i,
            { autoAlpha: 0, y: 8, scale: 0.992 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: se.learningRevealDuration,
              ease: "power2.out",
            },
            "-=0.02",
          )
          .fromTo(
            this.compactElements(c, d),
            { autoAlpha: 0, y: 5 },
            {
              autoAlpha: 1,
              y: 0,
              duration: x(0.22),
              ease: "power2.out",
              stagger: 0.04,
            },
            "<+=0.07",
          ),
        Yi.forEach((p, w) => {
          (w > 0 &&
            m
              .to(d, {
                autoAlpha: 0,
                y: -3,
                duration: se.detailSwapDuration,
                ease: "power1.in",
              })
              .call(() => {
                d.textContent = p.detail;
              })
              .fromTo(
                d,
                { autoAlpha: 0, y: 4 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: se.detailSwapDuration,
                  ease: "power2.out",
                },
              ),
            m
              .to(
                f,
                {
                  value: p.progress,
                  duration: p.duration,
                  ease: "power2.inOut",
                  onUpdate: () => this.updateMailboxThumbprintFill(n, f.value),
                },
                w === 0 ? "-=0.04" : void 0,
              )
              .to(
                o,
                {
                  scaleX: p.progress / 100,
                  duration: p.duration,
                  ease: "power2.inOut",
                },
                "<",
              )
              .to({}, { duration: p.hold }));
        }),
        m
          .to(d, {
            autoAlpha: 0,
            y: -3,
            duration: se.detailSwapDuration,
            ease: "power1.in",
          })
          .to(
            c,
            {
              autoAlpha: 0,
              y: -3,
              duration: se.detailSwapDuration,
              ease: "power1.in",
            },
            "<",
          )
          .call(() => {
            ((i.dataset.mailboxLearningState = "ready"),
              (c.textContent = fc),
              (d.textContent = i.dataset.mailboxLearningReadyDetail ?? Yr));
          })
          .fromTo(
            c,
            { autoAlpha: 0, y: 4 },
            {
              autoAlpha: 1,
              y: 0,
              duration: se.detailSwapDuration,
              ease: "power2.out",
            },
          )
          .fromTo(
            d,
            { autoAlpha: 0, y: 4 },
            {
              autoAlpha: 1,
              y: 0,
              duration: se.detailSwapDuration,
              ease: "power2.out",
            },
            "<+=0.03",
          )
          .fromTo(
            this.compactElements(l),
            { autoAlpha: 0, y: -1, scale: 0.9 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: se.detailSwapDuration,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            u,
            {
              scale: 1.16,
              duration: se.readyPopUpDuration,
              ease: "power2.out",
            },
            "<",
          )
          .to(u, {
            scale: 1,
            duration: se.readyPopSettleDuration,
            ease: "back.out(3)",
          }),
        h.length &&
          m.to(
            h,
            {
              autoAlpha: 1,
              y: 0,
              duration: x(0.18),
              ease: "power2.out",
              stagger: 0.035,
            },
            "<+=0.38",
          ),
        m.to({}, { duration: se.settleHold }),
        m
      );
    }
    personalizationSwipeGame(e) {
      const t = this.createPersonalizationSwipeGame(e),
        a = this.compactElements(
          ...this.queryElements(
            t,
            ".wa-mini-game__header, .wa-swipe-game__prompt, .wa-swipe-game__axis",
          ),
          t.querySelector(".wa-swipe-game__stack"),
          t.querySelector(".wa-swipe-game__actions"),
        );
      return (
        this.layoutSwipeGameCards(t, 0),
        this.revealComponentItems("game", t, a, {
          from: { autoAlpha: 0, y: 12, scale: 0.985 },
          to: {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: x(0.32),
            ease: "power2.out",
            stagger: 0.05,
          },
          position: "-=0.2",
        })
      );
    }
    swipePersonalizationCard(e, t, a) {
      const i = this.root.querySelector(
          `[data-personalization-swipe-game="${this.escapeSelectorValue(e)}"]`,
        ),
        n = i?.querySelector(
          `[data-swipe-card="${this.escapeSelectorValue(t)}"]`,
        ),
        o = this.getSwipeCards(i),
        s = n ? o.indexOf(n) : -1,
        c = o[s + 1],
        l = a === "use" ? 1 : -1,
        d = i?.querySelector(`[data-swipe-action="${a}"]`),
        u = i?.querySelector("[data-swipe-complete]"),
        h = i?.querySelector(".wa-swipe-game__actions"),
        m = g.timeline();
      return (
        !i ||
          !n ||
          s < 0 ||
          (m
            .call(() => {
              ((i.dataset.swipeDecision = a), d && (d.dataset.active = "true"));
            })
            .to(
              d ?? {},
              { scale: 0.92, duration: x(0.08), ease: "power2.out" },
              0,
            )
            .to(
              d ?? {},
              { scale: 1, duration: x(0.18), ease: "back.out(2)" },
              x(0.1),
            )
            .to(
              n,
              {
                x: l * 520,
                y: s % 2 === 0 ? -28 : 24,
                rotation: l * (16 + s * 2),
                autoAlpha: 0,
                duration: x(0.5),
                ease: "power3.in",
                force3D: !0,
              },
              0.08,
            )
            .call(
              () => {
                (delete i.dataset.swipeDecision,
                  d && delete d.dataset.active,
                  (n.dataset.swipeState = "done"),
                  g.set(n, { display: "none" }),
                  this.layoutSwipeGameCards(i, s + 1));
              },
              void 0,
              "-=0.12",
            ),
          c
            ? m.fromTo(
                c,
                {
                  x: -l * 18,
                  y: 10,
                  scale: 0.965,
                  rotation: -l * 1.5,
                  autoAlpha: 0.74,
                },
                {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  autoAlpha: 1,
                  duration: x(0.28),
                  ease: "power2.out",
                  force3D: !0,
                },
                "-=0.2",
              )
            : u &&
              h &&
              m
                .to(
                  h,
                  { autoAlpha: 0, y: 8, duration: x(0.18), ease: "power2.out" },
                  "-=0.16",
                )
                .to(
                  u,
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: x(0.28),
                    ease: "back.out(1.55)",
                  },
                  "-=0.06",
                )),
        m
      );
    }
    sequenceEngagement(e) {
      const t = this.createSequenceEngagement(e),
        a = this.getActiveSequenceIndex(t),
        i = e.sequences.some((c) => c.steps?.length),
        n = i
          ? ".wa-sequence-people-wrap, .wa-sequence-engagement__sequences, .wa-sequence-kickoff"
          : ".wa-sequence-people-wrap, .wa-sequence-card, .wa-sequence-step, .wa-sequence-wait, .wa-sequence-copy-panel, .wa-engage-channel, .wa-sequence-kickoff",
        o = i
          ? {
              from: { autoAlpha: 0, y: 9, scale: 0.99 },
              to: {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: x(0.24),
                ease: "power2.out",
                stagger: 0,
              },
              position: "+=0.02",
            }
          : He.stackCard,
        s = i ? t.querySelector(".wa-sequence-people-wrap") : null;
      return this.revealComponentItems("sequence", t, n, o, s)
        .call(() => this.setSequencePersonRailPosition(t, a), void 0, 0.01)
        .call(() => this.setSequencePersonRailPosition(t, a), void 0, 0.12)
        .call(() => this.clearSequencePersonCardMotionStyles(t));
    }
    sequenceBuildThinking(e) {
      const t = this.createSequenceThinkingStep(e.templateLabel, e.template, 0),
        a = e.tracks.map((f, p) =>
          this.createSequenceThinkingStep(f.label, f.detail, p + 1, e.total),
        ),
        i = [t, ...a],
        n = this.claimThinkingMessage(i),
        o = { value: 1 },
        s = a.map((f) => ({
          label: f.querySelector(".wa-sequence-thinking-progress__count"),
          bar: f.querySelector(".wa-sequence-thinking-progress__bar span"),
        })),
        c = s.flatMap((f) => (f.bar ? [f.bar] : []));
      n.message.querySelector(".wa-thinking-block").dataset.sequenceThinking =
        e.id;
      const l = g
          .timeline()
          .call(() => {
            (this.prepareThinkingMessage(n, i, 10),
              g.set(c, {
                scaleX: 1 / Math.max(1, e.total),
                transformOrigin: "left center",
              }));
          })
          .add(this.revealMessage(n.message))
          .add(this.revealThinkingHeader(n, 0.24))
          .call(() => {
            ((t.dataset.stepState = "current"),
              this.showThinkingStepTimer(t),
              g.set(t, { display: "grid" }));
          })
          .add(this.moveThinkingLogoToStep(n, t), "<"),
        d = this.createThinkingStepReveal(t),
        u = d.duration() + da.templateHold;
      l.add(d, "<")
        .to({}, { duration: da.templateHold })
        .add(this.createThinkingStepElapsedTimer(t, u), `-=${u}`)
        .add(this.foldThinkingStep(t, n.message))
        .call(
          () => {
            a.forEach((f) => {
              ((f.dataset.stepState = "current"),
                this.showThinkingStepTimer(f),
                g.set(f, { display: "grid" }));
            });
          },
          void 0,
          "+=0.1",
        )
        .add(this.moveThinkingLogoToStep(n, a[0]), "<")
        .to(
          a,
          {
            autoAlpha: 1,
            y: 0,
            duration: x(0.3),
            ease: "power2.out",
            stagger: 0.04,
          },
          `<+=${jr}`,
        );
      const h = g.timeline();
      (this.addThinkingStepStreams(h, a), l.add(h));
      const m = h.duration() + 0.14 + da.progressDuration;
      return (
        l
          .to(
            o,
            {
              value: e.total,
              duration: da.progressDuration,
              ease: "power1.inOut",
              onUpdate: () => {
                const f = Math.max(1, Math.round(o.value)),
                  p = f / Math.max(1, e.total);
                (s.forEach(({ label: w, bar: b }) => {
                  (w && (w.textContent = `${f}/${e.total}`),
                    b && g.set(b, { scaleX: p }));
                }),
                  this.requestMessageScroll(n.message));
              },
            },
            "+=0.14",
          )
          .add(
            a.map((f) => this.createThinkingStepElapsedTimer(f, m)),
            `-=${m}`,
          )
          .to({}, { duration: da.finalHold }),
        a.forEach((f, p) => {
          l.add(this.foldThinkingStep(f, n.message), p === 0 ? void 0 : "<");
        }),
        l.add(this.collapseThinkingToHeader(n, i)),
        l
      );
    }
    sequencePerson(e, t) {
      const a = this.findSequenceEngagement(e),
        i = g.timeline({ defaults: { overwrite: "auto" } }),
        n = { value: 0 },
        o = { committed: !1, swaps: [] };
      if (!a) return i;
      const s = this.getSequenceCardRuntime(a, t),
        c = s.displayCard,
        l = s.templateCard,
        d = this.getActiveSequenceIndex(a);
      return !l || !c || d === t
        ? (this.setActiveSequencePerson(a, t, !0), i)
        : (i.call(
            () => {
              (this.setSequencePersonRailState(a, t, !0),
                (o.swaps = this.prepareSequencePersonContentSwaps(a, c, l, t)),
                this.setMotionHints(this.getSequencePersonSwapMotionTargets(o)),
                this.renderSequencePersonContentSwaps(o, n.value));
            },
            void 0,
            0,
          ),
          i
            .to(
              n,
              {
                value: 1,
                duration: J.totalDuration,
                ease: "none",
                onUpdate: () => {
                  this.renderSequencePersonContentSwaps(o, n.value);
                },
              },
              0,
            )
            .call(() => {
              this.commitSequencePersonContentSwaps(o);
            }),
          i.eventCallback("onInterrupt", () => {
            this.cleanupSequencePersonContentSwaps(o);
          }),
          i);
    }
    sequencePersonCardIntoView(e, t, a = {}) {
      const i = a.duration ?? x(0.28),
        n = a.offset ?? 20,
        o = g.timeline();
      return (
        o.add(
          this.scrollChatTargetToThreadTop(
            () => {
              const s = this.findSequenceEngagement(e);
              return s?.querySelector(".wa-sequence-people-wrap") ?? s;
            },
            { duration: i, offset: n },
          ),
          0,
        ),
        o.add(this.scrollSequenceRailToPerson(e, t, i), 0),
        o.call(() => {
          this.forceSequencePersonCardIntoView(e, t, n);
        }),
        o
      );
    }
    forceSequencePersonCardIntoView(e, t, a) {
      const i = this.findSequenceEngagement(e),
        n = i?.querySelector(".wa-sequence-people-wrap") ?? i;
      (n &&
        (this.stopScrollMotion(),
        this.updateThreadContentFitState(),
        (this.thread.scrollTop = this.getElementThreadTopScrollTarget(n, a))),
        i && this.setSequencePersonRailPosition(i, t));
    }
    scrollChatTargetToThreadTop(e, t) {
      const a = g.timeline();
      let i = this.thread.scrollTop,
        n = null;
      return (
        a.call(() => {
          ((n = e()),
            this.stopScrollMotion(),
            this.updateThreadContentFitState(),
            (i = n
              ? this.getElementThreadTopScrollTarget(n, t.offset)
              : this.thread.scrollTop));
        }),
        a.to(this.thread, {
          scrollTop: () => i,
          duration: t.duration,
          ease: X.revealEase,
          overwrite: "auto",
          onComplete: () => {
            this.scrollTween = null;
          },
        }),
        a.call(() => {
          i = n
            ? this.getElementThreadTopScrollTarget(n, t.offset)
            : this.thread.scrollTop;
        }),
        a.to(this.thread, {
          scrollTop: () => i,
          duration: x(0.12),
          ease: "power2.out",
          overwrite: "auto",
        }),
        a
      );
    }
    getElementThreadTopScrollTarget(e, t = 0) {
      const a = this.getThreadContentScale(),
        i = this.thread.getBoundingClientRect(),
        n = e.getBoundingClientRect(),
        o = this.thread.scrollTop + (n.top - i.top - t) / a;
      return Math.min(this.getThreadBottomScrollTarget(), Math.max(0, o));
    }
    scrollSequenceRailToPerson(e, t, a) {
      const i = { value: 0 },
        n = { rail: null, start: 0, target: 0 };
      return g
        .timeline()
        .call(() => {
          const o = this.findSequenceEngagement(e),
            s = o ? this.getSequenceRailRuntime(o, t) : null;
          ((i.value = 0),
            (n.rail = s?.rail ?? null),
            (n.start = n.rail?.scrollLeft ?? 0),
            (n.target = s
              ? this.getSequencePersonRailScrollTarget(s.rail, s.card)
              : n.start),
            n.rail &&
              (g.killTweensOf(n.rail, "scrollLeft"),
              (n.rail.dataset.sequenceCentering = "true")));
        })
        .to(i, {
          value: 1,
          duration: this.prefersReducedMotion ? 0.001 : a,
          ease: Wi.railCenterEase,
          onUpdate: () => {
            n.rail &&
              (n.rail.scrollLeft = n.start + (n.target - n.start) * i.value);
          },
          onComplete: () => {
            n.rail &&
              ((n.rail.scrollLeft = n.target),
              delete n.rail.dataset.sequenceCentering);
          },
          onInterrupt: () => {
            n.rail && delete n.rail.dataset.sequenceCentering;
          },
        });
    }
    sequenceStep(e, t) {
      const a = this.findSequenceEngagement(e),
        i = g.timeline();
      if (!a) return i;
      const n = this.getActiveSequenceIndex(a),
        o = this.getSequenceCardRuntime(a, n).displayCard;
      return o
        ? i.call(() => {
            this.selectSequenceStep(o, t, { cancelPersonTransition: !0 });
          })
        : i;
    }
    enrollmentProgress(e = {}) {
      const t = Math.max(1, Math.round(e.total ?? 50)),
        a = { value: 0 },
        i = this.createThinkingStep(
          {
            label: e.label ?? ae.queueLabel,
            detail: e.detail ?? ae.queueDetail,
            disclosure: Ht,
            toolCalls: [],
          },
          0,
        ),
        n = this.createThinkingStep(
          {
            label: ae.mailboxLabel,
            detail: ae.mailboxDetail,
            disclosure: Vt,
            toolCalls: [],
          },
          1,
        ),
        o = this.createThinkingStep(
          {
            label: ae.sendLabel(0, t),
            detail: "",
            disclosure: Vt,
            toolCalls: [],
          },
          2,
        ),
        s = this.createSequenceEnrollmentProgress(t),
        c = s.querySelector("[data-sequence-enrollment-count]"),
        l = s.querySelector("[data-sequence-enrollment-fill]"),
        d = o.querySelector(".wa-research-step__body"),
        u = [i, n, o],
        h = this.claimThinkingMessage(u, ae.title, ae.completeTitle),
        m = e.duration ?? ae.duration,
        f = this.createThinkingStepReveal(i),
        p = this.createThinkingStepReveal(n),
        w = this.createThinkingStepReveal(o),
        b = this.createSequenceEnrollmentMailBurst(s, t, m),
        A = f.duration() + ae.queueHold,
        v = p.duration() + ae.mailboxHold,
        _ = w.duration() + ae.progressDelay + Math.max(m, b.duration()),
        y = g.timeline();
      return (
        d && d.append(s),
        y
          .call(() => {
            (this.prepareThinkingMessage(h, u, 6),
              g.set(s, { autoAlpha: 0, y: 3 }),
              g.set(l, { scaleX: 0, transformOrigin: "left center" }));
          })
          .add(this.revealMessage(h.message))
          .add(this.revealThinkingHeader(h, 0.24))
          .call(() => this.activateThinkingStep(u, 0))
          .add(this.moveThinkingLogoToStep(h, i), "<")
          .add(f, "<")
          .to({}, { duration: ae.queueHold })
          .add(this.createThinkingStepElapsedTimer(i, A), `-=${A}`)
          .add(this.foldThinkingStep(i, h.message))
          .call(() => this.activateThinkingStep(u, 1), void 0, "+=0.1")
          .add(this.moveThinkingLogoToStep(h, n), "<")
          .add(p, "<")
          .to({}, { duration: ae.mailboxHold })
          .add(this.createThinkingStepElapsedTimer(n, v), `-=${v}`)
          .add(this.foldThinkingStep(n, h.message))
          .call(() => this.activateThinkingStep(u, 2), void 0, "+=0.1")
          .add(this.moveThinkingLogoToStep(h, o), "<")
          .add(w, "<")
          .addLabel("enrollment-progress", `+=${ae.progressDelay}`)
          .to(
            s,
            { autoAlpha: 1, y: 0, duration: x(0.18), ease: "power2.out" },
            "enrollment-progress-=0.02",
          )
          .to(
            a,
            {
              value: t,
              duration: m,
              ease: "power1.inOut",
              onUpdate: () => {
                const E = Math.min(t, Math.max(0, Math.round(a.value))),
                  k = ae.sendLabel(E, t),
                  C = E / t;
                (this.setThinkingStepLabel(o, k),
                  c && (c.textContent = `${E}/${t}`),
                  l && g.set(l, { scaleX: C }),
                  this.requestMessageScroll(h.message));
              },
            },
            "enrollment-progress",
          )
          .add(b, "enrollment-progress")
          .add(this.createThinkingStepElapsedTimer(o, _), `-=${_}`)
          .add(this.completeProgressThinking(h, u, ae.completeTitle))
          .to({}, { duration: ae.finalHold })
      );
    }
    createSequenceEnrollmentProgress(e) {
      const t = document.createElement("span"),
        a = document.createElement("span"),
        i = document.createElement("span"),
        n = document.createElement("span");
      return (
        (t.className = "wa-sequence-thinking-progress"),
        (t.dataset.sequenceEnrollmentProgress = "true"),
        (a.className = "wa-sequence-thinking-progress__count"),
        (a.dataset.sequenceEnrollmentCount = ""),
        (a.textContent = `0/${e}`),
        (i.className = "wa-sequence-thinking-progress__bar"),
        (n.dataset.sequenceEnrollmentFill = ""),
        n.setAttribute("aria-hidden", "true"),
        i.append(n),
        t.append(a, i),
        t
      );
    }
    setThinkingStepLabel(e, t) {
      const a = e.querySelector(".wa-research-step__label");
      a &&
        ((a.dataset.activeText = t),
        (a.dataset.collapsedText = this.getPastTenseThinkingTitle(t)),
        (a.dataset.fullText = t),
        (a.textContent = t),
        delete a.dataset.streaming);
    }
    createSequenceEnrollmentMailBurst(e, t, a) {
      const i = g.timeline();
      if (this.prefersReducedMotion) return i;
      const n = Math.max(1, Math.round(t)),
        o = a / n;
      for (let s = 0; s < n; s += 1)
        i.add(this.createSequenceEnrollmentMailParticle(e, s, n), s * o);
      return i;
    }
    createSequenceEnrollmentMailParticle(e, t, a) {
      const i = { progress: 0, icon: null, flight: null },
        n = () => {
          i.icon &&
            (g.killTweensOf(i.icon),
            i.icon.remove(),
            (i.icon = null),
            (i.flight = null));
        };
      return g
        .timeline({ onInterrupt: n, onReverseComplete: n })
        .call(() => {
          n();
          const o = this.getSequenceEnrollmentMailFlight(e, t);
          if (!o) return;
          const s = this.createSequenceEnrollmentMailIcon(t + 1, a);
          ((i.progress = 0),
            (i.flight = o),
            (i.icon = s),
            this.stage.append(s),
            g.set(s, {
              left: o.startX,
              top: o.startY,
              x: 0,
              y: 0,
              rotation: o.startRotation,
              scale: o.scale * 0.72,
              autoAlpha: 0,
            }));
        })
        .to(
          i,
          {
            progress: 1,
            duration: this.getSequenceEnrollmentMailParticleDuration(t),
            ease: "none",
            onUpdate: () => this.renderSequenceEnrollmentMailParticle(i),
          },
          0,
        )
        .call(n);
    }
    createSequenceEnrollmentMailIcon(e, t) {
      const a = document.createElement("span");
      return (
        (a.className = "wa-enrollment-mail"),
        (a.dataset.enrollmentMail = String(e)),
        a.setAttribute("aria-hidden", "true"),
        a.append(
          this.createSvgIcon(
            "wa-enrollment-mail__icon",
            [
              "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
              "M3 7l9 6l9 -6",
            ],
            { size: ee.iconSize },
          ),
        ),
        a.style.setProperty("--wa-enrollment-mail-index", String(e)),
        a.style.setProperty("--wa-enrollment-mail-total", String(t)),
        a
      );
    }
    getSequenceEnrollmentMailFlight(e, t) {
      if (!e.isConnected) return null;
      const a = e.getBoundingClientRect(),
        i = this.stage.getBoundingClientRect();
      if (!a.width || !a.height || !i.width || !i.height) return null;
      const n = this.sequenceEnrollmentMailRandom(t, 1),
        o = this.sequenceEnrollmentMailRandom(t, 2),
        s = this.sequenceEnrollmentMailRandom(t, 3),
        c = this.sequenceEnrollmentMailRandom(t, 4),
        l = this.sequenceEnrollmentMailRandom(t, 5),
        d = this.sequenceEnrollmentMailRandom(t, 6),
        u = ee.iconSize,
        h = a.left + Math.min(a.width - 6, a.width * (0.55 + n * 0.34)),
        m = a.top + a.height * (0.42 + o * 0.16),
        f = h - i.left - u / 2,
        p = Math.min(Math.max(u * -1, f), Math.max(u * -1, i.width - u)),
        w = m - i.top - u / 2,
        b = window.visualViewport
          ? window.visualViewport.offsetTop + window.visualViewport.height
          : window.innerHeight,
        A = Math.max(
          ee.minExitY,
          b - m + ee.exitOvershootMin + s * ee.exitOvershootRange,
        ),
        v = Math.max(ee.minFadeStartY, b - m - u - ee.fadeMargin);
      return {
        startX: p,
        startY: w,
        launchX: (n - 0.5) * ee.launchXRange,
        driftX: (c - 0.5) * ee.driftXRange,
        apexY: -1 * (ee.apexYMin + o * ee.apexYRange),
        fadeStartY: Math.min(v, A - 12),
        exitY: A,
        scale: 1 - ee.scaleRange / 2 + l * ee.scaleRange,
        startRotation: (d - 0.5) * ee.rotationRange,
        endRotation: (s - 0.5) * 130 + (t % 2 === 0 ? 1 : -1) * 48,
        duration: this.getSequenceEnrollmentMailParticleDuration(t),
      };
    }
    getSequenceEnrollmentMailParticleDuration(e) {
      return (
        ee.launchDuration +
        ee.fallDurationMin +
        this.sequenceEnrollmentMailRandom(e, 4) * ee.fallDurationRange
      );
    }
    renderSequenceEnrollmentMailParticle(e) {
      const { icon: t, flight: a } = e;
      if (!t || !a) return;
      const i = this.clampUnit(e.progress),
        n = ee.launchSplit,
        o = this.clampUnit(i / n),
        s = this.clampUnit((i - n) / (1 - n)),
        c = this.easeOutQuad(o),
        l = s * s,
        d = i <= n ? a.launchX * c : a.launchX + a.driftX * this.easeOutQuad(s),
        u = i <= n ? a.apexY * c : a.apexY + (a.exitY - a.apexY) * l,
        h = this.clampUnit(
          (u - a.fadeStartY) / Math.max(1, a.exitY - a.fadeStartY),
        ),
        f = this.clampUnit(i / 0.08) * (1 - h),
        p =
          a.startRotation +
          (a.endRotation - a.startRotation) * this.easeOutQuad(i),
        w = a.scale * (0.72 + 0.28 * this.easeOutBack(Math.min(1, o * 1.2)));
      g.set(t, { x: d, y: u, rotation: p, scale: w, autoAlpha: f });
    }
    sequenceEnrollmentMailRandom(e, t) {
      const a = Math.sin((e + 1) * 12.9898 + t * 78.233) * 43758.5453;
      return a - Math.floor(a);
    }
    clampUnit(e) {
      return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0;
    }
    easeOutQuad(e) {
      return 1 - (1 - e) * (1 - e);
    }
    easeOutBack(e) {
      const a = e - 1;
      return 1 + (2.70158 * a * a * a + 1.70158 * a * a);
    }
    playSequencePersonInteraction(e, t) {
      this.activeSequencePersonTimelines.get(e)?.kill();
      const a = this.sequencePerson(e, t),
        i = a.eventCallback("onComplete"),
        n = a.eventCallback("onInterrupt"),
        o = () => {
          this.activeSequencePersonTimelines.get(e) === a &&
            this.activeSequencePersonTimelines.delete(e);
        };
      a.duration() <= 0 ||
        (this.activeSequencePersonTimelines.set(e, a),
        a.eventCallback("onComplete", () => {
          (i?.(), o());
        }),
        a.eventCallback("onInterrupt", () => {
          (n?.(), o());
        }));
    }
    clearSequencePersonTimelines() {
      (this.activeSequencePersonTimelines.forEach((e) => e.kill()),
        this.activeSequencePersonTimelines.clear());
    }
    sequenceKickoff(e) {
      return g.timeline().call(() => {
        const t = this.findSequenceEngagement(e),
          a = t?.querySelector("[data-sequence-kickoff]"),
          i = a?.querySelector(".wa-sequence-kickoff__label");
        !t ||
          !a ||
          ((t.dataset.sequenceLaunched = "true"),
          (a.dataset.processing = "true"),
          a.setAttribute("aria-busy", "true"),
          a.setAttribute("aria-label", "Enrolling"),
          i && (i.textContent = "Enrolling"));
      });
    }
    prepareCsvDropArea(e = {}) {
      const t = this.createCsvDropArea(e);
      return (
        this.registerTransientElement(t, () => this.clearDropRevealWatcher(t)),
        {
          el: t,
          reveal: () => this.revealCsvDropArea(t),
          revealWhenCursorEnters: (a) =>
            this.revealCsvDropAreaWhenCursorEnters(t, a),
          activate: () => this.activateCsvDropArea(t),
          complete: () => this.completeCsvDropArea(t),
        }
      );
    }
    prepareCursorFile(e, t, a = "CSV", i = []) {
      const n = this.createCursorFile(e, a, i);
      let o = null,
        s = { x: 0, y: 0 };
      const c = () => {
        (o?.(), (o = null), g.killTweensOf(s));
      };
      return (
        this.registerTransientElement(n, () => {
          c();
        }),
        {
          el: n,
          startFollow: () =>
            g
              .timeline()
              .call(() => {
                (o?.(), t.beginDragPayload());
                const l = this.getCursorFileEntryOffset(n, t);
                ((s.x = l.x),
                  (s.y = l.y),
                  (o = this.followCursorWithFile(n, t, s)));
              })
              .set(n, { autoAlpha: 1, scale: 1 }, 0)
              .to(
                s,
                {
                  x: 0,
                  y: 0,
                  duration: Ji.pullInDuration,
                  ease: Ji.pullInEase,
                },
                0,
              ),
          stopFollow: () =>
            g
              .timeline()
              .call(c)
              .to(n, {
                autoAlpha: 0,
                scale: 0.92,
                duration: x(0.18),
                ease: "power2.in",
              }),
          releaseAtDrop: () =>
            g.timeline().call(c).add(t.releaseDragPayload(), 0),
          landAsUploadedFile: (l, d = "CSV uploaded", u = {}) =>
            g
              .timeline()
              .call(c)
              .add(this.uploadedFileMessageFromCursorFile(n, l, d, u), 0),
          landAsUploadedFiles: (l) =>
            g
              .timeline()
              .call(c)
              .add(this.uploadedFilesMessageFromCursorFile(n, l), 0),
        }
      );
    }
    uploadedFileMessage(e, t = "CSV uploaded") {
      const a = this.createUploadedFile(e, t),
        i = this.claimUserComponentMessage("file", a);
      return this.revealMessageWithChildFrom(
        i,
        a,
        { autoAlpha: 0, y: 8, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: x(0.26),
          ease: "back.out(1.6)",
        },
      );
    }
    uploadedFileMessageFromCursorFile(e, t, a = "CSV uploaded", i = {}) {
      const n = this.createUploadedFile(t, a),
        o = this.claimUserComponentMessage("file", n);
      return this.revealDroppedFilesMessage(e, o, [n], [], i);
    }
    uploadedFilesMessage(e) {
      const t = this.createUploadedFiles(e);
      return this.revealUserComponentItems("file", t, ".wa-uploaded-file", {
        ...He.compactRow,
        from: { ...He.compactRow.from, scale: 0.99 },
        to: { ...He.compactRow.to, scale: 1 },
        position: "-=0.24",
      });
    }
    uploadedFilesMessageFromCursorFile(e, t) {
      const a = this.createUploadedFiles(t),
        i = this.claimUserComponentMessage("file", a),
        n = this.queryElements(a, ".wa-uploaded-file"),
        o = this.queryElements(a, ".wa-uploaded-files__summary");
      return this.revealDroppedFilesMessage(e, i, n, o, {
        landingLabel: this.getUploadedFilesLandingLabel(t.length),
      });
    }
    getUploadedFilesLandingLabel(e) {
      return e === 4 ? "You uploaded four files" : `You uploaded ${e} files`;
    }
    pulse(e) {
      const t = typeof e == "string" ? this.root.querySelector(e) : e,
        a = g.timeline();
      return (
        t &&
          a
            .to(t, { scale: 1.025, duration: x(0.14), ease: "power2.out" })
            .to(t, {
              scale: 1,
              duration: x(0.28),
              ease: "elastic.out(1, 0.55)",
            }),
        a
      );
    }
    revealDroppedFilesMessage(e, t, a, i = [], n = {}) {
      const o = [...a, ...i];
      let s = [],
        c = null;
      const l = { value: 0 };
      let d = 0,
        u = 0;
      const h = n.preserveScroll ?? !1;
      if (!a.length || !e.isConnected)
        return this.revealMessageWithChildren(t, o, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: x(0.24),
          ease: "power2.out",
          stagger: Ue.stagger,
        });
      g.set(o, { autoAlpha: 0, y: 0, scale: 1 });
      const m = g.timeline().call(() => {
        ((u = this.thread.scrollTop),
          this.scrollTween?.kill(),
          (this.scrollTween = null),
          (t.style.display = "grid"),
          g.set(t, {
            opacity: 1,
            visibility: "hidden",
            y: 0,
            scale: 1,
            transformOrigin: "right center",
          }),
          (d = h ? u : this.getMessageScrollTarget(t)),
          h || (this.thread.scrollTop = d),
          (s = this.createFileLandingClones(e, a)),
          (c = this.createFileLandingLabel(n.landingLabel, s, i[0] ?? null)),
          (this.thread.scrollTop = u),
          g.set(e, { autoAlpha: 0 }));
      });
      return (
        h ||
          m.to(
            this.thread,
            {
              scrollTop: () => d,
              duration: Ue.duration,
              ease: Ue.ease,
              overwrite: "auto",
            },
            0,
          ),
        m
          .to(
            l,
            {
              value: 1,
              duration: Ue.duration,
              ease: Ue.ease,
              onUpdate: () => {
                (this.renderFileLandingClones(s, l.value),
                  this.renderFileLandingLabel(c, l.value));
              },
            },
            0,
          )
          .to(
            i,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: x(0.16),
              ease: "power1.out",
              stagger: Ue.stagger,
            },
            `-=${x(0.16)}`,
          )
          .call(() => {
            (this.renderFileLandingClones(s, 1),
              this.renderFileLandingLabel(c, 1),
              (this.thread.scrollTop = h ? u : d),
              g.set(o, { autoAlpha: 1, y: 0, scale: 1 }),
              g.set(t, { opacity: 1, visibility: "visible" }),
              s.forEach((f) => f.el.remove()),
              c?.el.remove(),
              e.remove());
          })
      );
    }
    createFileLandingClones(e, t) {
      const a = this.getCursorFileCards(e),
        i = this.chatBody;
      return t.map((n, o) => {
        const c = a[Math.min(o, a.length - 1)].getBoundingClientRect(),
          l = n.getBoundingClientRect(),
          d = this.getElementLocalRect(c, i),
          u = this.getElementLocalRect(l, i),
          h = n.cloneNode(!0),
          m = this.getCursorFileCardRotation(o, a.length),
          f = window.getComputedStyle(n),
          p = d.left + (c.width - l.width) * 0.5,
          w = d.top + (c.height - l.height) * 0.5;
        return (
          h.classList.add("wa-file-landing-clone"),
          (h.dataset.fileLandingClone = ""),
          i.append(h),
          g.set(h, {
            position: "absolute",
            zIndex: 21,
            top: 0,
            left: 0,
            width: l.width,
            minWidth: l.width,
            maxWidth: l.width,
            height: l.height,
            minHeight: l.height,
            x: p,
            y: w,
            scaleX: 1,
            scaleY: 1,
            rotation: m,
            transformOrigin: "left top",
            pointerEvents: "none",
            margin: 0,
            autoAlpha: 1,
            visibility: "visible",
            backgroundColor: f.backgroundColor,
            borderColor: f.borderTopColor,
            borderStyle:
              f.borderTopStyle === "none" ? "solid" : f.borderTopStyle,
            borderWidth: f.borderTopWidth || "1px",
            boxShadow: this.getFileLandingShadow(0),
          }),
          {
            el: h,
            startX: p,
            startY: w,
            startWidth: c.width,
            startHeight: c.height,
            endX: u.left,
            endY: u.top,
            endWidth: l.width,
            endHeight: l.height,
            startRotation: m,
            setX: g.quickSetter(h, "x", "px"),
            setY: g.quickSetter(h, "y", "px"),
            setRotation: g.quickSetter(h, "rotation", "deg"),
          }
        );
      });
    }
    renderFileLandingClones(e, t) {
      for (const a of e)
        (a.setX(this.interpolate(a.startX, a.endX, t)),
          a.setY(this.interpolate(a.startY, a.endY, t)),
          a.setRotation(this.interpolate(a.startRotation, 0, t)),
          (a.el.style.boxShadow = this.getFileLandingShadow(t)));
    }
    createFileLandingLabel(e, t, a) {
      if (!e || !t.length) return null;
      const i = document.createElement("div");
      ((i.className = "wa-file-landing-label"),
        (i.textContent = e),
        this.chatBody.append(i),
        g.set(i, {
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 22,
          pointerEvents: "none",
          opacity: 1,
          visibility: "visible",
          x: 0,
          y: 0,
        }));
      const n = a
          ? this.getElementLocalRect(a.getBoundingClientRect(), this.chatBody)
          : null,
        o = i.offsetWidth,
        s = i.offsetHeight,
        c = 9,
        l = this.getFileLandingCloneBounds(t, "end"),
        d = n?.left ?? l.left + l.width / 2 - o / 2,
        u = n?.top ?? l.top - s - c;
      return (
        g.set(i, { x: d, y: u }),
        { el: i, setOpacity: g.quickSetter(i, "opacity") }
      );
    }
    renderFileLandingLabel(e, t) {
      e && e.setOpacity(1);
    }
    getFileLandingCloneBounds(e, t) {
      const a = e.map((m) => (t === "start" ? m.startX : m.endX)),
        i = e.map((m) => (t === "start" ? m.startY : m.endY)),
        n = e.map((m) => (t === "start" ? m.startWidth : m.endWidth)),
        o = e.map((m) => (t === "start" ? m.startHeight : m.endHeight)),
        s = e.map((m, f) => a[f] + n[f]),
        c = e.map((m, f) => i[f] + o[f]),
        l = Math.min(...a),
        d = Math.min(...i),
        u = Math.max(...s),
        h = Math.max(...c);
      return { left: l, top: d, width: u - l, height: h - d };
    }
    getCursorFileCards(e) {
      const t = Array.from(e.querySelectorAll(".wa-cursor-file__card"));
      return t.length ? t : [e];
    }
    getCursorFileCardRotation(e, t) {
      return t > 1 ? (Ue.rotations[e] ?? 0) : 0;
    }
    getElementLocalRect(e, t) {
      const a = t.getBoundingClientRect();
      return { left: e.left - a.left, top: e.top - a.top };
    }
    interpolate(e, t, a) {
      return e + (t - e) * a;
    }
    getFileLandingShadow(e) {
      const t = 1 - e;
      return `0 ${this.interpolate(Ue.shadowY, 0, e).toFixed(2)}px ${this.interpolate(Ue.shadowBlur, 0, e).toFixed(2)}px rgba(23, 23, 20, ${(Ue.shadowAlpha * t).toFixed(3)})`;
    }
    revealMessageWithChildren(e, t, a, i = "-=0.22", n = null, o = 0, s = {}) {
      return g
        .timeline()
        .add(this.revealMessage(e, n, o, s))
        .call(() => this.setMotionHints(t), void 0, i)
        .to(t, a, i)
        .call(() => this.clearMotionHints(t));
    }
    revealMessageWithChildFrom(e, t, a, i, n = "-=0.22") {
      return g
        .timeline()
        .add(this.revealMessage(e))
        .call(() => this.setMotionHints(t), void 0, n)
        .fromTo(t, a, i, n)
        .call(() => this.clearMotionHints(t));
    }
    revealComponentItems(e, t, a, i, n = null, o = {}) {
      const s = this.claimComponentMessage(e, t);
      return this.revealPreparedItems(
        s,
        this.resolveRevealTargets(t, a),
        i,
        n,
        o,
      );
    }
    revealUserComponentItems(e, t, a, i) {
      const n = this.claimUserComponentMessage(e, t);
      return this.revealPreparedItems(n, this.resolveRevealTargets(t, a), i);
    }
    resolveRevealTargets(e, t) {
      return typeof t == "string" ? this.queryElements(e, t) : t;
    }
    revealPreparedItems(e, t, a, i = null, n = {}) {
      t.length && g.set(t, { ...a.from });
      const o = n.scrollOffset ?? 0,
        s = n.preserveScroll ?? !1,
        c = this.revealMessageWithChildren(
          e,
          t,
          { ...a.to },
          a.position,
          i,
          o,
          { preserveScroll: s },
        );
      return s
        ? c
        : (c.call(
            () => this.animateMessageScrollIntoView(e, X.followDuration, i, o),
            void 0,
            X.componentFollowDelay,
          ),
          c.call(
            () => this.animateMessageScrollIntoView(e, X.followDuration, i, o),
            void 0,
            "+=0.02",
          ));
    }
    revealMessage(e, t = null, a = 0, i = {}) {
      let n = 0,
        o = 0;
      const s = i.preserveScroll ?? !1,
        c = e.classList.contains("wa-message--component")
          ? X.componentRevealDelay
          : 0.04,
        l = g.timeline().call(() => {
          ((o = this.thread.scrollTop),
            this.scrollTween?.kill(),
            (this.scrollTween = null),
            (e.style.display = "grid"),
            this.setMotionHints(e),
            this.forceThreadLayout(e),
            this.updateThreadContentFitState(),
            s && (e.dataset.preserveMessageScroll = "true"),
            this.composerVisible && !s && this.pinThreadToBottom(),
            (n = s ? o : this.getMessageScrollTarget(e, t, a)),
            s && (this.thread.scrollTop = o));
        });
      return (
        s ||
          l.to(
            this.thread,
            {
              scrollTop: () => n,
              duration: X.revealDuration,
              ease: X.revealEase,
              overwrite: "auto",
            },
            0,
          ),
        l
          .to(
            e,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              ...vc,
              onUpdate: s
                ? () => {
                    this.thread.scrollTop = o;
                  }
                : void 0,
              onComplete: s
                ? () => {
                    this.thread.scrollTop = o;
                  }
                : void 0,
            },
            c,
          )
          .call(() => this.clearMotionHints(e))
      );
    }
    forceThreadLayout(e) {
      (e.offsetHeight, this.thread.scrollHeight);
    }
    observeThreadContentFit() {
      (this.threadContentResizeObserver?.disconnect(),
        this.threadContentMutationObserver?.disconnect(),
        typeof ResizeObserver < "u" &&
          ((this.threadContentResizeObserver = new ResizeObserver(() =>
            this.requestThreadContentFitUpdate(),
          )),
          this.threadContentResizeObserver.observe(this.stage),
          this.threadContentResizeObserver.observe(this.browserWindow),
          this.threadContentResizeObserver.observe(this.chatBody),
          this.threadContentResizeObserver.observe(this.thread)),
        typeof MutationObserver < "u" &&
          ((this.threadContentMutationObserver = new MutationObserver((e) => {
            this.shouldIgnoreThreadContentFitMutations(e) ||
              this.requestThreadContentFitUpdate();
          })),
          this.threadContentMutationObserver.observe(this.thread, {
            attributes: !0,
            attributeFilter: [
              "class",
              "style",
              "data-active",
              "data-step-open",
              "data-step-selected",
            ],
            characterData: !0,
            childList: !0,
            subtree: !0,
          })),
        this.requestThreadContentFitUpdate());
    }
    requestThreadContentFitUpdate() {
      this.threadContentFitFrame === null &&
        (this.threadContentFitFrame = requestAnimationFrame(() => {
          ((this.threadContentFitFrame = null),
            this.updateThreadContentFitState());
        }));
    }
    shouldIgnoreThreadContentFitMutations(e) {
      return (
        e.length > 0 &&
        e.every((t) => {
          if (
            (t.type === "attributes" &&
              t.target === this.thread &&
              t.attributeName === "style") ||
            (t.type === "attributes" &&
              t.target instanceof Element &&
              t.target.closest(".wa-enrollment-mail"))
          )
            return !0;
          if (t.type !== "childList") return !1;
          const a = [
            ...Array.from(t.addedNodes),
            ...Array.from(t.removedNodes),
          ];
          return (
            a.length > 0 &&
            a.every(
              (i) =>
                i instanceof HTMLElement &&
                i.classList.contains("wa-enrollment-mail"),
            )
          );
        })
      );
    }
    updateThreadContentFitState() {
      (this.updateMarketingDataGridScales(), this.applyWindowSceneScale());
      const e = this.getVisibleThreadContentHeight(),
        t = Math.max(this.thread.clientHeight, this.chatBody.clientHeight);
      e > this.maxVisibleThreadContentHeight &&
        (this.maxVisibleThreadContentHeight = e);
      const a = Math.max(e, this.maxVisibleThreadContentHeight),
        i = Math.max(0, a - e),
        n = a > 0 && t > 0 && a <= t - 1;
      if (!e || !t) {
        (delete this.chatBody.dataset.chatContentFit,
          delete this.thread.dataset.threadContentFit,
          this.thread.style.removeProperty("--wa-thread-growth-spacer"));
        return;
      }
      const o = n ? "short" : "overflow";
      (this.thread.style.setProperty(
        "--wa-thread-growth-spacer",
        `${Math.ceil(i * 100) / 100}px`,
      ),
        (this.chatBody.dataset.chatContentFit = o),
        (this.thread.dataset.threadContentFit = o));
    }
    clearThreadContentFitState() {
      ((this.maxVisibleThreadContentHeight = 0),
        delete this.chatBody.dataset.chatContentFit,
        delete this.thread.dataset.threadContentFit,
        this.thread.style.removeProperty("--wa-thread-growth-spacer"),
        this.thread.style.removeProperty("--wa-thread-base-bottom-padding"),
        this.clearWindowSceneScaleState());
    }
    applyWindowSceneScale() {
      const e = this.getWindowSceneBaseSize(),
        t = this.getWindowSceneAvailableWidth(),
        a = Math.max(e.width, this.getWindowSceneBaseWidth());
      if (t >= a - 0.5) {
        this.clearWindowSceneScaleState();
        return;
      }
      const i = Number(Math.max(0.01, t / a).toFixed(4)),
        n = String(i),
        o = `${Math.ceil(a)}px`,
        s = `${Math.ceil(e.height * i)}px`,
        c = `${Math.ceil(e.height)}px`;
      ((this.stage.dataset.windowContentScale = "scaled"),
        this.stage.style.getPropertyValue("--wa-window-scene-scale") !== n &&
          this.stage.style.setProperty("--wa-window-scene-scale", n),
        this.stage.style.getPropertyValue("--wa-window-scene-width") !== o &&
          this.stage.style.setProperty("--wa-window-scene-width", o),
        this.stage.style.getPropertyValue("--wa-window-scene-height") !== s &&
          this.stage.style.setProperty("--wa-window-scene-height", s),
        this.stage.style.getPropertyValue(
          "--wa-window-scene-unscaled-height",
        ) !== c &&
          this.stage.style.setProperty("--wa-window-scene-unscaled-height", c));
    }
    clearWindowSceneScaleState() {
      (delete this.stage.dataset.windowContentScale,
        this.stage.style.removeProperty("--wa-window-scene-scale"),
        this.stage.style.removeProperty("--wa-window-scene-width"),
        this.stage.style.removeProperty("--wa-window-scene-height"),
        this.stage.style.removeProperty("--wa-window-scene-unscaled-height"));
    }
    getThreadContentScale() {
      const e = Number.parseFloat(
        this.stage.style.getPropertyValue("--wa-window-scene-scale"),
      );
      return Number.isFinite(e) && e > 0 ? e : 1;
    }
    getWindowSceneAvailableWidth() {
      const e = this.stage.clientWidth;
      if (e > 0) return e;
      const t = this.stage.parentElement?.clientWidth ?? 0;
      return t > 0 ? t : this.root.clientWidth;
    }
    getWindowSceneBaseWidth() {
      const e = window
          .getComputedStyle(this.stage)
          .getPropertyValue("--wa-window-scene-min-width")
          .trim(),
        t = Number.parseFloat(e);
      return Number.isFinite(t) && t > 0 ? t : 0;
    }
    getWindowSceneBaseSize() {
      const e = this.getWindowSceneMeasure();
      ((e.style.width = "var(--wa-window-width)"),
        (e.style.height = "var(--wa-window-height)"));
      const t = e.offsetWidth || this.browserWindow.offsetWidth,
        a = e.offsetHeight || this.browserWindow.offsetHeight;
      return { width: Math.max(1, t), height: Math.max(1, a) };
    }
    getWindowSceneMeasure() {
      if (this.windowSceneMeasure) return this.windowSceneMeasure;
      const e = document.createElement("div");
      return (
        e.setAttribute("aria-hidden", "true"),
        (e.style.position = "absolute"),
        (e.style.left = "-10000px"),
        (e.style.top = "0"),
        (e.style.display = "block"),
        (e.style.visibility = "hidden"),
        (e.style.pointerEvents = "none"),
        (e.style.overflow = "hidden"),
        (e.style.contain = "strict"),
        this.stage.append(e),
        (this.windowSceneMeasure = e),
        e
      );
    }
    getVisibleThreadContentBounds() {
      const e = Array.from(this.thread.children).filter(
        (i) => i instanceof HTMLElement && this.isMeasurableThreadChild(i),
      );
      if (!e.length) return null;
      const t = Math.min(...e.map((i) => i.offsetTop)),
        a = Math.max(...e.map((i) => i.offsetTop + i.offsetHeight));
      return { top: t, bottom: a, height: Math.max(0, a - t) };
    }
    getVisibleThreadContentHeight() {
      return this.getVisibleThreadContentBounds()?.height ?? 0;
    }
    getVisibleThreadContentBottom() {
      return this.getVisibleThreadContentBounds()?.bottom ?? 0;
    }
    isMeasurableThreadChild(e) {
      const t = window.getComputedStyle(e);
      return (
        t.display !== "none" && t.visibility !== "hidden" && e.offsetHeight > 0
      );
    }
    setMotionHints(e, t = "transform, opacity") {
      g.set(e, { willChange: t });
    }
    clearMotionHints(e) {
      g.set(e, { willChange: "auto" });
    }
    claimMessage(e, t) {
      const { message: a, body: i } = this.claimMessageShell(
        e,
        e,
        e === "user" ? "right center" : "left center",
      );
      return (i.replaceChildren(document.createTextNode(t)), a);
    }
    claimComponentMessage(e, t) {
      const { message: a, body: i } = this.claimMessageShell(
        "assistant",
        "assistant-component",
        "left center",
      );
      return (
        a.classList.add("wa-message--component", `wa-message--${e}`),
        i.replaceChildren(t),
        a
      );
    }
    claimUserComponentMessage(e, t) {
      const { message: a, body: i } = this.claimMessageShell(
        "user",
        "user",
        "right center",
      );
      return (
        a.classList.add("wa-message--component", `wa-message--${e}`),
        i.replaceChildren(t),
        a
      );
    }
    claimMessageShell(e, t, a) {
      const i = this.messageIndex,
        n = this.messagePool[i] ?? this.createMessage(i),
        o = this.getMessageBody(n);
      return (
        (this.messageIndex += 1),
        (n.dataset.messageRole = e),
        (n.dataset.messageId = `${t}-${i}`),
        this.resetMessageClasses(n),
        n.classList.toggle("wa-message--first-active", i === 0),
        (n.style.display = "none"),
        delete o.dataset.streaming,
        o.replaceChildren(),
        this.thread.append(n),
        g.set(n, { autoAlpha: 0, y: 16, scale: 0.985, transformOrigin: a }),
        { message: n, body: o, index: i }
      );
    }
    resetMessageClasses(e) {
      (e.classList.remove(...hc),
        e.classList.remove("wa-message--first-active"));
    }
    createCsvDropArea(e = {}) {
      const t = document.createElement("article");
      ((t.className = "wa-csv-drop"),
        (t.dataset.csvDropArea = ""),
        (t.dataset.dropState = "idle"));
      const a = document.createElement("span");
      a.className = "wa-csv-drop__copy";
      const i = document.createElement("strong");
      return (
        (i.textContent = "Add files to chat"),
        a.append(i),
        t.append(a),
        t
      );
    }
    revealCsvDropArea(e) {
      return g.timeline().to(
        {},
        {
          duration: 0.001,
          onStart: () => {
            this.showCsvDropArea(e, !0);
          },
        },
      );
    }
    revealCsvDropAreaWhenCursorEnters(e, t) {
      return g.timeline().to(
        {},
        {
          duration: 0.001,
          onStart: () => {
            if (
              (this.clearDropRevealWatcher(e),
              e.dataset.dropComplete === "true")
            )
              return;
            if (this.isCursorInsideChatShell(t)) {
              this.showCsvDropArea(e, !1);
              return;
            }
            const a = () => {
                if (e.dataset.dropComplete === "true") {
                  this.clearDropRevealWatcher(e);
                  return;
                }
                this.isCursorInsideChatShell(t) &&
                  (this.clearDropRevealWatcher(e), this.showCsvDropArea(e, !1));
              },
              i = () => g.ticker.remove(a);
            (this.dropRevealWatchers.set(e, i), g.ticker.add(a));
          },
        },
      );
    }
    activateCsvDropArea(e) {
      return g.timeline().to(
        {},
        {
          duration: 0.001,
          onStart: () => {
            e.dataset.dropState = "active";
          },
        },
      );
    }
    completeCsvDropArea(e) {
      return g.timeline().to(
        {},
        {
          duration: 0.001,
          onStart: () => {
            ((e.dataset.dropState = "complete"),
              (e.dataset.dropComplete = "true"),
              this.clearDropRevealWatcher(e),
              g.killTweensOf(e),
              g.set(e, { autoAlpha: 0 }),
              e.remove());
          },
        },
      );
    }
    showCsvDropArea(e, t) {
      e.dataset.dropComplete !== "true" &&
        ((t || !e.dataset.dropState) && (e.dataset.dropState = "idle"),
        e.isConnected || this.chatShell.append(e),
        g.set(e, { autoAlpha: 1, transformOrigin: "center center" }));
    }
    clearDropRevealWatcher(e) {
      const t = this.dropRevealWatchers.get(e);
      t && (t(), this.dropRevealWatchers.delete(e));
    }
    isCursorInsideChatShell(e) {
      const t = e.readPosition(),
        a = this.root.getBoundingClientRect(),
        i = this.chatShell.getBoundingClientRect(),
        n = { x: a.left + t.x, y: a.top + t.y };
      return n.x >= i.left && n.x <= i.right && n.y >= i.top && n.y <= i.bottom;
    }
    createCursorFile(e, t = "CSV", a = []) {
      const i = document.createElement("div");
      ((i.className = "wa-cursor-file"), i.setAttribute("aria-hidden", "true"));
      const n = this.getCursorFileStackCount(e, a);
      return (
        n > 1
          ? (i.classList.add("wa-cursor-file--stack"),
            i.append(...this.createCursorFileStack(e, t, n, a)))
          : i.append(this.createCursorFileCard(e, t)),
        this.root.append(i),
        g.set(i, { autoAlpha: 0, scale: 0.88, x: -120, y: -120 }),
        i
      );
    }
    followCursorWithFile(e, t, a) {
      const i = e.offsetWidth || 154,
        n = e.offsetHeight || 42,
        o = g.quickSetter(e, "x", "px"),
        s = g.quickSetter(e, "y", "px"),
        c = { x: -120, y: -120 },
        l = () => {
          const d = t.readPosition(),
            u = d.x - i * 0.5 + a.x,
            h = d.y - n * 0.5 + a.y;
          (t.isPayloadDragging() &&
            t.el.dataset.cursorMode !== "drag" &&
            t.setMode("drag"),
            u !== c.x && ((c.x = u), o(u)),
            h !== c.y && ((c.y = h), s(h)));
        };
      return (l(), g.ticker.add(l), () => g.ticker.remove(l));
    }
    getCursorFileEntryOffset(e, t) {
      const a = e.offsetWidth || 154,
        i = t.readPosition(),
        n = this.root.getBoundingClientRect(),
        o = window.innerWidth - n.left,
        s = i.x - a * 0.5,
        c = o + Ji.offscreenMargin;
      return { x: Math.max(0, c - s), y: 0 };
    }
    getCursorFileStackCount(e, t = []) {
      if (t.length > 1) return Math.max(1, Math.min(4, t.length));
      const a = e.match(/^(\d+)\s+/);
      return a ? Math.max(1, Math.min(4, Number(a[1]))) : 1;
    }
    createCursorFileStack(e, t, a, i = []) {
      return this.getCursorFileStackItems(e, t, a, i).map((o) => {
        const s = this.createCursorFileCard(o.name, o.type);
        return (s.classList.add("wa-cursor-file__card--stacked"), s);
      });
    }
    getCursorFileStackItems(e, t, a, i = []) {
      return i.length
        ? i.slice(0, a).map((n) => ({ name: n.name, type: n.type }))
        : e.toLowerCase().includes("context")
          ? [
              { name: "battlecards.pdf", type: "PDF" },
              { name: "positioning-memo.docx", type: "DOC" },
              { name: "icp-context.md", type: "MD" },
              { name: "outbound-playbook.pdf", type: "PDF" },
            ].slice(0, a)
          : Array.from({ length: a }, (n, o) => ({
              name: o === 0 ? e : `File ${o + 1}`,
              type: t,
            }));
    }
    createCursorFileCard(e, t) {
      const a = this.getFileDisplayType(e, t),
        i = document.createElement("span");
      ((i.className = "wa-cursor-file__card"),
        (i.dataset.fileTone = this.getFileTone(a)));
      const n = document.createElement("span");
      ((n.className = "wa-cursor-file__icon"), (n.textContent = a));
      const o = document.createElement("span");
      return (
        (o.className = "wa-cursor-file__name"),
        (o.textContent = e),
        i.append(n, o),
        i
      );
    }
    createUploadedFile(e, t, a) {
      const i = this.getFileDisplayType(e, a),
        n = document.createElement("div");
      ((n.className = "wa-uploaded-file"),
        (n.dataset.fileTone = this.getFileTone(i)));
      const o = document.createElement("span");
      ((o.className = "wa-uploaded-file__icon"), (o.textContent = i));
      const s = document.createElement("span");
      s.className = "wa-uploaded-file__body";
      const c = document.createElement("strong");
      c.textContent = e;
      const l = document.createElement("span");
      return ((l.textContent = t), s.append(c, l), n.append(o, s), n);
    }
    createUploadedFiles(e) {
      const t = document.createElement("div");
      if (
        ((t.className = "wa-uploaded-files"),
        (t.dataset.uploadedFileCount = String(e.length)),
        e.length > 1)
      ) {
        const i = document.createElement("span");
        ((i.className = "wa-uploaded-files__summary"),
          (i.textContent = this.getUploadedFilesLandingLabel(e.length)),
          t.append(i));
      }
      const a = document.createElement("div");
      return (
        (a.className = "wa-uploaded-files__list"),
        e.forEach((i) => {
          const n = this.createUploadedFile(i.name, i.detail, i.type);
          a.append(n);
        }),
        t.append(a),
        t
      );
    }
    getFileDisplayType(e, t) {
      const a = t?.trim().replace(/^\./, "");
      if (a) return a.toUpperCase();
      const i = e.trim().split(".").pop();
      return i && i !== e ? i.toUpperCase() : "FILE";
    }
    getFileTone(e) {
      const t = e.toLowerCase();
      return t === "csv" || t === "xls" || t === "xlsx"
        ? "spreadsheet"
        : t === "pdf"
          ? "pdf"
          : t === "doc" || t === "docx"
            ? "doc"
            : t === "txt" || t === "md"
              ? "text"
              : t === "ppt" || t === "pptx"
                ? "ppt"
                : "default";
    }
    streamThinkingHeader(e) {
      return this.streamThinkingChild(e, ".wa-thinking__title", _c);
    }
    streamThinkingStepLabel(e) {
      return this.streamThinkingChild(e, ".wa-research-step__label", xc);
    }
    streamThinkingStepDetail(e) {
      const t = e.querySelector(".wa-research-step__detail"),
        a = t?.querySelector("[data-thinking-detail-text]");
      if (a) {
        const i = a.dataset.fullText ?? a.textContent ?? "",
          n = this.queryElements(t, ".wa-research-step__tool-call"),
          o = g.timeline();
        return (
          i &&
            o.add(
              this.streamText(a, i, {
                duration: this.getStreamDuration(i, ut),
                targetForScroll: this.getMessageScrollTargetElement(e),
              }),
            ),
          n.length && o.add(this.streamThinkingToolCalls(n, e), "+=0.04"),
          o
        );
      }
      return this.streamThinkingChild(e, ".wa-research-step__detail", ut);
    }
    streamThinkingToolCalls(e, t) {
      const a = g.timeline();
      return (
        e.forEach((i, n) => {
          a.add(
            this.streamThinkingToolCall(
              i,
              t,
              this.getThinkingToolCallActiveHold(t, n, e.length),
            ),
            n * Ke.entranceStagger,
          );
        }),
        a
      );
    }
    streamThinkingToolCall(e, t, a) {
      const i = e.querySelector(".wa-research-step__tool-favicon"),
        n = e.querySelector(".wa-research-step__tool-check"),
        o = e.querySelector(".wa-research-step__tool-label"),
        s = o?.dataset.fullText ?? o?.textContent ?? "",
        c = this.getMessageScrollTargetElement(t),
        l = g.timeline();
      return (
        !o ||
          !s ||
          (l
            .call(() => {
              e.dataset.toolCallState = "active";
            })
            .set(e, { autoAlpha: 1, y: 0 }),
          i &&
            l.fromTo(
              i,
              { autoAlpha: 0, scale: 0.68, y: 0 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: x(0.16),
                ease: "back.out(2.4)",
              },
              0,
            ),
          n &&
            l.set(
              n,
              { autoAlpha: 0, y: Z.checkStartY, scale: Z.checkStartScale },
              0,
            ),
          l
            .add(
              this.streamText(o, s, {
                duration: this.getStreamDuration(s, ut),
                targetForScroll: c,
              }),
              0.02,
            )
            .to({}, { duration: this.prefersReducedMotion ? 0.01 : a })
            .add(this.createThinkingToolCompleteIconTimeline(i, n))
            .call(() => {
              e.dataset.toolCallState = "complete";
            }),
          l.eventCallback("onReverseComplete", () => {
            ((e.dataset.toolCallState = "pending"),
              g.set(e, { autoAlpha: 0, y: 0 }),
              i && g.set(i, { autoAlpha: 0, scale: 0.68, y: 0 }),
              n &&
                g.set(n, {
                  autoAlpha: 0,
                  y: Z.checkStartY,
                  scale: Z.checkStartScale,
                }));
          })),
        l
      );
    }
    createThinkingToolCompleteIconTimeline(e, t) {
      const a = g.timeline();
      return this.prefersReducedMotion
        ? (e && a.set(e, { autoAlpha: 0, y: 0, scale: 1 }),
          t && a.set(t, { autoAlpha: 1, y: 0, scale: 1 }),
          a)
        : (e &&
            a.to(
              e,
              {
                autoAlpha: 0,
                y: Z.faviconDropY,
                scale: Z.faviconDropScale,
                duration: Z.faviconDropDuration,
                ease: "power2.in",
              },
              0,
            ),
          t &&
            a
              .fromTo(
                t,
                { autoAlpha: 0, y: Z.checkStartY, scale: Z.checkStartScale },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: Z.checkPopScale,
                  duration: Z.checkPopDuration,
                  ease: "back.out(3.2)",
                },
                e ? Z.checkOverlap : 0,
              )
              .to(t, {
                scale: 1,
                duration: Z.checkSettleDuration,
                ease: "power2.out",
              }),
          a);
    }
    getThinkingToolCallActiveHold(e, t, a) {
      if (this.prefersReducedMotion) return 0.01;
      const i = this.parsePositiveNumber(e.dataset.thinkingDuration);
      if (i === null && a <= 1) return Ke.singleActiveHold;
      const n =
          i === null
            ? Ke.defaultActiveWindow
            : Math.min(
                Ke.maxActiveWindow,
                Math.max(Ke.minActiveHold, i * Ke.configuredStepActiveRatio),
              ),
        o = Ke.finishFactors[t % Ke.finishFactors.length];
      return Math.max(Ke.minActiveHold, n * o);
    }
    streamThinkingChild(e, t, a) {
      const i = e.querySelector(t),
        n = i?.dataset.fullText ?? i?.textContent ?? "";
      return !i || !n
        ? g.timeline()
        : this.streamText(i, n, {
            duration: this.getStreamDuration(n, a),
            targetForScroll: this.getMessageScrollTargetElement(e),
          });
    }
    streamText(e, t, a) {
      const i = { count: 0 };
      let n = -1;
      return g.timeline().fromTo(
        i,
        { count: 0 },
        {
          count: t.length,
          duration: a.duration,
          ease: "none",
          immediateRender: !1,
          onStart: () => {
            e.dataset.streaming = "true";
          },
          onUpdate: () => {
            const o = Math.round(i.count);
            o !== n &&
              ((n = o),
              (e.textContent = t.slice(0, o)),
              this.requestMessageScroll(a.targetForScroll));
          },
          onComplete: () => {
            ((e.textContent = t),
              delete e.dataset.streaming,
              this.cancelScheduledScroll(),
              this.shouldPreserveMessageScroll(a.targetForScroll) ||
                this.animateMessageScrollIntoView(
                  a.targetForScroll,
                  X.followDuration * 0.7,
                ));
          },
          onReverseComplete: () => {
            ((n = -1),
              (e.textContent = ""),
              delete e.dataset.streaming,
              this.cancelScheduledScroll());
          },
        },
      );
    }
    foldThinkingStep(e, t) {
      const a = this.queryElements(
        e,
        ".wa-research-step__detail, .wa-sequence-thinking-progress",
      );
      let i = null;
      return g
        .timeline()
        .call(() => {
          (this.reserveElementHeights(a),
            t &&
              (this.stopScrollMotion(),
              (i = this.createThreadScrollAnchor(t))));
        })
        .to(a, {
          autoAlpha: 0,
          height: 0,
          minHeight: 0,
          marginTop: 0,
          y: Oa.detailOffsetY,
          overflow: "hidden",
          transformOrigin: "left top",
          duration: Oa.duration,
          ease: "power2.inOut",
          onUpdate: () => this.preserveThreadScrollAnchor(i),
          onComplete: () => {
            ((e.dataset.stepState = "complete"),
              this.setThinkingStepLabelCollapsed(e),
              this.setThinkingStepDetailCollapsed(e),
              this.setThinkingToolCallsCollapsed(e),
              this.hideThinkingStepTimer(e),
              this.showThinkingStepChevron(e),
              g.set(a, {
                display: "none",
                height: 0,
                minHeight: 0,
                marginTop: 0,
                overflow: "hidden",
                y: 0,
              }),
              this.preserveThreadScrollAnchor(i));
          },
          onReverseComplete: () => {
            ((e.dataset.stepState = "current"),
              this.setThinkingStepLabelActive(e),
              this.setThinkingStepDetailActive(e),
              this.setThinkingToolCallsComplete(e),
              this.showThinkingStepTimer(e),
              this.clearElementHeightReservations(a),
              this.preserveThreadScrollAnchor(i));
          },
        });
    }
    reserveElementHeights(e) {
      e.forEach((t) => {
        const a = Number.parseFloat(t.dataset.reservedLayoutHeight ?? ""),
          i = Math.max(
            t.getBoundingClientRect().height,
            t.offsetHeight,
            Number.isFinite(a) ? a : 0,
          );
        if (i <= 0) return;
        const n = Math.ceil(i * 100) / 100;
        ((t.dataset.reservedLayoutHeight = String(n)),
          g.set(t, { height: n, minHeight: n, overflow: "hidden" }));
      });
    }
    clearElementHeightReservations(e) {
      e.length &&
        (e.forEach((t) => {
          delete t.dataset.reservedLayoutHeight;
        }),
        g.set(e, { clearProps: kc }));
    }
    getMessageScrollTargetElement(e) {
      return e.closest(".wa-message") ?? e;
    }
    createThreadScrollAnchor(e) {
      if (!e?.isConnected) return null;
      this.updateThreadContentFitState();
      const t = e.querySelector(".wa-thinking") ?? e;
      return { element: t, top: t.getBoundingClientRect().top };
    }
    preserveThreadScrollAnchor(e) {
      if (!e?.element.isConnected) return;
      this.updateThreadContentFitState();
      const t = this.getThreadContentScale(),
        a = e.element.getBoundingClientRect().top - e.top;
      a <= 0.1 || (this.thread.scrollTop += a / t);
    }
    prepareThinkingMessage(e, t, a) {
      const i = t.flatMap((n) =>
        this.queryElements(
          n,
          ".wa-research-step__detail, .wa-sequence-thinking-progress",
        ),
      );
      (t.forEach((n) => {
        ((n.dataset.stepState = "pending"),
          this.resetThinkingStepTimer(n),
          this.hideThinkingStepChevron(n));
      }),
        this.clearElementHeightReservations(i),
        this.clearElementHeightReservations([e.steps]),
        g.set(e.header, { autoAlpha: 0, y: 5 }),
        g.set(e.traveler, { autoAlpha: 0, x: 0, y: 0 }),
        g.set(e.steps, { display: "grid", autoAlpha: 1, y: 0 }),
        (e.title.dataset.thinkingActive = "true"),
        this.resetThinkingGuide(e),
        g.set(t, { autoAlpha: 0, y: a, display: "none" }));
    }
    revealThinkingHeader(e, t) {
      return g
        .timeline()
        .to(e.header, {
          autoAlpha: 1,
          y: 0,
          duration: x(t),
          ease: "power2.out",
        })
        .call(() => this.snapThinkingLogoTo(e, e.headerGlyph))
        .to(
          e.traveler,
          { autoAlpha: 1, duration: x(0.12), ease: "power2.out" },
          "<",
        )
        .add(this.streamThinkingHeader(e.header), "-=0.08");
    }
    addThinkingStepReveal(e, t, a = {}) {
      return e
        .to(
          t,
          { autoAlpha: 1, y: 0, duration: x(0.26), ease: "power2.out" },
          a.position ?? "<",
        )
        .add(this.streamThinkingStepLabel(t), ut.startOverlap)
        .add(this.streamThinkingStepDetail(t), "-=0.02");
    }
    createThinkingStepReveal(e) {
      return this.addThinkingStepReveal(g.timeline(), e, { position: jr });
    }
    addThinkingStepStreams(e, t) {
      (t.forEach((a, i) => {
        e.add(this.streamThinkingStepLabel(a), i === 0 ? ut.startOverlap : "<");
      }),
        t.forEach((a, i) => {
          e.add(this.streamThinkingStepDetail(a), i === 0 ? "-=0.02" : "<");
        }));
    }
    markThinkingStepsComplete(e) {
      e.forEach((t) => {
        ((t.dataset.stepState = "complete"),
          this.setThinkingStepLabelCollapsed(t),
          this.setThinkingStepDetailCollapsed(t),
          this.setThinkingToolCallsCollapsed(t),
          this.hideThinkingStepTimer(t),
          t.dataset.detailCollapsed === "true"
            ? this.showThinkingStepChevron(t)
            : this.hideThinkingStepChevron(t));
      });
    }
    getThinkingLogoTargetPosition(e, t, a) {
      const n = (
          e.message.querySelector(".wa-thinking-block") ?? e.message
        ).getBoundingClientRect(),
        o = t.getBoundingClientRect(),
        s = e.traveler.offsetWidth || e.headerGlyph.offsetWidth || 18,
        c = e.traveler.offsetHeight || e.headerGlyph.offsetHeight || 11,
        l = (a && Number(g.getProperty(a, "x"))) || 0,
        d = (a && Number(g.getProperty(a, "y"))) || 0;
      return {
        x: o.left - n.left + (o.width - s) / 2 - l,
        y: o.top - n.top + (o.height - c) / 2 - d,
      };
    }
    getThinkingLogoTargetPositionInBlock(e, t, a) {
      const i = e.getBoundingClientRect(),
        n = a.getBoundingClientRect(),
        o = t.offsetWidth || 18,
        s = t.offsetHeight || 11;
      return {
        x: n.left - i.left + (n.width - o) / 2,
        y: n.top - i.top + (n.height - s) / 2,
      };
    }
    syncPausedThinkingLayouts() {
      this.queryElements(this.chatShell, ".wa-thinking-block").forEach((e) => {
        (this.stabilizeVisibleThinkingStepFlow(e),
          this.syncThinkingBlockToCurrentStep(e));
      });
    }
    stabilizeVisibleThinkingStepFlow(e) {
      if (!e?.isConnected) return;
      const t = e.querySelector(".wa-research-steps");
      if (!t || !this.isElementVisible(t)) return;
      const a = this.queryElements(t, ".wa-research-step").filter((i) =>
        this.isElementVisible(i),
      );
      a.length &&
        (g.killTweensOf(a, "opacity,visibility,x,y,transform"),
        g.set(a, { autoAlpha: 1, x: 0, y: 0 }),
        g.set(a, { clearProps: "transform,translate,rotate,scale" }));
    }
    syncThinkingBlockToCurrentStep(e) {
      if (!e?.isConnected) return;
      const t = e.querySelector(".wa-research-steps"),
        a = e.querySelector(".wa-thinking-logo-traveler"),
        i = e.querySelector(
          '.wa-research-step[data-step-state="current"] .wa-research-step__marker',
        );
      !t ||
        !a ||
        !i ||
        !this.isElementVisible(i) ||
        (g.set(a, {
          ...this.getThinkingLogoTargetPositionInBlock(e, a, i),
          autoAlpha: 1,
        }),
        this.setThinkingGuideToMarker(t, i));
    }
    isElementVisible(e) {
      return (
        e.getClientRects().length > 0 && getComputedStyle(e).display !== "none"
      );
    }
    snapThinkingLogoTo(e, t) {
      const a = this.getThinkingLogoTargetPosition(e, t);
      g.set(e.traveler, a);
    }
    moveThinkingLogoTo(e, t, a = Ee.duration, i) {
      return g.timeline().to(e.traveler, {
        x: () => this.getThinkingLogoTargetPosition(e, t, i).x,
        y: () => this.getThinkingLogoTargetPosition(e, t, i).y,
        duration: a,
        ease: Ee.ease,
        overwrite: "auto",
      });
    }
    getThinkingGuideStart(e) {
      return this.getThinkingGuideStartForSteps(e.steps);
    }
    getThinkingGuideStartForSteps(e) {
      const t = getComputedStyle(e).getPropertyValue("--wa-thinking-guide-top"),
        a = Number.parseFloat(t);
      return Number.isFinite(a) ? a : 0;
    }
    resetThinkingGuide(e) {
      e.steps.style.setProperty(
        "--wa-thinking-guide-end",
        `${this.getThinkingGuideStart(e)}px`,
      );
    }
    getThinkingGuideTargetPosition(e, t, a) {
      const i = e.steps.getBoundingClientRect(),
        n = t.getBoundingClientRect(),
        o = (a && Number(g.getProperty(a, "y"))) || 0,
        s = n.top - i.top + n.height / 2 - o;
      return Math.max(this.getThinkingGuideStart(e), s);
    }
    setPausedThinkingGuideToVisibleSteps(e) {
      const t = this.queryElements(
          e,
          '.wa-research-step[data-step-state="complete"] .wa-research-step__marker, .wa-research-step[data-step-state="failed"] .wa-research-step__marker',
        ),
        a = t[t.length - 1],
        i = this.getThinkingGuideStartForSteps(e);
      if (!a) {
        e.style.setProperty("--wa-thinking-guide-end", `${i}px`);
        return;
      }
      const n = e.getBoundingClientRect(),
        o = a.getBoundingClientRect(),
        s = o.top - n.top + o.height / 2;
      e.style.setProperty("--wa-thinking-guide-end", `${Math.max(i, s)}px`);
    }
    setThinkingGuideToMarker(e, t) {
      const a = this.getThinkingGuideStartForSteps(e),
        i = e.getBoundingClientRect(),
        n = t.getBoundingClientRect(),
        o = n.top - i.top + n.height / 2;
      e.style.setProperty("--wa-thinking-guide-end", `${Math.max(a, o)}px`);
    }
    moveThinkingGuideTo(e, t, a = Ee.duration, i) {
      return g.timeline().to(e.steps, {
        "--wa-thinking-guide-end": () =>
          `${this.getThinkingGuideTargetPosition(e, t, i)}px`,
        duration: a,
        ease: Ee.ease,
        overwrite: "auto",
      });
    }
    moveThinkingGuideToStart(e, t = Ee.returnDuration) {
      return g.timeline().to(e.steps, {
        "--wa-thinking-guide-end": () => `${this.getThinkingGuideStart(e)}px`,
        duration: t,
        ease: Ee.ease,
        overwrite: "auto",
      });
    }
    moveThinkingLogoToStep(e, t) {
      const a = t?.querySelector(".wa-research-step__marker");
      return a
        ? g
            .timeline()
            .add(this.moveThinkingLogoTo(e, a, Ee.duration, t), 0)
            .add(this.moveThinkingGuideTo(e, a, Ee.duration, t), 0)
        : g.timeline();
    }
    collapseThinkingToHeader(e, t) {
      let a = null;
      return g
        .timeline()
        .call(() => {
          (this.markThinkingStepsComplete(t),
            this.setLocalLogoMode(e.traveler, "done"),
            this.reserveElementHeights([e.steps]),
            this.stopScrollMotion(),
            (a = this.createThreadScrollAnchor(e.message)));
        })
        .add(this.moveThinkingLogoTo(e, e.headerGlyph, Ee.returnDuration), 0)
        .add(this.moveThinkingGuideToStart(e, Ee.returnDuration), 0)
        .to(
          e.steps,
          {
            autoAlpha: 0,
            height: 0,
            minHeight: 0,
            y: Me.y,
            overflow: "hidden",
            duration: Me.duration,
            ease: Me.ease,
            onUpdate: () => this.preserveThreadScrollAnchor(a),
            onComplete: () => {
              (this.setThinkingHeaderCollapsed(e),
                g.set(e.steps, {
                  display: "none",
                  height: 0,
                  minHeight: 0,
                  overflow: "hidden",
                  y: Me.y,
                }),
                this.preserveThreadScrollAnchor(a));
            },
            onReverseComplete: () => {
              (this.setThinkingHeaderActive(e),
                this.setLocalLogoMode(e.traveler, "thinking"),
                this.clearElementHeightReservations([e.steps]),
                g.set(e.steps, { display: "grid", autoAlpha: 1 }),
                this.preserveThreadScrollAnchor(a));
            },
          },
          0,
        );
    }
    getActiveThinkingTitle(e = Fe) {
      const t = e.trim() || Fe;
      return /^thinking(?:\.\.\.)?$/i.test(t) ? "Thinking..." : t;
    }
    isGenericThinkingTitle(e) {
      const t = (e || "").trim();
      return !t || /^thinking(?:\.\.\.)?$/i.test(t);
    }
    getCollapsedThinkingTitle(e) {
      const t = this.isGenericThinkingTitle(e.title)
        ? e.items[0]?.label
        : e.title;
      return this.getPastTenseThinkingTitle(t || Fe);
    }
    getPastTenseThinkingTitle(e) {
      const t = e.trim(),
        a = t.match(/^([A-Za-z][A-Za-z'-]*)\s+([A-Za-z][A-Za-z'-]*ing)(.*)$/);
      if (a && !a[1].toLowerCase().endsWith("ing")) {
        const [, c, l, d = ""] = a,
          u = this.getPastTenseThinkingAction(l);
        return `${c} ${this.matchCapitalization(l, u)}${d}`;
      }
      const i = t.match(/^([A-Za-z][A-Za-z'-]*)(.*)$/);
      if (!i) return t || "Finished thinking";
      const [, n, o = ""] = i,
        s = this.getPastTenseThinkingAction(n);
      return `${this.matchCapitalization(n, s)}${o}`;
    }
    getPastTenseThinkingAction(e) {
      const t = e.toLowerCase();
      return (
        {
          building: "built",
          finding: "found",
          getting: "got",
          learning: "learned",
          making: "made",
          reading: "read",
          running: "ran",
          sending: "sent",
          taking: "took",
          thinking: "finished thinking",
          understanding: "understood",
          writing: "wrote",
        }[t] ?? this.regularizeThinkingAction(t)
      );
    }
    setThinkingStepLabelActive(e) {
      this.setThinkingStepLabelText(e, "activeText");
    }
    setThinkingStepLabelCollapsed(e) {
      this.setThinkingStepLabelText(e, "collapsedText");
    }
    setThinkingStepLabelText(e, t) {
      const a = e.querySelector(".wa-research-step__label"),
        i = a?.dataset[t];
      !a ||
        !i ||
        ((a.dataset.fullText = i),
        (a.textContent = i),
        delete a.dataset.streaming);
    }
    setThinkingStepDetailActive(e) {
      this.setThinkingStepDetailText(e, "activeText");
    }
    setThinkingStepDetailCollapsed(e) {
      this.setThinkingStepDetailText(e, "collapsedText");
    }
    setThinkingStepDetailText(e, t) {
      const a = e.querySelector(".wa-research-step__detail"),
        i = a?.querySelector("[data-thinking-detail-text]") ?? a,
        n = i?.dataset[t];
      !i ||
        !n ||
        ((i.dataset.fullText = n),
        (i.textContent = n),
        delete i.dataset.streaming);
    }
    setThinkingToolCallsCollapsed(e) {
      this.setThinkingToolCallsState(e, "collapsed");
    }
    setThinkingToolCallsComplete(e) {
      this.setThinkingToolCallsState(e, "complete");
    }
    setThinkingToolCallsState(e, t) {
      this.queryElements(e, ".wa-research-step__tool-call").forEach((i) => {
        const n = i.querySelector(".wa-research-step__tool-favicon"),
          o = i.querySelector(".wa-research-step__tool-check"),
          s = i.querySelector(".wa-research-step__tool-label"),
          c = t === "collapsed" ? "collapsedText" : "activeText",
          l = s?.dataset[c];
        if (
          ((i.dataset.toolCallState = t),
          s &&
            l &&
            ((s.dataset.fullText = l),
            (s.textContent = l),
            delete s.dataset.streaming),
          t === "collapsed")
        ) {
          (n && g.set(n, { autoAlpha: 1, scale: 1, y: 0 }),
            o &&
              g.set(o, {
                autoAlpha: 0,
                y: Z.checkStartY,
                scale: Z.checkStartScale,
              }));
          return;
        }
        (n &&
          g.set(n, {
            autoAlpha: 0,
            y: Z.faviconDropY,
            scale: Z.faviconDropScale,
          }),
          o && g.set(o, { autoAlpha: 1, y: 0, scale: 1 }));
      });
    }
    regularizeThinkingAction(e) {
      return e.endsWith("ying") && e.length > 4
        ? `${e.slice(0, -4)}ied`
        : e.endsWith("ing") && e.length > 4
          ? `${e.slice(0, -3)}ed`
          : e;
    }
    matchCapitalization(e, t) {
      return !e || e[0] !== e[0].toUpperCase()
        ? t
        : t.charAt(0).toUpperCase() + t.slice(1);
    }
    setThinkingHeaderActive(e) {
      const t = this.getActiveThinkingTitle(e.title.dataset.activeText);
      ((e.title.dataset.fullText = t),
        (e.title.textContent = t),
        (e.title.dataset.thinkingActive = "true"),
        delete e.header.dataset.thinkingCollapsed,
        delete e.title.dataset.streaming);
    }
    setThinkingHeaderCollapsed(e) {
      const t =
        e.title.dataset.collapsedText ||
        this.getPastTenseThinkingTitle(e.title.dataset.activeText || "");
      ((e.title.dataset.fullText = t),
        (e.title.textContent = t),
        (e.header.dataset.thinkingCollapsed = "true"),
        delete e.title.dataset.thinkingActive,
        delete e.title.dataset.streaming);
    }
    setThinkingTitle(e, t) {
      ((e.title.dataset.activeText = t),
        (e.title.dataset.fullText = t),
        (e.title.textContent = t));
    }
    completeProgressThinking(e, t, a) {
      let i = null;
      return g
        .timeline()
        .call(() => {
          (this.markThinkingStepsComplete(t),
            this.setLocalLogoMode(e.traveler, "done"),
            this.setThinkingTitle(e, a),
            this.reserveElementHeights([e.steps]),
            this.stopScrollMotion(),
            (i = this.createThreadScrollAnchor(e.message)));
        })
        .add(this.moveThinkingLogoTo(e, e.headerGlyph, Ee.returnDuration), 0)
        .add(this.moveThinkingGuideToStart(e, Ee.returnDuration), 0)
        .to(
          e.steps,
          {
            autoAlpha: 0,
            height: 0,
            minHeight: 0,
            y: Me.y,
            overflow: "hidden",
            duration: Me.duration,
            ease: Me.ease,
            onUpdate: () => this.preserveThreadScrollAnchor(i),
            onComplete: () => {
              (delete e.title.dataset.thinkingActive,
                delete e.title.dataset.streaming,
                g.set(e.steps, {
                  display: "none",
                  height: 0,
                  minHeight: 0,
                  overflow: "hidden",
                  y: Me.y,
                }),
                this.preserveThreadScrollAnchor(i));
            },
            onReverseComplete: () => {
              (this.setThinkingHeaderActive(e),
                this.setLocalLogoMode(e.traveler, "thinking"),
                this.clearElementHeightReservations([e.steps]),
                g.set(e.steps, { display: "grid", autoAlpha: 1 }),
                this.preserveThreadScrollAnchor(i));
            },
          },
          0,
        );
    }
    runThinkingSequence(e, t) {
      const a = g.timeline(),
        i = e.items.map((s, c) => this.createThinkingStep(s, c)),
        n = this.claimThinkingMessage(
          i,
          e.title,
          this.getCollapsedThinkingTitle(e),
        ),
        o = t.preserveScroll ?? !1;
      return (
        a
          .call(() => {
            (this.prepareThinkingMessage(n, i, t.itemStartY),
              o && (n.message.dataset.preserveMessageScroll = "true"));
          })
          .add(this.revealMessage(n.message, null, 0, { preserveScroll: o }))
          .add(this.revealThinkingHeader(n, t.headerDuration)),
        e.items.forEach((s, c) => {
          const l = i[c],
            d = c === 0 ? "+=0" : `+=${t.hold}`,
            u = this.createThinkingStepReveal(l),
            h =
              typeof s.duration == "number" && Number.isFinite(s.duration)
                ? Math.max(0.1, s.duration)
                : null,
            m = h === null ? t.afterStepHold : Math.max(0, h - u.duration()),
            f = u.duration() + m;
          a.call(() => this.activateThinkingStep(i, c), void 0, d)
            .add(this.moveThinkingLogoToStep(n, l), "<")
            .add(u, "<")
            .to({}, { duration: m })
            .add(this.createThinkingStepElapsedTimer(l, f), `-=${f}`)
            .add(this.foldThinkingStep(l, n.message));
        }),
        a
          .add(this.collapseThinkingToHeader(n, i), `+=${t.finalHold}`)
          .call(() => {
            delete n.message.dataset.preserveMessageScroll;
          }),
        a
      );
    }
    activateThinkingStep(e, t) {
      e.forEach((a, i) => {
        if (i > t) {
          ((a.dataset.stepState = "pending"),
            this.setThinkingStepLabelActive(a),
            this.hideThinkingStepTimer(a),
            this.hideThinkingStepChevron(a),
            g.set(a, { display: "none" }));
          return;
        }
        if (i === t) {
          ((a.dataset.stepState = "current"),
            this.setThinkingStepLabelActive(a),
            this.showThinkingStepTimer(a),
            g.set(a, { display: "grid" }));
          return;
        }
        ((a.dataset.stepState = "complete"),
          this.setThinkingStepLabelCollapsed(a),
          this.hideThinkingStepTimer(a),
          this.showThinkingStepChevron(a),
          g.set(a, { display: "grid" }));
      });
    }
    getStreamDuration(e, t) {
      return this.prefersReducedMotion
        ? 0.01
        : Math.min(
            t.maxDuration,
            Math.max(t.minDuration, e.length / t.charsPerSecond),
          );
    }
    claimThinkingMessage(e, t = Fe, a = this.getPastTenseThinkingTitle(t)) {
      const i = document.createElement("div");
      i.className = "wa-thinking-block";
      const n = document.createElement("div");
      n.className = "wa-thinking";
      const o = this.createThinkingLogo();
      o.dataset.logoRole = "shadow";
      const s = this.createThinkingLogo("wa-thinking-logo-traveler"),
        c = document.createElement("span"),
        l = this.getActiveThinkingTitle(t);
      ((c.className = "wa-thinking__title"),
        (c.dataset.activeText = t),
        (c.dataset.fullText = l),
        (c.dataset.collapsedText = a),
        (c.dataset.thinkingActive = "true"),
        (c.textContent = ""));
      const d = document.createElement("span");
      ((d.className = "wa-thinking__chevron"),
        d.setAttribute("role", "button"),
        d.setAttribute("aria-label", "Toggle thinking steps"),
        d.setAttribute("aria-expanded", "false"));
      const u = document.createElement("div");
      return (
        (u.className = "wa-research-steps"),
        (u.dataset.researchSteps = ""),
        u.append(...e),
        n.append(o, c, d),
        i.append(n, u, s),
        {
          message: this.claimComponentMessage("thinking", i),
          header: n,
          headerGlyph: o,
          headerChevron: d,
          title: c,
          traveler: s,
          steps: u,
        }
      );
    }
    getThinkingStepTimer(e) {
      return e.querySelector(".wa-research-step__elapsed");
    }
    getThinkingStepChevron(e) {
      return e.querySelector(".wa-research-step__chevron");
    }
    showThinkingStepChevron(e) {
      const t = this.getThinkingStepChevron(e);
      ((e.dataset.detailCollapsed = "true"),
        t &&
          g.set(t, {
            display: "block",
            visibility: "visible",
            clearProps: "opacity",
          }));
    }
    hideThinkingStepChevron(e) {
      const t = this.getThinkingStepChevron(e);
      (delete e.dataset.detailCollapsed,
        delete e.dataset.detailExpanded,
        t && g.set(t, { display: "none", autoAlpha: 0 }));
    }
    toggleThinkingSteps(e) {
      this.setThinkingStepsExpanded(e, e.dataset.thinkingExpanded !== "true", {
        animate: !0,
      });
    }
    setThinkingStepsExpanded(e, t, a) {
      const i = e.closest(".wa-thinking-block"),
        n = i?.querySelector(".wa-research-steps"),
        o = e.querySelector(".wa-thinking__chevron");
      if (!n) return;
      const s = this.createThreadScrollAnchor(i?.closest(".wa-message"));
      if ((g.killTweensOf(n), o?.setAttribute("aria-expanded", String(t)), t)) {
        ((e.dataset.thinkingExpanded = "true"),
          g.set(n, {
            display: "grid",
            height: "auto",
            minHeight: 0,
            overflow: "visible",
            y: 0,
          }),
          this.setPausedThinkingGuideToVisibleSteps(n));
        const c = n.getBoundingClientRect().height;
        if (!a.animate) {
          (g.set(n, {
            autoAlpha: 1,
            height: "auto",
            minHeight: 0,
            overflow: "visible",
            y: 0,
          }),
            this.requestThreadContentFitUpdate());
          return;
        }
        g.fromTo(
          n,
          { autoAlpha: 0, height: 0, minHeight: 0, overflow: "hidden", y: 0 },
          {
            autoAlpha: 1,
            height: c,
            duration: Gt.duration,
            ease: Gt.ease,
            onUpdate: () => this.preserveThreadScrollAnchor(s),
            onComplete: () => {
              (g.set(n, {
                height: "auto",
                minHeight: 0,
                overflow: "visible",
                y: 0,
              }),
                this.requestThreadContentFitUpdate());
            },
          },
        );
        return;
      }
      if ((delete e.dataset.thinkingExpanded, !a.animate)) {
        (g.set(n, {
          display: "none",
          autoAlpha: 0,
          height: 0,
          minHeight: 0,
          overflow: "hidden",
          y: Me.y,
        }),
          this.requestThreadContentFitUpdate());
        return;
      }
      g.to(n, {
        autoAlpha: 0,
        height: 0,
        minHeight: 0,
        overflow: "hidden",
        y: Me.y,
        duration: Gt.duration,
        ease: "power2.inOut",
        onUpdate: () => this.preserveThreadScrollAnchor(s),
        onComplete: () => {
          (g.set(n, {
            display: "none",
            height: 0,
            minHeight: 0,
            overflow: "hidden",
            y: Me.y,
          }),
            this.requestThreadContentFitUpdate());
        },
      });
    }
    toggleThinkingStepDetail(e) {
      this.setThinkingStepDetailExpanded(
        e,
        e.dataset.detailExpanded !== "true",
        { animate: !0 },
      );
    }
    setThinkingStepDetailExpanded(e, t, a) {
      const i = this.queryElements(
          e,
          ".wa-research-step__detail, .wa-sequence-thinking-progress",
        ),
        n = this.getThinkingStepChevron(e),
        o = e.closest(".wa-thinking-block"),
        s = this.createThreadScrollAnchor(e.closest(".wa-message"));
      if (i.length) {
        if (
          (this.stabilizeVisibleThinkingStepFlow(o),
          g.killTweensOf(i),
          n?.setAttribute("aria-expanded", String(t)),
          g.set(n, {
            display: "block",
            visibility: "visible",
            clearProps: "opacity",
          }),
          t)
        ) {
          ((e.dataset.detailExpanded = "true"),
            delete e.dataset.detailCollapsed,
            i.forEach((l) => {
              g.set(l, {
                display: this.getThinkingDetailDisplay(l),
                height: "auto",
                minHeight: 0,
                marginTop: "",
                overflow: "visible",
                y: 0,
              });
            }));
          const c = i.map((l) => l.getBoundingClientRect().height);
          if (!a.animate) {
            (g.set(i, {
              autoAlpha: 1,
              height: "auto",
              minHeight: 0,
              overflow: "visible",
              y: 0,
            }),
              this.syncThinkingBlockToCurrentStep(o),
              this.requestThreadContentFitUpdate());
            return;
          }
          i.forEach((l, d) => {
            g.fromTo(
              l,
              {
                autoAlpha: 0,
                height: 0,
                minHeight: 0,
                overflow: "hidden",
                y: Oa.detailOffsetY,
              },
              {
                autoAlpha: 1,
                height: c[d],
                duration: Gt.duration,
                ease: Gt.ease,
                onUpdate: () => {
                  (this.syncThinkingBlockToCurrentStep(o),
                    this.preserveThreadScrollAnchor(s));
                },
                onComplete: () => {
                  (g.set(l, {
                    height: "auto",
                    minHeight: 0,
                    overflow: "visible",
                    y: 0,
                  }),
                    this.syncThinkingBlockToCurrentStep(o),
                    this.requestThreadContentFitUpdate());
                },
              },
            );
          });
          return;
        }
        if (
          (delete e.dataset.detailExpanded,
          (e.dataset.detailCollapsed = "true"),
          !a.animate)
        ) {
          (g.set(i, {
            display: "none",
            autoAlpha: 0,
            height: 0,
            minHeight: 0,
            marginTop: 0,
            overflow: "hidden",
            y: 0,
          }),
            this.syncThinkingBlockToCurrentStep(o),
            this.requestThreadContentFitUpdate());
          return;
        }
        g.to(i, {
          autoAlpha: 0,
          height: 0,
          minHeight: 0,
          marginTop: 0,
          overflow: "hidden",
          y: Oa.detailOffsetY,
          duration: Gt.duration,
          ease: "power2.inOut",
          onUpdate: () => {
            (this.syncThinkingBlockToCurrentStep(o),
              this.preserveThreadScrollAnchor(s));
          },
          onComplete: () => {
            (g.set(i, {
              display: "none",
              height: 0,
              minHeight: 0,
              marginTop: 0,
              overflow: "hidden",
              y: 0,
            }),
              this.syncThinkingBlockToCurrentStep(o),
              this.requestThreadContentFitUpdate());
          },
        });
      }
    }
    getThinkingDetailDisplay(e) {
      return e.classList.contains("wa-sequence-thinking-progress") ||
        e.dataset.hasToolCalls === "true"
        ? "grid"
        : "block";
    }
    resetThinkingStepTimer(e) {
      const t = this.getThinkingStepTimer(e);
      t &&
        ((t.textContent = "0s"), g.set(t, { display: "none", autoAlpha: 0 }));
    }
    showThinkingStepTimer(e) {
      const t = this.getThinkingStepTimer(e);
      (this.hideThinkingStepChevron(e),
        t && g.set(t, { display: "inline-block", autoAlpha: 1 }));
    }
    hideThinkingStepTimer(e) {
      const t = this.getThinkingStepTimer(e);
      t && g.set(t, { display: "none", autoAlpha: 0 });
    }
    createThinkingStepElapsedTimer(e, t) {
      const a = this.getThinkingStepTimer(e),
        i = g.timeline(),
        n = { seconds: 0 },
        o = Math.max(0.01, t);
      return (
        a &&
          i
            .call(() => {
              ((n.seconds = 0),
                (a.textContent = "0s"),
                this.showThinkingStepTimer(e));
            })
            .to(n, {
              seconds: o,
              duration: o,
              ease: "none",
              onUpdate: () => {
                a.textContent = Dr(n.seconds);
              },
              onComplete: () => {
                a.textContent = Dr(o);
              },
              onReverseComplete: () => {
                ((n.seconds = 0), (a.textContent = "0s"));
              },
            }),
        i
      );
    }
    createThinkingLogo(e = "wa-thinking__glyph") {
      const t = document.createElement("span");
      return (
        (t.className = e),
        (t.dataset.logoMode = "thinking"),
        t.setAttribute("aria-hidden", "true"),
        t.append(zr("wa-thinking__logo-mark")),
        t
      );
    }
    setLocalLogoMode(e, t) {
      e && (e.dataset.logoMode = t);
    }
    createMessage(e) {
      const t = document.createElement("div");
      ((t.className = "wa-message"), (t.dataset.messageId = `message-${e}`));
      const a = document.createElement("div");
      a.className = "wa-message__avatar";
      const i = document.createElement("div");
      return (
        (i.className = "wa-message__body"),
        (i.dataset.messageBody = ""),
        t.append(a, i),
        (this.messagePool[e] = t),
        this.messageBodies.set(t, i),
        t
      );
    }
    getMessageBody(e) {
      const t = this.messageBodies.get(e);
      if (t) return t;
      const a = e.querySelector("[data-message-body]");
      if (!a) throw new Error("ChatActor: message body missing");
      return (this.messageBodies.set(e, a), a);
    }
    getLastMessageBody() {
      const e = this.messagePool[this.messageIndex - 1];
      return e ? this.getMessageBody(e) : null;
    }
    createThinkingStep(e, t) {
      const a = document.createElement("div");
      ((a.className = "wa-research-step"),
        (a.dataset.researchStep = String(t)),
        (a.dataset.stepState = t === 0 ? "current" : "complete"),
        typeof e.duration == "number" &&
          Number.isFinite(e.duration) &&
          (a.dataset.thinkingDuration = String(e.duration)));
      const i = document.createElement("span");
      ((i.className = "wa-research-step__marker"),
        i.setAttribute("aria-hidden", "true"));
      const n = document.createElement("span");
      n.className = "wa-research-step__body";
      const o = document.createElement("span");
      o.className = "wa-research-step__label-row";
      const s = document.createElement("span");
      ((s.className = "wa-research-step__label"),
        (s.dataset.activeText = e.label),
        (s.dataset.collapsedText = this.getPastTenseThinkingTitle(e.label)),
        (s.dataset.fullText = e.label),
        (s.textContent = ""));
      const c = document.createElement("span");
      ((c.className = "wa-research-step__elapsed"), (c.textContent = "0s"));
      const l = document.createElement("span"),
        d = e.detail,
        u = d ? this.getPastTenseThinkingTitle(d) : "";
      if (
        ((l.className = "wa-research-step__detail"),
        (l.dataset.activeText = d),
        (l.dataset.collapsedText = u),
        (l.dataset.fullText = d),
        e.toolCalls.length)
      ) {
        l.dataset.hasToolCalls = "true";
        const m = document.createElement("span");
        ((m.className = "wa-research-step__detail-text"),
          (m.dataset.thinkingDetailText = ""),
          (m.dataset.activeText = d),
          (m.dataset.collapsedText = u),
          (m.dataset.fullText = d),
          l.append(m, this.createThinkingToolCallList(e.toolCalls)));
      } else l.textContent = "";
      const h = document.createElement("span");
      return (
        (h.className = "wa-research-step__chevron"),
        h.setAttribute("role", "button"),
        h.setAttribute("aria-label", "Toggle thinking detail"),
        h.setAttribute("aria-expanded", "false"),
        o.append(s, c, h),
        n.append(o, l),
        a.append(i, n),
        a
      );
    }
    createThinkingToolCallList(e) {
      const t = document.createElement("span");
      return (
        (t.className = "wa-research-step__tool-calls"),
        t.append(...e.map((a) => this.createThinkingToolCall(a))),
        t
      );
    }
    createThinkingToolCall(e) {
      const t = document.createElement("span"),
        a = document.createElement("span"),
        i = this.createThinkingToolFavicon(e.vendor || e.label),
        n = this.createSvgIcon(
          "wa-research-step__tool-check",
          ["M5 12l5 5l10 -10"],
          {
            size: 14,
            pathAttributes: {
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.4",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
          },
        ),
        o = document.createElement("span");
      return (
        (t.className = "wa-research-step__tool-call"),
        (t.dataset.toolCallState = "pending"),
        (t.style.opacity = "0"),
        (t.style.visibility = "hidden"),
        (a.className = "wa-research-step__tool-icon"),
        (i.style.opacity = "0"),
        (i.style.transform = "scale(0.68)"),
        (n.style.opacity = "0"),
        (n.style.transform = `translateY(${Z.checkStartY}px) scale(${Z.checkStartScale})`),
        (o.className = "wa-research-step__tool-label"),
        (o.dataset.activeText = e.label),
        (o.dataset.collapsedText = this.getPastTenseThinkingTitle(e.label)),
        (o.dataset.fullText = e.label),
        (o.textContent = ""),
        a.append(i, n),
        t.append(a, o),
        t
      );
    }
    createThinkingToolFavicon(e) {
      const t = document.createElement("span");
      return (
        (t.className = "wa-research-step__tool-favicon"),
        (t.dataset.toolService = Gi(e)),
        t.setAttribute("aria-hidden", "true"),
        this.appendToolFaviconImage(t, Vi(e), {
          loading: "eager",
          onError: () => {
            t.textContent = Or(e);
          },
        }) || (t.textContent = Or(e)),
        t
      );
    }
    appendToolFaviconImage(e, t, a) {
      if (!t) return !1;
      const i = document.createElement("img");
      return (
        (i.alt = ""),
        (i.decoding = "async"),
        (i.loading = a.loading),
        (i.src = this.resolveAssetUrl(t)),
        i.addEventListener(
          "error",
          () => {
            e.contains(i) && (i.remove(), a.onError());
          },
          { once: !0 },
        ),
        e.append(i),
        !0
      );
    }
    getThinkingDetail(e, t) {
      return zi(e, t);
    }
    normalizeThinkingInput(e) {
      if (this.isThinkingStateConfig(e)) {
        const a = e.items.map((i, n) => this.normalizeThinkingItem(i, n));
        return {
          title: e.title || Fe,
          elapsed: e.elapsed,
          items: a.length ? a : [this.normalizeThinkingItem(Fe, 0)],
        };
      }
      const t = (Array.isArray(e) ? e : [e]).map((a, i) =>
        this.normalizeThinkingItem(a, i),
      );
      return {
        title: Fe,
        items: t.length ? t : [this.normalizeThinkingItem(Fe, 0)],
      };
    }
    normalizeThinkingItem(e, t) {
      const a = typeof e == "string" ? e : e.label;
      return {
        label: a,
        detail:
          typeof e == "string"
            ? this.getThinkingDetail(a, t)
            : e.detail || this.getThinkingDetail(a, t),
        disclosure:
          typeof e == "string"
            ? t === 0
              ? Ht
              : Vt
            : e.disclosure || (t === 0 ? Ht : Vt),
        duration: typeof e == "string" ? void 0 : e.duration,
        toolCalls: typeof e == "string" ? [] : (e.toolCalls ?? []),
      };
    }
    isThinkingStateConfig(e) {
      return !!(e && typeof e == "object" && !Array.isArray(e) && "items" in e);
    }
    createSectionHeader(e, t, a, i) {
      const n = document.createElement("div");
      n.className = `${e}__header`;
      const o = document.createElement("h3");
      if (
        ((o.className = `${e}__title`),
        (o.textContent = t),
        n.append(o),
        i && n.append(i),
        a)
      ) {
        const s = document.createElement("p");
        ((s.className = `${e}__subtitle`), (s.textContent = a), n.append(s));
      }
      return n;
    }
    claimCard(e) {
      const t = this.cardIndex,
        a = this.cardPool[t] ?? this.createCard(t),
        i = a.querySelector("[data-result-kicker]"),
        n = a.querySelector("[data-result-title]"),
        o = a.querySelector("[data-result-body]"),
        s = a.querySelector("[data-result-rows]"),
        c = a.querySelector("[data-result-actions]");
      return (
        (this.cardIndex += 1),
        (a.dataset.resultCard = e.id),
        (a.style.display = "none"),
        i && (i.textContent = e.kicker ?? "Result"),
        n && (n.textContent = e.title),
        o && (o.textContent = e.body ?? ""),
        s?.replaceChildren(
          ...(e.rows ?? []).map((l, d) => {
            const u = document.createElement("li");
            ((u.className = "wa-result-row"),
              (u.dataset.resultRow = `${e.id}-${d}`),
              (u.dataset.tone = l.tone ?? "neutral"));
            const h = document.createElement("span");
            h.textContent = l.label;
            const m = document.createElement("strong");
            return ((m.textContent = l.value), u.append(h, m), u);
          }),
        ),
        c?.replaceChildren(
          ...(e.actions ?? []).map((l) => {
            const d = document.createElement("button");
            return (
              (d.className = "wa-result-action"),
              (d.type = "button"),
              (d.textContent = l.label),
              (d.dataset.resultAction = l.targetId),
              d
            );
          }),
        ),
        g.set(a, {
          autoAlpha: 0,
          y: 18,
          scale: 0.985,
          transformOrigin: "center top",
        }),
        g.set(a.querySelectorAll(".wa-result-row, .wa-result-action"), {
          autoAlpha: 0,
          y: 8,
        }),
        a
      );
    }
    createCard(e) {
      const t = document.createElement("article");
      return (
        (t.className = "wa-result-card"),
        (t.dataset.resultCard = `result-${e}`),
        (t.innerHTML = `
      <div class="wa-result-card__topline" data-result-kicker></div>
      <h3 class="wa-result-card__title" data-result-title></h3>
      <p class="wa-result-card__body" data-result-body></p>
      <ul class="wa-result-card__rows" data-result-rows></ul>
      <div class="wa-result-card__actions" data-result-actions></div>
    `),
        (this.cardPool[e] = t),
        t
      );
    }
    createDataTable(e) {
      const t = document.createElement("article"),
        a = this.getDataTablePages(e),
        i = e.pagination?.activePage ?? a[0]?.page ?? 1;
      ((t.className = "wa-data-table"),
        (t.dataset.dataTable = e.id),
        (t.dataset.tableVariant = e.variant ?? "default"),
        (t.dataset.columnCount = String(e.columns.length)),
        (t.dataset.activePage = String(i)),
        e.scrollAlign && (t.dataset.scrollAlign = e.scrollAlign),
        e.footerClearance !== void 0 &&
          ((t.dataset.footerClearance = "true"),
          t.style.setProperty(
            "--wa-data-table-footer-clearance",
            `${e.footerClearance}px`,
          )),
        this.expectedDataTablePages.set(e.id, i),
        t.style.setProperty(
          "--wa-data-table-columns",
          e.columns.map((l) => l.width ?? "minmax(0, 1fr)").join(" "),
        ));
      const n = document.createElement("div");
      n.className = "wa-data-table__header";
      const o = document.createElement("div");
      ((o.className = "wa-data-table__meta"),
        (o.textContent = e.eyebrow ?? "Data marketplace"));
      const s = document.createElement("h3");
      if (
        ((s.className = "wa-data-table__title"),
        (s.textContent = e.title),
        n.append(o, s),
        e.count)
      ) {
        const l = document.createElement("span");
        ((l.className = "wa-data-table__count"),
          (l.textContent = e.count),
          n.append(l));
      }
      const c = document.createElement("div");
      ((c.className = "wa-data-table__grid"),
        c.append(this.createDataTableRow("header", e.columns, {}, e.id)));
      for (const l of a)
        for (const d of l.rows) {
          const u = this.createDataTableRow(
            d.id,
            e.columns,
            d.values,
            e.id,
            l.page,
          );
          (l.page !== i &&
            ((u.style.display = "none"), g.set(u, { autoAlpha: 0, y: 6 })),
            c.append(u));
        }
      return (
        t.append(n, c),
        (e.actions?.length || e.pagination) &&
          t.append(this.createDataTableFooter(e, a, i)),
        t
      );
    }
    createDataTableRow(e, t, a, i, n) {
      const o = document.createElement("div");
      ((o.className = "wa-data-table__row"), (o.dataset.tableRow = e));
      const s = e === "header";
      (s && (o.dataset.header = "true"),
        !s && a.source && (o.dataset.source = a.source),
        !s && n !== void 0 && (o.dataset.page = String(n)));
      for (const c of t) {
        const l = document.createElement(s ? "strong" : "span");
        ((l.className = "wa-data-table__cell"),
          (l.dataset.columnKey = c.key),
          s
            ? (l.textContent = c.label)
            : this.appendDataTableCellContent(l, c, a, i),
          o.append(l));
      }
      return (s && o.append(this.createDataTableAddButton(i)), o);
    }
    createDataTableAddButton(e, t = "") {
      const a = document.createElement("button");
      return (
        (a.className = `wa-data-table__add${t ? ` ${t}` : ""}`),
        (a.type = "button"),
        (a.tabIndex = -1),
        a.setAttribute("aria-label", `Add row to ${e}`),
        a.append(this.createDataTableAddIcon()),
        a
      );
    }
    appendDataTableCellContent(e, t, a, i) {
      switch (this.getDataTableCellType(t)) {
        case "person":
          e.append(this.createDataTablePerson(a, a[t.key] ?? "", t.person));
          return;
        case "mutualConnection":
          this.appendDataTableMutualConnectionCell(e, t, a);
          return;
        case "pillDetail":
          this.appendDataTablePillDetailCell(e, t, a);
          return;
        case "text":
          this.appendDataTableTextCell(
            e,
            a[t.key] ?? "",
            this.getDataTableEmptyPlaceholder(i, t),
          );
          return;
      }
    }
    getDataTableEmptyPlaceholder(e, t) {
      return t.key === "company" ||
        (e === "raw-webinar-attendees" && t.key === "email")
        ? ""
        : "-";
    }
    getDataTableCellType(e) {
      return e.cellType
        ? e.cellType
        : e.key === "mutualConnection"
          ? "mutualConnection"
          : "text";
    }
    getMutualConnectionPersonOptions(e) {
      return {
        detailKey: "mutualConnectionDetail",
        avatarToneKey: "mutualConnectionAvatarTone",
        avatarUrlKey: "mutualConnectionAvatarUrl",
        avatarKey: "mutualConnectionAvatar",
        sourceKey: "mutualConnectionSource",
        companyKey: "mutualConnectionCompany",
        ...e.person,
      };
    }
    appendDataTableMutualConnectionCell(e, t, a) {
      const i = this.getMutualConnectionPersonOptions(t),
        n = i.badgeKey ?? "mutualConnectionBadge";
      (e.append(this.createDataTablePerson(a, a[t.key] ?? "", i)),
        a[n] && e.append(this.createDataTableCellBadge(a[n])));
    }
    appendDataTableTextCell(e, t, a = "-") {
      const i = document.createElement("span");
      ((i.className = "wa-data-table__cell-text"),
        (i.textContent = t || a),
        e.append(i),
        t || (e.dataset.empty = "true"));
    }
    appendDataTablePillDetailCell(e, t, a) {
      const i = document.createElement("span"),
        n = document.createElement("span"),
        o = document.createElement("span"),
        s = a[`${t.key}Pill`] ?? "",
        c = a[t.key] ?? "";
      ((i.className = "wa-data-table-pill-detail"),
        (n.className = "wa-data-table-pill-detail__pill"),
        (n.textContent = s || "-"),
        (o.className = "wa-data-table-pill-detail__detail"),
        (o.textContent = c || "-"),
        i.append(n, o),
        e.append(i),
        c || (e.dataset.empty = "true"));
    }
    createDataTableAddIcon() {
      return this.createSvgIcon(
        "wa-data-table__add-icon",
        ["M12 5v14", "M5 12h14"],
        { size: 16 },
      );
    }
    createDataTableCellBadge(e) {
      const t = document.createElement("span");
      return (
        (t.className = "wa-data-table-cell-badge"),
        (t.textContent = e),
        t
      );
    }
    getDataTablePages(e) {
      return e.pagination?.pages.length
        ? e.pagination.pages
        : [
            {
              page: 1,
              range: e.count ?? `${e.rows.length} records`,
              rows: e.rows,
            },
          ];
    }
    createDataTableFooter(e, t, a) {
      const i = document.createElement("div");
      if (((i.className = "wa-data-table__footer"), e.actions?.length)) {
        const n = document.createElement("div");
        n.className = "wa-data-table__actions";
        for (const o of e.actions)
          n.append(this.createDataTableAction(e.id, o));
        i.append(n);
      }
      if (e.pagination) {
        const n = document.createElement("div");
        n.className = "wa-data-table__pagination";
        const o = t.find((l) => l.page === a)?.range ?? t[0]?.range ?? "",
          s = document.createElement("span");
        ((s.className = "wa-data-table__range"),
          (s.dataset.tablePageRange = ""),
          (s.textContent = o));
        const c = document.createElement("span");
        ((c.className = "wa-data-table__page-controls"),
          c.append(
            this.createDataTablePaginationChevron("previous", a, t.length),
          ));
        for (const l of t) {
          const d = document.createElement("button"),
            u = l.page === a;
          ((d.className = "wa-data-table__page-button"),
            (d.type = "button"),
            (d.tabIndex = -1),
            (d.dataset.pageButtonRole = "dot"),
            (d.dataset.pageCount = String(t.length)),
            (d.dataset.tablePageButton = String(l.page)),
            (d.dataset.pageRange = l.range),
            (d.dataset.active = String(u)),
            d.setAttribute("aria-label", `Show page ${l.page}`),
            d.setAttribute("aria-current", u ? "page" : "false"),
            c.append(d));
        }
        (c.append(this.createDataTablePaginationChevron("next", a, t.length)),
          n.append(s, c),
          i.append(n));
      }
      return i;
    }
    createDataTablePaginationChevron(e, t, a) {
      const i = document.createElement("button");
      return (
        (i.className = "wa-data-table__page-button"),
        (i.type = "button"),
        (i.tabIndex = -1),
        (i.dataset.pageButtonRole = e),
        (i.dataset.pageCount = String(a)),
        i.setAttribute(
          "aria-label",
          e === "previous" ? "Show previous page" : "Show next page",
        ),
        i.append(this.createDataTablePaginationChevronIcon(e)),
        this.updateDataTablePageButton(i, t),
        i
      );
    }
    createDataTablePaginationChevronIcon(e) {
      const t = e === "previous" ? "M15 6l-6 6l6 6" : "M9 6l6 6l-6 6";
      return this.createSvgIcon("wa-data-table__page-chevron", [t], {
        size: 18,
      });
    }
    createDataTableAction(e, t) {
      const a = document.createElement("button");
      ((a.className = "wa-data-table-action"),
        (a.type = "button"),
        (a.tabIndex = -1),
        (a.dataset.tableAction = t.id),
        (a.dataset.tableActionTable = e),
        (a.dataset.actionVariant = t.variant ?? "secondary"),
        (a.dataset.selected = "false"),
        a.setAttribute("aria-label", t.label),
        a.setAttribute("aria-pressed", "false"));
      const i = document.createElement("span");
      if (
        ((i.className = "wa-data-table-action__label"),
        (i.textContent = t.label),
        a.append(this.createDataTableActionIcon(t.icon ?? "email"), i),
        t.badge)
      ) {
        const n = document.createElement("span");
        ((n.className = "wa-data-table-action__badge"),
          (n.textContent = t.badge),
          a.append(n));
      }
      return a;
    }
    createDataTableActionIcon(e) {
      const t =
        e === "dialer"
          ? [
              "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2",
              "M15 7a2 2 0 0 1 2 2",
              "M15 3a6 6 0 0 1 6 6",
            ]
          : [
              "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
              "M3 7l9 6l9 -6",
            ];
      return this.createSvgIcon("wa-data-table-action__icon", t, { size: 16 });
    }
    findDataTablePageButton(e) {
      return e instanceof Element ? e.closest(Ki) : null;
    }
    findDataTableActionButton(e) {
      return e instanceof Element ? e.closest("[data-table-action]") : null;
    }
    dataTableActionSelected(e, t) {
      return g.timeline().call(() => {
        const i = this.findDataTable(e)?.querySelector(
          `[data-table-action="${this.escapeSelectorValue(t)}"]`,
        );
        i && this.selectDataTableActionButton(i, { animate: !0 });
      });
    }
    selectDataTableActionButton(e, t = {}) {
      (e
        .closest(eo)
        ?.querySelectorAll("[data-table-action]")
        .forEach((i) => {
          const n = i === e;
          ((i.dataset.selected = String(n)),
            i.setAttribute("aria-pressed", String(n)));
        }),
        t.animate && this.playDataTableActionPress(e));
    }
    playDataTableActionPress(e) {
      this.prefersReducedMotion ||
        (g.killTweensOf(e, "scale,transform"),
        g.set(e, { transformOrigin: "center center" }),
        g
          .timeline()
          .to(e, {
            scale: 0.975,
            duration: x(0.08),
            ease: "power2.out",
            overwrite: "auto",
          })
          .to(e, {
            scale: 1.018,
            duration: x(0.18),
            ease: "back.out(2.4)",
            overwrite: "auto",
          })
          .to(e, {
            scale: 1,
            duration: x(0.14),
            ease: "power2.out",
            overwrite: "auto",
            clearProps: "transform",
          }));
    }
    getDataTablePageButtonRuntime(e) {
      const t = e.closest(eo),
        a = t?.dataset.dataTable,
        i = this.parseFiniteNumber(e.dataset.tablePageButton);
      if (!t || !a || i === null) return null;
      const n =
        e.dataset.pageRange ??
        this.findDataTablePageDotButton(t, i)?.dataset.pageRange ??
        null;
      return {
        table: t,
        tableId: a,
        page: i,
        pageRange: n,
        initialPage: this.parseFiniteNumber(t.dataset.activePage),
        initialRangeText: t.querySelector(Xi)?.textContent ?? null,
      };
    }
    findDataTable(e) {
      return this.root.querySelector(
        `[data-data-table="${this.escapeSelectorValue(e)}"]`,
      );
    }
    findDataTablePageDotButton(e, t) {
      return e.querySelector(
        `[data-page-button-role="dot"][data-table-page-button="${this.escapeSelectorValue(String(t))}"]`,
      );
    }
    getDataTablePageRuntime(e, t) {
      const a = this.findDataTable(e);
      if (!a) return null;
      const i = this.queryElements(a, Ki);
      return {
        table: a,
        activePage: this.parseFiniteNumber(a.dataset.activePage),
        currentRows: this.getVisibleDataTableRows(a),
        targetRows: this.queryElements(
          a,
          `.wa-data-table__row[data-page="${t}"]`,
        ),
        buttons: i,
        targetButton: i.find(
          (n) =>
            n.dataset.pageButtonRole === "dot" &&
            this.parseFiniteNumber(n.dataset.tablePageButton) === t,
        ),
        range: a.querySelector(Xi),
      };
    }
    getVisibleDataTableRows(e) {
      return this.queryElements(e, ".wa-data-table__row[data-page]").filter(
        (t) => this.isInlineDisplayVisible(t),
      );
    }
    createDataTablePerson(e, t, a = {}) {
      const i = document.createElement("span");
      i.className = "wa-data-table-person";
      const n = document.createElement("span");
      n.className = "wa-data-table-person__avatar-wrap";
      const o = document.createElement("span");
      ((o.className = "wa-data-table-person__avatar"),
        (o.dataset.avatarTone = e[a.avatarToneKey ?? "avatarTone"] ?? "1"),
        this.setProfileAvatar(
          o,
          t,
          e[a.avatarUrlKey ?? "avatarUrl"],
          e[a.avatarKey ?? "avatar"],
        ));
      const s = this.createDataTablePersonSourceBadge(e, a),
        c = document.createElement("span");
      ((c.className = "wa-data-table-person__name"),
        (c.textContent = t || "-"),
        n.append(o, s));
      const l = document.createElement("span");
      ((l.className = "wa-data-table-person__copy"), l.append(c));
      const d = e[a.detailKey ?? "prospectDetail"] || e.personDetail || "";
      if (d) {
        const u = document.createElement("span");
        ((u.className = "wa-data-table-person__detail"),
          (u.textContent = d),
          l.append(u));
      }
      return (i.append(n, l), i);
    }
    createDataTablePersonSourceBadge(e, t = {}) {
      const a = document.createElement("span"),
        i = this.getPersonBadgeCompany(e, t),
        n = this.getCompanyLogoUrl(i, e);
      if (
        ((a.className = "wa-data-table-person__source"),
        (a.dataset.source = e[t.sourceKey ?? "source"] ?? "default"),
        a.setAttribute("aria-hidden", "true"),
        !i)
      )
        return a;
      if (
        ((a.dataset.source = "company"),
        (a.dataset.company = i),
        (a.title = i),
        !n)
      )
        return ((a.dataset.hasLogo = "false"), a);
      const o = document.createElement("img");
      return (
        (o.className = "wa-data-table-person__source-logo"),
        (o.alt = ""),
        (o.decoding = "async"),
        (o.referrerPolicy = "no-referrer"),
        o.addEventListener(
          "load",
          () => {
            a.dataset.hasLogo = "true";
          },
          { once: !0 },
        ),
        o.addEventListener(
          "error",
          () => {
            a.contains(o) && (o.remove(), (a.dataset.hasLogo = "false"));
          },
          { once: !0 },
        ),
        (o.src = this.resolveAssetUrl(n)),
        a.append(o),
        a
      );
    }
    createSequenceCompanyBadge(e) {
      const t = this.getCompanyLogoUrl(e, {});
      if (!t) return null;
      const a = document.createElement("span"),
        i = document.createElement("img");
      return (
        (a.className = "wa-sequence-person-card__company"),
        (a.title = e),
        a.setAttribute("aria-hidden", "true"),
        (i.alt = ""),
        (i.decoding = "async"),
        (i.src = this.resolveAssetUrl(t)),
        a.append(i),
        a
      );
    }
    getPersonBadgeCompany(e, t = {}) {
      const a = e[t.companyKey ?? "company"]?.trim();
      if (a) return a;
      const i = e[t.detailKey ?? "prospectDetail"] || e.personDetail || "",
        n = this.getCompanyNameFromPersonDetail(i);
      return n || this.getCompanyNameFromEmailValues(e);
    }
    getCompanyLogoUrl(e, t) {
      const a = t.companyLogo || t.logoUrl;
      if (a) return a;
      const i = this.getCompanyKey(e),
        n = jl[i];
      if (n) return n;
      const o = t.companyLogoSlug || this.getCompanyLogoIconSlug(e);
      if (o) return `${Rc}/${encodeURIComponent(o)}.svg`;
      const s =
        t.companyDomain ||
        this.getCompanyLogoDomain(e) ||
        this.getEmailDomainFromValues(t);
      return s ? `${Ic}?domain=${encodeURIComponent(s)}&sz=64` : "";
    }
    getCompanyLogoIconSlug(e) {
      return e ? (qc[this.getCompanyKey(e)] ?? "") : "";
    }
    getCompanyLogoDomain(e) {
      return e ? (Bc[this.getCompanyKey(e)] ?? "") : "";
    }
    getCompanyKey(e) {
      return e
        .toLowerCase()
        .replace(/\b(inc|llc|ltd|corp|corporation|company)\b\.?/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    }
    getCompanyNameFromPersonDetail(e) {
      const t = e.trim();
      if (!t) return "";
      const a = t
        .match(/(?:@|\bat\s+)([A-Z][A-Za-z0-9& .-]+)(?:\s*\([^()]*\))?$/)?.[1]
        ?.trim();
      if (a) return a;
      const i = t
        .match(/,\s*([A-Z][A-Za-z0-9& .-]+?)(?:\s*\([^()]*\))?$/)?.[1]
        ?.trim();
      if (
        i &&
        !/(?:\d+\s*(?:yrs?|years?|mos?|months?)|mba|gsb|school|studied)/i.test(
          i,
        )
      )
        return i;
      const n = t.match(/\(([^()]+)\)\s*$/)?.[1]?.trim();
      return !n ||
        /(?:\d+\s*(?:yrs?|years?|mos?|months?)|mba|gsb|school|studied)/i.test(n)
        ? ""
        : n.match(/(?:@|\bat\s+)([A-Z][A-Za-z0-9& .-]+)$/)?.[1]?.trim() || n;
    }
    getCompanyNameFromEmailValues(e) {
      const t = this.getEmailDomainFromValues(e);
      return t
        ? (t.split(".")[0] ?? "")
            .split(/[-_]+/)
            .filter(Boolean)
            .map((i) => i[0]?.toUpperCase() + i.slice(1))
            .join(" ")
        : "";
    }
    getEmailDomainFromValues(e) {
      return (
        Object.entries(e)
          .find(
            ([i, n]) => i.toLowerCase().includes("email") && n.includes("@"),
          )?.[1]
          ?.trim()
          ?.split("@")
          .pop()
          ?.toLowerCase()
          .replace(/[^a-z0-9.-]/g, "") ?? ""
      );
    }
    getInitials(e) {
      return e
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((t) => t[0]?.toUpperCase() ?? "")
        .join("");
    }
    setProfileAvatar(e, t, a, i) {
      const n = Ba(t, a),
        o = n ? this.resolveAssetUrl(n) : "";
      if ((e.replaceChildren(), (e.dataset.hasPhoto = String(!!o)), !o)) {
        e.textContent = i ?? this.getInitials(t);
        return;
      }
      const s = document.createElement("img");
      ((s.alt = ""),
        (s.decoding = "async"),
        (s.loading = "lazy"),
        (s.referrerPolicy = "no-referrer"),
        (s.src = o),
        s.addEventListener(
          "error",
          () => {
            e.contains(s) &&
              ((e.dataset.hasPhoto = "false"),
              (e.textContent = i ?? this.getInitials(t)));
          },
          { once: !0 },
        ),
        e.append(s));
    }
    createEnrichmentPanel(e) {
      const t = document.createElement("article");
      ((t.className = "wa-enrichment-panel wa-waterfall-thinking"),
        (t.dataset.enrichmentPanel = e.id));
      const a = document.createElement("div");
      a.className = "wa-enrichment-panel__header";
      const i = this.createThinkingLogo(),
        n = document.createElement("span");
      ((n.className = "wa-thinking__title"),
        (n.textContent = "Enriching contacts"),
        a.append(i, n));
      const o = document.createElement("div");
      return (
        (o.className = "wa-waterfall-rows"),
        o.append(
          ...this.getWaterfallRows(e).map((s) =>
            this.createWaterfallRow(s.label, s.state, s.chips),
          ),
        ),
        t.append(a, o),
        t
      );
    }
    getWaterfallRows(e) {
      const t = e.fields
        .map((a) => this.createWaterfallRowConfig(a.title, a.steps))
        .filter((a) => !!a);
      return t.length ? t : Lc;
    }
    createWaterfallRowConfig(e, t) {
      const a = t.map((o) => o.trim()).filter(Boolean),
        i = this.getWaterfallCompletionIndex(e, a),
        n = a.map((o, s) => ({
          label: o,
          service: Gi(o),
          state: s < i ? "failed" : s === i ? "complete" : "pending",
        }));
      return !e.trim() || !n.length
        ? null
        : {
            label: e.trim(),
            state: n.some((o) => o.state === "complete")
              ? "complete"
              : "failed",
            chips: n,
          };
    }
    getWaterfallCompletionIndex(e, t) {
      if (/\b(?:mobile|phone)\b/i.test(e)) {
        const i = t.findIndex((n) => Gi(n) === "on-prem");
        if (i >= 0) return i;
      }
      return t.length - 1;
    }
    createWaterfallRow(e, t, a) {
      const i = document.createElement("div");
      ((i.className = "wa-waterfall-row"),
        (i.dataset.stepState = "pending"),
        (i.dataset.finalStepState = t));
      const n = document.createElement("span");
      ((n.className = "wa-waterfall-row__status"),
        n.setAttribute("aria-hidden", "true"));
      const o = document.createElement("span");
      ((o.className = "wa-waterfall-row__label"), (o.textContent = e));
      const s = document.createElement("span");
      return (
        (s.className = "wa-waterfall-row__chips"),
        a.forEach((c, l) => {
          const d = document.createElement("span"),
            u = this.createWaterfallServiceBadge(c);
          if (
            ((d.className = "wa-waterfall-service-step"),
            d.append(u),
            l < a.length - 1)
          ) {
            const h = document.createElement("span");
            ((h.className = "wa-waterfall-arrow"),
              h.setAttribute("aria-hidden", "true"),
              h.append(this.createTablerIcon("arrow-right", 16)),
              d.append(h));
          }
          s.append(d);
        }),
        i.append(n, o, s),
        i
      );
    }
    createWaterfallServiceBadge(e) {
      const t = document.createElement("span"),
        a = document.createElement("span"),
        i = document.createElement("span");
      ((t.className = "wa-waterfall-chip"),
        (t.dataset.service = e.service),
        (t.dataset.stepState = "pending"),
        (t.dataset.finalStepState = e.state),
        (a.className = "wa-waterfall-chip__icon"),
        a.setAttribute("aria-hidden", "true"),
        this.appendWaterfallServiceIcon(a, e));
      const n = document.createElement("span");
      return (
        (n.className = "wa-waterfall-chip__state-icon"),
        n.setAttribute("aria-hidden", "true"),
        n.append(
          this.createTablerIcon("check", 14),
          this.createTablerIcon("x", 14),
        ),
        (i.className = "wa-waterfall-chip__label"),
        (i.textContent = e.label),
        t.append(a, n, i),
        t
      );
    }
    createTablerIcon(e, t) {
      const a =
        e === "arrow-right"
          ? ["M5 12h14", "M13 18l6 -6", "M13 6l6 6"]
          : e === "check"
            ? ["M5 12l5 5l10 -10"]
            : ["M18 6l-12 12", "M6 6l12 12"];
      return this.createSvgIcon("", a, {
        size: t,
        pathAttributes: {
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
      });
    }
    createSvgIcon(
      e,
      t,
      { size: a = 16, viewBox: i = "0 0 24 24", pathAttributes: n = {} } = {},
    ) {
      const o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      (e && o.classList.add(e),
        o.setAttribute("width", String(a)),
        o.setAttribute("height", String(a)),
        o.setAttribute("viewBox", i),
        o.setAttribute("aria-hidden", "true"),
        o.setAttribute("focusable", "false"));
      for (const s of t) {
        const c = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        c.setAttribute("d", s);
        for (const [l, d] of Object.entries(n)) c.setAttribute(l, d);
        o.append(c);
      }
      return o;
    }
    appendWaterfallServiceIcon(e, t) {
      const { label: a, service: i } = t;
      if (i === "on-prem") {
        e.append(zr("wa-waterfall-chip__mark"));
        return;
      }
      const n = Vi(a) || Vi(i);
      if (n) {
        ((e.dataset.hasFavicon = "true"),
          this.appendToolFaviconImage(e, n, {
            loading: "eager",
            onError: () => {
              (e.replaceChildren(),
                delete e.dataset.hasFavicon,
                this.appendWaterfallServiceGlyph(e, i));
            },
          }));
        return;
      }
      this.appendWaterfallServiceGlyph(e, i);
    }
    appendWaterfallServiceGlyph(e, t) {
      const a = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        i = document.createElementNS("http://www.w3.org/2000/svg", "path");
      (a.setAttribute("viewBox", "0 0 16 16"),
        a.setAttribute("aria-hidden", "true"),
        a.setAttribute("focusable", "false"),
        i.setAttribute("fill", "none"),
        i.setAttribute("stroke", "currentColor"),
        i.setAttribute("stroke-width", "1.8"),
        i.setAttribute("stroke-linecap", "round"),
        i.setAttribute("stroke-linejoin", "round"),
        i.setAttribute("d", io[t] ?? io.default),
        a.append(i),
        e.append(a));
    }
    animateEnrichmentWaterfall(e) {
      const t = g.timeline();
      return (
        e.forEach((a, i) => {
          const n = this.queryElements(a, ".wa-waterfall-chip"),
            o = this.queryElements(a, ".wa-waterfall-service-step"),
            s = this.getAttemptedWaterfallChips(n),
            c = this.getWaterfallFinalState(a),
            l = g.timeline(),
            d = ze.rowOffsets[i % ze.rowOffsets.length] ?? 0,
            u =
              ze.serviceLoadDuration +
              (i % 2 === 0 ? ze.serviceLoadVariance : -ze.serviceLoadVariance);
          (l
            .call(() => this.setWaterfallState(a, "loading"))
            .to(
              o,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: ze.serviceRevealDuration,
                ease: "power2.out",
                stagger: 0.035,
              },
              "<",
            ),
            s.forEach((h) => {
              const m = this.getWaterfallFinalState(h);
              l.call(() => this.setWaterfallState(h, "loading"))
                .to(
                  h,
                  {
                    scale: 1.025,
                    duration: ze.serviceSettleDuration,
                    ease: "power2.out",
                  },
                  "<",
                )
                .to({}, { duration: u })
                .call(() => this.setWaterfallState(h, m))
                .to(h, {
                  scale: 1,
                  duration: ze.serviceSettleDuration,
                  ease: m === "complete" ? "back.out(1.8)" : "power2.out",
                });
            }),
            l
              .call(() => this.setWaterfallState(a, c))
              .to({}, { duration: ze.rowCompleteHold }),
            t.add(l, d));
        }),
        t
      );
    }
    getAttemptedWaterfallChips(e) {
      const t = [];
      for (const a of e) {
        const i = this.getWaterfallFinalState(a);
        if (i === "pending" || (t.push(a), i === "complete")) break;
      }
      return t;
    }
    getWaterfallFinalState(e) {
      const t = e.dataset.finalStepState;
      return t === "complete" || t === "failed" || t === "pending"
        ? t
        : "pending";
    }
    setWaterfallState(e, t) {
      e.dataset.stepState = t;
    }
    createStrategyPlan(e) {
      const t = document.createElement("article");
      ((t.className = "wa-strategy-plan"), (t.dataset.strategyPlan = e.id));
      const a = document.createElement("div");
      a.className = "wa-strategy-plan__surface";
      const i = document.createElement("h3");
      ((i.className = "wa-strategy-plan__title"), (i.textContent = e.title));
      const n = document.createElement("ul");
      n.className = "wa-strategy-plan__bullets";
      for (const o of this.getStrategyPlanBullets(e)) {
        const s = document.createElement("li");
        ((s.textContent = o), n.append(s));
      }
      return (a.append(i, n), t.append(a), t);
    }
    getStrategyPlanBullets(e) {
      return e.bullets?.length
        ? e.bullets
        : e.summary
          ? e.summary
              .split(/\n+/)
              .map((t) => t.trim())
              .filter(Boolean)
          : [e.audience, e.motion, e.proof].filter((t) => !!t);
    }
    createDataSourcesGrid(e) {
      const t = document.createElement("section");
      ((t.className = "wa-data-source-grid"),
        (t.dataset.dataSourcesGrid = e.id));
      const a = this.createSectionHeader(
          "wa-data-source-grid",
          e.title,
          e.subtitle,
        ),
        i = document.createElement("div");
      return (
        (i.className = "wa-data-source-grid__list"),
        e.sources.forEach((n) => {
          i.append(this.createDataSourceCard(n));
        }),
        t.append(a, i),
        t
      );
    }
    createMarketingDataSourcesGrid(e) {
      const t = this.createDataSourcesGrid(e),
        a = document.createElement("div"),
        i = document.createElement("div"),
        n = t.querySelector(".wa-data-source-grid__header"),
        o = this.groupDataSources(e.sources);
      return (
        t.classList.add("wa-data-source-grid--marketing"),
        (t.dataset.marketingDataSourcesGrid = e.id),
        (a.className = "wa-data-source-grid__scale"),
        (i.className = "wa-data-source-grid__groups"),
        Ec.forEach((s) => {
          const c = document.createElement("div");
          ((c.className = "wa-data-source-grid__column"),
            s.forEach((l) => {
              const d = o.find((u) => u.category === l);
              d && c.append(this.createMarketingDataSourceGroup(d));
            }),
            i.append(c));
        }),
        a.replaceChildren(...this.compactElements(n, i)),
        t.replaceChildren(a),
        this.setMarketingDataGridScale(t),
        t
      );
    }
    setMarketingDataGridScale(e) {
      const t = getComputedStyle(this.chatBody),
        a = Number.parseFloat(t.paddingLeft) || 0,
        i = Number.parseFloat(t.paddingRight) || a,
        o =
          e.clientWidth ||
          e.getBoundingClientRect().width ||
          Math.max(
            0,
            (this.chatBody.clientWidth ||
              this.chatBody.getBoundingClientRect().width) -
              a -
              i,
          ),
        s =
          this.chatBody.clientHeight ||
          this.chatBody.getBoundingClientRect().height,
        c = Math.max(0, o) / Na.contentWidth,
        l = Math.max(0, s) / Na.height,
        d = Math.min(c || 1, l || 1),
        u = Na.contentWidth,
        h = Math.ceil(Na.height * d);
      (this.setStyleProperty(e, "--wa-data-grid-scale", String(d)),
        this.setStyleProperty(e, "--wa-data-grid-artboard-width", `${u}px`),
        this.setStyleProperty(e, "--wa-data-grid-gutter-left", "0px"),
        this.setStyleProperty(e, "--wa-data-grid-gutter-right", "0px"),
        this.setStyleProperty(e, "--wa-data-grid-scaled-height", `${h}px`));
    }
    updateMarketingDataGridScales() {
      this.queryElements(this.thread, $r).forEach((e) => {
        this.setMarketingDataGridScale(e);
      });
    }
    setStyleProperty(e, t, a) {
      e.style.getPropertyValue(t) !== a && e.style.setProperty(t, a);
    }
    createMarketingDataSourceGroup(e) {
      const t = document.createElement("section"),
        a = document.createElement("h4"),
        i = document.createElement("div");
      return (
        (t.className = "wa-data-source-group"),
        (t.dataset.sourceGroup = this.slugChannelName(e.category)),
        (a.className = "wa-data-source-group__title"),
        (a.textContent = e.category),
        (i.className = "wa-data-source-grid__list"),
        i.classList.add(`wa-data-source-grid__list--count-${e.sources.length}`),
        e.sources.forEach((n) => {
          i.append(this.createDataVendorLogo(n));
        }),
        t.append(a, i),
        t
      );
    }
    createDataVendorLogo(e) {
      const t = document.createElement("span");
      ((t.className = "wa-data-vendor-logo"),
        (t.dataset.vendorLogo = e.id),
        (t.title = e.detail),
        t.style.setProperty("--wa-logo-scale", String(e.logoScale ?? 1)));
      const a = e.logoSrc
        ? document.createElement("img")
        : document.createElement("span");
      return (
        e.logoSrc && a instanceof HTMLImageElement
          ? (t.classList.add("wa-data-vendor-logo--image"),
            (a.className = "wa-data-vendor-logo__image"),
            (a.alt = e.name),
            (a.decoding = "async"),
            (a.draggable = !1),
            (a.loading = "lazy"),
            (a.src = this.resolveAssetUrl(e.logoSrc)))
          : ((a.className = "wa-data-vendor-logo__mark"),
            (a.textContent = e.name)),
        t.append(a),
        t
      );
    }
    groupDataSources(e) {
      const t = [],
        a = new Map();
      return (
        e.forEach((i) => {
          const n = i.category ?? "Data partners";
          let o = a.get(n);
          (o || ((o = { category: n, sources: [] }), a.set(n, o), t.push(o)),
            o.sources.push(i));
        }),
        t
      );
    }
    createDataSourceCard(e) {
      const t = document.createElement("article");
      ((t.className = "wa-data-source-card"), (t.dataset.dataSource = e.id));
      const a = document.createElement("span");
      ((a.className = "wa-data-source-card__icon"),
        a.setAttribute("aria-hidden", "true"));
      const i = document.createElement("span");
      i.className = "wa-data-source-card__copy";
      const n = document.createElement("strong");
      n.textContent = e.name;
      const o = document.createElement("span");
      return ((o.textContent = e.detail), i.append(n, o), t.append(a, i), t);
    }
    createOutreachStyleProfile(e) {
      const t = document.createElement("section");
      ((t.className = "wa-style-profile"), (t.dataset.styleProfile = e.id));
      const a = this.createSectionHeader(
          "wa-style-profile",
          e.title,
          e.subtitle,
        ),
        i = document.createElement("div");
      if (
        ((i.className = "wa-style-profile__rows"),
        e.signals.forEach((n) => {
          const o = document.createElement("div");
          o.className = "wa-style-profile__row";
          const s = document.createElement("span");
          s.textContent = n.label;
          const c = document.createElement("strong");
          ((c.textContent = n.value), o.append(s, c), i.append(o));
        }),
        t.append(a, i),
        e.examples?.length)
      ) {
        const n = document.createElement("div");
        ((n.className = "wa-style-profile__examples"),
          e.examples.forEach((o) => {
            const s = document.createElement("blockquote");
            ((s.className = "wa-style-profile__example"),
              (s.textContent = o),
              n.append(s));
          }),
          t.append(n));
      }
      return t;
    }
    createMailboxConnection(e) {
      const t = document.createElement("section");
      ((t.className = "wa-mailbox-connection"),
        (t.dataset.mailboxConnection = e.id),
        (t.dataset.mailboxState = "idle"));
      const a = document.createElement("div");
      a.className = "wa-mailbox-connection__card";
      const i = document.createElement("span");
      i.className = "wa-mailbox-connection__copy";
      const n = document.createElement("h3");
      if (
        ((n.className = "wa-mailbox-connection__title"),
        (n.textContent = e.title),
        e.subtitle)
      ) {
        const b = document.createElement("p");
        ((b.className = "wa-mailbox-connection__subtitle"),
          (b.textContent = e.subtitle),
          i.append(n, b));
      } else i.append(n);
      const o = document.createElement("div");
      o.className = "wa-mailbox-connection__actions";
      const s = this.createMailboxProviderButton({
          id: e.id,
          icon: "gmail",
          label: Zi("gmail", e.ctaLabel),
          loadingLabel: $i(e.loadingLabel, "Connecting"),
          connectedLabel: Zi("gmail", e.status, "connected"),
          isPrimary: !0,
        }),
        c = this.createMailboxProviderButton({
          icon: "outlook",
          label: Zi("outlook", e.secondaryCtaLabel),
        });
      (o.append(s, c), a.append(i, o));
      const l = document.createElement("div");
      ((l.className = "wa-mailbox-learning"),
        (l.dataset.mailboxLearning = ""),
        (l.dataset.mailboxLearningReadyDetail = e.learningReadyDetail ?? Yr));
      const d = document.createElement("div");
      ((d.className = "wa-mailbox-learning__thumbprint"),
        d.append(this.createMailboxThumbprint(e.id)));
      const u = document.createElement("h4");
      u.className = "wa-mailbox-learning__title";
      const h = document.createElement("span");
      ((h.dataset.mailboxLearningTitleText = ""),
        (h.textContent = e.learningTitle ?? Qr));
      const m = document.createElement("span");
      ((m.className = "wa-mailbox-learning__ready-chevron"),
        (m.dataset.mailboxLearningReadyChevron = ""),
        m.setAttribute("aria-hidden", "true"),
        u.append(h, m));
      const f = document.createElement("p");
      ((f.className = "wa-mailbox-learning__detail"),
        (f.textContent = e.learningDetail ?? Yi[0].detail));
      const p = document.createElement("div");
      p.className = "wa-mailbox-learning__progress";
      const w = document.createElement("span");
      return (
        (w.dataset.mailboxLearningProgress = ""),
        p.append(w),
        l.append(d, u, p, f),
        t.append(a, l),
        t
      );
    }
    createMailboxProviderButton(e) {
      const t = document.createElement("button");
      ((t.className = "wa-mailbox-connection__button"),
        (t.type = "button"),
        t.setAttribute("aria-label", e.label),
        e.isPrimary &&
          e.id &&
          ((t.dataset.mailboxConnect = e.id),
          (t.dataset.mailboxLoadingLabel = $i(e.loadingLabel, "Connecting")),
          (t.dataset.mailboxConnectedLabel = e.connectedLabel ?? "Gmail")));
      const a = this.createMailboxProviderIcon(e.icon),
        i = document.createElement("span");
      i.className = "wa-mailbox-connection__button-copy";
      const n = document.createElement("span");
      if (
        ((n.className = e.isPrimary
          ? "wa-mailbox-connection__button-label"
          : "wa-mailbox-connection__provider-label"),
        e.isPrimary &&
          ((n.dataset.mailboxButtonLabel = "idle"),
          n.setAttribute("aria-hidden", "true")),
        (n.textContent = e.label),
        i.append(n),
        e.isPrimary)
      ) {
        const s = document.createElement("span");
        ((s.className = "wa-mailbox-connection__button-label"),
          (s.dataset.mailboxButtonLabel = "loading"),
          s.setAttribute("aria-hidden", "true"),
          (s.textContent = $i(e.loadingLabel, "Connecting")));
        const c = document.createElement("span"),
          l = this.createSvgIcon(
            "wa-mailbox-connection__connected-icon",
            ["M5 12l5 5l10 -10"],
            { size: 16 },
          ),
          d = document.createElement("span");
        ((c.className = "wa-mailbox-connection__button-label"),
          (c.dataset.mailboxButtonLabel = "connected"),
          c.setAttribute("aria-hidden", "true"),
          (d.textContent = e.connectedLabel ?? "Gmail"),
          c.append(l, d),
          i.append(s, c));
      }
      const o = document.createElement("span");
      return (
        (o.className = "wa-mailbox-connection__spinner"),
        o.setAttribute("aria-hidden", "true"),
        t.append(a, i, o),
        t
      );
    }
    createMailboxProviderIcon(e) {
      const t = document.createElement("img");
      return (
        (t.className = "wa-mailbox-connection__provider-icon"),
        (t.src = this.resolveAssetUrl(wc[e])),
        (t.alt = ""),
        (t.decoding = "async"),
        (t.loading = "eager"),
        t.setAttribute("aria-hidden", "true"),
        t
      );
    }
    createMailboxThumbprint(e) {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      return (
        t.classList.add("wa-mailbox-thumbprint"),
        (t.dataset.mailboxThumbprint = e),
        t.setAttribute("viewBox", "0 0 200 203"),
        t.setAttribute("aria-hidden", "true"),
        t.setAttribute("focusable", "false"),
        t.append(
          this.createMailboxThumbprintGroup("wa-mailbox-thumbprint__base"),
          this.createMailboxThumbprintGroup("wa-mailbox-thumbprint__fill", !0),
        ),
        t
      );
    }
    createMailboxThumbprintGroup(e, t = !1) {
      const a = document.createElementNS("http://www.w3.org/2000/svg", "g");
      return (
        a.classList.add(e),
        yc.forEach((i, n) => {
          const o = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          (o.setAttribute("d", i),
            o.setAttribute("fill", "none"),
            o.setAttribute("stroke-linecap", "round"),
            o.setAttribute("stroke-miterlimit", "10"),
            t &&
              ((o.dataset.mailboxThumbprintPath = String(n)),
              o.setAttribute("pathLength", "100"),
              o.setAttribute("stroke-dasharray", "0 100"),
              o.setAttribute("stroke-dashoffset", "0")),
            a.append(o));
        }),
        a
      );
    }
    updateMailboxThumbprintFill(e, t) {
      e.forEach((a, i) => {
        const n = Fc(i, t);
        if (n <= 0) {
          a.setAttribute("stroke-dasharray", "0 100");
          return;
        }
        a.setAttribute("stroke-dasharray", n >= 100 ? "100 0" : `${n} 100`);
      });
    }
    createProximityLeadList(e) {
      const t = this.createDataTable({
        id: e.id,
        title: e.title,
        eyebrow: "ranked leads",
        count: `${e.leads.length} leads`,
        columns: [
          {
            key: "name",
            label: "Prospect",
            width: "1.18fr",
            cellType: "person",
          },
          {
            key: "connection",
            label: "Connection",
            width: "2fr",
            cellType: "pillDetail",
          },
        ],
        rows: e.leads.map((a) => ({
          id: `proximity-${a.rank}`,
          values: {
            name: a.name,
            prospectDetail: `${a.title} at ${a.company}`,
            company: a.company,
            connection: a.personalization.trim(),
            connectionPill: a.proximity.trim(),
            source: "company",
            avatarTone: a.rank,
            avatarUrl: a.avatarUrl ?? "",
            score: a.score,
          },
        })),
      });
      return (
        t.classList.add("wa-data-table--proximity"),
        (t.dataset.proximityList = e.id),
        t
      );
    }
    createPersonalizationSwipeGame(e) {
      const t = document.createElement("section");
      ((t.className = "wa-mini-game wa-swipe-game"),
        (t.dataset.personalizationSwipeGame = e.id));
      const a = this.createSectionHeader(
          "wa-mini-game",
          e.title,
          e.subtitle ??
            "Swipe to teach the agent which personalization patterns sound like you.",
        ),
        i = document.createElement("span");
      ((i.className = "wa-mini-game__eyebrow"),
        (i.textContent = "Mini game"),
        a.prepend(i));
      const n = document.createElement("p");
      ((n.className = "wa-swipe-game__prompt"),
        (n.textContent =
          e.prompt ?? "Swipe toward the personalization you would use."));
      const o = document.createElement("div");
      o.className = "wa-swipe-game__axis";
      const s = document.createElement("span");
      s.textContent = e.labels?.avoid ?? "Never me";
      const c = document.createElement("span");
      c.dataset.swipeProgress = "";
      const l = document.createElement("span");
      ((l.textContent = e.labels?.use ?? "I’d use it"), o.append(s, c, l));
      const d = document.createElement("div");
      d.className = "wa-swipe-game__stack";
      const u = document.createElement("div");
      ((u.className = "wa-swipe-game__glow"),
        u.setAttribute("aria-hidden", "true"),
        d.append(u),
        e.signals.forEach((f, p) => {
          const w = document.createElement("article");
          ((w.className = "wa-swipe-card"),
            (w.dataset.swipeCard = f.id),
            (w.dataset.swipeDecision = f.decision),
            (w.dataset.cardIndex = String(p)));
          const b = document.createElement("strong");
          ((b.className = "wa-swipe-card__label"), (b.textContent = f.label));
          const A = document.createElement("span");
          ((A.className = "wa-swipe-card__detail"),
            (A.textContent = f.detail),
            w.append(b, A),
            d.append(w));
        }));
      const h = document.createElement("div");
      ((h.className = "wa-swipe-game__complete"),
        (h.dataset.swipeComplete = ""),
        (h.textContent =
          e.completeLabel ?? `${e.signals.length} choices captured`),
        d.append(h),
        g.set(h, { autoAlpha: 0, y: 12, scale: 0.96 }));
      const m = document.createElement("div");
      return (
        (m.className = "wa-swipe-game__actions"),
        m.append(
          this.createSwipeActionButton("avoid", e.labels?.avoid ?? "Never me"),
          this.createSwipeActionButton("use", e.labels?.use ?? "I’d use it"),
        ),
        t.append(a, n, o, d, m),
        this.updateSwipeGameProgress(t, 0),
        t
      );
    }
    createSwipeActionButton(e, t) {
      const a = document.createElement("button");
      return (
        (a.className = "wa-swipe-game__action"),
        (a.type = "button"),
        (a.tabIndex = -1),
        (a.dataset.swipeAction = e),
        a.setAttribute("aria-label", t),
        a
      );
    }
    layoutSwipeGameCards(e, t) {
      const a = this.getSwipeCards(e);
      (a.forEach((i, n) => {
        const o = n - t,
          s = o >= 0 && o < 3;
        ((i.dataset.swipeState =
          o === 0 ? "active" : o > 0 ? "queued" : "done"),
          g.set(i, {
            display: o >= 0 ? "grid" : "none",
            x: 0,
            y: Math.max(0, o) * 8,
            scale: 1 - Math.max(0, o) * 0.035,
            rotation: o === 1 ? -1.15 : o === 2 ? 1.05 : 0,
            autoAlpha: s ? 1 - Math.max(0, o) * 0.18 : 0,
            zIndex: a.length - n,
            transformOrigin: "center center",
            force3D: !0,
          }));
      }),
        this.updateSwipeGameProgress(e, t));
    }
    updateSwipeGameProgress(e, t) {
      const a = e.querySelector("[data-swipe-progress]"),
        i = this.getSwipeCards(e).length,
        n = Math.min(t + 1, i);
      a && (a.textContent = `${n}/${i}`);
    }
    createSequenceEngagement(e) {
      const t = document.createElement("section"),
        a = Hr(e);
      ((t.className = "wa-sequence-engagement"),
        (t.dataset.sequenceEngagement = e.id),
        (t.dataset.peopleCount = e.peopleCount),
        (t.dataset.activeSequenceIndex = String(a)));
      const i = this.createSectionHeader(
          "wa-sequence-engagement",
          e.title,
          e.subtitle,
        ),
        n = document.createElement("div");
      n.className = "wa-sequence-engagement__sequences";
      const o = e.sequences.some((f) => f.steps?.length);
      let s = null;
      if (o) {
        const f = document.createElement("div"),
          p = document.createElement("div");
        ((f.className = "wa-sequence-people-wrap"),
          (p.className = "wa-sequence-people"),
          (p.dataset.sequencePeopleRail = e.id),
          p.setAttribute("aria-label", "Sequence people"),
          f.append(p),
          e.sequences.forEach((w, b) => {
            const A = document.createElement("button"),
              v = document.createElement("span"),
              _ = document.createElement("span"),
              y = document.createElement("span"),
              E = document.createElement("strong"),
              k = document.createElement("span");
            ((A.className = "wa-sequence-person-card"),
              (A.type = "button"),
              (A.tabIndex = -1),
              (A.dataset.sequencePersonCard = `${e.id}:${b}`),
              (A.dataset.sequencePersonIndex = String(b)),
              (A.dataset.active = String(b === a)),
              A.setAttribute("aria-pressed", String(b === a)),
              A.setAttribute("aria-label", `Preview sequence for ${w.name}`),
              A.addEventListener("click", () =>
                this.playSequencePersonInteraction(e.id, b),
              ),
              (v.className = "wa-sequence-person-card__avatar-wrap"),
              (_.className = "wa-sequence-person-card__avatar"),
              (_.dataset.avatarTone = String((b % 9) + 1)),
              this.setProfileAvatar(_, w.name, w.avatarUrl),
              v.append(_));
            const C = this.createSequenceCompanyBadge(w.company);
            (C && v.append(C),
              (y.className = "wa-sequence-person-card__copy"),
              (E.textContent = w.name),
              (k.textContent = [w.title, w.company].filter(Boolean).join(", ")),
              y.append(E, k),
              A.append(v, y),
              p.append(A));
          }),
          (s = f));
      }
      e.sequences.forEach((f, p) => {
        const w = document.createElement("article");
        ((w.className = "wa-sequence-card"),
          (w.dataset.sequenceCard = `${e.id}:${p}`),
          (w.dataset.sequenceIndex = String(p)),
          (w.dataset.active = String(p === a)),
          (w.dataset.sequenceName = f.name),
          (w.dataset.sequenceMeta = [f.title, f.company]
            .filter(Boolean)
            .join(", ")),
          (w.dataset.sequenceAvatarUrl = f.avatarUrl ?? ""),
          (w.dataset.sequenceTemplateName = f.name),
          (w.dataset.sequenceTemplateMeta = [f.title, f.company]
            .filter(Boolean)
            .join(", ")),
          (w.dataset.sequenceTemplateAvatarUrl = f.avatarUrl ?? ""),
          (w.dataset.sequenceEmail = this.getSequenceRecipientEmail(f)),
          (w.dataset.sequenceTemplateEmail = this.getSequenceRecipientEmail(f)),
          (w.dataset.sequencePhone = this.getSequenceRecipientPhone(f)),
          (w.dataset.sequenceTemplatePhone = this.getSequenceRecipientPhone(f)),
          p !== a &&
            ((w.style.display = "none"), g.set(w, { autoAlpha: 0, y: 8 })));
        const b = document.createElement("div");
        b.className = "wa-sequence-card__top";
        const A = document.createElement("span");
        A.className = "wa-sequence-card__identity";
        const v = document.createElement("strong");
        v.textContent = f.name;
        const _ = document.createElement("span");
        ((_.textContent = [f.title, f.company].filter(Boolean).join(", ")),
          A.append(v, _));
        const y = document.createElement("span");
        ((y.className = "wa-sequence-card__label"),
          (y.textContent = f.signal ?? "Personalized"),
          b.append(A, y));
        const E = document.createElement("p");
        ((E.className = "wa-sequence-card__subject"),
          (E.textContent = f.subject));
        const k = document.createElement("p");
        ((k.className = "wa-sequence-card__personalization"),
          (k.textContent = f.personalization));
        const C = f.steps;
        if (C?.length) {
          const S = document.createElement("div"),
            M = this.getInitialSequenceStepIndex(e, C.length),
            U = document.createElement("div"),
            z = document.createElement("span"),
            O = document.createElement("strong"),
            H = document.createElement("div");
          ((S.className = "wa-sequence-steps"),
            C.forEach((I, B) => {
              const D = document.createElement("button"),
                oe = document.createElement("span"),
                Ge = document.createElement("span"),
                ft = document.createElement("strong"),
                qe = this.getSequenceStepWaitDays(I, B, C.length);
              ((D.className = "wa-sequence-step"),
                (D.type = "button"),
                (D.tabIndex = -1),
                (D.dataset.stepIndex = String(B)),
                (D.dataset.stepOpen = String(B === M)),
                (D.dataset.stepSelected = String(B === M)),
                (D.dataset.channel = this.slugChannelName(I.channel)),
                (D.dataset.stepSubject = B === 0 ? f.subject : I.label),
                (D.dataset.stepBody = this.getSequenceStepCopy(f, I)),
                (D.dataset.stepTemplateChannel = I.channel),
                (D.dataset.stepTemplateLabel = I.label),
                (D.dataset.stepTemplateSubject = B === 0 ? f.subject : I.label),
                (D.dataset.stepTemplateBody = this.getSequenceStepCopy(f, I)),
                qe &&
                  ((D.dataset.waitDays = String(qe)),
                  (D.dataset.stepTemplateWaitDays = String(qe))),
                D.setAttribute("aria-pressed", String(B === 0)),
                D.addEventListener("click", () => {
                  this.selectSequenceStep(w, B, { cancelPersonTransition: !0 });
                }),
                (oe.className = "wa-sequence-step__channel"),
                oe.append(
                  this.createSequenceChannelIcon(I.channel),
                  document.createTextNode(
                    this.formatSequenceChannelLabel(I.channel),
                  ),
                ),
                (Ge.className = "wa-sequence-step__copy"),
                (ft.textContent = this.formatSequenceStepTitle(I.label)),
                Ge.append(ft),
                D.append(oe, Ge),
                S.append(D),
                qe && S.append(this.createSequenceWaitRow(qe, B)));
            }),
            (U.className = "wa-sequence-copy-panel"),
            (U.dataset.sequenceCopyPanel = ""),
            (z.className = "wa-sequence-copy-panel__meta"),
            (z.dataset.sequenceCopyMeta = ""),
            (O.className = "wa-sequence-copy-panel__subject"),
            (O.dataset.sequenceCopySubject = ""),
            (H.className = "wa-sequence-copy-panel__body"),
            (H.dataset.sequenceCopyBody = ""),
            U.append(z, O, H),
            w.append(S, U),
            this.selectSequenceStep(w, M));
        } else w.append(b, E, k);
        n.append(w);
      });
      const c = document.createElement("div");
      ((c.className = "wa-engage-channels"),
        e.channels.forEach((f) => {
          const p = document.createElement("button");
          ((p.className = "wa-engage-channel"),
            (p.type = "button"),
            (p.tabIndex = -1));
          const w = document.createElement("span");
          w.className = "wa-engage-channel__copy";
          const b = document.createElement("strong");
          b.textContent = f.label;
          const A = document.createElement("span");
          if (
            ((A.textContent = f.detail), w.append(b, A), p.append(w), f.badge)
          ) {
            const v = document.createElement("span");
            ((v.className = "wa-engage-channel__badge"),
              (v.textContent = f.badge),
              (p.dataset.badge = f.badge.toLowerCase()),
              p.append(v));
          }
          c.append(p);
        }));
      const l = document.createElement("div"),
        d = document.createElement("button"),
        u = document.createElement("span"),
        h = document.createElement("button"),
        m = document.createElement("span");
      return (
        (l.className = "wa-sequence-actions"),
        (d.className = "wa-sequence-action wa-sequence-action--draft"),
        (d.type = "button"),
        (d.tabIndex = -1),
        (d.dataset.sequenceSaveDraft = e.id),
        d.setAttribute("aria-label", "Save as draft"),
        (u.className = "wa-sequence-kickoff__label"),
        (u.textContent = "Save as draft"),
        d.append(u),
        (h.className = "wa-sequence-kickoff"),
        (h.type = "button"),
        (h.tabIndex = -1),
        (h.dataset.sequenceKickoff = e.id),
        h.setAttribute("aria-label", `Enroll ${e.peopleCount}`),
        (m.className = "wa-sequence-kickoff__label"),
        (m.textContent = `Enroll ${e.peopleCount}`),
        h.append(m),
        h.addEventListener("click", () => {
          h.dataset.processing !== "true" && this.sequenceKickoff(e.id).play();
        }),
        l.append(d, h),
        o
          ? (t.append(...this.compactElements(i, s, n, l)),
            this.observeInitialSequenceRailCenter(t))
          : t.append(i, n, c),
        t
      );
    }
    createSequenceThinkingStep(e, t, a, i) {
      const n = this.createThinkingStep(
        { label: e, detail: t, disclosure: a === 0 ? Ht : Vt, toolCalls: [] },
        a,
      );
      n.querySelector(".wa-research-step__detail");
      const o = n.querySelector(".wa-research-step__body");
      if (typeof i == "number" && o) {
        const s = document.createElement("span"),
          c = document.createElement("span"),
          l = document.createElement("span"),
          d = document.createElement("span");
        ((s.className = "wa-sequence-thinking-progress"),
          (s.dataset.sequenceThinkingTrack = e),
          (c.className = "wa-sequence-thinking-progress__count"),
          (c.textContent = `1/${i}`),
          (l.className = "wa-sequence-thinking-progress__bar"),
          d.setAttribute("aria-hidden", "true"),
          l.append(d),
          s.append(c, l),
          o.append(s));
      }
      return n;
    }
    findSequenceEngagement(e) {
      return (
        this.queryElements(this.root, to).find(
          (t) => t.dataset.sequenceEngagement === e,
        ) ?? null
      );
    }
    getSequenceCardRuntime(e, t) {
      const a = this.getSequenceCards(e);
      return {
        cards: a,
        displayCard: this.getSequenceDisplayCardFromCards(a),
        templateCard: this.getSequenceTemplateCardFromCards(a, t),
      };
    }
    getSequenceCards(e) {
      return this.queryElements(e, Mc);
    }
    getSequencePersonCards(e) {
      return this.queryElements(e, Dc);
    }
    getSequenceDisplayCardFromCards(e) {
      return (
        e.find(
          (t) => t.dataset.active === "true" && this.isInlineDisplayVisible(t),
        ) ??
        e[0] ??
        null
      );
    }
    getSequenceTemplateCardFromCards(e, t) {
      return (
        e.find((a) => this.parseFiniteNumber(a.dataset.sequenceIndex) === t) ??
        null
      );
    }
    getSequenceRailRuntime(e, t) {
      const a = e.querySelector(ao),
        i = a?.querySelector(`[data-sequence-person-index="${t}"]`);
      return a && i ? { rail: a, card: i } : null;
    }
    getActiveSequenceIndex(e) {
      return this.parseFiniteNumber(e.dataset.activeSequenceIndex) ?? 0;
    }
    clearSequencePersonCardMotionStyles(e) {
      const t = this.getSequencePersonCards(e);
      g.set(t, { clearProps: "opacity,visibility,transform" });
    }
    createSequenceWaitRow(e, t) {
      const a = document.createElement("div"),
        i = document.createElement("span");
      return (
        (a.className = "wa-sequence-wait"),
        (a.dataset.sequenceWaitIndex = String(t)),
        (a.dataset.waitDays = String(e)),
        (i.className = "wa-sequence-wait__label"),
        this.populateSequenceWaitLabel(i, e),
        a.append(i),
        a
      );
    }
    populateSequenceWaitLabel(e, t) {
      const a = document.createElement("span"),
        i = document.createElement("span");
      ((a.className = "wa-sequence-wait__prefix"),
        (a.textContent = "wait"),
        (i.className = "wa-sequence-wait__value"),
        (i.textContent = `${t} ${t === 1 ? "day" : "days"}`),
        e.setAttribute("aria-label", this.formatSequenceWaitLabel(t)),
        e.replaceChildren(a, i));
    }
    getSequenceStepWaitDays(e, t, a) {
      return t >= a - 1 ? null : (e.waitDays ?? gc[t] ?? 1);
    }
    formatSequenceWaitLabel(e) {
      return `wait ${e} ${e === 1 ? "day" : "days"}`;
    }
    getInitialSequenceStepIndex(e, t) {
      const a = e.initialStepIndex;
      return typeof a != "number" || !Number.isFinite(a)
        ? 0
        : Math.min(Math.max(0, Math.round(a)), Math.max(0, t - 1));
    }
    formatSequenceChannelLabel(e) {
      const t = e.trim().toLowerCase();
      return t.includes("email")
        ? "Email"
        : t.includes("linkedin") || t.includes("social")
          ? "Connect"
          : t.includes("call") || t.includes("dial")
            ? "Call"
            : e.trim() || "Step";
    }
    formatSequenceStepTitle(e) {
      const t = e.trim();
      return t ? `${t[0]?.toUpperCase()}${t.slice(1)}` : "";
    }
    createSequenceChannelIcon(e) {
      const t = document.createElement("span"),
        a = this.slugChannelName(e),
        i =
          a === "call" || a.includes("call")
            ? [
                "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -16 -16a2 2 0 0 1 2 -2",
              ]
            : a.includes("linkedin") || a.includes("social")
              ? [
                  "M9 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",
                  "M7 21v-2a4 4 0 0 1 4 -4h4",
                  "M19 16v6",
                  "M16 19h6",
                ]
              : [
                  "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
                  "M3 7l9 6l9 -6",
                ];
      return (
        (t.className = "wa-sequence-step__icon"),
        t.setAttribute("aria-hidden", "true"),
        t.append(this.createSvgIcon("", i, { size: 14 })),
        t
      );
    }
    setActiveSequencePerson(e, t, a = !1) {
      const {
        cards: i,
        displayCard: n,
        templateCard: o,
      } = this.getSequenceCardRuntime(e, t);
      !n ||
        !o ||
        (i.forEach((s) => {
          const c = s === n;
          ((s.dataset.active = String(c)),
            (s.style.display = c ? "grid" : "none"),
            g.set(s, { autoAlpha: c ? 1 : 0, y: 0 }));
        }),
        (e.dataset.activeSequenceIndex = String(t)),
        this.applySequenceTemplateToDisplayCard(e, n, o, t),
        this.setSequencePersonRailState(e, t, a));
    }
    setSequencePersonRailState(e, t, a = !1) {
      const i = this.getSequencePersonCards(e);
      ((e.dataset.activeSequenceIndex = String(t)),
        i.forEach((n) => {
          const o = this.parseFiniteNumber(n.dataset.sequencePersonIndex) === t;
          ((n.dataset.active = String(o)),
            n.setAttribute("aria-pressed", String(o)));
        }),
        a && this.centerSequencePersonCard(e, t));
    }
    centerSequencePersonCard(e, t) {
      const a = this.getSequenceRailRuntime(e, t);
      if (!a) return;
      const { rail: i, card: n } = a,
        o = this.getSequencePersonRailScrollTarget(i, n);
      if (
        (g.killTweensOf(i, "scrollLeft"),
        this.prefersReducedMotion || Math.abs(i.scrollLeft - o) < 1)
      ) {
        ((i.scrollLeft = o), delete i.dataset.sequenceCentering);
        return;
      }
      ((i.dataset.sequenceCentering = "true"),
        g.to(i, {
          scrollLeft: o,
          duration: Wi.railCenterDuration,
          ease: Wi.railCenterEase,
          overwrite: "auto",
          onComplete: () => {
            delete i.dataset.sequenceCentering;
          },
          onInterrupt: () => {
            delete i.dataset.sequenceCentering;
          },
        }));
    }
    setSequencePersonRailPosition(e, t, a = 3) {
      const i = this.getSequenceRailRuntime(e, t);
      if (!i) return;
      const { rail: n, card: o } = i;
      if (
        (n.clientWidth <= 0 || o.getBoundingClientRect().width <= 0) &&
        a > 0
      ) {
        requestAnimationFrame(() =>
          this.setSequencePersonRailPosition(e, t, a - 1),
        );
        return;
      }
      ((n.dataset.sequenceCentering = "true"),
        (n.scrollLeft = this.getSequencePersonRailScrollTarget(n, o)),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            delete n.dataset.sequenceCentering;
          });
        }));
    }
    observeInitialSequenceRailCenter(e) {
      const t = e.querySelector(ao);
      if (!t || typeof ResizeObserver > "u") return;
      const a = [],
        i = () => a.forEach((s) => s.disconnect()),
        n = () => {
          t.clientWidth <= 0 ||
            requestAnimationFrame(() => {
              const s = this.getActiveSequenceIndex(e);
              (this.setSequencePersonRailPosition(e, s),
                window.setTimeout(
                  () => this.setSequencePersonRailPosition(e, s),
                  80,
                ),
                i());
            });
        },
        o = new ResizeObserver(n);
      (o.observe(t),
        a.push(o),
        requestAnimationFrame(() => {
          const s = e.closest(".wa-message");
          if (!s || typeof MutationObserver > "u") {
            n();
            return;
          }
          const c = new MutationObserver(n);
          (c.observe(s, {
            attributes: !0,
            attributeFilter: ["class", "style"],
          }),
            a.push(c),
            n());
        }));
    }
    getSequencePersonRailScrollTarget(e, t) {
      const a = Math.max(0, e.scrollWidth - e.clientWidth),
        i = e.getBoundingClientRect(),
        n = t.getBoundingClientRect(),
        o = e.scrollLeft + n.left - i.left - (e.clientWidth - n.width) / 2;
      return Math.min(a, Math.max(0, o));
    }
    getSelectedSequenceStepIndex(e) {
      const t = e.querySelector('.wa-sequence-step[data-step-selected="true"]');
      return this.parseFiniteNumber(t?.dataset.stepIndex) ?? 0;
    }
    getSequenceTransitionTargets(e) {
      return this.compactElements(
        ...this.queryElements(e, ".wa-sequence-step__copy strong"),
        e.querySelector("[data-sequence-copy-meta]"),
        e.querySelector("[data-sequence-copy-subject]"),
        e.querySelector("[data-sequence-copy-body]"),
      );
    }
    prepareSequencePersonContentSwaps(e, t, a, i) {
      const n = this.getSequenceTransitionTargets(t),
        o = new Map();
      (g.killTweensOf(n),
        this.cleanupInlineSequencePersonContentSwaps(t),
        n.forEach((l) => {
          o.set(l, l.innerHTML);
        }),
        this.applySequenceTemplateToDisplayCard(e, t, a, i));
      const s = this.getSequenceTransitionTargets(t),
        c = this.getSequencePersonContentSwapDelays(s);
      return s.flatMap((l) => {
        const d = l.innerHTML,
          u = o.get(l) ?? "";
        return u === d
          ? []
          : [this.prepareSequencePersonContentSwap(l, u, d, c.get(l) ?? 0)];
      });
    }
    prepareSequencePersonContentSwap(e, t, a, i) {
      const n = this.measureSequenceContentSwapBox(e, t, a),
        o = this.createSequenceContentSwapClone(t, "current"),
        s = this.createSequenceContentSwapClone(a, "incoming");
      return (
        (e.dataset.sequenceContentSwapActive = "true"),
        (e.style.minWidth = `${n.width}px`),
        (e.style.minHeight = `${this.formatSequenceSwapSize(n.height)}px`),
        e.replaceChildren(o, s),
        this.setDataTablePageCellSwapState([o], 1, 0),
        this.setDataTablePageCellSwapState([s], 0, J.incomingY),
        { target: e, currentClone: o, incomingClone: s, finalHtml: a, delay: i }
      );
    }
    measureSequenceContentSwapBox(e, t, a) {
      const i = e.getBoundingClientRect(),
        n = this.isSequenceCopyPanelShellRow(e),
        o = n ? [i.height] : [i.height, e.offsetHeight, e.scrollHeight],
        s = e.parentElement,
        c = n
          ? 0
          : Math.ceil(Math.max(Math.abs(J.incomingY), Math.abs(J.outgoingY))) +
            2;
      if (!s || i.width <= 0)
        return { width: i.width, height: Math.max(...o) + c };
      const l = e.cloneNode(!1);
      return (
        l.removeAttribute("data-sequence-content-swap-active"),
        (l.style.position = "absolute"),
        (l.style.left = "-10000px"),
        (l.style.top = "0"),
        (l.style.width = `${i.width}px`),
        (l.style.minWidth = `${i.width}px`),
        (l.style.maxWidth = `${i.width}px`),
        (l.style.minHeight = "0"),
        (l.style.height = "auto"),
        (l.style.visibility = "hidden"),
        (l.style.pointerEvents = "none"),
        (l.style.overflow = "visible"),
        (l.style.contain = "layout style"),
        s.append(l),
        [t, a].forEach((d) => {
          ((l.innerHTML = d),
            n
              ? o.push(l.getBoundingClientRect().height)
              : o.push(
                  l.offsetHeight,
                  l.scrollHeight,
                  l.getBoundingClientRect().height,
                ));
        }),
        l.remove(),
        { width: i.width, height: Math.max(...o) + c }
      );
    }
    isSequenceCopyPanelShellRow(e) {
      return (
        e.classList.contains("wa-sequence-copy-panel__meta") ||
        e.classList.contains("wa-sequence-copy-panel__subject") ||
        e.classList.contains("wa-sequence-copy-panel__body")
      );
    }
    formatSequenceSwapSize(e) {
      return Number.isFinite(e) ? e.toFixed(2) : "0";
    }
    createSequenceContentSwapClone(e, t) {
      const a = document.createElement("span");
      return (
        (a.className = "wa-sequence-content-swap-clone"),
        (a.dataset.sequenceContentSwapClone = t),
        a.setAttribute("aria-hidden", "true"),
        (a.innerHTML = e),
        a
      );
    }
    getSequencePersonContentSwapDelays(e) {
      const t = e
          .map((o) => ({ target: o, rect: o.getBoundingClientRect() }))
          .sort((o, s) => {
            const c = o.rect.top - s.rect.top;
            return Math.abs(c) > 6 ? c : o.rect.left - s.rect.left;
          }),
        a = [],
        i = new Map(),
        n = new Map();
      return (
        t.forEach(({ target: o, rect: s }) => {
          let c = a.findIndex((d) => Math.abs(d - s.top) <= 6);
          c === -1 && ((c = a.length), a.push(s.top));
          const l = i.get(c) ?? 0;
          (i.set(c, l + 1), n.set(o, this.getDataTablePageCellDelay(c, l)));
        }),
        n
      );
    }
    renderSequencePersonContentSwaps(e, t) {
      const a = t * J.totalDuration;
      e.swaps.forEach((i) => {
        const n = Qt((a - i.delay) / J.duration),
          o = Qt((a - i.delay - J.incomingLag) / J.duration),
          s = Fa.in(o),
          c = Fa.out(n);
        (this.setDataTablePageCellSwapState(
          [i.currentClone],
          1 - c,
          this.interpolate(0, J.outgoingY, c),
        ),
          this.setDataTablePageCellSwapState(
            [i.incomingClone],
            s,
            this.interpolate(J.incomingY, 0, s),
          ));
      });
    }
    commitSequencePersonContentSwaps(e) {
      ((e.committed = !0), this.cleanupSequencePersonContentSwaps(e));
    }
    cleanupSequencePersonContentSwaps(e) {
      const t = this.getSequencePersonSwapMotionTargets(e);
      (t.length && this.clearMotionHints(t),
        e.swaps.forEach((a) => {
          ((a.target.innerHTML = a.finalHtml),
            delete a.target.dataset.sequenceContentSwapActive,
            (a.target.style.minWidth = ""),
            (a.target.style.minHeight = ""));
        }),
        (e.swaps = []));
    }
    cleanupInlineSequencePersonContentSwaps(e) {
      this.queryElements(
        e,
        '[data-sequence-content-swap-active="true"]',
      ).forEach((t) => {
        const a = t.querySelector(
            '[data-sequence-content-swap-clone="incoming"]',
          ),
          i = t.querySelector('[data-sequence-content-swap-clone="current"]');
        ((t.innerHTML = a?.innerHTML ?? i?.innerHTML ?? t.innerHTML),
          delete t.dataset.sequenceContentSwapActive,
          (t.style.minWidth = ""),
          (t.style.minHeight = ""));
      });
    }
    getSequencePersonSwapMotionTargets(e) {
      return e.swaps.flatMap((t) => [t.currentClone, t.incomingClone]);
    }
    applySequenceTemplateToDisplayCard(e, t, a, i) {
      const n = this.getSelectedSequenceStepIndex(t),
        o = this.queryElements(t, ".wa-sequence-step"),
        s = this.queryElements(t, ".wa-sequence-wait"),
        c = this.queryElements(a, ".wa-sequence-step");
      ((t.dataset.sequenceName =
        a.dataset.sequenceTemplateName ?? a.dataset.sequenceName ?? ""),
        (t.dataset.sequenceMeta =
          a.dataset.sequenceTemplateMeta ?? a.dataset.sequenceMeta ?? ""),
        (t.dataset.sequenceAvatarUrl =
          a.dataset.sequenceTemplateAvatarUrl ??
          a.dataset.sequenceAvatarUrl ??
          ""),
        (t.dataset.sequenceEmail =
          a.dataset.sequenceTemplateEmail ?? a.dataset.sequenceEmail ?? ""),
        (t.dataset.sequencePhone =
          a.dataset.sequenceTemplatePhone ?? a.dataset.sequencePhone ?? ""),
        o.forEach((l, d) => {
          const u = c[d],
            h = l.querySelector(".wa-sequence-step__channel"),
            m = l.querySelector(".wa-sequence-step__copy strong");
          if (!u) return;
          if (
            ((l.dataset.channel = u.dataset.channel ?? ""),
            (l.dataset.stepSubject =
              u.dataset.stepTemplateSubject ?? u.dataset.stepSubject ?? ""),
            (l.dataset.stepBody =
              u.dataset.stepTemplateBody ?? u.dataset.stepBody ?? ""),
            (l.dataset.waitDays =
              u.dataset.stepTemplateWaitDays ?? u.dataset.waitDays ?? ""),
            h)
          ) {
            const b = u.dataset.stepTemplateChannel ?? h.textContent ?? "";
            h.replaceChildren(
              this.createSequenceChannelIcon(b),
              document.createTextNode(this.formatSequenceChannelLabel(b)),
            );
          }
          m &&
            (m.textContent = this.formatSequenceStepTitle(
              u.dataset.stepTemplateLabel ?? m.textContent ?? "",
            ));
          const f = s[d],
            p = this.parsePositiveNumber(l.dataset.waitDays),
            w = f?.querySelector(".wa-sequence-wait__label");
          (f &&
            ((f.style.display = p === null ? "none" : "grid"),
            (f.dataset.waitDays = String(p ?? ""))),
            w && p !== null && this.populateSequenceWaitLabel(w, p));
        }),
        (e.dataset.activeSequenceIndex = String(i)),
        this.selectSequenceStep(t, Math.min(n, Math.max(0, o.length - 1))));
    }
    selectSequenceStep(e, t, a = {}) {
      const i = this.queryElements(e, ".wa-sequence-step"),
        n =
          i.find((l) => this.parseFiniteNumber(l.dataset.stepIndex) === t) ??
          i[0],
        o = e.querySelector("[data-sequence-copy-meta]"),
        s = e.querySelector("[data-sequence-copy-subject]"),
        c = e.querySelector("[data-sequence-copy-body]");
      (a.cancelPersonTransition &&
        (this.cancelSequencePersonTransitionForCard(e),
        this.cleanupInlineSequencePersonContentSwaps(e)),
        i.forEach((l) => {
          const d = l === n;
          ((l.dataset.stepSelected = String(d)),
            (l.dataset.stepOpen = String(d)),
            l.setAttribute("aria-pressed", String(d)));
        }),
        this.renderSequenceCopyPanel(e, n, o, s, c));
    }
    cancelSequencePersonTransitionForCard(e) {
      const a = e.closest(to)?.dataset.sequenceEngagement;
      if (!a) return;
      const i = this.activeSequencePersonTimelines.get(a);
      i && (i.kill(), this.activeSequencePersonTimelines.delete(a));
    }
    renderSequenceCopyPanel(e, t, a, i, n) {
      const o = e.querySelector("[data-sequence-copy-panel]"),
        s = t?.dataset.channel ?? "",
        c = s.includes("linkedin") || s.includes("social"),
        l = s.includes("call") || s.includes("dial");
      if (
        (o && (o.dataset.copyChannel = c ? "connect" : l ? "call" : "email"), c)
      ) {
        (a && (a.textContent = "Send connection request"),
          i && (i.textContent = t?.dataset.stepBody ?? ""),
          n && n.replaceChildren(document.createTextNode("0/200")));
        return;
      }
      if (l) {
        (a && this.setSequenceCallMeta(a, e.dataset.sequencePhone ?? ""),
          i && (i.textContent = t?.dataset.stepBody ?? ""),
          n && this.renderSequenceCallAction(n, e));
        return;
      }
      (a && this.setSequenceCopyMeta(a, e.dataset.sequenceEmail ?? ""),
        i && (i.textContent = t?.dataset.stepSubject ?? ""),
        n &&
          n.replaceChildren(
            document.createTextNode(t?.dataset.stepBody ?? ""),
          ));
    }
    setSequenceCopyMeta(e, t) {
      const a = document.createElement("span"),
        i = document.createElement("strong");
      ((a.textContent = "to:"),
        (i.textContent = t),
        e.replaceChildren(a, document.createTextNode(" "), i));
    }
    setSequenceCallMeta(e, t) {
      const a = document.createElement("span"),
        i = document.createElement("strong");
      ((a.textContent = "call:"),
        (i.textContent = t),
        e.replaceChildren(a, document.createTextNode(" "), i));
    }
    renderSequenceCallAction(e, t) {
      const a = document.createElement("span"),
        i = document.createElement("span"),
        n = document.createElement("span"),
        o = document.createElement("strong"),
        s = document.createElement("span"),
        c = document.createElement("span"),
        l = document.createElement("span"),
        d = document.createElement("span");
      ((a.className = "wa-sequence-call-action"),
        (i.className = "wa-sequence-call-action__avatar"),
        this.setProfileAvatar(
          i,
          t.dataset.sequenceName ?? "",
          t.dataset.sequenceAvatarUrl,
        ),
        (n.className = "wa-sequence-call-action__copy"),
        (o.textContent = t.dataset.sequenceName ?? ""),
        (s.textContent = t.dataset.sequenceMeta ?? ""),
        n.append(o, s),
        (c.className = "wa-sequence-call-action__button"),
        (l.className = "wa-sequence-call-action__icon"),
        l.setAttribute("aria-hidden", "true"),
        l.append(
          this.createSvgIcon("", [
            "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -16 -16a2 2 0 0 1 2 -2",
          ]),
        ),
        (d.textContent = "Start"),
        c.append(l, d),
        a.append(i, n, c),
        e.replaceChildren(a));
    }
    getSequenceStepCopy(e, t) {
      const a = e.name.split(" ")[0] ?? e.name;
      return this.slugChannelName(t.channel) !== "email"
        ? t.body
        : e.name === "Jamie Chen" && t.label === "lead with ROI"
          ? [
              `Hi ${a},`,
              "Saw Square pop up through the ROI calculator, which usually means the team is pressure-testing whether better GTM data changes pipeline economics.",
              "Connect the calculator visit to the cost of fragmented data and suggest a quick account-quality benchmark.",
              "Worth sending over a quick example?",
            ].join(`

`)
          : [
              `Hi ${a},`,
              e.personalization,
              t.body,
              "Worth sending over a quick example?",
            ].join(`

`);
    }
    getSequenceRecipientEmail(e) {
      const [t = "hello", a = "there"] = e.name
          .toLowerCase()
          .replace(/[^a-z\s-]/g, "")
          .split(/\s+/)
          .filter(Boolean),
        i =
          this.getCompanyLogoDomain(e.company) ||
          `${this.getCompanyKey(e.company)}.com`;
      return `${t}.${a}@${i}`;
    }
    getSequenceRecipientPhone(e) {
      const t = mc[e.name];
      if (t) return t;
      const a = `${e.name}:${e.company}`
          .split("")
          .reduce((c, l) => c + l.charCodeAt(0), 0),
        i = [628, 917, 415, 646, 312, 424, 206, 650],
        n = i[a % i.length],
        o = 200 + (a % 700),
        s = 1e3 + ((a * 37) % 9e3);
      return `+1 (${n}) ${String(o).padStart(3, "0")}-${String(s).padStart(4, "0")}`;
    }
    slugChannelName(e) {
      return e
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    revealCard(e) {
      const t = this.claimComponentMessage("result", e),
        a = e.querySelectorAll(".wa-result-row, .wa-result-action");
      return g
        .timeline()
        .call(() => {
          e.style.display = "grid";
        })
        .add(
          this.revealMessageWithChildren(t, e, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: x(0.48),
            ease: "back.out(1.45)",
          }),
          0,
        )
        .to(
          a,
          {
            autoAlpha: 1,
            y: 0,
            duration: x(0.32),
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.22",
        );
    }
    highlightCardTarget(e, t) {
      const a =
          typeof t == "string"
            ? e.querySelector(t)
            : (t ?? e.querySelector(".wa-result-row, .wa-result-action") ?? e),
        i = g.timeline();
      if (!a) return i;
      const n = getComputedStyle(a),
        s =
          getComputedStyle(this.root)
            .getPropertyValue("--wa-highlight-bg")
            .trim() || "rgba(213, 255, 79, 0.22)",
        c = n.backgroundColor || "transparent";
      return (
        i
          .to(a, {
            backgroundColor: s,
            scale: 1.018,
            duration: x(0.16),
            ease: "power2.out",
          })
          .to(a, {
            backgroundColor: c,
            scale: 1,
            duration: x(0.42),
            ease: "power2.out",
          })
          .set(a, { clearProps: "backgroundColor" }),
        i
      );
    }
    required(e) {
      const t = this.root.querySelector(e);
      if (!t) throw new Error(`ChatbotStories: required element missing: ${e}`);
      return t;
    }
    queryElements(e, t) {
      return Array.from(e.querySelectorAll(t));
    }
    compactElements(...e) {
      const t = [];
      for (const a of e) a && t.push(a);
      return t;
    }
    isInlineDisplayVisible(e) {
      return e.style.display !== "none";
    }
    parseFiniteNumber(e) {
      const t = Number(e);
      return Number.isFinite(t) ? t : null;
    }
    parsePositiveNumber(e) {
      const t = this.parseFiniteNumber(e);
      return t !== null && t > 0 ? t : null;
    }
    getSwipeCards(e) {
      return e ? this.queryElements(e, "[data-swipe-card]") : [];
    }
    escapeSelectorValue(e) {
      return typeof CSS < "u" && "escape" in CSS
        ? CSS.escape(e)
        : e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }
    clearCustomResults() {
      this.removeElements(
        "[data-result-grid] .wa-strategy-plan, [data-result-grid] .wa-data-table, [data-result-grid] .wa-enrichment-panel",
      );
    }
    clearMarketingPanels() {
      this.removeElements($r);
    }
    getStorySwitchExitTargets() {
      return this.compactElements(
        this.isVisibleForStorySwitchExit(this.thread) ? this.thread : null,
        this.composerVisible && this.isVisibleForStorySwitchExit(this.composer)
          ? this.composer
          : null,
        this.isVisibleForStorySwitchExit(this.signupScene)
          ? this.signupScene
          : null,
      );
    }
    isVisibleForStorySwitchExit(e) {
      const t = window.getComputedStyle(e);
      if (
        t.display === "none" ||
        t.visibility === "hidden" ||
        (Number.parseFloat(t.opacity) || 0) <= 0.01
      )
        return !1;
      const a = e.getBoundingClientRect();
      return a.width > 0 && a.height > 0;
    }
    registerTransientElement(e, t) {
      this.transientCleanups.push(() => {
        (t?.(), g.killTweensOf(e), e.remove());
      });
    }
    clearTransientElements() {
      for (const e of this.transientCleanups) e();
      ((this.transientCleanups = []), this.removeElements(Zr));
    }
    removeElements(e) {
      this.root.querySelectorAll(e).forEach((t) => {
        (g.killTweensOf(t), t.remove());
      });
    }
    getMessageScrollTarget(e, t = null, a = 0) {
      const i = t
        ? this.getAlignedElementScrollTarget(t, a)
        : this.getAlignedMessageScrollTarget(e);
      if (i !== null) return i;
      const n =
        e.offsetTop +
        e.offsetHeight +
        this.getThreadBottomPadding() -
        this.thread.clientHeight;
      return this.composerVisible
        ? Math.max(0, n, this.getThreadLiveScrollTarget())
        : Math.max(0, n);
    }
    getAlignedMessageScrollTarget(e) {
      const t = e.matches('[data-scroll-align="equal-inset"]')
        ? e
        : e.querySelector('[data-scroll-align="equal-inset"]');
      return t ? this.getAlignedElementScrollTarget(t) : null;
    }
    getAlignedElementScrollTarget(e, t = 0) {
      const a = this.getElementSideInset(e),
        i = this.getThreadContentScale(),
        n = this.getElementOffsetTopWithinThread(e) - a / i + t / i,
        o = Math.max(
          this.getThreadBottomScrollTarget(),
          this.getElementBottomScrollTarget(e),
        );
      return Math.min(Math.max(0, n), o);
    }
    getElementSideInset(e) {
      const t = e.getBoundingClientRect(),
        a = this.chatBody.getBoundingClientRect(),
        i = Number.parseFloat(getComputedStyle(this.chatBody).paddingLeft) || 0,
        n = t.left - a.left;
      return Math.max(0, Number.isFinite(n) ? n : i);
    }
    getElementOffsetTopWithinThread(e) {
      let t = 0,
        a = e;
      for (; a && a !== this.thread; )
        ((t += a.offsetTop), (a = a.offsetParent));
      if (a === this.thread) return t;
      const i = e.getBoundingClientRect(),
        n = this.thread.getBoundingClientRect();
      return this.thread.scrollTop + i.top - n.top;
    }
    getThreadBottomPadding() {
      const e = getComputedStyle(this.thread),
        t = Number.parseFloat(
          e.getPropertyValue("--wa-thread-base-bottom-padding"),
        ),
        a = Number.parseFloat(e.getPropertyValue("--wa-chat-bottom-clearance"));
      return Number.isFinite(t) ? t : Number.isFinite(a) ? a : Kr;
    }
    getThreadBottomScrollTarget() {
      return Math.max(0, this.thread.scrollHeight - this.thread.clientHeight);
    }
    getThreadLiveScrollTarget() {
      const t =
        this.getVisibleThreadContentBottom() +
        this.getThreadBottomPadding() -
        this.thread.clientHeight;
      return Math.min(this.getThreadBottomScrollTarget(), Math.max(0, t));
    }
    getElementBottomScrollTarget(e, t = 0) {
      const a = this.getThreadContentScale();
      return Math.max(
        0,
        this.getElementOffsetTopWithinThread(e) +
          e.offsetHeight +
          this.getThreadBottomPadding() -
          this.thread.clientHeight +
          t / a,
      );
    }
    pinThreadToBottom() {
      this.thread.scrollTop = this.getThreadLiveScrollTarget();
    }
    tweenThreadToBottom(e = X.followDuration, t = X.followEase) {
      const a = g.timeline();
      let i = this.thread.scrollTop;
      return (
        a.call(() => {
          (this.stopScrollMotion(),
            this.updateThreadContentFitState(),
            (i = this.getThreadLiveScrollTarget()));
        }),
        a.to(this.thread, {
          scrollTop: () => i,
          duration: e,
          ease: t,
          overwrite: "auto",
        }),
        a
      );
    }
    animateMessageScrollIntoView(e, t = X.followDuration, a = null, i = 0) {
      this.updateThreadContentFitState();
      const n = this.getMessageScrollTarget(e, a, i);
      if (!(n <= this.thread.scrollTop + 0.5)) {
        if (
          this.prefersReducedMotion ||
          Math.abs(this.thread.scrollTop - n) < 1
        ) {
          this.thread.scrollTop = n;
          return;
        }
        (this.scrollTween?.kill(),
          g.killTweensOf(this.thread, "scrollTop"),
          (this.scrollTween = g.to(this.thread, {
            scrollTop: n,
            duration: t,
            ease: X.followEase,
            overwrite: "auto",
            onComplete: () => {
              this.scrollTween = null;
            },
          })));
      }
    }
    requestMessageScroll(e) {
      if (this.shouldPreserveMessageScroll(e)) return;
      const t = performance.now();
      ((this.scheduledScrollMessage = e),
        !(t - this.lastStreamScrollAt < Pc) &&
          (this.scheduledScrollFrame ||
            ((this.lastStreamScrollAt = t),
            (this.scheduledScrollFrame = window.requestAnimationFrame(() => {
              const a = this.scheduledScrollMessage;
              ((this.scheduledScrollFrame = 0),
                (this.scheduledScrollMessage = null),
                a?.isConnected && this.animateMessageScrollIntoView(a));
            })))));
    }
    shouldPreserveMessageScroll(e) {
      return (
        this.getMessageScrollTargetElement(e).dataset.preserveMessageScroll ===
        "true"
      );
    }
    cancelScheduledScroll() {
      this.scheduledScrollFrame &&
        (window.cancelAnimationFrame(this.scheduledScrollFrame),
        (this.scheduledScrollFrame = 0),
        (this.scheduledScrollMessage = null),
        (this.lastStreamScrollAt = 0));
    }
  }
  function Qt(r) {
    return Math.min(1, Math.max(0, r));
  }
  function Nc(r) {
    const e = Qt(r);
    return e * e * (3 - 2 * e);
  }
  function no(r) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(r)}`;
  }
  function Zi(r, e, t = "idle") {
    const a = r === "gmail" ? "Gmail" : "Outlook",
      i = e?.trim();
    if (!i) return t === "connected" ? "Connected" : a;
    const n = a.toLowerCase(),
      o = i.toLowerCase().replace(/\s+/g, " "),
      s = new Set([n, `connect ${n}`, `${n} connected`, `connected ${n}`]);
    return t === "connected" && (s.has(o) || o === "connected")
      ? "Connected"
      : s.has(o)
        ? a
        : i;
  }
  function $i(r, e) {
    const t = r?.trim();
    return t ? (t.toLowerCase() === e.toLowerCase() ? e : t) : e;
  }
  function Fc(r, e) {
    const t = bc[r] ?? 0,
      a = 24 + ((r * 11) % 8),
      i = Math.min(100, t + a),
      n = Nc((e - t) / (i - t));
    if (n <= 0) return 0;
    const o = Ac.has(r) ? 20 : 12;
    return Math.round(o + n * (100 - o));
  }
  function ro(r, e) {
    return Math.hypot(e.x - r.x, e.y - r.y);
  }
  function ht(r, e, t) {
    return Math.min(t, Math.max(e, r));
  }
  function oo(r, e, t, a, i) {
    const n = 1 - i,
      o = i * i,
      s = n * n,
      c = s * n,
      l = o * i;
    return {
      x: c * r.x + 3 * s * i * e.x + 3 * n * o * t.x + l * a.x,
      y: c * r.y + 3 * s * i * e.y + 3 * n * o * t.y + l * a.y,
    };
  }
  function Uc(r) {
    let e = 2166136261;
    for (let t = 0; t < r.length; t += 1)
      ((e ^= r.charCodeAt(t)), (e = Math.imul(e, 16777619)));
    return e >>> 0;
  }
  function so(r) {
    let e = Uc(r) || 1;
    return () => {
      e += 1831565813;
      let t = e;
      return (
        (t = Math.imul(t ^ (t >>> 15), t | 1)),
        (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
        ((t ^ (t >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  const zc = { slow: 560, normal: 860, quick: 1220 },
    Hc = {
      entry: 1.08,
      hover: 0.96,
      click: 0.9,
      drag: 1.18,
      text: 1.04,
      exit: 1,
    },
    Vc = 1.24;
  function Ua(r, e, t) {
    const a = so(t.seed),
      i = ro(r, e),
      n = t.speed ?? "normal",
      o = t.intent ?? "hover",
      s =
        typeof t.duration == "number" && Number.isFinite(t.duration)
          ? Math.max(0.01, t.duration)
          : null;
    if (t.reducedMotion || i < 2)
      return {
        start: r,
        c1: r,
        c2: e,
        end: e,
        duration: t.reducedMotion ? 0.12 : (s ?? 0.08),
      };
    const c = e.x - r.x,
      l = e.y - r.y,
      d = c / i,
      u = l / i,
      h = -u,
      m = d,
      f = a() > 0.5 ? 1 : -1,
      p = t.curve ?? 1,
      b =
        ht(i * (o === "drag" ? 0.1 : o === "click" ? 0.17 : 0.22), 18, 150) *
        p *
        f *
        (0.72 + a() * 0.44),
      A = i / zc[n] + 0.16,
      v = ht(A * Hc[o] * Vc * (t.durationScale ?? 1), 0.3, 1.98),
      _ = s ?? v,
      y =
        t.overshoot === !1 || i < 120
          ? 0
          : typeof t.overshoot == "number"
            ? t.overshoot
            : ht(i * 0.026, 4, 18),
      E = y > 0 ? { x: e.x + d * y, y: e.y + u * y } : e,
      k = {
        x: r.x + c * (0.25 + a() * 0.08) + h * b,
        y: r.y + l * (0.25 + a() * 0.08) + m * b,
      },
      C = {
        x: r.x + c * (0.68 + a() * 0.12) - h * b * 0.42,
        y: r.y + l * (0.68 + a() * 0.12) - m * b * 0.42,
      },
      S = t.settle !== !1 && y > 0;
    return {
      start: r,
      c1: k,
      c2: C,
      end: E,
      duration: S ? _ * 0.86 : _,
      settle: S
        ? {
            start: E,
            c1: {
              x: E.x - d * y * 0.45 + h * b * 0.04,
              y: E.y - u * y * 0.45 + m * b * 0.04,
            },
            c2: { x: e.x + d * y * 0.16, y: e.y + u * y * 0.16 },
            end: e,
            duration: ht(_ * 0.18, 0.1, 0.24),
          }
        : void 0,
    };
  }
  const en = [
      "button:not(:disabled)",
      "a[href]",
      "[role='button']:not([aria-disabled='true'])",
      "[data-send-button]",
      "[data-result-action]",
      "[data-table-action]",
      "[data-table-page-button]",
      "[data-swipe-action]",
      "[data-sequence-person-card]",
      "[data-sequence-kickoff]",
      "[data-strategy-plan]",
      ".wa-sequence-step",
    ].join(", "),
    tn =
      "[data-chat-input][data-visible='true'], [data-signup-field], input, textarea, [contenteditable='true']",
    an = {
      delay: 0.42,
      returnDuration: 0.18,
      segments: [
        { x: 1.6, y: -2.4, rotation: 0.28, duration: 1.55 },
        { x: -1.2, y: -3.1, rotation: -0.18, duration: 1.9 },
        { x: 0.8, y: -1.2, rotation: 0.16, duration: 1.45 },
        { x: 0, y: 0, rotation: 0, duration: 1.7 },
      ],
    },
    za = {
      outsideOffset: 24,
      topRatio: 0.3,
      minTopInset: 74,
      maxTopInset: 190,
    },
    ha = { minDistance: 6, minInterval: 24, lookahead: 5 },
    Gc = -135,
    Qc = 0.34;
  class Yc {
    constructor(e, t, a = {}) {
      ((this.root = e),
        (this.resolver = t),
        (this.options = a),
        (this.el =
          this.root.querySelector("[data-cursor]") ?? this.createElement()),
        (this.floatLayer = this.ensureFloatLayer()),
        (this.setX = g.quickSetter(this.el, "x", "px")),
        (this.setY = g.quickSetter(this.el, "y", "px")),
        (this.setRotation = g.quickSetter(this.el, "rotation", "deg")));
      const i = this.resolver.resolve(
        { target: "[data-chat-shell]", anchor: "center" },
        "cursor:start",
      );
      (this.setPosition(i),
        this.setMode("default"),
        this.observeModeTargets(),
        this.queueIdleFloat());
    }
    root;
    resolver;
    options;
    el;
    floatLayer;
    setX;
    setY;
    setRotation;
    idleFloat = null;
    idleFloatDelay = null;
    transformState = { x: 0, y: 0 };
    rotationState = 0;
    plannedPosition = { x: 0, y: 0 };
    currentPosition = { x: 0, y: 0 };
    storyId = "story";
    moveIndex = 0;
    mode = "default";
    modeOverride = null;
    payloadDragActive = !1;
    payloadReleaseActive = !1;
    modeTargetsDirty = !0;
    pointerTargets = [];
    textTargets = [];
    targetObserver = null;
    lastModeSyncAt = 0;
    lastModeSyncPoint = { x: Number.NaN, y: Number.NaN };
    lastModeSamplePoint = { x: Number.NaN, y: Number.NaN };
    modeWatchFrame = 0;
    modeSyncFrame = 0;
    chatShell = null;
    beginBuild(e, t) {
      ((this.storyId = t),
        (this.moveIndex = 0),
        (this.plannedPosition = { ...e }));
    }
    getPosition() {
      return { ...this.currentPosition };
    }
    readPosition() {
      return this.currentPosition;
    }
    getHistoryParkViewportPoint() {
      const e = this.root.getBoundingClientRect(),
        t = this.resolveHistoryParkPoint();
      return { x: e.left + t.x, y: e.top + t.y };
    }
    isPayloadDragging() {
      return this.payloadDragActive;
    }
    beginMimicControl() {
      (this.stopIdleFloat(!0),
        (this.modeOverride = "default"),
        this.setMode("default"),
        (this.el.dataset.cursorMimicking = "true"),
        g.killTweensOf(this.el),
        g.set(this.el, { autoAlpha: 1, scale: 1 }));
    }
    mimicViewportPoint(e, t = 0.42, a = e) {
      const i = this.root.getBoundingClientRect(),
        n = { x: e.x - i.left, y: e.y - i.top },
        o = { x: a.x - i.left, y: a.y - i.top },
        s = {
          x: this.currentPosition.x + (n.x - this.currentPosition.x) * t,
          y: this.currentPosition.y + (n.y - this.currentPosition.y) * t,
        };
      ((this.modeOverride = "default"),
        (this.currentPosition = s),
        (this.plannedPosition = { ...s }),
        this.renderPosition(s),
        this.setMode("default"),
        this.renderMimicRotation(s, o));
    }
    endMimicControl() {
      ((this.modeOverride = null),
        delete this.el.dataset.cursorMimicking,
        this.resetRotation(),
        this.syncModeToPoint(this.currentPosition),
        this.queueIdleFloat());
    }
    setPosition(e) {
      ((this.currentPosition = { ...e }),
        (this.plannedPosition = { ...e }),
        this.renderPosition(e));
    }
    setMode(e) {
      if (
        !(e === "drag" && this.payloadReleaseActive && !this.payloadDragActive)
      ) {
        if (this.mode === e && this.el.dataset.cursorMode === e) {
          this.updateModeWatch();
          return;
        }
        ((this.mode = e),
          (this.el.dataset.cursorMode = e),
          this.updateModeWatch());
      }
    }
    moveTo(e, t = {}) {
      const a = t.label ?? `move-${this.moveIndex}`,
        i = t.mode ?? "default",
        n = `${this.storyId}:${a}:${this.resolver.getBreakpoint()}`,
        o = this.resolver.resolve(e, n),
        s = { ...this.plannedPosition },
        c = t.ease ?? "power2.inOut",
        l = Ua(s, o, {
          seed: n,
          intent: t.intent,
          speed: t.speed,
          duration: t.duration,
          curve: t.curve,
          durationScale: t.durationScale,
          overshoot: t.overshoot,
          settle: t.settle,
          reducedMotion: this.options.reducedMotion,
        }),
        d = g.timeline();
      let u = null;
      return (
        (this.moveIndex += 1),
        (this.plannedPosition = { ...o }),
        d.call(
          () => {
            (this.stopIdleFloat(),
              this.resetRotation(),
              i !== "drag" && this.clearPayloadDragState());
          },
          void 0,
          0,
        ),
        d.set(this.el, { autoAlpha: 1 }, 0),
        d.call(
          () => {
            ((this.modeOverride = i === "drag" ? "drag" : null),
              this.modeOverride
                ? this.setMode(this.modeOverride)
                : this.syncModeToPoint(this.currentPosition));
          },
          void 0,
          0,
        ),
        d.add(
          this.pathTweenFromFactory(
            () => {
              this.resolver.refresh();
              const h = this.resolver.resolve(e, n);
              return (
                (u = Ua(this.currentPosition, h, {
                  seed: n,
                  intent: t.intent,
                  speed: t.speed,
                  duration: t.duration,
                  curve: t.curve,
                  durationScale: t.durationScale,
                  overshoot: t.overshoot,
                  settle: t.settle,
                  reducedMotion: this.options.reducedMotion,
                })),
                (this.plannedPosition = { ...h }),
                u
              );
            },
            l.duration,
            c,
          ),
        ),
        l.settle &&
          d.add(
            this.pathTweenFromFactory(
              () =>
                u?.settle ?? {
                  start: this.currentPosition,
                  c1: this.currentPosition,
                  c2: this.currentPosition,
                  end: this.currentPosition,
                  duration: 0.01,
                },
              l.settle.duration,
              "power2.out",
            ),
          ),
        t.preserveMode ||
          d.call(() => {
            ((this.modeOverride = null),
              this.syncModeToPoint(this.currentPosition),
              this.queueIdleFloat());
          }),
        d
      );
    }
    parkForChatHistory() {
      const e = `history-park-${this.moveIndex}`,
        t = `${this.storyId}:${e}:${this.resolver.getBreakpoint()}`,
        a = { ...this.currentPosition },
        i = this.resolveHistoryParkPoint(),
        n = Ua(a, i, {
          seed: t,
          intent: "hover",
          speed: "quick",
          overshoot: !1,
          settle: !1,
          reducedMotion: this.options.reducedMotion,
        }),
        o = g.timeline();
      return (
        (this.moveIndex += 1),
        (this.plannedPosition = { ...i }),
        o.call(
          () => {
            (this.stopIdleFloat(!0),
              g.killTweensOf([this.el, this.floatLayer]),
              this.resetRotation(!0),
              this.clearPayloadDragState(),
              (this.modeOverride = "default"),
              this.setMode("default"));
          },
          void 0,
          0,
        ),
        o.add(
          this.pathTweenFromFactory(
            () => this.createHistoryParkPlan(t),
            n.duration,
            "sine.inOut",
          ),
        ),
        o.call(() => {
          ((this.modeOverride = null),
            this.syncModeToPoint(this.currentPosition),
            this.queueIdleFloat());
        }),
        o
      );
    }
    scanAcross(e, t = {}) {
      const a = t.label ?? `scan-${this.moveIndex}`,
        i = g.timeline();
      return (
        (this.moveIndex += 1),
        this.options.reducedMotion
          ? i.to({}, { duration: 0.08 })
          : (i.call(() => {
              (this.stopIdleFloat(),
                this.clearPayloadDragState(),
                (this.modeOverride = "default"),
                this.setMode("default"));
            }),
            i
              .add(
                this.pathTweenFromFactory(
                  () =>
                    this.resolveScanPath(
                      e,
                      `${this.storyId}:${a}:scan`,
                      t.match,
                    ),
                  t.duration ?? 0.78,
                  "sine.inOut",
                ),
              )
              .to({}, { duration: 0.08 }),
            i.call(() => {
              ((this.modeOverride = null),
                this.syncModeToPoint(this.currentPosition),
                this.queueIdleFloat());
            }),
            i)
      );
    }
    skimThrough(e, t = {}) {
      const a = t.label ?? `skim-${this.moveIndex}`,
        i = g.timeline();
      return (
        (this.moveIndex += 1),
        this.options.reducedMotion || !e.length
          ? i.to({}, { duration: 0.08 })
          : (i.call(() => {
              (this.stopIdleFloat(),
                this.clearPayloadDragState(),
                (this.modeOverride = null),
                this.syncModeToPoint(this.currentPosition));
            }),
            i
              .add(
                this.polylineTweenFromFactory(
                  () =>
                    this.resolveSkimPoints(
                      e,
                      `${this.storyId}:${a}:skim`,
                      t.match,
                    ),
                  t.duration ?? 1.05,
                  "sine.inOut",
                ),
              )
              .to({}, { duration: 0.08 }),
            i.call(() => {
              ((this.modeOverride = null),
                this.syncModeToPoint(this.currentPosition),
                this.queueIdleFloat());
            }),
            i)
      );
    }
    click(e = "pointer") {
      const t = g.timeline();
      return (
        t
          .call(
            () => {
              (this.stopIdleFloat(), this.clearPayloadDragState());
              const a =
                this.getModeForPoint(this.currentPosition) === "pointer";
              ((this.modeOverride = a ? "click" : null),
                a
                  ? this.setMode("click")
                  : this.syncModeToPoint(this.currentPosition));
            },
            void 0,
            0,
          )
          .to(this.el, {
            scale: 0.86,
            duration: this.options.reducedMotion ? 0.03 : 0.095,
            ease: "power2.out",
          })
          .to(this.el, {
            scale: 1,
            duration: this.options.reducedMotion ? 0.05 : 0.21,
            ease: "back.out(4)",
          })
          .call(() => {
            ((this.modeOverride = null),
              this.syncModeToPoint(this.currentPosition),
              this.queueIdleFloat());
          }),
        t
      );
    }
    beginDragPayload() {
      if (this.payloadReleaseActive) return;
      const e = this.payloadDragActive;
      ((this.payloadDragActive = !0),
        (this.payloadReleaseActive = !1),
        this.stopIdleFloat(),
        (this.modeOverride = "drag"),
        this.setMode("drag"),
        !e &&
          g.to(this.el, {
            scale: 0.9,
            duration: this.options.reducedMotion ? 0.04 : 0.16,
            ease: "power2.out",
            overwrite: "auto",
          }));
    }
    releaseDragPayload() {
      return g
        .timeline()
        .call(() => {
          ((this.payloadDragActive = !1),
            (this.payloadReleaseActive = !0),
            this.stopIdleFloat(),
            (this.modeOverride = "release"),
            this.setMode("release"));
        })
        .to(this.el, {
          scale: 1.04,
          duration: this.options.reducedMotion ? 0.03 : 0.1,
          ease: "power2.out",
          overwrite: "auto",
        })
        .to(this.el, {
          scale: 1,
          duration: this.options.reducedMotion ? 0.05 : 0.18,
          ease: "back.out(2.5)",
          overwrite: "auto",
        })
        .call(() => {
          ((this.payloadReleaseActive = !1),
            (this.modeOverride = null),
            this.syncModeToPoint(this.currentPosition),
            this.queueIdleFloat());
        });
    }
    dragTo(e, t = {}) {
      const a = g.timeline();
      return (
        a
          .call(() => {
            (this.stopIdleFloat(),
              (this.modeOverride = "drag"),
              this.setMode("drag"));
          })
          .to(this.el, {
            scale: 0.9,
            duration: this.options.reducedMotion ? 0.04 : 0.16,
            ease: "power2.out",
          })
          .add(
            this.moveTo(e, {
              ...t,
              mode: "drag",
              intent: "drag",
              speed: t.speed ?? "slow",
              overshoot: !1,
              settle: !1,
              preserveMode: !0,
            }),
            this.options.reducedMotion ? 0 : 0.03,
          )
          .call(() => {
            ((this.payloadReleaseActive = !1),
              (this.modeOverride = "drag"),
              this.setMode("drag"));
          })
          .to({}, { duration: t.releaseHold ?? 0 })
          .call(() => {
            ((this.payloadReleaseActive = !0),
              (this.modeOverride = "release"),
              this.setMode("release"));
          })
          .to(this.el, {
            scale: 1.04,
            duration: this.options.reducedMotion ? 0.03 : 0.1,
            ease: "power2.out",
          })
          .to(this.el, {
            scale: 1,
            duration: this.options.reducedMotion ? 0.05 : 0.18,
            ease: "back.out(2.5)",
          })
          .call(() => {
            ((this.payloadReleaseActive = !1),
              (this.modeOverride = null),
              this.syncModeToPoint(this.currentPosition),
              this.queueIdleFloat());
          }),
        a
      );
    }
    destroy() {
      (this.targetObserver?.disconnect(),
        this.stopModeWatch(),
        this.stopScheduledModeSync(),
        this.stopIdleFloat(),
        this.el.remove());
    }
    resetInteraction() {
      (this.stopIdleFloat(!0),
        (this.modeOverride = null),
        this.clearPayloadDragState(),
        delete this.el.dataset.cursorMimicking,
        g.killTweensOf(this.el),
        g.set(this.el, { scale: 1 }),
        this.resetRotation(!0),
        this.syncModeToPoint(this.currentPosition),
        this.queueIdleFloat());
    }
    clearTransientInteraction() {
      (this.clearPayloadDragState(),
        (this.modeOverride = null),
        g.killTweensOf(this.el, "scale"),
        g.set(this.el, { scale: 1 }),
        this.syncModeToPoint(this.currentPosition));
    }
    clearPayloadDragState() {
      ((this.payloadDragActive = !1), (this.payloadReleaseActive = !1));
    }
    pathTween(e, t, a, i, n, o = "power2.inOut") {
      const s = { t: 0 };
      return g.fromTo(
        s,
        { t: 0 },
        {
          t: 1,
          duration: n,
          ease: o,
          onUpdate: () => {
            const c = oo(e, t, a, i, s.t);
            ((this.currentPosition = c),
              this.renderPosition(c),
              this.modeOverride || this.maybeSyncModeToPoint(c));
          },
          onComplete: () => {
            ((this.currentPosition = { ...i }),
              this.renderPosition(i),
              this.modeOverride || this.syncModeToPoint(i));
          },
        },
      );
    }
    pathTweenFromFactory(e, t, a = "power2.inOut") {
      const i = { t: 0 };
      let n = null;
      return g.fromTo(
        i,
        { t: 0 },
        {
          t: 1,
          duration: t,
          ease: a,
          onStart: () => {
            ((i.t = 0), (n = e()));
          },
          onUpdate: () => {
            if (!n) return;
            const o = oo(n.start, n.c1, n.c2, n.end, i.t);
            ((this.currentPosition = o),
              this.renderPosition(o),
              this.modeOverride || this.maybeSyncModeToPoint(o));
          },
          onComplete: () => {
            n &&
              ((this.currentPosition = { ...n.end }),
              (this.plannedPosition = { ...n.end }),
              this.renderPosition(n.end),
              this.modeOverride || this.syncModeToPoint(n.end));
          },
        },
      );
    }
    createHistoryParkPlan(e) {
      this.resolver.refresh();
      const t = this.resolveHistoryParkPoint(),
        a = Ua(this.currentPosition, t, {
          seed: e,
          intent: "hover",
          speed: "quick",
          overshoot: !1,
          settle: !1,
          reducedMotion: this.options.reducedMotion,
        });
      return ((this.plannedPosition = { ...t }), a);
    }
    resolveHistoryParkPoint() {
      const e = this.root.getBoundingClientRect(),
        t = this.getChatShellRect();
      if (!t) return { ...this.currentPosition };
      const a = ht(t.height * za.topRatio, za.minTopInset, za.maxTopInset);
      return { x: t.right - e.left + za.outsideOffset, y: t.top - e.top + a };
    }
    pointTweenFromFactory(e, t, a = "power2.inOut") {
      const i = { t: 0 };
      let n = { ...this.currentPosition },
        o = { ...this.currentPosition };
      return g.fromTo(
        i,
        { t: 0 },
        {
          t: 1,
          duration: t,
          ease: a,
          onStart: () => {
            ((i.t = 0), (n = { ...this.currentPosition }), (o = e()));
          },
          onUpdate: () => {
            const s = {
              x: n.x + (o.x - n.x) * i.t,
              y: n.y + (o.y - n.y) * i.t,
            };
            ((this.currentPosition = s), this.renderPosition(s));
          },
          onComplete: () => {
            ((this.currentPosition = { ...o }),
              (this.plannedPosition = { ...this.currentPosition }),
              this.renderPosition(this.currentPosition));
          },
        },
      );
    }
    polylineTweenFromFactory(e, t, a = "sine.inOut") {
      const i = { t: 0 };
      let n = co([{ ...this.currentPosition }]);
      return g.fromTo(
        i,
        { t: 0 },
        {
          t: 1,
          duration: t,
          ease: a,
          onStart: () => {
            ((i.t = 0), (n = co(e())));
          },
          onUpdate: () => {
            const o = Wc(n, i.t);
            ((this.currentPosition = o),
              this.renderPosition(o),
              this.modeOverride || this.maybeSyncModeToPoint(o));
          },
          onComplete: () => {
            const o = n.points[n.points.length - 1] ?? this.currentPosition;
            ((this.currentPosition = { ...o }),
              (this.plannedPosition = { ...o }),
              this.renderPosition(o),
              this.modeOverride || this.syncModeToPoint(o));
          },
        },
      );
    }
    resolveScanPath(e, t, a = "first") {
      const i = { ...this.currentPosition },
        n = this.resolveScanPoint(e, `${t}:start`, "start", a),
        o = this.resolveScanPoint(e, `${t}:end`, "end", a);
      return { start: i, c1: nn(i, n, 0.64), c2: nn(n, o, 0.42), end: o };
    }
    resolveSkimPoints(e, t, a = "first") {
      const i = e
        .map((n, o) => this.resolveSkimPoint(n, `${t}:${o}`, o, a))
        .filter((n) => !!n);
      return [{ ...this.currentPosition }, ...i];
    }
    resolveSkimPoint(e, t, a, i = "first") {
      const n = typeof e == "string" ? this.findVisibleScanElement(e, i) : e;
      if (!n) return null;
      this.resolver.refresh();
      const o = this.seededScanRandom(t),
        s = this.root.getBoundingClientRect(),
        c = n.getBoundingClientRect(),
        l = this.getChatShellRect(),
        d = l ? Math.max(c.left, l.left + 18) : c.left,
        u = l ? Math.min(c.right, l.right - 18) : c.right,
        h = l ? Math.max(c.top, l.top + 58) : c.top,
        m = l ? Math.min(c.bottom, l.bottom - 34) : c.bottom,
        f = Math.max(1, u - d),
        p = Math.max(1, m - h),
        w = a % 2 === 0 ? 1 : -1,
        b = ht(0.62 + w * 0.08 + (o() - 0.5) * 0.08, 0.48, 0.78),
        A = ht(0.5 + (o() - 0.5) * 0.16, 0.34, 0.66);
      return { x: d - s.left + f * b, y: h - s.top + p * A };
    }
    resolveScanPoint(e, t, a, i = "first") {
      const n = typeof e == "string" ? this.findVisibleScanElement(e, i) : e;
      if (!n) return this.currentPosition;
      this.resolver.refresh();
      const o = this.seededScanRandom(t),
        s = this.root.getBoundingClientRect(),
        c = n.getBoundingClientRect(),
        l = this.getChatShellRect(),
        d = l ? Math.max(c.left, l.left + 18) : c.left,
        u = l ? Math.min(c.right, l.right - 18) : c.right,
        h = l ? Math.max(c.top, l.top + 58) : c.top,
        m = l ? Math.min(c.bottom, l.bottom - 34) : c.bottom,
        f = Math.max(1, u - d),
        p = Math.max(1, m - h),
        w = a === "start" ? 0.16 + o() * 0.08 : 0.76 + o() * 0.12,
        b = 0.34 + o() * 0.32;
      return { x: d - s.left + f * w, y: h - s.top + p * b };
    }
    findVisibleScanElement(e, t = "first") {
      const a = this.root.querySelectorAll(e);
      if (t === "last") {
        for (let i = a.length - 1; i >= 0; i -= 1) {
          const n = a.item(i);
          if (n && this.isVisibleScanElement(n)) return n;
        }
        return null;
      }
      for (const i of a) if (this.isVisibleScanElement(i)) return i;
      return null;
    }
    isVisibleScanElement(e) {
      return !!this.getVisibleRect(e);
    }
    getVisibleRect(e) {
      const t = window.getComputedStyle(e);
      if (
        t.display === "none" ||
        t.visibility === "hidden" ||
        Number(t.opacity) <= 0.01
      )
        return null;
      const a = e.getBoundingClientRect();
      return a.width > 0 && a.height > 0 ? a : null;
    }
    getChatShell() {
      return this.chatShell?.isConnected
        ? this.chatShell
        : ((this.chatShell = this.root.querySelector("[data-chat-shell]")),
          this.chatShell);
    }
    getChatShellRect() {
      return this.getChatShell()?.getBoundingClientRect() ?? null;
    }
    seededScanRandom(e) {
      let t = 2166136261;
      for (let a = 0; a < e.length; a += 1)
        ((t ^= e.charCodeAt(a)), (t = Math.imul(t, 16777619)));
      return () => {
        t += 1831565813;
        let a = t;
        return (
          (a = Math.imul(a ^ (a >>> 15), a | 1)),
          (a ^= a + Math.imul(a ^ (a >>> 7), a | 61)),
          ((a ^ (a >>> 14)) >>> 0) / 4294967296
        );
      };
    }
    renderPosition(e) {
      (e.x !== this.transformState.x &&
        ((this.transformState.x = e.x), this.setX(e.x)),
        e.y !== this.transformState.y &&
          ((this.transformState.y = e.y), this.setY(e.y)));
    }
    renderMimicRotation(e, t) {
      const a = t.x - e.x,
        i = t.y - e.y;
      if (a * a + i * i < 4) return;
      const n = (Math.atan2(i, a) * 180) / Math.PI,
        o = jc(n - Gc),
        s = this.rotationState + Kc(this.rotationState, o) * Qc;
      this.renderRotation(s);
    }
    resetRotation(e = !1) {
      if (
        (g.killTweensOf(this.el, "rotation"), e || this.options.reducedMotion)
      ) {
        this.renderRotation(0);
        return;
      }
      g.to(this.el, {
        rotation: 0,
        duration: 0.16,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          this.rotationState = Number(g.getProperty(this.el, "rotation")) || 0;
        },
        onComplete: () => {
          this.rotationState = 0;
        },
      });
    }
    renderRotation(e) {
      Math.abs(e - this.rotationState) < 0.1 ||
        ((this.rotationState = e), this.setRotation(e));
    }
    queueIdleFloat(e = an.delay) {
      this.options.reducedMotion ||
        (this.idleFloatDelay?.kill(),
        (this.idleFloatDelay = g.delayedCall(e, () => this.startIdleFloat())));
    }
    startIdleFloat() {
      if (this.options.reducedMotion || this.idleFloat?.isActive()) return;
      g.killTweensOf(this.floatLayer);
      const e = g.timeline({ repeat: -1 });
      for (const t of an.segments)
        e.to(this.floatLayer, {
          x: t.x,
          y: t.y,
          rotation: t.rotation,
          duration: t.duration,
          ease: "sine.inOut",
        });
      this.idleFloat = e;
    }
    stopIdleFloat(e = !1) {
      if (
        (this.idleFloatDelay?.kill(),
        (this.idleFloatDelay = null),
        this.idleFloat?.kill(),
        (this.idleFloat = null),
        e || this.options.reducedMotion)
      ) {
        g.set(this.floatLayer, { x: 0, y: 0, rotation: 0 });
        return;
      }
      g.to(this.floatLayer, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: an.returnDuration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    maybeSyncModeToPoint(e) {
      const t = performance.now(),
        a = e.x - this.lastModeSyncPoint.x,
        i = e.y - this.lastModeSyncPoint.y,
        n = Number.isNaN(this.lastModeSamplePoint.x)
          ? 0
          : e.x - this.lastModeSamplePoint.x,
        o = Number.isNaN(this.lastModeSamplePoint.y)
          ? 0
          : e.y - this.lastModeSamplePoint.y,
        s = Number.isNaN(a) || a * a + i * i >= ha.minDistance * ha.minDistance;
      ((this.lastModeSamplePoint = { ...e }),
        !(!s && t - this.lastModeSyncAt < ha.minInterval) &&
          ((this.lastModeSyncAt = t),
          (this.lastModeSyncPoint = { ...e }),
          this.syncModeToPoint(e, { x: n, y: o })));
    }
    updateModeWatch() {
      if (this.mode !== "default" && !this.modeOverride) {
        this.scheduleModeWatch();
        return;
      }
      this.stopModeWatch();
    }
    scheduleModeWatch() {
      this.modeWatchFrame ||
        (this.modeWatchFrame = window.requestAnimationFrame(
          this.watchModeTarget,
        ));
    }
    watchModeTarget = () => {
      ((this.modeWatchFrame = 0),
        !(this.modeOverride || this.mode === "default") &&
          (this.syncModeToPoint(this.currentPosition),
          this.el.dataset.cursorMode !== "default" &&
            !this.modeOverride &&
            this.scheduleModeWatch()));
    };
    stopModeWatch() {
      this.modeWatchFrame &&
        (window.cancelAnimationFrame(this.modeWatchFrame),
        (this.modeWatchFrame = 0));
    }
    scheduleModeSync() {
      this.modeSyncFrame ||
        (this.modeSyncFrame = window.requestAnimationFrame(() => {
          ((this.modeSyncFrame = 0),
            this.modeOverride || this.syncModeToPoint(this.currentPosition));
        }));
    }
    stopScheduledModeSync() {
      this.modeSyncFrame &&
        (window.cancelAnimationFrame(this.modeSyncFrame),
        (this.modeSyncFrame = 0));
    }
    syncModeToPoint(e, t = { x: 0, y: 0 }) {
      if (this.payloadDragActive) {
        ((this.modeOverride = "drag"),
          this.mode !== "drag" && this.setMode("drag"));
        return;
      }
      const a = this.getModeForPoint(e, t);
      a !== this.mode && this.setMode(a);
    }
    getModeForPoint(e, t = { x: 0, y: 0 }) {
      const a = this.getModeForExactPoint(e);
      if (a !== "default") return a;
      const i = Math.hypot(t.x, t.y);
      return i <= 0.25
        ? "default"
        : this.getModeForExactPoint({
            x: e.x + (t.x / i) * ha.lookahead,
            y: e.y + (t.y / i) * ha.lookahead,
          });
    }
    getModeForExactPoint(e) {
      const t = this.root.getBoundingClientRect(),
        a = { x: t.left + e.x, y: t.top + e.y },
        i =
          a.x >= 0 &&
          a.x <= window.innerWidth &&
          a.y >= 0 &&
          a.y <= window.innerHeight
            ? document.elementFromPoint(a.x, a.y)
            : null,
        n = this.getModeForElement(i);
      return n !== "default" ? n : this.getModeForLocalPoint(e, t);
    }
    getModeForElement(e) {
      return e
        ? e.closest(en)
          ? "pointer"
          : e.closest(tn)
            ? "text"
            : "default"
        : "default";
    }
    getModeForLocalPoint(e, t) {
      return (
        this.refreshModeTargetCache(),
        this.findLocalHit(this.pointerTargets, e, t, en)
          ? "pointer"
          : this.findLocalHit(this.textTargets, e, t, tn)
            ? "text"
            : "default"
      );
    }
    findLocalHit(e, t, a, i) {
      for (const n of e) {
        if (!n.matches(i)) continue;
        const o = this.getVisibleRect(n);
        if (!o) continue;
        const s = o.left - a.left,
          c = o.right - a.left,
          l = o.top - a.top,
          d = o.bottom - a.top;
        if (t.x >= s && t.x <= c && t.y >= l && t.y <= d) return n;
      }
      return null;
    }
    refreshModeTargetCache() {
      this.modeTargetsDirty &&
        ((this.pointerTargets = Array.from(
          this.root.querySelectorAll(en),
        ).reverse()),
        (this.textTargets = Array.from(
          this.root.querySelectorAll(tn),
        ).reverse()),
        (this.modeTargetsDirty = !1));
    }
    observeModeTargets() {
      "MutationObserver" in window &&
        ((this.targetObserver = new MutationObserver(() => {
          ((this.modeTargetsDirty = !0), this.scheduleModeSync());
        })),
        this.targetObserver.observe(this.root, {
          attributes: !0,
          attributeFilter: [
            "aria-disabled",
            "class",
            "contenteditable",
            "data-visible",
            "disabled",
            "href",
            "role",
          ],
          childList: !0,
          subtree: !0,
        }));
    }
    createElement() {
      const e = document.createElement("div");
      ((e.className = "wa-cursor"),
        (e.dataset.cursor = ""),
        (e.dataset.cursorMode = "default"),
        e.setAttribute("aria-hidden", "true"));
      const t = document.createElement("div");
      ((t.className = "wa-cursor__float"), (t.dataset.cursorFloat = ""));
      const a = document.createElement("div");
      return (
        (a.className = "wa-cursor__glyph"),
        a.append(lo()),
        t.append(a),
        e.append(t),
        this.root.append(e),
        e
      );
    }
    ensureFloatLayer() {
      const e = this.el.querySelector("[data-cursor-float]");
      if (e) return e;
      const t =
        this.el.querySelector(".wa-cursor__glyph") ??
        document.createElement("div");
      (t.classList.contains("wa-cursor__glyph") ||
        (t.className = "wa-cursor__glyph"),
        t.querySelector(".wa-cursor__mimic-head") || t.append(lo()));
      const a = document.createElement("div");
      return (
        (a.className = "wa-cursor__float"),
        (a.dataset.cursorFloat = ""),
        a.append(t),
        this.el.append(a),
        a
      );
    }
  }
  function lo() {
    const r = document.createDocumentFragment(),
      e = document.createElement("span"),
      t = document.createElement("span");
    return (
      (e.className = "wa-cursor__mimic-tail"),
      (t.className = "wa-cursor__mimic-head"),
      e.setAttribute("aria-hidden", "true"),
      t.setAttribute("aria-hidden", "true"),
      r.append(e, t),
      r
    );
  }
  function nn(r, e, t) {
    return { x: r.x + (e.x - r.x) * t, y: r.y + (e.y - r.y) * t };
  }
  function co(r) {
    const e = [];
    let t = 0;
    for (let a = 0; a < r.length - 1; a += 1) {
      const i = ro(r[a], r[a + 1]);
      (e.push(i), (t += i));
    }
    return { points: r, segmentLengths: e, totalLength: t };
  }
  function Wc(r, e) {
    const { points: t, segmentLengths: a, totalLength: i } = r;
    if (t.length <= 1) return t[0] ?? { x: 0, y: 0 };
    if (i <= 0) return t[t.length - 1] ?? t[0];
    let n = ht(e, 0, 1) * i;
    for (let o = 0; o < a.length; o += 1) {
      const s = a[o];
      if (n <= s || o === a.length - 1) {
        const c = s <= 0 ? 1 : n / s,
          l = c * c * (3 - 2 * c);
        return nn(t[o], t[o + 1], l);
      }
      n -= s;
    }
    return t[t.length - 1] ?? t[0];
  }
  function jc(r) {
    return ((r % 360) + 360) % 360;
  }
  function Kc(r, e) {
    return ((e - r + 540) % 360) - 180;
  }
  const uo = new Set(),
    Ha = new Set(),
    Xc = ["avatarUrl", "mutualConnectionAvatarUrl"],
    Jc = [
      "name",
      "contact",
      "prospect",
      "fullName",
      "mutualConnection",
      "connector",
    ];
  function ho(r, e, t = Qi) {
    r.length && (po(r[e], t), po(r[(e + 1) % r.length], t));
  }
  function po(r, e = Qi) {
    if (r?.assetUrls?.length) for (const t of r.assetUrls) ad(t, e);
  }
  function pa(r) {
    return Va($c(r).flatMap((e) => ed(e.values)));
  }
  function Zc(r) {
    return Va(r.sources.map((e) => e.logoSrc));
  }
  function go(r) {
    return Va(r.leads.map((e) => Ba(e.name, e.avatarUrl)));
  }
  function mo(r) {
    return Va(r.sequences.map((e) => Ba(e.name, e.avatarUrl)));
  }
  function $c(r) {
    return [...r.rows, ...(r.pagination?.pages.flatMap((e) => e.rows) ?? [])];
  }
  function ed(r) {
    const e = Xc.map((t) => r[t]);
    for (const t of Jc) {
      const a = r[t];
      if (!a || !td(t, r)) continue;
      const i =
        t === "mutualConnection" || t === "connector"
          ? r.mutualConnectionAvatarUrl
          : r.avatarUrl;
      e.push(Ba(a, i));
    }
    return e;
  }
  function td(r, e) {
    return r === "mutualConnection" || r === "connector"
      ? !0
      : !!(
          e.avatarUrl ||
          e.avatar ||
          e.avatarTone ||
          e.source ||
          e.personDetail ||
          e.prospectDetail
        );
  }
  function ad(r, e) {
    if (typeof document > "u" || typeof Image > "u") return;
    const t = nd(e(r));
    if (!t || uo.has(t)) return;
    (uo.add(t), id(t));
    const a = new Image();
    ((a.decoding = "async"),
      (a.loading = "eager"),
      (a.src = t),
      a.decode?.().catch(() => {}));
  }
  function Va(r) {
    const e = new Set();
    for (const t of r) rd(t) && e.add(t);
    return [...e];
  }
  function id(r) {
    if (!Ha.size)
      for (const t of document.head.querySelectorAll(
        'link[rel="preload"][as="image"]',
      ))
        Ha.add(t.href);
    if (Ha.has(r)) return;
    Ha.add(r);
    const e = document.createElement("link");
    ((e.rel = "preload"),
      (e.as = "image"),
      (e.href = r),
      document.head.append(e));
  }
  function nd(r) {
    try {
      return new URL(r, document.baseURI).href;
    } catch {
      return null;
    }
  }
  function rd(r) {
    return typeof r == "string" && r.trim().length > 0;
  }
  const P = {
      typeShort: 0.92,
      typeMedium: 1.16,
      typeLong: 1.34,
      thinkingShort: 0.92,
      thinkingMedium: 1.3,
      beat: 0.26,
      fileGrab: 0.18,
    },
    De = { ease: "sine.inOut", overshoot: !1, settle: !1 },
    Re = {
      compact: 0.5,
      paginationClick: 0.52,
      previewCard: 0.68,
      sequenceEnroll: 1.05,
    };
  function rn(r) {
    return typeof r == "number" ? { x: r, y: 0 } : r;
  }
  function L(r, e, t = {}, a = !0) {
    return {
      desktop: { target: r, anchor: e, offset: rn(t.desktop), humanOffset: a },
      tablet: { target: r, anchor: e, offset: rn(t.tablet), humanOffset: a },
      mobile: { target: r, anchor: e, offset: rn(t.mobile), humanOffset: a },
    };
  }
  const Ga = {
      hitGroundRunning: L("[data-chat-input]", "center", {
        desktop: -72,
        tablet: -68,
        mobile: -54,
      }),
      dataMarketplace: L("[data-chat-input]", "center", {
        desktop: -54,
        tablet: -52,
        mobile: -44,
      }),
      crmUpdate: L("[data-chat-input]", "center", {
        desktop: -42,
        tablet: -46,
        mobile: -36,
      }),
      researchBrief: L("[data-chat-input]", "center", {
        desktop: -70,
        tablet: -62,
        mobile: -50,
      }),
      supportResolution: L("[data-chat-input]", "center", {
        desktop: -62,
        tablet: -58,
        mobile: -46,
      }),
    },
    fo = L("[data-signup-field]", "center", {
      desktop: -74,
      tablet: -66,
      mobile: -48,
    }),
    wo = L("[data-signup-submit]", "center"),
    od = L("[data-send-button]", "center"),
    on = {
      desktop: {
        target: "[data-chat-shell]",
        anchor: "right",
        offset: { x: -34, y: -138 },
        humanOffset: !0,
      },
      tablet: {
        target: "[data-chat-shell]",
        anchor: "right",
        offset: { x: -30, y: -118 },
        humanOffset: !0,
      },
      mobile: {
        target: "[data-chat-shell]",
        anchor: "right",
        offset: { x: -28, y: -96 },
        humanOffset: !0,
      },
    },
    sd = 2.8,
    ld = 42,
    cd = 2,
    dd = 3,
    Tt = {
      approachDuration: 0.78,
      betweenCardDuration: 0.92,
      betweenCardDurationStep: 0.08,
      curve: 0.2,
      followBuffer: 0.7,
    },
    Qa = "[data-chat-shell] [data-chat-thread]",
    ud = `${Qa} [data-message-role="assistant"]:not(.wa-message--component) [data-message-body]`,
    hd = `${Qa} [data-message-role="assistant"].wa-message--thinking .wa-research-step[data-step-state="current"] .wa-research-step__body, ${Qa} [data-message-role="assistant"].wa-message--thinking .wa-research-step[data-step-state="complete"] .wa-research-step__label`,
    Ya = 0.24,
    bo = 0.3,
    Xe = {
      right: { target: "[data-chat-shell]", anchor: "right", outside: "right" },
      bottomRight: {
        target: "[data-chat-shell]",
        anchor: "bottomRight",
        outside: "bottom",
      },
    };
  function pt(r = Xe.right, e) {
    return {
      kind: "cursorMove",
      target: r,
      options: { intent: "exit", label: "exit" },
      at: e,
    };
  }
  function Ao(r) {
    const e = L(
      `[data-mailbox-connect="${_e(r.id)}"]`,
      "center",
      {
        desktop: { x: 2, y: 0 },
        tablet: { x: 1, y: 0 },
        mobile: { x: 0, y: 0 },
      },
      !1,
    );
    return [
      { kind: "status", text: "connect mailbox" },
      {
        kind: "custom",
        build: (t) => t.chat.mailboxConnection(r),
        at: "+=0.04",
      },
      ...vo([
        {
          selector: `[data-mailbox-connection="${_e(r.id)}"] .wa-mailbox-connection__copy`,
          label: `mailbox-cta-skim-${r.id}`,
          scanDuration: 0.5,
          at: "+=0.16",
        },
      ]),
      {
        kind: "cursorMove",
        target: e,
        options: {
          mode: "pointer",
          intent: "click",
          speed: "quick",
          duration: Re.compact,
          curve: 0.1,
          ...De,
          label: `mailbox-connect-${r.id}`,
        },
        at: "+=0.08",
      },
      { kind: "cursorClick", at: "+=0.04" },
      {
        kind: "custom",
        build: (t) => t.chat.connectMailbox(r.id),
        at: "<+=0.08",
      },
    ];
  }
  function yo(r) {
    const e = gt(`[data-style-profile="${_e(r)}"]`),
      t = Wa(r);
    return vo([
      {
        selector: `${e} .wa-style-profile__row:nth-of-type(1)`,
        label: `${t}-top-row`,
        scanDuration: 0.58,
        at: "+=0.08",
      },
      {
        selector: `${e} .wa-style-profile__row:nth-of-type(3)`,
        label: `${t}-middle-row`,
        scanDuration: 0.58,
        scrollBeforeScan: !0,
        scrollDuration: 0.56,
        at: "+=0.04",
      },
      {
        selector: `${e} .wa-style-profile__examples`,
        scanSelector: `${e} .wa-style-profile__example:nth-of-type(1)`,
        label: `${t}-examples-section`,
        scanLabel: `${t}-examples`,
        scanDuration: 0.66,
        scrollBeforeScan: !0,
        scrollDuration: 0.56,
        at: "+=0.04",
      },
    ]);
  }
  function vo(r) {
    return r.flatMap((e) => {
      const t = [];
      return (
        e.scrollBeforeScan &&
          t.push({
            kind: "custom",
            build: (a) =>
              a.chat.scrollChatElementIntoView(e.selector, {
                align: e.scrollAlign,
                duration: e.scrollDuration,
                offset: e.scrollOffset,
              }),
            at: e.at,
          }),
        t.push({
          kind: "custom",
          build: (a) =>
            a.cursor.scanAcross(e.scanSelector ?? e.selector, {
              duration: e.scanDuration,
              label: e.scanLabel ?? e.label,
              match: e.scanMatch,
            }),
          at: e.scrollBeforeScan ? "+=0.02" : e.at,
        }),
        t
      );
    });
  }
  const Je = {
    firstMoveDelay: "+=0.22",
    betweenStepDelay: "+=0.22",
    clickDelay: "+=0.12",
    sequenceUpdateAt: "-=0.03",
    firstDuration: 1.15,
    duration: 0.82,
    firstCurve: 0.2,
    curve: 0.14,
    reviewHold: P.beat + 0.22,
  };
  function xo(r, e, t = Je.firstMoveDelay) {
    return e.flatMap((a, i) => {
      const n = `[data-sequence-engagement="${_e(r)}"] .wa-sequence-card[data-active="true"] .wa-sequence-step[data-step-index="${a}"]`,
        o = i === 0;
      return [
        {
          kind: "cursorMove",
          target: L(n, "center", {}, !1),
          options: {
            mode: "pointer",
            intent: "click",
            speed: "slow",
            ease: "sine.inOut",
            duration: o ? Je.firstDuration : Je.duration,
            curve: o ? Je.firstCurve : Je.curve,
            overshoot: !1,
            settle: !1,
            label: `${r}-step-${a}`,
          },
          at: i === 0 ? t : Je.betweenStepDelay,
        },
        { kind: "cursorClick", at: Je.clickDelay },
        {
          kind: "custom",
          build: (s) => s.chat.sequenceStep(r, a),
          at: Je.sequenceUpdateAt,
        },
        {
          kind: "custom",
          build: (s) => s.timeline().to({}, { duration: Je.reviewHold }),
          at: "+=0.02",
        },
      ];
    });
  }
  function _o(r, e = P.beat + 0.18, t, a = {}) {
    return {
      kind: "custom",
      build: (i) => {
        const n = ma(i);
        return (
          n.call(() => i.chat.scrollDataTableFooterIntoView(r, e, a)),
          n.to({}, { duration: e }),
          a.settleDelay &&
            (n.to({}, { duration: a.settleDelay }),
            n.call(() => i.chat.scrollDataTableFooterIntoView(r, e, a)),
            n.to({}, { duration: e })),
          Yt(n)
        );
      },
      at: t,
    };
  }
  function Ve(r, e) {
    const t = ma(r),
      a = vd();
    for (const [i, n] of e.entries()) pd(t, r, n, i, a);
    return Yt(t);
  }
  function pd(r, e, t, a, i) {
    switch (t.kind) {
      case "prompt":
        r.add(_d(e, t), t.at);
        return;
      case "status":
        r.add(e.chat.setStatus(t.text), t.at);
        return;
      case "cursorClick":
        r.add(e.cursor.click(t.nextMode), t.at);
        return;
      case "typeSignupEmail":
        r.add(e.chat.typeSignupEmail(t.email, t.duration), t.at);
        return;
      case "transitionSignupToChat":
        r.add(e.chat.transitionSignupToChat(), t.at);
        return;
      case "assistant":
        (r.add(e.chat.assistantMessage(t.text), t.at),
          yd(r, e, i, {
            kind: "assistant",
            key: t.text,
            text: t.text,
            selector: ud,
            label: `assistant-${Wa(t.text)}`,
            stepIndex: a,
          }));
        return;
      case "thinking": {
        const n = gd(t),
          o = n.items.map((c) => c.label),
          s = md(n, t.hold);
        (t.statusBefore && r.add(e.chat.setStatus(t.statusBefore), t.at),
          r.add(
            e.chat.thinkingState(n, t.hold, {
              preserveScroll: t.preserveScroll ?? !1,
            }),
            t.statusBefore ? void 0 : t.at,
          ),
          t.cursorMotion !== !1 &&
            Ad(r, e, i, t.hold, o.length, o.join("|"), a, s));
        return;
      }
      case "dataTable":
        ga(
          r,
          e,
          e.chat.dataTable(t.config),
          t.at,
          gt(`[data-data-table="${_e(t.config.id)}"]`),
          `table-${t.config.id}`,
        );
        return;
      case "enrichmentPanel":
        ga(
          r,
          e,
          e.chat.enrichmentPanel(t.config),
          t.at,
          gt(`[data-enrichment-panel="${_e(t.config.id)}"]`),
          `enrichment-${t.config.id}`,
        );
        return;
      case "strategyPlans":
        {
          const n = gt(
            `[data-strategy-plans~="${_e(t.plans[0]?.id ?? "strategy")}"]`,
          );
          (r.add(e.chat.strategyPlans(t.plans), t.at),
            r.add(bd(e, n, t.plans), "+=0.06"));
        }
        return;
      case "dataSourcesGrid":
        ga(
          r,
          e,
          e.chat.dataSourcesGrid(t.config),
          t.at,
          gt(`[data-data-sources-grid="${_e(t.config.id)}"]`),
          `sources-${t.config.id}`,
        );
        return;
      case "marketingDataSourcesGrid":
        ga(
          r,
          e,
          e.chat.marketingDataSourcesGrid(t.config),
          t.at,
          gt(`[data-marketing-data-sources-grid="${_e(t.config.id)}"]`),
          `marketing-sources-${t.config.id}`,
        );
        return;
      case "personalizationSwipeGame":
        fd(r, e, t.config, t.at);
        return;
      case "sequenceEngagement":
        ga(
          r,
          e,
          e.chat.sequenceEngagement(t.config),
          t.at,
          gt(`[data-sequence-engagement="${_e(t.config.id)}"]`),
          `sequence-${t.config.id}`,
        );
        return;
      case "cursorMove":
        r.add(e.cursor.moveTo(t.target, t.options), t.at);
        return;
      case "cursorDrag":
        r.add(e.cursor.dragTo(t.target, t.options), t.at);
        return;
      case "custom":
        r.add(t.build(e), t.at);
        return;
    }
  }
  function gd(r) {
    return "thinking" in r && r.thinking
      ? r.thinking
      : Array.isArray(r.steps)
        ? { items: r.steps.map(ko) }
        : { items: [ko(r.label ?? "")] };
  }
  function ko(r) {
    return typeof r == "string" ? { label: r } : r;
  }
  function md(r, e = P.thinkingShort) {
    const t = Math.max(1, r.items.length),
      a = r.items.reduce((i, n) => {
        const o =
          typeof n.duration == "number" && Number.isFinite(n.duration)
            ? Math.max(0, n.duration)
            : 0;
        return i + o;
      }, 0);
    return e * t + a;
  }
  function ga(r, e, t, a, i, n) {
    (r.add(t, a), r.add(wd(e, i, n), "+=0.06"));
  }
  function fd(r, e, t, a) {
    const i = gt(`[data-personalization-swipe-game="${_e(t.id)}"]`);
    (r.add(e.chat.personalizationSwipeGame(t), a),
      t.signals.forEach((n, o) => {
        const s = `${i} [data-swipe-card="${_e(n.id)}"]`,
          c = n.decision === "use" ? 1 : -1,
          l = n.decision === "use" ? "right" : "left",
          d = L(
            s,
            l,
            {
              desktop: { x: c * 154, y: o % 2 === 0 ? -18 : 16 },
              tablet: { x: c * 132, y: o % 2 === 0 ? -14 : 14 },
              mobile: { x: c * 86, y: o % 2 === 0 ? -10 : 10 },
            },
            !1,
          );
        (r.add(
          e.cursor.moveTo(L(s, "center", {}, !1), {
            intent: "hover",
            mode: "default",
            speed: o === 0 ? "normal" : "quick",
            overshoot: !1,
            settle: !1,
            label: `swipe-card-${n.id}-center`,
          }),
          o === 0 ? "+=0.2" : "+=0.12",
        ),
          r.add(
            e.cursor.dragTo(d, {
              speed: "slow",
              releaseHold: 0.08,
              label: `swipe-card-${n.id}-${n.decision}`,
            }),
            "-=0.02",
          ),
          r.add(
            e.chat.swipePersonalizationCard(t.id, n.id, n.decision),
            "<+=0.2",
          ));
      }),
      r.add(
        e.cursor.moveTo(on, {
          intent: "hover",
          mode: "default",
          speed: "slow",
          overshoot: !1,
          settle: !1,
          label: `swipe-game-complete-${t.id}`,
        }),
        "+=0.08",
      ));
  }
  function wd(r, e, t) {
    const a = ma(r).add(r.cursor.scanAcross(e, { label: t }));
    return Yt(a);
  }
  function bd(r, e, t) {
    const a = ma(r),
      i = t.map((l) => `${e} [data-strategy-plan="${_e(l.id)}"]`),
      [n, ...o] = i,
      s = o.reduce((l, d, u) => l + So(u), 0),
      c = Tt.approachDuration + s + Tt.followBuffer;
    return (
      n &&
        (a.add(r.chat.strategyPlanCursorHover(e, r.cursor, c), 0),
        a.add(
          r.cursor.moveTo(L(n, "center", {}, !1), {
            intent: "hover",
            speed: "slow",
            duration: Tt.approachDuration,
            curve: Tt.curve,
            ease: "sine.inOut",
            overshoot: !1,
            settle: !1,
            label: `strategy-card-approach-${t[0]?.id ?? "first"}`,
          }),
          0,
        ),
        o.forEach((l, d) => {
          a.add(
            r.cursor.moveTo(L(l, "center", {}, !1), {
              intent: "hover",
              speed: "slow",
              duration: So(d),
              curve: Tt.curve,
              ease: "sine.inOut",
              overshoot: !1,
              settle: !1,
              label: `strategy-card-hover-${t[d + 1]?.id ?? d + 2}`,
            }),
            "+=0.04",
          );
        })),
      Yt(a)
    );
  }
  function So(r) {
    return Tt.betweenCardDuration + r * Tt.betweenCardDurationStep;
  }
  function Ad(
    r,
    e,
    t,
    a = P.thinkingShort,
    i = 1,
    n = "thinking",
    o = 0,
    s = a * Math.max(1, i),
  ) {
    const c = s,
      l =
        i >= 3 &&
        Co(e, t, {
          kind: "thinking",
          key: n,
          text: n,
          stepIndex: o,
          minChars: 16,
        });
    (l &&
      r.add(
        e.cursor.scanAcross(hd, {
          label: `thinking-skim-${Wa(n)}`,
          match: "last",
          duration: 0.72,
        }),
        "<+=0.58",
      ),
      !(c < sd) &&
        r.add(
          e.cursor.moveTo(on, {
            intent: "hover",
            mode: "default",
            speed: "slow",
            overshoot: !1,
            settle: !1,
            label: `thinking-idle-${Wa(n)}`,
          }),
          l ? "+=0.08" : "<+=0.08",
        ));
  }
  function yd(r, e, t, a) {
    Co(e, t, a) &&
      r.add(
        e.cursor.scanAcross(a.selector, {
          label: `text-skim-${a.label}`,
          match: "last",
          duration: 0.68,
        }),
        "+=0.04",
      );
  }
  function vd() {
    return {
      textCandidateCount: 0,
      textSkimCount: 0,
      lastTextSkimStep: Number.NEGATIVE_INFINITY,
    };
  }
  function Co(r, e, t) {
    const a = t.text.trim(),
      i = t.minChars ?? ld;
    if (a.length < i || e.textSkimCount >= dd) return !1;
    const n = e.textCandidateCount;
    e.textCandidateCount += 1;
    const o = e.textSkimCount === 0,
      s = t.stepIndex - e.lastTextSkimStep >= cd,
      c = xd(`${r.story.id}:${t.kind}:${n}:${t.key}`),
      l = n > 0 && n % 3 === 0,
      d = o || (s && (c >= 0.58 || l));
    return (
      d && ((e.textSkimCount += 1), (e.lastTextSkimStep = t.stepIndex)),
      d
    );
  }
  function xd(r) {
    let e = 2166136261;
    for (let a = 0; a < r.length; a += 1)
      ((e ^= r.charCodeAt(a)), (e = Math.imul(e, 16777619)));
    e += 1831565813;
    let t = e;
    return (
      (t = Math.imul(t ^ (t >>> 15), t | 1)),
      (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  }
  function _e(r) {
    return r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }
  function gt(r) {
    return `${Qa} ${r}`;
  }
  function Wa(r) {
    return (
      r
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 36) || "state"
    );
  }
  function _d(r, e) {
    const t = ma(r);
    return (
      e.statusBefore && t.add(r.chat.setStatus(e.statusBefore)),
      t.add(r.chat.showComposer(), e.statusBefore ? "-=0.02" : void 0),
      e.fromEntry ||
        t.add(
          r.cursor.moveTo(e.focusTarget ?? r.story.entry, {
            mode: "text",
            intent: "text",
            speed: "normal",
            duration: Re.compact,
            curve: 0.1,
            ...De,
            label: `focus-${e.sendLabel}`,
          }),
          "-=0.18",
        ),
      t
        .add(r.cursor.click("text"), "+=0.04")
        .add(r.chat.setComposerFocus(!0), "-=0.14")
        .add(r.chat.typeComposer(e.text, e.duration ?? P.typeMedium))
        .add(
          r.cursor.moveTo(od, {
            mode: "pointer",
            intent: "click",
            speed: "quick",
            duration: Re.compact,
            curve: 0.12,
            ...De,
            label: e.sendLabel,
          }),
          "-=0.16",
        )
        .add(r.cursor.click())
        .add(r.chat.setComposerFocus(!1), "-=0.08")
        .add(r.chat.sendComposerText(), "-=0.06")
        .add(r.chat.userMessage(e.text), "-=0.12")
        .add(r.chat.hideComposer(), "<")
        .add(r.chat.clearComposer()),
      e.postSendCursorMotion !== !1 &&
        t.add(
          r.cursor.moveTo(on, {
            intent: "hover",
            mode: "default",
            speed: "slow",
            overshoot: !1,
            settle: !1,
            label: `post-interaction-${e.sendLabel}`,
          }),
          "-=0.12",
        ),
      e.statusAfter && t.add(r.chat.setStatus(e.statusAfter), "<"),
      Yt(t)
    );
  }
  function ma(r) {
    const e = r.timeline();
    return (e.pause(0), e);
  }
  function Yt(r) {
    return (r.paused(!1), r);
  }
  function To(r) {
    return Array.isArray(r)
      ? r
          .filter((e) => typeof e == "string")
          .map((e) => e.trim())
          .filter(Boolean)
      : [];
  }
  function Eo(r) {
    const e =
      typeof r == "number"
        ? r
        : typeof r == "string" && r.trim()
          ? Number(r)
          : NaN;
    return Number.isFinite(e) && e > 0 ? Math.floor(e) : null;
  }
  function kd(r) {
    const e = sn(r?.[0]),
      t = e ? e.end - e.start + 1 : null;
    return t !== null && Number.isFinite(t) && t > 0 ? t : null;
  }
  function Sd(r, e, t, a) {
    const i = sn(e);
    return i ? r.slice(i.start - 1, i.end) : r.slice(t * a, (t + 1) * a);
  }
  function sn(r) {
    const e = r?.match(/^\s*(\d+)\s*[-–]\s*(\d+)(?:\s+of\s+(\d+))?/i);
    if (!e) return null;
    const t = Number(e[1]),
      a = Number(e[2]),
      i = e[3] ? Number(e[3]) : void 0;
    return !Number.isFinite(t) || !Number.isFinite(a) || t <= 0 || a < t
      ? null
      : {
          start: t,
          end: a,
          ...(i !== void 0 && Number.isFinite(i) && i >= a ? { total: i } : {}),
        };
  }
  const Cd = {
      desktop: {
        target: "[data-chat-shell]",
        anchor: "right",
        outside: "right",
        offset: { x: 420, y: -74 },
        humanOffset: !1,
      },
      tablet: {
        target: "[data-chat-shell]",
        anchor: "right",
        outside: "right",
        offset: { x: 360, y: -58 },
        humanOffset: !1,
      },
      mobile: {
        target: "[data-chat-shell]",
        anchor: "right",
        outside: "right",
        offset: { x: 280, y: -42 },
        humanOffset: !1,
      },
    },
    Td = {
      mode: "pointer",
      intent: "hover",
      speed: "slow",
      duration: 1,
      ease: "sine.inOut",
      curve: 0.72,
      overshoot: !1,
      label: "hover-outreach-sequence",
    },
    Ed = {
      mode: "pointer",
      intent: "click",
      speed: "quick",
      duration: Re.paginationClick,
      curve: 0.1,
      ...De,
      label: "open-visitor-page-2",
    },
    Po = {
      mode: "pointer",
      intent: "click",
      speed: "normal",
      duration: Re.previewCard,
      curve: 0.16,
      ...De,
    },
    Pd = {
      mode: "pointer",
      intent: "click",
      speed: "slow",
      duration: Re.sequenceEnroll,
      curve: 0.18,
      ...De,
    },
    Md = 96,
    Dd = 1.05,
    Rd = 0,
    Id = {
      "hit-ground-running": fo,
      "data-marketplace": Ga.dataMarketplace,
      "research-brief": Ga.researchBrief,
    },
    qd = {
      "hit-ground-running": bo,
      "data-marketplace": Ya,
      "research-brief": Ya,
    },
    ke = {
      emailContent: "max-content",
      foldedDefault: "minmax(130px,1fr)",
      foldedEmail: "minmax(190px,0.95fr)",
      foldedMobile: "minmax(150px,0.72fr)",
      foldedConnector: "minmax(170px,0.78fr)",
      foldedName: "minmax(220px,0.95fr)",
      rawName: "110px",
      rawEmail: "250px",
      rawCompany: "minmax(120px,1fr)",
      cleanName: "175px",
      cleanEmail: "215px",
      cleanCompany: "minmax(150px,1fr)",
    },
    fa = "Stripe";
  function Bd(r, e) {
    const t = new Map(r.map((a) => [a.id, a]));
    return e.map((a) => {
      const i = t.get(a.id);
      return i ? Ld(i, a) : a;
    });
  }
  function Ld(r, e) {
    return {
      ...e,
      label: r.label,
      navLabel: r.label,
      navDescription: r.summary || e.navDescription,
      summary: r.summary || e.summary,
      assetUrls: Od(r),
      entry: Nd(r.id, e),
      entryLeadTime: Fd(r.id, e),
      prepare:
        r.id === "hit-ground-running"
          ? (t) => t.chat.prepareSignup()
          : e.prepare,
      build: (t) => Ud(t, r, e),
    };
  }
  function Od(r) {
    const e = new Set();
    for (const t of r.steps)
      if (!(t.kind !== "component" || !t.component))
        switch (t.component.kind) {
          case "table":
            ja(e, pa(wa(t.component, `${r.id}-${t.id}`)));
            break;
          case "dataSources":
            ja(e, Zc(Oo(t.component)));
            break;
          case "proximityList":
            ja(e, go(zo(t.component)));
            break;
          case "sequenceEngagement":
            ja(e, mo(cn(t.component, `${r.id}-${t.id}`)));
            break;
        }
    return [...e];
  }
  function ja(r, e) {
    for (const t of e) r.add(t);
  }
  function Nd(r, e) {
    return Id[r] ?? e.entry;
  }
  function Fd(r, e) {
    return qd[r] ?? e.entryLeadTime;
  }
  function Ud(r, e, t) {
    if (e.id === "hit-ground-running") return zd(r, e);
    if (e.id === "crm-update") return Hd(r, e);
    if (e.id === "research-brief") return Vd(r, e);
    if (e.id === "csv-import-cleanup") return Gd(r, e);
    const a = jd(e);
    return a.length ? Ve(r, [...a, pt(Xe.bottomRight, "+=0.18")]) : t.build(r);
  }
  function zd(r, e) {
    const t = Ze(e, "status"),
      a = Ze(e, "user"),
      i = Ze(e, "thinking"),
      n = Ze(e, "assistant"),
      o = ba(e, "strategyCards");
    return Ve(r, [
      { kind: "status", text: t?.text || "Sign up" },
      { kind: "cursorClick", nextMode: "text", at: "-=0.04" },
      {
        kind: "typeSignupEmail",
        email: a?.text || "joel@vercel.com",
        duration: P.typeShort,
      },
      {
        kind: "cursorMove",
        target: wo,
        options: {
          mode: "pointer",
          intent: "click",
          speed: "quick",
          duration: Re.compact,
          curve: 0.12,
          ...De,
          label: "signup-submit",
        },
        at: "-=0.04",
      },
      { kind: "cursorClick", nextMode: "default", at: "+=0.06" },
      { kind: "custom", build: () => r.chat.submitSignup(), at: "<" },
      { kind: "status", text: "Building workspace", at: "-=0.08" },
      { kind: "transitionSignupToChat", at: `+=${P.beat}` },
      ...(i
        ? [{ kind: "status", text: i.text || "Researching", at: "<" }]
        : []),
      ...(i ? [Ka(i, { hold: 0.46, at: "<" })] : []),
      ...(n ? [{ kind: "assistant", text: n.text }] : []),
      ...(o ? [{ kind: "status", text: "Game plans ready", at: "<" }] : []),
      ...(o
        ? [{ kind: "strategyPlans", plans: Lo(o.component), at: "-=0.08" }]
        : []),
      pt(Xe.right, "+=0.18"),
    ]);
  }
  function Hd(r, e) {
    const t = ba(e, "mailboxConnection"),
      a = ba(e, "uploadedFiles"),
      i = [];
    if ((t && Uo(i, Fo(t.component)), a)) {
      const n = No(a.component),
        o = r.chat.prepareCsvDropArea({
          title: a.component.title,
          detail: n.map((d) => d.name).join(", "),
        }),
        s = n.length > 1 ? `${n.length} context files` : (n[0]?.name ?? a.text),
        c = r.chat.prepareCursorFile(s, r.cursor, n[0]?.type ?? "DOC", n),
        l = L("[data-chat-shell]", "center", {
          desktop: { x: 0, y: 74 },
          tablet: { x: 0, y: 64 },
          mobile: { x: 0, y: 56 },
        });
      i.push(
        { kind: "status", text: "waiting for context" },
        {
          kind: "cursorMove",
          target: Cd,
          options: {
            mode: "default",
            intent: "exit",
            speed: "slow",
            overshoot: !1,
            settle: !0,
            label: "context-file-pickup",
          },
          at: "+=0.08",
        },
        { kind: "custom", build: () => c.startFollow() },
        {
          kind: "custom",
          build: () => o.revealWhenCursorEnters(r.cursor),
          at: "<",
        },
        {
          kind: "cursorMove",
          target: l,
          options: {
            mode: "drag",
            intent: "drag",
            speed: "slow",
            ease: "power1.out",
            overshoot: !1,
            settle: !0,
            preserveMode: !0,
            label: "drag-context-files",
          },
          at: "<",
        },
        { kind: "custom", build: () => o.activate(), at: "<+=0.02" },
        {
          kind: "custom",
          build: () => r.timeline().to({}, { duration: P.beat }),
        },
        { kind: "custom", build: () => o.complete() },
        { kind: "custom", build: () => c.releaseAtDrop(), at: "<" },
        { kind: "custom", build: () => c.landAsUploadedFiles(n), at: "<" },
      );
    }
    for (const n of e.steps) n === t || n === a || Mo(i, e.id, n);
    return (i.push(pt(Xe.bottomRight, "+=0.16")), Ve(r, i));
  }
  function Vd(r, e) {
    const t = Ze(e, "user"),
      a = ba(e, "table"),
      i = Ze(e, "thinking"),
      n = ba(e, "sequenceEngagement"),
      o = a ? wa(a.component, "website-visitors-sales") : null,
      s = n ? cn(n.component, "visitor-outreach-sequences") : null,
      c = [];
    if (
      (o && (o.scrollAlign = "equal-inset"),
      t &&
        c.push({
          kind: "prompt",
          text: t.text,
          duration: Ho(t.text),
          sendLabel: "send-visitor-sales-list",
          statusBefore: "finding visitors",
          statusAfter: "building visitor list",
          fromEntry: !0,
        }),
      o &&
        c.push(
          { kind: "custom", build: () => r.chat.dataTable(o), at: "-=0.02" },
          _o("website-visitors-sales", Dd, "+=0.08", {
            align: "top",
            bottomClearance: Md,
          }),
        ),
      o?.pagination && o.pagination.pages.length > 1)
    ) {
      const l = L(
          '[data-data-table="website-visitors-sales"] [data-page-button-role="next"]',
          "center",
        ),
        d = L(
          '[data-data-table="website-visitors-sales"] [data-table-action="email-sequence"]',
          "center",
          {},
          !1,
        );
      c.push(
        { kind: "cursorMove", target: l, options: Ed, at: `+=${Rd}` },
        { kind: "cursorClick", at: "+=0.08" },
        {
          kind: "custom",
          build: () => r.chat.dataTablePage("website-visitors-sales", 2),
          at: "-=0.02",
        },
        { kind: "status", text: "ready to engage", at: "+=0.1" },
        {
          kind: "custom",
          build: () => r.timeline().to({}, { duration: P.beat }),
        },
        { kind: "cursorMove", target: d, options: Td, at: "+=0.12" },
        { kind: "cursorClick", at: "+=0.18" },
        {
          kind: "custom",
          build: () =>
            r.chat.dataTableActionSelected(
              "website-visitors-sales",
              "email-sequence",
            ),
          at: "<",
        },
        { kind: "status", text: "building outreach sequence", at: "<" },
      );
    }
    if (
      (i &&
        c.push(
          Ka(i, { hold: P.thinkingMedium, at: "+=0.06", cursorMotion: !1 }),
        ),
      s)
    ) {
      const [l, d] = Vr(s, 2),
        u = L(
          `[data-sequence-person-card="visitor-outreach-sequences:${l}"]`,
          "center",
        ),
        h = L(
          `[data-sequence-person-card="visitor-outreach-sequences:${d}"]`,
          "center",
        ),
        m = L('[data-sequence-kickoff="visitor-outreach-sequences"]', "center");
      c.push(
        {
          kind: "custom",
          build: () => r.chat.sequenceEngagement(s),
          at: "-=0.02",
        },
        {
          kind: "custom",
          build: () => r.timeline().to({}, { duration: P.beat }),
          at: "+=0.04",
        },
        {
          kind: "custom",
          build: () =>
            r.chat.sequencePersonCardIntoView("visitor-outreach-sequences", l),
          at: "+=0.02",
        },
        {
          kind: "cursorMove",
          target: u,
          options: { ...Po, label: "preview-second-sequence" },
          at: "+=0.02",
        },
        { kind: "cursorClick", at: "+=0.08" },
        {
          kind: "custom",
          build: () => r.chat.sequencePerson("visitor-outreach-sequences", l),
          at: "-=0.03",
        },
        {
          kind: "custom",
          build: () => r.timeline().to({}, { duration: P.beat }),
          at: "+=0.04",
        },
        {
          kind: "custom",
          build: () =>
            r.chat.sequencePersonCardIntoView("visitor-outreach-sequences", d),
          at: "+=0.02",
        },
        {
          kind: "cursorMove",
          target: h,
          options: { ...Po, label: "preview-third-sequence" },
          at: "+=0.02",
        },
        { kind: "cursorClick", at: "+=0.08" },
        {
          kind: "custom",
          build: () => r.chat.sequencePerson("visitor-outreach-sequences", d),
          at: "-=0.03",
        },
        {
          kind: "custom",
          build: () => r.timeline().to({}, { duration: P.beat + 0.28 }),
          at: "+=0.04",
        },
        ...xo("visitor-outreach-sequences", [1, 2, 3], "+=0.22"),
        {
          kind: "cursorMove",
          target: m,
          options: { ...Pd, label: "kickoff-visitor-sequence" },
        },
        { kind: "cursorClick", at: "+=0.12" },
        {
          kind: "custom",
          build: () => r.chat.sequenceKickoff("visitor-outreach-sequences"),
          at: "-=0.02",
        },
        {
          kind: "custom",
          build: () => r.chat.enrollmentProgress({ total: 50 }),
          at: "+=0.08",
        },
      );
    }
    return Ve(r, c);
  }
  function Gd(r, e) {
    const t = Ze(e, "file"),
      a = Ze(e, "thinking"),
      i = Ze(e, "assistant"),
      n = e.steps.filter(
        (f) => f.kind === "component" && f.component?.kind === "table",
      ),
      o = a ? e.steps.indexOf(a) : -1,
      s = n.find((f) => o >= 0 && e.steps.indexOf(f) < o),
      c = [...n].reverse().find((f) => f !== s),
      l = t?.text || "may_webinar_attendees.csv",
      d = Qd(t, s?.component ?? c?.component),
      u = r.chat.prepareCsvDropArea(),
      h = r.chat.prepareCursorFile(l, r.cursor),
      m = L("[data-chat-shell]", "center", {
        desktop: { x: 0, y: 82 },
        tablet: { x: 0, y: 72 },
        mobile: { x: 0, y: 64 },
      });
    return Ve(r, [
      { kind: "status", text: "waiting for CSV" },
      { kind: "custom", build: () => h.startFollow(), at: `+=${P.fileGrab}` },
      {
        kind: "custom",
        build: () => u.revealWhenCursorEnters(r.cursor),
        at: "<",
      },
      {
        kind: "cursorMove",
        target: m,
        options: {
          mode: "drag",
          intent: "drag",
          speed: "slow",
          ease: "power1.out",
          overshoot: !1,
          settle: !0,
          preserveMode: !0,
          label: "drag-webinar-csv",
        },
        at: "<",
      },
      { kind: "custom", build: () => u.activate(), at: "<+=0.02" },
      {
        kind: "custom",
        build: () => r.timeline().to({}, { duration: P.beat }),
      },
      { kind: "custom", build: () => u.complete() },
      { kind: "custom", build: () => h.releaseAtDrop(), at: "<" },
      {
        kind: "custom",
        build: () => h.landAsUploadedFile(l, d, { preserveScroll: !0 }),
        at: "<",
      },
      ...(s
        ? [
            {
              kind: "dataTable",
              config: {
                ...wa(s.component, "raw-webinar-attendees"),
                preserveScroll: !0,
              },
              at: `+=${P.beat}`,
            },
          ]
        : []),
      { kind: "status", text: "Cleaning CSV", at: "<" },
      ...(a ? [Ka(a, { hold: 0.34, at: `+=${P.beat}` })] : []),
      ...(i ? [{ kind: "assistant", text: i.text }] : []),
      ...(c
        ? [
            {
              kind: "dataTable",
              config: tu(wa(c.component, "cleaned-webinar-attendees")),
              at: "-=0.04",
            },
          ]
        : []),
      pt(Xe.bottomRight, "+=0.18"),
    ]);
  }
  function Qd(r, e) {
    const t = Yd(e);
    if (t) return t;
    const a = r?.note?.trim();
    return !a || Wd(a) ? "CSV uploaded" : a;
  }
  function Yd(r) {
    if (!r || r.kind !== "table") return null;
    const e = r.count?.trim();
    if (e) return e;
    const t = r.rows.length;
    return t <= 0 ? null : `${t} ${t === 1 ? "record" : "records"}`;
  }
  function Wd(r) {
    return /user-side message|after release|drop overlay|appears as/i.test(r);
  }
  function jd(r) {
    const e = [],
      t = r.id === "data-marketplace" ? Kd(r.steps) : r.steps;
    let a = 0;
    for (const i of t)
      ((a += i.kind === "user" ? 1 : 0), Mo(e, r.id, i, a === 1));
    return e;
  }
  function Kd(r) {
    const e = [];
    let t = 0;
    for (; t < r.length; ) {
      const a = r[t];
      if (a.kind !== "thinking") {
        (e.push(a), (t += 1));
        continue;
      }
      const i = [];
      for (; t < r.length && r[t].kind === "thinking"; )
        (i.push(r[t]), (t += 1));
      e.push(i.length > 1 ? Xd(i) : a);
    }
    return e;
  }
  function Xd(r) {
    const e = r[0],
      a = r
        .flatMap((i) =>
          i.thinking?.items.length
            ? i.thinking.items
            : [
                {
                  label: i.text || "Thinking",
                  detail: i.note || "",
                  disclosure: "",
                },
              ],
        )
        .filter((i) => i.label.trim())
        .map((i, n) => ({
          label: i.label,
          detail: i.detail,
          disclosure: i.disclosure || (n === 0 ? "Show more" : "Show less"),
        }));
    return {
      ...e,
      text: a[0]?.label || e.text,
      note: a[0]?.detail || e.note,
      thinking: {
        title: e.thinking?.title || "Thinking",
        elapsed: Hi(a.length),
        items: a,
      },
    };
  }
  function Mo(r, e, t, a = !1) {
    if (t.kind === "status" && t.text) {
      r.push({ kind: "status", text: t.text });
      return;
    }
    if (t.kind === "user" && t.text) {
      r.push({
        kind: "prompt",
        text: t.text,
        duration: Ho(t.text),
        sendLabel: `send-${le(e)}-${r.length}`,
        fromEntry: a,
        statusAfter: t.note || void 0,
        at: a ? void 0 : `+=${P.beat}`,
      });
      return;
    }
    if (t.kind === "assistant" && t.text) {
      r.push({ kind: "assistant", text: t.text, at: "+=0.08" });
      return;
    }
    if (t.kind === "thinking") {
      r.push(Ka(t, { hold: P.thinkingMedium }));
      return;
    }
    if (t.kind === "file" && t.text) {
      r.push({
        kind: "custom",
        build: (i) => i.chat.uploadedFileMessage(t.text, t.note || "uploaded"),
      });
      return;
    }
    t.kind !== "component" || !t.component || Jd(r, e, t);
  }
  function Jd(r, e, t) {
    const a = t.component;
    if (a.kind === "table") {
      const i = wa(a, `${e}-${t.id}`);
      (e === "data-marketplace" && au(i),
        ru(e, t, i) && (i.scrollAlign = "equal-inset"),
        r.push({ kind: "dataTable", config: i, at: "-=0.04" }));
      return;
    }
    if (a.kind === "strategyCards") {
      r.push({ kind: "strategyPlans", plans: Lo(a), at: "-=0.04" });
      return;
    }
    if (a.kind === "enrichment") {
      r.push({ kind: "enrichmentPanel", config: mu(a), at: "+=0.12" });
      return;
    }
    if (a.kind === "dataSources") {
      const i = Oo(a);
      r.push({
        kind:
          e === "data-marketplace"
            ? "marketingDataSourcesGrid"
            : "dataSourcesGrid",
        config: i,
        at: e === "data-marketplace" ? "+=1.44" : "-=0.04",
      });
      return;
    }
    if (a.kind === "uploadedFiles") {
      r.push({
        kind: "custom",
        build: (i) => i.chat.uploadedFilesMessage(No(a)),
        at: "-=0.04",
      });
      return;
    }
    if (a.kind === "mailboxConnection") {
      Uo(r, Fo(a));
      return;
    }
    if (a.kind === "styleProfile") {
      const i = fu(a);
      (r.push({
        kind: "custom",
        build: (n) =>
          n.chat.outreachStyleProfile(i, { scrollAlign: "equal-inset" }),
        at: "-=0.02",
      }),
        e === "crm-update" && r.push(...yo(i.id)));
      return;
    }
    if (a.kind === "proximityList") {
      r.push({
        kind: "custom",
        build: (i) => i.chat.proximityLeadList(zo(a)),
        at: "-=0.04",
      });
      return;
    }
    if (a.kind === "personalizationSwipeGame") {
      r.push({ kind: "personalizationSwipeGame", config: wu(a), at: "+=0.06" });
      return;
    }
    if (a.kind === "sequenceEngagement") {
      r.push({
        kind: "sequenceEngagement",
        config: cn(a, `${e}-${t.id}`),
        at: "-=0.02",
      });
      return;
    }
    r.push({
      kind: "assistant",
      text: [a.title, ...a.items].filter(Boolean).join(`
`),
    });
  }
  function Ka(r, e = {}) {
    return {
      kind: "thinking",
      thinking: Zd(r.thinking, r.text, r.note),
      hold: e.hold,
      preserveScroll: e.preserveScroll,
      cursorMotion: e.cursorMotion,
      at: e.at,
    };
  }
  function Zd(r, e, t) {
    return r?.items.length
      ? {
          title: r.title,
          elapsed: r.elapsed,
          items: r.items.map((a) => ({
            label: a.label,
            detail: a.detail,
            disclosure: a.disclosure,
            duration: a.duration,
            toolCalls: a.toolCalls,
          })),
        }
      : { items: [{ label: e || "Thinking", detail: t || void 0 }] };
  }
  const $d = {
      detailKey: "connectorDetail",
      avatarToneKey: "connectorAvatarTone",
      avatarUrlKey: "connectorAvatarUrl",
      avatarKey: "connectorAvatar",
      sourceKey: "connectorSource",
      companyKey: "connectorCompany",
    },
    eu = {
      "dev singh": { title: "RevOps Lead @ Brex", company: "Brex" },
      "evan brooks": { title: "Growth Lead @ PayPal", company: "PayPal" },
      "jenna park": { title: "VP Marketing @ Square", company: "Square" },
      "marco liu": { title: "Partner @ Sequoia", company: "Sequoia" },
      "noah singh": { title: "Head of Sales @ Adyen", company: "Adyen" },
      "owen lee": { title: "Principal @ Sequoia", company: "Sequoia" },
      "priya shah": { title: "VP Sales @ Plaid", company: "Plaid" },
      "rachel cho": { title: "Head of Sales @ Stripe", company: "Stripe" },
      "sam hollis": { title: "VP Sales @ Waterfall", company: "Waterfall" },
    };
  function wa(r, e) {
    const t = ou(r, e),
      a = r.rows
        .filter((s) => s.some((c) => c.trim()))
        .map((s, c) => uu(s, t, c)),
      i = Io(r.pagination),
      n = Eo(r.pagination?.pageSize) ?? kd(i) ?? Math.min(10, a.length || 10),
      o = i
        .map((s, c) => ({ page: c + 1, range: s, rows: Sd(a, s, c, n) }))
        .filter((s) => s.rows.length);
    return {
      id: e === "website-visitors-sales" ? e : le(r.title || e),
      title: r.title,
      eyebrow: r.eyebrow,
      count: r.count,
      variant: t.variant ?? bu(r),
      footerClearance: du(e),
      columns: t.columns,
      rows: o[0]?.rows ?? a,
      actions: r.actions?.map(gu),
      pagination:
        o.length > 1
          ? { pageSize: n, totalRows: Au(r, a.length), activePage: 1, pages: o }
          : void 0,
    };
  }
  function tu(r) {
    return { ...r, scrollAnchor: "previous-message" };
  }
  function au(r) {
    (r.rows.forEach((e) => Do(e.values)),
      r.pagination?.pages.forEach((e) => {
        e.rows.forEach((t) => Do(t.values));
      }));
  }
  function Do(r) {
    (r.name && "company" in r && (r.company = fa),
      r.prospectDetail && (r.prospectDetail = iu(r.prospectDetail)),
      r.connector && !r.connectorDetail && (r.connector = nu(r.connector)));
  }
  function iu(r) {
    const e = r.trim();
    return e
      ? /(?:@|\bat\s+)[A-Z][A-Za-z0-9& .-]+(?:\s*\([^()]*\))?$/i.test(e)
        ? e.replace(
            /(?:@|\bat\s+)([A-Z][A-Za-z0-9& .-]+?)(\s*\([^()]*\))?$/i,
            (t, a, i = "") => `at ${fa}${Ro(i)}`,
          )
        : /,\s*[A-Z][A-Za-z0-9& .-]+(?:\s*\([^()]*\))?$/.test(e)
          ? e.replace(
              /,\s*([A-Z][A-Za-z0-9& .-]+?)(\s*\([^()]*\))?$/,
              (t, a, i = "") => `, ${fa}${Ro(i)}`,
            )
          : new RegExp(fa, "i").test(e)
            ? e
            : `${e} at ${fa}`
      : "";
  }
  function Ro(r) {
    const e = r.trim();
    return e ? ` ${e}` : "";
  }
  function nu(r) {
    const e = ln(r);
    return !e.name || !e.title
      ? r
      : `${e.name} (${e.title})${e.context ? ` — ${e.context}` : ""}`;
  }
  function Io(r) {
    return To(r?.ranges);
  }
  function ru(r, e, t) {
    if (r !== "data-marketplace") return !1;
    const a = le(t.title);
    return (
      e.id === "data-marketplace-step-3" ||
      e.id === "data-marketplace-step-6" ||
      a === "best-connections-into-stripe" ||
      a === "best-connections-into-vercel" ||
      a === "new-hires-at-dev-tool-companies" ||
      a === "raised-in-the-past-three-months" ||
      a === "warmest-paths-into-vercel-active-in-past-90-days" ||
      a === "warmest-paths-into-stripe-active-in-past-90-days"
    );
  }
  function ou(r, e) {
    const t = r.columns,
      a = t.findIndex((d) => d.trim().toLowerCase() === "name"),
      i =
        a >= 0 ? t.findIndex((d, u) => u > a && /^role\b/i.test(d.trim())) : -1,
      n = a >= 0 && i >= 0,
      o = qo(e) ? t.findIndex((d) => d.trim().toLowerCase() === "title") : -1,
      s = n ? i : o >= 0 ? o : void 0,
      c = t.map((d, u) => u).filter((d) => d !== i && d !== o),
      l = c.map((d) => {
        const u = t[d] || `Column ${d + 1}`;
        if (n && d === a)
          return {
            key: "name",
            label: "Prospect",
            width: ke.foldedName,
            cellType: "person",
          };
        if (n && /^via\s+connector\b/i.test(u.trim()))
          return {
            key: "mutualConnection",
            label: "Best connection",
            width: "minmax(0,1.3fr)",
            cellType: "mutualConnection",
          };
        const h = lu(e, u),
          m = h.key ?? le(u || `column-${d + 1}`);
        return {
          key: m,
          label: u,
          width: h.width ?? su(u, n),
          cellType: h.cellType ?? cu(e, u, m),
          person: h.person,
        };
      });
    return {
      columns: l,
      sourceIndexes: c,
      foldedRoleIndex: s,
      mutualConnectionKey: l.some((d) => d.key === "mutualConnection")
        ? "mutualConnection"
        : void 0,
      connectorPersonKey: l.some(
        (d) => d.key === "connector" && d.cellType === "person",
      )
        ? "connector"
        : void 0,
      variant: l.some((d) => d.key === "mutualConnection")
        ? "connections"
        : void 0,
    };
  }
  function su(r, e) {
    const t = r.toLowerCase();
    if (e)
      return t.includes("connector") || t.includes("connection")
        ? ke.foldedConnector
        : t.includes("email")
          ? ke.foldedEmail
          : t.includes("mobile")
            ? ke.foldedMobile
            : ke.foldedDefault;
    if (t === "email" || t === "work email") return ke.emailContent;
  }
  function lu(r, e) {
    const t = e.trim().toLowerCase();
    if (r === "raw-webinar-attendees") {
      if (t === "name") return { width: ke.rawName, cellType: "text" };
      if (t === "email") return { width: ke.rawEmail };
      if (t === "company") return { width: ke.rawCompany };
    }
    if (qo(r)) {
      if (t === "full name")
        return { key: "fullName", width: ke.cleanName, cellType: "person" };
      if (t === "work email") return { width: ke.cleanEmail };
      if (t === "company") return { width: ke.cleanCompany };
    }
    return t === "connector"
      ? {
          key: "connector",
          width: ke.foldedConnector,
          cellType: "person",
          person: $d,
        }
      : {};
  }
  function cu(r, e, t) {
    const a = e.trim().toLowerCase();
    if (
      r !== "raw-webinar-attendees" &&
      (t === "name" ||
        t === "contact" ||
        t === "fullName" ||
        a === "name" ||
        a === "prospect" ||
        a === "contact" ||
        a === "full name")
    )
      return "person";
  }
  function du(r) {
    return r === "website-visitors-sales" ? 28 : void 0;
  }
  function qo(r) {
    return r === "cleaned-webinar-attendees" || r === "clean-webinar-attendees";
  }
  function uu(r, e, t) {
    const a = {};
    if (
      (e.columns.forEach((i, n) => {
        a[i.key] = r[e.sourceIndexes[n]] ?? "";
      }),
      e.foldedRoleIndex !== void 0 &&
        (a.prospectDetail = r[e.foldedRoleIndex] ?? ""),
      e.mutualConnectionKey)
    ) {
      const i = ln(a[e.mutualConnectionKey] ?? ""),
        n = hu(i.context);
      ((a[e.mutualConnectionKey] = i.name),
        (a.mutualConnectionDetail = i.title),
        (a.mutualConnectionContext = i.context),
        (a.mutualConnectionCompany = i.company),
        i.name && n && (a.mutualConnectionBadge = n));
    }
    if (e.connectorPersonKey) {
      const i = ln(a[e.connectorPersonKey] ?? "");
      ((a[e.connectorPersonKey] = i.name),
        (a.connectorDetail = i.title),
        (a.connectorCompany = i.company));
    }
    return { id: `${le(r[0] || "row")}-${t + 1}`, values: a };
  }
  function hu(r) {
    return r.trim() || null;
  }
  function ln(r) {
    const [e = "", t = ""] = r.split(/\s+[—–]\s+/, 2),
      a = e.trim().match(/^(.+?)(?:\s*\((.+)\))?$/),
      i = a?.[1]?.trim() || r.trim(),
      n = t.trim(),
      o = eu[le(i).replace(/-/g, " ")],
      s = pu(a?.[2]?.trim() || "", o, n);
    return { name: i, title: s.title, context: n, company: s.company };
  }
  function pu(r, e, t) {
    const a = Bo(t),
      i = a && !/^(?:Stanford GSB|Wharton)$/i.test(a);
    return r && i && /\bUnify\b/i.test(r)
      ? { title: r.replace(/\bUnify\b/g, a), company: a }
      : e && (!r || /\bUnify\b/i.test(r))
        ? e
        : r
          ? { title: r, company: Bo(r) || a || "" }
          : {
              title: e?.title ?? (a ? `Warm intro @ ${a}` : ""),
              company: e?.company ?? a,
            };
  }
  function Bo(r) {
    const e = r.trim();
    if (!e) return "";
    const t = e.match(
      /(?:@|\bat\s+|Both at |Shared investor:\s*)([A-Z][A-Za-z0-9& .-]+?)(?:\s*\(|$)/,
    );
    return t?.[1]
      ? t[1].trim()
      : /Wharton/i.test(e)
        ? "Wharton"
        : /Stanford/i.test(e)
          ? "Stanford GSB"
          : "";
  }
  function gu(r) {
    const e = r.label.toLowerCase().includes("dial")
      ? "power-dialer"
      : "email-sequence";
    return {
      id: e,
      label: e === "power-dialer" ? "Power dial" : "Outreach sequence",
      icon: e === "power-dialer" ? "dialer" : "email",
      badge: r.badge || void 0,
    };
  }
  function Lo(r) {
    return r.cards.map((e, t) => ({
      id: le(e.label || e.title || `strategy-${t + 1}`),
      label: e.label,
      title: e.title,
      summary: e.summary,
      bullets: e.summary
        .split(/\n+/)
        .map((a) => a.trim())
        .filter(Boolean),
    }));
  }
  function mu(r) {
    return {
      id: le(r.title || "enrichment"),
      title: r.title,
      subtitle: r.subtitle,
      modeLabel: "Balanced",
      fields: r.fields,
    };
  }
  function Oo(r) {
    return {
      id: le(r.title || "data-sources"),
      title: r.title,
      subtitle: r.subtitle,
      sources: r.sources.map((e, t) => ({
        id: le(e.name || `source-${t + 1}`),
        category: e.category,
        name: e.name,
        detail: e.detail,
        logoSrc: e.logoSrc,
      })),
    };
  }
  function No(r) {
    return r.files.map((e) => ({
      name: e.name,
      detail: e.detail,
      type: e.type,
    }));
  }
  function Fo(r) {
    return {
      id: le(r.title || "mailbox-connection"),
      title: r.title,
      subtitle: r.subtitle,
      provider: r.provider,
      account: r.account,
      status: r.status,
      ctaLabel: r.ctaLabel,
      secondaryCtaLabel: r.secondaryCtaLabel,
      loadingLabel: r.loadingLabel,
      learningTitle: r.learningTitle,
      learningDetail: r.learningDetail,
      learningReadyDetail: r.learningReadyDetail,
      signals: r.signals,
    };
  }
  function Uo(r, e) {
    r.push(...Ao(e));
  }
  function fu(r) {
    return {
      id: le(r.title || "style-profile"),
      title: r.title,
      subtitle: r.subtitle,
      signals: r.signals,
      examples: r.examples,
    };
  }
  function zo(r) {
    return {
      id: le(r.title || "proximity-list"),
      title: r.title,
      subtitle: r.subtitle,
      leads: r.leads,
    };
  }
  function wu(r) {
    return {
      id: le(r.title || "personalization-swipe"),
      title: r.title,
      subtitle: r.subtitle,
      prompt: r.prompt,
      labels: { avoid: "avoid", use: "use" },
      completeLabel: "personalization rules learned",
      signals: r.signals.map((e, t) => ({
        id: le(e.label || `signal-${t + 1}`),
        label: e.label,
        detail: e.detail,
        decision: e.decision,
      })),
    };
  }
  function cn(r, e) {
    return {
      id: e,
      title: r.title,
      subtitle: r.subtitle,
      peopleCount: r.peopleCount,
      launchLabel: r.launchLabel,
      sequences: r.sequences.map((t) => ({
        ...t,
        steps: t.steps?.map((a) => ({
          ...a,
          waitDays: a.waitDays ? Number(a.waitDays) : void 0,
        })),
      })),
      channels: r.channels.map((t) => ({
        label: t.label,
        detail: t.detail,
        badge: t.badge || void 0,
      })),
    };
  }
  function Ze(r, e) {
    return r.steps.find((t) => t.kind === e);
  }
  function ba(r, e) {
    return r.steps.find(
      (t) => t.kind === "component" && t.component?.kind === e,
    );
  }
  function Ho(r) {
    return r.length > 72
      ? P.typeLong
      : r.length > 38
        ? P.typeMedium
        : P.typeShort;
  }
  function bu(r) {
    const e = `${r.title} ${r.eyebrow ?? ""}`.toLowerCase();
    if (e.includes("enrich")) return "enriched";
    if (e.includes("filter") || e.includes("raised")) return "filtered";
  }
  function Au(r, e) {
    const t = Io(r.pagination),
      a = t[t.length - 1];
    return sn(a)?.total ?? e;
  }
  function le(r) {
    return (
      r
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "item"
    );
  }
  const yu = {
      mode: "pointer",
      intent: "hover",
      speed: "slow",
      duration: 1,
      ease: "sine.inOut",
      curve: 0.72,
      overshoot: !1,
      label: "hover-outreach-sequence",
    },
    vu = {
      mode: "pointer",
      intent: "click",
      speed: "quick",
      duration: Re.paginationClick,
      curve: 0.1,
      ...De,
      label: "open-visitor-page-2",
    },
    xu = 96,
    _u = 1.05,
    ku = 0,
    Vo = {
      mode: "pointer",
      intent: "click",
      speed: "normal",
      duration: Re.previewCard,
      curve: 0.16,
      ...De,
    },
    Su = {
      mode: "pointer",
      intent: "click",
      speed: "slow",
      duration: Re.sequenceEnroll,
      curve: 0.18,
      ...De,
    },
    Cu = [
      {
        label: "Scraping vercel.com",
        detail:
          "Reviewing the website, employee social profiles, looking at customer testimonials.",
        duration: 8,
        toolCalls: [
          { label: "Reading vercel.com/", vendor: "Vercel" },
          { label: "Reading vercel.com/cdn", vendor: "Vercel" },
          { label: "Reading v0.app/", vendor: "v0" },
          { label: "Reading vercel.com/customers", vendor: "Vercel" },
          { label: "Reading vercel.com/ai", vendor: "Vercel" },
          { label: "Reading vercel.com/enterprise", vendor: "Vercel" },
          { label: "Reading vercel.com/blog", vendor: "Vercel" },
          { label: "Reading vercel.com/press", vendor: "Vercel" },
        ],
      },
      {
        label: "Studying who you sell to",
        detail:
          "Mapping personas, buying committees, seniority, department ownership, and account-fit signals from the available evidence.",
      },
      {
        label: "Understanding your value proposition",
        detail:
          "Reading the homepage, product pages, and recent launches to learn what you sell, who you sell to, and why they buy.",
      },
      {
        label: "Mapping current GTM signals",
        detail:
          "Connecting signal strength, audience fit, and likely urgency to decide which outbound motion is most likely to convert.",
      },
      {
        label: "Distilling insights into ideas",
        detail:
          "Pulling together the company profile, ICP, value prop, and live signals to land on the highest-conviction ideas to test first.",
      },
    ],
    Tu = [
      {
        id: "founder-signal",
        label: "Idea one",
        title: "Target DevOps teams outgrowing AWS complexity",
        bullets: [
          "I’ll find mid-market SaaS companies with heavy AWS footprints and hiring DevOps",
          "I’ll run a 3-step email + LinkedIn sequence using the Notion infra efficiency angle",
        ],
      },
      {
        id: "revops-consolidation",
        label: "Idea two",
        title: "Intercept AI teams burning cycles on LLM infra",
        bullets: [
          "I’ll identify companies building AI products, showing LLM/ML engineering hiring signals",
          "I’ll craft a sequence leading with AI infra complexity pain and Vercel AI SDK as the path",
        ],
      },
      {
        id: "pipeline-acceleration",
        label: "Idea three",
        title: "Hit e-commerce teams before peak season",
        bullets: [
          "I’ll find ecom and DTC brands with 50+ engineers and upcoming high-traffic events",
          "I’ll lead with PAIGE’s Black Friday results in a short sequence timed to pre-peak urgency",
        ],
      },
    ],
    Go = [
      { key: "name", label: "Name", width: "1.45fr", cellType: "person" },
      { key: "company", label: "Company", width: "1fr" },
      { key: "title", label: "Title", width: "1.45fr" },
    ],
    Eu = [
      {
        key: "name",
        label: "Prospect",
        width: "minmax(220px,0.95fr)",
        cellType: "person",
      },
      { key: "email", label: "Work email", width: "minmax(190px,0.95fr)" },
      { key: "number", label: "Mobile", width: "minmax(150px,0.72fr)" },
      {
        key: "connector",
        label: "Connector",
        width: "minmax(170px,0.78fr)",
        cellType: "person",
        person: {
          detailKey: "connectorDetail",
          avatarToneKey: "connectorAvatarTone",
          avatarUrlKey: "connectorAvatarUrl",
          avatarKey: "connectorAvatar",
          sourceKey: "connectorSource",
          companyKey: "connectorCompany",
        },
      },
    ],
    Qo = {
      id: "dev-tool-new-hires",
      title: "New hires at dev-tool companies",
      eyebrow: "Natural language search",
      count: "8 records",
      scrollAlign: "equal-inset",
      columns: Go,
      rows: [
        {
          id: "jamie-chen",
          values: {
            name: "Jamie Chen",
            company: "Stripe",
            title: "VP of Sales",
            avatarTone: "1",
            avatarUrl: "https://i.pravatar.cc/64?img=12",
            source: "signal",
          },
        },
        {
          id: "andre-park",
          values: {
            name: "Andre Park",
            company: "Stripe",
            title: "Head of Growth",
            avatarTone: "2",
            avatarUrl: "https://i.pravatar.cc/64?img=52",
            source: "signal",
          },
        },
        {
          id: "david-kim",
          values: {
            name: "David Kim",
            company: "Stripe",
            title: "Head of Revenue",
            avatarTone: "3",
            avatarUrl: "https://i.pravatar.cc/64?img=33",
            source: "signal",
          },
        },
        {
          id: "chandler-bree",
          values: {
            name: "Chandler Bree",
            company: "Stripe",
            title: "VP of Sales",
            avatarTone: "4",
            avatarUrl: "https://i.pravatar.cc/64?img=11",
            source: "database",
          },
        },
        {
          id: "ellen-nelle",
          values: {
            name: "Ellen Nelle",
            company: "Stripe",
            title: "Growth Engineer",
            avatarTone: "5",
            avatarUrl: "https://i.pravatar.cc/64?img=47",
            source: "database",
          },
        },
        {
          id: "chadley-dupre",
          values: {
            name: "Chadley Dupre",
            company: "Stripe",
            title: "Head of Revops",
            avatarTone: "6",
            avatarUrl: "https://i.pravatar.cc/64?img=59",
            source: "database",
          },
        },
        {
          id: "patrick-bateman",
          values: {
            name: "Patrick Bateman",
            company: "Stripe",
            title: "COO",
            avatarTone: "7",
            avatarUrl: "https://i.pravatar.cc/64?img=68",
            source: "engage",
          },
        },
        {
          id: "miles-kibble",
          values: {
            name: "Miles Kibble III",
            company: "Stripe",
            title: "Head of Chaos",
            avatarTone: "8",
            avatarUrl: "https://i.pravatar.cc/64?img=15",
            source: "engage",
          },
        },
      ],
    },
    Yo = {
      id: "recently-funded-dev-tools",
      title: "Raised in the past three months",
      eyebrow: "Filtered results",
      count: "3 records",
      variant: "filtered",
      scrollAlign: "equal-inset",
      columns: Go,
      rows: [
        {
          id: "jamie-chen",
          values: {
            name: "Jamie Chen",
            company: "Stripe",
            title: "VP of Sales",
            avatarTone: "1",
            avatarUrl: "https://i.pravatar.cc/64?img=12",
            source: "signal",
          },
        },
        {
          id: "andre-park",
          values: {
            name: "Andre Park",
            company: "Stripe",
            title: "Head of Growth",
            avatarTone: "2",
            avatarUrl: "https://i.pravatar.cc/64?img=52",
            source: "signal",
          },
        },
        {
          id: "david-kim",
          values: {
            name: "David Kim",
            company: "Stripe",
            title: "Head of Revenue",
            avatarTone: "3",
            avatarUrl: "https://i.pravatar.cc/64?img=33",
            source: "signal",
          },
        },
        {
          id: "patrick-bateman",
          values: {
            name: "Patrick Bateman",
            company: "Stripe",
            title: "COO",
            avatarTone: "7",
            avatarUrl: "https://i.pravatar.cc/64?img=68",
            source: "engage",
          },
        },
      ],
    },
    Pu = {
      id: "contact-enrichment",
      title: "I’m about to run an enrichment",
      subtitle:
        "Up to 84 credits could be spent across 2 fields on 14 records.",
      modeLabel: "Balanced",
      fields: [
        {
          title: "Business emails",
          steps: ["Unify Data", "5-Step Waterfall", "ContactOut"],
        },
        {
          title: "Mobile phones",
          steps: ["Unify Data", "5-Step Waterfall", "ContactOut"],
        },
      ],
    },
    Wo = {
      id: "enriched-dev-tool-contacts",
      title: "Enriched contacts",
      eyebrow: "ready to engage",
      count: "4 contacts",
      variant: "enriched",
      columns: Eu,
      rows: [
        {
          id: "jamie-chen",
          values: {
            name: "Jamie Chen",
            prospectDetail: "VP of Sales at Stripe",
            email: "jamie@stripe.com",
            number: "+1 (628) 240-2744",
            connector: "Priya Shah",
            connectorDetail: "VP Sales @ Plaid",
            connectorCompany: "Plaid",
            avatarTone: "1",
            avatarUrl: "https://i.pravatar.cc/64?img=12",
            source: "signal",
          },
        },
        {
          id: "andre-park",
          values: {
            name: "Andre Park",
            prospectDetail: "Head of Growth at Stripe",
            email: "andre@stripe.com",
            number: "+1 (210) 555-2341",
            connector: "Marco Liu",
            connectorDetail: "Partner @ Sequoia",
            connectorCompany: "Sequoia",
            avatarTone: "2",
            avatarUrl: "https://i.pravatar.cc/64?img=52",
            source: "signal",
          },
        },
        {
          id: "david-kim",
          values: {
            name: "David Kim",
            prospectDetail: "Head of Revenue at Stripe",
            email: "david@stripe.com",
            number: "+1 (628) 230-9962",
            connector: "Dev Singh",
            connectorDetail: "RevOps Lead @ Brex",
            connectorCompany: "Brex",
            avatarTone: "3",
            avatarUrl: "https://i.pravatar.cc/64?img=33",
            source: "signal",
          },
        },
        {
          id: "chandler-bree",
          values: {
            name: "Chandler Bree",
            prospectDetail: "VP of Sales at Stripe",
            email: "chandler@stripe.com",
            number: "+1 (628) 240-2744",
            connector: "Jenna Park",
            connectorDetail: "VP Marketing @ Square",
            connectorCompany: "Square",
            avatarTone: "4",
            avatarUrl: "https://i.pravatar.cc/64?img=11",
            source: "database",
          },
        },
      ],
    },
    jo = [
      {
        name: "vercel-positioning.pdf",
        detail: "Frontend Cloud narrative, buyer pains, proof points",
        type: "PDF",
      },
      {
        name: "ai-app-playbook.docx",
        detail: "AI app workflows, Vercel AI SDK, launch patterns",
        type: "DOC",
      },
      {
        name: "enterprise-objections.pdf",
        detail: "Security, scale, migration, and platform objections",
        type: "PDF",
      },
      {
        name: "icp-context.md",
        detail: "Best-fit teams, disqualifiers, buying triggers",
        type: "MD",
      },
    ],
    Mu = {
      id: "gmail-mailbox-connection",
      title: "Connect a mailbox",
      subtitle:
        "Unify will analyze recent emails and replies to learn how you actually communicate",
      provider: "Gmail",
      account: "joel@unifygtm.com",
      status: "Connected",
      ctaLabel: "Gmail",
      secondaryCtaLabel: "Outlook",
      loadingLabel: "Connecting",
      learningTitle: "Learning your style",
      learningDetail: "Analyzing tone...",
      learningReadyDetail: "73 tone & tactic rules defined",
      signals: [
        "sent emails",
        "reply patterns",
        "calendar context",
        "signature and tone",
      ],
    },
    Ko = {
      id: "vercel-business-report",
      title: "Vercel GTM Context",
      signals: [
        {
          label: "Winning wedge",
          value:
            "Lead with Frontend Cloud: the fastest path from idea to production for teams building web and AI experiences.",
        },
        {
          label: "Primary motion",
          value:
            "Target engineering leaders, platform teams, and founders with Next.js adoption, high-traffic launches, or active AI app work.",
        },
        {
          label: "Displacement angle",
          value:
            "Against homegrown cloud and generic hosting, show where teams lose time: previews, performance, observability, and release confidence.",
        },
        {
          label: "Proof to use",
          value:
            "Use Next.js, preview deployments, global performance, enterprise controls, and Vercel AI SDK as concrete credibility.",
        },
      ],
      examples: [
        "Open with a launch moment: traffic spike, AI feature release, migration project, or frontend team scaling past brittle workflows.",
        "Package the CTA as a workflow review: local dev to preview to production, including where Vercel removes handoffs.",
        "Keep the copy specific: Next.js, AI SDK, preview links, edge performance, and enterprise governance beat generic developer-platform language.",
      ],
    },
    Xo = {
      id: "personalized-lead-proximity",
      title: "Ranked leads with proximity fields",
      subtitle:
        "Each lead gets a relationship-aware reason to personalize the first touch.",
      leads: [
        {
          rank: "01",
          name: "Maya Patel",
          company: "OrbitGrid",
          title: "VP Revenue",
          proximity: "Same school",
          personalization:
            "Hey, you went to the same school as Joel and both studied systems design.",
          score: "94",
        },
        {
          rank: "02",
          name: "Evan Brooks",
          company: "Northstar Dev",
          title: "Head of Growth",
          proximity: "Mutual connection",
          personalization:
            "You both know Priya Shah from the early PLG operators group.",
          score: "89",
        },
        {
          rank: "03",
          name: "Clara Wong",
          company: "BrightLayer",
          title: "RevOps Lead",
          proximity: "Shared background",
          personalization:
            "You both studied economics before moving into revenue operations.",
          score: "82",
        },
        {
          rank: "04",
          name: "Sam Hollis",
          company: "Pylon",
          title: "Growth Lead",
          proximity: "Warm signal",
          personalization:
            "They follow two of your customers and recently posted about data quality.",
          score: "76",
        },
      ],
    },
    Xa = {
      id: "visitor-outreach-sequences",
      title: "Personalized sequence preview",
      subtitle:
        "Each visitor gets a channel plan based on company fit, page intent, and the person’s role.",
      peopleCount: "50 people",
      launchLabel: "kick off sequence",
      sequences: [
        {
          name: "Maya Patel",
          company: "OrbitGrid",
          title: "VP Sales",
          signal: "Pricing page",
          subject: "OrbitGrid’s pricing-page interest",
          personalization:
            "Maya viewed pricing after OrbitGrid added two RevOps roles, so the opener ties visitor intent to cleaner account research.",
          steps: [
            {
              channel: "email",
              label: "lead with the trigger",
              body: "Mention the pricing visit and RevOps hiring pattern; ask if their team is evaluating ways to source better-fit accounts.",
            },
            {
              channel: "linkedin",
              label: "light proof",
              body: "Maya, saw OrbitGrid looking at pricing while hiring RevOps. I work on turning those signals into focused account lists instead of generic outreach. Worth connecting?",
            },
            {
              channel: "email",
              label: "offer the play",
              body: "Send a short teardown of three accounts showing why they match OrbitGrid’s current motion.",
            },
            {
              channel: "call",
              label: "use context",
              body: "Hi Maya, saw OrbitGrid looking at pricing while hiring RevOps. Are you trying to improve account fit, source coverage, or speed to follow-up right now?",
            },
          ],
        },
        {
          name: "Evan Brooks",
          company: "Northstar Dev",
          title: "Head of Sales",
          signal: "Integrations",
          subject: "Northstar Dev’s integration-led growth",
          personalization:
            "Evan came through integrations after Northstar Dev expanded sales leadership, so the sequence frames Unify as a way to find accounts already showing ecosystem fit.",
          steps: [
            {
              channel: "email",
              label: "anchor to integrations",
              body: "Point to their integrations-page visit and the likely need to prioritize partner-fit accounts.",
            },
            {
              channel: "linkedin",
              label: "ask a narrow question",
              body: "Evan, saw Northstar Dev digging into integrations while expanding sales. Curious if partner-fit signals are already part of outbound scoring?",
            },
            {
              channel: "email",
              label: "show the workflow",
              body: "Share how Unify can pull partner usage, firmographics, and contact data into one sequence-ready list.",
            },
            {
              channel: "call",
              label: "reference the path",
              body: "Hi Evan, saw the integrations research and Northstar Dev’s sales expansion. Are ecosystem-led accounts already a named campaign, or still mostly rep judgment?",
            },
          ],
        },
        {
          name: "Clara Wong",
          company: "BrightLayer",
          title: "VP Revenue",
          signal: "Case study",
          subject: "BrightLayer’s case-study research",
          personalization:
            "Clara read a customer story, so the sequence mirrors the proof format and offers a concise account-selection playbook.",
          steps: [
            {
              channel: "email",
              label: "mirror the proof",
              body: "Reference the case study visit and connect it to finding more accounts that match the same buying pattern.",
            },
            {
              channel: "linkedin",
              label: "share a takeaway",
              body: "Clara, saw BrightLayer reading customer proof. Curious whether your team is trying to find more accounts that look like that same buyer.",
            },
            {
              channel: "email",
              label: "personalized follow-up",
              body: "Offer a mini list of 10 lookalike companies with the reason each one matches BrightLayer’s best-fit segment.",
            },
            {
              channel: "call",
              label: "ask for fit",
              body: "Hi Clara, saw the case-study research. Are you looking for more accounts like that customer, or testing a new adjacent segment?",
            },
          ],
        },
        {
          name: "Andre Park",
          company: "Waterfall",
          title: "Head of Sales",
          signal: "Demo page",
          subject: "Waterfall’s demo-page visit",
          personalization:
            "Andre viewed the demo page while Waterfall is hiring growth roles, so the sequence ties intent to faster account prioritization.",
          steps: [
            {
              channel: "email",
              label: "open with demo intent",
              body: "Reference the demo visit and ask whether the team is looking for cleaner signals before expanding outbound coverage.",
            },
            {
              channel: "linkedin",
              label: "share the angle",
              body: "Andre, saw Waterfall checking out the demo while growth hiring is active. I work on turning those signals into researched account clusters without stitching tabs together.",
            },
            {
              channel: "email",
              label: "send the account cut",
              body: "Offer a small list of accounts showing hiring, tech stack, and funding signals in one view.",
            },
            {
              channel: "call",
              label: "ask about timing",
              body: "Hi Andre, saw Waterfall’s demo interest and growth hiring. Is this tied to an active expansion push, or are you mainly tightening account prioritization?",
            },
          ],
        },
        {
          name: "Jamie Chen",
          company: "Square",
          title: "VP Sales",
          signal: "ROI calculator",
          subject: "Saw Square using the ROI calculator",
          personalization:
            "Jamie used the ROI calculator, so the outreach leads with measurable pipeline coverage and better list quality.",
          steps: [
            {
              channel: "email",
              label: "lead with ROI",
              body: "Connect the calculator visit to the cost of fragmented data and suggest a quick account-quality benchmark.",
            },
            {
              channel: "linkedin",
              label: "use one proof point",
              body: "Jamie, saw Square using the ROI calculator. We help teams turn account-quality questions into researched lists and sequences in one workflow.",
            },
            {
              channel: "email",
              label: "offer benchmark",
              body: "Offer to compare one existing target segment against Unify’s combined intent and company data.",
            },
            {
              channel: "call",
              label: "qualify the metric",
              body: "Hi Jamie, saw Square pressure-testing the ROI calculator. Are you optimizing for more contacts, better account fit, or higher rep throughput?",
            },
          ],
        },
        {
          name: "Nina Kapoor",
          company: "Mercury",
          title: "Sales Director",
          signal: "Security page",
          subject: "Mercury’s security-page research",
          personalization:
            "Nina looked at security content, so the sequence keeps the value prop practical and trust-forward.",
          steps: [
            {
              channel: "email",
              label: "acknowledge trust",
              body: "Reference the security-page visit and frame Unify as a controlled way to operationalize external data.",
            },
            {
              channel: "linkedin",
              label: "ask the process question",
              body: "Nina, saw Mercury reviewing security content. Curious how your team evaluates new GTM data before it reaches outbound workflows.",
            },
            {
              channel: "email",
              label: "show governance",
              body: "Send a short overview of how Unify routes data work while keeping reps inside one system.",
            },
            {
              channel: "call",
              label: "surface blocker",
              body: "Hi Nina, saw Mercury spending time on security content. Is the bigger blocker for richer GTM data security review, data quality, or operational control?",
            },
          ],
        },
        {
          name: "David Kim",
          company: "Stripe",
          title: "Revenue Lead",
          signal: "Docs",
          subject: "Stripe’s docs-led research",
          personalization:
            "David came through docs, so the campaign assumes a hands-on evaluation and emphasizes workflow depth.",
          steps: [
            {
              channel: "email",
              label: "start technical",
              body: "Reference the docs visit and offer to show how Unify turns natural language into complete GTM workflows.",
            },
            {
              channel: "linkedin",
              label: "ask about workflow",
              body: "David, saw Stripe come through the docs. Curious whether the team is looking hardest at automating research, enrichment, or sequencing first.",
            },
            {
              channel: "email",
              label: "share workflow map",
              body: "Send a compact workflow map from prompt to table to sequence, using a Stripe-like target segment.",
            },
            {
              channel: "call",
              label: "probe use case",
              body: "Hi David, saw Stripe come through the docs. Are you evaluating this as rep-assist workflow automation, or as fully agentic list building?",
            },
          ],
        },
        {
          name: "Sam Hollis",
          company: "Pylon",
          title: "VP Sales",
          signal: "Comparison",
          subject: "Pylon’s comparison-page visit",
          personalization:
            "Sam viewed comparison content, so the outreach contrasts Unify’s unified workflow against point-tool switching.",
          steps: [
            {
              channel: "email",
              label: "frame the comparison",
              body: "Acknowledge the comparison visit and focus on reducing tab switching across data, enrichment, and engagement.",
            },
            {
              channel: "linkedin",
              label: "ask what matters",
              body: "Sam, saw Pylon reviewing comparison content. Curious whether the real criteria is coverage, workflow speed, or personalization quality.",
            },
            {
              channel: "email",
              label: "offer side-by-side",
              body: "Offer a short side-by-side showing how one sales request becomes a researched sequence in Unify.",
            },
            {
              channel: "call",
              label: "qualify priority",
              body: "Hi Sam, saw Pylon comparing workflows. Which step is pulling reps out of selling most often: data search, enrichment, or writing the sequence?",
            },
          ],
        },
        {
          name: "Rachel Cho",
          company: "Retool",
          title: "Head of Sales",
          signal: "Pricing page",
          subject: "Retool’s pricing-page intent",
          personalization:
            "Rachel viewed pricing during a sales hiring push, so the sequence connects team scaling to better prospecting systems.",
          steps: [
            {
              channel: "email",
              label: "tie to scaling",
              body: "Mention pricing interest and hiring signals, then ask if list building is becoming a rep-capacity bottleneck.",
            },
            {
              channel: "linkedin",
              label: "share focused proof",
              body: "Rachel, saw Retool pricing interest during a sales hiring push. We help teams build smaller, higher-fit lists instead of expanding generic coverage.",
            },
            {
              channel: "email",
              label: "send a sample segment",
              body: "Offer a sample segment with account fit, contacts, and ready-to-send messaging angles.",
            },
            {
              channel: "call",
              label: "ask about handoff",
              body: "Hi Rachel, saw Retool’s pricing interest alongside sales hiring. How are intent signals getting handed to reps today, and where does the handoff break?",
            },
          ],
        },
        {
          name: "Owen Lee",
          company: "Linear",
          title: "Sales Lead",
          signal: "Demo page",
          subject: "Linear’s demo-page research",
          personalization:
            "Owen visited the demo page, so the sequence stays crisp and shows a concrete workflow rather than a broad pitch.",
          steps: [
            {
              channel: "email",
              label: "keep it direct",
              body: "Reference the demo visit and offer one example of Unify building a clean account list from messy GTM signals.",
            },
            {
              channel: "linkedin",
              label: "ask one thing",
              body: "Owen, saw Linear’s demo-page research. Curious if the sales team is prioritizing outbound efficiency or better personalization this quarter.",
            },
            {
              channel: "email",
              label: "show a concrete play",
              body: "Send a specific play for identifying software teams expanding support or sales operations.",
            },
            {
              channel: "call",
              label: "connect to timing",
              body: "Hi Owen, saw Linear’s demo-page visit. Is this tied to an active evaluation window, or are you mapping what a cleaner outbound workflow could look like?",
            },
          ],
        },
      ],
      channels: [],
    };
  ({ ...Xa });
  const Du = {
      id: "visitor-sequence-build",
      title: "building outbound sequence",
      subtitle:
        "Using Unify’s offering, visitor intent, and role-level context to draft the campaign.",
      templateLabel: "generating sequence template from company offering",
      template:
        "Using Unify’s offering, visitor intent, role-specific pain, relevant proof, and a low-friction CTA.",
      total: 50,
      tracks: [
        {
          id: "companies",
          label: "researching companies",
          detail:
            "Reading firmographics, page intent, recent hiring, and relevant account signals.",
        },
        {
          id: "people",
          label: "researching people",
          detail:
            "Checking role, seniority, likely ownership, and channel-specific personalization angles.",
        },
      ],
    },
    Ru = [
      { key: "name", label: "Name", width: "1.2fr", cellType: "person" },
      { key: "company", label: "Company", width: "0.95fr" },
      { key: "title", label: "Title", width: "1.15fr" },
      { key: "visit", label: "Last visit", width: "0.86fr" },
      { key: "signal", label: "Signal", width: "1.18fr" },
    ],
    Jo = [
      {
        id: "maya-patel-visitor",
        values: {
          name: "Maya Patel",
          company: "OrbitGrid",
          title: "VP Sales",
          visit: "12m ago",
          signal: "Pricing page",
          source: "signal",
          avatarTone: "1",
        },
      },
      {
        id: "evan-brooks-visitor",
        values: {
          name: "Evan Brooks",
          company: "Northstar Dev",
          title: "Head of Sales",
          visit: "18m ago",
          signal: "Integrations",
          source: "signal",
          avatarTone: "2",
        },
      },
      {
        id: "clara-wong-visitor",
        values: {
          name: "Clara Wong",
          company: "BrightLayer",
          title: "VP Revenue",
          visit: "27m ago",
          signal: "Case study",
          source: "engage",
          avatarTone: "3",
        },
      },
      {
        id: "andre-park-visitor",
        values: {
          name: "Andre Park",
          company: "Waterfall",
          title: "Head of Sales",
          visit: "33m ago",
          signal: "Demo page",
          source: "signal",
          avatarTone: "4",
        },
      },
      {
        id: "jamie-chen-visitor",
        values: {
          name: "Jamie Chen",
          company: "Square",
          title: "VP Sales",
          visit: "42m ago",
          signal: "ROI calculator",
          source: "signal",
          avatarTone: "5",
        },
      },
      {
        id: "nina-kapoor-visitor",
        values: {
          name: "Nina Kapoor",
          company: "Mercury",
          title: "Sales Director",
          visit: "51m ago",
          signal: "Security page",
          source: "database",
          avatarTone: "6",
        },
      },
      {
        id: "david-kim-visitor",
        values: {
          name: "David Kim",
          company: "Stripe",
          title: "Revenue Lead",
          visit: "1h ago",
          signal: "Docs",
          source: "engage",
          avatarTone: "7",
        },
      },
      {
        id: "sam-hollis-visitor",
        values: {
          name: "Sam Hollis",
          company: "Pylon",
          title: "VP Sales",
          visit: "1h ago",
          signal: "Comparison",
          source: "signal",
          avatarTone: "8",
        },
      },
      {
        id: "rachel-cho-visitor",
        values: {
          name: "Rachel Cho",
          company: "Retool",
          title: "Head of Sales",
          visit: "2h ago",
          signal: "Pricing page",
          source: "database",
          avatarTone: "9",
        },
      },
      {
        id: "owen-lee-visitor",
        values: {
          name: "Owen Lee",
          company: "Linear",
          title: "Sales Lead",
          visit: "2h ago",
          signal: "Demo page",
          source: "signal",
          avatarTone: "1",
        },
      },
    ],
    Zo = {
      id: "website-visitors-sales",
      title: "Recent website visitors",
      eyebrow: "Visitor intent",
      count: "50 sales leaders",
      variant: "filtered",
      scrollAlign: "equal-inset",
      footerClearance: 28,
      columns: Ru,
      rows: Jo,
      pagination: {
        pageSize: 10,
        totalRows: 50,
        activePage: 1,
        pages: [
          { page: 1, range: "1-10 of 50 people", rows: Jo },
          {
            page: 2,
            range: "11-20 of 50 people",
            rows: [
              {
                id: "fatima-ali-visitor",
                values: {
                  name: "Fatima Ali",
                  company: "Vercel",
                  title: "VP Sales",
                  visit: "2h ago",
                  signal: "Enterprise",
                  source: "signal",
                  avatarTone: "2",
                },
              },
              {
                id: "leo-martin-visitor",
                values: {
                  name: "Leo Martin",
                  company: "Hex",
                  title: "Head of Sales",
                  visit: "3h ago",
                  signal: "Blog",
                  source: "database",
                  avatarTone: "3",
                },
              },
              {
                id: "priya-rao-visitor",
                values: {
                  name: "Priya Rao",
                  company: "Census",
                  title: "Sales Director",
                  visit: "3h ago",
                  signal: "Demo page",
                  source: "engage",
                  avatarTone: "4",
                },
              },
              {
                id: "jules-meyer-visitor",
                values: {
                  name: "Jules Meyer",
                  company: "Notion",
                  title: "VP Sales",
                  visit: "4h ago",
                  signal: "Integrations",
                  source: "signal",
                  avatarTone: "5",
                },
              },
              {
                id: "marcus-reed-visitor",
                values: {
                  name: "Marcus Reed",
                  company: "Figma",
                  title: "Revenue Lead",
                  visit: "4h ago",
                  signal: "Pricing page",
                  source: "signal",
                  avatarTone: "6",
                },
              },
              {
                id: "zoe-carter-visitor",
                values: {
                  name: "Zoe Carter",
                  company: "Rippling",
                  title: "Head of Sales",
                  visit: "5h ago",
                  signal: "Case study",
                  source: "engage",
                  avatarTone: "7",
                },
              },
              {
                id: "liam-price-visitor",
                values: {
                  name: "Liam Price",
                  company: "Webflow",
                  title: "VP Sales",
                  visit: "5h ago",
                  signal: "Security page",
                  source: "database",
                  avatarTone: "8",
                },
              },
              {
                id: "sara-nelson-visitor",
                values: {
                  name: "Sara Nelson",
                  company: "Airtable",
                  title: "Sales Lead",
                  visit: "6h ago",
                  signal: "Comparison",
                  source: "signal",
                  avatarTone: "9",
                },
              },
              {
                id: "noah-singh-visitor",
                values: {
                  name: "Noah Singh",
                  company: "dbt Labs",
                  title: "Head of Sales",
                  visit: "6h ago",
                  signal: "ROI calculator",
                  source: "signal",
                  avatarTone: "1",
                },
              },
              {
                id: "ava-garcia-visitor",
                values: {
                  name: "Ava Garcia",
                  company: "Gusto",
                  title: "VP Revenue",
                  visit: "7h ago",
                  signal: "Demo page",
                  source: "engage",
                  avatarTone: "2",
                },
              },
            ],
          },
        ],
      },
      actions: [
        {
          id: "power-dialer",
          label: "Power dial",
          icon: "dialer",
          badge: "Coming soon!",
          variant: "primary",
        },
        {
          id: "email-sequence",
          label: "Outreach sequence",
          icon: "email",
          variant: "secondary",
        },
      ],
    },
    dn = [
      {
        id: "raw-maya-rodriguez",
        values: {
          name: "Maya R.",
          email: "MAYA.RODRIGUEZ@NorthStar.ai ",
          company: "northstar ai",
        },
      },
      {
        id: "raw-ethan-cho",
        values: {
          name: "Ethan Cho",
          email: "ethan.cho@gmail.com",
          company: "",
        },
      },
      {
        id: "raw-priya-shah",
        values: {
          name: "Priya Shah",
          email: "priya.shah+webinar@orbitgrid.com",
          company: "Orbitgrid",
        },
      },
      {
        id: "raw-lucas-meyer",
        values: { name: "Lucas", email: "lucas.meyer@yahoo.com", company: "" },
      },
      {
        id: "raw-nina-kapoor",
        values: { name: "N. Kapoor", email: "", company: "Mercury" },
      },
      {
        id: "raw-anna-li",
        values: {
          name: "Anna Li",
          email: "annali.work@gmail.com",
          company: "",
        },
      },
      {
        id: "raw-devon-park",
        values: {
          name: "Devon Park",
          email: "devon.park@outlook.com",
          company: "",
        },
      },
      {
        id: "raw-rachel-cho",
        values: { name: "Rachel C.", email: "", company: "Figma" },
      },
      {
        id: "raw-owen-lee",
        values: { name: "Owen Lee", email: "owen.lee@icloud.com", company: "" },
      },
      {
        id: "raw-clara-wong",
        values: {
          name: "Clara Wong",
          email: "clara.wong@proton.me",
          company: "Bright Layer",
        },
      },
      {
        id: "raw-maya-rodriguez-duplicate",
        values: {
          name: "Maya Rodriguez",
          email: "maya.rodriguez@northstar.ai",
          company: "Northstar AI",
        },
      },
      {
        id: "raw-ethan-cho-duplicate",
        values: { name: "Ethan Cho", email: "", company: "Clearbit Inc." },
      },
      {
        id: "raw-fatima-ali",
        values: {
          name: "Fatima Ali",
          email: "fatima.ali@gmail.com",
          company: "",
        },
      },
      {
        id: "raw-leo-martin",
        values: {
          name: "Leo Martin",
          email: "leo.martin@hex.tech",
          company: "Hex",
        },
      },
      {
        id: "raw-priya-rao",
        values: {
          name: "Priya Rao",
          email: "priya.rao@yahoo.com",
          company: "",
        },
      },
      {
        id: "raw-jules-meyer",
        values: {
          name: "Jules Meyer",
          email: "jules@notion.so",
          company: "Notion",
        },
      },
      {
        id: "raw-marcus-reed",
        values: {
          name: "Marcus Reed",
          email: "marcus.reed@icloud.com",
          company: "",
        },
      },
      {
        id: "raw-zoe-carter",
        values: {
          name: "Zoe Carter",
          email: "zoe.carter@rippling.com",
          company: "Rippling",
        },
      },
      {
        id: "raw-liam-price",
        values: {
          name: "Liam Price",
          email: "liam.price@gmail.com",
          company: "",
        },
      },
      {
        id: "raw-sara-nelson",
        values: {
          name: "Sara Nelson",
          email: "sara.nelson@airtable.com",
          company: "Airtable",
        },
      },
    ],
    Iu = {
      id: "raw-webinar-attendees",
      title: "Raw webinar attendees",
      eyebrow: "CSV import",
      count: "54 records",
      preserveScroll: !0,
      columns: [
        { key: "name", label: "Name", width: "110px", cellType: "text" },
        { key: "email", label: "Email", width: "250px" },
        { key: "company", label: "Company", width: "minmax(120px,1fr)" },
      ],
      rows: dn,
      pagination: {
        pageSize: 10,
        totalRows: 54,
        activePage: 1,
        pages: [
          { page: 1, range: "1-10 of 54 records", rows: dn.slice(0, 10) },
          { page: 2, range: "11-20 of 54 records", rows: dn.slice(10, 20) },
        ],
      },
    },
    un = [
      {
        id: "clean-maya-rodriguez",
        values: {
          fullName: "Maya Rodriguez",
          "work-email": "maya.rodriguez@northstar.ai",
          company: "Northstar AI",
          prospectDetail: "VP Marketing",
        },
      },
      {
        id: "clean-ethan-cho",
        values: {
          fullName: "Ethan Cho",
          "work-email": "ethan.cho@clearbit.com",
          company: "Clearbit",
          prospectDetail: "Head of Demand Gen",
        },
      },
      {
        id: "clean-priya-shah",
        values: {
          fullName: "Priya Shah",
          "work-email": "priya.shah@orbitgrid.com",
          company: "OrbitGrid",
          prospectDetail: "Head of Growth",
        },
      },
      {
        id: "clean-lucas-meyer",
        values: {
          fullName: "Lucas Meyer",
          "work-email": "lucas.meyer@waterfall.com",
          company: "Waterfall",
          prospectDetail: "Revenue Operations",
        },
      },
      {
        id: "clean-nina-kapoor",
        values: {
          fullName: "Nina Kapoor",
          "work-email": "nina.kapoor@mercury.com",
          company: "Mercury",
          prospectDetail: "Sales Director",
        },
      },
      {
        id: "clean-sam-hollis",
        values: {
          fullName: "Sam Hollis",
          "work-email": "sam.hollis@usepylon.com",
          company: "Pylon",
          prospectDetail: "VP Sales",
        },
      },
      {
        id: "clean-anna-li",
        values: {
          fullName: "Anna Li",
          "work-email": "anna.li@linear.app",
          company: "Linear",
          prospectDetail: "Growth Marketing",
        },
      },
      {
        id: "clean-devon-park",
        values: {
          fullName: "Devon Park",
          "work-email": "devon.park@brex.com",
          company: "Brex",
          prospectDetail: "RevOps Manager",
        },
      },
      {
        id: "clean-rachel-cho",
        values: {
          fullName: "Rachel Cho",
          "work-email": "rachel.cho@figma.com",
          company: "Figma",
          prospectDetail: "Product Marketing",
        },
      },
      {
        id: "clean-owen-lee",
        values: {
          fullName: "Owen Lee",
          "work-email": "owen.lee@notion.so",
          company: "Notion",
          prospectDetail: "Revenue Lead",
        },
      },
      {
        id: "clean-clara-wong",
        values: {
          fullName: "Clara Wong",
          "work-email": "clara.wong@brightlayer.com",
          company: "BrightLayer",
          prospectDetail: "VP Revenue",
        },
      },
      {
        id: "clean-sara-patel",
        values: {
          fullName: "Sara Patel",
          "work-email": "sara.patel@northstar.ai",
          company: "Northstar AI",
          prospectDetail: "Demand Gen",
        },
      },
      {
        id: "clean-ethan-cho-duplicate",
        values: {
          fullName: "Ethan Cho",
          "work-email": "ethan.cho@clearbit.com",
          company: "Clearbit",
          prospectDetail: "Head of Demand Gen",
        },
      },
      {
        id: "clean-fatima-ali",
        values: {
          fullName: "Fatima Ali",
          "work-email": "fatima.ali@vercel.com",
          company: "Vercel",
          prospectDetail: "VP Sales",
        },
      },
      {
        id: "clean-leo-martin",
        values: {
          fullName: "Leo Martin",
          "work-email": "leo.martin@hex.tech",
          company: "Hex",
          prospectDetail: "Head of Sales",
        },
      },
      {
        id: "clean-priya-rao",
        values: {
          fullName: "Priya Rao",
          "work-email": "priya.rao@census.com",
          company: "Census",
          prospectDetail: "Sales Director",
        },
      },
      {
        id: "clean-jules-meyer",
        values: {
          fullName: "Jules Meyer",
          "work-email": "jules.meyer@notion.so",
          company: "Notion",
          prospectDetail: "VP Sales",
        },
      },
      {
        id: "clean-marcus-reed",
        values: {
          fullName: "Marcus Reed",
          "work-email": "marcus.reed@figma.com",
          company: "Figma",
          prospectDetail: "Revenue Lead",
        },
      },
      {
        id: "clean-zoe-carter",
        values: {
          fullName: "Zoe Carter",
          "work-email": "zoe.carter@rippling.com",
          company: "Rippling",
          prospectDetail: "Head of Sales",
        },
      },
      {
        id: "clean-liam-price",
        values: {
          fullName: "Liam Price",
          "work-email": "liam.price@webflow.com",
          company: "Webflow",
          prospectDetail: "VP Sales",
        },
      },
    ],
    qu = {
      id: "clean-webinar-attendees",
      title: "Cleaned webinar attendees",
      eyebrow: "CSV cleanup",
      count: "54 records",
      scrollAnchor: "previous-message",
      columns: [
        {
          key: "fullName",
          label: "Full name",
          width: "175px",
          cellType: "person",
        },
        { key: "work-email", label: "Work email", width: "215px" },
        { key: "company", label: "Company", width: "minmax(150px,1fr)" },
      ],
      rows: un,
      pagination: {
        pageSize: 10,
        totalRows: 54,
        activePage: 1,
        pages: [
          { page: 1, range: "1-10 of 54 records", rows: un.slice(0, 10) },
          { page: 2, range: "11-20 of 54 records", rows: un.slice(10, 20) },
        ],
      },
    },
    hn = [
      {
        id: "hit-ground-running",
        label: "Hit the ground running",
        navLabel: "Hit the ground running",
        navDescription:
          "Unify understands your business like you do. Use the latest frontier models to identify your next campaign ideas.",
        eyebrow: "Business onboarding",
        summary:
          "The assistant learns the company, researches public signals, and returns three GTM plays.",
        entry: fo,
        entryLeadTime: bo,
        prepare: (r) => {
          r.chat.prepareSignup();
        },
        build: (r) =>
          Ve(r, [
            { kind: "status", text: "Sign up" },
            { kind: "cursorClick", nextMode: "text", at: "-=0.04" },
            {
              kind: "typeSignupEmail",
              email: "joel@vercel.com",
              duration: P.typeShort,
            },
            {
              kind: "cursorMove",
              target: wo,
              options: {
                mode: "pointer",
                intent: "click",
                speed: "quick",
                duration: Re.compact,
                curve: 0.12,
                ...De,
                label: "signup-submit",
              },
              at: "-=0.04",
            },
            { kind: "cursorClick", nextMode: "default", at: "+=0.06" },
            { kind: "custom", build: () => r.chat.submitSignup(), at: "<" },
            { kind: "status", text: "Building workspace", at: "-=0.08" },
            { kind: "transitionSignupToChat", at: `+=${P.beat}` },
            { kind: "status", text: "Researching Vercel", at: "<" },
            { kind: "thinking", steps: Cu, hold: 0.46, at: "<" },
            {
              kind: "assistant",
              text: "Here are some ideas I can put into action for you:",
            },
            { kind: "status", text: "Game plans ready", at: "<" },
            { kind: "strategyPlans", plans: Tu, at: "-=0.08" },
            pt(Xe.right, "+=0.18"),
          ]),
      },
      {
        id: "data-marketplace",
        label: "100+ data sources at your fingertips",
        navLabel: "100+ data sources at your fingertips",
        navDescription:
          "A one-stop shop for your data needs, B2B contacts and companies, e-commerce, local businesses, technographics, and much more in a single natural language search.",
        navDescriptionLink: {
          text: "and much more",
          href: "https://www.unifygtm.com/signals",
          ariaLabel: "Explore Unify signals and data sources",
        },
        eyebrow: "Data marketplace",
        summary:
          "The assistant searches, filters, and enriches B2B company and contact data.",
        assetUrls: [...pa(Qo), ...pa(Yo), ...pa(Wo)],
        entry: Ga.dataMarketplace,
        entryLeadTime: Ya,
        build: (r) =>
          Ve(r, [
            {
              kind: "prompt",
              text: "Show me new hires at dev-tool companies with 50+ employees.",
              duration: P.typeLong,
              sendLabel: "send-data-search",
              statusBefore: "Searching data",
              statusAfter: "Searching 100+ sources",
              fromEntry: !0,
            },
            {
              kind: "thinking",
              label: "Searching hiring signals, headcount, and company data",
              hold: P.thinkingMedium,
            },
            { kind: "dataTable", config: Qo, at: "-=0.04" },
            {
              kind: "prompt",
              text: "Filter to the ones that have raised in the past three months.",
              duration: P.typeMedium,
              sendLabel: "send-data-filter",
              statusAfter: "Filtering by funding",
              at: `+=${P.beat}`,
            },
            {
              kind: "thinking",
              label: "Checking rounds announced since February 2026",
              hold: P.thinkingShort,
            },
            { kind: "dataTable", config: Yo, at: "-=0.04" },
            {
              kind: "prompt",
              text: "Okay, enrich these contacts.",
              duration: P.typeShort,
              sendLabel: "send-enrich-contacts",
              statusAfter: "Preparing enrichment",
              postSendCursorMotion: !1,
              at: `+=${P.beat}`,
            },
            { kind: "enrichmentPanel", config: Pu, at: "+=0.12" },
            { kind: "status", text: "Contacts enriched", at: "+=0.86" },
            { kind: "dataTable", config: Wo, at: "-=0.02" },
            pt(Xe.bottomRight, "+=1.1"),
          ]),
      },
      {
        id: "crm-update",
        label: "Agent that knows you",
        navLabel: "An agent that knows you",
        eyebrow: "Context learning",
        summary:
          "The assistant learns Vercel’s GTM context and ranks leads by relationship proximity.",
        assetUrls: go(Xo),
        entry: {
          desktop: {
            target: "[data-chat-shell]",
            anchor: "right",
            offset: { x: -48, y: 168 },
          },
          tablet: {
            target: "[data-chat-shell]",
            anchor: "right",
            offset: { x: -44, y: 144 },
          },
          mobile: {
            target: "[data-chat-shell]",
            anchor: "right",
            offset: { x: -36, y: 112 },
          },
        },
        entryLeadTime: 0.18,
        build: (r) => {
          const e = r.chat.prepareCsvDropArea({
              title: "Drop business context files",
              detail:
                "Positioning, AI app playbooks, ICP notes, and enterprise objection context.",
            }),
            t = r.chat.prepareCursorFile(
              "4 context files",
              r.cursor,
              "DOC",
              jo,
            ),
            a = {
              desktop: {
                target: "[data-chat-shell]",
                anchor: "right",
                outside: "right",
                offset: { x: 420, y: -74 },
                humanOffset: !1,
              },
              tablet: {
                target: "[data-chat-shell]",
                anchor: "right",
                outside: "right",
                offset: { x: 360, y: -58 },
                humanOffset: !1,
              },
              mobile: {
                target: "[data-chat-shell]",
                anchor: "right",
                outside: "right",
                offset: { x: 280, y: -42 },
                humanOffset: !1,
              },
            },
            i = L("[data-chat-shell]", "center", {
              desktop: { x: 0, y: 74 },
              tablet: { x: 0, y: 64 },
              mobile: { x: 0, y: 56 },
            });
          return Ve(r, [
            ...Ao(Mu),
            { kind: "status", text: "waiting for context", at: `+=${P.beat}` },
            {
              kind: "cursorMove",
              target: a,
              options: {
                mode: "default",
                intent: "exit",
                speed: "slow",
                overshoot: !1,
                settle: !0,
                label: "context-file-pickup",
              },
              at: "+=0.08",
            },
            { kind: "custom", build: () => t.startFollow() },
            {
              kind: "custom",
              build: () => e.revealWhenCursorEnters(r.cursor),
              at: "<",
            },
            {
              kind: "cursorMove",
              target: i,
              options: {
                mode: "drag",
                intent: "drag",
                speed: "slow",
                ease: "power1.out",
                overshoot: !1,
                settle: !0,
                preserveMode: !0,
                label: "drag-context-files",
              },
              at: "<",
            },
            { kind: "custom", build: () => e.activate(), at: "<+=0.02" },
            {
              kind: "custom",
              build: () => r.timeline().to({}, { duration: P.beat }),
            },
            { kind: "custom", build: () => e.complete() },
            { kind: "custom", build: () => t.releaseAtDrop(), at: "<" },
            { kind: "custom", build: () => t.landAsUploadedFiles(jo), at: "<" },
            { kind: "status", text: "Learning Vercel’s business", at: "<" },
            {
              kind: "thinking",
              steps: [
                "Reading Vercel positioning and launch notes",
                "Mapping developer personas and buying committees",
                "Extracting AI app and frontend cloud proof points",
                "Summarizing ICP fit and GTM angles",
              ],
              hold: 0.24,
              at: `+=${P.beat}`,
            },
            {
              kind: "custom",
              build: () =>
                r.chat.outreachStyleProfile(Ko, { scrollAlign: "equal-inset" }),
              at: "-=0.02",
            },
            ...yo(Ko.id),
            {
              kind: "prompt",
              text: "Generate leads ranked by how personally connected they are to me.",
              duration: P.typeMedium,
              sendLabel: "send-proximity-list",
              statusAfter: "Ranking proximity",
              at: `+=${P.beat}`,
            },
            {
              kind: "thinking",
              thinking: {
                title: "Ranking connected leads",
                items: [
                  {
                    label:
                      "Scoring shared schools, fields of study, mutual contacts, and warm signals",
                  },
                ],
              },
              hold: P.thinkingMedium,
            },
            {
              kind: "custom",
              build: () => r.chat.proximityLeadList(Xo),
              at: "-=0.04",
            },
            pt(Xe.bottomRight, "+=0.16"),
          ]);
        },
      },
      {
        id: "research-brief",
        label: "Zero effort engagement",
        navLabel: "Zero effort engagement, built in",
        eyebrow: "Engagement engine",
        summary:
          "The assistant turns website visitor intent into a paginated list and engagement actions.",
        assetUrls: [...pa(Zo), ...mo(Xa)],
        entry: Ga.researchBrief,
        entryLeadTime: Ya,
        build: (r) => {
          const e = L(
              '[data-data-table="website-visitors-sales"] [data-page-button-role="next"]',
              "center",
            ),
            t = L(
              '[data-data-table="website-visitors-sales"] [data-table-action="email-sequence"]',
              "center",
              {},
              !1,
            ),
            [a, i] = Vr(Xa, 2),
            n = L(
              `[data-sequence-person-card="visitor-outreach-sequences:${a}"]`,
              "center",
            ),
            o = L(
              `[data-sequence-person-card="visitor-outreach-sequences:${i}"]`,
              "center",
            ),
            s = L(
              '[data-sequence-kickoff="visitor-outreach-sequences"]',
              "center",
            );
          return Ve(r, [
            {
              kind: "prompt",
              text: "Show me 50 sales leaders that have recently visited my website.",
              duration: P.typeLong,
              sendLabel: "send-visitor-sales-list",
              statusBefore: "finding visitors",
              statusAfter: "building visitor list",
              fromEntry: !0,
            },
            { kind: "custom", build: () => r.chat.dataTable(Zo), at: "-=0.02" },
            _o("website-visitors-sales", _u, "+=0.08", {
              align: "top",
              bottomClearance: xu,
            }),
            { kind: "cursorMove", target: e, options: vu, at: `+=${ku}` },
            { kind: "cursorClick", at: "+=0.08" },
            {
              kind: "custom",
              build: () => r.chat.dataTablePage("website-visitors-sales", 2),
              at: "-=0.02",
            },
            { kind: "status", text: "ready to engage", at: "+=0.1" },
            {
              kind: "custom",
              build: () => r.timeline().to({}, { duration: P.beat }),
            },
            { kind: "cursorMove", target: t, options: yu, at: "+=0.12" },
            { kind: "cursorClick", at: "+=0.18" },
            {
              kind: "custom",
              build: () =>
                r.chat.dataTableActionSelected(
                  "website-visitors-sales",
                  "email-sequence",
                ),
              at: "<",
            },
            { kind: "status", text: "building outreach sequence", at: "<" },
            {
              kind: "custom",
              build: () => r.chat.sequenceBuildThinking(Du),
              at: "+=0.06",
            },
            {
              kind: "custom",
              build: () => r.chat.sequenceEngagement(Xa),
              at: "-=0.02",
            },
            {
              kind: "custom",
              build: () => r.timeline().to({}, { duration: P.beat }),
              at: "+=0.04",
            },
            {
              kind: "custom",
              build: () =>
                r.chat.sequencePersonCardIntoView(
                  "visitor-outreach-sequences",
                  a,
                ),
              at: "+=0.02",
            },
            {
              kind: "cursorMove",
              target: n,
              options: { ...Vo, label: "preview-next-sequence" },
              at: "+=0.02",
            },
            { kind: "cursorClick", at: "+=0.08" },
            {
              kind: "custom",
              build: () =>
                r.chat.sequencePerson("visitor-outreach-sequences", a),
              at: "-=0.03",
            },
            {
              kind: "custom",
              build: () => r.timeline().to({}, { duration: P.beat }),
              at: "+=0.04",
            },
            {
              kind: "custom",
              build: () =>
                r.chat.sequencePersonCardIntoView(
                  "visitor-outreach-sequences",
                  i,
                ),
              at: "+=0.02",
            },
            {
              kind: "cursorMove",
              target: o,
              options: { ...Vo, label: "preview-following-sequence" },
              at: "+=0.02",
            },
            { kind: "cursorClick", at: "+=0.08" },
            {
              kind: "custom",
              build: () =>
                r.chat.sequencePerson("visitor-outreach-sequences", i),
              at: "-=0.03",
            },
            {
              kind: "custom",
              build: () => r.timeline().to({}, { duration: P.beat + 0.28 }),
              at: "+=0.04",
            },
            ...xo("visitor-outreach-sequences", [1, 2, 3], "+=0.22"),
            {
              kind: "cursorMove",
              target: s,
              options: { ...Su, label: "kickoff-visitor-sequence" },
            },
            { kind: "cursorClick", at: "+=0.12" },
            {
              kind: "custom",
              build: () => r.chat.sequenceKickoff("visitor-outreach-sequences"),
              at: "-=0.02",
            },
            {
              kind: "custom",
              build: () => r.chat.enrollmentProgress({ total: 50 }),
              at: "+=0.08",
            },
          ]);
        },
      },
      {
        id: "csv-import-cleanup",
        label: "CSV import cleanup",
        navLabel: "Made for the messiness of the real world",
        eyebrow: "CSV cleanup",
        summary:
          "The assistant accepts a messy CSV, cleans attendee fields, and returns a normalized table.",
        entry: {
          desktop: {
            target: "[data-chat-shell]",
            anchor: "right",
            outside: "right",
            offset: { x: 270, y: 70 },
          },
          tablet: {
            target: "[data-chat-shell]",
            anchor: "right",
            outside: "right",
            offset: { x: 224, y: 56 },
          },
          mobile: {
            target: "[data-chat-shell]",
            anchor: "right",
            outside: "right",
            offset: { x: 172, y: 42 },
          },
        },
        entryLeadTime: 0.18,
        build: (r) => {
          const e = r.chat.prepareCsvDropArea(),
            t = r.chat.prepareCursorFile("may_webinar_attendees.csv", r.cursor),
            a = L("[data-chat-shell]", "center", {
              desktop: { x: 0, y: 82 },
              tablet: { x: 0, y: 72 },
              mobile: { x: 0, y: 64 },
            });
          return Ve(r, [
            { kind: "status", text: "waiting for CSV" },
            {
              kind: "custom",
              build: () => t.startFollow(),
              at: `+=${P.fileGrab}`,
            },
            {
              kind: "custom",
              build: () => e.revealWhenCursorEnters(r.cursor),
              at: "<",
            },
            {
              kind: "cursorMove",
              target: a,
              options: {
                mode: "drag",
                intent: "drag",
                speed: "slow",
                ease: "power1.out",
                overshoot: !1,
                settle: !0,
                preserveMode: !0,
                label: "drag-webinar-csv",
              },
              at: "<",
            },
            { kind: "custom", build: () => e.activate(), at: "<+=0.02" },
            {
              kind: "custom",
              build: () => r.timeline().to({}, { duration: P.beat }),
            },
            { kind: "custom", build: () => e.complete() },
            { kind: "custom", build: () => t.releaseAtDrop(), at: "<" },
            {
              kind: "custom",
              build: () =>
                t.landAsUploadedFile(
                  "may_webinar_attendees.csv",
                  "54 records",
                  { preserveScroll: !0 },
                ),
              at: "<",
            },
            { kind: "dataTable", config: Iu, at: `+=${P.beat}` },
            { kind: "status", text: "Cleaning CSV", at: "<" },
            {
              kind: "thinking",
              steps: [
                "Parsing webinar attendee CSV",
                "Normalizing email addresses",
                "Combining first and last name fields",
                "Removing duplicates and empty rows",
              ],
              hold: 0.34,
              at: `+=${P.beat}`,
            },
            {
              kind: "assistant",
              text: "I cleaned the attendee list and normalized the fields that matter for routing and follow-up.",
            },
            { kind: "dataTable", config: qu, at: "-=0.04" },
            pt(Xe.bottomRight, "+=0.18"),
          ]);
        },
      },
    ],
    Ja = {
      radius: 48,
      sampleWindowMs: 900,
      minTravel: 34,
      minAxisReversals: 1,
    },
    Et = {
      sampleWindowMs: 960,
      minDurationMs: 620,
      minTravel: 480,
      minAxisReversals: 6,
      minAverageSpeed: 0.54,
      minTravelToNetRatio: 2.55,
      maxNetDistance: 165,
    },
    re = {
      smoothing: 0.22,
      trailDistance: 60,
      minPointerDistance: 44,
      momentumScale: 0.2,
      momentumDecay: 0.88,
      minMomentum: 0.35,
      maxMomentumStep: 18,
      idleTimeoutMs: 1800,
      reengageRadius: 84,
      maxBrowserDistance: 600,
      returnDelayMs: 320,
    },
    mt = {
      smoothing: 0.22,
      orbitMs: 1620,
      bobMs: 690,
      radiusX: 76,
      radiusY: 42,
      bobY: 10,
      minPointerDistance: 56,
      viewportInset: 14,
    },
    Za = { durationMs: 920, pointIntervalMs: 155, radius: 24, smoothing: 0.2 },
    Wt = {
      durationMs: 980,
      playDurationMin: 0.34,
      playDurationMax: 0.62,
      playPixelsPerSecond: 980,
      waveHeight: 18,
      arriveDistance: 3.5,
    };
  class Bu {
    constructor(e, t, a = {}) {
      ((this.root = e), (this.cursor = t), (this.options = a));
    }
    root;
    cursor;
    options;
    paused = !1;
    active = !1;
    mode = "idle";
    listening = !1;
    samples = [];
    dismissSamples = [];
    target = null;
    pointer = null;
    sniffAnchor = null;
    sniffStartedAt = 0;
    nextSniffAt = 0;
    sniffIndex = 0;
    returnAt = 0;
    returnStart = null;
    returnStartedAt = 0;
    returnWaveDirection = 1;
    playStartedAt = 0;
    playPhase = 0;
    lastPointer = null;
    trailDirection = { x: -0.94, y: 0.34 };
    velocity = { x: 0, y: 0 };
    frame = 0;
    lastMoveAt = 0;
    chatShell = null;
    setPaused(e) {
      if (this.paused !== e) {
        if (
          ((this.paused = e),
          (this.samples = []),
          (this.dismissSamples = []),
          e)
        ) {
          this.listen();
          return;
        }
        (this.stopMimicking(), this.unlisten());
      }
    }
    releaseToIdle() {
      if (!this.active) return (this.setPaused(!1), null);
      ((this.paused = !1),
        (this.samples = []),
        (this.dismissSamples = []),
        this.unlisten(),
        window.cancelAnimationFrame(this.frame),
        (this.frame = 0));
      const e = this.getCursorViewportPoint(),
        t = this.getReturnHomePoint(),
        a = { progress: 0 },
        i = pn(
          $e(e, t) / Wt.playPixelsPerSecond,
          Wt.playDurationMin,
          Wt.playDurationMax,
        );
      return (
        (this.mode = "return"),
        (this.target = t),
        (this.pointer = null),
        (this.sniffAnchor = null),
        (this.returnStart = e),
        (this.returnStartedAt = performance.now()),
        (this.returnWaveDirection = t.y >= e.y ? 1 : -1),
        (this.playStartedAt = 0),
        (this.playPhase = 0),
        (this.lastPointer = null),
        (this.velocity = { x: 0, y: 0 }),
        g
          .timeline({
            onComplete: () => {
              (this.cursor.mimicViewportPoint(t, 1, t), this.completeReturn());
            },
            onInterrupt: () => this.stopMimicking(),
          })
          .to(a, {
            progress: 1,
            duration: i,
            ease: "none",
            onUpdate: () => {
              const n = $o(a.progress),
                o = this.getReturnWavePoint(n, t),
                s = this.getReturnWavePoint(Math.min(1, n + 0.035), t);
              this.cursor.mimicViewportPoint(o, 1, n < 1 ? s : t);
            },
          })
      );
    }
    destroy() {
      this.setPaused(!1);
    }
    listen() {
      this.listening ||
        (document.addEventListener("pointermove", this.handlePointerMove, {
          passive: !0,
        }),
        document.addEventListener("pointerleave", this.handlePointerLeave, {
          passive: !0,
        }),
        (this.listening = !0));
    }
    unlisten() {
      this.listening &&
        (document.removeEventListener("pointermove", this.handlePointerMove),
        document.removeEventListener("pointerleave", this.handlePointerLeave),
        (this.listening = !1));
    }
    handlePointerMove = (e) => {
      if (!this.paused) return;
      const t = { x: e.clientX, y: e.clientY };
      if (!this.isPointInsideViewport(t)) {
        (this.active && this.startSniffing(),
          (this.samples = []),
          (this.dismissSamples = []));
        return;
      }
      if (this.active) {
        const a = performance.now();
        (this.mode === "follow"
          ? (this.updateFollowTarget(t),
            (this.lastMoveAt = a),
            this.trackDismissShake(t, a),
            this.hasDismissShake() && this.startReturnAfterPause(0))
          : this.mode === "play"
            ? this.pointer && $e(t, this.pointer) < 3
              ? (this.pointer = t)
              : this.resumeFollowing(t)
            : this.mode === "sniff" &&
              this.isPointNearStoryCursor(t, re.reengageRadius) &&
              this.resumeFollowing(t),
          this.scheduleFollow());
        return;
      }
      if (!this.isPointNearStoryCursor(t)) {
        this.pruneSamples(performance.now());
        return;
      }
      (this.samples.push({ ...t, time: performance.now() }),
        this.pruneSamples(performance.now()),
        this.hasMimicGesture() && this.startMimicking(t));
    };
    handlePointerLeave = () => {
      (this.active && this.startSniffing(),
        (this.samples = []),
        (this.dismissSamples = []));
    };
    startMimicking(e) {
      this.active ||
        ((this.active = !0),
        (this.mode = "follow"),
        (this.lastPointer = this.samples[this.samples.length - 2] ?? null),
        this.updateFollowTarget(e),
        (this.lastMoveAt = performance.now()),
        (this.samples = []),
        (this.dismissSamples = []),
        (this.root.dataset.cursorMimicking = "true"),
        this.options.onMimicStart?.(),
        this.cursor.beginMimicControl(),
        this.scheduleFollow());
    }
    stopMimicking() {
      this.active &&
        ((this.active = !1),
        (this.mode = "idle"),
        (this.target = null),
        (this.pointer = null),
        (this.sniffAnchor = null),
        (this.returnStart = null),
        (this.returnStartedAt = 0),
        (this.playStartedAt = 0),
        (this.playPhase = 0),
        (this.lastPointer = null),
        (this.velocity = { x: 0, y: 0 }),
        (this.dismissSamples = []),
        delete this.root.dataset.cursorMimicking,
        window.cancelAnimationFrame(this.frame),
        (this.frame = 0),
        this.cursor.endMimicControl());
    }
    scheduleFollow() {
      this.frame ||
        !this.active ||
        (this.frame = window.requestAnimationFrame(this.followPointer));
    }
    followPointer = () => {
      if (((this.frame = 0), !this.active)) return;
      const e = performance.now();
      if (this.mode === "returnWait") {
        (e >= this.returnAt && this.beginReturn(e), this.scheduleFollow());
        return;
      }
      if (this.mode === "sniff") {
        (this.updateSniffTarget(e),
          this.target &&
            this.cursor.mimicViewportPoint(
              this.target,
              Za.smoothing,
              this.target,
            ),
          e - this.sniffStartedAt >= Za.durationMs &&
            this.startReturnAfterPause(),
          this.scheduleFollow());
        return;
      }
      if (this.mode === "play") {
        if (!this.pointer) {
          this.startReturnAfterPause();
          return;
        }
        (this.updatePlayTarget(e),
          this.target &&
            this.cursor.mimicViewportPoint(
              this.target,
              mt.smoothing,
              this.pointer,
            ),
          this.scheduleFollow());
        return;
      }
      if (this.mode === "return") {
        const t = this.getReturnHomePoint(),
          a = $o((e - this.returnStartedAt) / Wt.durationMs),
          i = this.getReturnWavePoint(a, t),
          n = this.getReturnWavePoint(Math.min(1, a + 0.035), t);
        if (
          ((this.target = t),
          this.cursor.mimicViewportPoint(i, 1, a < 1 ? n : t),
          a >= 1 || $e(this.getCursorViewportPoint(), t) <= Wt.arriveDistance)
        ) {
          (this.cursor.mimicViewportPoint(t, 1, t), this.completeReturn());
          return;
        }
        this.scheduleFollow();
        return;
      }
      if (!(this.mode !== "follow" || !this.target)) {
        if (this.isCursorTooFarFromBrowser()) {
          this.startReturnAfterPause();
          return;
        }
        if (e - this.lastMoveAt > re.idleTimeoutMs) {
          this.startPlayfulIdle(e);
          return;
        }
        (this.applyMomentum(e),
          this.cursor.mimicViewportPoint(
            this.target,
            re.smoothing,
            this.pointer ?? this.target,
          ),
          this.scheduleFollow());
      }
    };
    updateFollowTarget(e) {
      if (!this.isPointInsideViewport(e)) {
        this.startSniffing();
        return;
      }
      if (this.lastPointer) {
        const a = { x: e.x - this.lastPointer.x, y: e.y - this.lastPointer.y },
          i = Math.hypot(a.x, a.y);
        i > 1.5 &&
          ((this.trailDirection = { x: a.x / i, y: a.y / i }),
          (this.velocity = Uu(a, re.maxMomentumStep)));
      }
      const t = {
        x: e.x - this.trailDirection.x * re.trailDistance,
        y: e.y - this.trailDirection.y * re.trailDistance,
      };
      ($e(e, t) < re.minPointerDistance &&
        ((t.x = e.x - this.trailDirection.x * re.minPointerDistance),
        (t.y = e.y - this.trailDirection.y * re.minPointerDistance)),
        (this.target = t),
        (this.pointer = e),
        (this.lastPointer = e));
    }
    startPlayfulIdle(e) {
      if (!this.active || !this.pointer) return;
      const t = this.getCursorViewportPoint();
      ((this.mode = "play"),
        (this.playStartedAt = e),
        (this.playPhase = Math.atan2(
          t.y - this.pointer.y,
          t.x - this.pointer.x,
        )),
        (this.velocity = { x: 0, y: 0 }),
        (this.dismissSamples = []),
        this.scheduleFollow());
    }
    updatePlayTarget(e) {
      if (!this.pointer) return;
      const t = e - this.playStartedAt,
        a = this.playPhase + (t / mt.orbitMs) * Math.PI * 2,
        i = Math.sin((t / mt.bobMs) * Math.PI * 2),
        n = {
          x: this.pointer.x + Math.cos(a) * mt.radiusX,
          y: this.pointer.y + Math.sin(a * 1.28) * mt.radiusY + i * mt.bobY,
        };
      this.target = Ou(
        n,
        this.pointer,
        mt.minPointerDistance,
        mt.viewportInset,
      );
    }
    resumeFollowing(e) {
      ((this.mode = "follow"),
        (this.sniffAnchor = null),
        (this.nextSniffAt = 0),
        (this.sniffIndex = 0),
        (this.playStartedAt = 0),
        (this.playPhase = 0),
        (this.returnAt = 0),
        (this.lastPointer = e),
        this.updateFollowTarget(e),
        (this.dismissSamples = []),
        (this.lastMoveAt = performance.now()));
    }
    startSniffing() {
      if (
        !this.active ||
        this.mode === "sniff" ||
        this.mode === "return" ||
        this.mode === "returnWait"
      )
        return;
      const e = performance.now();
      ((this.mode = "sniff"),
        (this.sniffAnchor = this.getCursorViewportPoint()),
        (this.sniffStartedAt = e),
        (this.nextSniffAt = 0),
        (this.sniffIndex = 0),
        (this.playStartedAt = 0),
        (this.playPhase = 0),
        (this.pointer = null),
        (this.velocity = { x: 0, y: 0 }),
        (this.dismissSamples = []),
        this.scheduleFollow());
    }
    updateSniffTarget(e) {
      if (
        (this.sniffAnchor || (this.sniffAnchor = this.getCursorViewportPoint()),
        this.target && e < this.nextSniffAt)
      )
        return;
      const t = this.sniffIndex,
        a = t * 1.92,
        i = Za.radius * (t % 2 === 0 ? 1 : 0.58);
      ((this.target = {
        x: this.sniffAnchor.x + Math.cos(a) * i,
        y: this.sniffAnchor.y + Math.sin(a) * i * 0.62,
      }),
        (this.sniffIndex += 1),
        (this.nextSniffAt = e + Za.pointIntervalMs));
    }
    applyMomentum(e) {
      !this.target ||
        e - this.lastMoveAt < 48 ||
        Math.hypot(this.velocity.x, this.velocity.y) < re.minMomentum ||
        ((this.target = {
          x: this.target.x + this.velocity.x * re.momentumScale,
          y: this.target.y + this.velocity.y * re.momentumScale,
        }),
        (this.velocity = {
          x: this.velocity.x * re.momentumDecay,
          y: this.velocity.y * re.momentumDecay,
        }));
    }
    startReturnAfterPause(e = re.returnDelayMs) {
      this.active &&
        ((this.mode = "returnWait"),
        (this.target = null),
        (this.pointer = null),
        (this.lastPointer = null),
        (this.returnStart = null),
        (this.returnStartedAt = 0),
        (this.playStartedAt = 0),
        (this.playPhase = 0),
        (this.velocity = { x: 0, y: 0 }),
        (this.dismissSamples = []),
        window.cancelAnimationFrame(this.frame),
        (this.frame = 0),
        (this.returnAt = performance.now() + e),
        this.scheduleFollow());
    }
    beginReturn(e) {
      const t = this.getCursorViewportPoint(),
        a = this.getReturnHomePoint();
      ((this.mode = "return"),
        (this.returnStart = t),
        (this.returnStartedAt = e),
        (this.returnWaveDirection = a.y >= t.y ? 1 : -1),
        (this.target = a));
    }
    getReturnHomePoint() {
      return this.cursor.getHistoryParkViewportPoint();
    }
    getReturnWavePoint(e, t) {
      const a = this.returnStart ?? this.getCursorViewportPoint(),
        i = Lu(e),
        n = t.x - a.x,
        o = t.y - a.y,
        s = Math.hypot(n, o),
        c = { x: a.x + n * i, y: a.y + o * i };
      if (s < 1) return c;
      const l = Math.sin(Math.PI * e),
        d =
          Math.sin(Math.PI * 2 * e) *
          l *
          Wt.waveHeight *
          this.returnWaveDirection;
      return { x: c.x - (o / s) * d, y: c.y + (n / s) * d };
    }
    completeReturn() {
      ((this.active = !1),
        (this.mode = "idle"),
        (this.target = null),
        (this.pointer = null),
        (this.sniffAnchor = null),
        (this.returnStart = null),
        (this.returnStartedAt = 0),
        (this.playStartedAt = 0),
        (this.playPhase = 0),
        (this.lastPointer = null),
        (this.velocity = { x: 0, y: 0 }),
        (this.dismissSamples = []),
        delete this.root.dataset.cursorMimicking,
        window.cancelAnimationFrame(this.frame),
        (this.frame = 0),
        this.cursor.endMimicControl());
    }
    isCursorTooFarFromBrowser() {
      const e = this.getChatShell()?.getBoundingClientRect();
      if (!e) return !1;
      const t = this.root.getBoundingClientRect(),
        a = this.cursor.readPosition(),
        i = { x: t.left + a.x, y: t.top + a.y };
      return Fu(i, e) > re.maxBrowserDistance;
    }
    getChatShell() {
      return this.chatShell?.isConnected
        ? this.chatShell
        : ((this.chatShell = this.root.querySelector("[data-chat-shell]")),
          this.chatShell);
    }
    isPointNearStoryCursor(e, t = Ja.radius) {
      const a = this.root.getBoundingClientRect(),
        i = this.cursor.readPosition(),
        n = { x: a.left + i.x, y: a.top + i.y };
      return $e(e, n) <= t;
    }
    isPointInsideViewport(e) {
      return (
        e.x >= 0 &&
        e.x <= window.innerWidth &&
        e.y >= 0 &&
        e.y <= window.innerHeight
      );
    }
    getCursorViewportPoint() {
      const e = this.root.getBoundingClientRect(),
        t = this.cursor.readPosition();
      return { x: e.left + t.x, y: e.top + t.y };
    }
    pruneSamples(e) {
      this.pruneSampleList(this.samples, e, Ja.sampleWindowMs);
    }
    trackDismissShake(e, t) {
      (this.dismissSamples.push({ ...e, time: t }),
        this.pruneSampleList(this.dismissSamples, t, Et.sampleWindowMs));
    }
    pruneSampleList(e, t, a) {
      let i = 0;
      for (; i < e.length && t - e[i].time > a; ) i += 1;
      i > 0 && e.splice(0, i);
    }
    hasMimicGesture() {
      return this.samples.length < 4
        ? !1
        : this.samples.reduce((t, a, i) => {
            const n = this.samples[i - 1];
            return n ? t + $e(a, n) : t;
          }, 0) >= Ja.minTravel &&
            this.countAxisReversals(this.samples) >= Ja.minAxisReversals;
    }
    hasDismissShake() {
      if (this.dismissSamples.length < 6) return !1;
      for (let e = 0; e <= this.dismissSamples.length - 6; e += 1)
        if (this.isDismissShakeWindow(this.dismissSamples.slice(e))) return !0;
      return !1;
    }
    isDismissShakeWindow(e) {
      const t = e[0],
        a = e[e.length - 1],
        i = Math.max(1, a.time - t.time),
        n = e.reduce((c, l, d) => {
          const u = e[d - 1];
          return u ? c + $e(l, u) : c;
        }, 0),
        o = $e(t, a),
        s = n / Math.max(o, 1);
      return (
        i >= Et.minDurationMs &&
        n >= Et.minTravel &&
        o <= Et.maxNetDistance &&
        n / i >= Et.minAverageSpeed &&
        s >= Et.minTravelToNetRatio &&
        this.countAxisReversals(e) >= Et.minAxisReversals
      );
    }
    countAxisReversals(e) {
      let t = 0,
        a = 0,
        i = 0;
      for (let n = 1; n < e.length; n += 1) {
        const o = e[n - 1],
          s = e[n],
          c = ts(s.x - o.x),
          l = ts(s.y - o.y);
        (c && a && c !== a && (t += 1),
          l && i && l !== i && (t += 1),
          c && (a = c),
          l && (i = l));
      }
      return t;
    }
  }
  function $e(r, e) {
    return Math.hypot(e.x - r.x, e.y - r.y);
  }
  function $o(r) {
    return Math.min(1, Math.max(0, r));
  }
  function pn(r, e, t) {
    return Math.min(t, Math.max(e, r));
  }
  function Lu(r) {
    return -(Math.cos(Math.PI * r) - 1) / 2;
  }
  function es(r, e) {
    return {
      x: pn(r.x, e, window.innerWidth - e),
      y: pn(r.y, e, window.innerHeight - e),
    };
  }
  function Ou(r, e, t, a) {
    const i = es(Nu(r, e, t), a);
    if ($e(i, e) >= t * 0.86) return i;
    const n = {
        x: window.innerWidth / 2 - e.x,
        y: window.innerHeight / 2 - e.y,
      },
      o = Math.hypot(n.x, n.y) || 1;
    return es({ x: e.x + (n.x / o) * t, y: e.y + (n.y / o) * t }, a);
  }
  function Nu(r, e, t) {
    const a = r.x - e.x,
      i = r.y - e.y,
      n = Math.hypot(a, i);
    if (n >= t) return r;
    const o = -Math.PI * 0.28,
      s = n > 0.01 ? a / n : Math.cos(o),
      c = n > 0.01 ? i / n : Math.sin(o);
    return { x: e.x + s * t, y: e.y + c * t };
  }
  function Fu(r, e) {
    const t = Math.max(e.left - r.x, 0, r.x - e.right),
      a = Math.max(e.top - r.y, 0, r.y - e.bottom);
    return Math.hypot(t, a);
  }
  function Uu(r, e) {
    const t = Math.hypot(r.x, r.y);
    return t <= e || t === 0 ? r : { x: (r.x / t) * e, y: (r.y / t) * e };
  }
  function ts(r) {
    return Math.abs(r) < 2 ? 0 : Math.sign(r);
  }
  const as = { minPixelDelta: 0.5 },
    zu = { resumeDelay: 0.08 },
    Hu = {
      duration: 0.52,
      curve: 0.1,
      ease: "sine.inOut",
      overshoot: !1,
      settle: !1,
    },
    Vu = "chatbotStoriesTheme",
    Gu = new Set(["light", "dark", "system"]),
    Qu = [
      "a[href]",
      "button",
      "input",
      "select",
      "textarea",
      "summary",
      "[role='button']",
      "[role='link']",
      "[contenteditable='true']",
      "[data-story-scrubber]",
      "[data-story-tab]",
      "[data-history-resume]",
      "[data-toggle-play]",
      ".wa-story-tab__link",
      ".wa-thinking",
      ".wa-research-step__label-row",
      ".wa-research-step__chevron",
    ].join(",");
  class Yu {
    constructor(e, t, a, i, n, o) {
      ((this.root = e),
        (this.stories = t),
        (this.resolver = a),
        (this.cursor = i),
        (this.chat = n),
        (this.options = o),
        (this.storyProgress = this.stories.map(() => 0)),
        (this.pausedCursorMimic = new Bu(this.root, this.cursor, {
          onMimicStart: () => this.cancelHistoryParkMotion(),
        })));
    }
    root;
    stories;
    resolver;
    cursor;
    chat;
    options;
    activeIndex = 0;
    activeTimeline = null;
    autoAdvance = null;
    seekTween = null;
    activeTimelineStartPoint = null;
    resumeRestoreTimeline = null;
    storySwitchTimeline = null;
    resizeObserver = null;
    resizeTimer = 0;
    observedWidth = 0;
    observedHeight = 0;
    listeners = [];
    storyProgress;
    historyParkTimeline = null;
    pausedCursorMimic = null;
    storyTabButtons = [];
    scrubber = null;
    playButton = null;
    resumeButton = null;
    themePreference = "system";
    systemThemeQuery = null;
    playing = !1;
    historyPaused = !1;
    storyTabListeners = [];
    storyProgressScrub = null;
    mount() {
      (this.attachControls(),
        this.observeLayout(),
        this.goTo(this.options.initialStory ?? 0));
    }
    play() {
      const e = this.historyPaused,
        t = this.pausedCursorMimic?.releaseToIdle() ?? null;
      if (
        (this.seekTween?.kill(),
        (this.seekTween = null),
        this.setHistoryPaused(!1, { preserveActiveMimic: !!t }),
        this.chat.collapsePausedThinkingInteractions(),
        this.chat.scrollToLive(),
        (this.playing = !0),
        this.updatePlayButton(),
        t)
      ) {
        ((this.resumeRestoreTimeline = g.timeline({
          onComplete: () => {
            ((this.resumeRestoreTimeline = null),
              this.playing && this.resumePlaybackAfterPlayRequest(e));
          },
        })),
          this.resumeRestoreTimeline.add(t));
        return;
      }
      this.resumePlaybackAfterPlayRequest(e);
    }
    resumePlaybackAfterPlayRequest(e) {
      (e && this.restoreDataTablePagesBeforePlay()) ||
        this.resumeActiveTimeline();
    }
    pause() {
      (this.setHistoryPaused(!1),
        (this.playing = !1),
        this.activeTimeline?.pause(),
        this.chat.stopScrollMotion(),
        this.autoAdvance?.kill(),
        this.seekTween?.kill(),
        (this.seekTween = null),
        this.parkCursorForPausedPlayback(),
        this.updatePlayButton(),
        this.resumeRestoreTimeline?.kill(),
        (this.resumeRestoreTimeline = null));
    }
    restoreDataTablePagesBeforePlay() {
      if (!this.activeTimeline) return !1;
      const e = this.chat.getDataTablePageRestores();
      if (!e.length) return !1;
      const t = g.timeline({
        onComplete: () => {
          ((this.resumeRestoreTimeline = null),
            this.playing && this.resumeActiveTimeline());
        },
      });
      return (
        e.forEach((a, i) => {
          const n = i === 0 ? 0 : ">";
          t.add(this.buildDataTablePageRestore(a), n);
        }),
        (this.resumeRestoreTimeline = t),
        !0
      );
    }
    buildDataTablePageRestore(e) {
      const t = g.timeline();
      return (
        t
          .add(
            this.cursor.moveTo(
              { target: e.target, anchor: "center" },
              {
                mode: "pointer",
                intent: "click",
                speed: "quick",
                ...Hu,
                label: `restore-${e.tableId}-page-${e.expectedPage}`,
              },
            ),
          )
          .add(this.cursor.click(), "+=0.04")
          .add(
            this.chat.dataTablePage(e.tableId, e.expectedPage, {
              updateExpected: !1,
            }),
            "-=0.02",
          ),
        t
      );
    }
    next() {
      const e = this.activeIndex + 1;
      if (e >= this.stories.length) {
        (this.options.loop && this.resetStoryProgress(),
          this.goTo(this.options.loop ? 0 : this.activeIndex));
        return;
      }
      this.goTo(e);
    }
    previous() {
      const e = this.activeIndex - 1;
      if (e < 0) {
        this.goTo(
          this.options.loop ? this.stories.length - 1 : this.activeIndex,
        );
        return;
      }
      this.goTo(e);
    }
    updateStories(e, t = {}) {
      if (!e.length) return;
      const a = this.stories[this.activeIndex]?.id,
        i = this.stories,
        n = new Map(
          this.stories.map((l, d) => [l.id, this.storyProgress[d] ?? 0]),
        ),
        o = this.cursor.getPosition(),
        s = this.playing,
        c = Wu(i, e);
      if (
        ((this.stories = e),
        (this.storyProgress = this.stories.map((l) => n.get(l.id) ?? 0)),
        (this.activeIndex = Math.max(
          0,
          this.resolveStoryIndex(a ?? this.stories[0].id),
        )),
        c && this.renderStoryTabs(),
        t.restartActive)
      ) {
        (this.stopTimeline(),
          this.setHistoryPaused(!1),
          this.rebuildActiveStoryTimeline(this.activeIndex, o),
          (this.playing = s || this.options.autoplay),
          this.updatePlayButton(),
          this.playing && this.activeTimeline?.play());
        return;
      }
      (this.updateStoryMeta(),
        this.updateAllTabProgress(),
        ho(this.stories, this.activeIndex, this.options.resolveAssetUrl));
    }
    goTo(e, t = {}) {
      const a = this.resolveStoryIndex(e);
      a < 0 || !this.stories[a] || this.transitionToStory(a, t);
    }
    transitionToStory(e, t = {}) {
      const a = this.cursor.getPosition(),
        i = !!(t.animateExit && this.activeTimeline),
        n = !!(t.preservePlayback && this.playing);
      if (
        ((this.storyProgress[e] = 0),
        this.storySwitchTimeline?.kill(),
        (this.storySwitchTimeline = null),
        this.stopTimeline(),
        this.setHistoryPaused(!1),
        !i)
      ) {
        this.activateStory(e, a);
        return;
      }
      ((this.playing = n),
        this.updatePlayButton(),
        (this.storySwitchTimeline = g.timeline({
          onComplete: () => {
            ((this.storySwitchTimeline = null), this.activateStory(e, a));
          },
        })),
        this.storySwitchTimeline.add(this.chat.animateStorySwitchExit()));
    }
    activateStory(e, t) {
      (this.rebuildActiveStoryTimeline(e, t),
        (this.playing = this.options.autoplay),
        this.updatePlayButton(),
        this.options.onStoryChange?.(
          this.stories[this.activeIndex],
          this.activeIndex,
        ),
        this.options.autoplay && this.activeTimeline?.play());
    }
    destroy() {
      (this.storySwitchTimeline?.kill(),
        (this.storySwitchTimeline = null),
        this.stopTimeline(),
        this.pausedCursorMimic?.destroy(),
        this.resizeObserver?.disconnect(),
        window.clearTimeout(this.resizeTimer),
        this.clearStoryTabListeners());
      for (const e of this.listeners) e();
      this.listeners = [];
    }
    getState() {
      return {
        story: this.stories[this.activeIndex],
        index: this.activeIndex,
        progress: this.activeTimeline?.progress() ?? 0,
        playing: this.playing,
      };
    }
    buildTimeline(e, t = this.cursor.getPosition()) {
      const a = this.stories[e];
      ((this.root.dataset.activeStory = a.id),
        this.chat.reset(),
        this.resolver.refresh(),
        this.cursor.beginBuild(t, a.id));
      const i = {
        root: this.root,
        story: a,
        resolver: this.resolver,
        cursor: this.cursor,
        chat: this.chat,
        timeline: () => g.timeline(),
      };
      (a.prepare?.(i), this.resolver.refresh());
      const n = g.timeline({
          paused: !0,
          onUpdate: () => this.updateProgress(),
          onComplete: () => this.handleComplete(),
        }),
        o = this.cursor.moveTo(a.entry, {
          mode: "text",
          intent: "entry",
          speed: "normal",
          label: "story-entry",
        }),
        s = a.build(i),
        c = a.entryLeadTime ?? 0.24;
      return (
        n.add(o, 0),
        s.pause(0),
        n.add(s, Math.max(0, o.duration() - c)),
        s.paused(!1),
        this.chat.prepareStoryStart(),
        n
      );
    }
    rebuildActiveStoryTimeline(e, t, a = 0) {
      ((this.activeIndex = e),
        ho(this.stories, this.activeIndex, this.options.resolveAssetUrl),
        (this.activeTimelineStartPoint = t),
        (this.activeTimeline = this.buildTimeline(this.activeIndex, t)),
        this.renderActiveTimelineProgress(a),
        this.updateStoryMeta());
    }
    stopTimeline() {
      (this.autoAdvance?.kill(),
        this.seekTween?.kill(),
        (this.seekTween = null),
        this.resumeRestoreTimeline?.kill(),
        (this.resumeRestoreTimeline = null),
        this.cancelHistoryParkMotion(),
        this.pausedCursorMimic?.setPaused(!1),
        this.activeTimeline?.kill(),
        (this.activeTimeline = null),
        this.cursor.resetInteraction());
    }
    handleComplete() {
      if (
        !(
          this.playing &&
          this.options.autoplay &&
          (this.options.loop || this.activeIndex < this.stories.length - 1)
        )
      ) {
        ((this.playing = !1), this.updatePlayButton());
        return;
      }
      (this.autoAdvance?.kill(),
        (this.autoAdvance = g.delayedCall(this.options.autoAdvanceDelay, () => {
          const t = this.activeIndex + 1;
          if (t >= this.stories.length) {
            (this.options.loop && this.resetStoryProgress(),
              this.goTo(this.options.loop ? 0 : this.activeIndex, {
                animateExit: !0,
                preservePlayback: !0,
              }));
            return;
          }
          this.goTo(t, { animateExit: !0, preservePlayback: !0 });
        })));
    }
    seekTo(e) {
      if (!this.activeTimeline) return;
      const t = this.playing;
      (this.autoAdvance?.kill(),
        this.seekTween?.kill(),
        (this.seekTween = null),
        this.setHistoryPaused(!1),
        this.chat.stopScrollMotion(),
        this.cursor.clearTransientInteraction(),
        (this.playing = t),
        this.renderActiveTimelineProgress(e),
        t &&
          (this.seekTween = g.delayedCall(zu.resumeDelay, () => {
            ((this.seekTween = null),
              this.playing && this.resumeActiveTimeline(),
              this.updatePlayButton());
          })),
        this.updatePlayButton());
    }
    updateStoryMeta() {
      const e = this.stories[this.activeIndex];
      (this.setText("[data-story-eyebrow]", e.eyebrow),
        this.setText("[data-story-label]", e.label),
        this.setText("[data-story-title]", e.label),
        this.setText("[data-story-summary]", e.summary),
        this.setText(
          "[data-story-count]",
          `${this.activeIndex + 1} / ${this.stories.length}`,
        ));
      for (const t of this.storyTabButtons) {
        const a = t.dataset.storyTab === e.id;
        (t.classList.toggle("is-active", a),
          t.setAttribute("aria-pressed", String(a)));
      }
    }
    updateProgress() {
      const e = this.activeTimeline?.progress() ?? 0;
      ((this.storyProgress[this.activeIndex] = e),
        this.root.style.setProperty("--wa-story-progress", e.toFixed(4)),
        this.updateTabProgress(this.activeIndex),
        this.scrubber &&
          document.activeElement !== this.scrubber &&
          (this.scrubber.value = String(Math.round(e * 1e3))));
    }
    updatePlayButton() {
      const e = this.playButton;
      ((this.root.dataset.storyPaused = String(!this.playing)),
        this.syncPausedCursorMimic(),
        this.updateResumeButtonVisibility(),
        e &&
          ((e.textContent = this.playing ? "Pause" : "Play"),
          e.setAttribute(
            "aria-label",
            this.playing ? "Pause animation" : "Play animation",
          )));
    }
    attachControls() {
      (this.renderStoryTabs(),
        (this.scrubber = this.root.querySelector("[data-story-scrubber]")),
        (this.playButton = this.root.querySelector("[data-toggle-play]")),
        (this.resumeButton = this.root.querySelector("[data-history-resume]")),
        this.attachTheme(),
        this.on("[data-prev-story]", "click", () => this.previous()),
        this.on("[data-next-story]", "click", () => this.next()),
        this.on("[data-toggle-play]", "click", () => {
          this.playing ? this.pause() : this.play();
        }),
        this.on("[data-history-resume]", "click", () => this.play()),
        this.onRoot(Gr, (e) => {
          (e.preventDefault(), this.playing && this.pauseForChatHistory());
        }),
        this.onRoot("click", (e) => this.handlePlaybackSurfaceClick(e)),
        this.on("[data-story-scrubber]", "input", (e) => {
          const t = e.currentTarget;
          this.seekTo(Number(t.value) / 1e3);
        }),
        this.attachChatHistoryScroll());
    }
    handlePlaybackSurfaceClick(e) {
      if (
        !(e.defaultPrevented || e.button !== 0) &&
        e.target instanceof Element &&
        !this.isPlaybackInteractiveClickTarget(e.target)
      ) {
        if (this.playing) {
          this.isFakeBrowserClickTarget(e.target) && this.pause();
          return;
        }
        this.play();
      }
    }
    isPlaybackInteractiveClickTarget(e) {
      return !!e.closest(Qu);
    }
    isFakeBrowserClickTarget(e) {
      return !!e.closest(".wa-window, [data-chat-shell]");
    }
    attachTheme() {
      if (
        ((this.systemThemeQuery =
          window.matchMedia?.("(prefers-color-scheme: dark)") ?? null),
        (this.themePreference = this.getInitialThemePreference()),
        this.applyThemePreference(this.themePreference),
        this.systemThemeQuery)
      ) {
        const e = this.systemThemeQuery,
          t = () => this.applyThemePreference(this.themePreference);
        (e.addEventListener("change", t),
          this.listeners.push(() => e.removeEventListener("change", t)));
      }
    }
    getInitialThemePreference() {
      return (
        this.readStoredThemePreference() ??
        this.readRootThemePreference() ??
        "system"
      );
    }
    readStoredThemePreference() {
      try {
        const e = window.localStorage?.getItem(Vu);
        return this.normalizeThemePreference(e);
      } catch {
        return null;
      }
    }
    readRootThemePreference() {
      return this.normalizeThemePreference(this.root.dataset.theme);
    }
    normalizeThemePreference(e) {
      return Gu.has(e) ? e : null;
    }
    applyThemePreference(e) {
      const t = this.resolveTheme(e);
      ((this.root.dataset.theme = e),
        (this.root.dataset.resolvedTheme = t),
        document.documentElement.style.setProperty(
          "--wa-page-bg",
          t === "dark" ? "#10100d" : "#fffff9",
        ),
        (document.documentElement.style.colorScheme = t));
    }
    resolveTheme(e) {
      return e !== "system"
        ? e
        : this.systemThemeQuery?.matches
          ? "dark"
          : "light";
    }
    createStoryTab(e, t) {
      const a = document.createElement("div");
      ((a.className = "wa-story-tab"),
        (a.dataset.storyTab = e.id),
        a.style.setProperty("--wa-tab-progress", "0"),
        a.setAttribute("role", "button"),
        a.setAttribute("tabindex", "0"),
        a.setAttribute("aria-pressed", "false"));
      const i = (u) => {
          const h = u.target instanceof Element ? u.target : null;
          if (!h?.closest(".wa-story-tab__link")) {
            if (h?.closest(".wa-story-tab__marker")) {
              u.preventDefault();
              return;
            }
            this.goTo(t);
          }
        },
        n = (u) => {
          (u.target instanceof Element ? u.target : null)?.closest(
            ".wa-story-tab__link",
          ) ||
            (u.key !== "Enter" && u.key !== " ") ||
            (u.preventDefault(), this.goTo(t));
        };
      (a.addEventListener("click", i),
        a.addEventListener("keydown", n),
        this.storyTabListeners.push(() => a.removeEventListener("click", i)),
        this.storyTabListeners.push(() => a.removeEventListener("keydown", n)));
      const o = document.createElement("span");
      ((o.className = "wa-story-tab__marker"),
        o.setAttribute("aria-hidden", "true"));
      const s = (u) => this.beginStoryProgressScrub(u, t, o);
      (o.addEventListener("pointerdown", s),
        this.storyTabListeners.push(() =>
          o.removeEventListener("pointerdown", s),
        ));
      const c = document.createElement("span");
      c.className = "wa-story-tab__body";
      const l = document.createElement("span");
      ((l.className = "wa-story-tab__count"),
        (l.textContent = `${t + 1} / ${this.stories.length}`));
      const d = document.createElement("span");
      if (
        ((d.className = "wa-story-tab__title"),
        (d.textContent = e.navLabel ?? e.label),
        c.append(l, d),
        e.navDescription || e.summary)
      ) {
        const u = document.createElement("span");
        ((u.className = "wa-story-tab__description"),
          this.appendStoryDescriptionContent(u, e),
          c.append(u));
      }
      return (a.append(o, c), a);
    }
    appendStoryDescriptionContent(e, t) {
      const a = t.navDescription ?? t.summary ?? "",
        i = t.navDescriptionLink,
        n = i ? a.indexOf(i.text) : -1;
      if (!i || n < 0) {
        e.textContent = a;
        return;
      }
      const o = document.createElement("a");
      ((o.className = "wa-story-tab__link"),
        (o.href = i.href),
        (o.target = "_blank"),
        (o.rel = "noopener noreferrer"),
        (o.textContent = i.text),
        o.setAttribute("aria-label", i.ariaLabel ?? i.text),
        e.append(
          document.createTextNode(a.slice(0, n)),
          o,
          document.createTextNode(a.slice(n + i.text.length)),
        ));
    }
    renderStoryTabs() {
      const e = this.root.querySelector("[data-story-tabs]");
      if ((this.clearStoryTabListeners(), !e)) {
        this.storyTabButtons = [];
        return;
      }
      ((this.storyTabButtons = this.stories.map((t, a) =>
        this.createStoryTab(t, a),
      )),
        e.replaceChildren(...this.storyTabButtons),
        this.updateAllTabProgress());
    }
    clearStoryTabListeners() {
      this.endStoryProgressScrub(!1);
      for (const e of this.storyTabListeners) e();
      this.storyTabListeners = [];
    }
    beginStoryProgressScrub(e, t, a) {
      (e.preventDefault(), e.stopPropagation(), this.endStoryProgressScrub(!1));
      const i = this.playing,
        n = (l) => {
          l.pointerId === e.pointerId &&
            (l.preventDefault(), this.scrubStoryProgress(t, a, l));
        },
        o = (l) => {
          l.pointerId === e.pointerId &&
            (l.preventDefault(), this.endStoryProgressScrub(!0));
        },
        s = () => {
          (window.removeEventListener("pointermove", n),
            window.removeEventListener("pointerup", o),
            window.removeEventListener("pointercancel", o));
        },
        c = this.getMarkerTrack(a);
      ((this.storyProgressScrub = {
        storyIndex: t,
        wasPlaying: i,
        pointerId: e.pointerId,
        marker: a,
        ...c,
        removeListeners: s,
      }),
        (a.dataset.scrubbing = "true"),
        window.addEventListener("pointermove", n, { passive: !1 }),
        window.addEventListener("pointerup", o, { passive: !1 }),
        window.addEventListener("pointercancel", o, { passive: !1 }),
        this.scrubStoryProgress(t, a, e));
    }
    scrubStoryProgress(e, t, a) {
      const i = this.getMarkerProgress(t, a, this.storyProgressScrub);
      (this.activateStoryForProgressScrub(e),
        this.setActiveTimelineProgress(i));
    }
    activateStoryForProgressScrub(e) {
      if (e === this.activeIndex && this.activeTimeline) {
        this.prepareActiveTimelineForProgressScrub();
        return;
      }
      const t = this.cursor.getPosition(),
        a = this.storyProgressScrub?.wasPlaying ?? this.playing;
      (this.stopTimeline(),
        (this.activeIndex = e),
        (this.activeTimelineStartPoint = t),
        (this.activeTimeline = this.buildTimeline(this.activeIndex, t)),
        (this.playing = a),
        this.updateStoryMeta(),
        this.options.onStoryChange?.(
          this.stories[this.activeIndex],
          this.activeIndex,
        ),
        this.prepareActiveTimelineForProgressScrub());
    }
    prepareActiveTimelineForProgressScrub() {
      (this.autoAdvance?.kill(),
        this.seekTween?.kill(),
        (this.seekTween = null),
        this.resumeRestoreTimeline?.kill(),
        (this.resumeRestoreTimeline = null),
        this.setHistoryPaused(!1),
        this.chat.stopScrollMotion(),
        this.cursor.clearTransientInteraction(),
        this.activeTimeline?.pause(),
        this.updatePlayButton());
    }
    setActiveTimelineProgress(e) {
      this.activeTimeline && this.renderActiveTimelineProgress(e);
    }
    renderActiveTimelineProgress(e) {
      if (!this.activeTimeline) return;
      const t = gn(e);
      if (this.shouldRebuildTimelineForSeek(t)) {
        this.rebuildTimelineForDeterministicSeek(t);
        return;
      }
      (this.activeTimeline.progress(t, !1).pause(), this.updateProgress());
    }
    shouldRebuildTimelineForSeek(e) {
      const t = this.activeTimeline?.progress() ?? 0;
      return e < t - 0.002;
    }
    rebuildTimelineForDeterministicSeek(e) {
      const t = this.activeIndex,
        a = this.activeTimelineStartPoint ?? this.cursor.getPosition(),
        i = this.playing;
      (this.stopTimeline(),
        (this.activeIndex = t),
        (this.activeTimelineStartPoint = a),
        (this.activeTimeline = this.buildTimeline(this.activeIndex, a)),
        (this.playing = i),
        this.activeTimeline.progress(e, !1).pause(),
        this.updateProgress(),
        this.updateStoryMeta());
    }
    resumeActiveTimeline() {
      const e = this.activeTimeline;
      if (e) {
        if (this.isTimelineAtEnd(e)) {
          this.handleComplete();
          return;
        }
        e.play();
      }
    }
    isTimelineAtEnd(e) {
      const t = e.duration();
      return t <= 0 || e.time() >= t - 0.001 || e.progress() >= 0.999999;
    }
    endStoryProgressScrub(e) {
      const t = this.storyProgressScrub;
      t &&
        (t.removeListeners(),
        t.marker.removeAttribute("data-scrubbing"),
        (this.storyProgressScrub = null),
        (this.playing = e ? t.wasPlaying : this.playing),
        this.cursor.clearTransientInteraction(),
        e && t.wasPlaying
          ? this.resumeActiveTimeline()
          : this.activeTimeline?.pause(),
        this.updatePlayButton());
    }
    getMarkerProgress(e, t, a = null) {
      if (a?.marker === e && a.trackLength > 0) {
        const o = a.trackAxis === "x" ? t.clientX : t.clientY;
        return gn((o - a.trackStart) / a.trackLength);
      }
      const i = this.getMarkerTrack(e);
      if (i.trackLength <= 0) return 0;
      const n = i.trackAxis === "x" ? t.clientX : t.clientY;
      return gn((n - i.trackStart) / i.trackLength);
    }
    getMarkerTrack(e) {
      const t = e.getBoundingClientRect(),
        a = t.width > t.height ? "x" : "y";
      return {
        trackAxis: a,
        trackStart: a === "x" ? t.left : t.top,
        trackLength: Math.max(0, a === "x" ? t.width : t.height),
      };
    }
    attachChatHistoryScroll() {
      const e = this.root.querySelector("[data-chat-shell]"),
        t = this.root.querySelector("[data-chat-thread]");
      if (!e || !t) return;
      const a = (i) => {
        if (!this.activeTimeline || Math.abs(i.deltaX) > Math.abs(i.deltaY))
          return;
        const n = this.getWheelPixelDelta(i);
        if (Math.abs(n) < as.minPixelDelta) return;
        const o = this.getThreadMaxScroll(t);
        if (o <= 0 || !(n < 0 || this.historyPaused)) return;
        const c = is(t.scrollTop + n, 0, o);
        if (!(Math.abs(c - t.scrollTop) >= 0.5)) return;
        const d = Math.max(0, n - (o - t.scrollTop));
        (i.preventDefault(),
          this.pauseForChatHistory(),
          (t.scrollTop = c),
          d >= as.minPixelDelta &&
            window.scrollBy({ top: d, left: 0, behavior: "auto" }));
      };
      (e.addEventListener("wheel", a, { passive: !1 }),
        this.listeners.push(() => e.removeEventListener("wheel", a)));
    }
    getWheelPixelDelta(e) {
      return e.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? e.deltaY * 16
        : e.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? e.deltaY * window.innerHeight
          : e.deltaY;
    }
    pauseForChatHistory() {
      this.historyPaused ||
        ((this.playing = !1),
        this.autoAdvance?.kill(),
        this.seekTween?.kill(),
        (this.seekTween = null),
        this.activeTimeline?.pause(),
        this.chat.stopScrollMotion(),
        this.chat.prepareForChatHistoryPause(),
        this.parkCursorForPausedPlayback(),
        this.setHistoryPaused(!0),
        this.updatePlayButton());
    }
    parkCursorForPausedPlayback() {
      (this.cursor.clearTransientInteraction(),
        this.cancelHistoryParkMotion(),
        (this.historyParkTimeline = this.cursor.parkForChatHistory()));
    }
    setHistoryPaused(e, t = {}) {
      (e ||
        (t.preserveActiveMimic || this.pausedCursorMimic?.setPaused(!1),
        this.cancelHistoryParkMotion()),
        (this.historyPaused = e),
        (this.root.dataset.chatHistoryPaused = String(e)),
        (e || !t.preserveActiveMimic) && this.pausedCursorMimic?.setPaused(e),
        this.updateResumeButtonVisibility());
    }
    updateResumeButtonVisibility() {
      const e = this.resumeButton,
        t = !this.playing || this.historyPaused;
      e &&
        (e.setAttribute("aria-hidden", String(!t)), (e.tabIndex = t ? 0 : -1));
    }
    syncPausedCursorMimic() {
      const e = !!(this.activeTimeline && !this.storySwitchTimeline);
      this.pausedCursorMimic?.setPaused(
        e && (!this.playing || this.historyPaused),
      );
    }
    cancelHistoryParkMotion() {
      (this.historyParkTimeline?.kill(), (this.historyParkTimeline = null));
    }
    getThreadMaxScroll(e) {
      return Math.max(0, e.scrollHeight - e.clientHeight);
    }
    observeLayout() {
      if (!("ResizeObserver" in window)) return;
      const e = this.root.getBoundingClientRect();
      ((this.observedWidth = e.width),
        (this.observedHeight = e.height),
        (this.resizeObserver = new ResizeObserver((t) => {
          const a = t[0]?.contentRect;
          !a ||
            !this.didObservedSizeChange(a.width, a.height) ||
            (window.clearTimeout(this.resizeTimer),
            (this.resizeTimer = window.setTimeout(
              () => this.rebuildForResize(),
              140,
            )));
        })),
        this.resizeObserver.observe(this.root));
    }
    didObservedSizeChange(e, t) {
      const a = Math.abs(e - this.observedWidth) > 1,
        i = Math.abs(t - this.observedHeight) > 1;
      return !a && !i
        ? !1
        : ((this.observedWidth = e), (this.observedHeight = t), !0);
    }
    rebuildForResize() {
      if (!this.activeTimeline) return;
      const e = this.activeTimeline.progress(),
        t = this.playing,
        a = this.cursor.getPosition();
      (this.stopTimeline(),
        this.rebuildActiveStoryTimeline(this.activeIndex, a, e),
        t && this.play());
    }
    updateAllTabProgress() {
      this.storyTabButtons.forEach((e, t) => {
        e.style.setProperty(
          "--wa-tab-progress",
          this.storyProgress[t]?.toFixed(4) ?? "0",
        );
      });
    }
    updateTabProgress(e) {
      const t = this.storyTabButtons[e];
      t &&
        t.style.setProperty(
          "--wa-tab-progress",
          this.storyProgress[e]?.toFixed(4) ?? "0",
        );
    }
    resetStoryProgress() {
      (this.storyProgress.fill(0), this.updateAllTabProgress());
    }
    resolveStoryIndex(e) {
      return typeof e == "number"
        ? e
        : this.stories.findIndex((t) => t.id === e);
    }
    setText(e, t) {
      const a = this.root.querySelector(e);
      a && (a.textContent = t);
    }
    on(e, t, a) {
      const i = this.root.querySelector(e);
      i &&
        (i.addEventListener(t, a),
        this.listeners.push(() => i.removeEventListener(t, a)));
    }
    onRoot(e, t) {
      (this.root.addEventListener(e, t),
        this.listeners.push(() => this.root.removeEventListener(e, t)));
    }
  }
  function is(r, e, t) {
    return Math.min(t, Math.max(e, r));
  }
  function gn(r) {
    return is(r, 0, 1);
  }
  function Wu(r, e) {
    return r.length !== e.length
      ? !0
      : e.some((t, a) => {
          const i = r[a];
          return (
            !i ||
            i.id !== t.id ||
            i.label !== t.label ||
            i.navLabel !== t.navLabel ||
            i.summary !== t.summary ||
            i.navDescription !== t.navDescription ||
            !ju(i.navDescriptionLink, t.navDescriptionLink)
          );
        });
  }
  function ju(r, e) {
    return (
      r?.text === e?.text &&
      r?.href === e?.href &&
      r?.ariaLabel === e?.ariaLabel
    );
  }
  const $a = ["mobile", "tablet", "desktop", "wide"];
  class Ku {
    constructor(e) {
      this.root = e;
    }
    root;
    rootRect = null;
    refresh() {
      this.rootRect = this.root.getBoundingClientRect();
    }
    getBreakpoint() {
      const e = this.getRootRect().width;
      return e < 680
        ? "mobile"
        : e < 980
          ? "tablet"
          : e < 1280
            ? "desktop"
            : "wide";
    }
    resolve(e, t = "target") {
      const a = this.pickTarget(e),
        i = this.getRootRect();
      if (typeof a.x == "number" && typeof a.y == "number" && !a.target)
        return { x: a.x + (a.offset?.x ?? 0), y: a.y + (a.offset?.y ?? 0) };
      const n = this.findElement(a.target);
      if (!n) return this.resolveFallbackPoint(a, i);
      const o = n.getBoundingClientRect();
      let s = this.anchorPoint(o, a.anchor ?? "center");
      if (
        ((s = { x: s.x - i.left, y: s.y - i.top }),
        a.outside && (s = this.outsidePoint(s, o, i, a.outside)),
        a.humanOffset)
      ) {
        const c = so(t),
          l = Math.min(o.width * 0.18, 18),
          d = Math.min(o.height * 0.18, 14);
        ((s.x += (c() - 0.5) * l), (s.y += (c() - 0.5) * d));
      }
      return { x: s.x + (a.offset?.x ?? 0), y: s.y + (a.offset?.y ?? 0) };
    }
    getRootRect() {
      return (this.rootRect || this.refresh(), this.rootRect);
    }
    pickTarget(e) {
      if (this.isBreakpointMap(e)) {
        const t = this.getBreakpoint(),
          a = $a.indexOf(t),
          i = [t, ...$a.slice(0, a).reverse(), ...$a.slice(a + 1)];
        for (const n of i) if (e[n]) return e[n];
        return {};
      }
      return e;
    }
    isBreakpointMap(e) {
      return $a.some((t) => t in e);
    }
    findElement(e) {
      return e
        ? e instanceof HTMLElement
          ? e
          : this.root.querySelector(e)
        : this.getMotionFallbackElement();
    }
    getMotionFallbackElement() {
      return (
        this.root.querySelector("[data-chat-shell]") ??
        this.root.querySelector(".wa-stage") ??
        this.root
      );
    }
    resolveFallbackPoint(e, t) {
      const a = this.getMotionFallbackElement().getBoundingClientRect();
      let i = this.anchorPoint(a, e.anchor ?? "center");
      return (
        (i = { x: i.x - t.left, y: i.y - t.top }),
        e.outside && (i = this.outsidePoint(i, a, t, e.outside)),
        { x: i.x + (e.offset?.x ?? 0), y: i.y + (e.offset?.y ?? 0) }
      );
    }
    anchorPoint(e, t) {
      const a = e.left + e.width * 0.5,
        i = e.top + e.height * 0.5;
      switch (t) {
        case "topLeft":
          return { x: e.left, y: e.top };
        case "topRight":
          return { x: e.right, y: e.top };
        case "bottomLeft":
          return { x: e.left, y: e.bottom };
        case "bottomRight":
          return { x: e.right, y: e.bottom };
        case "left":
          return { x: e.left, y: i };
        case "right":
          return { x: e.right, y: i };
        case "top":
          return { x: a, y: e.top };
        case "bottom":
          return { x: a, y: e.bottom };
        default:
          return { x: a, y: i };
      }
    }
    outsidePoint(e, t, a, i) {
      const n = t.left - a.left,
        o = t.right - a.left,
        s = t.top - a.top,
        c = t.bottom - a.top;
      switch (i) {
        case "left":
          return { ...e, x: n - 42 };
        case "right":
          return { ...e, x: o + 42 };
        case "top":
          return { ...e, y: s - 42 };
        case "bottom":
          return { ...e, y: c + 42 };
        default:
          return e;
      }
    }
  }
  function Xu(r, e = {}) {
    const t = e.stories?.length ? e.stories : hn,
      a = e.builderDraftEndpoint ?? (e.showBuilder ? "/api/story-draft" : !1),
      i = ac(e);
    ic(r, i);
    const n =
        e.reducedMotion ??
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        !1,
      o = new Ku(r),
      s = new Oc(r, { resolveAssetUrl: i }),
      c = new Yc(r, o, { reducedMotion: n }),
      l = new Yu(r, t, o, c, s, {
        autoplay: e.autoplay ?? !0,
        loop: e.loop ?? !0,
        autoAdvanceDelay: e.autoAdvanceDelay ?? 0.35,
        initialStory: e.initialStory ?? 0,
        onStoryChange: e.onStoryChange,
        resolveAssetUrl: i,
      });
    return {
      stories: t,
      draftEndpoint: a,
      controller: l,
      chat: s,
      cursor: c,
      applyBuilderStories: (u, h = {}) => {
        l.updateStories(Bd(u, t), { restartActive: h.source === "load" });
      },
      toInstance: (u) => ({
        play: l.play.bind(l),
        pause: l.pause.bind(l),
        next: l.next.bind(l),
        previous: l.previous.bind(l),
        goTo: l.goTo.bind(l),
        getState: l.getState.bind(l),
        destroy: () => {
          (u?.(), l.destroy(), s.destroy(), c.destroy());
        },
      }),
    };
  }
  const Ju = 3,
    Zu = new Set([
      "user",
      "assistant",
      "thinking",
      "component",
      "cursor",
      "status",
      "file",
    ]);
  function $u(r) {
    if (!et(r) || !Array.isArray(r.stories)) return null;
    const e = typeof r.schemaVersion == "number" ? r.schemaVersion : 1,
      t = r.stories.map((a) => th(a)).filter((a) => !!a);
    return t.length ? { schemaVersion: e, stories: t } : null;
  }
  function eh(r) {
    return Zu.has(r);
  }
  function et(r) {
    return !!(r && typeof r == "object" && !Array.isArray(r));
  }
  function th(r) {
    if (!et(r) || !Array.isArray(r.steps)) return null;
    const e = T(r.id),
      t = T(r.label),
      a = T(r.summary),
      i = r.steps.map((n) => ah(n)).filter((n) => !!n);
    return !e || !t || !i.length
      ? null
      : { id: e, label: t, summary: a ?? "", steps: i };
  }
  function ah(r) {
    if (!et(r)) return null;
    const e = T(r.id),
      t = T(r.kind),
      a = T(r.text),
      i = T(r.note);
    return !e || !t || !eh(t)
      ? null
      : {
          id: e,
          kind: t,
          text: a ?? "",
          note: i ?? "",
          thinking: et(r.thinking)
            ? fh(r.thinking, a ?? "", i ?? "")
            : t === "thinking"
              ? ns(a ?? "", i ?? "")
              : void 0,
          component: ih(r.component),
        };
  }
  function ih(r) {
    if (!et(r)) return;
    const e = T(r.kind);
    switch (e) {
      case "table":
        return nh(r);
      case "strategyCards":
        return oh(r);
      case "enrichment":
        return sh(r);
      case "dataSources":
        return lh(r);
      case "uploadedFiles":
        return ch(r);
      case "mailboxConnection":
        return dh(r);
      case "styleProfile":
        return uh(r);
      case "proximityList":
        return hh(r);
      case "personalizationSwipeGame":
        return ph(r);
      case "sequenceEngagement":
        return gh(r);
      case "generic":
        return { kind: e, title: T(r.title) ?? "Items", items: jt(r.items) };
      default:
        return;
    }
  }
  function nh(r) {
    const e = jt(r.columns),
      t = Ah(r.rows);
    if (!e.length || !t.length) return;
    const a = rh(r.pagination),
      i = Ie(r.actions, (n) => {
        const o = T(n.label);
        return o ? { label: o, badge: T(n.badge) ?? "" } : null;
      });
    return {
      kind: "table",
      title: T(r.title) ?? "Table",
      ...Pe("eyebrow", r.eyebrow),
      ...Pe("count", r.count),
      columns: e,
      rows: t,
      ...(i.length ? { actions: i } : {}),
      ...(a ? { pagination: a } : {}),
    };
  }
  function rh(r) {
    if (!et(r)) return;
    const e = To(r.ranges),
      t = Eo(r.pageSize) ?? void 0;
    return e.length ? { ...(t ? { pageSize: t } : {}), ranges: e } : void 0;
  }
  function oh(r) {
    return {
      kind: "strategyCards",
      title: T(r.title) ?? "Strategy",
      cards: Ie(r.cards, (e) => ({
        label: T(e.label) ?? "",
        title: T(e.title) ?? "",
        summary: T(e.summary) ?? "",
      })).filter((e) => e.title || e.summary),
    };
  }
  function sh(r) {
    return {
      kind: "enrichment",
      title: T(r.title) ?? "Enriching",
      subtitle: T(r.subtitle) ?? "",
      fields: Ie(r.fields, (e) => {
        const t = T(e.title),
          a = jt(e.steps);
        return t && a.length ? { title: t, steps: a } : null;
      }),
    };
  }
  function lh(r) {
    return {
      kind: "dataSources",
      title: T(r.title) ?? "Data sources",
      subtitle: T(r.subtitle) ?? "",
      sources: Ie(r.sources, (e) => {
        const t = T(e.name);
        return t
          ? {
              ...Pe("category", e.category),
              name: t,
              detail: T(e.detail) ?? "",
              ...Pe("logoSrc", e.logoSrc),
            }
          : null;
      }),
    };
  }
  function ch(r) {
    return {
      kind: "uploadedFiles",
      title: T(r.title) ?? "Files",
      files: Ie(r.files, (e) => {
        const t = T(e.name);
        return t
          ? { name: t, detail: T(e.detail) ?? "", type: T(e.type) ?? "" }
          : null;
      }),
    };
  }
  function dh(r) {
    return {
      kind: "mailboxConnection",
      title: T(r.title) ?? "Connect mailbox",
      subtitle: T(r.subtitle) ?? "",
      provider: T(r.provider) ?? "gmail",
      account: T(r.account) ?? "",
      status: T(r.status) ?? "",
      ctaLabel: T(r.ctaLabel) ?? "Connect",
      ...Pe("secondaryCtaLabel", r.secondaryCtaLabel),
      loadingLabel: T(r.loadingLabel) ?? "connecting",
      learningTitle: T(r.learningTitle) ?? "Learning your style",
      learningDetail: T(r.learningDetail) ?? "",
      ...Pe("learningReadyDetail", r.learningReadyDetail),
      signals: jt(r.signals),
    };
  }
  function uh(r) {
    return {
      kind: "styleProfile",
      title: T(r.title) ?? "Profile",
      subtitle: T(r.subtitle) ?? "",
      signals: Ie(r.signals, (e) => {
        const t = T(e.label);
        return t ? { label: t, value: T(e.value) ?? "" } : null;
      }),
      examples: jt(r.examples),
    };
  }
  function hh(r) {
    return {
      kind: "proximityList",
      title: T(r.title) ?? "Leads",
      subtitle: T(r.subtitle) ?? "",
      leads: Ie(r.leads, (e) => {
        const t = T(e.name);
        return t
          ? {
              rank: T(e.rank) ?? "",
              name: t,
              company: T(e.company) ?? "",
              title: T(e.title) ?? "",
              proximity: T(e.proximity) ?? "",
              personalization: T(e.personalization) ?? "",
              score: T(e.score) ?? "",
              ...Pe("avatarUrl", e.avatarUrl),
            }
          : null;
      }),
    };
  }
  function ph(r) {
    return {
      kind: "personalizationSwipeGame",
      title: T(r.title) ?? "Personalization",
      subtitle: T(r.subtitle) ?? "",
      prompt: T(r.prompt) ?? "",
      signals: Ie(r.signals, (e) => {
        const t = T(e.label);
        return t
          ? {
              label: t,
              detail: T(e.detail) ?? "",
              decision: T(e.decision) === "avoid" ? "avoid" : "use",
            }
          : null;
      }),
    };
  }
  function gh(r) {
    return {
      kind: "sequenceEngagement",
      title: T(r.title) ?? "Engagement",
      subtitle: T(r.subtitle) ?? "",
      peopleCount: T(r.peopleCount) ?? "",
      ...Pe("launchLabel", r.launchLabel),
      sequences: Ie(r.sequences, mh),
      channels: Ie(r.channels, (e) => {
        const t = T(e.label);
        return t
          ? { label: t, detail: T(e.detail) ?? "", badge: T(e.badge) ?? "" }
          : null;
      }),
    };
  }
  function mh(r) {
    const e = T(r.name);
    if (!e) return null;
    const t = Ie(r.steps, (a) => {
      const i = T(a.label),
        n = T(a.body);
      return i || n
        ? {
            channel: T(a.channel) ?? "email",
            label: i ?? "",
            body: n ?? "",
            ...Pe("waitDays", a.waitDays),
          }
        : null;
    });
    return {
      name: e,
      company: T(r.company) ?? "",
      ...Pe("title", r.title),
      ...Pe("signal", r.signal),
      ...Pe("avatarUrl", r.avatarUrl),
      subject: T(r.subject) ?? "",
      personalization: T(r.personalization) ?? "",
      ...(t.length ? { steps: t } : {}),
    };
  }
  function fh(r, e, t) {
    const i = (Array.isArray(r.items) ? r.items : [])
      .map((n, o) => wh(n, o))
      .filter((n) => !!n);
    return i.length
      ? {
          title: T(r.title) ?? Fe,
          elapsed: T(r.elapsed) ?? Hi(i.length),
          items: i,
        }
      : ns(e, t);
  }
  function wh(r, e) {
    if (!et(r)) return null;
    const t = T(r.label);
    return t
      ? {
          label: t,
          detail: T(r.detail) ?? zi(t, e),
          disclosure: T(r.disclosure) ?? (e === 0 ? Ht : Vt),
          ...yh("duration", r.duration),
          toolCalls: bh(r.toolCalls),
        }
      : null;
  }
  function bh(r) {
    if (!Array.isArray(r)) return;
    const e = [];
    return (
      r.forEach((t) => {
        if (!et(t)) return;
        const a = T(t.label),
          i = T(t.vendor);
        a && e.push({ label: a, ...(i ? { vendor: i } : {}) });
      }),
      e.length ? e : void 0
    );
  }
  function ns(r, e = "") {
    return {
      title: Fe,
      elapsed: Hi(1),
      items: [
        {
          label: r || "Thinking",
          detail: e || zi(r || "Thinking", 0),
          disclosure: Ht,
        },
      ],
    };
  }
  function jt(r) {
    return Array.isArray(r) ? r.map((e) => T(e)).filter((e) => !!e) : [];
  }
  function Ah(r) {
    return Array.isArray(r) ? r.map((e) => jt(e)).filter((e) => e.length) : [];
  }
  function Ie(r, e) {
    return Array.isArray(r)
      ? r.map((t, a) => (et(t) ? e(t, a) : null)).filter((t) => !!t)
      : [];
  }
  function Pe(r, e) {
    const t = T(e);
    return t ? { [r]: t } : {};
  }
  function yh(r, e) {
    const t = vh(e);
    return t === null ? {} : { [r]: t };
  }
  function T(r) {
    return typeof r == "string" ? r : null;
  }
  function vh(r) {
    return typeof r == "number" && Number.isFinite(r) ? r : null;
  }
  function mn(r) {
    const e = $u(r);
    return !e || e.schemaVersion !== Ju ? null : e.stories;
  }
  function xh(r) {
    if (!r || typeof document > "u") return null;
    const e = document.getElementById(r);
    if (!e?.textContent?.trim()) return null;
    try {
      return mn(JSON.parse(e.textContent));
    } catch {
      return null;
    }
  }
  async function _h(r, e) {
    try {
      const t = await fetch(r, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!t.ok) return;
      const a = mn(await t.json());
      if (!a) return;
      e(a, { source: "load" });
    } catch {}
  }
  function kh(r) {
    (r.classList.add("wa-section"),
      !r.querySelector("[data-chat-shell]") &&
        (r.innerHTML = `
    <div class="wa-section__inner">
      <div class="wa-copy">
        <h2 class="wa-copy__title" aria-label="Escape tab hell with a unified platform for prospecting, researching, and sequencing, all backed by frontier AI models.">
          <span>Escape tab hell with a unified platform for</span>
          <span>
            <em>prospecting</em><span>, </span><em>researching</em><span>, and </span><em>sequencing</em>
          </span>
          <span>all backed by frontier AI models.</span>
        </h2>
      </div>

      <div class="wa-story-controls" data-story-controls>
        <div class="wa-story-tabs" data-story-tabs></div>
        <div class="wa-controls-row" aria-label="Animation controls">
          <button class="wa-control-button" type="button" data-prev-story aria-label="Previous story">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M10 3.5 5.5 8l4.5 4.5"></path>
            </svg>
          </button>
          <span class="wa-story-count" data-story-count aria-hidden="true">1 / 5</span>
          <button class="wa-control-button" type="button" data-toggle-play aria-label="Pause animation">Pause</button>
          <button class="wa-control-button" type="button" data-next-story aria-label="Next story">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="m6 3.5 4.5 4.5L6 12.5"></path>
            </svg>
          </button>
          <input class="wa-scrubber" data-story-scrubber type="range" min="0" max="1000" value="0" aria-label="Story progress">
        </div>
      </div>

      <div class="wa-stage">
        <div class="wa-stage__media" aria-hidden="true"></div>
        <div class="wa-window">
          <div class="wa-chat-shell" data-chat-shell>
            <div class="wa-chat-shell__bar">
              <div class="wa-chat-shell__lights" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              <div class="wa-chat-shell__tab">
                <svg class="wa-chat-shell__mark" width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M5.71835 3.84074V0H0V5.12789C0 7.97387 2.13981 10.9988 6.10463 10.9988H8.4998V5.49938L7.40298 5.48406C6.46808 5.4708 5.71706 4.7386 5.71706 3.8395L5.71835 3.84074Z" fill="#FE3C01"/>
                  <path d="M11.2814 7.15899V10.9997H16.9998V5.87225C16.9998 3.02586 14.86 0.000976562 10.8952 0.000976562H8.5V5.50036L9.59682 5.51568C10.5317 5.52893 11.2827 6.26113 11.2827 7.16023L11.2814 7.15899Z" fill="#FE3C01"/>
                </svg>
                <span class="wa-chat-shell__title">Unify</span>
              </div>
            </div>

            <div class="wa-chat-shell__body">
              <div class="wa-signup-scene" data-signup-scene>
                <span class="wa-signup-scene__logo" data-signup-logo-target aria-hidden="true">${Ur}</span>
                <h3 class="wa-signup-scene__title">Sign up</h3>
                <div class="wa-signup-field" data-signup-field>
                  <span data-signup-email></span>
                  <button class="wa-signup-field__submit" type="button" data-signup-submit aria-label="Sign in">
                    <svg class="wa-signup-field__submit-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M12 5l0 14"></path>
                      <path d="M18 13l-6 6"></path>
                      <path d="M6 13l6 6"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="wa-thread" data-chat-thread></div>
            </div>

            <div class="wa-composer" data-chat-input>
              <span class="wa-composer__placeholder" data-composer-text></span>
              <div class="wa-composer__controls">
                <span class="wa-composer__select" aria-hidden="true">
                  GPT 5.5
                  <svg class="wa-composer__chevron" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6 9l6 6l6 -6"></path>
                  </svg>
                </span>
                <span class="wa-composer__select" aria-hidden="true">
                  High
                  <svg class="wa-composer__chevron" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6 9l6 6l6 -6"></path>
                  </svg>
                </span>
                <button class="wa-composer__send" type="button" data-send-button aria-label="Send message">
                  <svg class="wa-composer__send-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 5l0 14"></path>
                    <path d="M18 11l-6 -6"></path>
                    <path d="M6 11l6 -6"></path>
                  </svg>
                </button>
              </div>
            </div>

            <button class="wa-history-resume" type="button" data-history-resume aria-hidden="true" tabindex="-1">
              <span class="wa-history-resume__icon" aria-hidden="true">
                <svg class="wa-history-resume__svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M7 4v16l13 -8z"></path>
                </svg>
              </span>
              <span>Continue playing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `));
  }
  function Sh(r, e = {}) {
    kh(r);
    const t = Xu(r, e),
      a = mn(e.builderDraft) ?? xh(e.builderDraftScriptId);
    return (
      a && t.applyBuilderStories(a),
      t.controller.mount(),
      t.draftEndpoint && _h(t.draftEndpoint, t.applyBuilderStories),
      t.toInstance()
    );
  }
  const Ch = "[data-chatbot-stories]",
    Th = "[data-chatbot-stories][data-auto-init]";
  function Eh(
    r,
    { autoInitSelector: e = Th, defaultTarget: t = Ch, injectStyles: a } = {},
  ) {
    const i = new WeakMap();
    function n(c = t) {
      if (c instanceof HTMLElement) return c;
      const l = document.querySelector(c);
      if (!l)
        throw new Error(
          `ChatbotStories: root element not found for selector "${c}"`,
        );
      return l;
    }
    function o(c = t, l = {}) {
      const d = n(c),
        u = i.get(d);
      if (u) return u;
      l.injectStyles !== !1 && a?.();
      const h = r(d, l),
        m = h.destroy.bind(h);
      let f = !1;
      const p = {
        ...h,
        destroy: () => {
          f ||
            ((f = !0),
            i.delete(d),
            delete d.dataset.chatbotStoriesMounted,
            m());
        },
      };
      return (i.set(d, p), (d.dataset.chatbotStoriesMounted = "true"), p);
    }
    function s() {
      const c = document.querySelectorAll(e);
      c.length &&
        (a?.(), c.forEach((l) => o(l, { ...Ph(l), injectStyles: !1 })));
    }
    return { autoInit: s, init: o };
  }
  function Ph(r) {
    const e = {},
      t = r.dataset;
    if (
      ((e.autoplay = ei(t.autoplay)),
      (e.loop = ei(t.loop)),
      (e.reducedMotion = ei(t.reducedMotion)),
      (e.showBuilder = ei(t.showBuilder)),
      t.autoAdvanceDelay)
    ) {
      const a = Number(t.autoAdvanceDelay);
      Number.isFinite(a) && (e.autoAdvanceDelay = a);
    }
    if (t.initialStory) {
      const a = Number(t.initialStory);
      e.initialStory = Number.isFinite(a) ? a : t.initialStory;
    }
    if (
      (t.assetBaseUrl && (e.assetBaseUrl = t.assetBaseUrl),
      t.builderDraftScriptId &&
        (e.builderDraftScriptId =
          t.builderDraftScriptId === "false" ? !1 : t.builderDraftScriptId),
      t.assetUrlMap)
    ) {
      const a = Mh(t.assetUrlMap);
      a && (e.assetUrlMap = a);
    }
    return (
      t.builderDraftEndpoint &&
        (e.builderDraftEndpoint =
          t.builderDraftEndpoint === "false" ? !1 : t.builderDraftEndpoint),
      Dh(e)
    );
  }
  function ei(r) {
    if (r !== void 0) {
      if (r === "true" || r === "") return !0;
      if (r === "false") return !1;
    }
  }
  function Mh(r) {
    try {
      const e = JSON.parse(r);
      return !e || typeof e != "object" || Array.isArray(e)
        ? void 0
        : Object.fromEntries(
            Object.entries(e).filter(
              (t) => typeof t[0] == "string" && typeof t[1] == "string",
            ),
          );
    } catch {
      return;
    }
  }
  function Dh(r) {
    return Object.fromEntries(
      Object.entries(r).filter(([, e]) => e !== void 0),
    );
  }
  function Rh(r, e) {
    const t = document.getElementById(r);
    if (t instanceof HTMLStyleElement) {
      t.textContent !== e && (t.textContent = e);
      return;
    }
    const a = document.createElement("style");
    ((a.id = r), (a.textContent = e), document.head.append(a));
  }
  const Ih = `:root{--wa-page-bg: #fffff9}html,body{margin:0;background:var(--wa-page-bg)}.wa-section,.wa-section *{box-sizing:border-box}.wa-section{--wa-font-sans: "Saans", "Avenir Next", Helvetica, sans-serif;--wa-font-feature: "Feature Text", Georgia, serif;--wa-bg: #fffff9;--wa-panel: #fffff9;--wa-panel-transparent: rgba(255, 255, 249, 0);--wa-ink: #252521;--wa-muted: #11110f;--wa-soft: #dcdcd4;--wa-browser-line: #d7d7cf;--wa-orange: #f23b0a;--wa-red: #f16055;--wa-yellow: #f6ba42;--wa-green: #58bd59;--wa-color-bg: var(--wa-bg);--wa-color-panel: var(--wa-panel);--wa-color-text: var(--wa-ink);--wa-color-heading: var(--wa-ink);--wa-color-heading-strong: #070707;--wa-color-copy: #171714;--wa-color-muted: #5e5c56;--wa-color-accent: var(--wa-orange);--wa-color-inverse: #fffff9;--wa-color-dark-surface: #171714;--wa-color-soft-surface: #f5f4ed;--wa-color-user-message: #ecebe5;--wa-color-input-line: #d9d8d1;--wa-color-data-table-surface: #fffffe;--wa-color-positive: #177947;--wa-color-warning: #b44927;--wa-line-08: rgba(23, 23, 20, .08);--wa-line-10: rgba(23, 23, 20, .1);--wa-line-12: rgba(23, 23, 20, .12);--wa-line-16: rgba(23, 23, 20, .16);--wa-line-20: rgba(23, 23, 20, .2);--wa-placeholder: rgba(23, 23, 20, .38);--wa-browser-bar-bg: rgba(255, 255, 249, .96);--wa-window-highlight: rgba(255, 255, 255, .86);--wa-window-hairline: rgba(0, 0, 0, .03);--wa-card-accent-bg: rgba(242, 59, 10, .13);--wa-row-bg: rgba(245, 244, 237, .82);--wa-cursor-shadow: rgba(0, 0, 0, .12);--wa-highlight-bg: rgba(213, 255, 79, .22);--wa-signup-muted: #77736c;--wa-signup-field-bg: #fffffa;--wa-signup-field-border: #d5d2ca;--wa-signup-field-shadow: 0 12px 24px rgba(23, 23, 20, .12);--wa-signup-placeholder: #aaa89e;--wa-signup-submit-bg: #aaa89e;--wa-signup-submit-active-bg: #11110f;--wa-signup-submit-color: #fffffa;--wa-strategy-surface-bg: #fffffa;--wa-strategy-surface-hover-bg: #fffffe;--wa-strategy-surface-border: #dfddd5;--wa-strategy-surface-shadow: var(--wa-tight-shadow);--wa-strategy-surface-hover-shadow: var(--wa-tight-shadow);--wa-strategy-title-color: #252521;--wa-strategy-bullet-color: #5e5c55;--wa-thinking-text: #57544f;--wa-thinking-label: #55514d;--wa-thinking-detail: #86817a;--wa-thinking-muted: #8e8a83;--wa-thinking-line: #e4ded6;--wa-thinking-dot: #9d9890;--wa-thinking-chevron: #55514d;--wa-thinking-logo: #67635f;--wa-thinking-logo-shadow: #c8c3bb;--wa-thinking-shimmer: #9d9890;--wa-thinking-shimmer-strong: #2f2e2a;--wa-thinking-tool-shimmer: #b8b2a8;--wa-thinking-tool-shimmer-strong: #625d56;--wa-thinking-favicon-bg: #e8e1d8;--wa-thinking-favicon-text: #625d56;--wa-drop-color: #514e49;--wa-drop-bg: rgba(255, 255, 249, .9);--wa-drop-inset: rgba(255, 255, 249, .22);--wa-drop-active-bg: rgba(255, 249, 242, .92);--wa-drop-active-inset: rgba(242, 59, 10, .05);--wa-drop-complete-bg: rgba(255, 255, 249, .9);--wa-drop-title: #11110f;--wa-drop-muted: #7b766f;--wa-file-surface: #faf9f4;--wa-file-floating-surface: rgba(255, 255, 249, .96);--wa-file-text: #171714;--wa-file-muted: #716d66;--wa-file-shadow: 0 16px 28px rgba(23, 23, 20, .18);--wa-table-text: #555452;--wa-table-strong: #050505;--wa-table-muted: #716d66;--wa-table-empty: #aaa7a2;--wa-table-line: #eee6df;--wa-table-scrollbar: rgba(17, 17, 15, .22);--wa-table-scrollbar-thumb: rgba(17, 17, 15, .2);--wa-table-control-bg: #fffffb;--wa-table-control-border: #ded9d2;--wa-table-control-hover: #bdb7ae;--wa-table-selected-bg: #11110f;--wa-table-selected-shadow: 0 7px 16px rgba(17, 17, 15, .14);--wa-table-badge-text: #6d5300;--wa-table-badge-bg: #fff0a6;--wa-table-dot: #b6b2ac;--wa-table-dot-active: #171714;--wa-table-page: #6f6c66;--wa-table-page-disabled: #c9c5bd;--wa-table-enriched-text: #0c6f66;--wa-table-enriched-header: #147970;--wa-table-enriched-bg: rgba(14, 156, 144, .12);--wa-waterfall-arrow: #bbb3a9;--wa-waterfall-chip-bg: #fffffa;--wa-waterfall-chip-border: #e5ded5;--wa-waterfall-chip-text: #817b72;--wa-waterfall-loading-text: #68635c;--wa-waterfall-loading-bg: #fbfaf2;--wa-waterfall-loading-strong: #2f2e2a;--wa-waterfall-loading-glint: #c9c2b8;--wa-waterfall-complete-bg: #fbfaf2;--wa-mailbox-card-bg: #f7f6f0;--wa-mailbox-card-border: #d9d7d0;--wa-mailbox-card-inset: rgba(255, 255, 249, .42);--wa-mailbox-button-bg: #fffff9;--wa-mailbox-button-border: #d6d5cf;--wa-mailbox-button-text: #080807;--wa-mailbox-connected-text: #aaa59d;--wa-mailbox-connected-border: rgba(23, 23, 20, .14);--wa-mailbox-spinner-border: rgba(17, 17, 15, .18);--wa-mailbox-learning-title: #5b5752;--wa-mailbox-learning-ready: #11110f;--wa-mailbox-learning-detail: #8b867e;--wa-mailbox-thumbprint: #11110f;--wa-mailbox-progress-bg: #dfddd6;--wa-sequence-tab-line-stroke: rgba(17, 17, 15, .28);--wa-sequence-person-bg: color-mix(in srgb, var(--wa-panel) 82%, #f1f0eb);--wa-sequence-person-border: rgba(17, 17, 15, .2);--wa-sequence-person-active-border: rgba(17, 17, 15, .24);--wa-sequence-dot-color: #8d8b84;--wa-sequence-dot-selected: #050505;--wa-sequence-step-muted: #85837b;--wa-sequence-step-selected: #050505;--wa-sequence-wait: #5f5d56;--wa-sequence-panel-header-bg: #f8f8f0;--wa-sequence-panel-line: #c7c4bc;--wa-sequence-panel-muted: #86847d;--wa-sequence-panel-strong: #151513;--wa-sequence-field-border: #8f8d85;--wa-sequence-field-text: #080806;--wa-sequence-connect-muted: #5f5d56;--wa-sequence-call-copy: #706e67;--wa-sequence-call-muted: #85837b;--wa-sequence-call-avatar-bg: #e8e6df;--wa-sequence-call-button-bg: #8f8d85;--wa-sequence-call-button-text: #fffffa;--wa-sequence-draft-bg: #eeede6;--wa-sequence-draft-border: rgba(17, 17, 15, .14);--wa-sequence-panel-shadow: var(--wa-tight-shadow);--wa-composer-shadow: 0 14px 28px rgba(5, 5, 4, .1), 0 4px 10px rgba(5, 5, 4, .06), 0 1px 0 rgba(255, 255, 255, .74) inset;--wa-media-warm-1: rgba(255, 139, 77, .32);--wa-media-warm-2: rgba(58, 20, 18, .78);--wa-media-warm-3: rgba(8, 6, 6, .24);--wa-media-warm-4: rgba(131, 49, 38, .86);--wa-media-line: rgba(255, 255, 249, .1);--wa-media-base-1: #1a0908;--wa-media-base-2: #6b2820;--wa-media-base-3: #24100d;--wa-media-image: url(/media/chat-background.png);--wa-media-shadow: 0 44px 96px rgba(24, 20, 16, .18);--wa-window-shadow: 0 52px 42px rgba(31, 30, 26, .22);--wa-card-shadow: 0 10px 28px rgba(23, 23, 20, .08);--wa-tight-shadow: 0 2px 6px rgba(23, 23, 20, .035);--wa-data-table-shadow: var(--wa-tight-shadow);color-scheme:light;--wa-section-padding: 126px 32px 140px;--wa-content-max: 1230px;--wa-copy-max: 1100px;--wa-left-column: minmax(420px, 510px);--wa-right-column: minmax(560px, 660px);--wa-column-gap: 60px;--wa-row-gap: 82px;--wa-story-controls-x-offset: -34px;--wa-story-controls-y-offset: 0px;--wa-story-controls-width-extra: 34px;--wa-story-tabs-gap: 24px;--wa-story-tab-y-padding: 14px;--wa-story-description-gap: 24px;--wa-stage-y-offset: -120px;--wa-stage-width: 660px;--wa-stage-min-height: 650px;--wa-media-width: 418px;--wa-media-height: 720px;--wa-window-width: 590px;--wa-window-max-height: 90vh;--wa-window-height: min(530px, var(--wa-window-max-height));--wa-chat-x-padding: 24px;--wa-chat-shadow-gutter: min(24px, var(--wa-chat-x-padding));--wa-chat-thread-bleed: calc(var(--wa-chat-x-padding) + var(--wa-chat-shadow-gutter));--wa-chat-entry-gap: 16px;--wa-chat-top-fade: calc(var(--wa-chat-x-padding) + 4px);--wa-chat-bottom-clearance: 110px;--wa-thread-base-bottom-padding: var(--wa-chat-bottom-clearance);--wa-thread-growth-spacer: 0px;--wa-chat-first-entry-offset: calc(var(--wa-chat-top-fade) + 8px);--wa-ai-message-max-width: 540px;--wa-user-message-max-width: 360px;--wa-chat-message-weight: 430;--wa-chat-thinking-header-weight: 430;--wa-chat-thinking-weight: 400;--wa-chat-detail-weight: 400;--wa-thinking-logo-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 11'%3E%3Cpath fill='black' d='M5.71835 3.84074V0H0V5.12789C0 7.97387 2.13981 10.9988 6.10463 10.9988H8.4998V5.49938L7.40298 5.48406C6.46808 5.4708 5.71706 4.7386 5.71706 3.8395L5.71835 3.84074Z'/%3E%3Cpath fill='black' d='M11.2814 7.15899V10.9997H16.9998V5.87225C16.9998 3.02586 14.86 0.000976562 10.8952 0.000976562H8.5V5.50036L9.59682 5.51568C10.5317 5.52893 11.2827 6.26113 11.2827 7.16023L11.2814 7.15899Z'/%3E%3C/svg%3E");--wa-composer-side-inset: 10px;--wa-composer-bottom-outset: 10px;--wa-composer-height: 102px;--wa-composer-send-size: 36px;--wa-history-resume-height: 42px;--wa-history-resume-y-offset: 44px;--wa-cursor-default-width: 14px;--wa-cursor-default-height: 23px;--wa-title-size: 40px;--wa-title-line-height: 1.2;--wa-feature-title-size: 28px;--wa-feature-copy-size: 16px;--wa-radius-sm: 8px;--wa-radius-window: 18px;--wa-story-progress: 0;--wa-cursor-arrow-head: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAABP0lEQVR42t3XwXGEIBQG4NeBR49uB6QDSqAEtgPSAXvMzXTglpAOSAeWgB2wHbwMGTQq7gL6vOSfQR2HeZ+IOgiICIh4QcS3cEza/OaKf/k6A/jGZe6nANZadM6RIxPAOUfGGDmyAACAHIkAamQToESeAlTIS4ACSQJHkSzgCJIN7EWKgD1IMVCK7AJKkN1ALnIIyEEOAymEBNhAPskB33yNkMcpAPyWm0IPaK1pRmCMwURu2UBd19E5KeWzwo958SQghMBhGGArzrljX9PZVYKUMgK01mWAUmoq3rbt4mkwxkRA0zTZwPtYyU9e3/fz4h9jR8ZYhHRdlwVAeL3Xuc47+mLrcM6zAQir61sY0WXd0U9qVVURYq3NBpJNKRUB/gEgA/zVlt6m4oWUEOK8EYxzMSJ+n3rh4Izfpv8F/ADB/dNnKnKg1wAAAABJRU5ErkJggg==);--wa-cursor-arrow-tail: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAABSUlEQVR42t3X3XGEIBAHcDrw3nw0HVAC6YASSAekA+3AdOB1wnWgHWAHXAdkljkyRPxAFvOQnXF8UP8/XHAGibWWXHmQ/wNorYkx5jqAMUYopcWRXwBUaSQCSiOrQElkEyiF7AIlkEMAiyQBGCQZyEVOATnIaeAskgWcQbKBVAQFpCBo4AgpAuwhxQAoyLgUgCoF2LWjbVv7qmcu4IKUUvagumSgruto1EKIreBnGH4IcM7JPM+r7TDG+NCPrA9NCOGvuRHv9PuRBEgpf8L7vg9vcj1fAk3ThK15S9rZKaXIOI7Lm1xRSiNkGAZ/+Y7ZOsLDLmwJMMbCyb3lAu+QAJNaVVWEaK098onZ/E6QIKWMgGDJPjAALEU32p02Wez2HfpsOedbbzBhgc7PhUfgHHxwHRa4+blYqQmzipbI3bfrFfy1Ff4nv1DfGYDdsG+uObgAAAAASUVORK5CYII=);--wa-cursor-arrow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAABXElEQVRIx7XWTZWDMBAA4DigN47UAeuAdYAEcEAdwHFv1AGVsA7AATgAB9RBlulL2AAhv8O8N23awnzNHy+EUkqWvC/5xdqoCS85/Y/fK4CObuN1CTCOI53nGR1ZgSRJaBzH6MgGIMtHbOQAYCNSABM5BbAQJYCBaAFfxAjwQYwBV8QKcEGsAVvECbBBnAFTxAswQbwBHYICSJAnOgAJNVi8LwHIp9wa+EBZljg9aNuWaqIyBsIwPHyXZdlZ4bdYXAukaUqnaZLCworJnR4V4r+EtmK8OyOgKIr15rquN/2GMd8DURSJl9xVwEMs1Pe9eOMPb8BG2iNN0xg97Ai7YB+5+BsU02ysmwog7HRdsR6JXf6GCjCpQRAcEDhysnjoAFUO+3mSLIbOB8j5AVkxTNQHIGycP3vjpAeDL1DxueAIvAsbrvIFbnwuJDGYrCJT5MWHixV+nhV3AazzD2y9OM7DgeyVAAAAAElFTkSuQmCC);--wa-cursor-hand: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABY2lDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokX2QsUvDUBDGv1aloHUQHRwcMolDlJIKuji0FURxCFXB6pS+pqmQxkeSIgU3/4GC/4EKzm4Whzo6OAiik+jm5KTgouV5L4mkInqP435877vjOCA5bnBu9wOoO75bXMorm6UtJfWMBL0gDObxnK6vSv6uP+P9PvTeTstZv///jcGK6TGqn5QZxl0fSKjE+p7PJe8Tj7m0FHFLshXyieRyyOeBZ71YIL4mVljNqBC/EKvlHt3q4brdYNEOcvu06WysyTmUE1jEDjxw2DDQhAId2T/8s4G/gF1yN+FSn4UafOrJkSInmMTLcMAwA5VYQ4ZSk3eO7ncX3U+NtYMnYKEjhLiItZUOcDZHJ2vH2tQ8MDIEXLW54RqB1EeZrFaB11NguASM3lDPtlfNauH26Tww8CjE2ySQOgS6LSE+joToHlPzA3DpfAEDp2ITpJYOWwAAAARjSUNQDA0AAW4D4+8AAACyZVhJZk1NACoAAAAIAAQBMQACAAAAGAAAAD4BMgACAAAAGgAAAFYBOwACAAAAIwAAAHCHaQAEAAAAAQAAAJQAAAAAQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAAMjAyNS0wMi0xNCAwNTo0MTo0NCArMDAwMABBZG9iZSBJbGx1c3RyYXRvciAyOS4zIChNYWNpbnRvc2gpAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAAAljtskAAACQGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDxkYzpjcmVhdG9yPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT5BZG9iZSBJbGx1c3RyYXRvciAyOS4zIChNYWNpbnRvc2gpPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9kYzpjcmVhdG9yPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBERiBsaWJyYXJ5IDE3LjAwPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgp5+ZGuAAACK0lEQVRYCWNgGAWjITAaAkMwBHKBbv4ExCeBWIhS9zOTYcDuHz9+vH779u23M2fO/AHqP0OGGXAtLHAW8Qw+dnZ2Ni0trSdALXzEa8Oukgm7MP1EKXWAINCpcpQ4lyIHCAsLp4mIiJwHOqAciNWAmJVUxxDrAGWgwezohq9bt+7S7du3nzIzM7eqqKjsBcofB2JQqBANiHHALCkpqWNsbGygbIfhCA4gMDIyugt0iIyBgYEAExPTa6C6xUDMSIwriHGA8507d96vWrXqPdDACKihjJaWlkyqqqpcQAtZgG74CxIXEhL68eLFi4umpqZmQK4/VC3F1OJDhw4d+Pfv3zteXt6jQNP+A8F3EAEDQLk3IDbQoceB1MdNmzbtB6rrpdhmqAEeTk5Ol0EWdHZ2HsTmAJAcMjh16tQhoLpF1HIAqLB6+evXrwe/f/9+PHny5APIlmFjA0tIkANA6YBqYPKaNWv2Y7MMm9jevXsPAG2eQYztxCRCkDlL6+rqFID0fxCHELh79y5I3TNC6kiVv/T48eNT2HyMLgbMlreBhruRagEh9YE6Ojr3gJZ9QrcQmf/o0aMTQIMeAzEzIQPJkZ/v4+Nz4e/fvy+RLYWxgVX0BVFRUVBB5EqO4cToAfmqn4+P70Nra+uhixcvHr53797xI0eOHExISDgFLJLfAuUDiTEIpoao4hKmGInWBLKjgFgfiDmB+DkQg+qB5UD8AYhHwWgIjIYA0SEAALLUdbtDe5+9AAAAAElFTkSuQmCC);--wa-cursor-ibeam: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAABY2lDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokX2QsUvDUBDGv1aloHUQHRwcMolDlJIKuji0FURxCFXB6pS+pqmQxkeSIgU3/4GC/4EKzm4Whzo6OAiik+jm5KTgouV5L4mkInqP435877vjOCA5bnBu9wOoO75bXMorm6UtJfWMBL0gDObxnK6vSv6uP+P9PvTeTstZv///jcGK6TGqn5QZxl0fSKjE+p7PJe8Tj7m0FHFLshXyieRyyOeBZ71YIL4mVljNqBC/EKvlHt3q4brdYNEOcvu06WysyTmUE1jEDjxw2DDQhAId2T/8s4G/gF1yN+FSn4UafOrJkSInmMTLcMAwA5VYQ4ZSk3eO7ncX3U+NtYMnYKEjhLiItZUOcDZHJ2vH2tQ8MDIEXLW54RqB1EeZrFaB11NguASM3lDPtlfNauH26Tww8CjE2ySQOgS6LSE+joToHlPzA3DpfAEDp2ITpJYOWwAAAARjSUNQDA0AAW4D4+8AAACyZVhJZk1NACoAAAAIAAQBMQACAAAAGAAAAD4BMgACAAAAGgAAAFYBOwACAAAAIwAAAHCHaQAEAAAAAQAAAJQAAAAAQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAAMjAyNS0wMi0yMSAyMjo0Nzo0MyArMDAwMABBZG9iZSBJbGx1c3RyYXRvciAyOS4wIChNYWNpbnRvc2gpAAAAAqACAAQAAAABAAAAF6ADAAQAAAABAAAAFgAAAABjOXNcAAACQGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDxkYzpjcmVhdG9yPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT5BZG9iZSBJbGx1c3RyYXRvciAyOS4wIChNYWNpbnRvc2gpPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9kYzpjcmVhdG9yPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBERiBsaWJyYXJ5IDE3LjAwPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpTAn2BAAABF0lEQVQ4Ee2Vu26DQBBF7QjnL2KIW+iAys7DXwRtksofB/QUPGpHiiMBFbiDmztWIjkysjBbpIiRrnZnd+bsMtLsTCZ/+QEwqAdqJveQkVpSc6V7EXDfNM0+DEN0XbejvWnbdhcEAeq63tM2Rh/A4Oc0TWGaJlzXRRzHcBwHlmUhyzJu40kFPiXgjXr3PA+apsH3fYFuqdfR4ONAgvSiKMA1lGUp8LvjfeW5EAX+PQ7i3QzyGul0hfcm7pqW/5gWVqXOsj/8elVVUqbq5U/IuYfrpTfRQxcJXydJ8uvJtW378OTmec5tPA5lnfgxeCFNIYoiaRYftKVZfIrNJtLQNk6CLlkgQKekrf20uVvOV5Ram7vkEn2+X1iD5YNPxBZmAAAAAElFTkSuQmCC);--wa-cursor-openhand: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABY2lDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokX2QsUvDUBDGv1aloHUQHRwcMolDlJIKuji0FURxCFXB6pS+pqmQxkeSIgU3/4GC/4EKzm4Whzo6OAiik+jm5KTgouV5L4mkInqP435877vjOCA5bnBu9wOoO75bXMorm6UtJfWMBL0gDObxnK6vSv6uP+P9PvTeTstZv///jcGK6TGqn5QZxl0fSKjE+p7PJe8Tj7m0FHFLshXyieRyyOeBZ71YIL4mVljNqBC/EKvlHt3q4brdYNEOcvu06WysyTmUE1jEDjxw2DDQhAId2T/8s4G/gF1yN+FSn4UafOrJkSInmMTLcMAwA5VYQ4ZSk3eO7ncX3U+NtYMnYKEjhLiItZUOcDZHJ2vH2tQ8MDIEXLW54RqB1EeZrFaB11NguASM3lDPtlfNauH26Tww8CjE2ySQOgS6LSE+joToHlPzA3DpfAEDp2ITpJYOWwAAAARjSUNQDA0AAW4D4+8AAACyZVhJZk1NACoAAAAIAAQBMQACAAAAGAAAAD4BMgACAAAAGgAAAFYBOwACAAAAIwAAAHCHaQAEAAAAAQAAAJQAAAAAQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAAMjAyNS0wMi0yMCAxNzoyNTozNyArMDAwMABBZG9iZSBJbGx1c3RyYXRvciAyOS4zIChNYWNpbnRvc2gpAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAAA8V+2fAAACQGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDxkYzpjcmVhdG9yPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT5BZG9iZSBJbGx1c3RyYXRvciAyOS4zIChNYWNpbnRvc2gpPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9kYzpjcmVhdG9yPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBERiBsaWJyYXJ5IDE3LjAwPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgp5+ZGuAAACyElEQVRYCe2Vy2saURTG76hoxvcjLYSWLoKRarVIA6HZFUtJa3bBdFdcSFYuusqi4Lalu4p05cb2P1C6KCW07qQkCKkv3IgurNESBRPHKb5uvxlqcRGswUmh4IWDM3Ou5/vd7547Q8hiLBxYOPCfO2AH/0OE7F+tQw4hN0KDeKBWqzurq6tnOp3uHe6XEdsIA+JqBoQ+ILoQPpHJZG9CodCoXC5T3LdYlj1xOBxt5EtQV8xKcCnrOI57XK1WWY/Hox2NRj6NRsMoFArS7XZNcILN5/N6wFyD+I0rAcDqGrVajWxtbWkhcJNhGEIpFbU2NzdVw+GQnJ6eqgEWB0gDiUd/A7mUAyqVqlAsFsnGxoZYVwCAE+L1+vr6UqlUIoCQ7+zs2MPh8HWz2fxKCgAlitxGyDqdzlcAULfbTeRy+RB98McBl8tFCoWCqLe/v68ymUwEgM15AZb0en0R+3toMBhS2Otvx8fHnFKpJHa7nZ90wOl0EvTACHM7Akwmkxm22+3DeQGs2MtlWKtbW1u7g2LObDY7EIp6vV4WFhPkCcQpAEkulxsEAgFWyB8dHXGDwSAvXM8zFDheLayGoiBFE/7A/U803oUjlUrRVqsl5lZWVtoQds0jLv4Xdr/c29vjhao+n4/DQ9poNC4EGD/keZ6iP/qYq5obAAVuYdU8GpDW63UaDAZ7gsC0kU6nqVar/S6FuFgD1n+ORqOjaaKTuVgsRtG8nyQDQKFtq9V6Niky7drv9wtb9UJKAAZvt3I8Hp+mK+Z6vZ7QrF2I35USQKj1xGKxcM1mcypEJBIZAjYttbhYD8341maznVcqlQshDg4OKF7Xgv33ZgVgZp34ex6DY/ka6s93d3cH+CpqjEYjwbEkiUTiPJlMMv1+/ynmfpy17mUBxnWFb8MzWH0f512HD1ADr+kvePYe0RpPWvwuHFg4MIsDvwAylvevmzFHiwAAAABJRU5ErkJggg==);--wa-cursor-closedhand: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABY2lDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokX2QsUvDUBDGv1aloHUQHRwcMolDlJIKuji0FURxCFXB6pS+pqmQxkeSIgU3/4GC/4EKzm4Whzo6OAiik+jm5KTgouV5L4mkInqP435877vjOCA5bnBu9wOoO75bXMorm6UtJfWMBL0gDObxnK6vSv6uP+P9PvTeTstZv///jcGK6TGqn5QZxl0fSKjE+p7PJe8Tj7m0FHFLshXyieRyyOeBZ71YIL4mVljNqBC/EKvlHt3q4brdYNEOcvu06WysyTmUE1jEDjxw2DDQhAId2T/8s4G/gF1yN+FSn4UafOrJkSInmMTLcMAwA5VYQ4ZSk3eO7ncX3U+NtYMnYKEjhLiItZUOcDZHJ2vH2tQ8MDIEXLW54RqB1EeZrFaB11NguASM3lDPtlfNauH26Tww8CjE2ySQOgS6LSE+joToHlPzA3DpfAEDp2ITpJYOWwAAAARjSUNQDA0AAW4D4+8AAACyZVhJZk1NACoAAAAIAAQBMQACAAAAGAAAAD4BMgACAAAAGgAAAFYBOwACAAAAIwAAAHCHaQAEAAAAAQAAAJQAAAAAQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAAMjAyNS0wMi0yMCAxNzoxODoxNyArMDAwMABBZG9iZSBJbGx1c3RyYXRvciAyOS4zIChNYWNpbnRvc2gpAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAAALcJCvAAACQGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDxkYzpjcmVhdG9yPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT5BZG9iZSBJbGx1c3RyYXRvciAyOS4zIChNYWNpbnRvc2gpPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9kYzpjcmVhdG9yPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBERiBsaWJyYXJ5IDE3LjAwPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgp5+ZGuAAAB5ElEQVRYCe1UP2vqUBy9Jv6NURAe2FE7CuKbpG46tltxcHhDR7+CSFf3fgChS6lTcXEUVCgoCNKxRazDez6KiLymNCYx5vakaCltaW5Ly1vuD37k5ubcc07OvQkhvHgCPAGeAE+AJ/CfExA/ob+NNQdoTyQSOQyHwxXTNIXVarWFuR30FdpEf0v5AoHATT6fv/f5fItUKqW0223q9Xr1WCympNPpO1mWz75FGaQhdBHCGkWVSiWtXC7r9jiTyejNZpP2ej0qCIIBQ4rf7z/+SiMyCH9D6BYJrIbDoa37qlqtFk0kEnq/36cwqsOA9FUm9pPJ5D9bMZfLmbVa7ZX4ywmPx2MbEJwMuJ0A6+c/UNQeVyoVMRqNvrtsPp8TURSN5XJpvQvEQ1YDs8lk8siFbXDiJIPBgGCrrjVNc8Q6RrRmuBiNRrKiKI6ENgBnwVRV9ZwJzArCIbysVqvWy71+6z4ej9tOd1m5WXH7oVBInc1mb2k+zdXrdSpJ0h+Qsm4vqz4h+L5P8XZ34/H4SfD5oNvt0mAwqIJxj5XVxQpc4wSc7iOXy1UsFApmNpuV8Ocj0+mUNBoNpdPpuA3DKAJ7wsr7UQMb3p8Y/MJJT+PPF7As6+9isehgroa+2YD4lSfAE2BJ4AH/finPJ7GZOAAAAABJRU5ErkJggg==);position:relative;isolation:isolate;min-height:100svh;overflow:hidden;padding:var(--wa-section-padding);color:var(--wa-color-text);font-family:var(--wa-font-sans);letter-spacing:0;background:var(--wa-bg)}@supports (height: 100dvh){.wa-section{--wa-window-max-height: min(90vh, 90dvh)}}.wa-section[data-theme=dark]{--wa-bg: #10100d;--wa-panel: #191914;--wa-panel-transparent: rgba(25, 25, 20, 0);--wa-ink: #f7f4ea;--wa-muted: #f7f4ea;--wa-soft: #49473f;--wa-browser-line: #3d3b34;--wa-color-bg: var(--wa-bg);--wa-color-panel: var(--wa-panel);--wa-color-text: var(--wa-ink);--wa-color-heading: var(--wa-ink);--wa-color-heading-strong: #fffdf3;--wa-color-copy: #d9d4c8;--wa-color-muted: #aaa396;--wa-color-inverse: #10100d;--wa-color-dark-surface: #f7f4ea;--wa-color-soft-surface: #25241f;--wa-color-input-line: #504d45;--wa-line-08: rgba(255, 253, 243, .08);--wa-line-10: rgba(255, 253, 243, .1);--wa-line-12: rgba(255, 253, 243, .12);--wa-line-16: rgba(255, 253, 243, .16);--wa-line-20: rgba(255, 253, 243, .2);--wa-placeholder: rgba(255, 253, 243, .38);--wa-browser-bar-bg: rgba(25, 25, 20, .96);--wa-window-highlight: rgba(255, 253, 243, .08);--wa-window-hairline: rgba(0, 0, 0, .24);--wa-card-accent-bg: rgba(242, 59, 10, .2);--wa-row-bg: rgba(255, 253, 243, .06);--wa-color-user-message: #2d2b26;--wa-color-data-table-surface: #20201a;--wa-media-shadow: 0 44px 96px rgba(0, 0, 0, .38);--wa-window-shadow: 0 52px 42px rgba(0, 0, 0, .42);--wa-card-shadow: 0 10px 28px rgba(0, 0, 0, .24);--wa-tight-shadow: 0 2px 6px rgba(0, 0, 0, .18);--wa-data-table-shadow: var(--wa-tight-shadow);color-scheme:dark}@media(prefers-color-scheme:dark){.wa-section[data-theme=system]{--wa-bg: #10100d;--wa-panel: #191914;--wa-panel-transparent: rgba(25, 25, 20, 0);--wa-ink: #f7f4ea;--wa-muted: #f7f4ea;--wa-soft: #49473f;--wa-browser-line: #3d3b34;--wa-color-bg: var(--wa-bg);--wa-color-panel: var(--wa-panel);--wa-color-text: var(--wa-ink);--wa-color-heading: var(--wa-ink);--wa-color-heading-strong: #fffdf3;--wa-color-copy: #d9d4c8;--wa-color-muted: #aaa396;--wa-color-inverse: #10100d;--wa-color-dark-surface: #f7f4ea;--wa-color-soft-surface: #25241f;--wa-color-user-message: #2d2b26;--wa-color-input-line: #504d45;--wa-line-08: rgba(255, 253, 243, .08);--wa-line-10: rgba(255, 253, 243, .1);--wa-line-12: rgba(255, 253, 243, .12);--wa-line-16: rgba(255, 253, 243, .16);--wa-line-20: rgba(255, 253, 243, .2);--wa-placeholder: rgba(255, 253, 243, .38);--wa-browser-bar-bg: rgba(25, 25, 20, .96);--wa-window-highlight: rgba(255, 253, 243, .08);--wa-window-hairline: rgba(0, 0, 0, .24);--wa-card-accent-bg: rgba(242, 59, 10, .2);--wa-row-bg: rgba(255, 253, 243, .06);--wa-color-data-table-surface: #20201a;--wa-media-shadow: 0 44px 96px rgba(0, 0, 0, .38);--wa-window-shadow: 0 52px 42px rgba(0, 0, 0, .42);--wa-card-shadow: 0 10px 28px rgba(0, 0, 0, .24);--wa-tight-shadow: 0 2px 6px rgba(0, 0, 0, .18);--wa-data-table-shadow: var(--wa-tight-shadow);color-scheme:dark}}.wa-section[data-resolved-theme=dark]{--wa-signup-muted: #aaa396;--wa-signup-field-bg: #20201a;--wa-signup-field-border: #504d45;--wa-signup-field-shadow: 0 14px 28px rgba(0, 0, 0, .32);--wa-signup-placeholder: rgba(255, 253, 243, .38);--wa-signup-submit-bg: #5f5b51;--wa-signup-submit-active-bg: var(--wa-color-dark-surface);--wa-signup-submit-color: var(--wa-color-inverse);--wa-strategy-surface-bg: #20201a;--wa-strategy-surface-hover-bg: #25241f;--wa-strategy-surface-border: var(--wa-line-12);--wa-strategy-surface-shadow: var(--wa-tight-shadow);--wa-strategy-surface-hover-shadow: var(--wa-tight-shadow);--wa-strategy-title-color: var(--wa-color-heading-strong);--wa-strategy-bullet-color: var(--wa-color-muted);--wa-strategy-hover-border: rgba(255, 253, 243, .24);--wa-highlight-bg: rgba(213, 255, 79, .16);--wa-thinking-text: #d8d1c3;--wa-thinking-label: #d8d1c3;--wa-thinking-detail: #aaa396;--wa-thinking-muted: #918b7f;--wa-thinking-line: rgba(255, 253, 243, .16);--wa-thinking-dot: #aaa396;--wa-thinking-chevron: #d8d1c3;--wa-thinking-logo: #d8d1c3;--wa-thinking-logo-shadow: #6c665c;--wa-thinking-shimmer: #fffdf3;--wa-thinking-shimmer-strong: #aaa396;--wa-thinking-tool-shimmer: #d8d1c3;--wa-thinking-tool-shimmer-strong: #918b7f;--wa-thinking-favicon-bg: #343229;--wa-thinking-favicon-text: #d8d1c3;--wa-drop-color: #d8d1c3;--wa-drop-bg: rgba(32, 32, 26, .9);--wa-drop-inset: rgba(255, 253, 243, .04);--wa-drop-active-bg: rgba(42, 32, 26, .94);--wa-drop-active-inset: rgba(242, 59, 10, .1);--wa-drop-complete-bg: rgba(32, 32, 26, .9);--wa-drop-title: var(--wa-color-heading-strong);--wa-drop-muted: var(--wa-color-muted);--wa-file-surface: #20201a;--wa-file-floating-surface: rgba(32, 32, 26, .96);--wa-file-text: var(--wa-color-heading-strong);--wa-file-muted: var(--wa-color-muted);--wa-file-shadow: 0 16px 30px rgba(0, 0, 0, .36);--wa-table-text: #c7c1b6;--wa-table-strong: var(--wa-color-heading-strong);--wa-table-muted: var(--wa-color-muted);--wa-table-empty: #6f695e;--wa-table-line: var(--wa-line-12);--wa-table-scrollbar: rgba(255, 253, 243, .18);--wa-table-scrollbar-thumb: rgba(255, 253, 243, .2);--wa-table-control-bg: #25241f;--wa-table-control-border: var(--wa-line-16);--wa-table-control-hover: rgba(255, 253, 243, .28);--wa-table-selected-bg: var(--wa-color-dark-surface);--wa-table-selected-shadow: 0 7px 16px rgba(0, 0, 0, .28);--wa-table-badge-text: #e8ca6f;--wa-table-badge-bg: rgba(246, 186, 66, .2);--wa-table-dot: #6f695e;--wa-table-dot-active: var(--wa-color-heading-strong);--wa-table-page: var(--wa-color-muted);--wa-table-page-disabled: #5e584e;--wa-table-enriched-text: #65d1c3;--wa-table-enriched-header: #87ded5;--wa-table-enriched-bg: rgba(101, 209, 195, .14);--wa-waterfall-arrow: #6f695e;--wa-waterfall-chip-bg: #25241f;--wa-waterfall-chip-border: var(--wa-line-12);--wa-waterfall-chip-text: var(--wa-color-muted);--wa-waterfall-loading-text: #d8d1c3;--wa-waterfall-loading-bg: #25241f;--wa-waterfall-loading-strong: #fffdf3;--wa-waterfall-loading-glint: #918b7f;--wa-waterfall-complete-bg: #25241f;--wa-mailbox-card-bg: #20201a;--wa-mailbox-card-border: var(--wa-line-12);--wa-mailbox-card-inset: rgba(255, 253, 243, .04);--wa-mailbox-button-bg: #25241f;--wa-mailbox-button-border: var(--wa-line-16);--wa-mailbox-button-text: var(--wa-color-heading-strong);--wa-mailbox-connected-text: #918b7f;--wa-mailbox-connected-border: var(--wa-line-12);--wa-mailbox-spinner-border: rgba(255, 253, 243, .2);--wa-mailbox-learning-title: #d8d1c3;--wa-mailbox-learning-ready: var(--wa-color-heading-strong);--wa-mailbox-learning-detail: var(--wa-color-muted);--wa-mailbox-thumbprint: var(--wa-color-heading-strong);--wa-mailbox-progress-bg: var(--wa-line-16);--wa-sequence-tab-line-stroke: var(--wa-line-16);--wa-sequence-person-bg: color-mix(in srgb, var(--wa-panel) 84%, #2f2d26);--wa-sequence-person-border: rgba(255, 253, 243, .18);--wa-sequence-person-active-border: rgba(255, 253, 243, .28);--wa-sequence-dot-color: #6f695e;--wa-sequence-dot-selected: var(--wa-color-heading-strong);--wa-sequence-step-muted: var(--wa-color-muted);--wa-sequence-step-selected: var(--wa-color-heading-strong);--wa-sequence-wait: #aaa396;--wa-sequence-panel-header-bg: #25241f;--wa-sequence-panel-line: var(--wa-line-12);--wa-sequence-panel-muted: var(--wa-color-muted);--wa-sequence-panel-strong: var(--wa-color-heading-strong);--wa-sequence-field-border: var(--wa-line-20);--wa-sequence-field-text: var(--wa-color-heading-strong);--wa-sequence-connect-muted: var(--wa-color-muted);--wa-sequence-call-copy: #d8d1c3;--wa-sequence-call-muted: var(--wa-color-muted);--wa-sequence-call-avatar-bg: #343229;--wa-sequence-call-button-bg: var(--wa-color-dark-surface);--wa-sequence-call-button-text: var(--wa-color-inverse);--wa-sequence-draft-bg: #25241f;--wa-sequence-draft-border: var(--wa-line-12);--wa-sequence-panel-shadow: var(--wa-tight-shadow);--wa-composer-shadow: 0 14px 28px rgba(0, 0, 0, .32), 0 4px 10px rgba(0, 0, 0, .24), 0 1px 0 rgba(255, 253, 243, .08) inset}.wa-section button,.wa-section input,.wa-section textarea,.wa-section select{font:inherit}.wa-section textarea{resize:none}.wa-section__inner{position:relative;z-index:1;display:grid;grid-template-columns:var(--wa-left-column) var(--wa-right-column);grid-template-rows:auto auto;column-gap:var(--wa-column-gap);row-gap:var(--wa-row-gap);align-items:start;width:min(var(--wa-content-max),100%);margin:0 auto}.wa-copy{grid-column:1 / -1;max-width:var(--wa-copy-max)}.wa-copy__title{display:block;margin:0;color:var(--wa-color-heading);font-family:var(--wa-font-sans);font-size:var(--wa-title-size);line-height:var(--wa-title-line-height);font-weight:400;letter-spacing:-.02em}.wa-copy__title>span{display:block}.wa-copy__title em{color:var(--wa-orange);font-style:normal}.wa-story-controls{position:relative;z-index:4;grid-column:1;grid-row:2;display:grid;gap:22px;top:var(--wa-story-controls-y-offset);left:var(--wa-story-controls-x-offset);width:calc(100% + var(--wa-story-controls-width-extra));padding-top:4px}.wa-story-tabs{display:grid;gap:var(--wa-story-tabs-gap)}.wa-story-tab{--wa-tab-progress: 0;display:grid;grid-template-columns:4px minmax(0,1fr);gap:30px;align-items:stretch;width:100%;min-height:0;padding:var(--wa-story-tab-y-padding) 0;border:0;color:var(--wa-color-heading-strong);background:transparent;text-align:left;cursor:pointer}.wa-story-tab__marker{position:relative;display:block;align-self:stretch;width:4px;min-height:0;margin-block:calc(-1 * var(--wa-story-tab-y-padding));overflow:hidden;background:var(--wa-soft);cursor:ns-resize;touch-action:none}.wa-story-tab__marker:before{content:"";position:absolute;inset:0;background:var(--wa-soft);transform:scaleY(var(--wa-tab-progress));transform-origin:top;transition:transform .12s linear}.wa-story-tab__marker:after{content:"";position:absolute;inset:0 -8px}.wa-story-tab.is-active .wa-story-tab__marker:before{background:var(--wa-color-accent)}.wa-story-tab__marker[data-scrubbing=true]:before{transition:none}.wa-story-tab__body{display:block;padding-top:0}.wa-story-tab__title{display:block;color:var(--wa-color-heading-strong);font-size:var(--wa-feature-title-size);line-height:1.08;font-weight:400;letter-spacing:-.02em;transition:opacity .16s ease}.wa-story-tab__description{display:block;max-width:520px;max-height:150px;margin-top:var(--wa-story-description-gap);overflow:hidden;color:var(--wa-color-copy);font-size:var(--wa-feature-copy-size);line-height:1.4;font-weight:400;opacity:1;transform:translateY(0);transition:max-height .26s cubic-bezier(.2,.8,.2,1),margin-top .22s cubic-bezier(.2,.8,.2,1),opacity .16s ease,transform .22s cubic-bezier(.2,.8,.2,1);will-change:max-height,margin-top,opacity,transform}.wa-story-tab__link{color:inherit;text-decoration:underline;text-decoration-thickness:.06em;text-underline-offset:.12em;cursor:pointer}.wa-story-tab__link:hover{color:var(--wa-color-heading-strong)}.wa-story-tab__link:focus-visible{outline:2px solid currentColor;outline-offset:3px;border-radius:3px}.wa-story-tab:not(.is-active) .wa-story-tab__title,.wa-story-tab:not(.is-active) .wa-story-tab__description{opacity:.6}.wa-story-tab:not(.is-active) .wa-story-tab__description{max-height:0;margin-top:0;opacity:0;transform:translateY(-5px)}.wa-story-tab__count,.wa-story-count{display:none}.wa-controls-row{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.wa-control-button svg{display:block;width:16px;height:16px;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;fill:none}.wa-stage{--wa-window-scene-scale: 1;--wa-window-scene-width: var(--wa-window-width);--wa-window-scene-height: var(--wa-stage-min-height);--wa-window-scene-unscaled-height: var(--wa-window-height);--wa-window-scene-min-width: 0px;position:relative;grid-column:2;grid-row:2;width:var(--wa-stage-width);min-height:var(--wa-stage-min-height);top:var(--wa-stage-y-offset)}.wa-stage[data-window-content-scale]{height:var(--wa-window-scene-height);min-height:var(--wa-window-scene-height)}.wa-stage__media{position:absolute;top:-38px;right:-44px;width:var(--wa-media-width);height:var(--wa-media-height);border-radius:3px;background-image:var(--wa-media-image);background-position:center;background-size:cover;box-shadow:var(--wa-media-shadow);opacity:1;pointer-events:none}.wa-window{position:relative;z-index:2;width:var(--wa-window-width);margin:108px 0 0 70px;border-radius:var(--wa-radius-window);box-shadow:var(--wa-window-shadow);transform-origin:top left}.wa-stage[data-window-content-scale] .wa-window{position:absolute;top:0;left:50%;width:var(--wa-window-scene-width);margin:0;transform:translate(-50%) scale(var(--wa-window-scene-scale));transform-origin:top center;will-change:transform}.wa-stage[data-window-content-scale] .wa-chat-shell{height:var(--wa-window-scene-unscaled-height);max-height:none}.wa-chat-shell{position:relative;display:grid;grid-template-rows:auto minmax(0,1fr);height:var(--wa-window-height);max-height:var(--wa-window-max-height);overflow:visible;border:1px solid var(--wa-browser-line);border-radius:var(--wa-radius-window);background:var(--wa-panel);background-clip:padding-box;box-shadow:0 1px 0 var(--wa-window-highlight) inset,0 0 0 1px var(--wa-window-hairline)}.wa-chat-shell__bar{--wa-browser-tab-left: 90px;--wa-browser-tab-width: 100px;position:relative;display:flex;align-items:center;height:48px;padding:0 18px;border-bottom:0;border-radius:calc(var(--wa-radius-window) - 1px) calc(var(--wa-radius-window) - 1px) 0 0;background:var(--wa-browser-bar-bg);overflow:hidden}.wa-chat-shell__bar:after{content:"";position:absolute;right:0;bottom:0;left:0;height:1px;background:linear-gradient(to right,var(--wa-browser-line) 0,var(--wa-browser-line) var(--wa-browser-tab-left),transparent var(--wa-browser-tab-left),transparent calc(var(--wa-browser-tab-left) + var(--wa-browser-tab-width)),var(--wa-browser-line) calc(var(--wa-browser-tab-left) + var(--wa-browser-tab-width)),var(--wa-browser-line) 100%);pointer-events:none}.wa-chat-shell__lights{display:flex;gap:8px;align-items:center}.wa-chat-shell__lights span{width:12px;height:12px;border-radius:999px;background:var(--wa-red)}.wa-chat-shell__lights span:nth-child(2){background:var(--wa-yellow)}.wa-chat-shell__lights span:nth-child(3){background:var(--wa-green)}.wa-chat-shell__tab{position:absolute;left:var(--wa-browser-tab-left);bottom:-1px;display:inline-flex;align-items:center;gap:9px;height:36px;min-width:100px;padding:0 13px;border:1px solid var(--wa-browser-line);border-bottom:0;border-radius:8px 8px 0 0;background:var(--wa-panel)}.wa-chat-shell__mark{display:block;flex:0 0 auto;width:18px;height:11px}.wa-chat-shell__title{color:var(--wa-color-text);font-size:16px;line-height:1;font-weight:560}.wa-chat-shell__body{position:relative;display:grid;grid-template-rows:minmax(0,1fr);align-content:stretch;gap:0;min-height:0;padding:0 var(--wa-chat-x-padding);overflow:visible;clip-path:inset(0 calc(-1 * var(--wa-chat-shadow-gutter)) 0 calc(-1 * var(--wa-chat-shadow-gutter)) round 0 0 calc(var(--wa-radius-window) - 1px) calc(var(--wa-radius-window) - 1px));border-radius:0 0 calc(var(--wa-radius-window) - 1px) calc(var(--wa-radius-window) - 1px);background:var(--wa-panel);background-clip:padding-box}.wa-chat-shell__body:before{content:"";position:absolute;z-index:1;top:0;right:0;left:0;height:var(--wa-chat-top-fade);background:linear-gradient(to bottom,var(--wa-panel) 0,var(--wa-panel-transparent) 100%);pointer-events:none}.wa-signup-scene{position:absolute;inset:0;z-index:0;display:grid;align-content:center;justify-items:center;gap:12px;min-height:0;padding-bottom:0;color:var(--wa-ink)}.wa-signup-scene__logo{display:block;width:42px;aspect-ratio:18 / 11;margin-bottom:-2px;color:var(--wa-orange);pointer-events:none}.wa-signup-scene__logo svg{display:block;width:100%;height:100%}.wa-signup-scene__title{margin:0 0 18px;color:var(--wa-signup-muted);font-family:var(--wa-font-feature);font-size:34px;line-height:1;font-weight:400;letter-spacing:0}.wa-signup-field{display:grid;grid-template-columns:minmax(0,1fr) 38px;align-items:center;gap:10px;width:min(360px,72%);min-height:56px;padding:0 9px 0 17px;overflow:hidden;border:1px solid var(--wa-signup-field-border);border-radius:15px;color:var(--wa-ink);background:var(--wa-signup-field-bg);box-shadow:var(--wa-signup-field-shadow);font-size:16px;line-height:1.2;font-weight:410;white-space:nowrap}.wa-signup-field [data-signup-email]:empty:before{content:"email@work.com";color:var(--wa-signup-placeholder)}.wa-signup-field [data-signup-email]{transform:translateY(-1px)}.wa-signup-field [data-signup-email]:after{content:"";display:inline-block;width:1px;height:17px;margin-left:1px;background:currentColor;transform:translateY(3px);animation:wa-caret .92s steps(1,end) infinite}.wa-signup-field__submit{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;padding:0;border:0;border-radius:999px;color:var(--wa-signup-submit-color);background:var(--wa-signup-submit-bg);cursor:default}.wa-signup-scene[data-signup-filled=true] .wa-signup-field__submit,.wa-signup-scene[data-signup-submitted=true] .wa-signup-field__submit{background:var(--wa-signup-submit-active-bg)}.wa-signup-field__submit-icon{display:block;width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.wa-thread{position:relative;z-index:0;display:grid;gap:var(--wa-chat-entry-gap);align-content:start;justify-self:start;box-sizing:border-box;width:calc(100% + var(--wa-chat-thread-bleed) + var(--wa-chat-thread-bleed));height:100%;min-height:0;max-height:none;margin-inline:calc(-1 * var(--wa-chat-thread-bleed));padding-inline:var(--wa-chat-thread-bleed);padding-bottom:calc(var(--wa-thread-base-bottom-padding) + var(--wa-thread-growth-spacer));overflow:hidden;overflow-anchor:none;overscroll-behavior:auto}.wa-thread>.wa-message:first-child,.wa-message--first-active{margin-top:var(--wa-chat-first-entry-offset)}.wa-section.wa-sequence-sandbox{min-height:100svh;overflow:auto;padding:28px}.wa-sequence-sandbox .wa-section__inner{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;width:min(1240px,100%)}.wa-sequence-sandbox .wa-copy,.wa-sequence-sandbox .wa-story-controls,.wa-sequence-sandbox .wa-stage__media,.wa-sequence-sandbox .wa-composer,.wa-sequence-sandbox .wa-signup-scene,.wa-sequence-sandbox .wa-history-resume,.wa-sequence-sandbox .wa-sequence-actions,.wa-sequence-sandbox .wa-sequence-kickoff{display:none!important}.wa-sequence-sandbox__header{display:flex;gap:24px;align-items:end;justify-content:space-between}.wa-sequence-sandbox__copy{display:grid;gap:6px;max-width:720px}.wa-sequence-sandbox__eyebrow{margin:0;color:var(--wa-orange);font-size:12px;line-height:1;font-weight:620}.wa-sequence-sandbox__title{margin:0;color:var(--wa-ink);font-size:48px;line-height:1;font-weight:520}.wa-sequence-sandbox__note{margin:0;color:var(--wa-color-muted);font-size:14px;line-height:1.45;font-weight:410}.wa-sequence-sandbox__back{flex:0 0 auto;color:var(--wa-color-muted);font-size:13px;line-height:1;font-weight:520;text-decoration:none}.wa-sequence-sandbox__back:hover{color:var(--wa-ink)}.wa-sequence-sandbox .wa-stage{grid-column:1;grid-row:auto;justify-self:center;width:min(100%,1240px);min-height:0}.wa-sequence-sandbox .wa-window{width:100%;margin:0}.wa-sequence-sandbox .wa-chat-shell{height:auto;min-height:620px}.wa-sequence-sandbox .wa-chat-shell__body{min-height:570px;padding:0}.wa-sequence-sandbox .wa-chat-shell__body:before{content:none}.wa-sequence-sandbox .wa-thread{width:100%;height:auto;margin-inline:0;padding:34px 0 42px;overflow:visible}.wa-sequence-sandbox .wa-sequence-engagement__header{display:none}.wa-sequence-sandbox .wa-message{max-width:calc(100% + 16px)}.wa-sequence-sandbox .wa-message--component{width:100%}.wa-section[data-active-story=crm-update]{--wa-chat-first-entry-offset: calc(var(--wa-chat-top-fade) + 3px)}.wa-section[data-active-story=data-marketplace] .wa-thread{min-height:0;max-height:none}.wa-section[data-active-story=data-marketplace] .wa-result-grid{display:none}.wa-message{display:grid;grid-template-columns:minmax(0,max-content);gap:0;align-items:end;max-width:90%}.wa-message[data-message-role=user]{justify-self:end;grid-template-columns:minmax(0,max-content)}.wa-message[data-message-role=user]+.wa-message[data-message-role=assistant],.wa-message[data-message-role=assistant]+.wa-message[data-message-role=user]{margin-top:var(--wa-chat-entry-gap)}.wa-message[data-message-role=assistant]:not(.wa-message--component){width:min(100%,var(--wa-ai-message-max-width));grid-template-columns:minmax(0,1fr)}.wa-message[data-message-role=assistant]:not(.wa-message--component) .wa-message__body{padding-right:0;padding-left:0}.wa-message__avatar{display:none;width:24px;height:24px;border:1px solid var(--wa-line-10);border-radius:7px;background:var(--wa-color-dark-surface)}.wa-message[data-message-role=user] .wa-message__avatar{grid-column:2;background:var(--wa-orange)}.wa-message__body{width:100%;max-width:var(--wa-ai-message-max-width);padding:10px 12px;border:0;border-radius:8px;color:var(--wa-ink);background:transparent;font-size:16px;line-height:1.35;font-weight:var(--wa-chat-message-weight);overflow-wrap:anywhere}.wa-message[data-message-role=user] .wa-message__body{grid-column:1;grid-row:1;width:auto;max-width:var(--wa-user-message-max-width);background:var(--wa-color-user-message);color:var(--wa-ink)}.wa-message[data-message-role=assistant] .wa-message__body[data-streaming=true]:after{content:"";display:inline-block;width:1px;height:1em;margin-left:2px;background:currentColor;vertical-align:-.14em;animation:wa-caret .92s steps(1,end) infinite}.wa-message--component{grid-template-columns:minmax(0,1fr);width:100%;max-width:calc(100% + 16px);align-items:start}.wa-message--component .wa-message__avatar{margin-top:0}.wa-message--component .wa-message__body{width:100%;max-width:none;padding:0;border:0;background:transparent;overflow:visible}.wa-message--file{width:auto;max-width:90%;justify-self:end}.wa-message--file .wa-message__body{width:auto;max-width:none;justify-self:end;padding:0;background:transparent}.wa-message[data-message-role=user].wa-message--file .wa-message__body{max-width:none;background:transparent}.wa-thinking-block{--wa-thinking-icon-column: 18px;--wa-thinking-column-gap: 8px;--wa-thinking-guide-top: -9px;--wa-thinking-rail-x-adjust: -.5px;position:relative;display:grid;align-content:start;align-items:start;justify-items:start;gap:11px;min-width:0}.wa-thinking{position:relative;display:inline-grid;grid-template-columns:var(--wa-thinking-icon-column) auto;align-items:center;justify-content:start;gap:var(--wa-thinking-column-gap);justify-self:start;min-height:18px;padding:0;color:var(--wa-thinking-text);background:transparent;font-size:14px;line-height:1.28;font-weight:var(--wa-chat-thinking-header-weight);overflow:visible}.wa-thinking__glyph{position:relative;display:inline-block;width:18px;height:11px;opacity:1;color:var(--wa-thinking-logo);transform-origin:center;transition:opacity .12s ease}.wa-thinking__glyph:after,.wa-thinking-logo-traveler:after{content:"";position:absolute;inset:0;display:block;width:18px;height:11px;opacity:0;background:linear-gradient(100deg,var(--wa-thinking-logo) 0%,var(--wa-thinking-logo) 30%,#f23b0a 48%,var(--wa-thinking-logo-shadow) 58%,var(--wa-thinking-logo) 74%,var(--wa-thinking-logo) 100%);background-position:120% 50%;background-size:260% 100%;pointer-events:none;-webkit-mask:var(--wa-thinking-logo-mask) center / 18px 11px no-repeat;mask:var(--wa-thinking-logo-mask) center / 18px 11px no-repeat}.wa-thinking__glyph[data-logo-role=shadow]{color:var(--wa-thinking-logo-shadow);opacity:.88}.wa-thinking-logo-traveler{position:absolute;top:0;left:0;z-index:4;display:inline-block;width:18px;height:11px;color:var(--wa-thinking-logo);pointer-events:none;transform-origin:center}.wa-thinking__logo-mark{display:block;width:18px;height:11px;overflow:visible}.wa-thinking__glyph[data-logo-mode=thinking]:not([data-logo-role=shadow]) .wa-thinking__logo-mark,.wa-thinking-logo-traveler[data-logo-mode=thinking] .wa-thinking__logo-mark{opacity:0}.wa-thinking__glyph[data-logo-mode=thinking]:not([data-logo-role=shadow]):after,.wa-thinking-logo-traveler[data-logo-mode=thinking]:after{opacity:1;animation:wa-thinking-logo-gradient 1.28s linear infinite}.wa-thinking__glyph[data-logo-mode=done]:not([data-logo-role=shadow]),.wa-thinking-logo-traveler[data-logo-mode=done]{opacity:.72}.wa-thinking__title{color:var(--wa-thinking-text);line-height:inherit;overflow:visible}.wa-thinking__chevron{display:none;position:absolute;top:50%;left:2px;width:14px;height:14px;opacity:0;border-radius:999px;background:var(--wa-panel);box-shadow:0 0 0 3px var(--wa-panel);pointer-events:none;transform:translateY(-50%);transition:opacity .12s ease}.wa-thinking__chevron:before{content:"";position:absolute;top:4px;left:4px;width:5px;height:5px;border-right:1px solid var(--wa-thinking-chevron);border-bottom:1px solid var(--wa-thinking-chevron);transform:rotate(-45deg);transition:top .16s ease,transform .16s ease}.wa-thinking[data-thinking-collapsed=true] .wa-thinking__chevron{display:block;opacity:0}.wa-thinking[data-thinking-expanded=true] .wa-thinking__chevron{display:block;opacity:1}.wa-thinking[data-thinking-collapsed=true]{cursor:pointer}.wa-thinking[data-thinking-collapsed=true]:hover .wa-thinking__chevron{opacity:1}.wa-thinking[data-thinking-collapsed=true]:hover .wa-thinking__glyph[data-logo-role=shadow],.wa-thinking[data-thinking-expanded=true] .wa-thinking__glyph[data-logo-role=shadow]{opacity:0}.wa-thinking-block:has(.wa-thinking[data-thinking-collapsed=true]:hover) .wa-thinking-logo-traveler,.wa-thinking-block:has(.wa-thinking[data-thinking-expanded=true]) .wa-thinking-logo-traveler{opacity:0!important;visibility:hidden!important}.wa-thinking[data-thinking-expanded=true] .wa-thinking__chevron:before{top:3px;transform:rotate(45deg)}.wa-research-steps{--wa-thinking-guide-end: var(--wa-thinking-guide-top);position:relative;display:grid;align-content:start;gap:11px;max-height:none;overflow:visible;padding:1px 0 0}.wa-research-steps:before{content:"";position:absolute;top:var(--wa-thinking-guide-top);left:calc((var(--wa-thinking-icon-column) / 2) + var(--wa-thinking-rail-x-adjust));width:1px;height:max(0px,calc(var(--wa-thinking-guide-end) - var(--wa-thinking-guide-top)));background:var(--wa-thinking-line)}.wa-research-step{--wa-step-progress: 0;position:relative;display:grid;grid-template-columns:var(--wa-thinking-icon-column) minmax(0,1fr);align-content:start;gap:var(--wa-thinking-column-gap);align-items:start;min-height:0;overflow:visible;padding:0;color:var(--wa-thinking-text);background:transparent;font-size:14px;line-height:1.24;font-weight:var(--wa-chat-thinking-weight)}.wa-research-step[data-step-state=complete]{align-items:start}.wa-research-step__marker{position:relative;z-index:1;justify-self:center;width:12px;height:12px;margin-top:2px;background:var(--wa-panel)}.wa-research-step__marker:before,.wa-research-step__marker:after{content:"";position:absolute}.wa-research-step__marker:before{top:4px;left:4px;width:4px;height:4px;border-radius:999px;background:var(--wa-thinking-dot);opacity:0;transform:scale(.74);transition:opacity .16s ease,transform .18s ease}.wa-research-step[data-step-state=complete] .wa-research-step__marker:before{opacity:1;transform:scale(1)}.wa-research-step[data-step-state=failed] .wa-research-step__marker:before{opacity:1;background:#e1544c;transform:scale(1)}.wa-research-step__body{position:relative;z-index:1;display:grid;align-content:start;gap:4px;min-width:0}.wa-research-step__label-row{position:relative;display:inline-grid;grid-template-columns:minmax(0,auto) 24px;column-gap:var(--wa-thinking-column-gap);row-gap:2px;align-items:start;justify-self:start;max-width:calc(100% + var(--wa-thinking-icon-column) + var(--wa-thinking-column-gap));margin-left:calc((var(--wa-thinking-icon-column) + var(--wa-thinking-column-gap)) * -1);min-width:0;padding-left:calc(var(--wa-thinking-icon-column) + var(--wa-thinking-column-gap))}.wa-research-step[data-step-state=complete] .wa-research-step__label-row{cursor:pointer}.wa-research-step__label{grid-column:1;grid-row:1;flex:0 1 auto;min-width:0;max-width:100%;color:var(--wa-thinking-label);font-size:14px;line-height:1.18;font-weight:var(--wa-chat-thinking-weight);overflow:visible;overflow-wrap:break-word;text-overflow:clip;white-space:normal}.wa-research-step__elapsed{grid-column:2;grid-row:1;display:none;flex:0 0 auto;align-self:start;justify-self:start;margin-top:1px;color:var(--wa-thinking-muted);font-size:13px;line-height:1.18;font-weight:var(--wa-chat-thinking-weight);white-space:nowrap}.wa-research-step__detail{display:-webkit-box;min-width:0;margin-top:2px;overflow:hidden;color:var(--wa-thinking-detail);font-size:13px;line-height:1.48;font-weight:var(--wa-chat-detail-weight);white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}.wa-research-step__detail[data-has-tool-calls=true]{display:grid;gap:8px;overflow:visible;-webkit-line-clamp:initial}.wa-research-step__detail-text{display:block;min-width:0}.wa-research-step__tool-calls{display:grid;gap:6px;min-width:0}.wa-research-step__tool-call{display:grid;grid-template-columns:14px minmax(0,1fr);gap:8px;align-items:center;min-width:0}.wa-research-step__tool-icon{display:grid;place-items:center;width:14px;height:14px}.wa-research-step__tool-icon>*{grid-area:1 / 1}.wa-research-step__tool-favicon{display:grid;place-items:center;width:14px;height:14px;overflow:hidden;border-radius:4px;background:var(--wa-thinking-favicon-bg);color:var(--wa-thinking-favicon-text);font-size:8px;line-height:1;font-weight:650;text-transform:uppercase}.wa-research-step__tool-favicon[data-tool-service=salesforce]{border-radius:0;background:transparent}.wa-research-step__tool-favicon[data-tool-service=theswarm],.wa-research-step__tool-favicon[data-tool-service=swarm]{border-radius:999px;clip-path:circle(50%)}.wa-research-step__tool-favicon img{display:block;width:14px;height:14px;object-fit:cover}.wa-research-step__tool-call[data-tool-call-state=active] .wa-research-step__tool-favicon img{animation:wa-tool-call-favicon-shimmer 1.35s ease-in-out infinite}.wa-research-step__tool-check{display:block;width:14px;height:14px;color:var(--wa-thinking-text);transform-box:fill-box;transform-origin:center}.wa-research-step__tool-label{display:inline-block;min-width:0;max-width:100%;overflow-wrap:anywhere}.wa-sequence-thinking-progress{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:center;min-width:0;padding-top:2px}.wa-sequence-thinking-progress[data-sequence-enrollment-progress=true]{grid-template-columns:minmax(0,1fr);width:min(220px,100%);padding-top:4px}.wa-sequence-thinking-progress[data-sequence-enrollment-progress=true] .wa-sequence-thinking-progress__count{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.wa-sequence-thinking-progress__count{color:var(--wa-thinking-muted);font-size:10px;line-height:1;font-weight:560;font-variant-numeric:tabular-nums}.wa-sequence-thinking-progress__bar{display:block;height:4px;overflow:hidden;border-radius:999px;background:var(--wa-thinking-line)}.wa-sequence-thinking-progress__bar span{display:block;width:100%;height:100%;border-radius:inherit;background:var(--wa-thinking-text);transform:scaleX(.02);transform-origin:left center}.wa-thinking__title[data-thinking-active=true],.wa-thinking__title[data-streaming=true],.wa-research-step__label[data-streaming=true]{color:transparent;background:linear-gradient(105deg,var(--wa-thinking-label) 0%,var(--wa-thinking-label) 30%,var(--wa-thinking-shimmer) 46%,var(--wa-thinking-shimmer-strong) 58%,var(--wa-thinking-label) 74%,var(--wa-thinking-label) 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:wa-text-shimmer 1.35s ease-in-out infinite}.wa-research-step__tool-call[data-tool-call-state=active] .wa-research-step__tool-label,.wa-research-step__tool-label[data-streaming=true]{color:transparent;background:linear-gradient(105deg,var(--wa-thinking-detail) 0%,var(--wa-thinking-detail) 30%,var(--wa-thinking-tool-shimmer) 46%,var(--wa-thinking-tool-shimmer-strong) 58%,var(--wa-thinking-detail) 74%,var(--wa-thinking-detail) 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:wa-text-shimmer 1.35s ease-in-out infinite}.wa-thinking__title[data-streaming=true]:after,.wa-research-step__label[data-streaming=true]:after,.wa-research-step__detail[data-streaming=true]:after,.wa-research-step__detail-text[data-streaming=true]:after,.wa-research-step__tool-label[data-streaming=true]:after{content:"";display:inline-block;width:1px;height:1em;margin-left:2px;background:var(--wa-thinking-label);vertical-align:-.12em;animation:wa-caret .92s steps(1,end) infinite}.wa-research-step__detail[data-streaming=true]:after,.wa-research-step__detail-text[data-streaming=true]:after,.wa-research-step__tool-label[data-streaming=true]:after{background:var(--wa-thinking-detail)}.wa-research-step__chevron{grid-column:1;grid-row:1;display:none;position:absolute;z-index:1;flex:0 0 8px;align-self:start;justify-self:start;top:1px;left:calc((var(--wa-thinking-icon-column) + var(--wa-thinking-column-gap)) * -1 + 2px);width:14px;height:14px;margin-top:0;opacity:0;border-radius:999px;background:var(--wa-panel);box-shadow:0 0 0 3px var(--wa-panel);pointer-events:none;transition:opacity .12s ease}.wa-research-step__chevron:before{content:"";position:absolute;top:4px;left:4px;width:5px;height:5px;border-right:1px solid var(--wa-thinking-chevron);border-bottom:1px solid var(--wa-thinking-chevron);transform:rotate(-45deg);transition:top .16s ease,transform .16s ease}.wa-research-step[data-detail-collapsed=true] .wa-research-step__chevron{display:block;opacity:0}.wa-research-step[data-step-state=complete] .wa-research-step__chevron{pointer-events:none}.wa-research-step[data-step-state=complete] .wa-research-step__label-row:hover .wa-research-step__chevron{opacity:1}.wa-research-step[data-step-state=complete]:has(.wa-research-step__label-row:hover) .wa-research-step__marker:before{opacity:0;transform:scale(.74)}.wa-research-step[data-detail-collapsed=true] .wa-research-step__chevron:before{top:4px;transform:rotate(-45deg)}.wa-research-step[data-detail-expanded=true] .wa-research-step__chevron{display:block;opacity:1}.wa-research-step[data-detail-expanded=true] .wa-research-step__chevron:before{top:3px;transform:rotate(45deg)}.wa-research-step[data-detail-expanded=true] .wa-research-step__marker:before{opacity:0;transform:scale(.74)}.wa-result-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;min-height:0}.wa-result-grid.has-strategy-plans{grid-template-columns:minmax(0,1fr);gap:14px;overflow-x:visible}.wa-message--strategy,.wa-message--strategy .wa-message__body,.wa-message--style,.wa-message--style .wa-message__body{overflow-x:visible}.wa-result-grid.has-data-table,.wa-result-grid.has-enrichment-panel{grid-template-columns:minmax(0,1fr)}.wa-csv-drop{position:absolute;inset:58px 10px 10px;z-index:2;display:grid;grid-template-columns:minmax(0,1fr);place-items:center;gap:14px;padding:32px;overflow:hidden;border:1px dashed rgba(242,59,10,.48);border-radius:12px;color:var(--wa-drop-color);background:var(--wa-drop-bg);box-shadow:inset 0 0 0 999px var(--wa-drop-inset);pointer-events:none}.wa-csv-drop[data-drop-state=active]{border-color:var(--wa-orange);background-color:var(--wa-drop-active-bg);box-shadow:inset 0 0 0 999px var(--wa-drop-active-inset)}.wa-csv-drop[data-drop-state=complete]{border-style:solid;border-color:#27944352;background:var(--wa-drop-complete-bg)}.wa-csv-drop__copy{display:grid;gap:5px;min-width:0;justify-items:center;text-align:center}.wa-csv-drop__copy strong{color:var(--wa-drop-title);font-size:18px;line-height:1.12;font-weight:620}.wa-csv-drop__copy span{color:var(--wa-drop-muted);font-size:13px;line-height:1.24;font-weight:460}.wa-cursor-file{position:absolute;top:0;left:0;z-index:19;width:max-content;pointer-events:none}.wa-file-landing-clone{box-sizing:border-box}.wa-file-landing-label{color:var(--wa-file-muted);font-size:10.5px;line-height:1;font-weight:520;white-space:nowrap}.wa-cursor-file__card,.wa-uploaded-file{--wa-file-color: #916135;--wa-file-bg: #fdf8f2;--wa-file-border: #dedbd3}.wa-cursor-file__card{display:inline-grid;grid-template-columns:34px minmax(0,1fr);gap:8px;align-items:center;width:292px;min-height:52px;padding:8px 12px 8px 8px;border:1px solid var(--wa-file-border, #dedbd3);border-radius:8px;color:var(--wa-file-text);background:var(--wa-file-floating-surface);box-shadow:var(--wa-file-shadow)}.wa-cursor-file--stack{width:252px;height:96px}.wa-cursor-file--stack .wa-cursor-file__card{position:absolute;top:0;left:0;width:230px;transform-origin:18px 28px}.wa-cursor-file--stack .wa-cursor-file__card:nth-child(1){z-index:4;transform:translate(1px) rotate(2deg)}.wa-cursor-file--stack .wa-cursor-file__card:nth-child(2){z-index:3;transform:translate(8px,8px) rotate(-5deg)}.wa-cursor-file--stack .wa-cursor-file__card:nth-child(3){z-index:2;transform:translate(-7px,15px) rotate(6deg)}.wa-cursor-file--stack .wa-cursor-file__card:nth-child(4){z-index:1;transform:translate(5px,23px) rotate(-8deg)}.wa-cursor-file__icon,.wa-uploaded-file__icon{display:inline-flex;align-items:center;justify-content:center;border-radius:5px;border:1px solid var(--wa-file-color, #916135);border-color:color-mix(in oklch,var(--wa-file-color, #916135) 46%,var(--wa-file-bg, #faf1e8));color:var(--wa-file-color, #916135);background:var(--wa-file-bg, #faf1e8);font-size:9px;line-height:1;font-weight:680}.wa-cursor-file__icon{width:34px;height:34px}.wa-cursor-file__card[data-file-tone=spreadsheet],.wa-uploaded-file[data-file-tone=spreadsheet]{--wa-file-color: #2a8050;--wa-file-bg: #f7fcf8}.wa-cursor-file__card[data-file-tone=pdf],.wa-uploaded-file[data-file-tone=pdf]{--wa-file-color: #c04436;--wa-file-bg: #fff7f6}.wa-cursor-file__card[data-file-tone=doc],.wa-uploaded-file[data-file-tone=doc]{--wa-file-color: #2c66d8;--wa-file-bg: #f7faff}.wa-cursor-file__card[data-file-tone=text],.wa-uploaded-file[data-file-tone=text]{--wa-file-color: #6f6a63;--wa-file-bg: #faf9f6}.wa-cursor-file__card[data-file-tone=ppt],.wa-uploaded-file[data-file-tone=ppt]{--wa-file-color: #b5671c;--wa-file-bg: #fff9f1}@supports (color: oklch(.5 .1 120)){.wa-cursor-file__card,.wa-uploaded-file{--wa-file-color: oklch(.49 .105 55);--wa-file-bg: oklch(.986 .012 65);--wa-file-border: oklch(.88 .008 80)}.wa-cursor-file__card[data-file-tone=spreadsheet],.wa-uploaded-file[data-file-tone=spreadsheet]{--wa-file-color: oklch(.51 .12 150);--wa-file-bg: oklch(.986 .014 150)}.wa-cursor-file__card[data-file-tone=pdf],.wa-uploaded-file[data-file-tone=pdf]{--wa-file-color: oklch(.52 .15 29);--wa-file-bg: oklch(.986 .014 29)}.wa-cursor-file__card[data-file-tone=doc],.wa-uploaded-file[data-file-tone=doc]{--wa-file-color: oklch(.52 .145 257);--wa-file-bg: oklch(.986 .013 257)}.wa-cursor-file__card[data-file-tone=text],.wa-uploaded-file[data-file-tone=text]{--wa-file-color: oklch(.52 .018 82);--wa-file-bg: oklch(.982 .004 82)}.wa-cursor-file__card[data-file-tone=ppt],.wa-uploaded-file[data-file-tone=ppt]{--wa-file-color: oklch(.56 .13 57);--wa-file-bg: oklch(.986 .016 64)}}.wa-section[data-resolved-theme=dark] .wa-cursor-file__card,.wa-section[data-resolved-theme=dark] .wa-uploaded-file{--wa-file-color: #d0a070;--wa-file-bg: rgba(208, 160, 112, .14);--wa-file-border: var(--wa-line-16)}.wa-section[data-resolved-theme=dark] .wa-cursor-file__card[data-file-tone=spreadsheet],.wa-section[data-resolved-theme=dark] .wa-uploaded-file[data-file-tone=spreadsheet]{--wa-file-color: #75d39c;--wa-file-bg: rgba(117, 211, 156, .13)}.wa-section[data-resolved-theme=dark] .wa-cursor-file__card[data-file-tone=pdf],.wa-section[data-resolved-theme=dark] .wa-uploaded-file[data-file-tone=pdf]{--wa-file-color: #f07c72;--wa-file-bg: rgba(240, 124, 114, .13)}.wa-section[data-resolved-theme=dark] .wa-cursor-file__card[data-file-tone=doc],.wa-section[data-resolved-theme=dark] .wa-uploaded-file[data-file-tone=doc]{--wa-file-color: #80a8ff;--wa-file-bg: rgba(128, 168, 255, .13)}.wa-section[data-resolved-theme=dark] .wa-cursor-file__card[data-file-tone=text],.wa-section[data-resolved-theme=dark] .wa-uploaded-file[data-file-tone=text]{--wa-file-color: #c6beb2;--wa-file-bg: rgba(198, 190, 178, .12)}.wa-section[data-resolved-theme=dark] .wa-cursor-file__card[data-file-tone=ppt],.wa-section[data-resolved-theme=dark] .wa-uploaded-file[data-file-tone=ppt]{--wa-file-color: #edb56e;--wa-file-bg: rgba(237, 181, 110, .13)}.wa-cursor-file__name{min-width:0;overflow:hidden;font-size:11px;line-height:1;font-weight:560;text-overflow:ellipsis;white-space:nowrap}.wa-uploaded-file{display:inline-grid;grid-template-columns:34px minmax(0,1fr);gap:9px;align-items:center;min-width:292px;max-width:340px;min-height:52px;padding:8px 12px 8px 8px;border:1px solid var(--wa-file-border, #dedbd3);border-radius:8px;color:var(--wa-ink);background:var(--wa-file-surface)}.wa-uploaded-file__icon{width:34px;height:34px}.wa-uploaded-file__body{display:grid;gap:3px;min-width:0}.wa-uploaded-file__body strong,.wa-uploaded-file__body span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wa-uploaded-file__body strong{font-size:12px;line-height:1.1;font-weight:620}.wa-uploaded-file__body span{color:var(--wa-file-muted);font-size:10px;line-height:1;font-weight:460}.wa-uploaded-files{display:grid;gap:8px;justify-items:end}.wa-uploaded-files[data-uploaded-file-count="4"]{--wa-uploaded-file-target-width: 230px;--wa-story-fit-width: 467px;width:min(467px,calc(100vw - 72px));max-width:100%}.wa-uploaded-files__summary{justify-self:start;color:var(--wa-file-muted);font-size:10.5px;line-height:1;font-weight:520;white-space:nowrap}.wa-uploaded-files__list{display:grid;gap:7px;justify-items:end}.wa-uploaded-files[data-uploaded-file-count="4"] .wa-uploaded-files__list{width:100%;grid-template-columns:repeat(2,minmax(0,var(--wa-uploaded-file-target-width)));justify-content:end;justify-items:stretch}.wa-uploaded-files[data-uploaded-file-count="4"] .wa-uploaded-file{width:100%;min-width:0;max-width:none}.wa-data-table{--wa-data-table-scroll-width: 100%;display:grid;gap:0;min-width:0;padding:0;overflow:visible;border:0;border-radius:0;background:transparent;box-shadow:none;color:var(--wa-table-strong)}.wa-data-table[data-footer-clearance=true]{padding-bottom:var(--wa-data-table-footer-clearance, 0px)}.wa-data-table__header{display:none;grid-template-columns:minmax(0,1fr) auto;gap:4px 10px;align-items:end}.wa-data-table__meta{grid-column:1 / -1;color:var(--wa-color-accent);font-size:10px;line-height:1;font-weight:760;letter-spacing:0;text-transform:uppercase}.wa-data-table__title{min-width:0;margin:0;color:var(--wa-ink);font-size:14px;line-height:1.08;font-weight:720;letter-spacing:0}.wa-data-table__count{color:var(--wa-color-muted);font-size:10px;line-height:1;font-weight:680;white-space:nowrap}.wa-data-table__grid{position:relative;display:grid;min-width:0;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scrollbar-width:thin;scrollbar-color:var(--wa-table-scrollbar) transparent;border:1px solid var(--wa-table-line);border-radius:8px;background:var(--wa-color-data-table-surface);box-shadow:var(--wa-data-table-shadow);-webkit-overflow-scrolling:touch}.wa-data-table__grid::-webkit-scrollbar{height:6px}.wa-data-table__grid::-webkit-scrollbar-track{background:transparent}.wa-data-table__grid::-webkit-scrollbar-thumb{border-radius:999px;background:var(--wa-table-scrollbar-thumb)}.wa-data-table__row{position:relative;display:grid;grid-template-columns:var(--wa-data-table-columns);width:max(100%,var(--wa-data-table-scroll-width));min-width:max(100%,var(--wa-data-table-scroll-width));min-height:27px;border-top:1px solid var(--wa-table-line);background:var(--wa-color-data-table-surface)}.wa-data-table[data-column-count="3"]{--wa-data-table-scroll-width: 560px}.wa-data-table[data-column-count="2"]{--wa-data-table-scroll-width: 620px}.wa-data-table[data-table-variant=connections]{--wa-data-table-scroll-width: 100%}.wa-data-table:is([data-data-table=clean-webinar-attendees],[data-data-table=cleaned-webinar-attendees]){--wa-data-table-scroll-width: 100%}.wa-data-table[data-column-count="4"]{--wa-data-table-scroll-width: 680px}.wa-data-table[data-column-count="5"]{--wa-data-table-scroll-width: 860px}.wa-data-table[data-table-variant=enriched]{--wa-data-table-scroll-width: 760px}.wa-data-table__row:first-child{border-top:0}.wa-data-table__row[data-header=true]{min-height:34px;background:var(--wa-color-data-table-surface)}.wa-data-table__cell{display:flex;align-items:center;min-width:0;padding:6px 8px;overflow:visible;border-left:0;color:var(--wa-table-text);font-size:14px;line-height:1.14;font-weight:500;overflow-wrap:anywhere;white-space:normal}.wa-data-table__cell[data-cell-swap-active=true]{position:relative;overflow:hidden}.wa-data-table__cell-swap-clone{position:absolute;inset:0;box-sizing:border-box;display:flex;align-items:center;min-width:0;padding:inherit;gap:inherit;color:inherit;font:inherit;line-height:inherit;pointer-events:none;opacity:0;visibility:hidden}.wa-data-table__cell:first-child{border-left:0}.wa-data-table__row[data-header=true] .wa-data-table__cell{grid-row:1;align-items:center;padding:9px 10px 8px;color:var(--wa-table-text);font-size:14px;line-height:1.08;font-weight:560;text-transform:none}.wa-data-table__row[data-header=true] .wa-data-table__cell:nth-of-type(1){grid-column:1}.wa-data-table__row[data-header=true] .wa-data-table__cell:nth-of-type(2){grid-column:2}.wa-data-table__row[data-header=true] .wa-data-table__cell:nth-of-type(3){grid-column:3}.wa-data-table__row[data-header=true] .wa-data-table__cell:nth-of-type(4){grid-column:4}.wa-data-table__row[data-header=true] .wa-data-table__cell:nth-of-type(5){grid-column:5}.wa-data-table__row[data-header=true] .wa-data-table__cell:nth-of-type(6){grid-column:6}.wa-data-table__row[data-header=true] .wa-data-table__cell:is([data-column-key=name],[data-column-key=contact],[data-column-key=fullName],[data-column-key=mutualConnection]){padding-left:8px}.wa-data-table__row[data-header=true] .wa-data-table__cell:last-of-type{padding-right:48px}.wa-section .wa-data-table__add{position:sticky;z-index:2;grid-column:1 / -1;grid-row:1;align-self:center;justify-self:end;right:3px;display:inline-flex;align-items:center;justify-content:center;width:28px;height:26px;padding:0 0 1px;border:1px solid var(--wa-table-line);border-radius:4px;color:var(--wa-table-strong);background:var(--wa-table-control-bg);box-shadow:0 1px 1px #17171405;line-height:0}.wa-data-table__add-icon{display:block;width:16px;height:16px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2}.wa-data-table__cell-text{display:block;min-width:0;margin-top:0}.wa-data-table__footer{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding-top:8px}.wa-data-table__actions{display:flex;align-items:center;gap:7px;min-width:0}.wa-data-table-action{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:0;min-height:38px;padding:0 13px;border:1px solid var(--wa-table-control-border);border-radius:6px;color:var(--wa-table-text);background:transparent;font:inherit;box-shadow:0 1px 1px #17171408;cursor:pointer;white-space:nowrap;transition:border-color .16s ease,background-color .16s ease,color .16s ease,box-shadow .16s ease,transform .18s cubic-bezier(.2,.8,.2,1)}.wa-data-table-action[data-action-variant=primary]{border-color:var(--wa-table-control-border);color:var(--wa-table-text);background:transparent}.wa-data-table-action[data-selected=true]{border-color:var(--wa-table-selected-bg);color:var(--wa-color-inverse);background:var(--wa-table-selected-bg);box-shadow:var(--wa-table-selected-shadow)}.wa-data-table-action__icon{display:block;width:16px;height:16px;flex:0 0 16px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2}.wa-data-table-action__label{display:inline-block;font-size:12px;line-height:1;font-weight:520}.wa-data-table-action__badge{display:inline-flex;flex:0 0 auto;align-items:center;min-height:18px;padding:0 7px 1px;border-radius:999px;color:#fffffa;background:#11110f;font-size:9px;line-height:1;font-weight:560;white-space:nowrap}.wa-data-table__pagination{display:inline-flex;align-items:center;justify-content:end;gap:0;margin-left:auto;min-width:0;color:var(--wa-table-muted);line-height:1}.wa-data-table__range{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.wa-data-table__page-controls{display:inline-flex;align-items:center;justify-content:end;gap:5px;min-width:0}.wa-data-table__page-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;width:13px;height:16px;padding:0;border:0;border-radius:999px;color:var(--wa-table-page);background:transparent;font-size:0;line-height:1;cursor:pointer;transform:translateZ(0);transition:color .16s ease,opacity .16s ease,transform .22s cubic-bezier(.2,.8,.2,1)}.wa-data-table__page-button[data-page-button-role=dot]{width:5px;height:16px}.wa-data-table__page-button[data-page-button-role=dot]:before{content:"";display:block;flex:0 0 5px;width:5px;min-width:5px;max-width:5px;height:5px;min-height:5px;max-height:5px;aspect-ratio:1 / 1;border-radius:50%;background:var(--wa-table-dot);transform:scale(1);transition:background-color .18s ease,opacity .18s ease,transform .26s cubic-bezier(.2,.8,.2,1)}.wa-data-table__page-button[data-page-button-role=dot][data-active=true]:before{background:var(--wa-table-dot-active)}.wa-data-table__page-button:disabled{color:var(--wa-table-page-disabled);cursor:default}.wa-data-table__page-chevron{display:block;width:13px;height:13px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.2;transform:translateZ(0);transform-origin:center}.wa-data-table[data-pagination-motion=true] .wa-data-table__page-button[data-page-button-role=dot][data-active=true]:before{animation:wa-data-table-dot-pop .34s cubic-bezier(.16,1,.3,1) both}.wa-data-table[data-pagination-motion=true][data-pagination-direction=previous] .wa-data-table__page-button[data-page-button-role=previous] .wa-data-table__page-chevron{animation:wa-data-table-chevron-previous .3s cubic-bezier(.16,1,.3,1) both}.wa-data-table[data-pagination-motion=true][data-pagination-direction=next] .wa-data-table__page-button[data-page-button-role=next] .wa-data-table__page-chevron{animation:wa-data-table-chevron-next .3s cubic-bezier(.16,1,.3,1) both}.wa-data-table-action:hover{border-color:var(--wa-table-control-hover);color:var(--wa-table-strong)}.wa-data-table-action[data-selected=true]:hover{border-color:var(--wa-table-selected-bg);color:var(--wa-color-inverse)}.wa-data-table__page-button:not(:disabled):hover{color:var(--wa-table-strong)}.wa-data-table__cell:is([data-column-key=name],[data-column-key=contact],[data-column-key=fullName],[data-column-key=mutualConnection],[data-column-key=connector]){overflow:visible;color:var(--wa-table-strong);font-weight:400;white-space:nowrap}.wa-data-table__cell:is([data-column-key=email],[data-column-key=number],[data-column-key=work-email],[data-column-key=mobile]){color:var(--wa-table-text)}.wa-data-table__cell:is([data-column-key=email],[data-column-key=work-email]) .wa-data-table__cell-text{overflow-wrap:normal;white-space:nowrap}.wa-data-table__cell[data-column-key=signal] .wa-data-table__cell-text{overflow-wrap:normal;white-space:nowrap}.wa-data-table__cell[data-cell-swap-active=true][data-column-key]{overflow:hidden}.wa-data-table[data-table-variant=enriched] .wa-data-table__cell:is([data-column-key=email],[data-column-key=number],[data-column-key=work-email],[data-column-key=mobile]){color:var(--wa-table-enriched-text)}.wa-data-table[data-table-variant=enriched] .wa-data-table__cell:is([data-column-key=email],[data-column-key=number],[data-column-key=work-email],[data-column-key=mobile]) .wa-data-table__cell-text{display:inline-flex;align-items:center;width:fit-content;max-width:100%;min-height:22px;padding:2px 6px;border-radius:5px;background:var(--wa-table-enriched-bg);color:var(--wa-table-enriched-text)}.wa-data-table[data-table-variant=enriched] .wa-data-table__row[data-header=true] .wa-data-table__cell:is([data-column-key=email],[data-column-key=number],[data-column-key=work-email],[data-column-key=mobile]){color:var(--wa-table-enriched-header)}.wa-data-table--proximity .wa-data-table__row:not([data-header=true]){min-height:52px}.wa-data-table--proximity{--wa-data-table-scroll-width: 100%}.wa-data-table--proximity .wa-data-table__grid{overflow-x:hidden}.wa-data-table--proximity .wa-data-table__row{width:100%;min-width:0}.wa-data-table--proximity .wa-data-table__row[data-header=true] .wa-data-table__cell[data-column-key=connection]{font-size:14px;line-height:1.08;overflow-wrap:anywhere;white-space:normal}.wa-data-table--proximity .wa-data-table__row:not([data-header=true]) .wa-data-table__cell[data-column-key=connection]{align-items:center;color:var(--wa-ink);font-size:13.5px;line-height:1.18;overflow-wrap:anywhere;white-space:normal}.wa-data-table--proximity .wa-data-table__cell[data-column-key=connection] .wa-data-table__cell-text{overflow-wrap:anywhere;white-space:normal;word-break:normal}.wa-data-table-pill-detail{display:grid;align-content:center;gap:5px;min-width:0}.wa-data-table-pill-detail__pill{justify-self:start;display:inline-flex;align-items:center;min-height:0;padding:0;border:0;border-radius:0;color:var(--wa-table-muted);background:transparent;font-size:11px;line-height:1;font-weight:520;white-space:nowrap;box-shadow:none}.wa-data-table-pill-detail__detail{display:block;min-width:0;color:var(--wa-table-strong);font-size:13.5px;line-height:1.22;font-weight:500;overflow-wrap:anywhere;white-space:normal;word-break:normal}.wa-data-table[data-table-variant=connections] .wa-data-table__grid{overflow-x:hidden}.wa-data-table[data-table-variant=connections] .wa-data-table__cell{overflow:hidden}.wa-data-table[data-table-variant=connections] .wa-data-table__cell[data-column-key=mutualConnection]:not(:empty){align-items:center;gap:8px}.wa-data-table[data-table-variant=connections] .wa-data-table__cell[data-column-key=mutualConnection] .wa-data-table-person{flex:1 1 auto;width:auto}.wa-data-table[data-table-variant=connections] .wa-data-table-person__name,.wa-data-table[data-table-variant=connections] .wa-data-table-person__detail{overflow:hidden;text-overflow:ellipsis}.wa-data-table[data-table-variant=connections] .wa-data-table__cell[data-column-key=mutualConnection] .wa-data-table-cell-badge{display:block;flex:0 1 112px;max-width:112px;min-width:0;min-height:0;line-height:1.12;text-align:left;white-space:normal;overflow-wrap:normal;word-break:normal}.wa-data-table-cell-badge{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;min-height:20px;padding:0;border:0;border-radius:0;color:var(--wa-table-muted);background:transparent;font-size:12px;line-height:1;font-weight:430;white-space:nowrap}.wa-data-table__cell[data-empty=true]{color:var(--wa-table-empty)}.wa-data-table-person{display:grid;grid-template-columns:25px minmax(0,1fr);gap:7px;align-items:center;width:100%;min-width:0;overflow:visible}.wa-data-table-person__avatar-wrap{position:relative;display:block;width:25px;height:25px}.wa-data-table-person__avatar{display:inline-flex;align-items:center;justify-content:center;width:25px;height:25px;overflow:hidden;border:1px solid #d8d8d8;border-radius:999px;color:#1a1a18;background:linear-gradient(145deg,#d8dee8,#aeb7c5);font-size:8px;font-weight:700;letter-spacing:0}.wa-data-table-person__avatar img{display:block;width:100%;height:100%;object-fit:cover}.wa-data-table-person__avatar[data-avatar-tone="2"]{background:linear-gradient(145deg,#cde3d5,#7ea88f)}.wa-data-table-person__avatar[data-avatar-tone="3"]{background:linear-gradient(145deg,#9edff0,#27718b)}.wa-data-table-person__avatar[data-avatar-tone="4"]{background:linear-gradient(145deg,#f4f0eb,#b6b0a9)}.wa-data-table-person__avatar[data-avatar-tone="5"]{background:linear-gradient(145deg,#443f45,#141416);color:#fffff9}.wa-data-table-person__avatar[data-avatar-tone="6"]{background:linear-gradient(145deg,#bdeef4,#1590a8)}.wa-data-table-person__avatar[data-avatar-tone="7"]{background:linear-gradient(145deg,#f3f1dd,#a8d7f0)}.wa-data-table-person__avatar[data-avatar-tone="8"]{background:linear-gradient(145deg,#0992db,#055c9b);color:#fffff9}.wa-data-table-person__avatar[data-avatar-tone="9"]{background:linear-gradient(145deg,#cfc8b8,#39322b);color:#fffff9}.wa-data-table-person__source{position:absolute;right:0;bottom:0;display:grid;place-items:center;width:12px;height:12px;overflow:hidden;border:1.5px solid var(--wa-color-panel);border-radius:999px;background:#ddff1c;color:#4d4943;font-size:6px;line-height:1;font-weight:720;text-transform:uppercase}.wa-data-table-person__source:before,.wa-data-table-person__source:after{content:"";position:absolute;background:#050505}.wa-data-table-person__source[data-source=signal]:before{right:3px;bottom:2px;width:6px;height:2px;border-radius:999px;transform:rotate(-34deg)}.wa-data-table-person__source[data-source=signal]:after{right:2px;bottom:5px;width:2px;height:5px;border-radius:999px;transform:rotate(12deg)}.wa-data-table-person__source[data-source=database]{border-radius:4px;background:#1f1f1f}.wa-data-table-person__source[data-source=database]:before{top:3px;left:3px;width:5px;height:5px;border:1.5px solid #fffff9;border-radius:2px;background:transparent}.wa-data-table-person__source[data-source=database]:after{display:none}.wa-data-table-person__source[data-source=engage]{border-radius:4px 7px 7px 4px;background:#6043ff}.wa-data-table-person__source[data-source=engage]:before{top:4px;left:3px;width:7px;height:4px;border-radius:1px;background:#fffff9;transform:rotate(-8deg)}.wa-data-table-person__source[data-source=engage]:after{display:none}.wa-data-table-person__source[data-source=company]{border:0;border-radius:999px;background:transparent;box-shadow:0 0 0 1.5px var(--wa-panel),0 1px 2px #11110f1f}.wa-data-table-person__source[data-source=company]:before,.wa-data-table-person__source[data-source=company]:after{display:none}.wa-data-table-person__source[data-source=company][data-has-logo=false]{display:none}.wa-data-table-person__source-logo{display:block;width:100%;height:100%;border-radius:inherit;object-fit:cover}.wa-data-table-person__copy{display:grid;align-content:start;gap:2px;min-width:0;margin-top:0}.wa-data-table-person__name{min-width:0;margin-top:0;overflow:visible;color:var(--wa-table-strong);font-size:14px;line-height:1.05;font-weight:400;overflow-wrap:normal;text-overflow:clip;white-space:nowrap}.wa-data-table-person__detail{min-width:0;overflow:hidden;color:var(--wa-table-muted);font-size:12px;line-height:1.12;font-weight:400;text-overflow:ellipsis;white-space:nowrap}.wa-enrichment-panel{--wa-thinking-icon-column: 18px;--wa-thinking-column-gap: 8px;--wa-thinking-rail-x-adjust: -.5px;--wa-step-progress: 0;display:grid;gap:12px;min-width:0;max-width:none;overflow:visible;border:0;border-radius:0;background:transparent;box-shadow:none;color:var(--wa-thinking-text)}.wa-enrichment-panel__header{display:inline-grid;grid-template-columns:var(--wa-thinking-icon-column) auto;gap:var(--wa-thinking-column-gap);align-items:center;justify-content:start;min-height:18px;padding:0;border:0;color:var(--wa-thinking-text);background:transparent;font-size:14px;line-height:1;font-weight:520}.wa-enrichment-panel .wa-thinking__title{color:var(--wa-thinking-text)}.wa-waterfall-thinking{position:relative}.wa-waterfall-thinking:after{content:"";position:absolute;z-index:3;top:0;right:0;bottom:0;width:48px;background:linear-gradient(to right,var(--wa-panel-transparent),var(--wa-panel));pointer-events:none}.wa-waterfall-rows{position:relative;display:grid;gap:0;padding:0}.wa-waterfall-rows:before{content:"";position:absolute;top:-16px;bottom:11px;left:calc((var(--wa-thinking-icon-column) / 2) + var(--wa-thinking-rail-x-adjust));width:1px;background:var(--wa-thinking-line)}.wa-waterfall-row{position:relative;display:grid;grid-template-columns:var(--wa-thinking-icon-column) 100px max-content;gap:var(--wa-thinking-column-gap) 7px;align-items:center;width:100%;max-width:100%;min-width:0;min-height:30px;color:var(--wa-thinking-text);font-size:14px;line-height:1;font-weight:400;white-space:nowrap}.wa-waterfall-row__status{position:relative;z-index:1;justify-self:center;width:12px;height:12px;background:var(--wa-panel)}.wa-waterfall-row__status:before{content:"";position:absolute;top:4px;left:4px;width:4px;height:4px;border-radius:999px;background:var(--wa-thinking-dot)}.wa-waterfall-row__label{min-width:0;overflow:hidden;color:var(--wa-thinking-label);font-size:14px;font-weight:400;text-overflow:ellipsis}.wa-waterfall-row__chips{display:inline-flex;align-items:center;gap:6px;width:max-content;max-width:none;min-width:0;margin-left:-1px;padding-left:1px;overflow:visible}.wa-waterfall-service-step{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto}.wa-waterfall-arrow{display:inline-grid;place-items:center;width:16px;height:16px;color:var(--wa-waterfall-arrow);line-height:1;font-weight:400}.wa-waterfall-arrow svg{display:block;width:16px;height:16px}.wa-waterfall-chip{position:relative;display:inline-flex;align-items:center;gap:7px;max-width:none;min-height:26px;padding:0 8px 0 6px;overflow:hidden;border:1px solid var(--wa-waterfall-chip-border);border-radius:5px;color:var(--wa-waterfall-chip-text);background:var(--wa-waterfall-chip-bg);background-clip:padding-box;font-size:13px;line-height:1;font-weight:400;text-overflow:ellipsis;box-shadow:0 0 0 1px #5f584e05;will-change:transform}.wa-waterfall-chip__icon{position:relative;display:inline-grid;flex:0 0 16px;place-items:center;width:16px;height:16px;color:currentColor}.wa-waterfall-chip__icon svg{display:block;width:16px;height:16px}.wa-waterfall-chip__icon img{display:block;width:14px;height:14px;border-radius:4px;object-fit:cover}.wa-waterfall-chip__mark{display:block;width:16px;height:auto}.wa-waterfall-chip__state-icon{display:none;flex:0 0 16px;width:16px;height:16px;place-items:center;color:currentColor}.wa-waterfall-chip__state-icon svg{display:none;width:14px;height:14px}.wa-waterfall-chip__label{display:inline-block;transform:translateY(-.5px)}.wa-waterfall-chip[data-service=on-prem] .wa-waterfall-chip__icon{color:var(--wa-color-muted)}.wa-waterfall-chip[data-service=wiza] .wa-waterfall-chip__icon{color:#9b43ff}.wa-waterfall-chip[data-service=contactout] .wa-waterfall-chip__icon{color:#009d5f}.wa-waterfall-chip[data-service=prospeo] .wa-waterfall-chip__icon{color:#ff3b30}.wa-waterfall-chip[data-service=waterfall] .wa-waterfall-chip__icon,.wa-waterfall-chip[data-service=forager] .wa-waterfall-chip__icon{color:#514bff}.wa-waterfall-chip[data-service=fullenrich] .wa-waterfall-chip__icon{color:#77736d}.wa-waterfall-chip[data-step-state=pending]{opacity:.62}.wa-waterfall-chip[data-step-state=loading]{opacity:1;color:var(--wa-waterfall-loading-text);border-color:transparent;background:linear-gradient(var(--wa-waterfall-loading-bg),var(--wa-waterfall-loading-bg)) padding-box,linear-gradient(108deg,var(--wa-waterfall-loading-strong) 0%,var(--wa-waterfall-loading-strong) 35%,var(--wa-waterfall-loading-glint) 49%,var(--wa-waterfall-loading-strong) 64%,var(--wa-waterfall-loading-strong) 100%) border-box;background-size:100% 100%,220% 100%;animation:wa-waterfall-service-poll .9s linear infinite;box-shadow:0 1px 3px #11110f1f}.wa-waterfall-chip[data-step-state=complete],.wa-waterfall-chip[data-step-state=failed]{background:var(--wa-waterfall-complete-bg)}.wa-waterfall-chip[data-step-state=complete]{color:#2f8f4c}.wa-waterfall-chip[data-step-state=complete] .wa-waterfall-chip__icon,.wa-waterfall-chip[data-step-state=failed] .wa-waterfall-chip__icon{display:none}.wa-waterfall-chip[data-step-state=complete] .wa-waterfall-chip__state-icon,.wa-waterfall-chip[data-step-state=failed] .wa-waterfall-chip__state-icon{display:inline-grid}.wa-waterfall-chip[data-step-state=complete] .wa-waterfall-chip__state-icon svg:first-child,.wa-waterfall-chip[data-step-state=failed] .wa-waterfall-chip__state-icon svg:last-child{display:block}.wa-waterfall-chip[data-step-state=failed]{color:#bf4941}@keyframes wa-waterfall-service-poll{0%{background-position:0 0,120% 50%}to{background-position:0 0,-120% 50%}}.wa-result-card{display:grid;gap:8px;padding:12px;border:1px solid var(--wa-line-12);border-radius:var(--wa-radius-sm);background:linear-gradient(90deg,var(--wa-card-accent-bg),transparent 42%),var(--wa-color-panel);box-shadow:var(--wa-card-shadow)}.wa-result-card__topline{color:var(--wa-color-accent);font-size:11px;line-height:1.1;font-weight:720;letter-spacing:0;text-transform:uppercase}.wa-result-card__title{margin:0;color:var(--wa-ink);font-size:16px;line-height:1.1;font-weight:700;letter-spacing:0}.wa-result-card__body{margin:0;color:var(--wa-color-muted);font-size:12px;line-height:1.32;font-weight:460}.wa-result-card__rows{display:grid;gap:6px;padding:0;margin:0;list-style:none}.wa-result-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;min-height:30px;padding:7px 9px;border:1px solid var(--wa-line-08);border-radius:var(--wa-radius-sm);color:var(--wa-color-muted);background:var(--wa-row-bg);font-size:12px}.wa-result-row strong{color:var(--wa-ink);font-weight:680;white-space:nowrap}.wa-result-row[data-tone=positive] strong{color:var(--wa-color-positive)}.wa-result-row[data-tone=warning] strong{color:var(--wa-color-warning)}.wa-result-row[data-tone=accent] strong{color:var(--wa-color-accent)}.wa-result-card__actions{display:flex;gap:8px;flex-wrap:wrap}.wa-result-action{display:inline-flex;align-items:center;justify-content:center;min-width:122px;height:34px;padding:0 11px;border:1px solid var(--wa-line-16);border-radius:var(--wa-radius-sm);color:var(--wa-color-inverse);background:var(--wa-color-dark-surface);font-size:12px;font-weight:680;cursor:default;white-space:nowrap}.wa-strategy-plan{--wa-strategy-hover-scale: 1.0175;--wa-strategy-hover-border: #c8c3bb;display:block;min-height:0;overflow:visible}.wa-strategy-plan__surface{display:grid;align-content:start;gap:10px;width:100%;min-height:0;padding:16px 18px 16px 20px;border:1px solid var(--wa-strategy-surface-border);border-radius:7px;background:var(--wa-strategy-surface-bg);box-shadow:var(--wa-strategy-surface-shadow);transform:scale(1) translateZ(0);transform-origin:center;transition:transform 125ms cubic-bezier(.2,.92,.18,1),border-color .12s ease,background-color .12s ease,box-shadow .14s ease}.wa-strategy-plan:hover .wa-strategy-plan__surface,.wa-strategy-plan[data-cursor-hover] .wa-strategy-plan__surface{border-color:var(--wa-strategy-hover-border);background:var(--wa-strategy-surface-hover-bg);box-shadow:var(--wa-strategy-surface-hover-shadow);transform:scale(var(--wa-strategy-hover-scale)) translateZ(0)}.wa-strategy-plan__title{margin:0;color:var(--wa-strategy-title-color);font-family:var(--wa-font-feature);font-size:16px;line-height:1.18;font-weight:400;letter-spacing:0}.wa-strategy-plan__bullets{display:grid;gap:5px;margin:0;padding-left:14px;color:var(--wa-strategy-bullet-color);font-family:var(--wa-font-sans);font-size:12px;line-height:1.34;font-weight:560;letter-spacing:0}.wa-strategy-plan__bullets li{padding-left:2px;white-space:nowrap}.wa-data-source-grid{display:grid;gap:10px;width:min(100%,520px);min-width:0;padding:2px 0}.wa-data-source-grid__header{display:grid;gap:3px}.wa-data-source-grid__title{margin:0;color:var(--wa-ink);font-size:15px;line-height:1.12;font-weight:560;letter-spacing:0}.wa-data-source-grid__subtitle{max-width:430px;margin:0;color:var(--wa-color-muted);font-size:11.5px;line-height:1.26;font-weight:410}.wa-data-source-grid__list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;min-width:0}.wa-data-source-card{display:grid;grid-template-columns:18px minmax(0,1fr);gap:8px;align-items:start;min-width:0;min-height:68px;padding:9px 10px;border:1px solid var(--wa-line-10);border-radius:var(--wa-radius-sm);background:var(--wa-panel);box-shadow:var(--wa-tight-shadow)}.wa-data-source-card__icon{position:relative;width:18px;height:18px;margin-top:1px;border:1px solid var(--wa-line-16);border-radius:6px;background:var(--wa-color-soft-surface)}.wa-data-source-card__icon:before,.wa-data-source-card__icon:after{content:"";position:absolute;border-radius:999px;background:var(--wa-color-accent)}.wa-data-source-card__icon:before{top:5px;left:5px;width:6px;height:6px}.wa-data-source-card__icon:after{right:4px;bottom:4px;width:3px;height:3px}.wa-data-source-card__copy{display:grid;gap:3px;min-width:0}.wa-data-source-card__copy strong{color:var(--wa-ink);font-size:12.5px;line-height:1.12;font-weight:570}.wa-data-source-card__copy span{color:var(--wa-color-muted);font-size:10.5px;line-height:1.22;font-weight:410}.wa-data-source-grid--marketing{position:relative;z-index:0;width:100%;height:var(--wa-data-grid-scaled-height, 100%);min-height:var(--wa-data-grid-scaled-height, 0);max-width:none;padding:0;overflow:hidden;pointer-events:none}.wa-data-source-grid--marketing .wa-data-source-grid__scale{position:absolute;top:0;left:0;display:grid;grid-template-rows:auto auto;align-content:start;gap:68px;width:var(--wa-data-grid-artboard-width, 2048px);height:1280px;padding:80px var(--wa-data-grid-gutter-right, 87px) 0 var(--wa-data-grid-gutter-left, 87px);transform:scale(var(--wa-data-grid-scale, .2880859375));transform-origin:top left}.wa-data-source-grid--marketing .wa-data-source-grid__header{gap:0;max-width:none}.wa-data-source-grid--marketing .wa-data-source-grid__title{font-size:64px;line-height:1.05;font-weight:520;letter-spacing:0;white-space:nowrap}.wa-data-source-grid--marketing .wa-data-source-grid__subtitle{display:none}.wa-data-source-grid__groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 26px;min-height:0;min-width:0}.wa-data-source-grid--marketing .wa-data-source-grid__groups{grid-template-columns:repeat(4,438px);gap:43px;align-items:start}.wa-data-source-grid__column{display:grid;align-content:start;gap:14px;min-width:0}.wa-data-source-grid--marketing .wa-data-source-grid__column{gap:34px;width:438px}.wa-data-source-group{display:grid;align-content:start;gap:9px;min-width:0;padding:0;border:0;border-radius:0;background:transparent}.wa-data-source-group__title{margin:0;color:var(--wa-color-muted);font-size:16.5px;line-height:1.05;font-weight:530;letter-spacing:0;text-align:left;text-transform:none}.wa-data-source-grid--marketing .wa-data-source-group{gap:14px}.wa-data-source-grid--marketing .wa-data-source-group__title{font-size:36px;line-height:1.05;font-weight:520}.wa-data-source-grid--marketing .wa-data-source-grid__list{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:438px;gap:24px;min-height:0;padding:32px 35px;border-radius:7px;background:var(--wa-color-soft-surface)}.wa-data-source-grid--marketing .wa-data-source-grid__list--count-2{min-height:186px}.wa-data-source-grid--marketing .wa-data-source-grid__list--count-3{min-height:238px}.wa-data-vendor-logo{display:inline-flex;align-items:center;justify-content:flex-start;width:100%;min-width:0;height:auto;min-height:0;max-width:100%;color:var(--wa-color-heading-strong);opacity:1}.wa-data-vendor-logo--image{opacity:1}.wa-data-vendor-logo__mark{display:flex;align-items:center;justify-content:center;width:100%;height:100%;max-width:100%;overflow:hidden;color:currentColor;font-size:30px;line-height:1;font-weight:560;letter-spacing:0;text-align:center;text-overflow:ellipsis;white-space:nowrap;transform:scale(var(--wa-logo-scale, 1));transform-origin:center}.wa-data-vendor-logo__image{display:block;width:auto;height:auto;max-width:100%;max-height:34px;object-fit:contain;object-position:left center;filter:brightness(0) saturate(100%);transform:scale(var(--wa-logo-scale, 1));transform-origin:left center;-webkit-user-select:none;user-select:none}.wa-section[data-resolved-theme=dark] .wa-data-vendor-logo__image{filter:brightness(0) invert(1) sepia(9%) saturate(255%) hue-rotate(8deg) brightness(1.08)}.wa-data-source-grid--marketing .wa-data-vendor-logo{width:max-content;max-width:none}.wa-data-source-grid--marketing .wa-data-vendor-logo__mark{width:max-content;max-width:none;font-size:48px;transform:none;transform-origin:left center}.wa-data-source-grid--marketing .wa-data-vendor-logo__image{width:auto!important;height:auto!important;max-width:none!important;max-height:none!important;transform:none!important}.wa-mini-game,.wa-mailbox-connection,.wa-style-profile,.wa-proximity-list,.wa-sequence-engagement{--wa-story-fit-width: 540px;display:grid;gap:10px;width:min(100%,540px);min-width:0}.wa-style-profile{gap:13px;padding:14px 16px 15px;border:1px solid var(--wa-line-10);border-radius:13px;background:var(--wa-color-data-table-surface);box-shadow:var(--wa-tight-shadow)}.wa-sequence-engagement{--wa-story-fit-width: 712px;gap:14px;width:min(100%,712px)}.wa-mini-game__header,.wa-mailbox-connection__header,.wa-style-profile__header,.wa-proximity-list__header,.wa-sequence-engagement__header{display:grid;gap:3px}.wa-mini-game__eyebrow{color:var(--wa-color-muted);font-size:9px;line-height:1;font-weight:680;text-transform:uppercase}.wa-mini-game__title,.wa-mailbox-connection__title,.wa-style-profile__title,.wa-proximity-list__title,.wa-sequence-engagement__title{margin:0;color:var(--wa-ink);font-size:15px;line-height:1.12;font-weight:560;letter-spacing:0}.wa-mini-game__subtitle,.wa-mailbox-connection__subtitle,.wa-style-profile__subtitle,.wa-proximity-list__subtitle,.wa-sequence-engagement__subtitle{margin:0;color:var(--wa-color-muted);font-size:11.5px;line-height:1.26;font-weight:410}.wa-style-profile__title{font-family:var(--wa-font-feature);font-weight:400}.wa-mailbox-connection{gap:15px}.wa-mailbox-connection__card{display:grid;grid-template-columns:minmax(0,1fr) 124px;gap:14px;align-items:center;min-width:0;padding:14px 14px 14px 16px;border:1px solid var(--wa-mailbox-card-border);border-radius:12px;background:var(--wa-mailbox-card-bg);box-shadow:inset 0 0 0 1px var(--wa-mailbox-card-inset)}.wa-mailbox-connection__copy{display:grid;gap:15px;min-width:0;box-sizing:border-box;padding-left:8px}.wa-mailbox-connection__title{font-size:20px;line-height:1.08;font-weight:560}.wa-mailbox-connection__subtitle{max-width:310px;color:var(--wa-ink);font-size:14px;line-height:1.28;font-weight:400}.wa-mailbox-connection__actions{display:grid;gap:9px;justify-self:end;width:124px;min-width:0}.wa-mailbox-connection__button{position:relative;isolation:isolate;display:grid;grid-template-columns:20px max-content;align-items:center;justify-content:center;gap:8px;width:100%;min-width:0;min-height:40px;padding:0 10px;border:1px solid var(--wa-mailbox-button-border);border-radius:5px;color:var(--wa-mailbox-button-text);background:var(--wa-mailbox-button-bg);font:inherit;font-size:15.5px;line-height:1;font-weight:430;letter-spacing:0;cursor:default;overflow:visible;transform:translateZ(0)}.wa-mailbox-connection__button:before,.wa-mailbox-connection__button:after{content:"";position:absolute;pointer-events:none;opacity:0}.wa-mailbox-connection__button:before{inset:-1px;z-index:0;border-radius:inherit;background:radial-gradient(circle at 50% 50%,rgba(234,67,53,.82),transparent 34%),linear-gradient(90deg,#ea433500,#ea433566,#ea433500);background-position:0% 50%,0% 50%;background-size:220% 100%,220% 100%;filter:blur(7px)}.wa-mailbox-connection__button:after{inset:0;z-index:1;border-radius:inherit;padding:1px;background:radial-gradient(circle at 50% 50%,rgba(234,67,53,.95),rgba(234,67,53,.26) 34%,transparent 54%),linear-gradient(90deg,transparent,rgba(234,67,53,.52),transparent);background-position:0% 50%,0% 50%;background-size:220% 100%,220% 100%;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude}.wa-mailbox-connection__button>*{position:relative;z-index:2}.wa-mailbox-connection__button:disabled{opacity:1;pointer-events:none}.wa-mailbox-connection__provider-icon{display:block;width:20px;height:20px;flex-shrink:0;object-fit:contain}.wa-mailbox-connection__button-copy{display:grid;width:max-content;min-width:0;align-items:center}.wa-mailbox-connection__provider-label,.wa-mailbox-connection__button-label{grid-area:1 / 1;display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity .18s ease,transform .18s ease}.wa-mailbox-connection__button-label[data-mailbox-button-label=loading],.wa-mailbox-connection__button-label[data-mailbox-button-label=connected],.wa-mailbox-connection__spinner{display:none;opacity:0;transform:translateY(5px)}.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect] .wa-mailbox-connection__button-label[data-mailbox-button-label=idle],.wa-mailbox-connection[data-mailbox-state=connected] [data-mailbox-connect] .wa-mailbox-connection__button-label[data-mailbox-button-label=idle]{display:none;opacity:0;transform:translateY(-5px)}.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect] .wa-mailbox-connection__button-label[data-mailbox-button-label=loading],.wa-mailbox-connection[data-mailbox-state=connected] [data-mailbox-connect] .wa-mailbox-connection__button-label[data-mailbox-button-label=connected]{display:block;opacity:1;transform:translateY(0)}.wa-mailbox-connection[data-mailbox-state=connected] [data-mailbox-connect] .wa-mailbox-connection__button-label[data-mailbox-button-label=connected]{display:inline-flex;align-items:center;gap:4px}.wa-mailbox-connection__connected-icon{display:block;width:16px;height:16px;color:currentColor;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:0 0 16px}.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect]{grid-template-columns:max-content;border-color:#ea433561}.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect]:before{opacity:0;animation:none}.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect]:after{opacity:1;animation:wa-mailbox-gmail-radiate 1.16s ease-in-out infinite}.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect] .wa-mailbox-connection__provider-icon,.wa-mailbox-connection[data-mailbox-state=loading] [data-mailbox-connect] .wa-mailbox-connection__spinner{display:none}.wa-mailbox-connection[data-mailbox-state=connected] [data-mailbox-connect]{grid-template-columns:max-content;color:var(--wa-mailbox-connected-text);border-color:var(--wa-mailbox-connected-border);background:transparent;box-shadow:none}.wa-mailbox-connection[data-mailbox-state=connected] [data-mailbox-connect] .wa-mailbox-connection__provider-icon{display:none}.wa-mailbox-connection__spinner{position:absolute;right:9px;width:12px;height:12px;border:1.5px solid var(--wa-mailbox-spinner-border);border-top-color:currentColor;border-radius:999px;animation:wa-spin .76s linear infinite}.wa-mailbox-learning{display:none;grid-template-columns:44px max-content minmax(90px,1fr);grid-template-rows:auto auto;grid-template-areas:"thumb title progress" "thumb detail progress";align-items:center;gap:5px 14px;margin-top:8px;padding:0;color:var(--wa-color-muted);background:transparent}.wa-mailbox-learning__thumbprint{grid-area:thumb;display:grid;place-items:center;width:44px;height:44px;background:transparent}.wa-mailbox-learning__title{grid-area:title;display:inline-flex;align-items:center;gap:6px;margin:0;color:var(--wa-mailbox-learning-title);font-size:14px;line-height:1;font-weight:560;white-space:nowrap}.wa-mailbox-learning__ready-chevron{position:relative;top:-1px;display:inline-block;width:9px;height:9px;color:currentColor;opacity:0;transform-origin:center}.wa-mailbox-learning__ready-chevron:before{content:"";position:absolute;top:0;left:1px;width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg)}.wa-mailbox-learning[data-mailbox-learning-state=ready] .wa-mailbox-learning__title{color:var(--wa-mailbox-learning-ready)}.wa-mailbox-learning[data-mailbox-learning-state=ready] .wa-mailbox-learning__progress{display:none}.wa-mailbox-learning__detail{grid-area:detail;margin:0;color:var(--wa-mailbox-learning-detail);font-size:13px;line-height:1.15;font-weight:400}.wa-mailbox-thumbprint{width:36px;height:36px;overflow:visible;color:var(--wa-mailbox-thumbprint)}.wa-mailbox-thumbprint__base path,.wa-mailbox-thumbprint__fill path{stroke-width:5.4}.wa-mailbox-thumbprint__base path{stroke:color-mix(in srgb,currentColor 14%,transparent)}.wa-mailbox-thumbprint__fill path{stroke:currentColor}.wa-mailbox-learning__progress{grid-area:progress;align-self:center;height:4px;overflow:hidden;border-radius:999px;background:var(--wa-mailbox-progress-bg)}.wa-mailbox-learning__progress span{display:block;width:100%;height:100%;border-radius:inherit;background:var(--wa-mailbox-learning-title);transform:scaleX(0);transform-origin:left center}.wa-swipe-game{gap:9px;max-width:520px}.wa-swipe-game__prompt{margin:0;color:var(--wa-ink);font-size:12px;line-height:1.28;font-weight:430}.wa-swipe-game__axis{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;color:var(--wa-color-muted);font-size:10px;line-height:1;font-weight:520}.wa-swipe-game__axis span:first-child{color:#7f1d1d94}.wa-swipe-game__axis span:nth-child(2){color:var(--wa-color-muted);font-variant-numeric:tabular-nums}.wa-swipe-game__axis span:last-child{justify-self:end;color:#1665349e}.wa-swipe-game__stack{position:relative;height:184px;overflow:visible}.wa-swipe-game__glow{position:absolute;inset:12px -18px 0;z-index:0;border-radius:999px;background:linear-gradient(90deg,rgba(127,29,29,.055),transparent 42%,transparent 58%,rgba(22,101,52,.065));filter:blur(22px);pointer-events:none}.wa-swipe-card,.wa-swipe-game__complete{position:absolute;inset:0;display:grid;align-content:center;justify-items:center;min-width:0;border:1px solid rgba(228,228,231,.82);border-radius:21px;background:#fafafa;text-align:center;box-shadow:0 18px 45px #00000014}.wa-swipe-card{gap:13px;padding:22px 26px}.wa-swipe-game[data-swipe-decision=avoid] .wa-swipe-card[data-swipe-state=active]{border-color:#d298989e;background:linear-gradient(135deg,#f8f1f1,#fafafa 68%);box-shadow:-22px 28px 70px #7f1d1d1f}.wa-swipe-game[data-swipe-decision=use] .wa-swipe-card[data-swipe-state=active]{border-color:#8eb79da3;background:linear-gradient(135deg,#fafafa 32%,#f0f7f2);box-shadow:22px 28px 70px #1665341f}.wa-swipe-card__label{max-width:360px;color:var(--wa-ink);font-size:20px;line-height:1.05;font-weight:580;letter-spacing:0}.wa-swipe-card__detail{max-width:340px;color:var(--wa-color-muted);font-size:11.5px;line-height:1.35;font-weight:410}.wa-swipe-game__actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-width:420px}.wa-swipe-game__action{position:relative;display:inline-flex;align-items:center;justify-content:center;min-height:38px;border:1px solid var(--wa-line-12);border-radius:999px;background:var(--wa-panel);cursor:default}.wa-swipe-game__action:before,.wa-swipe-game__action:after{content:"";position:absolute;display:block}.wa-swipe-game__action[data-swipe-action=avoid]{border-color:#d298987a;background:#f8f1f1e6}.wa-swipe-game__action[data-swipe-action=avoid]:before,.wa-swipe-game__action[data-swipe-action=avoid]:after{width:14px;height:1.5px;border-radius:999px;background:#ba4d4d}.wa-swipe-game__action[data-swipe-action=avoid]:before{transform:rotate(45deg)}.wa-swipe-game__action[data-swipe-action=avoid]:after{transform:rotate(-45deg)}.wa-swipe-game__action[data-swipe-action=use]{border-color:#8eb79d80;background:#f0f7f2f2}.wa-swipe-game__action[data-swipe-action=use]:before{width:13px;height:7px;border-bottom:1.7px solid #2f8f4d;border-left:1.7px solid #2f8f4d;transform:translateY(-1px) rotate(-45deg)}.wa-swipe-game__action[data-active=true]{border-color:var(--wa-ink)}.wa-swipe-game__complete{z-index:10;color:var(--wa-ink);font-size:17px;line-height:1.1;font-weight:560}.wa-sequence-engagement__header{grid-template-columns:minmax(0,1fr);align-items:start}.wa-sequence-engagement__subtitle{grid-column:1 / -1}.wa-style-profile__rows{display:grid;grid-template-columns:minmax(0,1fr);gap:0;border-top:1px solid var(--wa-line-08)}.wa-style-profile__row{display:grid;grid-template-columns:104px minmax(0,1fr);gap:14px;align-items:start;min-height:0;padding:10px 0;border-bottom:1px solid var(--wa-line-08);background:transparent}.wa-style-profile__row span{color:var(--wa-color-muted);font-size:11px;line-height:1.18;font-weight:560}.wa-style-profile__row strong{color:var(--wa-ink);font-size:12.5px;line-height:1.28;font-weight:430}.wa-style-profile__examples{display:grid;gap:0}.wa-style-profile__example{position:relative;margin:0;padding:6px 0 6px 16px;color:var(--wa-ink);background:transparent;font-size:12px;line-height:1.34;font-weight:430}.wa-style-profile__example:before{content:"";position:absolute;top:14px;left:2px;width:4px;height:4px;border-radius:999px;background:var(--wa-color-muted)}.wa-proximity-list__rows{display:grid;gap:7px}.wa-proximity-lead{display:grid;grid-template-columns:30px minmax(0,1fr);gap:9px;min-width:0;padding:9px 10px;border:1px solid var(--wa-line-10);border-radius:var(--wa-radius-sm);background:var(--wa-panel);box-shadow:var(--wa-tight-shadow)}.wa-proximity-lead__rank{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:999px;color:var(--wa-color-inverse);background:var(--wa-color-dark-surface);font-size:11px;line-height:1;font-weight:660}.wa-proximity-lead__body{display:grid;gap:5px;min-width:0}.wa-proximity-lead__top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:start}.wa-proximity-lead__identity{display:grid;gap:2px;min-width:0}.wa-proximity-lead__identity strong{color:var(--wa-ink);font-size:12.5px;line-height:1.1;font-weight:570}.wa-proximity-lead__identity span{color:var(--wa-color-muted);font-size:10px;line-height:1.1;font-weight:410}.wa-proximity-lead__score{color:var(--wa-color-accent);font-size:11px;line-height:1;font-weight:680}.wa-proximity-lead__personalization{margin:0;color:var(--wa-ink);font-size:11px;line-height:1.22;font-weight:430}.wa-proximity-lead__proximity{color:var(--wa-color-muted);font-size:9.5px;line-height:1;font-weight:620;text-transform:uppercase}.wa-sequence-engagement__sequences{display:grid;gap:24px}.wa-sequence-people-wrap{--wa-sequence-person-card-min-width: 112px;position:relative;isolation:isolate;width:100%;min-width:0;max-width:100%;overflow:visible}.wa-sequence-people-wrap:after{content:"";position:absolute;right:0;bottom:0;left:0;z-index:0;height:1px;background:var(--wa-sequence-tab-line-stroke);pointer-events:none;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 34px,#000 calc(100% - 34px),transparent 100%);mask-image:linear-gradient(to right,transparent 0,#000 34px,#000 calc(100% - 34px),transparent 100%)}.wa-sequence-people{--wa-sequence-person-card-min-width: 112px;position:relative;z-index:1;isolation:isolate;display:flex;gap:4px;align-items:end;width:100%;max-width:100%;margin:0;padding:3px max(16px,calc(50% - var(--wa-sequence-person-card-min-width) / 2)) 0;overflow-x:auto;overflow-y:visible;scroll-snap-type:none;scroll-padding-inline:max(16px,calc(50% - var(--wa-sequence-person-card-min-width) / 2));scrollbar-width:none;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 34px,#000 calc(100% - 34px),transparent 100%);mask-image:linear-gradient(to right,transparent 0,#000 34px,#000 calc(100% - 34px),transparent 100%)}.wa-sequence-people::-webkit-scrollbar{display:none}.wa-sequence-people[data-sequence-centering=true]{scroll-snap-type:none}.wa-sequence-person-card{position:relative;z-index:1;display:grid;flex:0 0 auto;grid-template-columns:28px max-content;gap:8px;align-items:center;width:max-content;min-width:var(--wa-sequence-person-card-min-width);min-height:46px;padding:8px 10px 9px;border:1px solid var(--wa-line-08);border-bottom-color:transparent;border-radius:9px 9px 0 0;color:var(--wa-ink);background:var(--wa-sequence-person-bg);background-clip:padding-box;font:inherit;text-align:left;opacity:.66;cursor:pointer;scroll-snap-align:none;transform:translateZ(0);transform-origin:center;backface-visibility:hidden;will-change:transform,opacity;transition:border-color .16s ease,background .16s ease,box-shadow .16s ease,opacity .16s ease,transform .18s cubic-bezier(.2,.8,.2,1)}.wa-sequence-person-card:is(:hover,[data-active=true]){border-color:var(--wa-sequence-person-border);background:var(--wa-panel);opacity:1}.wa-sequence-person-card[data-active=true]{z-index:3;border-color:var(--wa-sequence-person-active-border);border-bottom-color:var(--wa-panel);box-shadow:none;background-clip:border-box}.wa-sequence-person-card[data-active=true]:after{content:none}.wa-sequence-person-card__avatar-wrap{position:relative;display:inline-grid;width:28px;height:28px}.wa-sequence-person-card__avatar{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;overflow:hidden;border:1px solid rgba(17,17,15,.08);border-radius:999px;color:#11110f;background:#e8f3ff;font-size:10px;line-height:1;font-weight:620}.wa-sequence-person-card__company{position:absolute;right:-1px;bottom:-1px;display:grid;place-items:center;width:12px;height:12px;overflow:hidden;border:0;border-radius:999px;background:transparent;box-shadow:0 0 0 1.5px var(--wa-panel),0 1px 2px #11110f1f}.wa-sequence-person-card__company img{display:block;width:100%;height:100%;border-radius:inherit;object-fit:cover}.wa-sequence-person-card__avatar img{display:block;width:100%;height:100%;object-fit:cover}.wa-sequence-person-card__avatar[data-avatar-tone="2"]{background:#f1eadf}.wa-sequence-person-card__avatar[data-avatar-tone="3"]{background:#e9f5e6}.wa-sequence-person-card__avatar[data-avatar-tone="4"]{background:#f4e8ec}.wa-sequence-person-card__avatar[data-avatar-tone="5"]{background:#e8f1f0}.wa-sequence-person-card__avatar[data-avatar-tone="6"]{background:#f1ede7}.wa-sequence-person-card__avatar[data-avatar-tone="7"]{background:#e9edf5}.wa-sequence-person-card__avatar[data-avatar-tone="8"]{background:#f2eeee}.wa-sequence-person-card__avatar[data-avatar-tone="9"]{background:#edf3e8}.wa-sequence-person-card__copy{display:grid;gap:2px;width:max-content;min-width:0}.wa-sequence-person-card__copy strong{overflow:visible;color:var(--wa-ink);font-size:12px;line-height:1.1;font-weight:560;text-overflow:clip;white-space:nowrap}.wa-sequence-person-card__copy span{overflow:visible;color:var(--wa-color-muted);font-size:10px;line-height:1.12;font-weight:410;text-overflow:clip;white-space:nowrap}.wa-sequence-card{display:grid;grid-template-columns:minmax(0,248px) minmax(0,424px);gap:16px;align-items:start;justify-content:center;min-width:0;padding:0;border:0;background:transparent;box-shadow:none}.wa-sequence-card__top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:start}.wa-sequence-card__identity{display:grid;gap:2px;min-width:0}.wa-sequence-card__identity strong{color:var(--wa-ink);font-size:12.5px;line-height:1.1;font-weight:570}.wa-sequence-card__identity span,.wa-sequence-card__personalization{color:var(--wa-color-muted);font-size:10.5px;line-height:1.22;font-weight:410}.wa-sequence-card__label{color:var(--wa-color-accent);font-size:9.5px;line-height:1;font-weight:680;text-transform:uppercase}.wa-sequence-card__subject{margin:0;color:var(--wa-ink);font-size:12px;line-height:1.18;font-weight:540}.wa-sequence-card__personalization{margin:0}.wa-sequence-steps{--wa-sequence-dot-stroke: var(--wa-panel);--wa-sequence-dot-center: 8.5px;--wa-sequence-step-size: 82px;display:grid;position:relative;grid-template-columns:52px 10px minmax(0,1fr);align-content:start;column-gap:8px;row-gap:0;min-width:0;margin:14px 0 0;color:var(--wa-sequence-step-muted)}.wa-sequence-step{position:relative;display:grid;grid-column:2 / 4;grid-template-columns:10px minmax(0,1fr);align-content:start;column-gap:12px;row-gap:8px;align-items:start;width:100%;min-height:var(--wa-sequence-step-size);padding:0;border:0;border-radius:0;color:var(--wa-sequence-step-muted);background:transparent;font:inherit;text-align:left;cursor:pointer}.wa-sequence-step:before{content:"";position:absolute;top:calc(var(--wa-sequence-dot-center) - 5.5px);left:-.5px;z-index:2;width:7px;height:7px;box-sizing:content-box;border:2px solid var(--wa-sequence-dot-stroke);border-radius:999px;background:var(--wa-sequence-dot-color)}.wa-sequence-step:after{content:"";position:absolute;top:var(--wa-sequence-dot-center);left:4.5px;z-index:1;width:1px;height:var(--wa-sequence-step-size);border-radius:999px;background:var(--wa-sequence-dot-color)}.wa-sequence-step:last-of-type:after{content:none}.wa-sequence-step__channel{display:inline-flex;grid-column:2;align-items:center;justify-content:start;gap:7px;min-height:0;padding:0;border-radius:0;color:var(--wa-sequence-step-muted);background:transparent;font-size:12px;line-height:1;font-weight:500;text-transform:none;transform:translateY(1px)}.wa-sequence-step__icon{display:inline-flex;width:14px;height:14px;align-items:center;justify-content:center;color:currentColor;transform:translateY(-1px)}.wa-sequence-step__icon svg{display:block;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.05;stroke-linecap:round;stroke-linejoin:round}.wa-sequence-step[data-channel=linkedin] .wa-sequence-step__channel,.wa-sequence-step[data-channel=call] .wa-sequence-step__channel{color:var(--wa-sequence-step-muted);background:transparent}.wa-sequence-step__copy{display:grid;grid-column:2;gap:5px;min-width:0}.wa-sequence-step__copy strong{color:currentColor;font-size:14px;line-height:1.05;font-weight:520;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wa-sequence-step__copy strong[data-sequence-content-swap-active=true],.wa-sequence-copy-panel__meta[data-sequence-content-swap-active=true],.wa-sequence-copy-panel__subject[data-sequence-content-swap-active=true],.wa-sequence-copy-panel__body[data-sequence-content-swap-active=true]{position:relative;overflow:hidden}.wa-sequence-step__copy strong[data-sequence-content-swap-active=true]{display:block}.wa-sequence-content-swap-clone{position:absolute;inset:0;box-sizing:border-box;display:block;width:100%;max-width:100%;min-width:0;padding:inherit;gap:inherit;color:inherit;font:inherit;line-height:inherit;pointer-events:none;opacity:0;visibility:hidden}.wa-sequence-step__copy strong .wa-sequence-content-swap-clone{display:block;color:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wa-sequence-copy-panel__meta .wa-sequence-content-swap-clone{display:flex;align-items:center}.wa-sequence-copy-panel:not([data-copy-channel=connect]):not([data-copy-channel=call]) .wa-sequence-copy-panel__subject .wa-sequence-content-swap-clone{display:flex;align-items:center}.wa-sequence-copy-panel[data-copy-channel=call] .wa-sequence-copy-panel__body .wa-sequence-content-swap-clone{display:grid;align-items:inherit;justify-items:inherit}.wa-sequence-copy-panel[data-copy-channel=call] .wa-sequence-copy-panel__subject[data-sequence-content-swap-active=true],.wa-sequence-copy-panel[data-copy-channel=call] .wa-sequence-copy-panel__body[data-sequence-content-swap-active=true]{overflow:visible}.wa-sequence-step__copy span{color:var(--wa-color-muted);font-size:10px;line-height:1.22;font-weight:410}.wa-sequence-step[data-step-open=false]{align-items:start;padding:0}.wa-sequence-step[data-step-selected=true]{color:var(--wa-sequence-step-selected);background:transparent}.wa-sequence-step[data-step-selected=true]:before{background:var(--wa-sequence-dot-selected)}.wa-sequence-step[data-step-selected=true] .wa-sequence-step__channel{color:var(--wa-sequence-step-selected)}.wa-sequence-step[data-step-open=false] .wa-sequence-step__copy span{display:none}.wa-sequence-step[data-step-open=false] .wa-sequence-step__copy strong .wa-sequence-content-swap-clone{display:block}.wa-sequence-wait{display:grid;grid-column:1;align-items:center;justify-items:end;min-height:var(--wa-sequence-step-size);margin-top:0;padding:0 8px 0 0;color:var(--wa-sequence-wait);font-size:10px;line-height:1.12;font-weight:500;letter-spacing:0;text-align:right;transform:translateY(calc(var(--wa-sequence-dot-center) - var(--wa-sequence-step-size)))}.wa-sequence-wait:before{content:none}.wa-sequence-wait__label{display:grid;width:44px;justify-items:end;text-align:right;white-space:normal}.wa-sequence-wait__prefix,.wa-sequence-wait__value{display:block}.wa-sequence-wait__prefix{padding-right:1px}.wa-sequence-copy-panel{display:grid;align-content:start;gap:0;min-width:0;min-height:336px;padding:0;overflow:hidden;border:1px solid var(--wa-sequence-tab-line-stroke);border-radius:8px;background:var(--wa-panel);box-shadow:var(--wa-sequence-panel-shadow)}.wa-sequence-copy-panel[data-copy-channel=connect],.wa-sequence-copy-panel[data-copy-channel=call]{grid-template-rows:auto auto 1fr}.wa-sequence-copy-panel__meta{display:flex;gap:4px;align-items:center;min-height:36px;padding:0 12px;border-bottom:1px solid var(--wa-sequence-panel-line);background:var(--wa-sequence-panel-header-bg);color:var(--wa-sequence-panel-muted);font-size:13px;line-height:1;font-weight:410;text-transform:none}.wa-sequence-copy-panel__meta strong{color:var(--wa-sequence-panel-strong);font-weight:410}.wa-sequence-copy-panel[data-copy-channel=connect] .wa-sequence-copy-panel__meta,.wa-sequence-copy-panel[data-copy-channel=call] .wa-sequence-copy-panel__meta{color:var(--wa-ink);font-weight:410}.wa-sequence-copy-panel__subject{display:flex;align-items:center;min-height:36px;padding:0 12px;border-bottom:1px solid var(--wa-sequence-panel-line);color:var(--wa-ink);font-size:14px;line-height:1.12;font-weight:600}.wa-sequence-copy-panel[data-copy-channel=connect] .wa-sequence-copy-panel__subject{display:block;min-height:69px;margin:14px 12px 0;padding:10px 12px;border:1px solid var(--wa-sequence-field-border);border-radius:4px;color:var(--wa-sequence-field-text);font-size:13px;line-height:1.45;font-weight:500}.wa-sequence-copy-panel[data-copy-channel=call] .wa-sequence-copy-panel__subject{display:block;min-height:0;padding:14px 12px 0;border-bottom:0;color:var(--wa-sequence-field-text);font-size:13px;line-height:1.45;font-weight:500}.wa-sequence-copy-panel__body{margin:0;padding:13px 12px;color:var(--wa-ink);font-size:13px;line-height:1.48;font-weight:500;white-space:pre-line}.wa-sequence-copy-panel[data-copy-channel=connect] .wa-sequence-copy-panel__body{justify-self:end;margin:0;padding:8px 16px 0 0;color:var(--wa-sequence-connect-muted);font-size:12px;line-height:1;font-weight:520;white-space:normal}.wa-sequence-copy-panel[data-copy-channel=call] .wa-sequence-copy-panel__body{display:grid;align-items:end;justify-items:center;min-height:0;padding:0 18px 29px;white-space:normal}.wa-sequence-call-action{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:11px;align-items:center;width:min(100%,286px);min-height:50px;padding:5px 7px 5px 6px;border:1px solid var(--wa-sequence-field-border);border-radius:999px;background:var(--wa-panel);box-shadow:0 1px 2px #11110f1f,0 10px 20px #11110f14}.wa-sequence-call-action__avatar{display:inline-grid;place-items:center;width:34px;height:34px;overflow:hidden;border-radius:999px;background:var(--wa-sequence-call-avatar-bg);color:var(--wa-ink);font-size:10px;line-height:1;font-weight:620;filter:grayscale(1);opacity:.74}.wa-sequence-call-action__avatar img{display:block;width:100%;height:100%;object-fit:cover;filter:grayscale(1)}.wa-sequence-call-action__copy{display:grid;gap:2px;min-width:0;color:var(--wa-sequence-call-copy)}.wa-sequence-call-action__copy strong{overflow:hidden;color:var(--wa-sequence-call-copy);font-size:13px;line-height:1.08;font-weight:520;text-overflow:ellipsis;white-space:nowrap}.wa-sequence-call-action__copy span{overflow:hidden;color:var(--wa-sequence-call-muted);font-size:12px;line-height:1.08;font-weight:410;text-overflow:ellipsis;white-space:nowrap}.wa-sequence-call-action__button{display:inline-flex;gap:5px;align-items:center;justify-content:center;min-width:74px;min-height:35px;padding:0 13px;border-radius:999px;color:var(--wa-sequence-call-button-text);background:var(--wa-sequence-call-button-bg);font-size:13px;line-height:1;font-weight:620}.wa-sequence-call-action__icon,.wa-sequence-call-action__icon svg{display:block;width:15px;height:15px}.wa-sequence-call-action__icon svg{fill:none;stroke:currentColor;stroke-width:1.2;stroke-linecap:round;stroke-linejoin:round}.wa-sequence-step__copy strong,.wa-sequence-copy-panel__meta,.wa-sequence-copy-panel__subject,.wa-sequence-copy-panel__body{backface-visibility:hidden;transform:translateZ(0);will-change:transform,opacity}.wa-engage-channels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.wa-engage-channel{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px;align-items:start;min-width:0;min-height:58px;padding:9px 10px;border:1px solid var(--wa-line-10);border-radius:var(--wa-radius-sm);color:var(--wa-ink);background:var(--wa-row-bg);font:inherit;text-align:left}.wa-engage-channel__copy{display:grid;gap:3px;min-width:0}.wa-engage-channel__copy strong{color:var(--wa-ink);font-size:11px;line-height:1.1;font-weight:570}.wa-engage-channel__copy span{color:var(--wa-color-muted);font-size:9.5px;line-height:1.16;font-weight:410}.wa-engage-channel__badge{display:inline-flex;align-items:center;min-height:17px;padding:0 6px;border-radius:999px;color:var(--wa-color-inverse);background:var(--wa-color-accent);font-size:8px;line-height:1;font-weight:740;text-transform:uppercase;white-space:nowrap}.wa-sequence-actions{display:flex;gap:8px;align-items:center;justify-content:center;justify-self:stretch;width:100%}.wa-sequence-action,.wa-sequence-kickoff{display:inline-flex;align-items:center;justify-content:center;width:auto;min-width:0;min-height:32px;padding:0 12px;border:1px solid var(--wa-ink);border-radius:var(--wa-radius-sm);font:inherit;text-align:center;cursor:pointer}.wa-sequence-action--draft{border-color:var(--wa-sequence-draft-border);color:var(--wa-color-muted);background:var(--wa-sequence-draft-bg)}.wa-sequence-kickoff{color:var(--wa-color-inverse);background:var(--wa-ink);box-shadow:0 10px 22px #1717141f}.wa-sequence-kickoff__label{font-size:11px;line-height:1.05;font-weight:580}.wa-sequence-kickoff[data-processing=true]{gap:7px;cursor:progress}.wa-sequence-kickoff[data-processing=true]:before{content:"";display:block;width:11px;height:11px;border:1.4px solid currentColor;border-right-color:transparent;border-radius:999px;opacity:.86;animation:wa-spin .72s linear infinite}.wa-enrollment-mail{position:absolute;z-index:6;display:grid;place-items:center;width:16px;height:16px;color:var(--wa-color-accent);pointer-events:none;will-change:transform,opacity;filter:drop-shadow(0 2px 4px rgba(23,23,20,.14));animation:wa-enrollment-mail-color-shift .24s cubic-bezier(.2,.88,.28,1) both}.wa-enrollment-mail__icon{display:block;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}.wa-section[data-resolved-theme=dark] .wa-enrollment-mail{filter:drop-shadow(0 2px 5px rgba(0,0,0,.38))}.wa-composer{position:absolute;right:var(--wa-composer-side-inset);bottom:var(--wa-composer-bottom-outset);left:var(--wa-composer-side-inset);z-index:3;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;gap:8px;align-items:stretch;height:var(--wa-composer-height);min-height:0;padding:18px 10px 10px 20px;margin:0;overflow:hidden;border:1px solid var(--wa-color-input-line);border-radius:9px;background:var(--wa-color-data-table-surface);box-shadow:var(--wa-composer-shadow);transform-origin:center center;contain:layout paint style;backface-visibility:hidden;transition:border-color .14s ease,box-shadow .14s ease}.wa-composer[data-visible=false]{pointer-events:none}.wa-composer__placeholder{display:flex;grid-row:1;align-items:flex-start;align-self:start;min-width:0;min-height:20px;padding:0;overflow:hidden;border:0;border-radius:0;color:var(--wa-ink);background:transparent;font-size:16px;line-height:1.32;font-weight:400;overflow-wrap:anywhere;white-space:normal}.wa-composer__placeholder:empty:before{content:"Ask anything...";color:var(--wa-placeholder)}.wa-composer__controls{display:inline-flex;grid-row:2;align-items:center;justify-self:end;gap:12px;min-width:0}.wa-composer__select{display:inline-flex;align-items:center;gap:5px;color:var(--wa-color-muted);font-size:12px;line-height:1;font-weight:410;white-space:nowrap}.wa-composer__chevron{display:block;width:16px;height:16px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.wa-composer__send{display:inline-flex;align-items:center;justify-content:center;width:var(--wa-composer-send-size);min-width:var(--wa-composer-send-size);height:var(--wa-composer-send-size);padding:0;border:0;border-radius:999px;color:var(--wa-color-inverse);background:var(--wa-color-dark-surface);line-height:1;cursor:default;white-space:nowrap}.wa-composer__send-icon{display:block;width:16px;height:16px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.wa-composer__placeholder:empty~.wa-composer__controls .wa-composer__send{background:var(--wa-signup-submit-bg)}.wa-history-resume{position:absolute;right:auto;bottom:calc(var(--wa-composer-bottom-outset) + var(--wa-composer-height) - var(--wa-history-resume-height) - var(--wa-history-resume-y-offset));left:50%;z-index:5;display:inline-flex;align-items:center;gap:10px;min-height:var(--wa-history-resume-height);padding:0 18px 0 12px;border:1px solid var(--wa-line-12);border-radius:999px;color:var(--wa-color-heading-strong);background:var(--wa-color-data-table-surface);box-shadow:var(--wa-card-shadow);font:inherit;font-size:13px;line-height:1;font-weight:520;letter-spacing:0;cursor:default;opacity:0;pointer-events:none;transform:translate(-50%,6px) scale(.98);transition:opacity .16s ease,transform .18s ease}.wa-section[data-story-paused=true] .wa-history-resume,.wa-section[data-chat-history-paused=true] .wa-history-resume{opacity:1;pointer-events:auto;transform:translate(-50%) scale(1)}.wa-history-resume__icon{position:relative;display:grid;place-items:center;width:24px;height:24px;border-radius:999px;color:var(--wa-color-inverse);background:var(--wa-color-dark-surface);font-size:0;line-height:0}.wa-history-resume__svg{display:block;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.wa-stage__eyebrow,.wa-stage__label,.wa-stage__status{display:none}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar{border-color:var(--wa-line-12);color:var(--wa-color-heading-strong);background:linear-gradient(145deg,#50545d,#25272d)}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="2"]{background:linear-gradient(145deg,#355c48,#1d3329)}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="3"],.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="6"]{background:linear-gradient(145deg,#2d6d7f,#173743)}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="4"],.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="7"]{background:linear-gradient(145deg,#5d5349,#302b25)}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="5"]{background:linear-gradient(145deg,#4b4650,#19191c)}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="8"]{background:linear-gradient(145deg,#087bb9,#063f6b)}.wa-section[data-resolved-theme=dark] .wa-data-table-person__avatar[data-avatar-tone="9"]{background:linear-gradient(145deg,#625848,#2b241f)}.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar{border-color:var(--wa-line-12);color:var(--wa-color-heading-strong);background:#253747}.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="2"],.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="6"]{background:#3a332a}.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="3"],.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="9"]{background:#263a2b}.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="4"],.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="8"]{background:#3d2e34}.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="5"]{background:#273b3a}.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__avatar[data-avatar-tone="7"]{background:#2b3140}.wa-section[data-resolved-theme=dark] .wa-data-table-person__source[data-source=company],.wa-section[data-resolved-theme=dark] .wa-sequence-person-card__company{box-shadow:0 0 0 1.5px var(--wa-panel),0 1px 2px #00000057}.wa-section[data-resolved-theme=dark] .wa-proximity-lead,.wa-section[data-resolved-theme=dark] .wa-sequence-kickoff{box-shadow:var(--wa-card-shadow)}.wa-section[data-resolved-theme=dark] .wa-swipe-card,.wa-section[data-resolved-theme=dark] .wa-swipe-game__complete{border-color:var(--wa-line-12);background:var(--wa-color-data-table-surface);box-shadow:var(--wa-card-shadow)}.wa-section[data-resolved-theme=dark] .wa-swipe-game[data-swipe-decision=avoid] .wa-swipe-card[data-swipe-state=active]{border-color:#f07c725c;background:linear-gradient(135deg,rgba(240,124,114,.14),var(--wa-color-data-table-surface) 68%);box-shadow:0 20px 48px #f07c721a}.wa-section[data-resolved-theme=dark] .wa-swipe-game[data-swipe-decision=use] .wa-swipe-card[data-swipe-state=active]{border-color:#75d39c57;background:linear-gradient(135deg,var(--wa-color-data-table-surface) 32%,rgba(117,211,156,.12));box-shadow:0 20px 48px #75d39c14}.wa-section[data-resolved-theme=dark] .wa-swipe-game__action[data-swipe-action=avoid]{border-color:#f07c7252;background:#f07c721f}.wa-section[data-resolved-theme=dark] .wa-swipe-game__action[data-swipe-action=use]{border-color:#75d39c52;background:#75d39c1f}.wa-section[data-resolved-theme=dark] .wa-sequence-call-action{box-shadow:0 1px 2px #0000003d,0 10px 20px #0000003d}.wa-cursor{position:absolute;top:0;left:0;z-index:20;width:1px;height:1px;pointer-events:none;transform:translateZ(0);transform-origin:0 0;backface-visibility:hidden}.wa-cursor__float{position:absolute;top:0;left:0;width:1px;height:1px;transform-origin:0 0;backface-visibility:hidden}.wa-cursor__glyph{position:absolute;top:0;left:0;width:var(--wa-cursor-default-width);height:var(--wa-cursor-default-height);background-image:var(--wa-cursor-arrow);background-repeat:no-repeat;background-position:0 0;background-size:100% 100%;transform:translate(0);transform-origin:0 0;backface-visibility:hidden;filter:drop-shadow(0 2px 3px var(--wa-cursor-shadow))}.wa-cursor__glyph:before,.wa-cursor__glyph:after{content:"";position:absolute;opacity:0;top:0;left:0;width:var(--wa-cursor-default-width);height:var(--wa-cursor-default-height);background-repeat:no-repeat;background-position:0 0;background-size:100% 100%;pointer-events:none}.wa-cursor__mimic-head,.wa-cursor__mimic-tail{position:absolute;inset:0;display:none;width:100%;height:100%;background-repeat:no-repeat;background-position:0 0;background-size:100% 100%;pointer-events:none;transform-origin:6px 13.25px;backface-visibility:hidden}.wa-cursor__mimic-head{z-index:2;background-image:var(--wa-cursor-arrow-head)}.wa-cursor__mimic-tail{z-index:1;background-image:var(--wa-cursor-arrow-tail)}.wa-cursor[data-cursor-mimicking=true][data-cursor-mode=default] .wa-cursor__glyph{background-image:none}.wa-cursor[data-cursor-mimicking=true][data-cursor-mode=default] .wa-cursor__mimic-head,.wa-cursor[data-cursor-mimicking=true][data-cursor-mode=default] .wa-cursor__mimic-tail{display:block}.wa-cursor[data-cursor-mimicking=true][data-cursor-mode=default] .wa-cursor__mimic-tail{animation:wa-cursor-tail-wag 215ms infinite}.wa-cursor[data-cursor-mode=pointer] .wa-cursor__glyph,.wa-cursor[data-cursor-mode=click] .wa-cursor__glyph{width:32px;height:32px;background-image:var(--wa-cursor-hand);transform:translate(-10px,-1px)}.wa-cursor[data-cursor-mode=drag] .wa-cursor__glyph{width:32px;height:32px;background-image:var(--wa-cursor-closedhand);transform:translate(-16px,-16px)}.wa-cursor[data-cursor-mode=release] .wa-cursor__glyph{width:32px;height:32px;background-image:var(--wa-cursor-openhand);transform:translate(-16px,-16px)}.wa-cursor[data-cursor-mode=text] .wa-cursor__glyph{width:23px;height:22px;background-image:var(--wa-cursor-ibeam);transform:translate(-11px,-11px)}@keyframes wa-cursor-tail-wag{0%,to{animation-timing-function:cubic-bezier(.16,.88,.24,1);transform:translateZ(0) rotate(-1deg) skew(0)}24%{animation-timing-function:cubic-bezier(.16,0,.24,1);transform:translate3d(.32px,0,0) rotate(12deg) skew(2deg)}38%{animation-timing-function:cubic-bezier(.16,.88,.24,1);transform:translate3d(.1px,0,0) rotate(4.2deg) skew(.75deg)}64%{animation-timing-function:cubic-bezier(.2,0,.24,1);transform:translate3d(-.3px,0,0) rotate(-11deg) skew(-1.9deg)}}@keyframes wa-thinking-logo-gradient{0%{background-position:120% 50%}to{background-position:-120% 50%}}@keyframes wa-mailbox-gmail-radiate{0%{background-position:0% 50%,0% 50%}50%{background-position:100% 50%,100% 50%}to{background-position:0% 50%,0% 50%}}@keyframes wa-mailbox-gmail-pulse{0%,to{transform:scale(.98)}50%{transform:scale(1.08)}}@keyframes wa-dot{0%,80%,to{opacity:.28;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@keyframes wa-data-table-dot-pop{0%{transform:scale(.76)}56%{transform:scale(1.24)}to{transform:scale(1)}}@keyframes wa-data-table-chevron-previous{0%,to{transform:translateZ(0)}42%{transform:translate3d(-2px,0,0)}}@keyframes wa-data-table-chevron-next{0%,to{transform:translateZ(0)}42%{transform:translate3d(2px,0,0)}}@keyframes wa-spin{to{transform:rotate(360deg)}}@keyframes wa-caret{0%,45%{opacity:1}46%,to{opacity:0}}@keyframes wa-text-shimmer{0%{background-position:100% 0}62%,to{background-position:0% 0}}@keyframes wa-tool-call-favicon-shimmer{0%,to{filter:brightness(.96) saturate(.96);opacity:.78}46%{filter:brightness(1.22) saturate(1.12);opacity:1}}@keyframes wa-enrollment-mail-color-shift{0%{color:#11110f}to{color:var(--wa-color-accent)}}@media(max-width:1259px){.wa-section{--wa-title-size: clamp(48px, 4.5vw, 58px);--wa-title-line-height: 1.08;--wa-feature-title-size: clamp(36px, 3.5vw, 44px);--wa-feature-copy-size: clamp(20px, 2.1vw, 25px);--wa-chat-x-padding: 24px;--wa-story-controls-x-offset: 0px;--wa-story-controls-y-offset: 0px;--wa-story-controls-width-extra: 0px;--wa-story-tab-y-padding: 0px;--wa-story-description-gap: 20px;--wa-story-nav-inline-padding: 0px;--wa-story-body-inline-padding: 0px;--wa-stage-y-offset: 0px;padding:88px clamp(56px,6vw,80px) 118px}.wa-section__inner{grid-template-columns:1fr;grid-template-rows:auto auto auto;row-gap:clamp(92px,11vw,154px);width:100%}.wa-copy{max-width:min(1160px,100%)}.wa-copy__title>span{display:inline}.wa-story-controls,.wa-stage{grid-column:1}.wa-story-controls{grid-template-areas:"nav" "story";grid-template-columns:1fr;align-items:start;width:min(1080px,100%);justify-self:start;gap:0;padding-top:0}.wa-story-tabs{grid-area:story;min-width:0;gap:0;margin-top:30px}.wa-story-tab{display:none}.wa-story-tab.is-active{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:auto auto;min-height:0;padding:0;gap:0;align-items:start}.wa-story-tab.is-active .wa-story-tab__marker{order:2;width:100%;height:4px;min-height:4px;margin-top:42px;cursor:ew-resize}.wa-story-tab.is-active .wa-story-tab__marker:before{transform:scaleX(var(--wa-tab-progress));transform-origin:left}.wa-story-tab__body{order:1;min-width:0;gap:20px;padding-top:0;padding-right:var(--wa-story-body-inline-padding);padding-left:var(--wa-story-body-inline-padding)}.wa-story-tab__count{display:none}.wa-story-tab__title{overflow:visible;white-space:normal;text-overflow:clip;font-size:clamp(31px,7.1vw,38px);line-height:1.05}.wa-story-tab__description{display:block;max-width:960px;font-size:clamp(18px,4.2vw,22px);line-height:1.34}.wa-controls-row{grid-area:nav;position:static;display:inline-flex;align-items:center;justify-content:flex-start;gap:24px;width:auto;height:auto;overflow:visible;clip:auto;clip-path:none;white-space:normal;padding-top:0;padding-right:var(--wa-story-nav-inline-padding);padding-left:var(--wa-story-nav-inline-padding)}.wa-controls-row [data-toggle-play],.wa-controls-row .wa-scrubber{display:none}.wa-story-count{display:inline-flex;align-items:center;color:var(--wa-color-heading-strong);font-size:25px;line-height:1;font-weight:500;letter-spacing:0}.wa-control-button{display:grid;place-items:center;width:54px;height:54px;padding:0;border:1px solid var(--wa-line-12);border-radius:999px;color:var(--wa-color-heading-strong);background:var(--wa-color-soft-surface);box-shadow:none;cursor:pointer}.wa-controls-row [data-prev-story] svg,.wa-controls-row [data-next-story] svg{transform:none}.wa-control-button:hover{border-color:var(--wa-line-20);background:var(--wa-color-data-table-surface)}.wa-control-button:focus-visible{outline:2px solid var(--wa-color-accent);outline-offset:3px}.wa-stage{grid-row:3;width:100%;min-height:calc(var(--wa-window-height) + 132px);justify-self:center;overflow:visible}.wa-stage[data-window-content-scale]{min-height:var(--wa-window-scene-height)}.wa-stage__media{top:180px;right:auto;left:0;width:min(1080px,100%);height:clamp(360px,36vw,440px);min-height:0;transform:none}.wa-window{width:var(--wa-window-width);margin:0 auto}.wa-chat-shell{height:var(--wa-window-height)}}@media(max-width:760px){.wa-section{--wa-mobile-page-inset: clamp(24px, 7vw, 34px);--wa-story-description-gap: 22px;--wa-story-nav-inline-padding: var(--wa-mobile-page-inset);--wa-story-body-inline-padding: var(--wa-mobile-page-inset);--wa-mobile-browser-content-width: 590px;--wa-window-width: 100vw;--wa-window-height: 530px;padding:38px 0 0}.wa-section__inner{row-gap:0;width:100%}.wa-copy{padding-top:62px;padding-right:var(--wa-mobile-page-inset);padding-left:var(--wa-mobile-page-inset);margin-bottom:86px}.wa-copy__title{font-size:clamp(34px,8.8vw,44px);line-height:1.14}.wa-control-button{width:52px;height:52px}.wa-story-tab.is-active .wa-story-tab__marker{width:100%;height:2px;min-height:2px;margin-top:52px;margin-left:0}.wa-story-tab__body{gap:22px}.wa-stage{--wa-window-scene-min-width: var(--wa-mobile-browser-content-width);width:100vw;min-height:var(--wa-window-height);margin-top:0;overflow:visible}.wa-stage[data-window-content-scale]{min-height:var(--wa-window-scene-height)}.wa-stage__media{display:none}.wa-window{width:var(--wa-window-width);margin:0;border-radius:0}.wa-chat-shell{height:var(--wa-window-height);max-height:none;border-top:0;border-right:0;border-left:0;border-radius:0;box-shadow:none}.wa-chat-shell__body{width:calc(var(--wa-mobile-browser-content-width) - 2px);justify-self:center}.wa-composer{right:auto;left:calc(50% - (var(--wa-mobile-browser-content-width) / 2) + 1px + var(--wa-composer-side-inset));width:calc(var(--wa-mobile-browser-content-width) - 2px - (var(--wa-composer-side-inset) * 2))}}@media(prefers-reduced-motion:reduce){.wa-section *,.wa-section *:before,.wa-section *:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}}`,
    qh = "chatbot-stories-runtime-styles";
  function Bh() {
    Rh(qh, Ih);
  }
  const fn = Eh(Sh, { injectStyles: Bh });
  function rs(r = "[data-chatbot-stories]", e = {}) {
    return fn.init(r, e);
  }
  const Lh = { init: rs, defaultStories: hn };
  return (
    typeof window < "u" &&
      ((window.ChatbotStories = Lh),
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", fn.autoInit, {
            once: !0,
          })
        : fn.autoInit()),
    (Aa.defaultStories = hn),
    (Aa.init = rs),
    Object.defineProperty(Aa, Symbol.toStringTag, { value: "Module" }),
    Aa
  );
})({});
