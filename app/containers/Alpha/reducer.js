import { fromJS } from 'immutable';
import _ from 'lodash';

import {
  GET_ALPHA,
  GET_ALPHA_FAIL,
  GET_ALPHA_SUCCESS,
  SET_PROP,
} from './constants';

const errorInterface = {
  email: null,
  password: null
};

const initialState = fromJS({
  delay: 1000,
  alphaString: 'Your alphanumeric string will appear here.',
  errors: {}
});

function alphaReducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Set a property
     */
    case SET_PROP:
      return state.setIn(['delay'], 1000);
    case GET_ALPHA:
      return state;
    case GET_ALPHA_SUCCESS:
      return state
        .set('alphaString', action.res)
        .set('errors', fromJS(errorInterface));
    case GET_ALPHA_FAIL:
      const display = {};
      action.errors.map(err => {
        const errKey = err.source.parameter.split(',')[1];
        display[errKey] = _.capitalize(err.title.replace(/this field/i, errKey));
      });
      return state
        .set('errors', fromJS(display));
    default:
      return state;
  }
}

export default alphaReducer;
