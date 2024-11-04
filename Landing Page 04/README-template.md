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

![Landing Page Desktop Design Final ](/Landing%20Page%2004/images/image-desktop-final.png)

![Landing Page Desktop Design Final ](/Landing%20Page%2004/images/image-desktop-menu-active-final.png)


#### Mobile


![Landing Page Mobile Design Final ](/Landing%20Page%2004/images/image-menu-final.png)

![Landing Page Mobile Design Menu](/Landing%20Page%2004/images/image-mobile-menu-final.png)


![Landing Page Mobile Design Active Menu](/Landing%20Page%2004/images/image-mobile-menu-active-final.png)



### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2004/style.scss)

- Live Site URL: [Landing Page 04 ](https://landingpagee04.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

- Vanilla JavaScript

### What I learned

- Learned nested grid for outer layout / flexbox for inner layout

- Learned accessibility

- Learned mobile first approach using grid

- Learned to implement dropdown functionality

- Learned `relatedTarget` property for `MouseEevent`:

  - `relatedTarget` is a property of the MouseEvent object in JavaScript that refers to the secondary target related to a mouse event. 
  
  - The value of relatedTarget depends on the specific mouse event type:

    - `mouseenter` and `mouseover` Events: 
    
      - `relatedTarget` refers to the element that the mouse pointer came from 
      
      - `(i.e., the element the pointer was previously over)`.

    - `mouseleave` and `mouseout` Events: 
    
      - `relatedTarget` refers to the element that the mouse pointer is moving to 
      
      - `(i.e., the element the pointer is now over)`.

### What are you most proud of, and what would you do differently next time?

Proud to learn how to implement the dropdown functionality for desktop and mobile

### What challenges did you encounter, and how did you overcome them?

When implementing a dropdown menu for desktop, I faced issues with the `hover` state not working as expected. 

Specifically, the dropdown menu would `close` as soon as the mouse left the button that opens the dropdown, preventing interaction with the menu items.

#### Solution:

To resolve this, I created a function `startCollapseTimeout` that manages the dropdown menu's visibility based on mouse events. 

Here’s how it works:

**Mouseenter Event**: 

- When the mouse enters the button or menu, it clears any existing timeout to keep the menu open.

**Mouseleave Event**: 

- When the mouse leaves the button or menu, it starts a timeout to collapse the menu after a short delay. 

- This allows the user to move the mouse from the button to the menu without it closing.


The key part of the solution was to check if the `relatedTarget` **(the element that the mouse is moving to)** was either **inside** the menu `(in case of mouseenter)` or **outside** the menu `(in case of mouseleave)`. 

This check ensures that the menu only collapses when the mouse is completely outside both the button and the menu, thereby allowing the user to interact with the dropdown menu.

Thus, using `relatedTarget` helped manage the dropdown menu's behavior by ensuring that the menu only hides when the mouse is not moving between related elements (button and menu), providing a smoother and more intuitive user experience.

### What specific areas of your project would you like help with?

At the moment, none.
