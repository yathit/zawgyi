//var _d_={"WinInnwa":[/Win.*/i]}
function _c_(_g_){
	var _r_ = true;
	if(_g_.length==0) return _r_;
	for(var i1 in _g_){
		if( !/Win.*/i.test(_g_[i1]["face"])){
			_r_ = false;
		}
	}
	return _r_;
};
function _n_(_k_){
	var _t_ = document.getElementsByTagName(_k_);
	var _e_ = false;
	if(_t_.length>0){
		for (var i1 in _t_){ 
			if(/Win.*/i.test(_t_[i1].style.fontFamily)){
				
			}
		}
	}
};
function _z_(_t_,_r_){
	var _f_ = !_c_(_t_.getElementsByTagName("FONT"));
	var _a_=_r_.match(/<font\ face[^>]*>[^<]*<\/font>/g);
	if(_f_ ){
		if(_a_){
			_r_ = _r_.replace(/<font\ face[^>]*>[^<]*<\/font>/g,"eeaee");
		}
	};
	_r_ = _r_.replace(/(<[^>]*>)/gi,""); 
	_r_ = _r_.convertFont("WinInnwa","Zawgyi_One");
	if( _f_){
		if(_a_){
			var _s_ = _r_.split("နနေနန");
			_r_="";
			for(var i2=0;i2<_a_.length;i2++){
				_r_ += _s_[i2] + _a_[i2];
			}
			_r_ += _s_[i2];	
		}
	};
	return _r_;
};
var _j_=0;
function _i_(_tg,_fn,_re,_ch){ 
	while( document.getElementsByTagName(_tg).length>0 ){
		var _t_ = document.getElementsByTagName(_tg);
		var _e_ = false;
		if(_t_.length>0){
			for (var i1 in _t_){ 
				if(_t_[i1] && eval(_ch)){
					if(_re.test(eval("_t_[i1]"+_fn))){
						var _r_ = _t_[i1].innerHTML; 
						var _tags = _r_.match(/<[^>]*>/gi);
						var _items = _r_.a.split(/<[^>]*>/gi);
						
						for(var i2=0;i2<_items.length;i2++){
							_items[i2] = _r_.convertFont("WinInnwa","Zawgyi_One");
						}
						
						var _s_="";
						for(var i2=0;i2<_tags.length;i2++){
							_s_ += _items[i2] + _tags[i2];
						}
						_s_ += _items[i2];
						
						//_r_ = _r_.replace(/<br\ ?\/?>/gi,"aaeaa"); 
						//_r_ = _r_.replace(/\&\w{2,4}\;/gi,'');
						
						//_r_=_z_(_t_[i1],_r_);
						
						//_r_=_r_.replace(/ေေနေေ/gi,"<br\/>");
				
						_t_[i1].innerHTML = _r_.bac();
						
						_t_[i1]["face"]="Zawgyi-One";
						_t_[i1].removeAttribute("size");
						_t_[i1].parentNode.style.fontSize="100%";
						_t_[i1].style.fontSize="13px";
						_t_[i1].style.lineHeight="180%";
						
						_e_ = true;
					}
				}
			}
		};
		if(!_e_) break;
	};	
};
var _hd = document.getElementsByTagName("META");
for(var i1=0;i1<_hd.length;i1++){
	if(_hd[i1].httpEquiv.indexOf("Content")!=-1 && /utf/i.test(_hd[i1].content) ){
		_i_("FONT",'["face"]',/Win.*/i,'_t_[i1]["face"]');
		_i_("SPAN",'["style"]["fontFamily"]',/Win.*/i,'_t_[i1]["style"]');
		break;
	}
}
//clearTimeout(_j_);
//_j_=setInterval(_i_, 5000);
	
//_i_();
;loaded.fontconv=true;
//for(var i1=0;i1<arry.length;i1++){ if(arry[i1].style.fontFamily!="") print(arry[i1].style.fontFamily); }

//a.match(/<[^>]*>/gi) //--> list tags 12
//a.split(/<[^>]*>/gi); //--> list non tags 13