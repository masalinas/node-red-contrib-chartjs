# node-red-contrib-chartjs
Chart.js Node-RED node

![Charts RED Dashboards](https://user-images.githubusercontent.com/1216181/52352347-b4195f00-2a2c-11e9-9f15-ef9f1b781108.png)

## Description
This node permit to use the **Line chart** from [Chart.js](https://www.chartjs.org/) from Node-RED. The objective is create a new node-red path for each chart created, this path could be configured and updated at runtime. Right now **only the line chart** of Chart.js was implemented. In the future will implement the rest of the charts of this library and include serveral channels on the same chart.

## Installation
```
npm install node-red-contrib-chartjs --save
```

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

Dataset Example:
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