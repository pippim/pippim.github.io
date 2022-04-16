---
---
// Tim-ta (Timed Tasks)

// Button Image source: https://www.cleanpng.com/free/

/* include tcm-common-code.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/
// { % include tcm-common-code.js %}

// Draggable window: https://www.w3schools.com/howto/howto_js_draggable.asp
// dragElement defined in /assets/js/theCookieMachine.js
// Make the DIV element draggable:
// dragElement(document.getElementById("tim-ta_window"));

var tim-ta_sets = {
    arrNames: [],
    confirm_delete_phrase: "delete"
}

var timer_set = {
    name: "",
    default_ask_to_begin_timer: true,
    ask_to_begin_set: true,
    ask_to_begin_all_sets: true,
    default_alarm_timer_end: true,
    default_sound_filename: null,
    alarm_set_end: true,
    set_sound_filename: null,
    alarm_all_sets_end: true,
    all_sets_sound_filename: null,
    default_notification_timer_end: true,
    notification_set_end: true,
    notification_all_sets_end: true,
    progress_bar_update_seconds: 1,
    window_position: null,
    ask_save_window_position: true
}

var single_timer = {
    name: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    ask_to_begin_timer: true,
    image_filename: null,
    notification_timer_end: true,
    alarm_timer_end: true,
    timer_sound_filename: null,
}

document.querySelector('#tim-ta_button').addEventListener('click', () => {
  // TCM button click on webpage header
  document.querySelector('#tim-ta_window').style.cssText = `
    display: flex;
    flex-direction: column;
  `;
  // Make tim-ta_button invisible
  document.querySelector('#tim-ta_button').style.cssText = `
    opacity: 0.0;
    background: transparent;
    background-image: none;
    border: none;
  `;
});

document.querySelector('#tim-ta_window_close').addEventListener('click', () => {
  // Hide tim-ta_window
  document.querySelector('#tim-ta_window').style.display = "none";
  // Make tim-ta_button (main page header) visible?
  if (vis_this_page == "true") { makeTcmButtonVisible() }
});


const b = document.getElementById('tim-ta_window_body')  // Website tree entries html codes

document.querySelector('#tim-ta_display_home').addEventListener('click', () => {
    // arrConfigYml in search.js required by two TCM Window Buttons - Home & Webpage Info
    var html = htmlFrontMatter(arrConfigYml, "Site Front Matter ('_config.yml')");
    b.innerHTML = html; // Update TCM Window body
});

document.querySelector('#tim-ta_display_cloud').addEventListener('click', () => {
    // Display Website Tree
    fetch(raw_url + '/assets/json/website_tree.json')
      .then((response) => response.json())
      .then((website_tree) => {
        var html = htmlWebsiteTree(website_tree);
        b.innerHTML = html; // Update TCM Window body
      });
});

document.querySelector('#tim-ta_display_local').addEventListener('click', () => {
    // Display cookies and cache (WIP)
    var html = htmlVisibilitySwitches();
    html += htmlSearchStats();
    html += htmlScreenInfo();
    b.innerHTML = html;

    /*  Process TCM Window Button Visibility slider switches - shared  with ~/tcm.md
        USE: % include tcm-common-code.js %} */
    tcmButtonVisibility()});

document.querySelector('#tim-ta_hyperlink_recipe').addEventListener('click', () => {
    processHyperlinkRecipe('tim-ta_window_body');
});

document.querySelector('#tim-ta_webpage_info').addEventListener('click', () => {
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    var urlMarkdown = getMarkdownFilename();

    fetch(urlMarkdown)
        .then((response) => response.text())
        .then((results) => {
            var results = results.split("\n")  // Convert string into array
            var front_yml = getFrontMatter(results)
            var html = htmlFrontMatter(front_yml, "Current Webpage Front Matter");
            html += htmlWindowInfo();
            html += htmlNavigatorInfo();
            b.innerHTML = html; // Update TCM Window body
        });
});

document.querySelector('#tim-ta_cookie_jar').addEventListener('click', () => {
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    // https://www.javascripttutorial.net/web-apis/javascript-notification/
    var html = '<div class="container">\n' +
               '<h1>JavaScript Notification API Demo</h1>\n' +
               '<div class="error"></div>\n' +
               '</div>'
    var fileDownload="https://pippim.com/assets/img/TCM Header with Gingerbread Man.png"
    //alert('About to download ' + fileDownload);
    b.innerHTML = html;
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes
    //let downloading = downloads.download({url: fileDownload})
    //console.log("downloading: " + downloading)

    // Notifications
    (async () => {
        // create and show the notification
        const showNotification = () => {
            // create a new notification
            const notification = new Notification('{{ site.title }} Timed Tasks', {
                body: 'File has been downloaded.',
                icon: '{{ site.url }}/favicon.png'
            });

            // close the notification after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10 * 1000);

            // navigate to a URL when clicked
            notification.addEventListener('click', () => {

                window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
            });
        }

        // show an error message
        const showError = () => {
            const error = document.querySelector('.error');
            error.style.display = 'block';
            error.textContent = 'You blocked the notifications';
        }

        // check notification permission
        let granted = false;

        if (Notification.permission === 'granted') {
            granted = true;
        } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted' ? true : false;
        }

        // show notification or error
        granted ? showNotification() : showError();

    })();
});

/*
function introduction_to_html() {
    var html = "<p>";
    html += "<h3>The Cookie Machine (TCM) Future Applications:</h3>\n";
    html += "  ☑ View cookies used on the {{ site.title }} website.<br>\n";
    html += "  ☑ Send cookie via mail. For backup or sharing.<br>\n";
    html += "  ☑ Receive cookie via mail. From yourself or colleague.<br>\n";
    html += "  ☑ Countdown Timers. For multi-phase time sensitive missions.<br>\n";
    html += "  ☑ And in the future... Other ways of sharing/using Cookies.\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

introduction_to_html()  // Load immediately
*/

/* End of /assets/js/tim-ta.js */