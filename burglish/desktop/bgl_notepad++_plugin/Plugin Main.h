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

#ifndef __PLUGINMAIN_H__
#define __PLUGINMAIN_H__

#include "Notepad++\PluginInterface.h"
#include "Notepad++\menuCmdID.h"

#include <string>
#include <windows.h>

const char PLUGIN_NAME[] = "Burglish";
const char sectionName[] = "Burglish";

const int nbFunc = 2;
NppData nppData;
FuncItem funcItem[nbFunc];

void Enable();//Enable Burglish Feature
void Disable();//Disable Burglish Feature
BOOL CopyPaste();//Copy - Paste

HINSTANCE hBglish; //hInstance for Burglish Module
HMENU hMenu; //Handle of Npp
BOOL EnableFlag; //Is Enable or Disable
HBRUSH hBK; //Handle for Background Bmp
HBRUSH hSEL; //Handle for Select Bmp

#endif//end define __PLUGINMAIN_H__