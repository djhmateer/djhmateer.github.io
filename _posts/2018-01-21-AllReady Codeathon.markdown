---
layout: post
title:  "AllReady Codeathon"
date:   2018-01-21
menu: review
categories: allready 
published: true 
---
![Menu](/assets/2018-01-22-AllReady/header.jpg)

[Humanitarian Toolbox](http://www.htbox.org/) is a wonderful cause.
 
A massive thanks to [Steve Gordon](https://www.stevejgordon.co.uk/humanitarian-toolbox-codeathon) for an excellently ran Codeathon. We did 30 PR's during the day with 19 people working simultaneously on the same codebase. 

[Good project background](http://www.htbox.org/blog/introducing-james-chambers)

### Git Workflow
What I found interesting was how to use Git with a fast changing code base. Here is my 'flow'

I had already forked the project and setup my upstream remote [detailed](https://www.stevejgordon.co.uk/forking-cloning-github)

```
git remote add upstream https://github.com/HTBox/allReady.git

// look for an issue in Github Issues eg 2204 
// add 'working on it' in the comments section
git checkout -b 2204
// work on the code and change files
git add filename (use gitkraken to stage - avoid whitespace changes)
git checkout master
git stash (as had gulp compiled site.js, mappingTools.js etc I didn't want to commit)
git fetch upstream
git merge upstream/master
git checkout 2204
git rebase master
git push origin 2204 -f  (when ready to push up branch to do a PR)
```

Start the PR message with the corresponding issue number eg #2204 Fixed the image in Edit

### Javascript dependencies
I had to fight to get the js dependencies installed and had to reset my repo a few times just to make sure nothing crazy was happening:

```
git reset --hard head
git clean -dfx
```

This was as good as I got
![Menu](/assets/2018-01-22-AllReady/js.png)
which was good enough to changes to the UI.

### Appveyor
We use appveyor to check every PR (build and run tests). It did take approx 6:30 per build which meant there was always a queue which slowed some PR's down.
[Appveyor](https://ci.appveyor.com/project/HTBox/allready/history)

### Slack
We use a private slack channel throughout the day 
[here](https://htbox.slack.com)

### Working on Issue 2239
[Issue 2239](https://github.com/HTBox/allReady/issues/2239)
There were 3 small issues:
- The Name field is considered required and should be marked with a red asterisk
- We should include a message "Fields marked with an * are required" message at the top of the form.
- The "Name" label should be renamed to "Task Name"

The Name was a simple change on the VolunteerTaskViewModel. The second we eventually just put in p tag html in whatever pages needed it. I'd like to talk about the **first**.


![Menu](/assets/2018-01-22-AllReady/star.png)
How did we get these red stars showing on every form in the solution which has a required DataAnnotation?

![Menu](/assets/2018-01-22-AllReady/db.png)
I created a quick db diagram to familiarise myself with concepts. [Domain Language](https://github.com/HTBox/allReady/wiki/Domain-Language) was useful too.

I tried to use a simple 'required' bootstrap concept to put in the *'s. [Ian Thomas](https://github.com/thelem) then came up with the great idea of using Tag Helpers working on a related issue: [here](https://github.com/HTBox/allReady/issues/2233

{% highlight csharp %}
namespace AllReady.TagHelpers
{
    [HtmlTargetElement("label", Attributes=ForAttributeName)]  
    public class LabelRequiredTagHelper: LabelTagHelper  
    {  
        private const string ForAttributeName = "asp-for";  
   
        public LabelRequiredTagHelper(IHtmlGenerator generator) : base(generator)  
        {  
        }  
   
        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)  
        {  
            await base.ProcessAsync(context, output);  

            // Automatically mark required fields with an asterisk, except booleans
            // because MVC always sets IsRequired to true for booleans.
            if (For.Metadata.IsRequired && For.Metadata.ModelType.FullName != "System.Boolean")  
            {  
                var span = new TagBuilder("span");  
                span.AddCssClass("required");
                span.InnerHtml.Append("*");
                output.Content.AppendHtml(span);  
            }  
        }  
    }  
}
{% endhighlight %}

Very nice!
![Html](/assets/2018-01-22-AllReady/screen.png)
No * required - applied automatically depending upon DataAnnotation

## Summary
- Git(Hub) skills are important and codeathons help you to learn them well!
- Working with other programmers was great
- Doing something (no matter how small) is a good feeling
- I will help with this project more