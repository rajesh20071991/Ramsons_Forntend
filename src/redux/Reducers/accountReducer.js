import { AccountTypes } from "../action";

let initialState = {};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountTypes.AccountData:
      return { ...state, accountjdata: action.payload };
    case AccountTypes.user_manage:
      return { ...state, usermanage: action.payload };
    default:
      return state;
  }
};
export default AccountReducer;
