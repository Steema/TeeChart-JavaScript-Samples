import { Chart } from '../../../src/teechart.js';
import { Line } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';
import { ToolTip } from '../../../src/teechart.js';
import { CursorTool } from '../../../src/teechart.js';

let series1 = document.getElementById('series1');
let marks1 = document.getElementById('marks1');
let gradient1 = document.getElementById('gradient1');
let shadow1 = document.getElementById('shadow1');
let legend1 = document.getElementById('legend1');
let left1 = document.getElementById('left1');
let bottom1 = document.getElementById('bottom1');
let tipactive = document.getElementById('tipactive');
let tipfind = document.getElementById('tipfind');
let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');

var enableCursor = false;

let chart1=new Chart("canvas");
chart1.addSeries(new Line()).addRandom(1000);

chart1.axes.left.title.text="Y";

chart1.series.items[0].marks.drawEvery=120;

chart1.title.text="TeeChart for JavaScript";
chart1.title.format.font.style="18px Verdana";

chart1.title.format.font.gradient.visible=true;


  //tooltip
  let tip=new ToolTip(chart1);
  //tip.format.font.style="10px Tahoma";
  //tip.format.fill = "rgba(255,0,0,1.0)";
  tip.findPoint = true;
  tip.render="dom";
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  //"padding:4px; margin-left:4px; background-color:#FFF; border-radius:2px 2px; color:#555; z-index:1000;"

  chart1.tools.add(tip);

    var t = new CursorTool(chart1);
    t.direction="vertical";

  tip.onshow=function(tool,series,index) {
    if (enableCursor == false){
        chart1.tools.add(t);
      enableCursor = true;
      Demo.resize(chart1);
    }
  }

  tip.ongettext=function(tool, text, series, index) {
      var t, s="", ser;

      for(t=0;t<chart1.series.count(); t++) {
        if (t>0) s+="<br/>";
        ser=chart1.series.items[t];
        s+='<font face="verdana" color="red" size="1">'+ser.data.values[index].toFixed(2)+'</font>';
      }
      return s;
  }

Demo.changeTheme(chart1, "minimal");
chart1.draw();

series1.onclick = () => {
    chart1.series.items[0].visible= !chart1.series.items[0].visible; 
    chart1.draw();
}

marks1.onclick = () => {
    chart1.series.items[0].marks.visible= marks1.checked; 
    chart1.draw();
}

gradient1.onclick = () => {
    chart1.panel.format.gradient.visible= gradient1.checked; 
    chart1.draw();
}

shadow1.onclick = () => {
    chart1.series.each((s) => {s.format.shadow.visible= shadow1.checked;}); 
    chart1.draw();
}

legend1.onclick = () => {
    chart1.legend.visible=legend1.checked; 
    chart1.draw();
}

left1.onclick = () => {
    chart1.axes.left.log=left1.checked; 
    chart1.draw();
}

bottom1.onclick = () => {
    chart1.axes.bottom.log=bottom1.checked; 
    chart1.draw();
}

tipactive.onclick = () => {
    tip.active=tipactive.checked; 
    chart1.draw();
}

tipfind.onclick = () => {
    tip.findPoint=tipfind.checked; 
    chart1.draw();
}

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}