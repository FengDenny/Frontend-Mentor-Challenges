function toggleAccordion() {
  const accordionContainer = document.querySelector(".accordion");
  accordionContainer.addEventListener("click", (event) => {
    const button = event.target.closest(
      'button[data-role="accordion-toggler"]'
    );
    if (button) {
      const target = button.getAttribute("data-target");
      const accordion = document.querySelector(
        `article[data-role="accordion-toggled"][data-target="${target}"]`
      );

      if(accordion){
        accordion.classList.toggle("collapsed")
        accordion.classList.toggle("expanded")
        button.classList.toggle("expanded")
      }

    }
  });
}

toggleAccordion();
