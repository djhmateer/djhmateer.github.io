---
layout: post
title: 12 Razor Pages Multi form posting 
description: 
menu: review
categories: Form 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

Imagine you have a form which pulls in a BudgetAmount from a database, and want to update this field in Razor pages.

[razor-pages-form-validation](https://github.com/djhmateer/razor-pages-form-validation) source sample code.

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

[![dev](/assets/2021-03-30/budget.jpg "dev"){:width="400px"}](/assets/2021-03-30/budget.jpg)

```html
<div class="form-group">
    <label asp-for="BudgetAmount"></label>
    <input asp-for="BudgetAmount" class="form-control"/>
    <span asp-validation-for="BudgetAmount" class="text-danger"></span>
</div>
```
and the code behind

```cs
public int BudgetAmount { get; set; }

public void OnGet()
{
    BudgetAmount = 123;
}

public async Task<IActionResult> OnPostAsync()
{
    // fake an error 
    // the only time I get a form resubmission popup is when
    // this error page is returned and I hit f5
    ModelState.AddModelError(string.Empty, "Problem something wrong");
    return Page();
}

```

I'm faking some sort of error which then returns the Page. However the existing budget amount is not remembered, but the message is

## BindProperty

This property allows model binding which fixes the problem

[MS Docs](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/?view=aspnetcore-5.0&tabs=visual-studio#the-home-page) - see just above where this link takes you.


[![dev](/assets/2021-03-30/budget2.jpg "dev")](/assets/2021-03-30/budget2.jpg)

## Confirm Form Resubmission

When I've gone back to a form with errors, and press F5, I'll get this:

[![dev](/assets/2021-03-30/resubmit.jpg "dev")](/assets/2021-03-30/resubmit.jpg)

I'm fine with this form like this as I never need to link to a pre-filled in form.

## Passing value back to submitted form - open modal window

Imagine you've posted the form from a modal popup, and you need to tell the page to redisplay that modal.

```cs
[BindProperty]
public string Message { get; set; }

public bool OpenEditBudgetModal { get; set; }
```

and then some jQuery to click the button which originally opened the modal.

```html
<!-- when a modal popup has been posted, and a server side validation error occurs we want to redisplay the popup-->
<!-- our page script.js has already loaded-->
@if (Model.OpenEditBudgetModal)
{
    <script>
    $(document).ready(function () {
    $('#edit-budget').click();
});
</script>
}

```


## Other Strategies

```cs
// this is nice, but no modelbinding - would need to pass the new value to here
return await OnGetAsync(projectId, openEditBudgetModal: true);

```

Don't like this as press F5 it will give a form error

[Post Redirect Get](https://exceptionnotfound.net/implementing-post-redirect-get-in-asp-net-core-razor-pages/)

This works well for a page I want to link to eg /SearchPRG?country=uk

But is dangerous for other scenarios.

## Multiple Forms - eg Modal popups and forms which do not include all properties 

When you're only posting a few properties, the simplest thing is to just get the data again from the db and re-hydrate the missing values. 

We don't want to overpost on forms.

When submitting mutiple small forms on a page (I'm using modals) it is nice to handle each form separatetly

[https://www.learnrazorpages.com/razor-pages/handler-methods#named-handler-methods](https://www.learnrazorpages.com/razor-pages/handler-methods#named-handler-methods)

## ModelState with multiple forms

We'll have to handle errors more manually now

[https://stackoverflow.com/a/54964930/26086](https://stackoverflow.com/a/54964930/26086) 

This way works rather well, keeping javascript validations working too.

```html
<form id="frm-change-password" asp-page-handler="addreview" method="post">
</form>

```

then

```cs
public bool OpenAddReviewModal { get; set; }
public bool OpenAddDatesModal { get; set; }

[BindProperty]
public AddReviewModel AddReview { get; set; } = null!;
[BindProperty]
public AddDatesModel AddDates { get; set; } = null!;

public class AddReviewModel
{
    [BindProperty]
    [Required(ErrorMessage = "Please enter a review")]
    public string ReviewText { get; set; } = null!;

    public string[] Stars = { "5", "4", "3", "2", "1" };

    [BindProperty]
    [Required(ErrorMessage = "Please rate")]
    public string OverallStar { get; set; } = null!;
}

public class AddDatesModel
{
    [BindProperty] 
    public string FooStartDate { get; set; } = null!;
    [BindProperty] 
    public string FooEndDate { get; set; } = null!;
}

// OnGet..

public async Task<IActionResult> OnPostAddReviewAsync(int projectId, int applicantId)
{
    // multiple form submit with ModelState validation
    // keeping attributes so that javascript validators wired up too
    // https://stackoverflow.com/a/54964930/26086
    ModelState.Clear();
    if (!TryValidateModel(AddReview, nameof(AddReview)))
    {
        await HydrateProperties(projectId, applicantId);

        OpenAddReviewModal = true;

        // failed validation
        return Page();
    }

    // validation has passed
    // save properties
    return LocalRedirect($"/foo/{projectId}/{applicantId}");
}

```


## Summary

We can post a form and do server side validation and get the values back through model binding.

