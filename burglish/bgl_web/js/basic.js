/*basic*/
var burglish_agent=navigator.userAgent;
var isGecko= /Gecko/.test(burglish_agent);
var isOpera= /Opera/.test(burglish_agent);
var isIE= /MSIE/.test(burglish_agent);
function $(_s){
	return document.getElementById(_s);
}
function isDef(_s){
	try{var tmp=eval(_s);if(typeof(eval(_s))!="undefined") return true;}catch(e){}
	return false;
}
var burglish_loaded={basic:true}; var tmpjs={i:0,_g:{}};
function loadjs(_g,_cb,_u1,_u2,_t){
	burglish_loaded._g=tmpjs._g=_g=_g.split(/[\s\,]+/);var _u1=_u1||(_u1==''?'':'js/');var _u2=_u2||(_u2==''?'':'.js');tmpjs._cb=_cb;
	for(var i =0; i < _g.length ; i++){
	    if(!burglish_loaded[_g[i]]){
			var x = document.createElement(_t||'script');x.src = _u1 + _g[i] + _u2;x.xid=_g[i];x.id="$"+_g[i]+"$";x.onload=function(){burglish_loaded[this.xid]=true;};
			document.getElementsByTagName("head")[0].appendChild(x);
		}
	}
	if(_cb) tmpjs.timeout=setTimeout(checkloaded,50);
}
function checkloaded(){
	var burglish_flag=true;
	for( var i =0; i < tmpjs._g.length ; i++){
		if(!burglish_loaded[tmpjs._g[i]]) burglish_flag=false;
	}
	tmpjs.i++;clearTimeout(tmpjs.timeout);
	if(burglish_flag){tmpjs._cb();}else{tmpjs.timeout=setTimeout(checkloaded,100);};
}
