---
---
// Tim-ta (Timed Tasks)

// Button Image source: https://www.cleanpng.com/free/

// dragElement defined in /assets/js/theCookieMachine.js
// dragElement(document.getElementById("tta_window"));

// Configuration & Container for all Tim-ta Projects
// Default below for creation, overwritten when retrieved from localStorage
var tta_store = {
    arrProjects: [],
    objProjects: {},
    cntProjects: 0,
    timer_prompt: "true",
    timer_end_alarm: "true",
    timer_end_filename: "Alarm_03.mp3",
    timer_end_notification: "false",
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
var tta_project = {
    project_index: null,
    project_name: null,
    objTasks: {},
    cntTasks: 0,
    timer_prompt: "default",
    timer_end_alarm: "default",
    timer_end_filename: "default",
    timer_end_notification: "default",
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
var tta_timer = {
    timer_index: null,
    timer_name: null,
    hours: null,
    minutes: null,
    seconds: null,
    timer_prompt: "default",
    timer_end_alarm: "default",
    timer_end_filename: "default",
    timer_end_notification: "default",
    progress_bar_update_seconds: "default",
    confirm_delete_phrase: "default"
}

// Get variable values and source.
// EG timer_prompt value & source can be "true", "Manual Override"
// "true", "Project Default", "true", "Configuration Default"
var ttaStore, ttaProject, ttaTask;

ttaNewConfig();  // Always new until localStorage setup

function ttaNewConfig() {
    ttaStore = tta_store;
    ttaProject = tta_project;
    ttaProject.project_name = "Laundry";

    ttaTask = ttaNewTask("Wash Cycle");
    ttaTaskDuration(0, 16, 30);
    ttaAddTask(ttaTask);

    ttaTask = ttaNewTask("Rinse Cycle");
    ttaTaskDuration(0, 13, 15);
    ttaAddTask(ttaTask);

    ttaTask = ttaNewTask("Dryer");
    ttaTaskDuration(0, 58, 0);
    ttaAddTask(ttaTask);

    ttaStore.arrProjects = [ttaProject.project_name];
    ttaStore.objProjects[ttaProject.project_name] = ttaProject;
    ttaStore.cntProjects = 1;
}

function ttaNewTask (name) {
    var new_task = tta_task;
    new_task.timer_index = ttaProject.cntTasks;
    new_task.task_name = name;
    new_task.hours = new_task.minutes = new_task.seconds = 0;
    return new_task;
}

function ttaAddTask (obj) {
    ttaProject.objTasks[obj.task_name] = obj;
    ttaProject.cntTasks += 1;
}

function ttaTaskDuration (hours, minutes, seconds) {
    ttaTask.hours = hours;
    ttaTask.minutes = minutes;
    ttaTask.seconds = seconds;
}

/* End of /assets/js/tim-ta.js */