//https://stackoverflow.com/a/41698614
/**
 * Check if element is visible
 * @param elem the element to check
 * @param fromPosition optional, if we want to check if its visible from left top right ot bot position
 * (for example if we dont pass this prop, it will check if the center of the element is visible,
 * but if we pass fromPosition = 'right' it will check if the right most side is visible)
 * @return {boolean}
 */
export function isVisible(elem, fromPosition) {

  if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');

  const { width, height, left, top } = elem.getBoundingClientRect();
  if (elem.offsetWidth + elem.offsetHeight + height + width === 0) {
    return false;
  }
  const coordinatesFromElem = {};
  if (fromPosition) {
    if (fromPosition === 'right' || fromPosition === 'left') {
      coordinatesFromElem.x = elem.getBoundingClientRect()[fromPosition];
      coordinatesFromElem.y = elem.getBoundingClientRect().top + elem.offsetHeight / 2;
      // add 1 extra pixel because of resize recalculation throttling
      fromPosition === 'right' ? coordinatesFromElem.x -= 1 : coordinatesFromElem.x += 1;
    }
    // TODO: For top and bottom, if needed
  } else {
    coordinatesFromElem.x = left + elem.offsetWidth / 2;
    coordinatesFromElem.y = top + elem.offsetHeight / 2;
  }

  if (coordinatesFromElem.x < 0) return false;
  if (coordinatesFromElem.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
  if (coordinatesFromElem.y < 0) return false;
  if (coordinatesFromElem.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
  let pointContainer = document.elementFromPoint(coordinatesFromElem.x, coordinatesFromElem.y);
  do {
    if (!pointContainer) return false;
    if (pointContainer === elem) return true;
  } while (pointContainer = pointContainer.parentNode);

  return false;
}

/**
 * Return the last not visible(or semi not visible) genre of the array
 * @param arr the array of genres
 * @returns the last hidden element
 */
export function getLastInvisible(arr) {
  let lastInvisible = arr[0].current || arr[0];
  for (let element of arr) {
    // Work with array of refs and array of elements
    const ref = element.current || element;
    if (isVisible(ref)) {
      return lastInvisible;
    }
    lastInvisible = ref;
  }
  return lastInvisible;
}

/**
 * Used in genres carousel in top nav
 * Calculates the offset needed to move the element from below nextElement to  be shown
 * @param elem the element hidden by 'nextElement'
 * @param nextElement the element that is above 'elem'
 * @param isLeft are we sliding left or right
 */
export function calcOffset(elem, nextElement, isLeft = true) {
  const { x, width, right } = elem.getBoundingClientRect();
  const rect = nextElement.getBoundingClientRect();

  const newX = isLeft ? right - rect.right : rect.x - width;
  // 20 is the extra margin around element
  const offset = isLeft ? width - newX + 20 : x - newX + 20;
  return Math.abs(offset);
}
