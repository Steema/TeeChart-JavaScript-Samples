import { Chart, Area, Bar, Line } from '../../src/teechart.js';
import { Demo } from '../demo.js';

var Chart1;

let horizAxis = document.getElementById('horizAxis');
let vertAxis = document.getElementById('vertAxis');

let dash = document.getElementById('dash');
let ticks = document.getElementById('ticks');
let minor = document.getElementById('minor');
let inner = document.getElementById('inner');
let labels = document.getElementById('labels');
let grids = document.getElementById('grids');
let alter = document.getElementById('alter');
let invert = document.getElementById('invert');
let allvisible = document.getElementById('allvisible');
let title = document.getElementById('title');
let rotatedTitle = document.getElementById('rotatedTitle');
let roundFirst = document.getElementById('roundFirst');

draw();
 
function draw() {
  Chart1=new Chart("canvas");
  
  Chart1.addSeries(new Area([2,9,6,5,8,1,7,0,2,4,5]));
  Chart1.addSeries(new Bar([7,5,1,3,4,9,2,6,5,1,0]));
  Chart1.addSeries(new Line([3,2,9,1,0,7,3,8,4,5,6]));
  
  Chart1.series.items[0].format.stroke.size=0.5;
  Chart1.series.items[1].format.stroke.size=0.5;
  Chart1.series.items[2].format.stroke.size=0.5;

  Chart1.series.items[1].colorEach=false;
  Chart1.series.items[1].marks.visible=false;

  setHoriz("both");
  setVert("both");

  Chart1.panel.format.gradient.colors = ["beige","orange"];
  Chart1.panel.format.gradient.direction="bottomtop";

  Chart1.panel.format.stroke.fill="";

  Chart1.title.visible=false;

  Chart1.axes.left.minorTicks.visible=true;
  Chart1.axes.top.minorTicks.visible=true;
  Chart1.axes.right.minorTicks.visible=true;
  Chart1.axes.bottom.minorTicks.visible=true;

  Chart1.axes.left.innerTicks.visible=true;
  Chart1.axes.top.innerTicks.visible=true;
  Chart1.axes.right.innerTicks.visible=true;
  Chart1.axes.bottom.innerTicks.visible=true;

  Chart1.axes.left.title.text="Left Axis";
  Chart1.axes.top.title.text="Top Axis";
  Chart1.axes.right.title.text="Right Axis";
  Chart1.axes.bottom.title.text="Bottom Axis";
  
  Demo.changeTheme(Chart1, "minimal");

  Chart1.draw();
}


horizAxis.onchange = () => {
  setHoriz(horizAxis.value);
  Chart1.draw();  
}

vertAxis.onchange = () => {
  setVert(horizAxis.value);
  Chart1.draw();
}

function setHoriz(value) {
  Chart1.series.items[0].horizAxis=value;
  Chart1.series.items[1].horizAxis=value;
  Chart1.series.items[2].horizAxis=value;
}

function setVert(value) {
  Chart1.series.items[0].vertAxis=value;
  Chart1.series.items[1].vertAxis=value;
  Chart1.series.items[2].vertAxis=value;
}

dash.onchange = () => {
    Chart1.axes.each(function() {
    this.grid.format.stroke.dash=dash.checked ? [5,10] : null;
  });
  Chart1.draw();
}

ticks.onchange = () => {	
  let value = ticks.checked;
  Chart1.axes.left.ticks.visible=value;
  Chart1.axes.top.ticks.visible=value;
  Chart1.axes.right.ticks.visible=value;
  Chart1.axes.bottom.ticks.visible=value;
  
  Chart1.draw();
}

minor.onchange = () => {	
  let value = minor.checked;
  Chart1.axes.left.minorTicks.visible=value;
  Chart1.axes.top.minorTicks.visible=value;
  Chart1.axes.right.minorTicks.visible=value;
  Chart1.axes.bottom.minorTicks.visible=value;
  
  Chart1.draw();
}

inner.onchange = () => {	
  let value = inner.checked;
  Chart1.axes.left.innerTicks.visible=value;
  Chart1.axes.top.innerTicks.visible=value;
  Chart1.axes.right.innerTicks.visible=value;
  Chart1.axes.bottom.innerTicks.visible=value;
  
  Chart1.draw();
}

labels.onchange = () => {	
  let value = labels.checked;
  Chart1.axes.left.labels.visible=value;
  Chart1.axes.top.labels.visible=value;
  Chart1.axes.right.labels.visible=value;
  Chart1.axes.bottom.labels.visible=value;
  
  Chart1.draw();
}

alter.onchange = () => {	
  let value = alter.checked;
  Chart1.axes.left.labels.alternate=value;
  Chart1.axes.top.labels.alternate=value;
  Chart1.axes.right.labels.alternate=value;
  Chart1.axes.bottom.labels.alternate=value;
  
  Chart1.draw();
}

grids.onchange = () => {	
  let value = grids.checked;
  Chart1.axes.left.grid.visible=value;
  Chart1.axes.top.grid.visible=value;
  Chart1.axes.right.grid.visible=value;
  Chart1.axes.bottom.grid.visible=value;
  
  Chart1.draw();
}

invert.onchange = () => {	
  let value = invert.checked;
  Chart1.axes.left.inverted=value;
  Chart1.axes.top.inverted=value;
  Chart1.axes.right.inverted=value;
  Chart1.axes.bottom.inverted=value;
  
  Chart1.draw();
}

title.onchange = () => {	
  let value = title.checked;
  Chart1.axes.left.title.visible=value;
  Chart1.axes.top.title.visible=value;
  Chart1.axes.right.title.visible=value;
  Chart1.axes.bottom.title.visible=value;
  
  Chart1.draw();
}

rotatedTitle.onchange = () => {	
  let value = rotatedTitle.checked;
  Chart1.axes.left.title.rotation = value ? 0 : 90;
  Chart1.axes.top.title.rotation = value ? 90 : 0;
  Chart1.axes.right.title.rotation = value ? 0 : 270;
  Chart1.axes.bottom.title.rotation = value ? 270 : 0;
  
  Chart1.draw();
}

roundFirst.onchange = () => {	
  let value = roundFirst.checked;
  Chart1.axes.left.labels.roundFirst = value;
  Chart1.axes.top.labels.roundFirst = value;
  Chart1.axes.right.labels.roundFirst = value;
  Chart1.axes.bottom.labels.roundFirst = value;
  
  Chart1.draw();
}