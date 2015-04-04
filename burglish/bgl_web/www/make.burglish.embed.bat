del /q *.7z

cd gpages

..\..\..\7z\7za a -t7z ..\burglish.web.embed%1.7z hash.css basic.js lib.js burmese.js burglish.js syllable.js -mx9

cd ..

for /f "tokens=1-5 delims=/ " %%d in ("%date%") do rename burglish.web.embed.7z burglish.web.embed.%%g%%e%%f.7z