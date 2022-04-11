import { Chart, CircularGauge, Tool, Slider, CheckBox, Annotation, Format } from '../../src/teechart.js';
import { Demo } from '../demo.js';

var Chart2, Chart1, Config1, gauge, slider, showConfig, checkPos=20, sliderPos=60;
var gauge2;
var editChecked=true, showSecondChecked=true;

const min = document.getElementById('min');
const max = document.getElementById('max');
const step = document.getElementById('step');

init();

function init()
{
	draw();
	resizeChart(Chart1,600,450);
	resizeChart(Chart2,600,450);
	resizeChart(Config1,320,450);
	resizeToolBars();
	//showHideOptions(); 
}

window.addEventListener('resize', function(event){
  resizeChart(Chart1,300,350);
  resizeChart(Chart2,300,350);  
  resizeChart(Config1,320,450);
  resizeToolBars();
});

min.onkeyup = () => {
  gauge.min=parseFloat(min.value); gauge.chart.draw();
}

max.onkeyup = () => {
  gauge.max=parseFloat(max.value); gauge.chart.draw();
}

step.onkeyup = () => {
  gauge.step=parseFloat(step.value); gauge.chart.draw();
}

function addCheckBox(text, value, onchange, target) {
  if (!target) target=Config1;
  var check=target.tools.add(new CheckBox(target,text));
  check.checked=value;
  check.position.y=checkPos;
  check.onchange=function(c) {
    onchange(c);

  //changeTheme(Chart1, "minimal");
  Chart1.draw();
    if (Config1) Config1.draw();
  }

  if (target==Config1)
     checkPos+=20;

  return check;
}

function addSlider(caption,value,onchange) {
  slider=Config1.tools.add(new Slider(Config1,value));
  slider.bounds.x=100;
  slider.bounds.y=sliderPos;
  slider.bounds.width=80;
  slider.bounds.height=16;
  slider.thumbSize=10;
  slider.onChanging=function(s,v) {
     onchange(s,v);
     s.label.text=v.toFixed(0);
     //changeTheme(Chart1, "minimal");
     Chart1.draw();
     return v;
  }

  var a=Config1.tools.add(new Annotation(Config1,caption));
  a.transparent=true;
  a.position.x=210;
  a.position.y=sliderPos;

  slider.label=Config1.tools.add(new Annotation(Config1,value.toFixed(0)));
  slider.label.transparent=true;
  slider.label.position.x=180;
  slider.label.position.y=sliderPos;
  slider.label.format.font.textAlign="right";

  sliderPos+=20;

  return slider;
}

function draw() {
	Chart1=new Chart("canvas1");

	  Chart1.legend.visible=false;
	  Chart1.title.text="TeeChart Gauge";
	  Chart1.panel.format.gradient.colors=["#101010","white"];

	  
	  Demo.changeTheme(Chart1, "minimal");
	  Chart2=new Chart("canvas2");

	  Chart1.legend.visible=false;
	  Chart1.title.text="TeeChart Gauge";
	  Chart1.panel.format.gradient.colors=["#101010","white"];

	  
	  Demo.changeTheme(Chart1, "minimal");
  //Chart1.panel.transparent=true;

  // First Gauge:

  gauge=Chart1.addSeries(new CircularGauge());
  gauge.value=30;
  gauge.format.font.style="12px Arial";

  gauge.animate.duration=250; // msec
  
  gauge.onchange=function(g) {
    if (slider) {
       slider.position=g.value;
       slider.label.text=g.value.toFixed(0);
       Config1.draw();
    }
  }

  gauge.units.text="Km/h";

  //gauge.ticks.stroke.size=3;
  
  gauge.center.gradient.colors[1]="black";
  gauge.center.gradient.direction="radial";

  // Cosmetic shadow:

  gauge.format.shadow.width=0;
  gauge.format.shadow.height=0;
  gauge.format.shadow.color="gray";
  gauge.format.shadow.blur=10;

  var ranges=[ {value:10, fill:"green" } ,  {value:60, fill:"yellow" } , {value:100, fill:"red"} ];
  gauge.ticksBack.ranges = ranges;
  


  // Another gauge, invisible by default:
  gauge2=Chart2.addSeries(new CircularGauge());

  gauge2.visible=true;
  gauge2.min=-90;
  gauge2.max=20;
  gauge2.value=-10;
  gauge2.angle=220; // degree
  gauge2.rotation=135; // degree

  gauge2.marks.visible=false;

  gauge2.format.size=4;

  gauge2.format.gradient.colors=["white"];
  gauge2.back.gradient.colors = ["SkyBlue", "RoyalBlue"];
  gauge2.back.gradient.direction = "topbottom";

  gauge2.format.font.fill = "white";
  gauge2.format.font.style="12px Tahoma";
  gauge2.format.font.shadow.visible=false;
  gauge2.format.font.shadow.color="black";
  gauge2.format.font.shadow.blur=3;

  gauge2.center.gradient.colors=["black","white"];
  gauge2.center.size=3; // %
  gauge2.hand.size=0;
  gauge2.hand.stroke.size = 2;
  gauge2.format.font.style = "italic 12px Calibri";
  gauge2.hand.back = 0;
  gauge2.rotateText = true;
  gauge2.ticks.outside=false;
  
  document.getElementById("min").value=gauge.min;
  document.getElementById("max").value=gauge.max;
  document.getElementById("step").value=gauge.step;

  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
  Demo.changeTheme(Chart2, "minimal");
  Chart2.draw();

  document.getElementById('divconfig').style.display= 'block';
  createConfigChart();
}


function resizeChart(chart,startWidth ,startHeight){
	if (chart!=null){
		var w;
		var h;
		var canvas = chart.canvas;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			
			w = window.innerWidth;
			h = window.innerHeight;
			if(w<=991){
				canvas.style.width="" + w*0.9 + "px";
				canvas.style.height="" + w*0.9*startHeight/startWidth + "px";
			}
			else{
				canvas.style.width = "" + startWidth + "px";
				canvas.style.height = "" + startHeight + "px";
				chart.bounds.width = startWidth;
				chart.bounds.height = startHeight;
			}
			chart.draw();	 
		}
		else{
			w = startWidth;
			h = startHeight;
			
			if ((window.innerWidth - canvas.offsetLeft - 20) < startWidth)
				w = window.innerWidth - canvas.offsetLeft - 20;
			else
				w = startWidth;
				  
			if ((window.innerWidth * startHeight / startWidth) < startHeight)
				h =window.innerWidth * startHeight / startWidth;
			else
				h = startHeight;
			
			canvas.setAttribute('width', ""+w+"px");
			
			canvas.setAttribute('height', ""+h+"px");
			
			canvas.style.width=""+w+"px";
			canvas.style.height=""+h+"px";
			
			chart.bounds.width=w;
			chart.bounds.height=h;
			
			chart.draw();
		}
	}	

}

function createConfigChart(){
	  Config1 = new Chart('config');
	  Demo.changeTheme(Config1, "twilight");
	  Config1.title.text='Gauge Editor';
	  Config1.panel.format.gradient.colors[1] = "#feb47b";
	  Config1.panel.format.gradient.colors[0] = "#ff7e5f";

    // Add one slider to control gauge value:
    slider=addSlider("Value", gauge.value,function(s,v) { gauge.value=v; return v; });

    // Another slider to control the "total angle":
    addSlider("Angle", gauge.angle, function(s,v) { gauge.angle=v; return v; }).max=360;

    // Another slider to control the rotation angle:
    addSlider("Rotation", gauge.rotation,function(s,v) { gauge.rotation=v; return v; }).max=360;

    // Another slider to control the bevel size:
    addSlider("Frame", gauge.format.size, function(s,v) { gauge.format.size=v; return v; }).max=50;

    // Checkboxes to show or hide gauges and items:

    addCheckBox("Transparent",  !gauge.back.visible, function(c) {
       gauge.back.visible=!c.checked;
       gauge.format.visible=!c.checked;
       gauge.bevel.visible=!c.checked;
    });

    addCheckBox("Back", gauge.back.visible, function(c) { gauge.back.visible=c.checked; });
    addCheckBox("Frame", gauge.format.visible, function(c) { gauge.format.visible=c.checked; });
    addCheckBox("Bevel", gauge.bevel.visible, function(c) { gauge.bevel.visible=c.checked; });
    addCheckBox("Circle", gauge.shape=="circle", function(c) { gauge.shape=c.checked ? "circle" : "segment"; });
    addCheckBox("Marker", gauge.marks.visible, function(c) { gauge.marks.visible=c.checked; });
    addCheckBox("Decimals", gauge.decimals>0, function(c) { gauge.decimals=c.checked ? 2 : 0; });
    addCheckBox("Center", gauge.center.visible, function(c) { gauge.center.visible=c.checked; });
    addCheckBox("Top", gauge.center.top.visible, function(c) { gauge.center.top.visible=c.checked; });
    addCheckBox("Texts", gauge.format.font.visible, function(c) { gauge.format.font.visible=c.checked; });
    addCheckBox("Units", gauge.units.visible, function(c) { gauge.units.visible=c.checked; });
    addCheckBox("Ticks", gauge.ticks.visible, function(c) { gauge.ticks.visible=c.checked; });
    addCheckBox("Ticks Triangle", gauge.ticks.triangle, function(c) { gauge.ticks.triangle=c.checked; });
    addCheckBox("Outside", gauge.ticks.outside, function(c) { gauge.ticks.outside=c.checked; });
    addCheckBox("Minor", gauge.minor.visible, function(c) { gauge.minor.visible=c.checked; });
    addCheckBox("Minor Back", gauge.minorBack.visible, function(c) { gauge.minorBack.visible=c.checked; });
    addCheckBox("Ticks Back", gauge.ticksBack.visible, function(c) { gauge.ticksBack.visible=c.checked; });
    addCheckBox("Pointer", gauge.pointer.visible, function(c) { gauge.pointer.visible=c.checked; });
    addCheckBox("Rotate Text", gauge.rotateText, function(c) { gauge.rotateText=c.checked; });
    addCheckBox("Draggable", gauge.drag.enabled, function(c) { gauge.drag.enabled=c.checked; });
    addCheckBox("Inverted", gauge.inverted, function(c) { gauge.inverted=c.checked; });

    var s2=addSlider("Font Size", gauge.format.font.getSize(), function(s,v) { gauge.format.font.setSize(v); return v; });
    s2.min=1;
    s2.max=40;
    
    var s3=addSlider("Hand Size", gauge.hand.size, function(s,v) { gauge.hand.size=v; return v; });
    s3.min=1;
    s3.max=30;

    var s4=addSlider("Hand Width", gauge.hand.stroke.size, function(s,v) { gauge.hand.stroke.size=v; return v; });
    s4.min=1;
    s4.max=30;

    addSlider("Center Transp", gauge.center.transparency*100, function(s,v) { gauge.center.transparency=v*0.01; return v; });

    var s5=addSlider("Center Size", gauge.center.size, function(s,v) { gauge.center.size=v; return v; });
    s5.min=1;
    s5.max=30;

    var s6=addSlider("Center X", gauge.center.location.x, function(s,v) { gauge.center.location.x=v; return v; });
    s6.min=-100;
    s6.max=100;

    var s7=addSlider("Center Y", gauge.center.location.y, function(s,v) { gauge.center.location.y=v; return v; });
    s7.min=-100;
    s7.max=100;

    addSlider("Hand Length", gauge.hand.length, function(s,v) { gauge.hand.length=v; return v; });
    addSlider("Hand Back", gauge.hand.back, function(s,v) { gauge.hand.back=v; return v; });
    addSlider("Tick Length", gauge.ticks.length, function(s,v) { gauge.ticks.length=v; return v; }).max=30;

    var s8=addSlider("Animate", gauge.animate.duration, function(s,v) { gauge.animate.duration=v; return v; });
    s8.min=0;
    s8.max=1000;

    addSlider("Pointer Size", gauge.pointer.size, function(s,v) { gauge.pointer.size=v; return v; });
    Config1.draw();
    
}
function resizeToolBars(){
	var toolbar1 = document.getElementById("toolbar1");
	var toolbar2 = document.getElementById("toolbar2");
	var toolbar3 = document.getElementById("toolbar3");
	var w = window.innerWidth;
	if(w<=954){
		toolbar1.style.width = "" + w + "px";
		toolbar2.style.width = "" + w + "px";
		toolbar3.style.width = "" + w + "px";
	}
	else{
		toolbar1.style.width = "" + w - 230 + "px";
		toolbar2.style.width = "" + w - 230 + "px";
		toolbar3.style.width = "" + w - 230 + "px";
	}
}

function showHideOptions(){
	var optionsDiv = document.getElementById("optionsDiv");
	var icon=document.getElementById("icon1");
	if(optionsDiv.style.display=="none"){
		optionsDiv.style.display="block";
		icon.classList.add('fa-chevron-up');
		icon.classList.remove('fa-chevron-down');
	}
	else{
		optionsDiv.style.display="none";
		icon.classList.add('fa-chevron-down');
		icon.classList.remove('fa-chevron-up');
	}
}