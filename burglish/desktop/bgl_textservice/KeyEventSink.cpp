//////////////////////////////////////////////////////////////////////
//
//  THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//  ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED
//  TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//  PARTICULAR PURPOSE.
//
//  Copyright (C) 2003  Microsoft Corporation.  All rights reserved.
//
//  KeyEventSink.cpp
//
//          ITfKeyEventSink implementation.
//
//////////////////////////////////////////////////////////////////////

#include "Globals.h"
#include "TextService.h"
#include "CandidateList.h"

//
// GUID for the preserved keys.
//
/* 6a0bde41-6adf-11d7-a6ea-00065b84435c */
static const GUID GUID_PRESERVEDKEY_BURGLISH = { 
    0x6a0bde41,
    0x6adf,
    0x11d7,
    {0xa6, 0xea, 0x00, 0x06, 0x5b, 0x84, 0x43, 0x5c}
  };

/* 6a0bde41-6adf-11d7-a6ea-00065b84435d */
static const GUID GUID_PRESERVEDKEY_BURMESE = { 
    0x6a0bde41,
    0x6adf,
    0x11d7,
    {0xa6, 0xea, 0x00, 0x06, 0x5b, 0x84, 0x43, 0x5d}
  };

//
// the preserved keys declaration
//
static const TF_PRESERVEDKEY c_pkeyburglish = { VK_F2, TF_MOD_IGNORE_ALL_MODIFIER };
static const TF_PRESERVEDKEY c_pkeyburmese = { VK_F8, TF_MOD_IGNORE_ALL_MODIFIER };

//
// the description for the preserved keys
//
static const WCHAR c_szPKeyOnOff[] = L"OnOff";

//+---------------------------------------------------------------------------
//
// _IsKeyEaten
//
//----------------------------------------------------------------------------

BOOL CTextService::_IsKeyEaten(ITfContext *pContext, WPARAM wParam)
{
    // if the keyboard is disabled, keys are not consumed.
    if (_IsKeyboardDisabled())
        return FALSE;

    // if the keyboard is closed, keys are not consumed.
    if (!_IsKeyboardOpen())
        return FALSE;

    //
    // The text service key handler does not do anything while the candidate
    // window is shown.
    // The candidate list handles the keys through ITfContextKeyEventSink.
    //
    if (_pCandidateList &&
        _pCandidateList->_IsContextCandidateWindow(pContext))
    {
        return FALSE;
    }

    // eat only keys that CKeyHandlerEditSession can hadles.
    switch (wParam)
    {
        case VK_LEFT:
        case VK_RIGHT:
        case VK_RETURN:
		case VK_SPACE:
		case VK_BACK:
			if (_IsComposing())
                return TRUE;
			return FALSE;
		case 0xC0:
		case 0xBD:
		case 0xBB:
		case 0xDB:
		case 0xDD:
		case 0xDC:
		case 0xBA:
		case 0xDE:
		case 0xBC:
		case 0xBE:
		case 0xBF:
			return TRUE;		
	}
	if (GetKeyState(VK_MENU) & 0x8000)
		return FALSE;
	else if (GetKeyState(VK_CONTROL) & 0x8000)
		return FALSE;
	else if (wParam >= VK_NUMPAD0 && wParam <= VK_NUMPAD9)
		return FALSE;
	else if ( (wParam >= '0' && wParam <= '9') || (wParam >= 'A' && wParam <= 'Z') )
		return TRUE;

    return FALSE;
}


//+---------------------------------------------------------------------------
//
// OnSetFocus
//
// Called by the system whenever this service gets the keystroke device focus.
//----------------------------------------------------------------------------

STDAPI CTextService::OnSetFocus(BOOL fForeground)
{
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// OnTestKeyDown
//
// Called by the system to query this service wants a potential keystroke.
//----------------------------------------------------------------------------

STDAPI CTextService::OnTestKeyDown(ITfContext *pContext, WPARAM wParam, LPARAM lParam, BOOL *pfEaten)
{
    *pfEaten = _IsKeyEaten(pContext, wParam);
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// OnKeyDown
//
// Called by the system to offer this service a keystroke.  If *pfEaten == TRUE
// on exit, the application will not handle the keystroke.
//----------------------------------------------------------------------------

STDAPI CTextService::OnKeyDown(ITfContext *pContext, WPARAM wParam, LPARAM lParam, BOOL *pfEaten)
{
    *pfEaten = _IsKeyEaten(pContext, wParam);

    if (*pfEaten)
    {
        _InvokeKeyHandler(pContext, wParam, lParam);
    }
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// OnTestKeyUp
//
// Called by the system to query this service wants a potential keystroke.
//----------------------------------------------------------------------------

STDAPI CTextService::OnTestKeyUp(ITfContext *pContext, WPARAM wParam, LPARAM lParam, BOOL *pfEaten)
{
    *pfEaten = _IsKeyEaten(pContext, wParam);
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// OnKeyUp
//
// Called by the system to offer this service a keystroke.  If *pfEaten == TRUE
// on exit, the application will not handle the keystroke.
//----------------------------------------------------------------------------

STDAPI CTextService::OnKeyUp(ITfContext *pContext, WPARAM wParam, LPARAM lParam, BOOL *pfEaten)
{
    *pfEaten = _IsKeyEaten(pContext, wParam);
	return S_OK;
}

//+---------------------------------------------------------------------------
//
// OnPreservedKey
//
// Called when a hotkey (registered by us, or by the system) is typed.
//----------------------------------------------------------------------------

STDAPI CTextService::OnPreservedKey(ITfContext *pContext, REFGUID rguid, BOOL *pfEaten)
{

    if (IsEqualGUID(rguid, GUID_PRESERVEDKEY_BURGLISH))
    {
        //BOOL fOpen = _IsKeyboardOpen();
        //_SetKeyboardOpen(fOpen ? FALSE : TRUE);
		burmese.isPhoneticInput = !burmese.isPhoneticInput;
		_SetKeyboardOpen(burmese.isPhoneticInput ? TRUE : FALSE);
		burmese.isTypeWriterInput = FALSE;
        *pfEaten = TRUE;
    }
	else if (IsEqualGUID(rguid, GUID_PRESERVEDKEY_BURMESE)){
		burmese.isTypeWriterInput = !burmese.isTypeWriterInput;
		_SetKeyboardOpen(burmese.isTypeWriterInput ? TRUE : FALSE);
		burmese.isPhoneticInput = FALSE;
		*pfEaten = TRUE;
	}
    else
    {
        *pfEaten = FALSE;
    }

    return S_OK;
}

//+---------------------------------------------------------------------------
//
// _InitKeyEventSink
//
// Advise a keystroke sink.
//----------------------------------------------------------------------------

BOOL CTextService::_InitKeyEventSink()
{
    ITfKeystrokeMgr *pKeystrokeMgr;
    HRESULT hr;

    if (_pThreadMgr->QueryInterface(IID_ITfKeystrokeMgr, (void **)&pKeystrokeMgr) != S_OK)
        return FALSE;

    hr = pKeystrokeMgr->AdviseKeyEventSink(_tfClientId, (ITfKeyEventSink *)this, TRUE);

    pKeystrokeMgr->Release();

    return (hr == S_OK);
}

//+---------------------------------------------------------------------------
//
// _UninitKeyEventSink
//
// Unadvise a keystroke sink.  Assumes a sink has been advised already.
//----------------------------------------------------------------------------

void CTextService::_UninitKeyEventSink()
{
    ITfKeystrokeMgr *pKeystrokeMgr;

    if (_pThreadMgr->QueryInterface(IID_ITfKeystrokeMgr, (void **)&pKeystrokeMgr) != S_OK)
        return;

    pKeystrokeMgr->UnadviseKeyEventSink(_tfClientId);

    pKeystrokeMgr->Release();
}

//+---------------------------------------------------------------------------
//
// _InitPreservedKey
//
// Register a hot key.
//----------------------------------------------------------------------------

BOOL CTextService::_InitPreservedKey()
{
    ITfKeystrokeMgr *pKeystrokeMgr;
    HRESULT hr;

    if (_pThreadMgr->QueryInterface(IID_ITfKeystrokeMgr, (void **)&pKeystrokeMgr) != S_OK)
        return FALSE;

    // register VK_F2 key
    hr = pKeystrokeMgr->PreserveKey(_tfClientId, 
                                    GUID_PRESERVEDKEY_BURGLISH,
                                    &c_pkeyburglish,
                                    c_szPKeyOnOff,
                                    wcslen(c_szPKeyOnOff));

	hr = pKeystrokeMgr->PreserveKey(_tfClientId, 
                                    GUID_PRESERVEDKEY_BURMESE,
                                    &c_pkeyburmese,
                                    c_szPKeyOnOff,
                                    wcslen(c_szPKeyOnOff));

    pKeystrokeMgr->Release();

    return (hr == S_OK);
}

//+---------------------------------------------------------------------------
//
// _UninitPreservedKey
//
// Uninit a hot key.
//----------------------------------------------------------------------------

void CTextService::_UninitPreservedKey()
{
    ITfKeystrokeMgr *pKeystrokeMgr;

    if (_pThreadMgr->QueryInterface(IID_ITfKeystrokeMgr, (void **)&pKeystrokeMgr) != S_OK)
        return;

    pKeystrokeMgr->UnpreserveKey(GUID_PRESERVEDKEY_BURGLISH, &c_pkeyburglish);
	pKeystrokeMgr->UnpreserveKey(GUID_PRESERVEDKEY_BURMESE, &c_pkeyburmese);

    pKeystrokeMgr->Release();
}

