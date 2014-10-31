## MVC Framework for NodeJS
Demo source: git@github.com:Buminta/wnodejs-demo.git(git@github.com:Buminta/wnodejs-demo.git)

### Install
```
npm install wnodejs
```

#### Version 2.0.0 -> latest

 - File package.json config

 ```
 ...
 "dependencies": {
    "wnodejs": "2.0.x",
  },
  "engines": {
    "node": "0.10.x",
    "npm": "1.4.x"
  }
  ...
 ```

 - File index.js
``` javascript

  //config port, using socket, mongodb
  var configs = require(__dirname+"/configs.js");
  var wnodejs = require("wnodejs");

  //use root path for all application
  wnodejs.use("root_path", __dirname);

  //use config for app
  wnodejs.use("configs", configs);

  //Start run app
  wnodejs.init();
```

 - Default configs.js file

``` javascript
  module.exports = {
    listen_port: 3000,
    defaultApp: "demo",
    database: {
      host: "127.0.0.1",
      name: "msocial"
    },

    //security key for session and cookie
    sercurity: {
      key: "express.sid",
      secret: "1234567890QWERTY"
    },
    // socket_path: "/socket_app.js" // If dose'nt using u can comment line here
    // var global for using: socket, session
  }
```

 - All application inside ```app``` folder
```
app
├── api
│   ├── controllers
│   │   └── ... //home.js
│   ├── init.js
│   └── models
└── demo
    ├── controllers
    │   ├── ... //home.js
    ├── init.js
    ├── models
    │   └── ... //auth_users.js
    ├── modules
    │   └── ...
    ├── static
    │   ├── css
    │   │   ├── ...
    │   ├── ...
    │   └── js
    │       ├── ...
    └── views
        ├── ...
```

 -- init.js file for configs app

``` javascript
module.exports = {
  defaultController: "home",
  defaultAction: "index",
  staticFolder: "static",
  debug: true,
}
```