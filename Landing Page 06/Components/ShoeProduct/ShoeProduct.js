import { createElementsHelpers } from "../Helpers/CreateElements";

export const shoeProductLogic = {
  shoeProductContainer: document.getElementById("shoe-product"),
  currentIndex: 0,

  async handleGalleryData() {
    await this.galleryDataContent();
    await this.shoesProductInformationContent();
    this.handleImageChanges();
  },

  handleImageChanges(currentIndex = this.currentIndex) {
    this.currentIndex = currentIndex;
    const shoeProductGallery = document.getElementById("shoe-product-gallery");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    const figures = Array.from(
      shoeProductGallery.getElementsByTagName("figure")
    );
    const updateGalleryData = () => {
      figures.forEach((figure, index) => {
        figure.style.opacity = index === currentIndex ? "1" : "0";
      });
    };

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + figures.length) % figures.length;
      updateGalleryData();
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % figures.length;
      updateGalleryData();
    });
    updateGalleryData();
  },

  async galleryDataContent() {
    const galleryData = await this.shoeProductData();
    galleryData[0].gallery.forEach((data) => {
      const { id, photoCover } = data;
      const coverPhoto = shoeProductUI.createImages(id, photoCover);
      shoeProductUI.article.appendChild(coverPhoto);
    });
    shoeProductUI.div.appendChild(shoeProductUI.article);
    const prevBtn = shoeProductUI.createGalleryButtons(
      12,
      "M25 17 17 25l8 8",
      "prev-btn"
    );
    const nextBtn = shoeProductUI.createGalleryButtons(
      13,
      "m23 17 8 8-8 8",
      "next-btn"
    );
    const buttonDiv = shoeProductUI.buttonDiv;
    buttonDiv.appendChild(prevBtn);
    buttonDiv.appendChild(nextBtn);
    shoeProductUI.div.appendChild(buttonDiv);
    this.shoeProductContainer.appendChild(shoeProductUI.div);
  },

  async shoesProductInformationContent() {
    const data = await this.shoeProductData();
    data.forEach((item) => {
      shoeProductUI.createShoeInformationContent(item);
    });
    this.shoeProductContainer.appendChild(
      shoeProductUI.shoesProductInformationDiv
    );
    shoeProductUI.createShoeCTA();
  },

  async shoeProductData() {
    try {
      const data = await this.handleFetchShoeProduct();
      return data.map((item) => item);
    } catch (error) {
      console.error("Error processing the shoe product data:", error);
      return null;
    }
  },

  async handleFetchShoeProduct() {
    try {
      const response = await fetch("../data/shoeProduct.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading the JSON data:", error);
      throw error;
    }
  },
};

export const shoeProductUI = {
  div: createElementsHelpers.createElement("div", {
    class: "shoes-product-gallery-container",
  }),
  article: createElementsHelpers.createElement("article", {
    id: "shoe-product-gallery",
    class: "shoe-product-gallery",
  }),

  buttonDiv: createElementsHelpers.createElement("div", {
    class: "button-container",
  }),
  quantityButtonDiv: createElementsHelpers.createElement("div", {
    class: "quantity-button-container",
  }),
  quantityInputContainer: createElementsHelpers.createElement("div", {
    class: "quantity-input-container",
  }),
  shoesProductInformationDiv: createElementsHelpers.createElement("div", {
    class: "shoe-product-information-container",
  }),

  createShoeInformationContent({
    company,
    sneaker,
    description,
    "price-discounted": priceDiscounted,
    "discount-percentage": discountPercentage,
    "price-full": fullPrice,
  } = item) {
    const companyHeading = createElementsHelpers.createElement(
      "h2",
      {
        class: "product-company-header",
      },
      company
    );
    const sneakerHeading = createElementsHelpers.createElement(
      "h2",
      {
        class: "product-sneaker-header",
      },
      sneaker
    );
    const productDescription = createElementsHelpers.createElement(
      "p",
      {
        class: "product-description",
      },
      description
    );
    const priceDiscountedHeading = createElementsHelpers.createElement(
      "h2",
      {
        class: "discounted-price-header",
      },
      priceDiscounted
    );
    const discountHeading = createElementsHelpers.createElement(
      "h3",
      {
        class: "product-discount-header",
      },
      `${discountPercentage}%`
    );
    const fullPriceHeading = createElementsHelpers.createElement(
      "h4",
      {
        class: "product-full-price-header",
      },
      fullPrice
    );

    const priceContainer = createElementsHelpers.createElement("div", {
      class: "price-container",
    });

    const priceDiscountedContainer = createElementsHelpers.createElement(
      "div",
      {
        class: "price-discounted-container",
      }
    );

    this.shoesProductInformationDiv.appendChild(companyHeading);
    this.shoesProductInformationDiv.appendChild(sneakerHeading);
    this.shoesProductInformationDiv.appendChild(productDescription);

    priceDiscountedContainer.appendChild(priceDiscountedHeading);
    priceDiscountedContainer.appendChild(discountHeading);
    priceContainer.appendChild(priceDiscountedContainer);
    priceContainer.appendChild(fullPriceHeading);
    this.shoesProductInformationDiv.appendChild(priceContainer);
  },

  createShoesCTACart(){
    const cartSVG = createElementsHelpers.createSVGElementNS("svg", {
      width: "22",
      height: "20",
    });

    const cartPath = createElementsHelpers.createSVGElementNS("path", {
      d: "M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z",
      fill: "#69707D",
      ["fill-rule"]: "nonzero",
    });

    cartSVG.appendChild(cartPath);

    const addToCartCTA = createElementsHelpers.createElement("button", {
      id: "add-to-cart",
      class: "add-to-cart-cta",
    }, "Add to cart");



    addToCartCTA.insertBefore(cartSVG, addToCartCTA.firstChild)

    return addToCartCTA

  },

  createShoeCTA() {
    const quantity = createElementsHelpers.createElement("input", {
      id: "quantity",
      type: "number",
      placeholder: "0",
      step: "1",
      min: "0",
      max: "10",
    });



    const minus = this.createQuantityButton(
      "12",
      "M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z",
      "plus"
    );
    const plus = this.createQuantityButton(
      "4",
      "M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z",
      "minus"
    );

    const div = createElementsHelpers.createElement("div", {
      class:"cta-container"
    })

    const addToCartCTAContainer = createElementsHelpers.createElement("div", {
      class:"add-cart-cta-container"
    })

    this.quantityInputContainer.appendChild(quantity);
    this.quantityInputContainer.appendChild(minus);
    this.quantityInputContainer.appendChild(plus);

    addToCartCTAContainer.appendChild(this.createShoesCTACart())
    div.appendChild(this.quantityInputContainer)
    div.appendChild(addToCartCTAContainer)

    shoeProductLogic.shoeProductContainer.appendChild(
      div
    );
  },

  createQuantityButton(height, pathData, id) {
    const button = createElementsHelpers.createElement("button", {
      id,
      class: "quantity-btn",
    });
    const svg = createElementsHelpers.createSVGElementNS("svg", {
      width: "12",
      height,
    });
    const path = createElementsHelpers.createSVGElementNS("path", {
      d: pathData,
      fill: "#FF7E1B",
      ["fill-rule"]: "nonzero",
    });

    svg.appendChild(path);
    button.appendChild(svg);
    return button;
  },

  createGalleryButtons(size, pathData, id) {
    const button = createElementsHelpers.createElement("button", {
      id,
      class: "gallery-btn",
    });
    const svg = createElementsHelpers.createSVGElementNS("svg", {
      width: size,
      height: "18",
    });
    const path = createElementsHelpers.createSVGElementNS("path", {
      d: pathData,
      stroke: "#1D2026",
      ["stroke-width"]: "3",
      fill: "none",
      ["fill-rule"]: "evenodd",
    });

    svg.appendChild(path);
    button.appendChild(svg);
    return button;
  },

  createImages(id, src) {
    const figure = createElementsHelpers.createElement("figure");
    const image = createElementsHelpers.createElement("img", {
      src: `../${src}`,
      class: "shoe-product-img",
      ["data-id"]: id,
    });

    figure.appendChild(image);
    return figure;
  },
};

shoeProductLogic.handleGalleryData();
