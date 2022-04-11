import { Chart, Polar, ToolTip } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';


let aSeries1 = document.getElementById('series1');
let aSeries2 = document.getElementById('series2');
let aTransp = document.getElementById('transp');
let aGradient1 = document.getElementById('gradient1');
let aLegend = document.getElementById('legend');
let aAxes = document.getElementById('axes');
let aDegrees = document.getElementById('degrees');
let aGriddegrees = document.getElementById('griddegrees');
let aValues = document.getElementById('values');
let aGridvalues = document.getElementById('gridvalues');

var Chart1;

aSeries1.onchange = () => {
	Chart1.series.items[0].visible = aSeries1.checked;
	Chart1.draw();
}

aSeries2.onchange = () => {
	Chart1.series.items[1].visible = aSeries2.checked;
	Chart1.draw();
}

aLegend.onchange = () => {
	Chart1.legend.visible = aLegend.checked;
	Chart1.draw();
}

aAxes.onchange = () => {
	Chart1.axes.visible = aAxes.checked;
	Chart1.draw();
}

aDegrees.onchange = () => {
	Chart1.series.items[0].notmandatory.visible = aDegrees.checked;
	Chart1.draw();
}

aGriddegrees.onchange = () => {
	Chart1.series.items[0].notmandatory.grid.visible = aGriddegrees.checked;
	Chart1.draw();
}

aValues.onchange = () => {
	Chart1.series.items[0].mandatoryAxis.visible = aValues.checked;
	Chart1.draw();
}

aGridvalues.onchange = () => {
	Chart1.series.items[0].mandatoryAxis.grid.visible = aGridvalues.checked;
	Chart1.draw();
}


draw();

function draw() {
  Chart1=new Chart("canvas");
  
  Demo.changeTheme(Chart1, "minimal");

  var polar1 = Chart1.addSeries(new Polar()),
      polar2 = Chart1.addSeries(new Polar());

  polar1.addRandom(200);
  polar2.addRandom(60);

  polar1.pointer.visible=false;
  polar2.pointer.visible=false;

  polar1.style="bar";
  polar2.style="bar";

  // PENDING FEATURES POLAR BAR:

  //polar1.stacked="yes";
  //polar2.stacked="yes";

  // Cosmetics:

  Chart1.title.text="Polar Bar Chart";
  Chart1.walls.back.format.gradient.visible=true;
  Chart1.walls.back.format.stroke.fill="green";

  Chart1.axes.bottom.labels.format.font.style="18px Georgia";
  Chart1.axes.bottom.grid.visible=false;
  
  //Chart1.panel.format.gradient.colors=["rgba(255,255,255,1)","rgba(255,255,255,1)"];
  //Chart1.panel.format.gradient.visible=true;
  Chart1.panel.format.shadow.visible=false;
  Chart1.panel.format.stroke.fill="";
  Chart1.panel.format.round.x=0;
  Chart1.panel.format.round.y=0;

  Chart1.tools.add(new ToolTip(Chart1));
  //
  Chart1.draw();
}