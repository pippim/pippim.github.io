---
layout:       post
title:        >
    Dollar Value To Word In LibreOffice Calc
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1056764
type:         Answer
tags:         libreoffice extension functions
created_date: 2018-07-17 04:22:19
edit_date:    2020-06-12 14:37:07
votes:        "5 "
favorites:    
views:        "1,257 "
accepted:     
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-17-Dollar-Value-To-Word-In-LibreOffice-Calc.md
toc:          false
navigation:   false
clipboard:    true
---

In Libreoffice Calc, you can turn on "macros" which use the "BASIC" (Beginners All-purpose Symbolic Instruction Code) language similar to Microsoft Excel's "VBA" (Visual Basic for Applications).

The advantage of using your own macro is "future-proofing". The English language for cheque / check writing isn't about to change but some extension add-ons from the past no long work today.

A summary of most respected guides on BASIC macros can be found [here][1].




----------


From Apache Open Office (almost identical to LibreOffice): [SpellNumber in Calc Basic][2]. This according to author still needs debugging.


----------


For Microsoft Excel: [How to spell out or convert numbers to English words in Excel?][3]. Libreoffice has experimental support for Excel's VBA (Visual Basic for Applications). So you can implement the macro below as is, or convert it to Libre Office BASIC syntax.

{% include copyHeader.html %}
``` vb
Function SpellNumberToEnglish(ByVal pNumber)
'Updateby20131113
Dim Dollars, Cents
arr = Array("", "", " Thousand ", " Million ", " Billion ", " Trillion ")
pNumber = Trim(Str(pNumber))
xDecimal = InStr(pNumber, ".")
If xDecimal > 0 Then
    Cents = GetTens(Left(Mid(pNumber, xDecimal + 1) & "00", 2))
    pNumber = Trim(Left(pNumber, xDecimal - 1))
End If
xIndex = 1
Do While pNumber <> ""
    xHundred = ""
    xValue = Right(pNumber, 3)
    If Val(xValue) <> 0 Then
        xValue = Right("000" & xValue, 3)
        If Mid(xValue, 1, 1) <> "0" Then
            xHundred = GetDigit(Mid(xValue, 1, 1)) & " Hundred "
        End If
        If Mid(xValue, 2, 1) <> "0" Then
            xHundred = xHundred & GetTens(Mid(xValue, 2))
        Else
            xHundred = xHundred & GetDigit(Mid(xValue, 3))
        End If
    End If
    If xHundred <> "" Then
        Dollars = xHundred & arr(xIndex) & Dollars
    End If
    If Len(pNumber) > 3 Then
        pNumber = Left(pNumber, Len(pNumber) - 3)
    Else
        pNumber = ""
    End If
    xIndex = xIndex + 1
Loop
Select Case Dollars
    Case ""
        Dollars = "No Dollars"
    Case "One"
        Dollars = "One Dollar"
    Case Else
        Dollars = Dollars & " Dollars"
End Select
Select Case Cents
    Case ""
        Cents = " and No Cents"
    Case "One"
        Cents = " and One Cent"
    Case Else
        Cents = " and " & Cents & " Cents"
End Select
SpellNumberToEnglish = Dollars & Cents
End Function
Function GetTens(pTens)
Dim Result As String
Result = ""
If Val(Left(pTens, 1)) = 1 Then
    Select Case Val(pTens)
        Case 10: Result = "Ten"
        Case 11: Result = "Eleven"
        Case 12: Result = "Twelve"
        Case 13: Result = "Thirteen"
        Case 14: Result = "Fourteen"
        Case 15: Result = "Fifteen"
        Case 16: Result = "Sixteen"
        Case 17: Result = "Seventeen"
        Case 18: Result = "Eighteen"
        Case 19: Result = "Nineteen"
        Case Else
    End Select
Else
Select Case Val(Left(pTens, 1))
    Case 2: Result = "Twenty "
    Case 3: Result = "Thirty "
    Case 4: Result = "Forty "
    Case 5: Result = "Fifty "
    Case 6: Result = "Sixty "
    Case 7: Result = "Seventy "
    Case 8: Result = "Eighty "
    Case 9: Result = "Ninety "
    Case Else
End Select
Result = Result & GetDigit(Right(pTens, 1))
End If
GetTens = Result
End Function
Function GetDigit(pDigit)
Select Case Val(pDigit)
    Case 1: GetDigit = "One"
    Case 2: GetDigit = "Two"
    Case 3: GetDigit = "Three"
    Case 4: GetDigit = "Four"
    Case 5: GetDigit = "Five"
    Case 6: GetDigit = "Six"
    Case 7: GetDigit = "Seven"
    Case 8: GetDigit = "Eight"
    Case 9: GetDigit = "Nine"
    Case Else: GetDigit = ""
End Select
End Function
## ```



## Indian Lakhs and Crores.

A Calc Basic Macro was posted [here][4] to convert numbers to words:

{% include copyHeader.html %}
``` vb
REM  *****  BASIC  *****
Option Explicit

Sub Main
  Print getAmountInWords("999999999.99")
End Sub


'********************************************************************************************************
'Function Name      :   getAmountInWords
'Description        :   To convert the Amount value into words(formatted as "000000000.00")
'                       (Maximum allowed limit 999999999.99)
'Input Parameters   :   Amount
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getAmountInWords(strAmount As String) As String
    Dim strIntPart          As String
    Dim strDecPart          As String
    Dim strCroresPart       As String
    Dim strLakhsPart        As String
    Dim strThousandsPart    As String
    Dim strHundredsPart     As String
    Dim strTensPart         As String
    Dim strOnesPart         As String
    Dim strDecTensPart      As String
    Dim strDecOnesPart      As String
    Dim strAmtWords         As String
    Dim dblIntPart          As Double
    Dim intDecPart          As Integer
    Dim strDecWords         As String
    Dim iErr As Integer

    'handle for typemismatch error
    '??Err.Clear
    '??On Error Resume Next
    On Error Goto BadError
    strAmount = CDbl(strAmount)
    '??If Err.Number = "13" Then
    '??    getAmountInWords = ""
    '??    Exit Function
    '??End If
    '??Err.Clear
    strAmount = Format(Trim(strAmount), "000000000.00")

    'if the value is negative,zero above the limit then give error message
    If Val(strAmount) < 0 Then
        getAmountInWords = ""
        Exit Function
    ElseIf Val(strAmount) = 0 Then
        getAmountInWords = "Rupees Zero"
        Exit Function
    ElseIf Val(strAmount) > 999999999.99 Then
        getAmountInWords = ""
        Exit Function
    End If

    'store the integer and decimal parts separately
    strIntPart = Mid(strAmount, 1, 9)
    strDecPart = Mid(strAmount, 11, 2)

    'store the individual places in variables
    strCroresPart = Mid(strIntPart, 1, 2)
    strLakhsPart = Mid(strIntPart, 3, 2)
    strThousandsPart = Mid(strIntPart, 5, 2)
    strHundredsPart = Mid(strIntPart, 7, 1)
    strTensPart = Mid(strIntPart, 8, 1)
    strOnesPart = Mid(strIntPart, 9, 1)
    strDecTensPart = Mid(strDecPart, 1, 1)
    strDecOnesPart = Mid(strDecPart, 2, 1)

    strAmtWords = ""
    'To make the Crores Part
    If Val(strCroresPart) <> 0 Then
        strAmtWords = strAmtWords & getCroresPart(strCroresPart)
    End If

    'To make the Lakhs Part
    If Val(strLakhsPart) <> 0 Then
        strAmtWords = strAmtWords & getLakhsPart(strLakhsPart)
    End If

    'To make the Thousands Part
    If Val(strThousandsPart) <> 0 Then
        strAmtWords = strAmtWords & getThousandsPart(strThousandsPart)
    End If

    'To make the hundreds Part
    If Val(strHundredsPart) <> 0 Then
        strAmtWords = strAmtWords & getOnesColumn(Format(strHundredsPart, "00")) & " Hundred "
    End If

    'To make Tens and Ones part
    If Val(strTensPart & strOnesPart) <> 0 And Val(strAmount) > 100 Then
        strAmtWords = strAmtWords & "and " & getTensOnesPart(strAmount, strTensPart, strOnesPart)
    Else
        strAmtWords = strAmtWords & getTensOnesPart(strAmount, strTensPart, strOnesPart)
    End If

    strDecWords = ""
    'To make Tens and Ones part in the decimal part
    If Val(strDecTensPart & strDecOnesPart) <> 0 Then
        strDecWords = strDecWords & getTensOnesPart(Val(strAmount), strDecTensPart, strDecOnesPart)
    End If

    'If both integer and decimal part are not Zero then add Rupees and Paise only
    If Val(strDecPart) <> 0 And Val(strIntPart) <> 0 Then
        getAmountInWords = "Rupees " & strAmtWords & " and " & strDecWords & " Paise only"
    'If deciaml part is zero then add Rupees and only
    ElseIf Val(strIntPart) <> 0 And Val(strDecPart) = 0 Then
        getAmountInWords = "Rupees " & strAmtWords & " Only"
    'If Integer part is zero then add Paise only
    ElseIf Val(strIntPart) = 0 And Val(strDecPart) <> 0 Then
        getAmountInWords = strDecWords & " Paise Only"
    End If
    '??Replace is not supported in OOo Basic
    '??getAmountInWords = Trim(Replace(getAmountInWords, "  ", " "))
    getAmountInWords = Trim(getAmountInWords, "  ", " ")
    Exit Function
BadError:
   iErr = Err
   If Err = 13 Then
     getAmountInWords = ""
     Exit Function
   Else
     REM OK, do what?
     getAmountInWords = ""
     Print "Did not expect to get here with err " & iErr
   End If
End Function

'********************************************************************************************************
'Function Name      :   getOnesColumn
'Description        :   To convert the number in ones column into words
'Input Parameters   :   String(ones value formated as "00")
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getOnesColumn(strValue As String) As String
    Select Case strValue
        Case "01"
            getOnesColumn = "One"
        Case "02"
            getOnesColumn = "Two"
        Case "03"
            getOnesColumn = "Three"
        Case "04"
            getOnesColumn = "Four"
        Case "05"
            getOnesColumn = "Five"
        Case "06"
            getOnesColumn = "Six"
        Case "07"
            getOnesColumn = "Seven"
        Case "08"
            getOnesColumn = "Eight"
        Case "09"
            getOnesColumn = "Nine"
    End Select
End Function

'********************************************************************************************************
'Function Name      :   getTensColumnWithOne
'Description        :   To convert the number in tens and ones column into words
'                       if the combined(tens+ones) value is between 10 and 19
'Input Parameters   :   String
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getTensColumnWithOne(strValue As String) As String
    Select Case strValue
        Case "10"
            getTensColumnWithOne = "Ten"
        Case "11"
            getTensColumnWithOne = "Eleven"
        Case "12"
            getTensColumnWithOne = "Twelve"
        Case "13"
            getTensColumnWithOne = "Thirteen"
        Case "14"
            getTensColumnWithOne = "Fourteen"
        Case "15"
            getTensColumnWithOne = "Fifteen"
        Case "16"
            getTensColumnWithOne = "Sixteen"
        Case "17"
            getTensColumnWithOne = "Seventeen"
        Case "18"
            getTensColumnWithOne = "Eighteen"
        Case "19"
            getTensColumnWithOne = "Nineteen"
    End Select
End Function

'********************************************************************************************************
'Function Name      :   getTensColumn
'Description        :   To convert the number in tens column into words
'                       if the combined(tens+ones) value is between 20 and 99
'Input Parameters   :   String
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getTensColumn(strValue As String) As String
    Select Case strValue
        Case "2"
            getTensColumn = "Twenty"
        Case "3"
            getTensColumn = "Thirty"
        Case "4"
            getTensColumn = "Forty"
        Case "5"
            getTensColumn = "Fifty"
        Case "6"
            getTensColumn = "Sixty"
        Case "7"
            getTensColumn = "Seventy"
        Case "8"
            getTensColumn = "Eighty"
        Case "9"
            getTensColumn = "Ninety"
    End Select
End Function

'********************************************************************************************************
'Function Name      :   getCroresPart
'Description        :   To convert the crore part into words
'Input Parameters   :   String(crore value)
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getCroresPart(strCrore As String) As String
    If Val(strCrore) < 10 Then
        If Val(strCrore) = 1 Then
            getCroresPart = getOnesColumn(strCrore) & " Crore "
        Else
            getCroresPart = getOnesColumn(strCrore) & " Crores "
        End If
    ElseIf Val(strCrore) < 20 Then
        getCroresPart = getCroresPart & getTensColumnWithOne(strCrore) & " Crores "
    Else
        getCroresPart = getCroresPart & getTensColumn(Mid(strCrore, 1, 1))
        If Mid(strCrore, 2, 1) <> "0" Then
            getCroresPart = getCroresPart & " " & _
                            getOnesColumn(Format(Mid(strCrore, 2, 1), "00"))
        End If
        getCroresPart = getCroresPart & " Crores "
    End If
End Function

'********************************************************************************************************
'Function Name      :   getLakhsPart
'Description        :   To convert the lakh part into words
'Input Parameters   :   String(Lakh value)
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getLakhsPart(strLakh As String) As String
    If Val(strLakh) < 10 Then
        If Val(strLakh) = 1 Then
            getLakhsPart = getLakhsPart & getOnesColumn(strLakh) & " Lakh "
        Else
            getLakhsPart = getLakhsPart & getOnesColumn(strLakh) & " Lakhs "
        End If
    ElseIf Val(strLakh) < 20 Then
        getLakhsPart = getLakhsPart & getTensColumnWithOne(strLakh) & " Lakhs "
    Else
        getLakhsPart = getLakhsPart & getTensColumn(Mid(strLakh, 1, 1))
        If Mid(strLakh, 2, 1) <> "0" Then
            getLakhsPart = getLakhsPart & " " & _
                            getOnesColumn(Format(Mid(strLakh, 2, 1), "00"))
        End If
        getLakhsPart = getLakhsPart & " Lakhs "
    End If
End Function

'********************************************************************************************************
'Function Name      :   getThousandsPart
'Description        :   To convert the thousand part into words
'Input Parameters   :   String(thousand value)
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getThousandsPart(strThousand As String) As String
    If Val(strThousand) < 10 Then
        getThousandsPart = getThousandsPart & getOnesColumn(strThousand) & " Thousand "
    ElseIf Val(strThousand) < 20 Then
        getThousandsPart = getThousandsPart & getTensColumnWithOne(strThousand) & " Thousand "
    Else
        getThousandsPart = getThousandsPart & getTensColumn(Mid(strThousand, 1, 1))
        If Mid(strThousand, 2, 1) <> "0" Then
            getThousandsPart = getThousandsPart & " " & _
                            getOnesColumn(Format(Mid(strThousand, 2, 1), "00"))
        End If
        getThousandsPart = getThousandsPart & " Thousand "
    End If
End Function

'********************************************************************************************************
'Function Name      :   getTensOnesPart
'Description        :   To convert the tens and ones part into words
'Input Parameters   :   actual total amount,tens value,ones value
'Returns            :   String
'Creat by           :   Sanjeev Meher on 9th Feb 2013
'Specific Logic used:   None
'********************************************************************************************************
Public Function getTensOnesPart(strAmount As String, strTensPart As String, strOnesPart As String) As String
    If Val(strTensPart & strOnesPart) < 10 Then
        getTensOnesPart = getTensOnesPart & getOnesColumn(strTensPart & strOnesPart)
    ElseIf Val(strTensPart & strOnesPart) < 20 Then
        getTensOnesPart = getTensOnesPart & getTensColumnWithOne(strTensPart & strOnesPart)
    Else
        getTensOnesPart = getTensOnesPart & getTensColumn(strTensPart)
        If Mid(strOnesPart, 2, 1) <> "0" Then
            getTensOnesPart = getTensOnesPart & " " & getOnesColumn(Format(strOnesPart, "00"))
        End If
    End If
End Function
```

This macro's currency units are in " Lakhs " and " Crores ". You can modify the code to your needs.


  [1]: https://wiki.documentfoundation.org/Macros
  [2]: https://forum.openoffice.org/en/forum/viewtopic.php?f=45&t=83329
  [3]: https://www.extendoffice.com/documents/excel/1142-excel-spell-out-numbers.html
  [4]: https://ask.libreoffice.org/en/question/1194/convert-numbers-to-english-words/
