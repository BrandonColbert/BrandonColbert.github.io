document.getElementsByTagName("head")[0].innerHTML = "<title>Brandon's Projects</title>"

let body = document.getElementsByTagName("body")[0]
body.innerHTML = `
	<div class="menuTitle">Brandon's Projects</div>
	<div class="navMenu" align="right">
		<a class="navItem" href="/index.html">Home</a>
		<div class="navItem dropMenu">Projects
			<div class="dropItems">
				<a href="/projects/antipodean-chess.html">Antipodean Chess</a>
				<a href="/projects/carousel-launcher.html">Carousel Launcher</a>
				<a href="/projects/dogma-of-space.html">Dogma of Space</a>
				<a href="/projects/fitr.html">Fitr</a>
				<a href="/projects/iris.html">Project Iris</a>
				<a href="/projects/tabs.html">Tabs</a>
			</div>
		</div>
		<a class="navItem" href="/about.html">About Me</a>
		<a class="navItem" href="/contact.html">Contact</a>
	</div>
	<br><br><br><br>
` + body.innerHTML