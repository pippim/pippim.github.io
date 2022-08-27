/*  /_includes/draggable-window.js

    Drag window by title bar with mouse on desktop or with finger on mobile.

*/

// dragElement() copied from theCookieMachine.js
function dragElement(elm) {
    var offX = 0, offY = 0, oldX = 0, oldY = 0, x = 0, y = 0, useTouch = false;
    var win = window  // Default to "normal" main webpage
    if (typeof runWindow !== 'undefined')
        if (runWindow != null) win = runWindow  // Working in popup Window, not main
    if (win.document.getElementById(elm.id + "_header")) {
        // if present, the header is where you move the DIV from:
        win.document.getElementById(elm.id + "_header").ontouchstart = dragTouchStart;
        win.document.getElementById(elm.id + "_header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elm.ontouchstart = dragTouchStart;
        elm.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        // get the mouse cursor position at startup
        e.preventDefault();  // Prevents text highlighting while dragging header
        setXY(e);
        saveXY();
        win.document.onmouseup = closeDragElement;
        win.document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        // get the touch position at startup
        e.preventDefault();  // Prevents text highlighting while dragging header
        useTouch = true;
        setXY(e);
        saveXY();
        win.document.ontouchend = closeDragElement;
        win.document.ontouchmove = elementDrag;
    }

    function setXY(e) {
        if(useTouch) {
            x = parseInt(e.targetTouches[0].clientX);  // bunch of decimals
            y = parseInt(e.targetTouches[0].clientY);
        } else {
            x = e.clientX;  // already integer for mouse down
            y = e.clientY;
        }
    }

    function saveXY() {
        oldX = x;
        oldY = y;
    }

    function elementDrag(e) {
        e.preventDefault();  // Prevents text highlighting while dragging header
        // calculate the new cursor position:
        setXY(e);
        offX = oldX - x;
        offY = oldY - y;
        saveXY();
        elm.style.left = (elm.offsetLeft - offX) + "px";
        elm.style.top = (elm.offsetTop - offY) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released or touch ends:
        win.document.onmouseup = null;
        win.document.onmousemove = null;
        win.document.ontouchend = null;
        win.document.ontouchmove = null;
    }
}  // End of dragElement2(elm)

/* End of /_includes/draggable-window.js */