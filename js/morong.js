// 初始化全局方法
window.morong = function() {
	return {
		// 获取ID
		$$: function(id) {
			return (!id) ? null : document.getElementById(id);
		}, 
		// 移除前后空格
		trimStr: function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		hasClass: function(ele, cls) {
			return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		},
		addClass: function(ele, cls) {
			if (!this.hasClass(ele, cls)) ele.className += ' '+cls;
		},
		removeClass: function(ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
				ele.className = ele.className.replace(reg, '');
			}
		},
		removeAllClass: function(eleArr, cls) {
			for (var i = 0, len = eleArr.length; i < len; i++) {
				this.removeClass(eleArr[i], cls);
			}
		},
		// 获取类名
		getClass: function(node, cls) {
			if (typeof document.getElementsByClassName != 'function') {
				var a = [];
			    var re = new RegExp('(^| )'+cls+'( |$)');
			    var els = node.getElementsByTagName("div");
			    for(var i=0,j=els.length; i<j; i++) {
			    	if (els[i].className) {
				        if (re.test(els[i].className)) a.push(els[i]);
			    	} else if (els[i].getAttribute('class')) {
			    		if (re.test(els[i].getAttribute("class"))) a.push(ele[i]);
			    	}
			    }
			    return a;
			} else {
				return document.getElementsByClassName(cls);
			}
		},
		// 添加事件
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		// 获取事件
		getEvent: function(event) {
			return event ? event : window.event;
		},
		// 移除前后空格
		trimStr: function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		} 
	};
}();