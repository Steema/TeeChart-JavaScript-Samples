import { Chart } from '../../src/teechart.js';
import { Line } from '../../src/teechart.js';
import { Demo } from '../demo.js';

let titleExpand = document.getElementById('titleExpand');
let titleAlign = document.getElementById('titleAlign');
let titleShadow = document.getElementById('titleShadow');
let titleTransp = document.getElementById('titleTransp');
let footerExpand = document.getElementById('footerExpand');
let footerAlign = document.getElementById('footerAlign');
let footerShadow = document.getElementById('footerShadow');
let footerTransp = document.getElementById('footerTransp');
let shadow = document.getElementById('shadow');
let border = document.getElementById('border');
let round = document.getElementById('round');
let gradient = document.getElementById('gradient');
let transparent = document.getElementById('transparent');
let showHide1 = document.getElementById('showHide1');
let showHide2 = document.getElementById('showHide2');

let chart1=new Chart('canvas');
chart1.addSeries(new Line([5,3,2,7,1,6,4,5,1,0,10]) ).format.stroke.size=4;

chart1.title.text="Title Text";
chart1.title.format.font.style="18px Verdana";

chart1.subtitle.text="Subtitle Text";
chart1.subtitle.format.font.style="14px Verdana";
chart1.subtitle.format.font.shadow.visible = false;

chart1.footer.text="Footer Text";
chart1.footer.format.font.style="18px Verdana";
chart1.footer.format.font.fill = "rgba(124,124,144,0.9)";
chart1.footer.format.font.shadow.visible = false;

chart1.subfooter.text="Subfooter Text";
chart1.subfooter.format.font.style="14px Verdana";
chart1.subfooter.format.font.shadow.visible = false;

Demo.changeTheme(chart1, "minimal");

chart1.draw();

titleExpand.onclick = () => {
    chart1.title.expand=titleExpand.checked;
    chart1.draw();
}

titleAlign.onchange = () => {
    chart1.title.format.font.textAlign=titleAlign.value;
    chart1.draw();
}

titleShadow.onclick = () => {
    chart1.title.format.shadow.visible=titleShadow.checked;
    chart1.draw();
}

titleTransp.onclick = () => {
    chart1.title.transparent=titleTransp.checked;
    chart1.draw();
}

footerExpand.onclick = () => {
    chart1.footer.expand=footerExpand.checked;
    chart1.draw();
}

footerAlign.onchange = () => {
    chart1.footer.format.font.textAlign=footerAlign.value;
    chart1.draw();
}

footerShadow.onclick = () => {
    chart1.footer.format.shadow.visible=footerShadow.checked;
    chart1.draw();
}

footerTransp.onclick = () => {
    chart1.footer.transparent=footerTransp.checked;
    chart1.draw();
}

shadow.onclick = () => {
    chart1.panel.format.shadow.visible=shadow.checked;
    chart1.draw();
}

border.onclick = () => {
    chart1.panel.format.stroke.fill=border.checked ? '#ff0000' : '';
    chart1.draw();
}

function setRound(round) {
    chart1.panel.format.round.x = round ? 10 : 0;
    chart1.panel.format.round.y = round ? 10 : 0;
    changeTheme(chart1, "minimal");
    chart1.draw();
  }

round.onclick = () => {
    setRound(round.checked);
}

gradient.onclick = () => {
    chart1.panel.format.gradient.visible=gradient.checked;
    chart1.draw();
}

transparent.onclick = () => {
    chart1.panel.transparent=transparent.checked;
    chart1.draw();
}

showHide1.onclick = () => {
    Demo.showHide(showHide1);
}

showHide2.onclick = () => {
    Demo.showHide(showHide2);
}