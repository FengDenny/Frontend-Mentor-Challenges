import { createElementsHelpers } from "../Helpers/CreateElements";


export const cartLogic = {
    openCart: document.getElementById("open-cart"),

    handleOpenCartHover(){
        const cartModal = document.getElementById("cart-modal")

        this.openCart.addEventListener("mouseover", (e) => {
            this.handleCartModalAppearance("show", "not-show")
            this.openCart.setAttribute("aria-expanded", "true", "true")

        })
        this.openCart.addEventListener("mouseout", (e) => {
           this.handleCartModalAppearance("not-show", "show", "false")
        })

    },

    handleCartModalAppearance(add, remove, ariaExpanded){
        const cartModal = document.getElementById("cart-modal")
        cartModal.classList.add(add)
        cartModal.classList.remove(remove)
        this.openCart.setAttribute("aria-expanded", ariaExpanded)
    }
  
};

export const cartUI = {
  
};

cartLogic.handleOpenCartHover()

