/* * * * * * * * * * * * * 
 * CSS functions 
 * * * * * * * * * * * * **/
function _activate(_s,burglish_flag){
	burglish_flag = $(_s).style.display == "none";
	$(_s).style.display=burglish_flag!=false?"":"none";
	$(_s).visible=burglish_flag!=false?false:true;
}
function _deactivate(_s){
	$(_s).style.display="none";
	$(_s).visible=false;
}
function _show(_s,burglish_flag){
	$(_s).style.visibility=burglish_flag!=false?"visible":"hidden";
	$(_s).visible=burglish_flag!=false?false:true;
}
function _hide(_s){
	$(_s).style.visibility="hidden";
	$(_s).visible=false;
}
function setZorder(_s,order){
	if(document.getElementById)document.getElementById(_s).style.zIndex=order;
	else if(document.all)document.all(_s).style.zIndex=order;else if(document.layers)document.layers[_s].zIndex=order;
}
function getZorder(_s,order){
	if(document.getElementById)return document.getElementById(_s).style.zIndex;
	else if(document.all)return document.all(_s).style.zIndex;else if(document.layers)return document.layers[_s].zIndex;
}
function addStyle(_opt){
	var ss1 = document.createElement('style');
	ss1.setAttribute("type", "text/css");
	if(_opt.id) ss1.setAttribute("id", _opt.id);
	if (ss1.styleSheet) {
	    ss1.styleSheet.cssText = _opt.css;
	}else {
	    var tt1 = document.createTextNode(_opt.css);
	    ss1.appendChild(tt1);
	}
	var hh1 = document.getElementsByTagName('head')[0];
	hh1.appendChild(ss1);
}

/* * * * * * * * * * * * * 
 * Array functions 
 * * * * * * * * * * * * **/
function nSort(a,b){
	return a - b;
}
String.prototype.inc=function(_s){
	var ret = -1;
	if(arguments.length!=1) return ret;
	if(typeof(_s)!="array" && typeof(_s)!="object") return ret;
	for(var i1=0;i1<_s.length;i1++){
		if(this==_s[i1]) ret = i1;
	};
	//alert(typeof(_s));
	return ret;
};
//alert("test".in(["test2","test1","test","test3"]));
String.prototype.reverse=function(){
	var ret="";
	for(var i=0;i <this.length;i++){
		ret=this.charAt(i)+ret;
	};
	return ret;
};

/* * * * * * * * * * * * * 
 * String functions 
 * * * * * * * * * * * * **/
 function fillZero(_s,len){
	var ret=String(_s);
	while(ret.length < len){
		ret="0"+ret;
	}
	return ret;
}
function addSlash(_s){
	return _s.replace(/([!"#$%&'()*+,-./:;?@[\\\]_`{|}~])/g,'\\$1');
}
;String.prototype.addSlash=function(){
	return addSlash(this);
};
function trim(_s){
	return _s.replace(/^[\s\u200B]+|[\s\u200B]+$/gm,'');
};
function ctrim(_s){
	return trim(_s).replace(/^\,+|\,+$/gm,'')
};
String.prototype.trim=function(){
	return trim(this);
};
String.prototype.ctrim=function(){
	return ctrim(this);
};
String.prototype.zfill = function(len){
	return fillZero(this,len);
};
function unichr(x){
	return String.fromCharCode(x);
}
function len(x){
	return x.length;
}
function escapeu(_s){
	return escape(_s).replace(/\%/g,'\\');
}
function unescapeu(_s){
	return unescape(_s.replace(/\\/g,'%'));
}
function unescapeuc(_s){
	return unescape(_s.replace(/\\([0-7][0-9A-F])/g,'%$1'));
}

/* * * * * * * * * * * * * 
 * loading tricks
 * * * * * * * * * * * * **/
function loadingbar(burglish_flag,callback,loadingstr){
	if(burglish_flag){
		if($('loading')){
			_show("loading");
		}else{
			var txtdiv = document.createElement("div");
			txtdiv.innerHTML = '<div id="loading" style="visibility:visible;z-index:1000;color:#ffffff;background-color:#ff0000;top:0;float:right;text-align: center;vertical-align:middle;">'+(loadingstr||'Loading...')+'</div>';
			document.body.appendChild(txtdiv);
		}
		setTimeout(eval(callback),100);
	}else{
		_hide("loading");
	}
}

/* * * * * * * * * * * * * 
 * Date Time & Math functions 
 * * * * * * * * * * * * **/
function getDate(_s) {
	var ret;
	if(_s.length == 8 ) {
		ret = new Date( _s.substr(0,4), _s.substr(4,2) - 1, _s.substr(6,2) );
	}else if(_s.length == 14 ) {
		ret = new Date( _s.substr(0,4), _s.substr(4,2) - 1, _s.substr(6,2) , _s.substr(8,2) , _s.substr(10,2), _s.substr(12,2));
	}
	return ret;
}
function GetCurDateStr(){
	var _s=new Date();
	return _s.getFullYear()+_s.getMonth()+_s.getDate()+"T"+_s.getHours()+_s.getMinutes()+_s.getSeconds();
}
function getDay(inDate){
	var dayArry=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	return dayArry[inDate.getDay()];
}
function addDate( inDate, val ){
	var tmp = inDate.getTime();
	tmp = tmp + 86400000 * val;
	return(new Date(tmp));
}
function addMS( inDate, val){
	var tmp = inDate.getTime();
	tmp = tmp + val;
	return(new Date(tmp));
}
function rnd(){
	return Math.random();
}

/* * * * * * * * * * * * * 
 * DOM functions
 * * * * * * * * * * * * **/

 /* originally written by chris wetherell, updated by aTxIvG4001*/
function _mozWrap(txtarea, lft, rgt, _offset, _offset2) {
	rgt=rgt||'';_offset=_offset||0;_offset2=_offset2?(_offset2-1):0;var _sctop=txtarea.scrollTop;var _scleft=txtarea.scrollLeft;
		var selLength = txtarea.textLength;
		var selStart = txtarea.selectionStart - _offset2;
		var selEnd = txtarea.selectionEnd - _offset2;
		if (selEnd==1 || selEnd==2) selEnd=selLength;
		var s1 = (txtarea.value).substring(0,selStart-_offset);
		var s2 = (txtarea.value).substring(selStart, selEnd);
		var s3 = (txtarea.value).substring(selEnd, selLength);
		txtarea.value = s1 + lft + (rgt?s2:'') + rgt + s3; //if bbcode, dont overwrite the selected text
		txtarea.selectionStart = selStart+(lft.length-_offset)+_offset2;
		txtarea.selectionEnd = txtarea.selectionStart;
		//self.status=[txtarea.selectionStart,txtarea.selectionEnd];
		txtarea.scrollTop=_sctop;txtarea.scrollLeft=_scleft;
		return false;
}
function _IEWrap(txtarea, lft, rgt, _offset,_offset2) {
	rgt=rgt||'';_offset=_offset||0;_offset2=_offset2?(_offset2-1):0;
	txtarea.focus();
	var dummy="\u200B\u200C\u200B";
	var burglish_range = document.selection.createRange();
	burglish_range.moveStart("character", -_offset2); //move -_offset2 char back
	var s2= burglish_range.text;
	document.selection.createRange().text = burglish_range.text + dummy;
	var selStart= txtarea.value.indexOf(dummy)-_offset2;
	var s1= txtarea.value.substring(0,selStart-_offset-s2.length);
	var s3 = txtarea.value.substring(selStart+dummy.length, txtarea.value.length);
	
	txtarea.value = s1 +	lft + s2 + rgt +s3;
	
	burglish_range = txtarea.createTextRange(); //clear the selections
	burglish_range.collapse(true);
	
	var _r_n = s1.split("\r\n").length-1; //f**kin windows and IE
	burglish_range.moveStart("character", selStart+(lft.length-_offset)-_r_n);
	burglish_range.select();

	return false;
}
function _Wrap(txtarea, lft, rgt, _offset,_offset2){
	isIE?_IEWrap(txtarea, lft, rgt, _offset,_offset2):_mozWrap(txtarea, lft, rgt, _offset,_offset2);
}
function _xy(_s) {
	_g = $(_s);
	var _left =_g.offsetLeft; var _top = _g.offsetTop;
	while (_g=_g.offsetParent) {
		_left += _g.offsetLeft;
	}
	_g = $(_s);
	while (_g=_g.offsetParent) {
		_top += _g.offsetTop;
	}
	return [_left,_top];
}

var burglish_drag=false;
var burglish_x,burglish_y;
var burglish_dobj;

function dom_move(evt){
	if (burglish_drag){
		burglish_dobj.style.left = isGecko ? tx + evt.clientX - burglish_x : tx + event.clientX - burglish_x;
		burglish_dobj.style.top = isGecko ? ty + evt.clientY - burglish_y : ty + event.clientY - burglish_y;
		return false;
	}
}
function init_dom_move(evt){
	var burglish_fobj	= isGecko ? evt.target : event.srcElement;
	var topelement = isIE ? "BODY" : "HTML";
	
	while (burglish_fobj.tagName != topelement && !/dragme/.test(burglish_fobj.className)){
		burglish_fobj = isGecko ? burglish_fobj.parentNode : burglish_fobj.parentElement;
	}

	if (/dragme/.test(burglish_fobj.className)){
		burglish_drag = true;
		burglish_dobj = burglish_fobj;
		//burglish_dobj.style.position="absolute";
		tx = parseInt(burglish_dobj.style.left+0);
		ty = parseInt(burglish_dobj.style.top+0);
		burglish_x = isGecko ? evt.clientX : event.clientX;
		burglish_y = isGecko ? evt.clientY : event.clientY;
		document.onmousemove=dom_move;
		return false;
	}
}
;document.onmousedown=init_dom_move;
document.onmouseup=new Function("burglish_drag=false");

;burglish_loaded.lib=true;
