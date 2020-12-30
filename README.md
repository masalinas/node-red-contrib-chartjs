# node-red-contrib-chartjs
A Node-RED node to provide charts for plotting things on. Implemented by Chart.js

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

![linea_chart](https://user-images.githubusercontent.com/1216181/52667859-50060780-2f12-11e9-9495-3ad12ad46c4e.png)

* Multi Line Chart
![MultiLinearChart](https://user-images.githubusercontent.com/1216181/103363927-af487300-4abc-11eb-90fc-1c50f9743e2e.png)

* Vertical Bar Chart

![vertical_chart](https://user-images.githubusercontent.com/1216181/52667877-5c8a6000-2f12-11e9-8514-db1e9904afce.png)

* Horizontal Bar Chart

![horizontal_chart](https://user-images.githubusercontent.com/1216181/52667887-62804100-2f12-11e9-9d18-31cf5d7d7f5e.png)

* Pie Chart

![pie_chart](https://user-images.githubusercontent.com/1216181/52667907-6c09a900-2f12-11e9-87ae-63bca2fffb54.png)

* Doughnut Chart

![dought_chart](https://user-images.githubusercontent.com/1216181/52667954-88a5e100-2f12-11e9-8f71-d34454640197.png)

* Polar Area Chart

![polar_chart](https://user-images.githubusercontent.com/1216181/52667940-804da600-2f12-11e9-9e7e-ec90d9aca4fb.png)

* Bubble Chart

![bubble_chart](https://user-images.githubusercontent.com/1216181/52667982-9d827480-2f12-11e9-84dd-aeac63709b80.png)

* Radar Chart

![radar_chart](https://user-images.githubusercontent.com/1216181/52667915-7330b700-2f12-11e9-801e-179dba4707cf.png)

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
The Line Charts dataset could be multi serial graphs like this:
```
[{"channel": "Population",
  "color": "Blue",
  "dataset": [{
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
  }]},
  {"channel": "Economy",
    "color": "Green",
    "dataset": [{
        "x": "Europe",
        "y": 12
    },
    {
        "x": "Australia",
        "y": 13
    },
    {
        "x": "Africa",
        "y": 3
    },
    {
        "x": "America",
        "y": 22
    },
    {
        "x": "Asia",
        "y": 18
    }]}
]                
```

**NOTE: The new multiserial linear chart implementation is compatible with the previous one versions**

The rest of the charts dataset are not multiserial graphs. An example could be like this:
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
