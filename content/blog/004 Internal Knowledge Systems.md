---
title: "Internal Knowledge Systems"
slug: "internal-knowledge-systems"
date: 2022-10-09
draft: false
description: "Effective teams consciously engineer how knowledge flows through their organization. For tech teams, building this internal knowledge system requires effective documentation."
thumbnail: "Mountain_of_Knowledge.jpg"
---
Whenever a group of people work together there exists between them a flow of information which can ultimately determine how successful that group is at accomplishing a specific mission. Many dysfunctional organizations have broken or inadequate flows of information at their core and make poor decisions because of it. For an organization to succeed at scale it needs to effectively transmit information in multiple dimensions: from its leadership to the individuals at the edges of the organization, from the edges of the org to its leadership, between teams working in tandem, between teams working orthogonally, etc. You can think of an organization of individuals in much the same way as that of a living organism with millions of cells all receiving various signals and pieces of information informing them to act in a certain manner. The organisms that are successful are the ones that get the right signals to specific cells so that they perform the right actions at any given time to benefit that organism. All sorts of information needs to get to the right place at the right time with sufficient accuracy to allow every individual in the organization to make the right decisions at any given point in time. 

The flow of information manifests itself in various ways with the default being tribal knowledge held by individuals. This informal repository of personal knowledge is augmented by internal message boards, company memos, documentation, notes, etc. The vast majority of organizations pay no mind to this dynamic and as a result most information in any given institution is what Samo Burja calls [Intellectual Dark Matter](https://samoburja.com/intellectual-dark-matter/). Successful organizations and functional institutions are aware of their flow of information and take conscious steps to engineer it in a variety of ways. When it comes to startups and tech teams having an explicit formalized internal knowledge system that reduces IDM is crucial for maintaining efficiency and productivity at scale. I am interested in exploring what the ideal system looks like for tech teams in particular and the following is my working theory on what such a system looks like.

## Goals
The first step to building an effective internal knowledge system is understanding what the goals are. For different institutions this could mean different things but for my team at Census the goals of creating this system are as follows:

1. __Increase Velocity__  
It's almost a cliché at this point but startups want to move fast. As we scale and add new engineers we want to maintain our productivity and continue to ship high quality code frequently. The faster new members to the team can get set up, grok the codebase, and start contributing the better. Likewise, the faster a team member can look at a new part of the codebase or grasp a new assignment and ship code the more value will be created. 

2. __Increase Quality__  
Oftentimes the tradeoff for speed is quality. As we grow we want Census to become _more_ stable and _more_ reliable and _more_ performant all while we add new engineers to the team, create new features, and onboard new customers. To do this while maintaining velocity we need as many engineers as possible to have the relevant information at their fingertips to make informed decisions autonomously.

3. __Reduce Fragility__  
As systems and projects become more complex they tend to become more brittle. This is often due to more critical knowledge being known only by a select few individuals who have been there since the beginning and are then relied on when issues arise or changes need to be made. This is an instance of intellectual dark matter and can threaten the long term viability of a project. The sooner this knowledge is formalized and distributed the more pain we can avoid down the line as we scale.

4. __Reduce Mistakes & Errors__  
As we scale the goal is to have our usage increase an order of magnitude more than our errors. If you 10x your customer count but only 2x your incidents then your codebase is actually becoming more stable despite an increase in absolute error count. When the project is accurately documented it is easier to spot missing or innacurate details and fix them.

5. __Increase Autonomy__  
As more engineers on the team learn and think about the overall state and goals of the project the more they will be empowered to make small but important decisions correctly on their own. This increases the autonomy of the average engineer which increases productivity, increases quality, and creates a more enjoyable developer experience.

## The Effective Internal Knowledge System
The term _internal knowledge system_ is fancy and useful when discussing this theoretically but in practicality this is pretty much just a system of documentation. Before I go into how we plan to solve this problem at Census allow me to throw another list at you. When thinking about this problem I've read about and observed many different internal documentation systems and I've seen the problems multiple teams face with them. Below is what I believe to be some key characteristics of an effective system for tech teams.

1. __Declarative__  
The documentation should accurately describe the present state and goals of the system it is documenting. The past states of the system should be observable through a versioning mechanism. And above all it should clearly state what the overall goals for the system are so that members of the team are oriented around what changes need to be made to bring the system from its current state to its desired state. 

2. __Structured__  
I used to think it was enough for engineers to just put an effort into writing docs. I now know this to not be sufficient. Documentation needs to be structured in such a way that information has a logical place to live so that other members of the team immediately know where to look to find a given piece of knowledge. 

3. __Searchable__  
Documentation should be easily searchable. This means that documentation mediums like video or audio tend to do a poor job because it is hard to organize and skim a video for relevant information. You can `ctrl+f` a 10,000 line written document (or 100 10,000 line documents) faster than you can skim a 5 minute video. 

4. __Relevant & Versioned__  
Avoid including everything. The core documentation system should do its best to not drown the signal in endless noise. Ideally when it comes to low level implementation details the code should be self documenting and then just focus on higher level details and the few low level details that really matter. I used to think just documenting everything is the way to go and it might be better to have too many docs than too little but I've come to appreciate knowing when to *not* include something. At the very least there should be a mechanism to easily ignore the cruft and see only the core that matters.

5. __Permissioned__  
Not everyone should or needs to have access to all the information. This is less relevant at startups but as a company scales the need to partition and segment information becomes crucial. A proper internal knowledge system should make it easy to ensure that only those with proper access can view any given piece of information.

## Implementation
Okay so how do you actually build an effective internal knowledge system? Well I'm not quite sure but I plan on doing this for Census in the coming months so I'll make sure to write another post explaining how that goes. My working theory so far is as follows: we already have a bunch of documentation but it's scattered and unstructured. Most of it is in Notion but without any organization so the plan is to start there.

I'll begin with an overall directory structure as follows:
```markdown
.
|- Getting Started/
|- Architecture/
|--- Infra/
|--- Module 1/
|--- ...
|- Team 1/
|--- Style Guide
|--- ...
|- Team 2/
|- Team 3/
|- Ops/
|--- Planning/
|----- RFC/
|----- ...
|--- Deployments
|--- Git & Github Workflow
|--- Logs & Debugging
|- OnCall/
|--- Runbook/
|- Uncategorized/
```
<br/>

I've intentionally kept out a lot of the subsections for each directory but each top-level directory should have an internal structure as well. You can think of this top level structure as a top-down approach but another approach is to take all your existing documents and group them together as leaf nodes creating gradually bigger groups from the bottom up. I think the latter approach is ultimately the best way to create a good system that fits your specific knowledge but the above structure is a solid generic starting point for most small engineering teams.

Most of it is self-explanatory but to quickly go over it, the `Getting Started` directory should hold all the info for a new member to the team to onboard including things like local environment setup, high level concepts, important tools, git flows, etc. `Architecture` contains information regarding the infrastructure like cloud resources, service diagrams, etc. as well as sections for logical code modules that clearly explain how different parts of the codebase work. Then each team gets its own directory where they can outline team specific style guides, planning sections, common patterns, etc. This works because Census only has 3 engineering teams right now and they all share one repository but these might be unnecessary for your situation. `Ops` holds all the information around... you guessed it, ops! Things like deploying, planning, etc. `OnCall` should have all the information needed for an engineer to successfully manage a week on call. Finally `Uncategorized` is for any docs or info that doesn't immediately fit into one of the existing buckets. This will happen and that's fine; building this system is an iterative process. As the uncategorized information grows we'll create new sections, shift old sections around, and try to reduce the uncategorized queue. 

Ideally we'll get to a point where every section and piece of info has a unique number associated with it, different sections have different structured formats to make it easy to write new documents, every piece of information has a specific place to live, and finding any needed piece of information is effortless.

Keep in mind that this won't all happen overnight and these sections will grow and change. Initially it can even be painful to organize the docs because the existing information can feel overwhelming and older members on the team might have muscle memory for where certain information lives even if there's no intuitive reason for it to live there. That muscle memory will be broken and new habits will need to be formed. In the long run it should make life easier though and I'll write a follow-up to examine how this worked for us at Census.