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
    let goToBottom = setInterval(() => window.scrollBy(0, 400), 1000)
}

export function youPlaylistCopy {
    // https://responsive-muse.com/export-youtube-playlist-video-urls-titles-js/
    clearInterval(goToBottom)
    let arrayVideos = []
    console.log('\n'.repeat(50))
    const links = document.querySelectorAll('a')
    for (const link of links) {
        if (link.id === "video-title") {
            link.href = link.href.split('&list=')[0]
            arrayVideos.push(link.title + ';' + link.href)
            console.log(link.title + '\t' + link.href)
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


export function youPlaylistPaste {
    // https://responsive-muse.com/export-youtube-playlist-video-urls-titles-js/
    let data = arrayVideos.join('\n')
    let blob = new Blob([data], {type: 'text/csv'})
    let elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'my_data.csv'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
}

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