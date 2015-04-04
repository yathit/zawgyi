/* !!! PyBurglish is still in Under Constructions !!! */
/* !!! PyBurglish is still in Under Constructions !!! */
/* !!! PyBurglish is still in Under Constructions !!! */

How To Compile PyBurglish.c
	1. Make sure python.exe in PATH
	2. Open Visual Studio Command Prompt (tested with VC2003, not sure with 2005 (coz distutils something wrong in that, according to some web sites))
	3. python PyBurglishSetup.py build

How to Copy "Burglish.pyd" to Python folder
	1. find Burglish.pyd in build folder
	2. Copy to "\Python25\Lib\site-packages"

Usage in Python
	>>> import Burglish
	>>> print Burglish.Digit2Burmese("")
	၀၁၂၃၄၅၆၇၈၉
	>>> 