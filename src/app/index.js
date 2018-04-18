/**
 * @file  JavaScript entry point of the project
 */

// Import the whole Bootstrap JS bundle
// import 'bootstrap';

// Or just what you need to keep your vendor bundle small
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

import moment from 'moment';
import tz from 'moment-timezone';
import jump from 'jump.js';
import lazysizes from 'lazysizes';
import Flickity from 'flickity';
import TweenLite from 'gsap';
require('../../node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js');

// Import polyfills
import {applyPolyfills} from './base/polyfills';

// Import methods from the base module
import {consoleErrorFix, ieViewportFix} from './base/base';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

require('viewport-units-buggyfill').init();

let introHidden = false;

const freezeVp = (e) => {
	e.preventDefault();
};

const stopBodyScrolling = (bool) => {
	if (bool === true) {
		document.body.addEventListener('touchmove', freezeVp, false);
	} else {
		document.body.removeEventListener('touchmove', freezeVp, false);
	}
};

// Const easeInOutCubic = (t, b, c, d) => {
// 	if ((t/=d/2) < 1) return c/2*t*t*t + b;
// 	return c/2*((t-=2)*t*t + 2) + b;
// };

const easeInOutExpo = (t, b, c, d) => {
	if (t == 0) return b;
	if (t == d) return b + c;
	if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

const timeClock = () => {
	const timeLa = document.querySelector('#la-time');

	const timeFr = document.querySelector('#fr-time');

	const displayTime = () => {
		const now = moment();

		const timeInLa = now.tz('America/Los_Angeles');
		timeLa.innerHTML = 'Los Angeles<br>' + timeInLa.format('hh:mm:ss a');

		const timeInFr = now.tz('Europe/Paris');
		timeFr.innerHTML = 'Paris<br>' + timeInFr.format('hh:mm:ss a');
	};

	setInterval(displayTime, 1000);
};

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const scan = () => {

	const slider = document.getElementById('intro-scan');
	const flkty = new Flickity(slider, {
		cellSelector: '.image',
		pageDots: false,
		prevNextButtons: false,
		accessibility: false
	});

	// setInterval(function() {
	// 	flkty.next(true, true);
	// }, 600);

	const makeScan = () => {
		const timing = rand(2, 7);
		if (introHidden) return;
		scanAnim(timing);
	};

	const scanAnim = (timing) => {
		TweenLite.fromTo('#scanner-light', timing, {
			height: 0,
			yPercent: 0
		}, {
			height: '100%',
			yPercent: 100,
			ease: Cubic.easeInOut,
			onComplete: makeScan
		});
		setTimeout(() => {
			flkty.next(true, true);
		}, timing);
	};

	makeScan();
};

const intro = () => {
	window.scroll(0, 0);
	stopBodyScrolling(true);
	document.getElementById('intro').addEventListener('click', () => {
		jump('#about', {
			duration: 1000,
			callback: hideIntro,
			easing: easeInOutExpo
		});
	});
};

const hideIntro = () => {
	document.body.classList.remove('intro');
	document.getElementById('intro').style.display = 'none';
	stopBodyScrolling(false);
	introHidden = true;
};

$(async () => {
	// Wait with further execution until needed polyfills are loaded.
	await applyPolyfills();

	consoleErrorFix();
	ieViewportFix();

	timeClock();
	scan();
	intro();

	setTimeout(() => {
		document.getElementById('loader').style.display = 'none';
	}, 0);

});
