SocketDemo = {
	server: 'http://localhost:3000',
	socket: io.connect('http://localhost:3000'),
	init: function(){
		var _self = this;
		this.socket.on('connect', function(){
			_self.updateRoom();
			_self.updateChat();
		});
		this.socket.on('disconnect', function () {
		   console.log('disconnect client event....');
		   window.location.reload();
		});
	},
	test: function(message){
		this.socket.emit('test', message);
	}
}