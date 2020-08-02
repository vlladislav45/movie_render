// export function applyShadow(dp) {
// 	if (dp === 0) {
// 		return '';
// 	} else {
// 		let shadow = '0px ';
//
// 		const ambientY = dp;
// 		const ambientBlur = dp === 1 ? 3 : dp * 2;
// 		const ambientAlpha = (dp + 10 + (dp / 9.38)) / 100;
//
// 		shadow += ambientY + 'px ' + ambientBlur + 'px rgba(0, 0, 0, ' +
// 			ambientAlpha + '), 0px ';
//
// 		const directY = (dp < 10 ? (dp % 2 === 0 ? dp - ((dp / 2) - 1) : (dp -
// 			((dp - 1) / 2))) : dp - 4);
// 		const directBlur = dp === 1 ? 3 : dp * 2;
// 		const directAlpha = (24 - Math.round(dp / 10)) / 100;
// 		shadow += directY + 'px ' + directBlur + 'px rgba(0, 0, 0, ' + directAlpha +
// 			')';
//
// 		return shadow;
// 	}
// }

export function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});
	
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	} : null;
}

export function rgbToHex(rgb) {
	function toHex(decimal) {
		const hex = Math.round(decimal).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	}
	
	const { r, g, b } = rgb;
	
	return '#' + toHex(r) + toHex(g) + toHex(b);
}

// https://material.io/design/color/dark-theme.html#properties
const elevationOverlays = {
	0: 0,
	1: 0.05,
	2: 0.07,
	3: 0.08,
	4: 0.09,
	5: 0.1,
	6: 0.11,
	7: 0.11,
	8: 0.12,
	9: 0.12,
	10: 0.13,
	11: 0.13,
	12: 0.14,
	13: 0.14,
	14: 0.14,
	15: 0.14,
	16: 0.15,
};

export function calcDarkThemeOverlay(elevation = 1) {
	if (elevation < 16)
		return elevationOverlays[elevation];
	else if (elevation > 16 && elevation < 24)
		return elevationOverlays[16];
	else
		return 0.16;
}

/**
 * Calculate the color from surface with background: color, overlay: overlaycolor
 * and opacity of the overlay beteen 0 and 1
 * @param color color as hex value
 * @param overlayColor overlay color as hex value (without opacity)
 * @param opacity alpha channel between 0 and 1
 * @param asHex flag if the new color should be returned as hex or rgb
 */
export function getOverlay(color, overlayColor, opacity, asHex = false) {
	const { r: r1, g: g1, b: b1 } = hexToRgb(color);
	const { r: r2, g: g2, b: b2 } = hexToRgb(overlayColor);
	const r3 = r1 + (r2 - r1) * opacity;
	const g3 = g1 + (g2 - g1) * opacity;
	const b3 = b1 + (b2 - b1) * opacity;
	
	return asHex ? rgbToHex({ r: r3, g: g3, b: b3 }) : `rgb(${r3}, ${g3}, ${b3})`;
}

// taken from material design and https://stackoverflow.com/a/51500508
export function applyShadow(elevation) {
	return `${umbraMap[elevation]} rgba(0, 0, 0, ${umbraOpacity}),
					${penumbraMap[elevation]} rgba(0, 0, 0, ${penumbraOpacity}),
					${ambientMap[elevation]} rgba(0, 0, 0, ${ambientOpacity})`;
}

const umbraOpacity = .2;
const penumbraOpacity = .14;
const ambientOpacity = .12;

const umbraMap = {
	0: "0px 0px 0px 0px",
	1: "0px 2px 1px -1px",
	2: "0px 3px 1px -2px",
	3: "0px 3px 3px -2px",
	4: "0px 2px 4px -1px",
	5: "0px 3px 5px -1px",
	6: "0px 3px 5px -1px",
	7: "0px 4px 5px -2px",
	8: "0px 5px 5px -3px",
	9: "0px 5px 6px -3px",
	10: "0px 6px 6px -3px",
	11: "0px 6px 7px -4px",
	12: "0px 7px 8px -4px",
	13: "0px 7px 8px -4px",
	14: "0px 7px 9px -4px",
	15: "0px 8px 9px -5px",
	16: "0px 8px 10px -5px",
	17: "0px 8px 11px -5px",
	18: "0px 9px 11px -5px",
	19: "0px 9px 12px -6px",
	20: "0px 10px 13px -6px",
	21: "0px 10px 13px -6px",
	22: "0px 10px 14px -6px",
	23: "0px 11px 14px -7px",
	24: "0px 11px 15px -7px",
};

const penumbraMap = {
	0: "0px 0px 0px 0px",
	1: "0px 1px 1px 0px",
	2: "0px 2px 2px 0px",
	3: "0px 3px 4px 0px",
	4: "0px 4px 5px 0px",
	5: "0px 5px 8px 0px",
	6: "0px 6px 10px 0px",
	7: "0px 7px 10px 1px",
	8: "0px 8px 10px 1px",
	9: "0px 9px 12px 1px",
	10: "0px 10px 14px 1px",
	11: "0px 11px 15px 1px",
	12: "0px 12px 17px 2px",
	13: "0px 13px 19px 2px",
	14: "0px 14px 21px 2px",
	15: "0px 15px 22px 2px",
	16: "0px 16px 24px 2px",
	17: "0px 17px 26px 2px",
	18: "0px 18px 28px 2px",
	19: "0px 19px 29px 2px",
	20: "0px 20px 31px 3px",
	21: "0px 21px 33px 3px",
	22: "0px 22px 35px 3px",
	23: "0px 23px 36px 3px",
	24: "0px 24px 38px 3px",
};

const ambientMap = {
	0: "0px 0px 0px 0px",
	1: "0px 1px 3px 0px",
	2: "0px 1px 5px 0px",
	3: "0px 1px 8px 0px",
	4: "0px 1px 10px 0px",
	5: "0px 1px 14px 0px",
	6: "0px 1px 18px 0px",
	7: "0px 2px 16px 1px",
	8: "0px 3px 14px 2px",
	9: "0px 3px 16px 2px",
	10: "0px 4px 18px 3px",
	11: "0px 4px 20px 3px",
	12: "0px 5px 22px 4px",
	13: "0px 5px 24px 4px",
	14: "0px 5px 26px 4px",
	15: "0px 6px 28px 5px",
	16: "0px 6px 30px 5px",
	17: "0px 6px 32px 5px",
	18: "0px 7px 34px 6px",
	19: "0px 7px 36px 6px",
	20: "0px 8px 38px 7px",
	21: "0px 8px 40px 7px",
	22: "0px 8px 42px 7px",
	23: "0px 9px 44px 8px",
	24: "0px 9px 46px 8px"
};