import { Chart, Palette, HorizArea } from '../../../src/teechart.js';
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

var chart1 = new Chart("canvas");
chart1.addSeries(new HorizArea([7, 5, 1, 3, 4, 6, 2, 3, 3, 8, 4, 7]));
chart1.addSeries(new HorizArea([3, 2, 8, 4, 1, 6, 4, 3, 2, 5, 5, 8]));

chart1.panel.format.gradient.colors = ["beige", "orange"];
chart1.panel.format.gradient.direction = "bottomtop";

chart1.panel.format.stroke.fill = "";

chart1.title.text = "Horizontal\nAreas";

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