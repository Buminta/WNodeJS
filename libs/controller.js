var router = require(__dirname + '/router');
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
		return router.getModel(this.req.params.application, name);
	}
}).implement(ViewInterface);