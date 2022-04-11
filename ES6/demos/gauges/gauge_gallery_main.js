import { Chart, CircularGauge, Clock, Tool, Slider, CheckBox, Annotation, Format } from '../../src/teechart.js';
import { Demo } from '../demo.js';

init();

function init(){
	draw();
	resizeGauges();
	//resizeToolBars();
}

window.addEventListener('resize', function(event){
  resizeGauges();
  //resizeToolBars();
});

function draw() {
  var gauge1=gaugeTemplate(0,"canvas1");
  gauge1.units.text="Speed";
  gauge1.value=75;
  gauge1.step=5;

  var gauge2=gaugeTemplate(1,"canvas2");
  gauge2.min=-50;
  gauge2.max=50;
  gauge2.step=10;
  gauge2.center.visible = true;
  gauge2.center.top.gradient.colors = ["blue"];

  var hand=gauge2.addHand();
  hand.value=-30;
  hand.size = 2;
  hand.gradient.colors[1] = "blue";
  hand.gradient.colors[0] = "black";

  var gauge3=gaugeTemplate(2,"canvas3");
  gauge3.value=60;

  var gauge4=gaugeTemplate(3,"canvas4");
  gauge4.units.text="Temp. °C";
  gauge4.min=-10;
  gauge4.max=50;
  gauge4.value=29;

  var ranges=[ {value:0, fill:"blue" } , {value:20, fill:"green"},
               {value:30, fill:"yellow" }, {value:40, fill:"orange"},
               {value:50, fill:"red"} ];
  gauge4.ticksBack.ranges=ranges;

  var gauge5=gaugeTemplate(4,"canvas5");
  gauge5.value=1.5;
  gauge5.min=-10;
  gauge5.max=3;
  gauge5.step=1;

  gauge5.ongetText=function(value) {
    return value<0 ? value : "+"+value;
  }

  gauge5.units.text="VU";
  gauge5.ticksBack.ranges=[ { value:0, fill:"black" }, { value:3, fill:"red" } ];

  var gauge6=gaugeTemplate(5,"canvas6");
  gauge6.ticksBack.ranges=[ { value:0, fill:"black" }, { value:50, fill:"red" }, { value:100, fill:"peru" } ];

  gauge1.chart.draw();
  gauge2.chart.draw();
  gauge3.chart.draw();
  gauge4.chart.draw();
  gauge5.chart.draw();
  gauge6.chart.draw();

  var clock1=new Clock("canvas7");
  clock1.gauge.tick();
}
function resizeGauges(){
	resize("canvas1", 300, 250, 95);
	resize("canvas2", 300, 250, 95);
	resize("canvas3", 300, 250, 95);
	resize("canvas4", 300, 250, 95);
	resize("canvas5", 300, 200, 95);
	resize("canvas6", 300, 200, 95);
	resize("canvas7", 300, 200, 95);
}
function resize(canvasId, startWidth, startHeight, perc){
	var w;
	var h;
	var canvas = document.getElementById(canvasId);
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		w = window.innerWidth;
		h = window.innerHeight;
		if(w<=300){
			canvas.style.width="" + w*perc/100 + "px";
			canvas.style.height="" + w*startHeight/startWidth*perc/100 + "px";
		}
		else{
			canvas.style.width = "" + startWidth + "px";
			canvas.style.height = "" + startHeight + "px";
		}
	}
	else{
		w = startWidth;
		h = startHeight;
		
		if ((window.innerWidth*perc/100) < startWidth)
			w = window.innerWidth*perc/100;
		else
			w = startWidth;
			  
		if ((window.innerWidth*perc/100 * startHeight / startWidth) < startHeight)
			h =window.innerWidth*perc/100 * startHeight / startWidth;
		else
			h = startHeight;
		
		canvas.style.width=""+w+"px";
		canvas.style.height=""+h+"px";

	}	
}
function resizeToolBars(){
	var toolbar1 = document.getElementById("toolbar1");
	var toolbar2 = document.getElementById("toolbar2");
	var toolbar3 = document.getElementById("toolbar3");
	var toolbar4 = document.getElementById("toolbar4");
	var toolbar5 = document.getElementById("toolbar5");
	var toolbar6 = document.getElementById("toolbar6");
	var toolbar7 = document.getElementById("toolbar7");
	
	var w = window.innerWidth;

	resizeToolbar(toolbar1);
	resizeToolbar(toolbar2);
	resizeToolbar(toolbar3);
	resizeToolbar(toolbar4);
	resizeToolbar(toolbar5);
	resizeToolbar(toolbar6);
	resizeToolbar(toolbar7);
	
	function resizeToolBar(toolbar){
		if(w<=954){
			toolbar.style.width = "" + w + "px";
		}
		else{
			toolbar.style.width = "" + w - 230 + "px";
		}
	}
}

function gaugeTemplate(index,canvas) {
  var c=new Chart(canvas), gauge;
  c.panel.transparent=true;
  c.title.visible=false;
  gauge=c.addSeries(new CircularGauge());

  switch (index) {
    case 1:  {
      gauge.shape="segment";
      gauge.back.gradient.colors[1] = "SkyBlue";
      gauge.back.gradient.colors[0] = "RoyalBlue";
      gauge.units.visible=false;
      gauge.angle = 200;
      gauge.marks.format.gradient.colors = ["SkyBlue", "RoyalBlue"];
      gauge.hand.gradient.colors[0] = "RoyalBlue";
      gauge.hand.gradient.colors[1] = "SkyBlue";
      gauge.hand.gradient.direction="leftright";
      gauge.format.font.fill="white";
      gauge.format.font.setSize(10);
      gauge.ticksBack.visible=false;
      gauge.marks.transparent=true;
      break;
    }
    case 2: {
      gauge.shape="rectangle";
      gauge.rotation=135;
      gauge.angle=270;
      gauge.inverted=true;
      gauge.format.gradient.colors[0] = "SeaGreen";
      gauge.format.shadow.color = "SeaGreen";
      gauge.back.gradient.colors[0] = "PaleGreen";
      gauge.back.gradient.colors[1] = "SeaGreen";
      gauge.hand.gradient.colors[0] = "SeaGreen";
      gauge.hand.gradient.colors[1] = "PaleGreen";
      gauge.marks.format.gradient.colors = ["PaleGreen", "SeaGreen"];
      gauge.ticksBack.visible=false;
      gauge.minorBack.visible=false;
      gauge.minor.stroke.size=3;
      gauge.ticks.triangle=true;
      gauge.ticks.stroke.fill="white";
      gauge.marks.location.x=-25; // %
      gauge.marks.location.y=-25; // %
      break;
    }
    case 3: {
      gauge.format.visible=false;
      gauge.ticks.outside=false;
      gauge.decimals=1;
      gauge.hand.size=1;
      gauge.hand.stroke.size=5;
      gauge.hand.stroke.cap="round";
      gauge.hand.fill="black";
      gauge.hand.back=0;

      gauge.back.visible=false;
      gauge.bevel.visible=false;
      gauge.format.font.fill="blue";

      gauge.ticksBack.gradient.colors=["red","blue"];
      gauge.ticksBack.visible = true;
	  
      gauge.format.font.style="italic 14px Calibri";
      gauge.rotateText=true;
      gauge.pointer.size=6;
      gauge.pointer.stroke.fill="black";
      gauge.pointer.fill="lime";
      gauge.units.location.y=-30;
      gauge.center.gradient.colors[0]="black";
      gauge.center.top.gradient.colors[1]="black";
      gauge.center.top.size=75;
      gauge.marks.format.gradient.colors = ["white", "silver"];
      break;
    }

    case 4: {
      gauge.ticks.outside=false;
      gauge.ticks.stroke.fill="gray";

      gauge.units.format.font.fill="black";
      gauge.units.location.y=-20;
      gauge.units.format.font.style="16px Arial";

      gauge.minorBack.visible=false;
      //gauge.minor.count=2;

      gauge.shape="rectangle";
      gauge.bounds.custom=true;
      gauge.bounds.set(10,10,280,160);

      gauge.format.size=8;

      gauge.format.gradient.colors=["gray","white"];
      gauge.format.gradient.direction="topbottom";

      gauge.format.font.fill="white";
      gauge.format.font.shadow.visible=true;
      gauge.format.font.style="12px monospace";

      gauge.marks.visible=false;
      gauge.ticksBack.visible = true;
      gauge.back.gradient.colors[1]="#BBBBBB";
      gauge.back.gradient.colors[0]="white"; //"#BBBBBB";
      gauge.back.gradient.direction="radial";
      gauge.back.round.x=8;
      gauge.back.round.y=8;

      gauge.bevel.gradient.direction="rightleft";
      gauge.bevel.gradient.colors=["gray","white"];
      gauge.bevel.round.x=8;
      gauge.bevel.round.y=8;
      
      gauge.center.location.y=60;
      gauge.angle=90;
      gauge.hand.size=3;
      gauge.hand.back=0;
      gauge.hand.length=65;
      gauge.hand.gradient.colors[1]="black";
      gauge.hand.gradient.direction="rightleft";
      gauge.center.transparency=0.6;

      break;
    }

    case 5:  {
      gauge.ticksBack.radius=5;
      gauge.format.gradient.colors[1]="#B85C00";
      gauge.format.font.style = "12px Arial";
      gauge.format.font.fill = "black";
      gauge.format.font.shadow.visible=true;
      gauge.rotation=30;
      gauge.minor.shape="ellipse";
      gauge.minor.fill="white";
      gauge.minor.stroke.fill="";
      break;
    }
  }
	  
  return gauge;
}
