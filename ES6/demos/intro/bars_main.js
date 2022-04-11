import { Chart } from '../../src/teechart.js';
import { Bar } from '../../src/teechart.js';
import { Annotation } from '../../src/teechart.js';
import { ToolTip } from '../../src/teechart.js';
import { CursorTool } from '../../src/teechart.js';
import { SeriesAnimation } from '../../src/teechart.js';
import { FadeAnimation } from '../../src/teechart.js';
import { Demo } from '../demo.js';

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

  //add series and data
  let bar1 = new Bar();
  bar1.title = "Apples";
  bar1.data.values = [5,2,1,4,10,11,15]; //,5,1,3,4];
  let bar2 = new Bar();
  bar2.title = "Pears";
  bar2.data.values = [7,5,1,6,2,11,5];
  
  bar1.data.labels =  [ "jan","feb","mar","apr","may","jun","jul" ];
  bar2.data.labels = bar1.data.labels;
  
  Chart1.axes.bottom.labelStyle="text";
				  
  Chart1.addSeries(bar1);
  Chart1.addSeries(bar2);

  //config some series appearance characteristics
  for (let i = 0; i < 2; i++) {
	  Chart1.series.items[i].format.gradient.visible = false;
	  Chart1.series.items[i].format.stroke.fill = "rgba(0,0,0,0.0)";
	  Chart1.series.items[i].format.shadow.visible=false;
	  Chart1.series.items[i].marks.visible = false;
	  Chart1.series.items[i].barSize = 80;
	  Chart1.series.items[i].hover = false;
  }
  
  //Axes
  Chart1.axes.left.title.text="$ 000s";
  Chart1.axes.left.labels.roundFirst=true;
  Chart1.axes.bottom.labels.roundFirst=true;
  Chart1.axes.bottom.title.text="Bottom Axis";
  Chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
  Chart1.axes.bottom.title.format.font.setSize(20);
  Chart1.axes.bottom.title.visible=false;  
  Chart1.axes.bottom.labels.dateFormat = "mm/yy";
  Chart1.axes.left.increment=3;
  Chart1.axes.left.setMinMax(0, 16);
  Chart1.axes.left.grid.format.stroke.size = 1;
  Chart1.axes.left.ticks.visible=false;
  Chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
  Chart1.axes.bottom.format.stroke.size = 1;

  //Title
  Chart1.title.visible = false;
  Chart1.title.text="Sales figures";
  
  //Legend
  Chart1.legend.position="bottom";

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
  //animation
  let animation=new SeriesAnimation();
  animation.duration=900;
  animation.kind="each";
  let fadeAnimation=new FadeAnimation();
  fadeAnimation.duration=500;
  fadeAnimation.fade.series=true;
  fadeAnimation.fade.marks=true;
  animation.mode = "linear"; 
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);
  
  animation.animate(Chart1);
  
  //tooltip
  let tip=new ToolTip(Chart1);
  tip.render="dom";
  tip.autoHide=true;
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  Chart1.tools.add(tip);
  tip.onhide=function() { let scaling=0; let poindex=-1; }
  tip.ongettext=function( tool, text, series, index) { 
	var s = '<font face="verdana" color="black" size="1"><strong>'+ series.title+'</strong></font>';
		s = s + '<br/><font face="verdana" color="darkblue" size="1">Series point: <strong>'+ index.toFixed(0)+'</strong></font>';
		s =	s +'<br/><font face="verdana" color="red" size="1">Value: '+series.data.values[index].toFixed(2)+'</font>';  
	return s;
  }
}