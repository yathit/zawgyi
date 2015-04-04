/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Download Latest Dictionary from 
 * http://code.google.com/p/burglish/downloads/list
 * find Latest Word Filtering List(English.js) for FontConv.htm 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// exception list not to convert, ignore case
var en_exceptions=",burglish,zawgyi,innwa,alt,ctrl,html,jupiter,firefox,mozilla,"; 

// force list to convert, case sensitive
var en_force=",Sm,Mum,"; 

// english words from firefox dictionary, case sensitive
// changes - if to sp IF, at to at sp
// deleted - av, rs, um, ac, wk, om, pm
var en_words=",A,AA,AAA,";


// burglish words from Burglizer, only 3 letter and above
// deleted fav, 
var en_burglish=",ade,aeh,aid,";

;loaded.english=true;