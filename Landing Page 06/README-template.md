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

![Landing Page Desktop Design Final ](/Landing%20Page%2006/public/design/desktop-preview.jpg)


#### Mobile


![Landing Page Mobile Design Final ](/Landing%20Page%2006/public/design/mobile-design.jpg)



### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2006/style.scss)

- Live Site URL: [Landing Page 05 ](https://landingpagee6.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

- JavaScript

### What I learned

This project I learned:

1) Building a cart system

2) Persistent data with Local Storage

3) Image gallery

4) Data manipulation

### What are you most proud of, and what would you do differently next time?

I'm proud of the progress I've made in developing reusable components for this project. Learning to create modular, reusable components has not only enhanced the efficiency of my workflow but also improved the overall maintainability of the codebase.

Additionally, I take pride in successfully implementing both the cart system and different image galleries for various viewports. These components required careful planning and attention to detail to ensure seamless functionality across different devices and screen sizes.

Looking back, one thing I would do differently next time is to approach this project as a full-stack e-commerce web application instead of limiting it to frontend development with JSON file data. 

Building a full-stack application would provide valuable experience in integrating backend functionality, such as database management and user authentication, which are essential components of real-world e-commerce platforms. 

This approach would offer a more comprehensive learning experience and enable me to develop a deeper understanding of the entire web development process from end to end.


### What challenges did you encounter, and how did you overcome them?

This project presented several challenges, particularly in implementing the lightbox gallery functionality and managing data manipulation for the image gallery and cart system.

One significant challenge arose while developing the lightbox gallery for desktop. Initially, the small thumbnail images were not transitioning to the large product image upon clicking, and the previous and next buttons were not functioning as expected. These issues stemmed from using the same component for mobile, tablet, and desktop views.

To address these challenges, I made adjustments to the dataset attributes for the lightbox gallery. By ensuring that each image had unique and standalone dataset attributes, I could easily target them in the DOM traversal process.

Additionally, I implemented event delegation, specifically bubbling up to the parent element, to handle click events more efficiently. This approach allowed me to capture clicks on any image within the gallery and determine the appropriate action based on the clicked element's dataset attributes.

Once I successfully bubbled up to the parent element, I parsed the dataset attributes to identify the relevant information for each image. This included determining the current index of the clicked image within the gallery, enabling smooth transitions between images when navigating using the previous and next buttons.

By addressing these challenges and implementing solutions such as dataset attribute management, event delegation, and DOM traversal techniques, I was able to overcome obstacles and enhance the functionality of the lightbox gallery component.


### What specific areas of your project would you like help with?

At the moment, none.