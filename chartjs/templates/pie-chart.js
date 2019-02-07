document.addEventListener("DOMContentLoaded", function(event) {
    var topic = window.location.pathname.replace('/', '');

    var socket = io();

    socket.on(topic, function(red){
        console.log(red);

        // update chart dataset
        if (red.msg !== undefined) {
            var dataset = {
                label: red.msg.payload.channel,                        
                backgroundColor: red.msg.payload.color,
                borderColor: red.msg.payload.color,
                data: [],
                fill: false
            };

            chart.config.data.labels = [];
            chart.config.data.datasets = [];

            red.msg.payload.dataset.forEach(item => {
                chart.config.data.labels.push(item.x);
                dataset.data.push(item.y);
            });
                    
            chart.config.data.datasets.push(dataset);

            // refresh chart
            chart.update();
        }

        // update chart configuration
        if (red.config !== undefined) {            
            config.options.title.text = red.config.title;
            config.options.scales['xAxes'][0].scaleLabel.labelString = red.config.xaxis;
            config.options.scales['yAxes'][0].scaleLabel.labelString = red.config.yaxis;

            // refresh chart
            chart.update();
        }
      });

    var ctx = $("#pieChart");

    var config = {
        type: 'pie',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Pie Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Item'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };

    // Global Chart Options
    Chart.defaults.global.defaultFontColor = 'grey';
    Chart.defaults.global.defaultFontSize = 16;

    var chart = new Chart(ctx, config);	
});