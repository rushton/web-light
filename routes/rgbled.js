var RgbLed = function(options) {
	if (!options || !options.board) throw new Error('Must supply required options to LED');
	this.board = options.board;
	this.red =   options.red || 3;
    this.green = options.green || 5;
	this.blue =  options.blue || 6;
    this.isCommonAnode = false;
    this.board.pinMode(this.red,'out');
    this.board.pinMode(this.green,'out');
    this.board.pinMode(this.blue,'out');
	var initValue = this.isCommonAnode ? 255 : 0;
	this.previousColors = {red: initValue,
						   green: initValue, 
						   blue: initValue};
} // RgbLed

RgbLed.prototype.hexToRgb = function (hex){
	if (hex.length != 6 && hex.length != 3) { return; }
	
	// handle condensed version of color hex
	if (hex.length === 3){
		var hexArray = [];
		hexArray.push(hex[0] + hex[0]);
		hexArray.push(hex[1] + hex[1]);
		hexArray.push(hex[2] + hex[2]);
		hex = hexArray.join('');
    }

   var inverse = this.isCommonAnode ? 255 : 0;
	var r = Math.abs(parseInt(hex[0] + hex[1], 16));
	var g = Math.abs(parseInt(hex[2] + hex[3], 16));
	var b = Math.abs(parseInt(hex[4] + hex[5], 16));
	
	return {red:r,green:g,blue:b};

} // hexToRgb()
/**
 * @param string - hex value to set
 */
RgbLed.prototype.set = function (hex) {

	var rgb = this.hexToRgb(hex);
	this.board.analogWrite(this.red, rgb.red);
	this.board.analogWrite(this.green, rgb.green);
	this.board.analogWrite(this.blue, rgb.blue);

	this.previousColors = {red: rgb.red, green: rgb.green, blue: rgb.blue};
} // set

RgbLed.prototype.transitionTo = function(hex, time){
   var self = this;
   time = time || 1000;
   time_counter = 0;
   var toColors = this.hexToRgb(hex);	
	var from = [this.previousColors.red,
	            this.previousColors.green,
	            this.previousColors.blue];
	var to = [toColors.red,
		       toColors.green,
		       toColors.blue]
   this.previousColors = toColors
	var interval = setInterval(function(){
      var percent = time_counter / time;
      var new_rgb = interpolate_rgb(from, to, percent);
      self.board.analogWrite(self.red, new_rgb[0]);  
      self.board.analogWrite(self.green, new_rgb[1]);  
      self.board.analogWrite(self.blue, new_rgb[2]);  
      if (time_counter >= time) {
         clearInterval(interval)
      }  
      time_counter += 5 
   },5);

	
}
function interpolate_rgb(rgb_start, rgb_target, percent){
    percent = Math.min(1, percent)
    return [Math.abs(Math.floor(rgb_start[0] + ((rgb_target[0] - rgb_start[0])*percent))),
           Math.abs(Math.floor(rgb_start[1] + ((rgb_target[1] - rgb_start[1])*percent))),
           Math.abs(Math.floor(rgb_start[2] + ((rgb_target[2] - rgb_start[2])*percent)))]
}
module.exports = RgbLed;
