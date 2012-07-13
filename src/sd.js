function CmfuAjax(){
  this.xml=false;
  this.GetXmlHttp=function(){
    try {this.xml = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) {
        try { this.xml = new ActiveXObject("Microsoft.XMLHTTP");} 
        catch (e2) { this.xml = false;};
    };
    if (!this.xml && typeof XMLHttpRequest != 'undefined')
 		this.xml = new XMLHttpRequest();
  };
  this.GetXmlHttp();

  var xmlHttp = this.xml;
  var ajax=this;
  var callBack=null;
  this.updatePage=function() {
    if (xmlHttp.readyState == 4) {
        var response = eval('('+xmlHttp.responseText+')');
        if(callBack!=null && typeof  callBack == "function")    callBack(response);
    }; 
  };
  this.toQueryString=function(json){
    var query="";
    if(json!=null)  for(var param in json)  
		query+=param+"="+escape(json[param])+"&";
    return query; 
  };
  this.invoke=function(opName,params,pageCallBack,method){
    var _flag = false;// is use domain.qidian.com
    var domainUrl = "";
    if (document.getElementById("ctl00_MainBase")!=null && document.getElementById("ctl00_MainBase").href!=""){
        _flag = true;
        domainUrl=window.location.href.toLowerCase();
        domainUrl=domainUrl.substring(domainUrl.indexOf("//")+2);
        if (domainUrl.indexOf("/")>-1)  domainUrl=domainUrl.substring(0,domainUrl.indexOf("/"));
        domainUrl="http://"+domainUrl;
    };

    if(xmlHttp){
        var query="";
        query+=this.toQueryString(params);
        query=query.substring(0,query.length-1);
        callBack= pageCallBack;
        var ajaxUrl = "/ajax.aspx";
        switch(opName){
			case "pub.p.up.addbookmark":
			    ajaxUrl= "/AjaxCom.aspx";
			    break;
			default:
			    ajaxUrl= "/Ajax.aspx";
			    break;
		}
        if(method!=null &&method.toUpperCase()=="GET"){
            var url = ajaxUrl + "?opName="+opName+"&"+query;
            if(_flag)   url = domainUrl + url;
            xmlHttp.onreadystatechange = ajax.updatePage;
            xmlHttp.open("GET", url, true);
            xmlHttp.setRequestHeader("CMFUAJAX-Ver","ver1.0");
            xmlHttp.send(null);
        }else{
            var url ="";
            if(opName!=null && (opName.toLowerCase()=="vote0714"||opName.toLowerCase()=="voteauthor"||opName.toLowerCase()=="voteauthorname"))
                  url= "/ply/20080924/VoteService.aspx?opName="+opName;
            else if (opName != null && (opName.toLowerCase() == "pub.p.up.vote0714" || opName.toLowerCase() == "pub.p.up.voteauthor" || opName.toLowerCase() == "pub.p.up.voteauthorname")) {
                    url = "/ply/20080924/VoteService.aspx?opName=" + opName;    
            }
            else if(opName!=null && (opName.toLowerCase()=="getuserip"))   url="/user/userip.aspx";
            else if(opName!=null && opName.toLowerCase()=="pub.p.dw.getuserip")   url="/user/userip.aspx";
            else {
				url = ajaxUrl + "?opName=" + opName;
            }
            if(_flag)   url = domainUrl + url;
            xmlHttp.onreadystatechange =ajax.updatePage; 
            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlHttp.setRequestHeader("CMFUAJAX-Ver","ver1.0");
            xmlHttp.send(query);
   		};
	};
  };
};

var MyAjax={
    AddClubReview: function(validCode, content, clubId) {
        var validateHdd=document.getElementById("hddValidateCode");
        var validateString="";
        if (validateHdd!=null) validateString = validateHdd.value;
        new CmfuAjax().invoke("pub.p.up.addclubreview", {"validCode":validCode, "content":content, "clubId":clubId,"validateString":validateString}, arguments[3]);
    },
    AddClubSpecialReview: function(validCode, content, clubSpecialID,fromNickName) {
        var validateHdd=document.getElementById("hddValidateCode");
        var validateString="";
        if (validateHdd!=null) validateString = validateHdd.value;
        new CmfuAjax().invoke("pub.p.up.addclubspecialreview", {"validCode":validCode, "content":content, "clubSpecialID":clubSpecialID,"fromNickName":fromNickName,"validateString":validateString}, arguments[4]);
    }
};