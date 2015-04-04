 
#ifndef __BURMESE_H__
#define __BURMESE_H__

#include "lib.h"
#include "fontmap.h"
#include "burglish.h"
#include "dictionary.h"
#include "converter.h"
#include "regex.h"

#define CACHELEN 16384
#define CONSPTR 1024
#define VOWELPTR 2048

#define MCOL 4 /* menu column count */
#define MROW 10 /* menu row count */
#define MLEN MCOL * MROW /* menu total item count */
#define MHEIGHT 22 /* character height */
#define MWIDTH 150 /* menu width */

struct BglPOINT{int x; int y;};

class Burmese{
	public:
		Burmese();
		~Burmese();
		
		BglDictionary menuItem[MCOL][MROW]; /* phonetic menu data */
		BglPOINT selMenu; /* select position in phonetic menu */
		int menuLength; /* phonetic menu length */
		
		bool processTypeWriterInput(wchar_t* dest, wchar_t charIn,unsigned int vkey);
		bool processPhoneticInput();
		bool processNumericInput();
		
		/* Main Custom Dictionary Class */
		Dictionary dict;
		
		wchar_t* processPhoneticHelp(); /* romanization help */
		
		int curFontIndex; /* font index */
		
		bool isTypeWriterInput;
		bool isPhoneticInput;
		
		wchar_t* charBuff; /* phonetic input buffer */
		
		wchar_t toLower(wchar_t ch); /* to lower case for current font */
		int ord(wchar_t ch); /* get char code for current font*/
		bool convertDigit(wchar_t * destStr, wchar_t *srcStr); /* digit to burmese digits */

	private:
		void clearPhoneticMenuData(); /* clear phonetic menu array data */
		void clearCache(int, int); /* fill 0 in cache */

		void processPhoneticMenuAutoCorrect(); /* autocorrect syntax */
		void processCustomDictionary(); /* append custom dictionary data */
		wchar_t *cache; /* phonetic help cache , and may b some other use */
		
};

#endif //end define __BURMESE_H__
