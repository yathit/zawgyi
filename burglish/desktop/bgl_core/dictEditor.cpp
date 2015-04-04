#include <stdio.h>

#include "dictEditor.h"
#include "burmese.h"
#include "dictionary.h"

bool modified = false;
HWND hList;
HWND hEdit;
WNDPROC OldProc;
int LVLastItem = -1;
int LVLastSubItem = -1;
HMENU hDictMenu;

void DicEditDialog::create(HINSTANCE hInst, HWND parent)
{
	_hInst = hInst;
	_hParent = parent;

	DialogBox(hInst, MAKEINTRESOURCE(IDD_DIC), _hParent, (DLGPROC)DlgProc);
}

void DicEditDialog::OnDlgInit(HWND hWnd){
	LVCOLUMNW lvc;
	LVITEMW lvi;
	HFONT hfont;

	hList = CreateWindowEx(WS_EX_CLIENTEDGE,"SysListView32", NULL, 
		LVS_SINGLESEL | LVS_REPORT | 
		WS_CHILD | WS_VISIBLE | WS_VSCROLL | WS_HSCROLL, 
		0, 0, 0, 0, hWnd, 
		(HMENU) IDC_DICLIST, GetModuleHandle(NULL), NULL);
	
	hfont = CreateFontW(-MulDiv(_f[Zawgyi_One].fontsize, GetDeviceCaps(GetDC(hWnd), LOGPIXELSY), 72),
		0,0,0,
		FW_NORMAL,
		FALSE,FALSE,FALSE,
		NULL,
		OUT_DEFAULT_PRECIS,
		CLIP_DEFAULT_PRECIS,
		DEFAULT_QUALITY,
		DEFAULT_PITCH | FF_DONTCARE,
		_f[Zawgyi_One].fontname);
	SendMessage(hList,WM_SETFONT,(LPARAM)hfont,TRUE);

	ListView_SetExtendedListViewStyle(hList, LVS_EX_BORDERSELECT | LVS_EX_GRIDLINES |LVS_EX_FULLROWSELECT);

	lvc.mask = LVCF_FMT | LVCF_TEXT | LVCF_WIDTH;
	lvc.fmt = LVCFMT_LEFT;
	lvc.cx = 150;

	/*lvc.pszText = L"Burmese";
	SendMessage(hList, LVM_INSERTCOLUMNW, 0, (LPARAM) &lvc);*/

	lvc.pszText = L"Burmese";
	SendMessage(hList, LVM_INSERTCOLUMNW, 0, (LPARAM) &lvc);

	lvc.pszText = L"Burglish";
	SendMessage(hList, LVM_INSERTCOLUMNW, 0, (LPARAM) &lvc);

	Dictionary dict;

	lvi.mask = LVIF_TEXT;

	for (int i=0; i<dict.length;i++){
		lvi.iItem = i;
		lvi.iSubItem = 0;
		lvi.pszText = dict.data[i].burglish;
		SendMessage(hList, LVM_INSERTITEMW, 0, (LPARAM) &lvi);

		lvi.iSubItem++;
		lvi.pszText = dict.data[i].burmese;
		SendMessage(hList, LVM_SETITEMW, 0, (LPARAM) &lvi);

		//lvi.iSubItem++;
		//lvi.pszText = dict.data[i].display;
		//SendMessage(hList, LVM_SETITEMW, 0, (LPARAM) &lvi);
	}

	if (dict.length < 1){
		lvi.iItem = 0;
		lvi.iSubItem = 0;
		lvi.pszText = L"Type Here";
		SendMessage(hList, LVM_INSERTITEMW, 0, (LPARAM) &lvi);
	}
	//dict.~Dictionary(); //crash on mine :P mark

	hEdit = CreateWindowEx(WS_EX_CLIENTEDGE,"Edit", NULL, 
		WS_CHILD | WS_VISIBLE |	ES_LEFT | 
		ES_MULTILINE | ES_AUTOHSCROLL | ES_AUTOVSCROLL,
		0, 0, 0, 0, hList, (HMENU) IDC_DICEDIT, GetModuleHandle(NULL), NULL);

	HFONT hFont = (HFONT)SendMessage(hList, WM_GETFONT, 0, 0);
	SendMessage(hEdit, WM_SETFONT,(WPARAM) hFont, MAKELPARAM(1,0));
	SendMessage(hEdit, EM_SETLIMITTEXT, (WPARAM)20, NULL);
	OldProc = (WNDPROC)SetWindowLongW(hEdit, GWL_WNDPROC, (LONG) &SubEdit);

	hDictMenu = CreatePopupMenu();
	if (!hDictMenu)
		MessageBox(hWnd,"Creating Menu Fail", "Error!", MB_ICONERROR | MB_OK);
	AppendMenu(hDictMenu,MF_STRING, IDM_LINSERT, "Insert");
	AppendMenu(hDictMenu,MF_STRING, IDM_LDELETE, "Delete");

	SendMessage(hList,LVM_SETBKCOLOR,0 ,(LPARAM)RGB(240,240,240));
	SendMessage(hList,LVM_SETTEXTBKCOLOR,0 ,(LPARAM)RGB(220,220,220));
}

BOOL CALLBACK DicEditDialog::SubEdit (HWND hWnd, UINT message,
									  WPARAM wParam, LPARAM lParam)
{
	LVITEMW lvi;
	RECT rc;
	wchar_t* Input[20];

	if (message == WM_KEYDOWN){
		switch (wParam){
		case VK_RETURN:
			if (SendMessage(hEdit, EM_GETMODIFY, 0, 0) == NULL){
				SetWindowPos(hEdit, HWND_TOP, 0, 0, 0, 0,
					SWP_NOACTIVATE | SWP_HIDEWINDOW);
				SetFocus(hList);
			}
			else 
			{
				GetWindowTextW(hWnd, (LPWSTR)Input, 20);

				lvi.mask = LVIF_TEXT;
				lvi.iItem = LVLastItem;
				lvi.iSubItem = LVLastSubItem;
				lvi.pszText = (LPWSTR)Input;
				lvi.cchTextMax = 20;

				SendMessage(hList, LVM_SETITEMTEXTW, LVLastItem, (LPARAM) &lvi);
				SetWindowPos(hEdit, HWND_TOP, 0, 0, 0, 0,
					SWP_NOACTIVATE | SWP_HIDEWINDOW);
				SetFocus(hList);
				SendMessage(hList, EM_SETMODIFY, FALSE, 0);
				modified = true;

				lvi.iSubItem++;
				if ( (LVLastSubItem < 3) && (!SendMessage(hList, LVM_GETITEMTEXTW, LVLastItem, (LPARAM) &lvi)) ){
						LVLastSubItem++;
						rc.top = LVLastSubItem;
						rc.left= LVIR_LABEL;
						SendMessage(hList, LVM_GETSUBITEMRECT, LVLastItem,(LPARAM) &rc);
						SetWindowPos(hEdit, HWND_TOP, rc.left, rc.top - 2,
							rc.right - rc.left, rc.bottom - rc.top + 4, SWP_SHOWWINDOW);
						SetWindowText(hEdit, "");
						SetFocus(hEdit);
					}
				}
			break;
		case VK_TAB:
			switch (LVLastSubItem){
				case 0:
				case 1:
					LVLastSubItem++;
					break;
				case 2:
					LVLastItem++;
					LVLastSubItem = 0;
					break;
			}

			rc.top = LVLastSubItem;
			rc.left= LVIR_LABEL;
			SendMessage(hList, LVM_GETSUBITEMRECT, LVLastItem,(LPARAM) &rc);

			RECT ListRc;
			GetClientRect(hList, &ListRc);
			if (ListRc.bottom < rc.bottom){
				SendMessage(hList, LVM_SCROLL, (WPARAM) 0,(LPARAM) 12);
				rc.top = LVLastSubItem;
				rc.left= LVIR_LABEL;
				SendMessage(hList, LVM_GETSUBITEMRECT, LVLastItem,(LPARAM) &rc);
			}

			SetWindowPos(hEdit, HWND_TOP, rc.left, rc.top - 2,
				rc.right - rc.left, rc.bottom - rc.top + 4, SWP_SHOWWINDOW);

			lvi.mask = LVIF_TEXT;
			lvi.iItem = LVLastItem;
			lvi.iSubItem = LVLastSubItem;
			lvi.pszText = (LPWSTR)Input;
			lvi.cchTextMax = 20;

			SendMessage(hList, LVM_GETITEMW, LVLastItem, (LPARAM) &lvi);
			SetWindowTextW(hEdit, (LPCWSTR)Input);
			SetFocus(hEdit);

			break;
		case  VK_ESCAPE:
			SetWindowPos(hEdit, HWND_TOP, 0, 0, 0, 0,
				SWP_NOACTIVATE | SWP_HIDEWINDOW);
			SetFocus(hList);
			return 0;
			break;
		}
	}
	return CallWindowProcW(OldProc, hWnd, message, wParam, lParam);
}

BOOL DicEditDialog::WriteDicFile(HWND hWnd)
{
	Dictionary dict;
	ZeroMemory(dict.data, MAXDICTSIZE);

	LVITEMW lvi;
	lvi.mask = LVIF_TEXT;
	lvi.iItem = 0;

	int count = ListView_GetItemCount(hList);
	for (int i=0; i<count;i++){
		lvi.iItem = i;
		lvi.iSubItem = 0;
		lvi.cchTextMax = 20;
		lvi.pszText = (LPWSTR)dict.data[i].burglish;
		SendMessage(hList, LVM_GETITEMW, 0, (LPARAM) &lvi);

		lvi.iSubItem++;
		lvi.pszText = (LPWSTR)dict.data[i].burmese;
		SendMessage(hList, LVM_GETITEMW, 0, (LPARAM) &lvi);

		//lvi.iSubItem++;
		//lvi.pszText = (LPWSTR)dict.data[i].display;
		//SendMessage(hList, LVM_GETITEMW, 0, (LPARAM) &lvi);
	}

	OPENFILENAMEA ofn = {0};
	char filebuffer[MAX_PATH] = {0};

	ofn.lStructSize = sizeof(ofn);
	ofn.hwndOwner = hWnd;
	ofn.hInstance = GetModuleHandle(NULL);
	ofn.lpstrFilter = "Burglish Dictionary Files(*.dic)\0*.dic\0\0";
	ofn.lpstrDefExt = "dic";
	ofn.lpstrFile = (LPSTR)&filebuffer;
	ofn.nMaxFile = sizeof filebuffer;
	ofn.lpstrTitle = "Save File";
	ofn.Flags = OFN_EXPLORER | OFN_FILEMUSTEXIST | 
		OFN_LONGNAMES | OFN_OVERWRITEPROMPT;

	if(!GetSaveFileNameA(&ofn)) return false;

	HANDLE hFile = CreateFileA((LPCSTR)filebuffer,GENERIC_WRITE,0,0,
		CREATE_ALWAYS,FILE_ATTRIBUTE_NORMAL,0);

	DWORD cbWritten;
	WriteFile(hFile, dict.data, count * sizeof(BglDictionary), &cbWritten, NULL);

	dict.~Dictionary();
	if(cbWritten != count * sizeof(BglDictionary)){
		MessageBoxA(hWnd, "The file has not been successfully wirtten.", "Error!", MB_ICONERROR | MB_OK);
	}
	return true;
}

BOOL CALLBACK DicEditDialog::DlgProc (HWND hWnd, UINT message,
									  WPARAM wParam, LPARAM lParam)
{
	RECT rc;
	LPNMITEMACTIVATE lpnmitem;
	LVITEMW lvi;
	int iItem;

	switch (message)
	{
	case WM_INITDIALOG:
		OnDlgInit(hWnd);
		break;
	case WM_COMMAND:
		switch (LOWORD(wParam))
		{
		case IDC_DICSAVE:
			if (WriteDicFile(hWnd)){
				MessageBoxA(hWnd, "File Successfully Saved.", "Success!", MB_ICONINFORMATION | MB_OK);
				modified = false;
			}
			break;
		case IDC_DICEXIT:
			SendMessage(hWnd, WM_CLOSE, 0, 0);
			break;
		case IDM_LINSERT:
			lvi.mask = LVIF_TEXT;
			iItem = ListView_GetNextItem(hList, -1, LVNI_FOCUSED);
			if (iItem == -1){
				iItem = 0;
			}
				lvi.iItem = iItem+1;
				lvi.iSubItem = 0;
				lvi.pszText = L"";
				ListView_InsertItem(hList, &lvi);
			break;
		case IDM_LDELETE:
			lvi.mask = LVIF_TEXT;
			iItem = ListView_GetNextItem(hList, -1, LVNI_FOCUSED);
			if (iItem != -1){
				ListView_DeleteItem(hList, iItem);
			}
			modified = true;
			break;
		}
		break;
	case WM_SIZE:
		DWORD Width;
		DWORD Heigh;
		Width = LOWORD (lParam);
		Heigh = HIWORD (lParam);
		MoveWindow(hList, 0,0, Width, Heigh - 28, true);
		MoveWindow((GetDlgItem(hWnd,IDC_DICSAVE)), 10 , Heigh - 25, 75, 23, true);
		MoveWindow((GetDlgItem(hWnd,IDC_DICEXIT)), Width - 85, Heigh - 25, 75, 23, true);
		break;
	case WM_CLOSE:
		if (modified == true){
			if (MessageBoxA(hWnd, "Are you sure want to quit without saving", "Confirm", MB_ICONWARNING | MB_YESNO) == IDYES)
				EndDialog(hWnd,NULL);
			}
		else EndDialog(hWnd,NULL);
		break;
	case WM_NOTIFY:
		if (wParam == IDC_DICLIST){
			LPNMHDR nmhdr = (LPNMHDR)lParam;
			switch (nmhdr->code){
			case NM_DBLCLK:
				lpnmitem = (LPNMITEMACTIVATE) lParam;
				//if not item DB click
				if (lpnmitem->iItem == -1){
					SetWindowPos(hEdit, HWND_TOP, 0, 0,
						0, 0, SWP_SHOWWINDOW);
					SetFocus(hList);
					break;
				}
				LVLastItem = lpnmitem->iItem;
				LVLastSubItem = lpnmitem->iSubItem;

				rc.top = lpnmitem->iSubItem;
				rc.left= LVIR_LABEL;
				SendMessage(hList, LVM_GETSUBITEMRECT, lpnmitem->iItem,(LPARAM) &rc);
				
				wchar_t* Input[20];
				lvi.mask = LVIF_TEXT;
				lvi.iItem = lpnmitem->iItem;
				lvi.iSubItem = lpnmitem->iSubItem;
				lvi.pszText = (LPWSTR)Input;
				lvi.cchTextMax = 20;
				//Get Sub Item Text
				SendMessage(hList, LVM_GETITEMW, 0, (LPARAM) &lvi);
				//And Set to the Edit box
				SetWindowTextW(hEdit, (LPCWSTR)lvi.pszText);

				//Set Edit Box's Positon and show
				SetWindowPos(hEdit, HWND_TOP, rc.left, rc.top - 2,
					rc.right - rc.left, rc.bottom - rc.top + 4, SWP_SHOWWINDOW);
				SetFocus(hEdit);
				int len ;
				len = GetWindowTextLength(hEdit);
				//Set the cruel at the end
				SendMessage(hEdit, EM_SETSEL, len, len);
				break;
			case NM_CLICK:
				lpnmitem = (LPNMITEMACTIVATE) lParam;
				if (IsWindowVisible(hEdit)){
					if ( (LVLastItem != lpnmitem->iItem) || (LVLastSubItem!= lpnmitem->iSubItem)){
						//SetWindowPos(hEdit, HWND_TOP, 0, 0, 0, 0,
						//	SWP_NOACTIVATE | SWP_HIDEWINDOW);
						//SetWindowText(hEdit,"");
						//SetFocus(hList);
						SendMessage(hEdit, WM_KEYDOWN, VK_RETURN, 0);
					}
				}
				break;
			case NM_RCLICK:
				lpnmitem = (LPNMITEMACTIVATE) lParam;
				POINT Pt;
				GetCursorPos(&Pt);
				//Show Menu
				TrackPopupMenu(hDictMenu, TPM_LEFTALIGN, Pt.x, Pt.y, NULL, hWnd, NULL);
				break;
			case LVN_BEGINSCROLL:
				SendMessage(hEdit, WM_KEYDOWN, VK_RETURN, 0);
				break;
			case LVN_ENDSCROLL:
				InvalidateRect(hWnd, NULL, true);
				break;
			}
			break;
		}
		break;
	}
	return FALSE;
}