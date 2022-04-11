import { Chart } from '../../src/teechart.js';
import { Gantt } from '../../src/teechart.js';
import { Format } from '../../src/teechart.js';
import { Annotation } from '../../src/teechart.js';
import { ToolTip } from '../../src/teechart.js';
import { DragTool } from '../../src/teechart.js';
import { SeriesAnimation } from '../../src/teechart.js';
import { FadeAnimation } from '../../src/teechart.js';
import { Demo } from '../demo.js';

let aTheme = document.getElementById('theme');
let aPalette = document.getElementById('palette');

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

var Chart1;

var gantt;
	
var mouseDown = false;
var procPoint = false;
var pIdx = -1;
var startPIdx = -1;
var oldValue;
var startPoint;
var pxOffset;
var featureColor = "darkgray";

draw();

function draw() {
  Chart1=new Chart("canvas");
  
  Demo.changeTheme(Chart1, "minimal");

  Chart1.zoom.enabled=true;

  // Create series:
  gantt=Chart1.addSeries(new Gantt());

  // Sample data:

  gantt.add(0, "Production", new Date(2012, 5, 21), new Date(2012, 5, 29) );
  gantt.add(1, "Marketing", new Date(2012, 9, 3), new Date(2012, 11, 10) );
  gantt.add(2, "Approve", new Date(2012, 3, 13), new Date(2012, 3, 31) );
  gantt.add(3, "Prototype", new Date(2012, 6, 7), new Date(2012, 7, 5) );
  gantt.add(4, "Evaluation", new Date(2012, 10, 11), new Date(2012, 11, 5) );
  gantt.add(5, "Design", new Date(2012, 4, 2), new Date(2012, 4, 29) );
  gantt.add(2, "Testing", new Date(2012, 9, 1), new Date(2012, 11, 7) );
  
  gantt.format.round = false;
  gantt.format.shadow.visible=false;

  // Example:
  // Add custom data to display at each gantt bar, for example: "Completion %"

  gantt.data.completion=[20, 40, 10, 75, 55, 60, 25];

  gantt.addNextTask(0,1);
  gantt.addNextTask(0,3);
  gantt.addNextTask(2,0);
  gantt.addNextTask(5,3);
  gantt.addNextTask(3,4);
  gantt.addNextTask(6,3);
  //gantt.addNextTask(3,6);
  gantt.nextTasksStrokeStyle = "Grey";//Black is default
  gantt.nextTasksPosition = "back";//back, front

  gantt.completion=new Format(gantt.chart);
  gantt.completion.stroke.fill="";
  //gantt.completion.shadow.visible=true;
  //gantt.completion.gradient.visible=true;
  gantt.completion.fill = "rgba(255,255,255,0)";
  //gantt.completion.fill = "white";
  gantt.completion.visible=true;
  gantt.completion.font.fill="white";
  gantt.completion.font.shadow.visible=true;

  var originalScale;
  // Use the series onDraw event to paint completion data:

  gantt.ondraw=function(g) {
	if (!g.completion.visible) return;

	if(!originalScale) originalScale = g.chart.axes.left.scale;
	  
	  /*it change font size depending of the actual scale from gantt*/
	g.completion.font.style = 28 * (1.5 - originalScale / g.chart.axes.left.scale) + "px Tahoma";
	var r={ x:0,y:0,width:0,height:0 },
		t=0,
		len=g.count();

	g.completion.round=g.format.round;
	g.completion.font.prepare();

	for(let t=0; t<len; t++) {

	  // Calculate bounds of each gantt bar:

	  g.bounds(t,r);
	  r.y+=5;
	  r.height-=8;
	  r.width=g.mandatoryAxis.calcSize(g.data.end[t]-g.data.start[t]);

	  // Draw completion bar:

	  g.completion.rectangle(r);

	  // Paint % text:

	  r.y+= 0.5*(r.height+g.completion.font.getSize());
	  g.completion.drawText(r,g.data.completion[t]+"%");
	  r.y-=r.height*0.5;
	}
  }
  
  /*gantt.onclick=function(series,index,x,y) {
	window.status = ("Clicked point: "+index);
  }*/
  
  Chart1.mousemove=function(p) {
	if (mouseDown && procPoint && (gantt.clicked(p) == -1)) {
	  if ((pIdx !=-1) && (mouseDown == true))
	  {  
		 resizeGantt(p);
	  }	  
	}
  }
  
  gantt.mousemove=function(p) {
	
	pIdx = gantt.clicked(p);
	
	if (pIdx !=-1)
	  startPIdx = pIdx;
	
	if (((pIdx !=-1) || (startPIdx != -1)) && (mouseDown == true))
	{ 
	  resizeGantt(p);
	}
	else
	  Chart1.newCursor = "default";

  }
  
  Chart1.mouseup=function(event) {
	mouseDown = false;
	procPoint = false;
	pIdx = -1;
	startPIdx = -1;
	Chart1.newCursor = "default";
  }
  
  gantt.mouseup=function() {
	mouseDown = false;
	procPoint = false;
	pIdx = -1;
	startPIdx = -1;
	Chart1.newCursor = "default";
  }
  
  let d1 = new DragTool(Chart1);
  d1.series = gantt;
 
  Chart1.tools.add(d1);
  
  d1.onchanging=function(obj,value) {

	startPoint = d1.Point;
	pIdx = d1.target.index;
	
	if (mouseDown == false)
	  pxOffset = d1.Point.x - Chart1.axes.bottom.calc(gantt.data.start[pIdx]);
	
	mouseDown = true;
	
	var d = new Date();
	d.setTime(value);

	return gantt.data.values[d1.target.index];
	
  }

  // Example, change a specific gantt bar color:
  //gantt.palette.colors=new Array();
  //gantt.palette.colors[3]="orange";

  // Cosmetics:

  gantt.height=70; // 70% height
  gantt.colorEach="yes";
  gantt.format.gradient.visible = false;
  gantt.marks.visible=false;
  gantt.marks.format.transparency=0.1;
  gantt.format.stroke.fill="rgba(255,255,255,1)";

  // Chart options:
  Chart1.title.text="project planner";

  Chart1.scroll.direction="both";
  Chart1.zoom.direction="both";

  Chart1.legend.visible=false;

  Chart1.axes.bottom.title.text="Time";
  Chart1.axes.bottom.labels.dateFormat="mediumDate";

  Chart1.axes.left.title.text="Task";
  Chart1.axes.left.grid.centered=true;
  Chart1.axes.left.increment=1;
  Chart1.axes.left.labels.labelStyle="text";

  // Custom draw text on chart:
  Chart1.ondraw=function() {
	var MSECSDAY=86400000,
		a=Chart1.axes.bottom,
		days=Math.round((a.maximum-a.minimum)/MSECSDAY);

	Chart1.ctx.fillStyle = featureColor;		
	Chart1.ctx.textAlign="start";
	Chart1.ctx.fillText("Total Range: "+days+" days",20,10);
  }

  //top.changePalette(top.topPalette);
  
  //animation
  let animation=new SeriesAnimation();
  let fadeAnimation=new FadeAnimation();
  fadeAnimation.duration=500;
  fadeAnimation.fade.series=true;
  fadeAnimation.fade.marks=true;
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);
	
  animation.animate(Chart1);
}

function resizeGantt(p)
{
  var startVal = new Date();
  var endVal = new Date();
  
  if (pIdx ==-1)
	pIdx = startPIdx;
	
  startVal = gantt.data.start[pIdx];
  endVal = gantt.data.end[pIdx];
	
  tolerance = 15; //pixels mouse tolerance for end grab
	
  startPixel = Chart1.axes.bottom.calc(startVal);
  endPixel = Chart1.axes.bottom.calc(endVal);

  procPoint = true;
  var d = new Date();
  d.setTime(Chart1.axes.bottom.fromPos(p.x));
  
  if (Math.abs(p.x-startPixel)<tolerance)
  {
	gantt.data.start[pIdx] = d;
	Chart1.newCursor="col-resize";
  }
  else if (Math.abs(p.x-endPixel)<tolerance)
  {
	gantt.data.end[pIdx] = d;
	Chart1.newCursor="col-resize";
  }
  else {
	Chart1.newCursor = "pointer";
	var startD = new Date(); 
	var endD = new Date();
	var tmpD = new Date();
	var tmpD2 = new Date();
	
	barWidth = endVal - startVal;
	newPxPosStart = p.x - pxOffset;
	newStartVal = Chart1.axes.bottom.fromPos(newPxPosStart);
	//window.status = "p.x : " + p.x;
	gantt.data.start[pIdx] = newStartVal;
	gantt.data.end[pIdx] = newStartVal + barWidth;
  }
}

function changeGanttTheme(aTheme) {
  changeTheme(aTheme);

  if (aTheme === "dark") {
	featureColor = "white";  //for Chart1.ctx
  }
  else {
	if (aTheme === "twilight")
	  featureColor = "white";
	else
	  featureColor = "rgba(124,124,124,0.6)";
  }
}