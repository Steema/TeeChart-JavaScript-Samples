import { Chart } from '../../src/teechart.js';
import { Area } from '../../src/teechart.js';
import { Annotation } from '../../src/teechart.js';
import { ToolTip } from '../../src/teechart.js';
import { CursorTool } from '../../src/teechart.js';
import { SeriesAnimation } from '../../src/teechart.js';
import { FadeAnimation } from '../../src/teechart.js';
import { Demo } from '../demo.js';

var a1;
var enableCursor = false;

let aTheme = document.getElementById('theme');
let aPalette = document.getElementById('palette');

var Chart1;

draw();

function changeTheme(aTheme)
{
   Demo.changeTheme(Chart1, aTheme);

   Chart1.draw();
}

function changePalette(aPalette)
{
	Demo.changePalette(Chart1, aPalette);

	Chart1.draw();
}

aTheme.onchange = () => {
	changeTheme(aTheme.value);
}

aPalette.onchange = () => {
	changePalette(aPalette.value);
}

function draw() {
  //init chart
  Chart1=new Chart("canvas");
  
  Demo.changeTheme(Chart1, "minimal");
  
  Chart1.panel.margins.top = 12;
  
  //can add your own colour scheme in here, ie. the colours taken by Series added to the Chart in
  //palette order  ..eg.
  /*Chart1.palette.colors=[ "#FF9999","#663399","#CCFFFF","#FFFFCC","#660066","#8080FF","#CC6600",
	"#FFCCCC","#800000","#FF00FF","#00FFFF","#FFFF00","#800080","#000080","#808000","#FF0000",
	"#FFCC00","#FFFFCC","#CCFFCC","#00FFFF","#FFCC99","#CC99FF"];*/

  //add series and data
  let area1 = new Area();
  area1.title = "With nutrient";
  
  //area1.addRandom(100,10);
  let area2 = new Area();
  area2.title = "No added\nnutrient";
  
  area1.format.fill = "rgba(199,75,0,1)";
  area2.format.fill = "rgba(208,230,231,1)";
  
  let range1 = 20;
  let range2 = 10;
  area1.data.values[0] = Math.random()*range1 + 5;
  area2.data.values[0] = Math.random()*range2;

  for (let t=1; t< 180; t++) {
	 let av1 = area1.data.values[t-1] + (Math.random()*range1) - (range1*0.5);
	 let av2 = area2.data.values[t-1] + (Math.random()*range2) - (range2*0.5);
	 if (av1 < 0) av1 = av1 * -1; if (av1 > 100) av1 = av1 - 20;
	 if (av2 < 0) av2 = av2 * -1; if (av2 > 100) av2 = av2 - 15;
	 
	 area1.data.values[t]=av1
	 area2.data.values[t]=av2
  }
				  
  Chart1.addSeries(area1); //.pointer.visible=true;
  Chart1.addSeries(area2); //.pointer.visible=true;

  //config some series appearance characteristics
  for (var i = 0; i < 2; i++) {
	  Chart1.series.items[i].format.stroke.fill = Chart1.series.items[i].format.fill;
	  Chart1.series.items[i].format.stroke.size = 2;
	  Chart1.series.items[i].format.shadow.visible=false;
	  Chart1.series.items[i].format.transparency=0.12;
	  Chart1.series.items[i].smooth=0.1;
	  Chart1.series.items[i].hover = false;
  }
  
  //Axes
  Chart1.axes.left.title.text="$ 000s";
  Chart1.axes.left.title.visible=false;
  Chart1.axes.left.labels.roundFirst=true;
  Chart1.axes.bottom.labels.roundFirst=true;
  Chart1.axes.bottom.title.text="days";
  Chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
  Chart1.axes.bottom.title.format.font.setSize(14);
  //Chart1.axes.bottom.title.visible=false;  
  Chart1.axes.bottom.labels.dateFormat = "mm/yy";
  Chart1.axes.left.increment=20;
  Chart1.axes.left.setMinMax(0, 110);
  Chart1.axes.left.grid.format.stroke.size = 1;
  Chart1.axes.left.ticks.visible=false;
  Chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
  Chart1.axes.bottom.format.stroke.size = 1;

  //Title
  Chart1.title.visible = false;
  
  //Legend
  //Chart1.legend.position="left";

  // annotation (alternative title)
  let a1=new Annotation(Chart1);
  a1.format.fill = "rgba(0,0,0,0.0)";
  a1.format.stroke.fill="rgba(0,0,0,0.0)";
  a1.format.font.style="20px Tahoma";
  a1.format.font.fill = "rgba(0,0,0,0.6)";
  a1.text="Vegetation growth rate index";

  Chart1.draw();  //get positions
  a1.position.x = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum);
  a1.position.y = 8;
  Chart1.tools.add(a1);
  
  //tooltip
  let tip=new ToolTip(Chart1);
  tip.render="dom";
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  tip.pointer.visible = true;
  tip.pointer.fill = "rgb(30,80,100)";
  tip.pointer.firstCircleRadius = 3;
  tip.pointer.secondCircleRadius = 7;
  tip.pointer.firstCircleOpacity = 1;
  tip.pointer.secondCircleOpacity = 0.5;
  tip.pointer.animationVisible = true;
  tip.pointer.animationDuration = 500;

  Chart1.tools.add(tip);

  tip.onhide=function() { scaling=0; poindex=-1; }
  
  tip.onshow=function(tool,series,index) {
	  if (enableCursor == false){
		Chart1.tools.add(t);
		enableCursor = true;
	  }
  }		  

  tip.ongettext=function(tool, text, series, index) {
		var t, s="", ser;

		for(let t=0;t<Chart1.series.count(); t++) {
		  if (t>0) s+="<br/>";
		  ser=Chart1.series.items[t];
		  s+='<font face="verdana" color="darkorange" size="1"><b>'+ser.title+':</b></font> <font face="verdana" color="red" size="1">'+ser.data.values[index].toFixed(2)+'</font>';
		}
		return s;
  }
  //top.changePalette(top.topPalette);

  //animation
  let animation=new SeriesAnimation();
  animation.duration=1700;
  animation.kind="all";
  animation.mode = "linear"; 
 
  animation.animate(Chart1);
}