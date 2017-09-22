//前端路由
(function($) {
	//加载中提示
	$("body").append("<div class=\"fixed-tip\"><div class=\"fixed-tip-text\">请稍等</div></div>");
	$(".fixed-tip").on("click", function() {
			$(this).removeClass("active");
		})
		//nav
	$(".admin-nav a").on("click", function() {
			if(!$(this).hasClass('active')) {
				var getHref = $(this).attr("href");
				$(this).addClass("active").siblings(".active").removeClass('active');
				$(getHref).addClass("active").siblings(".admin-side-ul").removeClass('active')
				$(".admin-con").removeClass("active");//show side
			}
			return false;
		})
		//side a
	$(".admin-side-item a").on("click", function(e) {
			e.preventDefault() //阻止默认，火狐必须在第一层从function(e)中获得。
			var $obj = $(this).parent('li');
			if(!$obj.hasClass('active')) {
				var getHref = $(this).attr("href");
				if(getHref) route(getHref, $obj);
			}

			return false;
	});
	//side show/hide
	$(".admin-side-btn").on("click",function(){
		$(".admin-con").toggleClass('active');
		
	})
	
	window.addEventListener("load", setActive, false)
	window.addEventListener("popstate", setActive, false)

})(window.jQuery)

//页面操作
function setActive() {
	var state = history.state;
	var hash = window.location.hash;
	var hashs = hash.split('/');
	if(!hash) {
		//不存在参数时
		var $o = $(".admin-side-ul.active").find('li').eq(0);
		var src = $o.find('a').attr('href');
		route(src, $o)
		return false;
	} else {
		var href = state.url;
		iframeHref(href);
	}
	var $ul = $("[href='" + hashs[0] + "']");
	if($ul) {
		//设置到当前标记
		$ul.triggerHandler("click");
		if(hashs[1]) $(hashs[0]).find('li').eq(hashs[1]).find('a').triggerHandler("click");
	};
}

function route(src, $o) {
	//单页程序
	if(!src) return false;
	//set url
	if($o) {
		var id = $o.parents(".admin-side-ul").attr('id');
		var item = $o.index();
		$(".admin-side-ul li").removeClass('active'); //清楚所有active
		$o.addClass("active");
		// ul（id）+ a（index）
		var hash = "#" + id + '/' + item; //show in url
		window.history.pushState({
			'url': src,
			hash: hash
		}, "", hash);
	}

	iframeHref(src)
		//	e.preventDefault() //阻止默认，火狐必须在第一层从function(e)中获得。
	return false;

};

function iframeHref(href) {
	//get page
	$(".admin-page iframe").attr("src", href);

}

function tipShow() {
	/*加载提示*/
	$(".fixed-tip").addClass("active");
}

function tipHide() {
	/*隐藏提示*/
	$(".fixed-tip").removeClass("active");
}