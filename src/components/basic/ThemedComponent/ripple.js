const RIPPLE_DURATION = 800;

export function createRipple(evt, isDark) {
  let elem = evt.target;

  if ( elem.tagName.toLowerCase() === 'img' ) {
    elem = elem.parentNode;
    elem.style.position = 'relative';
    const rippleElem = document.createElement('span');
    rippleElem.classList.add('ripple');
    rippleElem.style.position = 'absolute';
    rippleElem.style.left = '0';
    rippleElem.style.top = '0';
    rippleElem.style.width = '100%';
    rippleElem.style.height = '100%';
    elem.appendChild(rippleElem);
    elem = rippleElem;
    setTimeout(() => {
      rippleElem.remove();
    }, RIPPLE_DURATION)
  } else {
    let classes = elem.className;


    // Get the first parent with ripple enabled
    while (isSvg(elem) ||
    elem !== document.body ) {
      if (typeof classes === 'string' && classes.includes('ripple')) {
        break;
      }

      elem = elem.parentNode;
      classes = elem.className;
    }

    if ( elem === document.body) return;
  }
  const x = evt.pageX - elem.getBoundingClientRect().left;
  const y = evt.pageY - elem.getBoundingClientRect().top;

  let animationFrame, animationStart;

  const animationStep = function (timestamp) {
    if ( !animationStart ) {
      animationStart = timestamp;
    }

    const frame = timestamp - animationStart;
    if ( frame < RIPPLE_DURATION ) {
      const easing = (frame / RIPPLE_DURATION) * (2 - (frame / RIPPLE_DURATION));

      const rippleColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ';
      const circle = 'circle at ' + x + 'px ' + y + 'px';
      const color = rippleColor + (0.4 * (1 - easing)) + ')';
      const stop = 90 * easing + '%';
      elem.style['background-image'] = 'radial-gradient(' + circle + ', ' + color + ' ' + stop + ', transparent ' + stop + ')';

      animationFrame = window.requestAnimationFrame(animationStep);
    } else {
      elem.style.backgroundImage = 'none';
      window.cancelAnimationFrame(animationFrame);
    }

  };

  animationFrame = window.requestAnimationFrame(animationStep);
}

function isSvg(elem) {
  const { tagName } = elem;
  return tagName.toLowerCase() === 'svg' ||
    tagName.toLowerCase() === 'path';
}