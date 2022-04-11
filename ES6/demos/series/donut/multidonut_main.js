import { Chart } from '../../../src/teechart.js';
import { Donut } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let conc = document.getElementById('conc');
let s1 = document.getElementById('s1');
let s2 = document.getElementById('s2');
let s3 = document.getElementById('s3');
let s4 = document.getElementById('s4');
let s5 = document.getElementById('s5');

conc.onchange = () => {
  setConcentric(conc.checked);
}

s1.onchange = () => {
  Chart1.series.items[0].visible= s1.checked; Chart1.draw();
}

s2.onchange = () => {
  Chart1.series.items[1].visible= s2.checked; Chart1.draw();
}

s3.onchange = () => {
  Chart1.series.items[2].visible= s3.checked; Chart1.draw();
}

s4.onchange = () => {
  Chart1.series.items[3].visible= s4.checked; Chart1.draw();
}

s5.onchange = () => {
  Chart1.series.items[4].visible= s5.checked; Chart1.draw();
}

var Chart1;

draw();

function draw() {
  Chart1=new Chart("canvas");

  Chart1.addSeries(new Donut([5,3,2,7,1], ["c","b","a","d","e"]) );
  Chart1.addSeries(new Donut([8,2,6,4,9], ["c","b","a","d","e"]) );
  Chart1.addSeries(new Donut([1,4,4]));
  Chart1.addSeries(new Donut([1,4,4]));
  Chart1.addSeries(new Donut([9,6,1,1]));

  Chart1.title.text="Concentric Donut Series";

  Chart1.series.each(function(s) { s.marks.visible=false; });

  Chart1.legend.legendStyle="values";

  setConcentric(true);
}

function setConcentric(value) {
  if (value) {
    var li=Chart1.series.items, l=li.length, index=0, don=100/(l+1), t;
    for(let t=0; t<l; t++) {
      li[t].concentric=value;

      if (li[t].visible) {
        li[t].donut=don + (index*don);
        index++;
      }
    }
  }
  else
    Chart1.series.each(function(s) { s.donut=50; s.concentric=false; });

  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
}