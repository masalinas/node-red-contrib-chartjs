# node-red-contrib-chartjs
Chart.js Node-RED node

![Charts RED Dashboards](https://user-images.githubusercontent.com/1216181/52432061-cddca400-2b09-11e9-9b83-f6cdae1a75b5.png)

## Description
This node permit to use **Charts** from [Chart.js](https://www.chartjs.org/) from Node-RED. The objective is create a new node-red path for each chart created, this path could be configured and updated at runtime.

## Installation
```
npm install node-red-contrib-chartjs --save
```
## Chart implemented
* Line Chart
![line_chart](https://user-images.githubusercontent.com/1216181/52431585-ccf74280-2b08-11e9-918d-5866e2b16f34.png)
* Vertical Bar Chart
![vertical_bar_chart](https://user-images.githubusercontent.com/1216181/52431635-e8fae400-2b08-11e9-9277-200e801e92ac.png)
* Horizontal Bar Chart
![horizontal_chart](https://user-images.githubusercontent.com/1216181/52431660-f44e0f80-2b08-11e9-8f2d-8dad3c613174.png)
* Pie Chart
![pie_chart](https://user-images.githubusercontent.com/1216181/52431693-0760df80-2b09-11e9-9908-618a1de91cc3.png)
* Doughnut Chart
![doughnut_chart](https://user-images.githubusercontent.com/1216181/52431731-16479200-2b09-11e9-8d75-cbdfb14e9be8.png)
* Polar Area Chart
![polar_chart](https://user-images.githubusercontent.com/1216181/52431755-28c1cb80-2b09-11e9-8b7e-f8a589be254f.png)
* Bubble Chart
![bubble_chart](https://user-images.githubusercontent.com/1216181/52431779-35462400-2b09-11e9-8ea6-83b6fabf46f8.png)
* Radar Chart
![radar_chart](https://user-images.githubusercontent.com/1216181/52431820-47c05d80-2b09-11e9-9709-49fec1643e2e.png)

## Chart configuration
The **Chart attributes** are:
* Path: The Chart path to be access
* Tittle: The tittle of the chart
* X Axis: The X axis name
* Y Axis: The Y axis name
* Payloas: The dataset to be drawed

The **Chart Payload attributes** are:
* channel: channel label legend name
* color: color of the chart line
* dataset: dataset array. 

The **Payload attributes** are:
* x: x axis dataset value
* y: y axis dataset value

Check the node help to know the Dataset structure for each chart
A Line Chart dataset could be like this:
```
{
    "channel": "TP01",
    "color": "Red",
    "dataset": [
        {
            "x": 1,
            "y": 10
        },
        {
            "x": 2,
            "y": 8
        },
        {
            "x": 3,
            "y": 15
        },
        {
            "x": 4,
            "y": 10
        },
        {
            "x": 5,
            "y": -2
        }
    ]
}
```

## Dependencies
### Server side
* [socker.io](https://github.com/socketio/socket.io): socket.io server side
* [serve-static](https://github.com/expressjs/serve-static): Serve static files
* [cors](https://github.com/expressjs/cors): Node.js CORS middleware

### Client side
* [socker.io-client](https://github.com/socketio/socket.io-client): socket.io client side
* [jquery](https://github.com/jquery/jquery): multipurpose javascript library
* [Chart.js](https://www.chartjs.org/): Simple yet flexible JavaScript charting for designers & developers

## Example
Under example folder you have all json flows to be imported in your node-red instance and test the node.