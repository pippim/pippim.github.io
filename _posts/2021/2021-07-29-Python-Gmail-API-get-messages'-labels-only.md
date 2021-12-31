---
layout:       post
title:        Python Gmail API get messages' labels only
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68582674
type:         Answer
tags:         python gmail-api
created_date: 2021-07-29 20:54:08
edit_date:    2021-07-29 21:33:43
votes:        1
favorites:    
views:        77
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    true
---

I changed my original batching function by adding `hdr_fmt` = `'metadadta'` (original format) or `'partial'` (new format)  and `mode` = `'add'` (original function) or `'change'` (new function).

Below is new code which you are unlikely to use as-is but can adapt to fit your infrastructure:



``` 
def get_all_messages(self, hdr_fmt='metadata', mode='add'):
    """
        Get messages in batches of 100.
    """

```

``` 
    CommonSelf.__init__(self)           # Reset counters to zero

```

``` 
    # messages.list API
    message_list_api = self.gmail_sdk.users().messages()
    # first request
    message_list_req = message_list_api.list(**self.msg_list_params)

```

``` 
    self.finished_reading = False

```

``` 
    while message_list_req is not None:
        gmail_msg_list = message_list_req.execute()

```

``` 
        # we build the batch request
        if mode == 'add':
            # Adding so stop when message found in SQL
            batch = self.gmail_sdk.new_batch_http_request(
                callback=self.process_message)
        else:
            # Updating so check all messages and compare to SQL
            batch = self.gmail_sdk.new_batch_http_request(
                callback=self.process_update_labels)

```

``` 
        if self.finished_reading:
            # SQL signaled to stop processing
            return

```

``` 
        for gmail_message in gmail_msg_list['messages']:
            msg_get_params = {
                'userId': self.userId,
                'id': gmail_message['id'],
                # format 'minimal':  internalDate, historyId, snippet,
                #                    sizeEstimate, threadId, labelIds
                # format 'metadata': See full list below in comments
                'format': hdr_fmt,
            }
            batch.add(self.gmail_sdk.users().messages().
                      get(**msg_get_params), request_id=gmail_message['id'])

```

``` 
        batch.execute(http=self.http)
        # pagination handling
        message_list_req = message_list_api.list_next(message_list_req,
                                                      gmail_msg_list)
    self.close()

```


``` 
# noinspection SpellCheckingInspection
# noinspection SpellCheckingInspection
'''

```

``` 
SAMPLE RECORD (REFORMATTED):
============================

```

{% include copyHeader.html %}
``` 
{u'internalDate': u'1541947153000', 
u'historyId': u'1517343', 
u'payload': 
    {u'mimeType': u'multipart/mixed',
     u'headers': [
        {u'name': u'Return-Path', u'value': u'<me@gmail.com>'}, 
        {u'name': u'Received', u'value': u'from alien (node-ISP. [IPv6.Address])
         by smtp.gmail.com with ESMTPSA id x184-v6sm1211487pfx.42.2018.11.11.06.39.15
         for <me@gmail.com> (version=TLS1_2 cipher=ECDHE-RSA-AES128-GCM-SHA256 bits=128/128);
         Sun, 11 Nov 2018 06:39:35 -0800 (PST)'}, 
        {u'name': u'Message-ID', u'value': u'<5be83f27.1c69fb81.4f2bc.2906@mx.google.com>'}, 
        {u'name': u'From', u'value': u'root <me@gmail.com>'}, 
        {u'name': u'X-Google-Original-From', u'value': u'"root" <root@gmail.com>'}, 
        {u'name': u'Received', u'value': u'by alien (sSMTP sendmail emulation); Sun, 11 Nov 2018 07:39:13 -0700'}, 
        {u'name': u'Date', u'value': u'Sun, 11 Nov 2018 07:39:13 -0700'}, 
        {u'name': u'to', u'value': u'me@gmail.com'}, 
        {u'name': u'Subject', u'value': u'Daily-alien-Ubuntu-16.04-Backup-2018-11-11-Sunday.tar.gz.64'}
        ]
    }, 
u'snippet': u'', 
u'sizeEstimate': 18340047, 
u'threadId': u'1670336bc9ac099d', 
u'labelIds': [u'IMPORTANT', u'SENT', u'Label_12'], 
u'id': u'1670336bc9ac099d'
}
'''
# inspection SpellCheckingInspection

```
