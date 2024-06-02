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

![Landing Page Desktop Design Final ](/Landing%20Page%2005/public/design/desktop-preview.jpg)


#### Mobile


![Landing Page Mobile Design Final ](/Landing%20Page%2005./public/design/desktop-preview.jpg)



### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2005/style.scss)

- Live Site URL: [Landing Page 05 ](https://landingpagee05.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup

- SASS / SCSS

- JavaScript

### What I learned



### What are you most proud of, and what would you do differently next time?

In this project, I'm particularly proud of how I implemented `DOM manipulation` to dynamically update various components. 

By leveraging JavaScript, I was able to create a seamless user experience where elements such as `pledges`, `bookmarks`, `navigations`, `modals`, and `progresses` could be dynamically rendered and updated based on user actions and data changes with `data persistence` using `Local Storage`.

Additionally, I'm proud of how I applied encapsulation principles to organize my code into reusable components. Each component, such as pledges or progresses, encapsulated its functionality, making the codebase more modular, maintainable, and easier to understand.

Looking back, there are a few things I would approach differently in future projects. Firstly, I would pay more attention to optimizing performance, especially when dealing with large datasets or frequent DOM updates. This could involve implementing more efficient algorithms or leveraging libraries/frameworks designed for performance optimization.

Secondly, I would enhance the user interface by focusing more on accessibility. Ensuring that the application is usable by all users, including those with disabilities, and providing a consistent experience across different devices would greatly improve its overall usability and accessibility.

Overall, this project was a valuable learning experience, and I'm excited to apply the lessons learned to future projects to create even more robust and user-friendly applications.

### What challenges did you encounter, and how did you overcome them?

One of the key challenges I faced in this project was ensuring that each pledge made by the user accurately `updated the progress bar`, `total money raised`, and `total backers`. 

Achieving this required synchronization between the user interface (UI) elements, specifically the input fields for pledges and the corresponding radio buttons.

Initially, I attempted to address this challenge by assigning `unique IDs` to each input field of type number. However, I also needed a mechanism to link these input fields with their corresponding radio buttons, ensuring that the selected radio button represented the same pledge amount entered by the user.

To solve this, I utilized the concept of `datasets`, assigning the same `unique ID` to both the radio button and its associated input field of type number. 

This approach enabled seamless communication between the UI elements, allowing me to retrieve each pledge's value accurately and update it in local storage. 

As a result, the data could be dynamically rendered, reflecting the user's actions in real-time.

By leveraging datasets and maintaining consistency in ID assignments, I successfully overcame the challenge of synchronizing user inputs with the UI elements, ensuring accurate and dynamic updates to the progress bar, total money raised, and total backers.

### What specific areas of your project would you like help with?

At the moment, none.