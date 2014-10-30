var Mongoose = require('mongoose')
var Config = require('../configs')

// simple
Mongoose.connect('mongodb://' + Config.database.host + '/' + Config.database.name)

var db = Mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', function callback(){
	console.log('Connection to MongoDB server succeeded!')
});

module.exports = Mongoose