var http = require('http');

var colors = [
'f00', //red
'FF4500', // yellow
'ff0', // orange
'0f0', // green
'0ff', // light-blue
'00f', // blue
'f0f'] // purple

var numPlayers = parseInt(process.argv[2]);

var winner = Math.floor(Math.random() * (numPlayers));

var counter = 0;

var interval = setInterval(scroll, 50);

function scroll(){
   setColor(colors[Math.floor(Math.random() * colors.length)]);
   counter++;
   if (counter > 20)
   {
      clearInterval(interval);
      setTimeouts(500,
         function(){setColor(colors[Math.floor(Math.random() * colors.length)])},
         function(){setColor(colors[Math.floor(Math.random() * colors.length)])},
         function(){setColor(colors[winner])});
   }

}

/**
 * runs any variable number of functions with interval inbetween them
 * @param time - time in milliseconds between each function
 * @rest functions - any number of functions to run in succession
 */
function setTimeouts()
{
  if (arguments.length === 1){ return; }
  var time = arguments[0];
  var args = Array.prototype.slice.call(arguments);
  setTimeout(function(){
     var func = args.splice(1,1)[0];
     func.call()
     setTimeouts.apply(this,args);
  }, time);

} // setTimeouts()

function request(opts,callback){
   var request = http.request(opts,function(response){
         var body = '';
         response.on('data',function(chunk){
            body += chunk;
            });

         response.on('end',function(){
            callback(body);
         })
      });
   request.end();
}

function setColor(hex){
   var opts = {
     host: 'localhost',
     path: '/set/' + hex,
     port: 20715,
     method: 'GET'};
   request(opts,function(){});

}
