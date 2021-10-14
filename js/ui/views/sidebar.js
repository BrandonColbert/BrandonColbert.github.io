import SVGAnimator from "../../utils/svgAnimator.js";
import Content from "../../utils/content.js";
import Navbar from "./navbar.js";
import Animator from "../../utils/animator.js";
export class Sidebar {
    element;
    projectList;
    infoList;
    constructor(element) {
        this.element = element;
        this.infoList = new Sidebar.List(element.querySelector("#info"));
        this.projectList = new Sidebar.List(document.querySelector("#projects"));
    }
}
(function (Sidebar) {
    class List {
        element;
        #items;
        constructor(element) {
            this.element = element;
            this.#items = new Map();
        }
        add(item) {
            this.element.append(item.element);
            this.#items.set(item.name, item);
        }
        remove(name) {
            let item = this.#items.get(name);
            item.element.remove();
            this.#items.delete(name);
        }
        get(name) {
            return this.#items.get(name);
        }
        has(name) {
            return this.#items.has(name);
        }
        [Symbol.iterator]() {
            return this.#items.values();
        }
    }
    Sidebar.List = List;
    let Project;
    (function (Project) {
        class Item {
            element;
            descriptor;
            animator;
            #active = false;
            constructor(descriptor, callback) {
                /** Appearance */
                let panel = document.createElement("div");
                panel.classList.add("panel");
                //Name and action
                let text = document.createElement("div");
                text.textContent = descriptor.name;
                if (callback)
                    text.addEventListener("click", callback);
                panel.append(text);
                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("stroke-width", "5");
                svg.setAttribute("viewBox", "0 0 50 50");
                panel.append(svg);
                let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                svg.append(path);
                let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                animate.setAttribute("fill", "freeze");
                animate.setAttribute("repeatCount", "1");
                animate.setAttribute("dur", "150ms");
                animate.setAttribute("attributeName", "d");
                animate.setAttribute("from", "M 5 0 v 50");
                animate.setAttribute("to", "M 45 0 v 50");
                path.append(animate);
                /** Animation */
                let animator = new SVGAnimator(svg, 150);
                panel.addEventListener("mouseenter", () => {
                    if (this.#active)
                        return;
                    animator.seek(animator.duration);
                });
                panel.addEventListener("mouseleave", () => {
                    if (this.#active)
                        return;
                    animator.seek(0);
                });
                this.element = panel;
                this.descriptor = descriptor;
                this.animator = animator;
            }
            get name() {
                return this.descriptor.name;
            }
            get active() {
                return this.#active;
            }
            set active(value) {
                if (this.#active == value)
                    return;
                if (value)
                    this.animator.seek(this.animator.duration);
                else
                    this.animator.seek(0);
                this.#active = value;
            }
            async view({ nav, main }) {
                if (!this.descriptor.url)
                    return;
                nav.clearFields();
                if (this.descriptor.navFields)
                    for (let navItem of this.descriptor.navFields)
                        nav.add(new Navbar.Field(navItem.name, async () => {
                            if (navItem.url) {
                                if (navItem.inplace)
                                    main.innerHTML = await Content.fetch(navItem.url);
                                else
                                    open(navItem.url, "_blank").focus();
                            }
                        }));
                main.innerHTML = await Content.fetch(this.descriptor.url);
            }
        }
        Project.Item = Item;
    })(Project = Sidebar.Project || (Sidebar.Project = {}));
    let Info;
    (function (Info) {
        class Item {
            element;
            descriptor;
            constructor(descriptor, callback) {
                let item = document.createElement("div");
                item.classList.add("item");
                /** Left border */
                let leftBorder = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                leftBorder.id = "leftBorder";
                leftBorder.setAttribute("viewBox", "0 0 15 30");
                item.append(leftBorder);
                let leftCorner1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                leftCorner1.setAttribute("d", "M 0 0 h 15");
                leftBorder.append(leftCorner1);
                let leftCorner2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                leftCorner2.setAttribute("d", "M 0 0 v 15");
                leftBorder.append(leftCorner2);
                /** Text */
                let text = document.createElement("div");
                text.textContent = descriptor.name;
                if (callback)
                    text.addEventListener("click", callback);
                item.append(text);
                /** Right border */
                let rightBorder = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                rightBorder.id = "rightBorder";
                rightBorder.setAttribute("viewBox", "0 0 15 30");
                item.append(rightBorder);
                let rightCorner1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                rightCorner1.setAttribute("d", "M 15 30 h -15");
                rightBorder.append(rightCorner1);
                let rightCorner2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                rightCorner2.setAttribute("d", "M 15 30 v -15");
                rightBorder.append(rightCorner2);
                /** Animation */
                let animator = new Animator({
                    options: { fill: "forwards" },
                    targets: [
                        {
                            elements: item,
                            options: { duration: 250 },
                            keyframes: [
                                { gap: "0px" },
                                { gap: "10px" }
                            ]
                        }
                    ]
                });
                item.addEventListener("mouseenter", () => animator.forwards());
                item.addEventListener("mouseleave", () => animator.backwards());
                this.element = item;
                this.descriptor = descriptor;
            }
            get name() {
                return this.descriptor.name;
            }
            async view({ nav, main }) {
                if (!this.descriptor.url)
                    return;
                nav.clearFields();
                main.innerHTML = await Content.fetch(this.descriptor.url);
            }
        }
        Info.Item = Item;
    })(Info = Sidebar.Info || (Sidebar.Info = {}));
})(Sidebar || (Sidebar = {}));
export default Sidebar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aS92aWV3cy9zaWRlYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDRCQUE0QixDQUFBO0FBQ3BELE9BQU8sT0FBTyxNQUFNLHdCQUF3QixDQUFBO0FBQzVDLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQTtBQUNoQyxPQUFPLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQTtBQUU5QyxNQUFNLE9BQU8sT0FBTztJQUNILE9BQU8sQ0FBYTtJQUNwQixXQUFXLENBQW9DO0lBQy9DLFFBQVEsQ0FBaUM7SUFFekQsWUFBbUIsT0FBb0I7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0NBQ0Q7QUFFRCxXQUFpQixPQUFPO0lBTXZCLE1BQWEsSUFBSTtRQUNBLE9BQU8sQ0FBYTtRQUNwQyxNQUFNLENBQWdCO1FBRXRCLFlBQW1CLE9BQW9CO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixDQUFDO1FBRU0sR0FBRyxDQUFDLElBQU87WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFD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Q0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1lBQzdCLENBQUM7WUFFRCxJQUFXLElBQUk7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQTtZQUM1QixDQUFDO1lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQW1DO2dCQUM5RCxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHO29CQUN0QixPQUFNO2dCQUVQLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMxRCxDQUFDO1NBQ0Q7UUE5RVksU0FBSSxPQThFaEIsQ0FBQTtJQUVGLENBQUMsRUF0RmdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQXNGcEI7QUFDRixDQUFDLEVBMVBnQixPQUFPLEtBQVAsT0FBTyxRQTBQdkI7QUFFRCxlQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTVkdBbmltYXRvciBmcm9tIFwiLi4vLi4vdXRpbHMvc3ZnQW5pbWF0b3IuanNcIlxyXG5pbXBvcnQgQ29udGVudCBmcm9tIFwiLi4vLi4vdXRpbHMvY29udGVudC5qc1wiXHJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCJcclxuaW1wb3J0IEFuaW1hdG9yIGZyb20gXCIuLi8uLi91dGlscy9hbmltYXRvci5qc1wiXHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZWJhciB7XHJcblx0cHVibGljIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxFbGVtZW50XHJcblx0cHVibGljIHJlYWRvbmx5IHByb2plY3RMaXN0OiBTaWRlYmFyLkxpc3Q8U2lkZWJhci5Qcm9qZWN0Lkl0ZW0+XHJcblx0cHVibGljIHJlYWRvbmx5IGluZm9MaXN0OiBTaWRlYmFyLkxpc3Q8U2lkZWJhci5JbmZvLkl0ZW0+XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG5cdFx0dGhpcy5pbmZvTGlzdCA9IG5ldyBTaWRlYmFyLkxpc3QoZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZm9cIikpXHJcblx0XHR0aGlzLnByb2plY3RMaXN0ID0gbmV3IFNpZGViYXIuTGlzdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBTaWRlYmFyIHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIExheW91dCB7XHJcblx0XHRwcm9qZWN0czogUHJvamVjdC5EZXNjcmlwdG9yW11cclxuXHRcdGluZm86IEluZm8uRGVzY3JpcHRvcltdXHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgTGlzdDxUIGV4dGVuZHMgTGlzdC5JdGVtPiB7XHJcblx0XHRwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnRcclxuXHRcdCNpdGVtczogTWFwPHN0cmluZywgVD5cclxuXHJcblx0XHRwdWJsaWMgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG5cdFx0XHR0aGlzLiNpdGVtcyA9IG5ldyBNYXAoKVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBhZGQoaXRlbTogVCk6IHZvaWQge1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKGl0ZW0uZWxlbWVudClcclxuXHRcdFx0dGhpcy4jaXRlbXMuc2V0KGl0ZW0ubmFtZSwgaXRlbSlcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgcmVtb3ZlKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHRsZXQgaXRlbSA9IHRoaXMuI2l0ZW1zLmdldChuYW1lKVxyXG5cdFx0XHRpdGVtLmVsZW1lbnQucmVtb3ZlKClcclxuXHJcblx0XHRcdHRoaXMuI2l0ZW1zLmRlbGV0ZShuYW1lKVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogVCB7XHJcblx0XHRcdHJldHVybiB0aGlzLiNpdGVtcy5nZXQobmFtZSlcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgaGFzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4jaXRlbXMuaGFzKG5hbWUpXHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8VD4ge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4jaXRlbXMudmFsdWVzKClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBuYW1lc3BhY2UgTGlzdCB7XHJcblx0XHRleHBvcnQgaW50ZXJmYWNlIEl0ZW0ge1xyXG5cdFx0XHRyZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudFxyXG5cdFx0XHRyZWFkb25seSBuYW1lOiBzdHJpbmdcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBuYW1lc3BhY2UgUHJvamVjdCB7XHJcblx0XHRleHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0b3Ige1xyXG5cdFx0XHRuYW1lOiBzdHJpbmdcclxuXHRcdFx0dXJsPzogc3RyaW5nXHJcblx0XHRcdG5hdkZpZWxkcz86IERlc2NyaXB0b3IuTmF2RmllbGRbXVxyXG5cdFx0fVxyXG5cclxuXHRcdGV4cG9ydCBuYW1lc3BhY2UgRGVzY3JpcHRvciB7XHJcblx0XHRcdGV4cG9ydCBpbnRlcmZhY2UgTmF2RmllbGQge1xyXG5cdFx0XHRcdG5hbWU6IHN0cmluZ1xyXG5cdFx0XHRcdGlucGxhY2U/OiBib29sZWFuXHJcblx0XHRcdFx0dXJsPzogc3RyaW5nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRleHBvcnQgY2xhc3MgSXRlbSB7XHJcblx0XHRcdHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudFxyXG5cdFx0XHRwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRvcjogRGVzY3JpcHRvclxyXG5cdFx0XHRwcml2YXRlIGFuaW1hdG9yOiBTVkdBbmltYXRvclxyXG5cdFx0XHQjYWN0aXZlOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0XHRcdHB1YmxpYyBjb25zdHJ1Y3RvcihkZXNjcmlwdG9yOiBEZXNjcmlwdG9yLCBjYWxsYmFjaz86IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZCkge1xyXG5cdFx0XHRcdC8qKiBBcHBlYXJhbmNlICovXHJcblx0XHRcdFx0bGV0IHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5cdFx0XHRcdHBhbmVsLmNsYXNzTGlzdC5hZGQoXCJwYW5lbFwiKVxyXG5cclxuXHRcdFx0XHQvL05hbWUgYW5kIGFjdGlvblxyXG5cdFx0XHRcdGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5cdFx0XHRcdHRleHQudGV4dENvbnRlbnQgPSBkZXNjcmlwdG9yLm5hbWVcclxuXHJcblx0XHRcdFx0aWYoY2FsbGJhY2spXHJcblx0XHRcdFx0XHR0ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYWxsYmFjaylcclxuXHJcblx0XHRcdFx0cGFuZWwuYXBwZW5kKHRleHQpXHJcblxyXG5cdFx0XHRcdGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKVxyXG5cdFx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGUoXCJzdHJva2Utd2lkdGhcIiwgXCI1XCIpXHJcblx0XHRcdFx0c3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgNTAgNTBcIilcclxuXHRcdFx0XHRwYW5lbC5hcHBlbmQoc3ZnKVxyXG5cclxuXHRcdFx0XHRsZXQgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKVxyXG5cdFx0XHRcdHN2Zy5hcHBlbmQocGF0aClcclxuXHJcblx0XHRcdFx0bGV0IGFuaW1hdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImFuaW1hdGVcIilcclxuXHRcdFx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJmcmVlemVcIilcclxuXHRcdFx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZShcInJlcGVhdENvdW50XCIsIFwiMVwiKVxyXG5cdFx0XHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKFwiZHVyXCIsIFwiMTUwbXNcIilcclxuXHRcdFx0XHRhbmltYXRlLnNldEF0dHJpYnV0ZShcImF0dHJpYnV0ZU5hbWVcIiwgXCJkXCIpXHJcblx0XHRcdFx0YW5pbWF0ZS5zZXRBdHRyaWJ1dGUoXCJmcm9tXCIsIFwiTSA1IDAgdiA1MFwiKVxyXG5cdFx0XHRcdGFuaW1hdGUuc2V0QXR0cmlidXRlKFwidG9cIiwgXCJNIDQ1IDAgdiA1MFwiKVxyXG5cdFx0XHRcdHBhdGguYXBwZW5kKGFuaW1hdGUpXHJcblxyXG5cdFx0XHRcdC8qKiBBbmltYXRpb24gKi9cclxuXHRcdFx0XHRsZXQgYW5pbWF0b3IgPSBuZXcgU1ZHQW5pbWF0b3Ioc3ZnLCAxNTApXHJcblxyXG5cdFx0XHRcdHBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcclxuXHRcdFx0XHRcdGlmKHRoaXMuI2FjdGl2ZSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0XHRcdFx0YW5pbWF0b3Iuc2VlayhhbmltYXRvci5kdXJhdGlvbilcclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRwYW5lbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRpZih0aGlzLiNhY3RpdmUpXHJcblx0XHRcdFx0XHRcdHJldHVyblxyXG5cclxuXHRcdFx0XHRcdGFuaW1hdG9yLnNlZWsoMClcclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHR0aGlzLmVsZW1lbnQgPSBwYW5lbFxyXG5cdFx0XHRcdHRoaXMuZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JcclxuXHRcdFx0XHR0aGlzLmFuaW1hdG9yID0gYW5pbWF0b3JcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZGVzY3JpcHRvci5uYW1lXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHB1YmxpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLiNhY3RpdmVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHVibGljIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcclxuXHRcdFx0XHRpZih0aGlzLiNhY3RpdmUgPT0gdmFsdWUpXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdFx0aWYodmFsdWUpXHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdG9yLnNlZWsodGhpcy5hbmltYXRvci5kdXJhdGlvbilcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdG9yLnNlZWsoMClcclxuXHJcblx0XHRcdFx0dGhpcy4jYWN0aXZlID0gdmFsdWVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHVibGljIGFzeW5jIHZpZXcoe25hdiwgbWFpbn06IHtuYXY6IE5hdmJhciwgbWFpbjogSFRNTEVsZW1lbnR9KTogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRcdFx0aWYoIXRoaXMuZGVzY3JpcHRvci51cmwpXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdFx0bmF2LmNsZWFyRmllbGRzKClcclxuXHRcdFx0XHJcblx0XHRcdFx0aWYodGhpcy5kZXNjcmlwdG9yLm5hdkZpZWxkcylcclxuXHRcdFx0XHRcdGZvcihsZXQgbmF2SXRlbSBvZiB0aGlzLmRlc2NyaXB0b3IubmF2RmllbGRzKVxyXG5cdFx0XHRcdFx0XHRuYXYuYWRkKG5ldyBOYXZiYXIuRmllbGQobmF2SXRlbS5uYW1lLCBhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYobmF2SXRlbS51cmwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKG5hdkl0ZW0uaW5wbGFjZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWFpbi5pbm5lckhUTUwgPSBhd2FpdCBDb250ZW50LmZldGNoKG5hdkl0ZW0udXJsKVxyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvcGVuKG5hdkl0ZW0udXJsLCBcIl9ibGFua1wiKS5mb2N1cygpXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KSlcclxuXHJcblx0XHRcdFx0bWFpbi5pbm5lckhUTUwgPSBhd2FpdCBDb250ZW50LmZldGNoKHRoaXMuZGVzY3JpcHRvci51cmwpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBuYW1lc3BhY2UgSW5mbyB7XHJcblx0XHRleHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0b3Ige1xyXG5cdFx0XHRuYW1lOiBzdHJpbmdcclxuXHRcdFx0dXJsPzogc3RyaW5nXHJcblx0XHR9XHJcblxyXG5cdFx0ZXhwb3J0IGNsYXNzIEl0ZW0ge1xyXG5cdFx0XHRwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnRcclxuXHRcdFx0cHVibGljIHJlYWRvbmx5IGRlc2NyaXB0b3I6IERlc2NyaXB0b3JcclxuXHJcblx0XHRcdHB1YmxpYyBjb25zdHJ1Y3RvcihkZXNjcmlwdG9yOiBEZXNjcmlwdG9yLCBjYWxsYmFjaz86IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZCkge1xyXG5cdFx0XHRcdGxldCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5cdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW1cIilcclxuXHJcblx0XHRcdFx0LyoqIExlZnQgYm9yZGVyICovXHJcblx0XHRcdFx0bGV0IGxlZnRCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKVxyXG5cdFx0XHRcdGxlZnRCb3JkZXIuaWQgPSBcImxlZnRCb3JkZXJcIlxyXG5cdFx0XHRcdGxlZnRCb3JkZXIuc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCAxNSAzMFwiKVxyXG5cdFx0XHRcdGl0ZW0uYXBwZW5kKGxlZnRCb3JkZXIpXHJcblxyXG5cdFx0XHRcdGxldCBsZWZ0Q29ybmVyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKVxyXG5cdFx0XHRcdGxlZnRDb3JuZXIxLnNldEF0dHJpYnV0ZShcImRcIiwgXCJNIDAgMCBoIDE1XCIpXHJcblx0XHRcdFx0bGVmdEJvcmRlci5hcHBlbmQobGVmdENvcm5lcjEpXHJcblxyXG5cdFx0XHRcdGxldCBsZWZ0Q29ybmVyMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKVxyXG5cdFx0XHRcdGxlZnRDb3JuZXIyLnNldEF0dHJpYnV0ZShcImRcIiwgXCJNIDAgMCB2IDE1XCIpXHJcblx0XHRcdFx0bGVmdEJvcmRlci5hcHBlbmQobGVmdENvcm5lcjIpXHJcblxyXG5cdFx0XHRcdC8qKiBUZXh0ICovXHJcblx0XHRcdFx0bGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IGRlc2NyaXB0b3IubmFtZVxyXG5cclxuXHRcdFx0XHRpZihjYWxsYmFjaylcclxuXHRcdFx0XHRcdHRleHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbGxiYWNrKVxyXG5cclxuXHRcdFx0XHRpdGVtLmFwcGVuZCh0ZXh0KVxyXG5cclxuXHRcdFx0XHQvKiogUmlnaHQgYm9yZGVyICovXHJcblx0XHRcdFx0bGV0IHJpZ2h0Qm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIilcclxuXHRcdFx0XHRyaWdodEJvcmRlci5pZCA9IFwicmlnaHRCb3JkZXJcIlxyXG5cdFx0XHRcdHJpZ2h0Qm9yZGVyLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgMTUgMzBcIilcclxuXHRcdFx0XHRpdGVtLmFwcGVuZChyaWdodEJvcmRlcilcclxuXHJcblx0XHRcdFx0bGV0IHJpZ2h0Q29ybmVyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKVxyXG5cdFx0XHRcdHJpZ2h0Q29ybmVyMS5zZXRBdHRyaWJ1dGUoXCJkXCIsIFwiTSAxNSAzMCBoIC0xNVwiKVxyXG5cdFx0XHRcdHJpZ2h0Qm9yZGVyLmFwcGVuZChyaWdodENvcm5lcjEpXHJcblxyXG5cdFx0XHRcdGxldCByaWdodENvcm5lcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIilcclxuXHRcdFx0XHRyaWdodENvcm5lcjIuc2V0QXR0cmlidXRlKFwiZFwiLCBcIk0gMTUgMzAgdiAtMTVcIilcclxuXHRcdFx0XHRyaWdodEJvcmRlci5hcHBlbmQocmlnaHRDb3JuZXIyKVxyXG5cclxuXHRcdFx0XHQvKiogQW5pbWF0aW9uICovXHJcblx0XHRcdFx0bGV0IGFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKHtcclxuXHRcdFx0XHRcdG9wdGlvbnM6IHtmaWxsOiBcImZvcndhcmRzXCJ9LFxyXG5cdFx0XHRcdFx0dGFyZ2V0czogW1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudHM6IGl0ZW0sXHJcblx0XHRcdFx0XHRcdFx0b3B0aW9uczoge2R1cmF0aW9uOiAyNTB9LFxyXG5cdFx0XHRcdFx0XHRcdGtleWZyYW1lczogW1xyXG5cdFx0XHRcdFx0XHRcdFx0e2dhcDogXCIwcHhcIn0sXHJcblx0XHRcdFx0XHRcdFx0XHR7Z2FwOiBcIjEwcHhcIn1cclxuXHRcdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IGFuaW1hdG9yLmZvcndhcmRzKCkpXHJcblx0XHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiBhbmltYXRvci5iYWNrd2FyZHMoKSlcclxuXHJcblx0XHRcdFx0dGhpcy5lbGVtZW50ID0gaXRlbVxyXG5cdFx0XHRcdHRoaXMuZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZGVzY3JpcHRvci5uYW1lXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHB1YmxpYyBhc3luYyB2aWV3KHtuYXYsIG1haW59OiB7bmF2OiBOYXZiYXIsIG1haW46IEhUTUxFbGVtZW50fSk6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0XHRcdGlmKCF0aGlzLmRlc2NyaXB0b3IudXJsKVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0XHRcdG5hdi5jbGVhckZpZWxkcygpXHJcblx0XHRcdFx0bWFpbi5pbm5lckhUTUwgPSBhd2FpdCBDb250ZW50LmZldGNoKHRoaXMuZGVzY3JpcHRvci51cmwpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyIl19