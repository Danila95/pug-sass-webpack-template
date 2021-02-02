function createAnalutics() {
	let counter = 0;
	let isDestroyed = false;

	const listener = () => counter++;

	document.addEventListener('click', listener);

	return {
		destroy() {
			document.removeEventListener('click', listener)
			isDestroyed = true;
			return console.log('Done');
		},

		getClicks() {
			if (isDestroyed) {
				return `Analytics is destroyed Total clicks = ${counter}`
			}
			return counter
		}
	}
}

window.analytics = createAnalutics();