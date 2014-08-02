Chat = {
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
	updateRoom: function(){
		$('#content').html('');
		this.socket.on('updaterooms', function(rooms, current_room, msgs, roomadd_valid) {
			if(roomadd_valid) Notification.show("Room is created!");
			$('#rooms').empty();
			$.each(rooms, function(key, value) {
				if(value._id == current_room){
					$('#rooms').append('<div>' + value.name + '</div>');
				}
				else {
					$('#rooms').append('<div><a href="#" onclick="Chat.switchRoom(\''+value._id+'\')">' + value.name + '</a></div>');
				}
			});
			if(msgs){
				$.each(msgs, function(key, value) {
					$('#content').append('<b>'+value.username + ':</b> <span style="color: '+value.msg.color+'; font-weight: '+value.msg.style+'">' + value.msg.msg + '</span><br>');
				});
			}
		});
	},
	switchRoom: function(room){
		$('#content').html('');
		this.socket.emit('switchRoom', room);
		$.ajax({
			url: this.server+'/saveroom',
			type: 'post',
			data: {room: room}
		});
	},
	updateChat: function(){
		this.socket.on('updatechat', function (username, data) {
			$('#content').append('<b>'+username + ':</b> <span style="color: '+data.color+'; font-weight: '+data.style+'">' + data.msg + '</span><br>');
		});
	},
	addRoom: function(){
		this.socket.emit('addroom', null);
	},
	send: function(message){
		this.socket.emit('sendchat', message);
	}
}