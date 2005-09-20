#   Copyright 2004 Kevin P. Scannell
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
#  moznua and mozdist rely on the "translate" python tools written by
#  David Fraser of translate.za.org

#  these vars are needed both for the install AND for the translation
#  process (including build of obair.po during newrelease)
#VERSION=trunk
#CVSDIREC=moz
#VERSION=1.5
#CVSDIREC=moz1.8
VERSION=1.5
CVSDIREC=moz1.8
##################################
CVSFULLPATH=${HOME}/seal/$(CVSDIREC)/l10n/ga-IE
COMPENDIUM=firefox-$(VERSION).ga.po
TBCOMPENDIUM=tbird-$(VERSION).ga.po
UTFCOMP=mozilla-$(VERSION).po
PARALLEL = ${HOME}/gaeilge/diolaim/comp

all : browser-ga-IE.jar toolkit-ga-IE.jar netwerk-ga-IE.jar dom-ga-IE.jar other-licenses-ga-IE.jar security-ga-IE.jar extensions-ga-IE.jar editor-ga-IE.jar mail-ga-IE.jar
	- perl -w compare-locales.pl toolkit-en-US toolkit-ga-IE
	- perl -w compare-locales.pl extensions-en-US extensions-ga-IE
	- perl -w compare-locales.pl netwerk-en-US netwerk-ga-IE
	- perl -w compare-locales.pl dom-en-US dom-ga-IE
	- perl -w compare-locales.pl browser-en-US browser-ga-IE
	- perl -w compare-locales.pl other-licenses-en-US other-licenses-ga-IE
	- perl -w compare-locales.pl security-en-US security-ga-IE
	- perl -w compare-locales.pl editor-en-US editor-ga-IE
	- perl -w compare-locales.pl mail-en-US mail-ga-IE

$(UTFCOMP) : $(COMPENDIUM) $(TBCOMPENDIUM)
	rm -f $(UTFCOMP)
	msgcat --use-first $(COMPENDIUM) $(TBCOMPENDIUM) | iconv -f iso-8859-1 -t utf-8 | sed '/^"Content-Type: /s/ISO-8859-1/UTF-8/' > $(UTFCOMP)
	chmod 444 $(UTFCOMP)

browser-ga-IE.jar : $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozdist browser-en-US $(CVSFULLPATH)

dom-ga-IE.jar : $(UTFCOMP)
	bash moznua dom-en-US $(VERSION)
	bash mozdist dom-en-US $(CVSFULLPATH)

extensions-ga-IE.jar : $(UTFCOMP)
	bash moznua extensions-en-US $(VERSION)
	bash mozdist extensions-en-US $(CVSFULLPATH)

netwerk-ga-IE.jar : $(UTFCOMP)
	bash moznua netwerk-en-US $(VERSION)
	bash mozdist netwerk-en-US $(CVSFULLPATH)

toolkit-ga-IE.jar : $(UTFCOMP)
	bash moznua toolkit-en-US $(VERSION)
	bash mozdist toolkit-en-US $(CVSFULLPATH)

other-licenses-ga-IE.jar : $(UTFCOMP)
	bash moznua other-licenses-en-US $(VERSION)
	bash mozdist other-licenses-en-US $(CVSFULLPATH)

security-ga-IE.jar : $(UTFCOMP)
	bash moznua security-en-US $(VERSION)
	bash mozdist security-en-US $(CVSFULLPATH)

editor-ga-IE.jar : $(UTFCOMP)
	bash moznua editor-en-US $(VERSION)
	bash mozdist editor-en-US $(CVSFULLPATH)

mail-ga-IE.jar : $(UTFCOMP)
	bash moznua mail-en-US $(VERSION)
	bash mozdist mail-en-US $(CVSFULLPATH)

topwords : FORCE
	cat /usr/local/share/crubadan/ga/FREQ | sed 's/^ *[0-9]* //' | sed '1000,$$d' > ./freqtemp.txt
	cat $(PARALLEL)/firefox | tokenize | keepif /usr/local/share/crubadan/ga/GLAN latin-1 | keepif -n freqtemp.txt latin-1 | mutate -d | tr "[:upper:]" "[:lower:]" | sort | uniq -c | sort -r -n | egrep -v ' [123] ' | sed 's/^ *[0-9]* //' | sort -u | keepif /usr/local/share/crubadan/ga/GLAN latin-1
	rm -f ./freqtemp.txt

pcorpus : FORCE
	cat installer-en.inc | sed -n '/^#define/{s/^#define [^ ]* //; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/ffinstaller-b
	cat installer-ga.inc | sed -n '/^#define/{s/^#define [^ ]* //; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/ffinstaller
	cat tb-installer-en.inc | sed -n '/=/{s/^[^=]*=//; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/tbinstaller-b
	cat tb-installer-ga.inc | sed -n '/=/{s/^[^=]*=//; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/tbinstaller


clean :
	rm -f *ga-*.jar IE.jar langpack-ga-IE.xpi $(UTFCOMP) obair.po tb_obair.po
	rm -fR langpack-build-dir

###########################################################################
#   rest relates to maintenance/updates                                   #
###########################################################################

obair.po : FORCE
	rm -f $(UTFCOMP)
	$(MAKE) $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozcat browser-en-US
	bash moznua dom-en-US $(VERSION)
	bash mozcat dom-en-US
	bash moznua extensions-en-US $(VERSION)
	bash mozcat extensions-en-US
	bash moznua netwerk-en-US $(VERSION)
	bash mozcat netwerk-en-US
	bash moznua toolkit-en-US $(VERSION)
	bash mozcat toolkit-en-US
	bash moznua other-licenses-en-US $(VERSION)
	bash mozcat other-licenses-en-US
	bash moznua security-en-US $(VERSION)
	bash mozcat security-en-US
	bash moznua editor-en-US $(VERSION)
	bash mozcat editor-en-US
	bash moznua mail-en-US $(VERSION)
	bash mozcat mail-en-US
	msgcat -t iso-8859-1 browser-ga-IE.po dom-ga-IE.po extensions-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po | tr '\007' '!' | sed '/^msgid "Norwegian Bok/s/.*/msgid "Norwegian Bokmål"/; /^msgid "!"/s/.*/msgid "\\\\u0007"/; /msgid "Volap/s/.*/msgid "Volapük"/; /msgid ".Spx /s/ .. / × /; /browser-ga-IE.po/,/security-ga-IE.po/d; /^.Project-Id/s/thunderbird/firefox/; /trunk.ga.po/d; 1s/^#, fuzzy//' > obair.po
	msgcat -t iso-8859-1 editor-ga-IE.po mail-ga-IE.po | sed '/trunk.ga.po/d' > tb_obair.po
	sed -i 's/msgstr "Staid"/msgstr "Stát"/' tb_obair.po
	sed -i 's/msgstr "is"/msgstr "atá"/' tb_obair.po
#	rm -f browser-ga-IE.po dom-ga-IE.po extensions-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po editor-ga-IE.po mail-ga-IE.po

FORCE :
