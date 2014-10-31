var Mongoose = require('mongoose')
var router = require(__dirname + '/router');
// simple
Mongoose.connect('mongodb://' + router['configs'].database.host + '/' + router['configs'].database.name)

var db = Mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', function callback(){
	console.log('Connection to MongoDB server succeeded!')
});

module.exports = Mongoose