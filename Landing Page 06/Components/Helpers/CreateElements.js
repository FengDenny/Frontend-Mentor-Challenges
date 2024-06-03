export const createElementsHelpers = {
  createElement(tagName, attributes = {}, textContent = "") {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((attribute) => {
      if (attribute === "required" && attributes[attribute]) {
        element.required = true;
      } else {
        element.setAttribute(attribute, attributes[attribute]);
      }
    });
    element.textContent = textContent;
    return element;
  },
  createSVGElementNS(qualifiedName, attributes = {}, textContent = "") {
    const URI = "http://www.w3.org/2000/svg";
    const nsElement = document.createElementNS(URI, qualifiedName);
    Object.keys(attributes).forEach((attribute) => {
      nsElement.setAttribute(attribute, attributes[attribute]);
    });
    nsElement.textContent = textContent;
    return nsElement;
  },

};
