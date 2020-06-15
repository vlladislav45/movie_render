//https://stackoverflow.com/a/41698614
export function isVisible(elem) {
  if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');

  if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
    elem.getBoundingClientRect().width === 0) {
    return false;
  }
  const elemCenter   = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
  };
  if (elemCenter.x < 0) return false;
  if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
  if (elemCenter.y < 0) return false;
  if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while (pointContainer === pointContainer.parentNode);
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
