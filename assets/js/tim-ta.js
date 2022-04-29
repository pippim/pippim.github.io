---
---
// Tim-ta (Timed Tasks)

// Button Image source: https://www.cleanpng.com/free/

// dragElement defined in /assets/js/theCookieMachine.js
// dragElement(document.getElementById("tta_window"));

/* TODO: Multiple Browser tabs concurrency.

    Before any update, reread ttaConfig, ttaProject and
    ttaTask into "check Buffers". If they are different
    then advise user and force reread.

*/

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

function initSelectFiles () {
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
// Temporary to replace bad configuration
// ttaNewConfig();
// saveConfig();

function ttaNewConfig() {
    // Object.assign: https://stackoverflow.com/a/34294740/6929343
    ttaConfig = Object.assign({}, tta_config);
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

    ttaConfig.arrProjects = [ttaProject.project_name];
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
}

function ttaNewTask (name) {
    // Only used for creating test data from above. Not used in real life below
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    ttaTask.task_name = name;
    ttaTask.hours = ttaTask.minutes = ttaTask.seconds = 0;
}

function ttaAddTask (obj) {
    // Used for creating test data above and in real life below
    ttaProject.arrTasks.push(obj.task_name);
    ttaProject.objTasks[obj.task_name] = obj;
}

function ttaTaskDuration (hours, minutes, seconds) {
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

var ttaElm, currentTable, currentRow, currentMode, currentForm;

function ttaRunConfiguration (parentElm) {
    ttaElm = parentElm;
    ttaProject = ttaConfig.objProjects[ttaConfig.arrProjects[0]];
    const cnt = ttaConfig.arrProjects.length;
    if (cnt == 1) { paintTasksTable(); }
    if (cnt > 1) { paintProjectsTable(); }
    // When no projects exist, create Sample Laundry Project
    if (cnt < 1) { ttaNewConfig(); paintTasksTable(); }
}

function paintProjectsTable() {
    // Assumes ttaConfig and ttaProject are populated
    // Button at bottom allows calling paintConfig(id)
    msgqClear();
    currentTable = "Projects";

    // Just in case another browser tab changed configuration...
    readConfig();
    //ttaConfig = JSON.parse(localStorage.getItem('ttaConfig'));
    const cnt = ttaConfig.arrProjects.length;
    const strHuman = cntHuman(cnt, "Project");
    var html = "<h2>Tim-ta - " + strHuman + "</h2>";
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
    html += "<font size='+2'>Configuration</font>";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    html += taskButton(tabAddSym, tabAddTitle, "clickAddProject");
    html += "<font size='+2'>New Project</font>";
    html += '</div>\n';
    html += '</div>\n';

    html += '<style>\n';
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
    html += ttaTableStyle();
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
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
    var html = '<tr>\n';
    if (scrSmall) {
        html += tabButton(i, tabPlaySym, tabPlayTitle, "paintRunTimers");
        html += tabButton(i, tabControlsSym, tabControlsTitle, "clickFuture");
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
}

function paintTasksTable() {
    // Assumes ttaConfig and ttaProject are populated
    // Button at bottom allows calling paintProjectsTable()
    msgqClear();
    currentTable = "Tasks";

    const cnt = ttaProject.arrTasks.length;
    const strHuman = cntHuman(cnt, "Task");
    var html = "<h2>" + ttaProject.project_name + " - " + strHuman + "</h2>"
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
    html += "<font size='+2'>Run Project</font>";
    html += '</div>\n';
    html += '<div class="middleFoot">\n';
    html += taskButton(tabAddSym, tabAddTitle, "clickAddTask");
    html += "<font size='+2'>New Task</font>";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    html += taskButton(tabListSym, tabProjectsTitle, "paintProjectsTable");
    html += "<font size='+2'>All Projects</font>";
    html += '</div>\n';
    html += '</div>\n';

    html += '<style>\n';

/* Try tta-table styling only
    html += '#tabTasks table { table-layout: auto; width: 100%; }\n';
    html += '#tabTasks th, #tabTasks td {\n' +
            '  padding: .25rem .25rem;\n' +
            '}\n'
    html += '#tabTasks th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
*/
    html += ttaTableStyle();
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?

    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    ttaElm.scrollIntoView();
}  // End of paintTasksTable()

function ttaTableStyle() {
//            '  max-width: 100vw;\n' +

    // project_name or task_name get extra padding.
    // On tabProjects 7th column
    // On tabTasks 6th column
    // On small screen 3rd column
    var col;
    if (scrSmall) { col = 3; }  // The column to receive extra padding
    else if (currentTable == "Projects") { col = 7; }
    else if (currentTable == "Tasks") { col = 6; }
    if (scrSmall) { col = 3; }
    return  '.tta-table table {\n' +
            '  table-layout: auto;\n' +
            '  width: 100%;\n' +
            '  border-collapse: collapse;\n' +
            '}\n' +
            'table.tta-table th, table.tta-table td {\n' +
            '  padding: .25rem .25rem;\n' +
            '}\n' +
            'table.tta-table td:nth-child(' + col + ') {\n' +
            '  padding: .25rem 1rem;\n' +
            '}\n' +
            'table.tta-table th {\n' +
            '  position: -webkit-sticky;\n' +
            '  position: sticky;\n' +
            '  top: 0;\n' +
            '  z-index: 1;\n' +
            '  background: #f1f1f1;\n' +
            '}\n'
}
function bigFootStyle() {
    return  '.bigFoot {\n' +
            '  display: flex;\n' +
            '  justify-content: space-around;\n' +
            '  margin: 1rem;\n' +
            '  padding: .25rem .5rem;\n' +
            '  border: 3px solid;\n' +
            '  border-radius: 2rem;\n' +
            '}\n' +
            '.leftFoot, .centerFoot, .rightFoot {\n' +
            //'  flex-grow: 1;\n' +
            '}\n';
    // Flex from: https://stackoverflow.com/a/44348868/6929343
}

function ttaBtnStyle() {
    return  '.tta-btn {\n' +
            '  font-size: 22px;\n' +
            '  border-radius: 1rem;\n' +
            // '  margin: .5rem;\n' +
            '}\n'
}

function inpSwitchStyle() {
    return ".inpOnOffSwitch { vertical-align: middle;\n" +
           "width: 40px;\n" +
           "height: auto; }\n";
}

function inpSelectStyle() {
    // https://stackoverflow.com/a/8442831/6929343
    return ' select:invalid { color: gray; }'
}

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
    // var html = '<tr">\n';  // This shouldn't have worked before???
    var html = '<tr>\n';
    if (scrSmall) {
        html += tabButton(i, tabListenSym, tabListenTitle, "clickListen");
        html += tabButton(i, tabControlsSym, tabControlsTitle, "clickFuture");
    }           // Two columns of buttons
    else {
        html += tabButton(i, tabListenSym, tabListenTitle, "clickListen");
        html += tabButton(i, tabUpSym, tabUpTitle, "clickUp");
        html += tabButton(i, tabDownSym, tabDownTitle, "clickDown");
        html += tabButton(i, tabDeleteSym, tabDeleteTitle, "clickDelete");
        html += tabButton(i, tabEditSym, tabEditTitle, "clickEdit");
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

function tabButton(i, button_code, title, callback) {
    // Add button to table detail. Return HTML with <button> code
    // code is the HTML code, E.G.&#x25b6; for Play button.
    var html = '<td><button class="hdr-btn tta-btn ' + callback + '" \n' +
               'id="tabBtnId_' + callback + i + '" \n' + 
               'type="button" onclick="' + callback + '(' + i + ')" \n' +
               'title="' + title + '">' + button_code + '</button></td>\n';
    return html;
}

function taskButton(button_code, title, callback) {
    // Add button to table detail. Return HTML with <button> code
    // code is the HTML code, E.G.&#x25b6; for Play button.
    var html = '<button class="hdr-btn tta-btn ' + callback + '" \n' +
               'type="button" onclick="' + callback + '()" \n' +
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
}

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
                // alert("Alarm and Notification turned off for this task.");
                popCreate("w", "Alarm and Notification turned off for this task.");
            }
            return;
    }

    // TODO: Cycle through filenames - TaskEnd, SetEnd, AllSetsEnd
    var sound;
    if (fTaskEndAlarm == "true") { sound = getTaskValue("task_end_filename"); }
    else if (fSetEndAlarm == "true") { sound = getProjectValue("set_end_filename"); }
    else if (fAllSetsEndAlarm == "true") { sound = getProjectValue("all_sets_end_filename"); }

    var notify;
    if (fTaskEndNotify == "true") { notify = "Task " + ttaTask.task_name; }
    else if (fSetEndNotify == "true") { notify = "Set " + ttaProject.project_name; }
    else if (fAllSetsEndNotify == "true") { notify = "All Sets " + ttaProject.project_name; }

    // <audio> tags buried on the page with ID name same as sound filename.
    if (sound != null) {
        if (currentTable != "RunTimers") { soundAlarm (i, sound); }
        else {
            var audioControl = document.getElementById(sound);
            audioControl.play();
        }
    }

    if (notify != null) { sendNotify (i, notify); }
}

function soundAlarm(i, sound) {
    /* From above: tabButton(i, tabListenSym, tabListenTitle, "clickListen");
    tabButton(i, button_code, title, callback) {
        // Add button to table detail. Return HTML with <button> code
        // code is the HTML code, E.G. &#x25b6; for Play button.
        var html = '<td><button class="hdr-btn tta-btn ' + callback + '" \n' +
                   'id="tabBtnId_' + callback + i + '" \n' +
                   'type="button" onclick="' + callback + '(' + i + ')" \n' +
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
}

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
}

function clickFuture(i) {
    clickCommon(i);
    popCreate('i', "Future feature not implemented yet");
}

function clickUp(i) {
    clickCommon(i);
    if (i == 0) { popCreate('w', "Already at top, can't move up"); return; }
    swapRows(i, i - 1);
}
function clickDown(i) {
    // TODO: After moving, update & save localStorage
    clickCommon(i);
    if (i == cntTable - 1) { popCreate('w', "Already at bottom, can't move down"); return; }
    swapRows(i, i + 1);
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

var secondsTask, secondsSet, secondsAllSets, hhmmssTask, hhmmssSet, hhmmssAllSets;
var allTimers;

function paintRunTimers(i) {
    // Run Project - Countdown all tasks. Scroll into view as needed.
    // When i null called from Tasks Table footer, else called from Projects Table.
    msgqClear();
    if (i != null) { clickCommon(i); }  // load selected ttaProject
    secondsTask = secondsSet = secondsAllSets = 0;
    allTimers = {};
    currentForm = "formRunTimers"
    // Can be called from Projects Table so need to retrieve ttaProject for i
    // Can be called from Projects Tasks Table so ttaProject is current
    var calledFromTable = currentTable;
    // console.log("currentTable / i:", currentTable, i)
    currentTable = "RunTimers"

    // Back to same Table
    const cnt = ttaProject.arrTasks.length;
    const strHuman = cntHuman(cnt, "Task");
    var html = "<h2>" + ttaProject.project_name + " - Run timer for " + strHuman + "</h2>"
    // html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    html += '<table id="tabRunTimers" class="tta-table">\n' ;
    // If All Sets used, insert it first. Then insert Set total duration
    html += tabRunTimersHeading();
        // NOTE: Timers of zero duration are omitted from list
        for (var i = 0; i < cnt; i++) { html += tabRunTimersDetail(i); }
    if (secondsSet > 0) {
        // Passed sanity check to make sure there is time for set...
        html += htmlRunTimersSet();  // Paint line for Total Tasks
        // Paint extra line for Total All Sets
        if (getProjectValue('run_set_times') > 1) { html += htmlRunTimersAllSets(); }
    }

    html += '</table>\n';
    html += '</div>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="rightFoot">\n';
    html += taskButton(tabListSym, tabProjectsTitle, "paintProjectsTable");
    html += "<font size='+2'>All Projects</font>";
    html += '</div>\n';
    html += '</div>\n';

    html += '<style>\n';
    html += ttaTableStyle();
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?

    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initTimersAfterDOM();  // Initialize elements for table row IDs
    ttaElm.scrollIntoView();  // Scroll top level element into view

    // Test window create shell
    // popCreate("e", "Run Tasks is still a Work in Progress", 'id', "tabRunTimers");
    // var popEntry = msgq[popIndex - 1];
    // console.log("popEntry:", popEntry);

    // Run through all timers
    //for (const name of Object.keys(allTimers)) { oneTimerRun(name); }
    runAllTimers(calledFromTable);
}

function tabRunTimersHeading() {
    var html = "<tr><th>Progress</th>";
    if (!scrSmall) { html += "<th>Remaining</th>"; }
    html += "<th>Task Name</th>";
    return html += "</tr>\n";
}

function tabRunTimersDetail(i) {
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
    return htmlRunTimersDetail(id, ttaTask.task_name, i, secondsTask);
}

function htmlRunTimersSet() {
    return htmlRunTimersDetail("tabTimerSet", "Tasks Total",
                               ttaProject.arrTasks.length, secondsSet);
}

function htmlRunTimersAllSets() {
    return htmlRunTimersDetail("tabTimerAllSets", "All Sets Total",
                               ttaProject.arrTasks.length + 1, secondsAllSets);
}

function htmlRunTimersDetail(id, name, index, seconds) {
    // Return html for new Run Timers Table entry
    entryTimer = {};
    entryTimer["id"] = id;
    entryTimer["elm"] = "Pippim Promise";
    entryTimer["index"] = index;
    entryTimer["name"] = name;
    entryTimer["seconds"] = seconds;
    entryTimer["remaining"] = seconds;
    entryTimer["progress"] = 0;
    allTimers[id] = entryTimer;

    var html = '<tr>\n';

    html += '<td><progress id="' + id + '" value="0" max="' +
    seconds.toString() + '"></progress></td>\n';  // > 32% < possible??

    var hhmmss = new Date(seconds * 1000).toISOString().substr(11, 8);
    var strDuration = hhmmssShorten(hhmmss);
    if (!scrSmall) { html += "<td>" + strDuration + "</td>\n"; }
    html += "<td><font size='+2'>" + name + "</font></td>\n";

    return html += "</tr>\n";
}

function initTimersAfterDOM() {
    // After innerHTML is set we can bet the elements and set sources
    //console.log("initSwitchesAfterDOM()");
    for (const name of Object.keys(allTimers)) {
        var element = document.getElementById(allTimers[name].id);
        allTimers[name].elm = element;
        // console.log('timer progress element:', element);
        element.addEventListener('click', () => { progressTouched(name); });
    }
}

function progressTouched(name) {
    console.log("Progress bar touched:", name);
}

async function runAllTimers(calledFromTable) {
    // Run all timers
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

    console.log("run_times:", run_times);

    while (true) {
        if (entry.progress == 0 && getTaskValue('task_prompt') == "true") {
            alert("Press Enter to begin timer " + ttaTask.task_name)
        }

        var timeCurrent = new Date().getTime();
        var timeElapsed = timeCurrent - timeLast
        timeLast = timeCurrent
        // console.log("timeElapsed:", timeElapsed)
        // Could make 999 to 980 sleep but override needed for prompt wait time
        await sleep(1000);
        if (entry.progress >= entry.seconds) {
            // Timer has ended, sound alarm and start next timer
            clickListen(index);
            index += 1;
            if (index >= ttaProject.arrTasks.length) {
                remaining_run_times -= 1;
                if (remaining_run_times <= 0) {
                    // The last timer has finished, back to calling program
                    if (calledFromTable == "Projects") { paintProjectsTable(); }
                    else if (calledFromTable == "Tasks") { paintTasksTable(); }
                    else { popCreate('e', "Unknown caller to paintRunTimers(): " +
                                     calledFromTable)}
                    return;
                }
                index = 0;
                // Rebuild allTimers to fresh state
                resetTimersSet(myTable, run_times, remaining_run_times);
            }
            id = "tabTimer" + index
            entry = allTimers[id];
            name = ttaProject.arrTasks[index];
            ttaTask = ttaProject.objTasks[name];
            //console.log("new id/name:", id, name);
            continue;  // Wait for first second.
        }

        updateRunTimer(myTable, entry);
        updateRunTimer(myTable, entrySet);
        if (run_times > 1) { updateRunTimer(myTable, entryAllSets); }
        // TODO: AllSets update
    }
}

function updateRunTimer(myTable, entry) {
    entry.progress += 1
    entry.remaining -= 1
    entry.elm.value = entry.progress.toString();
    updateRunTimerDuration(myTable, entry);
}

function updateRunTimerDuration(myTable, entry) {
    var hhmmss = new Date(entry.remaining * 1000).toISOString().substr(11, 8);
    var strDuration = hhmmssShorten(hhmmss);
    if (strDuration == "") { strDuration = "Done"}
    myTable.rows[entry.index + 1].cells[1].innerHTML = strDuration;
}

function resetTimersSet(myTable, run_times, remaining_run_times) {
    for (const key of Object.keys(allTimers)) {
        var entry = allTimers[key];
        if (key == "tabTimerAllSets") {
            // TODO, massage description with remaining run times
        } else {
            entry.progress = 0;
            entry.remaining = entry.seconds;
            entry.elm.value = entry.progress.toString();
            updateRunTimerDuration(myTable, entry);
        }
    }
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
    // Popup buttons for small screens
    clickCommon(i);
    popCreate('i', "Controls Feature not implemented yet")
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
    saveConfig();
    paintProjectsTable();
}
function swapTask(source, target) {
    // Task parameter source index and target index
    hold = ttaProject.arrTasks[target];
    ttaProject.arrTasks[target] = ttaProject.arrTasks[source];
    ttaProject.arrTasks[source] = hold;
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
    paintTasksTable();
}

function paintConfigForm() {
    // Button at bottom allows calling paintProjectTasks()
    msgqClear();
    var mode = "Edit";
    currentMode = mode;
    currentTable == "Config" // Wipe out where ever we came from
    currentForm = "formConfig";
    buildInit();  // Reset data dictionary input field controls

    var html = "<h2>Tim-ta - Edit Configuration</h2>"
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
    html += taskButton("Cancel", "Cancel changes", "paintProjectsTable");
    html += "<font size='+2'>Cancel changes</font>"
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    var textMode = mode;
    if (textMode == "Edit") { textMode = "Save" }
    html += taskButton(textMode, textMode + " Configuration", "clickUpdateConfig");
    html += "<font size='+2'>" + textMode + " Configuration</font>";
    html += '</div>\n';
    html += '</div>\n';

    // TODO: Move next lines to class name: tabClass inside TCM
    html += '<style>\n';
    html += ttaTableStyle();
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}

function paintProjectForm(mode) {
    // mode can be "Add", "Edit" or "Delete"
    // Button at bottom allows calling paintConfiguration()
    msgqClear();
    currentMode = mode;
    currentForm = "formProject";
    buildInit();  // Reset data dictionary input field controls

    var html = "<h2>" + ttaProject.project_name + " - " +
                mode + " Project</h2>"
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    html += '<form id="formProject"><table id="tabProject" class="tta-table">\n' ;
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
    html += taskButton("Cancel", "Cancel changes", "paintProjectsTable");
    html += "<font size='+2'>Cancel changes</font>"
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    var textMode = mode;
    if (textMode == "Edit") { textMode = "Save" }
    html += taskButton(textMode, textMode + " Project", "clickUpdateProject");
    html += "<font size='+2'>" + textMode + " Project</font>";
    html += '</div>\n';
    html += '</div>\n';

    // TODO: Move next lines to class name: tabClass inside TCM
    html += '<style>\n';
    html += ttaTableStyle();
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
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

    var html = "<h2>" + ttaProject.project_name + " - " +
                mode + " Task</h2>"
    html = htmlSetContainer(html);

    html += '<div style="max-height: 70vh; overflow: auto;">\n' ;
    html += '<form id="formTask"><table id="tabTask" class="tta-table">\n' ;
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
    html += taskButton("Cancel", "Cancel changes", "paintTasksTable");
    html += "<font size='+2'>Cancel changes</font>"
    html += '</div>\n';
    var textMode = mode;
    html += '<div class="rightFoot">\n';
    if (textMode == "Edit") { textMode = "Save" }
    html += taskButton(textMode, textMode + " Task", "clickUpdateTask");
    html += "<font size='+2'>" + textMode + " Task</font>";
    html += '</div>\n';
    html += '</div>\n';

    // TODO: Move next lines to class name: tabClass inside TCM
    html += '<style>\n';
    html += ttaTableStyle();
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaElm.innerHTML = html;  // Set top-level's element with new HTML
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}

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

    if (value == null) { console.log ("buildInput() null value:", currentForm); console.trace(); }

    html += '<td>\n';
    if (dd_field.type == "switch") { html += buildSwitch(key, value, mode) }
    else if (dd_field.type == "select") { html += buildSelect(key, value, mode) }
    else { html += buildText(key, value, mode) }  // type == "text"
    html += '</td></tr>\n'

    return html;
}

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
}

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
    // screen callback to Set chosen option value in inpSelects
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
}

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
}

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
}

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
        if (!validateNumber(value)) { return false; }
        if (dd_field.type == "number") { value = 0 + value } // '' to 0
        if (!validateRange(value)) { return false; }
        if (!validateRadioButton(value)) { return false; }
    }
    return true;
}

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
}

function validateTaskName(value) {
    // The task_name key must be unique
    const new_index = ttaProject.arrTasks.indexOf(value);
    if (new_index < 0) { return true; }  // New key wasn't found

    const original_index = ttaProject.arrTasks.indexOf(ttaTask.task_name);
    if (original_index == new_index) { return true; }  // Key hasn't changed

    // We have a new key that already exists
    // TODO: Create global with element being validated
    popCreate("e", dd_field.label + " must be unique");
    //var popEntry = msgq[popIndex - 1];
    //console.log("popEntry:", popEntry);

    //alert(dd_field.label + " must be unique");  // replace with popCreate
    return false;
}

function validateNonBlank(value) {
    // NOTE: get_dd_field must be called first.
    if (dd_field.lower == "non-blank") {
        if (value == "") {
            //alert(dd_field.label + " cannot be blank");
            popCreate("e", dd_field.label + " cannot be blank");
            return false;
        }
    }
    return true;
}

function validateNumber(value) {
    if (dd_field.type != "number") { return true; } // Not "number" type
    // console.log("value: '" + value + "' typeof:", typeof value)
    // From: https://stackoverflow.com/a/175787/6929343
    if (isNaN(value)) {
        //alert(dd_field.label + " must be a number");
        popCreate("e", dd_field.label + " must be a number");
        return false;
    }
    return true;
}

function validateRange(value) {
    if (dd_field.type != "number") { return true; } // Not "number" type
    lower = parseInt(dd_field.lower, 10);  // base 10
    upper = parseInt(dd_field.upper, 10);  // base 10
    if (value >= lower && value <= upper) { return true; }

    var msg = dd_field.label + " must be between " + lower.toString() + " and " +
          upper.toString();
    popCreate("e", msg);

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
}

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
var popIndex = 0;  // Key into msgq returned from popCreate() and passed to popClear()
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
    // When mounting new screen clear old messages. Also clear control box which
    // resides in msgq too.
    msgq = {};  // TODO: First loop through and delete created elements
    btnBox = {};
    popIndex = 0;
}

function msgqCreate() {
    /* After DOM is ready create the message queue's parent div element
       resides in msgq too.
        FORMAT:
        popEntry = msgq[i];
        msgq[popIndex] =
            {
                index: ,
                elmWindow: ,
                typeMsg: msg_type,
                elmLink: elm,
                typeIdOrElm: id_elm_type,
                errorId: error_id,
                rectMounted: xy_wh,
                rectTarget: xy_wh,
                cntRepeats: repeated_warnings,
                html: ,
                style: ,
                buttons: {}
            }

        popEntry.popIndex = i = msgq[i].popIndex
        popEntry.elmWindow = msgq[i].elmWindow
        ETC.

        WHERE:  key is auto assigned and returned to parent as msgqEntry

        NOTE:   rectMounted has to be recalculated each time object is
                evaluated because user may have dragged window on screen.

    */
}

function popClear(key) {
    // Reverse document.create - NO NEED, GC (garbage collector will remove)
    msgq[key].elmWindow.remove();  // should remove child be used?
}

function popCreate(msg_type, msg, id_elm_type, id_elm, error_id, clear_flag) {
    /*  PRIMARY FUNCTION to display error messages (and control boxes)
        msg_type = "e" red error message
                   "w" orange warning message
                   "i" blue information message
                   "s" green success message
        msg = message text where <br> will start a new line.
        id_elm_type = "id" a ID is passed in next field
                      "elm" an element is passed in next field.
        elm = an ID or an element. If an ID convert it to an element.
        error_id = optional error number or name. If already displayed
                   then it isn't displayed again.
        clear_flag = optional flag ("true") to clear error number or name.
                     Automatically closes message box as well.

        RETURNS the msgqEntry number which is used to clear message manually
    */
    // Sanity checks - After writing your development code you can delete
    // these prior to migration to production environment.
    if (arguments.length < 2) {
        popCreate('e', "msgAlert() minimum of 2 arguments required:\n" +
              "msg_type, msg, id_elm_type, elm, error_id, clear_flag");
        console.trace();
        return false;
    }
    if (msg_type != "e" && msg_type != "w" &&
        msg_type != "i" && msg_type != "s") {
            popCreate('e', "msgAlert() msg_type must be 'e', 'w', 'i' or 's'.");
            console.trace();
            return false;
    }
    var elm = id_elm; // May be undefined
    if (arguments.length > 2 && id_elm_type == "id") {
        if (arguments.length < 4) {
            popCreate('e', "msgAlert() when 'id_elm_type' = 'id', next argument required.");
            console.trace();
            return false;
        }
        // Rewrite id in elm parameter with actual element.
        elm = document.getElementById(id_elm);
    }

    var p = {};
    p['index'] = popIndex;  // Keep key in value for handy reference
    p['elmWindow'] = document.createElement('div');
    p['msg_type'] = msg_type;  // e, w, i or s
    p['msg'] = msg;  // Might contain HTML
    p['id_elm_type'] = id_elm_type;
    p['id_elm'] = id_elm;
    p['elmLink'] = elm;
    p['error_id'] = error_id;
    p['clear_flag'] = clear_flag;
    p['html'] = popBuildHtml();
    p['style'] = popBuildStyle();
    msgq[popIndex.toString()] = p;

    var html = popBuildHtml(msg_type, msg);
    html += popBuildStyle(msg_type);
    html += popBuildScript();

    p['elmWindow'].innerHTML = html;
    //document.body.appendChild(p['elmWindow']);
    ttaElm.appendChild(p['elmWindow']);
    //tcmElm = document.getElementById("tcm_window");
    //tcmElm.appendChild(p['elmWindow']);  // nothing happens
    //alert("pause before dragElement(p['elmWindow']);")
    var elmHead = p['elmWindow'].querySelector('.msgq-window-header');
    console.log("elmHead: " + elmHead);
    dragElement2(elmHead, 20, 20);  // top=20, left = 20

    // TODO: activate close button

    // TODO: How to test? Create option in Cookie Machine?
    //       Use Cookie Machine to speed test timers at 10x speed?

    popIndex += 1;  // Our new entry count and the next index to add
}

function popBuildHtml(msg_type, msg) {
    var msg_head = "";
    if (msg_type == "e") { msg_head = "ERROR"; }
    if (msg_type == "w") { msg_head = "WARNING"; }
    if (msg_type == "i") { msg_head = "Info"; }
    if (msg_type == "s") { msg_head = "Success"; }
    var html = "";
    html += '<div class="msgq-window">\n';
    // For historical reasons must be "_header" not "-header" to drag window
    html += '  <div class="msgq-window-header">' + msg_head +
                    '&emsp; (Click here to drag)\n';
    html += '    <span class="msgq-window-close closebtn" \n';
    html += '    onclick="this.parentNode.parentElement.style.display = \'none\';">&times;</span>\n';
    html += '  </div>\n';
    html += '  <div class="msq-window-body">\n';
    html += '    <p>' + msg + '</p>\n';
    html += '  </div>\n';
    html += '  <div class="msgq-window-buttons"> <!-- Buttons: OK -->\n';
    html += '    <button class="msq-button-ok" title="Click to close" \n';
    html += '    onclick="this.parentNode.parentElement.style.display = \'none\';" \n';
    html += '       >OK</button>\n';
    html += '  </div>\n';
    html += '</div>\n';
    return html;
}

function popBuildStyle(msg_type) {
    // NOTE: .msq-xxx styles identical to #tcm-xxx styles in /assets/css/style.scss
    var msg_head = "#2196F3";  // Baby blue
    if (msg_type == "e") { msg_head = "#f44336"; }  // red
    if (msg_type == "w") { msg_head = "#ff9800"; }  // orange
    if (msg_type == "i") { msg_head = "#2196F3"; }  // light blue
    if (msg_type == "s") { msg_head = "#04AA6D"; }  // green

    var html = "<style>\n";

    html += '.msgq-window {\n';
    html += 'position: fixed;\n';  // fixed breaks drag
    html += 'z-index: 9;\n';

    //html += 'position: relative;\n';  // Used with ttaElm as parent, bottom of element
                                        // Goes to full width
    //html += 'position: absolute;\n';  // goes to top of docu,emt
    //html += 'position: fixed;\n';  // fixed breaks drag
    //html += 'position: sticky;\n';  // goes to bottom of document
    //html += 'display: none;\n';
    // html += 'display: block;\n';  // block is default anyway!
    //html += 'display: flex;\n';  // Used in TCM, just experiment here too then
    //html += 'flex-direction: column;\n';
    html += 'opacity: 1;\n';
    html += 'transition: opacity 0.6s;\n';
    html += 'max-width: 90vw;\n';
    html += 'max-height: 95vh;\n';
    html += 'top: 20px;\n';
    html += 'left: 20px;\n';
    html += 'z-index: 9;\n';
    html += 'background-color: #f1f1f1;\n';
    html += 'border: .2rem solid #d3d3d3;\n';
    html += 'color: black;\n';
    //html += 'text-align: left;\n';
    html += 'text-align: center;\n';
    // ERROR: Expected declaration but found “@include”.  Skipped to next declaration.
    //html += '@include large { padding: 0.5rem; font-size: 1rem; }\n';
    //html += '@include medium { padding: 0.4rem; font-size: 0.9rem; }\n';
    //html += '@include small { padding: 0.3rem; font-size: 0.8rem; }\n';
    html += '}\n';

    html += '.msgq-window-header {\n';
    //html += 'display: inline-block;\n';
    // html += 'display: block;\n';  // Default anyway !
    html += 'padding: .5rem;\n';
    html += 'cursor: move;  z-index: 10;\n';
    html += 'background-color: ' + msg_head + ';\n';
    html += 'color: #fff;\n';
    html += '}\n';

    html += "</style>\n";

    return html;
}

function popBuildScript() {
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

    html += 'function popClose() {\n';
    html += '  var div = this.parentElement;\n';
    html += '  div.style.opacity = "0";\n';
    html += '  setTimeout(function(){ div.style.display = "none"; }, 600);\n';
    html += '}\n';

    html += "</script>\n";

    return html;
}

function popClose() {
    // Called from msgq-button-ok onclick="popClose()" in HTML
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
}

function msgAddButton(msgqEntry, elm, callback) {

}

// Below copied from theCookieMachine.js
function dragElement2(elm, x, y) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var left = x, top = y;
  elm.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log("dragMouseDown(e) - pos3, pos4:", pos3, pos4)
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
    console.log("elementDrag(e) - pos3, pos4:", pos3, pos4)
    console.log("elm.offsetTop, elm.offsetLeft:", elm.offsetTop, elm.offsetLeft)
    // set the element's new position:
    top = top - pos2;
    if (top < 0) { top = 0; }
    left = left - pos1;
    if (left < 0) { left = 0; }
    console.log("top, left:", top, left)
    var offset = elm.getBoundingClientRect();
    console.log("offset.top, offset.left:", offset.top, offset.left)
    //elm.style.top = (elm.offsetTop - pos2) + "px";
    //elm.style.left = (elm.offsetLeft - pos1) + "px";
    elm.style.top = top + "px";
    elm.style.left = left + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* End of /assets/js/tim-ta.js */