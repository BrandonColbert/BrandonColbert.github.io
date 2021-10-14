import Animator from "./animator.js"

export default class HideOnScroll {
	private static registry: Map<HTMLElement, Descriptor> = new Map()

	public static register(element: HTMLElement, scrolling: HTMLElement): void {
		if(this.registry.has(element))
			return

		let animator: Animator
		let lastScroll: number
		let lastDeltaScroll: number

		function onScroll() {
			let scroll = scrolling.scrollTop
			let deltaScroll = Math.sign(scroll - lastScroll)

			if(scroll == lastScroll)
				return
			else if(deltaScroll != lastDeltaScroll && Math.abs(deltaScroll) == 1) {
				switch(deltaScroll) {
					case -1:
						animator.backwards()
						break
					case 1:
						animator.forwards()
						break
				}

				scrolling.scrollTop = lastScroll
			} else
				lastScroll = scroll

			lastDeltaScroll = deltaScroll
		}

		function onHover() {
			if(isNaN(lastScroll) || isNaN(lastDeltaScroll))
				return

			animator.backwards()
			lastScroll = NaN
			lastDeltaScroll = NaN
		}

		let descriptor: Descriptor

		descriptor = {
			element: element,
			scrollingElement: scrolling,
			bind: () => {
				animator = new Animator({
					options: {
						duration: 150,
						fill: "forwards"
					},
					targets: {
						elements: element,
						keyframes: [
							{
								height: getComputedStyle(element).getPropertyValue("height"),
								padding: "12px 0px",
								margin: "0px 0px 10px 0px"
							},
							{
								height: "1px",
								padding: "1px 0px 0px 0px",
								margin: "0px",
								border: "transparent"
							}
						]
					}
				})

				element.addEventListener("mouseover", onHover)
				scrolling.addEventListener("scroll", onScroll)

				this.registry.set(element, descriptor)
			},
			unbind: () => {				
				animator.remove()
				animator = null

				element.removeEventListener("mouseover", onHover)
				scrolling.removeEventListener("scroll", onScroll)

				this.registry.delete(element)
			}
		}

		descriptor.bind()
	}

	public static unregister(element: HTMLElement): void {
		this.registry.get(element)?.unbind()
	}
}

interface Descriptor {
	readonly element: HTMLElement
	readonly scrollingElement: HTMLElement
	bind(): void
	unbind(): void
}