---
layout:       post
title:        >
    Firefox hangs because sort-directories-first setting missing
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/821901
type:         Answer
tags:         gnome xubuntu firefox gsettings
created_date: !!str "2016-09-07 01:02:36"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "2,039"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

Just a little background:

**glib-compile-schemas** compiles all the GSettings XML schema files in `DIRECTORY` into a binary file with the name `gschemas.compiled` that can be used by GSettings. The XML schema files must have the filename extension `.gschema.xml`. For a detailed description of the XML file format, see the GSettings documentation.

At runtime, GSettings looks for schemas in the `glib-2.0/schemas` subdirectories of all directories specified in the `XDG_DATA_DIRS` environment variable. The usual location to install schema files is `/usr/share/glib-2.0/schemas`.

In addition to schema files, glib-compile-schemas reads 'vendor override' files, which are key files that can override default values for keys in the schemas. The group names in the key files are the schema id, and the values are written in serialized GVariant form. Vendor override files must have the filename extension `.gschema.override`.

By convention, vendor override files begin with `nn_` where `nn` is a number from 00 to 99. Higher numbered files have higher priority (eg: if the same override is made in a file numbered 10 and then again in a file numbered 20, the override from 20 will take precedence).

If I'm reading your setup correctly you have your `.xml` files in:

``` 
/usr/share/glib/schemas

```

and not in:

``` 
/usr/share/glib-2.0/schemas

```

where they are expected to be.

If I read it wrong please let me know and I'll delete this answer.  I don't use FireFox so could not test the answer like I usually to do.

