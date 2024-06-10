import { createElementsHelpers } from "../Helpers/CreateElements";
import { LocalStorage } from "../Helpers/LocalStorage";

export const cartLogic = {
  openCart: document.getElementById("open-cart"),
  cartModal: document.getElementById("cart-modal"),
  cartQuantity: document.getElementById("cart-quantity"),
  currentQuantity: 0,

  handleNumberFormatting(number) {
    return Number.parseFloat(number).toFixed(2);
  },

  handleClearFirstChild(domNode){
    while (domNode.firstChild) {
      domNode.removeChild(domNode.firstChild);
    }
  },

  handleRemovedItem(){
    const deleteItem = document.getElementById("delete-cta")
    deleteItem.addEventListener("click", () => {
      LocalStorage.removeLocalStorageData("cart-items");
      LocalStorage.removeLocalStorageData("quantity");
      this.handleClearFirstChild(this.cartModal)
      this.handleClearFirstChild(this.cartQuantity)
    })
  },

  handleUpdatedCartModal() {
    // Clear existing cart modal content
    this.handleClearFirstChild(this.cartModal)
  
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
          this.cartModal.appendChild(cartUI.cartModalH2);
          this.cartModal.appendChild(createCartItem);
          this.cartModal.appendChild(cartUI.checkoutCTA);
          this.handleRemovedItem()
        }
      }
    } else{
      const emptyCardDiv = createElementsHelpers.createElement("div", {
        class:"empty-container"
      })
      const emptyCartLabel = createElementsHelpers.createElement("h6", {
        class:"empty-card=label"
      }, "Your cart is empty.")

      this.cartModal.appendChild(cartUI.cartModalH2);
      emptyCardDiv.appendChild(emptyCartLabel)
      this.cartModal.appendChild(emptyCardDiv)
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
          parsedCartItems[itemID].totalPrice = this.handleNumberFormatting(
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
          const price = this.handleNumberFormatting(
            this.handleRemoveDollarSign(discountedPrice)
          );

          cartItems[itemID] = {
            sneaker,
            photoCover: gallery[0].photoCover,
            discountedPrice: price,
            quantity: parseInt(quantity),
            totalPrice: this.handleNumberFormatting(price * quantity),
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
    return this.handleNumberFormatting(price);
  },
};

export const cartUI = {
  cartModalH2: createElementsHelpers.createElement("h2", {}, "Cart"),
  checkoutCTA: createElementsHelpers.createElement("button", {
    class: "checkout-cta",
  }, "Checkout"),
  createCartModalData(src, heading, discounted, quantity, total) {
    const itemContainer = createElementsHelpers.createElement("div", {
      id: "cart-modal-items",
      class: "cart-modal-item-container",
    });

    const photoItemContainer = createElementsHelpers.createElement("div", {
      class: "photo-item-container",
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
      `$${discounted}`
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
      `$${total}`
    );

    const productDescriptionContainer = createElementsHelpers.createElement(
      "div",
      {
        class: "product-description-container",
      }
    );
    const deleteCTA = createElementsHelpers.createElement("button", {
      id:"delete-cta",
      class: "delete-cta",
    });

    const deleteSVG = createElementsHelpers.createSVGElementNS("svg", {
      width: "12",
      height: "12",
    });

    const deletePath = createElementsHelpers.createSVGElementNS("path", {
      d: "M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z",
      fill: "#C3CAD9",
      ["fill-rule"]: "nonzero",
    });
    deleteSVG.append(deletePath)
    deleteCTA.appendChild(deleteSVG)

    priceDescriptionContainer.appendChild(discountedPrice);

    priceDescriptionContainer.appendChild(times);

    priceDescriptionContainer.appendChild(quantityValue);
    priceDescriptionContainer.appendChild(totalPrice);

    createPhotoFigure.appendChild(createPhoto);
    photoItemContainer.appendChild(createPhotoFigure);

    productDescriptionContainer.appendChild(createHeading);
    productDescriptionContainer.appendChild(priceDescriptionContainer);
    photoItemContainer.appendChild(productDescriptionContainer);

    photoItemContainer.appendChild(deleteCTA)


    itemContainer.appendChild(photoItemContainer);

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
