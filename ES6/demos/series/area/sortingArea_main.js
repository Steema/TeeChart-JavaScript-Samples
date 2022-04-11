import { Chart, Annotation, Area, SeriesAnimation, ToolTip } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');
let sortvalues = document.getElementById('sortvalues');
let ascending = document.getElementById('ascending');

var a1;
var enableCursor = false;
var animation

let chart1 = new Chart("canvas");

chart1.panel.margins.top = 12;

//can add your own colour scheme in here, ie. the colours taken by Series added to the Chart in
//palette order  ..eg.
/*chart1.palette.colors=[ "#FF9999","#663399","#CCFFFF","#FFFFCC","#660066","#8080FF","#CC6600",
"#FFCCCC","#800000","#FF00FF","#00FFFF","#FFFF00","#800080","#000080","#808000","#FF0000",
"#FFCC00","#FFFFCC","#CCFFCC","#00FFFF","#FFCC99","#CC99FF"];*/

//add series and data
var area1 = new Area();
area1.title = "Value";

area1.format.fill = "rgba(199,75,0)";

var range1 = 20;
area1.data.values[0] = Math.random() * range1 + 5;
area1.data.labels[0] = "A";

for (var t = 1; t < 26; t++) {
    var av1 = area1.data.values[t - 1] + (Math.random() * range1) - (range1 * 0.5);

    if (av1 < 0) av1 = av1 * -1; if (av1 > 100) av1 = av1 - 20;
    area1.data.values[t] = av1
    area1.data.labels[t] = String.fromCharCode(65 + t);
}

chart1.addSeries(area1); //.pointer.visible=true;
//config some series appearance characteristics
chart1.series.items[0].format.stroke.fill = chart1.series.items[0].format.fill;
chart1.series.items[0].format.stroke.size = 2;
chart1.series.items[0].format.shadow.visible = false;
chart1.series.items[0].format.transparency = 0.12;
chart1.series.items[0].smooth = 0.1;
chart1.series.items[0].hover = false;


//Axes
chart1.axes.left.title.text = "$ 000s";
chart1.axes.left.title.visible = false;
chart1.axes.left.labels.roundFirst = true;
chart1.axes.bottom.labels.roundFirst = true;
chart1.axes.bottom.title.text = "Labels";
chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
chart1.axes.bottom.title.format.font.setSize(14);
chart1.axes.bottom.labels.dateFormat = "mm/yy";
chart1.axes.left.increment = 20;
chart1.axes.left.setMinMax(0, 50);
chart1.axes.left.grid.format.stroke.size = 1;
chart1.axes.left.ticks.visible = false;
chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
chart1.axes.bottom.format.stroke.size = 1;

//Title
chart1.title.visible = false;

//Legend
//chart1.legend.position="left";

// annotation (alternative title)
a1 = new Annotation(chart1);
a1.format.fill = "rgba(0,0,0,0.0)";
a1.format.stroke.fill = "rgba(0,0,0,0.0)";
a1.format.font.style = "20px Tahoma";
a1.format.font.fill = "rgba(0,0,0,0.6)";
a1.text = "Sorting area";

chart1.draw();  //get positions
a1.position.x = chart1.axes.bottom.calc(chart1.axes.bottom.minimum);
a1.position.y = 8;
chart1.tools.add(a1);

//tooltip
let tip = new ToolTip(chart1);
tip.render = "dom";
tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

tip.pointer.visible = true;
tip.pointer.fill = "rgb(30,80,100)";
tip.pointer.firstCircleRadius = 3;
tip.pointer.secondCircleRadius = 7;
tip.pointer.firstCircleOpacity = 1;
tip.pointer.secondCircleOpacity = 0.5;
tip.pointer.animationVisible = true;
tip.pointer.animationDuration = 500;
chart1.tools.add(tip);

//tip.onhide = function () { 0; -1; }

/*tip.onshow = function (tool, series, index) {
    if (enableCursor == false) {
        chart1.tools.add(t);
        enableCursor = true;
        chart1.draw();
    }
}*/

tip.ongettext = function (tool, text, series, index) {
    var t, s = "", ser;

    for (t = 0; t < chart1.series.count(); t++) {
        if (t > 0) s += "<br/>";
        ser = chart1.series.items[t];
        s += '<font face="verdana" color="darkorange" size="1"><b>' + ser.title + ':</b></font> <font face="verdana" color="red" size="1">' + ser.data.values[index].toFixed(2) + '</font>';
    }
    return s;
}
//top.changePalette(top.topPalette);

//animation
animation = new SeriesAnimation();
animation.duration = 1700;
animation.kind = "all";
animation.mode = "linear";

animation.animate(chart1);


sortvalues.onclick = () => {
    if(!animation.running) chart1.series.items[0].drawSortedValues(!sortvalues.checked);
}


ascending.onclick = () => {
    if(!animation.running) {
        chart1.series.items[0].sortedOptions.ascending = ascending.checked; 
    }
    
}

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}