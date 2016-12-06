 	$(function(){
		//分享题图
		$("body").prepend('<div style="display:none;"><img src="images/share_icon.png"></div>')
		//测试图层
		$("body").prepend('<div class="testLayer"></div>')
		//ajaxLoading
		$("body").prepend('<div class="ajaxLoading"></div>')
		//分享图层
		$("body").prepend('<div class="shareLayer"><div class="p0"><img src="images/share_p0.png"></div><div class="p1">良品青年们<br>快让爱情蔓延下去</div></div>')
		//背景音乐
		$("body").prepend('<audio class="musicBox" id="musicBox" preload="metadata" src="mp3/bg.mp3" loop="true">')
		//分享关闭
		$('.shareLayer').hammer({}).on("tap", function(){
			// buttonAnmi($(this),"closeDiv($('.shareLayer'));openDiv($('.msgShare'));");
			closeDiv($('.shareLayer'));
		})

 		// $.cookie('musicOpen',1);
 		
		$('.testLayer').click(function(){
 			location.reload();
 		});
		$('.testLayer').hammer({}).on("tap press pan swipe", function(){
			location.reload();
		})


 		if($.cookie('musicOpen')!=0){
 			musicBox.loop = true;
			
			// $('.btnMusic img').attr('src','images/btn_music1.png')
			TweenMax.to($('.btnMusic'),0,{autoAlpha:1})
			TweenMax.to($('.btnMusic'),5,{rotation:360, repeat:-1, yoyo:false, ease:Linear.easeNone})
		}else{
			musicBox.pause();
			// $('.btnMusic img').attr('src','images/btn_music0.png')
			TweenMax.to($('.btnMusic'),0.3,{rotation:'0_short', autoAlpha:0.3, repeat:0, yoyo:false})
		}

 		//音乐按钮
		$('.btnMusic').hammer({}).on("tap press pan swipe", function(){
			if(musicBox.paused == true){
				// $('.btnMusic img').attr('src','images/btn_music1.png')
				$.cookie('musicOpen',1);
				musicBox.play();
				TweenMax.to($('.btnMusic'),0,{autoAlpha:1})
				TweenMax.to($(this),5,{rotation:360, repeat:-1, yoyo:false, ease:Linear.easeNone})
			}else{
				// $('.btnMusic img').attr('src','images/btn_music0.png')
				$.cookie('musicOpen',0);
				musicBox.pause();
				TweenMax.to($(this),0.3,{rotation:'0_short', autoAlpha:0.3, repeat:0, yoyo:false})
			}
		})

		setFullScreenSzie();
	});
	
	$(window).resize(function(){
		setFullScreenSzie();
	})
	
	//按钮震动
	function buttonAnmi(obj,fn,param){
		// TweenMax.to(obj,0.1,{y:'+=10%',repeat:1,yoyo:true});
		TweenMax.to(obj,0.1,{autoAlpha:0.5,repeat:1,yoyo:true});

		if(fn!='undefined' || fn!=undefined || fn!=''){
			if(typeof(fn)=='function'){
				setTimeout(fn,300,param);
			}else{
				setTimeout(fn,300);
			}
		}
	}
	//打开隐藏弹窗
	function openDiv(obj){
		TweenMax.fromTo(obj,0.5,{x:0, display:'block', autoAlpha:0},{x:0, display:'block', autoAlpha:1});
	}
	//关闭弹窗
	function closeDiv(obj){
		TweenMax.to(obj,0.2,{x:0, autoAlpha:0, display:'none'});
	}
	
	//设置tableCellHeight定高
	function setFullScreenSzie(){
		$(".fullScreenSzie").each(function(){
			toW=$(window).innerWidth();
			toH=$(window).height();
	
			$(this).width(toW);
			$(this).height(toH);
		});
	}

	//设置背景缩放
	function setBGSize(ow,oh){
		bl=ow/oh;
		sw=$(window).width();
		sh=$(window).height();
		bl2=sw/sh;
		if(bl>bl2){
			$('.dynamicBG').css("background-size","auto 100%");
			$('.dynamicBgShowAll').css("background-size","100% auto");

		}else{
			$('.dynamicBG').css("background-size","100% auto");
			$('.dynamicBgShowAll').css("background-size","auto 100%");
		}
	}	
	
	//取url参数
	(function($){
		$.getUrlParam = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return decodeURI(r[2]); return null;}
	})(jQuery);
	
	function getRandom(){
		return Math.round(Math.random()*999999999);
	}

	//禁止IOS回弹;
	document.addEventListener("touchstart", function(evt){
		// if(!$(evt.target).attr('canTouch') && $(evt.target).parents('.canTouch').length==0){
  			evt.preventDefault();
		// }
	}, true);

	//调用微信接口
	// $.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js",function(){
		// getWxJsRole();
	// })
	//获取微信分享权限
	function getWxJsRole(){
		wx.config({
		debug: false,
		appId: myGameDate.wechatSign.appId,
		timestamp:  myGameDate.wechatSign.timestamp,
		nonceStr: myGameDate.wechatSign.nonceStr,
		signature: myGameDate.wechatSign.signature,
		jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideOptionMenu","showOptionMenu"]
		});
		// alert(JSON.stringify(myGameDate.wechatSign));
		wx.ready(function(){
			setWxOn();
		});

	}
	function setWxOn(){
		// wx.hideOptionMenu();
		baseurl=location.href.split('/')
		baseurl.pop();
		// baseurl.pop();
		baseurl=baseurl.join('/')+'/';
		imgUrl=baseurl+'images/share_icon.png';

		// console.log(imgUrl);
		title='爱情的九种样子，你属于哪一种？';
		desc='爱情的九种样子，你属于哪一种？';
		// link=baseurl+'startup?cc='+$.getUrlParam('cc')+'&instance='+$.cookie('PhotoInstance')+'&score='+$('.msgMakePhoto .t0 span').text();
		link=baseurl+'startup?cc='+$.getUrlParam('cc');
		wx.onMenuShareTimeline({
			title: title,
			link: link,
			imgUrl: imgUrl,
			success: function () { 
				_czc.push(["_trackEvent", "分享页", "click", "分享给好友和微信群", 1]);
				shareWx("timeline");
			},
			cancel: function () { 
				// alert("分享好友可以得到更多赞哦！")
			},
			trigger: function(){
			}
		});
		wx.onMenuShareAppMessage({
			title: title,
			desc: desc,
			link: link,
			imgUrl: imgUrl,
			type: 'link',
			dataUrl: '',
			success: function () {
				_czc.push(["_trackEvent", "分享页", "click", "分享到朋友圈", 1]);
				shareWx("appmessage");
			},
			cancel: function () {
				// alert("分享好友可以得到更多赞哦！")
			},
			trigger: function(){
			}
		});
	}

	function shareWx(){
		_czc.push(["_trackEvent", "分享页", "click", "分享成功", 1]);
	}
