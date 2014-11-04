/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

module.exports = Model.extend({
	collection: 'auth_menu_action',
	config: {
		name: { type: String, required: true, label: "Name"},
		controller: { type: String, required: true, label: "Controller"},
		action: { type: String, required: true, label: "Action"},
		menu_id: { type: ObjectId, ref: 'auth_menu_categories', required: true, label: "Category ID"},
		create_by: { type: ObjectId, ref: 'auth_users', required: false, hiden: true},
		create_on: { type: Date, required: true, 	default: Date.now, hiden: true},
		modify_on: { type: Date, required: true, 	default: Date.now, hiden: true}
	},
	init: function(){
		this._super();
	},
	addMembership: function(configs){
		//writing...
	},
	findMembership: function(user, callback){
		//writing...
	},
	deleteMembership: function(id){
		//writing...
	}
});