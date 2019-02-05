var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');

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

        RED.httpNode.get(config.path, this.corsHandler, this.callback, this.errorHandler);
        
        node.on('input', function(msg) {          
            // publish node-red payload to template throw socker.io conenction
            io.emit('msg', { msg: msg });
        });
    }

    RED.nodes.registerType('chartjs', chartjs);    
};