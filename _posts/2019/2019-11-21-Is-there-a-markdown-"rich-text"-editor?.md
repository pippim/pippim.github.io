---
layout:       post
title:        Is there a markdown "rich text" editor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1190570
type:         Answer
tags:         libreoffice automation text-editor github markdown
created_date: 2019-11-21 11:50:10
edit_date:    2019-11-23 17:18:31
votes:        3
favorites:    
views:        7,060
accepted:     
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

## You can still use LO Writer with `pandoc`

Because LibreOffice supports MS Word `.doc` files, this popular answer from Stack Exchange might work for you:

- [How can doc/docx files be converted to markdown or structured text?][1]

> Pandoc supports conversion from docx to markdown directly:  
>   
>     pandoc -f docx -t markdown foo.docx -o foo.markdown  
>   
> Several markdown formats are supported:  
>   
>     -t gfm (GitHub-Flavored Markdown)  
>     -t markdown_mmd (MultiMarkdown)  
>     -t markdown (pandoc’s extended Markdown)  
>     -t markdown_strict (original unextended Markdown)  
>     -t markdown_phpextra (PHP Markdown Extra)  
>     -t commonmark (CommonMark Markdown)  

It also supports LibreOffice native `.odt` format as illustrated in these [30 examples][2].

## DOCX style sheets are supported better than ODT style sheets

As a github reference page notes in: [Defining custom DOCX styles in LibreOffice (and Word)][3]

> In case you wonder LibreOffice handles DOCX documents very well, and  
> Pandoc works well with a reference docx file which has been  
> modified in LibreOffice.  This is good because as of Pandoc 1.19.2.1  
> DOCX support is superior to ODT support in Pandoc, notably including  
> the custom-style attribute feature which doesn't work for ODT.  

Visit this github page for all kinds of great tips using pandoc.

## Try it online before installing

You can try the [pandoc online conversion tool][4] before installing locally. 


  [1]: https://stackoverflow.com/a/33149947/6929343
  [2]: https://pandoc.org/demos.html
  [3]: https://github.com/jgm/pandoc/wiki/Defining-custom-DOCX-styles-in-LibreOffice-(and-Word)
  [4]: https://pandoc.org/try/
