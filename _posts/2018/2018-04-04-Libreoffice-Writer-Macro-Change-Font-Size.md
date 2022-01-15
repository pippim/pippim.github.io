---
layout:       post
title:        >
    Libreoffice Writer Macro Change Font Size
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/49640951
type:         Question
tags:         basic libreoffice-basic
created_date: 2018-04-04 00:29:34
edit_date:    2018-04-06 12:20:11
votes:        "1 "
favorites:    
views:        "2,100 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    true
---

This question was posted to help solve this [**Ask Ubuntu** 350 point bounty][1] that ends today. I would rather someone in **Stack Overflow** post an answer and get the bounty than see it go unrewarded and the OP not getting a working solution.

I have this macro pieced together from three sources (sorry kind of ugly at this stage).
The total project is to change everything not 18 pt to 12 pt. Then change 18 pt to 22 pt. Then set Heading 1 to 28 pt. I've spent hours trying to get this simple thing done by recording macros which just leaves one dissappointed.

Here is the recorded macro so far:

 to change 10 point to 12 point. It runs without error but doesn't change a thing:



{% include copyHeader.html %}
``` basic
Sub AllFonts
rem - change all font names to Ubuntu.
rem - If heading 1 set font size to 28
rem - else if font size is 18 set to 22
rem - else set font size to 12

rem The macro will save document and exit Libreoffice Writer.

Dim CharHeight As Long, oSel as Object, oTC as Object
Dim CharStyleName As String
Dim oParEnum as Object, oPar as Object, oSecEnum as Object, oSec as Object
Dim oVC as Object, oText As Object
Dim oParSection        'Current Section
      
oText = ThisComponent.Text
oSel = ThisComponent.CurrentSelection.getByIndex(0) 'get the current selection
oTC = oText.createTextCursorByRange(oSel)           ' and span it with a cursor

rem Scan the cursor range for chunks of given text size.
rem (Doesn't work - affects the whole document)

oParEnum = oTC.Text.createEnumeration()
Do While oParEnum.hasMoreElements()
  oPar = oParEnum.nextElement()
  If oPar.supportsService("com.sun.star.text.Paragraph") Then
    oSecEnum = oPar.createEnumeration()
    oParSection = oSecEnum.nextElement()
    Do While oSecEnum.hasMoreElements()
      oSec = oSecEnum.nextElement()
      If oSec.TextPortionType = "Text" Then
		CharStyleName = oParSection.CharStyleName
        CharHeight = oSec.CharHeight
		if CharStyleName = "Heading 1" Then
	        oSec.CharHeight = 28
	    elseif CharHeight = 18 Then
	        oSec.CharHeight = 22
	    else
	        oSec.CharHeight = 12
        End If
      End If
    Loop
  End If

Loop

FileSave
stardesktop.terminate()

End Sub


Sub UbuntuFontName
rem ----------------------------------------------------------------------
rem define variables
dim document   as object
dim dispatcher as object
rem ----------------------------------------------------------------------
rem get access to the document
document   = ThisComponent.CurrentController.Frame
dispatcher = createUnoService("com.sun.star.frame.DispatchHelper")

rem ----------- Select all text ------------------------------------------
dispatcher.executeDispatch(document, ".uno:SelectAll", "", 0, Array())

rem ----------- Change all fonts to Ubuntu -------------------------------
dim args5(4) as new com.sun.star.beans.PropertyValue
args5(0).Name = "CharFontName.StyleName"
args5(0).Value = ""
args5(1).Name = "CharFontName.Pitch"
args5(1).Value = 2
args5(2).Name = "CharFontName.CharSet"
args5(2).Value = -1
args5(3).Name = "CharFontName.Family"
args5(3).Value = 0
args5(4).Name = "CharFontName.FamilyName"
args5(4).Value = "Ubuntu"

dispatcher.executeDispatch(document, ".uno:CharFontName", "", 0, args5())

end sub


sub FileSave
rem ----------------------------------------------------------------------
rem define variables
dim document   as object
dim dispatcher as object
rem ----------------------------------------------------------------------
rem get access to the document
document   = ThisComponent.CurrentController.Frame
dispatcher = createUnoService("com.sun.star.frame.DispatchHelper")

rem ----------------------------------------------------------------------
dispatcher.executeDispatch(document, ".uno:Save", "", 0, Array())


end sub

```

It crashes at end with this message:

[![LO error][2]][2]




  [1]: {% post_url /2018/2018-04-01-Change-2-or-more-LibreOffice-documents-to-have-the-exact-same-styling∕formatting %}
  [2]: https://i.stack.imgur.com/DRj6V.png
