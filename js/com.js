// 初始化全局方法
var morong = function() {
	return {
		// 获取ID
		$$: function(id) {
			return (!id) ? null : document.getElementById(id);
		}, 
		// 移除前后空格
		trimStr: function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}
	}
}();

/* ********************表单提交****************** */
// 表单发送构造函数
function SendForm(form,name,email,company,addr,content,btn,prompt) {
	this._form = morong.$$(form);		// 表单
	this._name = morong.$$(name);		// 联系人
	this.email = morong.$$(email);		// 邮箱
	this.company = morong.$$(company);	// 公司名称
	this.addr = morong.$$(addr);	// 地址
	this.con = morong.$$(content);	// 留言内容
	this.btn = morong.$$(btn);		// 提交按钮
	this.pro = morong.$$(prompt);	// 消息提示
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
			email = morong.trimStr(_self.email.value),
			company = _self.company.value,
			addr = _self.addr.value,
			con = _self.con.value,
			reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;	// 正则匹配邮箱
		// 验证必填项
		if (name === '') { // 联系人
			_self.promptMess("联系人不允许为空！");
			_self._name.focus();
			return false;
		} else if (email === '') {	// 邮箱
			_self.promptMess("邮箱地址不允许为空！");
			_self.email.focus();
			return false;
		} else if (!reg.test(email)) {	// 邮箱格式
			_self.promptMess("邮箱格式不正确！");
			_self.email.focus();
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
		xhr.send("name="+name+"&email="+email+"&company="+company+"&addr="+addr+"&content="+con);

	},
	// 初始化
	init: function() {
		var _self = this;
		// 添加发送按钮的事件监听
		_self.btn.addEventListener('click', function(ev) {
			_self.sendContent();
		}, false);
	}
};
// 实例化对象
var send = new SendForm("form", "name", "email", "company", "addr", "content", "formBtn", "prompt");
send.init(); // 初始化化
