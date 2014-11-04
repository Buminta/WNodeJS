/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */
/*
 * Using mongoose for create model and to do extend from Models config
 */
var Mongoose = require(__dirname + "/database");

Model = Class.extend({
	config: {},
	colection: null,
	init: function(){
		this.data = this.getData();
	},
	getData: function(){
		// Create new Schema if it not valid or return it if valid.
		try{
			return Mongoose.model(this.collection);	
		}
		catch(e){
			return Mongoose.model(this.collection, new Mongoose.Schema(this.config));
		}
	}
});