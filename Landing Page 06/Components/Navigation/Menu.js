import { createElementsHelpers } from "../Helpers/CreateElements";
import {NavigationsLogic} from "../Navigation/Navigation"


export const MenuUI= {
      createOpenedMenuLinks(style, id){
        const ul = createElementsHelpers.createElement("ul",{
            id
        })
        const linkData = ["Collections", "Men", "Women", "About", "Contact"]
        linkData.map((item) => {
            const li = createElementsHelpers.createElement("li")
            const links = createElementsHelpers.createElement("a", {
                class: style
            }, item)
            li.appendChild(links)
            ul.appendChild(li)
        })
        NavigationsLogic.menuOpened.appendChild(ul);
      }
}