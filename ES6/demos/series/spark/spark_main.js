import { Chart, Line, Pie, Bar, CursorTool, Format } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';


draw();


function hideAxis(a) {
  a.format.stroke.fill="";
  a.labels.visible=false;
  a.grid.visible=false;
  a.ticks.visible=false;
}

function cleanChart(c) {
  c.title.visible=false;
  c.panel.transparent=true;
  c.legend.visible=false;
  c.walls.back.visible=false;

  hideAxis(c.axes.left);
  hideAxis(c.axes.bottom);
}

function draw() {
  var c, chart, pie, bar, seriesBar, seriesPie, cursor;

  for(c=1; c<=5; c++) {
     // Lines
     chart=new Chart("c"+c);
     cleanChart(chart);

     chart.addSeries(new Line()).addRandom(100);

     cursor=chart.tools.add(new CursorTool(chart));
     cursor.render="full";
     cursor.direction="vertical";

     chart.draw();

     // Pie
     pie=new Chart("p"+c);
     cleanChart(pie);

     seriesPie=pie.addSeries(new Pie());
     seriesPie.addRandom(4);
     seriesPie.marks.visible=false;

     seriesPie.format.shadow.visible=false;
     seriesPie.format.shadow.width=2;
     seriesPie.format.shadow.height=2;

     seriesPie.format.stroke.fill="";
     seriesPie.format.gradient.visible=false;

     pie.draw();

     // Bars
     bar=new Chart("b"+c);
     cleanChart(bar);

     seriesBar=bar.addSeries(new Bar());
     seriesBar.addRandom(4);
     seriesBar.format.stroke.fill="";
     seriesBar.format.gradient.visible=false;
     seriesBar.format.shadow.visible=false;
     seriesBar.marks.visible=false;
     
     bar.draw();
  }
}

function resizeSparkLines() {
    var canvas = $('canvas')[0];
    var xContentStyle = window.getComputedStyle(canvas.closest('.x_content'), null);
    var w = parseFloat(xContentStyle.width);
    w -= parseFloat(xContentStyle.paddingLeft) + parseFloat(xContentStyle.paddingRight) + parseFloat(xContentStyle.borderLeftWidth) + parseFloat(xContentStyle.borderRightWidth);

    $(canvas.parentElement).siblings().each(function () {
        w -= parseFloat(window.getComputedStyle($(this)[0], null).width);
	});

    var parentStyle = window.getComputedStyle(canvas.parentElement, null);
    w -= parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight) + parseFloat(parentStyle.borderLeftWidth) + parseFloat(parentStyle.borderRightWidth);
    w -= 20;

    $('canvas[id^="c"]').each(function () {
        var chart = $(this)[0].chart;
        if (chart) {
            chart.canvas.width = w;
            chart.bounds.width = w;
            chart.draw();
		}
    })
}

$(function () {
    $(window).unbind("load");
    $(window).unbind("resize");

    $(window).load(function () {
        resizeSparkLines();
    });

    $(window).resize(function () {
        if( navigator.platform && !/iPad|iPhone|iPod/.test(navigator.platform) )
            resizeSparkLines();
    })
});
