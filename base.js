document.getElementsByTagName("head")[0].innerHTML = "<title>Brandon's Projects</title>"

let body = document.getElementsByTagName("body")[0]
body.innerHTML = `
	<div class="menuTitle">Brandon's Projects</div>
	<div class="navMenu" align="right">
		<a class="navItem" href="/index">Home</a>
		<div class="navItem dropMenu">Projects
			<div class="dropItems">
				<a href="/projects/antipodean-chess">Antipodean Chess</a>
				<a href="/projects/carousel-launcher">Carousel Launcher</a>
				<a href="/projects/dogma-of-space">Dogma of Space</a>
				<a href="/projects/fitr">Fitr</a>
				<a href="/projects/iris">Project Iris</a>
				<a href="/projects/tabs">Tabs</a>
			</div>
		</div>
		<a class="navItem" href="/about">About Me</a>
		<a class="navItem" href="/contact">Contact</a>
	</div>
	<br><br><br><br>
` + body.innerHTML