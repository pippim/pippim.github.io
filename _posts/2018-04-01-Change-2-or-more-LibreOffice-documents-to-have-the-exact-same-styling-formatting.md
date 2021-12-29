---
layout:       post
title:        Change 2 or more LibreOffice documents to have the exact same styling/formatting
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021152
type:         Answer
tags:         libreoffice style
created_date: 2018-04-01 20:56:11
edit_date:    2020-06-12 14:37:07
votes:        4
favorites:    
views:        609
accepted:     Accepted
uploaded:     2021-12-28 20:06:53
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Use Libreoffice tools instead of CLI

When all you have are command line tools everything looks like a command line problem. I've decided to write this answer using LibreOffice macros:

1. Use a command line loop to process every Writer document in a "headless" environment.
2. Run macro to change `.rtf` (Rich Text Format) Writer document file.
3. Macro saves file and exit
4. Loop back to 1.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Create test data

Create two or more files containing:

[![richtext2.png][1]][1]

Create script `~/Downloads/copy-rtf.sh` containing:

``` 
cp ~/Documents/*.rtf ~/Downloads

```

Mark as executable using

``` 
chmod a+x ~/Downloads/copy-rtf.sh

```

- During development and testing, the macros modifying `*.rtf` files will run against `~/Downloads` directory. 
- Before each test type `cd ~/Downloads` and run `./copy-rtf.sh`
- After output is perfect, they are copied back into live directory.

The Downloads directory is used because:

- everyone has a `~/Downloads`
- it gets added to regularly and manually emptied periodically
- it is more permanent than `/tmp/` directory which may not persist across reboots.

----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Run macro in headless environment

Using this [Stack Exchange answer][2] invoke Libreoffice Writer from the command line and pass it a global macro name to execute:



``` bash
soffice -headless -invisible "vnd.sun.star.script:Standard.Module1.MySubroutine? language=Basic&location=application"

```

The above answer may not work so [another method][3] can be tried:

``` bash
soffice "macro:///Standard.SaveCSV.Main" $1

```


----------


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Install Java Runtime Environment

To run macros you need Java Runtime Environment (JRE) installed. The developer's web page has [instructions][4] for downloading and installing manually.

However this AU Q&A: [https://askubuntu.com/a/728153/307523][5] suggests it is as simple as:

``` bash
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer oracle-java8-set-default

```

I tried the AU Q&A method and after the first step of adding the PPA a splash screen appears with additional information. The most helpful is a link to [setting up JRE 8 on Debian systems][6].

The third step of installing JRE 8 requires you to use <kbd>Tab</kbd> and <kbd>Enter</kbd> to accept the License Agreement. Your machine will pause for a few minutes during the heaviest part of the installation routine.

Now open LibreOffice and select **Tools** -> **Options** -> **LibreOffice** -> **Advanced** and setup this screen:

[![LO JRE8 Advanced Setup.png][7]][7]

Click the options for:

- Use a Java runtime environment
- Oracle Corporation 1.8.0_161
- Enable macro recording (experimental)
- Click OK
- You will be asked to restart, click "Restart Now".


----------



<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## LibreOffice Writer Macro

The macro will read through the entire document and:

- change font name to Ubuntu.
- If heading 1 set font size to 28
- else if font size is 18 set to 22
- else set font size to 12

The macro will save document and exit Libreoffice Writer.

### Turn off Dialog

Do a file save and this dialog comes up:

[![LO Writer turn off RTF dialog.png][8]][8]

Turn this message off as show in the screen. The macro may not run properly if this option is on.

### Macro contents

I spent a few days attempting to record a macro using "Tools" -> "Macros" -> "Record Macro" -> "Basic". At first it seemed promising but the recorded macro had inconsistent behavior and had to be abandoned for a hand written basic macro. A found help in Stack Overflow for an expert there to help me with the basic [basic coding][9]. Here is the result:



{% include copyHeader.html %}
``` vba
Sub ChangeAllFonts
    rem - Change all font names to Ubuntu.
    rem - If heading 1 set font size to 28
    rem - else if font size is 18 set to 22
    rem - else set font size to 12
    rem - The macro will save document and exit LibreOffice Writer.
    Dim oDoc As Object
    Dim oParEnum As Object, oPar As Object, oSecEnum As Object, oSec As Object
    Dim oFamilies As Object, oParaStyles As Object, oStyle As Object
    oDoc = ThisComponent
    oParEnum = oDoc.Text.createEnumeration()
    Do While oParEnum.hasMoreElements()
      oPar = oParEnum.nextElement()
      If oPar.supportsService("com.sun.star.text.Paragraph") Then
        oSecEnum = oPar.createEnumeration()
        Do While oSecEnum.hasMoreElements()
          oSec = oSecEnum.nextElement()
          If oSec.TextPortionType = "Text" Then
            If oSec.ParaStyleName = "Heading 1" Then
                rem ignore for now
            ElseIf oSec.CharHeight = 18 Then
                oSec.CharHeight = 22.0
            Else
                oSec.CharHeight = 12.0
            End If
          End If
        Loop
      End If
    Loop
    oFamilies = oDoc.getStyleFamilies()
    oParaStyles = oFamilies.getByName("ParagraphStyles")
    oStyle = oParaStyles.getByName("Heading 1")
    oStyle.setPropertyValue("CharHeight", 28.0)
    FileSave
    StarDesktop.terminate()
End Sub

rem Above subroutine is missing call to UbuntuFontName ()
rem also it is calling oStyle.setPropertyValue("CharHeight", 28.0)
rem which may cause problems. Will test. Also StarDesktop.terminate ()
rem is known to cause problems and will likely be reworked with a
rem a dialog box telling operator the program is finished and maybe
rem to press <Alt>+<F4>.

```

``` vba
rem ========= Original code below for possible recycling ===========

```

{% include copyHeader.html %}
``` vba
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

  [1]: https://i.stack.imgur.com/9UmyA.png
  [2]: https://superuser.com/questions/1135850/how-do-i-run-a-libreoffice-macro-from-the-command-line-without-the-gui?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  [3]: https://ask.libreoffice.org/en/question/11039/how-do-you-close-libreoffice-calc-from-a-macro/
  [4]: https://www.java.com/en/download/help/linux_x64_install.xml
  [5]: https://askubuntu.com/a/728153/307523
  [6]: http://www.webupd8.org/2014/03/how-to-install-oracle-java-8-in-debian.html
  [7]: https://i.stack.imgur.com/ZdALj.png
  [8]: https://i.stack.imgur.com/KDycz.png
  [9]: https://stackoverflow.com/questions/49640951/libreoffice-writer-macro-change-font-size


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

