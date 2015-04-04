
#ifndef __CONVERTER_H__
#define __CONVERTER_H__

#include <windows.h>

#include "fontmap.h"

struct ArrangeData{
	int FontIndex;
	wchar_t* ReplaceSearch;
	wchar_t* ReplaceReplace;
	wchar_t* SwapFirstChar;
	wchar_t* SwapSecondChar;
};
extern ArrangeData _A[FLEN];

bool LiveConvert(int,int,wchar_t*);//Converter for menu item
bool Convert(HWND,int,int);//Converter for Edit Box
LPVOID replace (wchar_t*, wchar_t*, wchar_t*,int,int);
LPVOID replaceEx (wchar_t*, wchar_t*, wchar_t*,int,int,int);
void Swap(wchar_t,wchar_t,wchar_t,wchar_t,wchar_t*,int);
void SwapEx(wchar_t*,wchar_t*,wchar_t*,int);
LPVOID DoSourceReplace(LPVOID,int,int,int);
void DoSwap (wchar_t*,int,int,bool);
void OrderVowel (wchar_t*);

#endif //end define __CONVERTER_H__
