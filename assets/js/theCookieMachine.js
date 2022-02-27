// The Cookie Machine (TCM for short)

// Draggable window: https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt == null) {
    console.log('elmnt is null');
    return
  }
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// global variables
var fm_state = "None";
var fm_button = "None";

function setCookie(cname,c_value,exp_days) {
  const d = new Date();
  d.setTime(d.getTime() + (exp_days*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + c_value + ";" + expires + ";path=/";
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
    // $('#hidden_front_matter').show();
  }
  else {
    setCookie("fm_state", "Less", 30);
    fm_state = "Less";
    fm_button = "More";
    // $('#hidden_front_matter').hide();
  }
  document.querySelector('#hidden_button').textContent = fm_button
  showHide(fm_state);
  window.location.reload();  // Activated Jan 15/22 because hdr-btn used
  // If we needed to force the document to be fetched from the
  // web server again (such as where the document contents
  // change dynamically but cache control headers are not
  // configured properly), Firefox supports a non-standard
  // parameter that can be set to true to bypass the cache:
  //window.location.reload(true);
}

/* End of /assets/js/theCookieMachine.js */
