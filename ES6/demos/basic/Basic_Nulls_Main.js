import { Chart } from '../../src/teechart.js';
import { Line } from '../../src/teechart.js';
import { Demo } from '../demo.js';

let series1 = document.getElementById('series1');
let series2 = document.getElementById('series2');
let inv = document.getElementById('inv');
let legend = document.getElementById('legend');
let gradient1 = document.getElementById('gradient1');
let legendshadow = document.getElementById('legendshadow');
let skipNulls = document.getElementById('skipNulls');

let chart1=new Chart("canvas");

// Add two line series:
chart1.addSeries(new Line([5,3,2,null,7,1]) );
chart1.addSeries(new Line([4,4,8,2,9]) ).visible=true;

chart1.series.items[0].format.stroke.size=3;

chart1.axes.left.format.stroke.fill="red";

chart1.title.text="TeeChart for JavaScript";
chart1.title.format.font.style="18px Verdana";

chart1.series.items[0].title="Blue";
chart1.series.items[1].title="Orange";

Demo.changeTheme(chart1, "minimal");
chart1.draw();

function doClickSeries(chart, index) {
    chart.series.items[index].visible= !chart.series.items[index].visible; chart.draw();
}

legendshadow.onclick = () => {
    chart1.legend.format.shadow.visible= !chart1.legend.format.shadow.visible; 
    chart1.draw();
}

series1.onclick = () => {
    doClickSeries(chart1, 0);
}

series2.onclick = () => {
    doClickSeries(chart1, 1);
}

inv.onclick = () => {
    chart1.axes.left.inverted= !chart1.axes.left.inverted; 
    chart1.draw();
}

legend.onclick = () => {
    chart1.legend.visible= !chart1.legend.visible; 
    chart1.draw();
}

gradient1.onclick = () => {
    chart1.panel.format.gradient.visible=gradient1.checked; 
    chart1.draw();
}

skipNulls.onclick = () => {
    var skip=skipNulls.checked ? 'skip' : 'dontPaint'; 
    chart1.series.items[0].treatNulls=skip; 
    chart1.series.items[1].treatNulls=skip; 
    chart1.draw();
}