## Table of contents

- [Overview](#overview)

  - [Notification and UI Interaction Features](#Notification-Features)

  - [Screenshot](#screenshot)

  - [Links](#links)

- [My process](#my-process)

  - [Built with](#built-with)

  - [What I learned](#what-i-learned)

  - [What are you most proud of, and what would you do differently next time?](#What-are-you-most-proud-of-and-what-would-you-do-differently-next-time)

  - [ What challenges did you encounter, and how did you overcome them?](#What-challenges-did-you-encounter-and-how-did-you-overcome-them)

  - [What specific areas of your project would you like help with?](#What-specific-areas-of-your-project-would-you-like-help-with)



## Overview

### Notification Features

**Distinguish between "unread" and "read" notifications**: 

- This falls under notification management.

- To **distinguish** between  `unread` and `read` **notifications**: 

  -  `unread`  **notifications** `background color` will be `light grayish blue 1` with a `red dot`

  -  `read` **notifications** `background color` will be `light grayish blue 2`




**Select "Mark all as read" to toggle the visual state of the unread notifications and set the number of unread messages to zero**: 

- This is a notification management feature.

- To implement this feature, we have `3` **unread** notifications:

  1) Mark Webber reacted to your recent post My first tournament today!
      -  1m ago
  
  2) Angela Gray followed you
      - 5m ago

  3) Jacob Thompson has joined your group Chess Club
      - 1 day ago

- Once we click the  `Mark all as read` button, the user shall be able to see the notification number `3` decremented back down to `0`

- Turn the `unread` background of `light grayish blue 1` to `light grayish blue 2` to distinguish it as `read`

  


### Screenshot

#### Desktop

![Responsive Desktop Design ](/Responsive%20Design%2008/images/image-desktop-final.png)


#### Mobile

![Responsive Mobile Design ](/Responsive%20Design%2008/images/image-mobile-final.png)


### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Responsive%20Design%2008/style.scss)
- Live Site URL: [Responsive Design 08](https://responsivedesign08.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

- JavaScript


### What I learned


### What are you most proud of, and what would you do differently next time?

I am proud to utilize  `encapsulation` and `closures`  to make a notifications page with persistent data using `localStorage`

**Encapsulation**:

notificationsLogic encapsulates the data handling and processing logic.

notificationsUI encapsulates the presentation and HTML content manipulation logic.

**Closures**:

Closures aren't explicitly shown in this code, but they occur implicitly when functions access variables from their containing scope (e.g., fetchNotificationData accessing `this.checkLocalData`).
LocalStorage Handling:

**localStorage**

checkLocalData and updateLocalData methods are used to interact with localStorage.


### What challenges did you encounter, and how did you overcome them?

Deploying this site to `Netlify` was a little bit tricky as I am using `Vite`. 
The starter file `images` were stored in `assets/images` file path, but when deployed to `Netlify`, the images were not dispalying at all

That is because for `Vite`, we needed to store it in the `root` file path or a folder called `public` which acts as the `root` 


### What specific areas of your project would you like help with?

At the moment, none.