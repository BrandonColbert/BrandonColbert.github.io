import Animator from "./animator.js";
export default class HideOnScroll {
    static registry = new Map();
    static register(element, scrolling) {
        if (this.registry.has(element))
            return;
        let animator;
        let lastScroll;
        let lastDeltaScroll;
        function onScroll() {
            let scroll = scrolling.scrollTop;
            let deltaScroll = Math.sign(scroll - lastScroll);
            if (scroll == lastScroll)
                return;
            else if (deltaScroll != lastDeltaScroll && Math.abs(deltaScroll) == 1) {
                switch (deltaScroll) {
                    case -1:
                        animator.backwards();
                        break;
                    case 1:
                        animator.forwards();
                        break;
                }
                scrolling.scrollTop = lastScroll;
            }
            else
                lastScroll = scroll;
            lastDeltaScroll = deltaScroll;
        }
        function onHover() {
            if (isNaN(lastScroll) || isNaN(lastDeltaScroll))
                return;
            animator.backwards();
            lastScroll = NaN;
            lastDeltaScroll = NaN;
        }
        let descriptor;
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
                });
                element.addEventListener("mouseover", onHover);
                scrolling.addEventListener("scroll", onScroll);
                this.registry.set(element, descriptor);
            },
            unbind: () => {
                animator.remove();
                animator = null;
                element.removeEventListener("mouseover", onHover);
                scrolling.removeEventListener("scroll", onScroll);
                this.registry.delete(element);
            }
        };
        descriptor.bind();
    }
    static unregister(element) {
        this.registry.get(element)?.unbind();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZU9uU2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2hpZGVPblNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUE7QUFFcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFZO0lBQ3hCLE1BQU0sQ0FBQyxRQUFRLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUE7SUFFMUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFvQixFQUFFLFNBQXNCO1FBQ2xFLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzVCLE9BQU07UUFFUCxJQUFJLFFBQWtCLENBQUE7UUFDdEIsSUFBSSxVQUFrQixDQUFBO1FBQ3RCLElBQUksZUFBdUIsQ0FBQTtRQUUzQixTQUFTLFFBQVE7WUFDaEIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUNoQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQTtZQUVoRCxJQUFHLE1BQU0sSUFBSSxVQUFVO2dCQUN0QixPQUFNO2lCQUNGLElBQUcsV0FBVyxJQUFJLGVBQWUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckUsUUFBTyxXQUFXLEVBQUU7b0JBQ25CLEtBQUssQ0FBQyxDQUFDO3dCQUNOLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTt3QkFDcEIsTUFBSztvQkFDTixLQUFLLENBQUM7d0JBQ0wsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO3dCQUNuQixNQUFLO2lCQUNOO2dCQUVELFNBQVMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFBO2FBQ2hDOztnQkFDQSxVQUFVLEdBQUcsTUFBTSxDQUFBO1lBRXBCLGVBQWUsR0FBRyxXQUFXLENBQUE7UUFDOUIsQ0FBQztRQUVELFNBQVMsT0FBTztZQUNmLElBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUM7Z0JBQzdDLE9BQU07WUFFUCxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUE7WUFDcEIsVUFBVSxHQUFHLEdBQUcsQ0FBQTtZQUNoQixlQUFlLEdBQUcsR0FBRyxDQUFBO1FBQ3RCLENBQUM7UUFFRCxJQUFJLFVBQXNCLENBQUE7UUFFMUIsVUFBVSxHQUFHO1lBQ1osT0FBTyxFQUFFLE9BQU87WUFDaEIsZ0JBQWdCLEVBQUUsU0FBUztZQUMzQixJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUNWLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztvQkFDdkIsT0FBTyxFQUFFO3dCQUNSLFFBQVEsRUFBRSxHQUFHO3dCQUNiLElBQUksRUFBRSxVQUFVO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1IsUUFBUSxFQUFFLE9BQU87d0JBQ2pCLFNBQVMsRUFBRTs0QkFDVjtnQ0FDQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO2dDQUM1RCxPQUFPLEVBQUUsVUFBVTtnQ0FDbkIsTUFBTSxFQUFFLGtCQUFrQjs2QkFDMUI7NEJBQ0Q7Z0NBQ0MsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsT0FBTyxFQUFFLGlCQUFpQjtnQ0FDMUIsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsTUFBTSxFQUFFLGFBQWE7NkJBQ3JCO3lCQUNEO3FCQUNEO2lCQUNELENBQUMsQ0FBQTtnQkFFRixPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUM5QyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUU5QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDdkMsQ0FBQztZQUNELE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1osUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO2dCQUNqQixRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUVmLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ2pELFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBRWpELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzlCLENBQUM7U0FDRCxDQUFBO1FBRUQsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQW9CO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFBO0lBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3IgZnJvbSBcIi4vYW5pbWF0b3IuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWRlT25TY3JvbGwge1xuXHRwcml2YXRlIHN0YXRpYyByZWdpc3RyeTogTWFwPEhUTUxFbGVtZW50LCBEZXNjcmlwdG9yPiA9IG5ldyBNYXAoKVxuXG5cdHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjcm9sbGluZzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblx0XHRpZih0aGlzLnJlZ2lzdHJ5LmhhcyhlbGVtZW50KSlcblx0XHRcdHJldHVyblxuXG5cdFx0bGV0IGFuaW1hdG9yOiBBbmltYXRvclxuXHRcdGxldCBsYXN0U2Nyb2xsOiBudW1iZXJcblx0XHRsZXQgbGFzdERlbHRhU2Nyb2xsOiBudW1iZXJcblxuXHRcdGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuXHRcdFx0bGV0IHNjcm9sbCA9IHNjcm9sbGluZy5zY3JvbGxUb3Bcblx0XHRcdGxldCBkZWx0YVNjcm9sbCA9IE1hdGguc2lnbihzY3JvbGwgLSBsYXN0U2Nyb2xsKVxuXG5cdFx0XHRpZihzY3JvbGwgPT0gbGFzdFNjcm9sbClcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHRlbHNlIGlmKGRlbHRhU2Nyb2xsICE9IGxhc3REZWx0YVNjcm9sbCAmJiBNYXRoLmFicyhkZWx0YVNjcm9sbCkgPT0gMSkge1xuXHRcdFx0XHRzd2l0Y2goZGVsdGFTY3JvbGwpIHtcblx0XHRcdFx0XHRjYXNlIC0xOlxuXHRcdFx0XHRcdFx0YW5pbWF0b3IuYmFja3dhcmRzKClcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdFx0YW5pbWF0b3IuZm9yd2FyZHMoKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNjcm9sbGluZy5zY3JvbGxUb3AgPSBsYXN0U2Nyb2xsXG5cdFx0XHR9IGVsc2Vcblx0XHRcdFx0bGFzdFNjcm9sbCA9IHNjcm9sbFxuXG5cdFx0XHRsYXN0RGVsdGFTY3JvbGwgPSBkZWx0YVNjcm9sbFxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uSG92ZXIoKSB7XG5cdFx0XHRpZihpc05hTihsYXN0U2Nyb2xsKSB8fCBpc05hTihsYXN0RGVsdGFTY3JvbGwpKVxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0YW5pbWF0b3IuYmFja3dhcmRzKClcblx0XHRcdGxhc3RTY3JvbGwgPSBOYU5cblx0XHRcdGxhc3REZWx0YVNjcm9sbCA9IE5hTlxuXHRcdH1cblxuXHRcdGxldCBkZXNjcmlwdG9yOiBEZXNjcmlwdG9yXG5cblx0XHRkZXNjcmlwdG9yID0ge1xuXHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdHNjcm9sbGluZ0VsZW1lbnQ6IHNjcm9sbGluZyxcblx0XHRcdGJpbmQ6ICgpID0+IHtcblx0XHRcdFx0YW5pbWF0b3IgPSBuZXcgQW5pbWF0b3Ioe1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiAxNTAsXG5cdFx0XHRcdFx0XHRmaWxsOiBcImZvcndhcmRzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRhcmdldHM6IHtcblx0XHRcdFx0XHRcdGVsZW1lbnRzOiBlbGVtZW50LFxuXHRcdFx0XHRcdFx0a2V5ZnJhbWVzOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ6IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKSxcblx0XHRcdFx0XHRcdFx0XHRwYWRkaW5nOiBcIjEycHggMHB4XCIsXG5cdFx0XHRcdFx0XHRcdFx0bWFyZ2luOiBcIjBweCAwcHggMTBweCAwcHhcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBcIjFweFwiLFxuXHRcdFx0XHRcdFx0XHRcdHBhZGRpbmc6IFwiMXB4IDBweCAwcHggMHB4XCIsXG5cdFx0XHRcdFx0XHRcdFx0bWFyZ2luOiBcIjBweFwiLFxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uSG92ZXIpXG5cdFx0XHRcdHNjcm9sbGluZy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKVxuXG5cdFx0XHRcdHRoaXMucmVnaXN0cnkuc2V0KGVsZW1lbnQsIGRlc2NyaXB0b3IpXG5cdFx0XHR9LFxuXHRcdFx0dW5iaW5kOiAoKSA9PiB7XHRcdFx0XHRcblx0XHRcdFx0YW5pbWF0b3IucmVtb3ZlKClcblx0XHRcdFx0YW5pbWF0b3IgPSBudWxsXG5cblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uSG92ZXIpXG5cdFx0XHRcdHNjcm9sbGluZy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKVxuXG5cdFx0XHRcdHRoaXMucmVnaXN0cnkuZGVsZXRlKGVsZW1lbnQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGVzY3JpcHRvci5iaW5kKClcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgdW5yZWdpc3RlcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXHRcdHRoaXMucmVnaXN0cnkuZ2V0KGVsZW1lbnQpPy51bmJpbmQoKVxuXHR9XG59XG5cbmludGVyZmFjZSBEZXNjcmlwdG9yIHtcblx0cmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnRcblx0cmVhZG9ubHkgc2Nyb2xsaW5nRWxlbWVudDogSFRNTEVsZW1lbnRcblx0YmluZCgpOiB2b2lkXG5cdHVuYmluZCgpOiB2b2lkXG59Il19