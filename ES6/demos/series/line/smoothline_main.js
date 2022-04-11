import { Chart } from '../../../src/teechart.js';
import { Line } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

let series1 = document.getElementById('series1');
let pointer = document.getElementById('pointer');
let factor = document.getElementById('factor');
let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');
let corners = document.getElementById('corners');

let chart1 = new Chart("canvas");
chart1.addSeries(new Line()).addRandom(10);

chart1.series.items[0].smooth = 1 / 2;

chart1.title.text = "Smooth Line";

Demo.changeTheme(chart1, "minimal");
chart1.legend.format.stroke.fill = "black";
chart1.legend.transparent = false;
chart1.legend.visible = true;

var offset = (chart1.axes.left.maximum - chart1.axes.left.minimum) / 10;
chart1.axes.left.setMinMax(chart1.axes.left.minimum - offset, chart1.axes.left.maximum + offset);

chart1.draw();


function setCorners(value) {
    chart1.legend.format.round.x = 12;
    chart1.legend.format.round.y = 12;

    if (value == "all")
        chart1.legend.format.round.corners = null;
    else
        if (value == "top")
            chart1.legend.format.round.corners = [true, true, false, false];
        else
            if (value == "bottom")
                chart1.legend.format.round.corners = [false, false, true, true];
            else
                if (value == "left")
                    chart1.legend.format.round.corners = [true, false, false, true];
                else
                    if (value == "right")
                        chart1.legend.format.round.corners = [false, true, true, false];
                    else {
                        chart1.legend.format.round.x = 0;
                        chart1.legend.format.round.y = 0;
                    }

    chart1.draw();
}


showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}

series1.onclick = () => {
    chart1.series.items[0].visible = series1.checked;
    chart1.draw();
}

pointer.onclick = () => {
    chart1.series.items[0].pointer.visible = pointer.checked;
    chart1.draw();
}

factor.onchange = () => {
    var val = parseFloat(factor.value);
    chart1.series.items[0].smooth = val; 
    chart1.draw();
}

corners.onchange = () => {
    setCorners(corners.value);
}