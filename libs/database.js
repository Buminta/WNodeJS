/*
 * wnodejs
 * Copyright (c) 2014 Tan Bui, contributors
 * Licensed under the BSD 2-Clause license.
 * 
 * Site: http://buminta.com
 * Github: https://github.io/buminta
 */

/*
 * Using mongoose package for create Schema model and using from that.
 */
var Mongoose = require('mongoose')
var router = require(__dirname + '/router');
// simple connect to mongodb with config
var uri = 'mongodb://' + router['configs'].database.host + '/' + router['configs'].database.name;
if(router['configs'].database.port){
	uri = 'mongodb://' + router['configs'].database.host + ':'+router['configs'].database.port+'/' + router['configs'].database.name;
}
if(router['configs'].database.user.length > 0 || router['configs'].database.pass.length > 0){
	uri = 'mongodb://'+router['configs'].database.user+':'+router['configs'].database.pass+'@' + router['configs'].database.host + '/' + router['configs'].database.name;
}
if((router['configs'].database.user.length > 0 || router['configs'].database.pass.length > 0) && router['configs'].database.port){
	uri = 'mongodb://'+router['configs'].database.user+':'+router['configs'].database.pass+'@' + router['configs'].database.host + ':'+router['configs'].database.port+'/' + router['configs'].database.name;
}

Mongoose.connect(uri);

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function callback(){
	console.log(uri);
	console.log('Connection to MongoDB server succeeded!')
});

module.exports = Mongoose;