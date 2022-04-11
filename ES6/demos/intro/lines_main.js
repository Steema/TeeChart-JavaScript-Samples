import { Chart } from '../../src/teechart.js';
import { Line } from '../../src/teechart.js';
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
	Chart1=new Chart('canvas');
    
	Demo.changeTheme(Chart1, "minimal");
	
	Chart1.panel.margins.top = 12;
	
	//can add your own colour scheme in here, ie. the colours taken by Series added to the Chart in
	//palette order  ..eg.
	/*Chart1.palette.colors=[ "#FF9999","#663399","#CCFFFF","#FFFFCC","#660066","#8080FF","#CC6600",
	  "#FFCCCC","#800000","#FF00FF","#00FFFF","#FFFF00","#800080","#000080","#808000","#FF0000",
	  "#FFCC00","#FFFFCC","#CCFFCC","#00FFFF","#FFCC99","#CC99FF"];*/
	
	//add series and data
	let line1 = new Line();
	line1.title = "Apples";
	line1.data.values = [5,3,2,7,1,6,4,5,1,0,10,7,11,15];
	let line2 = new Line();
	line2.title = "Pears";
	line2.data.values = [7,1,5,1,0,10,6,3,2,7,11,4,5,3];
	
	line1.data.x = [new Date(2012, 9, 1),new Date(2012, 10, 1),new Date(2012, 11, 1),new Date(2012, 12, 1),new Date(2013, 1, 1)
					,new Date(2013, 2, 1),new Date(2013, 3, 1),new Date(2013, 4, 1),new Date(2013, 5, 1),new Date(2013, 6, 1)
			  ,new Date(2013, 7, 1),new Date(2013, 8, 1),new Date(2013, 9, 1),new Date(2013, 10, 1)];
			  
	line2.data.x = line1.data.x; 
			  
	Chart1.addSeries(line1).pointer.visible=true;
	Chart1.addSeries(line2).pointer.visible=true;
	
	//config some series appearance characteristics
	for (let i = 0; i < 2; i++)
	{
		Chart1.series.items[i].pointer.width = 20;
		Chart1.series.items[i].pointer.height = 20;
		Chart1.series.items[i].pointer.style="ellipse";
		Chart1.series.items[i].pointer.format.stroke.size = 4;
		Chart1.series.items[i].pointer.format.stroke.fill = "white";
		Chart1.series.items[i].pointer.format.shadow.visible=false;
		Chart1.series.items[i].format.stroke.size = 10;
		Chart1.series.items[i].format.shadow.visible=false;
		Chart1.series.items[i].hover.stroke.fill = "rgba(255,255,128,1.0)";
	}
	//Axes
	Chart1.axes.left.title.text="$ 000s";
	Chart1.axes.left.labels.roundFirst=true;
	Chart1.axes.bottom.labels.roundFirst=true;
	Chart1.axes.bottom.title.text="Bottom Axis";
	Chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
	Chart1.axes.bottom.title.format.font.setSize(20);
	Chart1.axes.bottom.title.visible=false;
	Chart1.axes.left.title.visible=false;
	 
	Chart1.axes.bottom.labels.dateFormat = "mm/yy";
	//Chart1.axes.bottom.increment=30;
	Chart1.axes.left.increment=3;
	Chart1.axes.left.setMinMax(-1, 16);
	Chart1.axes.left.grid.format.stroke.size = 1;
	Chart1.axes.left.ticks.visible=false;
	Chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
	Chart1.axes.bottom.format.stroke.size = 1;
	
	//Title
	Chart1.title.visible = false;
	Chart1.title.text="Sales figures";
	
	//Legend
	//Chart1.legend.position="right";
	Chart1.legend.fontColor = false;
	
	// annotation (alternative title)
	let a1=new Annotation(Chart1);
	a1.format.fill = "rgba(0,0,0,0.0)";
	a1.format.stroke.fill="rgba(0,0,0,0.0)";
	a1.format.font.style="20px Tahoma";
	a1.format.font.fill = "rgba(0,0,0,0.6)";
	a1.text="Sales figures";
	Chart1.draw();  //get position
	a1.position.x = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum);
	a1.position.y = 8;
	
	Chart1.tools.add(a1);
	
	//tooltip
	let tip=new ToolTip(Chart1);
	//tip.format.font.style="10px Tahoma";
	//tip.format.fill = "rgba(255,0,0,1.0)";
	tip.findPoint = false;
	tip.render="dom";
	tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
	tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
	tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";
  
	//"padding:4px; margin-left:4px; background-color:#FFF; border-radius:2px 2px; color:#555; z-index:1000;"

	Chart1.tools.add(tip);

	//tip.onshow=function(tool,series,index) { scaling=2; poindex=index; }
	tip.onhide=function() { scaling=0; poindex=-1; }
	
	let t = new CursorTool(Chart1);
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
		  s+='<font face="verdana" color="#004000" size="1"><b>'+ser.title+':</b></font> <font face="verdana" color="red" size="1">'+ser.data.values[index].toFixed(2)+'</font>';
		}
		return s;
	}
	
	//animation
	let animation = new SeriesAnimation();
	animation.duration = 900;
	animation.kind = "all";
	let fadeAnimation = new FadeAnimation();
	fadeAnimation.duration = 500;
	fadeAnimation.fade.series = true;
	fadeAnimation.fade.marks = true;
	animation.mode = "linear"; 
	fadeAnimation.mode = "linear";
	animation.items.push(fadeAnimation);
	
	animation.animate(Chart1);
}