// JavaScript Document

var ad = {
	init: function(){
		this._root = $("#ad"), 
		this._txt = $(".tx", this._root),
		this._list = $("em", this._root),
		this._size = $(".a", this._root).size() - 1;
		
		this.bind();
		if(this._size > 0){
			this.move();
		}
	},
	bind: function(){
		var that = this;
		this._root.on("mouseenter.dot", "em", function(){
			that.edeal($(this));
		});
	},
	_timer: null,
	move: function(){
		var that = this;
		function initTimer(){
			if(!that._timer){
				that._timer = setInterval($.proxy(that.mdeal, that), 3000);
			};
		}
		$("#ad").bind("mouseenter.move", function(){
			clearInterval(that._timer);
			that._timer = null;
		}).bind("mouseleave.move", function(){
			initTimer();
		});
		initTimer();
	},
	//auto move event
	mdeal: function(){
		var i = this._list.filter(".on").index();
		i + 1 > this._size ? (i = 0) : i++
		this.edeal(this._list.eq(i));
	},
	//mouse enter
	edeal: function($T){
		$T.addClass("on").siblings(".on").removeClass("on");
		var a = this._root.find(".a").hide().eq($T.index()).show();
		this._txt.attr("href", a.attr("href"));
		//防止href为空
		this._txt.text(a.attr("title"));
	}
};
//ad.init();
//公共操作
$(function(){
	//未登录换一换按钮
	qqAjax.load({root:"#jc_l", link: ".hyh a" , cnt:"#ajaxdata", 
		clickFunc: function(root){
			//有导航栏的遮挡
			header.scrollTo(root.offset().top - 80, 0);
		}
	});
	//刷新按钮
	qqAjax.load({root:"#hasLoginDaohang", link: ".refresh", cnt:"#ajaxList"});
	//最新话题
	qqAjax.load({root:"#hasLoginDaohang", link: ".tab" , cnt:"#ajaxList",clickFunc:function(){
			$(this).siblings().removeClass("tab_on");
			$(this).addClass("tab_on");
			$("#hasLoginDaohang .refresh").attr("data-url",$(this).attr("data-url"));
		}
	});
	//广告切换
	qqAjax.script("http//www.100bt.com/qq/zn/script/toucheChange.js", function(){
		var wp = $("#ad"), ul = $("#ad_ul"),
			dots = wp.find(".rd em"), 
			lists = ul.find("a"),
			msg = wp.find(".tx");
		ul.roll(function(u, w){
			var h = Math.floor(w / 3);
			ul.find("li").height(h);
			$(".adwp").height(h);
		}).bind("indexChange", function(e, i){
			dots.removeClass("on").eq(i).addClass("on");
			var lnk = lists.eq(i);
			msg.text(lnk.attr("title"));
			msg.attr("href", lnk.attr("href"));
		}).bind("clickEvent", function(e, i){
			window.location.href = msg.attr("href");
		});
	});
	//分页按钮
	qqAjax.load({root:"#ajaxList", link: ".pager a",
		beforeClick: function(){
			cmTool.loadPage();
		},
		clickFunc: function(root){
			cmTool.hideLoadPage();
			//有导航栏的遮挡
			header.scrollTo(root.offset().top - 80, 0);
		}
	});
});
