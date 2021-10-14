import UIElement from "../uiElement.js"

/**
 * Copies attributes to specified elements.
 * 
 * The attribute "path" specifies the elements to match.
 * 
 * The attribute "attributes" is a JSON map to define the attribute's name and value.
 */
class CopyToElement extends UIElement {
	protected override attached(): void {
		let path = this.getAttribute("path") ?? ""
		let attributes: {[key: string]: string | number | boolean}

		try {
			attributes = JSON.parse(this.getAttribute("attributes") ?? "{}")
		} catch(e) {
			console.error(e)
			return
		}

		document.querySelectorAll(path).forEach(e => {
			Object.entries(attributes).forEach(
				([k, v]) => e.setAttribute(k, v.toString())
			)
		})

		this.remove()
	}
}

CopyToElement.register("copy-to")
export default CopyToElement