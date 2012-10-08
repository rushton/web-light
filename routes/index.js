
var arduino = require('../duino');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

var board = new arduino.Board({debug:false});
var led = new arduino.RgbLed({board:board,red:3,green:5,blue:6});
exports.transition = function(req,res){
    console.log('setting color to: ' + req.params.color);
	led.transitionTo(req.params.color);
	res.send({status: 'success',color:req.params.color});
};

exports.set = function(req,res){
	led.set(req.params.color);
	res.send({status: 'success',color:req.params.color});
};
