<?php
    $save_path="./data/"; #target path
    $dest='hashdata.txt';
    $dest2='rawsrc.txt';
    $dest3='rawdata.txt';

    $mode = $_REQUEST['mode'];
    $burglish = $_REQUEST['burglish'];
    $burmese = $_REQUEST['burmese'];
    $wordtype = $_REQUEST['wordtype'];
    $service = $_REQUEST['service'];
    $current = $_REQUEST['current'];
    $previous = $_REQUEST['previous'];

    $input = implode('', file( $save_path.$dest ) );

    $hashdata = json_decode($input);
    $data = $hashdata->data;

    $len = count( $data );

    //$mode 5 - showdata, 1 - adddata, 2 - deletedata, 3-unicode, 9-testroutine
    if( $mode == 5 ) {
        echo '{RESPONSE:"OK",RESULT:"MSG.chat.ondata",DATA:' . $input . '}';
    }else if( $mode == 3) {
		$input =  implode('', file( $save_path.$dest2 ) );
		$split = split("\n",$input);
		$newarry;
		$newcount =0;
		for($i =0; $i < count($split); $i++){
			if($split[$i]!="") $newarry [$newcount++] = $split[$i];
		}
		$input = json_encode($newarry);
		$fp = fopen($save_path.$dest3, "w+", 0);
        	fputs($fp, $input);
        	fclose($fp);
		echo $input;
    }else if( $mode == 1 && $burglish && $burmese ) {
        //add routine
        $strlen = strlen( $burglish );
        $strlen = strlen( $burglish ) > 15 ? 15 : strlen( $burglish );
        $newlen = count( $data[$strlen] );
        for($j = 0; $j < $newlen ; $j++ ){
            if ( $burglish == $data[$strlen][$j][0] && $burmese == $data[$strlen][$i][1]) {
                $newlen = $j;
                break;
            }
        }

        $data[$strlen][ $newlen ][0] = $burglish ;
        $data[$strlen][ $newlen ][1] = $burmese ;
        $data[$strlen][ $newlen ][2] = $wordtype ;

        $hashdata->data = $data;
        $input = json_encode( $hashdata );

        echo '{RESPONSE:"OK",RESULT:"MSG.chat.ondata",DATA:' . $input . '}';

        //update the file
        $fp = fopen($save_path.$dest, "w+", 0);
        fputs($fp, $input);
        fclose($fp);
    }else if( $mode == 2 && $burglish && $burmese ) {
        //delete routine
        $existing = false;
        $strlen = strlen( $burglish ) > 15 ? 15 : strlen( $burglish );
        $newlen = count( $data[$strlen] );
        for($j = 0; $j < $newlen ; $j++ ){
            if ( $burglish == $data[$strlen][$j][0] && $burmese == $data[$strlen][$j][1]) { $existing = true; }
            if ( $existing && $j < $newlen-1) {
                $newdata[$j] = $data[$strlen][$j+1];
            }elseif(!$existing){
                $newdata[$j] = $data[$strlen][$j];
            }
        }

        if( $existing ) {
            $data[$strlen] = $newdata ? $newdata : Array();
            $hashdata->data = $data;
            $input = json_encode( $hashdata );

            //update the file
            $fp = fopen($save_path.$dest, "w+", 0);
            fputs($fp, $input);
            fclose($fp);
        }

        echo '{RESPONSE:"OK",RESULT:"MSG.chat.ondata",DATA:' . $input . '}';
    }else if( $mode == 9 ) {
        ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
        //http://ii.burglish.com/cgi-bin/server.py?service=2&current=kyaw&previous=aung //one word
        //http://ii.burglish.com/cgi-bin/server.py?service=4&current=kyaw&previous=aung //list
	    $test = implode('', file("http://ii.burglish.com/cgi-bin/server.py?service=".$service."&current=" .$current ."&previous=".$previous ) );
        $test = preg_replace('/\r\n/', '', $test);
        $test = preg_replace('/\n/', '', $test);
        echo '{RESPONSE:"OK",RESULT:"MSG.chat.ondata",DATA:"'.$test.'"}';
    }
?>

