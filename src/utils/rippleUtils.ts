import {ACTIVE_RIPPLE_CLASS, RIPPLE_DURATION} from 'components/Styled/BaseRipple';

let timeClicked = 0
function startRipple(e :MouseEvent) {
    timeClicked = performance.now();
    const element :HTMLElement = (e.target as HTMLElement);
    const { left, top, width, height } = element.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const x = clientX - left;
    const y = clientY - top;

    element.style.setProperty('--tx', `${x}px`);
    element.style.setProperty('--ty', `${y}px`);
    element.style.setProperty('--scale', `${2 * Math.max(width, height)}`);
    element.classList.add(ACTIVE_RIPPLE_CLASS);
}

function cancelRipple(e: MouseEvent) {
    const timeElapsed = performance.now() - timeClicked;

    const element: HTMLElement = (e.target as HTMLElement);
    setTimeout(() => {
        element.classList.remove(ACTIVE_RIPPLE_CLASS);
    }, RIPPLE_DURATION - timeElapsed);
}

export const addRipple = (element: HTMLElement) => {
    // If there are, remove them
    element.removeEventListener('mousedown', startRipple);
    element.removeEventListener('mouseup', cancelRipple);
    element.removeEventListener('mouseleave', cancelRipple);
    element.addEventListener('mousedown', startRipple);
    element.addEventListener('mouseup', cancelRipple);
    element.addEventListener('mouseleave', cancelRipple);
}