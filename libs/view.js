/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

/*
 * ViewInterFace Class for using interface from Controller
 * Using jace language for render view response return to client
 * Render view with JSON, XML, HTML
 * Redirect reponse to new url
 * Manager session for application
 */
var jade = require("jade");
var router = require(__dirname + "/router");
ViewInterface = Class.extend({
	req: null,
	res: null,
	/*
	 * render method check args from line call method and render view for client need
	 */
	render: function(arg1, arg2){
		// two args config default render with view jade. arg1 is file *.jade, arg2 is params value using in view
		if(arg2){
			return this.renderView(arg1, arg2);
		}
		else{
			var responseType = undefined;
			if(this.req.params.action){
				responseType = this.req.params.action.split(".")[1];
			}
			// one arg config render type like client call from action. [action].json or [action].xml
			if(responseType && responseType.toLowerCase() == "json") return this.renderJSON(arg1);
			if(responseType && responseType.toLowerCase() == "xml") return this.renderXML(arg1);
			return this.res.send(arg1);
		}
	},
	/*
	 * render view with jade
	 * default value jade using (request, session, response)
	 */
	renderView: function(template, configs){
		configs.request = this.req;
		configs.session = this.getSession();
		configs.response = this.res;
		configs.title = configs.title?configs.title:("WNodeJS/"+this.req.params.application+" - "+this.req.params.controller+" - "+this.req.params.action);
		try{
			return this.res.send(jade.renderFile(router['root_path']+"/app/"+this.req.params.application+"/views/"+template+".jade", configs));
		}
		catch(err){
			// if application had debug mode true server show error log, and debug mode false show http error code 500
			if(this.debug){
				this.res.send("<div style='width: 95%; margin: 20px auto;'><span style='color: red; font-size: 30px;'>Error: </span><span style='color: #888;'>"+err.message+"</span><p style='padding: 10px; background: rgb(200,100,100); border-radius: 10px;'><code>"+err.stack+"</code></p></div>");
			}
			else this.res.send(500, "<h1 align='center'>500</h1><h5 align='center'>Sorry, we have a problem with that!</h5>");
		}
	},
	/*
	 * render JSON for response
	 */
	renderJSON: function(configs){
		return this.res.json(configs);
	},
	/*
	 * render XML for response using package object-to-xml
	 */
	renderXML: function(configs){
		var xml = require("object-to-xml");
		this.res.set('Content-Type', 'text/xml');
		var obj = {
			'?xml version="1.0" encoding="utf-8"?': null,
			result: configs
		}
		return this.res.send(xml(obj));
	},
	/*
	 * get Session for appplication. Using method from controller.
	 */
	getSession: function(){
		if(!this.req.session[this.req.params.application]){
			this.req.session[this.req.params.application] = {}
		}
		return this.req.session[this.req.params.application];
	},
	/*
	 * clear Session for application using it.
	 */
	clearSession: function(){
		this.req.session[this.req.params.application] = {};
	},
	/*
	 * save Session every edit it
	 */
	saveSession: function(){
		this.req.session.save();
	},
	/*
	 * redirect url with configs application, controller, action and array value.
	 */
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