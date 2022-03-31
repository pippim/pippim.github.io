/* /_includes/tcmButtonVisibility.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/

function tcmButtonVisibility() {
    // Functions shared by /assets/js/theCookieMachine.js and /tcm.md
    sel_this_page = document.getElementById("switch_this_page");
    sel_all_pages = document.getElementById("switch_all_pages");
    sel_all_sessions = document.getElementById("switch_all_sessions");

    // Initialize with cookie values
    switch_init(sel_this_page, vis_this_page);
    switch_init(sel_all_pages, vis_all_pages);
    switch_init(sel_all_sessions, vis_all_sessions);

    // Toggle switch on/off with button click
    sel_this_page.addEventListener('click', () => {
        switch_click(sel_this_page, [ switch_on_image ]);
        check_all_switches();
        // If visible this page is off, turn off others
        if (vis_this_page == "false") {
            switch_set(sel_all_pages, "false");
            switch_set(sel_all_sessions, "false");
        }
        check_all_switches();
    });

    sel_all_pages.addEventListener('click', () => {
        switch_click(sel_all_pages, [ switch_on_image ]);
        check_all_switches();
        sessionStorage.vis_all_pages = vis_all_pages;
        // Was this just switched on or off?
        if (vis_all_pages == "true") {
            switch_set(sel_this_page, "true");
        }
        if (vis_all_pages == "false") {
            switch_set(sel_all_sessions, "false");
        }
        check_all_switches();
    });

    sel_all_sessions.addEventListener('click', () => {
        switch_click(sel_all_sessions, [ switch_on_image ]);
        check_all_switches();
        /*  Set switch directly because another won't turn it
            and it must be saved to cookie for other to see. */
        switch_set(sel_all_sessions, vis_all_sessions);

        // If visible all sessions then force visible everywhere
        if (vis_all_sessions == "true") {
            switch_set(sel_this_page, "true");
            switch_set(sel_all_pages, "true");
        }
        check_all_switches();
    });

}

var vis_this_page = "true";     // Global default for exiting TCM Window.
// Get whatever we've setup in session storage
var vis_all_pages = sessionStorage.vis_all_pages;
if (vis_all_pages === undefined) { vis_all_pages = "false" }
if (vis_all_pages == "true") { makeTcmButtonVisible() }
// Stored in cookie to apply to all sessions
var vis_all_sessions_cname = "vis_all_sessions";
var vis_all_sessions = getCookie(vis_all_sessions_cname)
// getCookie() will return "" if cookie is undefined.
if (vis_all_sessions == "") { vis_all_sessions = "false" }
// if All sessions were forced on by another session, set our session "true"
if (vis_all_sessions == "true") { vis_all_pages = "true" }
if (vis_all_pages == "true" ) { makeTcmButtonVisible() }

var sel_this_page = null;   // Initialized in local_storage_to_html()
var sel_all_pages = null;
var sel_all_sessions = null;
var switch_on_image = "{{ site.url }}/assets/img/icons/switch_on_right.png"
var switch_off_image = "{{ site.url }}/assets/img/icons/switch_off_left.png"

function makeTcmButtonVisible () {
  // Make #tcm_button at Top of Page (header section) visible
  document.querySelector('#tcm_button').style.cssText = `
    opacity: 1.0;
    border: thin solid black;
    border-radius: .5rem;
    background-image: url({{ site.url }}/assets/img/icons/gingerbread_3.png),
                      url({{ site.url }}/assets/img/icons/button_background.png);
    background-repeat: no-repeat;
    background-size: cover;
  `;
}

var gStorage = {};  // Stores current image (on or off) by id

function switch_init(switchElm, bool) {
    var id = switchElm.id;
    var oldSrc = switchElm.src;
    /* Default image is "on" at index value 0 */
    gStorage[id] = {
        'id': id,
        'origSrc': oldSrc,
        'i': 0
    };
    if (bool == "true" ) {
        gStorage[id].i = 1;  /* Set to off image, index value 1 */
        switchElm.src = switch_on_image;   // Use switched off image
    }
}

function switch_set(switchElm, bool) {
    var id = switchElm.id;
    if (bool == "true" ) {
        gStorage[id].i = 1;                 // Set to on image, index value 1
        switchElm.src = switch_on_image;    // Use switched on image
    } else {
        gStorage[id].i = 0;                 // Set to off image, index value 0
        switchElm.src = switch_off_image;   // Use switched off image
    }
    // Setting the sessionStorage variable?
    if (id == "switch_all_pages") { sessionStorage.vis_all_pages = bool; }
    // Setting the cookie variable?
    if (id == "switch_all_sessions") { setCookie(vis_all_sessions_cname, bool, 30) }
}

function check_all_switches() {
    vis_this_page = switch_check(sel_this_page);
    vis_all_pages = switch_check(sel_all_pages);
    vis_all_sessions = switch_check(sel_all_sessions);
}

function switch_check(switchElm) {
    // switchElm>src has protocol and website prefixes
    var parts = switchElm.src.split('/');
    var parts2 = switch_on_image.split('/');
    if (parts[parts.length - 1] == parts2[parts2.length - 1]) {
        return "true"
    } else {
        return "false"
    }
}

function switch_click(switchElm, anAltSrcArr) {
    var id = switchElm.id;
    var oldSrc = switchElm.src;

    gStorage[id].i += 1;
    if (gStorage[id].i > anAltSrcArr.length) {
        gStorage[id].i = 0;
    }

    if (gStorage[id].i === 0) {
        switchElm.src = gStorage[id].origSrc;
    } else {
        switchElm.src = anAltSrcArr[gStorage[id].i - 1];
    }
}

/* End of /_includes/tcm_button_visibility.js */