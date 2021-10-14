import SVGAnimator from "../../utils/svgAnimator.js"
import Content from "../../utils/content.js"
import Navbar from "./navbar.js"
import Animator from "../../utils/animator.js"

export class Sidebar {
	public readonly element: HTMLElement
	public readonly projectList: Sidebar.List<Sidebar.Project.Item>
	public readonly infoList: Sidebar.List<Sidebar.Info.Item>

	public constructor(element: HTMLElement) {
		this.element = element
		this.infoList = new Sidebar.List(element.querySelector("#info"))
		this.projectList = new Sidebar.List(document.querySelector("#projects"))
	}
}

export namespace Sidebar {
	export interface Layout {
		projects: Project.Descriptor[]
		info: Info.Descriptor[]
	}

	export class List<T extends List.Item> {
		public readonly element: HTMLElement
		#items: Map<string, T>

		public constructor(element: HTMLElement) {
			this.element = element
			this.#items = new Map()
		}

		public add(item: T): void {
			this.element.append(item.element)
			this.#items.set(item.name, item)
		}

		public remove(name: string): void {
			let item = this.#items.get(name)
			item.element.remove()

			this.#items.delete(name)
		}

		public get(name: string): T {
			return this.#items.get(name)
		}

		public has(name: string): boolean {
			return this.#items.has(name)
		}

		public [Symbol.iterator](): IterableIterator<T> {
			return this.#items.values()
		}
	}

	export namespace List {
		export interface Item {
			readonly element: HTMLElement
			readonly name: string
		}
	}

	export namespace Project {
		export interface Descriptor {
			name: string
			url?: string
			navFields?: Descriptor.NavField[]
		}

		export namespace Descriptor {
			export interface NavField {
				name: string
				inplace?: boolean
				url?: string
			}
		}

		export class Item {
			public readonly element: HTMLElement
			public readonly descriptor: Descriptor
			private animator: SVGAnimator
			#active: boolean = false

			public constructor(descriptor: Descriptor, callback?: (event: MouseEvent) => void) {
				/** Appearance */
				let panel = document.createElement("div")
				panel.classList.add("panel")

				//Name and action
				let text = document.createElement("div")
				text.textContent = descriptor.name

				if(callback)
					text.addEventListener("click", callback)

				panel.append(text)

				let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
				svg.setAttribute("stroke-width", "5")
				svg.setAttribute("viewBox", "0 0 50 50")
				panel.append(svg)

				let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
				svg.append(path)

				let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate")
				animate.setAttribute("fill", "freeze")
				animate.setAttribute("repeatCount", "1")
				animate.setAttribute("dur", "150ms")
				animate.setAttribute("attributeName", "d")
				animate.setAttribute("from", "M 5 0 v 50")
				animate.setAttribute("to", "M 45 0 v 50")
				path.append(animate)

				/** Animation */
				let animator = new SVGAnimator(svg, 150)

				panel.addEventListener("mouseenter", () => {
					if(this.#active)
						return

					animator.seek(animator.duration)
				})

				panel.addEventListener("mouseleave", () => {
					if(this.#active)
						return

					animator.seek(0)
				})

				this.element = panel
				this.descriptor = descriptor
				this.animator = animator
			}

			public get name(): string {
				return this.descriptor.name
			}

			public get active(): boolean {
				return this.#active
			}

			public set active(value: boolean) {
				if(this.#active == value)
					return

				if(value)
					this.animator.seek(this.animator.duration)
				else
					this.animator.seek(0)

				this.#active = value
			}

			public async view({nav, main}: {nav: Navbar, main: HTMLElement}): Promise<void> {
				if(!this.descriptor.url)
					return

				nav.clearFields()
			
				if(this.descriptor.navFields)
					for(let navItem of this.descriptor.navFields)
						nav.add(new Navbar.Field(navItem.name, async () => {
							if(navItem.url) {
								if(navItem.inplace)
									main.innerHTML = await Content.fetch(navItem.url)
								else
									open(navItem.url, "_blank").focus()
							}
						}))

				main.innerHTML = await Content.fetch(this.descriptor.url)
			}
		}
	}

	export namespace Info {
		export interface Descriptor {
			name: string
			url?: string
		}

		export class Item {
			public readonly element: HTMLElement
			public readonly descriptor: Descriptor

			public constructor(descriptor: Descriptor, callback?: (event: MouseEvent) => void) {
				let item = document.createElement("div")
				item.classList.add("item")

				/** Left border */
				let leftBorder = document.createElementNS("http://www.w3.org/2000/svg", "svg")
				leftBorder.id = "leftBorder"
				leftBorder.setAttribute("viewBox", "0 0 15 30")
				item.append(leftBorder)

				let leftCorner1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
				leftCorner1.setAttribute("d", "M 0 0 h 15")
				leftBorder.append(leftCorner1)

				let leftCorner2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
				leftCorner2.setAttribute("d", "M 0 0 v 15")
				leftBorder.append(leftCorner2)

				/** Text */
				let text = document.createElement("div")
				text.textContent = descriptor.name

				if(callback)
					text.addEventListener("click", callback)

				item.append(text)

				/** Right border */
				let rightBorder = document.createElementNS("http://www.w3.org/2000/svg", "svg")
				rightBorder.id = "rightBorder"
				rightBorder.setAttribute("viewBox", "0 0 15 30")
				item.append(rightBorder)

				let rightCorner1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
				rightCorner1.setAttribute("d", "M 15 30 h -15")
				rightBorder.append(rightCorner1)

				let rightCorner2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
				rightCorner2.setAttribute("d", "M 15 30 v -15")
				rightBorder.append(rightCorner2)

				/** Animation */
				let animator = new Animator({
					options: {fill: "forwards"},
					targets: [
						{
							elements: item,
							options: {duration: 250},
							keyframes: [
								{gap: "0px"},
								{gap: "10px"}
							]
						}
					]
				})

				item.addEventListener("mouseenter", () => animator.forwards())
				item.addEventListener("mouseleave", () => animator.backwards())

				this.element = item
				this.descriptor = descriptor
			}

			public get name(): string {
				return this.descriptor.name
			}

			public async view({nav, main}: {nav: Navbar, main: HTMLElement}): Promise<void> {
				if(!this.descriptor.url)
					return

				nav.clearFields()
				main.innerHTML = await Content.fetch(this.descriptor.url)
			}
		}

	}
}

export default Sidebar