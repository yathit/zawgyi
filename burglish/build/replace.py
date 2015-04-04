#!/usr/bin/env python
#
# code - aTxIvG4001
#

import codecs, sys, re

infile = codecs.open(sys.argv[1], "r", "utf-8")
data = infile.read()
regex = re.compile(sys.argv[2], re.DOTALL | re.MULTILINE)
data	= re.sub(regex,sys.argv[3],data)

outfile = codecs.open(sys.argv[1], 'w+', "utf-8")
outfile.write(data)
outfile.close()