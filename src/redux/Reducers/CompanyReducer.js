import { CompanyTypes } from "../action";

let initialState = {};

const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CompanyTypes.COMPANY_DATA:
      return { ...state, company_data: action.payload };
    case CompanyTypes.ACCOUNT_DATA:
      return { ...state, account_data: action.payload };
    case CompanyTypes.LEDGER_DATA:
      return { ...state, ledger_data: action.payload };
    case CompanyTypes.amount_data:
      return { ...state, amountdata: action.payload };
    case CompanyTypes.account_view:
      return { ...state, accountviews: action.payload };
    default:
      return state;
  }
};
export default CompanyReducer;
