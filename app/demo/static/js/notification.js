$(".notification").bind("touchend", function () {
	$(".notification").hide();
});
$("#NotificationJS").bind("touchend", function () {
	$("#NotificationJS").removeClass("notification");
	$("#NotificationJS").hide();
});
var t = setTimeout(function(){
	$(".notification").hide();
	$("#NotificationJS").removeClass("notification");
	$("#NotificationJS").hide();
}, 2000);
Notification = {
	show: function (msg) {
		var _self = this;
		clearTimeout(_self.t);
		$("#NotificationJS").removeClass("notification");
		$("#NotificationJS").html(msg + "<span class='close'>x</span>");
		$("#NotificationJS").show();
		$("#NotificationJS").addClass("notification");
		this.t = setTimeout(function(){
			_self.hide();
			clearTimeout(_self.t);
		},2000);
	},
	hide: function(){
		$("#NotificationJS").removeClass("notification");
		$("#NotificationJS").hide();
	}
}
$(".tablesorter-filter").addClass('form-control');
$(".pagedisplay").addClass('form-control');
$(".pagedisplay").css({
	'width': '200px',
	'display': 'inline-block'
});
$(".pagesize").addClass('form-control');
$(".pagesize").css({
	'width': '50px',
	'display': 'inline-block',
	'padding': '0px'
});