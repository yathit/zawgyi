var a_rc=10;
var m_rc=false;
var n_rc=false;
var o_rc=200;
function _rc(_json){	
	for(var i=0;i<a_rc;i++){
		var b_rc=_json.feed.entry[i];
		var c_rc;
		if(i==_json.feed.entry.length)break;
		for(var k=0;k<b_rc.link.length;k++){
			if(b_rc.link[k].rel=='alternate'){
				c_rc=b_rc.link[k].href;break;
			}
		}c_rc=c_rc.replace("#","#comment-");
		var d_rc=c_rc.split("#");
		d_rc=d_rc[0];
		var e_rc=d_rc.split("/");
		e_rc=e_rc[5];
		e_rc=e_rc.split(".html");
		e_rc=e_rc[0];
		var f_rc=e_rc.replace(/-/g," ");
		f_rc=f_rc.link(d_rc);
		var g_rc=b_rc.published.$t;
		var h_rc=g_rc.substring(0,4);
		var i_rc=g_rc.substring(5,7);
		var j_rc=g_rc.substring(8,10);
		var k_rc=new Array();
		k_rc[1]="Jan";k_rc[2]="Feb";k_rc[3]="Mar";k_rc[4]="Apr";k_rc[5]="May";k_rc[6]="Jun";k_rc[7]="Jul";k_rc[8]="Aug";k_rc[9]="Sep";k_rc[10]="Oct";k_rc[11]="Nov";k_rc[12]="Dec";
		if(b_rc["content"]){
			var l_rc=b_rc.content.$t;
		}else if(b_rc["summary"]){
			var l_rc=b_rc.summary.$t;
		}else {
			var l_rc="";
		}
		var re=/<\S[^>]*>/g;
		l_rc=l_rc.replace(re,"");
		if(m_rc==true)document.write('On '+k_rc[parseInt(i_rc,10)]+' '+j_rc+' ');
		var n_name=b_rc.author[0].name.$t;
		document.write('<a href="'+c_rc+'" style="color:#000;">'+(n_name=="ျမရြက္ေ၀"?'<u>':'')+'<b>'+b_rc.author[0].name.$t+'</b>'+(n_name=="ျမရြက္ေ၀"?'</u>':'')+'</a> '+(n_name=="ျမရြက္ေ၀"?'answered':'commented'));
		if(n_rc==true)document.write(' on '+f_rc);
		document.write(': ');
		if(l_rc.length<o_rc){
			document.write('<i>&#8220;');
			document.write(l_rc);
			document.write('&#8221;</i><br/><br/>');
		}else{
			document.write('<div style="text-align: justify;"><i>&#8220;');
			l_rc=l_rc.substring(0,o_rc);
			var p_rc=l_rc.lastIndexOf(" ");
			l_rc=l_rc.substring(0,p_rc);
			l_rc = addSpace(l_rc);
			document.write(l_rc+'&hellip;&#8221;</i></div>');
			document.write('<br/>');
		}
	}
}
function addSpace(str){
	var _tpl={"(လား)":"$1 ","(ဟင္)(?!း)":"$1 ","(ဒါ)":" $1","(တယ္)":"$1 ","(ေလ)(?!း)":"$1 ","(ေနာ္)":"$1 ","(ေတာ့)":"$1 ","(မွာ)(?!း)":"$1 ","(ဆုိတာ)":"$1 ","(\\.)":"$1 ","(\\?)":"$1 ","([။၊])":"$1 ","(စရာ)":"$1 ","(အတြက္)":"$1 "};
	for(var i1 in _tpl){
		var re=eval("/"+i1+"/ig");
		if(re.test(str)){
			str = str.replace(re,_tpl[i1]);
		}
	}
	return str;
}