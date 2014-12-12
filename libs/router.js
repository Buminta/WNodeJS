/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

/*
 * Module router using expressjs for start listening application.
 * Router import configs params for port listener of application and socket.io and configs database with mongodb/mongooese.
 * Router run include all lib for controller, model, view from init method.
 * Router listener port of application for socket.io and read configs params for listen connect with client
 */
var Log  = require(__dirname+"/utils/log");
var d = require('domain').create();

module.exports = {
	// configs: {
	// 	database: {
	// 		host: "localhost",
	// 		name: ""
	// 	},
	// 	sercurity: {
	// 		key: "express.sid",
	// 		secret: "1234567890QWERTY"
	// 	},
	// 	listen_port: 3000
	// },
	// root_path: "/",
	/*
	 * use method do setting valid for root path of application and configs param for using from application
	 */
	use: function(name, configs){
		// name is ['configs', 'root_path']
		this[name] = configs;
	},
	/*
	 * include method do include file in local to global and eval from string to like javascript code
	 * using vars for params value, object or callback do using in include file
	 */
	include: function(file_, vars) {
		var fs = require('fs');
		with (global) {
			eval(fs.readFileSync(file_) + '');
		};
	},
	/*
	 * init method do include and settings some configs,
	 * run application express.js, check application configs and manager params url
	 */
	init: function(){
		if(!this['configs']){
			return Log.error("ERROR", "Application need configs for start.\n\t\tExample: wnodejs.user('configs', {})\
				\n\t\tConfig_example = {\n\
				database: {\n\
					host: 'localhost',\n\
					name: 'demo',\n\
					user: 'demo',\n\
					pass: 'demo',\n\
				},\n\
				sercurity: {\n\
					key: 'express.sid',\n\
					secret: '1234567890QWERTY'\n\
				},\n\
				listen_port: 3000\n\
			}", "red");
		}
		if(!this['root_path']) {
			return Log.error("ERROR", "Application need root_path for start.\n\t\tExample: wnodejs.user('root_path', __dirname)", "red");
		}
		if(this['configs'].database.host === undefined || this['configs'].database.name === undefined || this['configs'].database.user === undefined || this['configs'].database.pass === undefined) {
			return Log.error("ERROR", "Application need configs all value configs of database for start.\n\t\tExample: database: {\n\
				host: 'localhost',\n\
				name: 'demo',\n\
				user: 'demo',\n\
				pass: 'demo',\n\
			}", "red");
		}


		var _self = this;
		var express = require("express");
		var expressValidator = require('express-validator')
		var fs = require('fs');

		this.KEY = this['configs'].sercurity.key?this['configs'].sercurity.key:'express.sid';
		this.SECRET = this['configs'].sercurity.secret?this['configs'].sercurity.secret:'1234567890QWERTY';

		this.parseCookie = express.cookieParser(this.SECRET);
		var MemoryStore = express.session.MemoryStore;
		this.store = new MemoryStore();

		var app = express();

		// Create one global ObjectId for using ref in config models.
		ObjectId = require('mongoose').Schema.Types.ObjectId;

		this.include(__dirname+'/class.js');
		this.include(__dirname+'/socket.js');
		this.include(__dirname+'/view.js');
		this.include(__dirname+'/error.js');
		this.include(__dirname+'/auth.js');
		this.include(__dirname+'/controller.js');
		this.include(__dirname+'/model.js');

		// app.use(express.static(__dirname + '/public'));
		app.use(express.bodyParser());       
		app.use(expressValidator({
		  errorFormatter: function(param, msg, value) {
		    var namespace = param.split('.')
		      , root    = namespace.shift()
		      , formParam = root;

		    while(namespace.length) {
		      formParam += '[' + namespace.shift() + ']';
		    }
		    return {
		      param : formParam,
		      message   : msg,
		      value : value
		    };
		  },
		  customValidators: {
		  }
		}));

		app.configure(function () {
			app.use(express.cookieParser());
			app.use(express.session({store: _self.store, secret: _self.SECRET, key: _self.KEY}));
		});

		var listApp = fs.readdirSync("app");
		for(var i in listApp){
			try {
				var stats = fs.lstatSync('app/'+listApp[i]);
				if (stats.isDirectory()) {
					var confs = require(this['root_path']+'/app/'+listApp[i]+"/init.js");
					if(confs.staticFolder){
						app.use("/"+listApp[i], express.static(this['root_path']+"/app/"+listApp[i]+"/"+confs.staticFolder))
						Log.show("Using static folder: /app/"+listApp[i]+"/"+confs.staticFolder, "grey");
					}
				}
			}
			catch (e) {
				Log.show(e.message, "red");
			}
		}

		app.use(function(req,res,next){
			d.on('error', function(er) {
				Log.show("Error: "+er.message, 'red')
				res.send(404, "<h1 align='center'>404</h1><h5 align='center'>Sorry, we cannot find that!</h5>");
			});
			d.run(function() {
				var configs = require(__dirname+"/configs.js");
				wnodejs = require("wnodejs");
			  	wnodejs.use("root_path", __dirname);
			  	wnodejs.use("configs", configs);
				global.people_online = 0;
				wnodejs.init();
			});
		});

		try{
			this.io = require('socket.io').listen(app.listen(this['configs'].listen_port?this['configs'].listen_port:3000));
		}
		catch(e){
			Log.show("Error listen: "+this['configs'].listen_port+" is used!", 'red')
		}
		if(this['configs'].socket_path){
			// check configs socket file path to include it and using when socket.io connect form client
			var SocketClass = require(_self['root_path']+_self['configs'].socket_path);
			var socketIOListener = new SocketClass(this);
			socketIOListener.run(this.io.sockets);
		}
	},
	/*
	 * authorization with had session for socket.io, it run before socket.io accept connect from client
	 */
	sessionSocketAuthorization: function(){
		var _self = this;
		this.io.set('authorization', function(handshake, callback) {
			if (handshake.headers.cookie) {
				_self.parseSession(handshake, function(config){
					if(config){
						callback(null, true);
					}
					else{
						callback("Not session.", false);
					}
				});
			} else {
				return callback('No session.', false);
			}
		});
	},
	/*
	 * set custom authorization for socket.io, it run before socket.io accept connect from client
	 */
	setSocketAuthorization: function(callback_out){
		var _self = this;
		this.io.set('authorization', function(handshake, callback) {
			callback_out(handshake, callback);
		});
	},
	/* 
	 * parse cookie to session for using in socket.io
	*/
	parseSession: function(handshake, callback){
		var _self = this;
		this.parseCookie(handshake, null, function(err) {
			handshake.sessionID = handshake.signedCookies[_self.KEY];
			_self.store.get(handshake.sessionID, function (err, session) {
				if (err || !session) {
					callback(false);
				} else {
					callback(session);
				}
			});	
		});
	},
	/*
	 * getModel method for require one model from application and using it.
	 */
	getModel: function(app, collection){
		var list_auth_default = ['auth_groups', 'auth_membership', 'auth_menu_action', 'auth_menu_categories', 'auth_permissions', 'auth_users'];
		var tmp;
		try{
			tmp = require(this['root_path'] + "/app/"+app+"/models/"+collection+".js");
		}
		catch(e){
			if(list_auth_default.indexOf(collection) != -1) tmp = require(__dirname + "/models/"+collection+".js");
			else throw e;
		}
		return new tmp();
	},
	/*
	 * manager params from url to do call controller, action from application
	 */
	run: function(req, res){
		var params = this.filterParams(req.url.split("?")[0].split("/"));
		req.params = {};
		req.params.application = params[0];
		if(!req.params.application) req.params.application = this['configs'].defaultApp?this['configs'].defaultApp:null;
		if(!req.params.application) {
			return Log.error("Error", "Missing default application from configs", "red");
		}
		else{
			var debug = false;
			try{

				//if not unquie application from params url, it will call from application default configed.
				try{
					var confs = require(this['root_path']+"/app/"+req.params.application+"/init.js");
					debug = confs.debug?confs.debug:false;
					req.params.controller = params[1]?params[1]:(confs.defaultController?confs.defaultController:"home");
					req.params.action = params[2]?params[2]:(confs.defaultAction?confs.defaultAction:"index");
					params.splice(0,3);
					req.args = params;
				}
				catch(e){
					req.params.application = this['configs'].defaultApp;
					var confs = require(this['root_path']+"/app/"+req.params.application+"/init.js");
					debug = confs.debug?confs.debug:false;
					req.params.controller = params[0]?params[0]:(confs.defaultController?confs.defaultController:"home");
					req.params.action = params[1]?params[1]:(confs.defaultAction?confs.defaultAction:"index");
					params.splice(0,2);
					req.args = params;
				}
				var classController = require(this['root_path'] + "/app/"+req.params.application+"/controllers/" + req.params.controller +".js");
				var control = new classController(req, res);
				control.debug = debug;
				return control.callAction(req.params.action.split(".")[0]);
			}
			catch(err){
				// console.log(err.message);
				// console.log(err.stack);
				if(debug) res.send("<div style='width: 95%; margin: 20px auto;'><span style='color: red; font-size: 30px;'>Error: </span><span style='color: #888;'>"+err.message+"</span><p style='padding: 10px; background: rgb(200,100,100); border-radius: 10px;'><code>"+err.stack+"</code></p></div>");
				else res.send(404, "<h1 align='center'>404</h1><h5 align='center'>Sorry, we cannot find that!</h5>");
			}
		}
	},
	/*
	 * filter params url and splice space empty
	 */
	filterParams: function(params){
		while(params.indexOf(undefined) != -1 || params.indexOf("") != -1){
			var tmpNull = params.indexOf(undefined);
			var tmpEmpty = params.indexOf("");
			if(tmpNull != -1) params.splice(tmpNull, 1);
			if(tmpEmpty != -1) params.splice(tmpEmpty, 1);
		}
		return params;
	}
};