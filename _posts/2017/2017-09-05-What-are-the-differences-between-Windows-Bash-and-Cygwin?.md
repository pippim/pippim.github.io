---
layout:       post
title:        >
    What are the differences between Windows Bash and Cygwin?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/953152
type:         Answer
tags:         windows-subsystem-for-linux
created_date: 2017-09-05 23:29:44
edit_date:    2020-06-12 14:37:07
votes:        "19 "
favorites:    
views:        "48,650 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

# Windows Subsystem for Linux

I've been using WSL under Windows 10 for about a few months. Finally I can boot into Windows for gaming and still access the bash prompt and run CLI and many GUI programs. There are limitations such as none of the familiar Linux kernel virtual directories. Planning is required to share the same Bash script between Ubuntu and WSL on a dual boot machine.

There are lots of things I'd like to see improved, but I can live with it as is for a year or so.

## Closed source

One thing to remember is Microsoft is a closed system, and you don't get the flurry of third parties writing updates like you enjoy on Linux. But all things considered you buy a new laptop and it comes with Windows 10 anyway so you could say it's "free" at least :)

Cygwin is controlled by Red Hat Linux which is not exactly known for giving things away for free either. Their "free" Linux distribution [Fedora][1] seems like a ["testing ground"][2] to some.

## Maintenance cycles

Cygwin has 15 years of updates. Notable is the same project manager has been in place since 2003. There are lots of full time maintainers and many more volunteer contributors.

WSL provides major updates twice a year every spring and fall. Weekly minor updates are available to those on the Developers subscription list. Although Microsoft has resources to throw thousands of people into WSL development it appears you can count the [team members][3] with your fingers.

## Speed issues

You'll see many complaints about WSL speed. For example, screen painting takes many times longer in Windows 10 versus Ubuntu 16.04, i.e. you can actually see the cursor move in Windows 10:

[![WSL bash startup.gif][4]][4]

It takes about 5 seconds for the WSL Bash splash screen to paint. By comparison it is about 1 1/2 seconds for the same splash screen in Ubuntu 16.04:

[![Ubuntu terminal splash.gif][5]][5]

Cygwin has its own share of [speed complaints with Bash][6].

----------

## Original posting below for historical reference.

With Windows 10 Home, **if** it's 32 bit Windows, it means it won't run the 64-bit Ubuntu / Windows Subsystem as Microsoft tells us here: ([windows Linux subsystem in win10 HOME BASIC][7]).

It's like a dream come true running Ubuntu on Windows with its superior gaming support for Nvidia, but before you run out and buy a new (or used) laptop, make sure it has Windows 10 64 bit and not the 32-bit home version if you want to run Ubuntu / Linux stuff natively under Windows. On Microsoft websites they actually refer to the Windows Anniversary edition as a prerequisite to running Windows Subsystem for Linux.

----------

However if you don't want to shell out $200+ for Windows 10 and you have an older laptop running Windows 8.1 64-bit like I do, and you have an even older laptop running Windows Vista 64 bit like I do, then Cygwin is the answer.

Cygwin supports more versions of Windows [as their website lists][8]:

> Cygwin can be expected to run on all modern, released versions of  
> Windows. State January 2016 this includes Windows Vista, Windows  
> Server 2008 and all later versions of Windows up to Windows 10 and  
> Windows Server 2016. The 32 bit version of Cygwin also runs in the  
> WOW64 32 bit environment on released 64 bit versions of Windows, the  
> 64 bit version of course only on 64 bit Windows.  
>  
> Keep in mind that Cygwin can only do as much as the underlying OS  
> supports. Because of this, Cygwin will behave differently, and exhibit  
> different limitations, on the various versions of Windows.  

  [1]: http://en.wikipedia.org/wiki/Fedora_%28operating_system%29
  [2]: http://www.tuxmachines.org/node/106669
  [3]: https://blogs.msdn.microsoft.com/commandline/2017/10/12/wsl-console-team-changes/
  [4]: https://i.stack.imgur.com/09Ycq.gif
  [5]: https://i.stack.imgur.com/pH9F1.gif
  [6]: https://stackoverflow.com/questions/2512892/how-to-speed-up-cygwin?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  [7]: https://answers.microsoft.com/en-us/windows/forum/windows_10-other_settings/can-we-get-windows-linux-subsystem-in-win10-home/ba93f9ac-25de-4dc6-9652-c63b3a26e0a8?auth=1
  [8]: https://cygwin.com/faq/faq.html#faq.what.supported
