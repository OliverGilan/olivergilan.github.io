---
title: "AI Hasn't Helped Most Engineers (yet)"
slug: "ai-hasnt-helped-most-engineers"
date: 2024-12-18
draft: false
description: "Most of the productivity gains from AI and other DevTools of the past decade have not made their way to the engineers working on large, mature codebases. If we want to make our biggest companies more productive we need a better system of record for the engineering org."
thumbnail: "ai_help.webp"
---

The [F-35](https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II) is one of the most advanced man-made machines ever created. It can fly at 1.6x the speed of sound, is virtually undetectable by radar, can hover in place, and provides a total 360-degree field of view to the pilot.

It's a marvel of human achievement, but it’s constantly plagued by [delays and cost overruns](https://www.reuters.com/business/aerospace-defense/us-resumes-taking-f-35-after-delays-over-software-upgrade-2024-07-20/). A common source of the issues? Software.

> _"The hardware of [[Technology Refresh-3](https://www.lockheedmartin.com/en-us/news/statements-speeches/2024/lockheed-martin-update-on-f-35-technology-refresh-3.html)] seems to be coming along fine but the software is lagging,"_
>
> _— Secretary of the Air Force Frank Kendall_

**How can it be that the most advanced machine on earth is delayed because of software?** How is it that, time and time again, it's harder for companies to write competent code than it is to literally fly humans faster than the speed of sound?

This is the epitome of the [Software Crisis](https://olivergilan.com/blog/software-crisis/).

_Despite all intuition to the contrary, it appears to be harder for us as a civilization to build in the world of bits than in the world of atoms._

And, most of our progress in developer tooling and AI hasn’t done much to change this. It’s not like there hasn’t been progress in developer tooling. It's never been easier to start a project and go from 0 to 1 — a solo developer can spin up new projects faster than ever with AI-powered text editors, robust UI libraries, one-click deploys, auth in a box, and Stripe — but none of those productivity gains have made their way to teams working in big companies.

The senior engineer working on a 10-year-old codebase at a Fortune-50 insurance company or the engineer writing software for our nation’s military is stuck in an unproductive past.

Our DMVs need software. Our financial institutions need software. Our cars and planes need software. Our schools need software. Our farms need software. Our logistics companies need software. We'll only see the AI's full impact on technology and society when we can find a way to drive productivity for engineers working on these kinds of large, mature codebases.

## How We Got Here

**The software development lifecycle happens across the local development environment, repository environment, and runtime environment.**

Most of the last decade's developer tools fall into the first layer: new JavaScript frameworks, terminal emulators, text editors powered by AI, code-gen chatbots, and more.

Tools like [Vercel’s v0](https://v0.dev/) can help create complex user interfaces with AI (which is great if you’re working on a greenfield project using NextJS) but a principal engineer at a company like Chase Bank does not build new UIs often — let alone with a framework like NextJS. They probably just finished a multi-year project to upgrade some COBOL service to use Java 8, which they’ll be sticking with for another decade (at least). Tooling in the first layer makes for great demos, but it often doesn’t help engineers working on mature systems.

**A senior engineer working in a big company usually spends way less time writing code and way more time managing a living codebase:** reviewing code, responding to outages, maintaining code quality, focusing on architecture, keeping dependencies up-to-date, optimizing hot paths, engaging in large-scale refactors/migrations, and overcoming coordination problems throughout the org. We need DevTools to make this type of work 10x easier.

Some of this work has been improved by developer tooling in the third layer (with the Cloud, observability platforms, infrastructure-as-code, etc), but, frankly, it hasn't changed enough (partly because of hyperscalers' complexity and the fragmented ecosystem of complementary tools). This layer has had less impact on productivity than one would expect.

In other words, we need a lot more innovation in the second layer of development — the repository. **The repository is the canonical source of truth and the common denominator for an engineering organization.** It’s where code changes are reviewed, issues discussed and prioritized, deployments orchestrated, dependencies managed, and where most of the work on a mature codebase is done. We need to make the repository itself far more powerful than it is today if we want to significantly improve the productivity of engineers managing large codebases.

## The Repository as a Living Codebase

**Today, the moment a line of code gets merged into production, it begins to rot.** We don't think about this much when building greenfield or hobby projects but when you're working in a legacy codebase, you feel this pain. Every line of code has a maintenance burden and a debt associated with it. Senior engineers are paid to suffer with this.

Consider the engineer who needs to upgrade Java versions or update a dependency to get the latest security updates. Or the senior engineer called in to fix a flaky CI test when no one else can. These problems don’t affect greenfield projects, but they almost universally eat up significant time in any mature codebase.

Repositories should be full of agents working constantly in the background, analyzing the codebase and all of its activity while opening up PRs that address most of the maintenance work. They should scan codebases for known bad patterns and write fixes for them. They should find outdated dependencies or ones with security updates and do the work to update them and handle any necessary refactors. If there's a need to migrate Java versions or migrate a service from one language to another or break up a monolith, agents should help plan (and implement!) the changes.

**Repositories should be alive by default.** Code shouldn't fall into disrepair simply due to time.

## Reducing Toil

Sometimes working on a mature codebase is slow because the problems are hard and sometimes it’s slow because there’s just so much _toil._ There’s so much toil in the average enterprise codebase that most engineers have [schlep blindness](https://paulgraham.com/schlep.html) to their daily work.

I’ve been on teams where CI times took nearly an hour and then we started having flaky tests so it was common to wait 40 minutes to merge a PR only to have the test suite fail and require a re-run. Sometimes the toil is simply trying to download the context of a big PR so that you can review it effectively while navigating through a sea of formatting changes and other noise unrelated to the core changes in the PR. Enforcing smaller, [stacked PRs](https://www.stacking.dev/), can help the reviewer but that often just shifts the toil onto the author to find the right pieces to pull out of a branch into another, rewrite commits, etc. If you’re an open source maintainer your toil probably involves managing the inflow of user-submitted Issues, prioritizing real problems, filtering out duplicates, labeling issues correctly. Sometimes the toil is simply co-ordination related and not knowing who to assign to a PR whether that means finding the person on your team with the most bandwidth or finding an appropriate person to tag from a sister team.

In the same way that the repository should be intelligent enough to help maintain a codebase the repository plays a critical role in reducing toil when working collaboratively on a team. The repository should have agents identifying and fixes flaky CI tests, optimizing CI times, and improving test coverage. It should be dead simple to split up large PRs into smaller separate PR stacks that can be reviewed faster (it should even detect formatting or irrelevant changes and offer to automatically extract those into a separate PR). It should have agents suggesting fixes automatically for any nitpick comment so the author can just one-click approve them. It should be easy to automatically route PRs to the teammate with the smallest current workload (which can be determined a number of ways) or tag the most relevant engineers to review specific files. It should flag potential duplicate Issues, help label and triage them, and even solve small Issues when possible. It should summarize long discussion chains on contentious Issues, highlighting proposed solutions and important points from each side, so maintainers can stay caught up easier. It should reduce toil around communication overhead by presenting an intelligent Inbox so it’s always clear what PRs are blocked on your review, which Issues are the most contentious, what tests cases are flaking the most, what parts of the codebase are causing the most error logs, etc.

Most codebases are large interdependent systems with complex state that can behave in unexpected ways. The repository should be smart enough to recognize these moving pieces and reduce the toil that naturally arises from it so that engineers can spend more of their time on the interesting problems they were hired to solve.

## The Repository as the System of Record

The repository layer is more than just the lines of code in text files. **It’s a system of record that operates across all the different codebases in an organization, enforcing team processes, facilitating co-ordination, and serving as the source of truth for the various services and products being built and operated.**

To be maximally effective, the repository needs to have context of far more than just the code. It should be aware of the issue management system and its work items, team compositions, code ownership, CI pipelines, deployment environments, and other external systems that eventually derive their behavior from the codebase.

GitHub, the leader in the space, only has a faint concept of different deployment environments and repository secrets. It doesn’t have any understanding of feature flags or other configuration options that might affect a program when it runs. Only open-source projects use GitHub Issues to manage their work items and most people use external services that add weak integrations to GitHub themselves. Its CI platform is a bunch of untyped YAML actions [riddled with security vulnerabilities](https://cycode.com/blog/github-actions-vulnerabilities/) that aren’t easy to test or debug and even simple pipelines workflows like staged rollouts or rollbacks can be a pain to implement. Despite the common case of microservices it has no concept of multi-repository PRs or Issues and co-ordinating across team and codebase can often be a real challenge.

The more parts of the software development cycle that can be version controlled and meaningfully tied into the repository with deep linking the more effective automation can be. If tickets originate in the repository instead of being linked to PRs once they’re done then an intelligent repository could plan and scaffold an implementation. If feature flags and environment variables are version controlled you could more easily track down the cause of bugs that may not correlate with recent commits. If infrastructure footprints are linked to the repository it becomes easier to generate and optimize deployment pipelines.

I don’t believe the only solution is to rebuild all of these products internally but instead, a successor to GitHub will need to be proactive about building integrations with the surrounding ecosystem instead of waiting for everyone to integrate with it. It’ll have workflows and connectors designed to pull in data from other tools so that all the context of a living codebase can be tied back and version controlled effectively. In doing so the repository can finally become the proper system of record engineering teams need.

## The Next Generation of Repositories

**The company that solves those problems laid out above will look a lot like GitHub, just better in every way. It’ll have a lot of the same primitives: pull requests, issues, CI, etc. but every part of it will be _smarter._**

Pull requests will be simplified, stacked, and cleaned up by agents before a human reviews them. Issues will be triaged, categorized, and de-duplicated before a maintainer has to look at them. In some cases an agent will even open a PR to solve an Issue on its own. The repositories will have a concept of linking and pull requests, Issues, and CI runs will be able to span multiple repos for various workflows. Environment variables and secrets will be completely manageable alongside the repository with versioning and branching support. 2-way sync will enable local-first realtime collaboration for every part of the platform so that engineers are empowered to work on things synchronously and improve feedback cycles. It’ll integrate with local environments to enable fully reproducible development environments that can be spun up and collaborated on for specific features or changes. Complex git operations that allow you to maintain a clean history will be made easy and even root causing errors will be simplified. Agents will constantly scan codebases to find bad patterns or outdated dependencies and resolve them. Long running initiatives like refactors will be spearheaded and augmented by agents working in realtime with human engineers. I predict agents will even be able to ingest logs to update repository linting rules and best practices to help eliminate classes of bugs that repeatedly appear. _Nearly every part of the platform will be extensible via built-in and custom agents._

**Mesa is building towards this future and if that excites you please reach out.** Realizing this vision means tackling a variety of technical challenges such as building RAG systems to power intelligence on multiple codebases with current SOTA models, backend systems design to build low-latency scalable git servers, sync engines for performant local-first clients with realtime collaboration, and product design so that a highly technical product can be both approachable and easy to use while containing depth of functionality.

If any of these problems excite you, and you want to change the way massive teams build software you can reach me at oliver@mesa.dev
