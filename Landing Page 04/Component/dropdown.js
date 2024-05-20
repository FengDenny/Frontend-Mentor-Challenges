const menuContainer = document.querySelector("ul");

function toggleButtons() {
  menuContainer.addEventListener("click", (event) => {
    const button = event.target.closest('button[data-role="dropdown"]');

    if (button) {
      const target = button.getAttribute("data-target");
      const menu = document.querySelector(
        `ul[data-role="dropdown-menu"][data-target="${target}"]`
      );

      if(menu){
        // close all open dropdowns
        // document.querySelectorAll('ul[data-role="dropdown-menu"]').forEach(dropdown => {
        //     if(dropdown !== menu){
        //         dropdown.classList.add("collapsed")
        //         dropdown.classList.remove("expanded")
        //     }
        // })

        // Toggle clicked dropdown
        menu.classList.toggle("collapsed")
        menu.classList.toggle("expanded")
        button.classList.toggle("expanded")
      }

    }
  });
}

function closeDropdownOutsideClick() {
  document.addEventListener("click", (event) => {
    if(!event.target.closest('ul')){
        document.querySelectorAll('ul[data-role="dropdown-menu"]').forEach(dropdown => {
            dropdown.classList.add("collapsed")
            dropdown.classList.remove("expanded")
        })
    }
  });
}

toggleButtons();
closeDropdownOutsideClick();
