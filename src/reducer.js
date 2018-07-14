import * as types from './actions';

const initialState = {
  'accountData.json': {},
  'accountEvents.json': {},
  'groupedReports.json': {},
  'loginEvents.json': {},
  'rpPurchases.json': {},
  'storeTransactions.json': {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FILE:
      return { ...state, [action.payload.file.name]: action.payload };
    default:
      return state;
  }
};
