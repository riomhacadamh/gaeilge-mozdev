#   Copyright 2004 Kevin P. Scannell
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
# overview:
#
#  New firefox release:
#  Get the 5 English jar files:
#  en-US.jar, en-win.jar, en-mac.jar, en-unix.jar, US.jar,
#  stick them in a directory.   We have moznua script pointing to
#  the "current" mozilla compendium in gaeilge/gnu/mozilla/gaeilge.
#  Do "make obair.po" to build PO file for new version.  Rename to
#  firefox-x.x.ga.po and check into mozdev CVS.  Symbolically link from
#  gaeilge/gnu/gnu and add to BSONRAI, etc.
#
#  moznua and mozdist are each based fundamentally on "mozpotools" by
#  David Fraser of translate.za.org

VERSION=0.8
COMPENDIUM=firefox-$(VERSION).ga.po
CHROME=/usr/lib/MozillaFirefox/chrome
INSTALL = /bin/install -c
INSTALL_DATA = ${INSTALL} -m 644
INSTALL_PROGRAM = /bin/install -c

all dist : langpack-ga-IE.xpi

# technically need to update $(CHROME)/installed-chrome.txt
# the first time the langpack is installed (e.g. by loading xpi in browser)
install : dist
	$(INSTALL_DATA) ga-IE.jar $(CHROME)/ga-IE.jar
	$(INSTALL_DATA) ga-mac.jar $(CHROME)/ga-mac.jar
	$(INSTALL_DATA) ga-win.jar $(CHROME)/ga-win.jar
	$(INSTALL_DATA) ga-unix.jar $(CHROME)/ga-unix.jar
	$(INSTALL_DATA) IE.jar $(CHROME)/IE.jar

installweb : dist
	cp langpack-ga-IE.xpi ${HOME}/public_html/mozilla

ga-IE.jar : en-US.jar $(COMPENDIUM)
	bash moznua en-US
	bash mozdist en-US

ga-win.jar : en-win.jar $(COMPENDIUM)
	bash moznua en-win
	bash mozdist en-win

ga-mac.jar : en-mac.jar $(COMPENDIUM)
	bash moznua en-mac
	bash mozdist en-mac

ga-unix.jar : en-unix.jar $(COMPENDIUM)
	bash moznua en-unix
	bash mozdist en-unix

IE.jar : US.jar $(COMPENDIUM)
	bash moznua US
	bash mozdist US

langpack-ga-IE.xpi : ga-IE.jar ga-win.jar ga-mac.jar ga-unix.jar IE.jar 
	rm -Rf bin sp
	mkdir bin sp bin/chrome bin/defaults bin/defaults/profile bin/defaults/profile/IE
	cat bookmarks-ga.html | iconv -f iso88591 -t utf8 > bin/defaults/profile/IE/bookmarks.html
	cp -R eile bin/defaults/profile/IE
	cp ga-IE.jar bin/chrome
	cp ga-mac.jar bin/chrome
	cp ga-unix.jar bin/chrome
	cp ga-win.jar bin/chrome
	cp IE.jar bin/chrome
	zip -r langpack-ga-IE.zip install.js bin/ sp/
	mv -f langpack-ga-IE.zip langpack-ga-IE.xpi
	rm -Rf bin sp

clean :
	rm -f ga-IE.jar ga-mac.jar ga-win.jar ga-unix.jar IE.jar langpack-ga-IE.xpi
	rm -R locale

###########################################################################
#   rest relates to maintenance/updates                                   #
###########################################################################
#  extracts PO's from existing English/Irish corresponding pair of jars.
#  Now defunct, since this builds compendium right from jar file, but
# the jar file is built directly from an existing compendium for that release!
mozcomp.po : FORCE
	bash mozcomp en-US
	bash mozcomp en-win
	bash mozcomp en-mac
	bash mozcomp en-unix
	bash mozcomp US
	msgcat ga-IE.po ga-win.po ga-mac.po ga-unix.po IE.po > mozcomp.po

FORCE :

##########################################################################
#   For 0.8 only had to make obair.po once; that was when I was using
#  a compendium extracted from MOZILLA-L archives in moznua; it didn't
#  have all strings and had no "comments".    This target did the 
#   translation based on that compendium and then msgcatted the POs
#  to create a new, cleaner, compendium
obair.po : FORCE
	bash moznua en-US
	bash mozcat en-US
	bash moznua en-win
	bash mozcat en-win
	bash moznua en-mac
	bash mozcat en-mac
	bash moznua en-unix
	bash mozcat en-unix
	bash moznua US
	bash mozcat US
	msgcat ga-IE.po ga-win.po ga-mac.po ga-unix.po IE.po > obair.po
	rm -f ga-IE.po ga-win.po ga-mac.po ga-unix.po IE.po
