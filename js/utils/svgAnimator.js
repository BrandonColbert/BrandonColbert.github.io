/**
 * Used to animate SVG elements
 */
export default class SVGAnimator {
    /** SVG root element */
    element;
    /** Time in milliseconds of the animation */
    duration;
    /**
     * @param element SVG root element
     * @param duration Time in milliseconds of the animation
     */
    constructor(element, duration) {
        this.element = element;
        this.duration = duration;
        element.pauseAnimations();
    }
    /**
     * @returns Whether the SVG root element is currently being animated
     */
    get animating() {
        return !this.element.animationsPaused() || "seekHandle" in this.element.dataset;
    }
    /**
     * Time at the animation in milliseconds
     */
    get time() {
        return this.element.getCurrentTime() * 1000;
    }
    set time(value) {
        this.element.setCurrentTime(value / 1000);
    }
    /**
     * Seeks to a time in the svg animation
     */
    async seek(time) {
        if ("seekHandle" in this.element.dataset) {
            let seekHandle = parseInt(this.element.dataset["seekHandle"]);
            clearInterval(seekHandle);
        }
        time = Math.max(0, Math.min(time, this.duration));
        let handle;
        let direction = Math.sign(time - this.time);
        let lastTime = Date.now();
        return new Promise(resolve => {
            let animate = () => {
                let currentTime = Date.now();
                let deltaTime = currentTime - lastTime;
                lastTime = currentTime;
                let animationTime;
                switch (direction) {
                    case 1:
                        animationTime = Math.min(time, this.time + deltaTime);
                        break;
                    case -1:
                        animationTime = Math.max(time, this.time - deltaTime);
                        break;
                    default:
                        return;
                }
                this.time = animationTime;
                if (animationTime != time)
                    return;
                clearInterval(handle);
                delete this.element.dataset["seekHandle"];
                resolve();
            };
            handle = setInterval(animate);
            this.element.dataset["seekHandle"] = handle.toString();
        });
    }
    /**
     * Plays the animation
     */
    async play() {
        this.time = 0;
        await this.seek(this.duration);
    }
    /**
     * Plays the animation in reverse
     */
    async playReverse() {
        this.time = this.duration;
        await this.seek(0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnQW5pbWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc3ZnQW5pbWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVc7SUFDL0IsdUJBQXVCO0lBQ1AsT0FBTyxDQUFlO0lBRXRDLDRDQUE0QztJQUM1QixRQUFRLENBQVE7SUFFaEM7OztPQUdHO0lBQ0gsWUFBbUIsT0FBc0IsRUFBRSxRQUFnQjtRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUV4QixPQUFPLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxTQUFTO1FBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBQ2hGLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUE7SUFDNUMsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBWTtRQUM3QixJQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUM3RCxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDekI7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFFakQsSUFBSSxNQUFjLENBQUE7UUFDbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUV6QixPQUFPLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLElBQUksT0FBTyxHQUFHLEdBQVMsRUFBRTtnQkFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUM1QixJQUFJLFNBQVMsR0FBRyxXQUFXLEdBQUcsUUFBUSxDQUFBO2dCQUN0QyxRQUFRLEdBQUcsV0FBVyxDQUFBO2dCQUV0QixJQUFJLGFBQXFCLENBQUE7Z0JBRXpCLFFBQU8sU0FBUyxFQUFFO29CQUNqQixLQUFLLENBQUM7d0JBQ0wsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUE7d0JBQ3JELE1BQUs7b0JBQ04sS0FBSyxDQUFDLENBQUM7d0JBQ04sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUE7d0JBQ3JELE1BQUs7b0JBQ047d0JBQ0MsT0FBTTtpQkFDUDtnQkFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQTtnQkFFekIsSUFBRyxhQUFhLElBQUksSUFBSTtvQkFDdkIsT0FBTTtnQkFFUCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFBO1lBQ1YsQ0FBQyxDQUFBO1lBRUQsTUFBTSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDdkQsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxLQUFLLENBQUMsSUFBSTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNiLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFdBQVc7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3pCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuQixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZWQgdG8gYW5pbWF0ZSBTVkcgZWxlbWVudHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1ZHQW5pbWF0b3Ige1xuXHQvKiogU1ZHIHJvb3QgZWxlbWVudCAqL1xuXHRwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogU1ZHU1ZHRWxlbWVudFxuXG5cdC8qKiBUaW1lIGluIG1pbGxpc2Vjb25kcyBvZiB0aGUgYW5pbWF0aW9uICovXG5cdHB1YmxpYyByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyXG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGVtZW50IFNWRyByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIGR1cmF0aW9uIFRpbWUgaW4gbWlsbGlzZWNvbmRzIG9mIHRoZSBhbmltYXRpb25cblx0ICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OiBTVkdTVkdFbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKSB7XG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudFxuXHRcdHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvblxuXG5cdFx0ZWxlbWVudC5wYXVzZUFuaW1hdGlvbnMoKVxuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIFNWRyByb290IGVsZW1lbnQgaXMgY3VycmVudGx5IGJlaW5nIGFuaW1hdGVkXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdGluZygpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gIXRoaXMuZWxlbWVudC5hbmltYXRpb25zUGF1c2VkKCkgfHwgXCJzZWVrSGFuZGxlXCIgaW4gdGhpcy5lbGVtZW50LmRhdGFzZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBUaW1lIGF0IHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRpbWUoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmdldEN1cnJlbnRUaW1lKCkgKiAxMDAwXG5cdH1cblxuXHRwdWJsaWMgc2V0IHRpbWUodmFsdWU6IG51bWJlcikge1xuXHRcdHRoaXMuZWxlbWVudC5zZXRDdXJyZW50VGltZSh2YWx1ZSAvIDEwMDApXG5cdH1cblxuXHQvKipcblx0ICogU2Vla3MgdG8gYSB0aW1lIGluIHRoZSBzdmcgYW5pbWF0aW9uXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2Vlayh0aW1lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZihcInNlZWtIYW5kbGVcIiBpbiB0aGlzLmVsZW1lbnQuZGF0YXNldCkge1xuXHRcdFx0bGV0IHNlZWtIYW5kbGUgPSBwYXJzZUludCh0aGlzLmVsZW1lbnQuZGF0YXNldFtcInNlZWtIYW5kbGVcIl0pXG5cdFx0XHRjbGVhckludGVydmFsKHNlZWtIYW5kbGUpXG5cdFx0fVxuXG5cdFx0dGltZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRpbWUsIHRoaXMuZHVyYXRpb24pKVxuXG5cdFx0bGV0IGhhbmRsZTogbnVtYmVyXG5cdFx0bGV0IGRpcmVjdGlvbiA9IE1hdGguc2lnbih0aW1lIC0gdGhpcy50aW1lKVxuXHRcdGxldCBsYXN0VGltZSA9IERhdGUubm93KClcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcblx0XHRcdGxldCBhbmltYXRlID0gKCk6IHZvaWQgPT4ge1xuXHRcdFx0XHRsZXQgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpXG5cdFx0XHRcdGxldCBkZWx0YVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lXG5cdFx0XHRcdGxhc3RUaW1lID0gY3VycmVudFRpbWVcblx0XG5cdFx0XHRcdGxldCBhbmltYXRpb25UaW1lOiBudW1iZXJcblx0XG5cdFx0XHRcdHN3aXRjaChkaXJlY3Rpb24pIHtcblx0XHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0XHRhbmltYXRpb25UaW1lID0gTWF0aC5taW4odGltZSwgdGhpcy50aW1lICsgZGVsdGFUaW1lKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRjYXNlIC0xOlxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uVGltZSA9IE1hdGgubWF4KHRpbWUsIHRoaXMudGltZSAtIGRlbHRhVGltZSlcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFxuXHRcdFx0XHR0aGlzLnRpbWUgPSBhbmltYXRpb25UaW1lXG5cdFxuXHRcdFx0XHRpZihhbmltYXRpb25UaW1lICE9IHRpbWUpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChoYW5kbGUpXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YXNldFtcInNlZWtIYW5kbGVcIl1cblx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHR9XG5cdFxuXHRcdFx0aGFuZGxlID0gc2V0SW50ZXJ2YWwoYW5pbWF0ZSlcblx0XHRcdHRoaXMuZWxlbWVudC5kYXRhc2V0W1wic2Vla0hhbmRsZVwiXSA9IGhhbmRsZS50b1N0cmluZygpXG5cdFx0fSlcblx0fVxuXHQvKipcblx0ICogUGxheXMgdGhlIGFuaW1hdGlvblxuXHQgKi9cblx0cHVibGljIGFzeW5jIHBsYXkoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy50aW1lID0gMFxuXHRcdGF3YWl0IHRoaXMuc2Vlayh0aGlzLmR1cmF0aW9uKVxuXHR9XG5cblx0LyoqXG5cdCAqIFBsYXlzIHRoZSBhbmltYXRpb24gaW4gcmV2ZXJzZVxuXHQgKi9cblx0cHVibGljIGFzeW5jIHBsYXlSZXZlcnNlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMudGltZSA9IHRoaXMuZHVyYXRpb25cblx0XHRhd2FpdCB0aGlzLnNlZWsoMClcblx0fVxufSJdfQ==