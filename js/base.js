var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const content = document.querySelector(".content");
const subcontent = document.createElement("div");
subcontent.classList.add("subcontent");
content.prepend(subcontent);
while (content.children.length > 1)
    subcontent.appendChild(content.children[1]);
const navbar = document.createElement("div");
navbar.classList.add("navbar");
setElementHTML(navbar, "/nav.html");
content.prepend(navbar);
window.onpopstate = () => setElementHTML(subcontent, window.location.pathname);
function setElementHTML(element, location) {
    return __awaiter(this, void 0, void 0, function* () {
        element.innerHTML = (yield (yield fetch(location)).text());
    });
}
function toPage(location) {
    return __awaiter(this, void 0, void 0, function* () {
        history.pushState(null, null, location);
        yield setElementHTML(subcontent, location);
        let scc = subcontent.children[0];
        while (scc.children.length > 0)
            subcontent.appendChild(scc.children[0]);
        scc.remove();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7QUFHbEQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNoRCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBRzNCLE9BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUNoQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUc1QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzlCLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDbkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUV2QixNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQU85RSxTQUFlLGNBQWMsQ0FBQyxPQUFvQixFQUFFLFFBQWdCOztRQUNuRSxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0NBQUE7QUFNRCxTQUFlLE1BQU0sQ0FBQyxRQUFnQjs7UUFDckMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZDLE1BQU0sY0FBYyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUUxQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM1QixVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUV4QyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDYixDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dldCB0aGUgcmVnaW9uIHdoZXJlIGNvbnRlbnQgaXMgZGlzcGxheWVkXHJcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIilcclxuXHJcbi8vQ3JlYXRlIGEgcmVnaW9uIHdoZXJlIGRpZmZlcmVudCBwYWdlcyBjb250ZW50IG1heSBiZSBkaXNwbGF5ZWRcclxuY29uc3Qgc3ViY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuc3ViY29udGVudC5jbGFzc0xpc3QuYWRkKFwic3ViY29udGVudFwiKVxyXG5jb250ZW50LnByZXBlbmQoc3ViY29udGVudClcclxuXHJcbi8vTW92ZSBhbnl0aGluZyBpbiBjb250ZW50IHRvIHN1YmNvbnRlbnRcclxud2hpbGUoY29udGVudC5jaGlsZHJlbi5sZW5ndGggPiAxKVxyXG5cdHN1YmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudC5jaGlsZHJlblsxXSlcclxuXHJcbi8vQWRkIHRoZSBuYXZiYXJcclxuY29uc3QgbmF2YmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5uYXZiYXIuY2xhc3NMaXN0LmFkZChcIm5hdmJhclwiKVxyXG5zZXRFbGVtZW50SFRNTChuYXZiYXIsIFwiL25hdi5odG1sXCIpXHJcbmNvbnRlbnQucHJlcGVuZChuYXZiYXIpXHJcblxyXG53aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHNldEVsZW1lbnRIVE1MKHN1YmNvbnRlbnQsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBlbGVtZW50cyBpbm5lckhUTUwgd2l0aCBjb250ZW50IGxvYWRlZCBmcm9tIGZpbGUgbG9jYXRpb25cclxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byBwbGFjZSBjb250ZW50IGluXHJcbiAqIEBwYXJhbSBsb2NhdGlvbiBvZiB0aGUgZmlsZSBjb250YWluaW5nIHRoZSBjb250ZW50XHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZXRFbGVtZW50SFRNTChlbGVtZW50OiBIVE1MRWxlbWVudCwgbG9jYXRpb246IHN0cmluZykge1xyXG5cdGVsZW1lbnQuaW5uZXJIVE1MID0gKGF3YWl0IChhd2FpdCBmZXRjaChsb2NhdGlvbikpLnRleHQoKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIE5hdmlnYXRlcyB0byBhbmQgbG9hZHMgdGhlIHBhZ2Ugd2l0aG91dCByZWxvYWRpbmcgdGhlIHdlYnNpdGVcclxuICogQHBhcmFtIExvY2F0aW9uIG9mIHRoZSBmaWxlIHdpdGggdGhlIGNvbnRlbnRcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHRvUGFnZShsb2NhdGlvbjogc3RyaW5nKSB7XHJcblx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgbG9jYXRpb24pXHJcblx0YXdhaXQgc2V0RWxlbWVudEhUTUwoc3ViY29udGVudCwgbG9jYXRpb24pXHJcblx0XHJcblx0bGV0IHNjYyA9IHN1YmNvbnRlbnQuY2hpbGRyZW5bMF07XHJcblx0d2hpbGUoc2NjLmNoaWxkcmVuLmxlbmd0aCA+IDApXHJcblx0XHRzdWJjb250ZW50LmFwcGVuZENoaWxkKHNjYy5jaGlsZHJlblswXSlcclxuXHJcblx0c2NjLnJlbW92ZSgpXHJcbn0iXX0=