/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

/*
 * Using with default database system framework configs
 */

Auth = Class.extend({
	/*
	 * hascode password for username with sha1
	 */
	hashCode: function(username, password){
		var sha = require("sha1");
		return sha(username+password);
	},
	/*
	 * return tree menu follow user permission from auth default database system
	 */
	getMenu: function(user_id){
		//writing...
	},
	/*
	 * return tree menu from auth default database system
	 */
	getAllMenu: function(callback){
		var cat = this.newDB("auth_menu_categories");
		var act = this.newDB("auth_menu_action");
		var list = [];
		cat.data.find({}, function(err, cat_list){
			if(err || cat_list.length == 0) return callback(list);
			loopGetAction(cat_list, 0);
		});

		function loopGetAction(cat_list, i){
			if(i == cat_list.length) return callback(list);
			act.data.find({menu_id: cat_list[i]._id}, function(err, act_list){
				if(!err) list.push({
					name: cat_list[i].name,
					action: act_list
				});
				loopGetAction(cat_list, i+1);
			});
		}
	}
}).implement(ViewInterface);