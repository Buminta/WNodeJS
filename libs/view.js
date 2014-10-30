jade = require("jade");
ViewInterface = Class.extend({
	req: null,
	res: null,
	render: function(arg1, arg2){
		if(arg2){
			return this.renderView(arg1, arg2);
		}
		else{
			var responseType = undefined;
			if(this.req.params.action){
				responseType = this.req.params.action.split(".")[1];
			}
			if(responseType && responseType.toLowerCase() == "json") return this.renderJSON(arg1);
			if(responseType && responseType.toLowerCase() == "xml") return this.renderXML(arg1);
			return this.res.send(arg1);
		}
	},
	renderView: function(template, configs){
		configs.request = this.req;
		configs.session = this.getSession();
		configs.response = this.res;
		configs.title = configs.title?configs.title:("WNodeJS/"+this.req.params.application+" - "+this.req.params.controller+" - "+this.req.params.action);
		try{
			return this.res.send(jade.renderFile(__dirname+"/app/"+this.req.params.application+"/views/"+template+".jade", configs));
		}
		catch(err){
			if(this.debug){
				this.res.send("<div style='width: 95%; margin: 20px auto;'><span style='color: red; font-size: 30px;'>Error: </span><span style='color: #888;'>"+err.message+"</span><p style='padding: 10px; background: rgb(200,100,100); border-radius: 10px;'><code>"+err.stack+"</code></p></div>");
			}
			else this.res.send(500, "<h1 align='center'>500</h1><h5 align='center'>Sorry, we have a problem with that!</h5>");
		}
	},
	renderJSON: function(configs){
		return this.res.json(configs);
	},
	renderXML: function(configs){
		var xml = require("object-to-xml");
		this.res.set('Content-Type', 'text/xml');
		var obj = {
			'?xml version="1.0" encoding="utf-8"?': null,
			result: configs
		}
		return this.res.send(xml(obj));
	},
	getSession: function(){
		if(!this.req.session[this.req.params.application]){
			this.req.session[this.req.params.application] = {}
		}
		return this.req.session[this.req.params.application];
	},
	clearSession: function(){
		this.req.session[this.req.params.application] = {};
	},
	saveSession: function(){
		this.req.session.save();
	},
	redirect: function(configs, args){
		var url = "/"+(configs.application?configs.application:this.req.params.application)
		url += "/"+(configs.controller?configs.controller:this.req.params.controller)
		url += "/"+(configs.action?configs.action:this.req.params.action)
		if(args) for(var i in args){
			url += "/"+args[i];
		}
		this.res.redirect(url)
	}
});