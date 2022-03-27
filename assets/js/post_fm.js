/* /assets/js/post_fm.js - Blog Post Front Matter Less/More cookie

    getCookie and setCookie are exported so they can be imported by
    /assets/js/theCookieMachine.js on pages that aren't blog posts.

    See Stack Exchange answers for ideas about cookies:

    - Record expiry date inside cookie: https://stackoverflow.com/a/12234408/6929343
    $expiry = time() + 12345;
    $data = (object) array( "value1" => "just for fun", "value2" => "i'll save whatever I want here" );
    $cookieData = (object) array( "data" => $data, "expiry" => $expiry );
    setcookie( "cookiename", json_encode( $cookieData ), $expiry );

    Other fields: Version, Date Created, Date Modified, Date mailed, mail to, mail from,
        recreate on refresh, recreate on page load, time to keep, auto renew,
*/

// global variables
var fm_state = "None";
var fm_button = "None";

export function setCookie(cname, value,exp_days) {
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

function showHide(state){
  var x = document.getElementById("hidden_front_matter");
  if (state === "More") {
    // x.style.display = "block";  // Jan 14/22 use hdr_btn
    // x.style.display = "flex";  // Breaks button text, doesn't move it
    // x.style.justifyContent "flex-end";
  } else {
    x.style.display = "none";
  }
}

function checkCookie() {
  // do not use "let fm_state =" that makes variable local
  fm_state = getCookie("fm_state");
  if (fm_state != "") {
    if (fm_state == "Less") {
      // Do not use: "var fm_button =" that makes variable local
      fm_button = "More";
      // $('#hidden_front_matter').hide();
      }
    else {
      fm_button = "Less";
      // $('#hidden_front_matter').show();
      }
  }
  else {
    setCookie("fm_state", "Less", 30);
    fm_state = "Less";
    fm_button = "More";
    // $('#hidden_front_matter').hide();
  }
  // showHide(fm_state);  // Breaks button text
  return fm_button; // return value not used anymore but leave it
}

function fm_toggle() {
  if (fm_state == "Less") {
    setCookie("fm_state", "More", 30);
    fm_state = "More";
    fm_button = "Less";
    document.querySelector('#hidden_front_matter').style.display = "block"
    // Generates error: $('#hidden_front_matter').show();
  }
  else {
    setCookie("fm_state", "Less", 30);
    fm_state = "Less";
    fm_button = "More";
    document.querySelector('#hidden_front_matter').style.display = "none"
  }
  document.querySelector('#more_less_button').textContent = fm_button
  showHide(fm_state);
    // Above two commands are being done inside _layouts/post.html on document load
  //window.location.reload();
  // If we needed to force the document to be fetched from the
  // web server again (such as where the document contents
  // change dynamically but cache control headers are not
  // configured properly), Firefox supports a non-standard
  // parameter that can be set to true to bypass the cache:
  //window.location.reload(true);
}
