// Tim-ta (Timed Tasks) /_includes/tim-ta-storage.js

// Configuration & Container for all Tim-ta Projects
// Default below for creation, overwritten when retrieved from localStorage
// The order arrProjects names appear is order they are displayed on screen

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

var savedSelectStockNames;

function initSelectFiles() {
    /* Called on javascript load, DOM not loaded yet */

    // Convert array of stock sound filenames to string delineated by '/'
    savedSelectStockNames = "";
    for (var i = 0; i < stockNames.length; i++) {
        if (i != 0) { savedSelectStockNames += "/"; }  // Add / if not first in array
        savedSelectStockNames += stockNames[i];
    }

    for (const key of Object.keys(data_dictionary)) {
        if (key.startsWith("fail_test")) { continue; }
        get_dd_field(key);
        if (dd_field.type == "select" && dd_field.lower == "sound_filenames") {
            // Update data dictionary key with list of REAL filenames
            data_dictionary[key] = dd_field.label + "|select|" + savedSelectStockNames;
         }
    }
}

initSelectFiles();

function updateSelectFiles() {
    /*  Called after custom sound files added after drag & drop sound files
        DOM must be loaded before calling.
    */

    // Convert array of stock sound filenames to string delineated by '/'
    //console.log("updateSelectFiles() customNames.length:", customNames.length)
    var custom = ""
    for (var i = 0; i < customNames.length; i++) {
        custom += "/"  // Add '/' delimiter
        custom += customNames[i]
    }

    for (const key of Object.keys(data_dictionary)) {
        if (key.startsWith("fail_test")) { continue }
        get_dd_field(key)
        if (dd_field.type == "select" &&
            dd_field.lower.startsWith(savedSelectStockNames)) {
                // Update data dictionary key with list of REAL filenames
                data_dictionary[key] = dd_field.label + "|select|" +
                                       savedSelectStockNames + custom
                //console.log("data_dictionary[key]:", data_dictionary[key])
        }
    }
}

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
    ttaTaskDuration("", "16", "15");
    ttaAddTask(ttaTask);

    ttaNewTask("Rinse Cycle");
    ttaTaskDuration("", "13", "");
    ttaAddTask(ttaTask);

    ttaNewTask("Dryer");
    ttaTaskDuration("", "58", "30");
    ttaAddTask(ttaTask);

    ttaConfig.arrProjects = [ttaProject.project_name];
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject;
    saveConfig();
}

function ttaNewTask(name) {
    // Only used for creating test data
    ttaTask = Object.assign({}, tta_task); // https://stackoverflow.com/a/34294740/6929343
    ttaTask.task_name = name;
    ttaTask.hours = ttaTask.minutes = ttaTask.seconds = "";
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

/* End of /_includes/tim-ta-storage.js */