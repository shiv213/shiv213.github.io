---
title: Pine64's PineTime
date: 2022-03-22T19:36:56.251Z
author: Shiv Trivedi
summary: Taking a look at Pine64's PineTime smartwatch
metaDescription: Taking a look at Pine64's PineTime smartwatch
tags:
  - post
  - pinetime
---
The Pine64 [PineTime](https://pine64.com/product/pinetime-smartwatch-sealed/) is an extremely affordable smartwatch, advertised as a free and open-source smartwatch capable of running custom-built open operating systems. 

After recently getting one on my wrist (much ❤️ to [@lux](https://yaseen.xyz/)), I instantly fell into the hole of wanting to develop my own custom software additions and features for it. 

Comparing two popular choices for operating systems, [waspOS](https://github.com/daniel-thompson/wasp-os) which is Python-based and easy to get started with but very clunky and battery draining, and [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) which is written in C/C++ and based on [FreeRTOS](https://www.freertos.org/), I decided to go with [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime).

I want to implement features that already exist on the Apple Watch, such as message notifications and music control. So far I've written a simple script for proximity-based unlocking of my laptop (similar to [this](https://support.apple.com/guide/watch/unlock-your-mac-with-apple-watch-apd4200675b8/watchos)) and published it [here](https://shivvtrivedi.com/projects/ble-unlock/).

As an iOS user, getting features such as iMessage and other notifications to show on my watch would be a huge achievement. 

I will periodically post updates to this blog as I release more software to interface with my watch. 