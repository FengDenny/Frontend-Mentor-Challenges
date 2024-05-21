function toggleMobileButtons() {
  const menuContainer = document.querySelector(".mobile-ul-menu");
  menuContainer.addEventListener("click", (event) => {
    const button = event.target.closest('button[data-role="dropdown"]');

    if (button) {
      const target = button.getAttribute("data-target");
      const menu = document.querySelector(
        `ul[data-role="dropdown-menu"][data-target="${target}"]`
      );

      if (menu) {
        // close all open dropdowns
        // document.querySelectorAll('ul[data-role="dropdown-menu"]').forEach(dropdown => {
        //     if(dropdown !== menu){
        //         dropdown.classList.add("collapsed")
        //         dropdown.classList.remove("expanded")
        //     }
        // })

        // Toggle clicked dropdown
        menu.classList.toggle("collapsed");
        menu.classList.toggle("expanded");
        button.classList.toggle("expanded");
      }
    }
  });
}


function toggleDesktopButton() {
  const dropdownButtons = document.querySelectorAll(
    'button[data-role="desktop-dropdown"]'
  );
  const dropdownMenus = document.querySelectorAll(
    'ul[data-role="desktop-dropdown-menu"]'
  );

  let currentMenu = null;
  let collapseTimeout = null;

  dropdownButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const target = button.getAttribute("data-target");
      const menu = document.querySelector(
        `ul[data-role="desktop-dropdown-menu"][data-target="${target}"]`
      );

      if (menu) {
        if (currentMenu && currentMenu !== menu) {
          hideMenu(currentMenu);
        }
        clearTimeout(collapseTimeout);
        menu.classList.add("expanded");
        menu.classList.remove("collapsed");
        button.classList.add("expanded");
        currentMenu = menu;
      }
    });

    button.addEventListener("mouseleave", (event) => {
      startCollapseTimeout(event, button);
    });
  });

  dropdownMenus.forEach((menu) => {
    menu.addEventListener("mouseenter", () => {
      clearTimeout(collapseTimeout);
    });

    menu.addEventListener("mouseleave", (event) => {
      startCollapseTimeout(event, menu);
    });
  });

  function startCollapseTimeout(event, element) {
    collapseTimeout = setTimeout(() => {
      if (!element.contains(event.relatedTarget)) {
        hideMenu(currentMenu);
      }
    }, 100);
  }

  function hideMenu(menu) {
    if (menu) {
      menu.classList.add("collapsed");
      menu.classList.remove("expanded");
      const button = menu.previousElementSibling;
      if (button) {
        button.classList.remove("expanded");
      }
      currentMenu = null;
    }
  }
}




function closeDropdownOutsideClick() {
  document.addEventListener("click", (event) => {
    if (!event.target.closest("ul")) {
      document
        .querySelectorAll('ul[data-role="dropdown-menu"]')
        .forEach((dropdown) => {
          dropdown.classList.add("collapsed");
          dropdown.classList.remove("expanded");
        });
    }
  });
}

toggleMobileButtons();
toggleDesktopButton();
closeDropdownOutsideClick();
