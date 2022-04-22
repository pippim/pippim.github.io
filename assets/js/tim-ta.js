---
---
// Tim-ta (Timed Tasks)

// Button Image source: https://www.cleanpng.com/free/

// dragElement defined in /assets/js/theCookieMachine.js
// dragElement(document.getElementById("tta_window"));

/* TODO: Multiple Browser tabs concurrency.

    Before any update, reread ttaStore, ttaProject and
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
var tta_store = {
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
    task_end_notification: "Desktop notification when Task ends?|switch",
    run_set_times: "Number of times to run Set|number|1|1000",
    set_prompt: "Prompt to begin Set?|switch",
    set_end_alarm: "Play sound when Set ends?|switch",
    set_end_filename: "Set ending sound filename|select|sound_filenames",
    set_end_notification: "Desktop notification when Set ends?|switch",
    all_sets_prompt: "Prompt to begin All Sets?|switch",
    all_sets_end_alarm: "Play sound when All Sets end?|switch",
    all_sets_end_filename: "All Sets ending sound filename|select|sound_filenames",
    all_sets_end_notification: "Desktop notification when All Sets end?|switch",
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
        return false;
    }
    const arr = raw.split('|')
    if (arr.length < 2) {
        alert("Critical Error. Data dictionary field has < 3 parts: " + name);
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
        return false;
    }
    return true;
}

/* UNIT TESTING
    get_dd_field("haha")
    get_dd_field("fail_test_1")
    get_dd_field("fail_test_2")
*/

function updateRadioSounds () {
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
            data_dictionary[key] = dd_field.name + "|select|" + replaceString;
         }
    }
}

updateRadioSounds();

// Global Names
var ttaStore, ttaProject, ttaTask;

ttaNewConfig();  // Always new until localStorage setup
localStorage.setItem('ttaStore', ttaStore);

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
var tabPlaySym = "&#x25b6;";
var tabPlayTitle = "Countdown each task";
var tabAddSym = "&#x2b;";
var tabAddTitle = "Add new ";

var currentTable, currentId, currentRow, currentWindow;

function paintProjectsTable(id) {
    // If only one Project defined, skip and paintTasksTable
    // Grab the first (and only) Project at array offset 0
    currentTable = "Projects";
    currentId = id;
    ttaProject = ttaStore.objProjects[ttaStore.arrProjects[0]];
    paintTasksTable();
}

function paintProjectsFooter(id) {
    // DON'T NEED - the table painter can mount a footer too.
}
function paintTasksTable() {
    // Assumes ttaStore and ttaProject are populated
    // Button at bottom allows calling paintProjectsTable(id)
    currentTable = "Tasks";
    id = currentId;

    var cnt = ttaProject.arrTasks.length;
    var html = "<h2>" + ttaProject.project_name + " Project - " +
                cnt.toString() + " Tasks</h2>"

    html += '<table id="tabTasks">\n' ;
        html += tabTasksHeading();
        for (var i = 0; i < cnt; i++) { html += tabTaskDetail(i); }
    html += '</table>\n';

    html += '<div class="bigFoot">\n';  // Start footer buttons
    html += '<div class="leftFoot">\n';
    html += taskButton(tabPlaySym, tabPlayTitle, "clickPlay");
    html += "<font size='+2'>Run</font>";
    html += '</div>\n';
    html += '<div class="middleFoot">\n';
    html += taskButton(tabAddSym, tabAddTitle, "clickAddTask");
    html += "<font size='+2'>Add new Task</font>";
    html += '</div>\n';
    html += '<div class="rightFoot">\n';
    html += taskButton(tabAddSym, tabAddTitle, "clickAddProject");
    html += "<font size='+2'>Add new Project</font>";
    html += '</div>\n';
    html += '</div>\n';

    html += '<style>\n';
    html += '#tabTasks table { table-layout: fixed; width: 100%; }\n';
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
    id.innerHTML = html;
    id.scrollIntoView();
}  // End of paintTasksTable()

function bigFootStyle() {
    return  '.bigFoot {\n' +
            'display: flex;\n' +
            'margin: 1rem;\n' +
            'padding: .25rem .5rem;\n' +
            'border: 3px solid;\n' +
            'border-radius: 2rem;\n' +
            '}\n' +
            '.leftFoot, .centerFoot, .rightFoot {\n' +
            'flex-grow: 1;\n' +
            '}\n';
    // Flex from: https://stackoverflow.com/a/44348868/6929343
}

function ttaBtnStyle() {
    return  '.tta-btn {\n' +
            'font-size: 25px;\n' +
            'border-radius: 1rem;\n' +
            'margin: .5rem;\n' +
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
    var html = '<tr onclick="tabSetRow(this)">\n';
    if (scrSmall) {
        html += tabButton(i, tabListenSym, tabListenTitle, "clickListen");
        html += tabButton(i, tabControlsSym, tabControlsTitle, "clickControls");
    }           // Two columns of buttons
    else {
        html += tabButton(i, tabListenSym, tabListenTitle, "clickListen");
        html += tabButton(i, tabUpSym, tabUpTitle, "clickUp");
        html += tabButton(i, tabDownSym, tabDownTitle, "clickDown");
        html += tabButton(i, tabEditSym, tabEditTitle, "clickEdit");
        html += tabButton(i, tabDeleteSym, tabDeleteTitle, "clickDelete");
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

function clickCommon(i) {
    currentRow = i + 1;
    ttaTask = ttaProject.objTasks[ttaProject.arrTasks[i]];
}

function clickListen(i) {
    clickCommon(i);
    end_alarm = getTaskValue("task_end_alarm");
    if (end_alarm == "false") { alert("Alarm turned off for this task."); return; }
    sound = getTaskValue("task_end_filename");
    // <audio> tags buried on the page with ID name same as sound filename.
    audioControl = document.getElementById(sound);
    audioControl.play();
}
function clickUp(i) {
    clickCommon(i);
    if (i == 0) { alert("Already at top, can't move up"); return; }
    swapTask(i, i - 1);
}
function clickDown(i) {
    // TODO: After moving, update & save localStorage
    clickCommon(i);
    var cnt = ttaProject.arrTasks.length;
    if (i == cnt - 1) { alert("Already at bottom, can't move down"); return; }
    swapTask(i, i + 1);
}
var oldTask;
function clickEdit(i) {
    clickCommon(i);
    oldTask = Object.assign({}, ttaTask); // https://stackoverflow.com/a/34294740/6929343
    paintTaskWindow("Edit");
}
function clickDelete(i) {
    clickCommon(i);
    paintTaskWindow("Delete");
}
function clickAddTask() {
    // Create empty record for add
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    oldTask = Object.assign({}, tta_task);
    paintTaskWindow("Add");
}
function clickAddProject() {
    alert("Clicked Add Project but not implemented yet")
    ttaProject = Object.assign({}, tta_project);
}
function clickPlay() {
    // Run Project - Countdown all tasks
    alert("Clicked Run but not implemented yet")
}
function clickControls(i) {
    // Popup buttons for small screens
    clickCommon(i);
}

function getTaskValue(key) {
    value = ttaTask[key];
    if (value == "default") { return getProjectValue(key); }
    return value;
}
function getProjectValue(key) {
    value = ttaProject[key];
    if (value == "default") { return ttaStore[key]; }
    return value;
}

function swapTask(source, target) {
    hold = ttaProject.arrTasks[target];
    ttaProject.arrTasks[target] = ttaProject.arrTasks[source];
    ttaProject.arrTasks[source] = hold;
    paintTasksTable();
}

function paintTaskWindow(mode) {
    // mode can be "Add", "Edit" or "Delete"
    // Button at bottom allows calling paintProjectsTable(id)
    currentWindow = mode;
    var id = currentId;
    buildInit();  // Reset data dictionary input field controls

    var cnt = ttaProject.arrTasks.length;
    var html = "<h2>" + ttaProject.project_name + " Project - " +
                mode + " Task</h2>"

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
    html += '#tabTasks th, #tabTasks td {\n' +
            '}\n'
    html += ttaBtnStyle();
    html += bigFootStyle();
    html += inpSwitchStyle();
    html += inpSelectStyle();
    html += '</style>'  // Was extra \n causing empty space at bottom?
    id.innerHTML = html;
    initSwitchesAfterDOM();
}

var inpSwitches;

function buildInit() {
    /*  Initialize custom objects used on form */
    inpSwitches = {};  // Reset any switches last used
}

function buildInput(key, mode) {
    /*  When building input field the "default" value is replaced with
        actual value for input. When saving, the default is obtained and
        if it matches user input then "default" phrase is saved.
    */
    get_dd_field(key);
    value = getTaskValue(key);  // Translates "default" to real value
    var html = "<tr><td>\n";
    html += dd_field.label + '</td>\n'

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
    // dd_file.lower contains "file A|file B|file C| file D"
    var html = "";
    html += '<select id="' + key + '" class="tabInput" required \n' +
        'onchange="setSelectInput(this)" \n' +
        'value="' + value + '">\n' ;
    //    'name="' + key + '" >\n';
    html += buildSelectOption("", "Please Choose...");
    console.log("dd_field.lower:", dd_field.lower);
    var options = dd_field.lower.split('/');
    console.log("options:", options);
    // TODO: Ensure Sound filenames don't contain "|"
    for (var i=0; i<options.length; i++) {
        html += buildSelectOption(i.toString(), options[i]);
    }
    html += '</select>\n';
    console.log("select html:", html);
    return html;
}

function buildSelectOption(value, name) {
    var html="";
    html += '  <option value="' + value + '">' + name +
            '</option>\n' ;
    return html;
}

function setSelectInput(data) {
    //var myDiv = document.getElementById( data.id + '-value' );
    //myDiv.innerHTML = data.value;
    console.log("setSelectInput(data):", data)
}

function clickUpdateTask() {
    /* Process Task updates - Add, Edit and Delete Task */
    const original_index = ttaProject.arrTasks.indexOf(ttaTask.task_name);
    // When original index is < 0 it means we are adding new task
    if (!currentWindow == "Add" && original_index < 0) {
        // Sanity check failed
        alert(ttaTask.task_name + " Not found in ttaProject.arrTasks");
        return false;
    }
    // Check for delete first and exit.
    if (currentWindow == "Delete") {
        if (confirmDelete()) {
            delete ttaProject.objTasks[ttaTask.task_name];
            ttaProject.arrTasks.splice(original_index, 1);
            // 2nd parameter means remove one item only
            paintTasksTable();  // What if there are no tasks left?
            return true;
        }
        else { return false; }
    }

    /* Validate input field values for Save/Add */
    if (!validateInput()) { return false; }

    // Get switch values and add to newTask
    var newTask = getInputValues();
    for (const name of Object.keys(inpSwitches)) {
        newTask[name] = inpSwitches[name].value
    }

    // Assign "default" to fields if they match parent(s)
    for (const name of Object.keys(newTask)) {
        var value = newTask[name];  // Current Task value
        old_value = getProjectValue(name);  // Get project's value
        // If new Task value same as Project's value it is a "default".
        if (value == old_value) { newTask[name] = "default" }
    }

    // Save changes or Add new ttaTask
    if (original_index < 0) {
        // Add mode, push new key onto array
        ttaProject.arrTasks.push(newTask.task_name);
    } else {
        const new_index = ttaProject.arrTasks.indexOf(newTask.task_name);
        // The original key existed (Edit mode). Has it been changed?
        if (original_index != new_index) {
            // Replace old key with new at same spot
            ttaProject.arrTasks[original_index] = newTask.task_name;
        } // At this point it's Edit mode and key hasn't changed.
    }

    // Update object values
    ttaProject.objTasks[newTask.task_name] = newTask;
    paintTasksTable()
    return true;
}

function validateInput() {
    // Validate input fields
    var newTask = getInputValues();

    // Validation - Non-blank Task name, numeric fields, "true" or "false"
    // Assign "default" to fields if they match parent
    for (const name of Object.keys(newTask)) {
        var value = newTask[name];
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
    // Get input field values from <form>
    var elements = document.getElementById("formTask").elements;
    var newTask = {}
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        newTask[item.name] = item.value;
    }
    return newTask;
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
    if (!dd_field.type == "number") { return true; } // Not "number" type
    return true;
}

function validateRadioButton(value) {
    // SHORT TERM (I think?)
    // LONG TERM still needed for sound filenames if user deleted one?
    // Thorough Doc: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
    if (!dd_field.type == "radio") { return true; } // Not "number" type
    return true;
}

function validateDropdownButton(value) {
    // SO Example: https://stackoverflow.com/a/44736840/6929343
    // Thorough Doc: https://www.w3schools.com/howto/howto_js_dropdown.asp
    if (!dd_field.type == "select") { return true; } // Not "number" type
    return true;
}

// =================================  SWITCHES  ===============================
var switch_on_image = "{{ site.url }}/assets/img/icons/switch_on_right.png"
var switch_off_image = "{{ site.url }}/assets/img/icons/switch_off_left.png"

function buildInit() {
    /*  Initialize custom objects used on form
    */
    inpSwitches = {};
}

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
    for (const name of Object.keys(inpSwitches)) {
        element = document.getElementById(inpSwitches[name].id);
        inpSwitches[name].elm = element;
        element.addEventListener('click', () => { toggleSwitch(name); });
        setSwitch(name, inpSwitches[name].value);
    }
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

function confirmDelete() { return true }

// ERROR: Task Name must be unique and cannot be blank


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