/**
 * Used to animate SVG elements
 */
export default class SVGAnimator {
	/** SVG root element */
	public readonly element: SVGSVGElement

	/** Time in milliseconds of the animation */
	public readonly duration: number

	/**
	 * @param element SVG root element
	 * @param duration Time in milliseconds of the animation
	 */
	public constructor(element: SVGSVGElement, duration: number) {
		this.element = element
		this.duration = duration

		element.pauseAnimations()
	}

	/**
	 * @returns Whether the SVG root element is currently being animated
	 */
	public get animating(): boolean {
		return !this.element.animationsPaused() || "seekHandle" in this.element.dataset
	}

	/**
	 * Time at the animation in milliseconds
	 */
	public get time(): number {
		return this.element.getCurrentTime() * 1000
	}

	public set time(value: number) {
		this.element.setCurrentTime(value / 1000)
	}

	/**
	 * Seeks to a time in the svg animation
	 */
	public async seek(time: number): Promise<void> {
		if("seekHandle" in this.element.dataset) {
			let seekHandle = parseInt(this.element.dataset["seekHandle"])
			clearInterval(seekHandle)
		}

		time = Math.max(0, Math.min(time, this.duration))

		let handle: number
		let direction = Math.sign(time - this.time)
		let lastTime = Date.now()

		return new Promise<void>(resolve => {
			let animate = (): void => {
				let currentTime = Date.now()
				let deltaTime = currentTime - lastTime
				lastTime = currentTime
	
				let animationTime: number
	
				switch(direction) {
					case 1:
						animationTime = Math.min(time, this.time + deltaTime)
						break
					case -1:
						animationTime = Math.max(time, this.time - deltaTime)
						break
					default:
						return
				}
	
				this.time = animationTime
	
				if(animationTime != time)
					return

				clearInterval(handle)
				delete this.element.dataset["seekHandle"]
				resolve()
			}
	
			handle = setInterval(animate)
			this.element.dataset["seekHandle"] = handle.toString()
		})
	}
	/**
	 * Plays the animation
	 */
	public async play(): Promise<void> {
		this.time = 0
		await this.seek(this.duration)
	}

	/**
	 * Plays the animation in reverse
	 */
	public async playReverse(): Promise<void> {
		this.time = this.duration
		await this.seek(0)
	}
}