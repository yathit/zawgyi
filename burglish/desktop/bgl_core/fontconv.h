#ifndef __FONTCONV_H__
#define __FONTCONV_H__

#include "fontmap.h"
#include "regex.h"
#include "lib.h"

#define CHAR_RANGE 0x3000 /* ASCII ~ UNICODE */
#define CHAR_BUFFER 0xFFFF /* Input string buffer length */
#define VIRTUAL_OFFSET 0x3000 /* Virtual font offset */

#ifndef HIBYTE
	#define LOBYTE(a)           ((unsigned char)(((unsigned long)(a)) & 0xff))
	#define HIBYTE(a)           ((unsigned char)((((unsigned long)(a)) >> 8) & 0xff))
#endif

void convertFont(wchar_t* dst, wchar_t* src, int srcFont, int dstFont);

#endif //__FONTCONV_H__
