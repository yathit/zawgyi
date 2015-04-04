#ifndef _TEST
	#define _TEST
#endif

#include <stdio.h>
#include <wchar.h>

#include "../bgl_core/fontconv.h"

bool dummy_test(wchar_t* pat, wchar_t*str);
wchar_t* dummy_replace(wchar_t* pat, wchar_t*str, wchar_t* replStr, bool global=false);

void test_regex();
void test_fontconv();

int main( int argc, const char* argv[] )
{		printf("Normal string (abcd)- %i\n",sizeof("abcd"));
		printf("Long string L(abcd) - %i\n",sizeof(L"abcd"));
		printf("wchar_t - %i\n",sizeof(wchar_t));
		//test_regex();
		test_fontconv();
		
		return 0;
}

/* * * * * * * * * * * * * * * * * * * * * * *
 * The following functions are for testing regex.
 * * * * * * * * * * * * * * * * * * * * * * */

/* inline test */
bool dummy_test(wchar_t* pat, wchar_t*str){
	Regex re(pat);
	return re.test(str);
}

/* inline replace */
wchar_t* dummy_replace(wchar_t* pat, wchar_t*str, wchar_t* replStr, bool global){
	wchar_t ret[100];
	Regex re(pat);
	re.global=global;
	re.test(str);
	re.sub(str,replStr,ret);
	return ret;
}

void test_regex(){
	/* can test with 10k or 100k loop :P */
	for(int i=0; i< 1;i++){
		//wchar_t ttt[]=L"z123zgw";
		//Regex re(L"z([1])(23)z");
		//re.test(ttt);
		//re.sub(ttt,L"x\1y\2z",ttt); /* test for self replace, debugger will claim u, data is corrupted :P */

		/* !!! need (?!abcd) and (?:abcd) !!! */
		/*wchar_t dest[10];
		Burmese bur;
		bur.convertDigit(dest, L"123");
		bur.convertDigit(dest, L"a123a");*/
		
		dummy_replace(L"([\u102E\u102F\u1030\u1032\u1036\u103A\u1039\u1037]+)(\u102D)",L"\u1014\u102F\u102D\u1037\u1005\u103A", L"\2\1", true);
		
		/* isNumber */
		dummy_test(L"[^0-9]",L"abcd");
		dummy_test(L"[^0-9]",L"s"); 
		dummy_test(L"[^0-9]",L"123"); //unmatch
		dummy_test(L"[^0-9]",L"123a");
		dummy_test(L"[^0-9]",L"a123");
		dummy_test(L"[^0-9]",L"ab123asdf");
		
		dummy_replace(L"[^Z]?([a-z])",L"a",L"Z\1", true);
		
		dummy_replace(L"[^Z\u200B\u1039]?([\u1000-\u102A\u104C-\u104F])",L"\u1000\u1001\u1002\u1003",L"Z\1",true);
		
		dummy_replace(L"[^Z\u200B\u1039]?([\u1000-\u102A\u104C-\u104F])(?[^\u103A])",L"\u1000\u1001\u1002\u1003",L"Z\u200B\1",true);
		dummy_replace(L"[^Z\u200B\u1039]?([\u1000-\u102A\u104C-\u104F])",L"\u1019\u103E\u1010\u103A\u200B\u1015\u102F\u1036\u200B\u1010\u1004\u103A\u200B\u1016\u103C\u1004\u103A\u1037\u200B\u101D\u1004\u103A\u200B\u1015\u102B\u200B\20/\20\u1019\u103E\u1010\u103A\u200B\u1015\u102F\u1036\u200B\u1010\u1004\u103A\u200B\u1015\u103C\u102F\u200B\u101C\u102F\u1015\u103A\u200B\u1015\u102B\u200B",L"Z\u200B\1",true);
		
		dummy_test(L"a(.*)f",L"");
		dummy_test(L"",L"aaaa");
		
		/* replace all test */
		dummy_replace(L"[^z]?(ab)",L"XabXabXabXabX",L"z\1",true);
		dummy_replace(L"[^z]?(ab)",L"abababab",L"z\1", true);
		dummy_replace(L"[^z]?([a-z])",L"abababab",L"z\1", true);
		
		dummy_test(L"a(.*)f",L"abcdefabcdef");
		
		dummy_test(L"([\u100d\u100b\u1005\u103a\u100a\u103b\u107e])(.*)[\u102f]",L"\u103B\u1019\u102D\u102F");
		dummy_test(L"([\u100d\u100b\u1005\u103a\u100a\u103b\u107e])(.*)[\u102f]",L"\u103B\u1019\u102D\u102F\u1038");
		
		dummy_replace(L"([\u100d\u100b\u1005\u103a\u100a\u103b\u107e])(.*)[\u102f]",L"\u103B\u1019\u102D\u102F\u1038",L"\1\2\u1033");
		
		/* non greedy matching test */
		dummy_test(L"a(.*)f",L"abcdef");
		
		dummy_test(L"(.*)",L"abcdef");
		dummy_test(L"([a-z]*)",L"abcde1");
		dummy_test(L"([a-z]*)",L"1bcdef");
		
		dummy_test(L"([a-z])",L"abcdef");
		dummy_replace(L"([a-z])",L"abcdef",L"z\1");
		
		/* step by step replace */
		dummy_replace(L"[^z]?([abcd])",L"abcd",L"z\1");
		dummy_replace(L"[^z]?([abcd])",L"abcd",L"z\1",true);
		dummy_replace(L"[^z]?([abcd])",L"zabcd",L"z\1");
		dummy_replace(L"[^z]?([abcd])",L"zazbcd",L"z\1");
		dummy_replace(L"[^z]?([abcd])",L"zazbzcd",L"z\1");
		
		/* ? char test */
		dummy_test(L"ab?c",L"abc");
		dummy_test(L"ab?c",L"ac");
		dummy_test(L"ab?c",L"adc");//unmatch
		
		/* ^ char test */
		dummy_test(L"([abcd])([lmno])[efgh]",L"ame");
		dummy_test(L"([abcd])([^lmno])[efgh]",L"ame");//unmatch
		dummy_test(L"([abcd])([^lmno])[efgh]",L"aze");
		dummy_test(L"([^lmno])[efgh]al",L"zeal");
		dummy_test(L"([^lmno])[efgh]al",L"meal");//unmatch
		dummy_test(L"([^lmno])?[efgh]al",L"meal");//unmatch
		dummy_test(L"([^lmno])[efgh]al",L"meal");//unmatch
		dummy_test(L"([^lmno])?[efgh]al",L"zeal");
		
		/* the following is special case, need special routine, 
		 * coz its break some regex parsing rules, no other regex engine will provide this :P*/
		dummy_test(L"([^lmno])?[efgh]al",L"eal"); 
		
		dummy_test(L"([lmno])?[efgh]al",L"zeal");//logically unmatch, but all regex engine return match :P
		dummy_test(L"([lmno])?[efgh]al",L"meal");
		dummy_test(L"([lmno])?[efgh]al",L"eal");
		
		//unmatches
		dummy_test(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1015");
		dummy_test(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u101D\u103D");
		dummy_test(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u101D\u103D\u102C");
		dummy_test(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C\u1039",L"\u101D\u103D");
		dummy_test(L"(^[\u103B])([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1001\u102C");
		
		//match
		dummy_test(L"(^[\u103B])([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u103B\u1001\u102C");
		dummy_test(L"(^[\u103B])?([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1001\u102C");
		dummy_test(L"(^[\u103B])?([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u103B\u1001\u102C");
		
		dummy_test(L"(^[\u103B])?([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1000\u1001\u102C");//unmatch
		
		//replace success
		dummy_replace(L"([ab])([cd])",L"ac",L"\2\1");
		dummy_replace(L"z([1])(23)z",L"z123zgw",L"x\1y\2z");
		dummy_replace(L"z([1])z(23)z(45)z",L"z1z23z45zgw",L"x\1y\2z");
		dummy_replace(L"z([1])(23)z",L"wgz123zgw",L"x\1y\2z");
		dummy_replace(L"z([1])(23)z",L"wgz123z",L"xy");
		dummy_replace(L"z([1])(23)z",L"wgz123z",L"xyxyxyxy");
		
		//re ordering test success
		dummy_replace(L"z([1])y(23)x(456)w(7890)v",L"wgz1y23x456w7890vgw",L"A\4B\3C\2D\1E");
		//result -> wgA7890B456C23D1Egw
		
		//success also
		dummy_replace(L"(\u1015\u102C)",L"\u1015\u102C",L"\u1015\u102B");
		
		//success as well
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])(\u102C)",L"\u1015\u102C",L"\1\u102B");
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1015\u102C",L"\1\u102B");
		
		//success too
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1000\u1000\u1015\u102C",L"\1\u102B");
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u101D\u103D\u102C",L"\1\u102B");
		
		//of coz success :P
		dummy_replace(L"([abcd])hk",L"bhk",L"\1mz");
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102B\u1039",L"\u1031\u1001\u102B\u1039",L"\1\u105A");
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])\u102C",L"\u1031\u1000\u103A\u102C",L"\1\u102B");
		
		//unmatched so return same thing
		dummy_replace(L"([\u1001\u1002\u1004\u1012\u1015\u101D])(\u102C)",L"\u1000\u102C",L"\1\u102B");
		
		//step by step test
		dummy_test(L"a",L"a");
		dummy_test(L"b",L"a");//false
		dummy_test(L"ab",L"abc");
		dummy_test(L"ab",L"a");//false
		dummy_test(L"[a-z]*",L"a");
		dummy_test(L"^([a-z])*1$",L"zzda1");
		dummy_test(L"[1-23](45)6(78)",L"145678");
		dummy_test(L"[1-23](45)",L"145");
		dummy_test(L"[1-23](45)",L"z145z");
		dummy_test(L"^[1-23](45)",L"z145z");//false
		dummy_test(L"[1-23](45)",L"z141z145z");
		
		//matches
		dummy_test(L"^[0-9]$",L"1");
		dummy_test(L"^[0-9]",L"123a0");
		dummy_test(L"[b-e]",L"abcdef");
		dummy_test(L"[a-z]$",L"1zzabcdef");
		dummy_test(L"^[a-z][a-z][a-z][a-z]$",L"zzab");
		dummy_test(L"^[a-z]*$",L"zzaba");
		dummy_test(L"^[a-z]+$",L"zzabasdlkfjslkd");
		dummy_test(L"^[a-z]+[0-9]*$",L"za123");
		
		//unmatches
		dummy_test(L"^[0-9]$",L"a");
		dummy_test(L"^[a-z]",L"123a0");
		dummy_test(L"[0-9]",L"abcdef");
		dummy_test(L"^[a-z]$",L"1zzabcdef");
		dummy_test(L"^[a-z]$",L"zzabcdef");
		dummy_test(L"^zz[a-x]+$",L"zzabasdlkfjslkdzd");
		dummy_test(L"^[a-z]+[0-9]*[a-z]$",L"zzabasdlk123");
	}

	/* u can set breakpoint in next line, to test the performance of my regex, like looping 10k times or 100k times :P */
}

/* * * * * * * * * * * * * * * * * * * * * * *
 * The following functions are for testing fontconv.
 * * * * * * * * * * * * * * * * * * * * * * */

void test_fontconv(){
		wchar_t* dst=new wchar_t[500];
		
		convertFont(dst, L"\u1000\u1019\u107B\u102C\u1037",Zawgyi_One, WinInnwa);

		printf("%i - %i %i %i %i %i %i\n",len(dst),dst[0],dst[1],dst[2],dst[3],dst[4],dst[5] );
		
		convertFont(dst, L"\u101E\u1031\u1000\u1064\u1010",Zawgyi_One, Myanmar3);
		
		printf("%i - %i %i %i %i %i %i %i %i\n", len(dst),dst[0],dst[1],dst[2],dst[3],dst[4],dst[5],dst[6],dst[7]);
		
		convertFont(dst, L"\u101E\u1080\u1000\u1064\u1014\u1039",Zawgyi_One, Wwin_Burmese);
		
		convertFont(dst, L"\u1018\u1091\u102C",Zawgyi_One, Myanmar3);
		
		convertFont(dst, L"\u107E\u1000\u1019\u107C\u102C",Zawgyi_One, UniBurma);
		
		convertFont(dst, L"\u1092",Zawgyi_One, Myanmar3);
		
		convertFont(dst, L"\u1000\u1019\u107B\u102C\u1037",Zawgyi_One, WinInnwa);
		
		convertFont(dst, L"\u1019\u1002\u1064",Zawgyi_One, Myanmar3);
		
		convertFont(dst, L"\u1012\u1002\u1064\u102B\u1038",Zawgyi_One, Myanmar3);

		convertFont(dst, L"\u1015\u103C\u102D\u1033\u1004\u1039\u1037",Zawgyi_One,WinInnwa);
		
		convertFont(dst, L"\u1018\u103C\u102D\u1033\u1004\u1039",Zawgyi_One,WinInnwa);
		
		convertFont(dst, L"\u1021\u108F\u1075\u102D\u101A",Zawgyi_One,Wwin_Burmese);
			
		convertFont(dst, L"\u1000",Zawgyi_One,WinInnwa);
		
		convertFont(dst, L"armif",WinInnwa,Zawgyi_One);
		
		convertFont(dst, L"\u1031\u1019\u102C\u1004\u1039",Zawgyi_One,WinInnwa);
		
		//decomposition function
		convertFont(dst, L"\u1008",Zawgyi_One,WinInnwa);
		
		//za myin zwel same on both
		convertFont(dst, L"\u1008",Zawgyi_One,UniBurma);
		
		//za myin zwel same on both
		convertFont(dst, L"a\u1008b",Zawgyi_One,UniBurma);
		
		//re-combination function
		convertFont(dst, L"ps",WinInnwa,Zawgyi_One);
		
		//re-order - consonent 
		convertFont(dst, L"\u1031\u1019\u102C\u1004\u1039",Zawgyi_One,Myanmar3);
		
		//re-order vowel
		convertFont(dst, L"\u1000\u102F\u102D",Zawgyi_One,Myanmar3);
}
