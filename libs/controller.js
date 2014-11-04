/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

/*
 * Class interface from View Interface
 * Using extend for controller from application
 */
var router = require(__dirname + '/router');
Controller = Class.extend({
	init: function(req, res){
		this.res = res;
		this.req = req;
	},
	run: function(){
		//Empty function for children
	},
	/*
	 * call action method using from router for call action follow params url
	 */
	callAction: function(action){
		this.run();
		this[action]();
	},
	/*
	 * get model for using from controller with manager collection from database
	 */
	newDB: function(name){
		return router.getModel(this.req.params.application, name);
	}
}).implement(ViewInterface);