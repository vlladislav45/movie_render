export const XS_SM = 'extraSmallDevice';
export const SM = 'smallDevice';
export const M = 'mediumDevice';
export const L = 'largeDevice';
export const XL = 'extraLargeDevice';
export const FULL_HD = 'fullHD';

const medias = {
	extraSmallDevice: window.matchMedia('(max-width: 600px)'),
	smallDevice: window.matchMedia('(max-width: 767.98px)'),
	mediumDevice: window.matchMedia('(max-width: 991.98px)'),
	largeDevice: window.matchMedia('(max-width: 1199.98px)'),
	extraLargeDevice: window.matchMedia('(max-width: 1919px)'),
	fullHD: window.matchMedia('(min-width: 1920px)'),
};

export function greaterThen(current, shouldBeGreater) {
	return Object.keys(medias).indexOf(current) > Object.keys(medias).indexOf(shouldBeGreater);
}

export function lessThen(current, shouldBeLesser) {
	return Object.keys(medias).indexOf(current) < Object.keys(medias).indexOf(shouldBeLesser);
}

export function checkMedia() {
	for (let mediasKey in medias) {
		const { matches } = medias[mediasKey];
		if (matches)
			return mediasKey;
	}
	
	return L;
}
