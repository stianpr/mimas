var WebSocketServer = require('websocket').server;
var express = require('express')
var http = require('http');
var app = express();
var server = http.createServer(app);
var pg = require('pg').native;
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

var sentData = {};

wsServer.on('request', function (request) {
  var connection = request.accept('sensor-change', request.origin);

  pg.connect(connString, function (error, client) {
    if (error) {
      console.log(error);
    }

    client.on('notification', function (msg) {
      var parts = msg.payload.split(':');
      var data = {
        type: parts[0],
        value: parts[1],
      };

      if (data.type in sentData && sentData[data.type] == data.value) {
        return;
      }

      connection.sendUTF(JSON.stringify({data: data}));

      sentData[data.type] = data.value;
    });

    client.query("LISTEN sensor_change");
  });
});

console.log('Status app ready');
