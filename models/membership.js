module.exports = Model.extend({
	init: function(db){
		this._super(db);
		this.collection = 'membership';
	},
	addMembership: function(configs){
		var collection = this.getData();
		return collection.insert(configs, {saved: true}, function(err, results){
			console.log(results);
		});
	},
	findMembership: function(user, callback){
		var collection = this.getData();
		return collection.find({user_id: user}).toArray(function(err, results){
			callback(results);
		});
	},
	deleteMembership: function(id){
		
	}
});