import Animator from "../../utils/animator.js";
export class Navbar {
    element;
    constructor(element) {
        this.element = element;
        this.clearFields();
    }
    add(field) {
        this.element.style.display = null;
        this.element.append(field.element);
    }
    clearFields() {
        this.element.style.display = "none";
        while (this.element.firstElementChild)
            this.element.firstElementChild.remove();
    }
}
(function (Navbar) {
    class Field {
        element;
        constructor(name, callback) {
            let item = document.createElement("div");
            item.classList.add("item");
            this.element = item;
            /** Description */
            let descriptor = document.createElement("div");
            descriptor.id = "descriptor";
            item.append(descriptor);
            let text = document.createElement("div");
            text.id = "text";
            text.textContent = name;
            if (callback)
                text.addEventListener("click", callback);
            descriptor.append(text);
            /** Underline */
            let underline = document.createElement("div");
            underline.id = "underline";
            descriptor.append(underline);
            /** Diagonal line */
            let diagonalLine = document.createElement("hr");
            underline.append(diagonalLine);
            /** Horizontal line */
            let horizontalLine = document.createElement("hr");
            underline.append(horizontalLine);
            /** Animation */
            let duration = 250;
            let animator = new Animator({
                options: { fill: "forwards" },
                targets: [
                    {
                        elements: [
                            underline.querySelector(":nth-child(1)"),
                            underline.querySelector(":nth-child(2)")
                        ],
                        options: { duration: duration / 2, delay: 0, endDelay: duration / 2 },
                        keyframes: [
                            { visibility: "visible", width: "100%" },
                            { visibility: "hidden", width: "0%" }
                        ]
                    },
                    {
                        elements: text,
                        options: { duration: duration / 2, delay: duration / 2, endDelay: 0 },
                        keyframes: [
                            { background: "transparent" },
                            { background: "var(--color-primary)" }
                        ]
                    }
                ]
            });
            item.addEventListener("mouseenter", () => animator.forwards());
            item.addEventListener("mouseleave", () => animator.backwards());
        }
    }
    Navbar.Field = Field;
})(Navbar || (Navbar = {}));
export default Navbar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VpL3ZpZXdzL25hdmJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQTtBQUU5QyxNQUFNLE9BQU8sTUFBTTtJQUNGLE9BQU8sQ0FBYTtJQUVwQyxZQUFtQixPQUFvQjtRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVNLEdBQUcsQ0FBQyxLQUFtQjtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRU0sV0FBVztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBRW5DLE9BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUI7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUN6QyxDQUFDO0NBQ0Q7QUFFRCxXQUFpQixNQUFNO0lBQ3RCLE1BQWEsS0FBSztRQUNELE9BQU8sQ0FBYTtRQUVwQyxZQUFtQixJQUFZLEVBQUUsUUFBc0M7WUFDdEUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtZQUVuQixrQkFBa0I7WUFDbEIsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM5QyxVQUFVLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBRXZCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDeEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUE7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7WUFFdkIsSUFBRyxRQUFRO2dCQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFFekMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUV2QixnQkFBZ0I7WUFDaEIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QyxTQUFTLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQTtZQUMxQixVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBRTVCLG9CQUFvQjtZQUNwQixJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQy9DLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7WUFFOUIsc0JBQXNCO1lBQ3RCLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUVoQyxnQkFBZ0I7WUFDaEIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFBO1lBRWxCLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO2dCQUMzQixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO2dCQUMzQixPQUFPLEVBQUU7b0JBQ1I7d0JBQ0MsUUFBUSxFQUFFOzRCQUNULFNBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDOzRCQUN4QyxTQUFTLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQzt5QkFDeEM7d0JBQ0QsT0FBTyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBQzt3QkFDbkUsU0FBUyxFQUFFOzRCQUNWLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDOzRCQUN0QyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQzt5QkFDbkM7cUJBQ0Q7b0JBQ0Q7d0JBQ0MsUUFBUSxFQUFFLElBQUk7d0JBQ2QsT0FBTyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBQzt3QkFDbkUsU0FBUyxFQUFFOzRCQUNWLEVBQUMsVUFBVSxFQUFFLGFBQWEsRUFBQzs0QkFDM0IsRUFBQyxVQUFVLEVBQUUsc0JBQXNCLEVBQUM7eUJBQ3BDO3FCQUNEO2lCQUNEO2FBQ0QsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUM5RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ2hFLENBQUM7S0FDRDtJQWxFWSxZQUFLLFFBa0VqQixDQUFBO0FBQ0YsQ0FBQyxFQXBFZ0IsTUFBTSxLQUFOLE1BQU0sUUFvRXRCO0FBRUQsZUFBZSxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW5pbWF0b3IgZnJvbSBcIi4uLy4uL3V0aWxzL2FuaW1hdG9yLmpzXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZiYXIge1xyXG5cdHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudFxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuXHRcdHRoaXMuY2xlYXJGaWVsZHMoKVxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZChmaWVsZDogTmF2YmFyLkZpZWxkKTogdm9pZCB7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IG51bGxcclxuXHRcdHRoaXMuZWxlbWVudC5hcHBlbmQoZmllbGQuZWxlbWVudClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjbGVhckZpZWxkcygpOiB2b2lkIHtcclxuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuXHJcblx0XHR3aGlsZSh0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpXHJcblx0XHRcdHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5yZW1vdmUoKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBOYXZiYXIge1xyXG5cdGV4cG9ydCBjbGFzcyBGaWVsZCB7XHJcblx0XHRwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnRcclxuXHJcblx0XHRwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZCkge1xyXG5cdFx0XHRsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuXHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKVxyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBpdGVtXHJcblxyXG5cdFx0XHQvKiogRGVzY3JpcHRpb24gKi9cclxuXHRcdFx0bGV0IGRlc2NyaXB0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdGRlc2NyaXB0b3IuaWQgPSBcImRlc2NyaXB0b3JcIlxyXG5cdFx0XHRpdGVtLmFwcGVuZChkZXNjcmlwdG9yKVxyXG5cclxuXHRcdFx0bGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdHRleHQuaWQgPSBcInRleHRcIlxyXG5cdFx0XHR0ZXh0LnRleHRDb250ZW50ID0gbmFtZVxyXG5cclxuXHRcdFx0aWYoY2FsbGJhY2spXHJcblx0XHRcdFx0dGV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2spXHJcblxyXG5cdFx0XHRkZXNjcmlwdG9yLmFwcGVuZCh0ZXh0KVxyXG5cclxuXHRcdFx0LyoqIFVuZGVybGluZSAqL1xyXG5cdFx0XHRsZXQgdW5kZXJsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5cdFx0XHR1bmRlcmxpbmUuaWQgPSBcInVuZGVybGluZVwiXHJcblx0XHRcdGRlc2NyaXB0b3IuYXBwZW5kKHVuZGVybGluZSlcclxuXHJcblx0XHRcdC8qKiBEaWFnb25hbCBsaW5lICovXHJcblx0XHRcdGxldCBkaWFnb25hbExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIilcclxuXHRcdFx0dW5kZXJsaW5lLmFwcGVuZChkaWFnb25hbExpbmUpXHJcblxyXG5cdFx0XHQvKiogSG9yaXpvbnRhbCBsaW5lICovXHJcblx0XHRcdGxldCBob3Jpem9udGFsTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKVxyXG5cdFx0XHR1bmRlcmxpbmUuYXBwZW5kKGhvcml6b250YWxMaW5lKVxyXG5cclxuXHRcdFx0LyoqIEFuaW1hdGlvbiAqL1xyXG5cdFx0XHRsZXQgZHVyYXRpb24gPSAyNTBcclxuXHJcblx0XHRcdGxldCBhbmltYXRvciA9IG5ldyBBbmltYXRvcih7XHJcblx0XHRcdFx0b3B0aW9uczoge2ZpbGw6IFwiZm9yd2FyZHNcIn0sXHJcblx0XHRcdFx0dGFyZ2V0czogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50czogW1xyXG5cdFx0XHRcdFx0XHRcdHVuZGVybGluZS5xdWVyeVNlbGVjdG9yKFwiOm50aC1jaGlsZCgxKVwiKSxcclxuXHRcdFx0XHRcdFx0XHR1bmRlcmxpbmUucXVlcnlTZWxlY3RvcihcIjpudGgtY2hpbGQoMilcIilcclxuXHRcdFx0XHRcdFx0XSxcclxuXHRcdFx0XHRcdFx0b3B0aW9uczoge2R1cmF0aW9uOiBkdXJhdGlvbiAvIDIsIGRlbGF5OiAwLCBlbmREZWxheTogZHVyYXRpb24gLyAyfSxcclxuXHRcdFx0XHRcdFx0a2V5ZnJhbWVzOiBbXHJcblx0XHRcdFx0XHRcdFx0e3Zpc2liaWxpdHk6IFwidmlzaWJsZVwiLCB3aWR0aDogXCIxMDAlXCJ9LFxyXG5cdFx0XHRcdFx0XHRcdHt2aXNpYmlsaXR5OiBcImhpZGRlblwiLCB3aWR0aDogXCIwJVwifVxyXG5cdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50czogdGV4dCxcclxuXHRcdFx0XHRcdFx0b3B0aW9uczoge2R1cmF0aW9uOiBkdXJhdGlvbiAvIDIsIGRlbGF5OiBkdXJhdGlvbiAvIDIsIGVuZERlbGF5OiAwfSxcclxuXHRcdFx0XHRcdFx0a2V5ZnJhbWVzOiBbXHJcblx0XHRcdFx0XHRcdFx0e2JhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIn0sXHJcblx0XHRcdFx0XHRcdFx0e2JhY2tncm91bmQ6IFwidmFyKC0tY29sb3ItcHJpbWFyeSlcIn1cclxuXHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4gYW5pbWF0b3IuZm9yd2FyZHMoKSlcclxuXHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiBhbmltYXRvci5iYWNrd2FyZHMoKSlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhciJdfQ==