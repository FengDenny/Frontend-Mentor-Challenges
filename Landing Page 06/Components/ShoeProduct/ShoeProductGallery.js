import { shoeProductUI, shoeProductLogic } from "./ShoeProduct";
import { createElementsHelpers } from "../Helpers/CreateElements";
import { NavigationsUI } from "../Navigation/Navigation";

export const shoeProductGalleryLogic = {
  shoeProductContainer: document.getElementById("shoe-product"),
  currentIndex: 0,

  async handleGalleryData() {
    await this.galleryDataContent();
    const shoeProductGalleryPreview = document.getElementById(
      "shoe-product-gallery-preview"
    );
    const shoeProductGallery = document.getElementById("shoe-product-gallery");

    await this.handleGalleryPreview(
      shoeProductUI.previewContainer,
      shoeProductGalleryPreview,
      shoeProductGallery
    );
    this.shoeProductImageChanges(shoeProductGallery);

    this.handleLightboxGallery();
  },

  async createGalleryData(container) {
    const galleryData = await this.retrieveImageData();
    const imageData = galleryData.map((data) => {
      const { id, photoCover } = data;
      const coverPhoto = shoeProductUI.createImages(id, photoCover);
      coverPhoto.dataset.id = id;
      container.appendChild(coverPhoto);
      return coverPhoto;
    });

    return imageData;
  },

  async retrieveImageData() {
    const galleryData = await shoeProductLogic.shoeProductData();
    return galleryData[0].gallery;
  },

  async galleryDataContent() {
    await this.createGalleryData(shoeProductUI.article);
    shoeProductUI.shoeProductGalleryContainer.appendChild(
      shoeProductUI.article
    );
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
    shoeProductUI.shoeProductGalleryContainer.appendChild(buttonDiv);
    shoeProductUI.shoeProductGalleryContainer.appendChild(
      shoeProductUI.previewContainer
    );
    this.shoeProductContainer.appendChild(
      shoeProductUI.shoeProductGalleryContainer
    );
  },

  shoeProductImageChanges(shoeProductGallery) {
    const prevBtn = document.getElementById("prev-btn");

    const nextBtn = document.getElementById("next-btn");

    this.handleImageChanges(
      this.currentIndex,
      shoeProductGallery,
      prevBtn,
      nextBtn
    );
  },

  lightboxImageChanges(gallery) {
    const prevBtn = document.getElementById("prev-light-btn");

    const nextBtn = document.getElementById("next-light-btn");

    this.handleImageChanges(this.currentIndex, gallery, prevBtn, nextBtn);
  },

  highlightPreviewImage(index) {
    // Highlight corresponding preview image
    const previewFigures = document.querySelectorAll(
      "#lightbox-gallery-preview figure"
    );
    previewFigures.forEach((figure, i) => {
      if (i === index) {
        figure.style.border = "2px solid hsl(26, 100%, 55%)";
        figure.querySelector("img").style.opacity = "0.2";
        figure.classList.add("active");
      } else {
        figure.style.border = "none";
        figure.classList.remove("active");
        figure.querySelector("img").style.opacity = "1";
      }
    });
  },
  handleImageChanges(
    currentIndex = this.currentIndex,
    gallery,
    prevBtn = null,
    nextBtn = null
  ) {
    this.currentIndex = currentIndex;

    const figures = Array.from(gallery.getElementsByTagName("figure"));

    const updateGalleryData = () => {

        figures.forEach((figure, index) => {
          if (index === currentIndex) {
            figure.style.opacity = "1";
            figure.style.display = "block";
          } else {
            figure.style.opacity = "0"
            figure.style.display = "none"
          } 
        });
    

    };

    const updateNextImage = () => {
      currentIndex = (currentIndex + 1) % figures.length;
      updateGalleryData();
      this.highlightPreviewImage(currentIndex);
    };

    const updatePreviousImage = () => {
      currentIndex = (currentIndex - 1 + figures.length) % figures.length;
      updateGalleryData();
      this.highlightPreviewImage(currentIndex);
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        updatePreviousImage();
      });
      nextBtn.addEventListener("click", () => {
        updateNextImage();
      });
    }

    updateGalleryData();
  },
  async handleGalleryPreview(container, galleryPreview, gallery) {
    if (document.getElementById("lightbox-container")) {
      container.appendChild(galleryPreview);
      await this.createGalleryData(galleryPreview);
    } else {
      await this.createGalleryData(container);
    }

    const initialPreviewImg = galleryPreview.querySelector(
      "figure:first-child img"
    );
    const initialPreviewFigure =
      galleryPreview.querySelector("figure:first-child");


    if (initialPreviewImg && initialPreviewFigure) {
      initialPreviewFigure.style.border = "2px solid hsl(26, 100%, 55%)";
      initialPreviewImg.style.opacity = "0.2";
      initialPreviewFigure.classList.add("active");
    }


    galleryPreview.addEventListener("mouseover", function (event) {
      const figure = event.target.closest("figure");

      if (figure && galleryPreview.contains(figure)) {
        const figureOverlay = createElementsHelpers.createElement("div", {
          id: "figure-overlay",
          class: "figure-overlay",
        });
        figure.appendChild(figureOverlay);

        // Remove overlay on mouseout
        figure.addEventListener("mouseout", function () {
          if (figure.contains(figureOverlay)) {
            figureOverlay.remove();
          }
        });
      }
    });


    galleryPreview.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const closestImage = clickedElement.closest("img");
    
      if (closestImage) {
        const dataId = closestImage.dataset.id;
        const galleryImg = gallery.querySelector(`img[data-id="${dataId}"]`);

        console.log(galleryImg)

        console.log(gallery)

        if (galleryImg) {
          const currentGalleryFigure = galleryImg.closest("figure");
          const index = Array.from(gallery.children).indexOf(currentGalleryFigure);
          if (index !== -1) {
            this.currentIndex = index; 
            this.handleImageChanges(this.currentIndex, gallery);
          }
        }
      }
    });
  },

  async handleLightboxGallery() {
    const shoeProductGallery = document.getElementById("shoe-product-gallery");

    const overlay = shoeProductGalleryUI.lightboxOverlay;
    const lightboxContainer = shoeProductGalleryUI.lightbox;
    const lightboxGallery = shoeProductGalleryUI.lightboxGallery;
    shoeProductGallery.appendChild(overlay);
    shoeProductGallery.appendChild(lightboxContainer);

    lightboxContainer.appendChild(shoeProductGalleryUI.closeBtn);
    lightboxContainer.appendChild(lightboxGallery);

    const prevBtn = shoeProductUI.createGalleryButtons(
      12,
      "M25 17 17 25l8 8",
      "prev-light-btn"
    );
    const nextBtn = shoeProductUI.createGalleryButtons(
      13,
      "m23 17 8 8-8 8",
      "next-light-btn"
    );
    const buttonDiv = shoeProductGalleryUI.createButtonDiv;
    buttonDiv.appendChild(prevBtn);
    buttonDiv.appendChild(nextBtn);

    lightboxContainer.appendChild(buttonDiv);

    // Initialize gallery and preview
    await this.createGalleryData(lightboxGallery);
    await this.handleGalleryPreview(
      lightboxContainer,
      shoeProductGalleryUI.lightboxPreview,
      lightboxGallery
    );

    shoeProductGallery.addEventListener("click", (event) => {
      const closetGalleryFigure = event.target.closest("figure");
      const lightboxOverlay = shoeProductGalleryUI.lightboxOverlay;

      if (closetGalleryFigure && lightboxOverlay) {
        this.handleToggledOverlay(lightboxOverlay, true);
        this.handleToggledOverlay(lightboxContainer, true);
        this.handleCloseLightbox();
        this.lightboxImageChanges(lightboxGallery);
      }
    });
  },

  handleCloseLightbox() {
    const closeLightboxBtn = document.getElementById("close-overlay");
    const lightboxOverlay = shoeProductGalleryUI.lightboxOverlay;
    const lightboxContainer = document.getElementById("lightbox-container");
    closeLightboxBtn.addEventListener("click", () => {
      this.handleToggledOverlay(lightboxOverlay, false);
      this.handleToggledOverlay(lightboxContainer, false);
    });
  },

  handleToggledOverlay(container, show) {
    if (show) {
      container.classList.add("show");
      container.classList.remove("not-show");
    } else {
      container.classList.remove("show");
      container.classList.add("not-show");
    }
  },
};

const shoeProductGalleryUI = {
  lightboxOverlay: createElementsHelpers.createElement("div", {
    id: "lightbox-overlay",
    class: "overlay not-show",
  }),
  lightbox: createElementsHelpers.createElement("article", {
    id: "lightbox-container",
    class: "lightbox-container not-show",
  }),
  lightboxGallery: createElementsHelpers.createElement("article", {
    id: "lightbox-gallery",
    class: "lightbox-gallery",
  }),
  lightboxPreview: createElementsHelpers.createElement("article", {
    id: "lightbox-gallery-preview",
    class: "lightbox-gallery-preview shoe-product-gallery-preview",
  }),

  closeBtn: NavigationsUI.createCloseButton(
    "#f7f8fd",
    "close-overlay",
    "close-overlay-btn",
    "Close overlay"
  ),
  createButtonDiv: createElementsHelpers.createElement("div", {
    class: "lightbox-btn",
  }),
};

shoeProductGalleryLogic.handleGalleryData();
