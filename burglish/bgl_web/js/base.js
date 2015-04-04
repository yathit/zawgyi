function toBin(val){
	return parseInt(val).toString(2);
}

function toHex(val){
	return parseInt(val).toString(16);
}

function toBase(val, from, to){
	val = parseInt(val,from);
	return val.toString(parseInt(to));
}
/*
function toHex(d) {
        var r = d % 16;
        var result;
        if(d-r==0) 
                result = toChar(r);
        else 
                result = toHex( (d-r)/16 )+toChar(r);
        return result;
}

function toChar(n) {
        var alpha = "0123456789ABCDEF";
        return alpha.charAt(n);
}*/
/*
var html="";
for(var i=0;i<256;i++){
html += fillZero(toBin(i),8) + " (" + fillZero(toHex(i),2) +")" + "\n";
}
_id("testarea").innerHTML = html;*/