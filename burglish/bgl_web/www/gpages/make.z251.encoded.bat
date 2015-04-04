echo "#"
echo "# js encoder"
echo "# requirements - python"
echo "#"

del /q z251_encoded.js

..\..\..\build\copy.py basic.js+lib.js+cookie.js+burmese.js+z251.js z251_combined.js

copy /y z251_combined.js z251_encoded.js

..\..\..\build\replace.py z251_encoded.js \\ \\\\
..\..\..\build\replace.py z251_encoded.js ' \\'
