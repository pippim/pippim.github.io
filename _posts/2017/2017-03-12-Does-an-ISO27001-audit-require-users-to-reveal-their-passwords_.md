---
layout:       post
title:        >
    Does an ISO27001 audit require users to reveal their passwords?
site:         Information Security
stack_url:    https://security.stackexchange.com/q/153596
type:         Answer
tags:         passwords password-management iso27001
created_date: 2017-03-12 05:35:48
edit_date:    
votes:        "45 "
favorites:    
views:        "20,023 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-12-Does-an-ISO27001-audit-require-users-to-reveal-their-passwords_.md
toc:          false
navigation:   false
clipboard:    false
---

## What ISO27001 says about passwords

From ([https://advisera.com/27001academy/blog/2015/07/27/how-to-handle-access-control-according-to-iso-27001/][1]) there is a summary about user passwords:

**User responsibilities (subsection A.9.3)**

> This is a very short  
> subsection (with one control only) that requires you to define how the  
> users will keep their authentication information secret (e.g., protect  
> their passwords). This is usually done through some document like the  
> Acceptable Use Policy, which defines rules like these: do not write  
> the passwords down, do not disclose them to anyone, do not use the  
> same password in different systems, etc.  

In essence if a user reveals his or her password the company fails the audit.

## Importance of passwords

Your password is more important than your signature used to be in the old days. Because in the old days your signature could be forged but now days your password is invisible (in theory at least).

Your password authenticates your User ID. Your User ID gives you certain but restricted powers within areas of your company. Accounting controls require separation of duties. For example a user who approves purchase orders cannot approve receipt of goods. A user who approves receipt of goods cannot approve vendor invoices.

If a criminal (or ISO27001 auditor or IT person) had access to all three passwords they could setup a fake vendor account, setup a fake purchase order, setup fake receipt of goods and pay funds to the fake vendor account.


  [1]: https://advisera.com/27001academy/blog/2015/07/27/how-to-handle-access-control-according-to-iso-27001/
