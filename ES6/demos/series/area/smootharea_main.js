import { Chart, Palette, Area, DragTool } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');
let legend = document.getElementById('legend');
let series1 = document.getElementById('series1');
let series2 = document.getElementById('series2');
let gradient1 = document.getElementById('gradient1');
let shadow = document.getElementById('shadow');
let marks = document.getElementById('marks');
let clip = document.getElementById('clip');
let smooth = document.getElementById('smooth');
let stacked = document.getElementById('stacked');
let pointers = document.getElementById('pointers');

var a1, a2;
let chart1=new Chart("canvas");
a1=chart1.addSeries(new Area([7,5,1,3,4,9,2,0,3,8,11.2,7]));
a2=chart1.addSeries(new Area([3,2,8,4,1,6.1,4,3,2,5,5,8]));

a1.smooth=a2.smooth=0.5;
a1.cursor=a2.cursor="pointer";
a1.pointer.style=a2.pointer.style="ellipse";
a1.pointer.visible=a2.pointer.visible=true;

a2.format.transparency=0.5;

a1.format.image.url="../../images/metal.jpg";

chart1.title.text="Smooth Areas";
chart1.tools.add(new DragTool(chart1));

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

series2.onclick = () => {
    chart1.series.items[1].visible = series2.checked; chart1.draw();
}

series1.onclick = () => {
    chart1.series.items[0].visible = series1.checked; chart1.draw();
}

legend.onclick = () => {
    chart1.legend.visible = !chart1.legend.visible; chart1.draw();
}

stacked.onchange = () => {
    setStacked(stacked.value);
}

pointers.onclick = () => {
    chart1.series.each((s) => { s.pointer.visible = pointers.checked; }); chart1.draw();
}