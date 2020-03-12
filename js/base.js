//Get the region where content is displayed
const content = document.querySelector(".content")

//Create a region where different pages content may be displayed
const subcontent = document.createElement("div")
subcontent.classList.add("subcontent")
content.prepend(subcontent)

//Move anything in content to subcontent
while(content.children.length > 1)
	subcontent.appendChild(content.children[1])

//Add the navbar
const navbar = document.createElement("div")
navbar.classList.add("navbar")
setElementHTML(navbar, "/nav.html")
content.prepend(navbar)

window.onpopstate = () => setElementHTML(subcontent, window.location.pathname)

/**
 * Sets the elements innerHTML with content loaded from file location
 * @param {HTMLElement} element Element to place content in
 * @param {string} location of the file containing the content
 */
async function setElementHTML(element, location) {
	element.innerHTML = (await (await fetch(location)).text())
}

/**
 * Navigates to and loads the page without reloading the website
 * @param Location of the file with the content
 */
async function toPage(location) {
	history.pushState(null, null, location)
	await setElementHTML(subcontent, location)
	
	let scc = subcontent.children[0];
	while(scc.children.length > 0)
		subcontent.appendChild(scc.children[0])

	scc.remove()
}