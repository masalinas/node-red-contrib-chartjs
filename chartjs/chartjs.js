var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');

module.exports = function (RED) {
    "use strict"

    // get RED variables
    var app = RED.httpNode;
    var server = RED.server;
    var settings = RED.settings;

    var paths = [];
    var configs = {};

    var io;
    if (settings.functionGlobalContext.io === undefined) {
        io = require('socket.io')(server);
        settings.functionGlobalContext.io = io;
    } else {
        io = value;
    }

    // add static folders
    app.use('/chartjs/css', serveStatic(path.join(__dirname, "css")));
    app.use('/chartjs/js', serveStatic(path.join(__dirname, "js")));
    app.use('/chartjs/templates', serveStatic(path.join(__dirname, "templates")));

    io.on('connection', function (socket) {
        // get topic from client connection
        var topic = socket.handshake.query.topic;

        io.emit(topic, {config: configs[topic]});

        socket.on('disconnect', function () {
            console.log('user disconnected with topic: ' + topic);
        });

        console.log('a socket connection with id: ' + socket.conn.id + ' from host: ' + socket.conn.remoteAddress + ' and topic:' + topic + ' is created at ' + new Date());
    });

    // ExpressJS and node path API
    function initPaths() {
        paths.forEach(function (path) {
            path.active = false;
        });
    }

    function resumePaths() {
        paths.forEach(function (path) {
            if (path.active == false)
                removePath(path.id);
        });
    }

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

    function removePath(id) {
        var index = paths.findIndex(path => path.id == id);

        if (index !== -1)
            paths.splice(index, 1);

        return index;
    }

    function addPath(id, path) {
        var item = { id: id, path: path, active: true };

        paths.push(item);

        return item;
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

    function chartjsLine(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/line-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        // save config channel
        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsVerticalBar(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/vertical-bar-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsHorizontalBar(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/horizontal-bar-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsPie(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/pie-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsDoughnut(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/doughnut-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsPolar(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/polar-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsBubble(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/bubble-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    function chartjsRadar(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // load default template: line.chart
        var template = fs.readFileSync(__dirname + '/templates/radar-chart.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function (err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function (req, res) {
                res.end(template);
            }

            node.corsHandler = function (req, res, next) {
                next();
            }
        }

        // update expressJS route and update node path
        updatePath(node, config.path);

        configs[config.path] = { title: config.charttitle, xaxis: config.xaxis, yaxis: config.yaxis };

        // trigger on flow input
        node.on('input', function (msg) {
            // publish chart input message
            var red = { msg: msg };

            io.emit(config.path, red);

            // return payload
            node.send(msg);
        });
    }

    RED.nodes.registerType('chartjs-line', chartjsLine);
    RED.nodes.registerType('chartjs-vertical-bar', chartjsVerticalBar);
    RED.nodes.registerType('chartjs-horizontal-bar', chartjsHorizontalBar);
    RED.nodes.registerType('chartjs-pie', chartjsPie);
    RED.nodes.registerType('chartjs-doughnut', chartjsDoughnut);
    RED.nodes.registerType('chartjs-polar', chartjsPolar);
    RED.nodes.registerType('chartjs-bubble', chartjsBubble);
    RED.nodes.registerType('chartjs-radar', chartjsRadar);
};
