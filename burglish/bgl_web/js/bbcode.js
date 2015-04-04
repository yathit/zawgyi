function parseBbords(){
	var ttag=document.getElementsByTagName("A");
	for(var i1=0;i1<ttag.length;i1++){
		if( /tid/i.test(ttag[i1].id) ){
			ttag[i1].innerHTML=ttag[i1].innerHTML.replace("[m]",'<font face="WinInnwa" size="4">');
			ttag[i1].innerHTML=ttag[i1].innerHTML.replace("[\/m]",'<\/font>');
		}
	}
}
parseBbords();