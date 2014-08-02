Auth = Class.extend({
	init: function(req, res){
		this.db = req.db;
		this.req = req;
		this.res = res;
	},
	permission: function(controller, action, callback){
		var _self = this;
		if(!this.req.session.loginID) return this.res.redirect("/login?goback=/"+this.req.params.controller+"/"+(this.req.params.action?this.req.params.action:""));
		return this.getPermission(controller, action, function(results){
			return callback(results);
		});
	},
	getPermission: function(controller, action, callback){
		var _self = this;
		var tmp = require(__dirname + "/models/membership.js");
		var membershipModel = new tmp(this.db);
		var tmp = require(__dirname + "/models/permissions.js");
		var permissionModel = new tmp(this.db);
		return membershipModel.findMembership(this.req.session.loginID, function(groups){
			if(groups[0]){
				var group = groups[0];
				return permissionModel.checkPermission(group.group_id, {controller: controller, action: action}, function(results){
					return callback(results);
				});
			}
			else{
				return callback(false);
			}
		});
	},
	listPermisstion: function(callback){
		var _self = this;
		var tmp = require(__dirname + "/models/membership.js");
		var membershipModel = new tmp(this.db);
		var tmp = require(__dirname + "/models/permissions.js");
		var permissionModel = new tmp(this.db);
		return membershipModel.findMembership(this.req.session.loginID, function(groups){
			if(groups[0]){
				var group = groups[0];
				return permissionModel.findPermission(group.group_id, function(results){
					return callback(results);
				});
			}
			else{
				return callback(false);
			}
		});
	}
});