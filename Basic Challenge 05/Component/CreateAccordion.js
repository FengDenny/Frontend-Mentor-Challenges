
import {toggleAccordion, openFirstAccordion} from "../Component/Accordion.js";
async function loadFAQData() {
  try {
    const response = await fetch("../data/faqData.json");

    if (!response.ok) {
      throw new Error("Invalid response");
    }

    const faqData = await response.json();
    displayFAQ(faqData);
    openFirstAccordion()
    toggleAccordion()
  } catch (error) {
    console.error(`Error fetching the data: ${error}`);
  }
}

function displayFAQ(faqData) {
  const accordion = document.getElementById("accordion");
  accordion.textContent = "";

  faqData.forEach((faq, index) => {

    const accordionContainer = document.createElement("div")
    accordionContainer.classList.add("accordion-content-container")

    const contentArticle = document.createElement("article");
    contentArticle.classList.add("accordion-content");

    const question = document.createElement("h2");
    question.textContent = faq.question;
    contentArticle.appendChild(question);

    const button = document.createElement("button");
    button.setAttribute("data-role", "accordion-toggler");
    button.setAttribute("data-target", index + 1);
    button.setAttribute("aria-label", `accordion-toggler-${index + 1}`)

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "30");
    svg.setAttribute("height", "31");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 30 31");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "#AD28EB");
    path.setAttribute(
      "d",
      "M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z"
    );

    svg.appendChild(path)

    button.appendChild(svg)
    contentArticle.appendChild(button)

    const toggleArticle = document.createElement("article")
    toggleArticle.classList.add("accordion-toggle", "collapsed")
    toggleArticle.setAttribute("data-role", "accordion-toggled")
    toggleArticle.setAttribute("data-target", index + 1)

    const answer = document.createElement("h6")
    answer.textContent = faq.answer
    toggleArticle.appendChild(answer)

    accordionContainer.appendChild(contentArticle)
    accordionContainer.appendChild(toggleArticle)

    accordion.appendChild(accordionContainer);
  });
}


loadFAQData();