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

var connections = [];
var data = {
    temperature: null,
    pressure: null,
    humidity: null,
    rain: null,
    wind: {
        avg: null,
        gust: null,
        direction: null,
    },
};

wsServer.on('request', function (request) {
  var connection = request.accept('sensor-status', request.origin);
  connections.push(connection);

  pg.connect(connString, function (error, client) {
    if (error) {
      console.log(error);
    }

    client.on('notification', function (msg) {
      var parts = msg.split(',');
      var tableName = parts[0];
      var id = parts[2];

      //update_data(tableName, id);
      console.log(msg);

      //connection.sendUTF(JSON.stringify({data: data}));
    });

    client.query("LISTEN sensor_change");
  });

  connection.on('close', function () {
    console.log(connection.remoteAddress + ' disconnected');

    // Remove connections from the pool
    var index = connections.indexOf(connection);
    if (index !== -1) {
      connections.splice(index, 1);
    }
  });
});

console.log('Status app ready');


// setInterval(function () {
//     pg.connect(connString, function (err, client, done) {
//       if (!err) {
//           client.query(
//             'SELECT temperature FROM sensors_temperature ' +
//             'ORDER BY reading_time DESC LIMIT 1',
//                 function (err, result) {
//                     done();
//
//                     if (!err) {
//                         data.temperature = result.rows[0].temperature;
//                     }
//                 }
//             );
//       }
//     });
//
//     pg.connect(connString, function (err, client, done) {
//       if (!err) {
//           client.query(
//             'SELECT humidity FROM sensors_humidity ' +
//             'ORDER BY reading_time DESC LIMIT 1',
//                 function (err, result) {
//                     done();
//
//                     if (!err) {
//                         data.humidity = result.rows[0].humidity;
//                     }
//                 }
//             );
//       }
//     });
//
//     pg.connect(connString, function (err, client, done) {
//       if (!err) {
//           client.query(
//             'SELECT pressure FROM sensors_pressure ' +
//             'ORDER BY reading_time DESC LIMIT 1',
//                 function (err, result) {
//                     done();
//
//                     if (!err) {
//                         data.pressure = result.rows[0].pressure;
//                     }
//                 }
//             );
//       }
//     });
//
//     pg.connect(connString, function (err, client, done) {
//       if (!err) {
//           client.query(
//             'SELECT sum(total) as total FROM sensors_precipitation',
//                 function (err, result) {
//                     done();
//
//                     if (!err) {
//                         data.rain = result.rows[0].total;
//                     }
//                 }
//             );
//       }
//     });
//
//     pg.connect(connString, function (err, client, done) {
//       if (!err) {
//           client.query(
//             'SELECT speed FROM sensors_wind ORDER BY speed DESC LIMIT 1',
//                 function (err, result) {
//                     done();
//
//                     if (!err) {
//                         data.wind.gust = result.rows[0].speed;
//                     }
//                 }
//             );
//       }
//     });
//
//     pg.connect(connString, function (err, client, done) {
//       if (!err) {
//           client.query(
//               'SELECT speed FROM sensors_wind ' +
//               'ORDER BY reading_time DESC LIMIT 1',
//                 function (err, result) {
//                     done();
//
//                     if (!err) {
//                         data.wind.avg = result.rows[0].speed;
//                     }
//                 }
//             );
//       }
//     });
//
// }, 2000);
