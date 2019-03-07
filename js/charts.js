$(function () {
    Chart();
});

var Chart = function () {
    var moyu = JSON.parse(localStorage.getItem("Moyu")) || [];
    var data = [];
    moyu.forEach(item => {
        var m = Math.floor(item.time/60);
        var s = item.time%60;
        m = (m<10)?'0'+m:m;
        s = (s<10)?'0'+s:s;
        var time = m+':'+s;
        data.push({ "name": item.host + "(" +time + ")", "y": item.time });
    });
    Highcharts.chart('container', {
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(200, 200, 255)']
                ]
            },
            borderColor: '#EBBA95',
            borderRadius: 10,
            borderWidth: 2,
            type: 'pie'
        },
        title: {
            text: '今天，你摸鱼了吗？'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>:{point.percentage:.1f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: '停留时间(秒)',
            colorByPoint: true,
            data: data
        }]
    });
}