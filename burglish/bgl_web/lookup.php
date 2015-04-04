<?php
$item  = addSlash(urldecode($_POST['item']));
$mode  = addSlash(urldecode($_POST['mode'])) or die('Oops!'); //_REQUEST || _POST 
$json = getData($item,$mode);

echo '{RESPONSE:"OK",RESULT:"MSG.chat.ondata",DATA:'.$json.'}';

function addSlash($str){
	return preg_replace('/([!"#$%&()\'*+,-.\\\;\/:?@[\]_`{|}~])/','\\\$1',$str);
}

function getData($item,$mode){
	$link = mysql_connect('localhost', 'mmopenli_em1', 'temp123') or die('Could not connect: ' . mysql_error()); 
	mysql_select_db('mmopenli_em1');mysql_query ('SET NAMES UTF8');$json="";$sep='"';
	if($mode<=2)$query="(SELECT * FROM em1 WHERE en LIKE '$item' ORDER BY en) UNION (SELECT * FROM em1 WHERE en LIKE '$item%' ORDER BY en) UNION  (SELECT * FROM em1 WHERE en LIKE '% $item%') LIMIT ".($mode==2?30:1);
	if($mode==3)$query="SELECT * FROM em1 WHERE en NOT LIKE '% %' LIMIT ".(rand()%3000).",1";
	if($mode==4){$query="SELECT DISTINCT en FROM em1 WHERE en!=''  AND en NOT RLIKE ' ' AND en NOT RLIKE '^-|-$' ORDER BY en"; $sep='';}
	$json=implodeq($query,$sep);
	if($mode==4){$json='",'.$json.',"';}else{$json='['.$json.']';}
	mysql_close($link);
	return $json;
}

function implodeq($query,$sep){
	$ret="";$result = mysql_query($query) or die("Oops!");
	while ($line = mysql_fetch_array($result, MYSQL_ASSOC)){
		$ret.=($ret!=""?",":"").$sep.implode(",",$line).$sep;
	}
	mysql_free_result($result);
	return $ret;
}
?>