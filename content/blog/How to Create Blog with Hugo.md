---
title: "How to Create a Blog from Scratch with Hugo"
date: 2022-02-05T10:04:15-05:00
draft: true
---

In this post I'll walk you through creating the personal blog you're currently reading using Hugo. When choosing my stack for this blog I had a few requirements in mind: low maintenance, high performance/low bundle sizes, simple clean interface with reusable components, and markdown support. Hugo meets all these requirements with blazing fast compile times as well as no reliance on JavaScript or other libraries that could lead to bloated bundles. It supports a ton of different themes but also has the ability to create very simple themes from scratch with reusable components. And it supports markdown which is my preffered method for writing blog posts. So all I need to do is write a new post in markdown, add it to a specific directory, and push to GitHub and Hugo will generate the necessary html to be served.

For the purposes of this blog I'll use GitHub actions to generate the site and host it on GitHub pages. 

### Getting Started
To get started [install Hugo](https://gohugo.io/getting-started/installing). I'm on Mac so I used Homebrew:
{{< code >}}
```Shell
brew install hugo
```
{{< /code >}}

Once it's installed use the hugo cli to scaffold a new site for you.
{{< code >}}
```bash
hugo new site blogname
```
{{< /code >}}

You now have the scaffolding for a new site! You can run the site locally using `hugo server` but you won't see anything just yet! Let's create our site!

At this point you can add an existing theme to your site but I will create me own. Keep in mind, I didn't use a theme because I wanted to create something ultra simple and creating it from scratch helps me understand how Hugo works in greater detail. If you want to create a more complex site or you just want to create something fast I recommend starting with a theme and you can always modify it later but at least you have a base to start from. You can view a list of themes [here](https://themes.gohugo.io/) and choose one you like. Download the theme's source code and add it the `themes` directory of your site. Then initialize git.
{{< code >}}
```bash
cd blogname 
git init 
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```
{{< /code >}}

And set the theme in the config.toml file.
{{< code file="config.toml">}}
```toml
theme = "ananke"
```
{{< /code >}}

Like I said, I didn't use a theme so I will leave my themes directory empty and create a site from scratch.

Now let's set some of the key settings in our configuration file. Open the `config.toml` file and set your baseUrl, language, and title. For me, the title of my blog is simply my name.
{{< code file="config.toml">}}
```toml
baseURL = 'https://olivergilan.com/'
languageCode = 'en-us'
title = 'Oliver Gilan'
```
{{< /code >}}

### Hugo Core Concepts
It's important to understand the directory structure of Hugo. The scaffolding generator for Hugo created a few important directories to understand. The themes directory as previously mentioned handles all the code. 

`content/` handles all the content of your site. This is where I'll be putting my markdown files for my blog.

`layouts/` will hold your html files that are used to render the content for any given page. This is where we will create the templates for our site.

`static/` holds your static files like custom css files or javascript files we might want to reference from our layouts.

How you structure your content within these directories will determine how Hugo generates your site. For example, for my blog I only want a couple pages: I want 
1. A homepage which will act as my "About" page
2. A blog page that lists all my posts in chronological order
3. A page for each blog post 

So in my content directory I create a `blog/` directory and an `_index.md` file. Within the blog directory I will put each post as a markdown file. This very post that you're reading now is located at `content/blog/CreateABlogWithHugo.md`. 

If you want more pages, create more directories. For example if you want your "About" to be separate from your homepage create an `about/` directory next to `blog/`. If you want a contact page create a `contact/` directory. Each directory under `content/` tells Hugo to generate a page of some sort to render that content.

{{< aside >}}
**FYI:** To create a new markdown file in content, use the CLI command `hugo new [path]`
for example: `hugo new blog/firstpost.md`
This generates the markdown file preloaded with front matter fields that you can fill in.
This generator uses the file in `archetypes/default.md` as a template. You can add more fields in that template file to suit your needs. I left it as is for now.
{{< /aside >}}

Because my site is simple I decided to keep all my css in one file but you can of course split it up. Add any CSS or JS files you want to the `static/` directory. I added mine to `static/css/style.css` as well as the fonts my site will use to `static/fonts/`. You can of course load your fonts from an external service like Google fonts but I choose to serve them with my site.

So now you have some content in your content directory and you have your css, javascript, or any other static files in your static directory. Now let's actually build the template files that tell Hugo how to render your content!

### Building the Template
The first part of the template I want to build is the navigation bar. This will be present on all of the pages in my site and won't change. To get started create the following files within the layouts directory:

`layout/_default/baseof.html` <br>
`layout/partials/header.html`

`baseof.html` will be the base template that holds the other templates. You can think of this as the root component in a framework like React. All that I'll put in that file is the following:

{{< code file="layouts/defaults/baseof.html" >}}
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
		{{ block "head" . }}
		{{ end }}
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
{{< /code >}}

You can see I link to the stylesheet here so that every other page has access to the css. The parts that say `{{ block [name] }}` tell Hugo to render another layout in that location. If Hugo cannot find an appropriate layout to render in place of a block statement it will fallback to the default which you can set by adding any content you want between the beginning of the block and the `{{ end }}` statement. Notice how in the `<title>` tag I tell Hugo to render the site's title as the default. `.Site.Title` will evaluate to whatever you set as the title in the config file. 

Now let's implement the header component. Notice that it's located in a directory called "partials." In Hugo a partial is a reusable component that can be plugged into any layout in a similar way to a React component. 
In `header.html` add the following code:
{{< code file="layouts/partials/header.html">}}
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
{{< /code >}}

#### Working with Menus
Notice how in the above header partial I don't actually have the unordered list implemented. I could of course manually create each `<li>` element and point it to the designated page but I'd rather have Hugo dynamically render that menu for me. This makes it easier to update in the future. 

We can do this with some updates to the config of the site. Add the following:
{{< code file="config.toml">}}
```toml
sectionPagesMenu = "main"
```
{{< /code >}}

This tells Hugo to take every section page of the site and create menu called `main` . The only section page I have right now is for my `content/blog/` directory so right now Hugo has one menu `main` with an element for that blog page. We can make the partial use that dynamic menu with the following code:

{{< code file="layouts/partials/header.html">}}
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
{{< /code >}}

This takes the `main` menu and for each item in it renders a `<li>` tag with a link to that page's URL and it's title. 

By default Hugo pluralizes the titles which I do not want because I want the menu to say `Blog` not `Blogs`. To disable the pluralization add the following to your config file:
{{< code file="config.toml">}}
```toml
pluralizelisttitles = false
```
{{< /code >}}

I also want to add more links to external sites such as my GitHub. Hugo can't automatically add that to the menu because I don't have a page for it but I can manually add it through the config with the following:

{{< code file="config.toml">}}
```toml
[menu]
[[menu.main]]
	identifier = "github"
	name = "GitHub"
	title = "GitHub"
	url = "https://github.com/olivergilan"
```
{{< /code >}}

This manually adds another element to the main menu so that it gets rendered using the given title and url fields. Now if I ever want to add, remove, or update an element on my navigation bar I can just quickly edit my config file without modifying the html code.

#### Target Blank
One last feature I want to add is to open certain links in a new tab. If a user clicks a link to my blog page or any other page within my site it should navigate within the same tab but if a user clicks my GitHub link I want it to open in a new tab so they can easily switch back to my site if they want to. This can be achieved by adding the following code:

{{< code file="config.toml">}}
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
{{< /code >}}
{{< code file="layouts/partials/header.html">}}
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
{{< /code >}}

This adds a paramer to that specific menu item with name `targetBlank` and value `true`. Then within the partial for each menu item I check if it has that parameter and if it does I add the `target="_blank"` attribute to the href element. This will make the link open in a new tab! Now I have a working navbar/header! I can add it to my `layouts/defaults/baseof.html` file so that it appears at the top of every page on my site and add some css to style it how I want.
{{< code file="layouts/defaults/baseof.html">}}
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
		{{ block "head" . }}
		{{ end }}
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
{{< /code >}}
Using `{{ partial "header" . }}` tells Hugo to look in the partials directory, find the file with that name and render it. Don't forget the period after the partial name, that's not a typo. That period passes in the current context so when the code within the partial uses `.Site.Title` or `.Site.Menus...` it's doing so with that context being passed in. And now we have a working header with a navigation menu that can be reused on every page!

### Post Page
So now you've got the scaffolding of your site created and you have a navigation bar that will appear at the top of every page. Let's spend some time creating the template for each blog post as this is where people will be spending the most time on your site.
Create a new file  `layouts/blog/single.html`. This will be used by Hugo to render individual pages in the blog section of the site.

This is the code I have in my template:
{{< code file="layouts/blog/single.html" >}}
```html
{{ define "head" }}
    <link rel="stylesheet" href="/css/post.css" />
{{ end }}

{{ define "main" }}
    <section id="main">
        <h1 id="title">{{ .Title }}</h1>
        <section class="post-metadata">
            <h4 id="date"> {{ .Date.Format "Mon Jan 2, 2006" }} </h4>
            <h5 id="wordcount"> {{ .WordCount }} Words </h5>
        </section>
        <div>
            <article id="content">
            {{ .Content }}
            </article>
        </div>
    </section>
{{ end }}

{{ define "footer" }}
    {{ partial "footer" . }}
{{ end }}
```
{{< /code >}}

Pretty straightforward but to quickly go over it. Each "define" block implements one of the "block" statements in the `baseof.html` file we created earlier. The head block allows me to inject custom properties into the pages head tag. In this case I made a separate css file for css relating only to blog posts and I link that here. Then in the main block I create the post itself. Notice how I use varriables like .Title, .WordCount, .Content, and the .Date.Format function. These are all provided by Hugo automatically. For example the beginning of this blog post has the following Front Matter:

{{< code file="content/blog/HowToCreateABlogWithHugo.md">}}
```markdown
---

title: "How to Create a Blog from Scratch with Hugo"

date: 2022-02-05T10:04:15-05:00

draft: true

---
```
{{< /code >}}
That "title" field is then used by Hugo for the .Title variable when rendering the page for that post. The Content parameter takes whatever I wrote in the Markdown file and generates the blog page's content from it. Everything else here is pretty much standard. You can open dev tools in chrome and look at what sort of elements get rendered from your markdown and then just use css to style your blog posts however you'd like.

Because this is a technical blog one of the important elements for posts will be the inclusion of code blocks. Adding code blocks can be achieved in Hugo using [Shortcodes](https://gohugo.io/content-management/shortcodes/). Hugo has a built-in [Highlight](https://gohugo.io/content-management/syntax-highlighting/#highlight-shortcode) shortcode that can be used to add syntax highlighting to a block of code in your markdown file (can also be activated using code fences instead of the shortcode tag). In my opinion the highlight shortcode is a bit limited: it will highlight your code but that's it. When I have a code block I want to optionally include the filepath for that code block and you might want to include other things like a "Copy to Clipboard" button. To do that we need to create our own shortcode!

#### Shortcodes
A shortcode is a simple snippet inside a content file that Hugo will render using a predefined template. Within the layouts directory create shortcodes directory and add the following file:
{{< code file="layouts/shortcodes/code.html" >}}
```html
<div class="code-block">
    {{ with .Get "file" }}
    <div class="filepath">
        {{.}}
    </div>
    {{ end }}
    <div class="code">
        {{ .Inner | markdownify }}
    </div>
</div>
```
{{< /code >}}

Now in my content markdown files if I want a code block I can use
{{< code >}}
```markdown
This is a normal paragraph...
{{</* code file="optional/file/path" */>}}
	{{</* highlight markdown */>}}
		// Code goes here
	{{</* /highlight */>}}
{{</* /code */>}}
```
{{< /code >}}

I can pass in an optional "file" parameter and if it exists Hugo will render that div with class "filepath" that I can style how I want. The inner code within the shortcode gets processed through the markdown renderer using the `markdownify` function. Because shortcodes can nest within each other, the .Inner content still gets the the built-in Highlight shortcode so my custom shortcode acts as a wrapper extending the native functionality. 
Notice how my shortcode is literally called "code" and that's because of how I named the shortcode html file. Name the file whatever you want that specific shortcode to be. 

Don't forget to customize how Hugo styles the code syntax by updating your config file.
{{< code file="config.toml" >}}
```toml
[markup]
  [markup.highlight]
    anchorLineNos = false
    codeFences = true
    guessSyntax = false
    hl_Lines = ''
    lineAnchors = ''
    lineNoStart = 1
    lineNos = false
    lineNumbersInTable = true
    noClasses = true
    style = 'dracula'
    tabWidth = 4
```
{{< /code >}}

And there you have it! A little bit of styling and you can have a custom code block or any other custom markdown element.

#### Footer
For the footer I created another partial with a custom menu in the config for the different social elements.
{{< code file="layouts/partials/footer.html" >}}
```html
<footer>
    <div class="socials">
        {{ range .Site.Menus.socials }}
            <a class="section-link small-thick" href="{{.URL}}" 
                {{with .Params.targetBlank}} target="_blank" {{end}}>
                {{ with .Params.icon }}
                    <img class="social-icon" src="{{.}}"/>
                {{end}}
            </a>
        {{ end }}
    </div>
    <p>&copy {{ dateFormat "2006" now }} {{ .Site.Title }}</p>
</footer>
```
{{< /code >}}

{{< code file="config.toml" >}}
```toml
[menu]
[[menu.socials]]
    identifier = "github"
    name = "GitHub"
    title = "GitHub"
    url = "https://github.com/olivergilan"
    [menu.socials.params]
        targetBlank = true
        icon = "/icons/github.png"

[[menu.socials]]
    identifier = "linkedin"
    name = "LinkedIn"
    title = "LinkedIn"
    url = "https://linkedin.com/in/oliver-gilan/"
    [menu.socials.params]
        targetBlank = true
        icon = "/icons/linkedin.png"

```
{{< /code >}}

In the above "socials" menu, the items have a custom icon parameter that contains the path to the icon for that element within the `static` directory.

This time I don't want the footer on every page, only on my blog post pages. So instead of adding this to the base template I add it to my single page template for the blog section. If you scroll up to the code block above you'll see I define the "footer" block and declare the footer partial in that block. Now it'll be added to every blog post.

#### Header Anchors
One nice feature on a lot of blogs is having anchors for different sections of individual posts. If you look above this paragraph at this section's heading you'll see the "#" tag which is clickable and if you look at the URL you'll notice it now contains that header in it. This allows you to link to a specific section of a webpage. Hugo has a feature called [Markdown Render Hooks](https://gohugo.io/getting-started/configuration-markup/#markdown-render-hooks) that makes adding these anchors easy. For a more in-depth explanation of how this works check out [this post](https://pavelkorolev.xyz/blog/2020-10-31-hugo-header-anchors/) by Pavel Korolev.

{{< code file="layouts/_defaults/_markup/render-heading.html" >}}
```html
<h{{ .Level }} id="{{ .Anchor | safeURL }}">{{ .Text | safeHTML }}
{{- if and (ge .Level 1) (le .Level 6) }}{{" " -}}
<a class="anchor" href="#{{ .Anchor | safeURL }}">
    #
</a>
{{- end -}}
</h{{ .Level }}>
```
{{< /code >}}

### RSS
Adding an RSS feed to the site is really quite simple with Hugo. Hugo has a default RSS template but it doesn't quite fit my needs because I want to only have blog posts on the feed and nothing else. By default Hugo creates a feed for each section of your site but in my case I only want one feed for the root of my site and I only want it to contain pages from the blog section. To do this I followed this [awesome post](https://benjamincongdon.me/blog/2020/01/14/Tips-for-Customizing-Hugo-RSS-Feeds/) by Benjamin Congdon. 

### Compiling and Hosting
When it comes to compiling and hosting I want it to be as simple as possible. I don't want to spend time in the future messing around with all this infra or manually copying files to servers, etc. Because I'm hosting this whole repository in GitHub I just used [GitHub Actions](https://github.com/features/actions) to build my site. To do that just create the following file:

{{< code file=".github/workflows/gh-pages.yml" >}}
``` yaml
name: github pages

on:
  push:
    branches:
      - main  # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```
{{< /code >}}

Once you add this file to your repo and push it to GitHub it automatically creates a workflow that executes the above job. The job runs every time there is a new change pushed to the master branch of the repo. The Job first checks out the latest commits of the master branch, installs Hugo, compiles the site, then pushes the compiled static files to the gh-pages branch of the repository. 

This is great because it means whenever I want to make a change to the site, whether that's changing code or just adding a new blog post, I simply need to push the change to my master branch and it'll automatically rebuild the site and push the new build to the gh-pages branch. 

For hosting I want to keep it simple as well so I'm just hosting my site on [GitHub Pages](https://pages.github.com/). In the settings for my repository I set the gh-pages branch to be the source for the served pages and I add my custom domain so that people can access the site with my custom URL.

### Conclusion
And that's it! Now I have a functioning blog that I can add new features to and expand whenever I want. It's incredibly simple and minimal, no themes or bloated JavaScript frameworks (actually no JS at all as of right now), and it fits nicely into my existing workflows.