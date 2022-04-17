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
  <col class="col8"/>
  <tr><th>Run</th><th>Up</th><th>Down</th><th>Edit</th><th>Delete</th><th>Controls</th>
  <th>Project Name</th><th># Tasks</th><th>Duration</th></tr>
  <!-- <tr><td colspan="9"><table><tr><td>Optional Heading</td></tr></table></td></tr> -->
  <tr><td>Run</td><td>Up</td><td>Down</td><td>Edit</td><td>Delete</td><td>Controls</td>
  <td>Laundry</td><td>3</td><td>1 hour, 40 minutes, 10 seconds</td></tr>
  <tr><td>Run</td><td>Up</td><td>Down</td><td>Edit</td><td>Delete</td><td>Controls</td>
  <td>Chili</td><td>5</td><td>4 hours, 20 minutes</td></tr>
  <tr><td>Run</td><td>Up</td><td>Down</td><td>Edit</td><td>Delete</td><td>Controls</td>
  <td>Work Out</td><td>7</td><td>45 minutes</td></tr>
  <tr><td>Run</td><td>Up</td><td>Down</td><td>Edit</td><td>Delete</td><td>Controls</td>
  <td>Project Name</td><td># Tasks</td><td>Duration</td></tr>
</table>
<form>
  Enter zero index based column no: <input type='text' name=col_no><br>
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
</script>

<!-- End of /_includes/tim-ta-common-code.js -->