var _smileys=[
	  {name:"Yahoo!(1)",base2:"images/smileys",base:"http://soemin.mark.googlepages.com",img : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45"],code : [ ":)",":(",";)",":D",";;)",">:D<",":-/",":x",":*>",":P",":-*","=((",":o","X(",":>","B-)",":-S","#:-S",">:)",":((",":))",":|","/:)","=))","O:)",":-B","=;","I-|","8-|","L-)","8-:",":-$","[-(",":O)","8-}","<:-P","(:|","=P~",":-?","#-o","=D>",":-SS","@-)",":^o",":-w"],alt : ["happy","sad","winking","big grin","batting eyelashes","big hug","confused","love struck","blushing","tongue","kiss","broken heart","surprise","angry","smug","cool","worried","whew!","devil","crying","laughing","straight face","raised eyebrow","rolling on the floor","angel","nerd","talk to the hand","sleepy","rolling eyes","loser","sick","don't tell anyone","not talking","clown","silly","party","yawn","drooling","thinking","d'oh","applause","nailbiting","hypnotized","liar","waiting"],html:[]}
	, {name:"Yahoo!(2)",base2:"images/smileys",base:"http://soemin.mark.googlepages.com",img : ["46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88"],code : [":-<",">:P","<):)",":@)","3:-O",":(|)","~:>","(f)","%%-","**==","(~~)","~O)","*-:)","8-X","=:)",">-)",":-L","[-O<","$-)",":-#","b-(",":)>-","[-X",":D/",">:/",";))",":-@","^:)^",":-j","(*)",":)]",":-c","~X(",":-h",":-t","8->",":-??","%-(","v:D",":ox",":O",":^o^",":eE"],alt : ["sigh","phbbbbt","cowboy","pig","cow","monkey","chicken","rose","good luck","burglish_flag","pumpkin","coffee","idea","skull","bug","alien","frustrated","praying","money eyes","whistling","feeling beat up","peace sign","shame on you","dancing","bring it on","hee hee","chatterbox","not worthy","oh go on","star","on the phone","call me","at wits' end","wave","time out","daydreaming","I don't know","not listening","peace","shutup","amazing","blameless","doodoo"],html:[]}
	, {name:"MSN",base2:"images/smileys",base:"http://soemin.mark.googlepages.com",img : ["regular_smile","teeth_smile","omg_smile","tongue_smile","wink_smile","sad_smile","confused_smile","what_smile","cry_smile","red_smile","shades_smile","angry_smile","angel_smile","devil_smile","47_47","48_48","49_49","50_50","51_51","52_52","71_71","72_72","74_74","75_75","77_77","coffee","thumbs_up","thumbs_down","beer_mug","martini","girl","guy","guy_hug","girl_hug","bat","cake","heart","broken_heart","kiss","present","rose","wilted_rose","camera","film","cat","dog","phone","lightbulb","note","moon","star","envelope","clock","messenger","53_53","70_70","55_55","56_56","57_57","58_58","59_59","60_60","61_61","62_62","63_63","64_64","66_66","73_73","69_69"],code : ["M:-)","M:-D","M:-O","M:-P","M;-)","M:-(","M:-S","M:-|","M:'(","M:-$","M(H)","M:-@","M(A)","M(6)","M:-#","M8o|","M8-|","M^o)","M:-*","M+o(","M:^)","M*-)","M<:o)","M8-)","M|-)","M(C)","M(Y)","M(N)","M(B)","M(D)","M(X)","M(Z)","M({)","M(})","M:-[","M(^)","M(L)","M(U)","M(K)","M(G)","M(F)","M(W)","M(P)","M(~)","M(@)","M(&)","M(T)","M(I)","M-8","M(S)","M(*)","M(E)","M(O)","M(M)","M(sn)","M(bah)","M(pl)","M(||)","M(pi)","M(so)","M(au)","M(ap)","M(um)","M(ip)","M(co)","M(mp)","M(st)","M(li)","M(mo)"],alt : ["Smile","Open-mouthed","Surprised","Tongue out","Wink","Sad","Confused","Disappointed","Crying","Embarrassed","Hot","Angry","Angel","Devil","Don't tell anyone","Baring teeth","Nerd","Sarcastic","Secret telling","Sick","I don't know","Thinking","Party","Eye-rolling","Sleepy","Coffee cup","Thumbs up","Thumbs down","Beer mug","Martini glass","Girl","Boy","Left hug","Right hug","Vampire bat","Birthday cake","Red heart","Broken heart","Red lips","Gift with a bow","Red rose","Wilted rose","Camera","Filmstrip","Cat face","Dog face","Telephone receiver","Light bulb","Note","Sleeping half-moon","Star","E-mail","Clock","MSN Messenger icon","Snail","Black Sheep","Plate","Bowl","Pizza","Soccer ball","Auto","Airplane","Umbrella","Island with a palm tree","Computer","Mobile Phone","Stormy cloud","Lightning","Money"],html:[]}
	, {name:"Others",base2:"images/smileys/others",base:"http://soemin.mark.googlepages.com",img : [ "mmflag","mouse","carrot","rabbit","turtle","elephant","tiger","mmdoll","motorcycle","bicycle","ladybug","pill","book","traflight","home"],code : ["S(mmflag)","S(mouse)","S(carrot)","S(rabbit)","S(turtle)","S(elephant)","S(tiger)","S(mmdoll)","S(motorcycle)","S(bicycle)","S(ladybug)","S(pill)","S(book)","S(traflight)","S(home)"],alt : ["MM Flag","Mouse","Carrot","Rabbit","Turtle","Elephant","Tiger","Pyit Taing Htaung","Motor Cycle","Bicycle","Ladybug","Pill","Book","Traffic light","Home"],html:[]}
];
var statusIcon={base2:"images",base:"http://soemin.mark.googlepages.com",img: [ "available","busy","idle","offline" ],alt : [ "Available","Buzy","Idle","Offline" ]};
for(var j=0;j<_smileys.length;j++){
	for(var i=0;i < _smileys[j].code.length;i++){
		_smileys[j].html[i]=_smileys[j].code[i].htmlSpecialChars();
	}
};
String.prototype.loadSmileys=function(){
	var ret=this; var _len=[">=4","==3","<=2"];var count =1;
	for(var i1=0;i1<_len.length;i1++){
		for(var j=0;j<_smileys.length;j++){
			var smileys = _smileys[j];
			for(var i=0;i < smileys.code.length;i++){
				if(eval(smileys.code[i].length + _len[i1])){
					while(ret.indexOf(smileys.html[i])!=-1){
						ret=ret.replace(smileys.html[i],'<img src="'+ smileys.base+'/'+smileys.img[i]+'.gif" title="'+smileys.alt[i]+'"/>');
						if(++count>7)return ret;
					}
				}
			}
		}
	}
	return ret;
};
var _bw=[
	["testtesttest","su+c+k","shi+t","sex","blo+wjo+b","bi+tch","chee+","phote","sout(?!h)","lee+","fu+c+k","loe"]
	, ["^ဖင္","[^ျ]ဖင္","လိုး","လီး","^ဖာ(?!း)","[^ေျ]ဖာ(?!း)","စ.္ပ.္","ေ.?ာက္ဖု.{1,2}","ေ[စဆ]ာက္","ခ်ီး","ေဂြး","ျပြတ္","^မသာ[း]?","[^ျ]မသာ[း]?","ေသနာ","ေသ[ျ]?ခ[်]?င္း","မေအ(ေပး)+","လဥ"]
];
String.prototype.filterBadWords =function(){
	var tmp=this; var re,ret;
	for(var j=0;j<_bw.length;j++){
		var bw=_bw[j];
		if(j==1){re = /\s+/gi; tmp = tmp.replace(re, "");};
		for(var i=0; i<bw.length; i++){
			eval("re =/\s*" + bw[i] +"\s*/gim");
			if(re.test(tmp)){
				ret = tmp.replace(re,"###");
			}
		}
	}
	return ret?ret:this;
};
String.prototype.htmlSpecialChars=function(){
	try{var iStringLength=this.length;
		var sModifiedString='';
		for(var i=0;i < iStringLength;i++){
			switch(this.charCodeAt(i)){
				case 34 : sModifiedString +='&quot;';break;
				case 38 : sModifiedString +='&amp;';break;
				case 39 : sModifiedString +='&#39;';break;
				case 60 : sModifiedString +='&lt;';break;
				case 62 : sModifiedString +='&gt;';break;default : sModifiedString +=this.charAt(i);
			}
		}
	}catch(vError){
	
	}finally{
		return sModifiedString;
	}
};
String.prototype.normalChars=function(){
	var ret=this;
	var htmlChars={html : ['&quot;','&amp;','&#39;','&lt;','&gt;' ],normal : ['"','&','`','<','>']};
	for(var i=0;i < htmlChars.html.length;i++){
		while(ret.indexOf(htmlChars.html[i])!=-1){
			ret=ret.replace(htmlChars.html[i],htmlChars.normal[i]);
		}
	}
	return ret;
};
function callSendAjax(mode,id,ip,data,status,listener,ajaxUrl){
	var burglish_params=new Object();
	burglish_params["id"]=id;
	burglish_params["ip"]=ip;
	burglish_params["data"]=data;
	if(status)burglish_params["status"]=status;
	if(!ajaxUrl)ajaxUrl="confbot/bridge.php";
	SendAjax(mode ? mode : 2,burglish_params,(listener?listener:onChatData),"",(ajaxUrl?ajaxUrl:""),ajax);
};
burglish_loaded.chat=true;