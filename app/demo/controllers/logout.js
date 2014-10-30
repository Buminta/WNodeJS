module.exports = Controller.extend({
	run: function(){
		
	},
	index: function(){
		this.clearSession();
		return this.res.redirect("/home/index");
	}
});