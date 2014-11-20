/* 
* @Author: me866chuan
* @Date:   2014-11-18 10:23:29
* @Last Modified by:   me866chuan
* @Last Modified time: 2014-11-18 10:29:54
*/

SocketIOClass = Class.extend({
	init: function(router){
		this.router = router;
	},
	getSession: function(socket, callback){
		var hs = socket.handshake;
		this.router.parseSession(hs, function(session){
			callback(session);
		});
	},
	run: function(sockets){
		
	}
});