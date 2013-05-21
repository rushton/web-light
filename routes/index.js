
var arduino = require('../duino'),
    rgbled = require('./rgbled.js'),
    board = new arduino.Board({debug:false}),
    sound = new arduino.Sound({board:board}), 
    led = new rgbled({board:board,red:3,green:5,blue:6}),
    interval = null;
    

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

function clearLedInterval(req,res,next) {
   clearInterval(interval);
   next();
}
function set(req,res){
   led.set(req.params.color);
   res.send({status: 'success',color:req.params.color});
}

function transition(req,res){
   led.transitionTo(req.params.color);
   res.send({status: 'success',color:req.params.color});
}

function notify(req,res){
   var then = Date.now();
   var isOn = false;
   interval = setInterval(function(){
     led.set(isOn ? 'f0f' : 'fff')
     isOn = !isOn;

     if ((Date.now() - then) > 5000){
        clearInterval(interval);
        res.send({status: 'success'});
     }

   }, 300);
}

function randomColors (req,res) {
   interval = setInterval(function(){
     var color = Math.floor(Math.random()*16777215).toString(16);
     if (color.length >= 6){
        led.transitionTo(color);
     }
   }, 2500);
   res.send({status:'success'});
}

function play (req,res) {
   sound.tone(req.params.tone,req.params.duration);
   res.send({status:'success'});
}
exports.transition = transition;
exports.set = set;
exports.notify = notify;
exports.randomColors = randomColors;
exports.clearLedInterval = clearLedInterval;
exports.play = play;
