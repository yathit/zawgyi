//////////////////////////////////////////////////////////////////////
//
//  THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//  ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED
//  TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//  PARTICULAR PURPOSE.
//
//  Copyright (C) 2003  Microsoft Corporation.  All rights reserved.
//
//  KeyHandler.cpp
//
//          the handler routines for key events
//
//////////////////////////////////////////////////////////////////////

#include "Globals.h"
#include "EditSession.h"
#include "TextService.h"
#include "CandidateList.h"

wchar_t Normal[] = L"`-=[]\\;',./";
wchar_t Shift[] = L"~_+{}|:\"<>?";

//+---------------------------------------------------------------------------
//
// CKeyHandlerEditSession
//
//----------------------------------------------------------------------------

class CKeyHandlerEditSession : public CEditSessionBase
{
public:
    CKeyHandlerEditSession(CTextService *pTextService, ITfContext *pContext, WPARAM wParam) : CEditSessionBase(pTextService, pContext)
    {
        _wParam = wParam;
    }

    // ITfEditSession
    STDMETHODIMP DoEditSession(TfEditCookie ec);

private:
    WPARAM _wParam;
};

//+---------------------------------------------------------------------------
//
// DoEditSession
//
//----------------------------------------------------------------------------

STDAPI CKeyHandlerEditSession::DoEditSession(TfEditCookie ec)
{
	if (burmese.isTypeWriterInput){
		_pTextService->_HandleBurmese(ec, _pContext, _wParam);
	}
     /*switch (_wParam)
    {
        case VK_LEFT:
        case VK_RIGHT:
            return _pTextService->_HandleArrowKey(ec, _pContext, _wParam);
		
        case VK_RETURN:
            return _pTextService->_HandleReturnKey(ec, _pContext);

        case VK_SPACE:
            return _pTextService->_HandleSpaceKey(ec, _pContext);

		default:*/
	else if ( (_wParam >= 'A' && _wParam <= 'Z') || (_wParam >= '0' && _wParam <= '9') )
		return _pTextService->_HandleCharacterKey(ec, _pContext, _wParam);
			/*break;
    }*/

    return S_OK;

}

//+---------------------------------------------------------------------------
//
// IsRangeCovered
//
// Returns TRUE if pRangeTest is entirely contained within pRangeCover.
//
//----------------------------------------------------------------------------

BOOL IsRangeCovered(TfEditCookie ec, ITfRange *pRangeTest, ITfRange *pRangeCover)
{
    LONG lResult;

    if (pRangeCover->CompareStart(ec, pRangeTest, TF_ANCHOR_START, &lResult) != S_OK ||
        lResult > 0)
    {
        return FALSE;
    }

    if (pRangeCover->CompareEnd(ec, pRangeTest, TF_ANCHOR_END, &lResult) != S_OK ||
        lResult < 0)
    {
        return FALSE;
    }

    return TRUE;
}

//+---------------------------------------------------------------------------
//
// _HandleCharacterKey
//
// If the keystroke happens within a composition, eat the key and return S_OK.
//
//----------------------------------------------------------------------------

HRESULT CTextService::_HandleCharacterKey(TfEditCookie ec, ITfContext *pContext, WPARAM wParam)
{
	if (!_IsComposing())
		_StartComposition(pContext);
    // 
    // create an instance of the candidate list class.
    // 
    if (_pCandidateList == NULL)
        _pCandidateList = new CCandidateList(this);

    // 
    // The document manager object is not cached. Get it from pContext.
    // 
    ITfDocumentMgr *pDocumentMgr;
    if (pContext->GetDocumentMgr(&pDocumentMgr) == S_OK)
    {
        // 
        // get the composition range.
        // 
        ITfRange *pRange;
        if (_pComposition->GetRange(&pRange) == S_OK)
        {
            _pCandidateList->_StartCandidateList(_tfClientId, pDocumentMgr, pContext, ec, pRange);
            pRange->Release();
        }
        pDocumentMgr->Release();
    }
	
	if (_IsComposing())
		_TerminateComposition(ec, pContext);

	return S_OK;
}
/*	ITfRange *pRangeComposition;
    TF_SELECTION tfSelection;
    ULONG cFetched;
    WCHAR ch;
    BOOL fCovered;

    // Start the new compositon if there is no composition.
    if (!_IsComposing())
        _StartComposition(pContext);

    //
    // Assign VK_ value to the char. So the inserted the character is always
    // uppercase.
    //
    ch = (WCHAR)wParam;

    // first, test where a keystroke would go in the document if an insert is done
    if (pContext->GetSelection(ec, TF_DEFAULT_SELECTION, 1, &tfSelection, &cFetched) != S_OK || cFetched != 1)
        return S_FALSE;

    // is the insertion point covered by a composition?
    if (_pComposition->GetRange(&pRangeComposition) == S_OK)
    {
        fCovered = IsRangeCovered(ec, tfSelection.range, pRangeComposition);

        pRangeComposition->Release();

        if (!fCovered)
        {
            goto Exit;
        }
    }

    // insert the text
    // Use SetText here instead of InsertTextAtSelection because a composition is already started
    // Don't allow the app to adjust the insertion point inside our composition
    if (tfSelection.range->SetText(ec, 0, &ch, 1) != S_OK)
        goto Exit;

    // update the selection, and make it an insertion point just past
    // the inserted text.
    tfSelection.range->Collapse(ec, TF_ANCHOR_END);
    pContext->SetSelection(ec, 1, &tfSelection);

    //
    // set the display attribute to the composition range.
    //
    _SetCompositionDisplayAttributes(ec, pContext, _gaDisplayAttributeInput);

Exit:
    tfSelection.range->Release();
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// _HandleReturnKey
//
//----------------------------------------------------------------------------

HRESULT CTextService::_HandleReturnKey(TfEditCookie ec, ITfContext *pContext)
{
    // just terminate the composition
    _TerminateComposition(ec, pContext);
    return S_OK;
}
/*
//+---------------------------------------------------------------------------
//
// _HandleSpaceKey
//
//----------------------------------------------------------------------------

HRESULT CTextService::_HandleSpaceKey(TfEditCookie ec, ITfContext *pContext)
{
    //
    // set the display attribute to the composition range.
    //
    // The real text service may have linguistic logic here and set 
    // the specific range to apply the display attribute rather than 
    // applying the display attribute to the entire composition range.
    //
    _SetCompositionDisplayAttributes(ec, pContext, _gaDisplayAttributeConverted);

    // 
    // create an instance of the candidate list class.
    // 
    if (_pCandidateList == NULL)
        _pCandidateList = new CCandidateList(this);

    // 
    // The document manager object is not cached. Get it from pContext.
    // 
    ITfDocumentMgr *pDocumentMgr;
    if (pContext->GetDocumentMgr(&pDocumentMgr) == S_OK)
    {
        // 
        // get the composition range.
        // 
        ITfRange *pRange;
        if (_pComposition->GetRange(&pRange) == S_OK)
        {
            _pCandidateList->_StartCandidateList(_tfClientId, pDocumentMgr, pContext, ec, pRange);
            pRange->Release();
        }
        pDocumentMgr->Release();
    }
    return S_OK;
}

//+---------------------------------------------------------------------------
//
// _HandleArrowKey
//
// Update the selection within a composition.
//
//----------------------------------------------------------------------------

HRESULT CTextService::_HandleArrowKey(TfEditCookie ec, ITfContext *pContext, WPARAM wParam)
{
    ITfRange *pRangeComposition;
    LONG cch;
    BOOL fEqual;
    TF_SELECTION tfSelection;
    ULONG cFetched;

    // get the selection
    if (pContext->GetSelection(ec, TF_DEFAULT_SELECTION, 1, &tfSelection, &cFetched) != S_OK ||
        cFetched != 1)
    {
        // no selection?
        return S_OK; // eat the keystroke
    }

    // get the composition range
    if (_pComposition->GetRange(&pRangeComposition) != S_OK)
        goto Exit;

    // adjust the selection
    if (wParam == VK_LEFT)
    {
        if (tfSelection.range->IsEqualStart(ec, pRangeComposition, TF_ANCHOR_START, &fEqual) == S_OK &&
            !fEqual)
        {
            tfSelection.range->ShiftStart(ec, -1, &cch, NULL);
        }
        tfSelection.range->Collapse(ec, TF_ANCHOR_START);
    }
    else
    {
        // VK_RIGHT
        if (tfSelection.range->IsEqualEnd(ec, pRangeComposition, TF_ANCHOR_END, &fEqual) == S_OK &&
            !fEqual)
        {
            tfSelection.range->ShiftEnd(ec, +1, &cch, NULL);
        }
        tfSelection.range->Collapse(ec, TF_ANCHOR_END);
    }

    pContext->SetSelection(ec, 1, &tfSelection);

    pRangeComposition->Release();

Exit:
    tfSelection.range->Release();
    return S_OK; // eat the keystroke
}
*/

HRESULT CTextService::_HandleBurmese(TfEditCookie ec, ITfContext *pContext, WPARAM wParam)
{
	ULONG cFetched;
	TF_SELECTION tfSelection;

	wchar_t szTemp[10]; // temp buffer
	wchar_t charBurmese[10]={0}; // character to display

	bool shiftDown = GetKeyState(VK_SHIFT) & 0x8000;

	UINT VKEY = 0;
	UINT INPUT = wParam;
	switch (wParam){
		case 0xC0:
			INPUT = '`';
			if (shiftDown)
				INPUT = '~';
			break;
		case 0xBD:
			INPUT = '-';
			if (shiftDown)
				INPUT = '_';
			break;
		case 0xBB:
			wParam = '=';
			if (shiftDown)
				INPUT = '+';
			break;
		case 0xDB:
			INPUT = '[';
			if (shiftDown)
				INPUT = '{';
			break;
		case 0xDD:
			INPUT = ']';
			if (shiftDown)
				INPUT = '}';
			break;
		case 0xDC:
			INPUT = '\\';
				if (shiftDown)
				INPUT = '|';
			break;
		case 0xBA:
			INPUT = ';';
			if (shiftDown)
				INPUT = ':';
			break;
		case 0xDE:
			INPUT = '\'';
				if (shiftDown)
				INPUT = '"';
			break;
		case 0xBC:
			INPUT = ',';
			if (shiftDown)
				INPUT = '<';
			break;
		case 0xBE:
			INPUT = '.';
			if (shiftDown)
				INPUT = '>';
			break;
		case 0xBF:
			INPUT = '/';
			if (shiftDown)
				INPUT = '?';
			break;
	}

	if (shiftDown){
		switch (wParam){
			case '0':
				INPUT = ')';
				break;
			case '1':
				INPUT = '!';
				break;
			case '2':
				INPUT = '@';
				break;
			case '3':
				INPUT = '#';
				break;
			case '4':
				INPUT = '$';
				break;
			case '5':
				INPUT = '%';
				break;
			case '6':
				INPUT = '^';
				break;
			case '7':
				INPUT = '&';
				break;
			case '8':
				INPUT = '*';
				break;
			case '9':
				INPUT = '(';
				break;
		}
	}

	if (wParam >= 'A' && wParam <= 'Z'){
		bool capsToggled = GetKeyState(VK_CAPITAL) & 0x1;
		//NOT(shiftDown XOR capsToggled) AND character is A to Z, 
		if (!((!shiftDown && capsToggled) || (shiftDown && !capsToggled))){
			INPUT += 32;
		}
	}

	//for combination keys output like Shift+Q -> hta htoe + yapin
	if (GetKeyState(VK_SHIFT) & 0x8000) VKEY |= 4; // SHIFT key
  
	burmese.processTypeWriterInput(charBurmese,INPUT,VKEY); // prcess the input
  
	if(charBurmese[0] != NULL){
		wsprintfW(szTemp,L"%s",charBurmese);
		pContext->GetSelection(ec, TF_DEFAULT_SELECTION, 1, &tfSelection, &cFetched);
		tfSelection.range->SetText(ec, 0, szTemp, wcslen(szTemp));
		tfSelection.range->Collapse(ec, TF_ANCHOR_END);
		pContext->SetSelection(ec,1, &tfSelection);
	}
	tfSelection.range->Release();
	return S_OK;
}
//+---------------------------------------------------------------------------
//
// _InvokeKeyHandler
//
// This text service is interested in handling keystrokes to demonstrate the
// use the compositions. Some apps will cancel compositions if they receive
// keystrokes while a compositions is ongoing.
//
//----------------------------------------------------------------------------

HRESULT CTextService::_InvokeKeyHandler(ITfContext *pContext, WPARAM wParam, LPARAM lParam)
{
    CKeyHandlerEditSession *pEditSession;
    HRESULT hr = E_FAIL;

    // Insert a char in place of this keystroke
    if ((pEditSession = new CKeyHandlerEditSession(this, pContext, wParam)) == NULL)
        goto Exit;

    // a lock is required
    // nb: this method is one of the few places where it is legal to use
    // the TF_ES_SYNC flag
    hr = pContext->RequestEditSession(_tfClientId, pEditSession, TF_ES_SYNC | TF_ES_READWRITE, &hr);

    pEditSession->Release();

Exit:
    return hr;
}

