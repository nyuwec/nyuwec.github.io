---
layout: post
title:  "Almost free webhosting"
date:   2016-02-29 00:10:00
tags: featured
image: /assets/article_images/2016-02-29-almost-free-webhosting/header.jpg
---

So my new webpage/blog is hosted by [GitHub Pages](https://pages.github.com).
That is basically a free service with limitations. It handles static files only, no DataBase, no homegrown server-side PHP scripts.
So the idea is to put your HTML files into GitHub and they will serve. To get the most out of it, you should use some framework. It would help you to overcome the boilerplate this offer requires.

The first obvious candidate is [Jekyll](http://jekyllrb.com/), which is the default FW for GitHub Pages.
Others can be used, but with them you have to upload the generated content, but with Jekyll this step is not required.

Jekyll is a "markdown to webpage" transformer. It reads all content - pages and posts - from separate files and gathers the meta-data then generates a couple of html pages. It features a handy template engine with layout helpers and plugins.

## What do you have to do to start with GitHub Pages and Jekyll?

1. First you have to have a registered user on GitHub.
1. Create a new public repository, name it like: `<username>.github.io`. (Replace `<username>` with your GitHub username.)
1. Install [Ruby](https://www.ruby-lang.org/en/) then Jekyll: `gem install jekyll`
1. Create a new site with Jekyll: `jekyll new <username>.github.io`
1. Go into the folder and run Jekyll: `jekyll serve`
1. Open the site in your [browser](http://0.0.0.0:4000)
1. Write your first post.
1. Push your local repo to GitHub and open your site: `http://<username>.github.io`. For example this site could be opened at [http://nyuwec.github.io](http://nyuwec.github.io)

## I want my own domain!

Ok, no problem, but this part **won't come for free**: you have to buy a domain.
Then you should create a file named CNAME in the root of your shiny new site and put your domain into it like [this](https://github.com/nyuwec/nyuwec.github.io/blob/master/CNAME). Don't forget to push.

Now you should go to your domain registrator and add at least one `A` DNS record. Most preferably use `*` as subdomain and add these IPs: `192.30.252.153`, `192.30.252.154`. (If you can only set one IP, it is enough.)

After you wait TimeToLive amount of time check domain-IP mapping by executing this command:

    dig <yourdomain.com> +nostats +nocomments +nocmd

You should see something like this:

    ; <<>> DiG 9.8.3-P1 <<>> <yourdomain.com> +nostats +nocomments +nocmd
    ;; global options: +cmd
    ;<yourdomain.com>.			IN	A
    <yourdomain.com>.		121	IN	A	192.30.252.153
    <yourdomain.com>.		121	IN	A	192.30.252.154

## I'm stuck...

Check the docs [here](https://pages.github.com) or [here](https://help.github.com/categories/github-pages-basics/) or [here](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)
