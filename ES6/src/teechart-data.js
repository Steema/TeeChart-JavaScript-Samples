import { Chart } from "./teechart.js";
import { ToolTip } from "./teechart.js";
import { SeriesAnimation } from "./teechart.js";
import { FadeAnimation } from "./teechart.js";
import { CircularGauge } from "./teechart.js";

/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v2.6 May 2020
 * Copyright(c) 2012-2020 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed with commercial and non-commercial attributes,
 * specifically: http://www.steema.com/licensing/html5
 *
 * JavaScript is a trademark of Oracle Corporation.
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 2.4
 */

/**
 * @constructor
 * @class Main Data class to perform multi-dimensional queries and charts.
 */
class Data {
  constructor() {
    this.datasets = [];
  }

  //var engine=this;

  /**
   * @param {String} title The string identifier for this dataset.
   * @param {object} object The custom data for this dataset.
   * @param {String} [field=""] The object data optional field that contains an array.
   * @param {String} [id=""] The optional field in the array that uniquely identifies each array row.
   * @returns {Dimension} Returns a top-level dimension.
   */
  addDataSet(title, object, field, id) {
    if (object && object.implementation)
      // IE ?? instanceof XMLDocument)
      object = xmlToJson(object);

    const d = new Dimension(title, field, id);

    d.object = object;
    d.dataset = d;
    d.dimensions = [];
    d.engine = this;

    this.datasets.push(d);
    return d;
  }

  addJSON(title, json, field, id) {
    return this.addDataSet(title, JSON.parse(json), field, id);
  }

  applyStyle(chart, index) {
    switch (index) {
      case 0: {
        chart.panel.transparent = false;
        chart.panel.format.round.x = 0;
        chart.panel.format.round.y = 0;
        chart.panel.format.stroke.size = 2;
        chart.panel.format.stroke.fill = "darkgray";
        break;
      }
    }
  }

  /**
  Groups small values into a single "other" value.
  Requires sorted data.values in DESCENDING order.
  If there are more than "max" number of values, the rest are grouped and
  removed.
*/
  groupOther(data, max, label) {
    let t;
    const l = data.values.length;
    let l2;
    let r;

    if (l > max) {
      (r = 0), (l2 = l - max);

      for (t = max; t < l; t++) r += data.values[t];

      data.values[max - 1] = r;
      data.labels[max - 1] = label;

      data.values.splice(max, l2);
      data.labels.splice(max, l2);
      data.code.splice(max, l2);

      return l2;
    } else return -1;
  }

  slider(chart, items, x, y, width, height) {
    const s = new Slider(chart);
    s.min = 0;
    s.max = items.length - 1;
    s.step = 1;
    s.position = s.min;
    s.useRange = false;
    s.thumbSize = 12;
    s.horizontal = true;

    s.bounds.x = x;
    s.bounds.y = y;
    s.bounds.width = width;
    s.bounds.height = height;

    chart.tools.add(s);

    return s;
  }

  // XML to JSON, adapted from:
  // http://stackoverflow.com/questions/7769829/tool-javascript-to-convert-a-xml-string-to-json

  xmlToJson(xml) {
    let obj = {},
      s;

    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {
        //obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          //obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          obj[attribute.nodeName] = attribute.value;
        }
      }
    } else if (xml.nodeType == 3) {
      obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          if (nodeName === "#text")
            if (item.hasChildNodes()) obj[nodeName] = this.xmlToJson(item);
            else {
              s = item.nodeValue.trim();
              if (s !== "") obj = s;
            }
          else if (nodeName == "xml") obj = this.xmlToJson(item);
          else obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }

  loadXMLDoc(url) {
    const xhttp = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.open("GET", url, false);
    xhttp.send();
    return xhttp.responseXML;
  }

  loadXMLString(text) {
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
    } // Internet Explorer
    else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(text);
    }
    return xmlDoc;
  }

  static accumulate(measure, value, total) {
    total.count++;

    switch (measure) {
      case "sum":
      case "average":
        total.value += value;
        break;
      case "high":
        if (total.count == 1 || value > total.value) total.value = value;
        break;
      case "low":
        if (total.count == 1 || value < total.value) total.value = value;
        break;
    }
  }

  queryDim(m, dim, total) {
    //, masterdim) {

    const lin = m.dimension.getLinksTo(dim);

    let //f, f2,
      t;

    let tot2;

    if (lin) {
      const lin0 = lin[0];

      m.initDims();

      const mfunc = typeof m.name === "function" ? m.name : null;

      m.dimension.traverse(function (o, index) {
        let f = null;

        if (!m.name || m.consider(o)) {
          if (dim) {
            if (lin0.field === null && dim == lin0.dimension)
              if (dim.hasID) f = dim.parent ? dim.data[dim.id] : o[dim.id];
              else if (dim == m.dimension) f = index || total.length;
              else f = dim.field ? o[dim.field] : index;
            else {
              f = dim.searchAcross(lin, o);
              if (f && dim.hasID) f = f[dim.id];
            }
          } else {
            f = m.dimension.title;
            if (!f) {
              f = m.dimension.dataset.object;
              if (m.dimension.field) f = f[m.dimension.field];
            }
          }

          if (f !== null && (!dim || dim.nulls || f !== "")) {
            let i = -1,
              ti,
              valo = mfunc ? mfunc(o) : m.name ? o[m.name] : o;

            if (typeof valo === "undefined") valo = null;
            else {
              if (typeof valo !== "number") valo = parseFloat(valo);

              if (valo !== valo)
                // NaN
                valo = null;
            }

            //document.write(f[dim.id]+" "+valo+"<br/>");

            if (valo !== null) {
              if (dim && dim.datetime) f = dim.datePart(f);

              for (ti = 0; ti < total.length; ti++)
                if (total[ti].id == f) {
                  i = ti;

                  if (total[i].count === 0) {
                    total[i].count = 1;
                    total[i].value = valo;
                  } else Data.accumulate(m.measure, valo, total[i]);

                  break;
                }

              if (i == -1) total.push({ id: f, value: valo, count: 1 });
            }
          }
        }

        return true;
      });

      if (m.measure == "count")
        for (t = 0; t < total.length; t++) {
          tot2 = total[t];
          tot2.value = tot2.count;
        }
      else if (m.measure == "average")
        for (t = 0; t < total.length; t++) {
          tot2 = total[t];
          if (tot2.count > 0) tot2.value = tot2.value / tot2.count;
        }

      return true;
    } else return false;
  }

  sumOfCount(total) {
    let res = 0,
      t;
    for (t = 0; t < total.length; t++) res += total[t].count;
    return res;
  }

  initTotal(total, Ids) {
    if (Ids) {
      let ttt = 0;
      const l = Ids.length;

      for (ttt = 0; ttt < l; ttt++)
        total.push({ id: Ids[ttt], value: 0, count: 0 });
    }
  }

  query(dimension, metric) {
    let m;
    let metrics;
    let dim;
    let dimensions;
    let total;
    const totals = [];
    let mt;
    let dimt;

    let //ttt,
      oldIds;

    let dl;
    let dim0;

    metrics = metric instanceof Array ? metric : [metric];
    dimensions = dimension instanceof Array ? dimension : [dimension];

    dl = dimensions.length;

    if (dl > 0) {
      dim0 = dimensions[0];

      const dim0sel = dim0 ? dim0.selected : null;

      oldIds = [];

      if (dim0sel) oldIds = dim0sel instanceof Array ? dim0sel : [dim0sel];
      else if (dim0 && (dim0.id || dim0.field)) oldIds = dim0.getIds();
    }

    for (mt = 0; mt < metrics.length; mt++) {
      m = metrics[mt];
      if (!m) continue;

      for (dimt = dl - 1; dimt >= 0; dimt--) {
        dim = dimensions[dimt];

        if (dimt > 0) {
          if (!dim) continue;

          let old = dim.selected,
            dimValues;

          if (old) {
            if (!(old instanceof Array)) old = [old];

            if (dim.selectedInclude) dimValues = old;
            else {
              dimValues = dim.getIds();
              for (let oldt = 0; oldt < old.length; oldt++)
                dimValues.splice(dimValues.indexOf(old[oldt]), 1);
            }
          } else dimValues = dim.getIds();

          for (let valt = 0; valt < dimValues.length; valt++) {
            dim.selected = dimValues[valt];

            if (!dim.nulls && dim.selected === "") continue;

            total = [];
            this.initTotal(total, oldIds);

            if (this.queryDim(m, dimensions[dimt - 1], total, dim)) {
              if (dim.nulls || sumOfCount(total) > 0)
                totals.push({
                  metric: m,
                  dimension: dim,
                  values: total,
                  master: dim.selected,
                  masterdim: dimensions[dimt - 1],
                });
            }
          }

          dim.selected = old;
          break;
        } else {
          total = [];
          this.initTotal(total, oldIds);

          if (this.queryDim(m, dim, total))
            totals.push({
              metric: m,
              dimension: dim,
              values: total,
              master: null,
            });
        }
      }

      // Eliminate nulls:

      if (dl > 0 && dim0 && !dim0.nulls) {
        let dd,
          ddd = 0,
          res;

        while (ddd < totals[0].values.length) {
          res = 0;
          for (dd = 0; dd < totals.length; dd++)
            res += totals[dd].values[ddd].count;

          if (res === 0) {
            for (dd = 0; dd < totals.length; dd++)
              totals[dd].values.splice(ddd, 1);
          } else ddd++;
        }
      }
    }

    return totals;
  }

  Chart(canvas, title) {
    const chart = new Chart(canvas);
    chart.engine = this;
    chart.panel.margins.left = 0;

    const tip = new ToolTip(chart);
    tip.render = "dom";
    chart.tools.add(tip);

    tip.ongettext = function (tip, text, series, index) {
      let s = "";
      const la = series.data.labels;

      if (series.chart.series.count() > 1) s = "<br/>" + series.title;

      if (series.data.x) {
        s += "<br/>" + series.data.x[index];
      }

      return text + " " + (la.length > 0 ? la[index] : "") + s;
    };

    //chart.axes.each(function() { this.labels.valueFormat="0"; });

    const clickAnimation = new Animation();

    clickAnimation.onstart = function () {
      this.s.fill = "yellow";
    };
    clickAnimation.onstop = function () {
      this.s.fill = this.old;
    };
    clickAnimation.duration = 100;
    clickAnimation.animateHover = function (chart) {
      this.s = chart.series.items[0].hover.stroke;
      this.old = this.s.fill;
      this.animate(chart);
    };

    chart.title.text = title;

    chart.guessStyle = function (total) {
      if (this.defaultStyle) return this.defaultStyle;
      else {
        return total.length > 30 ? Line : Bar;
      }
    };

    chart.newSeries = function (metric, tot) {
      const total = tot.values;
      const dimension = tot.dimension;
      let masterTitle = tot.master;

      if (!tot.masterdim) {
        if (masterTitle && dimension && dimension.id)
          masterTitle = masterTitle[dimension.id];
        else masterTitle = tot.master || tot.metric.title;
      }

      // Add to series

      const SeriesStyle = chart.guessStyle(total),
        b = chart.addSeries(new SeriesStyle()),
        data = b.data;

      b.title = "" + (masterTitle || "(none)");
      b.marks.style = "value";
      b.cursor = "pointer";

      //b.valueFormat="0";

      data.values = [];
      data.labels = [];
      data.code = [];

      let tot2;
      const lc = chart.series.items.length;
      const res = [];
      let f;
      let label;
      let t;

      if (dimension && dimension.titles) {
        findLinkInDimension(dimension.titles, dimension, res);
      }

      if (lc > 1) {
        const bprev = chart.series.items[lc - 2];
        let i;
        const bdata = bprev.data;

        for (t = 0; t < bdata.values.length; t++) {
          data.values.push(0);
          data.labels.push(bdata.labels[t]);
          data.code.push(bdata.code[t]);
        }

        for (t = 0; t < total.length; t++) {
          tot2 = total[t];
          i = bdata.code.indexOf(tot2.id);

          if (i == -1) {
            data.values.push(tot2.value);

            if (dimension && dimension.titles) {
              f = dimension.searchAcross(res, tot2.id);
              if (f) label = f[dimension.titles.id];
              else label = "";
            } else label = tot2.id[dimension.id];

            data.labels.push(label);
            data.code.push(tot2.id);
          } else data.values[i] = tot2.value;
        }
      } else {
        //var labeldim=dimension;
        //hasDim=(!tot.masterdim) && labeldim && labeldim.hasID;

        for (t = 0; t < total.length; t++) {
          tot2 = total[t];
          data.values.push(tot2.value);

          if (dimension && dimension.titles) {
            f = dimension.searchAcross(res, tot2.id);
            if (f) label = f[dimension.titles.id];
            else label = "";
          } else label = "" + tot2.id; // (hasDim ? tot2.id[labeldim.id] : tot2.id);

          data.labels.push(label);
          data.code.push(tot2.id);
        }
      }

      if (SeriesStyle == CircularGauge) b.setValue(b.data.values[0]);

      if (this.onnewseries) this.onnewseries(this, b);

      return b;
    };

    chart.defaultStyle = null;
    chart.animateChanges = false;

    // Changes all series to style.
    // style can be a string of function from: Bar, Line, Pie, etc.

    chart.setSeriesStyle = function (style) {
      if (!style || style === "" || style === "auto") {
        this.defaultStyle = null;
        return;
      }

      const s = this.series;
      let newS;
      let data;
      let St;

      if (typeof style === "string") {
        St = eval(style);
      } else St = style;

      this.defaultStyle = St;

      for (let t = 0; t < s.items.length; t++) {
        data = s.items[t].data;
        newS = new St();

        newS.setChart(newS, this); // addSeries ?
        newS.format.fill = s.items[t].format.fill;

        newS.data = data;
        s.items[t] = newS;
      }

      this.draw();
    };

    // Creates a query based on dimension and metric, and adds the resulting
    // data to chart.
    // When dontRedraw = true, the chart will not be repainted.

    chart.fill = function (dimension, metric, dontRedraw) {
      this.fillQuery(
        this.engine.query(dimension, metric),
        dimension,
        metric,
        dontRedraw
      );
    };

    chart.fillQuery = function (totals, dimension, metric, dontRedraw) {
      let t;
      let tot;
      let m;
      const old = chart.series.items;

      chart.series.items = [];

      if (totals) {
        for (t = 0; t < totals.length; t++) {
          tot = totals[t];
          m = tot.metric;

          this.newSeries(m, tot).onclick = chart.engine._onclickseries;

          if (
            chart.title.text === "" ||
            typeof chart.title.text === "undefined"
          )
            chart.title.text = m.dimension.title;

          if (!(metric instanceof Array)) {
            chart.legend.title.text = m.title + "\n" + m.measure;
            chart.legend.title.format.font.textAlign = "right";
          }

          const dim2 = dimension instanceof Array ? dimension[0] : dimension;

          if (dim2 && dim2 != m.dataset) {
            chart.axes.bottom.title.text = dim2.datetime
              ? dim2.title + " " + dim2.dateKeys[dim2.datetime.selected]
              : dim2.title;
          }
        }

        if (totals.length > 0)
          chart.axes.left.title.text = totals[0].metric.title;
      }

      //chart.axes.bottom.title.text=dimension.title;

      const sort = this.sort;

      if (sort.sortBy !== "")
        this.sortData(sort.sortBy, sort.order === "ascending");

      if (sort.series !== "") this.sortSeries(sort.series == "ascending");

      if (chart.animateChanges)
        if (old.length == chart.series.items.length) {
          const ss = chart.series.items[0],
            ssvalues = ss.data.values;

          if (old[0].prototype == ss.prototype) {
            if (old[0].data.values.length == ssvalues.length) {
              const newValues = ssvalues.slice(0);
              let val;

              const a = new Animation(chart, function (step) {
                for (let t = 0; t < ssvalues.length; t++) {
                  val = old[0].data.values[t];
                  ssvalues[t] = val + (newValues[t] - val) * step;
                }
              });

              const oldauto = chart.axes.left.automatic;
              chart.axes.left.automatic = false;

              a.duration = 150;
              a.animate();

              chart.axes.left.automatic = oldauto;
            }
          }
        }

      if (!dontRedraw) chart.draw();
    };

    this.applyStyle(chart, 0);

    chart.animateClick = function () {
      clickAnimation.animateHover(chart);
    };

    this.onclickseries = null;

    this._onclickseries = function (series, index) {
      const c = series.chart;

      if (c.onclickseries) {
        c.animateClick();
        c.onclickseries(series, index);
      }
    };

    // Changes series items colors, setting "silver" to disabled ones.

    chart.setSeriesPalette = function (series, dimension) {
      const p = series.palette;
      const l = series.count();
      const c = series.data.code;
      let o;
      p.colors = new Array(l);

      for (let t = 0; t < l; t++) {
        o = c[t];

        if (!dimension.isSelected(o)) p.colors[t] = "silver";
      }
    };

    function totalOf(items, index) {
      let res = 0,
        tt;
      for (tt = 0; tt < items.length; tt++) res += items[tt].data.values[index];
      return res;
    }

    // Reorders all series points, using output order from the first series.
    // sortBy can be "values" or "labels"

    chart.sortData = function (sortBy, ascending) {
      let sorted;
      const l = this.series.count();
      const s0 = this.series.items[0];

      if (l > 0) {
        if (l > 1 && sortBy == "values") {
          const d = s0.data.values;
          const len = d.length;
          let t;
          const items = this.series.items;

          sorted = new Array(len);

          for (t = 0; t < len; t++) sorted[t] = t;

          sorted.sort(function (a, b) {
            const ta = totalOf(items, a),
              tb = totalOf(items, b);
            return ascending ? ta - tb : tb - ta;
          });
        } else sorted = this.series.items[0].doSort(sortBy, ascending);

        this.series.each(function (s) {
          const data2 = { values: [], labels: [], code: [] };
          const data = s.data;
          let tt;

          for (let t = 0; t < data.values.length; t++) {
            tt = sorted[t];
            data2.values.push(data.values[tt]);
            data2.labels.push(data.labels[tt]);
            data2.code.push(data.code[tt]);
          }

          s.data = data2;
        });
      }
    };

    // Re-orders all series in chart, based on series "title" text:

    chart.sortSeries = function (ascending) {
      const i = this.series.items,
        len = i.length;

      if (len < 2) return;

      const sorted = new Array(len);
      let A;
      let B;
      const before = ascending ? -1 : 1;
      const after = ascending ? 1 : -1;
      let t;

      for (t = 0; t < len; t++) sorted[t] = t;

      sorted.sort(function (a, b) {
        A = i[a].title.toLowerCase();
        B = i[b].title.toLowerCase();
        return A < B ? before : A == B ? 0 : after;
      });

      const newList = new Array(len);
      for (t = 0; t < len; t++) newList[t] = i[sorted[t]];

      this.series.items = newList;
    };

    // For all series in chart, groups small values into an "Other" item.

    chart.groupOther = function (maxValues) {
      this.series.each(function (series) {
        const l = Engine.groupOther(series.data, maxValues, "Other");
        if (l > -1) {
          series.data.code[l] = null;
          series.data.code.splice(0, l);
        }
      });
    };

    chart.totalPoints = function () {
      let res = 0;
      this.series.each(function (s) {
        res += s.data.values.length;
      });
      return res;
    };

    // "sortBy" can be: 'values' or 'labels' or '' (empty)

    chart.sort = { sortBy: "", order: "descending", series: "ascending" };

    chart.setPositionPercent = function (left, top, width, height) {
      function getParentWidth() {
        if (self.innerHeight) return self.innerWidth;
        else if (
          document.documentElement &&
          document.documentElement.clientHeight
        )
          return document.documentElement.clientWidth;
        else if (document.body) return document.body.clientWidth;
        else return 0;
      }

      function getParentHeight() {
        if (self.innerHeight) return self.innerHeight;
        else if (
          document.documentElement &&
          document.documentElement.clientHeight
        )
          return document.documentElement.clientHeight;
        else if (document.body) return document.body.clientHeight;
        else return 0;
      }

      const h = getParentHeight(),
        w = getParentWidth(),
        c = this.canvas,
        x = left * w * 0.01,
        y = top * h * 0.01;

      width *= w * 0.01;
      height *= h * 0.01;

      width = width | 0;
      height = height | 0;

      c.style.position = "absolute";
      c.style.left = x + "px";
      c.style.top = y + "px";
      c.style.width = width + "px";
      c.style.height = height + "px";

      c.setAttribute("width", width);
      c.setAttribute("height", height);

      this.bounds.width = width;
      this.bounds.height = height;
      this.draw();
    };

    if (SeriesAnimation) {
      const anim = (chart.animation = new SeriesAnimation(chart));
      anim.kind = "zoomin";
      anim.duration = 300;

      const fade = new FadeAnimation(chart);
      fade.fade.series = true;
      anim.items.push(fade);
    }

    return chart;
  }
}

/**
 * @constructor
 * @class Class to represent dimension data suitable to measure.
 * @param {Dimension} dimension The parent dimension that owns this metric.
 * @param {String} title The string that identifies this metric.
 * @param {String} [name=""] The optional field string to obtain values to measure from dimension items.
 */
class Metric {
  constructor(dimension, title, name) {
    this.name = name;
    this.title = title || name;
    this.dimension = dimension;
    const dataset = (this.dataset = dimension.dataset);
    this.engine = dataset.engine;

    this.measure = "sum"; // average, high, low, count
  }

  initDims() {
    let t;
    const l = this.engine.datasets.length;
    let tt;
    let d;
    let ld;
    let dd;
    const dim = this.dimension;

    this.allDims = [];

    for (t = 0; t < l; t++) {
      d = this.engine.datasets[t].dimensions;
      ld = d.length;

      for (tt = 0; tt < ld; tt++) {
        dd = d[tt];

        if (dim != dd)
          if (!dim.hasParent(dd)) {
            if (dd.anySelected()) {
              if (dd.dataset == dim.dataset) dd._link = null;
              else dd._link = dim.getLinksTo(dd);

              this.allDims.push(dd);
            }
          }
      }
    }
  }

  consider(data) {
    let t; //, d2;
    const li = this.allDims.length;
    let d;
    let f;

    for (t = 0; t < li; t++) {
      d = this.allDims[t];

      if (d._link) {
        f = data; //d.id ? data[id] : data;

        for (let links = 0; links < d._link.length; links++) {
          f = d.search(d._link[links], f);
        }

        if (f && d.id) f = f[d.id];
      } else f = data[d.field];

      //if (!f) return false;

      if (typeof f === "undefined" || f === null) return false;

      if (d.datetime) f = d.datePart(f);

      if (!d.inSelected(f)) return false;
    }

    return true;
  }
}

/**
 * @constructor
 * @class Class to represent a Dimension of data.
 * @param {String} title The string identifier for this dimension.
 * @param {String} field The field string to obtain dimension child items.
 * @param {String} [id=""] The optional field string to obtain unique identifiers for dimension child items.
 */
class Dimension {
  constructor(title, field, id) {
    this.dataset = null;
    this.parent = null;

    this.engine = null;

    this.subDimensions = [];

    this.field = field;
    this.id = id;
    this.title = title || field;

    this.nulls = true;

    this.hasID = typeof id !== "undefined" && id !== null && id !== "";

    this.metrics = [];
    this.links = [];

    this.selected = null;
    this.select = null;
    this.selectedInclude = true;

    this.dateKeys = {
      c: "Century",
      x: "Decade",
      y: "Year",
      m: "Month",
      w: "Weekday",
      d: "Day",
    };
  }

  /**
   * @returns {Dimension} Creates and returns a new child dimension.
   * @param {String} title The string identifier for this dimension.
   * @param {String} field The field string to obtain dimension child items.
   * @param {String} [id=""] The optional field string to obtain unique identifiers for dimension child items.
   */
  addDimension(title, field, id) {
    return this.addSubDimension(this, title, field, id);
  }

  addSubDimension(parent, title, field, id) {
    const d = new Dimension(title, field, id);

    d.engine = this.engine;
    d.parent = parent;

    if (parent) {
      d.dataset = parent.dataset;

      if (d.dataset) d.index = d.dataset.dimensions.push(d);

      parent.subDimensions.push(d);
    }

    return d;
  }

  /**
   * @returns {Metric} Creates and returns a new metric for this dimension.
   * @param {String} title The string identifier for this metric.
   * @param {String} name The field string to obtain metric values from parent dimension items.
   * @param {String} [measure="sum"] The optional measure style for this metric.
   */
  addMetric(title, name, measure) {
    const r = new Metric(this, title, name);

    if (measure) r.measure = measure;

    this.metrics.push(r);
    return r;
  }

  /**
  * @returns {object} Creates and returns a new link object that knows how to get
    from this origin dimension to destination {dimension} parameter.
  * @param {String|Array} field The string field(s) identifier(s) for this origin dimension.
  * @param {Dimension} dimension The destination dimension.
  * @param {String|Array} datasetField The string field(s) identifier(s) for the destination dimension.
  */
  addLink(field, dimension, datasetField) {
    const l = {
      field: field,
      dimension: dimension,
      datasetField: datasetField,
      parent: this,
    };
    this.links.push(l);
    return l;
  }

  /**
   * @returns {boolean} Returns true when this dimension has {dimension} parameter as parent in the hierarchy.
   * @param {Dimension} dimension The dimension to test as parent.
   */
  hasParent(dimension) {
    let d = this.parent;
    while (d)
      if (d == dimension) return true;
      else d = d.parent;

    return false;
  }

  /**
   * @returns {boolean} Returns true when data is a value of the current selected filter.
   * @param {object} data The value to check for.
   */
  inSelected(data) {
    //if (this.datetime) data=this.datePart(data);

    if (this.select) return this.select(data);
    else if (this.selected instanceof Array)
      //for (var tt=0; tt<this.selected.length; tt++)
      //  if (this.selected[tt]==data)
      //      return true;
      return this.selectedInclude
        ? this.selected.indexOf(data) != -1
        : this.selected.indexOf(data) == -1;
    else
      return this.selectedInclude
        ? this.selected == data
        : this.selected != data;
  }

  /**
   * @returns {object} Search for an item with {id} as identifier and return it.
   * @param {object} id The identifier value to search for.
   */
  get(id) {
    const t = this.id;
    let data;
    const date = this.datetime;
    const _this = this;

    this.traverse(function (o) {
      if (date) o = _this.datePart(o);

      if (id == (t ? o[t] : o)) {
        data = o;
        return false;
      } else return true;
    });

    return data;
  }

  trunc(value) {
    return value | 0;
  }

  /**
   * @returns {Number} Returns the currently selected part of {date} parameter.
   * @param {Date} date The Date value.
   */
  datePart(date) {
    const da = this.datetime,
      s = da.selected;

    if (typeof date == "string") {
      const parts = date.match(/(\d+)/g);

      if (s == "y") return parts[da.yearField || 2];
      else if (s == "m") return parts[da.monthField || 0];
      else if (s == "x") return 10 * trunc(parseInt(parts[2], 10) / 10);
      else if (s == "d") return parts[da.dayField || 1];
      else if (s == "w") return new Date(date).getDay();
    } else if (date instanceof Date) {
      if (s == "y") return date.getFullYear();
      else if (s == "m") return date.getMonth() + 1;
      else if (s == "x") return 10 * trunc(date.getFullYear() / 10);
      else if (s == "d") return date.getDate();
      else if (s == "w") return date.getDay();
    }

    return date;
  }

  // Traverse dataset and return all object values for this Dimension:
  getValues() {
    const r = [],
      f = this.field,
      id = this.id,
      _this = this;

    this.traverse(function (value) {
      if (id) value = f ? value[f] : value[id];

      if (_this.datetime) value = _this.datePart(value);

      if (r.indexOf(value) == -1) r.push(value);
      return true;
    });

    return r;
  }

  // Traverse dataset and return all unique "id" values for this Dimension:
  getIds() {
    const r = [];
    let f;

    const //d = this.dataset.object,
      //i=d.length, t,

      id = this.id;

    const field = this.field;
    const _this = this;
    const p = this.parent ? this.parent : this;

    p.traverse(function (value) {
      f = id ? value[id] : field ? value[field] : value;
      if (_this.datetime) f = _this.datePart(f);

      if (_this.nulls || f) if (r.indexOf(f) == -1) r.push(f);

      return true;
    });

    return r;
  }

  /**
   * @returns {boolean} Returns true when {data} parameter is in the currently selected list.
   * @param {object} data The value to search.
   */
  isSelected(data) {
    if (this.select) return this.select(data);
    else if (this.selected) return this.inSelected(data);
    else return true;
  }

  /**
   * @returns {boolean} Returns true when selected filter is not empty.
   */
  anySelected() {
    if (this.select) return true;
    else {
      const s = this.selected;

      if (s !== null && typeof s != "undefined")
        if (s instanceof Array)
          for (let t = 0; t < s.length; t++) {
            if (s[t]) return true;
          }
        else return true;

      return false;
    }
  }

  /**
   * Selects or unselects a given series index point value.
   * @param {Series} series The series to toggle its index point format.
   */
  toggleSelected(series, index) {
    if (!this.selected) this.selected = [];

    const code = series.data.code[index];

    //if (this.id) code=code[this.id];

    const i = this.selected.indexOf(code);

    if (i === -1) this.selected.push(code);
    else {
      this.selected.splice(i, 1);
      if (this.selected.length === 0) this.selected = null;
    }

    series.chart.setSeriesPalette(series, this);
  }

  /**
   * Traverses all items belonging to this dimension and calls the process function for each item.
   * @param {function} process The function that will get called for each item in the dimension.
   */
  traverse(process) {
    function traverseLevel(dataset, levelIndex) {
      function doProcess(da2, t2) {
        let tt, o3, kk;

        if (da2 && typeof da2 === "object") {
          // Traverse all "da2" object properties:
          // { A:123, B:456, C:789, D:....  }

          const k = Object.keys(da2),
            kl = k.length,
            lev2 = levels[0],
            hasSelected2 = lev2.anySelected();

          for (tt = 0; tt < kl; tt++) {
            kk = k[tt];

            if (!hasSelected2 || lev2.isSelected(kk)) {
              o3 = da2[kk];
              lev2.data = o3;

              if (!process(o3, kk)) return false;
            }
          }

          return true;
        } else return process(da2, t2);
      }

      let t;
      let ml;
      const lev = levels[levelIndex];
      const hasSelected = lev.anySelected();
      const da = lev.field ? dataset[lev.field] : dataset;
      const daSel = lev.parent ? dataset : da;

      if (!hasSelected || lev.isSelected(lev.id ? daSel[lev.id] : daSel)) {
        lev.data = daSel;

        if (da instanceof Array) {
          ml = da.length;

          if (levelIndex > 0)
            for (t = 0; t < ml; t++) {
              if (!traverseLevel(da[t], levelIndex - 1)) return false;
            }
          else
            for (t = 0; t < ml; t++) {
              if (!process(da[t], t)) return false;
            }
        } else if (levelIndex > 0) {
          if (!doProcess(da)) return false;
        } else if (!process(daSel)) return false;
      }

      return true;
    }

    var levels = [];
    let di = this;

    do {
      levels.push(di);
    } while ((di = di.parent));

    const o = this.dataset.object;
    if (o) traverseLevel(o, levels.length - 1);
  }

  searchAcross(lin, o) {
    let f = o,
      tmp = this;

    for (let links = 0; links < lin.length; links++) {
      f = tmp.search(lin[links], f, links > 0);

      if (links < lin.length - 1) {
        tmp = lin[links + 1].parent;
        lin[links + 1].searchDimension = tmp;
      }
    }

    if (f && this.engine.cache) {
      if (!o.cache) o.cache = [];

      if (!o.cache[this.index]) o.cache[this.index] = f;
    }

    return f;
  }

  search(link, data, inverted) {
    if (data.cache && data.cache[this.index]) return data.cache[this.index];

    let // _this=this,
      f = null;

    let values;
    let ld;
    let t;
    const linkSearch = link.search;
    const linkField = inverted ? link.field : link.datasetField;
    const linkValues = inverted ? link.datasetField : link.field;
    const isArray = linkValues instanceof Array;

    if (isArray) {
      values = [];

      for (t = 0; t < linkValues.length; t++) values.push(data[linkValues[t]]);
    } else values = data[linkValues];

    ld = link.searchDimension || link.dimension;

    do {
      ld.traverse(function (o) {
        if (linkSearch) {
          if (linkSearch(o, data)) {
            f = o;
            return false;
          }
        } else if (isArray) {
          let result = true;

          for (t = 0; t < values.length; t++) {
            if (o[linkField[t]] !== values[t]) {
              result = false;
              break;
            }
          }

          if (result) {
            f = o;
            return false;
          }
        } else if (o[linkField] == values) {
          f = o;
          return false;
        }

        return true;
      });

      if (!f) break;
      else if (ld.dataset !== this.dataset) return f;
      else if (ld !== this) {
        if (ld.parent) {
          ld = ld.parent;
          f = ld.data;
        } else break;
      }
    } while (ld !== this);

    return f ? (this.id ? f : f[this.field]) : null;
  }

  getLinksTo(dimension) {
    if (
      !dimension ||
      dimension == this.dataset ||
      dimension.dataset == this.dataset
    )
      return [
        { field: null, dimension: dimension, datasetField: null, parent: this },
      ];
    else {
      const res = [];
      let d = findLinkInDimension(dimension, this, res);

      if (!d) d = findLinkInDimension(this, dimension, res);

      return d ? res : null;
    }
  }
}

function findLinkInDimension(needle, haystack, res) {
  let d,
    t,
    _this = haystack,
    li,
    lil,
    need,
    r;

  do {
    li = _this.links;

    if (li) {
      lil = li.length;
      for (t = 0; t < lil; t++) {
        d = li[t].dimension;
        do {
          need = needle;

          do {
            if (d == need) {
              li[t].searchDimension = li[t].dimension;
              res.push(li[t]);
              return li[t];
            }
          } while ((need = need.parent));

          r = findLinkInDimension(needle, d, res);

          if (r) {
            res.unshift(li[t]);
            return r;
          } else {
            r = findLinkInDimension(d, needle, res);
            if (r) {
              res.unshift(li[t]);
              return r;
            }
          }
        } while ((d = d.parent));
      }
    }
  } while ((_this = _this.parent));

  li = haystack.subDimensions;

  for (t = 0; t < li.length; t++) {
    r = findLinkInDimension(needle, li[t], res);
    if (r) return r;
  }

  return null;
}

export { Data, Dimension, Metric };
