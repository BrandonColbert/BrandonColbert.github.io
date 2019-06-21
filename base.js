//Get the region where content is displayed
var content = document.getElementsByClassName("content")[0]

//Create a region where different pages content may be displayed
var subcontent = document.createElement("div")
subcontent.classList.add("subcontent")
content.prepend(subcontent)

//Move anything in content to subcontent
for(let i = 1; i < content.children.length; i++) {
	subcontent.appendChild(content.children[i])
	i--
}

//Add the navbar
var navbar = document.createElement("div")
navbar.classList.add("navbar")
setElementHTML(navbar, "/nav.html")
content.prepend(navbar)

window.onpopstate = function(event) {
	setElementHTML(subcontent, window.location.pathname)
}

/**
 * Sets the elements innerHTML with content loaded from file location
 * @param DOM Element to place content in
 * @param Location of the file containing the content
 * @return The promise from fetching
 */
function setElementHTML(element, location) {
	return fetch(location).then(content => content.text()).then(text => element.innerHTML = text)
}

/**
 * Navigates to and loads the page without reloading the website
 * @param Location of the file with the content
 */
function toPage(location) {
	history.pushState(null, null, location)
	setElementHTML(subcontent, location).then(() => {
		var scc = subcontent.children[0];

		for(let i = 0; i < scc.children.length; i++) {
			subcontent.appendChild(scc.children[i])
			i--
		}

		scc.remove()
	})
}