document.addEventListener("DOMContentLoaded", function(event) {
    var socket = io();

    var topic = window.location.pathname.replace('/', '');

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

            myChart.config.data.labels = [];
            myChart.config.data.datasets = [];

            red.msg.payload.dataset.forEach(item => {
                myChart.config.data.labels.push(item.x);
                dataset.data.push(item.y);
            });
                    
            myChart.config.data.datasets.push(dataset);

            // refresh chart
            myChart.update();
        }

        // update chart configuration
        if (red.config !== undefined) {            
            myChart.config.options.title.text = red.config.title;
            myChart.config.options.scales['xAxes'][0].scaleLabel.labelString = red.config.xaxis;
            myChart.config.options.scales['yAxes'][0].scaleLabel.labelString = red.config.yaxis;

            // refresh chart
            myChart.update();
        }
      });

    //var ctx = document.getElementById("myChart");
    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Line Chart'
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
    });	
});