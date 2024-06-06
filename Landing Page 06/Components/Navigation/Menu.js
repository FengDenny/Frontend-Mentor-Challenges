import { createElementsHelpers } from "../Helpers/CreateElements";
export const MenuUI = {
  createOpenedMenuLinks(style, id, container) {
    const ul = createElementsHelpers.createElement("ul", {
      id,
    });
    const linkData = ["Collections", "Men", "Women", "About", "Contact"];
    linkData.map((item) => {
      const li = createElementsHelpers.createElement("li");
      const links = createElementsHelpers.createElement(
        "a",
        {
          class: style,
        },
        item
      );
      li.appendChild(links);
      ul.appendChild(li);
    });
   container.appendChild(ul);
  },
};
