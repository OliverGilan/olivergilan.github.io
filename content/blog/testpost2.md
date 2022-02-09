---
title: "How to Create a Blog from Scratch with Hugo"
date: 2022-02-05T10:04:15-05:00
draft: false
---

In this post I'll walk you through creating the personal blog you're currently reading using Hugo. When choosing my stack for this blog I had a few requirements in mind: low maintenance, high performance/low bundle sizes, simple clean interface with reusable components, and markdown support. Hugo meets all these requirements with blazing fast compile times as well as no reliance on JavaScript or other libraries that could lead to bloated bundles. It supports a ton of different themes but also has the ability to create very simple themes from scratch with reusable components. And it supports markdown which is my preffered method for writing blog posts. So all I need to do is write a new post in markdown, add it to a specific directory, and push to GitHub and Hugo will generate the necessary html to be served.

For the purposes of this blog I'll use GitHub actions to generate the site and host it on GitHub pages. 

### Getting Started
To get started [install Hugo](https://gohugo.io/getting-started/installing). I'm on Mac so I used Homebrew:
```bash
brew install hugo
```

Once it's installed use the hugo cli to scaffold a new site for you.
```bash
hugo new site blogname
```

You now have the scaffolding for a new site! You can run the site locally using `hugo server` but you won't see anything just yet! Let's create our site!

### Creating a Theme
At this point you can add an existing theme to your site but I will create me own. Keep in mind, I didn't use a theme because I wanted to create something ultra simple and creating it from scratch helps me understand how Hugo works in greater detail. If you want to create a more complex site or you just want to create something fast I recommend starting with a theme and you can always modify it later but at least you have a base to start from. You can view a list of themes [here](https://themes.gohugo.io/) and choose one you like. Download the theme's source code and add it the `themes` directory of your site. Then initialize git.
```bash
cd blogname 
git init 
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```
And set the theme in the config.toml file.
```toml
theme = "ananke"
```

Like I said, I didn't use a theme so I will leave my themes directory empty and create a site from scratch.

### Hugo Core Concepts
It's important to understand the directory structure of Hugo. The scaffolding generator for Hugo created a few important directories to understand. The themes directory as previously mentioned handles all the code 
