#   Copyright 2004 Kevin P. Scannell
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
# overview:
#
#  New firefox release:
#  Check out latest version of English-US from CVS; see
#  $ cd ~/gaeilge/gnu/mozilla
#  $ cvs update -r AVIARY_1_0_20040515_BRANCH mozilla/toolkit/locales
#  $ cvs update -r AVIARY_1_0_20040515_BRANCH mozilla/browser/locales
#  $ cd mozilla/toolkit/locales
#  $ cp -Rf en-US ~/gaeilge/gnu/mozilla/gaeilge/src/toolkit-en-US
#  $ cd ../../browser/locales
#  $ cp -Rf en-US ~/gaeilge/gnu/mozilla/gaeilge/src/browser-en-US
#  $ cd ~/gaeilge/gnu/mozilla/gaeilge/src
#  $ find toolkit-en-US -name 'CVS' | xargs rm -fR
#  $ find browser-en-US -name 'CVS' | xargs rm -fR
#  $ mv toolkit-en-US/chrome/global/mozilla.dtd .
#     and compare the translatable strings with eile-tk/chrome/global version
#  Next:
#   Comment out the pofake+mv in moznua, rebuild UTFCOMP without Pofake
#   and then:
#  Do "make obair.po" to build PO file for new version (leave VERSION
#  variable below pointing to the current compendium, i.e. don't update
#  to new version number until after the "make obair.po".  Rename obair.po to
#  firefox-x.x.ga.po and check into mozdev CVS.  Symbolically link from
#  gaeilge/gnu/gnu and add to BSONRAI, etc.  Now update VERSION.
#  Put pofakes back in moznua and UTFCOMP target below
#
#  It is critical to translate anything with a leading "_" since those
#  will be Pofaked as-is, including the comment...
#
#  moznua and mozdist rely on the "translate" python tools written by
#  David Fraser of translate.za.org

VERSION=1.0.1
COMPENDIUM=firefox-$(VERSION).ga.po
UTFCOMP=firefox-$(VERSION).po
CHROME=/usr/lib/MozillaFirefox/chrome
INSTALL = /bin/install -c
INSTALL_DATA = $(INSTALL) -m 644
INSTALL_PROGRAM = /bin/install -c
PARALLEL = ${HOME}/gaeilge/diolaim/comp

all : browser-ga-IE.jar toolkit-ga-IE.jar
	- perl -w compare-locales.pl toolkit-en-US toolkit-ga-IE
	- perl -w compare-locales.pl browser-en-US browser-ga-IE

install : all
	bash xpiscr
	$(INSTALL_DATA) langpack-build-dir/langpack-ga-IE.xpi ${HOME}/public_html/mozilla
#	cp -f langpack-build-dir/langpack-ga-IE.xpi ../downloads
#	vim ../www/installation.html

$(UTFCOMP) : $(COMPENDIUM)
	rm -f $(UTFCOMP)
#	cat $(COMPENDIUM) | msgcat - > firefox-temp.po
	Pofake $(COMPENDIUM) | msgcat - > firefox-temp.po
	iconv -f iso-8859-1 -t utf8 firefox-temp.po | sed '/^"Content-Type: /s/ISO-8859-1/UTF-8/' > $(UTFCOMP)
	chmod 444 $(UTFCOMP)
	rm -f firefox-temp.po

browser-ga-IE.jar : $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozdist browser-en-US

toolkit-ga-IE.jar : $(UTFCOMP)
	bash moznua toolkit-en-US $(VERSION)
	bash mozdist toolkit-en-US

cvsdiff : FORCE
	- diff -u -r browser-en-US $(HOME)/gaeilge/gnu/mozilla/mozilla/browser/locales/en-US | egrep -v '^Only in .*: CVS$$'
	- diff -u -r toolkit-en-US $(HOME)/gaeilge/gnu/mozilla/mozilla/toolkit/locales/en-US | egrep -v '^Only in .*: CVS$$' | egrep -v '^Only in .*: mozilla.dtd$$'
	- diff -u eile-tk/chrome/global/mozilla.dtd $(HOME)/gaeilge/gnu/mozilla/mozilla/toolkit/locales/en-US/chrome/global/mozilla.dtd
	- diff -u installer-en.inc $(HOME)/gaeilge/gnu/mozilla/mozilla/browser/locales/en-US/installer/installer.inc

gram : FORCE
	cat $(PARALLEL)/firefox | sed 's/$$/./' | tr -d '&' | gram-ga.pl --aschod=iso-8859-1

topwords : FORCE
	cat /usr/local/share/crubadan/ga/FREQ | sed 's/^ *[0-9]* //' | sed '1000,$$d' > ./freqtemp.txt
	cat $(PARALLEL)/firefox | tokenize | keepif /usr/local/share/crubadan/ga/GLAN latin-1 | keepif -n freqtemp.txt latin-1 | mutate -d | tr "[:upper:]" "[:lower:]" | sort | uniq -c | sort -r -n | egrep -v ' [123] ' | sed 's/^ *[0-9]* //' | sort -u | keepif /usr/local/share/crubadan/ga/GLAN latin-1
	rm -f ./freqtemp.txt

pcorpus : FORCE
	cat installer-en.inc | sed -n '/^#define/{s/^#define [^ ]* //; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/ffinstaller-b
	cat installer-ga.inc | sed -n '/^#define/{s/^#define [^ ]* //; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/ffinstaller


clean :
	rm -f *ga-*.jar IE.jar langpack-ga-IE.xpi $(UTFCOMP) obair.po
	rm -fR langpack-build-dir

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
#############################################################################
#   this was never used -- bsmedberg script for converting 0.9* jar files
#   to the new format.   Not really helpful since it just sets up new
#   directory structure but doesn't use the 1.0* jars to ensure the
#   correct messages are in the *.dtd, *.properties files; one is forced
#   to use the "compare" script to manually merge.   Better to just do the
#   PO thing...
repackageit : ga-win.jar ga-mac.jar ga-unix.jar IE.jar ga-IE.jar
	rm -fR temp
	mkdir temp
	cp ga*.jar temp
	cp IE.jar temp
	(cd temp; perl -w ../repackage-0.9.pl ga-IE)
	mv temp/browser-ga-IE.zip ./browser-ga-IE.jar
	mv temp/toolkit-ga-IE.zip ./toolkit-ga-IE.jar
	rm -fR temp

#  Next batch are the defunct 0.8/0.9 jar files
ga-IE.jar : en-US.jar $(COMPENDIUM)
	bash moznua en-US $(VERSION)
	bash mozdist en-US

ga-win.jar : en-win.jar $(COMPENDIUM)
	bash moznua en-win $(VERSION)
	bash mozdist en-win

ga-mac.jar : en-mac.jar $(COMPENDIUM)
	bash moznua en-mac $(VERSION)
	bash mozdist en-mac

ga-unix.jar : en-unix.jar $(COMPENDIUM)
	bash moznua en-unix $(VERSION)
	bash mozdist en-unix

IE.jar : US.jar $(COMPENDIUM)
	bash moznua US $(VERSION)
	bash mozdist US

# 0.8 and 0.9 xpi format only; defunct now
langpack-ga-IE.old.xpi : ga-win.jar ga-mac.jar ga-unix.jar IE.jar ga-IE.jar
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

# technically need to update $(CHROME)/installed-chrome.txt
# the first time the langpack is installed (e.g. by loading xpi in browser)
installold : all
	$(INSTALL_DATA) ga-IE.jar $(CHROME)/ga-IE.jar
	$(INSTALL_DATA) ga-mac.jar $(CHROME)/ga-mac.jar
	$(INSTALL_DATA) ga-win.jar $(CHROME)/ga-win.jar
	$(INSTALL_DATA) ga-unix.jar $(CHROME)/ga-unix.jar
	$(INSTALL_DATA) IE.jar $(CHROME)/IE.jar

obair.po : FORCE
	bash moznua browser-en-US $(VERSION)
	bash mozcat browser-en-US
	bash moznua toolkit-en-US $(VERSION)
	bash mozcat toolkit-en-US
	msgcat -t iso-8859-1 browser-ga-IE.po toolkit-ga-IE.po > obair.po
	rm -f browser-ga-IE.po toolkit-ga-IE.po
