/**
 * Handle GET_ALPHA
 */

import {take, call, put, select, cancel, takeLatest, takeEvery} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {browserHistory} from 'react-router';

import {GET_ALPHA, GET_ALPHA_SUCCESS, SET_PROP} from 'containers/Alpha/constants';
import {getAlphaSuccess, getAlphaFail} from './actions';
import request from 'utils/request';
import {makeSelectAlphaInfo} from './selectors';

/**
 * Handle GET_ALPHA requests
 */
export function* handleGetAlpha() {
  // Select credentials from store
  const opts = {
    url: 'api/alpha',
    method: 'GET',
  };
  try {
    const res = yield call(request, opts);
    yield put(getAlphaSuccess(res));
  } catch (err) {
    yield put(getAlphaFail(err.errors));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* alpha() {
  // Handle alpha
  const watcher = yield takeLatest(GET_ALPHA, handleGetAlpha);
  // Redirect on success
  yield takeEvery(GET_ALPHA_SUCCESS, () => {
    browserHistory.push('/');
  });

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  alpha,
];
