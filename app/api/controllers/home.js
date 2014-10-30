module.exports = Controller.extend({
	run: function(){
		
	},
	index: function(){
		return this.render({status: "Hello world"});
	},
	test: function(){
		return this.render({session: this.getSession()});
	}
});