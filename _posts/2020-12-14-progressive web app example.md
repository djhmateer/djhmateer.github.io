---
layout: post
title: Progressive Web Apps - Example
description: 
menu: review
categories: PWA FrontEnd 
published: true 
comments: false     
sitemap: false
image: /assets/2020-12-02/ios2.png
---

<!-- [![alt text](/assets/2020-12-02/ios2.png "PWA"){:width="300px"}](/assets/2020-12-02/ios2.png) -->

[See my PWA Beginnering Guide article for background](/)

Here we will be a PWA from scratch with the following features:

- Offline page displayed when offline
- Splash screen images for iOS and others
- All icons sizes
- Add to Home Screen instructions (A2HS)
- Make a lightweight fast loading site

Technically we will focus

- Fully populated manifest.json file (scoring high on lighthouse)
- Focus on the best possible and lightest weight html with all meta tags for iOS
- Use 


## PWA Asset Generator

I'm using Razor Pages on .NET 5, deploying to an Azure App Service (Windows). Out of the box it is not a PWA, so lets make one.

```json
{
    "name": "",
    "short_name": "",
    "icons": [
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PortalPWATest</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" asp-area="" asp-page="/Index">PortalPWATest</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-page="/Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-page="/Privacy">Privacy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2020 - PortalPWATest - <a asp-area="" asp-page="/Privacy">Privacy</a>
        </div>
    </footer>

    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>


```

asdf

```bash
npm install --global pwa-asset-generator

# cd wwwroot
# Take park photo and generate an index file and manifest
# saving image assets into a folder
npx pwa-asset-generator park.jpg ./assets -i ./index-template.html -m ./manifest.json

```

