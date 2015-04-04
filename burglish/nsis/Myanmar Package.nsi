;Define application version
!define VERSION 1.3

; Define the application name
!define APPNAME "Myanmar Package"
!define APPNAMEANDVERSION "${APPNAME} ${VERSION}"

; Main Install settings
Name "${APPNAMEANDVERSION}"
InstallDir "$PROGRAMFILES\${APPNAMEANDVERSION}"
OutFile "${APPNAMEANDVERSION}.exe"

; Modern interface settings
	!include "MUI.nsh"
	
	!define MUI_ICON ".\images\M.ico"
	
	!define MUI_WELCOMEFINISHPAGE_BITMAP ".\images\Welcome.bmp"
	!define MUI_WELCOMEFINISHPAGE_BITMAP_NOSTRETCH

	!define MUI_HEADERIMAGE
	!define MUI_HEADERIMAGE_RIGHT
	!define MUI_HEADERIMAGE_BITMAP ".\images\Head.bmp" ; optional
	!define MUI_ABORTWARNING

	!insertmacro MUI_PAGE_WELCOME
	!insertmacro MUI_PAGE_LICENSE "..\LICENSE"
	!insertmacro MUI_PAGE_LICENSE "WaitZar\LICENSE"
	!insertmacro MUI_PAGE_LICENSE "OFL.txt"
	!insertmacro MUI_PAGE_DIRECTORY
	!insertmacro MUI_PAGE_COMPONENTS
	!insertmacro MUI_PAGE_INSTFILES
	!insertmacro MUI_PAGE_FINISH

	!insertmacro MUI_UNPAGE_COMPONENTS
	!insertmacro MUI_UNPAGE_CONFIRM
	!insertmacro MUI_UNPAGE_INSTFILES
	!insertmacro MUI_UNPAGE_FINISH

	!insertmacro MUI_LANGUAGE "English"

Section "" mainSection

	SetOverwrite on

	SetOutPath "$INSTDIR\"
	File ".\ReadMe.rtf"
	
	UserInfo::GetAccountType
	Pop $1
	StrCmp $1 "Admin" 0 +2
	
	SetShellVarContext all
	; add all the shortcuts for all user or current user
	
	CreateDirectory "$SMPROGRAMS\${APPNAMEANDVERSION}\"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Readme.lnk" "$INSTDIR\ReadMe.rtf"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Uninstall.lnk" "$INSTDIR\Uninstall.exe"
	
	SetShellVarContext current
	
	WriteRegStr HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\Burglish TextPad.exe" "" "$INSTDIR\Burglish TextPad.exe"
SectionEnd

SubSection "Burglish Input System" Burglish
	SetOverwrite on
	
	Section BurglishTextPad
		SetOutPath "$INSTDIR\Burglish\"
		File ".\Burglish\*.exe"
		
		UserInfo::GetAccountType
		Pop $1
		StrCmp $1 "Admin" 0 +2
		
		SetShellVarContext all
		CreateDirectory "$SMPROGRAMS\${APPNAMEANDVERSION}\Burglish\"
		CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Burglish\Burglish TextPad.lnk" "$INSTDIR\Burglish\Burglish TextPad.exe"
		CreateShortCut "$DESKTOP\${APPNAMEANDVERSION}\Burglish\Burglish TextPad.lnk" "$INSTDIR\Burglish\Burglish TextPad.exe"
		
		SetShellVarContext current
	SectionEnd
	
	Section TextService
		SetOutPath "$INSTDIR\Burglish\"
		File ".\Burglish\TextService.dll"
		RegDLL $INSTDIR\Burglish\TextService.dll
		sleep 1000
		Exec 'regsvr32 /s "$INSTDIR\Burglish\TextService.dll"'
		sleep 500
	SectionEnd
	
	Section Notepad++Plugin
		SetOutPath "$PROGRAMFILES\Notepad++\plugins\"
		File ".\Burglish\Burglish.dll"
	SectionEnd
SubSectionEnd

Section "WaitZar Input System" WaitZar
	SetOverwrite on
	
	SetOutPath "$INSTDIR\WaitZar\"
	File ".\WaitZar\*.*"

	UserInfo::GetAccountType
	Pop $1
	StrCmp $1 "Admin" 0 +2
	
	SetShellVarContext all
	
	CreateDirectory "$SMPROGRAMS\${APPNAMEANDVERSION}\WaitZar\"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\WaitZar\WaitZar.lnk" "$INSTDIR\WaitZar\WaitZar.exe"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\WaitZar\WaitZar User's Guide.lnk" "$INSTDIR\WaitZar\WaitZar User's Guide.doc"
	
	SetShellVarContext current
SectionEnd

Section "Kanaung Converters" Kanaung
	SetOverwrite on
	
	SetOutPath "$INSTDIR\"
	File ".\KaNaung\fontmap.json"
	
	SetOutPath "$INSTDIR\KaNaung\"
	File ".\KaNaung\*.*"
	
	UserInfo::GetAccountType
	Pop $1
	StrCmp $1 "Admin" 0 +2
	
	SetShellVarContext all
	
	CreateDirectory "$SMPROGRAMS\${APPNAMEANDVERSION}\Kanaung\"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Kanaung\Kanaung Converter C#.lnk" "$INSTDIR\Kanaung\Converter C#.exe"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Kanaung\Kanaung Converter C++.lnk" "$INSTDIR\Kanaung\Converter C++.exe"
	CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Kanaung\Kanaung Converter ASM.lnk" "$INSTDIR\Kanaung\Converter ASM.exe"
	
	SetShellVarContext current
SectionEnd

SubSection "Myanmar Fonts" Fonts
	SetOverwrite off
	
	Section Myanmar3
	SetOutPath "$WINDIR\Fonts\"
	File /nonfatal ".\files\Myanmar3_ship.ttf"
	SectionEnd
	
	Section ParabaikSans
	SetOutPath "$WINDIR\Fonts\"
	File /nonfatal ".\files\ParabaikSans.ttf"
	SectionEnd
	
	Section Parabaik
	SetOutPath "$WINDIR\Fonts\"
	File /nonfatal ".\files\Parabaik20070928.ttf"
	SectionEnd
	
	Section ZawGyi-One
	SetOutPath "$WINDIR\Fonts\"
	File /nonfatal ".\files\Zawgyi-One.ttf"
	SectionEnd
	
SubSectionEnd

SubSection "Web Developer Tools" Webdav
	SetOverwrite on
	
	Section BurglishTextBox
		SetOutPath "$INSTDIR\Webdav\"
		File ".\Burglish\BurglishControls*.dll"
		File ".\Burglish\BurglishTextBox.rtf"
	

		UserInfo::GetAccountType
		Pop $1
		StrCmp $1 "Admin" 0 +2
		
		
		SetShellVarContext all
		
		CreateDirectory "$SMPROGRAMS\${APPNAMEANDVERSION}\Webdav\"
		CreateShortCut "$SMPROGRAMS\${APPNAMEANDVERSION}\Webdav\Open Folder.lnk" "$WINDIR\explorer.exe"  "$INSTDIR\Webdav\"
		
		SetShellVarContext current
	SectionEnd
	
SubSectionEnd

;--------------------------------
;Descriptions

  ;Language strings
  
  ;Assign language strings to sections
  !insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
    !insertmacro MUI_DESCRIPTION_TEXT ${Burglish} 'Burglish Input System.'
    !insertmacro MUI_DESCRIPTION_TEXT ${WaitZar} 'WaitZar Input System.'
    !insertmacro MUI_DESCRIPTION_TEXT ${Kanaung} 'Kanaung Converters.'
    !insertmacro MUI_DESCRIPTION_TEXT ${Webdav} 'Web Developer Tools.'
   !insertmacro MUI_FUNCTION_DESCRIPTION_END

;--------------------------------

Section -FinishSection

	WriteRegStr HKLM "Software\${APPNAME}" "" "$INSTDIR"
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayName" "${APPNAME}"
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "UninstallString" "$INSTDIR\uninstall.exe"
	WriteUninstaller "$INSTDIR\uninstall.exe"

SectionEnd

;Uninstall section

SubSection un.Burglish

	Section un.BurglishTextPad
	Delete "$INSTDIR\Burglish\*.*"
	RMDir  "$INSTDIR\Burglish\"
	SectionEnd
	
	Section un.TextService
		UnRegDLL $INSTDIR\Burglish\TextService.dll
		sleep 2000
		Exec 'regsvr32 /u /s "$INSTDIR\Burglish\TextService.dll"'
		sleep 2000
		Exec 'regsvr32 /u /s "$INSTDIR\Burglish\TextService.dll"'
		sleep 1000
		Delete "$INSTDIR\Burglish\TextService.dll"
		sleep 500
	SectionEnd

	Section un.NotePad++Plugin
	Delete "$PROGRAMFILES\Notepad++\plugins\Burglish.dll"
	SectionEnd

SubSectionEnd

Section un.WaitZar
	RMDir  /r /REBOOTOK "$INSTDIR\WaitZar\"
SectionEnd

Section un.Kanaung
	RMDir  /r /REBOOTOK "$INSTDIR\Kanaung\"
SectionEnd

Section un.Webdav
	RMDir  /r /REBOOTOK "$INSTDIR\Webdav\"
SectionEnd

Section un.
	;Remove from registry...
	DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}"
	DeleteRegKey HKLM "SOFTWARE\${APPNAME}"
	DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\Burglish TextPad.exe" 
	
	Delete "$INSTDIR\*.*"
	
	UserInfo::GetAccountType
	Pop $1
	StrCmp $1 "Admin" 0 +2
	SetShellVarContext all
	
	; Delete Shortcuts	
	Delete "$DESKTOP\Burglish TextPad.lnk"
	
	; Remove remaining directories
	RMDir /r /REBOOTOK "$SMPROGRAMS\${APPNAMEANDVERSION}\"
	RMDir /r /REBOOTOK "$INSTDIR\"
	
SectionEnd
	
BrandingText "${APPNAMEANDVERSION}"
