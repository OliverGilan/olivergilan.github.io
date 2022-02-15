---
title: "How to Create a Blog from Scratch with Hugo"
date: 2022-02-05T10:04:15-05:00
draft: false
---

In this post I'll walk you through creating the personal blog you're currently reading using Hugo. When choosing my stack for this blog I had a few requirements in mind: low maintenance, high performance/low bundle sizes, simple clean interface with reusable components, and markdown support. Hugo meets all these requirements with blazing fast compile times as well as no reliance on JavaScript or other libraries that could lead to bloated bundles. It supports a ton of different themes but also has the ability to create very simple themes from scratch with reusable components. And it supports markdown which is my preffered method for writing blog posts. So all I need to do is write a new post in markdown, add it to a specific directory, and push to GitHub and Hugo will generate the necessary html to be served.

For the purposes of this blog I'll use GitHub actions to generate the site and host it on GitHub pages. 

### Getting Started
To get started [install Hugo](https://gohugo.io/getting-started/installing). I'm on Mac so I used Homebrew:
```Shell
{{< highlight shell >}}
brew install hugo
{{< /highlight >}}
```

Once it's installed use the hugo cli to scaffold a new site for you.
```bash
hugo new site blogname
```

You now have the scaffolding for a new site! You can run the site locally using `hugo server` but you won't see anything just yet! Let's create our site!

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

Now let's set some of the key settings in our configuration file. Open the `config.toml` file and set your baseUrl, language, and title. For me, the title of my blog is simply my name.

```toml
baseURL = 'https://olivergilan.com/'
languageCode = 'en-us'
title = 'Oliver Gilan'
```

### Hugo Core Concepts
It's important to understand the directory structure of Hugo. The scaffolding generator for Hugo created a few important directories to understand. The themes directory as previously mentioned handles all the code. 

`content\` handles all the content of your site. This is where I'll be putting my markdown files for my blog.

`layouts\` will hold my html files that are used to render the content for any given page. This is where we will create the template for our site.

`static\` holds our static files like custom css files or javascript files we might want to reference from our layouts.

How you structure your content within these directories will determine how Hugo generates your site. For example, for my blog I only want a couple pages: I want a homepage which will act as my "About" page and I want a blog page. The blog page will be a list of all my blog posts in chronological order and if you click on a post it will take you tothat post's specific page. So in my `content\` directory I create a `blog\` directory and an `_index.md` file. Within the `blog\` directory I will put each post as a markdown file. This very post that you're reading now is located at `content\blog\CreateABlogWithHugo.md`. 

If you want more pages, create more directories. For example if you want your "About" to be separate from your homepage create an `about\` directory next to `blog\`. If you want a contact page create a `contact\` directory. Each directory under `content\` tells Hugo to generate a page of some sort to render that content.

FYI: To create a new markdown file in content, use the CLI command `hugo new [path]`
for example: `hugo new blog\firstpost.md`
This generates the markdown file preloaded with front matter fields that you can fill in.
This generator uses the file in `archetypes\default.md` as a template. You can add more fields in that template file to suit your needs. I left it as is for now.

Because my site is simple I decided to keep all my css in one file but you can of course split it up. Add any CSS or JS files you want to the `static\` directory. I added mine to `static\css\style.css` as well as the fonts my site will use to `static\fonts\`. You can of course load your fonts from an external service like Google fonts but I choose to serve them with my site.

So now you have some content in your `content\` directory and you have your css, javascript, or any other static files in your `static\` directory. Now let's actually build the template files that tell Hugo how to render your content!

### Building the Template
The first part of the template I want to build is the navigation bar. This will be present on all of the pages in my site and won't change. To get started create the following files within the `layouts\` directory:

`layout\_default\baseof.html`
`layout\partials\header.html`

`baseof.html` will be the base template that holds the other templates. You can think of this as the root component in a framework like React. All that I'll put in that file is the following:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="/css/style.css" />
		<title>
			{{ block "title" . }}
				{{ .Site.Title }}
			{{ end }}
		</title>
	</head>
	<body>
		<!-- Code that all your templates share, like a header -->
		{{ block "main" . }}
		<!-- The part of the page that begins to differ between templates -->
		{{ end }}
		{{ block "footer" . }}
		<!-- More shared code, perhaps a footer but that can be overridden if need be in -->
		{{ end }}
	</body>
</html>
```
You can see I link to the stylesheet here so that every other page has access to the css. The parts that say `{{ block [name] }}` tell Hugo to render another layout in that location. If Hugo cannot find an appropriate layout to render in place of a block statement it will fallback to the default which you can set by adding any content you want between the beginning of the block and the `{{ end }}` statement. Notice how in the `<title>` tag I tell Hugo to render the site's title as the default. `.Site.Title` will evaluate to whatever you set as the title in the config.toml file. 

Now let's implement the header component. Notice that it's located in a directory called "partials." In Hugo a partial is a reusable component that can be plugged into any layout in a similar way to a React component. 
In `header.html` add the following code:

```html
<header>
	<nav>
		<a href="{{.Site.BaseURL}}">
			<h1 class="site-title">{{ .Site.Title }}</h1>
		</a>
		<ul class="section-list">

		</ul>
	</nav>
</header>
```

#### Working with Menus
Notice how in the above header partial I don't actually have the unordered list implemented. I could of course manually create each `<li>` element and point it to the designated page but I'd rather have Hugo dynamically render that menu for me. This makes it easier to update in the future. 

We can do this with some updates to the config of the site. Add the following:

```toml
sectionPagesMenu = "main"
```
This tells Hugo to take every section page of the site and create menu called `main` . The only section page I have right now is for my `content\blog\` directory so right now Hugo has one menu `main` with an element for that blog page. We can make the partial use that dynamic menu with the following code:
```html
<header>
	<nav>
		<a href="{{.Site.BaseURL}}">
			<h1 class="site-title">{{ .Site.Title }}</h1>
		</a>
		<ul class="section-list">
			{{ range .Site.Menus.main }}
				<li class="section-item horizontal-list">
					<a class="section-link small-thick" href="{{.URL}}">{{.Title}}</a>
				</li>
			{{ end }}
		</ul>
	</nav>
</header>
```
This take the `main` menu and for each item in it renders a `<li>` tag with a link to that page's URL and it's title. 

By default Hugo pluralizes the titles which I do not want because I want the menu to say `Blog` not `Blogs`. To disable the pluralization add the following to your config file:
```toml
pluralizelisttitles = false
```

I also want to add more links to external sites such as my GitHub. Hugo can't automatically add that to the menu because I don't have a page for it but I can manually add it through the config with the following:

```toml
[menu]
[[menu.main]]
	identifier = "github"
	name = "GitHub"
	title = "GitHub"
	url = "https://github.com/olivergilan"
```
This manually adds another element to the main menu so that it gets rendered using the given title and url fields. Now if I ever want to add, remove, or update an element on my navigation bar I can just quickly edit my config file without modifying the html code.

One last feature I want to add is to open certain links in a new tab. If a user clicks a link to my blog page or any other page within my site it should navigate within the same tab but if a user clicks my GitHub link I want it to open in a new tab so they can easily switch back to my site if they want to. This can be achieved by adding the following code:
```toml
[menu]
[[menu.main]]
	identifier = "github"
	name = "GitHub"
	title = "GitHub"
	url = "https://github.com/olivergilan"
	[menu.main.params]
		targetBlank = true
```

```html
<header>
	<nav>
		<a href="{{.Site.BaseURL}}">
			<h1 class="site-title">{{ .Site.Title }}</h1>
		</a>
		<ul class="section-list">
			{{ range .Site.Menus.main }}
				<li class="section-item horizontal-list">
					<a class="section-link small-thick" href="{{.URL}}" {{with .Params.targetBlank}} target="_blank" {{end}}>{{.Title}}</a>
				</li>
			{{ end }}
		</ul>
	</nav>
</header>
```
This adds a paramer to that specific menu item with name `targetBlank` and value `true`. Then within the partial for each menu item I check if it has that parameter and if it does I add the `target="_blank"` attribute to the href element. This will make the link open in a new tab! Now I have a working navbar/header! I can add it to my `layouts\defaults\baseof.html` file so that it appears at the top of every page on my site and add some css to style it how I want.
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="/css/style.css" />
		<title>
			{{ block "title" . }}
				{{ .Site.Title }}
			{{ end }}
		</title>
	</head>
	<body>
		{{ partial "header" . }}
		<!-- Code that all your templates share, like a header -->
		{{ block "main" . }}
		<!-- The part of the page that begins to differ between templates -->
		{{ end }}
		{{ block "footer" . }}
		<!-- More shared code, perhaps a footer but that can be overridden if need be in -->
		{{ end }}
	</body>
</html>
```
Using `{{ partial "header" . }}` tells Hugo to look in the partials directory, find the file with that name and render it. Don't forget the period after the partial name, that's not a typo. That period passes in the current context so with the code within the partial uses `.Site.Title` or `.Site.Menus...` it's doing so with that context being passed in. And now we have a working header with a navigation menu that can be reused on every page!

