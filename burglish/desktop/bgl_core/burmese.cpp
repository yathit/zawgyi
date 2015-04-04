 /*
 *	code - aTxIvG4001
 */
 
#include "burmese.h"

Burmese::Burmese(){
	charBuff=(wchar_t*) malloc (BGLEN); /* allocate charBuffer */
	cache=(wchar_t*) malloc (CACHELEN); /* allocate cache for phonetic menu */
	
	/* set to NULLs, very important */
	*charBuff=NULL; 
	*cache=NULL;
}

Burmese::~Burmese(){
	free (charBuff);
	free (cache);
}

bool Burmese::processTypeWriterInput(wchar_t * dest, wchar_t charIn,unsigned int vkey){
	  wchar_t *keycode=NULL; //modify default to NULL
	
	  //ignore control characters
	  if(charIn<32) 
		return false;
	
	  // key alone or with shift keyprocessPhoneticMenuAutoCorrect
	  if (vkey==0 || vkey==4){
		for(int i=0;i<FVLEN;i++){ // one character 4 bytes
			if( charIn==_f[WinInnwa].val[i] && _f[curFontIndex].val[i]!=0) //if charIn same with WinInnwa value
			{	  
				dest[0]=_f[curFontIndex].val[i];
				dest[1]=0x0;
				return true;
			}
		}
	  }

	  //for ctrl, alt, shift combination keys
	  if(keycode==NULL){
		for(int i=0;i<_f[curFontIndex].spchar_len;i++)
		{
			if( charIn==_f[curFontIndex].spchar[i].key && vkey==_f[curFontIndex].spchar[i].keystate)
			{
				wcscpy(dest,_f[curFontIndex].spchar[i].val);
				return true;
			}
		}
	  }

	  //for patsints ka, kha etc..
	  if(keycode==NULL){	  
		for(int i=0;i<FVLEN;i++)// one character 4 bytes
		{
			if((charIn+32)==_f[WinInnwa].val[i] && i<33 && vkey==3)
			{
				if(_f[curFontIndex].val[i+33]!=0)
				{
					dest[0]=_f[curFontIndex].val[i];
					dest[1]=0x0;
				}
			}
		}
	}

	//if not in both, nothing to do with that key
	return true;
}

bool Burmese::convertDigit(wchar_t* destStr, wchar_t* srcStr)
{
	/* one line converting */
	//while(*destStr++=_bd.coreDigit[*srcStr++-'0']); //got error in windows 2000 :P
	
	/* full feature */
	while(*srcStr){
		if(*srcStr>='0' && *srcStr<='9'){
			*destStr=_bd.coreDigit[*srcStr-'0'];
		}else{
			*destStr=*srcStr;
		}
		destStr++;
		srcStr++;
	}
	*destStr=NULL;
	return true;
}

bool Burmese::processNumericInput()
{
	wchar_t burmeseData[BMLEN]={0};
	
	this->clearPhoneticMenuData(); //clear all
	
	this->convertDigit(burmeseData,charBuff);
	
	wcscpy(menuItem[0][0].burglish,charBuff);
	wcscpy(menuItem[0][0].burmese,burmeseData);
	
	menuLength=1;
	
	return true;
}

void Burmese::processCustomDictionary()
{
	if(charBuff==NULL) return;
	
	wchar_t burglishData[BGLEN]={0};
	for (int i=0; i<dict.length;i++){
		if(cmp((const wchar_t*)charBuff, dict.data[i].burglish)==0){ // match "an"
			//copying data into menu array
			wcscpy(menuItem[menuLength/MROW][menuLength%MROW].burglish,dict.data[i].burglish);
			wcscpy(menuItem[menuLength/MROW][menuLength%MROW].burmese,dict.data[i].burmese);
			menuItem[menuLength/MROW][menuLength%MROW].flag = dict.data[i].flag;
			menuLength++;
		}
	}
}

bool Burmese::processPhoneticInput()
{
	wchar_t burglishData[BGLEN]={0};
	int idx=0;bool isPatsint=false;
	bool bufferFull=false;

	this->clearPhoneticMenuData(); //clear all
	
	wcscpy(burglishData,charBuff);

	if (len(burglishData)<1) 
		return false;
		
	for(int i=0; i<BCLEN;i++){ //loop for consonent
		if(bufferFull) break;
		if(burglishData[0]>65 && burglishData[0]<65+26){
			isPatsint = true;
			burglishData[0]=burglishData[0]+32;
		}
		if(wcsstr(burglishData, _bc[i].key)==burglishData){ //find "m" in "man", ==burglishData means find at firstpos :P
			for(int i1=0; i1<4;i1++){ //loop for sub items
				if(bufferFull) break;
				if(_bc[i].val[i1]==0) break; // if no more sub items break it
				
				wchar_t burmeseData[BMLEN]={0};

				if(cmp(L"a",burglishData)!=0) //only done when it is start with "a"
					sub(burmeseData,burglishData,_bc[i].key, L""); //copy non-consonent part in displayData
				else
					wcscpy(burmeseData,burglishData);
			
				if(len(burmeseData)==0) 
					wcscpy(burmeseData,L"a");//if only type consonent, append "a"

				for(int j=0; j<BVLEN;j++){ //loop for vowel
					if(bufferFull) break;
					if(wcscmp(burmeseData, _bv[j].key)==0){ // match "an"
						for(int j1=0; j1<10;j1++){ //loop for sub items
							if(_bv[j].val[j1]==0) 
								break; // if no more sub items break it
						  
							wchar_t displayData[BMLEN]={0};
							
							if(isPatsint){
								wcscpy(burglishData,_bc[i].val[i1]);
								burglishData[0]=toLower(burglishData[0]);
								sub(burmeseData,_bv[j].val[j1],L"$1", burglishData);
								
								wcscpy(displayData,L"---");
								
							}else{
								sub(burmeseData,_bv[j].val[j1],L"$1", _bc[i].val[i1]); //replace "in" with burmese "a sat", displayData is reused
							}
							
							wcscat(displayData,burmeseData);
							
							//copying data into menu array
							wcscpy(menuItem[idx/MROW][idx%MROW].burglish,burglishData);
							wcscpy(menuItem[idx/MROW][idx%MROW].burmese,burmeseData);
	
							if((idx++)>=MLEN) {
								bufferFull=true;
								break;
							}
	
						}
					}
				}
			}
		}
	}
	menuLength=idx;
	this->processCustomDictionary();
	this->processPhoneticMenuAutoCorrect();
	
	#ifndef _TEST
		LPVOID lpOut;
		lpOut = VirtualAlloc(NULL, 20, MEM_COMMIT, PAGE_READWRITE);
		for(int Row = 0; Row < MROW; Row++)
		{
			for(int Col = 0; Col < MCOL; Col++)
			{
				if( wcslen(menuItem[Col][Row].burmese) <= 0) break;
				wcscpy((wchar_t*)lpOut,menuItem[Col][Row].burmese);
				lpOut = DoSourceReplace(lpOut,20,Zawgyi_One,curFontIndex);
				LiveConvert(Zawgyi_One,curFontIndex,(wchar_t*)lpOut);
				lpOut = replace(L"\u103B\u102B",L"\u102B\u103A",(wchar_t*)lpOut,10, curFontIndex);
				wcscpy(menuItem[Col][Row].burmese,(wchar_t*)lpOut);
			}
		}
	#endif
	
	return menuLength>0;
};

void Burmese::processPhoneticMenuAutoCorrect(){
	for(int j=0;j<BACLEN;j++){
		Regex re(_bac[j].pattern);
		for(int i=0;i<menuLength;i++){
			int col=i/MROW;int row=i%MROW;
			if(wcslen(menuItem[col][row].burmese)>1){
				if(re.test(menuItem[col][row].burmese)){
					wchar_t tmp[BMLEN];
					re.sub(menuItem[col][row].burmese,_bac[j].replace,tmp);
					wcscpy(menuItem[col][row].burmese,tmp);
				}
			}
		}
	}
}

wchar_t* Burmese::processPhoneticHelp()
{
	wchar_t* pos1;wchar_t tmp1[BMLEN];wchar_t tmp2[BMLEN];wchar_t tmp3[BMLEN];wchar_t tmp4[BMLEN];
	wchar_t cons[]={L"\u1017\u103A\u100A\u1039\u1038\n"};wchar_t vowel[]={L"\u101E\u101B\n"};
	int idx1=0;int idx2=0;

	this->clearCache(CONSPTR, VOWELPTR+1023);
	wchar_t* widx1=cache+CONSPTR;
	wchar_t* widx2=cache+VOWELPTR;
	
	/* consonent candidate list help
	 * eg., s, ss, sh ... */
	for(int i=BCLEN-1; i>=0;i--){ //loop for consonent
		if(wcsstr(_bc[i].key,charBuff)==_bc[i].key){ //find "p", "ph" when user press "p",
			for(int i1=0; i1<4;i1++){ //loop for sub items
				if(_bc[i].val[i1]==0) break; // if no more sub items break it
				if(len(widx1)<500 && idx1<20) {
					wcscat(widx1, _bc[i].key);
					wcscat(widx1, L" - ");
					wcscat(widx1,_bc[i].val[i1]);
					wcscat(widx1, L"\n");
					idx1++;
				}
			}
		}
	}

	for(int i=BCLEN-1; i>=0;i--){
		if((pos1=wcsstr(charBuff, _bc[i].key))==charBuff) {
			wcscpy(tmp2,_bc[i].key);
			sub(tmp3,charBuff,_bc[i].key, L""); //copy non-consonent part in tmp1
			wcscpy(tmp4,_bc[i].val[0]); // for sample
			break;
		}
	}
	
	/* vowel candidate list help
	 * eg., at, ar, an ... */
	if(len(tmp3)>0){
		for(int j=0; j<BVLEN;j++){ //loop for vowel
			if(wcsstr(_bv[j].key,tmp3)==_bv[j].key){ // match "a" "an"					
				sub(tmp1,_bv[j].val[0],L"$1", tmp4); //replace "in" with burmese "a sat", tmp1 is reused
				
				if(len(widx2)<500 && idx2<20) {
					wcscat(widx2, tmp2);
					wcscat(widx2, _bv[j].key);
					wcscat(widx2, L" - ");
					wcscat(widx2,tmp1);
					wcscat(widx2, L"\n");
					idx2++;
				}
			}
		}
	}
	
	if(idx2>0)
		return widx2;
	else if(idx1>0)
		return widx1;

	return NULL;
}

void Burmese::clearPhoneticMenuData(){/* Clear Everything in the menuItem array */
	for(int i=0;i<MCOL;i++){
		for(int j=0;j<MROW;j++){
			menuItem[i][j].burglish[0]=menuItem[i][j].burmese[0]=NULL;
		}
	}
}

void Burmese::clearCache(int first, int last){
	for(int i =first;i<last;i++){
		cache[i]=0;
	}
}

wchar_t Burmese::toLower(wchar_t ch){
	wchar_t ret=ch;
	for(int i=0;i<32;i++){
		if(_f[curFontIndex].val[i]==(int)ch){
			if(_f[curFontIndex].val[i+33]!=0){
				ret=(wchar_t)_f[curFontIndex].val[i+33]; 
			}
			break;
		}
	}
	return ret;
}

int Burmese::ord(wchar_t ch){
	for(int i=0;i<FVLEN;i++){
		if(_f[curFontIndex].val[i]==(int)ch){
			return i; 
		}
	}
	return NULL;
}

