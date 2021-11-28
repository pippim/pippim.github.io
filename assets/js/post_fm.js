console.log("this worked");
alert("hello");

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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

function checkCookie() {
  let fm_state = getCookie("fm_state");
  if (fm_state != "") {
    window.alert("Front Matter state is: " + fm_state);
    if (fm_state == "Less") {
      var fm_button = "More"
      }
    else {
      var fm_button = "Less"
      }
  }
  else {
    setCookie("fm_state", "Less", 30);
    var fm_button = "More"
  }
}
