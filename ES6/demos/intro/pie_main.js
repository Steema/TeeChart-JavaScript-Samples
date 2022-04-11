import { Chart } from '../../src/teechart.js';
import { Pie } from '../../src/teechart.js';
import { Format } from '../../src/teechart.js';
import { Annotation } from '../../src/teechart.js';
import { SeriesAnimation } from '../../src/teechart.js';
import { FadeAnimation } from '../../src/teechart.js';
import { Demo } from '../demo.js';

var a1;
var enableCursor = false;
var featureColor;

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

  /*Chart1.palette.colors=[ "#FF9999","#663399","#CCFFFF","#FFFFCC","#660066","#8080FF","#CC6600",
	"#FFCCCC","#800000","#FF00FF","#00FFFF","#FFFF00","#800080","#000080","#808000","#FF0000",
	"#FFCC00","#FFFFCC","#CCFFCC","#00FFFF","#FFCC99","#CC99FF"];*/

  //add series and data
  let pie1 = new Pie();
  pie1.title = "Apples";
  pie1.data.values = [15,17,12,19,30,41];
  
  pie1.data.labels =  [ "jan","feb","mar","apr","may","jun" ];
  pie1.explode = [4,4,3,5,8,0];
  Chart1.axes.bottom.labelStyle="text";
				  
  Chart1.addSeries(pie1);

  //config some series appearance characteristics
  for (let i = 0; i < 1; i++)
  {
	  Chart1.series.items[i].format.gradient.visible = false;
	  Chart1.series.items[i].format.gradient.colors=["rgba(204,204,204,1)","white","white"];

	  Chart1.series.items[i].format.stroke.fill = "white"; // "rgba(0,0,0,0.0)";
	  Chart1.series.items[i].format.shadow.visible=false;
	  Chart1.series.items[i].marks.arrow.length = -85;
	  Chart1.series.items[i].marks.arrow.stroke.fill = "rgba(0,0,0,0.0)";
	  Chart1.series.items[i].marks.format.fill = "rgba(0,0,0,0.0)";
	  Chart1.series.items[i].marks.format.font.style="bold 13px Arial";
	  Chart1.series.items[i].marks.format.font.fill = "rgb(0,0,0)";
	  Chart1.series.items[i].marks.format.stroke.fill = "rgba(0,0,0,0.0)";
  }

  //Title
  Chart1.title.visible = true;
  Chart1.title.text=" "; //"Sales figures";
  Chart1.footer.visible = true;
  Chart1.footer.text=" "; //"Sales figures";
  
  //Legend
  Chart1.legend.title.visible = true;
  Chart1.legend.title.format.font.fill = "rgba(0,0,0,0.6)";
  Chart1.legend.title.format.font.setSize(18);
  Chart1.legend.format.font.setSize(15);
  Chart1.legend.format.font.shadow.visible=false;
  Chart1.legend.format.shadow.visible=false;
  Chart1.legend.title.text = "\n$ 000s";
  Chart1.legend.position="left";

  // annotation (alternative title)
  let a1=new Annotation(Chart1);
  a1.format.fill = "rgba(0,0,0,0.0)";
  a1.format.stroke.fill="rgba(0,0,0,0.0)";
  a1.format.font.style="20px Tahoma";
  a1.format.font.fill = "rgba(0,0,0,0.6)";
  a1.text="Sales figures";
  Chart1.draw();  //get position
  a1.position.x = 8;
  a1.position.y = 34;
  
  Chart1.tools.add(a1);

  //animation
  let animation=new SeriesAnimation();
  animation.duration=900;
  animation.kind="all";
  let fadeAnimation=new FadeAnimation();
  fadeAnimation.duration=500;
  fadeAnimation.fade.series=true;
  fadeAnimation.fade.marks=true;
  animation.mode = "linear"; 
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);
  
  animation.animate(Chart1);

  var myFormat = new Format(Chart1);
  featureColor = "darkGray";

  Chart1.ondraw=function() {
	 myFormat.stroke.size = 1;
	 myFormat.stroke.fill = featureColor;
	 myFormat.rectangle(20,29, 230, 1);
  }
}

function changePieTheme(aTheme) {
   changeTheme(aTheme);

   if (aTheme === "dark") {
	 Chart1.legend.title.format.font.fill = "lightgray";
	 featureColor = "lightgray";
   }
   else if (aTheme === "twilight") {
	 Chart1.legend.title.format.font.fill = "lightgray";
	 featureColor = "lightgray";
   }   
   else {
	 Chart1.legend.title.format.font.fill = "rgba(0,0,0,0.6)";
	 featureColor = "darkGray";
   }
}