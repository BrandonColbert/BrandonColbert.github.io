import Animator from "../../utils/animator.js"

export class Navbar {
	public readonly element: HTMLElement

	public constructor(element: HTMLElement) {
		this.element = element
		this.clearFields()
	}

	public add(field: Navbar.Field): void {
		this.element.style.display = null
		this.element.append(field.element)
	}

	public clearFields(): void {
		this.element.style.display = "none"

		while(this.element.firstElementChild)
			this.element.firstElementChild.remove()
	}
}

export namespace Navbar {
	export class Field {
		public readonly element: HTMLElement

		public constructor(name: string, callback?: (event: MouseEvent) => void) {
			let item = document.createElement("div")
			item.classList.add("item")
			this.element = item

			/** Description */
			let descriptor = document.createElement("div")
			descriptor.id = "descriptor"
			item.append(descriptor)

			let text = document.createElement("div")
			text.id = "text"
			text.textContent = name

			if(callback)
				text.addEventListener("click", callback)

			descriptor.append(text)

			/** Underline */
			let underline = document.createElement("div")
			underline.id = "underline"
			descriptor.append(underline)

			/** Diagonal line */
			let diagonalLine = document.createElement("hr")
			underline.append(diagonalLine)

			/** Horizontal line */
			let horizontalLine = document.createElement("hr")
			underline.append(horizontalLine)

			/** Animation */
			let duration = 250

			let animator = new Animator({
				options: {fill: "forwards"},
				targets: [
					{
						elements: [
							underline.querySelector(":nth-child(1)"),
							underline.querySelector(":nth-child(2)")
						],
						options: {duration: duration / 2, delay: 0, endDelay: duration / 2},
						keyframes: [
							{visibility: "visible", width: "100%"},
							{visibility: "hidden", width: "0%"}
						]
					},
					{
						elements: text,
						options: {duration: duration / 2, delay: duration / 2, endDelay: 0},
						keyframes: [
							{background: "transparent"},
							{background: "var(--color-primary)"}
						]
					}
				]
			})

			item.addEventListener("mouseenter", () => animator.forwards())
			item.addEventListener("mouseleave", () => animator.backwards())
		}
	}
}

export default Navbar