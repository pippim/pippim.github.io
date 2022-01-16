---
layout:       post
title:        >
    Finding countdown timer in Grub 2.02 source code
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/52138789
type:         Answer
tags:         c assembly grub
created_date: 2018-09-02 16:10:28
edit_date:    2020-06-20 09:12:55
votes:        "2 "
favorites:    
views:        "937 "
accepted:     
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-02-Finding-countdown-timer-in-Grub-2.02-source-code.md
toc:          false
navigation:   false
clipboard:    false
---

Thanks to the help of the accepted answer I was able to achieve the goal using a different method. After successful Grub 2.02 source code change and recompile, `/etc/default/grub` was changed to a 3.5 second countdown with `GRUB_TIMEOUT=35`.

Notice how the circular progress is now smooth with no "chunks":

[![New Grub Boot][3]][3]


----------


The code to change in:

``` 
/grub-2.02/grub-core/normal/menu.c
```

Line 546:

``` 
/* Check whether a second has elapsed since the last tick.  If so, adjust
   the timer and return 1; otherwise, return 0.  */
static int
has_second_elapsed (grub_uint64_t *saved_time)
{
  grub_uint64_t current_time;

  current_time = grub_get_time_ms ();
  /* July 14, 2018 Use deciseconds - change 1000 to 100 */
  if (current_time - *saved_time >= 100)
    {
      *saved_time = current_time;
      return 1;
    }
  else
    return 0;
}
```

Change the line:

``` 
if (current_time - *saved_time >= 1000)
```

to:

``` 
if (current_time - *saved_time >= 100)
```

## **Voila!** one line of code to change. Plus two comment lines added for good measure.


## How to compile `grub 2.02`

Before following instructions on Grub's [website][1]:

``` 
sudo apt install bison
sudo apt install flex
```

Then follow grub's website instructions:

``` 
cd grub-2.02
./configure
```

Run next command on Grub's website:

``` 
make install
```

Files are created in `/usr/local/bin` (surprise!!!) along with `.../grub-2.02` directory which is to be expected.


----------

## Miscellaneous problems compiling grub

I ended up cloning source to VM (Lubuntu 16.04) and recompiling there. Using the newly compiled `grub-install` mucked things up and I had to use `sudo apt install grub2` to get fresh install. Then manually copying newly compiled files to `/boot/grub/i386-pc`

My terminal-box got all skewed up so I'll have to create a new grub background image. In the image below I changed `GRUB_TIMEOUT=35` for 3.5 second countdown.

----------

## July 16, 2018 update

Figured out to one parameter to use in order to get X86, EFI support:

``` 
./configure –with-platform=efi

*******************************************************
GRUB2 will be compiled with following components:
Platform: x86_64-efi
With devmapper support: No (need libdevmapper header)
With memory debugging: No
With disk cache statistics: No
With boot time statistics: No
efiemu runtime: No (not available on efi)
grub-mkfont: No (need freetype2 library)
grub-mount: No (need FUSE library)
starfield theme: No (No build-time grub-mkfont)
With libzfs support: No (need zfs library)
Build-time grub-mkfont: No (need freetype2 library)
Without unifont (no build-time grub-mkfont)
Without liblzma (no support for XZ-compressed mips images) (need lzma library)
*******************************************************
```

However, after `make install` there is an error:

``` 
Making install in grub-core
make[2]: Entering directory '/home/rick/src/grub-2.02/grub-core'
gcc -E -DHAVE_CONFIG_H  -Wall -W  -DGRUB_MACHINE_EFI=1 -DGRUB_MACHINE=X86_64_EFI -m64 -nostdinc -isystem /usr/lib/gcc/x86_64-linux-gnu/5/include -I../include -I../include -DGRUB_FILE=\"symlist.h\" -I. -I. -I.. -I.. -I../include -I../include -I../grub-core/lib/libgcrypt-grub/src/   -DGRUB_KERNEL=1 -D_FILE_OFFSET_BITS=64 -DGRUB_SYMBOL_GENERATOR=1 symlist.h > symlist.p || (rm -f symlist.p; exit 1)
symlist.h:25:44: fatal error: ../include/grub/machine/kernel.h: No such file or directory
compilation terminated.
Makefile:42544: recipe for target 'symlist.c' failed
make[2]: *** [symlist.c] Error 1
make[2]: Leaving directory '/home/rick/src/grub-2.02/grub-core'
Makefile:10904: recipe for target 'install-recursive' failed
make[1]: *** [install-recursive] Error 1
make[1]: Leaving directory '/home/rick/src/grub-2.02'
Makefile:11927: recipe for target 'install' failed
make: *** [install] Error 2
```

I filed a bug report with Grub folks (July 2018) but haven't heard a thing back. The next step for EFI system is to download the source code on fresh install using Ubuntu's repositories instead of Grub's website instructions.

----------


  [1]: https://www.gnu.org/software/grub/manual/grub/html_node/Obtaining-and-Building-GRUB.html
  [3]: https://i.stack.imgur.com/poUX0.gif
