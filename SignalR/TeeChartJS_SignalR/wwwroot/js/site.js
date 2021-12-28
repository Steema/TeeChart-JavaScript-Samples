var $canvas, canvas, chart;

$(function () {
    $canvas = $('#canvas1');
    canvas = $canvas.get(0);
    chart = new Tee.Chart(canvas);
    chart.panel.format.gradient.visible = false;
    chart.panel.format.fill = "";
    chart.walls.back.format.fill = "";
    chart.legend.visible = false;
    chart.title.visible = false;
    chart.panel.format.stroke.fill = "";

    var series = new Tee.Line();
    series.format.shadow.visible = false;
    chart.addSeries(series);

    resizeChart();

    var signalConnection = new signalR.HubConnectionBuilder().withUrl('/signalRHub').build();

    signalConnection.on("SendData", function (data) {
        series.data.values.push(data.value);

        chart.axes.left.automatic = true;
        chart.axes.bottom.automatic = true;
        chart.draw();
    });

    signalConnection.start();

    $(window).resize(function () {
        resizeChart();
    });
});

function resizeChart() {
    var w = $canvas.parent().width();
    var h = $(window).height();
    h -= $('.navbar').outerHeight(true);
    h -= $('main').children().outerHeight(true);
    h -= parseInt($('main').children().first().children().last().css('margin-bottom'));
    h -= parseInt($('main').css('padding-bottom'));
    h -= $('footer').height();
    h -= 50;

    canvas.width = w;
    chart.bounds.width = w;
    canvas.height = h;
    chart.bounds.height = h;

    chart.draw();
}