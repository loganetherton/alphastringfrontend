import {
  GET_ALPHA,
  GET_ALPHA_SUCCESS,
  GET_ALPHA_FAIL,
  SET_PROP
} from './constants';

/**
 * Retrieve alpha
 */
export function getAlpha() {
  return {
    type: GET_ALPHA
  };
}

/**
 * Dispatch to retrieve alpha string
 *
 * @param  {string} res
 *
 * @return {object}
 */
export function getAlphaSuccess(res) {
  return {
    type: GET_ALPHA_SUCCESS,
    res
  };
}

/**
 * Dispatched when get alpha fails
 *
 * @param  {object} errors
 *
 * @return {object}
 */
export function getAlphaFail(errors) {
  return {
    type: GET_ALPHA_FAIL,
    errors,
  };
}

/**
 * Explicitly set a state property
 *
 * @param  {string} value Field value
 * @param {array} path Prop path
 *
 * @return {object}
 */
export function setProp(value, path) {
  return {
    type: SET_PROP,
    value,
    path
  };
}
