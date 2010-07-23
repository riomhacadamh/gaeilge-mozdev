<?php
    $body_id    = 'landing-page';
    $body_class = 'locale-'.$lang;
    // translate the $page_title and $extra_headers  and meta variables below
    $page_title = 'Brabhsálaí Firefox as Gaeilge | Níos gasta, níos sláine, agus in-saincheaptha';
    $extra_headers = <<<EXTRA_HEADERS
    <meta name="description" content="Fáilte go dtí Firefox as Gaeilge! Is é Firefox an brabhsálaí Gréasáin is gasta, is sláine agus is in-saincheaptha." />
EXTRA_HEADERS;

    @include_once "{$config['file_root']}/{$lang}/includes/header-landing-page-l10n.inc.php";

?>

<div id="main-feature">
    <div id="feature-contents">
        <h2 id="firefox-headline">
            Faigh Firefox 3 as Gaeilge
        </h2>
    <p id="firefox-intro">
        As Gaeilge anois, tá Firefox 3 níos gasta, níos sláine, agus níos cliste ná bhí sé riamh. Le níos mó ná 15,000 feabhsúchán, labhraíonn Firefox do theanga.
    </p>
    </div>


<script type="text/javascript" src="/js/download.js"></script>
<?php
    // php call to display the download box, nothing to translate in the line
    // below
    echo $firefoxDetails->getDownloadBlockForLocale($lang,  array('ancillary_links' => false, 'download_product' => 'Íosluchtú Saor in Aisce') );
?>

</div>
<div id="main-content">
    <div id="learn_more" class="sub-feature">
        <h3>An bhfuil cabhair uait?</h3>
        <p>
        Aimseoidh tú go leor freagraí ar ár suíomh cabhrach, chomh maith le comhrá beo má tá cuidiú de dhíth ort le pointe casta ar bith. <a href="http://support.mozilla.com/<?=$lang?>/kb/">Déan Cuairt ar an Suíomh Cabhrach</a>
        </p>
    </div>

    <div id="questions" class="sub-feature">
        <h3>Tuilleadh Eolais</h3>
        <p>
        Féach ar an suíomh Firefox bunaithe ag pobal na Gaeilge chun tuilleadh eolais a fháil faoi Firefox nó faoin tionscadal aistriúcháin. <a href="http://gaeilge.mozdev.org">Déan cuairt ar Shuíomh na Foirne Aistriúcháin</a>
        </p>
    </div>
    <div id="community" class="sub-feature">
        <h3>Teangacha Eile</h3>
        <p>
        Má tá suim agat i dteangacha seachas an Ghaeilge, féach ar an liosta iomlán de bhrabhsálaithe logánaithe. <a href="/<?=$lang?>/firefox/all.html">Teangacha Eile</a>
        </p>
    </div>


    <p class="thunderbird">
    Bain taitneamh as ríomhphost slán, gasta agus éasca lenár gcliant ríomhphoist Mozilla Thunderbird. <a href="/<?=$lang?>/thunderbird/">Tuilleadh Eolais</a>
    </p>
</div>


<?php
    @include_once "{$config['file_root']}/{$lang}/includes/footer-portal-pages.inc.php";
?>
