#!/usr/bin/node
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 20715);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('*', routes.clearLedInterval);
app.get('/', routes.index);
app.get('/transition/:num/:color',routes.transition);
app.get('/transition/:num/:color/:time',routes.transition);
app.get('/set/:num/:color',routes.set);
app.get('/notify/:num',routes.notify);
app.get('/randomdisplay/:num',routes.randomColors);
app.get('/play/:tone/:duration',routes.play);

app.listen(app.get('port'));
