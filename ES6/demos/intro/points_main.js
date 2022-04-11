import { Chart } from '../../src/teechart.js';
import { PointXY } from '../../src/teechart.js';
import { Line } from '../../src/teechart.js';
import { Format } from '../../src/teechart.js';
import { Annotation } from '../../src/teechart.js';
import { ToolTip } from '../../src/teechart.js';
import { CursorTool } from '../../src/teechart.js';
import { SeriesAnimation } from '../../src/teechart.js';
import { FadeAnimation } from '../../src/teechart.js';
import { Demo } from '../demo.js';

var enableCursor = false;
var tip;

let aTheme = document.getElementById('theme');
let aPalette = document.getElementById('palette');

var Chart1;
var a1,a2;

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
  var points1 = new PointXY();
  points1.title = "Apples";
  points1.data.values = [5,3,2,7,1,6,4,5,1,0,10,7,11,15,12,21,17,15,19,24,21,11,15,21,19,17,20,23]; //,5,1,3,4];
  var points2 = new PointXY();
  points2.title = "Pears";
  points2.data.values = [7,1,5,1,0,10,6,3,2,7,11,4,5,3,4,5,1,5,11,15,16,14,14,13,12,15,17,19];

  points1.data.x = [new Date(2012, 9, 1),new Date(2012, 9, 15),new Date(2012, 10, 1),new Date(2012, 10, 15),new Date(2012, 11, 1)
				  ,new Date(2012, 11, 15),new Date(2012, 12, 1),new Date(2012, 12, 15),new Date(2013, 1, 1),new Date(2013, 1, 15)
				  ,new Date(2013, 2, 1),new Date(2013, 2, 15),new Date(2013, 3, 1),new Date(2013, 3, 15)
				  ,new Date(2013, 4, 1),new Date(2013, 4, 15),new Date(2013, 5, 1),new Date(2013, 5, 15),new Date(2013, 6, 1)
				  ,new Date(2013, 6, 15),new Date(2013, 7, 1),new Date(2013, 7, 15),new Date(2013, 8, 1),new Date(2013, 8, 15)
				  ,new Date(2013, 9, 1),new Date(2013, 9, 15),new Date(2013, 10, 1),new Date(2013, 10, 15)];
				  
  points2.data.x = points1.data.x; 
				  
  Chart1.addSeries(points1).pointer.visible=true;
  Chart1.addSeries(points2).pointer.visible=true;

  //function series
  var avg = new Line();
  avg.title = "Average";
  var avgVals = new Array();
  
  for (var i = 0; i < points1.data.x.length; i++)
	avgVals[i] = (points1.data.values[i]+points2.data.values[i]) / 2;
  
  avg.data.values = avgVals;
  avg.data.x = points1.data.x;
  avg.format.stroke.size=2;
  avg.smooth=0.5;
  Chart1.addSeries(avg);

  //config some series appearance characteristics
  for (var i = 0; i < 2; i++) {
	  Chart1.series.items[i].pointer.width = 10;
	  Chart1.series.items[i].pointer.height = 10;
	  Chart1.series.items[i].pointer.style="ellipse";
	  Chart1.series.items[i].pointer.format.stroke.size = 4;
	  Chart1.series.items[i].pointer.format.stroke.fill = "white";
	  Chart1.series.items[i].pointer.format.shadow.visible=false;
	  Chart1.series.items[i].format.stroke.size = 2;
	  Chart1.series.items[i].format.shadow.visible=false;
  }
  
  //Axes
  Chart1.axes.left.title.text="$ 000s";
  Chart1.axes.left.labels.roundFirst=true;
  Chart1.axes.left.title.visible=false;  
  Chart1.axes.bottom.labels.roundFirst=true;
  Chart1.axes.bottom.title.text="Bottom Axis";
  Chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
  Chart1.axes.bottom.title.format.font.setSize(20);
  Chart1.axes.bottom.title.visible=false;  
  Chart1.axes.bottom.labels.dateFormat = "mm/yy";
  Chart1.axes.left.increment=3;
  Chart1.axes.left.setMinMax(-1, 26);
  Chart1.axes.left.grid.format.stroke.size = 1;
  Chart1.axes.left.ticks.visible=false;
  Chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
  Chart1.axes.bottom.format.stroke.size = 1;

  //Title
  Chart1.title.visible = false;
  Chart1.title.text="Sales figures";
  
  //Legend
  //Chart1.legend.position="right";

  // annotation (alternative title)
  a1=new Annotation(Chart1);
  a1.format.fill = "rgba(0,0,0,0.0)";
  a1.format.stroke.fill="rgba(0,0,0,0.0)";
  a1.format.font.style="20px Tahoma";
  a1.format.font.fill = "rgba(0,0,0,0.6)";
  a1.text="Product shipments";
  
  // annotation (alternative title)
  a2=new Annotation(Chart1);
  a2.format.fill = "rgba(0,0,0,0.0)";
  a2.format.stroke.fill="rgba(0,0,0,0.0)";
  a2.format.font.style="12px Arial";
  a2.format.font.fill = "darkblue";
  a2.text=" Tons fortnightly, all freighted sources";
  
  Chart1.draw();  //get positions
  
  a1.position.x = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum);
  a1.position.y = 8;
  Chart1.tools.add(a1);
  a2.position.x = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum);
  a2.position.y = 38;
  Chart1.tools.add(a2);  
  
  //tooltip
  let tip=new ToolTip(Chart1);
  tip.render="dom";
  tip.findPoint=false;
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  Chart1.tools.add(tip);

  tip.onhide=function() { let scaling=0; let poindex=-1; }
  
  var t = new CursorTool(Chart1);
  t.direction="vertical";
  
  tip.onshow=function(tool,series,index) {
	  if (!enableCursor){
		Chart1.tools.add(t);
		enableCursor = true;
	  }
  }		  
  
  tip.ongettext=function(tool, text, series, index) {
		var t, s="", ser;

		for(t=0;t<Chart1.series.count(); t++) {
		  if (t>0) s+="<br/>";
		  ser=Chart1.series.items[t];
		  s+='<font face="verdana" color="darkorange" size="1"><b>'+ser.title+':</b></font> <font face="verdana" color="red" size="1">'+ser.data.values[index].toFixed(2)+'</font>';
		}
		//console.log(index);
		return s;
  }

  aTheme = document.getElementById("theme");
  
  if (aTheme.value != "undefined")
	changePointsTheme(aTheme.value);
  //changePalette(top.topPalette);
  
  //animation
  let animation=new SeriesAnimation();
  animation.duration=1500;
  animation.kind="each";
  let fadeAnimation=new FadeAnimation();
  fadeAnimation.duration=500;
  fadeAnimation.fade.series=true;
  fadeAnimation.fade.marks=true;
  animation.mode = "linear"; 
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);
  
  animation.animate(Chart1);
}

function changePointsTheme(aTheme) {
   changeTheme(aTheme);

   if (aTheme === "dark") {
	 a1.format.font.fill = "white"; 
	 a2.format.font.fill = "lightblue";
	 if (Chart1.series.items.length > 0) {
	  for (var i = 0; i < Chart1.series.items.length; i++) {
		Chart1.series.items[i].pointer.format.stroke.size = 3;
		Chart1.series.items[i].pointer.format.stroke.fill = "white"; 
	  }
	}
   }
   else if ((aTheme === "daybreak") || (aTheme === "twilight")) {
	 if (aTheme === "twilight") {
	   a1.format.font.fill = "white"; 
	   a2.format.font.fill = "lightblue"; 
	 }  
	 else {
	   a1.format.font.fill = "rgba(0,0,0,0.6)";
	   a2.format.font.fill = "darkblue";  
	 }
	 if (Chart1.series.items.length > 0) {
	  for (var i = 0; i < Chart1.series.items.length; i++) {
		Chart1.series.items[i].pointer.format.stroke.size = 1;
		Chart1.series.items[i].pointer.format.stroke.fill = "rgba(224,224,224,0.6)";
	  }
	}  
   }
   else {
	 a1.format.font.fill = "rgba(0,0,0,0.6)";
	 a2.format.font.fill = "darkblue";
	 if (Chart1.series.items.length > 0) {
	  for (var i = 0; i < Chart1.series.items.length; i++) {
		Chart1.series.items[i].pointer.format.stroke.size = 3;
		Chart1.series.items[i].pointer.format.stroke.fill = "white"; 
	  }
	}
   }
}