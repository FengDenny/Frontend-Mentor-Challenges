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

![Landing Page Desktop Design Final ](/Landing%20Page%2008/client/public/design/desktop-preview.jpg)


#### Mobile


![Landing Page Mobile Design Final ](/Landing%20Page%2008/client/public/design/mobile-design.jpg)



### Links

- Solution URL: [SCSS Solution](https://github.com/FengDenny/Frontend-Mentor-Challenges/blob/main/Landing%20Page%2008/client/style.css)

- Live Site URL: [Landing Page 08 ](https://commenteer.netlify.app/)

## My process

### Built with

#### Frontend

- Semantic HTML5 markup

- CSS3

- Vite

- Vanilla JavaScript


#### Backend

- Node.js

- Express.js

- Firebase


### What I learned

#### Frontend Development

- Prototypical Inheritance in Vanilla JavaScript: Gained a deeper understanding of building reusable components using prototypical inheritance, enhancing code organization and maintainability.

- Figma Design Implementation: Effectively translated Figma designs into functional components, focusing on UI/UX best practices to ensure a seamless user experience.

- Data Retrieval from Firebase: Integrated Firebase server endpoints to retrieve data, enabling dynamic rendering of frontend components and improving application interactivity.

#### Backend Development

- Full-Stack CRUD Application: Developed a full-stack CRUD application utilizing Firebase, Node.js, and Express.js, solidifying my understanding of RESTful API principles and backend architecture.

- Local Data Import to Firebase: Successfully imported local data from a data.json file into Firebase, streamlining the initial setup of the application.

- Comment Management System: Implemented functionalities for creating, reading, updating, and deleting comments and replies by authenticated (dummy) users, enhancing user engagement.

- Comment Interaction Features: Developed upvote and downvote functionalities for comments, providing users with a way to express their opinions and interact with content.

- Dynamic Time Tracking: Introduced a time tracker that dynamically records and displays the time for posted comments and replies, adding a layer of interactivity and user engagement.

### What are you most proud of, and what would you do differently next time?

I am proud to have developed this project as a full-stack application rather than just a simple frontend application using data.json. This approach allowed me to integrate both the frontend and backend seamlessly, providing a more robust user experience and demonstrating my skills in full-stack development.

Next time, I would focus on implementing a real authentication system instead of relying on dummy authenticated users. This change would enhance the application's security and provide a more realistic environment for user interactions, ultimately leading to a more reliable and scalable solution. Additionally, I would explore more advanced authentication methods, such as OAuth or JWT, to improve user management and security further.


### What challenges did you encounter, and how did you overcome them?

During the development of my application, I faced several challenges, particularly when hosting it on Render and transitioning from development to production using live server endpoints. One significant issue I encountered was a CORS (Cross-Origin Resource Sharing) problem, which prevented my frontend from accessing the backend API. To resolve this, I implemented the CORS npm package in my backend, which effectively allowed cross-origin requests and enabled seamless communication between the frontend and backend in the production environment.

Another challenge arose while building components using prototypical inheritance. While this approach provided a solid foundation for creating reusable components, I found it difficult to adapt those components for different use cases, such as varying buttons or cards. Each time I tried to create a new component, I needed to tweak the existing code to fit the specific requirements. To overcome this, I introduced a boolean variable to check the type of component being rendered. This allowed me to conditionally modify the component's behavior and appearance based on its intended use, streamlining the process and enhancing the maintainability of my code.


### What specific areas of your project would you like help with?
At the moment, none.