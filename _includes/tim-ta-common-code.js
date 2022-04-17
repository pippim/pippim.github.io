<!--
Projects Table (Large Screen)

+=====================================================================+
| Run | Up | Down | Edit | Delete | Project Name | # Tasks | Duration |
+-----+----+------+------+--------+--------------+---------+----------+

+ Add new project

Possible error/confirmation messages:

    Run - Project has no timers, cannot run.
    Up - Project is already at top, cannot move up.
    Down - Project is already at bottom, cannot move down.
    Delete - Confirm delete by typing "delete".

Projects Table (Small Screen)

+===============================+
| Run | Controls | Project Name |
+-----+----------+--------------+

+ Add new task

Controls column is invisible on large screen:
- https://stackoverflow.com/a/7754278/6929343
Up, Down, Edit and Delete columns are invisible on small screen

    When you click Controls a draggable popup window appears with:

        +===========================+
        | Up | Down | Edit | Delete |
        +----+------+------+--------+

    When draggable window is activated, Controls column disappears in table.

Tasks Table (Large Screen)

+===========================================================+
| Listen | Up | Down | Edit | Delete | Task Name | Duration |
+--------+----+------+------+--------+-----------+----------+

+ Add new task

If none of the tasks have "Hours", hide that column
If none of the tasks have "minutes", remove that column
If none of the tasks have "seconds", remove that column
NOTE: If set to zero, that counts as none

Tasks Table (Small Screen)

+======================+
| Controls | Task Name |
+----------+-----------+

+ New task + New Project > run

    When you click Controls a draggable popup window appears with:

        +===========================+
        | Up | Down | Edit | Delete |
        +----+------+------+--------+


-->

<table id='projects' border="collapse">
  <col class="col0"/>
  <col class="col1"/>
  <col class="col2"/>
  <col class="col3"/>
  <col class="col4"/>
  <col class="col5"/>
  <col class="col6"/>
  <col class="col7"/>
  <tr><th colspan="5">Controls</th>
  <th>Project Name</th><th>#</th><th>Duration</th></tr>
  <tr><td>Run</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>Laundry</td><td>3</td><td>1 Hr. 40 Min 10 Sec</td></tr>
  <tr><td>Run</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>Chili</td><td>5</td><td>4 Hr. 20 Min</td></tr>
  <tr><td>Run</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>Work Out</td><td>7</td><td>45 Min</td></tr>
  <tr><td>Run</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>A VERY Long Project Name</td><td>#</td><td>A longer duration</td></tr>
</table>
<form>
  Enter zero index based column no: <input type='text' name=col_no><br>
  <input type='button' onClick='javascript:show_hide_column(col_no.value,  true);' value='show'>
  <input type='button' onClick='javascript:show_hide_column(col_no.value, false);' value='hide'>
</form>

<table id='tasks' border="collapse">
  <col class="col0"/>
  <col class="col1"/>
  <col class="col2"/>
  <col class="col3"/>
  <col class="col4"/>
  <col class="col5"/>
  <col class="col6"/>
  <col class="col7"/>
  <tr><th colspan="5">Controls</th>
  <th>Task Name</th><th>#</th><th>Duration</th></tr>
  <tr><td>Listen</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>Wash</td><td>3</td><td>16 Min 30 Sec</td></tr>
  <tr><td>Listen</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>Rinse</td><td>3</td><td>13 Min</td></tr>
  <tr><td>Listen</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>Dryer</td><td>7</td><td>58 Min 15 Sec</td></tr>
  <tr><td>Listen</td><td>Up</td><td>Dn</td><td>Edit</td><td>Del</td>
  <td>A VERY Long Task Name</td><td>#</td><td>A longer duration</td></tr>
</table>
<form>
  Enter zero index based column number: <input type='text' name=col_no><br>
  <input type='button' onClick='javascript:show_hide_column(col_no.value,  true);' value='show'>
  <input type='button' onClick='javascript:show_hide_column(col_no.value, false);' value='hide'>
</form>

<script>
function show_hide_column(col_no, do_show) {
   var tbl = document.getElementById('projects');
   var col = tbl.getElementsByTagName('col')[col_no];
   if (col) {
     col.style.visibility=do_show?"":"collapse";
   }
}


var scrTimeout, scrWidth, scrSmall, scrMedium, scrLarge;

scrSetSize();  // Call on document load

function scrSetSize() {
    // cell phones don't have window.innerWidth
    scrWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    scrSmall = scrMedium = scrLarge = false;
    if (scrWidth < 640) { scrSmall = true; }
    else if (scrWidth > 1007) { scrLarge = true; }
    else { scrMedium = true; }
    console.log("scr Width Small Medium Large: ", scrWidth, scrSmall, scrMedium, scrLarge)
}
// window.addEventListener('resize', () => { func1(); func2(); });
window.onresize = function() {
    // Can be called many times during a real window resize
    clearTimeout(scrTimeout);  // Reset window resize delay to zero
    scrTimeout = setTimeout(scrSetSize, 250);  // After 250 ms set screen size
}


function paintProjectsTable(id) {
    // If only one Project defined, skip and paintTasksTable
    // Grab the first (and only) Project at array offset 0
    ttaProject = ttaStore.objProjects[ttaStore.arrProjects[0]];
    paintTasksTable(id);
}


function paintTasksTable(id) {
    // Assumes ttaStore and ttaProject are populated
    // Button at bottom allows calling paintProjectsTable(id)
    var html = "<h3>" + ttaProject.project_name + "</h3>"
    html += '<table id="tabTasks">\n' ;
    // Statistics Table heading
    html += tabTasksHeading();

    for (const [key, value] of Object.entries(ttaProject.objTasks)) {
        ttaTask = value;
        html += tabTaskDetail();
    }
    html += '</table>\n';     // End of our table and form

    // TODO: Move next 9 lines to a shared function
    // Heading: "999 Pippim website entries found." <h3> styling
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

function tabTaskDetail() {
    var html = "<tr>\n";
    if (scrSmall) {
        html += "<td>Listen</td><td>Edit</td>\n";
    }           // Two columns of buttons
    else {
        html += "<td>Listen</td><td>Up</td>\n" +
                "<td>Dn</td><td>Edit</td>\n" +
                "<td>Delete</td>\n"
    }           // Five columns of buttons
    html += "<td>" + ttaTask.task_name + "</td>\n";
    var strDuration = hmsToString(ttaTask.hours, ttaTask.minutes, ttaTask.seconds);
    if (!scrSmall) { html += "<td>" + strDuration + "</td>\n"; }
    return html += "</tr>\n";
}

function hmsToString(hours, minutes, seconds) {
    var str = "";
    if (hours > 0) { str += hours.toString(); + "Hr." }
    if (minutes > 0) { str += minutes.toString(); + "Min" }
    if (seconds > 0) { str += seconds.tString(); + "Sec" }
}

</script>

<!-- End of /_includes/tim-ta-common-code.js -->