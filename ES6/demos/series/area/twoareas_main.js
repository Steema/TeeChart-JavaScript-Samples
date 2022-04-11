import { Chart, Annotation, Area, SeriesAnimation, ToolTip, CursorTool } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let showHide1 = document.getElementById('showHide1');

var a1;
let chart1 = new Chart("canvas");

chart1.panel.margins.top = 12;
		  
//add series and data
var area1 = new Area();
area1.title = "Max Temperature";

var area2 = new Area();
area2.title = "Min Temperature";

area1.format.fill = "rgba(255,165,0,0.5)";
area2.format.fill = "rgba(255,255,255,1)";

var range1 = 30;
var range2 = 5;
var av1;
var av2;
var inc;
area2.data.values[0] = Math.random()*range1-10;
area1.data.values[0] = area2.data.values[0] + Math.random()*range2 + 5;

av1 = area2.data.values[0];

for (t=1; t< 31; t++)
{
  inc = (Math.random()*range1-15)%6;
   if((av1+inc>range1-10)||(av1+inc<-10)) av1 = av1 - inc;
   else  av1 = av1 + inc;
   
   av2 = av1 + Math.random()*range2+5;
   area2.data.values[t]=av1;
   area1.data.values[t]=av2;
}
                
chart1.addSeries(area1);
chart1.addSeries(area2);

//config some series appearance characteristics
for (var i = 0; i < 2; i++)
{
    chart1.series.items[i].format.stroke.fill = "rgba(255,165,0,0.8)";
    chart1.series.items[i].format.stroke.size = 2;
    chart1.series.items[i].format.shadow.visible=false;
    chart1.series.items[i].format.transparency=0.01;
    chart1.series.items[i].smooth=0.3;
    chart1.series.items[i].hover = false;
}

//Axes
chart1.legend.visible=false;
chart1.axes.bottom.labels.roundFirst=true;
chart1.axes.bottom.title.text="days";
chart1.axes.bottom.title.format.font.fill = "rgba(255,65,0,0.6)";
chart1.axes.bottom.title.format.font.setSize(14);  
chart1.axes.bottom.labels.dateFormat = "mm/yy";
chart1.axes.bottom.increment=2;
chart1.axes.bottom.format.stroke.size = 1;
chart1.axes.bottom.grid.visible=false;
chart1.axes.left.title.text="$ 000s";
chart1.axes.left.title.visible=false;
chart1.axes.left.labels.roundFirst=true;
chart1.axes.left.increment=5;
chart1.axes.left.setMinMax(-10, 30);
chart1.axes.left.grid.format.stroke.size = 0.5;
chart1.axes.left.ticks.visible=false;
chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
chart1.axes.left.grid.visible=false;


//Panel transparent
chart1.walls.visible=false;
chart1.panel.format.shadow.visible=false;
chart1.panel.format.stroke.fill="";
chart1.panel.format.round.x=0;
chart1.panel.format.round.y=0;
chart1.panel.format.gradient.visible=false;
chart1.panel.format.fill="white";
//Title
chart1.title.visible = false;

// annotation (alternative title)
a1=new Annotation(chart1);
a1.format.fill = "rgba(0,0,0,0.0)";
a1.format.stroke.fill="rgba(0,0,0,0.0)";
a1.format.font.style="20px Tahoma";
a1.format.font.fill = "rgba(255,65,0,0.6)";
a1.text="Temperatures";

chart1.draw();  //get positions
a1.position.x = chart1.axes.bottom.calc(chart1.axes.bottom.minimum);
a1.position.y = 8;
chart1.tools.add(a1);

//tooltip
let tip=new ToolTip(chart1);
tip.render="dom";
tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

chart1.tools.add(tip);

//tip.onhide=function() { scaling=0; poindex=-1; }

tip.ongettext=function(tool, text, series, index) {
      var t, s="", ser;
        ser=chart1.series.items[0];
        if(ser.data.values[index]!=undefined){
            s+='<font face="verdana" color="darkorange" size="1"><b>'+ser.title+':</b></font> <font face="verdana" color="red" size="1">'+ser.data.values[index].toFixed(1)+'</font>';
            s+="<br/>";
            ser=chart1.series.items[1];
            s+='<font face="verdana" color="darkorange" size="1"><b>'+ser.title+':</b></font> <font face="verdana" color="blue" size="1">'+ser.data.values[index].toFixed(1)+'</font>';
        }
      return s;
}
let animation=new SeriesAnimation();
animation.duration=1700;
animation.kind="all";
animation.mode = "linear"; 

animation.animate(chart1);
var t = new CursorTool(chart1);
t.direction="vertical";
chart1.tools.add(t);

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}