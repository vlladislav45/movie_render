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


// https://material.io/design/color/dark-theme.html#properties
const elevationOverlays = {
  0: 0,
  1: 0.5,
  2:  0.7 ,
  3:  0.8 ,
  4:  0.9 ,
  5:  0.1 ,
  6:  0.11 ,
  7:  0.11 ,
  8:  0.12 ,
  9:  0.12 ,
  10:  0.13 ,
  11:  0.13 ,
  12:  0.14 ,
  13:  0.14 ,
  14:  0.14 ,
  15:  0.14 ,
  16:  0.15 ,
};

export function calcDarkThemeOverlay (elevation = 1) {
  if (elevation < 16)
    return elevationOverlays[elevation];
  else if (elevation > 16 && elevation < 24)
    return elevationOverlays[16];
  else
    return  0.16 ;
}
