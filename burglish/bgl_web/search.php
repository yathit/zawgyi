<?php
include "lib.php";
//header('Content-type: text/html; charset=UTF-8');
$item0  = addSlash(urldecode($_REQUEST['item0']));
$item1  = addSlash(urldecode($_REQUEST['item1']));
$item2  = addSlash(urldecode($_REQUEST['item2']));
$page = '{"item0":'.parseGoogle($item0);
if($item1!="") $page .= ',"item1":'.parseGoogle($item1);
if($item2!="") $page .= ',"item2":'.parseGoogle($item2);
$page .="}";
echo '{RESPONSE:"OK",RESULT:"MSG.chat.ondata",DATA:'.$page.'}';

function addSlash($str){
	return preg_replace('/([!"#$%&()\'*+,-.\\\;\/:?@[\]_`{|}~])/','\\\$1',$str);
}

function parseGoogle($item){
	$page = ripoff("http://www.google.com/search?hl=en&q=".$item);
 	preg_match_all("|<a\ href=\"([^\"]*)\"\ class=\"?l\"?>(.*)<\/a>.*<font[^>]*>(.*)<span|U", $page, $tmp, PREG_PATTERN_ORDER);
 	unset($tmp[0]);
	$json = array_encode($tmp);
	$json = preg_replace('/<b>(...)<\/b>/',"$1",$json);
	return $json;
}

function array_encode($tmp){
	$json ='[';
	$c1=0;
	foreach ( $tmp as $tt ){
		if($c1>0) $json.=',';
		$json.='[';
		$c2=0;
		foreach( $tt as $tt1){
			if($c2>0) $json.=',';
			$json.='"'.addSlash($tt1).'"';
			$c2++;
		}
		$json.=']';
		$c1++;
 	}
 	$json.="]";
 	return $json;
}
?>