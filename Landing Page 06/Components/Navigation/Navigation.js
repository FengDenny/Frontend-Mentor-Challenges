import { createElementsHelpers } from "../Helpers/CreateElements";
import { MenuUI } from "./Menu";

export const NavigationsLogic = {
  menuOpenButton: document.getElementById("open-menu"),
  menuOpened: document.getElementById("opened-menu"),
  overlay: document.getElementById("overlay"),
  closeMenuButton: null,


  toggleMenu(show) {
    this.toggleShowNotShow(this.menuOpened, show);
    this.toggleShowNotShow(this.overlay, show);
  },
  toggleShowNotShow(item, show) {
    item.classList.toggle("show", show);
    item.classList.toggle("not-show", !show);
    const expandedOpenMenu = show;
    this.menuOpenButton.setAttribute("aria-expanded", !expandedOpenMenu);

    if (this.closeMenuButton) {
      const expandedCloseMenu = !show;
      this.closeMenuButton.setAttribute("aria-expanded", !expandedCloseMenu);
    }
  },
  handleOpenMenu() {
    this.menuOpenButton.addEventListener("click", () => {
      this.toggleMenu(true);
      this.handleMenuOpened();
    });
  },

  handleCloseMenu() {
    // Call close button only if it exists
    if (this.closeMenuButton) {
      this.closeMenuButton.addEventListener("click", () => {
        this.toggleMenu(false);
      });
    }
  },

  handleMenuOpened() {
    // Create elements only if it doesnt exists
    const mobileUL = document.getElementById("mobile-ul");
    if (!this.closeMenuButton && !mobileUL) {
      this.closeMenuButton = NavigationsUI.createCloseButton();
      this.menuOpened.appendChild(this.closeMenuButton);
      MenuUI.createOpenedMenuLinks("mobile-links","mobile-ul")
      this.handleCloseMenu();
    }

  },
};

const NavigationsUI = {
  createCloseButton() {
    const button = createElementsHelpers.createElement("button", {
      id: "close-menu",
      class: "close-menu-btn",
      ["aria-label"]: "Close menu",
      ["aria-expanded"]: "false",
    });
    const svg = createElementsHelpers.createSVGElementNS("svg", {
      width: "14",
      height: "15",
    });

    const path = createElementsHelpers.createSVGElementNS("path", {
      d: "m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z",
      fill: "#69707D",
      ["fill-rule"]: "evenodd",
    });

    svg.appendChild(path);
    button.appendChild(svg);
    return button;
  },
};

const NavigationsInit = {
  init() {
    NavigationsLogic.handleOpenMenu();
  },
};

NavigationsInit.init();
