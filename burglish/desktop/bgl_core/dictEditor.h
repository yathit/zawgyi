#ifndef DICTEDITOR_H
#define DICTEDITOR_H

#include <windows.h>
#include <commctrl.h>

#define IDC_DICLIST 1
#define IDC_DICEDIT 2
#define IDM_LINSERT 3
#define IDM_LDELETE 4

#define LVN_BEGINSCROLL          (LVN_FIRST-80)          
#define LVN_ENDSCROLL            (LVN_FIRST-81)

//Dict Resources

#define IDD_DIC                         5001
#define IDC_DICSAVE                     5001
#define IDC_DICEXIT                     5002

class DicEditDialog
{
public :
	DicEditDialog(): _hInst(NULL), _hParent(NULL){};
	~DicEditDialog(){
		return;
	};

	void create(HINSTANCE hInst, HWND parent);

private:
	static BOOL CALLBACK DlgProc (HWND hWnd, UINT message,
		WPARAM wParam, LPARAM lParam);

	static void OnDlgInit(HWND hWnd);

	static BOOL CALLBACK SubEdit (HWND hWnd, UINT message,
		WPARAM wParam, LPARAM lParam);

	static BOOL WriteDicFile (HWND hWnd);

	HINSTANCE _hInst;
	HWND _hParent;
	HWND _hSelf;

};
#endif //DICTEDITOR_H