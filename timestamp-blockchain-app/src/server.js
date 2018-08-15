const PORT=3000

var express = require('express');
var bodyParser = require('body-parser');

// Initialize application
var app = express();

// Configure parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set path to static files
app.use(express.static(__dirname + '/'));

// Activate routers
var api = require('./proxy');
app.use('/api', api);

app.listen(PORT);
