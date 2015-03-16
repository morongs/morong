(function(window, undefined) {

	var load = morong.$$('loading');
	var box1 = morong.$$('box1');
	var imgPath = './style/image/';
	var loadingPage = (function () {
	    var imgSources = ['morong.jpg', 'box-bg1.jpg', 'box-bg2.png', 'box-bg3.png', 'box-bg4.jpg', 'bg-dark.png', '6soft.jpg', '6soft-m.jpg', 'jinpai.jpg', 'forum.jpg', 'personal-m.jpg', 'yang-m.jpg', 'hobby-01.jpg', 'hobby-02.jpg', 'hobby-03.jpg', 'hobby-04.jpg', 'skill-txt.png', 'hobby-txt.png', 'footer-txt.png', 'case-code-6soft.png', 'case-code-mo.png', 'case-code-yang.png'];
	    for (var i = 0; i < imgSources.length; i++) {
	        imgSources[i] = (imgPath + imgSources[i]);
	    };
	    var loadImage = function (path, callback) {
	        var img = new Image();
	        img.onload = function () {
	            img.onload = null;
	            callback(path);
	        }
	        img.src = path;
	    }

	    var imgLoader = function (imgs, callback) {
	        var len = imgs.length, i = 0;
	        while (imgs.length) {
	            loadImage(imgs.shift(), function (path) {
	                callback(path, ++i, len);
	            })
	        }
	    }
	    var percent = 0;
	    imgLoader(imgSources, function (path, curNum, total) {
	        percent = curNum / total;
	        if (percent == 1) {
               	load.className += " load-hide";
	            setTimeout(function () {
					load.style.display = "none";
	                box1.className += " on";
	            }, 500);
	        }
	    });
	})();


})(window);