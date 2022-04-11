import { Chart } from '../../../src/teechart.js';
import { Bubble } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let pointer_style = document.getElementById('pointer_style');

pointer_style.onchange = () => {
  Chart1.series.items[0].pointer.style=pointer_style.value; 
  Chart1.draw();
}

var Chart1;

draw();

function draw() {
  Chart1=new Chart("canvas");

  var bubble=new Bubble();
  Chart1.addSeries(bubble);
  bubble.data.values=[1,4,3,2,5];
  bubble.data.radius=[1.1,0.5,1,0.9,1.5];

  Chart1.title.text="Bubble";
  Demo.changeTheme(Chart1, "minimal");

  Chart1.draw();
}