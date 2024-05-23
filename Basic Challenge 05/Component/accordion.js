function toggleAccordion() {
  const accordionContainer = document.querySelector("#accordion");

  if (!accordionContainer) return;

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
        const isExpanded = button.classList.toggle("expanded")
        accordion.classList.toggle("collapsed", !isExpanded);
        accordion.classList.toggle("expanded", isExpanded);
        button.setAttribute("aria-expanded", isExpanded)
      }
    }
  });
}

toggleAccordion();
