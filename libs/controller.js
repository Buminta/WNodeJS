Controller = Class.extend({
	init: function(req, res){
		this.res = res;
		this.req = req;
	},
	run: function(){
		//Empty function for children
	},
	callAction: function(action){
		this.run();
		this[action]();
	},
	newDB: function(name){
		var model = require(__dirname + "/app/"+this.req.params.application+"/models/" + name +".js");
		return new model();
	}
}).implement(ViewInterface);