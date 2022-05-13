---
---
// Tim-ta (Timed Tasks)

/* TODO: Multiple Browser tabs concurrency.

    Before any update, reread ttaConfig, ttaProject and
    ttaTask into "check Buffers". If they are different
    then advise user and force reread.

*/

var scrTimeout, scrWidth, scrSmall, scrMedium, scrLarge;

scrSetSize();  // Call on document load

function scrSetSize() {
    // mobiles don't have window.innerWidth
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
var tta_config = {
    arrProjects: [],
    objProjects: {},
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
    project_name: "",
    arrTasks: [],
    objTasks: {},
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
    task_name: "",
    hours: "",
    minutes: "",
    seconds: "",
    task_prompt: "default",
    task_end_alarm: "default",
    task_end_filename: "default",
    task_end_notification: "default",
    progress_bar_update_seconds: "default",
    confirm_delete_phrase: "default"
}

var data_dictionary = {
    project_name: "Project Name|text|non-blank",
    task_name: "Task Name|text|non-blank",
    hours: "Hours|number|0|1000",
    minutes: "Minutes|number|0|1000",
    seconds: "Seconds|number|0|1000",
    task_prompt: "Prompt to begin Task?|switch",
    task_end_alarm: "Play sound when Task ends?|switch",
    task_end_filename: "Task ending sound filename|select|sound_filenames",
    task_end_notification: "Notification when Task ends?|switch",
    run_set_times: "Number of times to run Set|number|1|1000",
    set_prompt: "Prompt to begin Set?|switch",
    set_end_alarm: "Play sound when Set ends?|switch",
    set_end_filename: "Set ending sound filename|select|sound_filenames",
    set_end_notification: "Notification when Set ends?|switch",
    all_sets_prompt: "Prompt to begin All Sets?|switch",
    all_sets_end_alarm: "Play sound when All Sets end?|switch",
    all_sets_end_filename: "All Sets ending sound filename|select|sound_filenames",
    all_sets_end_notification: "Notification when All Sets end?|switch",
    progress_bar_update_seconds: "Seconds between countdown updates|number|1|1000",
    fail_test_1: "Hello World",
    fail_test_2: "Good-bye Cruel World...|text|lower|upper|No such place!",
    confirm_delete_phrase: "Text to confirm delete action|text"
}

var dd_field = {
    name: "",
    label: "",
    type: "",
    lower: "",
    upper: ""
}

function get_dd_field (name) {
    /* Extract dd_field from data_dictionary for easier referencing
       NOTE: lower is generic term, it can be "non-blank" for keys and
             there is no upper. If numeric and lower or upper is blank
             they are converted to 0. If select it contains all the
             possible values.
    */
    const raw = data_dictionary[name];
    if (raw == null) {
        alert("Critical Error. Data dictionary field doesn't exist: " + name);
        console.trace();
        return false;
    }
    const arr = raw.split('|')
    if (arr.length < 2) {
        alert("Critical Error. Data dictionary field has < 3 parts: " + name);
        console.trace();
        return false;
    }
    dd_field.name = name;       // Used programmatically as field name
    dd_field.label = arr[0];    // Used for labels on forms & tables
    dd_field.type = arr[1];     // Used for <table> <input> type="dd_field.type"
    if (arr.length >= 3) { dd_field.lower = arr[2]; }
    else dd_field.lower = "";   // See top of function comments
    if (arr.length >= 4) { dd_field.upper = arr[3]; }
    else dd_field.upper = "";
    if (arr.length > 4 && dd_field.type != "select") {       // See top of function comments
        alert("Critical Error. Non-Select field has > 4 parts: " + name);
        console.trace();
        return false;
    }
    return true;
}

/* UNIT TESTING
    get_dd_field("haha")
    get_dd_field("fail_test_1")
    get_dd_field("fail_test_2")
*/

function initSelectFiles() {
    /* Called on load and after drag & drop sound files */
    // Convert array of sound filenames to string delineated by |
    var replaceString = "";
    for (var i = 0; i < stockNames.length; i++) {
        if (i != 0) { replaceString += "/"; }  // Add | if not first in array
        replaceString += stockNames[i];
    }

    for (const key of Object.keys(data_dictionary)) {
        if (key.startsWith("fail_test")) { continue; }
        get_dd_field(key);
        if (dd_field.type == "select" && dd_field.lower == "sound_filenames") {
            // Update data dictionary key with list of REAL filenames
            data_dictionary[key] = dd_field.label + "|select|" + replaceString;
         }
    }
}

initSelectFiles();

// Global Names
var ttaConfig, ttaProject, ttaTask;

// Read localStorage copy of tta
readConfig();
if (ttaConfig == null) {
    ttaNewConfig();  // Create new config
    saveConfig();
}

function readConfig() {
    ttaConfig = JSON.parse(localStorage.getItem('ttaConfig'));
}
function saveConfig() {
    localStorage.setItem('ttaConfig', JSON.stringify(ttaConfig));
}
// Uncomment below to erase corrupted configuration
// ttaNewConfig();
// saveConfig();

function ttaNewConfig() {
    // Object.assign: https://stackoverflow.com/a/34294740/6929343
    ttaConfig = Object.assign({}, tta_config);
    ttaProject = Object.assign({}, tta_project);
    ttaProject.project_name = "Laundry";

    ttaNewTask("Wash Cycle");
    ttaTaskDuration(0, 16, 15);
    ttaAddTask(ttaTask);

    ttaNewTask("Rinse Cycle");
    ttaTaskDuration(0, 13);
    ttaAddTask(ttaTask);

    ttaNewTask("Dryer");
    ttaTaskDuration(0, 58, 30);
    ttaAddTask(ttaTask);

    ttaConfig.arrProjects = [ttaProject.project_name];
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
}

function ttaNewTask(name) {
    // Only used for creating test data
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    ttaTask.task_name = name;
    ttaTask.hours = ttaTask.minutes = ttaTask.seconds = 0;
}

function ttaAddTask(obj) {
    // Only used for creating test data
    ttaProject.arrTasks.push(obj.task_name);
    ttaProject.objTasks[obj.task_name] = obj;
}

function ttaTaskDuration(hours, minutes, seconds) {
    // Only used for creating test data
    ttaTask.hours = hours;
    ttaTask.minutes = minutes;
    ttaTask.seconds = seconds;
}

// +===========================================================+
// | Listen | Up | Down | Edit | Delete | Task Name | Duration |
// +--------+----+------+------+--------+-----------+----------+

// SMALL VERSION only Listen & Edit controls AND drop Duration
// HTML Codes for buttons

var tabListenSym = "&#9835;"; // options x1f50a (speaker) 9835 (notes)
var tabListenTitle = "Listen to task ending alarm";
var tabStopSym = "&#x23F9;"; // options x1f50a (speaker) 9835 (notes)
var tabStopTitle = "Stop sound now";
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
var tabConfigSym = "&#x2699";
var tabConfigTitle = "Set defaults for all Projects and Tasks";
var tabPlaySym = "&#x25b6;";
var tabPlayTitle = "Countdown each task";
var tabAddSym = "&#x2b;";
var tabAddTitle = "Add new ";
var tabBackSym = "&#x232B;";
var tabBackTitle = "View/Add/Edit/Delete Projects";
var tabListSym = "&#x2630;";
var tabProjectsTitle = "View/Add/Edit/Delete Projects";
var tabTasksTitle = "View/Add/Edit/Delete Tasks";

var ttaElm, currentTable, currentRoot, currentRow, currentMode, currentForm;

function ttaRunConfiguration (parentElm) {
    ttaElm = parentElm;
    // Setup border color #155799 is Cayman Blue
    ttaElm.style.cssText = `
        border-style: solid;
        border-width: 2px;
        border-radius: 1rem;
        border-color: #155799;
        padding: .5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    `;

    ttaApplyGlobalStyles();  // Styles for tta-table, tta-btn, .big-foot, etc.

    ttaProject = ttaConfig.objProjects[ttaConfig.arrProjects[0]];
    const cnt = ttaConfig.arrProjects.length;
    if (cnt == 1) { paintTasksTable(); }
    if (cnt > 1) { paintProjectsTable(); }
    // When no projects exist, create Sample Laundry Project
    if (cnt < 1) { ttaNewConfig(); paintTasksTable(); }
}

var ttaStyleSheet;

function ttaApplyGlobalStyles() {
    // Your CSS as text: https://stackoverflow.com/a/707580/6929343
    // root colors: Cayman green, Cayman blue, Honeydew
    // name-column fluctuates based on currentTable and scrSize
    var styles = `

:root {
    --bg-color: #159957;
    --bg-color-secondary: #155799;
    --highlight-color: yellow;
    --honeydew: #F0FFF0;
    --name-column: 3;
}

.ttaContainer {
    margin: 0px 0px 1rem;
    border-radius: 1rem 1rem 0 0;
}

.bigFoot {
    display: flex;
    justify-content: space-around;
    margin: 1rem 0px 0px;
    border-radius: 0 0 1rem 1rem;
}

.ttaContainer, .bigFoot {
    padding: .25rem .5rem;
    font-size: x-large;
    color: var(--highlight-color);
    background-color: var(--bg-color);
    background-image: linear-gradient(120deg,
        var(--bg-color-secondary), var(--bg-color));
}

.leftFoot, .centerFoot, .rightFoot { }

/* .tta-btn WAS styled with hdr-btn that has left margin */
.tta-btn {
    color: var(--bg-color);
    padding: 0px 10px;
    background-color: var(--honeydew);
    font-size: x-large;
    border-radius: 1rem;
    outline: none;  /* Remove shadow effect? NOPE :( */
}

/* Not sure why hover not working like hdr-btn does. So make separate below. */
.tta-btn:hover, .tta-btn:focus {
    background-color: DodgerBlue;
    color: #fff;
}

.inpOnOffSwitch {
    vertical-align: middle;
    width: 40px;
    height: auto;
}

select:invalid { color: grey; }

.tta-table table {
    table-layout: auto;
    width: 100%;
    border-collapse: collapse;
}

table.tta-table th, table.tta-table td {
    padding: .25rem .25rem;
}

table.tta-table th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    background: #f1f1f1;
}

@keyframes flash {
    from { background-color: grey; }
    to { background-color: inherit; }
}

.flash {
    animation:         flash 1s infinite;
}

.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    cursor: pointer;
    transition: 0.3s;
}

.closebtn:hover {
    color: black;
}

#drop-area {
    border: 2px dashed #ccc;
    border-radius: 2rem;
    min-width: 50%;
    max-width: 500px;
    margin: 2rem 0px;
    padding: 1rem;
}

#drop-area.highlight {
    border-color: purple;
}

.my-form {
    margin-bottom: 10px;
}

#gallery audio {
    margin-top: 2rem;
    margin-bottom: .5rem;
}

#gallery p {
    margin: 0rem 0 0 1rem ! important;
}

#fileElem {
    /* Prevents default "BROWSE" button and last filename(s) appearing */
    display: none;
}

#buttonGroup {
    display: none;
    justify-content: space-around;
    margin-top: 2rem;
    border-radius: 1rem;
    padding: .25rem .5rem;
    font-size: x-large;
    color: var(--highlight-color);
    background-color: var(--bg-color);
    background-image: linear-gradient(120deg,
        var(--bg-color-secondary), var(--bg-color));
}

    `  /* End of block: var styles =

    /* --name-column is NOT WORKING so that style omitted
          'table.tta-table td:nth-child(' + col + ') {\n' +
          'table.tta-table td:nth-child(var(--name-column)) {\n' +
    */

    ttaStyleSheet = document.createElement("style");
    ttaStyleSheet.innerText = styles;
    document.head.appendChild(ttaStyleSheet);

}  // End of ttaApplyGlobalStyles()

function paintProjectsTable() {
    // Assumes ttaConfig and ttaProject are populated
    // Button at bottom allows calling paintConfig(id)
    msgqClear();
    currentTable = "Projects";
    currentRoot = "tabProject";

    // Just in case another browser tab changed configuration...
    readConfig();
    //ttaConfig = JSON.parse(localStorage.getItem('ttaConfig'));
    const cnt = ttaConfig.arrProjects.length;
    const strHuman = cntHuman(cnt, "Project");
    var html = "Tim-ta - " + strHuman;
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow-y: auto; overflow-x: hidden;">\n' ;
    html += '<table id="tabProjects" class="tta-table">\n' ;
        html += tabProjectsHeading();
        for (var i = 0; i < cnt; i++) { html += tabProjectDetail(i); }
    html += '</table>\n';
    html += '</div>\n' ;

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="leftFoot">\n';  // tabControl
    html += taskButton(tabConfigSym, tabConfigTitle, "paintConfigForm");
    html += "Settings";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    html += taskButton(tabAddSym, tabAddTitle, "clickAddProject");
    html += "New Project";
    html += '</div>\n';
    html += '</div>\n';

    // TODO: Redo using: https://stackoverflow.com/a/58563703/6929343

    // Note sure why #tabProjects is required for proper column width only
    // in this case is .tta-table styling failing...
    //html += '#tabProjects table { table-layout: auto; width: 100%; }\n';
    //html += '#tabProjects th, #tabProjects td {\n' +
    //        '  padding: .25rem .25rem;\n' +
    //        '}\n'

    /*
        table {
          text-align: left;
          position: relative;
        }

        th {
          background: white;
          position: sticky;
          top: 0;
        }

        NOTE: It's necessary to wrap the table with a div with max-height:

        <div id="managerTable" >
        ...
        </div>

        WHERE:

        #managerTable {
            max-height: 500px;
            overflow: auto;
        }

    html += '#tabProjectss th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    */
    html += ttaNameColumnStyle();  // Set name column width
    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    ttaElm.scrollIntoView();
}  // End of paintProjectsTable()

function cntHuman(cnt, name) {
    // Returns: "No names", "1 name", "2 names"...
    var plural = name;
    if (cnt != 1) { plural += "s"; }
    if (cnt == 0) { var str = "No"; }
    if (cnt != 0) { var str = cnt.toString(); }
    return str + " " + plural;
}

function htmlSetContainer(html) {
    // Table / Form heading where error message appear underneath
    // Methodology abandoned in favor of popCreate()
    var container = '<div class="ttaContainer">\n' + html +
                    '<div id="ttaModal"></div>\n' +
                    '</div>'
    return container;
}

function tabProjectsHeading() {
    var html = "<tr><th colspan='";
    if (scrSmall) { html += "2"; }  // Two columns of buttons
    else { html += "6"; }           // Six columns of buttons
    html += "'>Controls</th><th>Project Name</th>";
    if (!scrSmall) { html += "<th># Tasks</th>"; }
    return html += "</tr>\n";
}

function tabProjectDetail(i) {
    ttaProject = ttaConfig.objProjects[ttaConfig.arrProjects[i]];
    var html = '<tr id="tabProject' + i + '">\n';
    if (scrSmall) {
        html += tabButton(i, tabPlaySym, tabPlayTitle, "paintRunTimers");
        html += tabButton(i, tabControlsSym, tabControlsTitle, "clickControls");
    }           // Two columns of buttons
    else {
        html += tabButton(i, tabPlaySym, tabPlayTitle, "paintRunTimers");
        html += tabButton(i, tabUpSym, tabUpTitle, "clickUp");
        html += tabButton(i, tabDownSym, tabDownTitle, "clickDown");
        html += tabButton(i, tabDeleteSym, tabDeleteTitle, "clickDelete");
        html += tabButton(i, tabListSym, tabTasksTitle, "clickTasks");
        html += tabButton(i, tabEditSym, tabEditTitle, "clickEdit");
    }           // Five columns of buttons

    html += "<td><font size='+2'>" + ttaProject.project_name + "</font></td>\n";

    if (!scrSmall) {
        const strTaskCount = ttaProject.arrTasks.length.toString();
        html += "<td>" + strTaskCount + "</td>\n";
    }
    return html += "</tr>\n";
}  // End of tabProjectDetail(i)

/* These buttons are for actions/controls box used on mobiles  jump */
function buildProjectButtons (i) {
    var tabProjectButtons = [
        "project_up", tabUpSym, tabUpTitle, "clickUp(" + i + ")",
        "project_down", tabDownSym, tabDownTitle, "clickDown(" + i + ")",
        "project_delete", tabDeleteSym, tabDeleteTitle, "clickDelete(" + i + ")",
        "project_tasks", tabListSym, tabTasksTitle, "clickTasks(" + i + ")",
        "project_edit", tabEditSym, tabEditTitle, "clickEdit(" + i + ")"
    ]
    return tabProjectButtons;
}

function paintTasksTable() {
    // Assumes ttaConfig and ttaProject are populated
    // Button at bottom allows calling paintProjectsTable()
    msgqClear();
    currentTable = "Tasks";
    currentRoot = "tabTask";

    const cnt = ttaProject.arrTasks.length;
    const strHuman = cntHuman(cnt, "Task");
    var html = ttaProject.project_name + " - " + strHuman
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    html += '<table id="tabTasks" class="tta-table">\n' ;
    html += tabTasksHeading();
        for (var i = 0; i < cnt; i++) { html += tabTaskDetail(i); }
    html += '</table>\n';
    html += '</div>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="leftFoot">\n';
    html += taskButton(tabPlaySym, tabPlayTitle, "paintRunTimers");
    html += "Run Project";
    html += '</div>\n';
    html += '<div class="middleFoot">\n';
    html += taskButton(tabAddSym, tabAddTitle, "clickAddTask");
    html += "New Task";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    html += taskButton(tabBackSym, tabProjectsTitle, "paintProjectsTable");
    html += "All Projects";
    html += '</div>\n';
    html += '</div>\n';

    html += ttaNameColumnStyle();  // Set name column width

    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    ttaElm.scrollIntoView();
}  // End of paintTasksTable()

function ttaNameColumnStyle() {
    // project_name or task_name get extra padding.
    var col = 99;
    if (scrSmall) { col = 3; }  // The "name" column to receive extra padding
    else if (currentTable == "Projects") { col = 7; }
    else if (currentTable == "Tasks") { col = 6; }
    else if (currentTable == "RunTimers") { col = 3; }
    else { console.log("ttaNameColumnStyle() - currentTable not handled:", currentTable); }
    ttaStyleSheet.style.setProperty("--name-column", col);
    // get variable from inline style - NOT WORKING
    var display_col = ttaStyleSheet.style.getPropertyValue("--name-column");
    console.log("css variable --name-column:", display_col)

    var html = "<style>\n";
    html += 'table.tta-table td:nth-child(' + col + ') {\n' +
            '  padding: .25rem 1rem;\n' +
            '}\n'
    html += "</style>\n";
    return html;
}  // End of ttaNameColumnStyle()

function tabTasksHeading() {
    var html = "<tr><th colspan='";
    if (scrSmall) { html += "2"; }  // Two columns of buttons
    else { html += "5"; }           // Five columns of buttons
    html += "'>Controls</th><th>Task Name</th>";
    if (!scrSmall) { html += "<th>Duration</th>"; }
    return html += "</tr>\n";
}

function tabTaskDetail(i) {
    ttaTask = ttaProject.objTasks[ttaProject.arrTasks[i]];

    var html = '<tr id="tabTask' + i + '">\n';
    if (scrSmall) {
        html += tabButton(i, tabListenSym, tabListenTitle, "clickListen");
        html += tabButton(i, tabControlsSym, tabControlsTitle, "clickControls");
    }           // Two columns of buttons
    else {
        html += tabButton(i, tabListenSym, tabListenTitle, "clickListen");
        html += tabButton(i, tabUpSym, tabUpTitle, "clickUp");
        html += tabButton(i, tabDownSym, tabDownTitle, "clickDown");
        html += tabButton(i, tabDeleteSym, tabDeleteTitle, "clickDelete");
        html += tabButton(i, tabEditSym, tabEditTitle, "clickEdit");
    }           // Five columns of buttons

    // TODO, each row in tabTasks and tabProjects has ID to assign .flashGrey {}
    html += "<td><font size='+2'>" + ttaTask.task_name + "</font></td>\n";

    if (!scrSmall) {
        var strDuration = hmsToString(ttaTask.hours, ttaTask.minutes, ttaTask.seconds);
        html += "<td>" + strDuration + "</td>\n";
    }
    return html += "</tr>\n";
}  // End of tabTaskDetail(i)

/* These buttons are for actions/controls box used on mobiles */
function buildTaskButtons(i) {
    var tabTaskButtons = [
        "task_listen", tabListenSym, tabListenTitle, "clickListen(" + i + ")",
        "task_up", tabUpSym, tabUpTitle, "clickUp(" + i + ")",
        "task_down", tabDownSym, tabDownTitle, "clickDown(" + i + ")",
        "task_delete", tabDeleteSym, tabDeleteTitle, "clickDelete(" + i + ")",
        "task_edit", tabEditSym, tabEditTitle, "clickEdit(" + i + ")"
    ]
    return tabTaskButtons
}

function hmsToString(hours, minutes, seconds) {
    var str = "";
    if (hours > 0) { str += hours.toString() + " Hr. " }
    if (minutes > 0) { str += minutes.toString() + " Min " }
    if (seconds > 0) { str += seconds.toString() + " Sec" }
    return str;
}

function tabButton(i, button_code, title, onclick) {
    // Add button to table detail. Return HTML with <button> code
    // code is the HTML code, E.G.&#x25b6; for Play button.
    var html = '<td><button class="tta-btn ' + onclick + '" \n' +
               'id="tabBtnId_' + onclick + i + '" \n' +
               'type="button" onclick="' + onclick + '(' + i + ')" \n' +
               'title="' + title + '">' + button_code + '</button></td>\n';
    return html;
}

function taskButton(button_code, title, onclick) {
    // Add button to table detail. Return HTML with <button> code
    // code is the HTML code, E.G.&#x25b6; for Play button.
    var html = '<button class="tta-btn ' + onclick + '" \n' +
               'type="button" onclick="' + onclick + '()" \n' +
               'title="' + title + '">' + button_code + '</button>\n';
    return html;
}

var cntTable;
function clickCommon(i) {
    currentRow = i + 1;
    if (currentTable == "Projects") {
        ttaProject = ttaConfig.objProjects[ttaConfig.arrProjects[i]];
        cntTable = ttaConfig.arrProjects.length;
    }
    else if (currentTable == "Tasks") {
        ttaTask = ttaProject.objTasks[ttaProject.arrTasks[i]];
        cntTable = ttaProject.arrTasks.length;
    }
    else if (currentTable == "RunTimers") {
        // ttaTask is already current because it is set in runAllTimers
        cntTable = ttaProject.arrTasks.length;
    }
    else {
        alert("CRITICAL ERROR: clickCommon called with index: " + i.toString())
        console.trace()
        cntTable = 0;
    }
}  // End of clickCommon(i)

function clickListen(i) {
    // i is the row number being processed. First click plays sound, second
    // click stops the sound. Notifications are also sent if applicable.

    clickCommon(i);
    /* prefix "f" short for "flag" where variable can contain "true" or "false" */
    fTaskEndAlarm = getTaskValue("task_end_alarm");
    fTaskEndNotify = getTaskValue("task_end_notification");
    //console.log("ttaTask:", ttaTask, "fTaskEndAlarm:", fTaskEndAlarm);
    var fSetEndAlarm, fSetEndNotify, fAllSetsEndAlarm, fAllSetsEndNotify;
    fSetEndAlarm = fSetEndNotify = fAllSetsEndAlarm = fAllSetsEndNotify = "false" ;    

    // If this is the last task in the list, retrieve SetEnd and AllSetsEnd
    if (i == cntTable - 1) {
        fSetEndAlarm = getProjectValue("set_end_alarm");
        fSetEndNotify = getProjectValue("set_end_notification");
        fAllSetsEndAlarm = getProjectValue("all_sets_end_alarm");
        fAllSetsEndNotify = getProjectValue("all_sets_end_notification");
    }

    if (fTaskEndAlarm == "false" && fTaskEndNotify == "false" &&
        fSetEndAlarm == "false" && fSetEndNotify == "false" &&
        fAllSetsEndAlarm == "false" && fAllSetsEndNotify == "false") {
            if (currentTable != "RunTimers") {
                // If Run Timers is active, no alarm was defined in the first place
                popCreateUniqueError("w",
                "Alarm and Notification turned off for this task.", "no_task_end");
            }
            return;
    } else { popClearByError("no_task_end"); }  // Clear any previous errors

    // Get first sounds/notifications from lowest to highest level
    var sound;
    if (fTaskEndAlarm == "true") { sound = getTaskValue("task_end_filename"); }
    else if (fSetEndAlarm == "true") { sound = getProjectValue("set_end_filename"); }
    else if (fAllSetsEndAlarm == "true") { sound = getProjectValue("all_sets_end_filename"); }

    var notify;
    if (fTaskEndNotify == "true") { notify = "Task " + ttaTask.task_name; }
    else if (fSetEndNotify == "true") { notify = "Set " + ttaProject.project_name; }
    else if (fAllSetsEndNotify == "true") { notify = "All Sets " + ttaProject.project_name; }

    // <audio> tags buried on the page with ID name same as sound filename.
    var audioControl;
    if (sound != null) {
        if (currentTable != "RunTimers") { soundAlarm (i, sound); }
        else {
            audioControl = document.getElementById(sound);
            audioControl.play();
        }
    }

    if (notify != null) { sendNotify (i, notify); }

    return audioControl;  // Used by runAllTimers to early end alarm sound
}  // End of clickListen(i)

function soundAlarm(i, sound) {
    /* From above: tabButton(i, tabListenSym, tabListenTitle, "clickListen");
    tabButton(i, button_code, title, onclick) {
        // Add button to table detail. Return HTML with <button> code
        // code is the HTML code, E.G. &#x25b6; for Play button.
        var html = '<td><button class="tta-btn ' + onclick + '" \n' +
                   'id="tabBtnId_' + onclick + i + '" \n' +
                   'type="button" onclick="' + onclick + '(' + i + ')" \n' +
                   'title="' + title + '">' + button_code + '</button></td>\n';
        return html;
    }
    */
    const btnId = "tabBtnId_clickListen" + i ;  // Rebuild btnId used in ttaButton()
    var BtnElm;  // Only used by currentTable == "Tasks"
    btnElm = document.getElementById(btnId);
    console.log("sound:", sound);
    var audioControl = document.getElementById(sound);
    if (audioControl.currentTime > 0) {
        // If already playing then stop it and reset icon to "Listen"
        resetListen(btnElm);
        audioControl.pause();  // There is no "stop()" function
        audioControl.currentTime = 0;  // Works but doesn't invoke onended event
    } else {
        // Set icon to "Stop" and schedule "Listen" icon when sound ends
        // Sound has start, set Stop Symbol into button text
        btnElm.innerHTML = tabStopSym;  // textContent can't be used because entity code
        btnElm.title = tabStopTitle;
        audioControl.play();
        audioControl.onended = function() { resetListen(btnElm); };
    }
}  // End of soundAlarm(i, sound)

function resetListen(btnElm) {
    // Set button symbol (text) back to Song Notes
    btnElm.innerHTML = tabListenSym;  // textContent can't be used because entity code
    btnElm.title = tabListenTitle;
}

function sendNotify(i, notify) {
    // i not used. Added for consistency...
    let msg = notify + " has ended.";
    sendNotification(msg);
}

function sendNotification(body, header, icon) {
    // Provide default positional arguments for those not passed
    if (arguments.length < 3) { icon = '{{ site.url }}/favicon.png' }
    if (arguments.length < 2) { header = 'Tim-ta ' +  ttaProject.project_name }
    if (arguments.length < 1) { msg = ttaTask.task_name + ' has ended.' }

    (async () => {
        // create and show the notification
        const showNotification = () => {
            // create a new notification
            const notification = new Notification(header, {
                body: body,
                icon: icon
            });

            // close the notification after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10 * 1000);

            // navigate to a URL when clicked
            notification.addEventListener('click', () => {
                console.log("Notification clicked")
                // window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
            });
        }

        // show an error message
        const showError = () => {
            const error = document.getElementById('ttaModal');
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
}  // End of sendNotification(body, header, icon)

function clickUp(i) {
    clickCommon(i);
    if (i == 0) {
        popCreateUniqueError('w', "Already at top, can't move up", 'at_top',
                             "id", currentRoot + i);
        return;
    }
    swapRows(i, i - 1);
    popClearByError('at_top');
    popClearByError('at_bottom');
}

function clickDown(i) {
    // TODO: After moving, update & save localStorage
    clickCommon(i);
    if (i == cntTable - 1) {
        popCreateUniqueError('w', "Already at bottom, can't move down", 'at_bottom',
                             "id", currentRoot + i);
        return;
    }
    swapRows(i, i + 1);
    popClearByError('at_top');
    popClearByError('at_bottom');
}

var oldTask;
var oldProject;
function clickEdit(i) {
    clickCommon(i);
    oldTask = Object.assign({}, ttaTask); // https://stackoverflow.com/a/34294740/6929343
    oldProject = Object.assign({}, ttaProject);
    if (currentTable == "Projects") { paintProjectForm("Edit"); }
                               else { paintTaskForm("Edit"); }
}

function clickTasks(i) {
    // Called from Projects Table to display Tasks Table
    clickCommon(i);
    paintTasksTable();
}

function clickDelete(i) {
    clickCommon(i);
    if (currentTable == "Projects") { paintProjectForm("Delete"); }
    else { paintTaskForm("Delete"); }
}

function clickAddTask() {
    // Create empty record for add
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    oldTask = Object.assign({}, tta_task);
    paintTaskForm("Add");
}

function clickAddProject() {
    // Create empty record for add
    ttaProject = Object.assign({}, tta_project); // https://stackoverflow.com/a/34294740/6929343
    oldProject = Object.assign({}, tta_project);
    paintProjectForm("Add");
}

// Global variables for Task countdown timers
var secondsTask, secondsSet, secondsAllSets, hhmmssTask, hhmmssSet, hhmmssAllSets;
var calledFromTable, sleepMillis, cancelAllTimers, totalAllTimersTime, wakeLock;
var pauseAllTimers;

function paintRunTimers(i) {
    // Run Project - Countdown all tasks. Scroll into view as needed.
    // When i null called from Tasks Table footer, else called from Projects Table.
    msgqClear();
    if (i != null) { clickCommon(i); }  // load selected ttaProject
    secondsTask = secondsSet = secondsAllSets = 0;
    allTimers = {};
    sleepMillis = 1000;
    cancelAllTimers = false;
    pauseAllTimers = false;
    totalAllTimersTime = 0 ;
    wakeLock = false;  // Force mobile screen to stay on
    currentForm = "formRunTimers"
    // Can be called from Projects Table so need to retrieve ttaProject for i
    // Can be called from Projects Tasks Table so ttaProject is current
    calledFromTable = currentTable;
    // console.log("currentTable / i:", currentTable, i)
    currentTable = "RunTimers"
    currentRoot = "tabTimer";

    /* TODO:
        When early exit (cancel) a bogus warning message comes up:

            "Alarm and Notification turned off for this task."
    */

    // Back to same Table
    const cnt = ttaProject.arrTasks.length;
    const strHuman = cntHuman(cnt, "Task");
    var html = ttaProject.project_name + " - Run timer for " + strHuman
    // html = htmlSetContainer(html);  // Why was this working commented out???
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    html += '<table id="tabRunTimers" class="tta-table">\n' ;
    // If All Sets used, insert it first. Then insert Set total duration
    html += tabRunTimersHeading();
        // NOTE: Timers of zero duration are omitted from list
        for (var i = 0; i < cnt; i++) { html += tabRunTimersDetail(i); }

    /* Add progress for tasks total and All sets totals */
    if (secondsSet > 0) {
        // Passed sanity check to make sure there is time for set...
        html += htmlRunTimersSet();  // Paint line for Total Tasks
        // Paint extra line for Total All Sets
        if (getProjectValue('run_set_times') > 1) { html += htmlRunTimersAllSets(); }
    }

    html += '</table>\n';
    html += '</div>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="leftFoot">\n';
    html += taskButton("10x", "Run 10 times normal speed", "testAllTimers");
    html += "Testing";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    html += taskButton(tabBackSym, "Go back to last table", "exitAllTimers");
    html += "Cancel";
    html += '</div>\n';
    html += '</div>\n';

    html += ttaNameColumnStyle();  // Set name column width

    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initTimersAfterDOM();  // Initialize elements for table row IDs
    ttaElm.scrollIntoView();  // Scroll top level element into view

    // TODO: prompt to begin running
    runAllTimers();  // Run through all timers
    // Get to this point instantly while runAllTimers() runs asynchronously
}  // End of paintRunTimers(i)

function tabRunTimersHeading() {
    // Format table heading for RunTimers form
    var html = "<tr><th>Progress</th>";
    //if (!scrSmall) { html += "<th>Remaining</th>"; }
    if (true) { html += "<th>Remaining</th>"; }
    html += "<th>Task Name</th>";
    return html += "</tr>\n";
}

function tabRunTimersDetail(i) {
    // Format table detail line for RunTimers form
    ttaTask = ttaProject.objTasks[ttaProject.arrTasks[i]];
    var strDuration = hmsToString(ttaTask.hours, ttaTask.minutes, ttaTask.seconds);
    if (strDuration == "") { return ""; }  // No duration = no timer displayed

    secondsTask = 0;  // Abundant caution.
    var sec = +ttaTask.seconds;  // TODO: Test convertNumber(ttaTask.seconds);
    sec += +ttaTask.minutes * 60;  // Tricky you can multiply a +String
    sec += +ttaTask.hours * 60 * 60;
    secondsTask = parseInt(sec, 10);
    secondsSet += secondsTask;
    //console.log("ttaProject:", ttaProject);  // What does run_set_times contain?
    run_set_times = parseInt(getProjectValue('run_set_times'), 10);
    secondsAllSets += secondsTask * run_set_times;
    //console.log("secondsTask:", secondsTask, typeof secondsTask,
    //            "secondsSet:", secondsSet, typeof secondsSet,
    //            "secondsAllSets:", secondsAllSets, typeof secondsAllSets);
    hhmmssTask = new Date(secondsTask * 1000).toISOString().substr(11, 8);
    hhmmssSet = new Date(secondsSet * 1000).toISOString().substr(11, 8);
    hhmmssAllSets = new Date(secondsAllSets * 1000).toISOString().substr(11, 8);
    //console.log("hhmmssTask:", hhmmssTask, "hhmmssSet", hhmmssSet)
    // var html = '<tr">\n';  // This shouldn't have worked before???

    var id = "tabTimer" + i;
    var sound = getTaskValue("task_end_filename");
    return htmlRunTimersDetail(id, ttaTask.task_name, i, secondsTask, sound);
}  // End of tabRunTimersDetail(i)

function htmlRunTimersSet() {
    // Format table detail Tasks Total line for RunTimers form
    var sound = getProjectValue("set_end_filename");
    return htmlRunTimersDetail("tabTimerSet", "Tasks Total",
                               ttaProject.arrTasks.length, secondsSet, sound);
}

function htmlRunTimersAllSets() {
    // Format table detail All Sets Total line for RunTimers form
    var sound = getProjectValue("all_sets_end_filename");
    return htmlRunTimersDetail("tabTimerAllSets", "All Sets Total",
                               ttaProject.arrTasks.length + 1, secondsAllSets, sound);
}

function htmlRunTimersDetail(id, name, index, seconds, sound) {
    // Return html for new Run Timers Table entry
    entryTimer = {};
    entryTimer["id"] = id;
    entryTimer["elm"] = "Pippim Promise";
    entryTimer["index"] = index;
    entryTimer["name"] = name;
    entryTimer["seconds"] = seconds;
    entryTimer["remaining"] = seconds;
    entryTimer["progress"] = 0;
    entryTimer["sound"] = sound;  // Not used!
    allTimers[id] = entryTimer;

    var html = '<tr>\n';

    html += '<td><progress id="' + id + '" value="0" max="' +
    seconds.toString() + '"></progress></td>\n';  // > 32% < possible??

    var hhmmss = new Date(seconds * 1000).toISOString().substr(11, 8);
    var strDuration = hhmmssShorten(hhmmss);
    //if (!scrSmall) { html += "<td>" + strDuration + "</td>\n"; }
    if (true) { html += "<td>" + strDuration + "</td>\n"; }
    html += "<td><font size='+2'>" + name + "</font></td>\n";

    return html += "</tr>\n";
}  // End of htmlRunTimersDetail(id, name, index, seconds, sound)

function initTimersAfterDOM() {
    // After innerHTML is set we can bet the elements and set sources
    for (const name of Object.keys(allTimers)) {
        //var element = document.getElementById(allTimers[name].id);
        let element = document.getElementById(name);
        if (element == null) {  alert("initTimersAfterDOM(): element null"); }
        allTimers[name].elm = element;
        //var i = allTimers[name].index; // var assigns last value to all occurrences
        // https://stackoverflow.com/a/36946222/6929343
        let i = allTimers[name].index;  // Must use "let" and not "var"
        element.addEventListener('click', () => { progressTouched(i, element); });
    }
}

/* START OF DUPLICATE CODE

function progressTouched(i, element) {
    /* Pop up control box for Task Name progress bar with:

        - 23EE ⏮︎ skip to start, previous
        - 23EA ⏪︎ rewind, fast backwards
        - 23EF ⏯︎ play/pause toggle
        - 23E9 ⏩︎ fast forward
        - 23ED ⏭︎ skip to end, next

        Every action (except close) clears control and
        mounts a new one.

        From: https://www.w3.org/TR/WD-wwwicn.html

         [test: &play.start;]
    &play.start; - play. Play button for starting a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.fast.forward, play.fast.reverse).
[test: &play.stop;]
    &play.stop; - stop play. Stop button for stopping a movie or sound, as on cassette or CD player (cf. play.start, play.pause, play.fast.forward, play.fast.reverse).
[test: &play.pause;]
    &play.pause; - pause. Pause button for pausing a movie or sound, as on cassette or CD player (cf. play.start, play.stop, play.fast.forward, play.fast.reverse).
[test: &play.fast.forward;]
    &play.fast.forward; - fast forward. fast-forward button for skipping along a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.start, play.fast.reverse).
[test: &play.fast.reverse;]
    &play.fast.reverse; - fast reverse. fast reverse button for going back in a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.start, play.fast.reverse).
    * /
    popClearByError("task_progress");  // Clear control box, not an error
    // Was a total progress bar clicked?
    const cntIndexTasks = ttaProject.arrTasks.length - 1
    const boolTotalBar = i > cntIndexTasks ? true : false;
    // What is the running ones-based progress bar number?
    const activeBarNo = getActiveTimerNo();
    const boolTouchedActive = i + 1 === activeBarNo ? true : false;
    //console.log("Clicked on a boolTotalBar?:", boolTotalBar);
    //console.log("Active Progress Bar number:", activeBarNo);
    //console.log("boolTouchedActive?:", boolTouchedActive);

    popClearByError("no_tasks_running");
    if (activeBarNo == 0) {
        popCreate("e", "No timers are running yet", "no_tasks_running");
        return;
    }

    popClearByError("total_task_clicked");
    if (boolTotalBar) {
        popCreate("e", "Cannot select a total progress bar",
                  "total_task_clicked", "elm", element);
        return;
    }

    popClearByError("task_not_running");
    if (!boolTouchedActive) {
        popCreate("e", "Can only select a running progress bar",
                  "task_not_running", "elm", element);
        return;
    }

    // Create our control box
    let msg = buildProgressControlBoxBody(i);
    let btn = buildProgressControlButtons(i);
    var popId = popCreate("i", msg, "task_progress", "elm", element, btn);
    popRegisterClose(popId, pcbClose)
}  // End of progressTouched(i, element)

function buildProgressControlBoxBody(i) {
    // Get task details into work buffer
    workTask = Object.assign({}, ttaTask); // https://stackoverflow.com/a/34294740/6929343
    var msg = "";
    msg += "<b><font size='+2'>Timed Task Overrides</font></b><br><br>\n";
    msg += "Project: <b>" + ttaProject.project_name +
           "</b> - Task: <b>" + workTask.task_name + "</b><br>";
    return msg;
}

function buildProgressControlButtons(i) {
    /*  list of buttons for popCreate to use:
        - 23EE ⏮︎ skip to start, previous
        - 23EA ⏪︎ rewind, fast backwards
        - 23EF ⏯︎ play/pause toggle
        - 23E9 ⏩︎ fast forward
        - 23ED ⏭︎ skip to end, next
        }
[test: &play.fast.reverse;]
        "rewind", "&play.fast.reverse;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        "rewind", "&#x23EA;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        DOUBLE LEFT ARROW:
        "rewind", "&#xAB;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        DOUBLE LEFT ARROW:
        "rewind", "&#x2BEC;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
    &play.fast.forward; - fast forward. fast-forward button for skipping along a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.start, play.fast.reverse).
        "forward", "&play.fast.forward;", "Fast forward", "pcbClickForward(" + i +")",
        "forward", "&#x23E9;", "Fast forward", "pcbClickForward(" + i +")",
        DOUBLE RIGHT ARROW:
        "forward", "&#xBB;", "Fast forward", "pcbClickForward(" + i +")",
        DOUBLE RIGHT ARROW:
        "forward", "&#x2BEE;", "Fast forward", "pcbClickForward(" + i +")",

    * /

    workTask = Object.assign({}, ttaTask); // https://stackoverflow.com/a/34294740/6929343
    var arrButtons = [
        "begin", "&#x23EE;", "Skip to start, Previous", "pcbClickBegin(" + i +")",
        "rewind", "&#x23EA;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        "play_toggle", "&#x23EF;︎", "Play/Pause toggle", "pcbClickPlayPause(" + i +")",
        "forward", "&#x23E9;", "Fast forward", "pcbClickForward(" + i +")",
        "end", "&#x23ED;", "Skip to end, Next", "pcbClickEnd(" + i +")"
    ]

    return arrButtons;
}  // End of buildProgressControlButtons(i)

function pcbClickBegin(i) { pcbClickCommon(i, "begin"); }
function pcbClickRewind(i) { pcbClickCommon(i, "rewind"); }

function pcbClickPlayPause(i) {
    pcbClickCommon(i, "play_toggle");
    pauseAllTimers = !pauseAllTimers;
}

function pcbClickForward(i) { pcbClickCommon(i, "forward"); }
function pcbClickEnd(i) { pcbClickCommon(i, "end"); }

function pcbClickCommon(i, caller) {
    console.log("pcbClickCommon(i) called from:", caller)
}

function pcbClose() {
    // Called from popClose() using preset callback msgq[idWindow] = pcbClose();
    pauseAllTimers = false;
}

END OF DUPLICATE CODE */

function progressTouched(i, element) {
    /* Pop up control box for Task Name progress bar with:

        - 23EE ⏮︎ skip to start, previous
        - 23EA ⏪︎ rewind, fast backwards
        - 23EF ⏯︎ play/pause toggle
        - 23E9 ⏩︎ fast forward
        - 23ED ⏭︎ skip to end, next

        Every action (except close) clears control and
        mounts a new one.

        From: https://www.w3.org/TR/WD-wwwicn.html

         [test: &play.start;]
    &play.start; - play. Play button for starting a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.fast.forward, play.fast.reverse).
[test: &play.stop;]
    &play.stop; - stop play. Stop button for stopping a movie or sound, as on cassette or CD player (cf. play.start, play.pause, play.fast.forward, play.fast.reverse).
[test: &play.pause;]
    &play.pause; - pause. Pause button for pausing a movie or sound, as on cassette or CD player (cf. play.start, play.stop, play.fast.forward, play.fast.reverse).
[test: &play.fast.forward;]
    &play.fast.forward; - fast forward. fast-forward button for skipping along a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.start, play.fast.reverse).
[test: &play.fast.reverse;]
    &play.fast.reverse; - fast reverse. fast reverse button for going back in a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.start, play.fast.reverse).
    */
    popClearByError("task_progress");  // Clear control box, not an error
    // Was a total progress bar clicked?
    const cntIndexTasks = ttaProject.arrTasks.length - 1
    const boolTotalBar = i > cntIndexTasks ? true : false;
    // What is the running ones-based progress bar number?
    const activeBarNo = getActiveTimerNo();
    const boolTouchedActive = i + 1 === activeBarNo ? true : false;
    //console.log("Clicked on a boolTotalBar?:", boolTotalBar);
    //console.log("Active Progress Bar number:", activeBarNo);
    //console.log("boolTouchedActive?:", boolTouchedActive);

    popClearByError("no_tasks_running");
    if (activeBarNo == 0) {
        popCreate("e", "No timers are running yet", "no_tasks_running");
        return;
    }

    popClearByError("total_task_clicked");
    if (boolTotalBar) {
        popCreate("e", "Cannot select a total progress bar",
                  "total_task_clicked", "elm", element);
        return;
    }

    popClearByError("task_not_running");
    if (!boolTouchedActive) {
        popCreate("e", "Can only select a running progress bar",
                  "task_not_running", "elm", element);
        return;
    }

    // Create our control box
    let msg = buildProgressControlBoxBody(i);
    let btn = buildProgressControlButtons(i);
    var popId = popCreate("i", msg, "task_progress", "elm", element, btn);
    popRegisterClose(popId, pcbClose)
}  // End of progressTouched(i, element)

function buildProgressControlBoxBody(i) {
    // Get task details into work buffer
    workTask = Object.assign({}, ttaTask); // https://stackoverflow.com/a/34294740/6929343
    var msg = "";
    msg += "<b><font size='+2'>Timed Task Overrides</font></b><br><br>\n";
    msg += "Project: <b>" + ttaProject.project_name +
           "</b> - Task: <b>" + workTask.task_name + "</b><br>";
    return msg;
}

function buildProgressControlButtons(i) {
    /*  list of buttons for popCreate to use:
        - 23EE ⏮︎ skip to start, previous
        - 23EA ⏪︎ rewind, fast backwards
        - 23EF ⏯︎ play/pause toggle
        - 23E9 ⏩︎ fast forward
        - 23ED ⏭︎ skip to end, next
        }
[test: &play.fast.reverse;]
        "rewind", "&play.fast.reverse;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        "rewind", "&#x23EA;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        DOUBLE LEFT ARROW:
        "rewind", "&#xAB;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        DOUBLE LEFT ARROW:
        "rewind", "&#x2BEC;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
    &play.fast.forward; - fast forward. fast-forward button for skipping along a movie or sound, as on cassette or CD player (cf. play.stop, play.pause, play.start, play.fast.reverse).
        "forward", "&play.fast.forward;", "Fast forward", "pcbClickForward(" + i +")",
        "forward", "&#x23E9;", "Fast forward", "pcbClickForward(" + i +")",
        DOUBLE RIGHT ARROW:
        "forward", "&#xBB;", "Fast forward", "pcbClickForward(" + i +")",
        DOUBLE RIGHT ARROW:
        "forward", "&#x2BEE;", "Fast forward", "pcbClickForward(" + i +")",

    */

    workTask = Object.assign({}, ttaTask); // https://stackoverflow.com/a/34294740/6929343
    var arrButtons = [
        "begin", "&#x23EE;", "Skip to start, Previous", "pcbClickBegin(" + i +")",
        "rewind", "&#x23EA;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        "play_toggle", "&#x23EF;︎", "Play/Pause toggle", "pcbClickPlayPause(" + i +")",
        "forward", "&#x23E9;", "Fast forward", "pcbClickForward(" + i +")",
        "end", "&#x23ED;", "Skip to end, Next", "pcbClickEnd(" + i +")"
    ]

    return arrButtons;
}

function pcbClickBegin(i) { pcbClickCommon(i, "begin"); }
function pcbClickRewind(i) { pcbClickCommon(i, "rewind"); }
function pcbClickPlayPause(i) {
    pcbClickCommon(i, "play_toggle");
    pauseAllTimers = !pauseAllTimers;
}
function pcbClickForward(i) { pcbClickCommon(i, "forward"); }
function pcbClickEnd(i) { pcbClickCommon(i, "end"); }

function pcbClickCommon(i, caller) {
    console.log("pcbClickCommon(i) called from:", caller)
}

function pcbClose() {
    // Called from popClose() using preset callback msgq[idWindow] = pcbClose();
    pauseAllTimers = false;
}

/* START OF CODE NEVER DUPLICATED */

function getActiveTimerNo() {
    for (const key of Object.keys(allTimers)) {
        var entry = allTimers[key];
        if (entry.seconds != entry.progress && entry.seconds != entry.remaining) {
            return entry.index + 1
        }
    }

    return 0;   /* No active timers */
}

async function runAllTimers() {
    // TODO: When cancelling, reset all timers to zero
    var timeLast = new Date().getTime();
    var myTable = document.getElementById("tabRunTimers")
    var index = 0;
    var id = "tabTimer" + index
    var entry = allTimers[id];  // A variable name easier to read
    var entrySet = allTimers["tabTimerSet"];  // Total Tasks
    ttaTask = ttaProject.objTasks[ttaProject.arrTasks[index]];
    var run_times = getProjectValue('run_set_times');
    var remaining_run_times = run_times;
    // Setup Total All Sets entry if required
    if (run_times > 1) { var entryAllSets = allTimers["tabTimerAllSets"]; }

    //console.log("run_times:", run_times);
    wakeLockOn();  // Keep mobile screen turned on

    while (true) {
        if (cancelAllTimers) { return; }  // cancel button picked in footer
        if (entry.progress == 0) {
            // A timer is ready to start
            popClearByError("task_progress");  // Clear Progress Control Box
            pauseAllTimers = false;  // Progress Control Box can pause. But not now
            if (getTaskValue('task_prompt') == "true") {
                // Prompt to begin timer
                msg = "Ready to begin Task: <b>" + ttaTask.task_name; + "</b>";
                await popPrompt('i', msg);  // Blocking function, we wait...
            }
        }

        var timeCurrent = new Date().getTime();
        var timeElapsed = timeCurrent - timeLast
        timeLast = timeCurrent
        // console.log("timeElapsed:", timeElapsed) // 1 to 12 milliseconds LOST
        // TODO: If update interval every two seconds and only one second left
        //       on timer then massaging is required.
        await sleep(sleepMillis);
        totalAllTimersTime += 1;  // Total seconds, not including pauses

        if (entry.progress >= entry.seconds) {
            // Timer has ended, sound alarm and start next timer
            var audioControl = clickListen(index);
            if (audioControl != null) {
                // When !== null used, "TypeError: audioControl is undefined"
                // Zero time is always appears so sleep 1/10th second for it to start.
                await sleep(100);
                console.log("audioControl.currentTime:", audioControl.currentTime);
                // TODO green success message while alarm sounds, then clear if stopped
                // currentTime is always 0 as if "await clickListen()" was used?
            }
            // Grab next task in project array
            index += 1;
            if (index >= ttaProject.arrTasks.length) {
                // The last task has ended, is it the last set too?
                remaining_run_times -= 1;
                if (remaining_run_times <= 0) {
                    cancelAllTimers = true;  // Exit from while(true) & updates
                    await popPrompt("s", "Run Project " +
                                    ttaProject.project_name + " completed.");
                    exitAllTimers();  // Go back to calling table
                }
                // Rebuild allTimers{} to fresh state for new set
                index = 0;
                resetTimersSet(myTable, run_times, remaining_run_times);
            }
            // Grab next task in projects array
            id = "tabTimer" + index
            entry = allTimers[id];
            name = ttaProject.arrTasks[index];
            ttaTask = ttaProject.objTasks[name];
            continue;  // Wait for first second to expire
        }

        updateRunTimer(myTable, entry);
        updateRunTimer(myTable, entrySet);
        if (run_times > 1) { updateRunTimer(myTable, entryAllSets); }

    }  // End of forever while(true) loop
}  // End of async function runAllTimers()

function updateRunTimer(myTable, entry) {
    if (pauseAllTimers) { return; }
    entry.progress += 1
    entry.remaining -= 1
    entry.elm.value = entry.progress.toString();
    updateRunTimerDuration(myTable, entry);
}

function updateRunTimerDuration(myTable, entry) {
    var hhmmss = new Date(entry.remaining * 1000).toISOString().substr(11, 8);
    var strDuration = hhmmssShorten(hhmmss);
    if (strDuration == "") { strDuration = "Done"}
    //if (scrSmall) { return; }  // Duration doesn't display on small screen
    myTable.rows[entry.index + 1].cells[1].innerHTML = strDuration;
}

function resetTimersSet(myTable, run_times, remaining_run_times) {
    for (const key of Object.keys(allTimers)) {
        var entry = allTimers[key];
        if (key == "tabTimerAllSets") {
            // NOTE: AllSets NEVER gets reset when an old set ends
            // TODO, Timer description with "Set Number x of y"
        } else {
            entry.progress = 0;
            entry.remaining = entry.seconds;
            entry.elm.value = entry.progress.toString();
            updateRunTimerDuration(myTable, entry);
        }
    }
}

async function testAllTimers() {
    // Speed up 10 times for previewing.
    // TODO: If totalAllTimersTime for more than 1 minute, confirm intent
    if (sleepMillis == 1000 && totalAllTimersTime > 30) {
        var msg = "More than 30 seconds elapsed.<br>";
        msg += "Are you sure you want to 10x speed?";
        var response = await popYesNo("w", msg, "timer_override");
        if (!response) { return }
    }

    sleepMillis = sleepMillis / 10;
    if (sleepMillis < 1) { sleeMillis = 1; }
}

async function exitAllTimers() {
    // Set cancelAllTimers to true. Forces exit from forever while(true) loop.
    // TODO: If called from Footer (not normal end) totalAllTimersTime more than 1 minute, confirm exit
    if (cancelAllTimers == false && totalAllTimersTime > 30) {
        var msg = "More than 30 seconds elapsed.<br>";
        msg += "Are you sure you want to exit?";
        var response = await popYesNo("w", msg, "timer_override");
        if (!response) { return }
    }
    cancelAllTimers = true;  // Force runAllTimers() to exit if running
    wakeLockOff();  // Allow mobile screen to sleep again

    if (calledFromTable == "Projects") { paintProjectsTable(); }
    else if (calledFromTable == "Tasks") { paintTasksTable(); }
    else {
        popCreate('e', "Unknown caller to exitAllTimers(): " + calledFromTable);
    }
}

async function wakeLockOn() {
    wakeLock = false;
    if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        popCreate('w', "Do NOT leave this screen while\n" +
                       "Timers are running! They can be\n" +
                       "suspended by power saving mode.");
    } else {
        wakeLock = false;  // Not supported
    }
}

async function wakeLockOff() {
    if (!wakeLock) { return; }
    wakeLock.release()
        .then(() => {
          wakeLock = false;
        })
}

function hhmmssShorten(hhmmss){
    var short = hhmmss;
    while(true) {
        if (short.charAt(0) === '0' || short.charAt(0) === ':' ) {
            short = short.substring(1);
        } else { break; }
    }
    return short;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* NOT USED for now
function convertNumber(value) {
    if (isNan(value)) {
        if (typeof value != "string") { return 0; }
        var value2 = Number(value);  // blank becomes 0
        if (isNan(value2)) { return 0; // string not a number }
        return value2;
    } else {
        return value; // Already a number
    }
}
*/

function clickControls(i) {
    // Popup actions/control buttons box for small screens
    // TODO: Separate functions for Projects Table and Tasks Table.
    clickCommon(i);
    /* Pop up control box for Projects Table and Tasks Table mobile screen

    */
    popClearByError("action_controls");  // Clear control box, not an error
    // Was a total progress bar clicked?
    var id, btn;
    if (currentTable == "Projects") {
        id = "tabProject" + i;
        btn = buildProjectButtons(i);
    }
    else if (currentTable == "Tasks") {
        id = "tabTask" + i;
        btn = buildTaskButtons(i);
    }
    else {
        popCreate ("e", 'currentTable not "Projects" or "Tasks":', currentTable);
        return
    }

    // Create our control box
    msg = buildActionControlBoxBody(i);
    var popId = popCreate("i", msg, "action_controls", "id", id, btn);
    popRegisterClose(popId, ctlClose);
}  // End of clickControls(i)

function buildActionControlBoxBody(i) {
    // Get task details into work buffer
    var msg = "";
    msg += "<b><font size='+2'>Actions/Controls Box</font></b><br><br>\n";
    msg += "Project: <b>" + ttaProject.project_name + "</b>\n";
    if (currentTable == "Tasks") {
        msg += " - Task: <b>" + ttaTask.task_name + "</b>\n";
    }
    msg += "<br>";
    return msg;
}

function ctlClose() {
    // Called from popClose() using preset callback msgq[idWindow] = ctlClose();
    var ctlActionsBoxActive = false;
    // console.log("ctlClose() successfully reached.")
}

function getTaskValue(key) {
    value = ttaTask[key];
    if (value == "default") { return getProjectValue(key); }
    return value;
}
function getProjectValue(key) {
    value = ttaProject[key];
    if (value == "default") { return ttaConfig[key]; }
    return value;
}

function swapRows(source, target) {
    // Called from clickUp() and clickDown()
    if (currentTable == "Projects") { swapProject(source, target); }
                               else { swapTask(source, target); }
}
function swapProject(source, target) {
    // Project parameter source index and target index
    hold = ttaConfig.arrProjects[target];
    ttaConfig.arrProjects[target] = ttaConfig.arrProjects[source];
    ttaConfig.arrProjects[source] = hold;
    // How to stick in .classGrey
    saveConfig();
    paintProjectsTable();
    // Flash grey for row just moved then remove after 3 seconds
    flashGrey("tabProject" + target);
}
function swapTask(source, target) {
    // Task parameter source index and target index
    hold = ttaProject.arrTasks[target];
    ttaProject.arrTasks[target] = ttaProject.arrTasks[source];
    ttaProject.arrTasks[source] = hold;
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
    paintTasksTable();
    // Flash grey for row just moved then remove after 3 seconds
    flashGrey("tabTask" + target);
}

function flashGrey(id) {
    // Flash grey for row just moved then remove after 3 seconds  jump
    var elm = document.getElementById(id);
    elm.classList.add("flash");
    setTimeout(function(){
        elm.classList.remove("flash");
    }, 2000);
}

function paintConfigForm() {
    // Button at bottom allows calling paintProjectTasks()
    msgqClear();
    var mode = "Edit";
    currentMode = mode;
    currentTable == "Config" // Wipe out where ever we came from
    currentForm = "formConfig";
    buildInit();  // Reset data dictionary input field controls

    var html = "Tim-ta - Settings"
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    html += '<form id="formConfig"><table id="tabConfig" class="tta-table">\n' ;
    // TODO: Put these in a loop
    html += buildLine("Default Options for Tasks");
    html += buildInput("task_prompt", mode);
    html += buildInput("task_end_alarm", mode);
    html += buildInput("task_end_filename", mode);
    html += buildInput("task_end_notification", mode);
    html += buildLine("Default Options for Set of tasks");
    html += buildInput("run_set_times", mode);
    html += buildInput("set_prompt", mode);
    html += buildInput("set_end_alarm", mode);
    html += buildInput("set_end_filename", mode);
    html += buildInput("set_end_notification", mode);
    html += buildLine("Default Options for All Sets of Tasks");
    html += buildInput("all_sets_prompt", mode);
    html += buildInput("all_sets_end_alarm", mode);
    html += buildInput("all_sets_end_filename", mode);
    html += buildInput("all_sets_end_notification", mode);
    html += buildLine("Default Options for all Projects and Tasks");
    html += buildInput("progress_bar_update_seconds", mode);
    html += buildInput("confirm_delete_phrase", mode);
    html += '</table></form>\n' ;
    html += '</div>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="centerFoot">\n';
    html += taskButton(tabBackSym, "Cancel changes", "paintProjectsTable");
    html += "Back";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    var textMode = mode;
    if (textMode == "Edit" || textMode == "Add") { textMode = "Save" }
    html += taskButton(textMode, textMode + " Settings", "clickUpdateConfig");
    html += "Settings";
    html += '</div>\n';
    html += '</div>\n';

    html += ttaNameColumnStyle();  // Set name column width
    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}  // End of paintConfigForm()

function paintProjectForm(mode) {
    // mode can be "Add", "Edit" or "Delete"
    // Button at bottom allows calling paintConfiguration()
    msgqClear();
    currentMode = mode;
    currentForm = "formProject";
    buildInit();  // Reset data dictionary input field controls

    var html = ttaProject.project_name + " - " + mode + " Project"
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    // May 1/22 remove below: <table id="tabProject" class="tta-table">\n' ;
    html += '<form id="formProject"><table class="tta-table">\n' ;
    // TODO: Why not just loop through all keys? - Because order is random!

    // TODO: Put these in a loop
    html += buildInput("project_name", mode);
    html += buildLine("Default Options for Tasks");
    html += buildInput("task_prompt", mode);
    html += buildInput("task_end_alarm", mode);
    html += buildInput("task_end_filename", mode);
    html += buildInput("task_end_notification", mode);
    html += buildLine("Options for Set of tasks");
    html += buildInput("run_set_times", mode);
    html += buildInput("set_prompt", mode);
    html += buildInput("set_end_alarm", mode);
    html += buildInput("set_end_filename", mode);
    html += buildInput("set_end_notification", mode);
    html += buildLine("Options for All Sets of tasks");
    html += buildInput("all_sets_prompt", mode);
    html += buildInput("all_sets_end_alarm", mode);
    html += buildInput("all_sets_end_filename", mode);
    html += buildInput("all_sets_end_notification", mode);
    html += buildLine("Miscellaneous Options");
    html += buildInput("progress_bar_update_seconds", mode);
    html += buildInput("confirm_delete_phrase", mode);
    html += '</table></form>\n' ;
    html += '</div>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="centerFoot">\n';
    html += taskButton(tabBackSym, "Cancel changes", "paintProjectsTable");
    html += "Back";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    var textMode = mode;
    if (textMode == "Edit" || textMode == "Add") { textMode = "Save" }
    html += taskButton(textMode, textMode + " Project", "clickUpdateProject");
    html += "Project";
    html += '</div>\n';
    html += '</div>\n';

    html += ttaNameColumnStyle();  // Set name column width
    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}

function paintTaskForm(mode) {
    // mode can be "Add", "Edit" or "Delete"
    // Button at bottom allows calling paintProjectsTable()
    msgqClear();
    currentMode = mode;
    currentForm = "formTask";
    buildInit();  // Reset data dictionary input field controls

    var html = ttaProject.project_name + " - " + mode + " Task"
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    // May 1/22 remove below: <table id="tabTask" class="tta-table">\n' ;
    html += '<form id="formTask"><table class="tta-table">\n' ;
    // TODO: Put these in a loop
    html += buildInput("task_name", mode);
    html += buildInput("hours", mode);
    html += buildInput("minutes", mode);
    html += buildInput("seconds", mode);
    html += buildLine("Begin and End Task Options");
    html += buildInput("task_prompt", mode);
    html += buildInput("task_end_alarm", mode);
    html += buildInput("task_end_filename", mode);
    html += buildInput("task_end_notification", mode);
    html += buildLine("Miscellaneous Options");
    html += buildInput("progress_bar_update_seconds", mode);
    html += buildInput("confirm_delete_phrase", mode);
    html += '</table></form>\n' ;
    html += '</div>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="centerFoot">\n';
    html += taskButton(tabBackSym, "Cancel changes", "paintTasksTable");
    html += "Back"
    html += '</div>\n';
    var textMode = mode;
    html += '<div class="rightFoot">\n';
    if (textMode == "Edit" || textMode == "Add") { textMode = "Save" }
    html += taskButton(textMode, textMode + " Task", "clickUpdateTask");
    html += "Task";
    html += '</div>\n';
    html += '</div>\n';

    html += ttaNameColumnStyle();  // Set name column width
    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}  // End of paintTaskForm(mode)

var inpSwitches;
var inpSelects;

function buildInit() {
    /*  Initialize custom objects used on form */
    inpSwitches = {};  // Reset any switches last used
    inpSelects = {};  // AKA dropdown lists
}

function buildLine(text) {
    // WIP - line not appearing but heading does get grey background
    var html = "";
    html += '<tr style="border-bottom: 1px solid black;">\n';
    //html += '<td colspan="100%"><strong>' + text + '</strong></td></tr>\n';
    html += '<th colspan="100%">' + text + '</th></tr>\n';
    return html;
}

function buildInput(key, mode) {
    /*  When building input field the "default" value is replaced with
        actual value for input. When saving, the default is obtained and
        if it matches user input then "default" phrase is saved.
    */
    var html = "<tr><td>\n";
    get_dd_field(key);
    html += dd_field.label + '</td>\n'

    // Translate value of "default" to real value from parent(s)
    var value;
    if (currentForm == "formProject") { value = getProjectValue(key); }
    else if (currentForm == "formTask") { value = getTaskValue(key); }
    else if (currentForm == "formConfig")  { value = ttaConfig[key]; }
    else { alert ("INVALID currentForm:", currentForm); console.trace(); }

    //if (value == null) { console.log ("buildInput() null value:", currentForm); console.trace(); }
    //if (value == null) { console.log ("buildInput() null value:", dd_field.type); console.trace(); }
    // select field types will not have initial value, set separately

    html += '<td>\n';
    if (dd_field.type == "switch") { html += buildSwitch(key, value, mode) }
    else if (dd_field.type == "select") { html += buildSelect(key, value, mode) }
    else { html += buildText(key, value, mode) }  // type == "text"
    html += '</td></tr>\n'

    return html;
}  // End of buildInput(key, mode)

function buildText(key, value, mode) {
    // Build text type input field
    // get_dd_field() must have been called before us
    var html = "";
    html += '<input id="' + key + '" class="tabInput" type="text" \n' +
        'oninput="validateInput()" \n' +
        'placeholder="Enter ' + dd_field.label + '" value="' + value + '" \n' +
        'name="' + key + '" ';
    if(mode == "Delete") { html += ' readonly'; }
    html += "> \n";
    return html;
}

function buildSelect(key, value, mode) {
    // Build drop down input field. elm must be set after DOM loaded
    // Can only initialize select elements after HTML declared with IDs
    inpSelects[key] = {
        id: key,
        elm: "Pippim Promise",
        value: value,
        mode: mode
    };

    var html = "";
    // TODO: When mode is delete make Select display only
    // See: inpSelects[data.id] = data.value;
    html += '<select id="' + key + '" class="tabInput" required \n' +
        'onchange="setSelectInput(this)" \n' +
        'value="' + value + '">\n' ;
    // Below is for ttaConfig configuration
    // html += buildSelectOption("", "Please Choose...");
    var options = dd_field.lower.split('/');
    for (var i=0; i<options.length; i++) {
        // When delete mode only option is the stored option
        if ( mode != "Delete" || options[i] == value) {
            html += buildSelectOption(options[i], value);
        }
    }
    html += '</select>\n';
    // console.log("select html:", html);
    return html;
}  // End of buildSelect(key, value, mode)

function buildSelectOption(name, default_name) {
    // Build one dropdown option
    // name = Option, value = Default Option
    var html="";
    html += '  <option value="' + name + '" '
    if (name == default_name) { html += 'selected ' }
    html += '>' + name + '</option>\n' ;
    return html;
}

function setSelectInput(data) {
    // screen onclick to Set chosen option value in inpSelects
    inpSelects[data.id].value = data.value;
    //console.log("setSelectInput(data) data.id, data.value:", data.id, data.value)
    //console.log("inpSelects:", inpSelects)
}

function initSelectsAfterDOM() {
    // After innerHTML is set we can bet the elements and set sources
    for (const name of Object.keys(inpSelects)) {
        element = document.getElementById(inpSelects[name].id);
        inpSelects[name].elm = element;
        //console.log("initSelectsAfterDOM() name/value:", name, inpSelects[name].value)
    }
}

function clickUpdateTask() {
    /* Process Task updates - Add, Edit and Delete Task has been requested */
    const original_index = ttaProject.arrTasks.indexOf(ttaTask.task_name);
    // When original index is < 0 it means we are adding new task
    if (!currentMode == "Add" && original_index < 0) {
        // Sanity check failed
        popCreate('e', ttaTask.task_name + " Not found in ttaProject.arrTasks");
        return false;
    }
    // Check for delete first and exit.
    if (currentMode == "Delete") {
        var confirm = getTaskValue('confirm_delete_phrase');
        if (confirmDelete(confirm)) {
            delete ttaProject.objTasks[ttaTask.task_name];
            ttaProject.arrTasks.splice(original_index, 1);
            ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
            saveConfig();

            // 2nd parameter means remove one item only
            paintTasksTable();  // What if there are no tasks left?
            return true;
        }
        else { return false; }
    }

    /* Validate input field values for Save/Add */
    if (!validateInput()) { return false; }

    // Get form input values including switches and selects
    var formValues = getInputValues();

    // Change field values to "default" if they match parent(s) value
    for (const name of Object.keys(formValues)) {
        var value = formValues[name];  // Current Task value
        var parent_value = getProjectValue(name);  // Get project's value
        // If new Task value same as Project's value it is a "default".
        if (value == parent_value) { formValues[name] = "default" }
    }

    // ttaProject.arrTasks - Add new ttaTask.task_name or rename
    if (original_index < 0) {
        // Add mode, push new key onto array
        ttaProject.arrTasks.push(formValues.task_name);
    } else {
        const new_index = ttaProject.arrTasks.indexOf(formValues.task_name);
        // The original key existed (Edit mode). Has it been changed?
        if (original_index != new_index) {
            // Replace old key with new at same spot
            ttaProject.arrTasks[original_index] = formValues.task_name;
        } // At this point it's Edit mode and key hasn't changed.
    }

    // Update object values
    ttaProject.objTasks[formValues.task_name] = formValues;
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
    paintTasksTable()
    return true;
}  // End of clickUpdateTask()

function clickUpdateProject() {
    /* Process Project updates - Add, Edit or Delete Project requested */
    const original_index = ttaConfig.arrProjects.indexOf(ttaProject.project_name);
    // When original index is < 0 it means we are adding new task
    if (!currentMode == "Add" && original_index < 0) {
        // Sanity check failed
        popCreate('e', ttaProject.project_name + " Not found in ttaConfig.arrProjects");
        return false;
    }
    // Check for delete first and exit.
    if (currentMode == "Delete") {
        var confirm = getProjectValue('confirm_delete_phrase');
        if (confirmDelete(confirm)) {
            delete ttaConfig.objProjects[ttaProject.project_name];
            ttaConfig.arrProjects.splice(original_index, 1);
            saveConfig();
            paintProjectsTable();  // What if there are no Projects left?
            return true;
        }
        else { return false; }
    }

    /* Validate input field values for Save/Add */
    if (!validateInput()) { return false; }

    // Get form input values including switches and selects
    // NOTE formValues is really formValues
    var formValues = getInputValues();

    // Change field values to "default" if they match parent(s) value
    for (const name of Object.keys(formValues)) {
        var value = formValues[name];  // Current value
        var parent_value = ttaConfig[name];  // Get Config's value
        // If new Project value same as Config's value it is a "default".
        if (value == parent_value) { formValues[name] = "default" }
        // Below is different than updateTask
        ttaProject[name] = formValues[name];
    }

    // taaConfig - Add new project name, or save changed name
    if (original_index < 0) {
        // Add mode, push new key onto array
        ttaConfig.arrProjects.push(formValues.project_name);
    } else {
        const new_index = ttaConfig.arrProjects.indexOf(formValues.project_name);
        // The original key existed (Edit mode). Has it been changed?
        if (original_index != new_index) {
            // Replace old key with new at same spot
            ttaConfig.arrProjects[original_index] = formValues.project_name;
        } // At this point it's Edit mode and key hasn't changed.
    }

    // Update Project values
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
    paintProjectsTable();
    return true;
}  // End of clickUpdateProject()

function clickUpdateConfig() {
    /* Update Configuration - currentMode will always be "Edit" */

    /* Validate input field values before Saving */
    if (!validateInput()) { return false; }

    // Get form input values including switches and selects
    // NOTE formValues is really formValues
    var formValues = getInputValues();

    // Copy new values from Form into Config
    for (const name of Object.keys(formValues)) {
        ttaConfig[name] = formValues[name];
    }

    // Update Config values
    saveConfig();
    // Configuration only called from Projects Table so go back to it.
    paintProjectsTable();
    return true;
}  // End of clickUpdateConfig()

function validateInput() {
    // Validate input fields
    var formValues = getInputValues();

    // Validation - Non-blank Task name, numeric fields, "true" or "false"
    // Assign "default" to fields if they match parent
    var no = 0;
    for (const name of Object.keys(formValues)) {
        no += 1;
        if (name == "") { console.log("validateInput() empty name on:",
                                      currentForm, "formValues:", formValues[""]);
                          console.log("Current field Number:", no);
                          alertError("validateInput() empty nam");
                          continue;
        }
        var value = formValues[name];
        get_dd_field(name);

        if (!validateNonBlank(value)) { return false; }
        // task_name can't be duplicates
        if (name == "task_name" && !validateTaskName (value)) { return false; }
        if (name == "project_name" && !validateProjectName (value)) { return false; }
        if (!validateNumber(value)) { return false; }
        if (dd_field.type == "number") { value = 0 + value } // '' to 0
        if (!validateRange(value)) { return false; }
        if (!validateRadioButton(value)) { return false; }
    }
    return true;
}  // End of validateInput()

function getInputValues() {
    // Get input field values from <form> for "text" ONLY
    // Separate functions required for "switch" and "select"
    var elements = document.getElementById(currentForm).elements;
    var formValues = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        if (item.name == "") {
            //console.log("getInputValues() blank item.name:", item.value);
            // You can see when select use it's value is returned but it has no key
            continue;
        }
        formValues[item.name] = item.value;
    }

    // Get switch values and add to formValues
    for (const name of Object.keys(inpSwitches)) {
        if (name == "") { console.log("inpSwitches empty name:", inpSwitches); continue; }
        /* SWITCH
            inpSwitches[name] = {
                id: fullId,
                elm: "Pippim Promise",
                value: bool,
                mode: mode
        */
        formValues[name] = inpSwitches[name].value;
    }
    // Add select values to formValues
    // console.log("getInputValues() inpSelects:", inpSelects)
    for (const name of Object.keys(inpSelects)) {
        if (name == "") { console.log("getInputValues() inpSelects empty name:", inpSelects); continue; }
        /* SELECT
            inpSelects[key] = {
                id: key,
                elm: "Pippim Promise",
                value: value,
                mode: mode
        */
        //console.log("getInputValues() name/value", name, inpSelects[name].value);
        if (inpSelects[name].id != name) {
            console.log("names differ:", inpSelects[name].id, name)
        }
        formValues[name] = inpSelects[name].value;
        //console.log("getInputValues() read back name:", formValues[name])
    }

    return formValues;
}  // End of getInputValues()

function validateProjectName(value) {
    // The task_name key must be unique
    popClearByError("project_name")
    const new_index = ttaConfig.arrProjects.indexOf(value);
    if (new_index < 0) { return true; }  // New key wasn't found

    const original_index = ttaConfig.arrProjects.indexOf(ttaProject.project_name);
    if (original_index == new_index) { return true; }  // Key hasn't changed

    // We have a new key that already exists
    popCreateUniqueError("e", dd_field.label + " must be unique", "project_name",
                         "id", dd_field.name);
    return false;
}

function validateTaskName(value) {
    // The task_name key must be unique
    popClearByError("task_name")
    const new_index = ttaProject.arrTasks.indexOf(value);
    if (new_index < 0) { return true; }  // New key wasn't found

    const original_index = ttaProject.arrTasks.indexOf(ttaTask.task_name);
    if (original_index == new_index) { return true; }  // Key hasn't changed

    // We have a new key that already exists
    popCreateUniqueError("e", dd_field.label + " must be unique", "task_name",
                         "id", dd_field.name);
    // "id", dd_field.name
    return false;
}

function validateNonBlank(value) {
    // NOTE: get_dd_field must be called first.
    if (dd_field.lower == "non-blank") {
        if (value.trim() == "") {
            //alert(dd_field.label + " cannot be blank");
            popCreateUniqueError("e", dd_field.label + " cannot be blank", "blank",
                                 "id", dd_field.name);
            return false;
        }
    }
    popClearByError("blank")
    return true;
}

function validateNumber(value) {
    if (dd_field.type != "number") { return true; } // Not "number" type
    // console.log("value: '" + value + "' typeof:", typeof value)
    // From: https://stackoverflow.com/a/175787/6929343
    if (isNaN(value)) {
        //alert(dd_field.label + " must be a number");
        popCreateUniqueError("e", dd_field.label + " must be a number", "number",
                             "id", dd_field.name);
        return false;
    }
    popClearByError("number")
    return true;
}

function validateRange(value) {
    popClearByError("range")
    if (dd_field.type != "number") { return true; } // Not "number" type
    lower = parseInt(dd_field.lower, 10);  // base 10
    upper = parseInt(dd_field.upper, 10);  // base 10
    if (value >= lower && value <= upper) { return true; }

    var msg = dd_field.label + " must be between " + lower.toString() + " and " +
          upper.toString();
    popCreateUniqueError("e", msg, "range", "id", dd_field.name);

    return false;
}

function validateRadioButton(value) {
    // SHORT TERM (I think?)
    // LONG TERM still needed for sound filenames if user deleted one?
    // Thorough Doc: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
    if (dd_field.type != "radio") { return true; } // Not "number" type
    return true;
}

function validateSelect(value) {
    // SO Example: https://stackoverflow.com/a/44736840/6929343
    // Thorough Doc: https://www.w3schools.com/howto/howto_js_dropdown.asp
    if (dd_field.type != "select") { return true; } // Not "number" type
    return true;
}

// =================================  SWITCHES  ===============================
var switch_on_image = "{{ site.url }}/assets/img/icons/switch_on_right.png"
var switch_off_image = "{{ site.url }}/assets/img/icons/switch_off_left.png"

function buildSwitch(name, bool, mode) {
    // get_dd_field() must have been called before us
    // Must initialize switches with images after HTML declared with IDs
    //const fullId = "inp_switch_" + name;
    const fullId = name;  // https://www.impressivewebs.com/avoiding-problems-with-javascript-getelementbyid-method-in-internet-explorer-7/
    // console.log("name passed to buildSwitch:", name, bool, mode);
    inpSwitches[name] = {
        id: fullId,
        elm: "Pippim Promise",
        value: bool,
        mode: mode
    };
    // Below src doesn't matter because it is reset after DOM load
    var html = '<img class="inpOnOffSwitch" id="' + fullId + '"  \n' +
               'src="{{ site.url }}/assets/img/icons/switch_off_left.png" >\n';
    // NOTE: parent provides > at end
    //console.log("html:", html)
    return html;
}  // End of buildSwitch(name, bool, mode)

function initSwitchesAfterDOM() {
    // After innerHTML is set we can bet the elements and set sources
    //console.log("initSwitchesAfterDOM()");
    for (const name of Object.keys(inpSwitches)) {
        element = document.getElementById(inpSwitches[name].id);
        inpSwitches[name].elm = element;
        element.addEventListener('click', () => { toggleSwitch(name); });
        setSwitch(name, inpSwitches[name].value);
        //console.log("switch name/value:", name, inpSwitches[name].value);
    }
    //console.log("inpSwitches:", inpSwitches);
}

function setSwitch(name, bool) {
    // Initialize switches with values after HTML declared with IDs
    inpSwitches[name].value = bool;
    if (bool == "true" ) { inpSwitches[name].elm.src = switch_on_image;
                           inpSwitches[name].elm.title = "Click to switch off"; }
                    else { inpSwitches[name].elm.src = switch_off_image;
                           inpSwitches[name].elm.title = "Click to switch on"; }
}

function toggleSwitch(name) {
    if (inpSwitches[name].mode == "Delete") { return; }  // readonly mode
    if (inpSwitches[name].value == "true") { setSwitch(name, "false"); }
                                      else { setSwitch(name, "true"); }
}

function confirmDelete(text) {
    if (text == "") { return true; }
    let value = prompt('Enter "' + text + '" (without the quotes) to confirm:');
    return (value.toLowerCase() == text.toLowerCase());
}

/* Drop area for Custom Sound Files

    tim-ta.md contains:

<span id="customSelect"><font size='+3'>Sound Screening in Memory (not saved yet)</font></span>

<div id="drop-area">
    <form class="my-form">
        <p>Upload multiple files with the file dialog or by dragging and dropping files onto the dashed region</p>
        <input type="file" id="fileElem" multiple accept="audio/*" onchange="handleFiles(this.files)">
        <label class="button" for="fileElem">Select some files</label>
    </form>
    <div id="gallery"></div>
    <div id="buttonGroup" >
        <div class="leftFoot">
            <button id="btnCancel" class="tta-btn" title="Clear list of files"
                type="button" onclick="clickCancel()" >&#x232B;</button>
            Remove files
        </div>
        <div class="rightFoot">
            <button id="btnUpload" class="tta-btn" title="Upload to local storage"
                type="button" onclick="clickUpload()" >&#x2b;</button>
            Upload files
        </div>
    </div>
</div>

*/

var dropArea;
document.addEventListener("DOMContentLoaded", function(event){
    // Must wait due to error: Uncaught TypeError: dropArea is null
    var dropArea = document.getElementById('drop-area')
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })
    dropArea.addEventListener('drop', handleDrop, false)
});

var uploadKeys = []
var uploadNames = []

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
}

/* Create hold for when Cancel clicked */
var customSoundControlHold = Object.assign({}, customSoundControl)

function previewFile(file) {
    /*  Firefox will let you drop the same filename twice. Chrome will not.
        For consistency then, if filename already exists, skip adding.
    */
    if (uploadNames.includes(file.name)) { return }

    let reader = new FileReader()
    reader.readAsDataURL(file)  // Asynchronous function
    reader.onloadend = function() {  // Wait until async loaded
        let audio = document.createElement('audio')  // audio element
        audio.src = reader.result  // set audio source
        audio.controls="true"  // Paints control box
        document.getElementById('gallery').appendChild(audio)  // stick it in

        fileInfo("<b>" + file.name + "</b>")  // Add name to gallery
        let html = "Size: <b>" + file.size.toLocaleString() +
               "</b>&emsp;&emsp;Type:&nbsp;<b>" + file.type + "</b>"
        fileInfo(html)  // add size and type to gallery

        var base64FileData = reader.result.toString()
        /*  TODO: Cannot assign just any name because it might match ID
                  Must use "Custom_999.ext" as new fileURL name.
                  Can register Custom_999.ext at time of reading localStorage.
                  If a file is deleted, then another takes its place automatically.
                  An object tracks custom[key]=filenameCustomSound
        */
        var key = makeSoundFilename(file.name, file.size, file.type)
        var mediaFile = {
            fileUrl: key,
            name: file.name,
            size: file.size,
            type: file.type,
            src: base64FileData
        }
        localStorage.setItem("x" + key, JSON.stringify(mediaFile))
        uploadKeys.push(key)
        uploadNames.push(file.name)
        console.log("uploadNames:", uploadNames)
    }
}

function makeSoundFilename(name, size, type) {
    /*  From: sound.js (EVENTUALLY MOVE THIS FUNCTION THERE)
    */
    const existing = checkSoundFilename(name)
    if (existing) {
        // Only thing to change is cscRecord['cscTimeAdded']
        customSoundControl.cscRecords[existing].cscTimeAdded = new Date().getTime()
        return
    }

    var key = CUSTOM_SOUND_ROOT + CUSTOM_SOUND_SEP +
              pad(customSoundControl['cscNextNumber'], CUSTOM_SOUND_DIGITS)
    if (key < customSoundControl['cscFirstKey']) {
        customSoundControl['cscFirstKey'] = key
    }
    if (key > customSoundControl['cscLastKey']) {
        customSoundControl['cscLastKey'] = key
    }
    customSoundControl['cscCount'] += 1
    customSoundControl['cscNextNumber'] += 1
    // Create short hand reference allRecords
    var record = {}
    record['cscKey'] = key
    record['cscName'] = name
    record['cscSize'] = size
    record['cscType'] = type
    record['cscTimeAdded'] = new Date().getTime()

    customSoundControl.cscRecords[key] = record

    return(key)
}

function checkSoundFilename(name) {
    // If audio filename exists return the custom key, else return undefined
    for (const key of Object.keys(customSoundControl.cscRecords)) {
        if (customSoundControl.cscRecords[key].cscName == name) { return key }
    }
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function fileInfo(info) {
    /* Add single text line (paragraph) to gallery */
    var par = document.createElement("p")
    par.innerHTML = info
    document.getElementById('gallery').appendChild(par)
}

function clickCancel() {
    // Remove temp files
    for (var i = 0; i < uploadKeys.length; i++) {
        localStorage.removeItem("x" + uploadKeys[i])
    }
    // Restore hold before files selected for uploading
    customSoundControl = Object.assign({}, customSoundControlHold)
    initializeFiles()
    document.getElementById('customSelect').scrollIntoView()
}

function clickUpload() {
    // Rename temp files to real files
    for (var i = 0; i < uploadKeys.length; i++) {
        localStorage.setItem(uploadKeys[i], localStorage.getItem("x" + uploadKeys[i]))
        localStorage.removeItem("x" + uploadKeys[i])
    }
    localStorage.setItem(CUSTOM_SOUND_CONTROL,
                         JSON.stringify(customSoundControl))
    initializeFiles()
    paintCustomSounds()
    document.getElementById('customSounds').scrollIntoView()
}

function initializeFiles() {
    uploadKeys = []
    uploadNames = []
    customSoundControlHold = Object.assign({}, customSoundControl)
    document.getElementById('gallery').textContent = ""
    document.getElementById('buttonGroup').style.display = "none"
}

function handleFiles(files) {
    files = [...files]
    files.forEach(previewFile)
    document.getElementById('buttonGroup').style.display = "flex"
}

/*  Build Custom Sounds div

    Parent contains: <div id="PaintedSounds"></div>

    This function updates HTML with:
    <ul>
    <li><b>Custom_001.wav</b>
    &emsp;&emsp;<audio controls="true" id="Alarm_01.wav"></audio><br>
    &emsp;&emsp;Size:&nbsp;<b>999,999</b>&emsp;Type:&nbsp;<b>type_str</b>
    <br><br>
    </ul>
 */

function paintCustomSounds() {
    var html = "<ul>"
    console.log("customSoundControl:", customSoundControl)
    for (const key of Object.keys(customSoundControl.cscRecords)) {
        var record = customSoundControl.cssRecords[key]
        html += "<li><b>" + key
        html += '</b>&emsp;&emsp;<audio controls="true" id="'
        html += key + '"></audio><&emsp;&emsp; Size: &nbsp;'
        html += record.size.toLocaleString()
        html += "</b>&emsp;&emsp;Type:&nbsp;<b>" + record.type + "</b></li>"
    }
    html += "</ul>"

    console.log("html:", html)
    document.getElementById("PaintedSounds").innerHTML = html
}

/* CONTROLS and MESSAGES boxes

    WARNING: These messages work after innerHTML has been set

    NOTE: Click on title bar to drag message.

    When mounting new table or form, clear existing queue with msgqClear();

    pasted containing "ABCD". As user backspaces over D, then C, B and A
    we don't want message to reappear. After backspacing is completed the
    error message is removed.

    User can click "X" to clear the error message

    A reference ID or element can be passed to make Window position mount
    relative to it. Otherwise, just below the "heading" line Project X
    or Task X. The <div> ID is ttaModal. The error message is appended
    child <div> with class name "alert <qualifier>".

*/

var msgq = {};  // Message Queue. Data struction is popEntry
var btnBox = {};  // Extra buttons boxed up for small screen which is <= 640 px wide.
var popIndex = 0;  // Key into msgq returned from popCreate()
var popEntry = {
        index: undefined,
        elmWindow: undefined,
        typeMsg: undefined,
        elmLink: undefined,
        typeIdOrElm: undefined,
        errorId: undefined,
        rectMounted: undefined,
        rectTarget: undefined,
        cntRepeats: undefined,
        html: undefined,
        style: undefined,
        buttons: {}
    };

function msgqClear() {
    // Clear existing messages and control box from document
    for (const key of Object.keys(msgq)) { popClearByEntry(msgq[key]); }
    // Reset objects and counters
    msgq = {};
    btnBox = {};
    popIndex = 0;
}

var popResponse;    // true/false value
var popYesNoId;     // Assumes only 1 yes/no window appears at a time...

async function popYesNo(msg_type, msg, error_id) {
    /* Prompt with Yes/No buttons, return true if Yes. */
    popResponse = false;
    var arrBtn = [
        "response_no", "No", "Don't do it", "popNo()",
        "response_yes", "Yes", "Proceed", "popYes()"
    ]

    // Create our prompt window with two buttons
    popYesNoId = popCreateUniqueError(msg_type, msg, error_id, "elm", ttaElm, arrBtn);
    var elmWindow = document.getElementById(popYesNoId);
    if (popYesNoId == null) { return false; }

    // popRegisterClose(popYesNoId, popNo);
    // Aha don't want above! after "Yes" window closes and response is "No"
    while(true) {
        await sleep(50);
        // When a popCreate window is closed, it disappears after 600ms
        if (document.body.contains(elmWindow)) { continue; }
        return popResponse;
    }
}  // End of async function popYesNo(msg_type, msg, error_id)

function popYes() { popResponse = true; popClose(popYesNoId); }
function popNo() { popResponse = false; popClose(popYesNoId); }

async function popPrompt(msg_type, msg, error_id) {
    /* Display message and wait for acknowledgement. */
    var idWindow = popCreate(msg_type, msg, error_id);
    var elmWindow = document.getElementById(idWindow);

    while(true) {
        await sleep(50);
        // When a popCreate window is closed, it disappears after 600ms
        if (document.body.contains(elmWindow)) { continue; }
        return;  // Clicked X to close, or clicked "OK" & element removed
    }
}  // End of async function popPrompt(msg_type, msg, error_id)

function popGetIdsByError(error_id) {
    // Returns array of idWindow matching error ID
    var idWindows = [];
    for (const key of Object.keys(msgq)) {
        let entry = msgq[key];
        if (entry.error_id == error_id) { idWindows.push(entry.idWindow); }
    }
    return idWindows;
}

function popClearByError(error_id) {
    // Clear a specific error_id from document
    // The error may have occurred multiple times during validation
    for (const key of Object.keys(msgq)) {
        let entry = msgq[key];
        if (entry.error_id == error_id) { popClearByEntry(entry); return; }
    }
}

function popClearById(idWindow) {
    // Clear a specific window id (same as msgq[key]) from document
    // The error may have occurred multiple times during validation
    for (const key of Object.keys(msgq)) {
        let entry = msgq[key];
        if (entry.idWindow == idWindow) { popClearByEntry(entry); return; }
    }
    //console.log("popClearById() not found:", idWindow)
    // When window closed by popYesNo we get here.
}

function popClearByEntry(entry) {
    /* Delete element from document, set to active to "false" */
    var elm = entry.elmWindow;
    if (document.contains(elm)) {
        elm.remove();  // Might move below bottom of document but still there
    }
    if (elm.parentNode) {
        elm.parentNode.removeChild(elm);  // Now it's really gone from document
    }
    delete msgq[entry.idWindow];  // Remove from msgq {}
}
function popRegisterClose(idWindow, callback) {
    msgq[idWindow].callbackClose = callback;
}

function popClose(idWindow) {
    // Close window by ID name
    // elmWindow = idWindow.getElementsByClassName("msgq-window")[0];
    elmWindow = document.getElementById(idWindow);
    // TODO: Grab entry for idWindow and check for popClose call back
    if (elmWindow == null) {
        alert("popClose() received bad idWindow: " + idWindow);
        return;
    }
    elmWindow.style.opacity = "0";
    setTimeout(function(){
        elmWindow.style.display = "none";
        if (idWindow in msgq) {
            if (msgq[idWindow].callbackClose != null) { msgq[idWindow].callbackClose(); }
        }
        popClearById(idWindow);
    }, 600);
}

function popCreateUniqueError(msg_type, msg, error_id, id_elm_type, id_elm, buttons) {
    // Create window if same error isn't displayed yet. Prevents multiple
    // windows for same thing, E.G. "Name cannot be blank".
    var popId;
    var existingIds = popGetIdsByError(error_id);
    if (existingIds.length == 0) {
        popId = popCreate(msg_type, msg, error_id, id_elm_type, id_elm, buttons);
        return popId;
    } else {
        return existingIds[0];  /* Hopefully there is only 1. TODO: List when > 1 */
    }

}

function popCreate(msg_type, msg, error_id, id_elm_type, id_elm, buttons) {
    /*  MAJOR FUNCTION to display error messages (and control boxes)
        msg_type = "e" red error message
                   "w" orange warning message
                   "i" blue information message
                   "s" green success message
        msg = message text where <br> will start a new line.
        error_id = optional error number or name.
        id_elm_type = "id" a ID is passed in next field
                      "elm" an element is passed in next field.
        elm = an ID or an element. If an ID convert it to an element.
        buttons = array of 5 fields per button:
            "name", "text", "title", "onclick(arg)"

        RETURNS the window element created
    */
    // Sanity checks - After writing your development code you can delete
    // these prior to migration to production environment.
    if (arguments.length < 2) {
        popCreate('e', "msgAlert() minimum of 2 arguments required:\n" +
              "msg_type, msg, id_elm_type, elm, error_id, clear_flag");
        console.trace();
        return;
    }
    if (msg_type != "e" && msg_type != "w" &&
        msg_type != "i" && msg_type != "s") {
            //popCreate('e', "msgAlert() msg_type must be 'e', 'w', 'i' or 's'.");
            // Catastrophe when you call popCreate from itself (CPU burn out)
            alert('e', "msgAlert() msg_type must be 'e', 'w', 'i' or 's'.");
            console.trace();
            return;
    }
    var elm = id_elm; // May be undefined, an element or an ID
    if (arguments.length >= 4 && id_elm_type == "id") {
        if (arguments.length < 5) {
            alert('e', "msgAlert() when 'id_elm_type' = 'id', next argument required.");
            console.trace();
            return;
        }
        // Rewrite id in elm parameter with actual element.
        elm = document.getElementById(id_elm);
    }

    var p = {};
    p['idWindow'] = "popIndex" + popIndex;
    p['elmWindow'] = document.createElement('div');
    //p['elmWindow'] = document.createElement('template');  // BROKEN
    p['msg_type'] = msg_type;  // e, w, i or s
    p['msg'] = msg;  // Might contain HTML
    p['id_elm_type'] = id_elm_type;
    p['error_id'] = error_id;
    p['id_elm'] = id_elm;
    p['elmLink'] = elm;
    p['active'] = "true";

    var html = "";
    html += popBuildHtml(msg_type, msg, popIndex, buttons);
    html += popBuildStyle(msg_type);
    p['elmWindow'].innerHTML = html;
    document.body.appendChild(p['elmWindow']);  // Created <div> element

    if (p['elmLink'] == null) {
        //console.log("p['elmLink'] not passed. Setting to ttaElm");
        p['elmLink'] = ttaElm;
    }

    var elmDraggable = document.getElementById(p['idWindow']);  // ID inside <div>
    let rect = p['elmLink'].getBoundingClientRect();
    var oldX = parseInt(rect.left + window.scrollX);  // Get link (anchor reference point)
    var oldY = parseInt(rect.top + window.scrollY);  //  x (left) and y (top
    elmDraggable.style.left = (oldX + 20) + "px";
    elmDraggable.style.top = (oldY + 40) + "px";  // target line visible
    dragElement2(elmDraggable);  // Hooks to make window draggable by title bar

    popIndex += 1;  // Our new entry count and the next index to add
    msgq[p['idWindow']] = p;  // Add entry to msgq object
    return p['idWindow'];  // Return key to caller

}  // End of popCreate(msg_type, msg, error_id, id_elm_type, id_elm, buttons)

function popBuildHtml(msg_type, msg, index, buttons) {
    var msg_head = "", msgq_class = "";
    if (msg_type == "e") { msg_head = "ERROR"; msgq_class = "msgq-error"; }
    if (msg_type == "w") { msg_head = "WARNING"; msgq_class = "msgq-warning"; }
    if (msg_type == "i") { msg_head = "Info"; msgq_class = "msgq-info"; }
    if (msg_type == "s") { msg_head = "Success"; msgq_class = "msgq-success"; }
    var html = "";
    // For historical reasons must be "_header" not "-header" to drag window
    html += '<div id="popIndex' + index + '" class="msgq-window">\n';
    html += '  <div id="popIndex' + index + '_header" \n';
    html += '       class="msgq-window-header ' + msgq_class + '">' + msg_head +
                    '&emsp; (Click here to drag)\n';
    html += '    <span class="msgq-window-close closebtn" \n';
    html += '      onclick="popClose(\'popIndex' + index + '\')" \n';
    html += '      >&#65336;\n';  // #65336 latin full x is latter: ✕XＸ
    html += '    </span>\n';
    html += '  </div>\n';
    html += '  <div class="msq-window-body">\n';
    html += '    <p>' + msg + '</p>\n';
    html += '  </div>\n';
    html += '  <div class="msgq-window-buttons"> <!-- Buttons: OK -->\n';
    if (buttons == null) {
    html += '    <button class="tta-btn msgq-window-button"\n';
    html += '      title="Click to close" \n';
    html += '      onclick="popClose(\'popIndex' + index + '\')" \n';
    html += '       >OK</button>\n';
    } else {
    html += htmlButtons(buttons);
    }
    html += '  </div>\n';
    html += '</div>\n';
    return html;
}  // Ebd if popBuildHtml(msg_type, msg, index, buttons)

function htmlButtons(buttons) {
    /* DECLARED ABOVE:
        var arrButtons = [
        "begin", "&#x23EE;", "Skip to start, Previous", "pcbClickBegin(" + i +")",
        "rewind", "&#x23EA;", "Rewind, Fast backwards", "pcbClickRewind(" + i +")",
        "play_toggle", "&#x23EF;︎", "Play/Pause toggle", "pcbClickPlayPause(" + i +")",
        "forward", "&#x23E9;", "Fast forward", "pcbClickForward(" + i +")",
        "end", "&#x23ED;", "Skip to end, Next", "pcbClickEnd(" + i +")"
    ]
    */
    var html = "";
    for (var i = 0; i < buttons.length; i += 4) {
        let id = buttons[i];
        let text = buttons[i+1];
        let title = buttons[i+2];
        let onclick = buttons[i+3];
        html += '    <button id="'+ id + '" \n';
        html += '      class="tta-btn msq-window-button" \n';
        html += '      title="' + title + '" \n';
        html += '      onclick="' + onclick + '" \n';
        html += '      >' + text + '</button>\n';
    }
    return html;
}  // End of htmlButtons(buttons)

function popBuildStyle(msg_type) {
    var html = "<style>\n";

    html += '.msgq-window {\n' +
            '  position: absolute;\n' +
            '  z-index: 9;\n' +
            '  opacity: 1;\n' +
            '  transition: opacity 0.6s;\n' +
            '  max-width: 90vw;\n' +
            '  max-height: 95vh;\n' +
            '  overflow: auto;\n' +
            '  background-color: #f1f1f1;\n' +
            '  border: .2rem solid #d3d3d3;\n' +
            '  color: black;\n' +
            '  text-align: center;\n' +
            '  padding: .5rem;\n' +
            '}\n';

    html += '.msgq-window-header {\n' +
            '  cursor: move;  z-index: 10;\n' +
            '  color: #fff;\n' +
            // Prevent touch move from highlighting text
            //'  -webkit-touch-callout: none;\n' +
            //'  -webkit-user-select: none;\n' +
            //'  -khtml-user-select: none;\n' +
            //'  -moz-user-select: none;\n' +
            //'  -ms-user-select: none;\n' +
            //'  user-select: none;\n' +
            //'  -webkit-tap-highlight-color:rgba(0,0,0,0);\n' +
            '}\n';

    html += '.msgq-window-header.msgq-error { background-color: #f44336; }\n';
    html += '.msgq-window-header.msgq-warning { background-color: #ff9800; }\n';
    html += '.msgq-window-header.msgq-info { background-color: #2196F3; }\n';
    html += '.msgq-window-header.msgq-success { background-color: #04AA6D; }\n';

    html += '.msgq-window-buttons {\n' +
            '  display: flex;\n' +
            '  justify-content: space-around;\n' +
            '  min-width: 350px;\n' +
            '  width: 100%;\n' +
            //'  margin: .25rem;\n' +
            '  padding: .25rem;\n' +
            //'  border: 2px solid grey;\n' +
            '  border-radius: 1rem;\n' +
            '  color: yellow;\n' +
            '  background-color: var(--bg-color);\n' +
            '  background-image: linear-gradient(120deg, \n' +
            '    var(--bg-color-secondary), var(--bg-color));\n' +
            '}\n';

    html += '.msgq-window-button {\n' +
            //'  flex: 0 0 100%;\n' +
            '  font-size: 22px;\n' +
            '  padding: .25rem;\n' +
            '  margin: .25rem;\n' +
            '  border-radius: 1rem;\n' +
            '}\n';

    html += "</style>\n";

    return html;
}  // End of popBuildStyle(msg_type)

function popBuildScript() {
    // BROKEN

    // NOTE: closebtn defined in /assets/css/style.scss
    // Apply 600ms close time when close button clicked. Matches
    // 0.3 s fade out applied by .closebtn {} style
    var html = "<script>\n";
    html += 'var close = document.getElementsByClassName("closebtn");\n';
    html += 'var i;\n';

    html += 'for (i = 0; i < close.length; i++) {\n';
    html += '  close[i].onclick = function(){\n';
    html += '    var div = this.parentElement;\n';
    html += '    div.style.opacity = "0";\n';
    html += '    setTimeout(function(){ div.style.display = "none"; }, 600);\n';
    html += '  }\n';
    html += '}\n';

    html += "</script>\n";

    return html;
}

// dragElement() copied from theCookieMachine.js
function dragElement2(elm) {
    var offX = 0, offY = 0, oldX = 0, oldY = 0, x = 0, y = 0, useTouch = false;
    if (document.getElementById(elm.id + "_header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elm.id + "_header").ontouchstart = dragTouchStart;
        document.getElementById(elm.id + "_header").onmousedown = dragMouseDown;
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
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        // get the touch position at startup
        e.preventDefault();  // Prevents text highlighting while dragging header
        useTouch = true;
        setXY(e);
        saveXY();
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
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
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}  // End of dragElement2(elm)

/* End of /assets/js/tim-ta.js */