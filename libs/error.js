ErrorInterface = Class.extend({
	errorStatus: {
		"404": "Page not found",
		"500": "Is not valid",
		"70": "Permission denied"
	},
	renderError: function(code, mes){
		return this.render("error", {code: code, mes: mes?mes:this.errorStatus[code]});
	},
	raise: function(code, mes){
		var responseType = undefined;
		if(this.req.params.action){
			responseType = this.req.params.action.split(".")[1];
		}
		if(responseType && responseType.toLowerCase() == "json"){
			var error = {code: code, message: (mes?mes:this.errorStatus[code])};
			return this.res.send(code, error);
		}
		if(responseType && responseType.toLowerCase() == "xml"){
			var error = {
				'?xml version="1.0" encoding="utf-8"?': null,
				result: {
					code: code,
					message: (mes?mes:this.errorStatus[code])
				}
			};
			var xml = require("object-to-xml");
			this.res.set('Content-Type', 'text/xml');
			return this.res.send(code, xml(error));
		}
		return this.res.send(code, "<h1 align='center'>"+code+"</h1><h5 align='center'>"+(mes?mes:this.errorStatus[code])+"</h5>");
	},
}).implement(ViewInterface);