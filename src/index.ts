import "./ui/elements/copyToElement.js"
import Navbar from "./ui/views/navbar.js"
import Sidebar from "./ui/views/sidebar.js"
import Animator from "./utils/animator.js"
import Content from "./utils/content.js"
import HideOnScroll from "./utils/hideOnScroll.js"

//Setup layout elements
let main = document.querySelector("main")
let navbar = new Navbar(document.querySelector("#navigation"))
let sidebar = new Sidebar(document.querySelector("#sidebar"))

//Populate sidebar
Content.fetch("/resources/data/layout.json").then(data => {
	let layout: Sidebar.Layout = JSON.parse(data)

	//Add informative items
	layout.info.forEach(item => sidebar.infoList.add(new Sidebar.Info.Item(
		item,
		() => location.hash = `/info/${item.name}`
	)))

	//Add projects
	layout.projects.forEach(item => sidebar.projectList.add(new Sidebar.Project.Item(
		item,
		() => location.hash = `/projects/${item.name}`
	)))
})

addEventListener("load", async () => {
	//Delay animations until page load
	document.body.classList.remove("deferred")

	//Wait for animations to finish
	await new Promise<void>(r => setTimeout(() => r(), 1000))

	//Default to About page
	if(!location.hash.substring(1))
		location.hash = "/info/About"

	//Check if a project is being viewed
	await checkHash()
	addEventListener("hashchange", () => checkHash())
})

/**
 * View the project associated with the hash
 */
async function checkHash(): Promise<void> {
	let hash = location.hash.substring(1)

	;[...sidebar.projectList].forEach(item => item.active = false)

	if(hash.startsWith("/")) {
		let sections = hash.substring(1).split("/")
		
		switch(sections.length) {
			case 2:
				let name = decodeURI(sections[1])

				let animator = new Animator({
					options: {
						fill: "forwards",
						duration: 125
					},
					targets: {
						elements: [
							document.querySelector("#content"),
							navbar.element
						],
						keyframes: [
							{opacity: "1"},
							{opacity: "0"}
						]
					}
				})

				HideOnScroll.unregister(navbar.element)

				switch(sections[0]) {
					case "projects":
						if(!sidebar.projectList.has(name))
							break

						//View the project
						let item = sidebar.projectList.get(name)
						item.active = true

						await animator.forwards()
						await item.view({nav: navbar, main: main})
						document.querySelector("#content").scrollTop = 0
						await animator.backwards()

						HideOnScroll.register(navbar.element, document.querySelector("#content"))
						break
					case "info":
						if(!sidebar.infoList.has(name))
							break

						//View the info
						await animator.forwards()
						await sidebar.infoList.get(name).view({nav: navbar, main: main})
						await animator.backwards()
						break
				}
				break
		}
	}
}