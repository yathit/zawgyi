#include "lib.h"

//copy string
void cpy(wchar_t* dst, const wchar_t* src){
	while(*dst++=*src++);
}

//substitute string
void sub(wchar_t* dst, const wchar_t* src, const wchar_t* from, wchar_t* to, bool replaceAll)
{
	wchar_t *cp =dst;//pointer for destination string
	int fromlen=len(from);int tolen=len(to);//store lengths, coz we are moving pointers, so length will effect
	bool once=true;
	do{
		if(cmp(from, src)==0 && fromlen>0 && (once || replaceAll) ){//partial matching from and source string, but parameters are not reversible
			while(*cp++=*to++){src++;};//during copying to string, also move source string pointer one location, coz its replacing :)
			src-=tolen-fromlen;//adjusting depending on from len and to len
			cp--;//move the pointer one character back
			once = false;
		}
	}while(*cp++ = *src++);//copying source to destination string, need do while, instead of while, coz need to compare fomr the first charactar
}

//compare its match or partial match
int cmp(const wchar_t* cs, const wchar_t* ct)
{
  while (*cs == *ct)
  {
	if (*cs == 0) return 0;
	cs++;ct++;
  }
  if(*cs==0) return 0; // enabled  partial match
  return *cs - *ct;  
}

//return length of string
int len(const wchar_t* str){
	int count =0;
	while(*str++){
		count++;
	}
	return count;
}

