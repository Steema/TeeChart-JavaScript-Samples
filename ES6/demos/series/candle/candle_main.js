import { Chart, Candle, CursorTool, ToolTip } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

const style = document.getElementById('style');

var Chart1;

draw();

style.onchange = () => {
  Chart1.series.items[0].style=style.value; 
  Chart1.draw();
}

function draw() {
  Chart1=new Chart("canvas");
  Chart1.title.text = "Candle OHLC";
  Chart1.title.format.font.fill = "black";
  var ohlc = new Candle();
  Chart1.addSeries(ohlc);
  
  var d = Chart1.series.items[0].data;
  let count = 10;
  d.values.length = count;
  d.close = d.values;
  if (d.open) d.open.length = count; else d.open = new Array(count);
  if (d.high) d.high.length = count; else d.high = new Array(count);
  if (d.low) d.low.length = count; else d.low = new Array(count);
  if (count > 0) {
      var tmp =  Math.random() * 30, o;

      for (let t = 0; t < count; t++) {
          o = d.open[t] = tmp;
          tmp = d.close[t] = tmp + (Math.random() * 30) - 15;
          d.high[t] = Math.max(o, tmp) + Math.random() * 2;
          d.low[t] = Math.min(o, tmp) - Math.random() * 2;
      }
  }
  Chart1.series.items[0].pointer.format.gradient.colors = ["LightSteelBlue"];
  Chart1.series.items[0].pointer.width = 11;
  Chart1.series.items[0].lower.fill = "tomato";
  Chart1.series.items[0].higher.fill = "LightSteelBlue";
  Chart1.walls.visible = false;
  Chart1.footer.transparent = true;
  Chart1.panel.format.shadow.visible = false;
  Chart1.panel.format.stroke.fill = "";
  Chart1.panel.format.round.x = 0;
  Chart1.panel.format.round.y = 0;
  Chart1.panel.format.gradient.visible = false;
  Chart1.panel.format.fill = "#FFF";
  Chart1.axes.left.format.stroke.size = 0.5;
  Chart1.axes.bottom.grid.visible = false;
  Chart1.axes.bottom.format.stroke.size = 0.5;
  Chart1.legend.visible = false;

  let tip = new ToolTip(Chart1);
  tip.render = "dom";
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  Chart1.tools.add(tip);

  tip.onhide = function () { scaling = 0; poindex = -1; }

  tip.onshow = function (tool, series, index) {
  }

  tip.ongettext = function (tool, text, series, index) {
      var t, s = "", ser;

      for (t = 0; t < Chart1.series.count() ; t++) {
          if (t > 0) s += "<br/>";
          ser = Chart1.series.items[t];
          s += '<font face="verdana" color="MediumSlateBlue" size="1"><b>open:</b></font> <font face="verdana" color="#CD5C5C" size="1">' + ser.data.open[index].toFixed(2) + '</font><br/>';
          s += '<font face="verdana" color="MediumSlateBlue" size="1"><b>close:</b></font> <font face="verdana" color="#CD5C5C" size="1">' + ser.data.close[index].toFixed(2) + '</font><br/>';
          s += '<font face="verdana" color="MediumSlateBlue" size="1"><b>lowest:</b></font> <font face="verdana" color="#CD5C5C" size="1">' + ser.data.low[index].toFixed(2) + '</font><br/>';
          s += '<font face="verdana" color="MediumSlateBlue" size="1"><b>highest:</b></font> <font face="verdana" color="#CD5C5C" size="1">' + ser.data.high[index].toFixed(2) + '</font>';
      }
      return s;
  }

  let tc = new CursorTool(Chart1);
  tc.direction = "both";
  Chart1.tools.add(tc);

  Chart1.draw();
}