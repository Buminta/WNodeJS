/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

module.exports = Model.extend({
	collection: 'auth_groups',
	config: {
		name: { type: String, required: true, label: "Name"},
		description: { type: String, required: false, label: "Description"},
		create_by: { type: ObjectId, ref: 'auth_users', required: false, hiden: true},
		create_on: { type: Date, required: true, 	default: Date.now, hiden: true},
		modify_on: { type: Date, required: true, 	default: Date.now, hiden: true}
	},
	init: function(){
		this._super();
	},
	addGroup: function(configs){
		//writing...
	},
	findGroup: function(callback){
		//writing...
	},
	findGroupOne: function(user_id, callback){
		//writing...
	},
	deleteGroup: function(id){
		//writing...
	}
});