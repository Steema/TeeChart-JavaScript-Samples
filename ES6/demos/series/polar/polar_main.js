import { Chart, Polar, ToolTip } from '../../../src/teechart.js';
//import { SliderControl } from '../../../src/teechart-extras.js';
import { Demo } from '../../demo.js';

var Chart1;

let aSeries1 = document.getElementById('series1');
let aSeries2 = document.getElementById('series2');
let aMarks1 = document.getElementById('marks1');
let aMarks2 = document.getElementById('marks2');
let aFill1 = document.getElementById('fill1');
let aFill2 = document.getElementById('fill2');

aSeries1.onchange = () => {
	Chart1.series.items[0].visible = aSeries1.checked;
	Chart1.draw();
}

aSeries2.onchange = () => {
	Chart1.series.items[1].visible = aSeries2.checked;
	Chart1.draw();
}

aMarks1.onchange = () => {
	Chart1.series.items[0].marks.visible = aMarks1.checked;
	Chart1.draw();
}

aMarks2.onchange = () => {
	Chart1.series.items[1].marks.visible = aMarks2.checked;
	Chart1.draw();
}

aFill1.onchange = () => {
	Chart1.series.items[0].format.fill = aFill1.checked ? Chart1.palette.get(0) : '';
	Chart1.draw();
}

aFill2.onchange = () => {
	Chart1.series.items[1].format.fill = aFill2.checked ? Chart1.palette.get(1) : '';
	Chart1.draw();
}

loadAll();

function loadAll()
{
  //resizeSliders();
  draw();
}

window.addEventListener('resize', function(event){
  //resizeSliders();
});

function draw() {
  Chart1=new Chart("canvas");

  var polar1 = Chart1.addSeries(new Polar()),
      polar2 = Chart1.addSeries(new Polar());

  polar1.addRandom(20);
  polar2.addRandom(6);

  // optional degree (0 to 360) point positions:

  polar2.data.x=[10,30,90,110,270,300];

  polar1.pointer.style="ellipse";
  polar2.pointer.style="ellipse";

  // PENDING FEATURES:

  //polar1.stacked="yes";
  //polar2.stacked="yes";
  //polar1.smooth=0.5;

  polar1.format.transparency=0.2;
  polar2.format.transparency=0.2;
  
  // Cosmetics:

  Chart1.title.text="Polar Chart";
  Chart1.walls.back.format.gradient.visible=true;
  
  Chart1.panel.format.gradient.colors=["rgba(255,255,255,1)","rgba(255,255,255,1)"];
  Chart1.panel.format.gradient.visible=true;
  Chart1.panel.format.shadow.visible=false;
  Chart1.panel.format.stroke.fill="";
  Chart1.panel.format.round.x=0;
  Chart1.panel.format.round.y=0;  
  
  Chart1.tools.add(new ToolTip(Chart1));
  //
  Chart1.draw();

  /*addSlider("rotation1", polar1);
  addSlider("rotation2", polar2);

  addSlider("axisrotation", Chart1.axes.bottom);*/
}

function addSlider(canvas, target) {
  var s=SliderControl(canvas);

  s.min=0;
  s.max=360;
  s.position=0;
  s.thumbSize=16;

  s.chart.draw();

  s.onChanging=function(slider,value) {
    target.rotation=value;
    target.chart.draw();
  }
}

function resizeSliders(){
	var slider1 = document.getElementById("rotation1");
	var slider2 = document.getElementById("rotation2");
	var slider3 = document.getElementById("axisrotation");
	var w = window.innerWidth;
	if(w <= 710){
		slider1.style.width = "" + w*0.25 + "px";
		slider2.style.width = "" + w*0.25 + "px";
		slider3.style.width = "" + w*0.25 + "px";
	}else{
		slider1.style.width = "" + 200 + "px";
		slider2.style.width = "" + 200 + "px";
		slider3.style.width = "" + 200 + "px";
	}
}
