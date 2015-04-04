#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2007 Burglish Project
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 2 as
# published by the Free Software Foundation;
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
#

import sys
#sys.path.append("..\python")

import cjson #-- cjson died after 17171 charcters, anyway i remove some of my burglish data, and now ok
#import simplejson #-simple json also died for long character key
import codecs
import re

class BurglishGen():

	def __init__(self):
		infile = open("license.txt", "r")
		self._license = infile.read()
		
		infile = codecs.open("burglish_src.json", "r", "utf-8")
		_fs = infile.read()
		#_fs	= re.sub(r'\/\/.*\n','',_fs)
		#_fs	= re.sub(r'[\n\s\t]*','',_fs)
		#_fs	= re.sub(r'\/\*.*?\*\/','',_fs)
		self._b= cjson.decode(_fs,all_unicode=True)
		#self._b=simplejson.loads(_fs)
		
	def _removeWhitespace(self,str):
		return str.replace(" ", "")
		
	def __cplusplusgen__(self):
		outtext =""
		_b = self._b
		
		#Consonent
		bclen=0
		bctext=""
		for bc in _b["c"]:
			for key in bc:
				if bclen>0:
					bctext+=","
				bctext+='{L"'+key+'",{'
				for x in range(4):
					if x>=len(bc[key]):
						break
					if x>0:
						bctext+=","
					if x<len(bc[key]):
						bctext+="L"+cjson.encode(bc[key][x])
					#else:
						#bctext+="0"
				bctext+="}}"
				bclen+=1
		bctext = 'Burglish_Consonent _bc[BCLEN]={\n\t'+bctext+'\n};' 
		outtext+= bctext
		
		#Vowel
		outtext+="\n\n"
		
		bvlen=0
		bctext=""
		for bc in _b["v"]:
			bc=bc["r"]
			for key2 in bc:
				for key in self.patterns(key2):
					if bvlen>0:
						bctext+=","
					bctext+='{L"'+key+'",{'
					for x in range(10):
						if x>=len(bc[key2]):
							break
						if x>0:
							bctext+=","
						if x<len(bc[key2]):
							bctext+="L"+cjson.encode(bc[key2][x])
						#else:
							#bctext+="0"
					bctext+="}}"
					bvlen+=1
		bctext = 'Burglish_Vowel _bv[BVLEN]={\n\t'+bctext+'\n};' 
		outtext+= bctext
		
		# Auto Correct
		outtext+="\n\n"
		
		baclen=0
		bctext="\n\t"
		for bc in _b["r"]:
			if baclen>0:
				bctext+="\n\t,"
			bctext+='{L'+cjson.encode(bc[0])+',L'+re.sub('\$',r'\\',cjson.encode(bc[1]))+'}' #
			baclen+=1
		bctext = 'Burglish_AutoCorrect _bac[BACLEN]={\t'+bctext+'\n};' 
		outtext+= bctext
		
		# Auto Correct
		outtext+="\n\n"
		
		bctext="\n\t"
		bctext+=re.sub('\]','}',re.sub('\[','{',re.sub('([ \[])"','\\1L"',cjson.encode(_b["d"]))))
		bctext = 'Burglish_Digit _bd=\t'+bctext+'\n;' 
		outtext+= bctext
		
		burglish_h="""
"""+self._license+"""

#ifndef __BURGLISH_H__
#define __BURGLISH_H__

// ======================== Defines ==========================

#define BCLEN """ +str(bclen)+ """
#define BVLEN """ +str(bvlen)+ """
#define BACLEN """ +str(baclen)+ """

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

"""
		outfile = open('burglish.h', 'w+')
		outfile.write(burglish_h)
		outfile.close()
		
		burglish_cpp="""
"""+self._license+"""

#include "burglish.h"

// ======================== Initializations ==========================

"""+outtext+"""

"""
		outfile = open('burglish.cpp', 'w+')
		outfile.write(burglish_cpp)
		outfile.close()
	
	def patterns(self,txt):
		ret=[]
		m=re.match(".*\[(.*)\].*",txt)
		if not m:
			return [txt]
		for x in m.group(1):
			ret.insert(-1,re.sub("\["+m.group(1)+"\]",x,m.group(0)))
		#print ret
		return ret
	
if __name__ == '__main__':
	print "u cannot run this as standalone"
