<?php

function ripoff($filename){
    $lines = file( $filename ) ;
    foreach ($lines as $line) {
	   if(!preg_match('/\/\/W3C\/\/DTD/',$line)) $line = preg_replace('/([^:])\/\/.*$/', '$1', $line);
        $line = preg_replace('/^\/\/.*$/', ' ', $line);
        //auto correct DOM
		$line = preg_replace('/([\)])\s*(\n+\s*)(?:[^\{])/', '$1;$2', $line);
        $tmp .= $line;
    }
    
    $tmp = preg_replace('/\/\*[\s\S]*?[ \t\n\r]*\*\//', '', $tmp);
    
    $tmp = preg_replace('|\/>|U', ' />', $tmp); 
    $tmp = preg_replace('/\t/', ' ', $tmp);
    $tmp = preg_replace('/\s\s+/', ' ', $tmp);
    $tmp = preg_replace('/\n/', ' ', $tmp);
    $tmp = preg_replace('/; ?;/', ";", $tmp);

    $tmp = preg_replace('/> </', '><', $tmp); 
	
	$tmp = preg_replace('/\ ?([\=\(\)\{\}\[\]\<\>\,\.\;\:\+\-\*\?])\ ?/', '$1', $tmp);
   
    $tmp = preg_replace('/<![\s\S]*?--[ \t\n\r]*>/', '', $tmp); 
	//advance for =function

	//auto correct DOM
	$tmp = preg_replace('/([\}])\s*(switch|break|for|if)/', '$1;$2', $tmp);
	$tmp = preg_replace('/([\}]\s*else)\s+([^i{][^\;]+?\;)/', '$1{$2}', $tmp); 
	$tmp = preg_replace('/([\}\"\'\)])\s*([\w\s\t\=\.\$]+?(?:function|this))/', '$1;$2', $tmp); 
	$tmp = preg_replace('/([\}])\s*(this\.)/', '$1;$2', $tmp);
	$tmp = preg_replace('/([\}])\s*([\w\$]+\.[\w\$]+)/', '$1;$2', $tmp); 
	
    //remove analytics
    $tmp = preg_replace('/<script[^>]*>[^<]*urchin[^<]*<\/script>/', '', $tmp); 
    $tmp = preg_replace('/<script[^>]*urchin[^>]*>[^<]*<\/script>/', '', $tmp); 
    
	//Burglish to B_
	$tmp = preg_replace('/burglish_/', 'B_', $tmp); 
	
    return $tmp;
}

function unrip($filename){
	$tmp = implode('', file( $filename ) );
	$tmp = preg_replace('/}/', "}\n", $tmp);
	$tmp = preg_replace('/;/', ";\n", $tmp);
	$tmp = preg_replace('/>/', ">\n", $tmp);
	return $tmp;
}
  
?>