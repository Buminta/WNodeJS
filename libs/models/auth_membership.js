/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

module.exports = Model.extend({	collection: 'auth_membership',
	config: {
		user_id: { type: ObjectId, ref: 'auth_users', required: true },
		group_id: { type: ObjectId, ref: 'auth_groups', required: true },
		create_by: { type: ObjectId, ref: 'auth_users', required: false },
		create_on: { type: Date, required: true, 	default: Date.now },
		modify_on: { type: Date, required: true, 	default: Date.now }
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