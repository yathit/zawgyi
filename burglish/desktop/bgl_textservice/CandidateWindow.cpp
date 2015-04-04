//////////////////////////////////////////////////////////////////////
//
//  THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//  ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED
//  TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//  PARTICULAR PURPOSE.
//
//  Copyright (C) 2003  Microsoft Corporation.  All rights reserved.
//
//  CandidateWindow.cpp
//
//          CCandidateWindow class
//
//////////////////////////////////////////////////////////////////////

#include "Globals.h"
#include "TextService.h"
#include "CandidateWindow.h"
#include "Resource.h"

ATOM CCandidateWindow::_atomWndClass = 0;

/* Main Burmese Class */
Burmese burmese;

//+--------------------------------------------------------------------------

POINT pointMousePos; //to store previous mouse position
POINT pointMenuMouse;//current mouse position
HFONT hZawGyiFont;
HBRUSH hSEL;
unsigned int MCol;
unsigned int MRow;

//+---------------------------------------------------------------------------
//
// ctor
//
//----------------------------------------------------------------------------

CCandidateWindow::CCandidateWindow()
{
    _hwnd = NULL;
}

//+---------------------------------------------------------------------------
//
// _InitWindowClass
//
//----------------------------------------------------------------------------

/* static */
BOOL CCandidateWindow::_InitWindowClass()
{
    WNDCLASS wc;

	hSEL = CreateBrush("IDB_SELECT");

    wc.style = CS_DBLCLKS;
    wc.lpfnWndProc = CCandidateWindow::_WindowProc;
    wc.cbClsExtra = 0;
    wc.cbWndExtra = 0;
    wc.hInstance = g_hInst;
    wc.hIcon = NULL;
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    //wc.hbrBackground = (HBRUSH)GetStockObject(LTGRAY_BRUSH);
	wc.hbrBackground = CreateBrush("IDB_BK");
    wc.lpszMenuName = NULL;
    wc.lpszClassName = TEXT("BurglishWindow");

    _atomWndClass = RegisterClass(&wc);

    return (_atomWndClass != 0);
}


//+---------------------------------------------------------------------------
//
// _UninitClass
//
//----------------------------------------------------------------------------

/* static */
void CCandidateWindow::_UninitWindowClass()
{
    if (_atomWndClass != 0)
    {
        UnregisterClass((LPCTSTR)_atomWndClass, g_hInst);
    }
}


//+---------------------------------------------------------------------------
//
// _Create
//
//----------------------------------------------------------------------------

BOOL CCandidateWindow::_Create()
{
    _hwnd = CreateWindowEx(WS_EX_TOPMOST | WS_EX_TOOLWINDOW,
                           (LPCTSTR)_atomWndClass,
                           TEXT("Burglish"),
                           WS_BORDER |  WS_POPUP,
                           0, 0,
                           MWIDTH, MHEIGHT,
                           NULL,
                           NULL,
                           g_hInst,
                           this);
	hZawGyiFont = MyCreateFont(_hwnd, _f[0].fontsize,_f[0].css);
	CCandidateWindow::_hwndEdit = _hwndEdit;
    return (_hwnd != NULL);
}

//+---------------------------------------------------------------------------
//
// _Destroy
//
//----------------------------------------------------------------------------

void CCandidateWindow::_Destroy()
{
    if (_hwnd != NULL)
    {
        DestroyWindow(_hwnd);
        _hwnd = NULL;
    }
}

//+---------------------------------------------------------------------------
//
// _Move
//
//----------------------------------------------------------------------------

void CCandidateWindow::_Move(int x, int y)
{
	isOut = false;
	if ( (x >= GetSystemMetrics(SM_CXSCREEN)) || (y >= GetSystemMetrics(SM_CYSCREEN)) )
		{
			isOut = true;
		}

    if (_hwnd != NULL)
    {
        RECT rc;
        GetWindowRect(_hwnd, &rc);
        MoveWindow(_hwnd, x, y, rc.right - rc.left, rc.bottom - rc.top, TRUE);
    }
}

//+---------------------------------------------------------------------------
//
// _Show
//
//----------------------------------------------------------------------------

void CCandidateWindow::_Show()
{
    ShowWindow(_hwnd, SW_SHOWNA);
}

//+---------------------------------------------------------------------------
//
// _Hide
//
//----------------------------------------------------------------------------

void CCandidateWindow::_Hide()
{
    ShowWindow(_hwnd, SW_HIDE);
}

//+---------------------------------------------------------------------------
//
// _Redraw
//
//----------------------------------------------------------------------------

void CCandidateWindow::_Redraw()
{
    InvalidateRect(_hwnd, NULL, TRUE);
}

//+---------------------------------------------------------------------------
//
// _OnKeyDown
//
//----------------------------------------------------------------------------

HRESULT CCandidateWindow::_OnKeyDown(UINT uVKey)
{
	if(burmese.isPhoneticInput)
	{
		switch (uVKey)
		{
		case VK_DOWN:
			if(burmese.selMenu.y < (MROW -1)){
				if(wcslen(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y+1].burmese) > 0){
					burmese.selMenu.y++;
					_Redraw();
				}
			}
			break;

		case VK_UP:
			if(burmese.selMenu.y >0 ){
				burmese.selMenu.y--;
				_Redraw();
			}
			break;

		case VK_LEFT:
			if(burmese.selMenu.x > 0 ){
				burmese.selMenu.x--;
				_Redraw();
			}
			break;

		case VK_RIGHT:
			if(burmese.selMenu.x <MCOL){
				if(wcslen(burmese.menuItem[burmese.selMenu.x+1][burmese.selMenu.y].burmese) > 0){ 
					burmese.selMenu.x++;
					_Redraw();
				}
			}
			break;
		}
	}
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// _OnKeyUp
//
//----------------------------------------------------------------------------

HRESULT CCandidateWindow::_OnKeyUp(UINT uVKey)
{
	UINT UVKEY = uVKey;
	UINT VKEY = 0;
	wchar_t szTemp[10]; // temp buffer

	//short's highest bit is 1 if key is down, lowest bit is 1 if toggled.
	if (uVKey >= 'A' && uVKey <= 'Z'){
		bool shiftDown = GetKeyState(VK_SHIFT) & 0x8000;
		bool capsToggled = GetKeyState(VK_CAPITAL) & 0x1;
		//NOT(shiftDown XOR capsToggled) AND character is A to Z, 
		if (!((!shiftDown && capsToggled) || (shiftDown && !capsToggled)))
		{
			UVKEY += 32;
		}
	}

	if(uVKey == VK_RETURN){//if entry key is pressed
		if(IsWindowVisible(CCandidateWindow::_hwnd)){
			SendwChar(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);
		
			//after sending msg, reset it
			burmese.charBuff[0]=NULL; //clear buffer
			return S_OK;
		}
	}

	else if(uVKey == VK_ESCAPE){//if escapse key pressed
		burmese.charBuff[0]=NULL;//clear buffer
		_Hide();
	}

	if((UVKEY >='A' && UVKEY <='Z') || (UVKEY >='a' && UVKEY <='z') ||  (UVKEY >='0' && UVKEY <='9') || uVKey==VK_BACK){
		burmese.selMenu.x = burmese.selMenu.y= 0; //reset selection to 0 (top one)

		if(uVKey == VK_BACK ){ //if press backspace, remove one character in buffer
			UVKEY = NULL;
			if(len(burmese.charBuff)>0){
				burmese.charBuff[len(burmese.charBuff)-1]=0; //if backspace remove last character in buffer
				_Redraw();
			}
			else{
				SendwChar(L"");
				return S_OK;
			}
		}

		if(len(burmese.charBuff)<BWLEN-1){
			wsprintfW(szTemp,L"%lC",UVKEY);
			wcscat(burmese.charBuff,szTemp); //append to buffer
		}

		if(len(burmese.charBuff)>0){//if there is char in buffer

			Regex re(L"[^0-9]"); /* isNumeric */
			
			/* when user type only numeric */
			bool isDigit=!re.test(burmese.charBuff);

			/* when user type only numeric */
			if(isDigit){
				burmese.processNumericInput();
			}

			else if(!burmese.processPhoneticInput()){
				 burmese.charBuff[len(burmese.charBuff)-1]=0;
				 //TODO: add a error message here.
				 burmese.processPhoneticInput();
			}
		}
		else{
			SendwChar(L"");
			return S_OK;
		}

		int height=(burmese.menuLength>MROW?10:burmese.menuLength)*MHEIGHT+MHEIGHT+10;
		int width=(((burmese.menuLength-1)/MROW)+1)*MWIDTH;

		UINT uFlag = SWP_NOMOVE | SWP_NOACTIVATE | SWP_NOZORDER;

		if (isOut)
			uFlag = SWP_NOACTIVATE | SWP_NOZORDER;

		SetWindowPos(_hwnd, 0, GetSystemMetrics(SM_CXSCREEN)/2 - (width/2),GetSystemMetrics(SM_CYSCREEN)/2, width, height, uFlag);
		_Redraw();
	}
	return S_FALSE;
}

//+---------------------------------------------------------------------------
//
// _OnShortCut
//
//----------------------------------------------------------------------------

HRESULT CCandidateWindow::_OnShortCut(UINT uVKey)
{
	if( wcslen(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese) >0 )
	{
		burmese.selMenu.y = uVKey - 0x30;
		SendwChar(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);
		//after sending msg, reset it
		burmese.charBuff[0]=NULL; //clear buffer
	}
	return S_OK;
}

//+---------------------------------------------------------------------------
//
// _WindowProc
//
// Cand window proc.
//----------------------------------------------------------------------------

/* static */

LRESULT CALLBACK CCandidateWindow::_WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    HDC hdc;
	HDC hDlgDC;
    PAINTSTRUCT ps;
    static wchar_t strMousePos[100];
    int menuRectTop;
    int menuRectLeft;

    switch (uMsg)
	{
        case WM_CREATE:
            _SetThis(hwnd, lParam);
            return 0;
		case WM_MOUSEMOVE:	

			pointMenuMouse.x = LOWORD (lParam);
			pointMenuMouse.y = HIWORD (lParam);

			//if mouse hasnt move from last time, no need to do anything
			if(pointMenuMouse.x==pointMousePos.x && pointMenuMouse.y==pointMousePos.y) return TRUE;

			RECT rectDlg;					
			GetClientRect(hwnd,&rectDlg); //Get the popup menu's rectangle

			//Check if the mouse is in popup menu area?
			if( PtInRect(&rectDlg,pointMenuMouse))
			{
				SetCapture (hwnd);  // So that, it can receive the mouse event
			}
			else
			{
				ReleaseCapture(); //Let the window handle it
			}

			unsigned int rowMouse;
			rowMouse = int((pointMenuMouse.y-MHEIGHT)/MHEIGHT);
			unsigned int colMouse;
			colMouse = int(pointMenuMouse.x/MWIDTH);
			if (MCol != colMouse || MRow != rowMouse){ //If only different Column or Row //Prevent to flashing
				MCol = colMouse;MRow = rowMouse;
				if(colMouse < MCOL && rowMouse < MROW)
				{
					if(wcslen(burmese.menuItem[colMouse][rowMouse].burmese) > 0 ) //add colmouse later
					{
						burmese.selMenu.x = colMouse;
						burmese.selMenu.y = rowMouse;
						InvalidateRect(hwnd,NULL,TRUE);
					}
				}
			}
			
			//store mouse position for later checking, mouse is move or not
			pointMousePos.x = pointMenuMouse.x;
			pointMousePos.y = pointMenuMouse.y;

			break;

		case WM_MBUTTONDOWN:
		case WM_LBUTTONDOWN:
			/*Translating WM_LBUTTONDOWN to VK_RETURN is best method*/
			INPUT ip;
			KEYBDINPUT kp;

			ip.type = INPUT_KEYBOARD;
			kp.dwFlags = KEYEVENTF_KEYUP;

			kp.time = 0;
			kp.dwExtraInfo = 0;
			kp.wVk = VK_RETURN;
			
			kp.wScan = 0;
			ip.ki = kp;
			SendInput(1,&ip,sizeof(INPUT));

			//reset it
			burmese.charBuff[0] = NULL;
			break;
        case WM_PAINT:

			hdc = BeginPaint(hwnd, &ps);

			SelectObject(hdc, hZawGyiFont);		
			SelectObject(hdc, hSEL);

			menuRectTop = (burmese.selMenu.y *MHEIGHT)+MHEIGHT;
			menuRectLeft = burmese.selMenu.x *MWIDTH;
			
			Rectangle(hdc,menuRectLeft,menuRectTop,menuRectLeft+MWIDTH,menuRectTop+MHEIGHT);

			SelectObject (hdc, GetStockObject (BLACK_PEN));
			SetBkMode (hdc, TRANSPARENT) ;

			//display input string in firstline with Zawgyi(English)
			hDlgDC = GetDC(hwnd);
			SelectObject(hDlgDC,hZawGyiFont);
			SetBkMode (hDlgDC, TRANSPARENT);
			TextOutW(hDlgDC,2, 0,burmese.charBuff,wcslen (burmese.charBuff));
			
			//Menu Drawing here
			for(int iRow = 0; iRow < MROW; iRow++)
			{
				for(int iCol = 0; iCol < MCOL; iCol++)
				{
						wchar_t szTemp[20];		  
						if( wcslen(burmese.menuItem[iCol][iRow].burmese) <= 0) break;
						wsprintfW(szTemp,L"%d- %s",iRow,burmese.menuItem[iCol][iRow].display);
						TextOutW(hdc,MWIDTH * iCol+4,MHEIGHT+(MHEIGHT*iRow),szTemp,wcslen (szTemp));
				}
			}
			EndPaint(hwnd, &ps);
			break;
	}
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

BOOL CCandidateWindow::SendwChar (wchar_t *wcIn){
	wchar_t keystroke[20];
	INPUT ip;
	KEYBDINPUT kp;

	ip.type = INPUT_KEYBOARD;
	kp.dwFlags = KEYEVENTF_EXTENDEDKEY;
	kp.time = 1;
	kp.dwExtraInfo = 0;
	kp.wVk = VK_BACK;
	kp.wScan = 0;
	ip.ki = kp;
	SendInput(1,&ip,sizeof(INPUT));

	kp.dwFlags = KEYEVENTF_UNICODE;
	kp.wVk = 0;
	
	wcscpy((wchar_t*)keystroke, wcIn);
	int i = 0;
	while (keystroke[i] != 0){
		kp.wScan = keystroke[i];
		ip.ki = kp;
		SendInput(1,&ip,sizeof(INPUT));
		i++;
	}

	return true;
}