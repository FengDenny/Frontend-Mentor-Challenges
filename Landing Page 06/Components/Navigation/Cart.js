import { createElementsHelpers } from "../Helpers/CreateElements";
import { LocalStorage } from "../Helpers/LocalStorage";

export const cartLogic = {
  openCart: document.getElementById("open-cart"),
  cartModal: document.getElementById("cart-modal"),
  currentQuantity: 0,

  handleUpdatedCartModal() {
    // Clear existing cart modal content
    while (this.cartModal.firstChild) {
      this.cartModal.removeChild(this.cartModal.firstChild);
    }

    const cartItemsData = LocalStorage.checkLocalStorageData("cart-items");
    if (cartItemsData) {
      const cartItems = JSON.parse(cartItemsData);
      for (const itemID in cartItems) {
        if (cartItems.hasOwnProperty(itemID)) {
          const { sneaker, photoCover, discountedPrice, quantity, totalPrice } =
            cartItems[itemID];
          const createCartItem = cartUI.createCartModalData(
            `../${photoCover}`,
            sneaker,
            discountedPrice,
            quantity,
            totalPrice
          );
          this.cartModal.appendChild(createCartItem);
        }
      }
    }
  },

  handleOpenCartHover() {
    this.openCart.addEventListener("mouseover", (e) => {
      this.handleCartModalAppearance("show", "not-show");
      this.openCart.setAttribute("aria-expanded", "true", "true");
    });
    this.cartModal.addEventListener("mouseout", (e) => {
      if (
        !this.handleIsMouseOverElement(e, this.openCart) &&
        !this.handleIsMouseOverElement(e, this.cartModal)
      ) {
        this.handleCartModalAppearance("not-show", "show", "false");
      }
    });
  },

  handleIsMouseOverElement(event, element) {
    // Check if the related target (where the mouse moved to) is the element or one of its descendants
    return element.contains(event.relatedTarget);
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
      // Update cart items quantity in localStorage
      this.handleUpdateCartItemQuantity(this.currentQuantity);
      // Update cart quantity in UI
      this.handleCartQuantity(cartQuantity);
      this.handleUpdatedCartModal();
      this.handleUpdateAddToCartButtonState();
    }
  },

  decrementQuantity(event, quantityInput, cartQuantity) {
    event.preventDefault();
    let min = parseInt(quantityInput.min, 10);
    if (this.currentQuantity > min) {
      this.currentQuantity -= 1;
      quantityInput.value = this.currentQuantity;
      LocalStorage.updateLocalStorageData("quantity", this.currentQuantity);
      this.handleUpdateCartItemQuantity(this.currentQuantity);
      this.handleCartQuantity(cartQuantity);
      this.handleUpdatedCartModal();
      this.handleUpdateAddToCartButtonState();
    }
  },

  handleCartQuantity(cartQuantity) {
    const cartItems = LocalStorage.checkLocalStorageData("cart-items");

    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      if (Object.keys(parsedCartItems).length > 0) {
        const storedQuantity = LocalStorage.checkLocalStorageData("quantity");
        if (storedQuantity !== null) {
          cartQuantity.textContent = storedQuantity;
          cartQuantity.classList.add("show");
          return;
        }
      }
    }
    cartQuantity.classList.remove("show");
  },

  handleUpdateCartItemQuantity(quantity) {
    const cartItems = LocalStorage.checkLocalStorageData("cart-items");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      for (const itemID in parsedCartItems) {
        if (parsedCartItems.hasOwnProperty(itemID)) {
          parsedCartItems[itemID].quantity = parseInt(quantity);
          parsedCartItems[itemID].totalPrice = parseInt(
            parsedCartItems[itemID].discountedPrice * quantity
          );
          if (parsedCartItems[itemID].quantity === 0) {
            delete parsedCartItems[itemID];
          }
        }
      }
      LocalStorage.updateLocalStorageData(
        "cart-items",
        JSON.stringify(parsedCartItems)
      );
    }
  },

  handleUpdateAddToCartButtonState() {
    const addToCartCTA = document.getElementById("add-to-cart");
    const quantityCheck = LocalStorage.checkLocalStorageData("quantity");

    if (quantityCheck > 0) {
      addToCartCTA.disabled = false;
      addToCartCTA.style.cursor = "pointer";
    } else {
      addToCartCTA.disabled = true;
      addToCartCTA.style.cursor = "not-allowed";
    }
  },

  handleAddToCartBtnClicked(data) {
    this.handleUpdateAddToCartButtonState();
    const addToCartCTA = document.getElementById("add-to-cart");
    const cartQuantity = document.getElementById("cart-quantity");

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
          cartItems[itemID].quantity = parseInt(quantity);
        } else {
          const price = parseFloat(
            this.handleRemoveDollarSign(discountedPrice)
          );

          cartItems[itemID] = {
            sneaker,
            photoCover: gallery[0].photoCover,
            discountedPrice: price,
            quantity: parseInt(quantity),
            totalPrice: parseInt(price * quantity),
          };
        }
      });

      LocalStorage.updateLocalStorageData("cart-items", cartItems);
      this.handleCartQuantity(cartQuantity);
      this.handleUpdatedCartModal();
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
    return parseInt(price);
  },
};

export const cartUI = {
  createCartModalData(src, heading, discounted, quantity, total) {
    const itemContainer = createElementsHelpers.createElement("div", {
      id: "cart-modal-items",
      class: "cart-modal-item-container",
    });
    const createPhotoFigure = createElementsHelpers.createElement("figure");
    const createPhoto = createElementsHelpers.createElement("img", {
      src,
    });
    const createHeading = createElementsHelpers.createElement(
      "h6",
      {
        class: "item-heading",
      },
      heading
    );
    const priceDescriptionContainer = createElementsHelpers.createElement(
      "div",
      {
        class: "price-description-container",
      }
    );
    const discountedPrice = createElementsHelpers.createElement(
      "p",
      {
        class: "discounted-pricing",
      },
      discounted
    );

    const times = createElementsHelpers.createElement(
      "span",
      {
        class: "times",
      },
      "x"
    );

    const quantityValue = createElementsHelpers.createElement(
      "span",
      {
        class: "quantity-value",
      },
      quantity
    );
    const totalPrice = createElementsHelpers.createElement(
      "span",
      {
        class: "total-pricing",
      },
      total
    );

    priceDescriptionContainer
      .appendChild(discountedPrice)
      .appendChild(times)
      .appendChild(quantityValue)
      .appendChild(totalPrice);

    createPhotoFigure.appendChild(createPhoto);
    itemContainer
      .appendChild(createPhotoFigure)
      .appendChild(createHeading)
      .appendChild(priceDescriptionContainer);

    return itemContainer;
  },
};

const cartInit = {
  init() {
    cartLogic.handleOpenCartHover();
    cartLogic.handleUpdatedCartModal();
  },
};

cartInit.init();
