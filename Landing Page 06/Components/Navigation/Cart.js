import { createElementsHelpers } from "../Helpers/CreateElements";
import { LocalStorage } from "../Helpers/LocalStorage";

export const cartLogic = {
  openCart: document.getElementById("open-cart"),
  currentQuantity: 0,

  handleOpenCartHover() {
    this.openCart.addEventListener("mouseover", (e) => {
      this.handleCartModalAppearance("show", "not-show");
      this.openCart.setAttribute("aria-expanded", "true", "true");
    });
    this.openCart.addEventListener("mouseout", (e) => {
      this.handleCartModalAppearance("not-show", "show", "false");
    });
  },

  handleCartModalAppearance(add, remove, ariaExpanded) {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.add(add);
    cartModal.classList.remove(remove);
    this.openCart.setAttribute("aria-expanded", ariaExpanded);
  },

  handleQuantity() {
    const quantityInput = document.getElementById("quantity");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const cartQuantity = document.getElementById("cart-quantity");

    // Initialize the quantity from localStorage
    this.checkLocalQuantity(quantityInput);

    // Update cart quantity when page loads
    this.handleCartQuantity(cartQuantity);

    plusButton.addEventListener("click", (event) =>
      this.incrementQuantity(event, quantityInput, cartQuantity)
    );
    minusButton.addEventListener("click", (event) =>
      this.decrementQuantity(event, quantityInput, cartQuantity)
    );
  },
  incrementQuantity(event, quantityInput, cartQuantity) {
    event.preventDefault();
    let max = parseInt(quantityInput.max, 10);
    if (this.currentQuantity < max) {
      this.currentQuantity += 1;
      quantityInput.value = this.currentQuantity;
      LocalStorage.updateLocalStorageData("quantity", this.currentQuantity);
      this.handleCartQuantity(cartQuantity);
    }
  },

  decrementQuantity(event, quantityInput, cartQuantity) {
    event.preventDefault();
    let min = parseInt(quantityInput.min, 10);
    if (this.currentQuantity > min) {
      this.currentQuantity -= 1;
      quantityInput.value = this.currentQuantity;
      LocalStorage.updateLocalStorageData("quantity", this.currentQuantity);
      this.handleCartQuantity(cartQuantity);
    }
  },

  handleCartQuantity(cartQuantity) {
    const storedQuantity = LocalStorage.checkLocalStorageData("quantity");
    if (storedQuantity !== null) {
      cartQuantity.textContent = storedQuantity;
      cartQuantity.classList.add("show");
    } else {
      cartQuantity.classList.remove("show");
    }
  },

  handleAddToCartBtnClicked(data) {
    console.log(data);
    const addToCartCTA = document.getElementById("add-to-cart");
    addToCartCTA.addEventListener("click", () => {
      const quantity = LocalStorage.checkLocalStorageData("quantity");
      let cartItems = LocalStorage.checkLocalStorageData("cart-items");

      if (!cartItems) {
        cartItems = new Object();
      } else {
        cartItems = JSON.parse(cartItems);
      }

      data.map((item) => {
        const {
          sneaker,
          gallery,
          ["price-discounted"]: discountedPrice,
        } = item;

        const itemID = sneaker;

        if (cartItems[itemID]) {
          cartItems[itemID].quantity = quantity;
        } else {
          cartItems[itemID] = {
            sneaker,
            photoCover: gallery[0].photoCover,
            discountedPrice: this.handleRemoveDollarSign(discountedPrice),
            quantity,
          };
        }
      });

      LocalStorage.updateLocalStorageData("cart-items", cartItems);
    });
  },
  checkLocalQuantity(quantityInput) {
    const storedQuantity = LocalStorage.checkLocalStorageData("quantity");
    this.currentQuantity =
      storedQuantity !== null ? parseInt(storedQuantity, 10) : 0;
    quantityInput.value = this.currentQuantity;
  },

  handleRemoveDollarSign(discountedPrice) {
    const price = discountedPrice.replace(/\$/g, "");
    return price.toString();
  },
};

export const cartUI = {
  cartModal: document.getElementById("cart-modal"),

  createCartModalData() {},
};

cartLogic.handleOpenCartHover();
