---
layout:       post
title:        Tkinter text box font size
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/53678471
type:         Question
tags:         python tkinter
created_date: 2018-12-08 00:41:57
edit_date:    2020-06-20 09:12:55
votes:        1
favorites:    
views:        3,376
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    true
---

I'm brand new to Python and Tkinter. I've googled to figure out how to change Input Text Box font size but am at a loss. I found out how to increase global font size and it works:

[![calc text box.png][1]][1]

Can tell me the magic spell for increasing font size of text box?

### Edit: script updated from comments and answers December 8/2018:

Here is the Python script:

<!-- Language-all: lang-python -->

{% include copyHeader.html %}
``` 
#-*-coding: utf-8-*-
# NAME: calc.py
# CALL: python calc.py
# DATE: December 8, 2018
# DESC: Calculator in E-Exa, P-Peta, T-Tetra, G-Giga, M-Mega and K-Kilo
# NOTE: Requires Tkinter GUI libraries: sudo apt install python-tk

# Majority Credit to: https://www.techinfected.net/2016/02/make-gui-calculator-in-python-windows-linux.html
from Tkinter import *
import tkFont
import math

class calc:
 def getandreplace(self):
  """replace x with * and ÷ with /"""
  
  self.expression = self.e.get()
  self.newtext=self.expression.replace(self.newdiv,'/')
  self.newtext=self.newtext.replace('x','*')
  self.newtext=self.newtext.replace(' ','')
  self.newtext=self.newtext.upper()
  self.newtext=self.newtext.replace('K','000')
  self.newtext=self.newtext.replace('M','000000')
  self.newtext=self.newtext.replace('G','000000000')
  self.newtext=self.newtext.replace('T','000000000000')
  self.newtext=self.newtext.replace('P','000000000000000')
  self.newtext=self.newtext.replace('E','000000000000000000')

 def equals(self):
  """when the equal button is pressed"""

  self.getandreplace()
  try: 
   self.value= eval(self.newtext) #evaluate the expression using the eval function
  except SyntaxError or NameErrror:
   self.e.delete(0,END)
   self.e.insert(0,'Invalid Input!')
  else:
   self.e.delete(0,END)
   self.value= self.convert()  # Give result in K, M, G, T, P or E
   self.e.insert(0,self.value)

 def convert(self):
    #2**10 = 1024
    power = 1000
    size=self.value
    n = 0
    Dic_powerN = {0: '', 1: 'K', 2: 'M', 3: 'G', 4: 'T', 5: 'P', 6: 'E'}
    while size > power:
        size /=  power
        n += 1
    return size, Dic_powerN[n]
 
 def squareroot(self):
  """squareroot method"""
  
  self.getandreplace()
  try: 
   self.value= eval(self.newtext) #evaluate the expression using the eval function
  except SyntaxError or NameErrror:
   self.e.delete(0,END)
   self.e.insert(0,'Invalid Input!')
  else:
   self.sqrtval=math.sqrt(self.value)
   self.e.delete(0,END)
   self.e.insert(0,self.sqrtval)

 def square(self):
  """square method"""
  
  self.getandreplace()
  try: 
   self.value= eval(self.newtext) #evaluate the expression using the eval function
  except SyntaxError or NameErrror:
   self.e.delete(0,END)
   self.e.insert(0,'Invalid Input!')
  else:
   self.sqval=math.pow(self.value,2)
   self.e.delete(0,END)
   self.e.insert(0,self.sqval)
 
 def clearall(self): 
  """when clear button is pressed,clears the text input area"""
  self.e.delete(0,END)
 
 def clear1(self):
  self.txt=self.e.get()[:-1]
  self.e.delete(0,END)
  self.e.insert(0,self.txt)

 def action(self,argi): 
  """pressed button's value is inserted into the end of the text area"""
  self.e.insert(END,argi)
 
 def __init__(self,master):
  """Constructor method"""
  master.title('Calculator') 
  master.geometry()
  font = "Calibri 13"
  self.e = Entry(master, font = "Calibri 13")
#  self.e = Entry(master)
  self.e.grid(row=0,column=0,columnspan=6,pady=3)
  self.e.focus_set() #Sets focus on the input text area
    
  self.div='÷'
  self.newdiv=self.div.decode('utf-8')

  #Generating Buttons
#  Button(master,text="=",width=10,command=lambda:self.equals()).grid(row=4, column=4,columnspan=2)
  Button(master,text="=",width=8,command=lambda:self.equals()).grid(row=4, column=4,columnspan=2)
  Button(master,text='AC',width=3,command=lambda:self.clearall()).grid(row=1, column=4)
  Button(master,text='C',width=3,command=lambda:self.clear1()).grid(row=1, column=5)
  Button(master,text="+",width=3,command=lambda:self.action('+')).grid(row=4, column=3)
  Button(master,text="x",width=3,command=lambda:self.action('x')).grid(row=2, column=3)
  Button(master,text="-",width=3,command=lambda:self.action('-')).grid(row=3, column=3)
  Button(master,text="÷",width=3,command=lambda:self.action(self.newdiv)).grid(row=1, column=3) 
  Button(master,text="%",width=3,command=lambda:self.action('%')).grid(row=4, column=2)
  Button(master,text="7",width=3,command=lambda:self.action('7')).grid(row=1, column=0)
  Button(master,text="8",width=3,command=lambda:self.action(8)).grid(row=1, column=1)
  Button(master,text="9",width=3,command=lambda:self.action(9)).grid(row=1, column=2)
  Button(master,text="4",width=3,command=lambda:self.action(4)).grid(row=2, column=0)
  Button(master,text="5",width=3,command=lambda:self.action(5)).grid(row=2, column=1)
  Button(master,text="6",width=3,command=lambda:self.action(6)).grid(row=2, column=2)
  Button(master,text="1",width=3,command=lambda:self.action(1)).grid(row=3, column=0)
  Button(master,text="2",width=3,command=lambda:self.action(2)).grid(row=3, column=1)
  Button(master,text="3",width=3,command=lambda:self.action(3)).grid(row=3, column=2)
  Button(master,text="0",width=3,command=lambda:self.action(0)).grid(row=4, column=0)
  Button(master,text=".",width=3,command=lambda:self.action('.')).grid(row=4, column=1)
  Button(master,text="(",width=3,command=lambda:self.action('(')).grid(row=2, column=4)
  Button(master,text=")",width=3,command=lambda:self.action(')')).grid(row=2, column=5)
  Button(master,text="√",width=3,command=lambda:self.squareroot()).grid(row=3, column=4)
  Button(master,text="x²",width=3,command=lambda:self.square()).grid(row=3, column=5)
  Button(master,text="E",width=3,command=lambda:self.action('E')).grid(row=5, column=0)
  Button(master,text="P",width=3,command=lambda:self.action('P')).grid(row=5, column=1)
  Button(master,text="T",width=3,command=lambda:self.action('T')).grid(row=5, column=2)
  Button(master,text="G",width=3,command=lambda:self.action('G')).grid(row=5, column=3)
  Button(master,text="M",width=3,command=lambda:self.action('M')).grid(row=5, column=4)
  Button(master,text="K",width=3,command=lambda:self.action('K')).grid(row=5, column=5)
#Main
root = Tk()
# Larger font for HDPI screen
default_font = tkFont.nametofont("TkDefaultFont")
default_font.configure(size=11)
obj=calc(root) #object instantiated
root.mainloop()

```

Changing the overall font size works for most elements with:

``` 
default_font = tkFont.nametofont("TkDefaultFont")
default_font.configure(size=11)

```

But it has no effect on the input text field.

  [1]: https://i.stack.imgur.com/WI9kfm.png
