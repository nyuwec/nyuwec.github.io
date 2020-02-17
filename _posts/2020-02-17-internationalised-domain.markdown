---
title: First steps with an international domain
date: 2020-02-17 10:00:00
tags: [featured]
---

At the beginning of this year I bumped into the realization that despite I own koles.hu, my family name is actually Köles and I don't own that domain. After a quick lookup I saw that köles.hu was still available, so I immediately bought.

Then I realized that I did not research if Github pages could support this kind of domain and if there is a way to host a page for more than one domain.

## Short story quick
Github support such domains, and they don't support multiple domains for a page.

## Short story short

I wanted to test if Github could host any page for the new domain. So I created a new repo and enabled Github pages for it, then I tried to add the domain, which failed as I have to use the "Punycoded" version of the domain.

(You can check the details how you can use Github pages ![here](/2016/almost-free-webhosting/) and ![here](https://pages.github.com))

Nice thing I noticed is that Github added support for HTTPS, I missed the nice lock in the address bar for years, so I happily ticked the checkbox.
I expected that I have to provide the certificate too, but they managed to use their own. Nice job Github!

So I went further to use koles.hu and the new köles.hu for the same page. So far I've failed to do that. Github explicitly states that they don't support multiple domains, the best I can do is to add a CNAME record to one of my DNS table, so browsers can jump to the canonical one. So far I failed to set that record with my DNS provider, so I used the lame old trick of HTML header redirect, so whenever you open my page on the old domain it relocates your browser to the new one.
And there are problems: if you bookmarked any page that bookmark won't work, because I created redirect for the main page only.

Next chapter would be to figure out how to redirect everything...
