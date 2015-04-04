del /q *.7z

copy /y ..\..\build\weft\*.eot css\

..\..\7z\7za a -t7z burglish.webinputsystems%1.7z ../AUTHORS ../../COPYING ../../LICENSE testarea.htm css/lib.css css/hash.css css/*.eot js/basic.js js/lib.js js/burmese.js js/burglish.js js/syllable.js -mx9

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename burglish.webinputsystems.7z burglish.webinputsystems.%%g%%e%%f.7z