import { Chart, HorizBar } from '../../../src/teechart.js';
import { Demo } from '../../demo.js';

const showHide1 = document.getElementById('showHide1');
const showHide2 = document.getElementById('showHide2');

const inv = document.getElementById('inv');
const legend = document.getElementById('legend');
const series1 = document.getElementById('series1');
const series2 = document.getElementById('series2');
const useOrigin = document.getElementById('useOrigin');
const margins = document.getElementById('margins');
const gradient1 = document.getElementById('gradient1');
const legendshadow = document.getElementById('legendshadow');
const legendleft = document.getElementById('legendleft');
const coloreach1 = document.getElementById('coloreach1');
const stack = document.getElementById('stack'); 
const barsize = document.getElementById('barsize');
const baroff = document.getElementById('baroff'); 
const barstyle = document.getElementById('barstyle');

const chart1 = new Chart("canvas");

$('#baroff').attr('disabled', true);

chart1.addSeries(new HorizBar([5,3,2,7,1]) );
chart1.addSeries(new HorizBar([4,4,8,2,9]) );

chart1.legend.textStyle="percent";

chart1.series.items[0].cursor = "pointer";

chart1.axes.bottom.title.text = "Fruit";
chart1.axes.left.title.text = "Quantity";
chart1.axes.bottom.grid.centered = true;

chart1.legend.transparent = false;
chart1.legend.format.stroke.fill = "";

chart1.title.text = "Horizontal Bar";
chart1.title.format.font.style = "18px Verdana";

chart1.title.format.font.gradient.visible = true;

Demo.changeTheme(chart1, "minimal");
chart1.draw();

showHide1.onclick = () => {
  Demo.showHide(showHide1);
}

showHide2.onclick = () => {
  Demo.showHide(showHide2);
}

inv.onclick = () => {
  chart1.axes.left.inverted = !chart1.axes.left.inverted; chart1.draw();
}

legend.onclick = () => {
  chart1.legend.visible = !chart1.legend.visible; chart1.draw();
}

series1.onclick = () => {
  chart1.series.items[0].visible = series1.checked; chart1.draw();
}

series2.onclick = () => {
  chart1.series.items[1].visible = series2.checked; chart1.draw();
}

useOrigin.onclick = () => {
  chart1.series.each((s) => { s.useOrigin = useOrigin.checked; }); chart1.draw();
}

margins.onclick = () => {
  chart1.series.each((s) => { s.sideMargins = margins.checked ? 100:0; }); chart1.draw();
}

gradient1.onclick = () => {
  chart1.panel.format.gradient.visible = gradient1.checked; chart1.draw();
}

legendshadow.onclick = () => {
  chart1.legend.transparent = !legendshadow.checked;
  chart1.legend.format.shadow.visible = legendshadow.checked; chart1.draw();
}

legendleft.onclick = () => {
  chart1.legend.position = legendleft.checked ? "left" : "right"; chart1.draw();
}

coloreach1.onclick = () => {
  chart1.series.items[0].colorEach = coloreach1.checked ? 'yes' : 'auto'; chart1.draw();
}

stack.onchange = () => {
  const disabled = !(stack.value === "yes" || stack.value === "100");
  $('#baroff').attr('disabled', disabled);
  chart1.series.each((s) => { s.stacked = stack.value; }); chart1.draw(); // TODO
}

barsize.onchange = () => {
  chart1.series.each((s) => { s.barSize = barsize.value; }); chart1.draw();
}

baroff.onchange = () => {
  chart1.series.each((s) => { s.offset.x = baroff.value;}); chart1.draw();
}

barstyle.onchange = () => {
  chart1.series.each((s) => { s.barStyle = barstyle.value; }); chart1.draw();
}
