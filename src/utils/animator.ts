/**
 * Animates HTMLElements through CSS keyframes
 */
export class Animator {
	private animations: Animation[]

	public constructor({targets, options}: {targets: Animator.Target | Animator.Target[], options?: KeyframeAnimationOptions}) {
		this.animations = ([] as Animator.Target[]).concat(targets).flatMap(t => {
			let o: KeyframeAnimationOptions

			if(options) {
				o ??= {}
				Object.assign(o, options)
			}

			if(t.options) {
				o ??= {}
				Object.assign(o, t.options)
			}

			return ([] as Element[]).concat(t.elements).map(e => {
				let animation = e.animate(t.keyframes, o)
				animation.pause()

				return animation
			})
		})
	}

	public remove(): void {
		this.animations.forEach(animation => animation.cancel())
	}

	public async forwards(): Promise<void> {
		this.animations.forEach(animation => {
			switch(animation.playState) {
				case "running":
					animation.updatePlaybackRate(1)
					break
				case "paused":
					animation.updatePlaybackRate(1)
					animation.play()
					break
				case "finished":
					animation.updatePlaybackRate(1)
					animation.play()
					animation.currentTime = 0
					break
			}
		})

		await this.animationEnd()
	}

	public async backwards(): Promise<void> {
		this.animations.forEach(animation => {
			switch(animation.playState) {
				case "running":
					animation.updatePlaybackRate(-1)
					break
				case "paused":
					animation.updatePlaybackRate(-1)
					animation.play()
					break
				case "finished":
					let time = animation.currentTime

					animation.updatePlaybackRate(-1)
					animation.play()
					animation.currentTime = time
					break
			}
		})

		await this.animationEnd()
	}

	private async animationEnd(): Promise<void> {
		await Promise.all<void>(this.animations.map(a => new Promise<void>(r => {
			a.addEventListener("finish", () => r())
			a.addEventListener("cancel", () => r())
		})))
	}
}

export namespace Animator {
	export interface Target {
		elements: Element | Element[]
		keyframes: Keyframe[]
		options?: KeyframeAnimationOptions
	}
}

export default Animator