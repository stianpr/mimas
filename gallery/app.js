var express = require('express');
var app = express();

app.use('/', require('node-gallery')({
  staticFiles : '../categories',
  urlRoot : 'gallery',
  title : 'Example Gallery'
}));

app.listen(3012, '0.0.0.0');
