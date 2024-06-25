

export const createElementsHelpers = {
  createElement(tagName, attributes = {}, textContent = "") {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((attribute) => {
      element.setAttribute(attribute, attributes[attribute]);
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

  createArticle(attributes, textContent) {
    return this.createElement("article", attributes, textContent);
  },
  createFigure(attributes, textContent) {
    return this.createElement("figure", attributes, textContent);
  },
  createImg(attributes, textContent) {
    return this.createElement("img", attributes, textContent);
  },
  createDiv(attributes, textContent) {
    return this.createElement("div", attributes, textContent);
  },
  createHeader(attributes, textContent) {
    return this.createElement("header", attributes, textContent);
  },

  createHeadingH2(attributes, textContent) {
    return this.createElement("h2", attributes, textContent);
  },
  createSpan(attribute, textContent) {
    return this.createElement("span", attribute, textContent);
  },
  createCTA(attribute, textContent) {
    return this.createElement("button", attribute, textContent);
  },
};
