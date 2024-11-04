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

![Landing Page Desktop Design ](/Landing%20Page%2003/assets/images/image-desktop-final.png)



#### Mobile

![Landing Page Mobile Design ](/Landing%20Page%2003/design/mobile-design.jpg)

![Landing Page Mobile Design Menu](/Landing%20Page%2003/assets/images/image-mobile-menu-final.png)


### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2003/style.scss)
- Live Site URL: [Landing Page 03 ](https://landingpagee03.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

- Vanilla JavaScript


### What I learned

- Learned nested grid for outer layout / flexbox for inner layout 

- Learned accessibility

- Learned mobile first approach using grid

- Learned media queries to layout desktop / tablet


### What are you most proud of, and what would you do differently next time?

I did mobile-first approach using simple grid then transitioned to desktop suign nested grid.

If I were to do this project again, I would use flexbox instead of grid.

#### What challenges did you encounter, and how did you overcome them?

For this project, I was trying to create a `sliding right` transition for  mobile nav menu. 

However, I found out that `transition` property doesn't work with `display: block` and` display: none`. CSS transitions cannot animate changes between these two states. 

Instead of using `display`, I controlled the **visibility** of the menu with properties that can be animated, like `opacity` and `transform`.

### What specific areas of your project would you like help with?

At the moment, none.