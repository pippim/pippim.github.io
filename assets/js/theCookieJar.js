/* /assets/js/theCookieJar.js - get/setCookie()

    getCookie and setCookie are exported so they can be imported by
    /assets/js/theCookieMachine.js on pages that aren't blog posts.
    /assets/js/post_fm.js imports on blog posts.

    See Stack Exchange answers for ideas about cookies:

    - Record expiry date inside cookie: https://stackoverflow.com/a/12234408/6929343
    $expiry = time() + 12345;
    $data = (object) array( "value1" => "just for fun", "value2" => "i'll save whatever I want here" );
    $cookieData = (object) array( "data" => $data, "expiry" => $expiry );
    setcookie( "cookiename", json_encode( $cookieData ), $expiry );

    Other fields: Version, Date Created, Date Modified, Date mailed, mail to, mail from,
        recreate on refresh, recreate on page load, time to keep, auto renew,
*/

export function setCookie(cname, value, exp_days) {
    const d = new Date()
    d.setTime(d.getTime() + (exp_days * 24*60*60*1000))
    let expires = "expires=" + d.toGMTString()
    document.cookie = cname + "=" + value + ";" + expires + ";path=/" +
                    ";SameSite=Strict"
    // console.log("document.cookie: " + document.cookie)
}

export function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

/********************************************************************************/
// YOUTUBE: EXPORT ANY CHANNEL VIDEO TITLES AND URLS TO TEXT/CSV/EXCEL/SPREADSHEET
// JAVASCRIPT CODE TO COPY & PASTE IN THE CONSOLE (F12) OF ANY WEB BROWSER.
// TESTED IN CHROME IN JUNE 2023, BUT SHOULD WORK IN ANY WEB BROWSER.
// VIDEO TUTORIAL AND SUPPORT AVAILABLE AT https://www.youtube.com/@Net growsTech/
// CODE CREATED BY NET GROWS TECH. VISIT US AT https://responsive-muse.com & https://netgrows.com
/********************************************************************************/

export youPlaylistAllowPasting() {
    // Paste text below into firefox console
    allow pasting
}

export youPlaylistScroll() {
    // https://responsive-muse.com/export-youtube-playlist-video-urls-titles-js/
    // TODO:  BUTTON 1 copy to clipboard
    let goToBottom = setInterval(() => window.scrollBy(0, 400), 1000)
}

/*

    <a id="video-title"
        class="yt-simple-endpoint style-scope ytd-playlist-video-renderer"
        href="/watch?v=yTje24TS9hw&amp;list=PLthF248A1c6_uYBAqykk-uh9k_D1ba2vA&amp;index=1&amp;pp=iAQB8AUB"
        title="Slipknot - The Devil In I (Ben Smith Remix) (Official Audio)"
        > Slipknot - The Devil In I (Ben Smith Remix) (Official Audio)
    </a>

    <span id="text"
        class="style-scope ytd-thumbnail-overlay-time-status-renderer"
        aria-label="4 minutes, 9 seconds">4:09
    </span>
*/

export function youPlaylistCopy {
    // https://responsive-muse.com/export-youtube-playlist-video-urls-titles-js/
    // TODO:  BUTTON 2 copy to clipboard
    clearInterval(goToBottom)
    console.log('\n'.repeat(50))

    let arrayVideos = []
    const links = document.querySelectorAll('a')
    for (const link of links) {
        if (link.id === "video-title") {
            link.href = link.href.split('&list=')[0]
            arrayVideos.push(link.title + ';' + link.href)
        }
    }

    let arrayTime = []
    const spans = document.querySelectorAll('span')
    for (const span of spans) {
        if (span.id === "text" &&
        span.classList.contains('ytd-thumbnail-overlay-time-status-renderer'))
        {
            arrayTime.push(span.innerText.replace(/[^\d:]/g, ''))
        }
    }

    if (arrayVideos.length === arrayTime.length) {
        for (var i=0; i<arrayVideos.length; i++) {
            arrayVideos[i] = arrayVideos[i] + ';' + arrayTime[i]
            console.log(arrayVideos[i])
        }
    }
}

/*
https://stackoverflow.com/a/20542029/6929343
Substitute link name to get thumbnail
E.G. Video link to watch is:
    https://www.youtube.com/watch?v=yTje24TS9hw
Thumbnail 480x360 HQ image is:
    https://i.ytimg.com/vi/yTje24TS9hw/hqdefault.jpg
*/


export function youPlaylistSave {
    // https://responsive-muse.com/export-youtube-playlist-video-urls-titles-js/
    // TODO:  BUTTON 3 copy to clipboard
    //        Move ~/Downloads/my_data.csv
    //        To:  ~/.../mserve/YouTubePlaylists/<PLAYLIST NAME>.csv
    let data = arrayVideos.join('\n')
    let blob = new Blob([data], {type: 'text/csv'})
    let elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'my_data.csv'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
}

/*  TODO
export function youPlaylistMoveCSV {
    //        Move ~/Downloads/my_data.csv
    //        To:  ~/.../mserve/YouTubePlaylists/<PLAYLIST NAME>.csv


        TODO: Mount Window to import playlist
              See: ~/python/mserve.py website_play()
```shell
#!/bin/bash
#  https://www.pippim.com/programs/mserve.html#pickled-youtube-playlists

#    Follow instructions and note "Copy Button" below:

#        STEP 1: Use CTRL+I in web browser
#        STEP 2: Click Button 1 to copy to clipboard "youPlayListScroll()"
#        STEP 3: Go to web browser and use CTRL+V then Enter
#        STEP 3A: Type "allow pasting" (without the quotes) if requested by browser
#        STEP 3B: Wait for web browser to stop scrolling, 1 second per song
#        STEP 4: Click Button 2 to copy to clipboard "youPlaylistCopy()"
#        STEP 5: Go to web browser and use Ctrl+V then Enter
#        STEP 6: Click Button 3 to copy to clipboard "youPlaylistSave()"
#        STEP 7: Go to web browser and use Ctrl+V then Enter
#        STEP 8: Run this bash script youPlaylistMoveCSV.sh
#        STEP 9: Use "View Playlists", select Playlist, View Button

if [ "$#" -ne 1 ]; then
    printf 'ERROR! You must provide the "Playlist Name" in quotes!\n' >&2
    exit 1
fi

if [ ! -f ~/Downloads/my_data.csv ]; then
    printf "ERROR! File ~/Downloads/my_data.csv not found!\n" >&2
    exit 1
fi

cd ~/Downloads
mv -v my_data.csv "$1".csv
cp -v "$1".csv ~/.local/share/mserve/YouTubePlaylists
rm -v ~/.local/share/mserve/YouTubePlaylists/"$1".pickle
```
*/

// Tip of the Iceberg: https://stackoverflow.com/a/51853700/6929343
window.addEventListener('beforeunload', () => {
    localStorage.windowSize = JSON.stringify({
        left: window.screenX,
        top: window.screenY,
        width: window.outerWidth,
        height: window.outerHeight,
    });
});

/* End of /assets/js/theCookieJar.js */