module.exports = {
	listen_port: 3000,
	database: {
		host: "127.0.0.1",
		port: 27017,
		name: "demo"
	},
	sercurity: {
		key: "express.sid",
		secret: "1234567890QWERTY"
	},
	socket_path: "/socket_app.js" // If dose'nt using u can comment line here
	// var global for using: socket, session
}