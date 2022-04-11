import { Chart } from '../../../src/teechart.js';
import { PointXY } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';
import { Annotation } from '../../../src/teechart.js';
import { Point } from '../../../src/teechart.js';

let legend = document.getElementById('legend');
let series1 = document.getElementById('series1');
let gradient1 = document.getElementById('gradient1');
let marks = document.getElementById('marks');
let pointer_style = document.getElementById('pointer_style');
let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');

let chart1=new Chart("canvas");

var xy=new PointXY();
xy.colorEach='yes';
xy.cursor="pointer";
xy.pointer.style="ellipse";

xy.onclick=function(series,index,x,y) {
  var xValue= series.data.x ? series.data.x[index].toFixed(0) : index.toFixed(0);

  annot.text="Clicked point: "+index+"\nX: "+xValue+"\nValue: "+series.data.values[index].toFixed(series.decimals);
  Demo.changeTheme(chart1, "minimal");
  var p = new Point();
  xy.calc(index, p);
  annot.moveTo(p.x-annot.bounds.width/2,p.y-annot.bounds.height-xy.pointer.height/2-xy.format.stroke.size);
  chart1.draw();
}

chart1.addSeries(xy).addRandom(20,1000,true);

//chart1.zoom.enabled=false;

chart1.panel.format.stroke.fill="green";
chart1.panel.format.stroke.size=5;
chart1.panel.format.stroke.join="round";
chart1.panel.format.stroke.gradient.visible=true;
chart1.panel.format.stroke.gradient.colors=["lime","green"];

chart1.panel.format.shadow.width=10;
chart1.panel.format.shadow.height=10;
chart1.panel.format.round.x=0;
chart1.panel.format.round.y=0;

chart1.series.items[0].marks.transparent=true;

chart1.series.items[0].pointer.format.gradient.visible=true;
chart1.series.items[0].pointer.format.gradient.direction="radial";

chart1.axes.left.title.text="Y";

chart1.title.text="Point XY Scatter";

chart1.title.format.font.style="24px Verdana";
chart1.title.format.font.fill="yellow";

chart1.title.expand=true;
chart1.title.format.shadow.visible=false;

chart1.title.format.font.shadow.visible=true;
chart1.title.format.font.shadow.width=0;
chart1.title.format.font.shadow.height=0;
chart1.title.format.font.shadow.color="white";
chart1.title.format.font.shadow.blur=4;

chart1.ondraw=function() {
  var c=chart1.ctx;
  c.strokeStyle="black";
  c.lineWidth=1;
}

Demo.changeTheme(chart1, "minimal");
chart1.draw();

var annot=new Annotation(chart1);
annot.position.x=15;
annot.position.y=20;
chart1.tools.add(annot);

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}

pointer_style.onchange = () => {
    chart1.series.items[0].pointer.style=pointer_style.value; 
    chart1.draw();
}

marks.onclick = () => {
    chart1.series.items[0].marks.visible= marks.checked; 
    chart1.draw();
}

gradient1.onclick = () => {
    chart1.series.items[0].pointer.format.gradient.visible= gradient1.checked; 
    chart1.draw();
}

series1.onclick = () => {
    chart1.series.items[0].visible= !chart1.series.items[0].visible; 
    chart1.draw();
}

legend.onclick = () => {
    chart1.legend.visible= !chart1.legend.visible; 
    chart1.draw();
}