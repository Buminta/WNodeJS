var Mongoose = require('mongoose');
module.exports = Model.extend({
	collection: 'auth_users',
	config: {
		username: { type: String, required: true, unique: true, label: "Username"},
		password: { type: String, required: false},
		create_by: { type: Mongoose.Schema.Types.ObjectId, ref: 'auth_users', required: false, hiden: true},
		create_on: { type: Date, required: true, 	default: Date.now, hiden: true, label: "Create"},
		modify_on: { type: Date, required: true, 	default: Date.now, hiden: true}
	},
	init: function(){
		this._super();
	},
	addUser: function(configs){
	},
	findUser: function(user, password){
	},
	getAllUser: function(callback){
	},
	updateUser: function(configs){

	},
	deleteUser: function(id){
		
	}
});