import { Chart } from '../../src/teechart.js';
import { Line } from '../../src/teechart.js';
import { Demo } from '../demo.js';

let inv = document.getElementById('inv');
let legend = document.getElementById('legend');
let series1 = document.getElementById('series1');
let series2 = document.getElementById('series2');
let gradient1 = document.getElementById('gradient1');
let legendshadow = document.getElementById('legendshadow');
let coloreach = document.getElementById('coloreach');
let pointer = document.getElementById('pointer');
let wallimage = document.getElementById('wallimage');
let stairs = document.getElementById('stairs');

let chart1=new Chart("canvas");
chart1.addSeries(new Line([5,3,2,7,1,6,4,5,1,0,10]) ).format.stroke.size=4;
chart1.addSeries(new Line([4,4,8,2,9]) ).visible=false;

chart1.axes.left.format.stroke.fill="green";

chart1.axes.left.title.text="Left Axis";
chart1.axes.bottom.title.text="Bottom Axis";

chart1.title.text="TeeChart for JavaScript";
chart1.title.format.font.style="18px Verdana";

//  Chart1.walls.back.format.image.url="http://upload.wikimedia.org/wikipedia/commons/b/be/SI-Sky.JPG";
chart1.walls.back.format.image.url="../images/fromspace.jpg";

chart1.series.items[0].format.stroke.fill="darkorange";
chart1.series.items[0].pointer.visible=true;

Demo.changeTheme(chart1, "minimal");
chart1.walls.visible=true;

chart1.draw();

function doClickSeries(chart, index) {
    chart.series.items[index].visible= !chart.series.items[index].visible; chart.draw();
}

series1.onclick = () =>  {
    doClickSeries(chart1, 0);
}

series2.onclick = () =>  {
    doClickSeries(chart1, 1);
}

inv.onclick = () =>  {
    chart1.axes.left.inverted= !chart1.axes.left.inverted; 
    chart1.draw();
}

legend.onclick = () =>  {
    chart1.legend.visible= !chart1.legend.visible; 
    chart1.draw();
}

gradient1.onclick = () =>  {
    chart1.panel.format.gradient.visible=gradient1.checked; 
    chart1.draw();
}

legendshadow.onclick = () => {
    chart1.legend.format.shadow.visible= !chart1.legend.format.shadow.visible; 
    chart1.draw();
}

coloreach.onclick = () => {
    chart1.series.items[0].colorEach= coloreach.checked ? 'yes' : 'no'; 
    chart1.draw();
}

pointer.onclick = () => {
    chart1.series.items[0].pointer.visible=pointer.checked; 
    chart1.draw();
}

wallimage.onclick = () => {
    chart1.walls.back.format.image.visible= wallimage.checked; 
    chart1.draw();
}

stairs.onclick = () => {
    chart1.series.items[0].stairs=stairs.checked; 
    chart1.draw();
}