export default class Content {
	/**
	 * @param url Url with content
	 * @returns Content at url
	 */
	public static async fetch(url: string): Promise<string> {
		return new Promise(resolve => {
			let request = new XMLHttpRequest()

			request.onload = () => {
				if(request.readyState == 4 && request.status == 200)
					resolve(request.responseText)
			}

			request.onerror = () => resolve(null)
			request.open("get", url, true)
			request.send()
		})
	}
}