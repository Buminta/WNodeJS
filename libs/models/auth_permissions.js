/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

module.exports = Model.extend({
	collection: 'auth_permissions',
	config: {
		group_id: { type: ObjectId, ref: 'auth_groups', required: true },
		menu_action_id: { type: ObjectId, ref: 'auth_menu_action', required: true },
		create_by: { type: ObjectId, ref: 'auth_users', required: false },
		create_on: { type: Date, required: true, 	default: Date.now },
		modify_on: { type: Date, required: true, 	default: Date.now }
	},
	init: function(){
		this._super();
	},
	addPermission: function(configs){
		//writing...
	},
	findPermission: function(group, callback){
		//writing...
	},
	checkPermission: function(group, configs, callback){
		//writing...
	},
	updatePermission: function(configs){
		//writing...
	},
	deletePermission: function(id){
		//writing...
	}
});