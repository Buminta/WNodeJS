module.exports = Model.extend({
	init: function(db){
		this._super(db);
		this.collection = 'groups';
	},
	addGroup: function(configs){
		var collection = this.getData();
		return collection.insert(configs, {saved: true}, function(err, results){
			console.log(results);
		});
	},
	findGroup: function(callback){
		var collection = this.getData();
		return callback(collection.find());
	},
	findGroupOne: function(user_id, callback){
		var collection = this.getData();
		return callback(collection.find({user_id: user_id}).toArray(function(err, results){
			if(results[0]) callback(results[0]);
		}));
	},
	deleteGroup: function(id){
		
	}
});