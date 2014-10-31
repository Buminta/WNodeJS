var Mongoose = require(__dirname + "/database");

Model = Class.extend({
	config: {},
	colection: null,
	init: function(){
		this.data = this.getData();
	},
	getData: function(){
		try{
			return Mongoose.model(this.collection);	
		}
		catch(e){
			
		}
		return Mongoose.model(this.collection, new Mongoose.Schema(this.config));
	}
});