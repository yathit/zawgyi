function showError(Exception){
	var msg="";
	for(var error in Exception){
		msg +=error+" : "+Exception[error]+"\n";
	};
	alert(msg);
}

function JsonToString(json){
	var ret="";
	var i1=0;
	if(typeof(json.length)=='undefined')ret +="{";
	if(typeof(json)=="object"){
		if(!isNaN(json.length))ret +="[";
		for(var idx in json){
			i1++;
			if(!isNaNB(json[idx])|| json[idx]==null || typeof(json[idx])=="string"){
				if(i1>1)ret+=",";
				if(isNaN(idx)){
					ret +=(idx.match(/\W/g)?"\"":"")+idx+(idx.match(/\W/g)?"\":":":");
				}
				if(typeof(json[idx])=="string"){
					ret +=(isNaNB(json[idx])?"\"":"")+parseDblQuote(json[idx])+(isNaNB(json[idx])?"\"":"");
				}else{
					ret +=json[idx];
				}
			}else if(typeof(json[idx])=="function"){
				i1=0;
			}else if(typeof(json[idx])=="object"){
				if(i1>1)ret+=",";
				if(json[idx].length==0){
					ret +=idx+":[]";
				}else{
					if(isNaN(idx)){
						ret +=(idx.match(/\W/g)?"\"":"")+idx+(idx.match(/\W/g)?"\":":":");
					}
					ret +=JsonToString(json[idx]);
				}
			}else{
				alert(idx);
			}
		}
		if(!isNaN(json.length))ret +="]";
	}
	if(typeof(json.length)=='undefined')ret +="}";
	return ret;
};
function isNaNB(_s){
	if(typeof(_s)=='number' || typeof(_s)=='boolean'){
		return false;
	}else if(typeof(_s)=='string'){
		try{if(_s==null)return false;
			if(_s=="")return true;
			if(_s=="false" || _s=="true")return false;
			if(isNaN(_s))return true;
			if(_s)return true;
		}catch(e){
			return true;
		}
	}else{
		return true;
	}
	return true;
}
function StringToJson(_s){
	try{
		eval("var objxx=new Object("+_s+")");
	}catch(e){
		for(var idx in e){
		}
	}
	return objxx;
};
function parseDblQuote (\s){
	return _s.replace('"','\\"');
};
String.prototype.toJson=function(){
	return StringToJson(this);
};

function toValue(obj,_s){
	var ret="";
	for(var i=0;i < obj.length;i++){
		ret +=(i>0?',':'');
		ret +=obj[i][_s];
	}
	return ret;
}

function foreach(obj){
	var ret="";
	for(var item in obj) if(obj[ item ] && item !="outerHTML" && item !="innerHTML")ret +="\n,"+item+" : "+obj[ item ];
	if(!$("debugText")){
		var txtdiv = document.createElement("div");
		document.body.innerHTML +="<center><textarea cols=80 rows=20 id='debugText' style='burglish_font:13px/1.6em Zawgyi-One,Arial,Verdana,Sans-Serif;width:90%;height:300px;'></textarea></center>";
		document.body.appendChild(txtdiv);
	}
	$("debugText").value="\n"+ret;
	return;
};
var _dumptab=0;
var _dumpres;
function dump(obj){
	if(_dumptab==0)_dumpres="";
	_dumptab++;
	var i1=0;
	for(var item in obj){
		if(obj[ item ] && item !="outerHTML" && item !="innerHTML" && typeof(obj[item])!="function"){
			if(typeof(obj[item])=="object" || typeof(obj[item])=="array"){
				if(isNaN(item))_dumpres +="\n"+getTab(_dumptab,"==")+"\["+item+"\]["+(!isDef(obj[item].length)? "Object" : obj[item].length)+"]";
				dump(obj[ item ]);
			}else{
				if(i1++>20 && obj.length>100) { 
					_dumpres += getTab(_dumptab,"==")+"> total is : "+obj.length; break;
				}else{
					_dumpres +=getTab(_dumptab,"==")+">"+item+" : "+obj[ item ];
				}
			}
		}
	};
	_dumptab--;
	if(_dumptab==0){
		if(!$("debugText")){
			var txtdiv = document.createElement("div");
			txtdiv.innerHTML ="<center><textarea cols=80 rows=20 id='debugText' class='debugText'></textarea></center>";
			document.body.appendChild(txtdiv);
		}
		$("debugText").value=_dumpres;
	}
	return;
}
function trace(val){
	if(!$("debugText")){
		var txtdiv = document.createElement("div");
		document.body.innerHTML +="<center><textarea cols=80 rows=20 id='debugText' class='debugText'></textarea></center>";
		document.body.appendChild(txtdiv);
	}
	$("debugText").value="\n"+val;
	return true;
}
function getTab(tab,tchar){
	var ret="\n";
	for(var i=0;i < tab;i++){
		ret +=tchar;
	}
	return ret;
}
function _loadQueryString(){
	for(var item in query=location.search.substr(1).split('&'))eval(query[item].replace('=','="')+'"');
};
;burglish_loaded.debug=true;