import {css} from 'styled-components';

/**
 * Handle media queries
 */
export const media = {
  retina: (...args) => css`
  /*iPhone retina*/
    @media only screen and (min-width : 320px) {
      ${ css(...args) }
    }
  `,
  xs: (...args) => css`
  /*iPhone retina*/
    @media only screen and (min-width : 480px) {
      ${ css(...args) }
    }
  `,
  sm: (...args) => css`
  /*iPhone retina*/
    @media only screen and (min-width : 768px) {
      ${ css(...args) }
    }
  `,
  med: (...args) => css`
  /*iPhone retina*/
    @media only screen and (min-width : 992px) {
      ${ css(...args) }
    }
  `,
  lg: (...args) => css`
  /*iPhone retina*/
    @media only screen and (min-width : 1200px) {
      ${ css(...args) }
    }
  `
};
