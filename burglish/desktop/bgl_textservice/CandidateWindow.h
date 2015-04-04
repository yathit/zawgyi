//////////////////////////////////////////////////////////////////////
//
//  THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//  ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED
//  TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//  PARTICULAR PURPOSE.
//
//  Copyright (C) 2003  Microsoft Corporation.  All rights reserved.
//
//  CandidateWindow.h
//
//          CCandidateWindow declaration.
//
//////////////////////////////////////////////////////////////////////

#ifndef CANDIDATEWINDOW_H
#define CANDIDATEWINDOW_H

//+---------------------------------------------------------------------------
//
// CCandidateWindow
//
//----------------------------------------------------------------------------

class CCandidateWindow 
{
public:
    CCandidateWindow();

    static BOOL _InitWindowClass();
    static void _UninitWindowClass();

    BOOL _Create();
    void _Destroy();

    void _Move(int x, int y);
    void _Show();
    void _Hide();
	void _Redraw();

    HRESULT _OnKeyDown(UINT uVKey);
    HRESULT _OnKeyUp(UINT uVKey);
	HRESULT _OnShortCut(UINT uVKey);

private:
    static LRESULT CALLBACK _WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);

    static void _SetThis(HWND hwnd, LPARAM lParam)
    {
        SetWindowLongPtr(hwnd, GWLP_USERDATA, 
                         (LONG_PTR)((CREATESTRUCT *)lParam)->lpCreateParams);
    }

    static CCandidateWindow *_GetThis(HWND hwnd)
    {
        return (CCandidateWindow *)GetWindowLongPtr(hwnd, GWLP_USERDATA);
    }

	static HFONT MyCreateFont(HWND hw, int nHeight,LPCWSTR lpName){
		return (CreateFontW(-MulDiv(nHeight, GetDeviceCaps(GetDC(hw), LOGPIXELSY), 72),
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

	static BOOL SendwChar (wchar_t * wcIn);

    static ATOM _atomWndClass;

	static HBRUSH CreateBrush(LPCSTR ResName){
		return CreatePatternBrush((HBITMAP)LoadImage(g_hInst,ResName,IMAGE_BITMAP,0,0,LR_DEFAULTSIZE));
	}
	
	BOOL isOut;
	HWND _hwndEdit;
    HWND _hwnd;

};

#endif // CANDIDATEWINDOW_H
