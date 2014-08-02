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
	render: function(template, configs){
		return this.res.render(template, configs);
	},
	newDB: function(name){
		var model = require(__dirname + "/models/" + name +".js");
		return new model(this.req.db);
	}
});