function Modal(title, text){
    this.title = title
    this.text = text,
    this.modalElement = null
}

Modal.prototype.createModal = function(){
    const modal = document.createElement("div")
    modal.id = "modal"
    modal.className = "modal"

    const titleElement = document.createElement("h2")
    titleElement.className = 'modal-heading'
    titleElement.textContent = this.title
    modal.appendChild(titleElement)

    const textElement = document.createElement("p")
    textElement.className = 'modal-description'
    textElement.textContent = this.text
    modal.appendChild(textElement)

    this.modalElement = modal
    return modal
}

Modal.prototype.addButton = function(button){
    if(this.modalElement){
        this.modalElement.appendChild(button)
    }
}

Modal.prototype.open = function(){
    document.body.appendChild(this.modalElement)
    this.modalElement.style.display = "block"
}

Modal.prototype.close = function(){
    if(this.modalElement){
        console.log("closed")
        this.modalElement.style.display = "none"
        document.body.removeChild(this.modalElement)
    }
}

export default Modal