#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2007-2008 Burglish Systems
# http://code.google.com/p/burglish/
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 2 as
# published by the Free Software Foundation;
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
#

from burglish_gen import BurglishGen

class burgilshgen:

    def __init__(self):
        print "__init__"

if __name__ == '__main__':
    print "Burglish_src.js compiled to burglish.h & burglish.cpp"
    burmese = BurglishGen()
    burmese.__cplusplusgen__()
