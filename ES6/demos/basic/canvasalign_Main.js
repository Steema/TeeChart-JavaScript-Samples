import { Chart } from '../../src/teechart.js';
import { Bar } from '../../src/teechart.js';
import { DragTool } from '../../src/teechart.js';
import { ToolTip } from '../../src/teechart.js';

let chart1=new Chart("canvas");
chart1.panel.transparent=true;

chart1.addSeries(new Bar([5,3,2,7,1]) ).cursor="pointer";
chart1.addSeries(new Bar([3,2,7,1,5]) ).cursor="pointer";
chart1.addSeries(new Bar([2,7,1,5,3]) ).cursor="pointer";
chart1.walls.back.format.shadow.visible=true;

chart1.title.text="Full page align";

chart1.tools.add(new DragTool(chart1));

var tip=new ToolTip(chart1);
var font=tip.add().format.font;
font.style="bold 21px Courier";
font.fill="red";

var font=tip.format.font;
font.fill="blue";
font.style="12px Verdana";
font.textAlign="start";

tip.ongettext=function(tool,text,series,index) {
  tip.items[0].text=series.title;
  tip.items[1].text="Point: "+index.toString();
  return text;
 }

font=tip.add().format.font;
font.style="italic bold 14px Tahoma";
font.fill="green";
font.textAlign="end";

chart1.tools.add(tip);

resize(chart1);

function resize(chart) {
	if(chart!=null){
	  var canvas = chart.canvas;
	
	  var w=canvas.parentNode.clientWidth;
	  canvas.width=w;
	  canvas.setAttribute('width', ""+w+"px");
	
	  var h=canvas.parentNode.clientHeight;
	  canvas.height=h;
	  canvas.setAttribute('height', ""+h+"px");
	
	  canvas.style.width=""+w+"px";
	  canvas.style.height=""+h+"px";
	
	  chart.bounds.width=w;
	  chart.bounds.height=h;
	  
	  chart.draw();
	}
}