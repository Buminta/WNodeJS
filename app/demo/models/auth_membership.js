var Mongoose = require('mongoose');
module.exports = Model.extend({
	collection: 'auth_membership',
	config: {
		user_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_users', required: true, label: "User"},
		group_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_groups', required: true, label: "Group"},
		create_by: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_users', required: false, hiden: true},
		create_on: { type: Date, required: true, 	default: Date.now, hiden: true},
		modify_on: { type: Date, required: true, 	default: Date.now, hiden: true}
	},
	init: function(){
		this._super();
	},
	addMembership: function(configs){
	},
	findMembership: function(user, callback){
	},
	deleteMembership: function(id){
		
	}
});