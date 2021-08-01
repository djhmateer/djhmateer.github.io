---
layout: post
# title: 
description:
menu: review
categories: Dates 
published: true 
comments: false     
sitemap: false
image: /assets/2021-07-26/save.jpg
---

<!-- [![alt text](/assets/2021-07-26/save.jpg "Turn auto build on save off")](/assets/2021-07-26/save.jpg) -->

[Cookie Authentication in ASP.NET 5](2020/10/21/cookie-authentication-in-asp.net-core-3.1)

In Razor Page you can't add the Authorize attribute to a separate handler

```cs
public class FaceSearchModel : PageModel
{
   // Anonymous can do a get
   public async Task<IActionResult> OnGetAsync()
   {
      return Page();
   }

   // **Wont work**
   // Only authorized users with the correct roles can post
   [Authorize(Roles = "Tier1, Tier2")]
   public async Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
   {
       // currently we just need some file to be uploaded
       if (ModelState.IsValid)
       // etc...
   }
}
```

[https://github.com/dotnet/aspnetcore/issues/8737](https://github.com/dotnet/aspnetcore/issues/8737)


Options

- Use MVC
- Use separate page eg face-search-auth.cs  which needs auth. face-search.cs is the public facing page
   maybe /private/face-search.cs
   

- Write a filter IAsyncPageFilter

[docs](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/simple?view=aspnetcore-3.1&branch=pr-en-us-18879#authorize-attribute-and-razor-pages)


[https://stackoverflow.com/questions/31464359/how-do-you-create-a-custom-authorizeattribute-in-asp-net-core?rq=1](https://stackoverflow.com/questions/31464359/how-do-you-create-a-custom-authorizeattribute-in-asp-net-core?rq=1)