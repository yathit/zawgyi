#!/usr/bin/env python
#
# code - aTxIvG4001
#

import codecs, sys, re

data=''
files=sys.argv[1].split('+')
for file in files:
	infile = codecs.open(file, "r", "utf-8")
	data += infile.read()

outfile = codecs.open(sys.argv[2], 'w+', "utf-8")
outfile.write(data)
outfile.close()