var User = require("../modules/user");
module.exports = Controller.extend({
	run: function(){
		
	},
	index: function(){
		var session = this.getSession();
		var _self = this;
		if(session.user_id) return this.redirect({action: "board"});
		if(this.req.body.username && this.req.body.password) return this.login();
		else this.render("login", {title: "WNodeJS - Login"});
	},
	board: function(){
		if(this.checkLogin()){
			this.render("board", {title: "WNodeJS - Board"});
		}
	}
}).implement(Auth, User);