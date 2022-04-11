import { Chart, Gantt, Format } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

const marks = document.getElementById('marks');
const colors = document.getElementById('colors');
const completion = document.getElementById('completion');


var Chart1, gantt;

draw();

marks.onclick = () => {
	gantt.marks.visible= marks.checked; Chart1.draw();
}

colors.onclick = () => {
	gantt.colorEach= colors.checked ? 'yes' : 'auto'; Chart1.draw();
}

completion.onclick = () => {
	gantt.completion.visible= completion.checked; Chart1.draw();
}


function draw() {
  Chart1=new Chart("canvas");

  // Create series:
  gantt=Chart1.addSeries(new Gantt());

  // Sample data:
  gantt.add(0, "Production", new Date(2012, 5, 21), new Date(2012, 5, 29) );
  gantt.add(1, "Marketing", new Date(2012, 9, 3), new Date(2012, 11, 10) );
  gantt.add(2, "Approve", new Date(2012, 3, 13), new Date(2012, 3, 31) );
  gantt.add(3, "Prototype", new Date(2012, 6, 7), new Date(2012, 7, 5) );
  gantt.add(4, "Evaluation", new Date(2012, 10, 11), new Date(2012, 11, 5) );
  gantt.add(5, "Design", new Date(2012, 4, 2), new Date(2012, 4, 29) );
  gantt.add(2, "Testing", new Date(2012, 8, 1), new Date(2012, 11, 7) );

  // Example:
  // Add custom data to display at each gantt bar, for example: "Completion %"

  gantt.data.completion=[20, 40, 10, 75, 55, 60, 25];

  gantt.completion=new Format(gantt.chart);
  gantt.completion.stroke.fill="";
  //gantt.completion.shadow.visible=true;
  //gantt.completion.gradient.visible=true;
  gantt.completion.fill = "transparent";
  gantt.completion.visible=true;
  gantt.completion.font.fill="black";
  gantt.completion.font.shadow.visible=true;

  // Use the series onDraw event to paint completion data:

  gantt.ondraw=function(g) {
    if (!g.completion.visible) return;

    var r={ x:0,y:0,width:0,height:0 },
        t=0,
        len=g.count();

    g.completion.round=g.format.round;
    g.completion.font.prepare();

    for(; t<len; t++) {

      // Calculate bounds of each gantt bar:

      g.bounds(t,r);
      r.y+=5;
      r.height-=8;
      r.width=g.mandatoryAxis.calcSize(g.data.end[t]-g.data.start[t]);

      // Draw completion bar:

      g.completion.rectangle(r);

      // Paint % text:

      r.y+= 0.5*(r.height+g.completion.font.getSize());
      g.completion.drawText(r,g.data.completion[t]+"%");
      r.y-=r.height*0.5;
    }
  }

  // Example, change a specific gantt bar color:
  //gantt.palette.colors=new Array();
  //gantt.palette.colors[3]="orange";

  // Cosmetics:

  gantt.height=60; // 60% height
  gantt.colorEach="yes";
  gantt.marks.visible=false;
  gantt.marks.format.transparency=0.1;

  gantt.hover.stroke.fill="blue";

  // Chart options:

  Chart1.scroll.direction="horizontal";
  Chart1.zoom.direction="horizontal";

  Chart1.legend.visible=false;

  Chart1.axes.bottom.title.text="Time";
  Chart1.axes.bottom.labels.dateFormat="mediumDate";

  Chart1.axes.left.title.text="Task";
  Chart1.axes.left.grid.centered=true;
  Chart1.axes.left.increment=1;
  Chart1.axes.left.labels.labelStyle="text";

  Chart1.title.text="Gantt Series";

  // Custom draw text on chart:

  Chart1.ondraw=function() {
    var MSECSDAY=86400000,
        a=Chart1.axes.bottom,
        days=Math.round((a.maximum-a.minimum)/MSECSDAY);

    Chart1.ctx.textAlign="start";
    Chart1.ctx.fillText("Total Range: "+days+" days",20,10);
  }

  Demo.changeTheme(Chart1, "minimal");
  Chart1.draw();
}