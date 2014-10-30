module.exports = Class.extend({
	login: function(){
		var _self = this;
		var user = _self.newDB("auth_users");
		var session = this.getSession();
		user.data.findOne({username: this.req.body.username, password: this.hashCode(this.req.body.username+this.req.body.password)}, function(err, result){
			if(err){
				session.notification = e.message;
				return _self.render("login", {title: "WNodeJS - Login"});
			}
			if(!result){
				session.notification = "Wrong username or password";
				return _self.render("login", {title: "WNodeJS - Login"});
			}
			session.notification = "Login success";
			session.user_id = result._id;
			_self.getAllMenu(function(list){
				session.menu = list;
				_self.saveSession();
				if(_self.req.query.goback){
					return _self.res.redirect(_self.req.query.goback);
				}
				else return _self.redirect("board");
			})
		});
	},
	checkLogin: function(){
		var session = this.getSession();
		if(!session.user_id){
			this.redirect({controller: "home", action: "index"}, ["?goback="+this.req.originalUrl]);
			return false;
		}
		return true;
	}
})