import { Chart } from '../../../src/teechart.js';
import { Donut } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let gradient = document.getElementById('gradient1');
let shadow = document.getElementById('shadow');
let marks = document.getElementById('marks');

var Chart1;

draw();

function draw() {
  Chart1=new Chart("canvas");
  Chart1.addSeries(new Donut([7,5,1,3,4]));

  // Explode 30% the second donut slice:
  Chart1.series.items[0].explode=[0,30,0,0,0];

  Chart1.title.text="Donut";
  Chart1.title.format.font.style="18px Verdana";
  Chart1.title.format.font.gradient.visible=true;

  Chart1.legend.title.text="Legend Title";
  Chart1.legend.title.format.font.fill="blue";

  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
}

gradient.onchange = () => {
  Chart1.series.items[0].format.gradient.visible = gradient.checked; 
  Chart1.draw();
}

shadow.onchange = () => {
  Chart1.series.items[0].format.shadow.visible=shadow.checked; Chart1.draw();
}

marks.onchange = () => {
  Chart1.series.items[0].marks.visible=marks.checked; 
  Chart1.draw();
}