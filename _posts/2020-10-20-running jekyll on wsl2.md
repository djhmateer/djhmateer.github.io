---
layout: post
title: Running Jekyll on WSL2 
description: Running Jekyll on WSL2 - performance gains and I love it 
#menu: review
categories: Jekyll WSL2 
published: true 
comments: false     
sitemap: true
image: /assets/2020-10-19/jekyll_island.jpg
---

[![alt text](/assets/2020-10-19/jekyll_island.jpg "Jekyll Island by @_zachreiner_")](https://unsplash.com/@_zachreiner_)

I've [written a lot about using Jekyll](/2019/07/28/Jekyll-Github-Pages) using Docker from Windows to get a good experience. However it can be slow to regenerate and update itself which is annoying.

[Here are my brief notes on setting up WSL2 on Win 10](/2020/10/20/WSL2)

[Here is setting up the new Windows Terminal to connect to WSL2](/2020/10/20/windows-terminal)

Below is my shot of running WSL2 and Jekyll. 

> TL;DR - it works really well

[Dylan Beattie's article](https://dylanbeattie.net/2020/05/19/jekyll-on-wsl2.html) and this [Medium article](https://medium.com/@hjgraca/using-wsl2-visual-studio-code-for-jekyll-blogging-on-windows-10-99489deb4650) helped me along the way.

However I got errors like this following along with the Medium article:

```bash
ERROR:  Error installing zlib:
        ERROR: Failed to build gem native extension.
extconf failed, exit code 1
```

After some playing around this worked for me:

```bash
sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt install ruby-full

sudo apt-get install make gcc gpp build-essential zlib1g zlib1g-dev ruby-dev dh-autoreconf

sudo gem update

sudo gem install bundler

# if you get errors (as I've done), go back to the start and go through these commands again
#sudo gem install jekyll

# inside jekyll repo
bundle install

# simple serve
bundle exec jekyll serve

# I like to have reload working and used to need force_polling to work on windows filesystem
# bundle exec jekyll serve force_polling --livereload --unpublished

bundle exec jekyll serve --livereload --unpublished --incremental
```

I'm running Ubuntu 18.04.5 LTS and 20.04.1 LTS which I found out by typing this into bash:

```bash
lsb_release -a
```

## Error - site wont load

Around the beginning on Nov 2020 I've noticed that sometime the site just wouldn't load from window side, but I could `curl` it from linux side.

No idea why, but restarting this service, restarts WSL2 which works

![alt text](/assets/2020-10-19/service.jpg "Restarting the service")]

Or from a `cmd` prompt on Windows side (thanks [Stackoverflow](https://superuser.com/questions/1126721/rebooting-ubuntu-on-windows-without-rebooting-windows))

```cmd
wsl --shutdown
```

## Error - pathutil

"/var/lib/gems/2.7.0/gems/pathutil-0.16.2/lib/pathutil.rb:502: warning: Using the last argument as keyword parameters is deprecated"

I got this error using Ubuntu 20.04.1 LTS and my site wouldn't load from windows side browser.

I ended up going back to 18.04.5 LTS which then worked. 

![alt text](/assets/2020-10-19/term8.jpg "Worked on new Ubuntu-18.04")]

Notice here I'm defaulting to the non-incremental build in 4.2s on my poweful desktop machine, as it is fast enough.

## VSCode - Remote WSL

To easily view and edit files inside WSL2

[Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

## Performance

Perf went from 35 seconds to 10 seconds 

![alt text](/assets/2020-10-19/perf.jpg "Performance is still quite slow for me")]

After my laptop was left for a while this went down to around **6 seconds**

Then I noticed that `--incremental` works (whereas I had problems before on windows) so now down to **2.3s average**

Then moving to my desktop (4790K desktop - 5 years oldish) am getting **1.5s average** it is amazing how fast it updates.

## Windows Explorer 

I take screenshots and use images from [unsplash](https://unsplash.com) so I need an easy way to save to the WSL2 filesystem. From windows explorer address bar I typed in:

```cmd
\\wsl$\Ubuntu\home\dave\djhmateer.github.io
```

Then put it in my Quick Access:

![alt text](/assets/2020-10-19/quick.jpg "Quick access")]

## Shortcuts in .bash_aliases

[Windows Terminal blog post](/2020/10/20/windows-terminal) where I drive things from now, includes all my useful alias shortcuts.


## Mount a disk

If you've got [Windows 10 Inside Preview Build 20211](https://blogs.windows.com/windows-insider/2020/09/10/announcing-windows-10-insider-preview-build-20211/) you can mount a disk easily. To save images into WSL2 from Windows side, lets [mount a disk](https://devblogs.microsoft.com/commandline/access-linux-filesystems-in-windows-and-wsl-2/)

I don't have this build, so have stuck with the Windows explorer quick access way which seems to work for me.

## VSCode and DevContainers

[VS Code and DevContainers](https://martinpeck.com/blog/2020/11/05/building-jekyll-with-vscode-devcontainers/) by Martin Peck looks very interesting.

## Conclusion

I'm convinced and love having a faster regeneration of my site again.

At some point I will have to look at my Jekyll site and do some performance optimisations to make it regenerate faster.

[Here is my current technical way I structure my Jekyll site](/2019/07/28/Jekyll-Github-Pages) and [A great video on Jekyll with tips on keeping it simple](https://www.youtube.com/watch?v=No7dtPtbtcE)

In the meantime I can get on with writing and easily seeing live previews.

Happy blogging :-)