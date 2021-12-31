---
layout:       post
title:        >
    PIL Issue, OSError: cannot open resource
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63200562
type:         Answer
tags:         image python-3.x fonts python-imaging-library
created_date: !!str "2020-08-01 00:17:46"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "43,286"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

For Linux I used:

<!-- Language-all: lang-python -->

``` 
$ locate .ttf

/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-B.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-BI.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-C.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-L.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-LI.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-M.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-MI.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-R.ttf
/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-RI.ttf
/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-B.ttf
/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-BI.ttf
/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-R.ttf
/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-RI.ttf
```
It actually returned A LOT MORE than that!

Then I took the python code posted here in Stack Overflow:

- [PIL: Generating Vertical Gradient Image](https://stackoverflow.com/a/32532502/6929343)

Plugged in the font name "Ubuntu-R.ttf" returned by `locate`:

``` 
color_palette = [BLUE, GREEN, RED]
image_w=200
image_h=200
region = Rect(0, 0, image_w, image_h)
imgx, imgy = region.max.x+1, region.max.y+1
image = Image.new("RGB", (imgx, imgy), WHITE)
draw = ImageDraw.Draw(image)
vert_gradient(draw, region, gradient_color, color_palette)
#image.text((40, 80),"No Artwork",(255,255,255))
#font = ImageFont.truetype(r'C:\Users\System-Pc\Desktop\arial.ttf', 40)
#font = ImageFont.load_default()
font = ImageFont.truetype("Ubuntu-R.ttf", int(float(image_w) / 6))
draw.text((int(image_w/12), int(image_h / 2.5)), "No Artwork", \
           fill=(0,0,0), font=font)
image.show()
```

And voila! I now have an image to display when there is no image to display in a music file I'm playing:

[![No Artwork.png][1]][1]


  [1]: https://i.stack.imgur.com/EJuLW.png
