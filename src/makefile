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
VERSION=trunk
CVSDIREC=moz
##################################
HGFULLPATH=${HOME}/seal/$(CVSDIREC)/ga-IE
COMPENDIUM=firefox-$(VERSION).ga.po
TBCOMPENDIUM=tbird-$(VERSION).ga.po
CALCOMPENDIUM=calendar-$(VERSION).ga.po
UTFCOMP=mozilla-$(VERSION).po
PARALLEL = ${HOME}/gaeilge/diolaim/comp

all : browser-ga-IE.jar toolkit-ga-IE.jar netwerk-ga-IE.jar dom-ga-IE.jar other-licenses-ga-IE.jar security-ga-IE.jar extensions-ga-IE.jar editor-ga-IE.jar mail-ga-IE.jar calendar-ga-IE.jar
	- perl -w compare-locales.pl toolkit-en-US toolkit-ga-IE
	- perl -w compare-locales.pl extensions-en-US extensions-ga-IE
	- perl -w compare-locales.pl netwerk-en-US netwerk-ga-IE
	- perl -w compare-locales.pl dom-en-US dom-ga-IE
	- perl -w compare-locales.pl browser-en-US browser-ga-IE
	- perl -w compare-locales.pl other-licenses-en-US other-licenses-ga-IE
	- perl -w compare-locales.pl security-en-US security-ga-IE
	- perl -w compare-locales.pl editor-en-US editor-ga-IE
	- perl -w compare-locales.pl mail-en-US mail-ga-IE
	- perl -w compare-locales.pl calendar-en-US calendar-ga-IE

$(UTFCOMP) : $(COMPENDIUM) $(TBCOMPENDIUM) $(CALCOMPENDIUM)
	rm -f $(UTFCOMP)
#	msgcat --use-first $(COMPENDIUM) $(TBCOMPENDIUM) $(CALCOMPENDIUM) | iconv -f iso-8859-1 -t utf-8 | sed '/^"Content-Type: /s/ISO-8859-1/UTF-8/' > $(UTFCOMP)
	msgcat --use-first $(COMPENDIUM) $(TBCOMPENDIUM) $(CALCOMPENDIUM) > $(UTFCOMP)
	chmod 444 $(UTFCOMP)

browser-ga-IE.jar : $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozdist browser-en-US $(HGFULLPATH)

dom-ga-IE.jar : $(UTFCOMP)
	bash moznua dom-en-US $(VERSION)
	bash mozdist dom-en-US $(HGFULLPATH)

extensions-ga-IE.jar : $(UTFCOMP)
	bash moznua extensions-en-US $(VERSION)
	bash mozdist extensions-en-US $(HGFULLPATH)

netwerk-ga-IE.jar : $(UTFCOMP)
	bash moznua netwerk-en-US $(VERSION)
	bash mozdist netwerk-en-US $(HGFULLPATH)

toolkit-ga-IE.jar : $(UTFCOMP)
	bash moznua toolkit-en-US $(VERSION)
	bash mozdist toolkit-en-US $(HGFULLPATH)

other-licenses-ga-IE.jar : $(UTFCOMP)
	bash moznua other-licenses-en-US $(VERSION)
	bash mozdist other-licenses-en-US $(HGFULLPATH)

security-ga-IE.jar : $(UTFCOMP)
	bash moznua security-en-US $(VERSION)
	bash mozdist security-en-US $(HGFULLPATH)

editor-ga-IE.jar : $(UTFCOMP)
	bash moznua editor-en-US $(VERSION)
	bash mozdist editor-en-US $(HGFULLPATH)

mail-ga-IE.jar : $(UTFCOMP)
	bash moznua mail-en-US $(VERSION)
	bash mozdist mail-en-US $(HGFULLPATH)

calendar-ga-IE.jar : $(UTFCOMP)
	bash moznua calendar-en-US $(VERSION)
	bash mozdist calendar-en-US $(HGFULLPATH)

topwords : FORCE
	cat /usr/local/share/crubadan/ga/FREQ | sed 's/^ *[0-9]* //' | sed '1000,$$d' > ./freqtemp.txt
	cat $(PARALLEL)/firefox | tokenize | keepif ${HOME}/gaeilge/ispell/ispell-gaeilge/aspell.txt latin-1 | keepif -n freqtemp.txt latin-1 | mutate -d | tr "[:upper:]" "[:lower:]" | sort | uniq -c | sort -r -n | egrep -v ' [123] ' | sed 's/^ *[0-9]* //' | sort -u | keepif ${HOME}/gaeilge/ispell/ispell-gaeilge/aspell.txt latin-1
	rm -f ./freqtemp.txt

pcorpus : FORCE
	cat installer-en.inc | sed -n '/^#define/{s/^#define [^ ]* //; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/ffinstaller-b
	cat installer-ga.inc | sed -n '/^#define/{s/^#define [^ ]* //; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/ffinstaller
	cat tb-installer-en.inc | sed -n '/=/{s/^[^=]*=//; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/tbinstaller-b
	cat tb-installer-ga.inc | sed -n '/=/{s/^[^=]*=//; s/&//; p}' | egrep -n '.' | sed 's/:/: /' > $(PARALLEL)/tbinstaller

eilecheck : FORCE
	(cd eile; find . -type f | while read x; do if [ -e ../browser-en-US/$$x ]; then if ! diff  -u $$x ../browser-en-US/$$x > /dev/null; then echo "+++++++ $$x differs from en-US version ++++++++"; diff -u $$x ../browser-en-US/$$x; echo; echo; fi; fi; done)
	(cd eile-tk; find . -type f | egrep -v 'installer' | while read x; do if [ -e ../toolkit-en-US/$$x ]; then if ! diff  -u $$x ../toolkit-en-US/$$x > /dev/null; then echo "+++++++ $$x differs from en-US version ++++++++"; diff -u $$x ../toolkit-en-US/$$x; echo; echo; fi; fi; done)


clean :
	rm -f *ga-*.jar IE.jar langpack-ga-IE.xpi $(UTFCOMP) obair.po tb_obair.po cal_obair.po mozilla-trunk.po mozilla-1.5.po
	rm -fR langpack-build-dir
	rm -f messages.po amo.pot amo-final.po amo-final.mo

distclean :
	$(MAKE) clean
	rm -Rf browser-en-US dom-en-US extensions-en-US netwerk-en-US toolkit-en-US other-licenses-en-US security-en-US editor-en-US mail-en-US calendar-en-US
	rm -Rf browser-ga-IE dom-ga-IE extensions-ga-IE netwerk-ga-IE toolkit-ga-IE other-licenses-ga-IE security-ga-IE editor-ga-IE mail-ga-IE calendar-ga-IE
	rm -Rf browser-ga-IEpo dom-ga-IEpo extensions-ga-IEpo netwerk-ga-IEpo toolkit-ga-IEpo other-licenses-ga-IEpo security-ga-IEpo editor-ga-IEpo mail-ga-IEpo calendar-ga-IEpo
	rm -f browser-ga-IE.po dom-ga-IE.po extensions-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po editor-ga-IE.po mail-ga-IE.po calendar-ga-IE.po

###########################################################################
#   rest relates to maintenance/updates                                   #
###########################################################################

# To update AMO site;
# make messages.po-update
# make amo-obair.po
# translate anything missing
# make amo-final.mo
# If diff looks OK, 
# make amo-commit

messages.po-update : FORCE
	rm -f messages.po
	wget http://svn.mozilla.org/addons/trunk/site/app/locale/en_US/LC_MESSAGES/messages.po

amo.pot : messages.po
	cat messages.po | sed '/^#~/,$$d' > mstripped.po
	perl AMOfake mstripped.po > $@
	rm -f mstripped.po

amo-obair.po : amo.pot
	cpo -q amo-obair.po
	msgmerge -N -q --backup=off -U $@ amo.pot > /dev/null 2>&1
	cpo -q amo-obair.po
	touch $@

SVNDIR=/home/kps/seal/amo/ga_IE/LC_MESSAGES
amo-final.po : amo-obair.po
	cat amo-obair.po | sed '/^#~/,$$d' > mstripped.po
	perl AMOback mstripped.po | sed '/^msgctxt/d' > $@
	rm -f mstripped.po
	-diff -u $(SVNDIR)/messages.po $@
	chmod 644 $@

amo-final.mo : amo-final.po
	msgfmt -o $@ amo-final.po

amo-commit : amo-final.mo
	svn update $(SVNDIR)/messages.po $(SVNDIR)/messages.mo
	msgcat -t UTF-8 amo-final.po > $(SVNDIR)/messages.po
	cp -f amo-final.mo $(SVNDIR)/messages.mo
	svn commit -m "Updated Irish translation" $(SVNDIR)/messages.po $(SVNDIR)/messages.mo

obair.po : FORCE
	sed -i '/tempe/s/^/#/' moznua
	rm -f $(UTFCOMP)
	$(MAKE) $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozcat browser-en-US
	bash moznua calendar-en-US $(VERSION)
	bash mozcat calendar-en-US
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
	msgcat browser-ga-IE.po dom-ga-IE.po extensions-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po | tr '\007' '!' | sed '/^msgid "Norwegian Bok/s/.*/msgid "Norwegian Bokmål"/; /^msgid "!"/s/.*/msgid "\\\\u0007"/; /msgid "Volap/s/.*/msgid "Volapük"/; /msgid ".Spx /s/ .. / × /; /browser-ga-IE.po/,/security-ga-IE.po/d; /^.Project-Id/s/thunderbird/firefox/; /trunk.ga.po/d; 1s/^#, fuzzy//' > obair.po
	sed -i '/Download & Install Now/{N; s/msgstr ""/msgstr "Íosluchtaigh agus Suiteáil Anois >>"/}; /Get the new version /{N; s/msgstr ""/msgstr "Faigh an leagan nua >>"/}' obair.po
	msgcat editor-ga-IE.po mail-ga-IE.po | sed '/trunk.ga.po/d' > tb_obair.po
	sed -i 's/msgstr "Staid"/msgstr "Stát"/; s/msgstr "is"/msgstr "atá"/; s/msgstr "go"/msgstr "chuig"/; s/msgstr "G&reamaigh"/msgstr "Grea\&maigh"/; s/msgstr "&Scoir"/msgstr "S\&coir"/; s/msgstr "Ionchódú &Carachtar"/msgstr "Ionchódú Ca\&rachtar"/; s/msgstr "Socrú &Leathanaigh..."/msgstr "Socrú L\&eathanaigh..."/' tb_obair.po
	msgcat calendar-ga-IE.po > cal_obair.po
	sed -i 's/msgstr "End"/msgstr "Críoch"/; s/msgstr "Chuig"/msgstr "Go"/; s/msgstr "lá anuas"/msgstr "lá"/; s/msgstr "seachtain anuas"/msgstr "seachtain"/; s/msgstr "mí anuas"/msgstr "mí"/' cal_obair.po
	sed -i '/tempe/s/^#//' moznua
	sed -i '1d' obair.po
#	rm -f browser-ga-IE.po dom-ga-IE.po extensions-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po editor-ga-IE.po mail-ga-IE.po

FORCE :
