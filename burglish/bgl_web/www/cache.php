<?php
	require_once("../lib.php");	

	$filename = $_REQUEST['id'] ; 
	$name = $_REQUEST['name'] ; 
	$class = $_REQUEST['class'] ; 
	$decode = $_REQUEST['decode'] ; 
	
//	if( !$filename || strpos($filename,".." ) !== false ) $filename = "index.htm";
	if( !$filename || strpos($filename,".." ) !== false ) die("Oops!");
	
	$ext = substr($filename,strlen($filename)-4,4);
	
	if( ! ( strpos($ext,".js" ) !== false || $ext == ".css" || $ext == ".htm" || $ext==".php" )	) return;
	
	$cachefile = "./".$filename; //write file
	$cachefile2 = "./gpages/".$filename; //write file for googlepages
	$filename = "../".$filename; //read only
	
	$page = ripoff($filename);	
	
	$fp = fopen( $cachefile , "w+", 0); 
	fputs($fp, $page); 
	fclose($fp);
	
	$page = preg_replace('/css\//', '', $page);
	$page = preg_replace('/js\//', '', $page);
	$page = preg_replace('/(\,onLoad)(\)\')/', '$1,""$2', $page);
	
	$fp = fopen( $cachefile2 , "w+", 0); 
	fputs($fp, $page); 
	fclose($fp);
?>