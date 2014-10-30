var Mongoose = require('mongoose');
module.exports = Model.extend({
	collection: 'auth_menu_categories',
	config: {
		name: { type: String, required: true, label: "Name"},
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