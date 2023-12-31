---
layout:       post
title:        >
    Bash template to use zenity (or yad) to insert / edit / delete records in a file or database
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/894888
type:         Question
tags:         command-line bash scripts zenity yad
created_date: 2017-03-20 11:41:56
edit_date:    2017-05-23 12:39:51
votes:        "6 "
favorites:    
views:        "3,979 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-20-Bash-template-to-use-zenity-_or-yad_-to-insert-_-edit-_-delete-records-in-a-file-or-database.md
toc:          false
navigation:   false
clipboard:    false
---

I’m looking for a bash template that uses **zenity** or **yad** to maintain a list of records. The template could be a shopping check list with print option or it could be a list of servers to monitor ping time. In either case I’d like to take that code and adopt it to my needs.

Here is a sample dialog box mock-up: 

[![websync 1][1]][1]

The dialog box allows selecting a record and clicking the following buttons:

- `Insert before` (insert before selected record). A new input form is mounted to enter fields.
- `Edit` (edit selected record). Mounts same form as "Insert before" except with existing values displayed.
- `Delete` (delete selected record). Contents of existing record are displayed and confirmation is requested.
- `Run` - runs a lengthy update process that updates status column with “MatcheOK / Different / Error”. User is prompted to run update on selected record or all records. Progress display bar displayed when all records are processed.
- `Cancel ALL` - DO NOT save any changes and exit bash script. Pressing <kbd>Escape</kbd> or closing window by clicking `X` performs same action. If any records have been changed, confirmation is requested.
- `Save` - save changes to disk and exit bash script.

**NOTE:** It appears zenity only allows relabeling “OK” and “Cancel” buttons. New buttons cannot be defined in zenity. As such yad (**Y**et **A**nother **D**ialog) which is installed by default in Ubuntu, and based on zenity, is the way to go. However zenity remains in the question because a script based on it can be easily converted to yad.

I’ve googled existing examples and these are the closest, but still far from satisfactory:

- [Update text file from zenity][2]

- [Populating zenity with list from SQL][3]

- [Use zenity from a script file to insert/view data in SQL][4]

- [Example of scrollable field too long to fit in window][5]

- [Using yad (Yet Another Dialog) a fork of Zenity for multiple buttons][6]

- [Source Forge’s yad examples to Power Off / Reboot / Suspend / Logout][7]

**NOTE:** I’m not looking for a complete solution but something close which can be adapted to this project. Although this project uses a flat text file an existing script that uses SQL, ISAM or RDMS could be adapted. The only imperative is it is written in bash and not python, perl or C, etc.

**Can anyone point out an existing bash script that uses zenity (or yad) to insert/edit/delete records?**

  [1]: https://i.stack.imgur.com/3vyck.png
  [2]: https://stackoverflow.com/questions/38414780/zenity-transferring-data-collected-from-zenity-forms-to-txt-database
  [3]: https://stackoverflow.com/questions/30547182/populating-a-zenity-list-with-results-from-mysql
  [4]: http://www.linuxquestions.org/questions/linux-newbie-8/use-zenity-from-a-script-file-to-insert-view-data-in-mysql-4175591266/
  [5]: https://stackoverflow.com/questions/14968855/zenity-input-file-with-several-lines
  [6]: http://www.webupd8.org/2010/12/yad-zenity-on-steroids-display.html
  [7]: https://sourceforge.net/p/yad-dialog/wiki/Examples/
