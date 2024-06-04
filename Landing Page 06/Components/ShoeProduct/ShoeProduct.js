import { createElementsHelpers } from "../Helpers/CreateElements";

export const shoeProductLogic = {
  shoeProductContainer:document.getElementById("shoe-product"), 

   async galleryDataContent(){
    const galleryData = await this.galleryData()
    galleryData.map(data => {
      const {id, thumbnail, photoCover} = data
      const coverPhoto = shoeProductUI.createImages(id, photoCover)
      shoeProductUI.article.appendChild(coverPhoto)
      this.shoeProductContainer.appendChild(shoeProductUI.article)
    })
    
  },

  async galleryData() {
    try {
      const data = await this.handleFetchShoeProduct();
      let gallery = null;
      data.forEach((item) => {
        gallery = item.gallery;
      });
      return gallery;
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
  article: createElementsHelpers.createElement("article", {
    class: "shoe-product-gallery",
  }),
  
  createImages(id, src) {
    const figure = createElementsHelpers.createElement("figure");
    const image = createElementsHelpers.createElement("img", {
      src:`../${src}`,
      class: "shoe-product-img",
      ["data-id"]: id,
    });

    figure.appendChild(image)
    return figure
  },
};

shoeProductLogic.galleryDataContent();
