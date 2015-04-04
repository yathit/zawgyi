var burglish_font={};

function changeFont(_g, fonttype, _events ){
	var _s = '';
	if($(_g.id+'Text')) _s = trim($(_g.id+'Text').value);
	if(fonttype) _g.value = fonttype;
	burglish_font[_g.id]={};
	burglish_font[_g.id].fontname=_g.value;
	burglish_font[_g.id].name=_g.value.replace("-","_").replace(" ","_");
	$(_g.id+"Area").innerHTML='<textarea value="'+ _g.value +'" id="'+ _g.id +'Text" cols="50" rows="20" style="font-family:'+ (_f[burglish_font[_g.id].name]?_f[burglish_font[_g.id].name].css.join(","):_g.value) +';burglish_font-size: '+ (_f[burglish_font[_g.id].name]?_f[burglish_font[_g.id].name].fontsize:12) +'pt;width:400px;height:250px" '+(_events?_events:'') +' ></textarea>';
	$(_g.id+'Text').value = _s;
}

function getFontList(_s){
	var ret='<select name="Choose Font" _s="'+_s+'" onchange="return changeFont(this);"><option value="Arial" selected>-</option>';
	for(var item in _f){
		if(_f[item]['inuse']) ret+='<option value="'+_f[item]['fontname']+'">'+_f[item]['fontname']+" "+_f[item]['desc']+'<\/option>'
	}
	ret+='<\/select>';
	return ret;
}
;burglish_loaded.int=true;