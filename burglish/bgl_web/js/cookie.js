function setcookie(_s,_val,_day) {
	var expires = '';
	if (_day) {
		var _date = new  Date();
		_date.setTime(_date.getTime()+(_day*86400000));
		expires = "; expires="+_date.toGMTString();
	}
	document.cookie = _s+"="+_val+expires+"; path=/";
}

function getcookie(_s) {
	var _t = _s + "=";
	var _ck = document.cookie.split(';');
	for(var i=0;i < _ck.length;i++) {
		var _c = _ck[i];
		while (_c.charAt(0)==' ') _c = _c.substring(1,_c.length);
		if (_c.indexOf(_t) == 0) return _c.substring(_t.length,_c.length);
	}
	return null;
}
