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
CVSDIREC=moz-aurora
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
	cat $(VERSION).txt | while read x; do bash moznua $$x-en-US $(VERSION); bash mozdist $$x-en-US $(HGFULLPATH); done

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
	rm -f *ga-*.jar IE.jar langpack-ga-IE.xpi $(UTFCOMP) obair.po tb_obair.po cal_obair.po mozilla-trunk.po mozilla-?.?.po *ga-IE.po amo-javascript.mo mozilla-stable.po
	rm -fR langpack-build-dir
	rm -f messages.po amo.pot amo-final.po amo-final.mo amo-obair.mo
	rm -Rf gatemp

distclean :
	$(MAKE) clean
	cat $(VERSION).txt | while read x; do rm -Rf $$x-en-US $$x-ga-IE $$x-ga-IEpo; rm -f $$x-ga-IE.po; done

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
	cat $(VERSION).txt | while read x; do bash moznua $$x-en-US $(VERSION); bash mozcat $$x-en-US; done
	cat $(VERSION).txt | egrep -v '^(calendar|editor|mail)$$' | sed 's/$$/-ga-IE.po/' | xargs msgcat | sed '1,/^#, fuzzy/d; /browser-ga-IE.po.*\\n"$$/,/toolkit-ga-IE.po.*\\n"$$/d; /^.Project-Id/s/thunderbird/firefox/' > obair.po
	sed -i '/Download & Install Now/{N; s/msgstr ""/msgstr "Íosluchtaigh agus Suiteáil Anois >>"/}; /Get the new version /{N; s/msgstr ""/msgstr "Faigh an leagan nua >>"/}' obair.po
	msgcat editor-ga-IE.po mail-ga-IE.po | sed '/trunk.ga.po/d' > tb_obair.po
	sed -i 's/msgstr "11"/msgstr "1"/; s/msgstr "39em"/msgstr "47em"/; s/msgstr "43em"/msgstr "51em"/; s/msgstr "Firefox Soghluaiste"/msgstr "Fón Póca"/; s/msgstr "Staid"/msgstr "Stát"/; s/msgstr "is"/msgstr "atá"/; s/msgstr "go"/msgstr "chuig"/; s/msgstr "G&reamaigh"/msgstr "Grea\&maigh"/; s/msgstr "&Scoir"/msgstr "S\&coir"/; s/msgstr "Ionchódú &Carachtar"/msgstr "Ionchódú Ca\&rachtar"/; s/msgstr "Socrú &Leathanaigh..."/msgstr "Socrú L\&eathanaigh..."/' tb_obair.po
	sed -i '1,/^"Project-Id-Version: /d' tb_obair.po
	sed -i '1s/.*/msgid ""\nmsgstr ""\n"Project-Id-Version: thunderbird\\n"\n&/' tb_obair.po
#	sed -i '3,/updaterupdater.ini.po.*\\n"$$/d' tb_obair.po
	msgcat calendar-ga-IE.po > cal_obair.po
	sed -i 's/msgstr "Tosaigh"/msgstr "Tús"/; s/msgstr "End"/msgstr "Críoch"/; s/msgstr "Chuig"/msgstr "Go"/; s/msgstr "lá anuas"/msgstr "lá"/; s/msgstr "seachtain anuas"/msgstr "seachtain"/; s/msgstr "mí anuas"/msgstr "mí"/' cal_obair.po
	sed -i '1,/^"Project-Id-Version: /d' cal_obair.po
	sed -i '1s/.*/msgid ""\nmsgstr ""\n"Project-Id-Version: sunbird\\n"\n&/' cal_obair.po
#	cat trunk.txt | while read x; do rm -f $$x-ga-IE.po; done

FORCE :
