---
title: "AI requires resetting the frame"
slug: "resetting-the-frame"
date: 2025-08-03
draft: false
description: "In a world where intelligence is too cheap to meter, is the generic chat box the final UI? I argue that the best products of this generation will go deeper, and reset the frame entirely on workflows."
thumbnail: null
---

Every company in the world is thinking about how to add AI to their existing products and new products built from scratch. With intelligence too cheap to meter, you'd think we'd be seeing deep integration into existing products and novel user experiences but instead we find that most companies are converging on the same [simple](https://www.figma.com/make/) [app](https://www.airtable.com/platform/app-building) [builders](https://www.canva.com/).

<div class="two-columns">
{{< figure
src="/images/figma_make.png"
alt="Figma make chatbox">}}
{{< figure
src="/images/canva_make.png"
alt="Canva app builder">}}
{{< figure
src="/images/airtable_make.png"
alt="Airtable app builder">}}
{{< figure
src="/images/codegen.png"
alt="Codegen">}}
</div>

In a way, the chatbox is the pinnacle of UX design: a dead simple canvas with infinite possibility. Why even bother with product design if you can just talk to an agent and ask it to make the company's stock go up by 10% next quarter?

Maybe we get that future but, for now, I'll take the other side of that bet. The products that define the next decade will be those that deeply integrate AI into their user experience beyond just a chat box. These products will have designers deeply embedded in engineering and product teams, working closely with users and builders to re-think fundamental workflows to build novel user experiences.

## Infinity as a Constraint

AI provides too many open-ended possibilities, both today and for the future. It's difficult to figure out how to deeply integrate AI into existing products and workflows in ways that will 10x the user experience and it's even more difficult to know if that integration will make sense in the future.

A year ago the LLM models on the market had a fraction of the power and intelligence of the current models. It's wise to expect another jump in capabilities in the coming years -- or not. No one really knows where things are headed and the massive error bars around any prediction regarding LLM progress makes it difficult to take big bets on an opinionated product direction. Any work to deeply integrate an LLM today may find itself outdated in a year, and actually hindering the adoption of a newer, better model.

Companies are shipping chat boxes because they don't know what else to ship. The chat box is unopinionated and becomes more powerful as the models become more powerful.

And yet, these models aren’t infinitely capable. The chat box is oppressive in its limitless possibility. Perhaps if the models were capable enough to handle infinity it would be a more respectable user experience but as they stand today, AI benefits from constraints and guardrails, as do humans. Users don't want infinity, they want well-designed tools, and constrained sandboxes that allow them to use those tools effectively to solve their problems.

It's these unopinionated chat boxes that will get steamrolled by the models as they improve and it's the products that take an opinionated bet and provide a deeply well-thought out user experience that endure deep into the future. So how can we intelligently take that bet?

## Functional Ergonomics

Functional ergonomics is all about how easy it is to do what you want to do as a user. The ergonomics of your product is the most important factor for designing a great user experience.

This means a lot more than having a simple or pretty UI. Having good ergonomics means understanding your users and their problems and tailoring the software to them.

- If your users handle large datasets, do your data tables support bulk actions?
- If you're building a developer tool do you have keyboard shortcuts? Do you integrate into existing stacks easily?
- Do users frequently open multiple tabs just to compare data in separate deeply-nested, normalized views?
- If it's a collaborative product, do you support multiplayer editing?

_This_ is the heart of good UX and it's, unsurprisingly, the least likely to be solved by formula. Performance can be measured easily, aesthetics can improve with some basic principles, but it's up to you to do the hard work of understanding your users and their problems and then make it easy for them to solve their problems.

When companies like Airtable or Figma release a chat box to generate some vibe-coded slop, they're being lazy. Both of these companies have become billion-dollar businesses off the success of wildly novel and complex products that re-defined the user experience for their respective workflows. Instead of adding depth to their existing products through AI, they've shipped the lowest common denominator.

## Resetting the Frame

Great functional ergonomics comes from resetting the frame. The opposite of the chat boxes are the [horseless carriages](https://koomen.dev/essays/horseless-carriages/) most companies are building by shoving AI into existing workflows as a tacked-on sidebar or chat overlay.

At [Mesa](https://mesa.dev) we're building real-time collaborative code repositories that allow engineering teams to use AI agents throughout the SDLC. We started by building a Pull Request review agent and UI but as agents continue to get better we keep asking ourselves: _“will pull requests even need to exist as a concept in a couple years?”_

The current frame says: _how can we use AI to review pull requests?_ Resetting the frame says: _do pull requests as a concept even make sense anymore?_ Users don’t care about pull requests, they care about change control. Enforcing quality, security, and organizational standards at the point where changes are introduced into the system. With AI, can we achieve these goals without pull requests altogether?

The biggest challenge in product design today isn't figuring out how to design a specific workflow, but figuring out which workflows even need to exist. Every product is asking these questions now. The lazy answer is to build a general purpose chat box, but the products that define the next decade will take an opinionated bet and build products with emergent properties that become more than just a great LLM and great traditional software.

At Mesa we're building a deep user experience. We have a strong thesis on where these models are heading and we are building the best possible user experience for humans working with these models in the realm of software development. If you're a designer or engineer and you want to take part in resetting the frame for software development, reach out: oliver@mesa.dev
