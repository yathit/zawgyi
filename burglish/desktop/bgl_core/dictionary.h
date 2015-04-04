#ifndef DICTIONARY_H
#define DICTIONARY_H

#include <windows.h> //Directory Read
#include <stdio.h> //File Read

#define MAXDICTSIZE 500000

#ifdef _DEBUG
	#define DICT_FOLDER "../bgl_dicts"
#else
	#define DICT_FOLDER "./dicts"
#endif

/* flags for BglDictionary.flag */
#define BD_NOFLAG  0x0000
#define BD_NEED_DOUBLE_HYPHEN  0x0001

#define BGLEN 15
#define BMLEN 20

struct BglDictionary{
	wchar_t burglish[BGLEN];
	wchar_t burmese[BMLEN];
	unsigned short flag;
};

class Dictionary{
	public:
		Dictionary(void);
		~Dictionary(void);
		
		bool load();
		
		int length;
		BglDictionary *data;
		
	private:	
};

#endif // DICTIONARY_H
