module.exports = Controller.extend({
	run: function(){
		
	},
	index: function(){
		var sess = this.req.session;
		sess.destroy();
		return this.res.redirect('/');
	}
});