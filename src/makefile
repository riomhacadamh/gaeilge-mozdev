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
VERSION=trunk
CVSDIREC=moz-2.0
##################################
HGFULLPATH=${HOME}/seal/$(CVSDIREC)/ga-IE
GDFULLPATH=${HOME}/seal/$(CVSDIREC)/gd-GB
COMPENDIUM=firefox-$(VERSION).ga.po
TBCOMPENDIUM=tbird-$(VERSION).ga.po
CALCOMPENDIUM=calendar-$(VERSION).ga.po
UTFCOMP=mozilla-$(VERSION).po
PARALLEL = ${HOME}/gaeilge/diolaim/comp

# retranslate (moznua) all English source files into Irish and copy to 
# the correct mercurial repo (mozdist)
all : $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozdist browser-en-US $(HGFULLPATH)
	bash moznua dom-en-US $(VERSION)
	bash mozdist dom-en-US $(HGFULLPATH)
	bash moznua netwerk-en-US $(VERSION)
	bash mozdist netwerk-en-US $(HGFULLPATH)
	bash moznua toolkit-en-US $(VERSION)
	bash mozdist toolkit-en-US $(HGFULLPATH)
	bash moznua other-licenses-en-US $(VERSION)
	bash mozdist other-licenses-en-US $(HGFULLPATH)
	bash moznua security-en-US $(VERSION)
	bash mozdist security-en-US $(HGFULLPATH)
	bash moznua services-en-US $(VERSION)
	bash mozdist services-en-US $(HGFULLPATH)
	bash moznua embedding-en-US $(VERSION)
	bash mozdist embedding-en-US $(HGFULLPATH)
	bash moznua mobile-en-US $(VERSION)
	bash mozdist mobile-en-US $(HGFULLPATH)
	bash moznua editor-en-US $(VERSION)
	bash mozdist editor-en-US $(HGFULLPATH)
	bash moznua mail-en-US $(VERSION)
	bash mozdist mail-en-US $(HGFULLPATH)
	bash moznua calendar-en-US $(VERSION)
	bash mozdist calendar-en-US $(HGFULLPATH)
	- perl -w compare-locales.pl toolkit-en-US toolkit-ga-IE
	- perl -w compare-locales.pl netwerk-en-US netwerk-ga-IE
	- perl -w compare-locales.pl dom-en-US dom-ga-IE
	- perl -w compare-locales.pl browser-en-US browser-ga-IE
	- perl -w compare-locales.pl other-licenses-en-US other-licenses-ga-IE
	- perl -w compare-locales.pl security-en-US security-ga-IE
	- perl -w compare-locales.pl services-en-US services-ga-IE
	- perl -w compare-locales.pl embedding-en-US embedding-ga-IE
	- perl -w compare-locales.pl editor-en-US editor-ga-IE
	- perl -w compare-locales.pl mail-en-US mail-ga-IE
	- perl -w compare-locales.pl calendar-en-US calendar-ga-IE
	- perl -w compare-locales.pl mobile-en-US mobile-ga-IE

$(UTFCOMP) : $(COMPENDIUM) $(TBCOMPENDIUM) $(CALCOMPENDIUM)
	rm -f $(UTFCOMP)
	msgcat --use-first $(COMPENDIUM) $(TBCOMPENDIUM) $(CALCOMPENDIUM) > $(UTFCOMP)
	chmod 444 $(UTFCOMP)


topwords : FORCE
	cat /usr/local/share/crubadan/ga/FREQ | sed 's/^ *[0-9]* //' | sed '1000,$$d' > ./freqtemp.txt
	cat $(PARALLEL)/firefox | togail ga token | keepif ${HOME}/gaeilge/ispell/ispell-gaeilge/aspell.txt | keepif -n freqtemp.txt | mutate -d | tr "[:upper:]" "[:lower:]" | sort | uniq -c | sort -r -n | egrep -v ' [123] ' | sed 's/^ *[0-9]* //' | sort -u | keepif ${HOME}/gaeilge/ispell/ispell-gaeilge/aspell.txt
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
	rm -f *ga-*.jar IE.jar langpack-ga-IE.xpi $(UTFCOMP) obair.po tb_obair.po cal_obair.po mozilla-trunk.po mozilla-?.?.po *ga-IE.po
	rm -fR langpack-build-dir
	rm -f messages.po amo.pot amo-final.po amo-final.mo amo-obair.mo
	rm -Rf gatemp

distclean :
	$(MAKE) clean
	rm -Rf browser-en-US dom-en-US extensions-en-US netwerk-en-US toolkit-en-US other-licenses-en-US security-en-US editor-en-US mail-en-US calendar-en-US mobile-en-US services-en-US embedding-en-US
	rm -Rf browser-ga-IE dom-ga-IE extensions-ga-IE netwerk-ga-IE toolkit-ga-IE other-licenses-ga-IE security-ga-IE editor-ga-IE mail-ga-IE calendar-ga-IE mobile-ga-IE services-ga-IE embedding-ga-IE
	rm -Rf browser-ga-IEpo dom-ga-IEpo extensions-ga-IEpo netwerk-ga-IEpo toolkit-ga-IEpo other-licenses-ga-IEpo security-ga-IEpo editor-ga-IEpo mail-ga-IEpo calendar-ga-IEpo mobile-ga-IEpo services-ga-IEpo embedding-ga-IEpo
	rm -f browser-ga-IE.po dom-ga-IE.po extensions-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po editor-ga-IE.po mail-ga-IE.po calendar-ga-IE.po mobile-ga-IE.po services-ga-IE.po embedding-ga-IE.po

###########################################################################
#   rest relates to maintenance/updates                                   #
###########################################################################

# To update AMO site;
# make messages.po-update
# make amo-obair.po
# translate anything missing
# make amodiff
# If diff looks OK, 
# make amo-commit
# Then commit to local repo: cvs commit amo-obair.po, with comment giving
# untranslated count, etc.

messages.po-update : FORCE
	rm -f messages.po
	wget http://svn.mozilla.org/addons/trunk/site/app/locale/en_US/LC_MESSAGES/messages.po

# used to do "perl AMOfake mstripped.po" when messages.po had
# weird structure with "codes" in msgid and English in msgstrs
amo.pot : messages.po
	cat messages.po | sed '/^#~/,$$d' > mstripped.po
	po2pot mstripped.po > $@
	rm -f mstripped.po

amo-obair.po : amo.pot
	cpo -q amo-obair.po
	msgmerge -N -q --backup=off -U $@ amo.pot > /dev/null 2>&1
	cpo -q amo-obair.po
	touch $@

SVNDIR=/home/kps/seal/amo/ga_IE/LC_MESSAGES
# used to do "perl AMOback mstripped.po" when messages.po had
# weird structure with "codes" in msgid and English in msgstrs
# amo-final.po : amo-obair.po
#	cat amo-obair.po | sed '/^#~/,$$d' > mstripped.po
#	perl AMOback mstripped.po | sed '/^msgctxt/d' > $@
#	rm -f mstripped.po
#	-diff -u $(SVNDIR)/messages.po $@
#	chmod 644 $@

amodiff : FORCE
	-diff -u $(SVNDIR)/messages.po amo-obair.po

amo-obair.mo : amo-obair.po
	msgfmt -o $@ amo-obair.po

amo-javascript.mo : amo-javascript.po
	msgfmt -o $@ amo-javascript.po

amo-commit : amo-obair.mo amo-javascript.mo
	svn update $(SVNDIR)/messages.po $(SVNDIR)/messages.mo $(SVNDIR)/javascript.po $(SVNDIR)/javascript.mo
	msgcat -t UTF-8 amo-obair.po > $(SVNDIR)/messages.po
	msgcat -t UTF-8 amo-javascript.po > $(SVNDIR)/javascript.po
	cp -f amo-obair.mo $(SVNDIR)/messages.mo
	cp -f amo-javascript.mo $(SVNDIR)/javascript.mo
	svn commit -m "Updated Irish translation" $(SVNDIR)/messages.po $(SVNDIR)/messages.mo $(SVNDIR)/javascript.po $(SVNDIR)/javascript.mo

# only made from inside the "newrelease" scripts, so ok to FORCE
obair.po : FORCE
	$(MAKE) $(UTFCOMP)
	bash moznua browser-en-US $(VERSION)
	bash mozcat browser-en-US
	bash moznua calendar-en-US $(VERSION)
	bash mozcat calendar-en-US
	bash moznua dom-en-US $(VERSION)
	bash mozcat dom-en-US
	bash moznua netwerk-en-US $(VERSION)
	bash mozcat netwerk-en-US
	bash moznua toolkit-en-US $(VERSION)
	bash mozcat toolkit-en-US
	bash moznua other-licenses-en-US $(VERSION)
	bash mozcat other-licenses-en-US
	bash moznua security-en-US $(VERSION)
	bash mozcat security-en-US
	bash moznua services-en-US $(VERSION)
	bash mozcat services-en-US
	bash moznua embedding-en-US $(VERSION)
	bash mozcat embedding-en-US
	bash moznua editor-en-US $(VERSION)
	bash mozcat editor-en-US
	bash moznua mail-en-US $(VERSION)
	bash mozcat mail-en-US
	bash moznua mobile-en-US $(VERSION)
	bash mozcat mobile-en-US
	msgcat browser-ga-IE.po dom-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po mobile-ga-IE.po embedding-ga-IE.po services-ga-IE.po | sed '1,/^#\..*sync.properties$$/d; /browser-ga-IE.po.*\\n"$$/,/services-ga-IE.po.*\\n"$$/d; 1,3d; /^.Project-Id/s/thunderbird/firefox/' > obair.po
	sed -i '/Download & Install Now/{N; s/msgstr ""/msgstr "Íosluchtaigh agus Suiteáil Anois >>"/}; /Get the new version /{N; s/msgstr ""/msgstr "Faigh an leagan nua >>"/}' obair.po
	msgcat editor-ga-IE.po mail-ga-IE.po | sed '/trunk.ga.po/d' > tb_obair.po
	sed -i 's/msgstr "39em"/msgstr "47em"/; s/msgstr "43em"/msgstr "51em"/; s/msgstr "Firefox Soghluaiste"/msgstr "Fón Póca"/; s/msgstr "Staid"/msgstr "Stát"/; s/msgstr "is"/msgstr "atá"/; s/msgstr "go"/msgstr "chuig"/; s/msgstr "G&reamaigh"/msgstr "Grea\&maigh"/; s/msgstr "&Scoir"/msgstr "S\&coir"/; s/msgstr "Ionchódú &Carachtar"/msgstr "Ionchódú Ca\&rachtar"/; s/msgstr "Socrú &Leathanaigh..."/msgstr "Socrú L\&eathanaigh..."/' tb_obair.po
	sed -i '1,/^"Project-Id-Version: /d' tb_obair.po
	sed -i '1s/.*/msgid ""\nmsgstr ""\n"Project-Id-Version: thunderbird\\n"\n&/' tb_obair.po
#	sed -i '3,/updaterupdater.ini.po.*\\n"$$/d' tb_obair.po
	msgcat calendar-ga-IE.po > cal_obair.po
	sed -i 's/msgstr "End"/msgstr "Críoch"/; s/msgstr "Chuig"/msgstr "Go"/; s/msgstr "lá anuas"/msgstr "lá"/; s/msgstr "seachtain anuas"/msgstr "seachtain"/; s/msgstr "mí anuas"/msgstr "mí"/' cal_obair.po
	sed -i '1,/^"Project-Id-Version: /d' cal_obair.po
	sed -i '1s/.*/msgid ""\nmsgstr ""\n"Project-Id-Version: sunbird\\n"\n&/' cal_obair.po
	rm -f browser-ga-IE.po calendar-ga-IE.po dom-ga-IE.po netwerk-ga-IE.po toolkit-ga-IE.po other-licenses-ga-IE.po security-ga-IE.po editor-ga-IE.po mail-ga-IE.po mobile-ga-IE.po services-ga-IE.po embedding-ga-IE.po

FORCE :
