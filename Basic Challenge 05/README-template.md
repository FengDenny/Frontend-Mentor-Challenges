## Table of contents

- [Overview](#overview)

  - [Screenshot](#screenshot)

  - [Links](#links)

- [My process](#my-process)

  - [Built with](#built-with)

  - [What I learned](#what-i-learned)

  - [Proud of](#What-are-you-most-proud-of-and-what-would-you-do-differently-next-time)

  - [Challenges](#What-challenges-did-you-encounter-and-how-did-you-overcome-them)

  - [Project Help](#What-specific-areas-of-your-project-would-you-like-help-with)

## Overview

### Screenshot

#### Desktop

![Landing Page Desktop Design Final ](/Landing%20Page%2005/images/image-desktop-final.png)

![Landing Page Desktop Design Final ](/Landing%20Page%2005/images/image-desktop-desktop-active-final.png)

#### Mobile

![Landing Page Mobile Design Final ](/Landing%20Page%2005/assets/images/image-mobile-final.png)

![Landing Page Mobile Design Active Accordion](/Landing%20Page%2005/assets/images/image-mobile-menu-active-final.png)

### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2005/style.scss)

- Live Site URL: [Landing Page 04 ](https://landingpagee05.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

### What I learned

- Learned to build accordion

- Learned how to layout HTML using JavaScript

- Learned accessibility

- Learned mobile first approach

### What are you most proud of, and what would you do differently next time?

For this challenge, instead of creating HTML layout inside `.html`, I have stored all the accordion data using `json` file.

I then `fetched` it and dynamically populated and created elements using `JavaScript`.

This approach is much better than writing out `4` accordions using `html` when I can write once and use `for` loop to populate all accordions at once

### What challenges did you encounter, and how did you overcome them?

One challenge was when I tried to use `height` to perform `transition` effects when accordion is being `expanded` and `collapsed`

However, the `height` property, when transitioning from auto (which is often the initial value for height) to a specific height,
can't be transitioned directly because the browser doesn't know the final height in advance.

Therefore, I used `max-height` because it has a finite value that the transition can interpolate between.

However, instead of `hard-coding` the `max-height` in `css` , I dynamically checked the `scrollHeight` of each `accordion`,
ensuring that the `max height` of each `accordion` is `dynamically calculated.

Here is the code snippet:

```js
// Calculate the height based on the content's scroll height
const contentHeight = isExpanded ? accordion.scrollHeight + "px" : "0";

// Apply the height as max-height to enable transition
accordion.style.maxHeight = contentHeight;
```

### What specific areas of your project would you like help with?

At the moment, none.
