# node-red-contrib-chartjs
Chart.js Node-RED nodes

![Charts RED Dashboards](https://user-images.githubusercontent.com/1216181/52432061-cddca400-2b09-11e9-9b83-f6cdae1a75b5.png)

## Description
This nodes package permit to use [Chart.js](https://www.chartjs.org/) **charts** from Node-RED. The objective is create a new url path for each chart created, this url path could be configured and updated at runtime.

For the latest updates see the [CHANGELOG.md](https://github.com/masalinas/node-red-contrib-chartjs/blob/master/CHANGELOG.md)

## Installation
```
npm install node-red-contrib-chartjs --save
```
## Charts implemented
* Line Chart

![line_chart](https://user-images.githubusercontent.com/1216181/52436121-b99da480-2b13-11e9-8f83-7a133ce20547.png)

* Vertical Bar Chart

![vertical_bar_chart](https://user-images.githubusercontent.com/1216181/52436103-aa1e5b80-2b13-11e9-8fc9-ed277f42f935.png)

* Horizontal Bar Chart

![horizontal_chart](https://user-images.githubusercontent.com/1216181/52436083-9c68d600-2b13-11e9-88ef-b9aa16c4aed4.png)

* Pie Chart

![pie_chart](https://user-images.githubusercontent.com/1216181/52436061-8e1aba00-2b13-11e9-98c6-b6a9cccf731a.png)

* Doughnut Chart

![doughnut_chart](https://user-images.githubusercontent.com/1216181/52436030-81966180-2b13-11e9-8f66-1a75c7b5d142.png)

* Polar Area Chart

![polar_chart](https://user-images.githubusercontent.com/1216181/52435997-72171880-2b13-11e9-95f5-cb8bbbe2252e.png)

* Bubble Chart

![buble_chart](https://user-images.githubusercontent.com/1216181/52435974-6592c000-2b13-11e9-92e4-14e00eb9bf5f.png)

* Radar Chart

![radar_chart](https://user-images.githubusercontent.com/1216181/52435935-4f84ff80-2b13-11e9-8f31-0de28c16e425.png)

## Chart configuration
The **Chart attributes** are:
* Path: The Chart Url to be access. An example where path is TP01 could be:
```
http://localhost:1880/TP01
```

* Tittle: The chart title
* X Axis: The X axis label
* Y Axis: The Y axis label
* Payload: The chart dataset object

The **chart payload attributes** are:
* channel: The channel legend
* color: The chart color line
* dataset: The chart dataset

The **payload dataset attributes** are:
* x: x axis dataset value
* y: y axis dataset value

Read node help to check the dataset structure for each chart.
A Line Chart dataset could be like this:
```
{
    "channel": "Population",
    "color": "Green",
    "dataset": [
        {
            "x": "Europe",
            "y": 741
        },
        {
            "x": "Australia",
            "y": 24
        },
        {
            "x": "Africa",
            "y": 1.2
        },
        {
            "x": "America",
            "y": 325
        },
        {
            "x": "Asia",
            "y": 4.4
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
* [socker.io-client](https://github.com/socketio/socket.io-client): Socket.io client side
* [jquery](https://github.com/jquery/jquery): Multipurpose javascript library
* [bootstrap4](https://getbootstrap.com/): Build responsive, mobile-first projects on the web
* [popper.js](https://popper.js.org/): A kickass library used to manage poppers in the web applications
* [Chart.js](https://www.chartjs.org/): Simple yet flexible JavaScript charting for designers & 
developers
* [jsPDF](https://parall.ax/products/jspdf): The leading HTML5 client solution for generating PDFs 

## Example
Under example folder you have a json flow to be imported in your node-red instance to test the nodes.