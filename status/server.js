var WebSocketServer = require('websocket').server;
var express = require('express')
var http = require('http');

var app = express();
var server = http.createServer(app);
var pg = require('pg');
var connString = 'postgres:///mimas';


app.use(express.static(__dirname + "/public"));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', { layout: false });
});

server.on('request', app);

server.listen(3000, function () {
    console.log('Listening on ' + server.address().port);
});

var wsServer = new WebSocketServer({
    httpServer: server,
});

var connections = [];
var num = 1;

var data = {
    temperature: null,
    pressure: null,
    humidity: null,
    rain: null,
    wind: {
        avg: null,
        gust: null
    },
};

setInterval(function () {
    pg.connect(connString, function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }

      client.query(
        'SELECT temperature FROM sensors_temperature ' +
        'ORDER BY reading_time DESC LIMIT 1',
            function (err, result) {
                done();

                if (err) {
                    return console.error('error running query', err);
                }

                data.temperature = result.rows[0].temperature;
            }
        );
    });
}, 2000);

wsServer.on('request', function(request) {
    var connection = request.accept('sensor-status', request.origin);
    connections.push(connection);

    console.log(
        connection.remoteAddress +
        " connected - Protocol Version " +
        connection.webSocketVersion
    );

    setInterval(function () {
        connection.sendUTF(JSON.stringify({data: data}));
    }, 2000);

    connection.on('close', function() {
        console.log(connection.remoteAddress + ' disconnected');

        // Remove connections from the pool
        var index = connections.indexOf(connection);
        if (index !== -1) {
            connections.splice(index, 1);
        }
    });
});

console.log('Status app ready');
