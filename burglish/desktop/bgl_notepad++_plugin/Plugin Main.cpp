/* This File is generated from Burglish Systems

 This software will be released under a free software license, the GPL v 2. 
 Feel free to copy and redistribute this software. Please maintain this copyright 
 note for your inclusion of this software and/or any part of this software.

 Copyright (C) 2007-2008 Burglish Systems
 http://code.google.com/p/burglish/

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License version 2 as
 published by the Free Software Foundation;

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

//===========-----------------------Plugin---------------------------==============
#ifndef _CRT_SECURE_NO_DEPRECATE
#define _CRT_SECURE_NO_DEPRECATE
#endif
#include "Plugin Main.h" 
//===========-----------------------Burglish--------------------------==============

#define UNICODE

#include "resource.h"

#include "../bgl_core/lib.h"
#include "../bgl_core/fontmap.h"
#include "../bgl_core/dictionary.h"
#include "../bgl_core/burmese.h"
#include "../bgl_core/burglish.h"
#include "../bgl_core/regex.h"
#include "../bgl_core/converter.h"

int MCol;
int MRow;

//Main Window
LRESULT CALLBACK WindowProcedure (HWND, UINT, WPARAM, LPARAM);

BOOL CALLBACK PopupMenuProc (HWND, UINT, WPARAM, LPARAM) ;//Popup menu

BOOL CALLBACK SubEditProc(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam);//Edit Ctl

void OnCreateMainWindow(HWND, WPARAM, LPARAM);//Main Window Create handler

HFONT MyCreateFont(HWND, int, LPCWSTR);

/* Declare Variables */
HFONT hfontCurrent = NULL; //ZawGyi Font Handler
HWND hwndEdit; //Handler for Edit Control
HWND hwndPopupMenu ; //Handler for PopupMenu


/* Main Burmese Class */
Burmese burmese;


//Original Scintilla procedure
WNDPROC EditProc;

HINSTANCE hInst;

POINT pointEditCursor; //Edit control cursor location
POINT pointMousePos; //to store previous mouse position
POINT pointMenuMouse;//current mouse position

//===========-----------------------Start Plugin Section--------------------------==============

BOOL APIENTRY DllMain( HANDLE hModule, 
                       DWORD  reasonForCall, 
                       LPVOID /*lpReserved*/ )
{
	switch (reasonForCall)
	{
		case DLL_PROCESS_ATTACH:
		{
			hBglish = (HINSTANCE)hModule;
			funcItem[0]._pFunc = Enable;
			funcItem[1]._pFunc = Disable;

			strcpy(funcItem[0]._itemName, "Enable");
			strcpy(funcItem[1]._itemName, "Disable");

			funcItem[0]._init2Check = false;
			funcItem[1]._init2Check = false;

			funcItem[0]._pShKey = new ShortcutKey;
			funcItem[0]._pShKey->_isAlt = false;
			funcItem[0]._pShKey->_isCtrl = true;
			funcItem[0]._pShKey->_isShift = false;
			funcItem[0]._pShKey->_key = 'B';

			funcItem[1]._pShKey = NULL;
		}
		break;

		case DLL_PROCESS_DETACH:
			break;

		case DLL_THREAD_ATTACH:
			break;

		case DLL_THREAD_DETACH:
			break;
	}

	return TRUE;
}

extern "C" __declspec(dllexport) void setInfo(NppData notpadPlusData)
{
	nppData = notpadPlusData;
}

extern "C" __declspec(dllexport) const char * getName()
{
	return PLUGIN_NAME;
}

extern "C" __declspec(dllexport) FuncItem * getFuncsArray(int *nbF)
{
	*nbF = nbFunc;
	return funcItem;
}

extern "C" __declspec(dllexport) void beNotified(SCNotification * /*notifyCode*/)
{
	//switch (notifyCode->nmhdr.code) { }
}

// Here you can process the Npp Messages 
// I will make the messages accessible little by little, according to the need of plugin development.
// Please let me know if you need to access to some messages :
// http://sourceforge.net/forum/forum.php?forum_id=482781
//
extern "C" __declspec(dllexport) LRESULT messageProc(UINT Message, WPARAM wParam, LPARAM lParam)
{
	switch (Message){
		case WM_CREATE:
		hInst = GetModuleHandle(NULL);

		//Create PopupMenu Dynamically
		HGLOBAL hgbl;
		LPDLGTEMPLATE lpdt;
		LPWORD lpw;
		hwndEdit = nppData._scintillaMainHandle;
		hgbl = GlobalAlloc(GMEM_ZEROINIT, 1024);

		lpdt = (LPDLGTEMPLATE)GlobalLock(hgbl);

		// Define a dialog box.

		lpdt->style = WS_POPUP | WS_BORDER ;
		lpdt->cdit = 0;         // Number of controls = 0
		lpdt->x  = 10;  lpdt->y  = 10;
		lpdt->cx = 100; lpdt->cy = 100;

		lpw = (LPWORD)(lpdt + 1);
		*lpw++ = 0;             // No menu
		*lpw++ = 0;             // Predefined dialog box class (by default)

		GlobalUnlock(hgbl);
		hwndPopupMenu = CreateDialogIndirect(hInst,
			(LPDLGTEMPLATE)hgbl,
			nppData._nppHandle,
			(DLGPROC)PopupMenuProc);
		GlobalFree(hgbl);
		
		//End PopupMenuDialog

		hfontCurrent = MyCreateFont(nppData._nppHandle, 10,L"Zawgyi-One");
		EditProc =(WNDPROC)GetWindowLongW(nppData._scintillaMainHandle, GWL_WNDPROC);
		SetWindowLong(nppData._scintillaMainHandle, GWL_WNDPROC, (long)SubEditProc);
		hMenu = GetMenu(nppData._nppHandle);
		CheckMenuItem(hMenu,funcItem[1]._cmdID,MF_BYCOMMAND|MF_CHECKED);//Check Disable Menu
		break;
		case WM_MOVE:
			//move menu along with the main window
			if(IsWindowVisible(hwndPopupMenu))
			{
				RECT rctWinMain;
				GetWindowRect(hwndEdit,&rctWinMain);

				int height=(burmese.menuLength>MROW?10:burmese.menuLength)*MHEIGHT+MHEIGHT+10;
				int width=((burmese.menuLength/MROW)+1)*MWIDTH;

				MoveWindow (hwndPopupMenu,
					rctWinMain.left + pointEditCursor.x + 10,
					rctWinMain.top + pointEditCursor.y + 20 ,
					width,
					height,
					TRUE) ;
			}
	        
			break;
		}
	return true;
}

void Enable (){
	if (!EnableFlag){
	EnableFlag = 1;
	burmese.isPhoneticInput = TRUE;
	SendMessage (nppData._nppHandle,WM_COMMAND,IDM_FORMAT_UTF_8, 0);//Send to Notepad to Encode as UTF-8
	CheckMenuItem(hMenu,funcItem[0]._cmdID,MF_BYCOMMAND|MF_CHECKED);//Check Enable Menu
	CheckMenuItem(hMenu,funcItem[1]._cmdID,MF_BYCOMMAND|MF_UNCHECKED);//Uncheck Disable Menu
	}
}

void Disable (){
	if (EnableFlag){
	EnableFlag = 0;
	burmese.isPhoneticInput = FALSE;
	CheckMenuItem(hMenu,funcItem[1]._cmdID,MF_BYCOMMAND|MF_CHECKED);//Check Disable Menu
	CheckMenuItem(hMenu,funcItem[0]._cmdID,MF_BYCOMMAND|MF_UNCHECKED);//Uncheck Enable Menu
	}
}

//===========-----------------------End Plugin Section--------------------------==============

//===========---------------------Start Burglish Section------------------------==============
//Window Procedure for Edit Control
BOOL CALLBACK SubEditProc (HWND hDlg, UINT message,
                           WPARAM wParam, LPARAM lParam)
{
    wchar_t *charBurmese; // character to display
    wchar_t *szTemp= new wchar_t[10]; // temp buffer
    WPARAM VKEY = 0;

    switch(message)
    {
    case WM_KEYDOWN:
      
        if(burmese.isPhoneticInput)
        {
            if(IsWindowVisible(hwndPopupMenu))
            {
                if(wParam == VK_DOWN)
                {   
                                   
                    if(burmese.selMenu.y < (MROW -1))
                    {
                        if(wcslen(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y+1].burmese) > 0)
                        {         
                                  burmese.selMenu.y++;
                                  InvalidateRgn(hwndPopupMenu,NULL,TRUE);
                        }
                    }
                }
                else if(wParam == VK_UP)
                {   
                                   
                    if(burmese.selMenu.y >0 )
                    {
                        burmese.selMenu.y--;
                        InvalidateRgn(hwndPopupMenu,NULL,TRUE);
                    }
                }
                else if(wParam == VK_LEFT)
                {   
                                   
                    if(burmese.selMenu.x > 0 )
                    {
                        burmese.selMenu.x--;
                        InvalidateRgn(hwndPopupMenu,NULL,TRUE);
                    }
                }
                else if(wParam == VK_RIGHT)
                {   
                                   
                    if(burmese.selMenu.x <MCOL)
                    {
                        if(wcslen(burmese.menuItem[burmese.selMenu.x+1][burmese.selMenu.y].burmese) > 0)
                        { 
                              burmese.selMenu.x++;
                              InvalidateRgn(hwndPopupMenu,NULL,TRUE);
                        }
                    }
                }
                return FALSE;
            }
        }
        if (GetKeyState(VK_MENU) & 0x8000) VKEY |= 1; // ALT key
        if (GetKeyState(VK_CONTROL) & 0x8000) VKEY |= 2; // CTRL key
        if (GetKeyState(VK_SHIFT) & 0x8000) VKEY |= 4; // SHIFT key
      
        if (VKEY==0 || VKEY==4)   
            break; //no special key, let the window handle

	case WM_KEYUP:
		
		if (wParam == 'B')
		{
			if (GetKeyState(VK_CONTROL) & 0x8000)
			{
				(EnableFlag == 0)?Enable():Disable();
			}
		}
		break;
    case WM_CHAR:
    case WM_SYSCHAR:
      
        if(burmese.isPhoneticInput)
        {
            WORD word=LOWORD(wParam);

            if(word == VK_RETURN){//if entry key is pressed
                if(IsWindowVisible(hwndPopupMenu)){
                                                   
                    CopyPaste();//send selected burmese char
                    ShowWindow(hwndPopupMenu,SW_HIDE);//hide menu
                   
                    //after sending msg, reset it
                    burmese.charBuff[0]=NULL; //clear buffer

                    return FALSE;
                }                
            }
            //Check for 0 - 9 short cut
            if(word >= 0x30 && word <= 0x39 && burmese.charBuff[0] != 0 && !(burmese.charBuff[0] >= 0x30 && burmese.charBuff[0] <= 0x39) ){                    
                    if( wcslen(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese) >0 )
                    {
                       burmese.selMenu.y = word - 0x30;
					   CopyPaste();//send selected burmese char
                       ShowWindow(hwndPopupMenu,SW_HIDE);//hide menu
                   
                    //after sending msg, reset it
                    burmese.charBuff[0]=NULL; //clear buffer
                       return FALSE;
                    }
            }
            
            if(word == VK_ESCAPE){//if escapse key pressed
               
                burmese.charBuff[0]=NULL;//clear buffer
                ShowWindow(hwndPopupMenu,SW_HIDE);//hide menu
               
                break;

            }else if((word >='A' && word <='Z') || (word >='a' && word <='z') ||  (word >='0' && word <='9') || word==VK_BACK){
                burmese.selMenu.x = burmese.selMenu.y= 0; //reset selection to 0 (top one), whenever new key is press
               
                if(word == VK_BACK ){ //if press backspace, remove one character in buffer
                    if(len(burmese.charBuff)>0) {
                      burmese.charBuff[len(burmese.charBuff)-1]=0; //if backspace remove last character in buffer
                    }
                }else if(len(burmese.charBuff)<BGLEN-1){
                    wsprintf(szTemp,L"%lC",LOWORD(wParam));
                    wcscat(burmese.charBuff,szTemp); //append to buffer                    
                }else{
					//TODO: add a error message here.
					return FALSE;
				}
               
				if(len(burmese.charBuff)>0){//if there is char in buffer
				
					Regex re(L"[^0-9]"); /* isNumeric */
					
					/* when user type only numeric */
					bool isDigit=!re.test(burmese.charBuff);
			
					/* when user type only numeric */
					if(isDigit){
						burmese.processNumericInput();
					
					/* when user type burglish text */
					}else if(!burmese.processPhoneticInput()){
						 burmese.charBuff[len(burmese.charBuff)-1]=0;
						 
						 //TODO: add a error message here.
						 return FALSE;
					}

                    //set cursor postion
                    GetCaretPos(&pointEditCursor);
                    //move menu to cursor
                    ShowWindow (hwndPopupMenu, SW_HIDE) ;
                    ShowWindow (hwndPopupMenu, SW_SHOWNA);
                    return FALSE;
                }else{
                      
                      //Ignore other character like back space while popup windows active
                      if(IsWindowVisible(hwndPopupMenu) == TRUE) 
                      {
                         ShowWindow (hwndPopupMenu, SW_HIDE);           
                         return FALSE;                            
                      }
                }
            }
            break;              
		}
    }
    return  CallWindowProc(EditProc, hDlg, message, wParam, lParam);
}

BOOL CALLBACK PopupMenuProc (HWND hDlg, UINT message,
                             WPARAM wParam, LPARAM lParam)
{
    HDC         hdc;
    PAINTSTRUCT ps;
    static wchar_t strMousePos[100];
    int menuRectTop;
    int menuRectLeft;
   
    switch (message)
    {
    case WM_INITDIALOG:
        SendMessage(hDlg,WM_SETFONT, (WPARAM) hfontCurrent, MAKELPARAM(TRUE, 0)); //Setting Popup Menu Font to ZawGyiOne
		hSEL = CreatePatternBrush((HBITMAP)LoadImage(hBglish,MAKEINTRESOURCE(IDB_SELECT),IMAGE_BITMAP,0,0,LR_DEFAULTSIZE));//Load Bitmap for Menu Selector and CreateBrush
		hBK = CreatePatternBrush((HBITMAP)LoadImage(hBglish,MAKEINTRESOURCE(IDB_BK),IMAGE_BITMAP,0,0,LR_DEFAULTSIZE));//Load Bitmap for Menu Background and CreateBrush
        return TRUE ;
    case WM_SIZE:
        return TRUE;

    case WM_SETFOCUS :
        SetFocus (hwndEdit) ;
        break;

    case WM_SHOWWINDOW:
        {
		if(wParam == TRUE)
		{
			RECT rctWinMain;
			GetWindowRect(hwndEdit,&rctWinMain);

			int height=(burmese.menuLength>MROW?10:burmese.menuLength)*MHEIGHT+MHEIGHT+10;
			int width=(((burmese.menuLength-1)/MROW)+1)*MWIDTH;

			MoveWindow (hDlg,
				rctWinMain.left + pointEditCursor.x + 10,
				rctWinMain.top + pointEditCursor.y + 20 ,
				width,
				height,
				TRUE) ;
			InvalidateRect(hDlg,NULL,TRUE);
		}
        
        return TRUE;
        }
    case WM_CTLCOLORDLG:
       		SetBkMode ((HDC)wParam, OPAQUE) ;
			//return (LRESULT)GetStockObject(WHITE_BRUSH);
			//return (LRESULT) CreateSolidBrush(RGB(115, 200, 255));
			return (LRESULT)hBK;
    case WM_PAINT:

        hdc = BeginPaint(hDlg, &ps);

        SelectObject(hdc, hfontCurrent);
		SelectObject (hdc, hSEL);
        //SelectObject (hdc,CreateSolidBrush(RGB(230, 238, 255)));
        menuRectTop = (burmese.selMenu.y *MHEIGHT)+MHEIGHT;
        menuRectLeft = burmese.selMenu.x *MWIDTH;
        Rectangle(hdc,menuRectLeft,menuRectTop,menuRectLeft+MWIDTH,menuRectTop+MHEIGHT);

        SelectObject (hdc, GetStockObject (BLACK_PEN));
        SetBkMode (hdc, TRANSPARENT) ;

        //display input string in firstline
        TextOut(hdc,0, 0,burmese.charBuff,(LPCSTR)wcslen (burmese.charBuff));

        //Menu Drawing here
        for(int iRow = 0; iRow < MROW; iRow++)
        {
            for(int iCol = 0; iCol < MCOL; iCol++)
            {
                    wchar_t szTemp[20];          
                    if( wcslen(burmese.menuItem[iCol][iRow].burmese) <= 0) break;
                    wsprintf(szTemp,L"%d. %s",iRow,(LPCSTR) burmese.menuItem[iCol][iRow].burmese);
                    TextOut(hdc,MWIDTH * iCol,MHEIGHT+(MHEIGHT*iRow),szTemp,wcslen (szTemp));               
            }
        }
		
		EndPaint(hDlg, &ps);
		return TRUE;

    case WM_MOUSEMOVE:                 
        pointMenuMouse.x = LOWORD (lParam);
        pointMenuMouse.y = HIWORD (lParam);

        //if mouse hasnt move from last time, no need to do anything
        if(pointMenuMouse.x==pointMousePos.x && pointMenuMouse.y==pointMousePos.y) return TRUE;

        RECT rectDlg;                    
        GetClientRect(hDlg,&rectDlg); //Get the popup menu's rectangle

        //Check if the mouse is in popup menu area?
        if( PtInRect(&rectDlg,pointMenuMouse))
        {
            SetCapture (hDlg);  // So that, it can receive the mouse event
        }
        else
        {
            ReleaseCapture(); //Let the window handle it
        }

		unsigned int rowMouse;
		rowMouse = int((pointMenuMouse.y-MHEIGHT)/MHEIGHT);
		unsigned int colMouse;
		colMouse = int(pointMenuMouse.x/MWIDTH);
		if (MCol != colMouse || MRow != rowMouse){ //If only different Column or Row
			MCol = colMouse; MRow = rowMouse;
			if(colMouse < MCOL && rowMouse < MROW)
			{
				if(wcslen(burmese.menuItem[colMouse][rowMouse].burmese) > 0 ) //add colmouse later
				{
					burmese.selMenu.x = colMouse;		  
					burmese.selMenu.y = rowMouse;
					InvalidateRect(hDlg,NULL,TRUE);
				}
			}
		}
       
        //store mouse position for later checking, mouse is move or not
        pointMousePos.x = pointMenuMouse.x;
        pointMousePos.y = pointMenuMouse.y;

        return TRUE; 
    case WM_LBUTTONDOWN:      
        //SendMessage (hwndEdit, EM_REPLACESEL, 0, (LPARAM)menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);//send burmese char to textbox
		CopyPaste();//Copy selected burmese char
        ShowWindow(hDlg,SW_HIDE);//doing refreshing
       
        //reset it
        burmese.charBuff[0]=0;
        burmese.selMenu.x =burmese.selMenu.y =0;

        return TRUE;
    }
    return FALSE ;
}

HFONT MyCreateFont(HWND hw, int nHeight,LPCSTR lpName){
    return (CreateFont(-MulDiv(nHeight, GetDeviceCaps(GetDC(hw), LOGPIXELSY), 72),
        0,0,0,
        FW_NORMAL,
        FALSE,FALSE,FALSE,
        NULL,
        OUT_DEFAULT_PRECIS,
        CLIP_DEFAULT_PRECIS,
        DEFAULT_QUALITY,
        DEFAULT_PITCH | FF_DONTCARE,
        lpName));
      
}

//Copy selected burmese char
BOOL CopyPaste (){
HGLOBAL hMem;
	OpenClipboard (nppData._nppHandle);
	if (hMem = GlobalAlloc (GMEM_MOVEABLE + GMEM_DDESHARE, 30))
	{	
		wcscpy ((wchar_t*)GlobalLock(hMem), burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);
		GlobalUnlock(hMem);
		EmptyClipboard();
		SetClipboardData(CF_UNICODETEXT,hMem);
		CloseClipboard();
		SendMessage (hwndEdit, SCI_PASTE, 0, 0);
		OpenClipboard (nppData._nppHandle);
		EmptyClipboard();
		CloseClipboard();
		return TRUE;
	}
	return FALSE;
}
//===========----------------------End Burglish Section------------------------==============