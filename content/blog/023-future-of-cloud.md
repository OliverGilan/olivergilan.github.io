---
title: "Future of Cloud"
slug: "future-of-cloud"
date: 2024-09-05
draft: true
description: ""
thumbnail: null
---

Matthew Parkhurst & I founded Antimetal in April of 2022 to bring to life a vision I had around "The Cloud." I left the company to focus on my health shortly after it's been fascinating to watch how my thesis has played out over the past two and a half years. I haven't talked in-depth about my vision since then but I figure now is a good time to put it all in writing because I feel that many parts of my thesis have been validated and yet there's still a lot of opportunity for someone to go implement it.

Cloud hosting is a huge market. Won’t go deep into the numbers but the top players are making hundreds of billions and there’s many second tier players making hundreds of millions.

One can build a company that generates hundreds of millions in revenue by capturing just a fraction of that market share, making it an attractive target for a venture-backed business.

#### Market Context

To fully understand the players in the cloud you need to understand it's history. AWS was one of the first, then GCP, then Azure in the years from 2006 - 2010 (IBM and Oracle founded their clouds a couple years after). These companies built out their own data centers and ran the physical servers and exposed that hardware through their cloud APIs.

They owned the full stack from hardware to software and grew rapidly. Today they own the majority of internet traffic and are the biggest players in the commercial server space.

These clouds are commonly referred to as _hyperscalers_ because in theory, they have enough compute in their clouds to meet the needs of any given company. They can scale workloads on demand and as a user of them you can practically assume that there's no limit to how much you can scale as long as you can pay.

But then another group of clouds started to pop up. Heroku was founded in 2007 and Digital Ocean in 2011. Digital Ocean ran (and still does) its own data centers just not at the scale of the original players. Heroku, though, simply ran on AWS and exposed an interface for performing common actions. The value proposition for both was how much _simpler_ they was to use than the hyper-scalers. Heroku made deploying Ruby on Rails apps literally one click (or one git push) rather than the maze of VPC networking configuration for AWS and Digital Ocean let you spin up VMs with ease.

Both of these clouds exploded in popularity and it seemed like every startup using Ruby was deploying onto Heroku. It was the darling cloud and provided the best developer experience by far. But then it was acquired by Salesforce in 2010, and while it didn't happen right away, the Salesforce [rot](https://news.ycombinator.com/item?id=31313779) became unavoidable. For all intents and purposes, Heroku as a platform that aims to grow and capture serious market share, is [dead](https://lancecarlson.com/posts/heroku-is-dead/).

By 2020 it seemed clear that Heroku was dying and almost everyone was looking for what would come next. And things came. Vercel was founded in 2015, Fly.io in 2017, Render in 2018, Porter and SST and Railway in 2020. These clouds, like Heroku, are what is considered a Platform as a Service as opposed to the hyper-scalers which are Infrastructure as a Service.

The idea is they provide a platform for you to deploy and manage your applications while abstracting away the underlying infrastructure. AWS on the other hand can be extremely complex and require you to set up virtual networks, routing rules, etc. similar to how you would with real servers.

This was the context in which this thesis was formed. The end of Heroku left us with a real gap in the market for a cloud that was simple to use for startups and individuals and in 2020 there was no crowned successor. The newer players like Porter, SST, and Railway were all in their infancy so it wasn't clear any of them would be successful and clouds like Fly, and Render were showing traction but still very young and limited.

I felt very strongly that most of these players could be beaten and below is my thesis for how and why that could be done. At the end I'll cover a little bit about what has happened since 2020 and how I think my thesis has played out.

#### Building a Better Product

Capturing market share really comes down to building a better product than incumbents.

To build a better product you need to do the things they aren’t today as well as predicting the needs of customers tomorrow.

I believed there was an opportunity for a better product that no one was building at the time. Today the landscape has changed a bit but I still think it's the case that most companies are building the wrong thing.

Building a better cloud hosting solution comes down to where you fall on the scale of convenience, capabilities, and price. As a startup you probably cannot do all 3 and so it all comes down to tradeoffs.

To build a solution that beats out the competitors you need to understand the tradeoffs and their implications deeply and choose the right combination of solutions.

You also need to understand where the market came from and where it's going.

#### Capabilities: An Uphill Battle

The worst angle to try to compete on is capabilities, or in other words, the actual server infrastructure. It’s not that you can’t beat the hyperscalers on this (although you probably won’t), but it’ll most likely require sacrificing convenience and price and you still won't be able to provide full capabilities.

Companies like Fly.io want to beat hyperscalers on capabilities, specifically the capability to provide an edge network for your compute. To provide these capabilities they partner with various data centers around the world and run their own servers out of them. This let's them control the full stack of software around the vm's they give to users and where those servers are placed geographically but the problem explodes in complexity and cost. Fly.io is notoriously going through a [tough patch with reliability](https://news.ycombinator.com/item?id=34742946) and dedicated compute instances on their platform tend to be far more expensive than any of the hyper scalers.

Of course, a cloud service that doesn't run it's own servers can also suffer on cost and reliability and it's possible that the only way to really make Fly's bet on edge computing work is to own the full stack. That's fine but then it means the success of the company is almost fully on that bet (and personally, I think that's a bad bet).

The moment you want to operate data centers you need to hire big teams of smart people. You need to work with hardware and suppliers, and track inventory. The whole nature of the business changes. It doesn't mean it's a bad thing to do -- I imagine a sufficiently advanced cloud platform wants to do that eventually to totally optimize its margins but chances are you will not be able to do it as reliably and cheaply as the hyperscalers can as a small startup.

#### Convenience: An Attractive Ceiling

The easiest way to beat the hyperscalers is through convenience and this is how nearly every PaaS enters the market.

There is a significant amount of money to be made doing this as shown by Heroku and Digital Ocena, and then later Vercel, etc. even when sacrificing costs. Heroku was far more expensive than AWS and so is Vercel but if you’re a small team then paying more for these services is still cheaper than hiring someone to manage the complexity of a hyper-scaler cloud.

But most players sacrifice capabilities for convenience and that’s a mistake. As companies grow their needs change and become more complex. Whether it’s for compliance or more granular configuration or something one-off to support a big customer, they will run into a problem that the limited IPaaS doesn’t support. At that point they’ll have to partially switch to a hyperscaler but by then (or soon after) the cost of hiring people to manage the complexity of aws is less than paying the higher prices for hosting. Once they do that math they’ll just move over to the hyperscaler entirely. **You’ve created a business structure that disincentivizes companies to grow with you.**

#### Price: A Common Painpoint

#### New Trends: On Prem

The new extension to saving on cloud costs is moving back on prem. This will be a sufficiently common phenomenon that a unicorn can be built on this model.

Enabling hybrid allows you to compete on the one capability the clouds can’t (location) as well as on price. It’s a good model but hardware is very difficult.

Most companies will have hybrid workloads which enable much cheaper and **more predictable** costs.

Only Oxide seems well positioned for this. There will be a software and a hardware component to making this work. Oxide can capture the hardware side but it's not clear if they can capture the software side. It's not even clear to me if they should try.

#### New Trends: Self Hosting & Procurement

Will write more about this but the trend since Notion and some of the early PLG companies has been all about unbundling. Only Rippling is explicitly trying to bundle.

A cloud platform has an opportunity to bundle services unlike any other business. This can be through managed services from the cloud itself but perhaps a better angle is a marketplace approach. Once you have full IaC for everything and modular architecture it's really just a hop skip and step from selling all SaaS as native components to the cloud itself.

This could fundamentally alter how things like self-hosting, procurement, COGS, security, etc. work. This would turn the cloud into the one-stop shop for basically all the software that a tech organization could need. In this way, you will have capabilities that no one else will have.

#### How Things Are Playing Out

Vercel has won in the short term but I still think they have strong headwinds working against them. In many ways the grand vision I espouse which could be the biggest company is unnecessary. It's possible that a venture scale business is doable even with a low ceiling if you're DX is good enough and you charge enough.

However I'm not sure Vercel has a good long term future. NextJS is on shaky ground in the community right now and most of Vercel's success comes from young engineers and companies using NextJS. They still have that low ceiling and it's not clear to me if they can really change that given the direction they've taken. It's possible that their balloon could deflate fast if they lose the mandate of heaven amongst influencers.

Edge computing has turned out to not be a big deal and I feel pretty vindicated about that. I think it's a bad singular bet for a company like Fly.io but it can be a good addition to an existing cloud. Ultimately edge just isn't super workable and for the majority of business applications its totally irrelevant.

Many of these providers that were extremely young in 2020 seemed to be carving out their own niches and growing respectably. It's hard to know which ones will have venture-scale returns but it seems many of them are successful businesses in their own right.

#### SST

SST seems to be the only player that is approaching the problem directionally the same way I would.

Still, there's massive open questions around their success. They seem to be a company that prioritizes extremely lean, slow growth. Their team is small and their approach is unique. It seems like the only way they make money is through support so it's not clear to me how successful they actually are or what their rate of growth is. It feels, on the outside, that they are building a lifestyle business and I wonder if that's a viable strategy for a market as big as this with the stakes as high as they are.

Their biggest failure with DX is onboarding. Using SST requires an AWS account and configuring it so that SST can work properly. There's a lot of setup that needs to happen.
