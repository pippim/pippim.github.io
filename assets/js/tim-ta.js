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

var ttaDiv, currentTable, currentRow, currentMode, currentForm;

function ttaRunConfiguration (parentDiv) {
    ttaDiv = parentDiv;
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
    currentTable = "Projects";

    // Just in case another browser tab changed configuration...
    readConfig();
    //ttaConfig = JSON.parse(localStorage.getItem('ttaConfig'));
    const cnt = ttaConfig.arrProjects.length;
    const strHuman = cntHuman(cnt, "Project");
    var html = "<h2>Tim-ta - " + strHuman + "</h2>";
    html = htmlSetContainer(html);

    html += '<table id="tabProjects">\n' ;
        html += tabProjectsHeading();
        for (var i = 0; i < cnt; i++) { html += tabProjectDetail(i); }
    html += '</table>\n';

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
    html += '#tabProjects table { table-layout: auto; width: 100%; }\n';
    html += '#tabProjects th, #tabProjects td {\n' +
            '  padding: .25rem .25rem;\n' +
            '}\n'
    html += '#tabProjectss th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaDiv.innerHTML = html;
    ttaDiv.scrollIntoView();
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
    var container = '<div class="ttaContainer">\n' + html +
                    '<div class="ttaModal"></div>\n' +
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
    var html = '<tr onclick="tabSetRow(this)">\n'; // Currently does nothing
    if (scrSmall) {
        html += tabButton(i, tabPlaySym, tabPlayTitle, "clickPlay");
        html += tabButton(i, tabControlsSym, tabControlsTitle, "clickFuture");
    }           // Two columns of buttons
    else {
        html += tabButton(i, tabPlaySym, tabPlayTitle, "clickPlay");
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
    currentTable = "Tasks";

    const cnt = ttaProject.arrTasks.length;
    const strHuman = cntHuman(cnt, "Task");
    var html = "<h2>" + ttaProject.project_name + " - " + strHuman + "</h2>"
    html = htmlSetContainer(html);

    html += '<table id="tabTasks">\n' ;
        html += tabTasksHeading();
        for (var i = 0; i < cnt; i++) { html += tabTaskDetail(i); }
    html += '</table>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="leftFoot">\n';
    html += taskButton(tabPlaySym, tabPlayTitle, "clickPlay");
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
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaDiv.innerHTML = html;
    ttaDiv.scrollIntoView();
}  // End of paintTasksTable()

function tableStyle() {
    return  '.tta-table table { table-layout: auto; width: 100%; }\n' +
            '.tta-table th, .tta-table td {\n' +
            '  padding: .25rem .25rem;\n' +
            '}\n' +
            '.tta-table th {\n' +
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
            '  font-size: 25px;\n' +
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
    // Identical to tabProjectsHeading() except the word "Task"
    var html = "<tr><th colspan='";
    if (scrSmall) { html += "2"; }  // Two columns of buttons
    else { html += "5"; }           // Five columns of buttons
    html += "'>Controls</th><th>Task Name</th>";
    if (!scrSmall) { html += "<th>Duration</th>"; }
    return html += "</tr>\n";
}

function tabTaskDetail(i) {
    ttaTask = ttaProject.objTasks[ttaProject.arrTasks[i]];
    var html = '<tr onclick="tabSetRow(this)">\n'; // Currently does nothing
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
    else {
        alert("CRITICAL ERROR: clickCommon called with index: " + i.toString())
        console.trace()
        cntTable = 0;
    }
}

function clickListen(i) {
    // i is the row number being processed. First click plays sound, second
    // click stops the sound. Notifications are also sent if applicable.

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

    clickCommon(i);
    const btnId = "tabBtnId_clickListen" + i ;  // Rebuild btnId used in ttaButton()
    var btnElm = document.getElementById(btnId);

    /* prefix "f" short for "flag" where variable can contain "true" or "false" */
    fTaskEndAlarm = getTaskValue("task_end_alarm");
    fTaskEndNotify = getTaskValue("task_end_notification");
    console.log("ttaTask:", ttaTask);
    var fSetEndAlarm, fSetEndNotify, fAllSetsEndAlarm, fAllSetsEndNotify;
    fSetEndAlarm = fSetEndNotify = fAllSetsEndAlarm = fAllSetsEndNotify = "false" ;    

    // If this is the last task in the list, retrieve SetEnd and AllSetsEnd
    if (i == cntTable - 1) {
        fSetEndAlarm = getProjectValue("set_end_alarm");
        fSetEndNotify = getProjectValue("set_end_notification");
        fAllSetsEndAlarm = getProjectValue("all_sets_end_alarm");
        fAllSetsEndNotify = getProjectValue("all_sets_end_notification");
    }

    //console.log("Flags:", fTaskEndAlarm, fTaskEndNotify, fSetEndAlarm,
    //            fSetEndNotify, fAllSetsEndAlarm, fAllSetsEndNotify);
    if (fTaskEndAlarm == "false" && fTaskEndNotify == "false" &&
        fSetEndAlarm == "false" && fSetEndNotify == "false" &&
        fAllSetsEndAlarm == "false" && fAllSetsEndNotify == "false") {
    /* TRY various techniques
    if (
        fTaskEndAlarm == "false" && fTaskEndNotify == "false" &&
        fSetEndAlarm == "false" && fSetEndNotify == "false" &&
        fAllSetsEndAlarm == "false" && fAllSetsEndNotify == "false"
        ) {
    if (fTaskEndAlarm == fTaskEndNotify == fSetEndAlarm ==
        fSetEndNotify == fAllSetsEndAlarm == fAllSetsEndNotify == "false") {
    if (
        fTaskEndAlarm == fTaskEndNotify == fSetEndAlarm ==
        fSetEndNotify ==  fAllSetsEndAlarm == fAllSetsEndNotify == "false"
        ) {
    */
            alert("Alarm and Notification turned off for this task.");
            return;
    }

    // TODO: Cycle through filenames - TaskEnd, SetEnd, AllSetsEnd
    sound = getTaskValue("task_end_filename");
    // <audio> tags buried on the page with ID name same as sound filename.
    audioControl = document.getElementById(sound);
    if (audioControl.currentTime > 0) {
        // If already playing then stop it and reset icon to "Listen"
        btnElm.innerHTML = tabListenSym;  // textContent can't be used because entity code
        btnElm.title = tabListenTitle;
        audioControl.pause();  // There is no "stop()" function
        audioControl.currentTime = 0;  // Works but doesn't invoke onended event
    } else {
        // Set icon to "Stop" and schedule "Listen" icon when sound ends
        // Sound has start, set Stop Symbol into button text
        btnElm.innerHTML = tabStopSym;  // textContent can't be used because entity code
        btnElm.title = tabStopTitle;
        audioControl.play();
        audioControl.onended = function() { resetListen (btnElm) };
    }
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
            const error = document.querySelector('.ttaModal');
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
    alert("Future feature not implemented yet")
}

function clickUp(i) {
    clickCommon(i);
    if (i == 0) { alert("Already at top, can't move up"); return; }
    swapRows(i, i - 1);
}
function clickDown(i) {
    // TODO: After moving, update & save localStorage
    clickCommon(i);
    if (i == cntTable - 1) { alert("Already at bottom, can't move down"); return; }
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
    if (currentTable == "Projects") { alert("clickAddTask incomplete"); return; }
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    oldTask = Object.assign({}, tta_task);
    paintTaskForm("Add");
}
function clickAddProject() {
    // Create empty record for add
    ttaProject = Object.assign({}, tta_project); // https://stackoverflow.com/a/34294740/6929343
    oldProject = Object.assign({}, tta_project);
    paintProjectForm("Add");
    // alert("Clicked Add Project but not implemented yet")
}
function clickPlay() {
    // Run Project - Countdown all tasks
    alert("Clicked Run but not implemented yet")
}
function clickControls(i) {
    // Popup buttons for small screens
    clickCommon(i);
    alert("Clicked Controls but not implemented yet")
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
    var mode = "Edit";
    currentMode = mode;
    currentTable == "Config" // Wipe out where ever we came from
    currentForm = "formConfig";
    buildInit();  // Reset data dictionary input field controls

    var html = "<h2>Tim-ta - Edit Configuration</h2>"
    html = htmlSetContainer(html);

    html += '<form id="formConfig"><table id="tabConfig" class="tta-table">\n' ;
    html += buildInput("task_prompt", mode);
    html += buildInput("task_end_alarm", mode);
    html += buildInput("task_end_filename", mode);
    html += buildInput("task_end_notification", mode);
    html += buildInput("run_set_times", mode);
    html += buildInput("set_prompt", mode);
    html += buildInput("set_end_alarm", mode);
    html += buildInput("set_end_filename", mode);
    html += buildInput("set_end_notification", mode);
    html += buildInput("all_sets_prompt", mode);
    html += buildInput("all_sets_end_alarm", mode);
    html += buildInput("all_sets_end_filename", mode);
    html += buildInput("all_sets_end_notification", mode);
    html += buildInput("progress_bar_update_seconds", mode);
    html += buildInput("confirm_delete_phrase", mode);
    html += '</table></form>\n' ;

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
    html += '#tabProject th, #tabProject td {\n' +
            '}\n'
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaDiv.innerHTML = html;
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}

function paintProjectForm(mode) {
    // mode can be "Add", "Edit" or "Delete"
    // Button at bottom allows calling paintConfiguration()
    currentMode = mode;
    currentForm = "formProject";
    buildInit();  // Reset data dictionary input field controls

    var html = "<h2>" + ttaProject.project_name + " - " +
                mode + " Project</h2>"
    html = htmlSetContainer(html);

    html += '<form id="formProject"><table id="tabProject" class="tta-table">\n' ;
    // TODO: Why not just loop through all keys? - Because order is random!

    html += buildInput("project_name", mode);
    html += buildInput("task_prompt", mode);
    html += buildInput("task_end_alarm", mode);
    html += buildInput("task_end_filename", mode);
    html += buildInput("task_end_notification", mode);
    html += buildInput("run_set_times", mode);
    html += buildInput("set_prompt", mode);
    html += buildInput("set_end_alarm", mode);
    html += buildInput("set_end_filename", mode);
    html += buildInput("set_end_notification", mode);
    html += buildInput("all_sets_prompt", mode);
    html += buildInput("all_sets_end_alarm", mode);
    html += buildInput("all_sets_end_filename", mode);
    html += buildInput("all_sets_end_notification", mode);
    html += buildInput("progress_bar_update_seconds", mode);
    html += buildInput("confirm_delete_phrase", mode);
    html += '</table></form>\n' ;

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
    html += '#tabProject th, #tabProject td {\n' +
            '}\n'
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaDiv.innerHTML = html;
    initSwitchesAfterDOM();
    initSelectsAfterDOM();
}

function paintTaskForm(mode) {
    // mode can be "Add", "Edit" or "Delete"
    // Button at bottom allows calling paintProjectsTable()
    currentMode = mode;
    currentForm = "formTask";
    buildInit();  // Reset data dictionary input field controls

    var html = "<h2>" + ttaProject.project_name + " - " +
                mode + " Task</h2>"
    html = htmlSetContainer(html);

    html += '<form id="formTask"><table id="tabTask" class="tta-table">\n' ;
    html += buildInput("task_name", mode);
    html += buildInput("hours", mode);
    html += buildInput("minutes", mode);
    html += buildInput("seconds", mode);
    html += buildInput("task_prompt", mode);
    html += buildInput("task_end_alarm", mode);
    html += buildInput("task_end_filename", mode);
    html += buildInput("task_end_notification", mode);
    html += buildInput("progress_bar_update_seconds", mode);
    html += buildInput("confirm_delete_phrase", mode);
    html += '</table></form>\n' ;

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
    html += '#tabTask th, #tabTask td {\n' +
            '}\n'
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    ttaDiv.innerHTML = html;
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

function buildInput(key, mode) {
    /*  When building input field the "default" value is replaced with
        actual value for input. When saving, the default is obtained and
        if it matches user input then "default" phrase is saved.
    */
    var html = "<tr><td>\n";
    get_dd_field(key);
    html += dd_field.label + '</td>\n'

    // Translate value of "default" to real value in parent(s)
    var value;
    if (currentTable == "Projects") { value = getProjectValue(key); }
    else if (currentTable == "Tasks") { value = getTaskValue(key); }
    else if (currentTable == "Config")  { value = ttaConfig[key]; }
    else { alert ("INVALID currentTable:", currentTable); console.trace(); }

    html += '<td>\n';
    if (dd_field.type == "switch") { html += buildSwitch(key, value, mode) }
    else if (dd_field.type == "select") { html += buildSelect(key, value, mode) }
    else { html += buildText(key, value, mode) }  // type == "text"
    html += '</td></tr>\n'

    return html;
}

function buildText(key, value, mode) {
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
    console.log("setSelectInput(data) data.id, data.value:", data.id, data.value)
}

function initSelectsAfterDOM() {
    // After innerHTML is set we can bet the elements and set sources
    for (const name of Object.keys(inpSelects)) {
        element = document.getElementById(inpSelects[name].id);
        inpSelects[name].elm = element;
        //element.addEventListener('click', () => { clickSelect(name); });
        //setSelect(name, inpSelects[name].value);
        console.log("inpSelects{} name/value:", name, inpSelects[name].value)
    }
}

function clickUpdateTask() {
    /* Process Task updates - Add, Edit and Delete Task */
    const original_index = ttaProject.arrTasks.indexOf(ttaTask.task_name);
    // When original index is < 0 it means we are adding new task
    if (!currentMode == "Add" && original_index < 0) {
        // Sanity check failed
        alert(ttaTask.task_name + " Not found in ttaProject.arrTasks");
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
    /* Process Project updates - Add, Edit and Delete Project */
    const original_index = ttaConfig.arrProjects.indexOf(ttaProject.project_name);
    // When original index is < 0 it means we are adding new task
    if (!currentMode == "Add" && original_index < 0) {
        // Sanity check failed
        alert(ttaProject.project_name + " Not found in ttaConfig.arrProjects");
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
        if (name == "") { console.log("empty name on:", currentForm, "no:", no); continue; }
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
        formValues[item.name] = item.value;
    }

    // Get switch values and add to formValues
    for (const name of Object.keys(inpSwitches)) {
        if (name == null) { alert ("inpSwitches undefined!"); continue; }
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
    console.log("inpSelects:", inpSelects)
    for (const name of Object.keys(inpSelects)) {
        /* SELECT
            inpSelects[key] = {
                id: key,
                elm: "Pippim Promise",
                value: value,
                mode: mode
            };
        */
        console.log("Select name/id/value", name, name.id, name.value);
        formValues[name] = inpSelects[name].value;
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
    alert(dd_field.label + " must be unique");
    return false;
}

function validateNonBlank(value) {
    // NOTE: get_dd_field must be called first.
    if (dd_field.lower == "non-blank") {
        if (value == "") {
            alert(dd_field.label + " cannot be blank");
            return false;
        }
    }
    return true;
}

function validateNumber(value) {
    if (dd_field.type != "number") { return true; } // Not "number" type
    // console.log("value: '" + value + "' typeof:", typeof value)
    // From: https://stackoverflow.com/a/175787/6929343
    if (isNaN(value)) { alert(dd_field.label + " must be a number"); return false; }
    return true;
}

function validateRange(value) {
    if (dd_field.type != "number") { return true; } // Not "number" type
    lower = parseInt(dd_field.lower, 10);  // base 10
    upper = parseInt(dd_field.upper, 10);  // base 10
    if (value >= lower && value <= upper) { return true; }
    alert(dd_field.label + " must be between " + lower.toString() + " and " +
          upper.toString());
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

/* Functions NOT USED */

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

// DEPRECATED - window.addEventListener("click", processClick);
// On initial load classes haven't been defined yet as HTML is dynamic
function processClick(event) {
    var elm = event.target;
    //console.log("elm.classList:", elm.classList)
    //console.log("elm:", elm)
    if (elm.classList.contains("clickListen()")) { clickListen() } ;
    if (elm.classList.contains("clickPlay()")) { clickPlay() } ;
    if (elm.classList.contains("clickUp()")) { clickUp() } ;
    if (elm.classList.contains("clickDown()")) { clickDown() } ;
    if (elm.classList.contains("clickEdit()")) { clickEdit() } ;
    if (elm.classList.contains("clickDelete()")) { clickDelete() } ;
    if (elm.classList.contains("clickControls()")) { clickControls() } ;
}

function tabSetRow(x) {
    //console.log("typeof x", typeof x)
    //currentRow = x.rowIndex;
    //console.log("Row index is: " + currentRow);
}

/* End of /assets/js/tim-ta.js */