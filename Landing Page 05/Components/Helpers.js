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
  }
};
