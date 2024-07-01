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

![Landing Page Desktop Design Final ](/Landing%20Page%2007/public/design/desktop-preview.jpg)


#### Mobile


![Landing Page Mobile Design Final ](/Landing%20Page%2007/public/design/mobile-design.jpg)




### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2007/style.scss)

- Live Site URL: [Landing Page 07 ](https://landingpagee07.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

- JavaScript

### What I learned



### What are you most proud of, and what would you do differently next time?

I am proud of finally learning how to perform data manipulation, especially in the context of filtering data effectively.


### What challenges did you encounter, and how did you overcome them?
One significant challenge I faced during this project was working with the `data.json` file.  Given the data, we needed to create tablets based on `role`, `level`, `languages`, and `tools`.

While creating and populating tablets, `role` and `level` was straightforward, handling `languages` and `tools` required additional tweaking. Some listings needed to show `tools` first, others `languages` first, or a mix between the two. To address this, I created a function called `createTabletOrdering` and a helper function called `alternateOrderingTablet`. 

The `createTabletOrdering` function incorporates the `alternateOrderingTablet` function to handle the `languages` and `tools` arrays, ensuring that the items are added in the correct sequence based on specific requirements for different job listings.

The `alternateOrderingTablet` function handles cases where one array (either `languages` or `tools`) is longer than the other by iterating up to the length of the longer array. It uses a flag, `prioritizeTools`, to determine whether to prioritize adding tools before languages or vice versa. 

This flexibility allowed me to customize the ordering based on specific requirements for different job listings.

### What specific areas of your project would you like help with?
At the moment, none.