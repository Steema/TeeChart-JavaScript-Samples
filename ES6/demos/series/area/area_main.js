import { Chart, Palette, Area } from '../../../src/teechart.js'
import { Demo } from '../../demo.js';
import { DateFormat } from '../../../src/date.format.js';

let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');
let legend = document.getElementById('legend');
let series1 = document.getElementById('series1');
let series2 = document.getElementById('series2');
let stacked = document.getElementById('stacked');
let gradient1 = document.getElementById('gradient1');
let shadow = document.getElementById('shadow');
let marks = document.getElementById('marks');
let clip = document.getElementById('clip');
let pointers = document.getElementById('pointers');
let stairs = document.getElementById('stairs');
let smooth = document.getElementById('smooth');

let chart1 = new Chart("canvas");
chart1.addSeries(new Area([7, 5, 1, 3, 4, 9, 2, 0, 3, 8, 11.2, 7]));
chart1.addSeries(new Area([3, 2, 8, 4, 1, 6.1, 4, 3, 2, 5, 5, 8]));

chart1.series.items[0].format.stroke.size = 0.75;
chart1.series.items[1].format.stroke.size = 0.75;

chart1.series.items[0].data.x = new Array(chart1.series.items[0].count());
chart1.series.items[1].data.x = new Array(chart1.series.items[0].count());

var msecsInADay = 86400000; //24*60*60*1000 
var now = new Date(), tmp;

for (var t = 0; t < chart1.series.items[0].count(); t++) {
    //tmp=new Date(now.getTime() + t * msecsInADay); //don't format as date when adding data
    tmp = now.getTime() + t * msecsInADay;  //add as double
    chart1.series.items[0].data.x[t] = chart1.series.items[1].data.x[t] = tmp;
}

chart1.panel.format.gradient.colors = ["beige", "orange"];
chart1.panel.format.gradient.direction = "bottomtop";

chart1.panel.format.stroke.fill = "";

chart1.title.text = "Area";
chart1.title.format.font.style = "48px Verdana";
//chart1.title.format.font.shadow.visible=true;
chart1.title.format.font.gradient.visible = true;
chart1.title.format.font.gradient.colors = ["gray", "white"];
//chart1.title.format.font.stroke.fill="gray";


chart1.axes.bottom.labels.ongetlabel = function (value, s) {
    //return '3'; // dateFormat(new Date(value), "dd/mm/yy, h:MM:ss");;
    if (chart1.axes.bottom.range < 500)
        return DateFormat.dateFormat(new Date(value), "dd/mm/yy, h:MM:ss");
    else
        return DateFormat.dateFormat(new Date(value), "dd/mm/yy");
}

Demo.changeTheme(chart1, "minimal");
chart1.draw();

function setStacked(value) {
    chart1.series.items[0].stacked = value;
    chart1.series.items[1].stacked = chart1.series.items[0].stacked;
    Demo.changeTheme(chart1, "minimal");
    chart1.draw();
}

function setGradients(visible) {
    chart1.series.items[0].format.gradient.visible = visible;
    chart1.series.items[1].format.gradient.visible = visible;

    chart1.series.items[1].format.gradient.colors = Palette.RainbowPalette();

    Demo.changeTheme(chart1, "minimal");
    chart1.draw();
}

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}

smooth.onclick = () => {
    chart1.series.each((s) => { s.smooth = smooth.checked ? 0.5 : 0; }); chart1.draw();
}

stairs.onclick = () => {
    chart1.series.each((s) => { s.stairs = stairs.checked; }); chart1.draw();
}

pointers.onclick = () => {
    chart1.series.each((s) => { s.pointer.visible = pointers.checked; }); chart1.draw();
}

clip.onclick = () => {
    chart1.aspect.clip = clip.checked; chart1.draw();
}

marks.onclick = () => {
    chart1.series.items[0].marks.visible = marks.checked; chart1.draw();
}

shadow.onclick = () => {
    chart1.series.items[0].format.shadow.visible = shadow.checked; chart1.draw();
}


gradient1.onclick = () => {
    setGradients(gradient1.checked);
}

stacked.onchange = () => {
    setStacked(stacked.value);
}

series2.onclick = () => {
    chart1.series.items[1].visible = series2.checked; chart1.draw();
}

series1.onclick = () => {
    chart1.series.items[0].visible = series1.checked; chart1.draw();
}

legend.onclick = () => {
    chart1.legend.visible = !chart1.legend.visible; chart1.draw();
}