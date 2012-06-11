

var xhr;
function testAjax() {
    var url = "No320.ajax.js";
    xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = callback;
    xhr.send(null);
}

function callback() {
  	if(xhr.readyState == 4 && (xhr.status == 200||xhr.status == 0) ) {		  
	      document.getElementById("ajaxDiv").innerHTML = xhr.responseText;
	}
}

