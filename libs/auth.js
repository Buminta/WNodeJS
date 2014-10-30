Auth = Class.extend({
	hashCode: function(username, password){
		var sha = require("sha1");
		return sha(username+password);
	},
	getMenu: function(user_id){

	},
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