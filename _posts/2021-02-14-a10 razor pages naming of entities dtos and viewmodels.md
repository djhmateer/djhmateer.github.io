---
layout: post
title: 10. Razor Pages naming of entities DTOs and ViewModels
description: 
menu: review
categories: RazorPages 
published: true 
comments: false     
sitemap: false
image: /assets/2020-02-03/40.jpg
---

<!-- [![alt text](/assets/2020-10-12/db.jpg "Db from Caspar Camille Rubin on Unsplash")](https://unsplash.com/@casparrubin) -->

Contact - coming out of the database

ContactDTO - being shown on the razor page

```cs
// ContactsModel is the ViewModel
// You can only pass one ViewModel to a view
public class ContactsModel : PageModel
{
    // Contacts is always going to be a List, possibly empty, never null
    public List<ContactDTO> Contacts { get; set; } = null!;
}

 // not sending anything other that what is needed (ie not Id's)
 // Positional Record - need use full version of Record if want attributes
 public record ContactDTO(string Firstname, string Surname, string EmailAddress, string Description, string PhotoFilename)

```

then on the razor view .cshtml:

```html
@page "{projectId:int}"
@model ContactsModel
@{
    ViewData["Title"] = "Contacts";
}

<p>Put in a list of contacts</p>

<table class="table">
    <thead>
        <tr>
            <th> @Html.DisplayNameFor(x => x.Contacts[0].Firstname) </th>
            <th> @Html.DisplayNameFor(x => x.Contacts[0].Surname) </th>
            <th> @Html.DisplayNameFor(x => x.Contacts[0].EmailAddress) </th>
            <th> @Html.DisplayNameFor(x => x.Contacts[0].Description) </th>
        </tr>
    </thead>
    <tbody>

        @foreach (var contact in Model.Contacts)
        {
            <tr>
                <td> @Html.DisplayFor(x => contact.Firstname) </td>
                <td> @Html.DisplayFor(x => contact.Surname) </td>
                <td> @Html.DisplayFor(x => contact.EmailAddress) </td>
                <td> @Html.DisplayFor(x => contact.Description) </td>
                <td> <img src="/generated-images/@contact.PhotoFilename" width="200" /></td>
            </tr>
        }
    </tbody>
</table>



```


## Simple Page

I just flatten the object eg Project when it is a simpler page. 

```cs
public class DashboardModel : PageModel
{
    public int ProjectId { get; set; }

    public string Name { get; set; } = null!;
    public string ProjectRefNo { get; set; } = null!;

    public async Task<IActionResult> OnGetAsync(int projectId)
    {
        var connectionString = AppConfiguration.LoadFromEnvironment().ProNetConnectionString;

        var project = await Db.GetProjectById(connectionString, projectId);

        Name = project.Name;
        ProjectRefNo = project.ProjectRefNo;

        return Page();
    }
}
```
