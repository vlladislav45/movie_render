import { checkMedia, XS_SM, SM, lessThen, greaterThen, M, L, XL, FULL_HD } from 'utils/mediaUtils';

export const getMoviesPerPage = () => {
  const media = checkMedia();
  switch (media) {
    case XS_SM:
    case SM:
      return 1
    case M:
    case L:
      return 3;
    case XL:
      return 3;
    case FULL_HD:
      return 9;
    default:
      return 1;
  }
}
