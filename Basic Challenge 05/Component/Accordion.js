function toggleAccordion() {
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
      }
    }
  });
}

toggleAccordion();
