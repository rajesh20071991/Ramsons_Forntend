import { AuthTypes } from "../action";

// Initial state for the auth reducer
const initialState = {
  loading: false,
  message: null,
  isLogged: false,
  loginError: 'Login failed: ', // Update this to match your actual error message
  user: null
};

// Auth reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_REQUEST:
      return { ...state, loading: true, message: null };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogged: true
      };
    case AuthTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        message: initialState.loginError + action.error, // Update this to access the correct error property
        isLogged: false
      };
    case AuthTypes.GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT': // Handle LOGOUT action
      return {
        ...initialState
      };
    case 'SET_USER': // Handle SET_USER action
      return {
        ...state,
        user: action.payload,
        isLogged: true
      };
    default:
      return state;
  }
};

export default auth;


