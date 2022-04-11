import { Chart } from '../../../src/teechart.js';
import { Line } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let stack = document.getElementById('stack');
let stairs = document.getElementById('stairs');
let pointers = document.getElementById('pointers');
let smooth = document.getElementById('smooth');
let view3d = document.getElementById('view3d');
let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');


let chart = new Chart("canvas");
chart.addSeries(new Line([5, 9, 2, 6, 3, 7, 1, 8]));
chart.addSeries(new Line([4, 1, 7, 2, 4, 9, 3, 2]));
chart.addSeries(new Line([2, 6, 3, 0, 8, 1, 3, 5]));

chart.series.each(function (s) {
    s.stacked = "yes"; // "no", "yes", "100"
});

chart.axes.left.title.text = "Y";

chart.title.text = "Stacked Lines";
chart.title.format.font.style = "18px Verdana";

Demo.changeTheme(chart, "minimal");
chart.draw();

stack.onchange = () => {
    chart.series.each((s) => { s.stacked=stack.value; }); chart.draw();
}

stairs.onclick = () => {
    chart.series.each((s) => { s.stairs=stairs.checked; }); chart.draw();
}

pointers.onclick = () => {
    chart.series.each((s) => {s.pointer.visible = pointers.checked;}); chart.draw();
}

smooth.onclick = () => {
    chart.series.each((s) => {s.smooth = smooth.checked ? 0.5 : 0;}); chart.draw();
}

view3d.onclick = () => {
    chart.aspect.view3d=view3d.checked; chart.draw()
}

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}