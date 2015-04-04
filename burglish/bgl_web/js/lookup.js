/* lookup */
function lookupevent(e){
	var key =e.keyCode? e.keyCode : e.charCode;
	if(key==13) {return lookup(1);}
}

var itemtmp;var sobj;
function lookup(_g,txt){
	var item=$("item").value;
	if(_g==4 && sobj) return false;
	if(item=="" && _g<=2) return false;
	if(/[\u1000-\u10FF]/.test(item)) {
		itemtmp=item.reorder().bac().bsplit().join("\u200B");
		callSendAjax(itemtmp,_g);
	}else{
		itemtmp=item;
		callSendAjax(item,_g,txt);
	}
	return false;
}

var burglish_params={};
function callSendAjax(item,mode,txt){
	burglish_params["item"]=item;
	burglish_params["mode"]=mode||1;
	burglish_params["txt"]=txt||"Looking up...";
	loadingbar(true,'callbackSendAjax');
}

function callbackSendAjax(){
	$("result").innerHTML = burglish_params["txt"];
	SendAjax(burglish_params["mode"],burglish_params,onlookupevent,"","lookup.php",ajax);
}

function onlookupevent(_res,result,_dat,burglish_params){
	if(_res=="OK"){
		$("result").innerHTML="";
		if(burglish_params["mode"]==4){
			sobj=_dat;
			initTextarea({id: "item", className: "testarea",toburmese:true,self:true ,rows:1, bbcode:false,_bmenu:false,_suggest:true,callback:lookupevent,multiline:false,_tips:false,hideall:true});
		}else{
			shResults(_dat);
		}
		loadingbar(false);
	}else{
		$("result").innerHTML = "Oops. Can't find it!";
		loadingbar(false);
	}
}

function shResults(data){
	var html="";var item=$("item").value;var gurl="http://www.google.com/search?q=";
	if(data==""){
		html+='"'+ item +'" is not in dictionary, you can google it here '+alink(item,gurl)+", "+alink("definition "+item,gurl)+", "+alink("wiki "+item,gurl);
	}else{
		itemtmp = isIE?itemtmp.replace(/\u200B/g,"\u200C"):itemtmp;
		//alert(itemtmp.length);
		var re=eval("/([\u200B\u200C]"+itemtmp+"[\u200B\u200C])/g");
		for(var i=0;i<data.length;i++){
			var item=data[i].split(",");
			item[2]=isIE?item[2].replace(/\u200B+/g,"\u200C"):item[2];
			html+="<div>";
			html+='<h3><a href="http://en.wiktionary.org/wiki/'+item[0]+'" title="'+item[0]+'" target="_blank">'+item[0]+'</a><\/h3>';
			html+="("+item[1]+") : ";
			html+= item[2].replace(re,"<b>$1<\/b>");
			html+="<br><\/div>";
		}	
	}
	$("result").innerHTML = html;
}

function alink(_g,gurl){
	return '<a href="'+gurl+_g+'" target="_blank">'+_g+'</a>';
}

$('item').focus();

burglish_loaded.lookup=true;
