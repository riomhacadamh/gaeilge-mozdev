#   Copyright 2004 Kevin P. Scannell
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
#  moznua and mozdist rely on the "translate" python tools written by
#  David Fraser of translate.za.org

VERSION=trunk
COMPENDIUM=firefox-$(VERSION).ga.po
UTFCOMP=firefox-$(VERSION).po
CHROME=/usr/lib/MozillaFirefox/chrome
INSTALL = /bin/install -c
INSTALL_DATA = $(INSTALL) -m 644
INSTALL_PROGRAM = /bin/install -c
PARALLEL = ${HOME}/gaeilge/diolaim/comp

all : browser-ga-IE.jar toolkit-ga-IE.jar netwerk-ga-IE.jar dom-ga-IE.jar
	- perl -w compare-locales.pl toolkit-en-US toolkit-ga-IE
	- perl -w compare-locales.pl netwerk-en-US netwerk-ga-IE
	- perl -w compare-locales.pl dom-en-US dom-ga-IE
	- perl -w compare-locales.pl browser-en-US browser-ga-IE

install : all
	bash xpiscr
	$(INSTALL_DATA) langpack-build-dir/langpack-ga-IE.xpi ${HOME}/public_html/mozilla
#	cp -f langpack-build-dir/langpack-ga-IE.xpi ../downloads
#	vim ../www/installation.html

$(UTFCOMP) : $(COMPENDIUM)
	rm -f $(UTFCOMP)
	cat $(COMPENDIUM) | msgcat - > firefox-temp.po
#	Pofake $(COMPENDIUM) | msgcat - > firefox-temp.po   # no need for this since moznua now does 'msgmerge -N' and then Pofake
	iconv -f iso-8859-1 -t utf8 firefox-temp.po | sed '/^"Content-Type: /s/ISO-8859-1/UTF-8/' > $(UTFCOMP)
	chmod 444 $(UTFCOMP)
	rm -f firefox-temp.po

browser-ga-IE.jar : $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozdist browser-en-US

dom-ga-IE.jar : $(UTFCOMP)
	bash moznua dom-en-US $(VERSION)
	bash mozdist dom-en-US

netwerk-ga-IE.jar : $(UTFCOMP)
	bash moznua netwerk-en-US $(VERSION)
	bash mozdist netwerk-en-US

toolkit-ga-IE.jar : $(UTFCOMP)
	bash moznua toolkit-en-US $(VERSION)
	bash mozdist toolkit-en-US

# needs updating for trunk
cvsdiff : FORCE
	- diff -u -r browser-en-US $(HOME)/gaeilge/gnu/mozilla/mozilla/browser/locales/en-US | egrep -v '^Only in .*: CVS$$'
	- diff -u -r toolkit-en-US $(HOME)/gaeilge/gnu/mozilla/mozilla/toolkit/locales/en-US | egrep -v '^Only in .*: CVS$$'
	- diff -u installer-en.inc $(HOME)/gaeilge/gnu/mozilla/mozilla/browser/locales/en-US/installer/installer.inc

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

obair.po : $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozcat browser-en-US
	bash moznua dom-en-US $(VERSION)
	bash mozcat dom-en-US
	bash moznua netwerk-en-US $(VERSION)
	bash mozcat netwerk-en-US
	bash moznua toolkit-en-US $(VERSION)
	bash mozcat toolkit-en-US
	msgcat -t iso-8859-1 browser-ga-IE.po dom-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po > obair.po
	rm -f browser-ga-IE.po dom-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po

FORCE :
