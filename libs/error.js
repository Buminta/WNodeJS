/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

/*
 * It's interface of ViewInterface
 * Using for controller to do render or raise Error for response
 */
var errorlist =  require(__dirname + '/utils/errorlist');

ErrorInterface = Class.extend({
	// errorStatus: {
	// 	"404": "Page not found",
	// 	"500": "Is not valid",
	// 	"70": "Permission denied"
	// },
	/*
	 * render default response header with http code 200, success and show message.
	 */
	renderError: function(code, mes){
		return this.render("error", {code: code, mes: mes?mes:errorlist.http_request[code]});
	},
	/*
	 * render response header with http code custom and show message.
	 */
	raise: function(code, mes){
		var responseType = undefined;
		if(this.req.params.action){
			responseType = this.req.params.action.split(".")[1];
		}
		if(responseType && responseType.toLowerCase() == "json"){
			var error = {code: code, message: (mes?mes:errorlist.http_request[code])};
			return this.res.send(code, error);
		}
		if(responseType && responseType.toLowerCase() == "xml"){
			var error = {
				'?xml version="1.0" encoding="utf-8"?': null,
				result: {
					code: code,
					message: (mes?mes:errorlist.http_request[code])
				}
			};
			var xml = require("object-to-xml");
			this.res.set('Content-Type', 'text/xml');
			return this.res.send(code, xml(error));
		}
		return this.res.send(code, "<h1 align='center'>"+code+"</h1><h5 align='center'>"+(mes?mes:errorlist.http_request[code])+"</h5>");
	},
}).implement(ViewInterface);