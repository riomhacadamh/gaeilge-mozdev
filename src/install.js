/*
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 *  except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/

 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License. 
 *
 * The Original Code is Mozilla langpack install.js
 *
 * The Initial Developer of the Original Code is Matsuba
*
 * Contributor(s):
 * Matsuba
 * Tsukasa Maruyama (mal@mozilla.gr.jp)
 * Torisugari
 * Michele Dal Corso (mdalco@tiscali.it)
 *
 */

// this function verifies disk space in kilobytes
function verifyDiskSpace(dirPath, spaceRequired)
{
    var spaceAvailable;
    spaceAvailable = fileGetDiskSpaceAvailable(dirPath);
    spaceAvailable = parseInt(spaceAvailable / 1024);

    if (spaceAvailable < spaceRequired)
    {
        logComment("Insufficient disk space: " + dirPath);
        logComment("  required : " + spaceRequired + " K");
        logComment("  available: " + spaceAvailable + " K");
        return (false);
    }
    return (true);
}

// OS type detection
function getPlatform()
{
    var platformStr;
    var platformNode;

    if ('platform' in Install)
    {
        platformStr = new String(Install.platform);
        logComment("platformStr: " + platformStr);

        if (!platformStr.search(/^Macintosh/))
            platformNode = 'mac';
        else if (!platformStr.search(/^Win/))
            platformNode = 'win';
        else
            platformNode = 'unix';
    }
    else
    {
        var fOSMac = getFolder("Mac System");
        var fOSWin = getFolder("Win System");

        logComment("fOSMac: " + fOSMac);
        logComment("fOSWin: " + fOSWin);

        if (fOSMac != null)
            platformNode = 'mac';
        else if (fOSWin != null)
            platformNode = 'win';
        else
            platformNode = 'unix';
    }

    return platformNode;
}

// main
var srDest = 236;
var err;
var fProgram;
var platformNode;
var fSearchPlugins; // searchplugins directory variable (mal@mozilla.gr.jp)

platformNode = getPlatform();
logComment("initInstall: platformNode=" + platformNode);
// end - OS type detection

// ----LOCALIZATION NOTE: translate only these ------
var prettyName = "Gaeilge (IE)";
var langcode = "ga";
var regioncode = "IE";
var chromeNode = langcode + "-" + regioncode;
// --- END LOCALIZABLE RESOURCES ---
var regName = "locales/phoenix/" + chromeNode;
var chromeName = chromeNode + ".jar";
var regionFile = regioncode + ".jar";
var platformName = langcode + "-" + platformNode + ".jar";
var localeName = "locale/" + chromeNode + "/";
var regionName = "locale/" + regioncode + "/";

err    = initInstall(prettyName, regName, "1.x.x");
logComment("initInstall: " + err);

fProgram = getFolder("Program");
logComment("fProgram: " + fProgram);

// searchplugins directory detection (mal@mozilla.gr.jp)
if (platformNode == 'mac')
{
    fSearchPlugins = getFolder("Program", "Search Plugins");
}
else
{
    fSearchPlugins = getFolder("Program", "searchplugins");
}

logComment("fSearchPlugins: " + fSearchPlugins);

if (verifyDiskSpace(fProgram, srDest))
{
    err = addDirectory("", "sp", fSearchPlugins, "");
    logComment("addDirectory() searchplugins returned: " + err);

    if (platformNode != 'mac')
    {
        err = addDirectory("", "sp_nomac", fSearchPlugins, "");
        logComment("addDirectory() else mac searchplugins returned: " + err);
    }

    var chromeType = LOCALE | DELAYED_CHROME;
    err = addDirectory("", "bin", fProgram, "");
    logComment("addDirectory() returned: " + err);

    // if (err != SUCCESS)
    // {

    //     // couldn't install globally, try installing to the profile
    //     logComment("addDirectory() to " + fProgram + "failed!");

    //     resetError();
    //     chromeType |= PROFILE_CHROME;
    //     fProgram = getFolder("Profile");
    //     logComment("try installing to the user profile:" + fProgram);
    //     err = addDirectory("", "bin/chrome", fProgram, "chrome");
    // }

    setPackageFolder(fProgram);

    // check return value
    if (err == SUCCESS)
    {
        // register chrome
        var cf = getFolder(fProgram, "chrome/" + chromeName);
        var pf = getFolder(fProgram, "chrome/" + platformName);
        var rf = getFolder(fProgram, "chrome/" + regionFile);

        registerChrome(chromeType, cf, localeName + "global/");
        registerChrome(chromeType, cf, localeName + "communicator/");

        registerChrome(chromeType, cf, localeName + "browser/");
        registerChrome(chromeType, cf, localeName + "navigator/");
        registerChrome(chromeType, cf, localeName + "necko/");
        registerChrome(chromeType, cf, localeName + "mozapps/");
        registerChrome(chromeType, cf, localeName + "p3p/");
        registerChrome(chromeType, cf, localeName + "passwordmgr/");
        registerChrome(chromeType, cf, localeName + "cookie/");
        registerChrome(chromeType, cf, localeName + "pipnss/");
        registerChrome(chromeType, cf, localeName + "pippki/");
        registerChrome(chromeType, cf, localeName + "autoconfig/");

        registerChrome(chromeType, pf, localeName + "global-platform/");
        registerChrome(chromeType, pf, localeName + "communicator-platform/");
        registerChrome(chromeType, pf, localeName + "navigator-platform/");

        registerChrome(chromeType, rf, regionName + "global-region/");
        registerChrome(chromeType, rf, regionName + "communicator-region/");
        registerChrome(chromeType, rf, regionName + "browser-region/");
        registerChrome(chromeType, rf, regionName + "navigator-region/");

        err = performInstall();
        logComment("performInstall() returned: " + err);

        if (err == SUCCESS || err == 999)
        {
            // ----LOCALIZATION NOTE: translate only these ------
            alert("Suiteáil den logánú Gaeilge arna comhlíonadh.\n" +
	           "Dún do bhrabhsálaí anois, le do thoil.\n\n" +
                   "Ansin, más mian leat Firefox a úsáid as Gaeilge,\n" + 
		   "tabhair na roghanna seo ar an líne ordaithe:\n\n" +
                   "    \"-UILocale ga-IE -contentLocale IE\"\n\n" +
                   "Féach ar http://mozdoesit.m4d.sm le haghaidh níos mó sonraí");
            // --- END LOCALIZABLE RESOURCES ---
         }
        else
        {
            // ----LOCALIZATION NOTE: translate only these ------
            alert("Níorbh fhéidir an logánú Gaeilge a shuiteáil.  Earráid: " + err);
            // --- END LOCALIZABLE RESOURCES ---
        }

    }
    else
    {
        cancelInstall(err);
        logComment("cancelInstall due to error: " + err);

        if (err == -202)
        {
            // ----LOCALIZATION NOTE: translate only these ------
            alert("Rinne tobscor ar an suiteáil.  Ní féidir a scríobh sa chomhadlann\n" +
                   "\"chrome\" Firefox. Deimhnigh na ceadanna ar an gcomhadlann seo\n" +
                   "nó atosaigh an suiteáil le ceadanna sárúsáideora\n" +
                   "nó den riarthóir do chórais.");
            // --- END LOCALIZABLE RESOURCES ---
        }
        else
        {
            // ----LOCALIZATION NOTE: translate only these ------
            alert("Níorbh fhéidir an logánú Gaeilge a shuiteáil.  Earráid: " + err);
            // --- END LOCALIZABLE RESOURCES ---
        }
    }
}
else
    cancelInstall(INSUFFICIENT_DISK_SPACE);

// end main
