import { Chart, Pie, Annotation } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

draw();

var Chart1;

const pie1 = document.getElementById('s1');
const pie2 = document.getElementById('s2');
const pie3 = document.getElementById('s3');
const pie4 = document.getElementById('s4');
const pie5 = document.getElementById('s5');

pie1.onclick = () => { enablePie(0,pie1); }
pie2.onclick = () => { enablePie(1,pie2); }
pie3.onclick = () => { enablePie(2,pie3); }
pie4.onclick = () => { enablePie(3,pie4); }
pie5.onclick = () => { enablePie(4,pie5); }

function enablePie(aPie,aCheckbox)
{
	Chart1.series.items[aPie].visible= aCheckbox.checked; Chart1.draw();
}

function draw() {
  Chart1=new Chart("canvas");
  
  Chart1.addSeries(new Pie([5,3,2,7,1], ["c","b","a","d","e"]) );
  Chart1.addSeries(new Pie([8,2,6,4,9], ["c","b","a","d","e"]) );
  Chart1.addSeries(new Pie([1,4,4]));
  Chart1.addSeries(new Pie([1,4,4]));
  Chart1.addSeries(new Pie([9,6,0,1]));

  Chart1.series.each(function(s) { s.marks.visible=false; });

  Chart1.title.text="Multiple Pie Series";
  
  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
}