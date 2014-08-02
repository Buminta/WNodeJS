//all vars global in 'vars'
vars.socket.on("test", function(data){
	console.log(data);
	console.log(vars.session);

	//call model on socket
	var modelDemo = getModel('users');
	console.log(modelDemo);
});