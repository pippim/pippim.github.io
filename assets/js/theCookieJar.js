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
  const d = new Date();
  d.setTime(d.getTime() + (exp_days * 24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + value + ";" + expires + ";path=/" +
                    ";SameSite=Strict";
  // console.log("document.cookie: " + document.cookie)
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/* End of /assets/js/theCookieJar.js */