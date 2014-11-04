/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */
 
module.exports = Model.extend({
	collection: 'auth_users',
	config: {
		username: { type: String, required: true, unique: true, label: "Username"},
		password: { type: String, required: false},
		create_by: { type: ObjectId, ref: 'auth_users', required: false, hiden: true},
		create_on: { type: Date, required: true, 	default: Date.now, hiden: true, label: "Create"},
		modify_on: { type: Date, required: true, 	default: Date.now, hiden: true}
	},
	init: function(){
		this._super();
	},
	addUser: function(configs){
		//writing...
	},
	findUser: function(user, password){
		//writing...
	},
	getAllUser: function(callback){
		//writing...
	},
	updateUser: function(configs){
		//writing...
	},
	deleteUser: function(id){
		//writing...
	}
});