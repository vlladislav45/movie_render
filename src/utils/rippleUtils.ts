import {ACTIVE_RIPPLE_CLASS, RIPPLE_DURATION} from 'components/Styled/BaseRipple';

let timeClicked = 0
function startRipple(e :MouseEvent) {
    timeClicked = Date.now();
    const element :HTMLElement = (e.target as HTMLElement);
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    element.style.setProperty('--tx', `${x}px`);
    element.style.setProperty('--ty', `${y}px`);
    element.classList.add(ACTIVE_RIPPLE_CLASS);
}

function cancelRipple(e: MouseEvent) {
    const timeElapsed = Date.now() - timeClicked;

    const element: HTMLElement = (e.target as HTMLElement);
    setTimeout(() => {
        element.classList.remove(ACTIVE_RIPPLE_CLASS);
    }, 1.3 * RIPPLE_DURATION - timeElapsed);
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