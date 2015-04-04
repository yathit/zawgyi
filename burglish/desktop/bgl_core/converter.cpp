/* 
 *	code - bashroan 
*/

#include "converter.h"
LPVOID lpSrc;
LPVOID lpDest;
int Length;


ArrangeData _A[FLEN]={
	{Zawgyi_One,
	L"{\x0057}{\x0052}{\x0051}{\u102B\u103A}",
	L"{\u108a\u107d}{\u103c\u107d}{\u103d\u103a}{\u105A}",
	L"",
	L""},

	{M_Myanmar1,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{UniBurma,L"{\u102B\u103A}",L"{\u105A}",L"",L""},

	{WinInnwa,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{Parabaik,
	L"{\x0057}{\x0052}{\x0051}{\x0054}{\x004F\x0044}{\x0046}{\x0051}{\x003A}{\x0049}{\x0057}{\x0052}{\x004F\x0066}{\x0054}",
	L"{\u103B\u103D\u103E}{\u103B\u103D}{\u103B\u103E}{\u103D\u103E}{\u1026}{\u1004\u103A\u1039}{\u103B\u103E}{\u102B\u103A}{\u103E\u102F}{\u103B\u103D\u103E}{\u103B\u103D}{\u1009\u103A}{\u103D\u103E}",

	L"{\u1000\u1021}{\u1000\u1021}",
	L"{\u103C\u103C}{\u1031\u1031}"},

	{Metrix_1,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{Kingmyanmarsar,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{PadaukOT,
	L"{\x0057}{\x0052}{\x0051}{\x0054}{\x004F\x0044}{\x0046}{\x0051}{\x003A}{\x0049}{\x0057}{\x0052}{\x004F\x0066}{\x0054}",
	L"{\u103B\u103D\u103E}{\u103B\u103D}{\u103B\u103E}{\u103D\u103E}{\u1026}{\u1004\u103A\u1039}{\u103B\u103E}{\u102B\u103A}{\u103E\u102F}{\u103B\u103D\u103E}{\u103B\u103D}{\u1009\u103A}{\u103D\u103E}",

	L"{\u1000\u1021}{\u1000\u1021}",
	L"{\u103C\u103C}{\u1031\u1031}"},

	{Kannaka_Unknown,L"{\u102B\u103A}",L"{\xC5}",L"",L""},

	{Gandamar_Letter1,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{MyaZedi,L"{\u102B\u103A}",L"{\u105A}",L"",L""},

	{Academy,L"{\u102B\u103A}",L"{\x3B}",L"",L""},

	{Myanmar3,
	L"{\x0057}{\x0052}{\x0051}{\x0054}{\x004F\x0044}{\x0046}{\x0051}{\x003A}{\x0049}{\x0057}{\x0052}{\x004F\x0066}{\x0054}",
	L"{\u103B\u103D\u103E}{\u103B\u103D}{\u103B\u103E}{\u103D\u103E}{\u1026}{\u1004\u103A\u1039}{\u103B\u103E}{\u102B\u103A}{\u103E\u102F}{\u103B\u103D\u103E}{\u103B\u103D}{\u1009\u103A}{\u103D\u103E}",

	L"{\u1000\u1021}{\u1000\u1021}",
	L"{\u103C\u103C}{\u1031\u1031}"},

	{Wwin_Burmese,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{MS_HEAVY,L"{\u102B\u103A}",L"{\x3A}",L"",L""},

	{CECLASSIC,L"{\u102B\u103A}",L"{\x3A}",L"",L""},
};


bool LiveConvert(int SourceFontIndex,int DestFontIndex,wchar_t* str)
{
	wchar_t wcTemp = {0};/*Temp Buffer*/
	BOOL isFound = FALSE;
	int b = 0;
	bool IsSuccess = TRUE;

	/*Store Length of Input String*/
	int Length= wcslen(str);
	/*If there is no char, stop here*/
	if (Length<1) return false;
	if ( ((SourceFontIndex == Myanmar3) || (SourceFontIndex == Parabaik) ||(SourceFontIndex == PadaukOT))
		&& ((DestFontIndex == Myanmar3) || (DestFontIndex == Parabaik) || (DestFontIndex == PadaukOT)) )
		return false;

	int x = 0;
	for(int x=0; x <= Length;x++){
		for(int i=0; i<FVLEN;i++){
			wcTemp = *(str+x);/*Get the Input Char*/
			/*Compare the src and dest char to find the pos of char*/
			if (*&_f[SourceFontIndex].val[i] == wcTemp)
			{
				wcTemp = (wchar_t)*&_f[DestFontIndex].val[i];
				if (wcTemp)
				{
					*(str+b) = wcTemp;/*Stored the converted char*/
					b++;
				}
				x++;/*Converted String Length*/

				/*If the same, all strings are successfully converted*/
				if (Length == x)
				{
					isFound = true;
					break;
				}
				/*restart*/
				i=-1;
			}
		}
		if (isFound == FALSE)/*If not found, skip that char*/
		{
			b++;
			/*Coverting has failed*/
			IsSuccess = FALSE;
		}
		isFound = FALSE;
	}
	if ( (DestFontIndex == Parabaik) || (DestFontIndex == PadaukOT) || (DestFontIndex == Myanmar3) ){
		DoSwap((wchar_t*)str,Length,DestFontIndex,FALSE);
		OrderVowel ((wchar_t*) str);
	}
	return IsSuccess;
}

bool Convert(HWND hwndEdit,int SourceFontIndex,int DestFontIndex)
{
	wchar_t wcTemp;
	BOOL isFound = FALSE;
	int b = 0;
	bool IsSuccess = TRUE;

	int size = GetWindowTextLengthW(hwndEdit);
	if (size<1) return false;

	lpSrc = VirtualAlloc(NULL,size*3, MEM_COMMIT, PAGE_READWRITE);/*Allocate memory for InputStrings*/
	lpDest = VirtualAlloc(NULL,size*3,MEM_COMMIT,PAGE_READWRITE);/*Allocate memory for OutputStrings*/
	GetWindowTextW(hwndEdit,(LPWSTR)lpSrc,size+1);/*Get the string from textpad*/
	if (SourceFontIndex == DestFontIndex){
		SetWindowTextW(hwndEdit,(LPCWSTR)lpSrc);
		return false;
	}
	if ( ((SourceFontIndex == Myanmar3) || (SourceFontIndex == Parabaik) ||(SourceFontIndex == PadaukOT))
		&& ((DestFontIndex == Myanmar3) || (DestFontIndex == Parabaik) || (DestFontIndex == PadaukOT)) )
	{
		SetWindowTextW(hwndEdit,(LPCWSTR)lpSrc);
		return false;
	}
	DoSwap((wchar_t*)lpSrc,size,SourceFontIndex,TRUE);
	lpSrc = DoSourceReplace(lpSrc,size,SourceFontIndex,DestFontIndex);

	Length = wcslen((wchar_t*)lpSrc);
	for(int x=0; (wchar_t)*(((LPCWSTR)lpSrc)+x) != 0;x++){
		int i = 0;
		while(i<FVLEN){
			wcTemp = (wchar_t)*(((LPCWSTR)lpSrc)+x);
			/*Compare the src and dest char to find the pos of char*/
			if (*&_f[SourceFontIndex].val[i] == wcTemp)
			{
				wcTemp = (wchar_t)*&_f[DestFontIndex].val[i];
				if (wcTemp){
					*(LPDWORD)( 2*b + (int) * (&lpDest) ) = wcTemp;/*Stored the converted char*/
					isFound = true;
				}
				else {
					wcTemp = (wchar_t)*&_f[SourceFontIndex].val[i];
					isFound = false;
				}
				i = FVLEN;
			}
			i++;
		}
		if (isFound == false)/*If not found, let store the original char*/
		{
			/*Store the original char*/
			*(LPDWORD)( 2*b + (int) * (&lpDest) ) = wcTemp;
			/*Coverting has failed*/
			IsSuccess = FALSE;
		}
		b++;
		isFound = false;
	}
	if ( (DestFontIndex == Parabaik) || (DestFontIndex == PadaukOT) || (DestFontIndex == Myanmar3) ){
		DoSwap((wchar_t*)lpDest,Length,DestFontIndex,FALSE);
		OrderVowel ((wchar_t*) lpDest);
		lpDest = replace(L"\u103B\u102B",L"\u102B\u103A",(wchar_t*)lpDest,Length, DestFontIndex);
		lpDest = replace(L"\uFFFF",L"\u1039",(wchar_t*)lpDest,Length, DestFontIndex);
	}

	SetWindowTextW(hwndEdit,(LPCWSTR)lpDest);
	VirtualFree(lpSrc,size*3,MEM_DECOMMIT);/*Free used memory*/
	VirtualFree(lpDest,size*3,MEM_DECOMMIT);/*Free used memory*/
	return IsSuccess;
}

LPVOID DoSourceReplace (LPVOID lpSrc,int size,int SourceFontIndex,int DestFontIndex)
{
	wchar_t Brackets [] =L"{}";
	wchar_t Search[50];
	wchar_t Replace[50];

	wchar_t SearchToken[256];
	wchar_t ReplaceToken[256];

	wchar_t* Rtoken = {0};
	wchar_t* Stoken = {0};
	
	wcscpy (SearchToken,_A[DestFontIndex].ReplaceSearch);
	wcscpy (ReplaceToken,_A[DestFontIndex].ReplaceReplace);
	// Establish string and get the first token:
	Stoken = wcstok( SearchToken, Brackets );
	Rtoken = wcstok( ReplaceToken, Brackets );

	while( Stoken != NULL && Rtoken != NULL)
	{
		wcscpy(Search,Stoken);
		wcscpy(Replace,Rtoken);

		lpSrc = replace (Search,Replace,(wchar_t*)lpSrc,size*3,SourceFontIndex);

		Stoken = wcstok( Stoken+1+wcslen(Search), Brackets );
		Rtoken = wcstok( Rtoken+1+wcslen(Replace), Brackets );
	}
	if (DestFontIndex == Zawgyi_One){
	lpSrc = replaceEx (L"\x003C",L"\u107E\uFFFF\u103C",(wchar_t*)lpSrc,size,SourceFontIndex,1);
	lpSrc = replaceEx (L"\x003E",L"\u103B\uFFFF\u103C",(wchar_t*)lpSrc,size,SourceFontIndex,1);
	}

	if ( (DestFontIndex == Parabaik) || (DestFontIndex == PadaukOT) || (DestFontIndex == Myanmar3) ){
	SwapEx (L"\x0073\x006A\x0047\x0053\x0061\x0067\x006D\x0064\x0044\x006B\x006C\x004A\x0048\x0066\x0068\x0059\x0055",
		L"\x00A2\x00A6\x00A8\x00A9\x00AC\x00AE\x00B2\x00B3\x00B4\x00BE\x00C1\x00C5\x00C6\x00C7\x00C9\x00D1\x00D6\x00DC\x00E4\x00E5\x00E6\x00E9\x00F6\x00FA",
		(wchar_t*)lpSrc,SourceFontIndex);
	lpSrc = replaceEx (L"\x00A2\x00A6\x00A8\x00A9\x00AC\x00AE\x00B2\x00B3\x00B4\x00BE\x00C1\x00C5\x00C6\x00C7\x00C9\x00D1\x00D6\x00DC\x00E4\x00E5\x00E6\x00E9\x00F6\x00FA",L"\uFFFF",(wchar_t*)lpSrc,size,SourceFontIndex,3);
	lpSrc = replaceEx (L"\x003C",L"\uFFFF\u103C\u103D",(wchar_t*)lpSrc,size,SourceFontIndex,0);
	lpSrc = replaceEx (L"\x003E",L"\uFFFF\u103C\u103D",(wchar_t*)lpSrc,size,SourceFontIndex,0);
	}
	return lpSrc;
}

void DoSwap (wchar_t* buffer,int range,int FontIndex,bool Source)
{	
	wchar_t Brackets [] =L"{}";
	wchar_t $A,$B,$X,$Y;

	wchar_t FirstToken[256] = {0};
	wchar_t SecondToken[256] = {0};
	
	wchar_t* Ftoken = {0};
	wchar_t* Stoken = {0};
	
	switch (Source){
		case TRUE:
			wcscpy (FirstToken,_A[FontIndex].SwapFirstChar);
			wcscpy (SecondToken,_A[FontIndex].SwapSecondChar);
			break;
		case FALSE:
			wcscpy (FirstToken,_A[FontIndex].SwapSecondChar);
			wcscpy (SecondToken,_A[FontIndex].SwapFirstChar);
	}
	// Establish string and get the first token:
	Ftoken = wcstok( FirstToken, Brackets );
	Stoken = wcstok( SecondToken, Brackets );

	while( Ftoken != NULL && Stoken != NULL)
	{
		$A = (wchar_t)*Ftoken;
		$B = (wchar_t)*(Ftoken+1);
		$X = (wchar_t)*Stoken;
		$Y = (wchar_t)*(Stoken+1);

		Swap($A,$B,$X,$Y,buffer, range);

		Ftoken = wcstok( Ftoken+3, Brackets );
		Stoken = wcstok( Stoken+3, Brackets );
	}
}

/*if you want to swap with only between "\u1000" and "\u1021"*/
/*$A=0x1000 $B=0x1021*/

void Swap(wchar_t $A, wchar_t $B,wchar_t $X,wchar_t $Y,wchar_t* buffer,int range)
{
	/*Do until the end of the buffer*/
	for (int r = 0; *(r+*(&buffer)) != 0; r++){
		/* ($A<= FirstChar & $B=> FirstChar) & ($X<= SecondChar & $Y=> SecondChar) */
		if (($A <= *(r+*(&buffer)) && ($B >= *(r+*(&buffer))) && ($X <= *(1+r+*(&buffer))) && ($Y >= *(1+r+*(&buffer))))){
			/*Swapping between two chars*/
			wchar_t I = *(r+*(&buffer));//Store first char to I
			wchar_t II = *(1+r+*(&buffer));//Store second char to II
			*(r+*(&buffer)) = II;//Write II to second place
			*(1+r+*(&buffer)) = I;//Write I to first place
			/*Increase Range Value*/
			r++;
		}
	}
}

void SwapEx(wchar_t* $A, wchar_t* $B,wchar_t* buffer,int FontIndex){
	wchar_t A[100] = {0};
	wchar_t B[100] = {0};

	wcscpy(A,$A);
	wcscpy(B,$B);

	LiveConvert(WinInnwa,FontIndex,A);
	LiveConvert(WinInnwa,FontIndex,B);

	int Alen = wcslen(A);
	int Blen = wcslen(B);

	for (int x = 0; (*(x+*(&buffer))) != 0; x++){
		for (int a = 0; a <= Alen; a++){
			if ((*(x+*(&buffer))) == A[a]){
				for (int b = 0; b <= Alen; b++){
					if ((*(x+1+*(&buffer))) == B[b]){
						(*(x+*(&buffer))) = B[b];
						(*(x+1+*(&buffer))) = A[a];
					}
				}
			}
		}
	}
}

LPVOID replaceEx (wchar_t* search, wchar_t* replace, wchar_t* buffer, int range,int FontIndex,int Method)
{
	wchar_t Search[100] = {0};
	wchar_t Replace[100] = {0};
	
	wcscpy(Search,search);
	wcscpy(Replace,replace);

	LiveConvert(WinInnwa,FontIndex,Search);
	LiveConvert(WinInnwa,FontIndex,Replace);

	int searchlen = wcslen(search);
	int replacelen = wcslen(replace);

	LPVOID TempBuffer = VirtualAlloc(NULL,range*3, MEM_COMMIT, PAGE_READWRITE);

	int Length = wcslen((wchar_t*)buffer);
	int sLength = wcslen(Search);
	int z = 0; int s = 0;

	switch (Method){
		case 3:
			for (int r = 0; (*(r+*(&buffer))) != 0; r++){
				s = 0;
				do{
					if ((*(s+*(&Search))) == *(r+*(&buffer))){
						wcscat((wchar_t*)TempBuffer, Replace);
						z += replacelen;
						break;
					}
					s++;
				}while (sLength > s);
				*(LPDWORD)( 2*z + (int) * (&TempBuffer) ) = *(r+*(&buffer));
				z++;
			}
			break;
		default:
			for (int r = 0; (*(r+*(&buffer))) != 0; r++){
				s = 0;
				do{
					if ((*(s+*(&Search))) == *(r+*(&buffer))){
						Replace[Method] = *(r+*(&buffer));
						wcscat((wchar_t*)TempBuffer, Replace);
						z += replacelen;
						r++;
						break;
					}
					s++;
				}while (sLength > s);
				*(LPDWORD)( 2*z + (int) * (&TempBuffer) ) = *(r+*(&buffer));
				z++;
			}
	}

	VirtualFree((LPVOID)buffer,range*3,MEM_DECOMMIT);/*Free used memory*/
	return TempBuffer;
}

LPVOID replace (wchar_t* search, wchar_t* replace, wchar_t* buffer, int range,int FontIndex)
{
	wchar_t Search[10] = {0};
	wchar_t Replace[10] = {0};
	
	wcscpy(Search,search);
	wcscpy(Replace,replace);
	LiveConvert(WinInnwa,FontIndex,Search);

	int searchlen = wcslen(search);
	int replacelen = wcslen(replace);

	LPVOID TempBuffer = VirtualAlloc(NULL,range*3, MEM_COMMIT, PAGE_READWRITE);

	int z = 0;int y = 0;
	int Length = wcslen((wchar_t*)buffer);
	for (int r = 0; *(r+*(&buffer)) !=0; r++){
		int x = 0;
		y = r;
		while ((*(x+*(&Search))) == *(y+*(&buffer)))
		{
			x++;
			if (x == searchlen)/*found*/
			{
				wcscat((wchar_t*)TempBuffer, Replace);
				x=0;
				z+=replacelen;
				r+=searchlen;
			}
			y++;
		}
		*(LPDWORD)( 2*z + (int) * (&TempBuffer) ) = *(r+*(&buffer));
		z++;
	}
	VirtualFree((LPVOID)buffer,range*3,MEM_DECOMMIT);/*Free used memory*/
	return TempBuffer;
}

void OrderVowel (wchar_t* buffer)
{
	wchar_t Vowels [18]= L"\u103B\u103C\u103D\u103E\u1031\u102B\u102C\u102D\u102E\u102F\u1030\u1032\u1036\u103A\u1039\u1037\u1000";
	int vLength = wcslen (Vowels);
	vLength--;

	for (int r = 0; (*(r+*(&buffer))) != 0; r++){
		int s = 0;
		do{
			if ( Vowels[s] == *(r+*(&buffer)) ) {
				wchar_t Temp = Vowels[s];
				do{
					if ( Vowels[s] == *(r+1+*(&buffer)) ){
						*(r+*(&buffer)) = *(r+1+*(&buffer));
						*(r+1+*(&buffer)) = Temp;
					break;
					}
				s--;
				}while (s >= 0);
				break;
			}
			s++;
		}while (vLength > s);
	}
}