del /q /s *.pyc
del /q /s *.bak
del /q /s *.o
del /q /s *.suo
del /q /s *.ncb
del /q /s *.pdb
del /q /s *.ilk
del /q /s *.idb
del /q /s *.obj
del /q /s *.lib
del /q /s *.res
del /q /s *.exp
del /q /s BuildLog.htm
rd /q /s Debug
rd /q /s Release

del /q burglish.backup*.7z

7z\7za a -t7z burglish.backup%1.7z COPYING LICENSE bgl_web/AUTHORS bgl_web/*.htm bgl_web/*.php bgl_web/*.csproj bgl_web/css bgl_web/js/*.js bgl_web/img bgl_web/www/*.bat bgl_web/www/cache.* bgl_web/www/gpages/*.bat bgl_web/doc desktop build asp UPX 7z *.bat nsis/*.bat nsis/*.nsi nsis/*.url nsis/*.rtf nsis/images/*.7z ext -x!.svn -x!*.exe -x!*.suo -x!*.ncb -x!*.user -x!*.sln -x!*.o -x!*.obj -x!*.bak -x!*.aps -x!Debug -x!Release -x!*backup* -r -mx9

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename burglish.backup.7z burglish.backup.%%g%%e%%f.7z
