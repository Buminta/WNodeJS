module.exports = Controller.extend({
	run: function(){
		
	},
	index: function(){
		var sess = this.req.session;
		var _self = this;
		if(_self.req.body.username != undefined){
			this.check(_self.req.body.username, _self.req.body.password, function(result){
				if(result === true){
					_self.getUserID(_self.req.body.username, function(id){
						sess.loginID = id;
						sess.username = _self.req.body.username;
						sess.save();
						if(_self.req.query.goback) return _self.res.redirect(_self.req.query.goback);
						
						//return for login success!
						error = "Login OK";
						_self.render("login", {title: "WNodeJS - login", error: error});
					});
				}
				else{
					error = result;
					_self.render("login", {title: "WNodeJS - login", error: error});
				}
			});
		}
		else{
			this.render("login", {title: "WNodeJS - login"});
		}
	},
	getUserID: function(username, callback){
		var model = this.newDB("users");
		model.findUser(username).toArray(function(err, result){
			callback(result[0]._id);
		});
	},
	check: function(username, password, callback){
		var md5 = require('MD5');
		var model = this.newDB("users");
		model.findUser(username, md5(password)).count(function(err, result){
			if(!result) callback("Username or password wrong");
			else callback(true);
		});
		return true;
	}
});