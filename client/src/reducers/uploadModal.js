import { SHOW_UPLOAD_MODAL, HIDE_UPLOAD_MODAL } from '../actions/types';

const initialState = false;

export default function(state = initialState, action) {
  const { type } = action;

  switch(type) {
    case SHOW_UPLOAD_MODAL:
      return true;
    case HIDE_UPLOAD_MODAL:
      return false;
    default:
      return state;
  }
}