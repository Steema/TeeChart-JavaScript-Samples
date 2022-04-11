import { Chart, CircularGauge, Clock, Tool, Slider, CheckBox, Annotation, Format } from '../../src/teechart.js';
import { Demo } from '../demo.js';

const romans = document.getElementById('romans');
const seconds = document.getElementById('seconds');
const label = document.getElementById('label');
const ampm = document.getElementById('ampm');

var clock1, clock2, clock3;

init();

function init(){
  makeClock();
  resizeClocks();
  resizeToolBars();
}

window.addEventListener('resize', function(event){
  resizeClocks();
  resizeToolBars();
});

romans.onclick = () => {
  clock1.romans=romans.checked; clock2.romans=romans.checked; clock3.romans=romans.checked;
}

seconds.onclick = () => {
  clock1.seconds.visible=this.checked; clock2.seconds.visible=seconds.checked; clock3.seconds.visible=seconds.checked;
}

label.onclick = () => {
  clock1.ampm=this.checked; clock2.ampm=label.checked; clock3.ampm=label.checked;
}

ampm.onclick = () => {
  gauge.min=parseFloat(min.value); gauge.chart.draw();
}

function makeClock() {
  clock1=(new Clock('canvas1',1)).gauge;

  clock1.format.font.style='28px Arial';
  clock1.hand.size=12;
  clock1.hand.back=8;
  clock1.minutes.size=6;
  clock1.minutes.back=8;
  clock1.units.format.font.style='20px Tahoma';

  clock2=(new Clock('canvas2',2)).gauge;

  clock3=(new Clock('canvas3',3)).gauge;

  clock1.tick();
  clock2.tick();
  clock3.tick();
}

function resizeClocks(){
	resize("canvas1", 400, 400, 90);
	resize("canvas2", 200, 200, 45);
	resize("canvas3", 200, 200, 45);
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
	var w = window.innerWidth;
	if(w<=954){
		toolbar1.style.width = "" + w + "px";
		toolbar2.style.width = "" + w + "px";
		toolbar3.style.width = "" + w*0.48 + "px";
		toolbar4.style.width = "" + w*0.48 + "px";
	}
	else{
		toolbar1.style.width = "" + w - 230 + "px";
		toolbar2.style.width = "" + w - 230 + "px";
		toolbar3.style.width = "" + (w - 230)*0.48 + "px";
		toolbar4.style.width = "" + (w - 230)*0.48 + "px";
	}
}