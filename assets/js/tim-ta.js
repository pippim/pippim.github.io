---
---
// Tim-ta (Timed Tasks)

// Button Image source: https://www.cleanpng.com/free/

// dragElement defined in /assets/js/theCookieMachine.js
// dragElement(document.getElementById("tta_window"));


var scrTimeout, scrWidth, scrSmall, scrMedium, scrLarge;

scrSetSize();  // Call on document load

function scrSetSize() {
    // cell phones don't have window.innerWidth
    scrWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    scrSmall = scrMedium = scrLarge = false;
    if (scrWidth < 641) { scrSmall = true; }
    else if (scrWidth > 1007) { scrLarge = true; }
    else { scrMedium = true; }
    //console.log("scr Width Small Medium Large: ", scrWidth, scrSmall, scrMedium, scrLarge)
}

// window.addEventListener('resize', () => { func1(); func2(); });
window.onresize = function() {
    // Can be called many times during a real window resize
    clearTimeout(scrTimeout);  // Reset window resize delay to zero
    scrTimeout = setTimeout(scrSetSize, 250);  // After 250 ms set screen size
}

// Configuration & Container for all Tim-ta Projects
// Default below for creation, overwritten when retrieved from localStorage
// The order arrProjects names appear is order they are displayed
var tta_store = {
    arrProjects: [],
    objProjects: {},
    cntProjects: 0,
    task_prompt: "true",
    task_end_alarm: "true",
    task_end_filename: "Alarm_03.mp3",
    task_end_notification: "false",
    run_set_times: 1,
    set_prompt: "false",
    set_end_alarm: "false",
    set_end_filename: "Alarm_05.mp3",
    set_end_notification: "false",
    all_sets_prompt: "false",
    all_sets_end_alarm: "false",
    all_sets_end_filename: "Alarm_12.mp3",
    all_sets_end_notification: "false",
    progress_bar_update_seconds: 1,
    confirm_delete_phrase: "y"
}

// SINGLE Tim-ta Project
// When value is "default" it is inherited from Configuration
// The order arrTasks names appear is order they are displayed
var tta_project = {
    project_name: null,
    arrTasks: [],
    objTasks: {},
    cntTasks: 0,
    task_prompt: "default",
    task_end_alarm: "default",
    task_end_filename: "default",
    task_end_notification: "default",
    run_set_times: "default",
    set_prompt: "default",
    set_end_alarm: "default",
    set_end_filename: "default",
    set_end_notification: "default",
    all_sets_prompt: "default",
    all_sets_end_alarm: "default",
    all_sets_end_filename: "default",
    all_sets_end_notification: "default",
    progress_bar_update_seconds: "default",
    confirm_delete_phrase: "default"
}

// SINGLE Timer within a Tim-ta Project
// When value is "default" it is inherited from Project 
var tta_task = {
    task_name: null,
    hours: null,
    minutes: null,
    seconds: null,
    task_prompt: "default",
    task_end_alarm: "default",
    task_end_filename: "default",
    task_end_notification: "default",
    progress_bar_update_seconds: "default",
    confirm_delete_phrase: "default"
}

// Get variable values and source.
// EG task_prompt value & source can be "true", "Manual Override"
// "true", "Project Default", "true", "Configuration Default"
var ttaStore, ttaProject, ttaTask;

ttaNewConfig();  // Always new until localStorage setup
localStorage.setItem('ttaStore', ttaStore)

function ttaNewConfig() {
    // Object.assign: https://stackoverflow.com/a/34294740/6929343
    ttaStore = Object.assign({}, tta_store);
    ttaProject = Object.assign({}, tta_project);
    ttaProject.project_name = "Laundry";

    ttaNewTask("Wash Cycle");
    ttaTaskDuration(0, 16, 30);
    ttaAddTask(ttaTask);

    ttaNewTask("Rinse Cycle");
    ttaTaskDuration(0, 13, 15);
    ttaAddTask(ttaTask);

    ttaNewTask("Dryer");
    ttaTaskDuration(0, 58, 0);
    ttaAddTask(ttaTask);

    ttaStore.arrProjects = [ttaProject.project_name];
    ttaStore.objProjects[ttaProject.project_name] = ttaProject;
    ttaStore.cntProjects = 1;
}

function ttaNewTask (name) {
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    ttaTask_index = ttaProject.cntTasks;
    ttaTask.task_name = name;
    ttaTask.hours = ttaTask.minutes = ttaTask.seconds = 0;
}

function ttaAddTask (obj) {
    ttaProject.arrTasks.push(obj.task_name);
    ttaProject.objTasks[obj.task_name] = obj;
    ttaProject.cntTasks += 1;
    //console.log("ttaAddTask() 1:", ttaProject.objTasks[obj.task_name].task_name);
    //console.log("ttaAddTask() 2:", ttaProject.cntTasks, obj.task_name);
}

function ttaTaskDuration (hours, minutes, seconds) {
    ttaTask.hours = hours;
    ttaTask.minutes = minutes;
    ttaTask.seconds = seconds;
}

var currentTable, currentWindow;

function paintProjectsTable(id) {
    // If only one Project defined, skip and paintTasksTable
    // Grab the first (and only) Project at array offset 0
    currentTable = "Projects";
    ttaProject = ttaStore.objProjects[ttaStore.arrProjects[0]];
    paintTasksTable(id);
}

function paintTasksTable(id) {
    // Assumes ttaStore and ttaProject are populated
    // Button at bottom allows calling paintProjectsTable(id)
    currentTable = "Tasks";

    var cnt = ttaProject.arrTasks.length;
    var html = "<h2>" + ttaProject.project_name + " Project - " +
                cnt.toString() + " Tasks</h2>"

    html += '<table id="tabTasks">\n' ;
    html += tabTasksHeading();
    //logAllTasks("paintTasksTable START")

    for (var i = 0; i < cnt; i++) { html += tabTaskDetail(i); }
    html += '</table>\n';     // End of our table and form

    // TODO: Move next 9 lines to class name: tabClass inside TCM
    html += '<style>\n#tabTasks th, #tabTasks td {\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#tabTasks th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '.tta-btn {\n' +
            'font-size: 20px;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?
    id.innerHTML = html;
}

function tabTasksHeading() {
    var html = "<tr><th colspan='";
    if (scrSmall) { html += "2"; }  // Two columns of buttons
    else { html += "5"; }           // Five columns of buttons
    html += "'>Controls</th><th>Task Name</th>";
    if (!scrSmall) { html += "<th>Duration</th>"; }
    return html += "</tr>\n";
}

// +===========================================================+
// | Listen | Up | Down | Edit | Delete | Task Name | Duration |
// +--------+----+------+------+--------+-----------+----------+

// SMALL VERSION only Listen & Edit controls AND drop Duration
// HTML Codes for buttons

var tabPlaySym = "&#x25b6;";
var tabPlayTitle = "Start countdown timers";
var tabListenSym = "&#9835;"; // options x1f50a (speaker) 9835 (notes)
var tabListenTitle = "Listen to task end alarm";
var tabUpSym = "&#x21E7;";
var tabUpTitle = "Move up list";
var tabDownSym = "&#x21e9;";
var tabDownTitle = "Move down list";
var tabEditSym = "&#x270D;";
var tabEditTitle = "Edit";
var tabDeleteSym = "&#x1f5d1";
var tabDeleteTitle = "Delete";
var tabControlsSym = "&#x2699";
var tabControlsTitle = "Buttons for: Move up, Move down, Edit and Delete";

function tabTaskDetail(i) {
    ttaTask = ttaProject.objTasks[ttaProject.arrTasks[i]];
    var html = "<tr>\n";
    if (scrSmall) {
        // html += "<td>Listen</td><td>Edit</td>\n";
        html += tabButton(tabListenSym, tabListenTitle, clickListen);
        html += tabButton(tabControlsSym, tabControlsTitle, clickControls);
    }           // Two columns of buttons
    else {
        //html += "<td>Listen</td><td>Up</td>\n" +
        //       "<td>Dn</td><td>Edit</td>\n" +
        //        "<td>Delete</td>\n"
        html += tabButton(tabListenSym, tabListenTitle, clickListen);
        html += tabButton(tabUpSym, tabUpTitle, clickUp);
        html += tabButton(tabDownSym, tabDownTitle, clickDown);
        html += tabButton(tabEditSym, tabEditTitle, clickEdit);
        html += tabButton(tabDeleteSym, tabDeleteTitle, clickDelete);
    }           // Five columns of buttons

    html += "<td><font size='+2'>" + ttaTask.task_name + "</font></td>\n";

    if (!scrSmall) {
        var strDuration = hmsToString(ttaTask.hours, ttaTask.minutes, ttaTask.seconds);
        html += "<td>" + strDuration + "</td>\n";
    }
    return html += "</tr>\n";
}

function hmsToString(hours, minutes, seconds) {
    var str = "";
    if (hours > 0) { str += hours.toString() + " Hr. " }
    if (minutes > 0) { str += minutes.toString() + " Min " }
    if (seconds > 0) { str += seconds.toString() + " Sec" }
    return str;
}

function tabButton(button_code, title, callback) {
    // Add button to table detail. Return HTML with <button> code
    // code is the HTML code, E.G.&#x25b6; for Play button.
    var html = '<td><button class="hdr-btn tta-btn ' + callback + '" \n' +
               '" type="button" \n' +
               'title="' + title + '">' + button_code + '</button></td>\n';
    return html;
}

function clickCommon() {
    // currentTable will contain "Projects" or "Tasks".
    // Get the row index we are on when clicked.
    // Using the index get the Project Name or Task Name.
    // Using name lookup, get ttaProject or ttaTask into memory.
    // Return?
    console.log("Table Button Clicked", closest('tr').index())
}

function clickListen() { clickCommon(); }
function clickPlay() { clickCommon(); }
function clickUp() { clickCommon(); }
function clickDown() { clickCommon(); }
function clickEdit() { clickCommon(); }
function clickDelete() { clickCommon(); }
function clickControls() { clickCommon(); }

window.addEventListener("click", processClick);
// On initial load classes haven't been defined yet as HTML is dynamic
function processClick(event) {
    var element = event.target;
    //console.log("element.classList:", element.classList)
    if (element.classList.contains("clickListen()")) { clickListen() } ;
    if (element.classList.contains("clickPlay()")) { clickPlay() } ;
    if (element.classList.contains("clickUp()")) { clickUp() } ;
    if (element.classList.contains("clickDown()")) { clickDown() } ;
    if (element.classList.contains("clickEdit()")) { clickEdit() } ;
    if (element.classList.contains("clickDelete()")) { clickDelete() } ;
    if (element.classList.contains("clickControls()")) { clickControls() } ;
}

function logAllTasks(str) {
    // Apr 17, 2022 - Created to debug objA = objB not shallow copying.
    console.log("========", str, "========");
    console.log("Object.keys(ttaProject.objTasks):", Object.keys(ttaProject.objTasks))
    // .includes() from: https://stackoverflow.com/a/1473742/6929343
    if (ttaProject.arrTasks.includes("Wash Cycle")) {
        console.log("1. ", ttaProject.objTasks["Wash Cycle"].task_name);
    }
    if (ttaProject.arrTasks.includes("Rinse Cycle")) {
        console.log("2. ", ttaProject.objTasks["Rinse Cycle"].task_name);
    }
    if (ttaProject.arrTasks.includes("Dryer")) {
        console.log("3. ", ttaProject.objTasks["Dryer"].task_name);
    }
}
/* End of /assets/js/tim-ta.js */