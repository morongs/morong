(function(window, undefined) {

	/* **************************************
	* 屏幕滚轮换屏构造函数
	************************************** */
	function MouseWheelFun(opts) {
		this.main = opts.main;	// 总内容
		this.nav = opts.nav;	// 导航按钮
		this.nextBtn = opts.nextBtn;	// 向下按钮
		this.topBtn = opts.topBtn;	// 回到顶部按钮
		this.toTime = opts.toTime;	// 移动时间
		this.tag = this.main.getElementsByTagName(opts.tag);	// 获取元素名
		this.cur = opts.cur;	// 当前类名
		this.len = this.tag.length;		// 元素长度
		this.idx = 0;	// 当前位置
		this.scrollLock = true;		// 防止多次滚动
	}
	MouseWheelFun.prototype = {
		constructor: MouseWheelFun,
		getDotNav: function() {
			var srcHTML = '';
			for (var i = 0; i < this.len; i++) {
				srcHTML += '<li></li>';
			}
			this.nav.innerHTML = srcHTML;
			this.navLi = this.nav.getElementsByTagName("li");
			morong.addClass(this.navLi[0], this.cur);
			this.navEvent();
		},
		navEvent: function() {
			var _self = this;
			// 添加导航点击事件
			morong.addHandler(_self.nav, "click", function(event) {
				var evt = event || window.event,
				target = evt.target ? evt.target : evt.srcElement;
				if (target.nodeName.toLowerCase() == "li") {
					// 判断点击索引
					for (var i = 0; i < _self.len; i++) {
						if (_self.navLi[i] == target) {
							_self.idx = i;
							_self.sliderAni();
						}
					}
				}
			});
		},
		addEvent: function(ele, fun) {
			(/firefox/i).test(navigator.userAgent) ? 
			ele.addEventListener("DOMMouseScroll", fun, false) : 
			ele.onmousewheel = fun;
		},
		keyDownEvent: function(event) {
			var evt = event || window.event,
				code = evt.keyCode || evt.which || evt.charCode,
				_self = this;
			switch (code) {
				// 向上
				case 38:
					_self.wheelDirection(-3);
					break;
				// 向下
				case 40: 
					_self.wheelDirection(3);
					break; 
			};
		},
		wheelDirection: function(detail) {
			var _self = this;
			switch (detail) {
				// 向下
				case 3:
					if (_self.idx < _self.len - 1 && _self.scrollLock == true) {
						_self.idx++;
						_self.sliderAni();
					}
					break;
				// 向上
				case -3:
					if (_self.idx > 0 && _self.scrollLock == true) {
						_self.idx--;
						_self.sliderAni();
					}
					break;
				case 0:
					_self.idx = 0;
					_self.sliderAni();
					break;
			}
		},
		// 切换动画
		sliderAni: function() {
			var _self = this;
			_self.scrollLock = false;
			_self.main.style.webkitTransform = _self.main.style.MozTransform = _self.main.style.transform = 'translateY(-'+(_self.idx * 100)+'%)';
			_self.main.style.webkitTransition = _self.main.style.MozTransition = _self.main.style.transition = 'all '+_self.toTime+'ms ease-in-out';
			// 导航添加当前类
			morong.removeAllClass(_self.navLi, _self.cur);
			morong.addClass(_self.navLi[_self.idx], _self.cur);
			setTimeout(function() {
				// 锁定解除
				_self.scrollLock = true;
				// 内容添加当前类
				morong.removeAllClass(_self.tag, _self.cur);
				morong.addClass(_self.tag[_self.idx], _self.cur);
			}, _self.toTime);
		},
		init: function() {
			var _self = this;
			_self.getDotNav();
			_self.addEvent(document, function(event) {
				var evt = event || window.event;
				var detail = evt.detail || parseInt(-evt.wheelDelta / 40);
				_self.wheelDirection(detail);
			});
			// 键盘方向键
			document.onkeydown = function(event) {
				_self.keyDownEvent(event);
			};
			// 点击下一个页按钮
			for (var i=0, len=_self.nextBtn.length; i<len; i++) {
				(function(i) {
					_self.nextBtn[i].onclick = function() {
						_self.wheelDirection(3);
					}
				})(i);
			}
			// 回到顶部
			_self.topBtn.onclick = function() {
				_self.wheelDirection(0);
			};
		}
	};
	new MouseWheelFun({
		main : morong.$$("main"),
		nav : morong.$$("dotNav"),
		nextBtn : morong.getClass(document.body, "next-btn"),
		topBtn : morong.$$("topBtn"),
		tag : "article",
		cur : "on",
		toTime : 800
	}).init();



	/* **************************************
	* 掌握技能鼠标移动构造函数
	************************************** */
	function BoxMouseOver(opts) {
		this.box = opts.box;		// 最大元素
		this.ul = opts.ul;			// 标签
	}
	BoxMouseOver.prototype = {
		constructor: BoxMouseOver,
		// 设置元素动画参数
		setEleAniPar: function() {
			var _self = this;
			morong.addHandler(_self.box, "mousemove", function(event) {
				var e = morong.getEvent(event),
					x = e.clientX,
					y = e.clientY,
					i;
				_self.ul.style.webkitTransform = _self.ul.style.MozTransition = _self.ul.style.transition = 
				'translate('+(-x*0.02)+'px, '+(-y*0.02)+'px)';
			});
		},
		init: function() {
			var _self = this;
			_self.setEleAniPar();
		}
	};	
	new BoxMouseOver({
		box: morong.$$("skill"),
		ul: morong.$$("skillTag")
	}).init();



	/* **************************************
	* 表单提交, 表单发送构造函数
	************************************** */
	function SendForm(opts) {
		// this._form = opts._form;		// 表单
		this._name = opts._name;		// 联系人
		this.addr = opts.addr;			// 主页地址
		this.con = opts.con;			// 留言内容
		this.btn = opts.btn;			// 提交按钮
		this.pro = opts._prompt;		// 消息提示
		this.lock = true;				// 防止多次发送
	}
	// 添加表单发送原型方法
	SendForm.prototype = {
		constructor: SendForm,
		promptMess: function(message, time) {
			var _self = this;
			time = time || 1800;	// 设置时间
			_self.pro.childNodes[0].innerHTML = message;
			_self.pro.style.display = "block";
			setTimeout(function(){
				_self.pro.style.display = "none";
			}, time);
		},
		// 获取表单内容，并发送
		sendContent: function() {
			// 获取表单内容
			var _self = this,
				name = morong.trimStr(_self._name.value),
				addr = morong.trimStr(_self.addr.value),
				con = morong.trimStr(_self.con.value);
			// 验证必填项
			if (name == '') { // 昵称
				_self.promptMess("昵称不允许为空！");
				_self._name.focus();
				return false;
			} else if (addr == '') {	// 主页地址
				_self.promptMess("主页地址不能为空！");
				_self.addr.focus();
				return false;
			} else if (con == '') {	// 邮箱格式
				_self.promptMess("留言内容不能为空！");
				_self.con.focus();
				return false;
			}

			// 创建XHR对象
			var	xhr;		// 初始化XMLHttpRequest对象
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {	// IE7以下
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			// 检测状态发生改变
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {	// 如果完成
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						// 如果返回数据是1，则发送成功，并且返回停止后续操作
						if (xhr.responseText == 1) {
							_self.promptMess("发送成功，将尽快回复您！", 3500);
							return false;
						}
					}
					// 发送失败
					_self.promptMess("发送失败，请重新发送！", 3000);
				}
			};
			xhr.open("post", "email.php" , false);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			// 发送数据
			xhr.send("name="+name+"&addr="+addr+"&content="+con);
			_self.lock = false;
		},
		// 初始化
		init: function() {
			var _self = this;
			// 添加发送按钮的事件监听
			_self.btn.addEventListener('click', function() {
				if (_self.lock) {
					_self.sendContent();
				} else {
					_self.promptMess("您已成功留言了，谢谢支持！", 3000);
				}
			}, false);
		}
	};
	// 实例化对象
	new SendForm({
		_name: morong.$$("name"),
		addr: morong.$$("url"),
		con: morong.$$("content"),
		btn: morong.$$("mailBtn"),
		_prompt: morong.$$("prompt")
	}).init();



})(window);