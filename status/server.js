var EventEmitter = require('event-emitter');
var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer();
var pg = require('pg').native;
var connString = 'postgres:///mimas';

server.listen(3000, function () {
    console.log('Listening on ' + server.address().port);
});

var wsServer = new WebSocketServer({
    httpServer: server,
});

var dataEmitter = EventEmitter({});
var sentData = {};

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

    dataEmitter.emit('data', data);
    sentData[data.type] = data.value;
  });

  client.query("LISTEN sensor_change");
});

wsServer.on('request', function (request) {
  var connection = request.accept('sensor-change', request.origin);
  var data;

  for (type in sentData) {
    data = {type: type, value: sentData[type]};
    connection.sendUTF(JSON.stringify(data));
  }

  dataEmitter.on('data', function (data) {
    connection.sendUTF(JSON.stringify(data));
  });
});

console.log('Status app ready');
