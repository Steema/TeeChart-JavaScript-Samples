import { Chart, Volume} from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

const showHide1 = document.getElementById('showHide1');
const chart1 = new Chart("canvas");

// Create series:
const volume = chart1.addSeries(new Volume());

volume.hover.stroke.fill = "black";
volume.hover.stroke.size = 1;

// Random data:
var value = Math.random() * 10;
for (var t = 0; t < 200; t++) {
    value += Math.random() * 20 - 10;
    volume.data.values.push(value);
}

// Cosmetics:
chart1.legend.visible = false;
chart1.axes.bottom.title.text = "Session";
chart1.axes.bottom.grid.visible = false;
chart1.axes.left.title.text = "Quantity";
chart1.title.text = "Volume Series";

Demo.changeTheme(chart1, "minimal");
chart1.draw();

showHide1.onclick = () => {
  Demo.showHide(showHide1);
}