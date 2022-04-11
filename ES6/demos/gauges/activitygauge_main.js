import { Chart, ActivityGauge, Tool, Slider, FadeAnimation, SeriesAnimation, Format } from '../../src/teechart.js';
import { Demo } from '../demo.js';


var Chart1;

init();

function init(){
  draw();
  resize(Chart1);
  resizeToolBars();
}

window.addEventListener('resize', function(event){
  resize();
  //resizeToolBars();
});

function draw() {
  //var colors = ["#FF6347", "#FA8072", "#3CB371", "#48D1CC", "#6495ED", "#2095FF"];
  Chart1 = new Chart("canvas");

  Chart1.addSeries(new ActivityGauge().addRandom(3));

  //Chart1.addSeries(new ActivityGauge([33,25,18,23,15,25],["a","b","c","d","e","f"]));/*another way to create an ActivityGauge*/

  Chart1.series.items[0].add(15, "test");/*To add an element to the ActivityGauge*/
  Chart1.series.items[0].maxWidth = 230;
  Chart1.series.items[0].format.gradient.visible = false;
  Chart1.series.items[0].format.stroke.fill = ["white"];
  Chart1.series.items[0].format.stroke.size = 3;
  Chart1.series.items[0].format.shadow.visible = false;
  
  Chart1.title.text = "Activity Gauge Series";
  Chart1.series.each(function(s) { s.marks.visible=false; });

  Chart1.legend.visible = true;
  Chart1.legend.textStyle = "auto";
    
    //animation
  let animation = new SeriesAnimation();
  animation.duration = 900;
  animation.kind = "each";
  let fadeAnimation = new FadeAnimation();
  fadeAnimation.duration = 500;
  fadeAnimation.fade.series = true;
  fadeAnimation.fade.marks = true;
  animation.mode = "linear";
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);

  animation.animate(Chart1);

  Demo.changeTheme(Chart1, "minimal");
  //Chart1.palette.colors=colors;
  Chart1.draw();
}

function resize(chart){
	if (chart!=null){
		var startWidth=600;
		var startHeight=400;
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
function resizeToolBars(){
	var toolbar1 = document.getElementById("toolbar1");
	var w = window.innerWidth;
	if(w<=954){
		toolbar1.style.width = "" + w + "px";
	}
	else{
		toolbar1.style.width = "" + w - 230 + "px";
	}
}