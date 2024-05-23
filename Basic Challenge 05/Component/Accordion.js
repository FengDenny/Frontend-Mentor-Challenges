export function toggleAccordion() {
  const accordionContainer = document.querySelector("#accordion");

  if (!accordionContainer) return;

  let previousAccordion = null;

  accordionContainer.addEventListener("click", (event) => {
    const button = event.target.closest(
      'button[data-role="accordion-toggler"]'
    );
    if (button) {
      const target = button.dataset.target;

      if (!target) return;

      const accordion = document.querySelector(
        `article[data-role="accordion-toggled"][data-target="${target}"]`
      );
      if (accordion) {    
       
        const isExpanded = button.classList.toggle("expanded");
        accordion.classList.toggle("collapsed", !isExpanded);
        accordion.classList.toggle("expanded", isExpanded);
        button.setAttribute("aria-expanded", isExpanded);

        // Calculate the height based on the content's scroll height
        const contentHeight = isExpanded ? accordion.scrollHeight + "px" : "0";

        // Apply the height as max-height to enable transition
        accordion.style.maxHeight = contentHeight;
    

        if (previousAccordion && previousAccordion !== accordion) {
          const prevButton =
            previousAccordion.previousElementSibling.querySelector(
              'button[data-role="accordion-toggler"]'
            );

          prevButton.classList.remove("expanded");
          previousAccordion.classList.add("collapsed");
          previousAccordion.classList.remove("expanded");
          prevButton.setAttribute("aria-expanded", "false");
          previousAccordion.style.maxHeight = "0";
        }
        previousAccordion = accordion; 
        collapseFirstAccordion()
      }
    }
  });
}




export function openFirstAccordion() {
  const accordion = document.querySelector(
    `article[data-role="accordion-toggled"][data-target="1"]`
  );


  if (accordion) {
    accordion.classList.remove("collapsed");
    accordion.classList.add("expanded");

    // Optional: You may want to update the button's class and aria-expanded attribute
    const button = accordion.previousElementSibling.querySelector(
      'button[data-role="accordion-toggler"]'
    );
    if (button) {
      button.classList.add("expanded");
      button.setAttribute("aria-expanded", "true");
    }
  }

}

export function collapseFirstAccordion() {
  const firstAccordion = document.querySelector(`article[data-role="accordion-toggled"][data-target="1"]`);
  if (firstAccordion) {
    const firstButton = firstAccordion.previousElementSibling.querySelector('button[data-role="accordion-toggler"]');
    if (firstButton) {
      firstButton.classList.remove("expanded");
    }
    firstAccordion.classList.add("collapsed");
    firstAccordion.classList.remove("expanded");
    firstButton.setAttribute("aria-expanded", "false");
    firstAccordion.style.maxHeight = "0";
  }
}