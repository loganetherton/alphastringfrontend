import { createSelector } from 'reselect';

/**
 * Direct selector to the alpha string state domain
 */

const selectLoginDomain = () => (state) => state.get('alpha');


/**
 * Default selector used by alpha string
 */
const makeSelectAlpha = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

const makeSelectAlphaInfo = () => createSelector(
  selectLoginDomain(),
  (substate) => ({
    alphaString: substate.get('alphaString'),
    errors: substate.get('errors').toJS(),
    delay: substate.get('delay')
  })
);

export default makeSelectAlpha;
export {
  selectLoginDomain,
  makeSelectAlphaInfo
};
