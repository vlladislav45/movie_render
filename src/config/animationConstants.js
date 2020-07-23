export const rippleConstants = {
  SMALL_RIPPLE_DURATION: 150,
  MEDIUM_RIPPLE_DURATION: 200,
  LARGE_RIPPLE_DURATION: 300,
};

export const transitionDurations = {
  DROP_DOWN: 300,
  smallArea: 100,
  mediumExpand: 250,
  mediumCollapsing: 200,
  largeExpand: 300,
  largeCollapsing: 250,
};

/** Taken straight out of material.io
 ** {@Link https://material.io/design/motion/speed.html}
 */
export const transitionFunctions = {
  standardEasing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  deceleratedEasing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleratedEasing: 'cubic-bezier(0.4, 0.0, 1, 1)',
};
