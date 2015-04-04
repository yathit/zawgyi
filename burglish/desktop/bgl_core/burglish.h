
//////////////////////////////////////////////////////////////////////////////
//
// This software will be released under a free software license, the GPLv2.0
// Feel free to copy and redistribute this software.
// Please maintain this copyright note for your inclusion of this software 
// and/or any part of this software.
//
// Copyright (C) 2007-2008 Burglish Systems
// http://code.google.com/p/burglish/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License version 2 as
// published by the Free Software Foundation;
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
//
//////////////////////////////////////////////////////////////////////////////

#ifndef __BURGLISH_H__
#define __BURGLISH_H__

// ======================== Defines ==========================

#define BCLEN 102
#define BVLEN 197
#define BACLEN 6

// ======================== Structures ==========================

struct Burglish_Consonent{
	wchar_t *key;
	wchar_t *val[4]; //currently max is 4
};

struct Burglish_Vowel{
	wchar_t *key;
	wchar_t *val[10]; //currently around 10
};

struct Burglish_AutoCorrect{
	wchar_t* pattern;
	wchar_t* replace;
};

struct Burglish_Digit{
	wchar_t *coreDigitText[9]; /* tit, hnit ... */
	wchar_t *powerDigitText[7][2]; /* khu, sal , yar ... */
	wchar_t *coreDigit; /* 1,2,3, .... in burmese */
};

extern Burglish_Consonent _bc[BCLEN];

extern Burglish_Vowel _bv[BVLEN];

extern Burglish_AutoCorrect _bac[BACLEN];

extern Burglish_Digit _bd;

#endif //__BURGLISH_H__

