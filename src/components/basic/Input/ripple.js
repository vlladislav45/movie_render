const RIPPLE_DURATION = 300;

export function createRipple(evt, isDark, customColor) {
  let elem = evt.target;

  const x = evt.pageX - elem.getBoundingClientRect().left;
  const y = evt.pageY - elem.getBoundingClientRect().top;
  const circle = 'circle at ' + x + 'px ' + y + 'px';

  let animationFrame, animationStart;

  const rippleColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ';

  const animationStep = function (timestamp) {
    if ( !animationStart ) {
      animationStart = timestamp;
    }

    const frame = timestamp - animationStart;
    if ( frame < RIPPLE_DURATION ) {
      const easing = (frame / RIPPLE_DURATION) * (2 - (frame / RIPPLE_DURATION));

      const color = rippleColor + (0.45 * (1 - easing)) + ')';
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

function createExtraElementForRipple (elem) {
  elem = elem.parentNode
  elem.style.position = 'relative'
  const rippleElem = document.createElement('span')
  rippleElem.classList.add('ripple')
  rippleElem.style.position = 'absolute'
  rippleElem.style.left = '0'
  rippleElem.style.top = '0'
  rippleElem.style.width = '100%'
  rippleElem.style.height = '100%'
  elem.appendChild(rippleElem)
  elem = rippleElem
  setTimeout(() => {
    rippleElem.remove()
  }, RIPPLE_DURATION)

  return elem;
}
