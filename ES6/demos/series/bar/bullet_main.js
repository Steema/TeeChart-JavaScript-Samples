import { Chart } from '../../../src/teechart.js';
import { Bullet } from '../../../src/teechart.js';
import { Annotation } from '../../../src/teechart.js';
import { SeriesAnimation } from '../../../src/teechart.js';
import { FadeAnimation } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

var Chart1, Chart2, Chart3;

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
	Chart1 = new Chart("canvas1");
	var bullet = new Bullet([35]);
	bullet.limit.color = "darkblue";
	Chart1.addSeries(bullet);
	Chart1.axes.bottom.setMinMax(0, 50);
	Chart1.series.items[0].format.gradient.visible = false;
	Chart1.series.items[0].format.shadow.visible = false;
	Chart1.series.items[0].format.stroke.fill = "rgba(0,0,0,0)";
	Demo.changeTheme(Chart1, "minimal");
	//Chart1.applyPalette("windowsxp");
	//resize(Chart1);

	let animation = new SeriesAnimation();
	animation.duration = 900;
	animation.kind = "each";
	let fadeAnimation = new FadeAnimation();
	fadeAnimation.duration = 500;
	fadeAnimation.fade.series = true;
	fadeAnimation.fade.marks = true;
	animation.mode = "linear";
	fadeAnimation.mode = "linear";
	animation.items.push(fadeAnimation);
	animation.animate(Chart1);

	Chart2 = new Chart("canvas2");
	var bullet2 = new Bullet([45]);
	Chart2.addSeries(bullet2);
	bullet2.states.colors = ["green", "yellow","red"];
	bullet2.states.values = [30, 20, 10];
	bullet2.states.barSize = 60;
	bullet2.states.gradientVisible = false;

	bullet2.limit.origin = 52;
	bullet2.limit.height = 45;
	bullet2.limit.width = 0.5;
	bullet2.limit.color = "black";

	Chart2.axes.bottom.setMinMax(0, bullet2.maxValue());
	
	Chart2.series.items[0].format.gradient.visible = false;
	Chart2.series.items[0].format.shadow.visible = false;
	Chart2.series.items[0].format.stroke.fill = "rgba(0,0,0,0)";
	Demo.changeTheme(Chart2, "minimal");
	Chart2.zoom.reset();
	//Chart2.applyPalette("cool");
	//resize(Chart2);

	let animation2 = new SeriesAnimation();
	animation2.duration = 900;
	animation2.kind = "";
	animation2.items.push(fadeAnimation);
	animation2.animate(Chart2);

	Chart3 = new Chart("canvas3");
	var bullet3 = new Bullet([65]);
	Chart3.addSeries(bullet3);
	bullet3.states.colors = ["#111", "#666", "#CCC"];
	bullet3.states.values = [10, 20, 30];
	bullet3.states.barSize = 60;
	bullet3.states.gradientVisible = true;

	bullet3.limit.origin = 52;
	bullet3.limit.height = 45;
	bullet3.limit.width = 0.3;
	bullet3.limit.color = "darkblue";

	bullet3.origin = 20;

	Chart3.axes.bottom.setMinMax(0, bullet3.maxValue());

	Chart3.series.items[0].format.gradient.visible = false;
	Chart3.series.items[0].format.shadow.visible = false;
	Chart3.series.items[0].format.stroke.fill = "rgba(0,0,0,0)";
	Demo.changeTheme(Chart3, "minimal");
	//Chart3.applyPalette("windowsxp");
	Chart3.zoom.reset();
	//resize(Chart3);

	let animation3 = new SeriesAnimation();
	animation3.duration = 900;
	animation3.kind = "left";
	animation3.items.push(fadeAnimation);
	animation3.animate(Chart3);
}