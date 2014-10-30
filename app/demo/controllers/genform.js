var Config = require('../init');

module.exports = Controller.extend({
	run: function(){
		
	},
	index: function(){
		if(!checkExceptIP(this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress)){
			return this.renderError("70");
		}
		var _self = this;
		if(!this.req.args[0]) return this.render("error", {code: "500", mes: "Collection not found"});
		var db = this.newDB(this.req.args[0]);
		db.data.find(function(err, results){
			_self.render("genform", {title: "WNodeJS - Genform", control: 'index',data: results, config: db.config});
		});
	},
	delete: function(){
		if(!checkExceptIP(this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress)){
			return this.renderError("70");
		}
		var _self = this;
		var db = this.newDB(this.req.args[0]);
		db.data.remove({_id: this.req.query.id}, function(err, results){
			return _self.res.redirect(_self.req.params.application+"/"+_self.req.params.controller+"/index/"+_self.req.args[0]);
		});
	},
	add: function(){
		if(!checkExceptIP(this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress)){
			return this.renderError("70");
		}
		var _self = this;
		var db = this.newDB(this.req.args[0]);
		if(Object.keys(this.req.body).length > 0){
			db.data.create(this.req.body, function(err, results){
				if(err) _self.getSession().notification = err.message;
				else{
					_self.req.body = {};
					_self.getSession().notification = "Success";
				}
				_self.render("genform", {title: "WNodeJS - Genform", control: 'add', data: _self.req.body, config: db.config});
			});
		}
		else _self.render("genform", {title: "WNodeJS - Genform", control: 'add', config: db.config});
	},
	edit: function(){
		if(!checkExceptIP(this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress)){
			return this.renderError("70");
		}
		var _self = this;
		var db = this.newDB(this.req.args[0]);
		if(Object.keys(this.req.body).length > 0){
			db.data.update({_id: this.req.query.id}, this.req.body, function(err, results){
				if(err) _self.getSession().notification = err.message;
				else _self.getSession().notification = "Success";
				_self.render("genform", {title: "WNodeJS - Genform", control: 'edit', data: _self.req.body, config: db.config});
			});
		}
		else{
			db.data.findOne({_id: this.req.query.id}, function(err, results){
				if(!results) return _self.render("error", {code: "500", mes: "Is not defined"});
				_self.render("genform", {title: "WNodeJS - Genform", control: 'edit',data: results, config: db.config});
			});
		}
	},
}).implement(ErrorInterface);

//Filter IP Address with configs
checkExceptIP = function(ipAddress){
	if(Config.exceptIPs.indexOf(ipAddress) >= 0) return true;
	var arr = ipAddress.split(".");
	for(i=0; i<arr.length; i++){
		var ipTmp = arr[0];
		for(k=1; k < arr.length-i; k++){
			ipTmp += "."+arr[k];
		}
		for(j=arr.length-i; j< arr.length; j++){
			ipTmp += ".*"
		}
		if(Config.exceptIPs.indexOf(ipTmp) >= 0) return true;
	}
	return false;
}