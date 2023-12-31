---
layout:       post
title:        >
    Enable automatic deletion of old, unanswered, zero-score questions after a year?
site:         Meta Stack Exchange
stack_url:    https://meta.stackexchange.com/q/299066
type:         Answer
tags:         discussion status-completed unanswered-questions auto-delete
created_date: 2017-07-30 21:48:22
edit_date:    2020-06-03 13:30:57
votes:        "-1 "
favorites:    
views:        "97,512 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-30-Enable-automatic-deletion-of-old_-unanswered_-zero-score-questions-after-a-year_.md
toc:          false
navigation:   false
clipboard:    false
---

## Portions of [question][8] l posted in ***Ask Ubuntu***:

I found three Q&A's addressing "Abandoned Questions" in ***Ask Ubuntu Meta***:

- [What to do with questions whose OP hasn&#39;t visited the site for a long time?](What to do with questions whose OP hasn&#39;t visited the site for a long time?)
- [What to do when users have been inactive for months and their question remain open?](What to do when users have been inactive for months and their question remain open?)
- [What to do with abandoned questions?](What to do with abandoned questions?)

Other ones I've just discovered on July 31, 2017 but not yet reviewed:

- [Changes to how we close abandoned questions][1]
- [Closing abandoned questions is harder than it should be.][2]
- [Can moderators confirm abandoned questions should be closed TL, not NARQ?][3]
- [Another bit on abandoned questions, but specifically good ones with good answers][4]
- [Why don&#39;t we have &quot;required/requested input not provided&quot; close reason for abandoned questions?][5]
- [Time Frame of Abandoned/Old Questions][6]
- [Question deleted as abandoned although I didn&#39;t abandon it][7]

As you can see there used to be a great deal of interest in "Abandoned Questions".

Additionally there is:

- [How should we define &quot;Abandoned&quot; as a close reason?](How should we define &quot;Abandoned&quot; as a close reason?)

In attempts to deal with abandoned questions I wrote a SEDE query and started to go through and close vote ones that were unanswered questions  >5 years old and therefore dealing with an EOL (End of Life) version of Ubuntu. As such it would be impossible to duplicate the OP's problem without installing an EOL version.

Although for some questions the OP hasn't signed on in 5+ years, in many other cases it's been > 6 months since OP signed on. In other cases I was able to comment to OP and ask if problem was still there. Many times the OP replied it wasn't reproducible and I voted to close the question as such.

However with not enough queue reviewers the Close Vote queue quickly filled up. As such close voting thousands of abandoned questions on EOL versions (prior to Ubuntu 14.04) is not viable. This led to my Ask Ubuntu meta question:

- [What are the acceptable number of close votes to initiate per day?](What are the acceptable number of close votes to initiate per day?)

Therefore I'd be very keen to see a Community Bot created that we could actively participate in defining the parameters for.

  [8]: https://meta.askubuntu.com/questions/17094/can-we-merge-many-meta-qas-about-abandoned-questions
  [1]: https://meta.askubuntu.com/questions/2813/changes-to-how-we-close-abandoned-questions
  [2]: https://meta.askubuntu.com/questions/2329/closing-abandoned-questions-is-harder-than-it-should-be
  [3]: https://meta.askubuntu.com/questions/5780/can-moderators-confirm-abandoned-questions-should-be-closed-tl-not-narq
  [4]: https://meta.askubuntu.com/questions/2884/another-bit-on-abandoned-questions-but-specifically-good-ones-with-good-answers
  [5]: https://meta.askubuntu.com/questions/5628/why-dont-we-have-required-requested-input-not-provided-close-reason-for-aband
  [6]: https://meta.askubuntu.com/questions/2852/time-frame-of-abandoned-old-questions
  [7]: https://meta.askubuntu.com/questions/14768/question-deleted-as-abandoned-although-i-didnt-abandon-it
