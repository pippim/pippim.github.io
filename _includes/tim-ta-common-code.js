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

+===================================================================+
| Up | Down | Edit | Delete | Task Name | Hours | Minutes | Seconds |
+----+------+------+--------+-----------+-------+---------+---------+

+ Add new task

If none of the tasks have "Hours", hide that column
If none of the tasks have "minutes", remove that column
If none of the tasks have "seconds", remove that column
NOTE: If set to zero, that counts as none

Tasks Table (Small Screen)

+======================+
| Controls | Task Name |
+----------+-----------+

+ Add new task

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

var scrWidth, scrSmall, scrMedium, scrLarge;
function scrSetSize() {
    var scrWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    scrSmall = scrMedium = scrLarge = false;
    if (scrWidth < 640) { scrSmall = true; }
    else if (scrWidth > 1007) { scrLarge = true; }
    else { scrMedium = true; }
    console.log("scr Width Small Medium Large: ", scrWidth, scrSmall, scrMedium, scrLarge)
}
scrSetSize();
window.addEventListener("resize", () => { scrSetSize(); }

/* Duplicate @large, @medium and @small

@mixin large {
  @media screen and (min-width: #{$large-breakpoint}) {
    @content;
  }
}

@mixin medium {
  @media screen and (min-width: #{$medium-breakpoint}) and (max-width: #{$large-breakpoint}) {
    @content;
  }
}

@mixin small {
  @media screen and (max-width: #{$medium-breakpoint}) {
    @content;
  }
}
*/

function paintProjectsTable(id) {
}

</script>

<!-- End of /_includes/tim-ta-common-code.js -->