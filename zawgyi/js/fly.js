// Convert Zawgyi to Unicode 5.1 Myanmar encoded HTML content

// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

// This source code is based on the following file from Burglish project
// (http://burglish.googlecode.com):
//   1. basic.js
//   2. lib.js
//   3. burmese.js and
//   4. z251.js 



var agent = navigator.userAgent; 
var isGecko = /Gecko/.test(agent); 
var isOpera = /Opera/.test(agent); 
var isIE = /MSIE/.test(agent); 
function _id(_s) {
   return document.getElementById(_s); 
   }
function isDef(val) {
   try {
      var tmp = eval(val); 
      if(typeof(eval(val)) != "undefined")return true; 
      }
   catch(e) {
      }
   return false; 
   }
var loaded = {
   basic : true}; 
var tmpjs = {
   i : 0, _g : {
      }
   }; 
function loadjs(_g, _cb, _u1, _u2, _t) {
   loaded._g = tmpjs._g = _g = _g.split(/[\s\,]+/);
   var _u1 = _u1 || (_u1 == '' ? '':''); 
   var _u2 = _u2 || (_u2 == '' ? '':'.js'); 
   tmpjs._cb = _cb; 
   for(var i = 0; i < _g.length; i++) {
      if(!loaded[_g[i]]) {
         var x = document.createElement(_t || 'script'); 
         x.src = _u1 + _g[i] + _u2; 
         x.xid = _g[i]; 
         x.id = "$" + _g[i] + "$"; 
         x.onload = function() {
            loaded[this.xid] = true; 
            }; 
         document.getElementsByTagName("head")[0].appendChild(x); 
         }
      }; 
   if(_cb)tmpjs.timeout = setTimeout(checkloaded, 50); 
   }
function checkloaded() {
   var flag = true; 
   for(var i = 0; i < tmpjs._g.length; i++) {
      if(!loaded[tmpjs._g[i]])flag = false; 
      }; 
   tmpjs.i++; 
   clearTimeout(tmpjs.timeout); 
   if(flag) {
      tmpjs._cb(); 
      }
   else {
      tmpjs.timeout = setTimeout(checkloaded, 100); 
      }; 
   }
function _activate(_s, flag) {
   flag = _id(_s).style.display == "none"; 
   _id(_s).style.display = flag != false ? "" : "none"; 
   _id(_s).visible = flag != false ? false : true; 
   }
function _deactivate(_s) {
   _id(_s).style.display = "none"; 
   _id(_s).visible = false; 
   }
function _show(_s, flag) {
   _id(_s).style.visibility = flag != false ? "visible" : "hidden"; 
   _id(_s).visible = flag != false ? false : true; 
   }
function _hide(_s) {
   _id(_s).style.visibility = "hidden"; 
   _id(_s).visible = false; 
   }
function setZorder(_s, order) {
   if(document.getElementById)document.getElementById(_s).style.zIndex = order; 
   else if(document.all)document.all(_s).style.zIndex = order; 
   else if(document.layers)document.layers[_s].zIndex = order; 
   }
function getZorder(_s, order) {
   if(document.getElementById)return document.getElementById(_s).style.zIndex; 
   else if(document.all)return document.all(_s).style.zIndex; 
   else if(document.layers)return document.layers[_s].zIndex; 
   }
function addStyle(_opt) {
   var ss1 = document.createElement('style'); 
   ss1.setAttribute("type", "text/css"); 
   if(_opt.id)ss1.setAttribute("id", _opt.id); 
   if(ss1.styleSheet) {
      ss1.styleSheet.cssText = _opt.css; 
      }
   else {
      var tt1 = document.createTextNode(_opt.css); 
      ss1.appendChild(tt1); 
      }
   var hh1 = document.getElementsByTagName('head')[0]; 
   hh1.appendChild(ss1); 
   }
function nSort(a, b) {
   return a - b; 
   }; 
String.prototype.inc = function(_s) {
   var ret =- 1; 
   if(arguments.length != 1)return ret; 
   if(typeof(_s) != "array" && typeof(_s) != "object")return ret; 
   for(var i1 = 0; i1 < _s.length; i1++) {
      if(this == _s[i1])ret = i1; 
      }; 
   return ret; 
   }; 
String.prototype.reverse = function() {
   var ret = ""; 
   for(var i = 0; i < this.length; i++) {
      ret = this.charAt(i) + ret; 
      }; 
   return ret; 
   }; 
function fillZero(str, len) {
   var ret = String(str); 
   while(ret.length < len) {
      ret = "0" + ret; 
      }
   return ret; 
   }
function addSlash(str) {
   return str.replace(/([!"#$%&'()*+,-./:;?@[\\\]_`{|}~])/g,'\\$1');
   }; 
String.prototype.addSlash = function() {
   return addSlash(this); 
   }; 
function trim(str) {
   return str.replace(/^[\s\u200B]+|[\s\u200B]+$/gm,'');
   }; 
function ctrim(str) {
   return trim(str).replace(/^\,+|\,+$/gm,'')};
   String.prototype.trim = function() {
      return trim(this); 
      }; 
   String.prototype.ctrim = function() {
      return ctrim(this); 
      }; 
   String.prototype.zfill = function(len) {
      return fillZero(this, len); 
      }; 
   function unichr(x) {
      return String.fromCharCode(x); 
      }
   function len(x) {
      return x.length; 
      }
   function str(x) {
      return String(x); 
      }; 
   function escapeu(str) {
      return escape(str).replace(/\%/g,'\\');
      }
   function unescapeu(str) {
      return unescape(str.replace(/\\/g,'%'));
      }
   function unescapeuc(str) {
      return unescape(str.replace(/\\([0-7][0-9A-F])/g,'%$1'));
      }
   function loadingbar(flag, callback, loadingstr) {
      if(flag) {
         if(_id('loading')) {
            _show("loading"); 
            }
         else {
            var txtdiv = document.createElement("div"); 
            txtdiv.innerHTML = '<div id="loading" style="visibility:visible;z-index:1000;color:#ffffff;background-color:#ff0000;top:0;float:right;text-align:center;vertical-align:middle;">' + (loadingstr || 'Loading...') + '</div>'; 
            document.body.appendChild(txtdiv); 
            }
         setTimeout(eval(callback), 100); 
         }
      else {
         _hide("loading"); 
         }
      }
   function getDate(inStr) {
      var ret; 
      if(inStr.length == 8) {
         ret = new Date(inStr.substr(0, 4), inStr.substr(4, 2) - 1, inStr.substr(6, 2)); 
         }
      else if(inStr.length == 14) {
         ret = new Date(inStr.substr(0, 4), inStr.substr(4, 2) - 1, inStr.substr(6, 2), inStr.substr(8, 2), inStr.substr(10, 2), inStr.substr(12, 2)); 
         }
      return ret; 
      }
   function GetCurDateStr() {
      var d = new Date(); 
      return d.getFullYear() + d.getMonth() + d.getDate() + "T" + d.getHours() + d.getMinutes() + d.getSeconds(); 
      }
   function getDay(inDate) {
      var dayArry = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
      return dayArry[inDate.getDay()]; 
      }
   function addDate(inDate, val) {
      var tmp = inDate.getTime(); 
      tmp = tmp + 86400000 * val; 
      return(new Date(tmp)); 
      }
   function addMS(inDate, val) {
      var tmp = inDate.getTime(); 
      tmp = tmp + val; 
      return(new Date(tmp)); 
      }
   function rnd() {
      return Math.random(); 
      }
   function _mozWrap(txtarea, lft, rgt, _offset, _offset2) {
      rgt = rgt || ''; 
      _offset = _offset || 0; 
      _offset2 = _offset2 ? (_offset2 - 1) : 0; 
      var _sctop = txtarea.scrollTop; 
      var _scleft = txtarea.scrollLeft; 
      var selLength = txtarea.textLength; 
      var selStart = txtarea.selectionStart - _offset2; 
      var selEnd = txtarea.selectionEnd - _offset2; 
      if(selEnd == 1 || selEnd == 2)selEnd = selLength; 
      var s1 = (txtarea.value).substring(0, selStart - _offset); 
      var s2 = (txtarea.value).substring(selStart, selEnd); 
      var s3 = (txtarea.value).substring(selEnd, selLength); 
      txtarea.value = s1 + lft + (rgt ? s2 : '') + rgt + s3; 
      txtarea.selectionStart = selStart + (lft.length - _offset) + _offset2; 
      txtarea.selectionEnd = txtarea.selectionStart; 
      txtarea.scrollTop = _sctop; 
      txtarea.scrollLeft = _scleft; 
      return false; 
      }
   function _IEWrap(txtarea, lft, rgt, _offset, _offset2) {
      rgt = rgt || ''; 
      _offset = _offset || 0; 
      _offset2 = _offset2 ? (_offset2 - 1) : 0; 
      txtarea.focus(); 
      var dummy = "\u200B\u200C\u200B"; 
      var _range = document.selection.createRange(); 
      _range.moveStart("character", - _offset2); 
      var s2 = _range.text; 
      document.selection.createRange().text = _range.text + dummy; 
      var selStart = txtarea.value.indexOf(dummy) - _offset2; 
      var s1 = txtarea.value.substring(0, selStart - _offset - s2.length); 
      var s3 = txtarea.value.substring(selStart + dummy.length, txtarea.value.length); 
      txtarea.value = s1 + lft + s2 + rgt + s3; 
      _range = txtarea.createTextRange(); 
      _range.collapse(true); 
      var _r_n = s1.split("\r\n").length - 1; 
      _range.moveStart("character", selStart + (lft.length - _offset) - _r_n); 
      _range.select(); 
      return false; 
      }
   function _Wrap(txtarea, lft, rgt, _offset, _offset2) {
      isIE ? _IEWrap(txtarea, lft, rgt, _offset, _offset2) : _mozWrap(txtarea, lft, rgt, _offset, _offset2); 
      }
   function _xy(x) {
      obj = _id(x); 
      var _left = obj.offsetLeft; 
      var _top = obj.offsetTop; 
      while(obj = obj.offsetParent) {
         _left += obj.offsetLeft; 
         }
      obj = _id(x); 
      while(obj = obj.offsetParent) {
         _top += obj.offsetTop; 
         }
      return[_left, _top]; 
      }
   var B_drag = false; 
   var B_x, B_y; 
   var B_dobj; 
   function dom_move(e) {
      if(B_drag) {
         B_dobj.style.left = isGecko ? tx + e.clientX - B_x : tx + event.clientX - B_x; 
         B_dobj.style.top = isGecko ? ty + e.clientY - B_y : ty + event.clientY - B_y; 
         return false; 
         }
      }
   function init_dom_move(e) {
      var B_fobj = isGecko ? e.target : event.srcElement; 
      var topelement = isIE ? "BODY" : "HTML"; 
      while(B_fobj.tagName != topelement && !/dragme/.test(B_fobj.className)){B_fobj=isGecko?B_fobj.parentNode:B_fobj.parentElement;
      }; 
   if(/dragme/.test(B_fobj.className)){B_drag=true;
   B_dobj = B_fobj; 
   B_dobj.style.position = "absolute"; 
   tx = parseInt(B_dobj.style.left + 0); 
   ty = parseInt(B_dobj.style.top + 0); 
   B_x = isGecko ? e.clientX : event.clientX; 
   B_y = isGecko ? e.clientY : event.clientY; 
   document.onmousemove = dom_move; 
   return false; 
   }
}; 
document.onmousedown = init_dom_move; 
document.onmouseup = new Function("B_drag=false"); 
loaded.lib = true; 
function setcookie(_s, _val, _day) {
var expires = ''; 
if(_day) {
   var _date = new Date(); 
   _date.setTime(_date.getTime() + (_day * 86400000)); 
   expires = ";expires=" + _date.toGMTString(); 
   }; 
document.cookie = _s + "=" + _val + expires + ";path=/"; 
}
function getcookie(_s) {
var _t = _s + "="; 
var _ck = document.cookie.split(';'); 
for(var i = 0; i < _ck.length; i++) {
   var _c = _ck[i]; 
   while(_c.charAt(0) == ' ')_c = _c.substring(1, _c.length); 
   if(_c.indexOf(_t) == 0)return _c.substring(_t.length, _c.length); 
   }
return null; 
}
var _f = {
"Zawgyi_One" : {
   "fontname" : "Zawgyi-One", "unicode" : 1, "inuse" : true, "fontsize" : 10, "val" : [0x1000, 0x1001, 0x1002, 0x1003, 0x1004, 0x1005, 0x1006, 0x1007, 0x1008, 0x100A, 0x100B, 0x100C, 0x100D, 0x100E, 0x100F, 0x1010, 0x1011, 0x1012, 0x1013, 0x1014, 0x1015, 0x1016, 0x1017, 0x1018, 0x1019, 0x101A, 0x101B, 0x101C, 0x101D, 0x101E, 0x101F, 0x1020, 0x1021, 0x1060, 0x1061, 0x1062, 0x1063, 0, 0x1065, 0x1066, 0x1068, 0x1069, 0, 0x106C, 0x106D, 0, 0, 0x1070, 0x1071, 0x1073, 0x1075, 0x1076, 0x1077, 0x1078, 0x1079, 0x107A, 0x107B, 0x107C, 0, 0, 0x1085, 0, 0, 0, 0, 0, 0x1040, 0x1041, 0x1042, 0x1043, 0x1044, 0x1045, 0x1046, 0x1047, 0x1048, 0x1049, 0, 0x1031, 0, 0x102D, 0x102E, 0xFFF, 0x1039, 0x1064, 0x102C, 0x102B, 0x105A, 0, 0x1032, 0, 0x103C, 0x108A, 0, 0x1036, 0x1038, 0, 0x103A, 0x107D, 0, 0x103B, 0x107E, 0x107F, 0x1080, 0x1081, 0x1082, 0x1083, 0x1084, 0, 0x1037, 0x1094, 0x1095, 0, 0x104A, 0x104B, 0, 0x108F, 0x1090, 0x1092, 0x1025, 0x1027, 0x104F, 0, 0x1086, 0x104D, 0x104C, 0x1024, 0, 0x102F, 0x1030, 0x1033, 0x1034, 0x1088, 0x1089, 0x103D, 0x1087, 0, 0x108B, 0x108C, 0x108E, 0x108D, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1029, 0x102A, 0, 0x1009, 0x106B, 0x106A, 0x1026, 0, 0x104E, 0x1023, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1097, 0x106E, 0x106F, 0, 0x1091, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1096, 0, 0, 0, 0x1067, 0x1072, 0x1074, 0x1093, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "min" : 0xFFF, "max" : 0x1097, "ext" : [[0x1008, "\u3005\u3060"], [0x1060, "\u3051\u3000"], [0x1061, "\u3051\u3001"], [0x1062, "\u3051\u3002"], [0x1063, "\u3051\u3003"], [0x1065, "\u3051\u3005"], [0x1066, "\u3051\u3006"], [0x1068, "\u3051\u3007"], [0x1069, "\u3051\u3008"], [0x106C, "\u3051\u300A"], [0x106D, "\u3051\u300B"], [0x1070, "\u3051\u300E"], [0x1071, "\u3051\u300F"], [0x1073, "\u3051\u3010"], [0x1075, "\u3051\u3011"], [0x1076, "\u3051\u3012"], [0x1077, "\u3051\u3013"], [0x1078, "\u3051\u3014"], [0x1079, "\u3051\u3015"], [0x107A, "\u3051\u3016"], [0x107B, "\u3051\u3017"], [0x107C, "\u3051\u3018"], [0x1085, "\u3051\u301B"], [0x1064, "\u3004\u3052\u3051"], [0x105A, "\u3055\u3052"], [0x108A, "\u3085\u305A"], [0x107D, "\u3060"], [0x107E, "\u3063"], [0x107F, "\u3063"], [0x1080, "\u3063"], [0x1081, "\u3063"], [0x1082, "\u3063"], [0x1083, "\u3063"], [0x1084, "\u3063"], [0x1094, "\u306C"], [0x1095, "\u306C"], [0x108F, "\u3013"], [0x1090, "\u301A"], [0x1092, "\u300A\u3051\u300B"], [0x1033, "\u307F"], [0x1034, "\u3080"], [0x1088, "\u3085\u307F"], [0x1089, "\u3085\u3080"], [0x1087, "\u3085"], [0x108B, "\u3004\u3052\u3051\u304F"], [0x108C, "\u3004\u3052\u3051\u3050"], [0x108E, "\u304F\u305D"], [0x108D, "\u3004\u3052\u3051\u305D"], [0x1029, "\u3064\u301D"], [0x102A, "\u304D\u3064\u301D\u3054\u3052"], [0x106B, "\u3009"], [0x106A, "\u3076"], [0x1026, "\u3076\u3050"], [0x104E, "\u309E\u3004\u3052\u305E"], [0x1097, "\u300A\u3051\u300A"], [0x106E, "\u300C\u3051\u300C"], [0x106F, "\u300D\u3051\u300C"], [0x1091, "\u300E\u3051\u300C"], [0x1067, "\u3051\u3006"], [0x1072, "\u3051\u300F"], [0x1074, "\u3051\u3010"], [0x1093, "\u3051\u3017"]], "key" : {
      "4<" : "\u101D", "3i" : "\u104D", "3y" : "\u104C", "3t" : "\u1024", "3k" : "\u1089", "7L" : "\u108B", "7D" : "\u108C", "3d" : "\u108E", "3l" : "\u108D", "4R" : "\u103C\u107D", "4Q" : "\u103D\u103A", "4W" : "\u108A\u107D", "35" : "\u1029", "75" : "\u102A", "39" : "\u1026", "34" : "\u104E", "74" : "\u1023"}
   , "order" : {
      "consonent" : {
         "fwd" : {
            }
         , "rev" : {
            }
         }
      , "before" : {
         }
      , "vowel" : ["\u103D", "\u103C", "\u108A", "\u1087", "\u103A", "\u107D", "\u1064", "\u102D", "\u102E", "\u1036", "\u108B", "\u108C", "\u108D", "\u108E", "\u1032", "\u102F", "\u1033", "\u1030", "\u1034", "\u1088", "\u1089", "\u102C", "\u102B", "\u1039", "\u105A", "\u1037", "\u1094", "\u1095", "\u1038"], "after" : {
         }
      }
   , "ac2" : {
      "\u103B([\u1000\u1003\u1006\u100F\u1010\u1011\u1018\u101A\u101C\u101E\u101F])" : "\u107E$1"}
   , "ac3" : {
      }
   , "desc" : "(Zawgyi,Zawgyi1...)", "css" : ["Zawgyi-One", "Zawgyi1"]}
, "UniBurma" : {
   "fontname" : "UniBurma", "unicode" : 1, "inuse" : true, "fontsize" : 12, "val" : [0x1000, 0x1001, 0x1002, 0x1003, 0x1004, 0x1005, 0x1006, 0x1007, 0x1008, 0x100A, 0x100B, 0x100C, 0x100D, 0x100E, 0x100F, 0x1010, 0x1011, 0x1012, 0x1013, 0x1014, 0x1015, 0x1016, 0x1017, 0x1018, 0x1019, 0x101A, 0x101B, 0x101C, 0x101D, 0x101E, 0x101F, 0x1020, 0x1021, 0x1060, 0x1061, 0x1062, 0x107B, 0, 0x1064, 0x1065, 0x1066, 0x1097, 0, 0x1076, 0x1075, 0, 0, 0x1067, 0x1069, 0x106B, 0x106C, 0x106D, 0x106E, 0x106F, 0x1070, 0x1071, 0x1072, 0x1073, 0, 0, 0x1074, 0, 0, 0, 0, 0, 0x1040, 0x1041, 0x1042, 0x1043, 0x1044, 0x1045, 0x1046, 0x1047, 0x1048, 0x1049, 0, 0x1031, 0, 0x102D, 0x102E, 0xFFF, 0x1039, 0x1086, 0x102C, 0x105D, 0x105E, 0, 0x1032, 0, 0x107E, 0x107F, 0, 0x1036, 0x1038, 0, 0x1035, 0x1035, 0, 0x1034, 0x1033, 0x1093, 0x1092, 0, 0, 0, 0, 0, 0x1037, 0x109B, 0x109A, 0, 0x104A, 0x104B, 0, 0x108E, 0x109F, 0x1089, 0x1025, 0x1027, 0x104F, 0, 0x108D, 0x104D, 0x104C, 0x1024, 0, 0x102F, 0x1030, 0x1082, 0x1083, 0x1081, 0, 0x1080, 0x105F, 0, 0x1087, 0x1088, 0x1084, 0x1085, 0, 0, 0x1097, 0x1096, 0x1098, 0, 0, 0, 0, 0, 0, 0x1029, 0x102A, 0, 0x1009, 0x108C, 0x108F, 0x1026, 0, 0x104E, 0x1023, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x108A, 0x108B, 0x1079, 0, 0x1078, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1077, 0, 0, 0x1063, 0, 0x1068, 0x106A, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "min" : 0xFFF, "max" : 0x109F, "ext" : [[0x1008, "\u3005\u3060"], [0x1060, "\u3051\u3000"], [0x1061, "\u3051\u3001"], [0x1062, "\u3051\u3002"], [0x107B, "\u3051\u3003"], [0x1064, "\u3051\u3005"], [0x1065, "\u3051\u3006"], [0x1066, "\u3051\u3007"], [0x1097, "\u3051\u3008"], [0x1076, "\u3051\u300A"], [0x1075, "\u3051\u300B"], [0x1067, "\u3051\u300E"], [0x1069, "\u3051\u300F"], [0x106B, "\u3051\u3010"], [0x106C, "\u3051\u3011"], [0x106D, "\u3051\u3012"], [0x106E, "\u3051\u3013"], [0x106F, "\u3051\u3014"], [0x1070, "\u3051\u3015"], [0x1071, "\u3051\u3016"], [0x1072, "\u3051\u3017"], [0x1073, "\u3051\u3018"], [0x1074, "\u3051\u301B"], [0x1086, "\u3004\u3052\u3051"], [0x105E, "\u3055\u3052"], [0x107F, "\u3085\u305A"], [0x1035, "\u3060"], [0x1033, "\u3063"], [0x1093, "\u3063"], [0x1092, "\u3063"], [0x109B, "\u306C"], [0x109A, "\u306C"], [0x108E, "\u3013"], [0x109F, "\u301A"], [0x1089, "\u300A\u3051\u300B"], [0x1082, "\u307F"], [0x1083, "\u3080"], [0x1081, "\u3085\u307F"], [0x105F, "\u3085"], [0x1087, "\u3004\u3052\u3051\u304F"], [0x1088, "\u3004\u3052\u3051\u3050"], [0x1084, "\u304F\u305D"], [0x1085, "\u3004\u3052\u3051\u305D"], [0x1097, "\u305A\u3060"], [0x1096, "\u3085\u3060"], [0x1098, "\u3085\u305A\u3060"], [0x1029, "\u3064\u301D"], [0x102A, "\u304D\u3064\u301D\u3054\u3052"], [0x108C, "\u3009"], [0x108F, "\u3076"], [0x1026, "\u3076\u3050"], [0x104E, "\u309E\u3004\u3052\u305E"], [0x108A, "\u300A\u3051\u302B"], [0x108B, "\u300C\u3051\u302D"], [0x1079, "\u300D\u3051\u302E"], [0x1078, "\u300E\u3051\u300C"], [0x1063, "\u3051\u3003"], [0x1068, "\u3051\u300F"], [0x106A, "\u3051\u3010"]], "key" : [], "desc" : "(UniBurma...)", "css" : ["UniBurma", "UniBurma_SansSerif", "UniBurma_GGSerif", "UniBurma_MSSerif", "UniBurma_Web", "UniBurma_FreeHand"]}
, "MyaZedi" : {
   "fontname" : "MyaZedi", "unicode" : 1, "inuse" : true, "fontsize" : 10, "val" : [0x1000, 0x1001, 0x1002, 0x1003, 0x1004, 0x1005, 0x1006, 0x1007, 0x1008, 0x100A, 0x100B, 0x100C, 0x100D, 0x100E, 0x100F, 0x1010, 0x1011, 0x1012, 0x1013, 0x1014, 0x1015, 0x1016, 0x1017, 0x1018, 0x1019, 0x101A, 0x101B, 0x101C, 0x1040, 0x101E, 0x101F, 0x1020, 0x1021, 0x1060, 0x1061, 0x1062, 0x1063, 0, 0x1064, 0x107D, 0x1066, 0x1099, 0, 0x1076, 0x1075, 0, 0, 0x1067, 0x1068, 0x106A, 0x106C, 0x106D, 0x106E, 0x106F, 0x1070, 0x1071, 0x1072, 0x1073, 0, 0, 0x1074, 0, 0x107C, 0, 0, 0, 0x1040, 0x1041, 0x1042, 0x1043, 0x1044, 0x1045, 0x1046, 0x1047, 0x1048, 0x1049, 0, 0x1031, 0, 0x102D, 0x102E, 0xFFF, 0x1039, 0x1086, 0x102C, 0x105D, 0x105E, 0, 0x1032, 0, 0x107E, 0x107F, 0, 0x1036, 0x1038, 0, 0x1035, 0, 0, 0x1034, 0x1033, 0x1093, 0x1092, 0x1090, 0x1091, 0, 0, 0, 0x1037, 0x109B, 0x109A, 0, 0x104A, 0x104B, 0, 0x108E, 0x109F, 0x1089, 0x1025, 0x1027, 0x104F, 0, 0x108D, 0x104D, 0x104C, 0x1024, 0, 0x102F, 0x1030, 0x1082, 0x1083, 0x1081, 0, 0x1080, 0x105F, 0, 0x1087, 0x1088, 0x1084, 0x1085, 0, 0, 0x1097, 0x1096, 0x1098, 0, 0, 0, 0x1094, 0x1095, 0, 0x1029, 0x102A, 0, 0x1009, 0x108C, 0x108F, 0x1026, 0, 0x104E, 0x1023, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x108A, 0x108B, 0x1079, 0, 0x1078, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1077, 0, 0x107A, 0, 0, 0x1068, 0x106B, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "min" : 0xFFF, "max" : 0x109F, "ext" : [[0x1008, "\u3005\u3060"], [0x1060, "\u3051\u3000"], [0x1061, "\u3051\u3001"], [0x1062, "\u3051\u3002"], [0x1063, "\u3051\u3003"], [0x1064, "\u3051\u3005"], [0x107D, "\u3051\u3006"], [0x1066, "\u3051\u3007"], [0x1099, "\u3051\u3008"], [0x1076, "\u3051\u300A"], [0x1075, "\u3051\u300B"], [0x1067, "\u3051\u300E"], [0x1068, "\u3051\u300F"], [0x106A, "\u3051\u3010"], [0x106C, "\u3051\u3011"], [0x106D, "\u3051\u3012"], [0x106E, "\u3051\u3013"], [0x106F, "\u3051\u3014"], [0x1070, "\u3051\u3015"], [0x1071, "\u3051\u3016"], [0x1072, "\u3051\u3017"], [0x1073, "\u3051\u3018"], [0x1074, "\u3051\u301B"], [0x107C, "\u3051\u301D"], [0x1086, "\u3004\u3052\u3051"], [0x105E, "\u3055\u3052"], [0x107F, "\u3085\u305A"], [0x1033, "\u3063"], [0x1093, "\u3063"], [0x1092, "\u3063"], [0x1090, "\u3063"], [0x1091, "\u3063"], [0x109B, "\u306C"], [0x109A, "\u306C"], [0x108E, "\u3013"], [0x109F, "\u301A"], [0x1089, "\u300A\u3051\u300B"], [0x1082, "\u307F"], [0x1083, "\u3080"], [0x1081, "\u3085\u307F"], [0x105F, "\u3085"], [0x1087, "\u3004\u3052\u3051\u304F"], [0x1088, "\u3004\u3052\u3051\u3050"], [0x1084, "\u304F\u305D"], [0x1085, "\u3004\u3052\u3051\u305D"], [0x1097, "\u305A\u3060"], [0x1096, "\u3085\u3060"], [0x1098, "\u3085\u305A\u3060"], [0x1094, "\u3063\u305A"], [0x1095, "\u3063\u305A"], [0x1029, "\u3064\u301D"], [0x102A, "\u304D\u3064\u301D\u3054\u3052"], [0x108C, "\u3009"], [0x108F, "\u3076"], [0x1026, "\u3076\u3050"], [0x104E, "\u309E\u3004\u3052\u305E"], [0x108A, "\u300A\u3051\u302B"], [0x108B, "\u300C\u3051\u302D"], [0x1079, "\u300D\u3051\u302E"], [0x1078, "\u300E\u3051\u300C"], [0x107A, "\u3051\u3000"], [0x1068, "\u3051\u300F"], [0x106B, "\u3051\u3010"]], "key" : [], "desc" : "(Myazedi,bit,Mandalay...)", "css" : ["Myazedi", "bit", "Mandalay"]}
, "Myanmar3" : {
   "fontname" : "Myanmar3", "unicode" : 51, "inuse" : true, "fontsize" : 11, "val" : [0x1000, 0x1001, 0x1002, 0x1003, 0x1004, 0x1005, 0x1006, 0x1007, 0x1008, 0x100A, 0x100B, 0x100C, 0x100D, 0x100E, 0x100F, 0x1010, 0x1011, 0x1012, 0x1013, 0x1014, 0x1015, 0x1016, 0x1017, 0x1018, 0x1019, 0x101A, 0x101B, 0x101C, 0x101D, 0x101E, 0x101F, 0x1020, 0x1021, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1040, 0x1041, 0x1042, 0x1043, 0x1044, 0x1045, 0x1046, 0x1047, 0x1048, 0x1049, 0, 0x1031, 0, 0x102D, 0x102E, 0x1039, 0x103A, 0, 0x102C, 0x102B, 0, 0, 0x1032, 0, 0x103D, 0, 0, 0x1036, 0x1038, 0, 0x103B, 0, 0, 0x103C, 0, 0, 0, 0, 0, 0, 0, 0, 0x1037, 0, 0, 0, 0x104A, 0x104B, 0, 0, 0, 0, 0x1025, 0x1027, 0x104F, 0, 0x103F, 0x104D, 0x104C, 0x1024, 0, 0x102F, 0x1030, 0, 0, 0, 0, 0x103E, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1029, 0x102A, 0, 0x1009, 0, 0, 0x1026, 0x104E, 0, 0x1023, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "min" : 0x1000, "max" : 0x104F, "ext" : [[0x1008, "\u3005\u3060"], [0x1029, "\u3064\u301D"], [0x102A, "\u304D\u3064\u301D\u3054\u3052"], [0x1026, "\u3076\u3050"]], "key" : {
      "4F" : "\u1039"}
   , "order" : {
      "consonent" : {
         "fwd" : [["(\u103C)([\u1000-\u1021])", "$2$1"], ["([\u1031])([\u1000-\u1021])", "$2$1"], ["([\u1000-\u1021][\u102C-\u103F]*)(\u1004\u103A\u1039)", "$2$1"], ["\u1031(\u103A\u1039[\u1000-\u1021])", "$2$1"], ["\u1025([\u1039\u103A])", "\u1009$1"]], "rev" : [["([\u1000-\u1021])(\u103C)", "$2$1"], ["(\u103C?[\u1000-\u1021][\u102C-\u103F]*)(\u1031)", "$2$1"], ["(\u1004\u103A\u1039)([\u1031\u103C]*[\u1000-\u1021])", "$2$1"]]}
      , "before" : {
         }
      , "vowel" : ["\u103B", "\u103C", "\u103D", "\u103E", "\u1031", "\u102B", "\u102C", "\u102D", "\u102E", "\u102F", "\u1030", "\u1032", "\u1036", "\u103A", "\u1039", "\u1037"], "after" : [["([\u102B-\u1032\u103B-\u103E]+)(\u1039[\u1000-\u1021])", "$2$1"], ["\u102F\u103A", "\u103A\u102F"]]}
   , "ac2" : {
      }
   , "desc" : "(Myanmar2,...)", "css" : ["Myanmar3", "Myanmar2"]}
, "Padauk" : {
   "fontname" : "Padauk", "fontsize" : 11, "unicode" : 51, "inuse" : true, "inherit" : "Myanmar3", "desc" : "(Padauk...)", "css" : ["Padauk", "PadaukOT"]}
, "Parabaik" : {
   "fontname" : "Parabaik", "fontsize" : 10, "unicode" : 51, "inuse" : true, "inherit" : "Myanmar3", "desc" : "(ParabaikSans,...)", "css" : ["Parabaik", "ParabaikSans"]}
, "WinInnwa" : {
   "fontname" : "WinInnwa", "unicode" : 0, "inuse" : true, "fontsize" : 14, "val" : [0x75, 0x63, 0x2A, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0x23, 0x58, 0x21, 0xA1, 0x50, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0xFA, 0xA9, 0xBE, 0xA2, 0, 0xF6, 0xE4, 0xC6, 0xD1, 0, 0xB3, 0xB2, 0, 0, 0xD6, 0xC5, 0xAC, 0xB4, 0xA8, 0xE9, 0xDC, 0xE6, 0xC1, 0xC7, 0xAE, 0, 0, 0x2019, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x54, 0, 0x48, 0x3B, 0, 0x73, 0xDF, 0, 0x6A, 0x4D, 0x4E, 0x42, 0x60, 0x7E, 0, 0, 0, 0x68, 0x59, 0x55, 0, 0x3F, 0x2F, 0, 0x45, 0xBD, 0x7C, 0x4F, 0x7B, 0x5C, 0, 0xF3, 0xED, 0xFC, 0xFE, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x49, 0xAA, 0x53, 0xA7, 0, 0xD8, 0xD0, 0xF0, 0xF8, 0, 0, 0x52, 0x51, 0x57, 0, 0xEA, 0xFB, 0x3C, 0x3E, 0, 0, 0, 0, 0xDA, 0xF1, 0xCD, 0, 0xA4, 0, 0xA3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xA5, 0xD7, 0xB9, 0, 0x40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xC9, 0, 0, 0, 0, 0xE5, 0xA6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "min" : 0x21, "max" : 0x2019, "ext" : [[0xFA, "\u3051\u3000"], [0xA9, "\u3051\u3001"], [0xBE, "\u3051\u3002"], [0xA2, "\u3051\u3003"], [0xF6, "\u3051\u3005"], [0xE4, "\u3051\u3006"], [0xC6, "\u3051\u3007"], [0xD1, "\u3051\u3008"], [0xB3, "\u3051\u300A"], [0xB2, "\u3051\u300B"], [0xD6, "\u3051\u300E"], [0xC5, "\u3051\u300F"], [0xAC, "\u3051\u3010"], [0xB4, "\u3051\u3011"], [0xA8, "\u3051\u3012"], [0xE9, "\u3051\u3013"], [0xDC, "\u3051\u3014"], [0xE6, "\u3051\u3015"], [0xC1, "\u3051\u3016"], [0xC7, "\u3051\u3017"], [0xAE, "\u3051\u3018"], [0x2019, "\u3051\u301B"], [0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x54, "\u3085\u305A"], [0xDF, "\u3060"], [0x4D, "\u3063"], [0x4E, "\u3063"], [0x42, "\u3063"], [0x60, "\u3063"], [0x7E, "\u3063"], [0x59, "\u306C"], [0x55, "\u306C"], [0x45, "\u3013"], [0xBD, "\u301A"], [0x7C, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x49, "\u3085\u307F"], [0xAA, "\u3085\u3080"], [0xA7, "\u3085"], [0xD8, "\u3004\u3052\u3051\u304F"], [0xD0, "\u3004\u3052\u3051\u3050"], [0xF0, "\u304F\u305D"], [0xF8, "\u3004\u3052\u3051\u305D"], [0x52, "\u305A\u3060"], [0x51, "\u3085\u3060"], [0x57, "\u3085\u305A\u3060"], [0xEA, "\u3063\u307F"], [0xFB, "\u3063\u307F"], [0x3C, "\u3063\u305A"], [0x3E, "\u3063\u305A"], [0xF1, "\u3009"], [0xCD, "\u3076"], [0xA5, "\u300A\u3051\u302B"], [0xD7, "\u300C\u3051\u302D"], [0xB9, "\u300D\u3051\u302E"], [0x40, "\u300E\u3051\u300C"], [0xE5, "\u3051\u300F"], [0xA6, "\u3051\u3010"]], "key" : [], "desc" : "(WinKalaw,WinInnwa,Win Innwa,...)", "css" : ["WinInnwa", "WinKalaw"]}
, "M_Myanmar1" : {
   "fontname" : "M-Myanmar1", "unicode" : 0, "inuse" : true, "fontsize" : 14, "val" : [0x75, 0x63, 0x2A, 0x2022, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0x2122, 0x58, 0xA1, 0x2DC, 0x2B, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x37, 0x76, 0x30, 0x6F, 0x5B, 0x2013, 0x74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x5E, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0xAE, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x46, 0, 0x48, 0x3B, 0, 0x73, 0, 0, 0x6A, 0x2D, 0x6A, 0x2D, 0x6A, 0x2D, 0x6A, 0x2D, 0, 0x68, 0x5C, 0x5C, 0, 0x2F, 0x3F, 0, 0x45, 0x26, 0x7D, 0x4F, 0x7B, 0x2E, 0, 0xA9, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x3D, 0x152, 0x53, 0, 0, 0x2039, 0x2C6, 0x2030, 0x160, 0, 0, 0x60, 0x7E, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2014, 0x2014, 0x6E, 0x4F, 0, 0x203A, 0, 0x2020, 0, 0x55, 0x51, 0x43, 0xA5, 0x50, 0x3E, 0, 0x25, 0xAB, 0x201C, 0x201D, 0xB4, 0, 0x40, 0x21, 0x23, 0x57, 0x161, 0x5D, 0x3C, 0x4D, 0xAA, 0x4E, 0xB6, 0xB3, 0x5F, 0xA3, 0xA4, 0x24, 0xA8, 0xBA, 0x42, 0x52, 0, 0x153, 0xC6, 0xA6, 0x56, 0xA2, 0xB5, 0, 0, 0, 0, 0, 0, 0, 0, 0xA7, 0x201E, 0, 0xB2, 0, 0, 0, 0, 0, 0, 0, 0, 0xB1, 0x2018, 0x2019, 0], "min" : 0x21, "max" : 0x2122, "ext" : [[0xAE, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x46, "\u3085\u305A"], [0x6A, "\u3063"], [0x6A, "\u3063"], [0x6A, "\u3063"], [0x5C, "\u306C"], [0x5C, "\u306C"], [0x45, "\u3013"], [0x26, "\u301A"], [0x7D, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x3D, "\u3085\u307F"], [0x152, "\u3085\u3080"], [0x2039, "\u3004\u3052\u3051\u304F"], [0x2C6, "\u3004\u3052\u3051\u3050"], [0x2030, "\u304F\u305D"], [0x160, "\u3004\u3052\u3051\u305D"], [0x60, "\u305A\u3060"], [0x7E, "\u3085\u3060"], [0x2014, "\u309A\u3054"], [0x6E, "\u3009"], [0x4F, "\u3076"], [0x55, "\u3000\u3021"], [0x51, "\u3000\u3022"], [0x43, "\u3002\u3023"], [0xA5, "\u3002\u3024"], [0x50, "\u3005\u3026"], [0x3E, "\u3005\u3027"], [0x25, "\u3007\u3028"], [0xAB, "\u3007\u3029"], [0x201C, "\u300A\u3051\u302B"], [0x201D, "\u300C\u3051\u302D"], [0xB4, "\u300D\u3051\u302E"], [0x40, "\u300E\u3051\u300C"], [0x21, "\u300E\u302C"], [0x23, "\u300E\u302F"], [0x57, "\u300F\u3030"], [0x161, "\u300F\u3031"], [0x5D, "\u3011\u3032"], [0x3C, "\u3011\u3033"], [0x4D, "\u3073\u3030"], [0xAA, "\u3073\u3031"], [0x4E, "\u3073\u3032"], [0xB6, "\u3073\u3033"], [0xB3, "\u3073\u3034"], [0x5F, "\u3014\u3035"], [0xA3, "\u3014\u3036"], [0xA4, "\u3016\u3037"], [0x24, "\u3018\u3035"], [0xA8, "\u3018\u3036"], [0xBA, "\u3018\u3037"], [0x42, "\u3018\u3038"], [0x52, "\u3018\u3039"], [0x153, "\u301B\u303C"], [0xC6, "\u301D\u3039"], [0xA6, "\u301E\u3039"], [0x56, "\u3076\u3026"], [0xA2, "\u3076\u3028"], [0xB5, "\u3076\u3029"]], "key" : [], "desc" : "(used in Myan Encylopedia)", "css" : ["M_Myanmar1"]}
, "Academy" : {
   "fontname" : "Academy", "unicode" : 0, "inuse" : true, "fontsize" : 16, "val" : [0x75, 0x63, 0x7D, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0, 0x58, 0, 0xCD, 0x45, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x3C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0, 0x51, 0, 0, 0, 0x50, 0xE9, 0xDF, 0, 0, 0, 0, 0, 0, 0, 0x57, 0x4D, 0x4E, 0xDD, 0, 0, 0, 0xB7, 0x42, 0x52, 0, 0, 0, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3B, 0, 0x4A, 0, 0x47, 0, 0, 0x48, 0x3A, 0, 0x73, 0, 0, 0x5D, 0x6A, 0x5D, 0x6A, 0x5D, 0x6A, 0x5D, 0x6A, 0, 0xD0, 0x68, 0x68, 0, 0x3F, 0x60, 0, 0, 0x7C, 0x58, 0x4F, 0x7B, 0x3E, 0, 0, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0xE4, 0xE4, 0x53, 0xDB, 0, 0, 0xC0, 0, 0xE0, 0, 0, 0xA1, 0, 0, 0, 0xCE, 0xDA, 0xE2, 0xC2, 0, 0, 0, 0xD9, 0xD9, 0x6E, 0x4F, 0, 0x34, 0, 0xC3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xD5, 0xD8, 0xD7, 0, 0xD6, 0xC9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x57, 0xA6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xDC, 0xC1, 0], "min" : 0x22, "max" : 0xFFF, "ext" : [[0x51, "\u3051\u3001"], [0x50, "\u3051\u3005"], [0xE9, "\u3051\u3006"], [0xDF, "\u3051\u3007"], [0x57, "\u3051\u300F"], [0x4D, "\u3051\u3010"], [0x4E, "\u3051\u3011"], [0xDD, "\u3051\u3012"], [0xB7, "\u3051\u3016"], [0x42, "\u3051\u3017"], [0x52, "\u3051\u3018"], [0x46, "\u3004\u3052\u3051"], [0x3B, "\u3055\u3052"], [0x6A, "\u3063"], [0x5D, "\u3063"], [0x6A, "\u3063"], [0x5D, "\u3063"], [0x6A, "\u3063"], [0x5D, "\u3063"], [0x6A, "\u3063"], [0x68, "\u306C"], [0x68, "\u306C"], [0x7C, "\u301A"], [0x58, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0xE4, "\u3085\u307F"], [0xE4, "\u3085\u3080"], [0xDB, "\u3085"], [0xC0, "\u3004\u3052\u3051\u3050"], [0xE0, "\u3004\u3052\u3051\u305D"], [0xA1, "\u305A\u3060"], [0xCE, "\u3063\u307F"], [0xDA, "\u3063\u307F"], [0xE2, "\u3063\u305A"], [0xC2, "\u3063\u305A"], [0xD9, "\u309A\u3054"], [0x6E, "\u3009"], [0x4F, "\u3076"], [0xD5, "\u300A\u3051\u302B"], [0xD8, "\u300C\u3051\u302D"], [0xD7, "\u300D\u3051\u302E"], [0xD6, "\u300E\u3051\u300C"], [0xC9, "\u300E\u302C"], [0x57, "\u3051\u300F"], [0xA6, "\u3051\u3010"]], "key" : [], "desc" : "(Academy,Aeyar,Aekari...)", "css" : ["Academy", "Aeyar", "Aekari"]}
, "Kingmyanmarsar" : {
   "fontname" : "Kingmyanmarsar", "unicode" : 0, "inuse" : true, "fontsize" : 14, "val" : [0x75, 0x63, 0x2A, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0x83, 0x58, 0x80, 0x82, 0x25, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0x55, 0x51, 0x7E, 0xA1, 0, 0x50, 0x3E, 0x99, 0xAC, 0, 0xAC, 0, 0, 0, 0, 0x97, 0x88, 0x4E, 0x3C, 0x4D, 0x60, 0x89, 0x8A, 0x42, 0x52, 0, 0, 0x98, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x24, 0, 0x48, 0x3B, 0, 0x73, 0, 0, 0x2D, 0x6A, 0x5F, 0x7D, 0x2D, 0x6A, 0x5F, 0x7D, 0, 0x68, 0x8B, 0x8C, 0, 0x2F, 0x3F, 0, 0x45, 0x26, 0x58, 0x4F, 0x7B, 0x2E, 0, 0x5C, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x2B, 0x9B, 0x53, 0x91, 0, 0x92, 0x85, 0xD7, 0x86, 0, 0, 0x7C, 0x23, 0, 0, 0, 0, 0x3C, 0x3E, 0, 0, 0, 0x5E, 0x5E, 0x21, 0x4F, 0, 0x34, 0, 0x90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xA5, 0xD7, 0xCB, 0, 0x8F, 0x8E, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x57, 0x88, 0, 0x93, 0x3D, 0x95, 0x84, 0, 0x28, 0x29, 0, 0, 0, 0, 0, 0, 0x9E, 0x9F, 0x5D], "min" : 0x21, "max" : 0xFFF, "ext" : [[0x55, "\u3051\u3000"], [0x51, "\u3051\u3001"], [0x7E, "\u3051\u3002"], [0xA1, "\u3051\u3003"], [0x50, "\u3051\u3005"], [0x3E, "\u3051\u3006"], [0x99, "\u3051\u3007"], [0xAC, "\u3051\u3008"], [0xAC, "\u3051\u300A"], [0x97, "\u3051\u300F"], [0x88, "\u3051\u3010"], [0x4E, "\u3051\u3011"], [0x3C, "\u3051\u3012"], [0x4D, "\u3051\u3013"], [0x60, "\u3051\u3014"], [0x89, "\u3051\u3015"], [0x8A, "\u3051\u3016"], [0x42, "\u3051\u3017"], [0x52, "\u3051\u3018"], [0x98, "\u3051\u301B"], [0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x24, "\u3085\u305A"], [0x6A, "\u3063"], [0x5F, "\u3063"], [0x7D, "\u3063"], [0x6A, "\u3063"], [0x5F, "\u3063"], [0x7D, "\u3063"], [0x8B, "\u306C"], [0x8C, "\u306C"], [0x45, "\u3013"], [0x26, "\u301A"], [0x58, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x2B, "\u3085\u307F"], [0x9B, "\u3085\u3080"], [0x91, "\u3085"], [0x92, "\u3004\u3052\u3051\u304F"], [0x85, "\u3004\u3052\u3051\u3050"], [0xD7, "\u304F\u305D"], [0x86, "\u3004\u3052\u3051\u305D"], [0x7C, "\u305A\u3060"], [0x23, "\u3085\u3060"], [0x3C, "\u3063\u305A"], [0x3E, "\u3063\u305A"], [0x5E, "\u309A\u3054"], [0x21, "\u3009"], [0x4F, "\u3076"], [0xA5, "\u300A\u3051\u302B"], [0xD7, "\u300C\u3051\u302D"], [0xCB, "\u300D\u3051\u302E"], [0x8F, "\u300E\u3051\u300C"], [0x8E, "\u300E\u302C"], [0x57, "\u3051\u300F"], [0x88, "\u3051\u3010"]], "key" : [], "desc" : "(King...)", "css" : ["Kingmyanmarsar"]}
, "Gandamar_Letter1" : {
   "fontname" : "Gandamar-Letter1", "unicode" : 0, "inuse" : true, "fontsize" : 16, "val" : [0x75, 0x63, 0x7D, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0x23, 0x58, 0, 0xCD, 0x45, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x5C, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0, 0x51, 0xBE, 0xA2, 0, 0x50, 0xE9, 0xDF, 0, 0, 0, 0, 0, 0xA1, 0, 0x57, 0x4D, 0, 0xDD, 0, 0, 0, 0xD4, 0x42, 0x52, 0, 0, 0, 0, 0xA3, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0xCF, 0, 0x48, 0x3B, 0, 0x73, 0, 0, 0x5D, 0x6A, 0x5D, 0x6A, 0x5D, 0x6A, 0x5D, 0x6A, 0, 0x68, 0xD0, 0xD0, 0, 0x3F, 0x2F, 0, 0xF3, 0x7C, 0x23, 0x4F, 0x7B, 0x2E, 0, 0, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0xE4, 0xE4, 0x53, 0xDB, 0, 0, 0xC0, 0, 0xE0, 0, 0, 0, 0, 0, 0, 0, 0, 0xE2, 0xC2, 0, 0, 0, 0xD2, 0xD9, 0x6E, 0xD7, 0, 0x34, 0, 0xC3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xD5, 0xD8, 0x40, 0, 0xD6, 0xC9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x57, 0x4D, 0, 0, 0, 0xE6, 0, 0, 0, 0, 0xBA, 0xBB, 0xBF, 0xB5, 0x3C, 0, 0xDC, 0xC1, 0], "min" : 0x22, "max" : 0xFFF, "ext" : [[0x51, "\u3051\u3001"], [0xBE, "\u3051\u3002"], [0xA2, "\u3051\u3003"], [0x50, "\u3051\u3005"], [0xE9, "\u3051\u3006"], [0xDF, "\u3051\u3007"], [0x57, "\u3051\u300F"], [0x4D, "\u3051\u3010"], [0xDD, "\u3051\u3012"], [0xD4, "\u3051\u3016"], [0x42, "\u3051\u3017"], [0x52, "\u3051\u3018"], [0xA3, "\u3051\u301D"], [0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0xCF, "\u3085\u305A"], [0x6A, "\u3063"], [0x5D, "\u3063"], [0x6A, "\u3063"], [0x5D, "\u3063"], [0x6A, "\u3063"], [0x5D, "\u3063"], [0x6A, "\u3063"], [0xD0, "\u306C"], [0xD0, "\u306C"], [0xF3, "\u3013"], [0x7C, "\u301A"], [0x23, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0xE4, "\u3085\u307F"], [0xE4, "\u3085\u3080"], [0xDB, "\u3085"], [0xC0, "\u3004\u3052\u3051\u3050"], [0xE0, "\u3004\u3052\u3051\u305D"], [0xE2, "\u3063\u305A"], [0xC2, "\u3063\u305A"], [0xD2, "\u309A\u3054"], [0x6E, "\u3009"], [0xD7, "\u3076"], [0xD5, "\u300A\u3051\u302B"], [0xD8, "\u300C\u3051\u302D"], [0x40, "\u300D\u3051\u302E"], [0xD6, "\u300E\u3051\u300C"], [0xC9, "\u300E\u302C"], [0x57, "\u3051\u300F"], [0x4D, "\u3051\u3010"]], "key" : [], "desc" : "(Gandamar...)", "css" : ["Gandamar-Letter1", "Gandamar"]}
, "Metrix_1" : {
   "fontname" : "Metrix-1", "unicode" : 0, "inuse" : true, "fontsize" : 15, "val" : [0x75, 0x63, 0x2A, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0x23, 0x58, 0x21, 0xA1, 0x50, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0xFA, 0xA9, 0xBE, 0xA2, 0, 0xF6, 0xE4, 0xC6, 0xD1, 0, 0xB3, 0xB2, 0, 0, 0xD6, 0xC5, 0xAC, 0xB4, 0xA8, 0xE9, 0xDC, 0xE6, 0xC1, 0xC7, 0xAE, 0, 0, 0x2019, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x54, 0, 0x48, 0x3B, 0, 0x73, 0, 0, 0x6A, 0x4D, 0x4E, 0x42, 0x6A, 0x4D, 0x4E, 0x42, 0, 0x68, 0x59, 0x55, 0, 0x3F, 0x2F, 0, 0x45, 0xBD, 0x7C, 0x4F, 0x7B, 0x5C, 0, 0xF3, 0xED, 0xFC, 0xFE, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x49, 0xAA, 0x53, 0xA7, 0, 0xD8, 0xD0, 0xF0, 0xF8, 0, 0, 0x52, 0x51, 0x57, 0, 0xCD, 0xFB, 0x3C, 0x3E, 0, 0, 0, 0xD3, 0xDA, 0xF1, 0xEA, 0, 0xA4, 0, 0xA3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xA5, 0xD7, 0xB9, 0, 0x40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xE5, 0xA6, 0, 0x2B, 0x2D, 0x5F, 0x5E, 0x25, 0x28, 0x29, 0xAB, 0xBB, 0, 0xB5, 0xE7, 0x2E, 0x5D, 0x7D, 0x3D], "min" : 0x21, "max" : 0x2019, "ext" : [[0xFA, "\u3051\u3000"], [0xA9, "\u3051\u3001"], [0xBE, "\u3051\u3002"], [0xA2, "\u3051\u3003"], [0xF6, "\u3051\u3005"], [0xE4, "\u3051\u3006"], [0xC6, "\u3051\u3007"], [0xD1, "\u3051\u3008"], [0xB3, "\u3051\u300A"], [0xB2, "\u3051\u300B"], [0xD6, "\u3051\u300E"], [0xC5, "\u3051\u300F"], [0xAC, "\u3051\u3010"], [0xB4, "\u3051\u3011"], [0xA8, "\u3051\u3012"], [0xE9, "\u3051\u3013"], [0xDC, "\u3051\u3014"], [0xE6, "\u3051\u3015"], [0xC1, "\u3051\u3016"], [0xC7, "\u3051\u3017"], [0xAE, "\u3051\u3018"], [0x2019, "\u3051\u301B"], [0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x54, "\u3085\u305A"], [0x4D, "\u3063"], [0x4E, "\u3063"], [0x42, "\u3063"], [0x6A, "\u3063"], [0x4D, "\u3063"], [0x4E, "\u3063"], [0x42, "\u3063"], [0x59, "\u306C"], [0x55, "\u306C"], [0x45, "\u3013"], [0xBD, "\u301A"], [0x7C, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x49, "\u3085\u307F"], [0xAA, "\u3085\u3080"], [0xA7, "\u3085"], [0xD8, "\u3004\u3052\u3051\u304F"], [0xD0, "\u3004\u3052\u3051\u3050"], [0xF0, "\u304F\u305D"], [0xF8, "\u3004\u3052\u3051\u305D"], [0x52, "\u305A\u3060"], [0x51, "\u3085\u3060"], [0x57, "\u3085\u305A\u3060"], [0xCD, "\u3063\u307F"], [0xFB, "\u3063\u307F"], [0x3C, "\u3063\u305A"], [0x3E, "\u3063\u305A"], [0xD3, "\u309A\u3054"], [0xF1, "\u3009"], [0xEA, "\u3076"], [0xA5, "\u300A\u3051\u302B"], [0xD7, "\u300C\u3051\u302D"], [0xB9, "\u300D\u3051\u302E"], [0x40, "\u300E\u3051\u300C"], [0xE5, "\u3051\u300F"], [0xA6, "\u3051\u3010"]], "key" : [], "desc" : "Metrix-1(Matrix...)", "css" : ["Metrix-1"]}
, "CECLASSIC" : {
   "fontname" : "CECLASSIC", "unicode" : 0, "inuse" : true, "fontsize" : 16, "val" : [0x75, 0x63, 0x2A, 0x43, 0x69, 0x70, 0x71, 0x5A, 0xDC, 0x6E, 0xE3, 0x58, 0xE4, 0xE5, 0x25, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0x55, 0x51, 0x7E, 0xEF, 0, 0x50, 0x3E, 0xF2, 0xF1, 0, 0, 0, 0, 0xC2, 0xC1, 0x57, 0xD4, 0x4E, 0x3C, 0x4D, 0x60, 0xFF, 0xFD, 0x42, 0x52, 0, 0, 0xDB, 0, 0xC3, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x24, 0, 0x48, 0x3B, 0, 0x73, 0, 0, 0x5F, 0x6A, 0x5E, 0x7D, 0x5F, 0x6A, 0x5E, 0x7D, 0, 0x68, 0x68, 0x68, 0, 0x2F, 0x3F, 0, 0x45, 0x40, 0xF5, 0x4F, 0x7B, 0x2E, 0, 0x5C, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x2B, 0xE1, 0x53, 0x53, 0, 0xCC, 0xF4, 0xFE, 0xD9, 0, 0, 0x7C, 0x23, 0, 0, 0xD2, 0xD3, 0x3C, 0x3E, 0, 0, 0, 0, 0x5D, 0x21, 0xF6, 0, 0xD6, 0, 0xE2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xEE, 0xC7, 0xCA, 0, 0xD0, 0xE9, 0, 0, 0, 0, 0, 0, 0, 0xEA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x57, 0xD4, 0, 0, 0, 0x161, 0xE0, 0xBC, 0, 0, 0xAB, 0xAC, 0xC0, 0x2DC, 0x201D, 0, 0xBA, 0xBB, 0], "min" : 0x21, "max" : 0x201D, "ext" : [[0xDC, "\u3005\u3060"], [0x55, "\u3051\u3000"], [0x51, "\u3051\u3001"], [0x7E, "\u3051\u3002"], [0xEF, "\u3051\u3003"], [0x50, "\u3051\u3005"], [0x3E, "\u3051\u3006"], [0xF2, "\u3051\u3007"], [0xF1, "\u3051\u3008"], [0xC1, "\u3051\u300E"], [0x57, "\u3051\u300F"], [0xD4, "\u3051\u3010"], [0x4E, "\u3051\u3011"], [0x3C, "\u3051\u3012"], [0x4D, "\u3051\u3013"], [0x60, "\u3051\u3014"], [0xFF, "\u3051\u3015"], [0xFD, "\u3051\u3016"], [0x42, "\u3051\u3017"], [0x52, "\u3051\u3018"], [0xDB, "\u3051\u301B"], [0xC3, "\u3051\u301D"], [0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x24, "\u3085\u305A"], [0x6A, "\u3063"], [0x5E, "\u3063"], [0x7D, "\u3063"], [0x5F, "\u3063"], [0x6A, "\u3063"], [0x5E, "\u3063"], [0x7D, "\u3063"], [0x68, "\u306C"], [0x68, "\u306C"], [0x45, "\u3013"], [0x40, "\u301A"], [0xF5, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x2B, "\u3085\u307F"], [0xE1, "\u3085\u3080"], [0x53, "\u3085"], [0xCC, "\u3004\u3052\u3051\u304F"], [0xF4, "\u3004\u3052\u3051\u3050"], [0xFE, "\u304F\u305D"], [0xD9, "\u3004\u3052\u3051\u305D"], [0x7C, "\u305A\u3060"], [0x23, "\u3085\u3060"], [0xD2, "\u3063\u307F"], [0xD3, "\u3063\u307F"], [0x3C, "\u3063\u305A"], [0x3E, "\u3063\u305A"], [0x21, "\u3009"], [0xF6, "\u3076"], [0xEE, "\u300A\u3051\u302B"], [0xC7, "\u300C\u3051\u302D"], [0xCA, "\u300D\u3051\u302E"], [0xD0, "\u300E\u3051\u300C"], [0xE9, "\u300E\u302C"], [0xEA, "\u3073\u3032"], [0x57, "\u3051\u300F"], [0xD4, "\u3051\u3010"]], "key" : [], "desc" : "(CENORMAL,CE EXCEL...)", "css" : ["CECLASSIC", "CENORMAL"]}
, "MS_HEAVY" : {
   "fontname" : "MS-HEAVY", "unicode" : 0, "inuse" : true, "fontsize" : 12, "val" : [0x75, 0x63, 0x2A, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0x3C, 0x58, 0x3E, 0x82, 0x25, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x24, 0, 0x48, 0x3B, 0, 0x73, 0, 0, 0x2D, 0x6A, 0x5F, 0x7D, 0x2D, 0x6A, 0x5F, 0x7D, 0, 0x68, 0x8B, 0x8C, 0, 0x2F, 0x3F, 0, 0x45, 0x26, 0x40, 0x4F, 0x7B, 0x2E, 0, 0x5C, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x2B, 0x9B, 0x53, 0, 0, 0xD8, 0xD0, 0xF0, 0xF8, 0, 0, 0x7C, 0x23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x5E, 0x21, 0x4F, 0, 0x34, 0, 0xA3, 0, 0xA3, 0xB3, 0xB7, 0xC3, 0xA5, 0xA4, 0xAE, 0xB0, 0, 0, 0, 0, 0xB4, 0xBE, 0, 0xAD, 0xA8, 0xBC, 0xAC, 0xB2, 0xA2, 0, 0xAA, 0xAB, 0xB8, 0xA9, 0xBD, 0xC0, 0xA6, 0, 0xC1, 0xAF, 0xA7, 0xB9, 0xB6, 0xBB, 0xBA, 0xB1, 0xBF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2B, 0, 0, 0, 0, 0, 0, 0x28, 0x29, 0, 0, 0, 0, 0, 0, 0], "min" : 0x21, "max" : 0xFFF, "ext" : [[0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x24, "\u3085\u305A"], [0x6A, "\u3063"], [0x5F, "\u3063"], [0x7D, "\u3063"], [0x6A, "\u3063"], [0x5F, "\u3063"], [0x7D, "\u3063"], [0x8B, "\u306C"], [0x8C, "\u306C"], [0x45, "\u3013"], [0x26, "\u301A"], [0x40, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x2B, "\u3085\u307F"], [0x9B, "\u3085\u3080"], [0xD8, "\u3004\u3052\u3051\u304F"], [0xD0, "\u3004\u3052\u3051\u3050"], [0xF0, "\u304F\u305D"], [0xF8, "\u3004\u3052\u3051\u305D"], [0x7C, "\u305A\u3060"], [0x23, "\u3085\u3060"], [0x21, "\u3009"], [0x4F, "\u3076"], [0xA3, "\u3000\u3021"], [0xB3, "\u3000\u3022"], [0xB7, "\u3002\u3023"], [0xC3, "\u3002\u3024"], [0xA5, "\u3005\u3026"], [0xA4, "\u3005\u3027"], [0xAE, "\u3007\u3026"], [0xB0, "\u3007\u3028"], [0xB4, "\u300E\u3022"], [0xBE, "\u300E\u3051\u300C"], [0xAD, "\u300E\u302F"], [0xA8, "\u300F\u3030"], [0xBC, "\u300F\u3031"], [0xAC, "\u3011\u3032"], [0xB2, "\u3011\u3033"], [0xA2, "\u3073\u3030"], [0xAA, "\u3073\u3032"], [0xAB, "\u3073\u3033"], [0xB8, "\u3073\u3034"], [0xA9, "\u3014\u3035"], [0xBD, "\u3014\u3036"], [0xC0, "\u3016\u3037"], [0xA6, "\u3018\u3035"], [0xC1, "\u3018\u3037"], [0xAF, "\u3018\u3038"], [0xA7, "\u3018\u3039"], [0xB9, "\u301B\u3038"], [0xB6, "\u301B\u303C"], [0xBB, "\u301D\u3039"], [0xBA, "\u301E\u3039"], [0xB1, "\u3076\u3026"], [0xBF, "\u3076\u3028"]], "key" : [], "desc" : "(MS-MOOM)", "css" : ["MS-HEAVY", "MS-MOOM"]}
, "Wwin_Burmese" : {
   "fontname" : "Wwin_Burmese", "unicode" : 0, "inuse" : true, "fontsize" : 14, "val" : [0x75, 0x63, 0x2A, 0x43, 0x69, 0x70, 0x71, 0x5A, 0, 0x6E, 0xC9, 0x58, 0xC8, 0xCA, 0x25, 0x77, 0x78, 0x27, 0x22, 0x65, 0x79, 0x7A, 0x41, 0x62, 0x72, 0x2C, 0x26, 0x76, 0x30, 0x6F, 0x5B, 0x56, 0x74, 0x55, 0x51, 0x7E, 0x192, 0, 0x50, 0x3E, 0x2026, 0xC6, 0, 0, 0, 0, 0x201E, 0, 0x153, 0xCE, 0x4E, 0x3C, 0x4D, 0x60, 0x2030, 0x160, 0, 0x52, 0, 0, 0x2020, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x61, 0, 0x64, 0x44, 0xFFF, 0x66, 0x46, 0x6D, 0x67, 0x3A, 0, 0x4A, 0, 0x47, 0x24, 0, 0x48, 0x3B, 0, 0x73, 0x73, 0, 0x6A, 0x3D, 0x2B, 0x7D, 0x6A, 0x3D, 0x2B, 0x7D, 0, 0x68, 0x40, 0x152, 0, 0x2F, 0x3F, 0, 0x45, 0xB6, 0xCF, 0x4F, 0x7B, 0x2E, 0, 0x5C, 0x49, 0x59, 0x54, 0, 0x6B, 0x6C, 0x4B, 0x4C, 0x5F, 0xAA, 0x53, 0xEA, 0, 0xF5, 0xF4, 0xF6, 0xF8, 0, 0, 0x7C, 0x23, 0xE9, 0, 0xF1, 0xF0, 0x3C, 0x3E, 0, 0, 0, 0, 0x5E, 0x21, 0x4F, 0, 0x201A, 0, 0xC1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xC3, 0xC4, 0xC5, 0, 0xBE, 0xBF, 0xC0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xCC, 0xCD, 0, 0, 0, 0, 0, 0, 0x57, 0x2C6, 0, 0x161, 0, 0xBB, 0xA7, 0xB5, 0, 0, 0xA1, 0xA2, 0xB4, 0, 0x2DC, 0xB2, 0, 0, 0x5D], "min" : 0x21, "max" : 0x2030, "ext" : [[0x55, "\u3051\u3000"], [0x51, "\u3051\u3001"], [0x7E, "\u3051\u3002"], [0x192, "\u3051\u3003"], [0x50, "\u3051\u3005"], [0x3E, "\u3051\u3006"], [0x2026, "\u3051\u3007"], [0xC6, "\u3051\u3008"], [0x153, "\u3051\u300F"], [0xCE, "\u3051\u3010"], [0x4E, "\u3051\u3011"], [0x3C, "\u3051\u3012"], [0x4D, "\u3051\u3013"], [0x60, "\u3051\u3014"], [0x2030, "\u3051\u3015"], [0x160, "\u3051\u3016"], [0x52, "\u3051\u3018"], [0x2020, "\u3051\u301B"], [0x46, "\u3004\u3052\u3051"], [0x3A, "\u3055\u3052"], [0x24, "\u3085\u305A"], [0x73, "\u3060"], [0x3D, "\u3063"], [0x2B, "\u3063"], [0x7D, "\u3063"], [0x6A, "\u3063"], [0x3D, "\u3063"], [0x2B, "\u3063"], [0x7D, "\u3063"], [0x40, "\u306C"], [0x152, "\u306C"], [0x45, "\u3013"], [0xB6, "\u301A"], [0xCF, "\u300A\u3051\u300B"], [0x4B, "\u307F"], [0x4C, "\u3080"], [0x5F, "\u3085\u307F"], [0xAA, "\u3085\u3080"], [0xEA, "\u3085"], [0xF5, "\u3004\u3052\u3051\u304F"], [0xF4, "\u3004\u3052\u3051\u3050"], [0xF6, "\u304F\u305D"], [0xF8, "\u3004\u3052\u3051\u305D"], [0x7C, "\u305A\u3060"], [0x23, "\u3085\u3060"], [0xE9, "\u3085\u305A\u3060"], [0xF1, "\u3063\u307F"], [0xF0, "\u3063\u307F"], [0x3C, "\u3063\u305A"], [0x3E, "\u3063\u305A"], [0x21, "\u3009"], [0x4F, "\u3076"], [0xC3, "\u300A\u3051\u302B"], [0xC4, "\u300C\u3051\u302D"], [0xC5, "\u300D\u3051\u302E"], [0xBE, "\u300E\u3051\u300C"], [0xBF, "\u300E\u302C"], [0xC0, "\u300E\u302F"], [0xCC, "\u3076\u3026"], [0xCD, "\u3076\u3028"], [0x57, "\u3051\u300F"], [0x2C6, "\u3051\u3010"]], "key" : [], "desc" : "(Wwin...)", "css" : ["Wwin_Burmese"]}
, "Kannaka" : {
   "fontname" : "Kannaka", "unicode" : 0, "inuse" : true, "fontsize" : 13, "val" : [0x6B, 0x4B, 0x67, 0x47, 0x63, 0x73, 0x53, 0x7A, 0x5A, 0x76, 0x21, 0x40, 0x23, 0x24, 0x25, 0x74, 0x54, 0x64, 0x44, 0x6E, 0x70, 0x50, 0x62, 0x42, 0x6D, 0x79, 0x72, 0x6C, 0x77, 0x71, 0x68, 0x4C, 0x41, 0xB6, 0x192, 0xA9, 0xDC, 0, 0xDF, 0xC9, 0xAB, 0xDB, 0, 0, 0, 0, 0, 0, 0x7C, 0xCA, 0xBB, 0xD1, 0x7F, 0x4A, 0x50, 0x60, 0xB1, 0xB5, 0, 0, 0xAC, 0, 0, 0, 0, 0, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0, 0x65, 0, 0x69, 0x5E, 0xFFF, 0x5C, 0xE7, 0x61, 0xE5, 0xC5, 0, 0xB4, 0, 0x58, 0x57, 0, 0x4D, 0x3B, 0, 0xA5, 0xA5, 0, 0xAE, 0xC2, 0x201C, 0x201D, 0, 0, 0, 0, 0, 0x2E, 0x3E, 0xD6, 0, 0x27, 0x22, 0, 0x4E, 0x52, 0, 0x55, 0x45, 0x66, 0, 0, 0x6A, 0xD2, 0xC8, 0, 0x75, 0xA8, 0x6F, 0xF8, 0x4F, 0xD8, 0x78, 0x48, 0, 0xE4, 0xC7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x56, 0xE9, 0xCB, 0x26, 0, 0x49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xA1, 0xA3, 0xA2, 0, 0, 0xA4, 0x51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xEA, 0xEB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2B, 0x2D, 0, 0x2F, 0, 0x28, 0x29, 0x5B, 0x5D, 0x3F, 0, 0, 0xBF, 0x3C, 0, 0x3D], "min" : 0x21, "max" : 0x201D, "ext" : [[0x5A, "\u3005\u3060"], [0xB6, "\u3051\u3000"], [0x192, "\u3051\u3001"], [0xA9, "\u3051\u3002"], [0xDC, "\u3051\u3003"], [0xDF, "\u3051\u3005"], [0xC9, "\u3051\u3006"], [0xAB, "\u3051\u3007"], [0xDB, "\u3051\u3008"], [0x7C, "\u3051\u300F"], [0xCA, "\u3051\u3010"], [0xBB, "\u3051\u3011"], [0xD1, "\u3051\u3012"], [0x7F, "\u3051\u3013"], [0x4A, "\u3051\u3014"], [0x50, "\u3051\u3015"], [0x60, "\u3051\u3016"], [0xB1, "\u3051\u3017"], [0xB5, "\u3051\u3018"], [0xAC, "\u3051\u301B"], [0xE7, "\u3004\u3052\u3051"], [0xC5, "\u3055\u3052"], [0x57, "\u3085\u305A"], [0xA5, "\u3060"], [0xC2, "\u3063"], [0x201C, "\u3063"], [0x201D, "\u3063"], [0x3E, "\u306C"], [0xD6, "\u306C"], [0x4E, "\u3013"], [0x52, "\u301A"], [0x6F, "\u307F"], [0xF8, "\u3080"], [0x4F, "\u3085\u307F"], [0xD8, "\u3085\u3080"], [0x48, "\u3085"], [0xE4, "\u3004\u3052\u3051\u304F"], [0xC7, "\u3004\u3052\u3051\u3050"], [0x56, "\u3009"], [0xE9, "\u3076"], [0xCB, "\u3076\u3050"], [0xA1, "\u300A\u3051\u302B"], [0xA3, "\u300C\u3051\u302D"], [0xA2, "\u300D\u3051\u302E"], [0xA4, "\u300E\u302C"], [0x51, "\u300E\u302F"], [0xEA, "\u3076\u3026"], [0xEB, "\u3076\u3028"]], "key" : [], "desc" : "(used in En-MM Dict)", "css" : ["Kannaka"]}
, "Arial" : {
   "fontsize" : 10, "val" : [], "key" : {
      }
   , "inuse" : false, "fontname" : "Arial", "css" : ["Arial"]}
, "default" : {
   "fontsize" : 10, "val" : [], "key" : {
      }
   , "inuse" : false}
}; 
(function() {
for(var i in _f)if(_f[i]["inherit"])for(var x in _f[_f[i]["inherit"]])if(!_f[i][x])_f[i][x] = _f[_f[i]["inherit"]][x]; }
)(); 
var _dfont = "Zawgyi_One"; 
String.prototype.correctSyntax = function(src, params) {
if(!params)params = {
   }; 
var _d = _f[src]; 
var destData = this; 
if(/[^\u1041-\u1049]\u1040/.test(destData)){destData=destData.replace(/([^\u1041-\u1049])\u1040/g,"$1\u101D");
}; 
if(!params["noRepeat"]) {
var _max = (_d.max < 0x109F ? _d.max : 0x109F); 
for(var i = 0x1022; i <= _max; i++) {
   if(i >= 0x1040 && i <= 0x1049)continue; 
   var ch = unichr(i); 
   var re = eval("/(" + ch + ")" + ch + "+/gm"); 
   if(re.test(destData))destData = destData.replace(re, "$1"); 
   }
}; 
if(_d["order"]) {
if(_d["order"]["consonent"]) {
   var tmp = _d["order"]["consonent"]["fwd"]; 
   for(var i = 0; i < tmp.length; i++) {
      var re = eval("/" + tmp[i][0] + "/g"); 
      if(re.test(destData))destData = destData.replace(re, tmp[i][1]); 
      }
   }; 
if(_d["order"]["before"]) {
   var tmp = _d["order"]["before"]; 
   for(var i = 0; i < tmp.length; i++) {
      var re = eval("/" + tmp[i][0] + "/g"); 
      if(re.test(destData))destData = destData.replace(re, tmp[i][1]); 
      }
   }; 
if(_d["order"]["vowel"]) {
   var tmp = _d["order"]["vowel"]; 
   for(var i = 0; i < tmp.length - 2; i++) {
      var re = eval("/([" + tmp.slice(i + 1).join("") + "]+)(" + tmp[i] + ")/g"); 
      if(re.test(destData))destData = destData.replace(re, "$2$1"); 
      }
   }; 
if(_d["order"]["after"]) {
   var tmp = _d["order"]["after"]; 
   for(var i = 0; i < tmp.length; i++) {
      var re = eval("/" + tmp[i][0] + "/g"); 
      if(re.test(destData))destData = destData.replace(re, tmp[i][1]); 
      }
   }
}
return destData; 
}; 
var srcValHash = {
}; 
var srcExtHash = {
}; 
String.prototype.convertFont = function(src, dest, params) {
if(!params)params = {
}; 
var _s = _f[src]; 
var _d = _f[dest]; 
var srcData = this; 
var destData = ""; 
var VIRTUAL_OFFSET = 0x3000; 
var FVLEN = 226; 
var FLEN = 16; 
if(_s["order"]) {
var tmp = _s["order"]["consonent"]["rev"]; 
for(var i = 0; i < tmp.length; i++) {
   var re = eval("/" + tmp[i][0] + "/g"); 
   if(re.test(srcData))srcData = srcData.replace(re, tmp[i][1]); 
   }
}; 
if(!srcValHash[_dfont]) {
srcValHash[_dfont] = {
   }; 
for(var i = 0; i < FVLEN; i++) {
   if(_s.val[i] != 0) {
      srcValHash[_dfont][_s.val[i]] = i + VIRTUAL_OFFSET; 
      }
   }
}; 
if(!srcExtHash[_dfont]) {
srcExtHash[_dfont] = {
   }; 
for(var i = 0; i < _s.ext.length; i++) {
   srcExtHash[_dfont][_s.ext[i][0]] = (0xff & srcValHash[_dfont][_s.ext[i][0]]) + (i << 8); 
   }
}; 
for(var i = 0; i < srcData.length; i++) {
var ch = srcData.charCodeAt(i); 
if(ch >= _s.min && ch <= _s.max) {
   if(srcExtHash[_dfont][ch] != 0 && _d.val[srcExtHash[_dfont][ch] & 0xff] == 0) {
      var extval = _s.ext[(srcExtHash[_dfont][ch] >> 8) & 0xff][1]; 
      destData += extval; 
      continue; 
      }; 
   if(srcValHash[_dfont][ch] != 0) {
      destData += unichr(srcValHash[_dfont][ch]); 
      continue; 
      }
   }
destData += unichr(ch); 
}
srcData = destData; 
destData = ""; 
for(var j = 0; j < srcData.length; j++) {
var ch = srcData.charCodeAt(j); 
if(ch >= VIRTUAL_OFFSET && ch <= VIRTUAL_OFFSET + FVLEN) {
   if(_d.val[ch - VIRTUAL_OFFSET] != 0) {
      var match = false; 
      if(srcData.length > 1) {
         for(var i = 0; i < _d.ext.length; i++) {
            if(_d.ext[i][1].length > 1 && srcData.slice(j).indexOf(_d.ext[i][1]) == 0) {
               destData += unichr(_d.ext[i][0]); 
               j += _d.ext[i].length - 1; 
               match = true; 
               break; 
               }
            }
         }; 
      if(!match)destData += unichr(_d.val[ch - VIRTUAL_OFFSET]); 
      continue; 
      }
   }
destData += unichr(ch); 
}
destData = destData.correctSyntax(dest); 
return destData; 
}; 
String.prototype.convertDigit = function() {
var ret = ""; 
var _nums = ["0123456789", "\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049"]; 
for(var i1 = 0; i1 < this.length; i1++) {
ret += /[0-9]/.test(this.charAt(i1)) ? _nums[1].charAt(this.charAt(i1)) : this.charAt(i1); 
}
return ret; 
}; 
var datelist = {
en : ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "\,", "am", "pm"], bu : ["\u1010\u1014\u1002\u1064\u1031\u108F\u103C\u1031\u1014\u1095", "\u1010\u1014\u101C\u1064\u102C\u1031\u1014\u1095", "\u1021\u1002\u1064\u102B\u1031\u1014\u1095", "\u1017\u102F\u1012\u1076\u1031\u1014\u1095", "\u107E\u1000\u102C\u101E\u102C\u1015\u1031\u1010\u1038\u1031\u1014\u1095", "\u1031\u101E\u102C\u107E\u1000\u102C\u1031\u1014\u1095", "\u1005\u1031\u1014\u1031\u1014\u1095", "\u1007\u1014\u1039\u1014\u101D\u102B\u101B\u102E\u101C", "\u1031\u1016\u1031\u1016\u102C\u1039\u101D\u102B\u101B\u102E\u101C", "\u1019\u1010\u1039\u101C", "\u1027\u103B\u1015\u102E\u101C", "\u1031\u1019\u101C", "\u1002\u103C\u107D\u1014\u1039\u101C", "\u1002\u103A\u1034\u101C\u102D\u102F\u1004\u1039\u101C", "\u1029\u1002\u102F\u1010\u1039\u101C", "\u1005\u1000\u1039\u1010\u1004\u1039\u1018\u102C\u101C", "\u1031\u1021\u102C\u1000\u1039\u1010\u102D\u102F\u1018\u102C\u101C", "\u108F\u102D\u102F\u101D\u1004\u1039\u1018\u102C\u101C", "\u1012\u102E\u1007\u1004\u1039\u1018\u102C\u101C", "\u104A", "\u1019\u1014\u1000\u1039\u1001\u1004\u1039\u1038", "\u1019\u103C\u1014\u1039\u1038\u101C\u103C\u1032\u1015\u102D\u102F\u1004\u1039\u1038"]}; 
String.prototype.convertDate = function() {
var re; 
var ret = str(this); 
for(var i1 = 0; i1 < datelist.en.length; i1++) {
var re = eval("/" + datelist.en[i1] + "/gi"); 
if(re.test(ret)) {
   ret = ret.replace(re, datelist.bu[i1]); 
   }
}
return ret.convertDigit(); 
}; 
String.prototype.bac = function(_fn) {
_fn = _fn ? _fn : "Zawgyi_One"; 
if(!_f[_fn]["ac2"]); 
return this; 
var re; 
var ret = " " + this + " "; 
var ac = _f[_fn]["ac2"]; 
for(var prop in ac) {
re = eval("/" + prop + "/gm"); 
if(re.test(ret)) {
   ret = ret.replace(re, ac[prop]); 
   }
}; 
return trim(ret); 
}; 
String.prototype.reorder = function(_fn) {
_fn = _fn ? _fn : "Zawgyi_One"; 
if(!_f[_fn]["order"]); 
return this; 
var re; 
var ret = this; 
if(_f[_fn]["order"]["vowel"]) {
var tmp = _f[_fn]["order"]["vowel"]; 
for(var i = 0; i < tmp.length - 2; i++) {
   var re = eval("/([" + tmp.slice(i + 1).join("") + "]+)(" + tmp[i] + ")/g"); 
   if(re.test(ret))ret = ret.replace(re, "$2$1"); 
   }
}
return ret; 
}; 
String.prototype.cab = function(_fn) {
_fn = _fn ? _fn : "Zawgyi_One"; 
if(!_f[_fn]["ac3"]); 
return this; 
var re; 
var ret = this; 
var ac = _f[_fn]["ac3"]; 
for(var prop in ac) {
re = eval("/" + prop + "/g"); 
if(re.test(ret)) {
   ret = ret.replace(re, ac[prop]); 
   }
}; 
return ret; 
}; 
function bLower(_s, font) {
var ret = ""; 
font = font ? font : _dfont; 
var srcArry = _f[font].val; 
for(var i = 0; i < _s.length; i++) {
for(var j = 0; j < srcArry.length; j++) {
   if(unichr(srcArry[j]) == _s.charAt(i)) {
      if(srcArry[j + 33] != 0 && j < 33) {
         ret += unichr(srcArry[j + 33]); 
         }
      else {
         ret += _s.charAt(i); 
         }; 
      break; 
      }
   }
}
return ret; 
}
function bUpper(_s, font) {
var ret = ""; 
font = font ? font : _dfont; 
var srcArry = _f[font].val; 
for(var i = 0; i < _s.length; i++) {
for(var j = 0; j < srcArry.length; j++) {
   if(unichr(srcArry[j]) == _s.charAt(i)) {
      if(j > 32 && j < 32 + 33) {
         ret += unichr(srcArry[j - 33]); 
         }
      else {
         ret += _s.charAt(i); 
         }; 
      break; 
      }
   }
}
return ret; 
}
function bord(_s, font) {
font = font ? font : _dfont; 
var srcArry = _f[font].val; 
for(var i = 0; i < srcArry.length; i++) {
if(unichr(srcArry[i]) == _s) {
   return i; 
   }
}
}
function bchr(i1, font) {
font = font ? font : _dfont; 
return unichr(_f[font].val[i1]); 
}
function bType(chr) {
var _t = bord(chr); 
if(_t < 33) {
return 1; 
}
else if(_t < 66 || (_t > 195 && _t < 202)) {
return 2; 
}
else if(_t < 76) {
return 3; 
}
else {
return 0; 
}
}
function getKey(src, key, font) {
key = key ? key : _o[_o.x]["key"]; 
font = font ? font : _dfont; 
var srcArry = _f[key]; 
for(var j = 0; j < srcArry.val.length; j++) {
if(srcArry.val[j] == src) {
   return _f[font].val[j]; 
   }
}
return false; 
}
function isValid(src, key) {
key = key ? key : _o[_o.x]["key"]; 
var srcArry = _f[key]; 
return src.inc(srcArry.val) !=- 1; 
}; 
loaded.burmese = true; 
var _curFont = getcookie("B_fontconv_cookie") || 1; 
var _origFont; 
var _html; 
window.onload = _init; 
function _init() {
if(!/[\u1000-\u109F]/.test(document.body.innerHTML))return;
if(/action=edit/.test(location.href))return;
if(/[\u1004\u100A\u1014]\u1039/.test(document.body.innerHTML)&& !/[\u1004\u100A\u1014]\u103A/.test(document.body.innerHTML)){_origFont=1;
}
else if(/[\u1004\u100A\u1014]\u103A/.test(document.body.innerHTML)){_origFont=2;
}
addStyle( {
css : '.fontconv{left:5px;z-index:9999;width:130px;height:40px;padding:5px;text-align:center;position:absolute;top:0;border:#87CEFA solid 1px;background-color:#e5ecf9;filter:alpha(opacity=80);-moz-opacity:0.8;opacity:0.8;}'}
); 
_switch_font(_curFont); 
}
function _switch_font(_opt) {
setcookie("B_fontconv_cookie", _curFont = _opt, 1000); 
if(_id("B_fontconv"))document.body.removeChild(_id("B_fontconv")); 
if(_curFont != _origFont) {
_convertFont(); 
addStyle( {
id : "B_fontconv_style", css : '*{font-family:' + (_curFont == 2 ? 'Myanmar3,Parabaik,Padauk':'Zawgyi-One') + ' !important;}'}
); 
}
else if(_html) {
document.getElementsByTagName("head")[0].removeChild(_id("B_fontconv_style")); 
document.body.innerHTML = _html; 
}
var _txtdiv = document.createElement("div"); 
_txtdiv.id = "B_fontconv"; 
_txtdiv.className = 'fontconv'; 
_txtdiv.innerHTML = '<div>Choose Font Here<\/div><div><select onchange="_switch_font(this.value);"><option value=1' + (_curFont == 1 ? ' selected':'') + '>Zawgyi-One<\/option><option value=2' + (_curFont == 2 ? ' selected':'') + '>Unicode5.1<\/option><\/select><\/div>'; 
document.body.appendChild(_txtdiv); 
}
function _convertFont() {
_html = document.body.innerHTML; 
if(/&#[0-9]{1,4};/.test(_html))_html=_html.replace(/&#([0-9]{1,4});/g,function($0,$1){return String.fromCharCode($1);});
var a2 = _html.split(/[\u1000-\u109F]+/);
var _tmp = a2[0]; 
var b2 = _html.split(/[^\u1000-\u109F]+/);
if(_curFont - _origFont == 1) {
b2 = b2.join('||').convertFont("Zawgyi_One", "Myanmar3").split("||"); 
}
else {
b2 = Uni_Z1(b2.join('||')).split("||"); 
}; 
if(isIE) {
for(var i = 0; i < b2.length - 1; i++)_tmp += b2[i] + a2[i + 1]; 
_tmp += b2[i]; 
}
else {
for(var i = 1; i < b2.length - 1; i++)_tmp += b2[i] + a2[i]; 
}; 
document.body.innerHTML = _tmp; 
}
