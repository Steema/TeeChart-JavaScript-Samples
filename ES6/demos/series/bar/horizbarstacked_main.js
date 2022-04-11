import { Chart } from '../../../src/teechart.js';
import { HorizBar } from '../../../src/teechart.js';
import { ToolTip } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

var Chart1;

draw();

function draw() {
  Chart1=new Chart("canvas");

  Chart1.addSeries(new HorizBar([-5,-4.4,-3.2,-3.8,-5.1,-5.6,-5.2,-4.2,-3.4,-2.8,-2.2,-1.7,-1.1,-0.8,-0.5,-0.5]));
  Chart1.addSeries(new HorizBar([4.8,4.1,3.4,3.8,5.1,5.1,4.8,4.1,3.6,3,2.5,1.9,1.3,1,0.8,1.2]));
  
  Chart1.series.items[0].title = "Male";
  Chart1.series.items[1].title = "Female";
  
  for (let i = 0; i < 2; i++)
  {
	  Chart1.series.items[i].cursor="pointer";
	  Chart1.series.items[i].data.x=[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75];
	  Chart1.series.items[i].origin=0;
	  Chart1.series.items[i].useOrigin=true;
	  Chart1.series.items[i].stacked="side";
	  Chart1.series.items[i].format.gradient.visible = false;
	  Chart1.series.items[i].format.stroke.fill = "rgba(0,0,0,0.0)";
	  Chart1.series.items[i].format.shadow.visible=false;
	  Chart1.series.items[i].marks.visible = false;
	  Chart1.series.items[i].barSize = 100;
	  Chart1.series.items[i].hover = false;
  }
  Chart1.series.items[0].format.fill="rgba(255,165,0,0.8)";
  Chart1.series.items[1].format.fill="rgba(100,149,237,0.8)";
  
  Chart1.axes.left.title.text="Age";
  Chart1.axes.left.grid.centered=true;
  Chart1.axes.left.increment=5;
  Chart1.axes.left.format.stroke.size = 0.5;
  Chart1.axes.left.title.format.font.fill = "rgb(0,0,0)";
  Chart1.axes.left.labels.format.font.fill = "rgb(0,0,0)";
  Chart1.axes.bottom.title.text="%";
  Chart1.axes.bottom.setMinMax(-7, 7);
  Chart1.axes.bottom.format.stroke.size = 0.5;
  Chart1.axes.bottom.grid.visible=false;
  Chart1.axes.bottom.labels.visible = true;
  Chart1.axes.bottom.title.format.font.fill = "rgb(0,0,0)";
  
  Chart1.walls.visible=false;
  Chart1.title.visible=false;
  
  Chart1.panel.format.gradient.visible=false;
  Chart1.panel.format.shadow.visible=false;
  Chart1.panel.format.fill="rgba(255,255,255,1)";
  Chart1.panel.format.stroke.fill="rgba(255,255,255,1)";
  
  //changeTheme(Chart1, "minimal");
  Chart1.legend.textStyle="percent";
  Chart1.legend.format.stroke.fill = "white";
  Chart1.legend.transparent=false;

  //tooltip
  let tip=new ToolTip(Chart1);
  tip.render="dom";
  tip.autoHide=false;
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  Chart1.tools.add(tip);
  tip.onhide=function() { let scaling=0; let poindex=-1; }
  tip.ongettext=function( tool, text, series, index) {
  	var s;
	if(series.title==="Male"){
	    	s = '<font face="verdana" color="darkorange" size="1"><strong>'+ series.title+'</strong></font>';
	    	if(index*5<75) s = s + '<br/><font face="verdana" color="orange" size="1">Age: <strong>'+ (index * 5) + " - " + (index * 5 + 4) +'</strong></font>';
	    	else s = s + '<br/><font face="verdana" color="orange" size="1">Age: <strong>'+ (index * 5) + '+</strong></font>';
	        s =	s +'<br/><font face="verdana" color="darkorange" size="1">Percentage: '+ Math.abs(series.data.values[index]) +'%</font>';
	}
	else if(series.title==="Female"){
		s = '<font face="verdana" color="CornflowerBlue" size="1"><strong>'+ series.title+'</strong></font>';
	    if(index*5<75) s = s + '<br/><font face="verdana" color="CornflowerBlue" size="1">Age: <strong>'+ (index * 5) + " - " + (index * 5 + 4) +'</strong></font>';
	    else s = s + '<br/><font face="verdana" color="CornflowerBlue" size="1">Age: <strong>'+ (index * 5) + '+</strong></font>';
        s =	s +'<br/><font face="verdana" color="CornflowerBlue" size="1">Percentage: '+ Math.abs(series.data.values[index]) +'%</font>';
	}
	return s;
  };

  Chart1.draw();
}  