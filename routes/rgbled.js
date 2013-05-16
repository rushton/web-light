var RgbLed = function(options) {
	if (!options || !options.board) throw new Error('Must supply required options to LED');
	this.board = options.board;
	this.red =   options.red || 3;
    this.green = options.green || 5;
	this.blue =  options.blue || 6;
    this.isCommonAnode = true;
    console.log(this.blue);
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

	console.log(this.isCommonAnode);
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

RgbLed.prototype.transitionTo = function(hex){
    var self = this;
	var fromColors = {red:   this.previousColors.red, 
					  green: this.previousColors.green, 
					  blue:  this.previousColors.blue};
    var toColors = this.hexToRgb(hex);	
	var direction = {red: fromColors.red > toColors.red ? -1 : 1,
					 green: fromColors.green > toColors.green ? -1 : 1,
					 blue: fromColors.blue > toColors.blue ? -1 : 1};
	(function(){
		var interval = setInterval(fadeUp,5);

	    function fadeUp(){
			if (fromColors.red === toColors.red && 
				fromColors.green === toColors.green && 
				fromColors.blue === toColors.blue){ 
				self.previousColors = {red: toColors.red, green: toColors.green, blue: toColors.blue};
				clearInterval(interval); 
				return;
			}	
			for (var key in fromColors){
				if (fromColors[key] !== toColors[key]){
					fromColors[key] += direction[key]; 
					self.board.analogWrite(self[key], fromColors[key]); 
				}
			}
		}
	})();
	
}

module.exports = RgbLed;
