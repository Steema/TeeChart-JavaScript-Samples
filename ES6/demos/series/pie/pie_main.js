import { Chart, Pie, Annotation } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

const legend = document.getElementById('legend');
const series1 = document.getElementById('series1');
const gradient1 = document.getElementById('gradient1');
const marks = document.getElementById('marks');
const under = document.getElementById('under');
const sortby = document.getElementById('sortby');
const order = document.getElementById('order');

gradient1.onclick = () => {
  Chart1.series.items[0].format.gradient.visible = gradient1.checked; Chart1.draw();
}

legend.onclick = () => {
  Chart1.legend.visible = legend.checked; Chart1.draw();
}

series1.onclick = () => {
  Chart1.series.items[0].visible = series1.checked; Chart1.draw();
}

marks.onclick = () => {
  Chart1.series.items[0].marks.visible= marks.checked; Chart1.draw();
}

under.onclick = () => {
  setMarksUnder(under.checked);
}

sortby.onchange = () => {
  Chart1.series.items[0].sort= sortby.value; Chart1.draw();
}

order.onclick = () => {
  Chart1.series.items[0].orderAscending= order.checked; Chart1.draw();
}

var Chart1;

draw();

function draw() {
  Chart1=new Chart("canvas");
  Chart1.addSeries(new Pie([5,3,2,7,1], ["c","b","a","d","e"]) );

  Chart1.aspect.clip=false;

  Chart1.title.text="TeeChart for JavaScript";
  Chart1.title.format.font.style="18px Verdana";

  Chart1.legend.format.font.style="16px Courier";
  Chart1.legend.format.stroke.size=10;

  Chart1.footer.text="Fruit";
  Chart1.footer.format.font.style="18px Verdana";

  Chart1.series.items[0].format.stroke.fill="darkgrey";
  Chart1.series.items[0].marks.style="percentlabel";

//  Chart1.series.items[0].format.stroke.fill="";
//  Chart1.series.items[0].format.shadow.visible=false;

//  Chart1.panel.format.gradient.visible=false;
//  Chart1.panel.format.fill="white";
//  Chart1.panel.transparent=true;

  Chart1.series.items[0].marks.ongettext=function(series,index,text) {
    if (index==0) {
      series.marks.format.fill="yellow";
      return text + "\nOK";
    }
    else {
      series.marks.format.fill="beige";
      return text;
    }
  }

  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
}

function setMarksUnder(value) {
  var m=Chart1.series.items[0].marks;
  m.transparent=value;
  m.arrow.underline=value;
  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
}