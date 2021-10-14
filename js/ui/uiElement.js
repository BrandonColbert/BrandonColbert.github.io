export default class UIElement extends HTMLElement {
    mutationObserver;
    constructor() {
        super();
        this.mutationObserver = new MutationObserver((muts, _) => {
            for (let mutation of muts) {
                switch (mutation.type) {
                    case "childList":
                        mutation.addedNodes.forEach(n => this.onChildAttached(n));
                        mutation.removedNodes.forEach(n => this.onChildDetached(n));
                        break;
                }
            }
        });
    }
    /**
     * Called when connected an element
     */
    attached() { }
    /**
     * Called when disconnected from an element
     */
    detached() { }
    /**
     * Called when a child node is connected
     * @param node Node that was connected
     */
    onChildAttached(node) { }
    /**
     * Called when a child node is disconnected
     * @param node Node that was disconnected
     */
    onChildDetached(node) { }
    connectedCallback() {
        this.mutationObserver.observe(this, { childList: true });
        if (!this.isConnected)
            return;
        this.attached();
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
        this.detached();
    }
    static register(par1, par2) {
        let name;
        let ctor;
        if (par1) {
            if (par2) { //Name and constructor specified
                name = par1;
                ctor = par2;
            }
            else { //Name or constructor specified
                switch (typeof par1) {
                    case "string":
                        name = par1;
                        break;
                    case "function":
                        ctor = par2;
                        break;
                }
            }
        }
        else if (par2) //Name specified, constructor implicit
            name = par2;
        if (!ctor) //Imply constructor from current class
            ctor = this;
        if (!name) { //Create tag name based on class name
            let className = ctor.name
                .replace(/Element$/, _ => "")
                .replace(/^[A-Z]/, s => s.toLowerCase())
                .replace(/[A-Z]/, s => `-${s.toLowerCase()}`);
            name = `ui-${className}`;
        }
        //Define custom element
        customElements.define(name, ctor);
    }
    /**
     * Assert that the node is of the given type.
     *
     * If the assertion is false, an error will be thrown.
     * @param node Node to check
     * @param ctor Expected base type
     */
    static restrict(node, ctor) {
        if (node instanceof ctor)
            return;
        if (!node)
            throw new Error(`Expected node, none provided`);
        throw new Error(`Expected type ${ctor.name}, but got type ${node.constructor.name} with ${node}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VpL3VpRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsT0FBTyxPQUFnQixTQUFVLFNBQVEsV0FBVztJQUNsRCxnQkFBZ0IsQ0FBa0I7SUFFMUM7UUFDQyxLQUFLLEVBQUUsQ0FBQTtRQUVQLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsSUFBc0IsRUFBRSxDQUFtQixFQUFFLEVBQUU7WUFDNUYsS0FBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3pCLFFBQU8sUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDckIsS0FBSyxXQUFXO3dCQUNmLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUN6RCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFDM0QsTUFBSztpQkFDTjthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxRQUFRLEtBQVUsQ0FBQztJQUU3Qjs7T0FFRztJQUNPLFFBQVEsS0FBVSxDQUFDO0lBRTdCOzs7T0FHRztJQUNPLGVBQWUsQ0FBQyxJQUFVLElBQVMsQ0FBQztJQUU5Qzs7O09BR0c7SUFDTyxlQUFlLENBQUMsSUFBVSxJQUFTLENBQUM7SUFFdEMsaUJBQWlCO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFFdEQsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ25CLE9BQU07UUFFUCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVPLG9CQUFvQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFvQ00sTUFBTSxDQUFDLFFBQVEsQ0FBc0IsSUFBVSxFQUFFLElBQVU7UUFDakUsSUFBSSxJQUFZLENBQUE7UUFDaEIsSUFBSSxJQUFvQixDQUFBO1FBRXhCLElBQUcsSUFBSSxFQUFFO1lBQ1IsSUFBRyxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0M7Z0JBQzFDLElBQUksR0FBRyxJQUFJLENBQUE7Z0JBQ1gsSUFBSSxHQUFHLElBQUksQ0FBQTthQUNYO2lCQUFNLEVBQUUsK0JBQStCO2dCQUN2QyxRQUFPLE9BQU8sSUFBSSxFQUFFO29CQUNuQixLQUFLLFFBQVE7d0JBQ1osSUFBSSxHQUFHLElBQUksQ0FBQTt3QkFDWCxNQUFLO29CQUNOLEtBQUssVUFBVTt3QkFDZCxJQUFJLEdBQUcsSUFBSSxDQUFBO3dCQUNYLE1BQUs7aUJBQ047YUFDRDtTQUNEO2FBQU0sSUFBRyxJQUFJLEVBQUUsc0NBQXNDO1lBQ3JELElBQUksR0FBRyxJQUFJLENBQUE7UUFFWixJQUFHLENBQUMsSUFBSSxFQUFFLHNDQUFzQztZQUMvQyxJQUFJLEdBQUcsSUFBNkIsQ0FBQTtRQUVyQyxJQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUscUNBQXFDO1lBQ2hELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJO2lCQUN2QixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUM1QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBRTlDLElBQUksR0FBRyxNQUFNLFNBQVMsRUFBRSxDQUFBO1NBQ3hCO1FBRUQsdUJBQXVCO1FBQ3ZCLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxNQUFNLENBQUMsUUFBUSxDQUFpQixJQUFVLEVBQUUsSUFBb0I7UUFDekUsSUFBRyxJQUFJLFlBQVksSUFBSTtZQUN0QixPQUFNO1FBRVAsSUFBRyxDQUFDLElBQUk7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFFaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksa0JBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUE7SUFDbEcsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBDb25zdHJ1Y3RvcjxUPiA9IG5ldyguLi5hcmdzOiBhbnlbXSkgPT4gVFxudHlwZSBDdXN0b21FbGVtZW50TmFtZSA9IGAke3N0cmluZ30tJHtzdHJpbmd9YFxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBVSUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdHByaXZhdGUgbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlclxuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpXG5cblx0XHR0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0czogTXV0YXRpb25SZWNvcmRbXSwgXzogTXV0YXRpb25PYnNlcnZlcikgPT4ge1xuXHRcdFx0Zm9yKGxldCBtdXRhdGlvbiBvZiBtdXRzKSB7XG5cdFx0XHRcdHN3aXRjaChtdXRhdGlvbi50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcImNoaWxkTGlzdFwiOlxuXHRcdFx0XHRcdFx0bXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKG4gPT4gdGhpcy5vbkNoaWxkQXR0YWNoZWQobikpXG5cdFx0XHRcdFx0XHRtdXRhdGlvbi5yZW1vdmVkTm9kZXMuZm9yRWFjaChuID0+IHRoaXMub25DaGlsZERldGFjaGVkKG4pKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gY29ubmVjdGVkIGFuIGVsZW1lbnRcblx0ICovXG5cdHByb3RlY3RlZCBhdHRhY2hlZCgpOiB2b2lkIHt9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGRpc2Nvbm5lY3RlZCBmcm9tIGFuIGVsZW1lbnRcblx0ICovXG5cdHByb3RlY3RlZCBkZXRhY2hlZCgpOiB2b2lkIHt9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgY2hpbGQgbm9kZSBpcyBjb25uZWN0ZWRcblx0ICogQHBhcmFtIG5vZGUgTm9kZSB0aGF0IHdhcyBjb25uZWN0ZWRcblx0ICovXG5cdHByb3RlY3RlZCBvbkNoaWxkQXR0YWNoZWQobm9kZTogTm9kZSk6IHZvaWQge31cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBjaGlsZCBub2RlIGlzIGRpc2Nvbm5lY3RlZFxuXHQgKiBAcGFyYW0gbm9kZSBOb2RlIHRoYXQgd2FzIGRpc2Nvbm5lY3RlZFxuXHQgKi9cblx0cHJvdGVjdGVkIG9uQ2hpbGREZXRhY2hlZChub2RlOiBOb2RlKTogdm9pZCB7fVxuXG5cdHByaXZhdGUgY29ubmVjdGVkQ2FsbGJhY2soKTogdm9pZCB7XG5cdFx0dGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcywge2NoaWxkTGlzdDogdHJ1ZX0pXG5cblx0XHRpZighdGhpcy5pc0Nvbm5lY3RlZClcblx0XHRcdHJldHVyblxuXG5cdFx0dGhpcy5hdHRhY2hlZCgpXG5cdH1cblxuXHRwcml2YXRlIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xuXHRcdHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KClcblx0XHR0aGlzLmRldGFjaGVkKClcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhbiBhdHRyaWJ1dGUgaW4gdGhlIGFycmF5IGRlZmluZWQgYnkgdGhlIHN0YXRpYyBnZXR0ZXIgJ29ic2VydmVkQXR0cmlidXRlcycgaXMgY2hhbmdlZFxuXHQgKiBAcGFyYW0gbmFtZSBDaGFuZ2VkIGF0dHJpYnV0ZSBuYW1lXG5cdCAqL1xuXHRwcm90ZWN0ZWQgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrPyhuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpOiB2b2lkXG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIGEgbmV3IGVsZW1lbnQgdW5kZXIgYSBzcGVjaWZpYyBuYW1lXG5cdCAqIEBwYXJhbSBjdG9yIEVsZW1lbnQgY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIG5hbWUgQ3VzdG9tIHRhZyBuYW1lIHdpdGhpbiBIVE1MXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHJlZ2lzdGVyPFQgZXh0ZW5kcyBVSUVsZW1lbnQ+KGN0b3I6IENvbnN0cnVjdG9yPFQ+LCBuYW1lOiBDdXN0b21FbGVtZW50TmFtZSk6IHZvaWRcblxuXHQvKipcblx0ICogUmVnaXN0ZXIgYSBuZXcgZWxlbWVudFxuXHQgKiBcblx0ICogVGhlIGVsZW1lbnQncyB0YWcgbmFtZSB3aWxsIGJlIGJhc2VkIG9uIHRoZSBuYW1lIG9mIGl0cyBjbGFzc1xuXHQgKiBAcGFyYW0gY3RvciBFbGVtZW50IGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHJlZ2lzdGVyPFQgZXh0ZW5kcyBVSUVsZW1lbnQ+KGN0b3I6IENvbnN0cnVjdG9yPFQ+KTogdm9pZFxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciB0aGlzIFVJRWxlbWVudCBkZXJpdmF0aXZlIHVuZGVyIGEgc3BlY2lmaWMgbmFtZVxuXHQgKiBAcGFyYW0gbmFtZSBDdXN0b20gdGFnIG5hbWUgd2l0aGluIEhUTUxcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXI8VCBleHRlbmRzIFVJRWxlbWVudD4odGhpczogQ29uc3RydWN0b3I8VD4sIG5hbWU6IEN1c3RvbUVsZW1lbnROYW1lKTogdm9pZFxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciB0aGlzIFVJRWxlbWVudCBkZXJpdmF0aXZlXG5cdCAqIFxuXHQgKiBUaGlzIGVsZW1lbnQncyB0YWcgbmFtZSB3aWxsIGJlIGJhc2VkIG9uIHRoZSBuYW1lIG9mIGl0cyBjbGFzc1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWdpc3RlcjxUIGV4dGVuZHMgVUlFbGVtZW50Pih0aGlzOiBDb25zdHJ1Y3RvcjxUPik6IHZvaWRcblxuXHRwdWJsaWMgc3RhdGljIHJlZ2lzdGVyPFQgZXh0ZW5kcyBVSUVsZW1lbnQ+KHBhcjE/OiBhbnksIHBhcjI/OiBhbnkpOiB2b2lkIHtcblx0XHRsZXQgbmFtZTogc3RyaW5nXG5cdFx0bGV0IGN0b3I6IENvbnN0cnVjdG9yPFQ+XG5cblx0XHRpZihwYXIxKSB7XG5cdFx0XHRpZihwYXIyKSB7IC8vTmFtZSBhbmQgY29uc3RydWN0b3Igc3BlY2lmaWVkXG5cdFx0XHRcdG5hbWUgPSBwYXIxXG5cdFx0XHRcdGN0b3IgPSBwYXIyXG5cdFx0XHR9IGVsc2UgeyAvL05hbWUgb3IgY29uc3RydWN0b3Igc3BlY2lmaWVkXG5cdFx0XHRcdHN3aXRjaCh0eXBlb2YgcGFyMSkge1xuXHRcdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHRcdG5hbWUgPSBwYXIxXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdGNhc2UgXCJmdW5jdGlvblwiOlxuXHRcdFx0XHRcdFx0Y3RvciA9IHBhcjJcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYocGFyMikgLy9OYW1lIHNwZWNpZmllZCwgY29uc3RydWN0b3IgaW1wbGljaXRcblx0XHRcdG5hbWUgPSBwYXIyXG5cblx0XHRpZighY3RvcikgLy9JbXBseSBjb25zdHJ1Y3RvciBmcm9tIGN1cnJlbnQgY2xhc3Ncblx0XHRcdGN0b3IgPSB0aGlzIGFzIGFueSBhcyBDb25zdHJ1Y3RvcjxUPlxuXG5cdFx0aWYoIW5hbWUpIHsgLy9DcmVhdGUgdGFnIG5hbWUgYmFzZWQgb24gY2xhc3MgbmFtZVxuXHRcdFx0bGV0IGNsYXNzTmFtZSA9IGN0b3IubmFtZVxuXHRcdFx0XHQucmVwbGFjZSgvRWxlbWVudCQvLCBfID0+IFwiXCIpXG5cdFx0XHRcdC5yZXBsYWNlKC9eW0EtWl0vLCBzID0+IHMudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0LnJlcGxhY2UoL1tBLVpdLywgcyA9PiBgLSR7cy50b0xvd2VyQ2FzZSgpfWApXG5cblx0XHRcdG5hbWUgPSBgdWktJHtjbGFzc05hbWV9YFxuXHRcdH1cblxuXHRcdC8vRGVmaW5lIGN1c3RvbSBlbGVtZW50XG5cdFx0Y3VzdG9tRWxlbWVudHMuZGVmaW5lKG5hbWUsIGN0b3IpXG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0IHRoYXQgdGhlIG5vZGUgaXMgb2YgdGhlIGdpdmVuIHR5cGUuXG5cdCAqIFxuXHQgKiBJZiB0aGUgYXNzZXJ0aW9uIGlzIGZhbHNlLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cblx0ICogQHBhcmFtIG5vZGUgTm9kZSB0byBjaGVja1xuXHQgKiBAcGFyYW0gY3RvciBFeHBlY3RlZCBiYXNlIHR5cGVcblx0ICovXG5cdHByb3RlY3RlZCBzdGF0aWMgcmVzdHJpY3Q8VCBleHRlbmRzIE5vZGU+KG5vZGU6IE5vZGUsIGN0b3I6IENvbnN0cnVjdG9yPFQ+KTogdm9pZCB7XG5cdFx0aWYobm9kZSBpbnN0YW5jZW9mIGN0b3IpXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmKCFub2RlKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBub2RlLCBub25lIHByb3ZpZGVkYClcblxuXHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgdHlwZSAke2N0b3IubmFtZX0sIGJ1dCBnb3QgdHlwZSAke25vZGUuY29uc3RydWN0b3IubmFtZX0gd2l0aCAke25vZGV9YClcblx0fVxufSJdfQ==