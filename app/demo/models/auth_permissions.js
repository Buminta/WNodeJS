var Mongoose = require('mongoose');
module.exports = Model.extend({
	collection: 'auth_permissions',
	config: {
		group_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_groups', required: true, label: "Group"},
		menu_action_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_menu_action', required: true, label: "Action"},
		create_by: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_users', required: false, hide: true},
		create_on: { type: Date, required: true, 	default: Date.now, hide: true},
		modify_on: { type: Date, required: true, 	default: Date.now, hide: true}
	},
	init: function(){
		this._super();
	},
	addPermission: function(configs){
	},
	findPermission: function(group, callback){
		
	},
	checkPermission: function(group, configs, callback){
		
	},
	updatePermission: function(configs){

	},
	deletePermission: function(id){
		
	}
});