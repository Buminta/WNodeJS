Model = Class.extend({
	init: function(db){
		this.db = db;
	},
	getData: function(){
		return this.db.collection(this.collection);
	}
});