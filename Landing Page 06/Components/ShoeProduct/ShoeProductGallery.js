import { shoeProductUI, shoeProductLogic } from "./ShoeProduct";
import { createElementsHelpers } from "../Helpers/CreateElements";
import { NavigationsUI } from "../Navigation/Navigation";

export const shoeProductGalleryLogic = {
  shoeProductContainer: document.getElementById("shoe-product"),
  currentIndex: 0,

  async handleGalleryData() {
    await this.galleryDataContent();
    await this.galleryPreview();
    this.handleImageChanges();
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
    this.createGalleryData(shoeProductUI.article);
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
  async galleryPreview() {
    await this.createGalleryData(shoeProductUI.previewContainer);
    const shoeProductGallery = document.getElementById("shoe-product-gallery");
    const shoeProductGalleryPreview = document.getElementById(
      "shoe-product-gallery-preview"
    );

    const initialPreviewImg = shoeProductGalleryPreview.querySelector(
      "figure:first-child img"
    );
    const initialPreviewFigure =
      shoeProductGalleryPreview.querySelector("figure:first-child");

    const initialGalleryFigure =
      shoeProductGallery.querySelector("figure:first-child");

    if (initialPreviewImg && initialPreviewFigure) {
      initialPreviewFigure.style.border = "2px solid hsl(26, 100%, 55%)";
      initialPreviewImg.style.opacity = "0.2";
    }

    let previousGalleryFigure = initialGalleryFigure;
    let previousClosestImg = initialPreviewImg;
    let previousClosestFigure = initialPreviewFigure;
    shoeProductGalleryPreview.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const closestImage = clickedElement.closest("img");

      // Reset initial preview image and figure styles first
      initialPreviewFigure.style.border = "none";
      initialPreviewImg.style.opacity = "1";

      if (closestImage) {
        const dataId = closestImage.dataset.id;
        const galleryImg = shoeProductGallery.querySelector(
          `img[data-id="${dataId}"]`
        );

        if (galleryImg) {
          const currentGalleryFigure = galleryImg.closest("figure");
          const closetFigure = clickedElement.closest("figure");

          if (
            previousGalleryFigure &&
            previousGalleryFigure !== currentGalleryFigure
          ) {
            previousGalleryFigure.style.opacity = "0";
            previousClosestFigure.style.border = "none";
            previousClosestImg.style.opacity = "1";
            previousGalleryFigure.style.display = "none";
          }

          if (currentGalleryFigure) {
            currentGalleryFigure.style.display = "block";
            currentGalleryFigure.style.opacity = "1";
            closetFigure.style.border = "2px solid hsl(26, 100%, 55%)";
            closestImage.style.opacity = "0.2";
          }

          previousGalleryFigure = currentGalleryFigure;
          previousClosestImg = closestImage;
          previousClosestFigure = closetFigure;
        }
      }
    });
  },

  async handleGalleryPreivew(galleryPreview, gallery){

    const lightboxContainer = shoeProductGalleryUI.lightbox;

    lightboxContainer.appendChild(shoeProductGalleryUI.lightboxPreview);

    await this.createGalleryData(shoeProductGalleryUI.lightboxPreview)

    // const initialPreviewImg = galleryPreview.querySelector(
    //   "figure:first-child img"
    // );
    // const initialPreviewFigure =
    //   galleryPreview.querySelector("figure:first-child");

    // const initialGalleryFigure =
    //   gallery.querySelector("figure:first-child");

    // if (initialPreviewImg && initialPreviewFigure) {
    //   initialPreviewFigure.style.border = "2px solid hsl(26, 100%, 55%)";
    //   initialPreviewImg.style.opacity = "0.2";
    // }

    // let previousGalleryFigure = initialGalleryFigure;
    // let previousClosestImg = initialPreviewImg;
    // let previousClosestFigure = initialPreviewFigure;
    // galleryPreview.addEventListener("click", (event) => {
    //   const clickedElement = event.target;
    //   const closestImage = clickedElement.closest("img");

    //   // Reset initial preview image and figure styles first
    //   initialPreviewFigure.style.border = "none";
    //   initialPreviewImg.style.opacity = "1";

    //   if (closestImage) {
    //     const dataId = closestImage.dataset.id;
    //     const galleryImg = gallery.querySelector(
    //       `img[data-id="${dataId}"]`
    //     );

    //     if (galleryImg) {
    //       const currentGalleryFigure = galleryImg.closest("figure");
    //       const closetFigure = clickedElement.closest("figure");

    //       if (
    //         previousGalleryFigure &&
    //         previousGalleryFigure !== currentGalleryFigure
    //       ) {
    //         previousGalleryFigure.style.opacity = "0";
    //         previousClosestFigure.style.border = "none";
    //         previousClosestImg.style.opacity = "1";
    //         previousGalleryFigure.style.display = "none";
    //       }

    //       if (currentGalleryFigure) {
    //         currentGalleryFigure.style.display = "block";
    //         currentGalleryFigure.style.opacity = "1";
    //         closetFigure.style.border = "2px solid hsl(26, 100%, 55%)";
    //         closestImage.style.opacity = "0.2";
    //       }

    //       previousGalleryFigure = currentGalleryFigure;
    //       previousClosestImg = closestImage;
    //       previousClosestFigure = closetFigure;
    //     }
    //   }
    // });
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
        if (index === currentIndex) {
          figure.style.opacity = " 1";
          figure.style.display = "block";
        } else {
          figure.style.opacity = " 0";
          figure.style.display = "none";
        }
      });
    };

    const updateNextImage = () => {
      currentIndex = (currentIndex + 1) % figures.length;
      updateGalleryData();
    };

    const updatePreviousImage = () => {
      currentIndex = (currentIndex - 1 + figures.length) % figures.length;
      updateGalleryData();
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


  async handleLightboxGallery() {
    const shoeProductGallery = document.getElementById("shoe-product-gallery");

    const overlay = shoeProductGalleryUI.lightboxOverlay;
    const lightboxContainer = shoeProductGalleryUI.lightbox;
    const lightboxGallery = shoeProductGalleryUI.lightboxGallery;
    shoeProductGallery.appendChild(overlay);
    shoeProductGallery.appendChild(lightboxContainer);

    lightboxContainer.appendChild(shoeProductGalleryUI.closeBtn);
    lightboxContainer.appendChild(lightboxGallery);

    
    shoeProductGallery.addEventListener("click", (event) => {
      const closetGalleryFigure = event.target.closest("figure");
      const lightboxOverlay = shoeProductGalleryUI.lightboxOverlay;
 
      if (closetGalleryFigure && lightboxOverlay) {
        console.log(closetGalleryFigure);
        this.handleToggledOverlay(lightboxOverlay, true);
        this.handleToggledOverlay(lightboxContainer, true);
        this.handleCloseLightbox();

        if(!lightboxGallery.querySelector("figure[data-id]")){
          this.createGalleryData(lightboxGallery);
        }
        if(!shoeProductGalleryUI.lightboxPreview.querySelector("figure[data-id]")){
        this.handleGalleryPreivew()
        }


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
};

shoeProductGalleryLogic.handleGalleryData();
