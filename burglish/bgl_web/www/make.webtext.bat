del /q *.7z

copy /y ..\..\build\weft\*.eot css\

..\..\7z\7za a -t7z web.text.editor%1.7z ../AUTHORS ../../COPYING ../../LICENSE webtext.htm css/keyboard.css css/hash.css css/*.eot js/basic.js js/lib.js js/burmese.js js/burglish.js js/int.js js/english.js js/convertor.js js/keyboard.js -mx9

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename web.text.editor.7z web.text.editor.%%g%%e%%f.7z