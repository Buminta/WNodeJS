## MVC Framework for ExpressJS
``` javascript
//configs.js
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
	// socket_path: samples.js
	// adding when using socket.io
	// var global for using: socket, session
}
```
Using socket when u need

Package using from fw
``` javascript
//package.json
{
  "name": "WNodeJS",
  "description": "MVC Framework for ExpressJS",
  "version": "1.0.0",
  "author": "Tan Bui (http://buminta.com)",
  "repository" : {
    "type" : "git",
    "url" : "https://github.com/buminta/wnode.git"
  },
  "dependencies": {
    "express": "3.x",
    "MD5": "latest",
    "socket.io": "latest",
    "jade": "latest",
    "connect": "latest",
    "mongodb": "latest"
  },
  "engines": {
    "node": "0.10.x",
    "npm": "1.4.x"
  }
}
```

 - public folder for using somes file using in client
 - views folder for jade language of template application
 - models folder for class in out with database
 - controllers folder for class control request and responsive

``` javascript
// controllers/demo.js
// Extend from controller Class in libs.
module.exports = Controller.extend({
	run: function(){
		//the first run before action runing
	},
	index: function(){
		//action for controller
	}
});

```
