---
layout:       post
title:        LibreOffice Calc Macro doesn't insert new sheet
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/889978
type:         Question
tags:         libreoffice
created_date: 2017-03-06 01:12:33
edit_date:    2017-03-07 01:11:14
votes:        0
favorites:    
views:        1,242
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    true
---

I have a LibreOffice Calc spreadsheet and used **Record Macro** function to copy the current row to a new sheet and transpose from columns to rows.

I assigned the macro to the shortcut key <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> and everything works except a new sheet isn't inserted and the paste occurs in the current sheet which disastrous.

Sample of main sheet with current row highlighted:

[![IG Main][1]][1]

Sample of result when manually copy, insert sheet, paste transpose and format:

[![IG View][2]][2]

Current macro which fails to insert new sheet and pastes into current sheet:

{% include copyHeader.html %}
``` 
sub ViewRowInNewSheet
rem ----------------------------------------------------------------------
rem define variables
dim document   as object
dim dispatcher as object
rem ----------------------------------------------------------------------
rem get access to the document
document   = ThisComponent.CurrentController.Frame
dispatcher = createUnoService("com.sun.star.frame.DispatchHelper")

rem ----------------------------------------------------------------------
dim args1(0) as new com.sun.star.beans.PropertyValue
args1(0).Name = "Sel"
args1(0).Value = false

dispatcher.executeDispatch(document, ".uno:GoToStartOfRow", "", 0, args1())

rem ----------------------------------------------------------------------
dim args2(0) as new com.sun.star.beans.PropertyValue
args2(0).Name = "Sel"
args2(0).Value = true

dispatcher.executeDispatch(document, ".uno:GoToEndOfRow", "", 0, args2())

rem ----------------------------------------------------------------------
dispatcher.executeDispatch(document, ".uno:Copy", "", 0, Array())

rem ----------------------------------------------------------------------
'dim args4(1) as new com.sun.star.beans.PropertyValue
'args4(0).Name = "Name"
'args4(0).Value = "View"
'args4(1).Name = "Index"
'args4(1).Value = 4

'dispatcher.executeDispatch(document, ".uno:Insert", "", 0, args4())
'
' Replacement Code from Ask Ubuntu March 6/2017 :
oSheets = ThisComponent.Sheets
oSheets.insertNewByName("View",1)

rem ----------------------------------------------------------------------
dim args5(5) as new com.sun.star.beans.PropertyValue
args5(0).Name = "Flags"
args5(0).Value = "SVD"
args5(1).Name = "FormulaCommand"
args5(1).Value = 0
args5(2).Name = "SkipEmptyCells"
args5(2).Value = false
args5(3).Name = "Transpose"
args5(3).Value = true
args5(4).Name = "AsLink"
args5(4).Value = false
args5(5).Name = "MoveMode"
args5(5).Value = 4

dispatcher.executeDispatch(document, ".uno:InsertContents", "", 0, args5())

rem ----------------------------------------------------------------------
dim args6(0) as new com.sun.star.beans.PropertyValue
args6(0).Name = "ToPoint"
args6(0).Value = "$A$1"

dispatcher.executeDispatch(document, ".uno:GoToCell", "", 0, args6())

rem ----------------------------------------------------------------------
dim args7(2) as new com.sun.star.beans.PropertyValue
args7(0).Name = "FontHeight.Height"
args7(0).Value = 15
args7(1).Name = "FontHeight.Prop"
args7(1).Value = 100
args7(2).Name = "FontHeight.Diff"
args7(2).Value = 0

dispatcher.executeDispatch(document, ".uno:FontHeight", "", 0, args7())

rem ----------------------------------------------------------------------
dim args8(0) as new com.sun.star.beans.PropertyValue
args8(0).Name = "By"
args8(0).Value = 1

dispatcher.executeDispatch(document, ".uno:GoDownSel", "", 0, args8())

rem ----------------------------------------------------------------------
dim args9(0) as new com.sun.star.beans.PropertyValue
args9(0).Name = "By"
args9(0).Value = 1

dispatcher.executeDispatch(document, ".uno:GoDownSel", "", 0, args9())

rem ----------------------------------------------------------------------
dispatcher.executeDispatch(document, ".uno:DeleteRows", "", 0, Array())

rem ----------------------------------------------------------------------
dim args11(0) as new com.sun.star.beans.PropertyValue
args11(0).Name = "ToPoint"
args11(0).Value = "$A$3"

dispatcher.executeDispatch(document, ".uno:GoToCell", "", 0, args11())

rem ----------------------------------------------------------------------
dim args12(0) as new com.sun.star.beans.PropertyValue
args12(0).Name = "Sel"
args12(0).Value = true

dispatcher.executeDispatch(document, ".uno:GoToEndOfData", "", 0, args12())

rem ----------------------------------------------------------------------
dim args13(4) as new com.sun.star.beans.PropertyValue
args13(0).Name = "CharFontName.StyleName"
args13(0).Value = ""
args13(1).Name = "CharFontName.Pitch"
args13(1).Value = 1
args13(2).Name = "CharFontName.CharSet"
args13(2).Value = -1
args13(3).Name = "CharFontName.Family"
args13(3).Value = 0
args13(4).Name = "CharFontName.FamilyName"
args13(4).Value = "Andale Mono"

dispatcher.executeDispatch(document, ".uno:CharFontName", "", 0, args13())

rem ----------------------------------------------------------------------
dim args14(0) as new com.sun.star.beans.PropertyValue
args14(0).Name = "ToPoint"
args14(0).Value = "$A$3"

dispatcher.executeDispatch(document, ".uno:GoToCell", "", 0, args14())


end sub

```

**NOTE:** When inserting a new sheet the default is to insert before the current sheet. I picked the option to insert the new sheet *after* the current sheet. I don't think that should effect anything though.

LibreOffice was updated a couple of weeks ago automatically to **Version 5.1.6.2**. I would be more than happy to downgrade if that fixes the problem but this is a new macro and I never tried it before the upgrade.


  [1]: https://i.stack.imgur.com/pMZfn.png
  [2]: https://i.stack.imgur.com/hoQsH.png
