---
---
// The Cookie Machine (TCM for short)

// Note: Requires search.js to be loaded first for getJSON function.
//       search.js defines global variables

// Draggable window: https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:
dragElement(document.getElementById("tcm_window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // Reset right property to allow window moving NOT WORKING
  elmnt.style.removeProperty('right')
  elmnt.style.removeProperty('margin-top')
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

document.querySelector('#tcm_button').addEventListener('click', () => {
  // Hide tcm_window
  document.querySelector('#tcm_window').style.display = "block";
  // Make tcm_button invisible
  document.querySelector('#tcm_button').style.cssText = `
    color: #FFFFFF00;
    border: none;`;
});

document.querySelector('#tcm_window_close').addEventListener('click', () => {
  // Hide tcm_window
  document.querySelector('#tcm_window').style.display = "none";
  // Make tcm_button visible
  document.querySelector('#tcm_button').style.cssText = `
    color: #FFFFFF;
    border: 2px solid white;`;
});

var website_tree = []

document.querySelector('#tcm_display_cloud').addEventListener('click', () => {
    // TODO: rename search_url.json to search_urls.json
    // load_website_tree();
    fetch('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/website_tree.json')
      .then((response) => response.json())
      .then((website_tree) => {
        website_tree_to_html(website_tree);
        // console.log('Here is the json!', website_tree);
      });
});

const b = document.getElementById('tcm_window_body')  // Website tree entries html codes

function website_tree_to_html(results) {
    if (results.length == 0) {
        html = "<h2> 🔍 &emsp; No website_tree found!</h2>\n";
        html += "<p>An error has occurred.<br><br>\n"
        html += "Try again later. If error continues contact {{ site.tittle }}.<br><br>\n"
        b.innerHTML = html;
        return
    } else if (results.length == 1) {
        var html = "<h2>1 {{ site.title }} website entry found.</h2>\n"
    } else {
        var html = "<h2>" + results.length.toString() +
                   " {{ site.title }} website entries found.</h2>\n"
    }

    setLineDrawFont(b)
    html += "<p>\n"
    for (var i = 0; i < results.length; i++) {
        html += results[i] + "<br>\n"
    }
    html += "</p>"

    b.innerHTML = html;              // Update TCM Window body

}

function setLineDrawFont(elmnt) {
    let compStyles = window.getComputedStyle(elmnt)
    let oldSize = compStyles.getPropertyValue('font-size');
    let oldHeight = compStyles.getPropertyValue('line-height');
    console.log("Font size: " + oldSize + " Line height: " + oldHeight);
    elmnt.style.cssText = `
      font-family: courier, courier new, monospace;
      line-height: 1.0;
    `;
}

/* End of /assets/js/theCookieMachine.js */
