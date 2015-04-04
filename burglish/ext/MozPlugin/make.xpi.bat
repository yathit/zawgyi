echo "#"
echo "# xpi maker"
echo "# requirements - 7zip, python"
echo "#"

del /q nightly\*.xpi
del chrome\mmgeeksinput.jar

copy /y ..\..\bgl_web\js\basic.js chrome\content
copy /y ..\..\bgl_web\js\lib.js chrome\content
copy /y ..\..\bgl_web\js\burmese.js chrome\content

..\..\build\replace.py chrome/content/basic.js "document." "mmgeeks.doc."
..\..\build\replace.py chrome/content/lib.js "document." "mmgeeks.doc."

copy /y ..\..\bgl_web\css\hash.css chrome\skin\mmgeeksinput.css

..\..\build\replace.py chrome\skin\mmgeeksinput.css ".*For All Browsers\*/\r?\n" ""

cd chrome
..\..\..\7z\7za a -tzip mmgeeksinput.jar *.* -x!.svn -r -mx9
cd ..
..\..\7z\7za a -tzip nightly/burmeseinputsystem.xpi chrome\*.jar chrome.manifest defaults install.rdf install.js -x!.svn -r -mx9

del chrome\mmgeeksinput.jar