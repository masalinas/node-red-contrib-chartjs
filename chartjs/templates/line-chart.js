document.addEventListener("DOMContentLoaded", function(event) {
    var socket = io();

    socket.on('msg', function(msg){
        console.log(msg);

        // create chart dataset
        var dataset = {
            label: msg.payload.channel,                        
            backgroundColor: msg.payload.color,
            borderColor: msg.payload.color,
            data: [],
            fill: false
        };

        myChart.config.data.labels = [];
        myChart.config.data.datasets = [];

        msg.payload.dataset.forEach(item => {
            myChart.config.data.labels.push(item.x);
            dataset.data.push(item.y);
        });
                
        myChart.config.data.datasets.push(dataset);

        // refresh chart
        myChart.update();
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