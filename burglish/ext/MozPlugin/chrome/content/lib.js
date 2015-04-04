/* * * * * * * * * * * * * 
 * CSS functions 
 * * * * * * * * * * * * **/
function _activate(_s,flag){
	flag = _id(_s).style.display == "none";
	_id(_s).style.display=flag!=false?"":"none";
	_id(_s).visible=flag!=false?false:true;
}
function _deactivate(_s){
	_id(_s).style.display="none";
	_id(_s).visible=false;
}
function _show(_s,flag){
	_id(_s).style.visibility=flag!=false?"visible":"hidden";
	_id(_s).visible=flag!=false?false:true;
}
function _hide(_s){
	_id(_s).style.visibility="hidden";
	_id(_s).visible=false;
}
function setZorder(_s,order){
	if(mmgeeks.doc.getElementById)mmgeeks.doc.getElementById(_s).style.zIndex=order;
	else if(mmgeeks.doc.all)mmgeeks.doc.all(_s).style.zIndex=order;else if(mmgeeks.doc.layers)mmgeeks.doc.layers[_s].zIndex=order;
}
function getZorder(_s,order){
	if(mmgeeks.doc.getElementById)return mmgeeks.doc.getElementById(_s).style.zIndex;
	else if(mmgeeks.doc.all)return mmgeeks.doc.all(_s).style.zIndex;else if(mmgeeks.doc.layers)return mmgeeks.doc.layers[_s].zIndex;
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
 function fillZero(str,len){
	var ret=String(str);
	while(ret.length < len){
		ret="0"+ret;
	}
	return ret;
}
function addSlash(str){
	return str.replace(/([!"#$%&'()*+,-./:;?@[\\\]_`{|}~])/g,'\\$1');
}
;String.prototype.addSlash=function(){
	return addSlash(this);
};
function trim(str){
	return str.replace(/^[\s\u200B]+|[\s\u200B]+$/gm,'');
};
function ctrim(str){
	return trim(str).replace(/^\,+|\,+$/gm,'')
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
function str(x){
	return String(x);
};
function escapeu(str){
	return escape(str).replace(/\%/g,'\\');
}
function unescapeu(str){
	return unescape(str.replace(/\\/g,'%'));
}
function unescapeuc(str){
	return unescape(str.replace(/\\([0-7][0-9A-F])/g,'%$1'));
}

/* * * * * * * * * * * * * 
 * loading tricks
 * * * * * * * * * * * * **/
var loadingstr='<div id="loading" style="visibility:visible;z-index:1000;color:#ffffff;background-color:#ff0000;position:absolute;top:0;left:90%;width:10%;text-align: center;vertical-align:middle;">Loading...</div>';
function loadingbar(flag,callback){
	if(flag){
		if(_id('loading')){
			_show("loading");
		}else{
			var txtdiv = mmgeeks.doc.createElement("div");
			txtdiv.innerHTML = loadingstr;
			mmgeeks.doc.body.appendChild(txtdiv);
		}
		setTimeout(eval(callback),100);
	}else{
		_hide("loading");
	}
}

/* * * * * * * * * * * * * 
 * Date Time & Math functions 
 * * * * * * * * * * * * **/
function getDate( inStr ) {
	var ret;
	if(inStr.length == 8 ) {
		ret = new Date( inStr.substr(0,4), inStr.substr(4,2) - 1, inStr.substr(6,2) );
	}else if(inStr.length == 14 ) {
		ret = new Date( inStr.substr(0,4), inStr.substr(4,2) - 1, inStr.substr(6,2) , inStr.substr(8,2) , inStr.substr(10,2), inStr.substr(12,2));
	}
	return ret;
}
function GetCurDateStr(){
	var d=new Date();
	return d.getFullYear()+d.getMonth()+d.getDate()+"T"+d.getHours()+d.getMinutes()+d.getSeconds();
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
	rgt=rgt||'';_offset=_offset||0;_offset2=_offset2?(_offset2-1):0;var _sctop=txtarea.scrollTop;
		var selLength = txtarea.textLength;
		var selStart = txtarea.selectionStart - _offset2;
		var selEnd = txtarea.selectionEnd - _offset2;
		if (selEnd==1 || selEnd==2) selEnd=selLength;
		var s1 = (txtarea.value).substring(0,selStart-_offset);
		var s2 = (txtarea.value).substring(selStart, selEnd);
		var s3 = (txtarea.value).substring(selEnd, selLength);
		txtarea.value = s1 + lft + (rgt?s2:'') + rgt + s3; //if bbcode, dont overwrite the selected text
		txtarea.selectionStart = txtarea.selectionEnd = selStart+(lft.length-_offset)+_offset2;
		txtarea.scrollTop=_sctop;
		return false;
}
function _IEWrap(txtarea, lft, rgt, _offset,_offset2) {
	rgt=rgt||'';_offset=_offset||0;_offset2=_offset2?(_offset2-1):0;
	txtarea.focus();
	var dummy="\u200B\u200C\u200B";
	var _range = mmgeeks.doc.selection.createRange();
	_range.moveStart("character", -_offset2); //move -_offset2 char back
	var s2= _range.text;
	mmgeeks.doc.selection.createRange().text = _range.text + dummy;
	var selStart= txtarea.value.indexOf(dummy)-_offset2;
	var s1= txtarea.value.substring(0,selStart-_offset-s2.length);
	var s3 = txtarea.value.substring(selStart+dummy.length, txtarea.value.length);
	
	txtarea.value = s1 +	lft + s2 + rgt +s3;
	
	_range = txtarea.createTextRange(); //clear the selections
	_range.collapse(true);
	
	var _r_n = s1.split("\r\n").length-1; //f**kin windows and IE
	_range.moveStart("character", selStart+(lft.length-_offset)-_r_n);
	_range.select();

	return false;
}
function _Wrap(txtarea, lft, rgt, _offset,_offset2){
	isIE?_IEWrap(txtarea, lft, rgt, _offset,_offset2):_mozWrap(txtarea, lft, rgt, _offset,_offset2);
}
function _xy(x) {
	obj = _id(x);
	var _left =obj.offsetLeft; var _top = obj.offsetTop;
	while (obj=obj.offsetParent) {
		_left += obj.offsetLeft;
	}
	obj = _id(x);
	while (obj=obj.offsetParent) {
		_top += obj.offsetTop;
	}
	return [_left,_top];
}

var burglish_drag=false;
var burglish_x,burglish_y;
var burglish_dobj;

function dom_move(e){
	if (burglish_drag){
		burglish_dobj.style.left = isGecko ? tx + e.clientX - burglish_x : tx + event.clientX - burglish_x;
		burglish_dobj.style.top	= isGecko ? ty + e.clientY - burglish_y : ty + event.clientY - burglish_y;
		return false;
	}
}
function init_dom_move(e){
	var burglish_fobj			 = isGecko ? e.target : event.srcElement;
	var topelement = isIE ? "BODY" : "HTML";
	
	while (burglish_fobj.tagName != topelement && !/dragme/.test(burglish_fobj.className)){
		burglish_fobj = isGecko ? burglish_fobj.parentNode : burglish_fobj.parentElement;
	}

	if (/dragme/.test(burglish_fobj.className)){
		burglish_drag = true;
		burglish_dobj = burglish_fobj;
		tx = parseInt(burglish_dobj.style.left+0);
		ty = parseInt(burglish_dobj.style.top+0);
		burglish_x = isGecko ? e.clientX : event.clientX;
		burglish_y = isGecko ? e.clientY : event.clientY;
		mmgeeks.doc.onmousemove=dom_move;
		return false;
	}
}
mmgeeks.doc.onmousedown=init_dom_move;
mmgeeks.doc.onmouseup=new Function("burglish_drag=false");

;loaded.lib=true;
