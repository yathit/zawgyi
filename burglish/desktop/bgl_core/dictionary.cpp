 /*
 *	code - aTxIvG4001
 */

#include "dictionary.h"

Dictionary::Dictionary(){
	this->data =(BglDictionary*) malloc (MAXDICTSIZE); 
	this->load();	
}

Dictionary::~Dictionary(){
	free(this->data);
}

bool Dictionary::load(){
	this->length =0;
	
	WIN32_FIND_DATA ffd;
	HANDLE hFind = INVALID_HANDLE_VALUE;
	
	SetCurrentDirectory(DICT_FOLDER);

	hFind = FindFirstFile("*.dic", &ffd);

	if (INVALID_HANDLE_VALUE == hFind) return false;
   
   do{
		FILE * pFile;
		pFile = fopen (ffd.cFileName ,"rb");
		
		if (pFile==NULL) return false;
		
		unsigned long lSize = ffd.nFileSizeLow;
		
		if(lSize<1 || lSize>100000) return false;
		
		// append the file into the buffer
		unsigned long result = fread (this->data+this->length,1,lSize,pFile);
		
		if (result != lSize) return false;
		
		// add the dictionary length
		this->length+=lSize/sizeof(BglDictionary);
		
		fclose (pFile);
	
	}while (FindNextFile(hFind, &ffd) != 0);
	
	FindClose(hFind);
	
	return true;
}
