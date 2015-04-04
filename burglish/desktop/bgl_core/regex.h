#ifndef __REGEX_H__
#define __REGEX_H__

#define MAXCHARINSQUAREBRACKET 0x40 /* [abcdef] */
#define MAXSOURCESTRLEN 0xFFFF /* Length of Input Str to match */	
#define MAXMATCHSTRLEN 0xFF /* Length of ^01234[abcdef]ghijkl$ */
#define MAXGROUP 10		/* \0, \1 - \9 */
#define MAXRESULT 10
#define MAXREPEAT 0xFF	/* for + * char,  dont need infinity or very large match */
#define MAXCHARCODE 0xFFFF

#ifndef NULL
	#define NULL 0
#endif

struct Burglish_Regex_Range{
	unsigned int start;
	unsigned int end;
};

struct Burglish_Regex_Char{
	unsigned int length;
	Burglish_Regex_Range range[MAXCHARINSQUAREBRACKET];
	unsigned int repeatMin; /* for ? + * */
	unsigned int repeatMax; /* ? + * */
	unsigned short group; /* (...) */
	bool eaten;
	bool invert;
};

struct Burglish_Regex{
	unsigned int length;/* length of regex source string */
	Burglish_Regex_Char ch[MAXMATCHSTRLEN];
	bool mustStart; /* ^ */
	bool mustEnd; /* $ */
};

struct Burglish_Regex_Match{
	unsigned int length;
	Burglish_Regex_Range range[MAXGROUP];
};

struct Burglish_Regex_Results{
	unsigned int length;
	Burglish_Regex_Match res[MAXRESULT];
	wchar_t* pointer;
};

/* regex headers */
class Regex{
	public:
		Regex(const wchar_t* pattern, bool global=false, bool greedy=false);
		~Regex();
		void compile();
		bool test(wchar_t* srcStr);
		void sub(wchar_t*srcStr, const wchar_t* replStr, wchar_t* destStr);
		const wchar_t* pattern;
		bool global;
		bool greedy;
	private:
		bool exec(wchar_t* srcStr);
		unsigned int check(unsigned int chIdx, wchar_t* inputStr, unsigned int strIdx);
		Burglish_Regex r;/* compiled regex */
		Burglish_Regex_Results gr;/* executed group result */
		wchar_t buffer[MAXSOURCESTRLEN];
		bool error;
};

#endif // __REGEX_H__
