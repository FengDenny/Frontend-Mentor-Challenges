// Logic Module (encapsulates Menu )
const menuLogic = {
  openMenu: document.querySelector('button[data-target="menu"]'),
  menuOpened: document.getElementById("menu"),
  overlay: document.getElementById("overlay"),
  isDefault: true,

  handleOpenMenu() {
    this.openMenu.addEventListener("click", () => {
      const show = this.openMenu.classList.toggle("show");
      this.menuOpened.classList.toggle("not-show", !show);
      this.overlay.classList.toggle("not-show", !show);
      this.isDefault = !this.isDefault;
      menuUI.handleUpdateIcon(this.isDefault);
    });
  },
};

// Presentation Module (encapsulates HTML content manipulation)
const menuUI = {
  menuIcon: document.getElementById("menuIcon"),
  path: document.createElementNS("http://www.w3.org/2000/svg", "path"),
  extraPath: document.createElementNS("http://www.w3.org/2000/svg", "path"),
  group: document.createElementNS("http://www.w3.org/2000/svg", "g"),

  handleUpdateIcon(isDefault) {
    // Clear existing default path on click
    while (this.menuIcon.firstChild) {
      this.menuIcon.removeChild(this.menuIcon.firstChild);
    }

    // Revert back to the original default path on click
    while (this.group.firstChild) {
      this.group.removeChild(this.group.firstChild);
    }

    if (!isDefault) {
      this.path.setAttribute(
        "d",
        "M2.404.782l11.314 11.314-2.122 2.122L.282 2.904z"
      );
      this.extraPath.setAttribute(
        "d",
        "M.282 12.096L11.596.782l2.122 2.122L2.404 14.218z"
      );

      this.setGroupAttribute(this.group, this.path, this.extraPath)
      this.menuIcon.appendChild(this.group);
    } else {
      this.path.setAttribute("d", "M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z");
      this.setGroupAttribute(this.group, this.path)
      this.group.appendChild(this.path);
      this.menuIcon.appendChild(this.group);
    }
  },

  setGroupAttribute(group, path, extraPath) {
    group.setAttribute("fill", "#fff");
    group.setAttribute("fill-rule", "evenodd");
    if (path && extraPath) {
      group.appendChild(path);
      group.appendChild(extraPath);
    } else {
      group.appendChild(path);
    }
  },
};

menuLogic.handleOpenMenu();
