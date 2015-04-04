del bgl_textpad_demo*.7z

mkdir dicts 

copy /y Release\*.exe .

copy /y ..\bgl_dicts\*.dic dicts

..\..\UPX\UPX\upx.exe --best *.exe

..\..\7z\7za a -t7z bgl_textpad_demo.7z ../../COPYING ../../LICENSE AUTHORS README bgl_textpad.exe dicts -mx9

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename bgl_textpad_demo.7z bgl_textpad_demo_%%g%%e%%f.7z

