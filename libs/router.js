Router = {
	init: function(){

	},
	run: function(req, res){
		var params = this.filterParams(req.url.split("?")[0].split("/"));
		req.params = {};
		req.params.application = params[0];
		if(!req.params.application) req.params.application = configs.defaultApp?configs.defaultApp:"demo";
		if(req.params.application){
			var debug = false;
			try{
				try{
					var confs = require(__dirname+"/app/"+req.params.application+"/init.js");
					debug = confs.debug?confs.debug:false;
					req.params.controller = params[1]?params[1]:(confs.defaultController?confs.defaultController:"home");
					req.params.action = params[2]?params[2]:(confs.defaultAction?confs.defaultAction:"index");
					params.splice(0,3);
					req.args = params;
				}
				catch(e){
					req.params.application = configs.defaultApp;
					var confs = require(__dirname+"/app/"+req.params.application+"/init.js");
					debug = confs.debug?confs.debug:false;
					req.params.controller = params[0]?params[0]:(confs.defaultController?confs.defaultController:"home");
					req.params.action = params[1]?params[1]:(confs.defaultAction?confs.defaultAction:"index");
					params.splice(0,2);
					req.args = params;
				}
				var classController = require(__dirname + "/app/"+req.params.application+"/controllers/" + req.params.controller +".js");
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