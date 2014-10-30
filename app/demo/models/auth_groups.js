var Mongoose = require('mongoose');
module.exports = Model.extend({
	collection: 'auth_groups',
	config: {
		name: { type: String, required: true, label: "Name"},
		description: { type: String, required: false, label: "Description"},
		create_by: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_users', required: false, hiden: true},
		create_on: { type: Date, required: true, 	default: Date.now, hiden: true},
		modify_on: { type: Date, required: true, 	default: Date.now, hiden: true}
	},
	init: function(){
		this._super();
	},
	addGroup: function(configs){
	},
	findGroup: function(callback){
	},
	findGroupOne: function(user_id, callback){
	},
	deleteGroup: function(id){
	}
});