export function applyShadow (dp) {
  if (dp === 0) {
    return '';
  } else {
    let shadow = '0px ';

    const ambientY = dp;
    const ambientBlur = dp === 1 ? 3 : dp * 2;
    const ambientAlpha = (dp + 10 + (dp / 9.38)) / 100;

    shadow += ambientY + 'px ' + ambientBlur + 'px rgba(0, 0, 0, ' +
      ambientAlpha + '), 0px ';

    const directY = (dp < 10 ? (dp % 2 === 0 ? dp - ((dp / 2) - 1) : (dp -
      ((dp - 1) / 2))) : dp - 4);
    const directBlur = dp === 1 ? 3 : dp * 2;
    const directAlpha = (24 - Math.round(dp / 10)) / 100;
    shadow += directY + 'px ' + directBlur + 'px rgba(0, 0, 0, ' + directAlpha +
      ')';

    return shadow;
  }
}

export function hexToRgb (hex) {
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

export function rgbToHex (rgb) {
  function toHex (decimal) {
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

export function calcDarkThemeOverlay (elevation = 1) {
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
 */
export function getOverlay (color, overlayColor, opacity, asHex = false) {
  const { r: r1, g: g1, b: b1 } = hexToRgb(color);
  const { r: r2, g: g2, b: b2 } = hexToRgb(overlayColor);
  const r3 = r1 + (r2 - r1) * opacity;
  const g3 = g1 + (g2 - g1) * opacity;
  const b3 = b1 + (b2 - b1) * opacity;

  return asHex ? rgbToHex({ r: r3, g: g3, b: b3 }) : `rgb(${r3}, ${g3}, ${b3})`;
}
