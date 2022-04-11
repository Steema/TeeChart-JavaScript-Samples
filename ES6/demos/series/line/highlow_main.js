import { Chart } from '../../../src/teechart.js';
import { Line } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';
import { ToolTip } from '../../../src/teechart.js';
import { SeriesAnimation } from '../../../src/teechart.js';

let showHide1 = document.getElementById('showHide1');

let chart1 = new Chart("canvas");

chart1.panel.margins.top = 12;

//add series and data
var line1 = new Line();
line1.title = "Actual";

var line2 = new Line();
line2.title = "Avg (10yr)";

//some random values

var range1 = 30;
var range2 = 5;
var av1;
var av2;
var inc;
line2.data.values[0] = Math.random() * range1 - 10;
line1.data.values[0] = line2.data.values[0] + Math.random() * range2 + 5;

var av1 = line2.data.values[0];

var today = new Date().getTime();
var msecsInADay = 86400000;
today = today - 150 * msecsInADay;

line1.data.x = [];
line2.data.x = [];

for (var t = 0; t < 100; t++) {
    inc = (Math.random() * range1 - 15) % 6;
    if ((av1 + inc > range1 - 10) || (av1 + inc < -10)) av1 = av1 - inc;
    else av1 = av1 + inc;

    av2 = av1 + Math.random() * range1 - 10;
    line2.data.values[t] = av1;
    line1.data.values[t] = av2;

    line1.data.x[t] = new Date(today + t * msecsInADay);
    line2.data.x[t] = line1.data.x[t]; //new Date(today + t * msecsInADay);
}

chart1.addSeries(line1);
chart1.addSeries(line2);

//config some series appearance characteristics
for (var i = 0; i < 2; i++) {
    chart1.series.items[i].format.stroke.fill = "rgba(20,20,20,0.8)";
    if (i == 0)
        chart1.series.items[i].format.stroke.size = 3;
    else
        chart1.series.items[i].format.stroke.size = 1;
    chart1.series.items[i].format.shadow.visible = false;
    chart1.series.items[i].hover = false;
}

//Axes
chart1.legend.visible = false;
chart1.axes.bottom.title.text = "days";
chart1.axes.bottom.title.format.font.fill = "rgba(255,65,0,0.6)";
chart1.axes.bottom.title.format.font.setSize(14);
chart1.axes.bottom.labels.dateFormat = "dd/mm/yy";
chart1.axes.bottom.format.stroke.size = 1;
chart1.axes.bottom.grid.visible = true;
chart1.axes.left.title.text = "ºC Temp range";
chart1.axes.left.title.format.font.fill = "rgba(255,32,0,0.6)";
chart1.axes.left.title.format.font.setSize(14);
chart1.axes.left.title.visible = true;
chart1.axes.left.labels.roundFirst = true;
chart1.axes.left.increment = 5;
chart1.axes.left.setMinMax(-20, 40);
chart1.axes.left.grid.format.stroke.size = 0.5;
chart1.axes.left.ticks.visible = false;
chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
chart1.axes.left.grid.visible = true;

//Panel transparent
chart1.walls.visible = false;
chart1.panel.format.shadow.visible = false;
chart1.panel.format.stroke.fill = "";
chart1.panel.format.round.x = 0;
chart1.panel.format.round.y = 0;
chart1.panel.format.gradient.visible = false;
chart1.panel.format.fill = "white";
//Title
chart1.title.visible = false;

//tooltip
let tip = new ToolTip(chart1);
tip.render = "dom";
tip.autoHide = true;
tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

chart1.tools.add(tip);

tip.onhide = () => { tip.scaling = 0; tip.poindex = -1; }

tip.ongettext = function (tool, text, series, index) {

    var t, s = "", ser0, ser1;
    var tColor = "#444444";
    var hColor = "red"; //"#C28810";
    var lColor = "blue"; //"#4E97A8";
    var c1, c2;
    ser0 = chart1.series.items[0];
    ser1 = chart1.series.items[1];

    if (ser0.data.values[index] != undefined) {
        if (ser0.data.values[index] > ser1.data.values[index]) {
            c1 = hColor;
            c2 = lColor;
        }
        else if (ser0.data.values[index] < ser1.data.values[index]) {
            c1 = lColor;
            c2 = hColor;
        }
        else {
            c1 = hColor;
            c2 = hColor;
        }

        s += '<font face="verdana" color="' + tColor + '" size="1"><b>' + ser0.title + ':</b></font> <font face="verdana" color="' + c1 + '" size="1">' + ser0.data.values[index].toFixed(1) + 'ºC </font>';
        s += "<br/>";
        s += '<font face="verdana" color="' + tColor + '" size="1"><b>' + ser1.title + ':</b></font> <font face="verdana" color="' + c2 + '" size="1">' + ser1.data.values[index].toFixed(1) + 'ºC </font>';
    }
    return s;
}

let animation=new SeriesAnimation();
animation.duration=1700;
animation.kind="all";
animation.mode = "linear"; 
animation.animate(chart1);

chart1.ondraw = function () {

    chart1.ctx.save();
    chart1.aspect.clipRect(chart1.chartRect);

    var xMin = Math.trunc(this.axes.bottom.calc(this.axes.bottom.minimum));
    var xMax = Math.round(this.axes.bottom.calc(this.axes.bottom.maximum));

    for (var j = xMin; j < xMax; j++) {
        var xs = j;

        var sY1 = 0;
        var sY2 = 0;

        for (var i = 0; i < this.series.items.length; i++) {
            var ys = this.axes.left.calc(interpolateLineSeries(this.series.items[i], this.axes.bottom.fromPos(j)));
            if (i == 0)
                sY1 = ys;
            else
                sY2 = ys;
        }

        if ((this.axes.bottom.fromPos(j) > this.series.items[0].data.x[0]) //limit zone colouring to valid data area
            && (this.axes.bottom.fromPos(j) < this.series.items[0].data.x[this.series.items[0].count() - 1])) {
            this.ctx.beginPath();
            if (sY1 > sY2)
                this.ctx.strokeStyle = "#4E97A8"; //"#A6CAF0";
            else
                this.ctx.strokeStyle = "#F2C05D"; //"#FF8080";
            this.ctx.moveTo(j, sY1);
            this.ctx.lineTo(j, sY2);
            this.ctx.stroke();
        }
    }

    chart1.ctx.restore();
}

function interpolateLineSeries(s, xval) {
    var yValues = s.data.values;
    var len = yValues.length;
    var xValues = [];

    if (s.data.x)
        xValues = s.data.x;
    else {
        for (i = 0; i < len; i++)
            xValues[i] = i;
    }

    var index;
    for (index = 0; index < len; index++) {
        if (xValues[index] > xval)
            break;
    }

    if (index < 1)
        index = 1;
    else
        if (index >= len)
            index = len - 1;

    var dx = xValues[index] - xValues[index - 1];
    var dy = yValues[index] - yValues[index - 1];

    if (dx != 0)
        return dy * (xval - xValues[index - 1]) / dx + yValues[index - 1];
    else
        return 0;
}

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}
