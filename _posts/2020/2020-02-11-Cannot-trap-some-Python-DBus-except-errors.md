---
layout:       post
title:        >
    Cannot trap some Python DBus except errors
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/566868
type:         Question
tags:         gnome python d-bus
created_date: 2020-02-11 01:16:22
edit_date:    
votes:        "0 "
favorites:    
views:        "1,116 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-02-11-Cannot-trap-some-Python-DBus-except-errors.md
toc:          false
navigation:   false
clipboard:    false
---

I'm getting this error in Python which is non-fatal and I'm presuming is written to `stderr`:

> ERROR:dbus.proxies:Introspect error on :1.4:/org/freedesktop/thermald:  
> dbus.exceptions.DBusException:  
> org.freedesktop.DBus.Error.AccessDenied: Rejected send message, 2  
> matched rules; type="method_call", sender=":1.974" (uid=1000 pid=20020  
> comm="/usr/bin/python ./mmm ")  
> interface="org.freedesktop.DBus.Introspectable" member="Introspect"  
> error name="(unset)" requested_reply="0" destination=":1.4" (uid=0  
> pid=1309 comm="/usr/sbin/thermald --no-daemon --dbus-enable ")  

Sorry for unorthodox "quote" instead of `code` block. I wanted to save scrolling 8 miles to the right.

I can trap the error with:

``` 
    except dbus.exceptions.DBusException as err:
        # Same as dbus.DBusException
        print('\ndbus.exceptions.DBusException:', service)
        print(err.message+'\n')
        return False
    except dbus.DBusException as err:
        # Same as dbus.exceptions.DBusException
        print('\ndbus.DBusException:', service)
        print(err.message+'\n')
        return False
```

However it just generates my except which is **MOST** of the previous error message. But it doesn't suppress the previous error message which normally happens???

``` 
dbus.exceptions.DBusException: org.freedesktop.thermald
Rejected send message, 2 matched rules; type="method_call", sender=":1.974" (uid=1000 pid=20020 comm="/usr/bin/python ./mmm ") interface="org.freedesktop.DBus.Introspectable" member="Introspect" error name="(unset)" requested_reply="0" destination=":1.4" (uid=0 pid=1309 comm="/usr/sbin/thermald --no-daemon --dbus-enable ")
```

Altogether I'm getting 4 System Service DBus "Access Denied" errors abbreviated below:

``` 
ERROR:dbus.proxies:Introspect error on :1.19:/fi/epitest/hostap/WPASupplicant:
ERROR:dbus.proxies:Introspect error on :1.19:/fi/w1/wpa_supplicant1:
ERROR:dbus.proxies:Introspect error on :1.20:/org/freedesktop/NetworkManager/dnsmasq:
ERROR:dbus.proxies:Introspect error on :1.4:/org/freedesktop/thermald:
```

These all seem to be common Ubuntu errors (I'm on 16.04.6 LTS, kernel 4.14.170, Gnome 3.18). I have no desire to fix the errors. For my project I have no need to inspect these DBus services. I just want to suppress the error messages.

FWIW I"m also getting two Session Service DBUS errors that I **can** successfully trap:

``` 

==============   Session services   ================

Object path: '/org/freedesktop/network-manager-applet' contains invalid character '-'
Object path: '/org/nautilus-actions/DBus' contains invalid character '-'
```

I think from this [post][1] they might have to be escaped, eg `\-`. What the errors really mean and how to fix them would be nice too.

FWIW again here is my code:

``` 
    def refresh_listdata(self, listdata):

        import json

        # If we delete list and append nothing appears (garbage collecctor).
        # listdata = []

        listdata *= 0   # https://stackoverflow.com/a/44349418/6929343

        bus = dbus.SystemBus()
        print ('\n=============   System services   =================\n')

        for service in dbus.SystemBus().list_names():
            # Skip over ":1.20", ":1.65", etc.
            if not service.startswith(":") :
                # print(service)
                object_path=service.replace(".", "/")
                object_path = "/" + object_path
                dictionary = self.rec_intro(bus, service, object_path)
                # print(dictionary)
                if dictionary != False :
                    listdata.append(dictionary)

        bus = dbus.SessionBus()
        print ('\n==============   Session services   ================\n')

        for service in dbus.SessionBus().list_names():
            if not service.startswith(":") :
                # print(service)
                object_path=service.replace(".", "/")
                object_path = "/" + object_path
                dictionary = self.rec_intro(bus, service, object_path)
                # print(dictionary)
                if dictionary != False :
                    listdata.append(dictionary)

#        print ("\nlistdata[0]\n", listdata[0])
#        print(json.dumps(listdata[0], indent=4, sort_keys=True))

    def rec_intro(self, bus, service, object_path, 
                       paths=None, serviceDict=None):

        from xml.etree import ElementTree

        #print(object_path)
        if paths == None:
            paths = {}
        paths[object_path] = {}

        if "-" in object_path :
            print ("Object path: '" + object_path + \
            "' contains invalid character '-'")
            return False

        try:
            obj = bus.get_object(service, object_path)
        except:
            print('Cannot get object: ', service, object_path)
            return False

        try:
            iface = dbus.Interface(obj, 'org.freedesktop.DBus.Introspectable')
        except:
            print('Interface error:', obj)
            return False

        try:
            xml_string = iface.Introspect()
#        except DBusException as err:
#            # NOT DEFINED!
#            print('\nDBusException:', service)
#            print(err.message+'\n')
#            return False
        except dbus.proxies as err:
            print('\ndbus.proxies:Introspect error:', service)
            print(err.message+'\n')
            return False
#        except org.freedesktop.DBus.Error.AccessDenied as err:
#            # NOT DEFINED!
#            print('\norg.freedesktop.DBus.Error.AccessDenied:', service)
#            print(err.message)
#            return False
        except dbus.exceptions.DBusException as err:
            # Same as dbus.DBusException
            print('\ndbus.exceptions.DBusException:', service)
            print(err.message+'\n')
            return False
        except dbus.DBusException as err:
            # Same as dbus.exceptions.DBusException
            print('\ndbus.DBusException:', service)
            print(err.message+'\n')
            return False
        except:
            print('No permissions to:', bus, service, object_path)
            return False

        for child in ElementTree.fromstring(xml_string):
            if child.tag == 'node':
                if object_path == '/':
                    object_path = ''
                new_path = '/'.join((object_path,
                                     child.attrib['name']))
                self.rec_intro(bus, service, new_path)
            else:
                if object_path == "":
                    object_path = "/"
                functiondict = {}
                paths[object_path][child.attrib["name"]] = functiondict
                for func in child.getchildren():
                    if func.tag not in functiondict.keys():
                        functiondict[func.tag] = []
                    functiondict[func.tag].append(func.attrib["name"])

        if serviceDict == None:
            serviceDict = {}
        serviceDict[service] = paths
        return serviceDict

``` 


  [1]: https://dbus.freedesktop.org/doc/dbus-specification.html
