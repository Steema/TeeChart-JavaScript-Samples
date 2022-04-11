/*<script src="../../../src/teechart.js" type="text/javascript"></script>
<script src="../../../src/teechart-extras.js" type="text/javascript"></script>
<script src="../../../src/teechart-extras.js" type="text/javascript"></script>
<script src="../../3rd_party/jquery/js/jquery-1.7.1.min.js"></script>
<script src="../../demo.js" type="text/javascript"></script>*/

import { Chart } from '../../../src/teechart.js';
import { Line } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';
import { Format } from '../../../src/teechart.js';

let showHide1 = document.getElementById('showHide1');

let chart1 = new Chart("canvas");
chart1.addSeries(new Line()).pointer.visible = true;
chart1.addSeries(new Line()).pointer.visible = true;
chart1.addSeries(new Line()).pointer.visible = true;

chart1.series.each(function (s) { s.addRandom(20); });

chart1.legend.format.image.url = "../../images/metal.jpg";

chart1.title.text = "Line and Point";

Demo.changeTheme(chart1, "minimal");

chart1.ondraw = function () {

    chart1.ctx.save();
    chart1.aspect.clipRect(chart1.chartRect);
    for (var i = 0; i < this.series.items[0].count(); i++) {
        var xValue;
        if (this.series.items[0].data.x != null) //if x values populated
            xValue = this.axes.bottom.calc(this.series.items[0].x.values[i]);
        else
            xValue = this.axes.bottom.calc(i);
        var ys = this.axes.left.calc(this.series.items[0].data.values[i]);
        var f = new Format(this);
        //with the location information you can output any information or drawing
        //object you require. You could read in the original Pointer specification/size/color, etc
        //This is a simple example:
        if (i > 6)  //add a condition of your choice
            f.ellipse(xValue, ys, 10, 10);
        //or
        //f.rectangle(xValue-5,ys-5,10,10);
    }
    chart1.ctx.restore();
}

chart1.draw();

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}