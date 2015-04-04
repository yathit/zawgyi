/* AJAX */
;var ajax;
function AJAX(){
	if (window.XMLHttpRequest){
		this.request=new XMLHttpRequest();
	}else if (window.ActiveXObject)	{
		this.request=new ActiveXObject("Microsoft.XMLHTTP");
	}
};
AJAX.prototype.listener;
AJAX.prototype.setListener = function( listener ){
	this.listener = listener;
};

var _headers={
	"User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6"
	,"Accept-Language":"en"
	,"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
	//,"If-Modified-Since":new Date(new Date().getTime()-864000000).toUTCString()
};
;AJAX.prototype.send = function( method, url, data ){
	this.request.onreadystatechange = this.listener;
    this.request.open( method, url, !isIE );
    for(var x in _headers) {this.request.setRequestHeader(x, _headers[x]);}
    if(typeof(this.request.overrideMimeType) != "undefined" ) this.request.overrideMimeType( "text/html" );
	var pd = "";for(var elm in data) pd += ( "&"+encodeURIComponent(elm)+"="+encodeURIComponent(data[elm]) );
    this.request.send( pd );
};

AJAX.prototype.isReady = function(){
	if( !isIE ) return true;
	return this.request.readyState == 4 && this.request.status==200;
};

var MSG={
chat :{ondata : "Chat Result OK"}
,security :{needHttps : "Secure Socket Layer(https://)is Needed!"}
,display :{showAlert:"\nDo you want to display this alert Next time?"},
already :{loading:"Wait for next message."}
};

function SendAjax(mode,burglish_params,listener,method,ajaxUrl, ajax){
	ajax=new AJAX();
	if(typeof(ajax)!='undefined'){
		if(typeof(burglish_params)!="object"){
			var burglish_params=new Object();
		}
		if(typeof(listener)!="function"){
			var listener=onAjax;
		}
		ajax.setListener(function(){OnAjax(ajax,listener,burglish_params);});
		burglish_params["mode"]=mode;
		//burglish_params["loc"]=location.href;
		//burglish_params["host"]=location.hostname;
		burglish_params["replied"]=false;
		ajax.send((method?method:"POST"),(ajaxUrl?ajaxUrl:"./ajax.php"),burglish_params);
	}
};
var showAlert=true;
function OnAjax(ajax,listener,burglish_params){
	if(!isDef(ajax)) return;
	if(ajax.isReady()&& !burglish_params.replied){
		var res=unescape(ajax.request.responseText);
		if(res=="")return;
		if(typeof(res)!='undefined'){
			try{
				if(burglish_params["noheader"]){
					if(burglish_params["noformat"]){
						listener("OK",MSG.chat.ondata,res,burglish_params);
					}else{
						listener("OK",MSG.chat.ondata,eval("("+res+")"),burglish_params);
					}
					burglish_params["replied"]=true;
					return;
				}
				eval("var _RES=new Object("+res+")");
				if(typeof(_RES)=="object"){
					try{
						if(_RES.THROW) eval(_RES.THROW);
					}catch(e){}
					listener(_RES.RESPONSE,eval(_RES.RESULT),_RES.DATA,burglish_params);
					burglish_params["replied"]=true;
				}else{
					listener("ERROR","Invalid Object","",burglish_params);
				}
			}catch(e){
				//listener("ERROR","Invalid Object","",burglish_params);
			}
		}
	}
}
;burglish_loaded.ajax = true;
/* AJAX END */