
var arduino = require('../duino'),
    board = new arduino.Board({debug:false}),
    led = new arduino.RgbLed({board:board,red:3,green:5,blue:6});

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

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
   var interval = setInterval(function(){
     led.set(isOn ? 'f0f' : 'fff')
     isOn = !isOn;

     if ((Date.now() - then) > 5000){
        clearInterval(interval);
        res.send({status: 'success'});
     }

   }, 300);
}


exports.transition = transition;
exports.set = set;
exports.notify = notify;
