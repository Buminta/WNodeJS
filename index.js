var express = require("express");

var configs = require(__dirname+"/configs.js");


const KEY = configs.sercurity.key?configs.sercurity.key:'express.sid'
, SECRET = configs.sercurity.secret?configs.sercurity.secret:'1234567890QWERTY';

var parseCookie = express.cookieParser(SECRET);
var MemoryStore = express.session.MemoryStore;
var store = new MemoryStore();

var app = express();

var port = configs.listen_port;
var fs = require('fs');
function include(file_, vars) {
	with (global) {
		eval(fs.readFileSync(file_) + '');
	};
}

include(__dirname + '/libs/class.js');
include(__dirname + '/libs/view.js');
include(__dirname + '/libs/error.js');
include(__dirname + '/libs/auth.js');
include(__dirname + '/libs/controller.js');
include(__dirname + '/libs/model.js');
include(__dirname + '/libs/router.js');

// app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app.configure(function () {
	app.use(express.cookieParser());
	app.use(express.session({store: store, secret: SECRET, key: KEY}));
});
Router.init();
app.use(function(req,res,next){
	// console.log(req.url);
	Router.run(req, res);
	// next();
});


var io = require('socket.io').listen(app.listen(port));


io.set('authorization', function(handshake, callback) {
	if (handshake.headers.cookie) {
		parseSession(handshake, function(config){
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

function parseSession(handshake, callback){
	parseCookie(handshake, null, function(err) {
		handshake.sessionID = handshake.signedCookies[KEY];
		store.get(handshake.sessionID, function (err, session) {
			if (err || !session) {
				callback(false);
			} else {
				callback(session);
			}
		});	
	});
}

function getModel(name){
	var tmp = require(__dirname + "/models/"+name+".js");
	return new tmp();
}

if(configs.socket_path){
	io.sockets.on('connection', function (socket) {
		var hs = socket.handshake;
		parseSession(hs, function(session){
			include(__dirname+configs.socket_path, {socket: socket, session: session});
		});
	});
}