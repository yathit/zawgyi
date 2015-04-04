/*
* File Name: bgl_textpad.cpp
*
* Standalone client  (Remake of Web Burglish TestArea)
*
* code - ther.geek, soemin.mark, bashroan
*
* Start Date of creation: 20 Feb 2008
*/

#define UNICODE //only UNICODE is enough :D

#define _WIN32_WINDOWS 0x500

#include <windows.h>
#include <commctrl.h> // need visual 2005 + or platform sdk?

#include "resource.h"

#include "../bgl_core/lib.h"
#include "../bgl_core/fontmap.h"
#include "../bgl_core/burmese.h"
#include "../bgl_core/burglish.h"
#include "../bgl_core/regex.h"
#include "../bgl_core/fontconv.h"
#include "../bgl_core/converter.h"
#include "../bgl_core/dictEditor.h"

#define ID_EDIT 1
#define ID_STHELP 2
#define	FONT_MENU_ID 500
#define	CONVERT_MENU_ID 600
/*  Declare Procedures  */

//Main Window
LRESULT CALLBACK WindowProcedure (HWND, UINT, WPARAM, LPARAM);

BOOL CALLBACK PopupMenuProc (HWND, UINT, WPARAM, LPARAM) ;//Popup menu

BOOL CALLBACK SubEditProc(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam);//Edit Ctl

BOOL CALLBACK AboutDlgProc (HWND, UINT, WPARAM, LPARAM) ; // About Dialog

void OnCreateMainWindow(HWND, WPARAM, LPARAM);//Main Window Create handler

void StatusBar();//Status Bar Procedure

void InitMenuProc(HWND);//Init Menu Proc

void error(LPCSTR);//error message

bool OpenFileProc(HWND);

bool SaveFileProc(HWND);


/* Main Burmese Class */
Burmese burmese;


HFONT MyCreateFont(HWND, int, const wchar_t*);

HFONT hZawGyiFont;//Defalut Font for English Display

/* Declare Variables */
HFONT hfontCurrent = NULL; //ZawGyi Font Handler
HWND hwndMain; //Handler for Main Windows
HWND hwndEdit; //Handler for Edit Control
HWND hwndPopupMenu ; //Handler for PopupMenu
HWND hwndStHelpPane;//Handler for Font Help Pane.
HWND hStats;//Handler for Status Bar.

HMENU hMenu;//Handler for Main Menu
HBRUSH hSEL;//Handler for Burglish Menu Select bitmap
HBRUSH hBK;//Handler for Burglish Menu Background bitmap

//Background Color
COLORREF BkColor = (RGB(235, 247, 255));
//Status Bar's Part
DWORD sbParts[4]={0,0,0,-1,};
//Menu Datas
DWORD MenuID;
DWORD LastMenuID;
//Original Edit procedure
WNDPROC EditProc;

HINSTANCE hInst;

HACCEL hAccel;				/* Keyboard Accelerators */

POINT pointEditCursor; //Edit control cursor location
POINT pointMousePos; //to store previous mouse position
POINT pointMenuMouse;//current mouse position

int MCol;
int MRow;
/*  Make the class name into a global variable  */
wchar_t* szMainClassName = L"BurglishTxtPadApp";
wchar_t* szPopupMenuClassName = L"PopupMenuApp";
wchar_t* szEnglish = L"Normal";
wchar_t* szHelpText = L"\u1000 \u1001 - k (kh)\n\u1002 \u1003 - g (gg)\n\u1004 - ng\n\u1005 \u1006 - s (hs, ss)\n\u1007 \u1005\u103A - z (zz)\n\u100A - ny\n\u1010 \u100B  - t (tt)\n\u1011 \u100C - ht (htt)\n\u1012 \u1013 - d (dd)\n\u100D \u100E - hd (hdd)\n\u1014 \u100F - n (nn)\n\u1015  - p\n\u1016 - ph, f\n\u1018 \u1017 - b (bb)\n\u1019 - m\n\u101B \u101A - y (yy)\n\u101C \u1020 - l (ll)\n\u1040 - w\n\u101E - th\n\u101F - h\n\u1021 - a";

DicEditDialog dictedit;

int WINAPI WinMain (HINSTANCE hThisInstance,
					HINSTANCE hPrevInstance,
					LPSTR lpszArgument,
					int iCmdShow)

{	

	MSG messages;			/* Here messages to the application are saved */
	WNDCLASSEX wincl;		/* Data structure for the windowclass */

	hInst = hThisInstance; // Save application instance
	
	InitCommonControls(); /* Common Contrls Initializations */

	hAccel = LoadAccelerators(hInst, L"MYACCEL"); /* Load Accelerators */
	
	/* The Window structure */
	wincl.hInstance = hThisInstance;
	wincl.lpszClassName = szMainClassName;
	wincl.lpfnWndProc = WindowProcedure;	  /* This function is called by windows */
	wincl.style = CS_DBLCLKS;				 /* Catch double-clicks */
	wincl.cbSize = sizeof (WNDCLASSEX);

	/* Use default icon and mouse-pointer */
	wincl.hIcon = LoadIcon (hInst, MAKEINTRESOURCE(IDI_ICON));
	wincl.hIconSm = LoadIcon (hInst, MAKEINTRESOURCE(IDI_ICON));
	wincl.hCursor = LoadCursor (NULL, IDC_ARROW);
	wincl.lpszMenuName = MAKEINTRESOURCE(IDR_MENU);//NULL;				 /* No menu */
	wincl.cbClsExtra = 0;					  /* No extra bytes after the window class */
	wincl.cbWndExtra = 0;					  /* structure or the window instance */
	/* Use Buglish blue-ish color as the background of the window */

	wincl.hbrBackground = CreateSolidBrush(BkColor);

	/* Register the window class, and if it fails quit the program */
	if (!RegisterClassEx (&wincl))
		error("RegisterClassEx");

	/* The class is registered, let's create the program*/
	hwndMain = CreateWindowEx (
		0,					/* Extended possibilites for variation */
		szMainClassName,		 /* Classname */
		L"Burglish Demo Text Pad",		/* Title Text */
		WS_DLGFRAME|WS_SYSMENU|WS_OVERLAPPEDWINDOW,  /* default window */
		CW_USEDEFAULT,		/* Windows decides the position */
		CW_USEDEFAULT,		/* where the window ends up on the screen */
		580,				 /* The programs width */
		480,				 /* and height in pixels */
		HWND_DESKTOP,		/* The window is a child-window to desktop */
		NULL,				/* No menu */
		hThisInstance,		/* Program Instance handler */
		NULL				 /* No Window Creation data */
		);

	/* Make the window visible on the screen */
	ShowWindow (hwndMain, iCmdShow);
	
	/* Run the message loop. It will run until GetMessage() returns 0 */
	while (GetMessage (&messages, NULL, 0, 0))
	{
		if (hwndPopupMenu == 0 || !IsDialogMessage (hwndPopupMenu, &messages))
		{
			/* check accelerators first */
			if(!TranslateAccelerator(hwndMain, hAccel, &messages)){
				/* Translate virtual-key messages into character messages */
				TranslateMessage(&messages);
				/* Send messge to WindowProcedure */
				DispatchMessage(&messages);
			}
		}
	}

	

	/* The program return-value is 0 - The value that PostQuitMessage() gave */
	return (int)messages.wParam;
}


/*  This function is called by the Windows function DispatchMessage()  */
LRESULT CALLBACK WindowProcedure (HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam)
{
	HDC		 hdc;
	PAINTSTRUCT ps;
	DWORD Width;
	DWORD Heigh;
	switch (message) /* handle the messages */
	{
	case WM_CREATE:
		OnCreateMainWindow(hwnd, wParam, lParam);
		break;
	case WM_CTLCOLORSTATIC: // setting dialog ctls color
		if(hwndStHelpPane == (HWND)lParam)
		{
			SetBkMode ((HDC)wParam, TRANSPARENT) ;
			return (LRESULT)CreateSolidBrush(BkColor);
		}
		break;
	case WM_SIZE:
		Width = LOWORD (lParam);
		Heigh = HIWORD (lParam);
		//Resize Edit Ctl to Fit to Main Windows
		MoveWindow (hwndEdit, 0, 0, Width - 95, Heigh - 22, TRUE) ;
		//Setting Edit Ctl Font to ZawGyiOne		 
		SendMessage(hwndEdit,WM_SETFONT, (WPARAM) hfontCurrent, MAKELPARAM(TRUE, 0));
		//Help window
		MoveWindow (hwndStHelpPane, Width - 85, 8, 80, Heigh - 32, TRUE) ;
		//Status Bar
		SendMessage(hStats,WM_SIZE,SIZE_RESTORED,0);
		sbParts[1]=(DWORD)(Width / 5);
		sbParts[2]=(DWORD)(Width / 1.8);
		sbParts[3]=(DWORD)(Width / 1.3);
		SendMessage(hStats,SB_SETPARTS,5,(LPARAM)sbParts);
		break;
	case WM_MOVE:
		//move menu along with the main window
		if(IsWindowVisible(hwndPopupMenu))
		{
			ShowWindow (hwndPopupMenu, SW_HIDE) ;
			ShowWindow (hwndPopupMenu, SW_SHOW) ;
		}
		break;

	case WM_SETFOCUS :
		SetFocus (hwndEdit) ;
		break;

	case WM_COMMAND :
		switch(LOWORD(wParam)) // This switch identifies the control
		{
		case IDM_BURGLISH_INPUT://Burglish Input Menu
			burmese.isPhoneticInput = !burmese.isPhoneticInput;
			switch (burmese.isPhoneticInput)
			{
			case TRUE:
				CheckMenuItem(hMenu,IDM_BURGLISH_INPUT,MF_BYCOMMAND|MF_CHECKED);
				SendMessage(hStats,SB_SETTEXT,(WPARAM) 3,(LPARAM)L"Burglish");
				break;
			case FALSE:
				CheckMenuItem(hMenu,IDM_BURGLISH_INPUT,MF_BYCOMMAND|MF_UNCHECKED);
				SendMessage(hStats,SB_SETTEXT,(WPARAM) 3,(LPARAM)szEnglish);
				break;
			}
			//disable burmese
			if(burmese.isPhoneticInput) {
				burmese.isTypeWriterInput=FALSE;
				CheckMenuItem(hMenu,IDM_BURMESE_INPUT,MF_BYCOMMAND|MF_UNCHECKED);
			}
			break;

		case IDM_BURMESE_INPUT://Burmese Input Menu
			burmese.isTypeWriterInput = !burmese.isTypeWriterInput;
			switch (burmese.isTypeWriterInput)
			{
			case TRUE:
				CheckMenuItem(hMenu,IDM_BURMESE_INPUT,MF_BYCOMMAND|MF_CHECKED);
				SendMessage(hStats,SB_SETTEXT,(WPARAM) 3,(LPARAM)L"Burmese");
				break;
			case FALSE:
				CheckMenuItem(hMenu,IDM_BURMESE_INPUT,MF_BYCOMMAND|MF_UNCHECKED);
				SendMessage(hStats,SB_SETTEXT,(WPARAM) 3,(LPARAM)szEnglish);
				break;
			}
			//disable burglish
			if(burmese.isTypeWriterInput && burmese.isPhoneticInput) {
				burmese.isPhoneticInput=FALSE;
				CheckMenuItem(hMenu,IDM_BURGLISH_INPUT,MF_BYCOMMAND|MF_UNCHECKED);
			}
			break;

		case IDM_EXIT :
			PostQuitMessage(NULL);
			break;
		case IDM_COPY:
			SendMessage(hwndEdit,WM_COPY,0,0);
			break;
		case IDM_DELETE:
			SendMessage(hwndEdit,WM_CLEAR,0,0);
			break;
		case IDM_PASTE:
			SendMessage(hwndEdit,WM_PASTE,0,0);
			break;
		case IDM_SELECT_ALL:
			SendMessage(hwndEdit,EM_SETSEL,0,-1);
			break;
		case IDM_CUT:
			SendMessage(hwndEdit,WM_CUT,0,0);
			break;
		case IDM_UNDO:
			SendMessage(hwndEdit,EM_UNDO,0,0);
			break;
		case IDM_ABOUT:
			DialogBoxParam(hInst,MAKEINTRESOURCE(IDD_ABOUT),hwnd,AboutDlgProc,NULL);
			break;
		case IDM_OPEN:
			OpenFileProc(hwnd);
			break;
		case IDM_SAVE:
			SaveFileProc(hwnd);
			break;
		case IDM_DICTIONARY:
			dictedit.create(hInst,hwnd);
			break;
		default:
			MenuID = LOWORD(wParam);
			//Is font menu?
			if ( ((MenuID)>= FONT_MENU_ID) && (MenuID <= (FONT_MENU_ID+FLEN)) )
			{
				FONT_MENU:
				//current font index
				burmese.curFontIndex = (MenuID)-FONT_MENU_ID;
				//set current font
				hfontCurrent = MyCreateFont(hwnd, _f[burmese.curFontIndex].fontsize,_f[burmese.curFontIndex].fontname);
				//update the dg also
				SendMessage(hwndEdit,WM_SETFONT, (WPARAM) hfontCurrent, MAKELPARAM(TRUE, 0));
				SendMessage(hStats,SB_SETTEXT,(WPARAM) 4,(LPARAM)_f[burmese.curFontIndex].fontname);
				//Uncheck Last Menu Item
				CheckMenuItem(hMenu,LastMenuID,MF_BYCOMMAND|MF_UNCHECKED);
				//Check New Menu Item
				CheckMenuItem(hMenu,MenuID,MF_BYCOMMAND|MF_CHECKED);
				//Save Last Menu ID
				LastMenuID = MenuID;
				break;
			}

			//Is convert menu?
			if ( ((MenuID)>= CONVERT_MENU_ID) && (MenuID <= (CONVERT_MENU_ID+FLEN)) )
			{
				//Lets Start Converting
				Convert(hwndEdit,(LastMenuID-FONT_MENU_ID),(MenuID-CONVERT_MENU_ID));
				MenuID = MenuID-100;
				goto FONT_MENU;
			}

			break;
		}
		break;
	case WM_INITMENU:
		InitMenuProc(hwnd);
		break;
	case WM_DESTROY:
		PostQuitMessage (0);		/* send a WM_QUIT to the message queue */
		break;
	case WM_PAINT:
		hdc = BeginPaint(hwnd, &ps);
		EndPaint(hwnd, &ps);
		break;
	default:					  /* for messages that we don't deal with */
		return DefWindowProc (hwnd, message, wParam, lParam);
	}

	return 0;
}

void OnCreateMainWindow(HWND hwnd, WPARAM wParam, LPARAM lParam)
{
	//Create Status Bar
	hStats = CreateStatusWindow(WS_CHILD|WS_VISIBLE|
		WS_BORDER|WS_CLIPSIBLINGS,NULL,hwnd,200);
	SendMessage(hStats,SB_SETPARTS,5,(LPARAM)sbParts);
	//Set the font status as ZawGyi
	SendMessage(hStats,SB_SETTEXT,(WPARAM) 4,(LPARAM)_f[0].fontname);
	//Set the input method status as English
	SendMessage(hStats,SB_SETTEXT,(WPARAM) 3,(LPARAM)szEnglish);

	int PointSize = 10;
	// Getting Zaw Gyi Font
	hfontCurrent = MyCreateFont(hwnd, 10,L"Zawgyi-One");

	// Creating Edit Control
		
	hwndEdit = CreateWindowEx (WS_EX_CLIENTEDGE,TEXT ("Edit"), NULL,
		WS_CHILD | WS_VISIBLE | WS_HSCROLL | WS_VSCROLL |
		ES_LEFT | ES_MULTILINE |
		ES_AUTOHSCROLL | ES_AUTOVSCROLL,
		0, 0, 0, 0, hwnd, (HMENU)ID_EDIT,
		((LPCREATESTRUCT) lParam) -> hInstance, NULL) ;

	EditProc = (WNDPROC)GetWindowLong(hwndEdit, GWL_WNDPROC);
	SendMessage (hwndEdit,EM_LIMITTEXT,-1,0);
	SetWindowLong(hwndEdit, GWL_WNDPROC, (long)SubEditProc);

 
	//for (int i=0; i< FLEN; i++){
	//	SendMessage(hwndCboBurmese, CB_ADDSTRING, 0, (LPARAM)_f[i].id);
	//}
	//SendMessage(hwndCboBurmese, CB_SETCURSEL, 0, 0);

	//Font Menu Init
	hMenu = GetMenu(hwnd);
	for (int i=0; i< FLEN; i++){
		InsertMenu(hMenu,IDM__,MF_BYCOMMAND,FONT_MENU_ID+i,_f[i].fontname);
	}
	//Remove unneeded last item
	RemoveMenu(hMenu,IDM__,MF_BYCOMMAND);
	//Check the zawgyi first
	CheckMenuItem(hMenu,FONT_MENU_ID,MF_BYCOMMAND|MF_CHECKED);
	//Set the Zawgyi first
	LastMenuID = FONT_MENU_ID;

	//Convert Font Menu Init
	for (int i=0; i< FLEN; i++){
		InsertMenu(hMenu,IDM_,MF_BYCOMMAND,CONVERT_MENU_ID+i,_f[i].fontname);
	}
	//Remove unneeded last item
	RemoveMenu(hMenu,IDM_,MF_BYCOMMAND);

	//Creating static help panel
	hwndStHelpPane= CreateWindow ( L"static",  NULL,
		WS_CHILD | WS_VISIBLE ,
		100, 0, 0, 0, hwnd , (HMENU) ID_STHELP,
		((LPCREATESTRUCT) lParam)->hInstance, NULL) ;
	//Setting help panel Font to ZawGyiOne		 
	HFONT hfontHelp = MyCreateFont(hwnd, 8,L"Zawgyi-One");
	SendMessage(hwndStHelpPane,WM_SETFONT, (WPARAM) hfontHelp, MAKELPARAM(TRUE, 0));
	SetWindowText(hwndStHelpPane,szHelpText);
 
	//Create PopupMenu Dynamically
	HGLOBAL hgbl;
	LPDLGTEMPLATE lpdt;	
	LPWORD lpw;

	hgbl = GlobalAlloc(GMEM_ZEROINIT, 1024);

	lpdt = (LPDLGTEMPLATE)GlobalLock(hgbl);

	// Define a dialog box.

	lpdt->style = WS_POPUP | WS_BORDER ;
	lpdt->cdit = 0;		 // Number of controls = 0
	lpdt->x  = 10;  lpdt->y  = 10;
	lpdt->cx = 100; lpdt->cy = 100;

	lpw = (LPWORD)(lpdt + 1);
	*lpw++ = 0;			 // No menu
	*lpw++ = 0;			 // Predefined dialog box class (by default)

	GlobalUnlock(hgbl);
	hwndPopupMenu = CreateDialogIndirect(hInst,
		(LPDLGTEMPLATE)hgbl,
		hwnd,
		(DLGPROC)PopupMenuProc);
	GlobalFree(hgbl);
	//End PopupMenuDialog
	
	//Create Brush Handler For Menu Selector
	hSEL = CreatePatternBrush((HBITMAP)LoadImage
		(hInst,MAKEINTRESOURCE(IDB_SELECT),
			IMAGE_BITMAP,0,0,LR_DEFAULTSIZE));

	//Create Brush Handler For Menu Background
	hBK = CreatePatternBrush((HBITMAP)LoadImage
		(hInst,MAKEINTRESOURCE(IDB_BK),
			IMAGE_BITMAP,0,0,LR_DEFAULTSIZE));

	//Hook Win Event For Status Bar
	SetWinEventHook(0x800B,0x800B,NULL,
		(WINEVENTPROC)StatusBar,
			GetCurrentProcessId(),NULL,0);
}

BOOL CALLBACK PopupMenuProc (HWND hDlg, UINT message,
							 WPARAM wParam, LPARAM lParam)
{
	HDC		 hdc;
	HDC			hDlgDC;
	PAINTSTRUCT ps;
	static wchar_t strMousePos[100];
	int menuRectTop;
	int menuRectLeft;
	
	switch (message)
	{
	case WM_INITDIALOG:		
		//Setting Popup Menu Font to ZawGyiOne		 
		SendMessage(hDlg,WM_SETFONT, (WPARAM) hfontCurrent, MAKELPARAM(TRUE, 0));		
		hZawGyiFont = MyCreateFont(hDlg, _f[0].fontsize,_f[0].fontname);
		return TRUE ;
	case WM_SIZE:	

		return TRUE;
	case WM_SETFOCUS :

		SetFocus (hwndMain) ;
		break;
	case WM_SHOWWINDOW:
		{
		if(wParam == TRUE)
		{
			RECT rctWinMain;
			GetWindowRect(hwndMain,&rctWinMain);

			int height=(burmese.menuLength>MROW?10:burmese.menuLength)*MHEIGHT+MHEIGHT+10;
			int width=(((burmese.menuLength-1)/MROW)+1)*MWIDTH;

			MoveWindow (hDlg,
				rctWinMain.left + pointEditCursor.x + 10,
				rctWinMain.top + pointEditCursor.y + 70 ,
				width,
				height,
				TRUE) ;
	
		}
		else
		{
				//SetWindowText(hwndStHelpPane,szHelpText);
		}
		
		return TRUE;
		}
	case WM_CTLCOLORDLG:
				SetBkMode ((HDC)wParam, OPAQUE) ;
			//return (LRESULT)GetStockObject(WHITE_BRUSH);
			return (LRESULT)hBK;
		 
	case WM_PAINT:	  

		hdc = BeginPaint(hDlg, &ps);

		SelectObject(hdc, hfontCurrent);		
		SelectObject(hdc, hSEL);
		//SelectObject (hdc,CreateSolidBrush(RGB(230, 238, 255)));
		menuRectTop = (burmese.selMenu.y *MHEIGHT)+MHEIGHT;
		menuRectLeft = burmese.selMenu.x *MWIDTH;
		Rectangle(hdc,menuRectLeft,menuRectTop,menuRectLeft+MWIDTH,menuRectTop+MHEIGHT);

		SelectObject (hdc, GetStockObject (BLACK_PEN));
		SetBkMode (hdc, TRANSPARENT);

		//display input string in firstline with Zawgyi(English)
		hDlgDC = GetDC(hDlg);
		SelectObject(hDlgDC,hZawGyiFont);
		SetBkMode (hDlgDC, TRANSPARENT);
		TextOut(hDlgDC,2, 0,burmese.charBuff,(int)wcslen (burmese.charBuff));
		//Menu Drawing here
		for(int iRow = 0; iRow < MROW; iRow++)
		{
			for(int iCol = 0; iCol < MCOL; iCol++)
			{
					wchar_t szTemp[BMLEN*2];		  
					if( wcslen(burmese.menuItem[iCol][iRow].burmese) <= 0) break;
					wsprintf(szTemp,L"%d - ",iRow);
					
					/* if BD_NEED_DOUBLE_HYPHEN flag is on, put -- before the word */
					if(burmese.menuItem[iCol][iRow].flag & BD_NEED_DOUBLE_HYPHEN) 
						wcscat(szTemp,L"--");
						
					wcscat(szTemp, burmese.menuItem[iCol][iRow].burmese);
					TextOut(hdc,MWIDTH * iCol+4,MHEIGHT+(MHEIGHT*iRow),szTemp,(int)wcslen (szTemp));
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
		//wsprintf(strMousePos,L"\u1000 = %03d \u1001 = %03d\0",LOWORD (lParam),HIWORD (lParam));

		//SetWindowText(hwndEdit,strMousePos);
		
		//store mouse position for later checking, mouse is move or not
		pointMousePos.x = pointMenuMouse.x;
		pointMousePos.y = pointMenuMouse.y;

		return TRUE; 
	case WM_MBUTTONDOWN:
	case WM_LBUTTONDOWN:	  
		SendMessage (hwndEdit, EM_REPLACESEL, 0, (LPARAM)burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);//send burmese char to textbox
		ShowWindow(hDlg,SW_HIDE);//doing refreshing
		
		//reset it
		burmese.charBuff[0]=0;
		burmese.selMenu.x =burmese.selMenu.y =0;

		return TRUE;					 
	}
	return FALSE ;
}

//Window Procedure for Edit Control
BOOL CALLBACK SubEditProc (HWND hWnd, UINT message,
							WPARAM wParam, LPARAM lParam)
{
	wchar_t charBurmese[BMLEN]={0}; // character to display
	wchar_t szTemp[BMLEN]; // temp buffer
	WPARAM VKEY = 0;
	switch(message)
	{
	case WM_MOUSEWHEEL:
		if(burmese.isPhoneticInput)
		{
			if(IsWindowVisible(hwndPopupMenu))
			{
				if((short) HIWORD (wParam) <= 0)
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
				else {
					if(burmese.selMenu.y >0 )
					{
						burmese.selMenu.y--;
						InvalidateRgn(hwndPopupMenu,NULL,TRUE);
					}
				}

				return FALSE;
			}
		}
		break;
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
	case WM_CHAR:
	case WM_SYSCHAR:

		if(burmese.isPhoneticInput)
		{
			WORD word=LOWORD(wParam);

			if(word == VK_RETURN || word==VK_SPACE){//if enter or space key is pressed
				if(IsWindowVisible(hwndPopupMenu)){

					SendMessage (hwndEdit, EM_REPLACESEL, 0, (LPARAM) burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);//send selected burmese char
					ShowWindow(hwndPopupMenu,SW_HIDE);//hide menu
					
					//after sending msg, reset it
					burmese.charBuff[0]=NULL; //clear buffer
					SetWindowText(hwndStHelpPane,szHelpText);
					return FALSE;
				}
			}
            
			//Check for 0 - 9 short cut
			if(word >= 0x30 && word <= 0x39 && burmese.charBuff[0] != 0 && !(burmese.charBuff[0] >= 0x30 && burmese.charBuff[0] <= 0x39) ){
					if(wcslen(burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese) >0 )
					{
						burmese.selMenu.y = word - 0x30;
						SendMessage (hwndEdit, EM_REPLACESEL, 0, (LPARAM) burmese.menuItem[burmese.selMenu.x][burmese.selMenu.y].burmese);//send selected burmese char
						ShowWindow(hwndPopupMenu,SW_HIDE);//hide menu
					
						//after sending msg, reset it
						burmese.charBuff[0]=NULL; //clear buffer
						SetWindowText(hwndStHelpPane,szHelpText);
						return FALSE;
					}
			}
			
			if(word == VK_ESCAPE){//if escapse key pressed
				
				burmese.charBuff[0]=NULL;//clear buffer
				ShowWindow(hwndPopupMenu,SW_HIDE);//hide menu
				SetWindowText(hwndStHelpPane,szHelpText);
				break;
				
			}else if((word >='A' && word <='Z') || (word >='a' && word <='z') ||  (word >='0' && word <='9') || (word==',') || (word=='.') || (word==';') || word==VK_BACK){
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
					
					SetWindowText(hwndStHelpPane,burmese.processPhoneticHelp());
					//set cursor postion
					GetCaretPos(&pointEditCursor);
					//move menu to cursor
					ShowWindow (hwndPopupMenu, SW_HIDE);
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
		}else if(burmese.isTypeWriterInput){
			if (LOWORD(wParam) == VK_BACK) break;
			//Hide the menu
			ShowWindow (hwndPopupMenu, SW_HIDE);

			//for combination keys output like Sh,ift+Q -> hta htoe + yapin
			if (GetKeyState(VK_SHIFT) & 0x8000) VKEY |= 4; // SHIFT key
		  
			burmese.processTypeWriterInput(charBurmese,LOWORD(wParam),(unsigned int)VKEY); // prcess the input // VKEY is no need
		  
			if(charBurmese != NULL){
				wsprintf(szTemp,L"%s",charBurmese);						  
				SendMessage (hwndEdit, EM_REPLACESEL, 0, (LPARAM) szTemp);
			  
				return FALSE;
			}
			
		}else{
			ShowWindow (hwndPopupMenu, SW_HIDE);
			break;
		}
	}
	return  (int)CallWindowProc(EditProc, hWnd, message, wParam, lParam);
}


HFONT MyCreateFont(HWND hw, int nHeight,const wchar_t* lpName){
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

BOOL CALLBACK AboutDlgProc (HWND hWnd, UINT message,
							WPARAM wParam, LPARAM lParam)
{
	char* buildTime[50];
	LOGFONT lf;
	switch (message)
	{
	case WM_INITDIALOG:
		lstrcpyA((LPSTR)buildTime,__DATE__);
		lstrcatA((LPSTR)buildTime," - ");
		lstrcatA((LPSTR)buildTime,__TIME__);
		SendDlgItemMessageA(hWnd,IDC_COMPLIE, WM_SETTEXT, 0, (LPARAM)buildTime);

		SendDlgItemMessageA(hWnd,IDC_INFO,WM_SETTEXT,0,(LPARAM)"This software will be released under a free software license, the GPL v 2. Feel free to copy and redistribute this software.\n\nPlease maintain this copyright note for your inclusion of this software and/or any part of this software.\n\n\nCopyright(C)2008 Burglish Project\n\n http://code.google.com/p/burglish/");

		GetObject((HANDLE)SendDlgItemMessage(hWnd,IDC_HEAD,WM_GETFONT,0,0),sizeof(LOGFONT),&lf);
		lf.lfWeight = FW_BOLD;
		SendDlgItemMessage(hWnd,IDC_HEAD,WM_SETFONT,(LPARAM)CreateFontIndirect(&lf),TRUE);
	case WM_COMMAND:
		switch (LOWORD(wParam))
		{
		case IDC_OK:
			EndDialog(hWnd,NULL);
			break;
		}
		break;
	case WM_CLOSE:
		EndDialog(hWnd,NULL);
	}
	return FALSE;
}

int LastLength=1;
LRESULT LastLine;
__w64 unsigned long LastCol;
int LastSel;

void StatusBar (){
	wchar_t Buffer[120];

	int Start;
	int End;
	//Get current position
	SendMessage(hwndEdit,EM_GETSEL,(WPARAM) &Start,(LPARAM) &End);
	int Sel = End-Start;

	//Get current Line
	LRESULT Line = SendMessage(hwndEdit,EM_LINEFROMCHAR,Start,NULL);
	__w64 unsigned long Col = (Start-SendMessage(hwndEdit,EM_LINEINDEX,Line,0))+1;

	if ((LastLine != Line) | (LastCol != Col) | (LastSel != Sel))
	{
	//Line Number,Column,Selection
	wsprintf(Buffer,L"Ln : %d Col : %d Sel : %d",Line+1,Col,Sel);
	SendMessage(hStats,SB_SETTEXT,(WPARAM) 2,(LPARAM)Buffer);
	}
	//Save for checking later
	LastLine = Line;
	LastCol = Col;
	LastSel = Sel;

	//Total Words
	int Length = GetWindowTextLength(hwndEdit);
	if (Length != LastLength)//If the same,skip it
	{
	wsprintf(Buffer,L"nb char : %d",Length);
	SendMessage(hStats,SB_SETTEXT,(WPARAM) 1,(LPARAM)Buffer);
	}
	//Save for checking later
	LastLength = Length;
	return;
}

void InitMenuProc(HWND hWnd)
{
	LRESULT SelPos;
	//Get Sel Pos
	SelPos = SendMessage(hwndEdit,EM_GETSEL,NULL,NULL);
	//Set Default State as Grayed
	BOOL Enable = MF_GRAYED;
	//Only when different Set Enable
	if ( (HIWORD(SelPos)) != (LOWORD(SelPos)) ) Enable = MF_ENABLED;
	//CUT MENU
	EnableMenuItem(hMenu,IDM_CUT,Enable);
	//COPY MENU
	EnableMenuItem(hMenu,IDM_COPY,Enable);
	//DELETE MENU
	EnableMenuItem(hMenu,IDM_DELETE,Enable);
	//PASTE MENU
	Enable = MF_GRAYED;
	if (OpenClipboard(hWnd))
	{
		if(IsClipboardFormatAvailable(CF_TEXT)) Enable = MF_ENABLED;//Check is CR_TEXT Available?
		CloseClipboard();
	}
	EnableMenuItem(hMenu,IDM_PASTE,Enable);
	//UNDO MENU
	Enable = MF_GRAYED;
	if (SendMessage(hwndEdit,EM_CANUNDO,0,0)) Enable = MF_ENABLED;
	EnableMenuItem(hMenu,IDM_UNDO,Enable);
	return;
}

void error(LPCSTR lpszFunction) 
{
	int *Buffer;
	//Get Last Error Code and Translate to text
	FormatMessageA(FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_IGNORE_INSERTS | 
		FORMAT_MESSAGE_FROM_SYSTEM, NULL, 
			GetLastError(),LANG_NEUTRAL, (LPSTR)&Buffer, 0, NULL);
	
	//Show the error message box
	MessageBoxA(NULL, (LPCSTR)Buffer, lpszFunction, MB_OK | MB_ICONHAND | MB_APPLMODAL);
	//EndProcess
	ExitProcess(0);
}

/*  File Filter */
char* Filter = "Text Files\0*.txt\0\0";

bool OpenFileProc(HWND hwnd)
{
	OPENFILENAMEA ofn = {0};
	char filebuffer[256] = {0};

	ofn.lStructSize = sizeof(ofn);
	ofn.hwndOwner = hwnd;
	ofn.hInstance = hInst;
	ofn.lpstrFilter = (LPSTR)Filter;
	ofn.lpstrFile = (LPSTR)&filebuffer;
	ofn.nMaxFile = sizeof filebuffer;
	ofn.lpstrTitle = "Open File";
	ofn.Flags = OFN_EXPLORER | OFN_FILEMUSTEXIST | 
		OFN_LONGNAMES | OFN_HIDEREADONLY;

	if(!GetOpenFileNameA(&ofn)) return false;

	HANDLE hFile = CreateFileA((LPCSTR)filebuffer,GENERIC_READ,0,0,
		OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL,0);
	/*Get the file size in byte*/
	DWORD Size = GetFileSize(hFile,NULL);
	/*Allocate memory for input*/
	LPVOID Buffer = VirtualAlloc(NULL,Size,MEM_COMMIT,PAGE_READWRITE);

	DWORD nBytesRead;
	ReadFile(hFile,Buffer,Size,&nBytesRead,NULL);
	CloseHandle(hFile);
	/*Is Unicode*/
	if ((unsigned short)*(LPDWORD)Buffer == 0xFEFF)
		/*If it is unicode, use SetWindowTextW*/
		SetWindowTextW(hwndEdit,(LPCWSTR)Buffer);
	else
		SetWindowTextA(hwndEdit,(LPCSTR)Buffer);
	/*Free used memory*/
	VirtualFree(Buffer, Size, MEM_DECOMMIT);

	return true;
}

bool SaveFileProc(HWND hwnd)
{
	OPENFILENAMEA ofn = {0};
	char filebuffer[256] = {0};

	ofn.lStructSize = sizeof(ofn);
	ofn.hwndOwner = hwnd;
	ofn.hInstance = hInst;
	ofn.lpstrFilter = (LPSTR)Filter;
	ofn.lpstrFile = (LPSTR)&filebuffer;
	ofn.nMaxFile = sizeof filebuffer;
	ofn.lpstrTitle = "Save File";
	ofn.Flags = OFN_EXPLORER | OFN_FILEMUSTEXIST | 
		OFN_LONGNAMES | OFN_OVERWRITEPROMPT;

	if(!GetSaveFileNameA(&ofn)) return false;

	HANDLE hFile = CreateFileA((LPCSTR)filebuffer,GENERIC_WRITE,0,0,
		CREATE_ALWAYS,FILE_ATTRIBUTE_NORMAL,0);
	
	/*Double coz of wide char*/
	DWORD Size = (GetWindowTextLength(hwndEdit))*2;
	/*Allocate Memory for output*/
	LPVOID Buffer = VirtualAlloc(NULL,Size*2,MEM_COMMIT,PAGE_READWRITE);
	/*Write Unicode Signature First*/
	*(LPDWORD)Buffer = 0xFEFF;
	/*Get text from textpad to memory*/
	GetWindowText(hwndEdit,1+(LPWSTR)Buffer,Size);
	DWORD nBytesWrite;
	/*Write the output file*/
	WriteFile(hFile,Buffer,Size,&nBytesWrite,NULL);
	CloseHandle(hFile);
	/*Free used memory*/
	VirtualFree(Buffer, Size*2, MEM_DECOMMIT);
	
	return true;
}
