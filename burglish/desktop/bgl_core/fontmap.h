
//////////////////////////////////////////////////////////////////////////////
//
// This software will be released under a free software license, the GPLv2.0
// Feel free to copy and redistribute this software.
// Please maintain this copyright note for your inclusion of this software 
// and/or any part of this software.
//
// Copyright (C) 2007-2008 Prince Ka Naung Project
// http://code.google.com/p/kanaung/
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

#ifndef __FONTMAP_H__
#define __FONTMAP_H__

#define Zawgyi_One 0
#define M_Myanmar1 1
#define UniBurma 2
#define WinInnwa 3
#define Parabaik 4
#define Metrix_1 5
#define Kingmyanmarsar 6
#define PadaukOT 7
#define Kannaka_Unknown 8
#define Gandamar_Letter1 9
#define MyaZedi 10
#define Academy 11
#define Myanmar3 12
#define Wwin_Burmese 13
#define MS_HEAVY 14
#define CECLASSIC 15

#define FLEN 16
#define FVLEN 226  //+ 5 /*Addition*/32,13,10,47,9}

enum FM_FONTTYPE{UNKNOWN=-1,ASCII, UNICODE_PARTIAL, UNICODE_5_1=51};

struct FontMap_Special_Char{
	unsigned short length; //length of val
	unsigned short keystate;
	unsigned short key;
	const wchar_t val[5]; //max length = fixed length-1
};

struct FontMap_Ext{
	unsigned short length; //length of val
	unsigned short key;
	const wchar_t val[5];
};

struct FontMap_Reorder_Pair{
	const wchar_t key[25]; //currently fixed
	const wchar_t val[5]; //currently fixed
};

struct FontMap{
	/* 0 for ASCII, 1 for partial unicode, 51 for unicode 5.1 compatibles */
	unsigned short unicode; 
	
	const wchar_t *fontname; 
	
	unsigned short fontsize; 
	
	/*main char list */
	unsigned short val[FVLEN];
	
	/* min, max char code */
	unsigned short min;
	unsigned short max;
	
	/* special input ,  like Ctrl+Alt+5 */
	unsigned short spchar_len;
	union {
		const wchar_t *__spchar__; //a trick to the compiler :P
		FontMap_Special_Char *spchar;
	};
	
	/* extended chars for decomposition, 
	 * like "za myin zwel" to "sa lone + ya pin", 
	 * coz non-unicode fonts need that  */
	unsigned short ext_len;
	union {
		const wchar_t *__ext__; //a trick to the compiler :P
		FontMap_Ext *ext;
	};
	
	/* consonent forward re-ordering , used when non-5.1 to 5.1 */
	unsigned short fwd_len;
	union {
		const wchar_t* __fwd__;
		FontMap_Reorder_Pair* fwd;
	};
	
	/* consonent reverse re-ordering , used when 5.1 to non-5.1 */
	unsigned short rev_len;
	union {
		const wchar_t* __rev__;
		FontMap_Reorder_Pair* rev;
	};
	
	/* vowel re-ordering , should be call after consonent is properly ordered */
	unsigned short vowel_len;
	const wchar_t* vowel;
	
	/* after vowel re-ordering , need for some adjustments */
	unsigned short after_len;
	union {
		const wchar_t* __after__;
		FontMap_Reorder_Pair* after;
	};
	
};

extern FontMap _f[FLEN];

#endif // __FONTMAP_H__

