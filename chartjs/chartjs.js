var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');

var DEF_PATH = 'charts';
var paths = [];

module.exports = function(RED) {
    "use strict"

    // get RED variables
    var app = RED.httpNode;
    var server = RED.server;
    var settings = RED.settings;
     
    // configure socker.io server
    var io = require('socket.io')(server);
    
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });

    // set static paths
    app.use('/', serveStatic(path.join(__dirname, "js")));
    app.use('/', serveStatic(path.join(__dirname, "templates")));

    // ExpressJS and node path API
    function getPath(id) {
        return paths.find(path => path.id === id)
    }

    function updatePath(node, path) {
        var item = getPath(node.id);

        if (item !== undefined) {
            removeRoute(item.path);

            addRoute('/' + path, node.corsHandler, node.callback, node.errorHandler);

            item.path = path;
        } else {
            addRoute('/' + path, node.corsHandler, node.callback, node.errorHandler);
            
            addPath(node.id, path);
        }

        return item;
    }
    
    function addPath(id, path) {
        var item = {id: id, path: path};

        paths.push(item);

        return item;
    }

    function getRoute(path) {
        var route = null;

        app._router.stack.forEach(function(item) {
            if (item.route !== undefined && item.route.path == path)
                route = item.route;                
        });

        return route;
    }

    function removeRoute(path) {
        var index = app._router.stack.findIndex(item => item.route !== undefined && item.route.path == '/' + path);

        if (index !== -1)
            app._router.stack.splice(index, 1);
                
        return index;
    }

    function addRoute(path, corsHandler, callback, errorHandler) {
        app.get(path, corsHandler, callback, errorHandler);
    }

    function chartjs(config) {        
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template: line.chart
        var template = fs.readFileSync(__dirname + '/templates/line-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            this.errorHandler = function(err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            this.callback = function(req, res) {
                res.end(template);
            } 

            this.corsHandler = function(req, res, next) { 
                next(); 
            }               
        }  

        // update expressJS route and update node path
        updatePath(node, config.path);

        // publish chart configurations        
        var config = {title: config.charttitle, xaxis: config.xaxis, yaxis : config.yaxis};
        var red = {config: config};

        var item = getPath(node.id);
        io.emit(item.path, red);

        // trigger on flow input
        node.on('input', function(msg) {   
            var item = getPath(node.id);

            // publish chart input message
            var red = {msg: msg};

            io.emit(item.path, red);

            // return payload
            node.send(msg);
        });
    }

    RED.nodes.registerType('chartjs', chartjs);    
};