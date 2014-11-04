/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */
var errorlist =  require(__dirname + '/errorlist');
var colors = require('colors');

module.exports = {
	error: function(errorCode, message, color){
		var mes = message?message:errorlist.system[errorCode];
		errorCode = ("[ "+errorCode+" ] ").red;
		if(color) mes = mes[color];
		console.log(errorCode+mes);
	},
	show: function(message, color){
		var mes = message;
		if(color){
			mes = message[color];
		}
		console.log(mes);
	}
}