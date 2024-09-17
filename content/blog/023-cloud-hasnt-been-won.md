---
title: "The Cloud Hasn't Been Won"
slug: "cloud-hasnt-been-won"
date: 2024-09-16
draft: false
description: "Cloud hosting is one of the biggest markets in the world and it's right there for the taking."
thumbnail: "cloud_marketshare.jpg"
---

Matthew Parkhurst & I founded Antimetal in April of 2022 to bring my vision around "the Cloud" to life. I left the company to focus on my health shortly after but it's been fascinating to watch how my thesis has played out over the past two and a half years. I haven't talked in-depth about my original vision since then but I figure now is a good time to put it all in writing as some parts of my thesis have been validated, the market has matured, and there's still plenty of opportunity left.

## Market Context

Cloud hosting is a huge market. AWS is at $100B run rate and it's growth is [accelerating](https://www.cnbc.com/2024/04/30/aws-q1-earnings-report-2024.html). Azure is estimated to be around $60B in annual revenue with GCP around $30B. The numbers are astronomical and all the players are growing fast even at their already massive size. You only need to capture a fraction of the market to generate millions in revenue like Vercel who recently reported passing $100m in run rate -- a far cry from the top of the market but still a great outcome for a much newer company with far less capabilities than the top players.

The growth of the entire market and the sheer size of it make it an attractive area for businesses trying to generate venture-scale returns... and as a result theres many companies trying to do that. To fully understand the landscape of the market and the origin of this thesis you need to understand some of the history.

In the beginning, any company that used or sold software had to manage its own servers. Entire departments of sys-admins, IT professionals would buy and manage physical servers in a datacenter or often-times in the company's office itself. Engineering teams that wanted to deploy a new service would have to wait for new servers to be bought and installed or if an existing application had a surge in traffic then it became necessary to find extra servers to handle the load. Then came [AWS](https://aws.amazon.com/) in 2006, [GCP](https://cloud.google.com/?hl=en) in 2008, and [Azure](https://azure.microsoft.com/en-us) in 2010 and they exposed their own server hardware running in their data centers through online APIs. What this meant was that if you wanted to host some code you had written you didn't have to go talk to Greg in IT, try to get some server space reserved, and then call Greg again when the machine in your company's basement caught fire. Instead you told AWS you needed a certain amount of compute power, memory, and storage and a couple minutes later you would have that machine up and running in an AWS-managed data center and you could just put your code on it instantly through the internet. They provided Infrastructure as a Service (IaaS) and thus the Cloud was born.

These early cloud companies owned the full stack from hardware to software and grew rapidly. Today they define what the cloud is and own over 60% of the world's cloud infrastructure. They are commonly referred to as **hyperscalers** because in theory, they have enough compute in their clouds to meet the needs of any given company. If your company managed its own servers and you wanted to deploy a new application they might not have a server for you! It wasn't uncommon to wait weeks to deploy something while new compute was bought and shipped and installed. The hyperscalers on the other hand can scale workloads on demand and as a user of them you can practically assume that there's no limit to how much you can scale as long as you can pay.

Then another group of clouds started to pop up. [Heroku](https://www.heroku.com/) was founded in 2007 and [Digital Ocean](https://www.digitalocean.com/) in 2011 and both of their value propositions were how much _simpler_ they were to use. The hyperscalers were powerful but they were (and still are) [complicated](https://x.com/brianleroux/status/1218252704348172288). Heroku simply ran on AWS and exposed an interface for deploying Ruby on Rails apps in one click (or one git push) rather than the maze of configuration that was required for AWS. Heroku didn't manage their own servers, AWS still did that for them, but they provided a better experience for the end-user than AWS could. They became the first Platform as a Service (PaaS) and quickly came to dominate among smaller companies and indie developers.

Heroku was acquired by Salesforce in 2010 and continued to expand its offerings. It became the gold standard for developer experience but then the Salesforce [rot](https://news.ycombinator.com/item?id=31313779) began to seep in. The company stagnated, eventually began to run into reliability issues, and today is a former shell of what it once was. Heroku is technically still around but for all intents and purposes Heroku, as a platform that aims to grow and capture serious market share, is [dead](https://lancecarlson.com/posts/heroku-is-dead/).

By 2020 it seemed clear that Heroku was dying and almost everyone was looking for what would come next. And things came. [Vercel](https://vercel.com/home) was founded in 2015, [Fly.io](https://fly.io/) in 2017, [Render](https://render.com/) in 2018, [Porter](https://www.porter.run/) and [SST](https://sst.dev/) and [Railway](https://railway.app/) in 2020. Many of these clouds entered the market with the explicit message that they were the next-generation Heroku and they all had a twist on what made them better. Crucially, all of them are Platforms as a Service with the core idea being they provide a platform for you to deploy and manage your applications while abstracting away the underlying infrastructure.

**This was the context in which this thesis was formed.** The impending death of Heroku could be seen years in advance and yet no obvious successor was crowned even in 2022, leaving us with a real gap in the market for a cloud that was simple to use for startups and individuals. The newer players like Porter, SST, and Railway were all in their infancy so it wasn't clear any of them would be successful and clouds like Fly, and Render were showing traction but still very young and limited.

Furthermore, I felt very strongly that trying to replicate Heroku was not the best way to achieve dominance and that all of these new players could be beaten. Below is my thesis for how and why that could be done. At the end I'll cover a little bit about what has happened since 2022 and how I think my thesis has played out.

## Building a Better Product

Beating the existing players and capturing market share is a simple formula really: build a better product than the incumbents.

{{< aside >}}
Sales and marketing matter, of course, but that's because execution as a whole matters when it comes to building a good company. When it comes to the Cloud and selling to developers it's a lot easier to succeed when your product is superior.
{{< /aside >}}

**Ultimately the quality of a cloud hosting product comes down to 3 dimensions: capabilities, convenience, and price.** As a startup it is difficult to be best-in-class in all 3 categories so how you prioritize those dimensions and solve for the main problems each one poses will shape the type of company and product you build. Every choice will have tradeoffs and those tradeoffs will determine how your platform stacks up against the others. Most players in the space focus on just 1 dimension but if you want to dominate you need to be best-in-class in a minimum of 2 of those dimensions and if you can be the best at all 3 then you may achieve the size of the hyperscalers.

Perhaps my most controversial idea is that if you make the right set of tradeoffs it may be possible to become best-in-class along all 3 dimensions. That's a bold claim but it's one I hope to convince you on and only one of the current companies is even headed remotely in that direction.

Here's how you win on all 3 dimensions.

### Capabilities: An Uphill Battle

Few entrants into the market try to compete with hyperscalers on capabilities because it's by far the hardest and therefore the worst angle to differentiate on. To truly have a capability they do not have usually means running your own servers and running your own servers is hard! Servers aren't software -- they break randomly, overheat, get disconnected, fail for mysterious reasons, and have to exist in a physical location. The sheer amount of work that goes into maintaining and running your own servers means you'll probably spend a lot of your time and resources doing that rather than building a good user-facing product for customers. What ends up happening is you have the bandwidth to beat the hyperscalars on a specific capability at the expense of everything else.

Some companies do try, though. Fly.io differentiated itself by making it extremely easy to deploy containerized applications to an edge network and therefore they run their own servers to create that edge network. And to their credit Fly got a lot of great traction and support but now they're going through a [tough patch with reliability](https://news.ycombinator.com/item?id=34742946) and their product no longer feels like it's on a breakout trajectory like it otherwise could have been. Fly beat the hyperscalars on edge capabilities (although they're all catching up) but in doing so they are more expensive, less reliable, and somewhat of a one-trick pony. If I don't care about edge computing -- and if you're building B2B SaaS you probably don't care about edge computing -- then Fly isn't a super compelling offer.

Of course, a cloud service that doesn't run it's own servers can also suffer on cost and reliability and it's possible that the only way to really make Fly's bet on edge computing work is to own the full stack. That's fine but then it means the success of the company is almost fully on the bet on edge computing and, personally, I think that's a bad bet.

There are exceptions to this. There are very narrow slices of capabilities that you can only serve by running your own servers and when those opportunities arise it may be a good move. For example maybe you want to provide compute in space or build an entire cloud of GPUs just for AI training or sell to a government that the current companies can't for legal reasons. This may be possible because the market is too niche (space) or because it's too new and you happen to have an edge by already owning a bunch of GPUs, or because of simple regulatory arbitrage.

In all these cases, though, when you try to compete on capability you'll build for a very narrow -- but potentially lucrative -- capability set at the expense of everything else and if your narrow capability set turns out to be lucrative enough then you can be sure the hyperscalers will use their buying power and economies of scale to provide competitive offerings eventually. It's for this reason that I think it's impossible for a startup to build a truly venture-scale cloud by focusing on hardware-driven capabilities and I'd be very hesitant about any startup trying to that from the outset.

Software-driven capabilities are a different story and we'll get to that later.

### Convenience: An Attractive Trap

The easiest way to beat the hyperscalers is through convenience and this is how nearly every PaaS enters the market. It's how Heroku did it and now it's how Vercel, Railway, Render, Porter, SST, etc are doing it. Take Vercel for example. Their whole cloud runs on AWS but they let you deploy automatically by simply pushing to your main branch on GitHub and they provide templates to make it extremely easy to automatically deploy common JavaScript frameworks. If you use their own framework, NextJS, they can automatically optimize things for you and make it easy to get an app deployed. Even their Edge Network is a simple wrapper on top of AWS Lambda but for inexperienced devs and small teams it's simply easier to use than Lambda because they're already using a framework like NextJS to write their code.

This strategy makes sense at a high level. Beating the hyperscalers on convenience and developer experience is a good idea because when it comes to those things the hyperscalers tend to be [dogshit](https://x.com/CleanPegasus/status/1820017552980111409). The hyperscalers are basically APIs over physical infrastructure but most companies care more about building their product and solving customer problems than they do about infrastructure so it's an attractive proposition if you can simplify that for them. There is a significant amount of money to be made doing this as shown by Heroku and now Vercel and it's the straightest shot to building a super valuable company.

But this strategy is a trap for a number of reasons.

Being more convenient and easy to use usually means being simple. When you look at most of these platforms they are entirely geared towards making the common path for many developers very easy so if you want to deploy a full stack web application it'll almost certainly be easier than just using AWS. But the moment you want to do something outside the beaten path then the simple platform makes it extremely difficult or impossible and as a company grows bigger the likelihood that they need to do something outside the beaten path grows. So what do you do if you're Vercel and your largest customers keep asking you to add more features and configuration options? Either you start to add those features and lose the simplicity that made you popular and gave you an edge or you tell those customers that you will not add those features and live with them churning. If you're lucky they'll seek out a hyperscaler just for that one thing you don't handle but in the common case they'll just move over everything to the hyperscaler because managing two clouds is more annoying that managing one and if you need a hyperscaler anyway then you're past the point of needing simplicity. **You either open yourselves to disruption by another platform that comes along and claims to be simpler and easier than you, or you lose your biggest customers because you couldn't provide the capabilities they need.**

This actually highlights another big problem with this simplicity-first model: the smaller the customer the more they benefit from simplicity. Your indie devs and small teams probably have one app and are using a common framework to follow the beaten path. The whole point of this model is to make the lives of these customers better but these customers are also the least able to pay. Most indie devs can't pay anything when they start out and small teams who are bootstrapping or just raised a little bit of money cannot pay a lot for just running their app. Heroku and Vercel and most of these tools all have generous free tiers because without a free tier it's quite difficult to win the hearts and minds of these core users. There's an entire cottage industry of influencers talking about how to build things fast and easy and if you don't have a free tier then you won't win over the students and hustlers trying to build their first product. In many ways the entire sales funnel for these simple PaaS offerings rely on a free tier to reduce CAC.

So you need a free tier and to do that you need to subsidize it by making enterprise plans more expensive. So what you've set up is a system where your customers start out for free and get up and running easy and that's great for everyone involved but as a few of your customers find traction and grow they go past the free tier and require paid plans and as they grow further those paid plans grow in price significantly. By the time they reach the size of a Series B startup they will be spending far more on your cloud than they would if they were on AWS. Eventually it crosses a threshold where it's literally cheaper to just hire full-time dev-ops engineers to manage an AWS instance than it does to use a "simpler" cloud. For reference Vercel Functions, which is just a wrapper on AWS Lambda, gives free-tier users 3600 GB-seconds of function time for free. That's great for anyone building a hobby project or just starting out. But once you get past the included free usage they charge $0.00005 per GB-second. AWS Lambda charges you immediately so it's harder to get started with if you can't put down a credit card but they only charge $0.0000166667 per GB-second. Vercel is charging 300% more than AWS just for some simplicity and it only gets worse because the more you use Lambda the _cheaper_ it gets. At the maximum usage tier Vercel is 375% more expensive per GB-second of usage than AWS.

This is great for Vercel because they get to make a bunch of money and offer a free tier to their smallest customers which reduces CAC but if you're a startup that finds some success you're going to end up looking at your Vercel bill wondering if it's really worth it to pay over 300% more for the same infrastructure while having fewer capabilities. Between the backwards pricing model and the lack of functionality platforms that focus on simplicity end up **directly incentivizing their most successful customers to churn.** This is the biggest limiting factor for most of the PaaS providers today and it's a dynamic that needs to be resolved if you want to create a new cloud that can eclipse all of the existing non-hyperscalers.

### Price: A Common Painpoint

If you speak to people who use the Cloud the most common complaint is the price. Early on in the cycle of Cloud adoption there was a lot of talk about how the Cloud was cheaper for companies because they didn't need to buy hardware and hire all these people to manage servers. Most of that sentiment has gone away because it seems that for every individual you could fire that was managing physical servers you now need to hire a DevOps engineer and on a per-unit of compute basis, owning your own server is far cheaper than renting from someone else. Renting just happens to be more convenient than dealing with physical servers so the same way that Vercel is more expensive than AWS because it's more convenient, AWS is more expensive than physical servers because it's also more convenient. It's also elastic and you can scale your compute nearly instantly whereas with physical servers if you get a massive spike in traffic you need to go buy those extra servers, wait for them to ship, install them, etc. And if you want to manage peak loads you then have to own extra servers even when you don't have peak load which is wasteful. With the Cloud you can just pay for extra compute when you need it and then scale back down when you don't. Still, everyone agrees on net the Cloud is expensive.

The problem is, if you're not going to manage your own servers and you just want to build a PaaS on top of AWS then you can't really charge cheaper prices because that would not make any economical sense. Even if you are going to run your own servers you won't have the economies of scale that AWS has so you also probably won't be cheaper than AWS. It's for this reason that I don't think _any_ non-hyperscaler claims to be cheaper than AWS apart from free tiers for small users. And when it comes to free tiers most don't even come close to the free credits AWS gives out like candy. Just about any company can go and [immediately get $1,000](https://aws.amazon.com/startups?lang=en-US) in free AWS credits and if you're part of an accelerator or have any institutional investors it's usually trivial to get up to $100,000 in free credits. So while not advertised as an explicit free tier AWS does have free perks and it's basically impossible for any competitor, even other hyperscalers to compete on price. If you _could_ find a way to compete on price you'd have a massive competitive advantage.

Pricing is the most common complaint and I identified it as one of the main wedges when we started Antimetal. There's a couple ways you can handle pricing to be competitive with AWS. The first way is to let the user bring their own cloud like Porter and SST who don't even have their own cloud and just orchestrate everything within your AWS account. Because it's your account you have full control and if you have free credits from AWS you can just apply them automatically. This is a really good way to pass on cheaper hyperscaler costs to your customers but it means it's way harder to generate usage-based revenue which is how most of the revenue is made for someone like Vercel.

There's also another dynamic at play. There's the absolute price that something costs such as that calculation above around Vercel vs AWS per GB-second pricing but then there's also the predictability of pricing. So often when people complain about the pricing of the Cloud they are specifically talking about how it's really hard to predict the bill you'll be stuck with at the end of the month. Because billing in the Cloud is usage-based and the whole point of the cloud is that you can scale up and down your usage with ease it's pretty common to end up paying way more than you thought you would have to. It doesn't take very much searching to find numerous [horror stories](https://news.ycombinator.com/item?id=22719573) of small teams or [indie hackers](https://www.reddit.com/r/nextjs/comments/12dngvg/small_mistake_leads_to_3000_bill_from_vercel_and/) hosting a small project that goes viral overnight leaving them with a bill in the tens or even [hundreds of thousands of dollars](https://x.com/zemotion/status/1798558292681343039).

There's a hidden assumption in here that I'll posit: **companies generally care more about the predictability of cost than the absolute number.** If you can clearly telegraph that a company will pay $X over the next quarter they will probably be happier with that than paying an unpredictable $Y even if Y < X. The hyperscalers generally have some alerts you can set on spend so that when you reach a certain threshold in your budget it sends you some emails but as far as I'm aware there's no hard limits you can set in AWS or any of the clouds to make sure you do not overspend. The spend management experience in the cloud is abysmal.

## New Trends: On Prem

Those were the three big dimensions that really stood out to me back in 2022 but since then there are new trends as well. Specifically how more companies are moving back workloads to their own private clouds. Dropbox is probably the highest profile company to [move off of AWS ](https://www.wired.com/2016/03/epic-story-dropboxs-exodus-amazon-cloud-empire/) and they did it quite a while ago. Since then DHH and Hey have made a big stink of their [cloud exodus](https://world.hey.com/dhh/we-have-left-the-cloud-251760fb) and recent reports claim that the vast [majority of enterprises are planning doing the same](https://datacanopy.com/back-to-private-cloud/). This is almost 100% driven by cost. The cloud _is_ more expensive but it's really convenient and elastic. The thing is most companies don't need super elastic compute! You'd be surprised how even some of the biggest companies in the world really don't get as much internet traffic as you'd think and usually if there are spikes in traffic it's due to predictable demand surges around holidays or other special events.

What I predict will happen is that most companies will begin to move some core workloads off the cloud and use the cloud for the workloads that need hyper-critical reliability or are extremely variable in their usage. This needs to be taken into consideration when attempting to build a new cloud platform. Today some of the hyperscalers allow you to connect their public clouds to your private cloud so you can manage workloads across all of them. I predict this sort of functionality will become increasingly important for big companies and I think this type of hybrid cloud will be common enough that a unicorn can be built on catering to this model.

To my knowledge, only [Oxide](https://oxide.computer/) seems really well positioned to capitalize on this phenomenon as well as the traditional legacy server vendors. The big takeaway in this new dynamic of multi-cloud architecture is you'll need a hardware component like Oxide but also a software component that can make it super easy to orchestrate resources across the multiple clouds. I believe Oxide is trying to also address the software side of things but it's not clear to me if they'll be able to do both because any software solution that's successful probably won't be tied to a specific hardware stack.

## Putting It All Together: The Right Tradeoffs

Okay so I explained these different dimensions and how some of the players deal with them but I mostly just described some of the big problems without describing my solutions. How did I want to approach it with Antimetal? My full vision was a PaaS platform that sat on top of the hyperscalers similar to a Heroku or Vercel. I wanted it to be extremely easy to get started with but contain all the capabilities necessary for enterprise companies. I wanted it to make _more_ sense for an enterprise team than any other PaaS while not being too complex for small teams. And critically, I wanted it to have the best cost-management experience out of any cloud.

On the pricing side I wanted to implement price controls where a customer could set soft and hard limits on spend for various resources and groups of resources. This would allow us to create an experience where we can show them a distribution of possible spending scenarios with upper bounds on spend for upcoming quarters. These limits would also have powerful rules attached to them where you could decide what to do as the limit was approached whether it was to send alerts, keep scaling under certain circumstances (maybe there's just a spike of traffic for 2 days), or to just let the service fail under load.

The second way I wanted to tackle pricing was to take advantage of AWS reserved instances. Reserved instances is where you pay in advance for a certain amount of compute in exchange for discounts up to 60%! Then when you use compute later you can do it from the reserved instance credits you have. The beautiful part about this is reserved instances are relatively low risk, especially as your compute needs grow, because you can resell unused credits. For an individual company just trying to build a product this might be more complexity than it's worth but for a PaaS it makes sense to reserve the compute for a discount and handle that complexity intelligently. What this unlocks is that even if we were to price our product at the same price as AWS' on-demand rate we could still have 60% margins. That's not as good as the 300% that Vercel is getting but it doesn't need to be for the services where you're simply wrapping AWS. I'll explain how we can get higher margins on other services in a moment. The end goal of these two things, though, is we could have a PaaS that basically has price parity with AWS while providing a better cost management experience than any cloud on the market today.

When it comes to convenience I wanted an experience that worked for small teams that want simplicity and enterprise teams with complex and bespoke needs. I see only one way to solve this: code. Almost every PaaS platform like Vercel or Railway or Render all revolve around a similar core workflow: you create an account on the platform, you click some buttons to connect your GitHub account to the platform, then you press a big "Deploy" button. In the world of enterprise almost no one is deploying software like that.

Big companies use Infrastructure as Code (IaC) tools where you use code to specify of the infrastructure you want whether it's servers or storage or domain names and then you provision infrastructure based on that specification. If you want to add a new server you generally update the spec and then push that change to the Cloud. There's a couple reasons this is preferable to clicking around in a dashboard. The first is that it's reproducible. Because it's code that's written down, if all your infrastructure gets deleted for some reason you could in theory just run the code again and bring your cloud back to the desired state. This is super useful if you want to make sure that your development or test environment matches your production environment and stays in sync. Another reason this is helpful is once it's written down you can version it automatically because your codebase is already being versioned anyway. If someone makes a change that breaks some infrastructure in theory you can find which change created the break and then rollback that change easily. And lastly, if you want to change a bunch of resources all at once -- such as changing all your bucket names to have a certain prefix -- you can do that a lot easier in a code editor than clicking around a dashboard.

Okay, so what? Well, if you want a platform that works for big teams you need to have first-class support for IaC and it just so happens that if you want to allow multiple levels of complexity in one product then code is the best way to do that! Let's say you're a small team and you literally just want to deploy your NextJS app. A PaaS that offers IaC might let you do that like follows:
{{< code >}}

```JavaScript
const domain = new CustomDomain({
	...
})
const site = new NextJSApp({
	name: "my-next-app",
	domain: domain
})
```

{{< /code >}}

That's pretty simple! That would be very easy for any small team or even an individual developer but let's say now you're working on a big team that's using NextJS and wants a lot more control over how it's deployed. Well you could do something like:

{{< code >}}

```JavaScript
const domain = new CustomDomain({...})
const queue = new Redis({...})
const cdn = new CDN()
const site = new NextJSApp({
	name: "my-next-app",
	domain: domain,
	functions: {
		runtime: "edge",
		timeout: "15m",
		memory: "512mb",
	},
	cdn: cdn,
	queue: queue
})
...
```

{{< /code >}}

Or you can go even lower level and have more control:

{{< code >}}

```JavaScript
const vpc = new VPC({...});
const storage = new DurableStorage({
	size: "16gb",
	...
})
const vm = new VM({
	memory: "4gb",
	vcpu: 2,
	storage: storage,
	vpc: vpc,
	scaling: {
		...
	}
})
```

{{< /code >}}

This is all half-baked pseudocode to illustrate a point: when you're specifying things in code you can have multiple interfaces for the same thing and you can make one interface have multiple levels of complexity. You can make it so if all someone wants to do is tell you the domain to host their app on you can figure out the rest for them just like Vercel or Render would do but if they want more control they can just start configuring more of the options. You can also have a concept of primitives that build up to higher level concepts. For the power users in big companies you give them primitives to configure VM's with exactly the memory and compute power they want and allow them to configure all the networking rules, etc. For the simpler user you give them a construct like `NextJSApp` which is simple but under the hood it just provisions a VM with NodeJS and handles the configuration for them.

This is such a powerful way to manage infrastructure that it's a real shame more PaaS platforms don't do this by default. The way I see it, this _has_ to be a first class citizen of a platform to be viable for enterprise customers but I wanted to go as far as making our dashboard completely read-only. I was not going to let people provision or deploy things by clicking on a dashboard and instead provide super easy recipes and starter templates and helpers with a CLI for all the common frameworks. It's kind of funny that most PaaS platforms don't do this. I wonder if they just think their target customers would be scared off by code but for anyone who's done any sort of serious programming they'll know this is preferable to clicking around a dashboard. You get type-safety, the power of your editor's auto complete, and every other benefit of IaC.

I believe any cloud that started with these two solutions for convenience and price controls would be competitive very quickly. It would be a platform that can scale and work for large teams as well as small ones.

But it doesn't have to end there. Let's talk about capabilities. Earlier I mentioned how difficult it is to compete on capabilities because it usually means running your own servers and dealing with hardware is hard. You can however compete on software capabilities and improve the margins by doing so.

Let's look at an AWS service like RDS (Relational Database Service) as an example. RDS is how most companies run their database on AWS but under the hood it's really just a combination of other AWS services. It uses their ec2 VMs, their storage, and then some software to orchestrate all that to make it useful for database management. I don't say that to mean it's a simple service -- RDS is incredibly complex and extremely valuable -- I am simply illustrating that just how you can combine primitives in the IaC spec you can combine cloud primitives with software to create new services and capabilities.

Every SaaS company needs a number of capabilities that are serviced by various other entire companies but they don't need to be. You can have an Auth service and an Email service and a feature flag service, etc.
{{< code >}}

```JavaScript
const emailProvider = new cloud.Email("MyEmail", {
	sender: "example.com",
	dmarc: "v=DMARC1; p=quarantine; adkim=s; aspf=s;"
});
```

{{< /code >}}

Use the hyperscalers for their base infrastructure and accept lower margins when wrapping that but write your own software to power higher-level services and charge more for those. Simply wrapping AWS Lambda? Don't mark it up by 300% like Vercel. But do you have an Auth service that customers can provision which is just a number of Lambda functions under the hood for performing token exchanges? Charge more for that.

You can create a platform where any sort of primitive a SaaS company might need they can have and it would be as easy for them to use as simply adding another few lines to their infrastructure spec. And because these services aren't simple wrappers over AWS you can charge more for them. Eventually you have a cloud that isn't just the easiest and best place to deploy your code but also the best platform for building a company.

You don't even necessarily have to build all these services yourself! AWS has a concept of a marketplace where you can buy software but it probably doesn't work how you expect. You can buy software there but it's usually just a funnel to get you into the sales org of the respective company. You don't actually get the software in your own AWS account you usually just get the lowest-tier license. This model can be improved upon. Any SaaS app that is hosted on your cloud could technically be made into a standalone service because it would exist as an IaC spec which is a combination of your core primitives plus some extra software on top. These SaaS providers could then list their apps on a marketplace and anyone else using your cloud could buy it and **have it deployed to their own accounts.**

This happens today when enterprise companies ask SaaS vendors to self-host their products and I've seen multiple companies spend years refactoring code to enable that and usually even dedicating a percentage of ongoing engineering time to just maintain and support those self-hosted instances . Imagine a world where standing up a new service in your own cloud tenant was as simple as signing a contract on the marketplace. The cloud could manage the contract, the payment, and the provisioning. The cloud could expose granular cross-tenant permissions so that support engineers from the vendor could go modify or observe that specific service in the customer's tenant when appropriate.

I really think this is an underrated effect of all of this and it's something that should really be it's own blog post. To really understand just how impactful this would be you have to be able to think about 2nd and 3rd order effects of a platform that does everything with IaC and provides the right primitives to combine. If it became extremely easy to provision complex SaaS services into customer tenants while still enabling support and DRM and contract enforcement you could drastically change the business model for the tech landscape. Companies could change how they do procurement and sales to be far more streamlined and efficient. If, as a SaaS provider, you're not running the compute for your customer you can experiment with different business models because your COGS would be far lower. Even the way apps are built could be simplified if you knew that the app would always run in a tenant isolated by the cloud itself. You could even experiment with things like Software as a Product instead of as a Service because in theory there's no reason different tenants can't be running different versions of the same product meaning it would be viable to charge people one-time prices for different releases. Many things would change if a cloud platform was capable of supporting this.

This is the only way I can imagine a PaaS that doesn't manage its own servers to compete on all dimensions. There's even some things I left out. For example, I think customers should be able to bring their own cloud so they can take advantage of better cost savings and they don't need to churn just because they got bigger. I also wanted to allow the connection to GCP and Azure as well as AWS and make it relatively seamless to manage infrastructure across them which would be useful for giant companies that are adopting a multi-cloud strategy. Once again, IaC makes that easy for the user and this could even allow for private cloud integration as long as a company's private servers expose a certain interface.

Ultimately these are not easy ideas and anyone who tries to build something like this needs to be prepared for a long road but in my opinion it's the best way to build a generational company in the cloud. There are certainly going to be pitfalls and things that make this approach extremely difficult but in my opinion it's really the only way to get the optimal tradeoff along all 3 dimensions and I think it's the tradeoff that allows someone to build a better cloud than anything that exists today.

## How It's Playing Out

Well, Antimetal went in a slightly different direction than what I originally had envisioned but I think that was smart of them. To implement price controls and create a better spend experience in the way I envisioned I needed to have a platform in the first place. Matt, my ex- cofounder, found a better way. He said to hell with having an actual cloud and just went ahead and built a platform that sits within your own cloud and orchestrates reserved instances for you so that you can get cost savings. This was a genius move because it meant they could avoid all the complexity of building a PaaS and just focus on selling a product where they only make money if they save their customer money. That tends to be an easy business model to sell and now they are installed in hundreds of customers' clouds earning their trust and gaining momentum. I don't know if they want to even branch out into the PaaS model at this point and I don't even think it would make sense for them to do so but they would be in a pretty good position if they tried.

Besides Antimetal, it appears that Vercel is winning in the short term as the PaaS of choice for many. I'm skeptical of Vercel, however. The vibes feel off, React and NextJS seem to be undergoing somewhat of a schism within the community, and I think many people feel that Vercel does not tend to act in [good faith](https://x.com/thdxr/status/1780710481084432849). They are in the lead amongst PaaS platforms but $100 million in revenue is far from $100 billion in revenue and I still fundamentally think the way they've created their product for ultra simplicity has put a very big ceiling that will be hard for them to break out of. Most companies that will pay a lot for cloud hosting do not care about 1-click deployments through a dashboard.

In my opinion edge computing is also turning out to not be a really good bet and I feel validated in that. There are some operations that work well on the edge but any operation that needs to rely on a database in a central location nullifies the entire benefit of the edge. There are new serverless database offerings that are growing in popularity, though, so it's possible that this calculus changes over time. Still, if you're building a B2B SaaS then 30ms ping vs 120ms ping isn't the difference between your company's product getting customers or not. It seems quite clear to me that if performance really matters for your application you're better off just doing local-first with a smart sync engine than using the edge and if performance doesn't matter that much then you don't need the edge.

And that brings me to SST which is the only player in the space building something that aligns with what I had in mind. This is not an ad for SST I just get excited about it because their founders seem to really ["get"](https://x.com/thdxr/status/1830990051322237260) what I had in mind 2 years ago. Remember that example code snippet I used up above to illustrate how you could theoretically let someone send emails from within their product? That's actually a [code example](https://sst.dev/docs/start/aws/email/) from SST! To deploy any infrastructure with SST you need to define it in a type-safe IaC specification built on top of the [Pulumi](https://www.pulumi.com/) engine. They've created shims on top of AWS and Cloudflare providers in Pulumi to allow for a simpler interface for many of the services while still letting you set basically any complex configuration if you want to.

They also let you seamlessly deploy to multiple clouds at once because of their use of IaC! Here's a snippet creating an email provider in AWS and configuring it's dns to use Cloudflare. Do you know how wild it is to be able to deploy this sort of configuration this easily?

{{< code >}}

```JavaScript
export const email = new sst.aws.Email("Email", {
  sender: domain,
  dns: sst.cloudflare.dns(),
});
```

{{< /code >}}

And because they're using Pulumi and simply deploying resources to your own AWS instance any capability that they do not provide with the SST provider you can still use with other Pulumi providers. You can even orchestrate your other SaaS tools like Stripe and then link them to your resources. No fiddling with the Stripe dashboard to set up a new webhook anymore.
{{< code >}}

```JavaScript
import { domain } from "./dns";

sst.Linkable.wrap(stripe.WebhookEndpoint, (endpoint) => {
  return {
    properties: {
      id: endpoint.id,
      secret: endpoint.secret,
    },
  };
});

export const webhook = new stripe.WebhookEndpoint("StripeWebhook", {
  url: $interpolate`https://openapi.${domain}/hook/stripe`,
  metadata: {
    stage: $app.stage,
  },
  enabledEvents: [
    "payment_method.attached",
    "payment_method.detached",
    "payment_method.updated",
    "product.created",
    "product.updated",
    "product.deleted",
    "price.created",
    "price.updated",
    "price.deleted",
  ],
});
```

{{< /code >}}

I've never seen ergonomics this powerful from a PaaS but it's really an obvious conclusion when you think about the 2nd and 3rd-order effects of IaC and the cloud.

Still, there are open questions to me about their success. For one it's not clear to many how they make money because their entire platform is open source and they run all the services in your cloud so they don't host anything themselves. From what I gather they charge for parts of their [Console](https://sst.dev/docs/console/#pricing) product which makes it easy to view and manage deployments (also, notice how their pricing gets cheaper the more you use the product, just like AWS). This is pretty limited monetization, though, and so if I had to guess at revenue I'd imagine they're lower than the competitors. This means they're not raising tons of money and instead they seem to want a lean and independent team with a long time horizon. I personally like that style of work but building a cloud platform that can do a billion in revenue one day is a really hard thing to do and part of me wonders if it's just too _big_ to do if you aren't going to go the typical VC hyper-growth route. Then again, it's possible that by taking the approach they're taking they can more easily avoid the local minima that the other platforms fall into. Only time will tell.

The last two things they have going against them are that they are very focused on the serverless aspect of the cloud. This _may_ be a good long term bet and I sometimes marvel at how simple it makes things when digging through example apps built with SST but at the same time there's so many open questions around serverless. I hear so many horror stories about people accidentally racking up bills, misconfiguring lambdas and getting charged for IPs, etc. I want more confidence that what I'm doing with serverless is best practice and I want more insight into how much things will cost and how to avoid blowing my own foot off. Part of this might just be better documentation or maybe it is creating primitives that let you set spend limits but overall I do wonder if this positioning holds them back. It should be noted you don't _need_ to use lambdas to use SST and they support deploying containers and, again, you can always deploy raw ec2 instances using Pulumi but still most of their branding is around serverless so they will be associated with the vibes of serverless and right now it seems to be a buzzword with mixed feelings amongst devs.

And the last big problem facing SST is that it _is_ too complex for beginners. I can't imagine how many users they lose at the top of the funnel when those prospects realize they need to create their own AWS account, [configure it a certain way](https://sst.dev/docs/aws-accounts/), write code, and only then will they be able to try SST. That's too much overhead. SST should really create a shared managed tenant where someone can go to the SST website, create an account, connect to a GitHub repo and then have a default SST spec opened as a PR in that repo automatically and deployed to a common AWS instance that SST manages. That would allow them to have an experience on par in simplicity to Vercel and it would give them the opportunity to charge users for more than just support. Most users would eventually bring their own cloud and that's okay! But you can't underestimate the power of a sales funnel like that.

So two and a half years later the space is still as fascinating as it was before. It's matured a lot and there's a ton of really interesting players but SST is the only one that has me really excited, especially with the release of their v3 platform, Ion. I'm also keeping my eye on Oxide because they could potentially be the biggest beneficiary to the movement to repatriate workloads but guess what? The best way to help companies orchestrate infrastructure across multiple clouds, including private ones, happens to also be what SST is doing. Ultimately I think it's still anyone's market and no one is invincible and I'm extremely excited to see how it plays out in the coming years.
