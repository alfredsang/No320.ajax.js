No320.ajax.js
=============

ajax implemetion

## 前生
这是为No320Log项目写的，当时只是有异步提交，无dom操作，如果我选择现有库，无论是那个，都要在8k+,又不是很难，于是有了这个项目

## 用法

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

## TODO：

$.get("No320.ajax.js",function(respText){},function(xhr){// set head info})；

- 头部信息没有进行处理
- 请求提交队列
- 增加测试和压缩工具
- 改造成Amd版本

## 更多信息 
www.no320.com
