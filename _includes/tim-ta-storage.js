// Tim-ta (Timed Tasks) Version 1.1 /_includes/tim-ta-storage.js

// Configuration & Container for all Tim-ta Projects
// Default below for creation, overwritten when retrieved from localStorage
// The order arrProjects names appear is order they are displayed on screen

var tta_config = {
    arrProjects: [],
    objProjects: {},
    task_prompt: "true",
    task_end_alarm: "true",
    task_end_filename: "Alarm_01.mp3",
    task_end_notification: "false",
    run_set_times: 1,
    set_prompt: "false",
    set_end_alarm: "false",
    set_end_filename: "Alarm_02.mp3",
    set_end_notification: "false",
    all_sets_prompt: "false",
    all_sets_end_alarm: "false",
    all_sets_end_filename: "Alarm_03.mp3",
    all_sets_end_notification: "false",
    progress_bar_update_seconds: 1,
    confirm_delete_phrase: "y",
    /* Version 1.1 - for version 1.0 fields will be undefined. */
    environment: "Unique device name for testing/development processing",
    color_scheme: "Cayman Theme",  // Not supported yet but in local storage
    countdown_in_title: "true",
    use_popup_window: "true",
    use_popup_last_position: "true"
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
    confirm_delete_phrase: "default",
    /* Version 1.1 - for version 1.0 fields will be undefined. */
    use_popup_window: "default",
    use_popup_last_position: "default",
    popup_position_x: "30",
    popup_position_y: "30",
    popup_size_w: "600",
    popup_size_h: "400"
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
    confirm_delete_phrase: "Text to confirm delete action|text",
    /* Version 1.1 - for version 1.0 fields will be undefined. */
    environment: "Device operating system & browser|text",
    color_scheme: "Color scheme|select|color_schemes",
    countdown_in_title: "Display countdown in task table title?|switch",
    use_popup_window: "Use popup window on large screens?|switch",
    use_popup_last_position: "Reuse last popup window location?|switch",
    popup_position_x: "x-offset (left) popup window position|number|0|10000",
    popup_position_y: "y-offset (top) popup window position|number|0|10000",
    popup_size_w: "Popup window width|number|0|9999",
    popup_size_h: "Popup window height|number|0|9999"
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

var savedSelectStockNames
var websiteColorSchemes

function initSelectFiles() {
    /* Called on javascript load, DOM not loaded yet */

    // Convert array of stock sound filenames to string delineated by '/'
    savedSelectStockNames = "";
    for (var i = 0; i < stockNames.length; i++) {
        if (i != 0) savedSelectStockNames += "/"  // Add / if not first in array
        savedSelectStockNames += stockNames[i]
    }

    // Sept 21/22 - Only one color scheme. Later append "|Dark Theme"
    websiteColorSchemes = "Cayman Theme"

    for (const key of Object.keys(data_dictionary)) {
        if (key.startsWith("fail_test")) continue  // Ignore test fail data
        get_dd_field(key)
        if (dd_field.type == "select" && dd_field.lower == "sound_filenames")
            // Update data dictionary key with list of REAL filenames
            data_dictionary[key] = dd_field.label + "|select|" + savedSelectStockNames
        if (dd_field.type == "select" && dd_field.lower == "color_schemes")
            // Update data dictionary key with list of REAL filenames
            data_dictionary[key] = dd_field.label + "|select|" + websiteColorSchemes
    }
}

initSelectFiles()

function updateSelectFiles() {
    /*  Called after custom sound files added after drag & drop sound files
        DOM must be loaded before calling.
    */

    // Convert array of stock sound filenames to string delineated by '/'
    //console.log("updateSelectFiles() customNames.length:", customNames.length)
    var custom = ""
    for (var i = 0; i < customNames.length; i++) custom += "/" + customNames[i]

    for (const key of Object.keys(data_dictionary)) {
        if (key.startsWith("fail_test")) continue
        get_dd_field(key)
        // Update data dictionary with list of REAL filenames + custom names
        if (dd_field.type == "select" &&
            dd_field.lower.startsWith(savedSelectStockNames))
                data_dictionary[key] = dd_field.label + "|select|" +
                                       savedSelectStockNames + custom
    }
}

// Global Names
var ttaConfig, ttaProject, ttaTask;

// Read localStorage copy of tta, if null then build sample data
readConfig()
if (ttaConfig == null) {
    ttaNewConfig()  // Create new config
    saveConfig()
}

function readConfig() {
    ttaConfig = JSON.parse(localStorage.getItem('ttaConfig'))
    if (ttaConfig == null) return  // Drop out to create new configuration
    // Oct 12/22 bug fixed below: if ("use_popup_window" in ttaConfig)
    if ("use_popup_window" in ttaConfig) return  // At version 1.1 already

    /* Upgrade version 1.0 to version 1.1 */
    convertVersion11()
}

function saveConfig() {
    localStorage.setItem('ttaConfig', JSON.stringify(ttaConfig))
}

/* Convert earlier versions of Tim-ta configuration to new version */
function convertVersion11() {
    /*  Conversion to Tim-ta Version 1.1  */
    if ("use_popup_window" in ttaConfig) return  // At version 1.1 already

    console.log("Converting Tim-ta version 1.0 to version 1.1")
    ttaConfig.environment = navigator.oscpu + " " + browser.name + " " +
                            browser.version
    ttaConfig.color_scheme = "Cayman Theme"
    ttaConfig.countdown_in_title = "true"
    ttaConfig.use_popup_window = "true"
    ttaConfig.use_popup_last_position = "false"

    // Find all projects in configuration
    for (const name of Object.keys(ttaConfig.objProjects)) {
        console.log("BEGIN ttaConfig.objProjects name:", name)
        // Initialize new fields in project
        ttaProject = ttaConfig.objProjects[name]
        ttaProject.use_popup_window = "default"
        ttaProject.use_popup_last_position = "default"
        setDefaultPopupWindow()
        // Update new fields from work name to real
        ttaConfig.objProjects[name] = ttaProject
        /* print fields in Project for verification */
        for (const key of Object.keys(ttaProject))
            console.log("  ttaProject key:", key,
                        "value:", ttaProject[key])
    }
    saveConfig()
}

function setDefaultPopupWindow () {
    // called above and from /assets/js/tim-ta.js
    ttaProject.popup_position_x = "30"
    ttaProject.popup_position_y = "30"
    ttaProject.popup_size_w = "600"
    ttaProject.popup_size_h = "400"
}

// Uncomment below to erase corrupted configuration
// ttaNewConfig();
// saveConfig();

function ttaNewConfig() {
    // Create a new database with sample Laundry Project
    ttaConfig = Object.assign({}, tta_config)
    ttaProject = Object.assign({}, tta_project)
    ttaProject.arrTasks = []  // Above shallow copy won't initialize arrays
    ttaProject.objTasks = {}  //  and objects
    ttaProject.project_name = "Laundry"

    ttaNewTask("Wash Cycle")
    ttaTaskDuration("", "16", "30")
    ttaAddTask(ttaTask)

    ttaNewTask("Rinse Cycle")
    ttaTaskDuration("", "13", "15")
    ttaAddTask(ttaTask)

    ttaNewTask("Dryer")
    ttaTaskDuration("", "58", "")
    ttaAddTask(ttaTask)

    ttaConfig.arrProjects = [ttaProject.project_name]
    ttaConfig.objProjects[ttaProject.project_name] = ttaProject
    saveConfig()
}

function ttaNewTask(name) {
    // Only used for creating sample Laundry Timer data
    // https://stackoverflow.com/a/34294740/6929343
    ttaTask = Object.assign({}, tta_task)
    ttaTask.task_name = name
    // Numeric fields are stored as strings and converted as necessary
    ttaTask.hours = ttaTask.minutes = ttaTask.seconds = ""
}

function ttaAddTask(obj) {
    // Only used for creating sample Laundry Timer data
    ttaProject.arrTasks.push(obj.task_name)
    ttaProject.objTasks[obj.task_name] = obj
}

function ttaTaskDuration(hours, minutes, seconds) {
    // Only used for creating sample Laundry Timer data. Already in string format
    ttaTask.hours = hours
    ttaTask.minutes = minutes
    ttaTask.seconds = seconds
}


/* End of /_includes/tim-ta-storage.js (Version 1.1) */