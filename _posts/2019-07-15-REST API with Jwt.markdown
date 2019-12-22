---
layout: post
title: REST API with Jwt 
description: 
menu: review
categories: REST API jwt 
published: true 
comments: false
sitemap: false
image: /assets/2019-05-27/1.png
---

I was asked to explore a REST API from a large ERP system to extract some of it's data. It uses a OAuth2 token service

There was an excellent [Swagger]() endpoing to show the available methods

```csharp
static async Task Main(string[] args)
{
    using (HttpClient client = new HttpClient())
    {
        var username = "aaa";
        var password = "bbb";
        var url = "https://myclient.bigerpsystem.co.uk:8529/api/";

        client.DefaultRequestHeaders.Add("Accept", "application/json");
        FormUrlEncodedContent credentialsContent = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            {"username", username},
            {"password", password },
            {"scope","read" },
            {"grant_type", "password" }
        });

        var response = await client.PostAsync($"{url}token", credentialsContent);
        var jwt = response.Content.ReadAsStringAsync().Result;

        JObject jObject = JObject.Parse(jwt);
        string token = (string)jObject["access_token"];

        // make a call to the API
        // Organization - gets all Organization nodes
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        string organizations = client.GetStringAsync(new Uri($"{url}Organization")).Result;

        // User
        string users = client.GetStringAsync(new Uri($"{url}User")).Result;

    }
}

```

Architecture style: REST
• Message format: JSON
• Transport Security: SSL
• Authorization and Authentication: OAuth 2.0 and ADFS UserNameMixed (SAML token has to be converted to JWT manually)
• Authorization Grant: Resource Owner Password Credentials
• Web host: Owin/Katana Self host












