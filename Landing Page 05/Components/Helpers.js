export const Helpers = {
  validateNumberInput() {
    const numberInput = document.querySelector(`input[type="number"]`);
    numberInput.addEventListener("input", () => this.validateMinMaxNumberInput(numberInput));
    numberInput.addEventListener("blur", () => this.correctNumberInput(numberInput));
  },
  validateMinMaxNumberInput(numberInput) {
    const min = parseInt(numberInput.min, 10);
    const max = parseInt(numberInput.max, 10);
    const value = parseInt(numberInput.value, 10);

    if (isNaN(value) || value < min || value > max) {
      numberInput.setCustomValidity(
        `Please enter a value between ${min} and ${max}`
      );
    } else {
      numberInput.setCustomValidity("");
    }
  },
  correctNumberInput(numberInput) {
    const min = parseInt(numberInput.min, 10);
    const max = parseInt(numberInput.max, 10);
    let value = parseInt(numberInput.value, 10);

    if (value < min) {
      numberInput.value = min;
    } else if (value > max) {
      numberInput.value = max;
    }
  },
};

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

  createDiv(attributes, textContent) {
    return this.createElement("div", attributes, textContent);
  },
  createArticle(attributes, textContent) {
    return this.createElement("article", attributes, textContent);
  },
  createHeadingH2(attributes, textContent) {
    return this.createElement("h2", attributes, textContent);
  },
  createParagraph(attributes, textContent) {
    return this.createElement("p", attributes, textContent);
  },
  createInputType(attribute, textContent) {
    return this.createElement("input", attribute, textContent);
  },
  createLabel(attribute, textContent) {
    return this.createElement("label", attribute, textContent);
  },
  createSpan(attribute, textContent) {
    return this.createElement("span", attribute, textContent);
  },
  createCTA(attribute, textContent) {
    return this.createElement("button", attribute, textContent);
  },
  createProgressbar(attribute, textContent) {
    return this.createElement("progress", attribute, textContent);
  }
}



