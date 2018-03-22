/**
 * @file  JavaScript entry point of the project
 */

// Import the whole Bootstrap JS bundle
// import 'bootstrap';

// Or just what you need to keep your vendor bundle small
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

// Import polyfills
import {applyPolyfills} from './base/polyfills';

// Import methods from the base module
import {consoleErrorFix, ieViewportFix} from './base/base';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

require('viewport-units-buggyfill').init();

$(async () => {
	// Wait with further execution until needed polyfills are loaded.
	await applyPolyfills();

	consoleErrorFix();
	ieViewportFix();

	const links = document.querySelectorAll('[link-to]');

	links.forEach((element) => {
		element.link = element.getAttribute('link-to');
		element.addEventListener('click', () => {
			window.location.href = element.link;
		});
	});

	const backgrounds = document.querySelectorAll('div.lazy');

	backgrounds.forEach((element) => {
		const link = element.getAttribute('data-src');
		element.style.backgroundImage = 'url(' + link + ')';
		setTimeout(() => {
			element.classList.add('loaded');
		}, 50);
	});

	setTimeout(() => {
		window.location.href = links[0].link;
	}, 5000);

});
