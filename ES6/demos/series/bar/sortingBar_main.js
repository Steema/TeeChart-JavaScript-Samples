import { Chart, Bar, Annotation, SeriesAnimation, ToolTip, FadeAnimation } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

const showHide1 = document.getElementById('showHide1');
const showHide2 = document.getElementById('showHide2');
const theme = document.getElementById('theme');
const sorted = document.getElementById('sorted');
const ascend = document.getElementById('ascend');

const chart1 = new Chart("canvas");
const bar1 = new Bar();
const range1 = 20;
var animation;

draw();

function drawSortedValues(sorted) {
	if(animation&&!animation.running) chart1.series.items[0].drawSortedValues(sorted);
}

function draw() {
	chart1.panel.margins.top = 12;

	bar1.title = "Values";
	bar1.data.values[0] = Math.random() * range1 + 5;
	bar1.data.labels[0] = "A";

	for (var t = 1; t < 26; t++) {
		var av1 = bar1.data.values[t - 1] + (Math.random() * range1) - (range1 * 0.5);
		if (av1 < 0) av1 = av1 * -1;
		if (av1 > 100) av1 = av1 - 20;
		bar1.data.values[t] = av1
		bar1.data.labels[t] = String.fromCharCode(65 + t);
	}

	bar1.sortedOptions.sortingAnimationType = "horizontalchange";
	bar1.sortedOptions.sortedDrawAnimation.duration = 500;
	chart1.axes.bottom.labelStyle = "text";

	chart1.addSeries(bar1);

	//config some series appearance characteristics
	for (var i = 0; i < 1; i++) {
		chart1.series.items[i].format.gradient.visible = false;
		chart1.series.items[i].format.stroke.fill = "rgba(0,0,0,0.0)";
		chart1.series.items[i].format.shadow.visible = false;
		chart1.series.items[i].marks.visible = false;
		chart1.series.items[i].barSize = 80;
		chart1.series.items[i].hover = false;
	}

	Demo.changeTheme(chart1, "minimal");
	chart1.draw();

	showHide1.onclick = () => {
		Demo.showHide(showHide1);
	}

	showHide2.onclick = () => {
		Demo.showHide(showHide2);
	}

	sorted.onclick = () => {
		//if (animation.active && !animation.running) {
			drawSortedValues(sorted.checked);
			//chart1.series.items[0].drawSortedValues(sorted.checked);
			chart1.draw();
		//}
	}

	ascend.onclick = () => {
		chart1.series.items[0].sortedOptions.ascending = ascend.checked; chart1.draw();
	}

	function changeTheme(aTheme) {
		chart1.applyTheme(aTheme);
		for (i = 0; i < 2; i++) {
			chart1.series.items[i].pointer.format.stroke.fill = "white";
		}
		resize(chart1);
		chart1.draw();
	}

	//Axes
	chart1.axes.left.title.text = "Values";
	chart1.axes.left.labels.roundFirst = true;
	chart1.axes.bottom.labels.roundFirst = true;
	chart1.axes.bottom.title.text = "Labels";
	chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
	chart1.axes.bottom.title.format.font.setSize(20);
	//chart1.axes.bottom.title.visible=false;  
	//chart1.axes.left.increment=3;
	chart1.axes.left.grid.format.stroke.size = 1;
	chart1.axes.left.ticks.visible = false;
	chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
	chart1.axes.bottom.format.stroke.size = 1;
	//Title
	chart1.title.visible = false;
	chart1.title.text = "Sorting Bar";

	//Legend
	chart1.legend.position = "left";

	// annotation (alternative title)
	const a1 = new Annotation(chart1);
	a1.format.fill = "rgba(0,0,0,0.0)";
	a1.format.stroke.fill = "rgba(0,0,0,0.0)";
	a1.format.font.style = "20px Tahoma";
	a1.format.font.fill = "rgba(0,0,0,0.6)";
	a1.text = "Sales figures";
	chart1.draw(); //get position
	a1.position.x = chart1.axes.bottom.calc(chart1.axes.bottom.minimum);
	a1.position.y = 8;
	chart1.tools.add(a1);

	//animation
	/*const animation = new SeriesAnimation();
	animation.duration = 900;
	animation.kind = "each";
	animation.mode = "linear";
	animation.animate(chart1);

	const fadeAnimation = new FadeAnimation();
	fadeAnimation.duration = 500;
	fadeAnimation.fade.series = true;
	fadeAnimation.fade.marks = true;
	fadeAnimation.mode = "linear";
	animation.items.push(fadeAnimation);*/
	
	//animation
	animation = new SeriesAnimation();
	animation.duration = 1000;
	animation.kind = "each";
	let fadeAnimation = new FadeAnimation();
	fadeAnimation.duration = 900;
	fadeAnimation.fade.series = true;
	fadeAnimation.fade.marks = true;
	animation.mode = "linear"; 
	fadeAnimation.mode = "linear";
	animation.items.push(fadeAnimation);
	
	animation.animate(chart1);
	

	//tooltip
	const tip = new ToolTip(chart1);
	tip.render = "dom";
	tip.autoHide = true;
	tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
	tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
	tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

	chart1.tools.add(tip);

	tip.onhide = function() { let scaling = 0; let poindex = -1; }

	tip.ongettext = function(tool, text, series, index) {
		var s = '<font face="verdana" color="black" size="1"><strong>' + series.title + '</strong></font>';
		s = s + '<br/><font face="verdana" color="darkblue" size="1">Series point: <strong>' + series.data.labels[index] + '</strong></font>';
		s = s + '<br/><font face="verdana" color="red" size="1">Value: ' + series.data.values[index].toFixed(2) + '</font>';
		return s;
	}
	
	chart1.draw();
}