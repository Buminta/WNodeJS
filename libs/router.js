module.exports = {
	configs: {
		database: {
			host: "localhost",
			name: ""
		},
		sercurity: {
			key: "express.sid",
			secret: "1234567890QWERTY"
		},
		listen_port: 3000
	},
	root_path: "/",
	use: function(name, configs){
		this[name] = configs;
	},
	include: function(file_, vars) {
		var fs = require('fs');
		with (global) {
			eval(fs.readFileSync(file_) + '');
		};
	},
	init: function(){
		var _self = this;
		var express = require("express");
		var fs = require('fs');

		this.KEY = this['configs'].sercurity.key?this['configs'].sercurity.key:'express.sid';
		this.SECRET = this['configs'].sercurity.secret?this['configs'].sercurity.secret:'1234567890QWERTY';

		this.parseCookie = express.cookieParser(this.SECRET);
		var MemoryStore = express.session.MemoryStore;
		this.store = new MemoryStore();

		var app = express();

		ObjectId = require('mongoose').Schema.Types.ObjectId;

		this.include(__dirname+'/class.js');
		this.include(__dirname+'/view.js');
		this.include(__dirname+'/error.js');
		this.include(__dirname+'/auth.js');
		this.include(__dirname+'/controller.js');
		this.include(__dirname+'/model.js');

		// app.use(express.static(__dirname + '/public'));
		app.use(express.bodyParser());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
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
						console.log("Using static folder: /app/"+listApp[i]+"/"+confs.staticFolder);
					}
				}
			}
			catch (e) {
				console.log(e);
			}
		}

		app.use(function(req,res,next){
			_self.run(req, res);
		});

		try{
			this.io = require('socket.io').listen(app.listen(this['configs'].listen_port));
		}
		catch(e){
			console.log("Error listen: "+this['configs'].listen_port+" is used!")
		}
		if(this['configs'].socket_path){
			this.io.sockets.on('connection', function (socket) {
				var hs = socket.handshake;
				_self.parseSession(hs, function(session){
					_self.include(_self['root_path']+_self['configs'].socket_path, {socket: socket, session: session});
				});
			});
		}
	},
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
	getModel: function(app, collection){
		var tmp = require(this['root_path'] + "/app/"+app+"/models/"+collection+".js");
		return new tmp();
	},
	run: function(req, res){
		var params = this.filterParams(req.url.split("?")[0].split("/"));
		req.params = {};
		req.params.application = params[0];
		if(!req.params.application) req.params.application = this['configs'].defaultApp?this['configs'].defaultApp:"demo";
		if(req.params.application){
			var debug = false;
			try{
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