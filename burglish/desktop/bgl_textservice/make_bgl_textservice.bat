del bgl_textservice_demo*.7z

copy /y Release\*.dll .

..\..\UPX\UPX\upx.exe --best *.dll

..\..\7z\7za a -t7z bgl_textservice_demo.7z *.dll *register.bat -mx9

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename bgl_textservice_demo.7z bgl_textservice_demo_%%g%%e%%f.7z

