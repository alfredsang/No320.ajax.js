/*类机制定义*/
window.Class = function(name, src) {
    src.constructor.prototype = src;
    window[name] = src.constructor;
};

/*No320Ajax类*/
Class("No320Ajax", {
	constructor: function() {
		xhr=new XMLHttpRequest();
		cb=function(){};
		return this;
	},
	get:function(url,callback){
		cb=callback;
		this.__ajax(url,"GET");
	},
	post:function(url,callback){
		cb=callback;
		this.__ajax(url,"POST");
	},
	__ajax:function(url,type) {
	    xhr.open(type, url, true);
	    xhr.onreadystatechange = this.__callback;
	    xhr.send(null);
	},
	__callback:function(){
		//alert(xhr.responseText);
		if(xhr.readyState == 4 && (xhr.status == 200||xhr.status == 0) ) {
			cb(xhr.responseText);    
		}
	}
})

//def alias
window.$ = new No320Ajax();

//test
//TODO:实现请求队列
function testAjax() {
	$.get("No320.ajax.js",function(respText){
		 //alert(respText);
		 document.getElementById("ajaxGetDiv").innerHTML = respText;
	});
	
	setTimeout(function(){
		$.post("No320.ajax.js",function(respText){
			//alert("post"+respText);
			document.getElementById("ajaxPostDiv").innerHTML = respText;
		});
	},2000);
}