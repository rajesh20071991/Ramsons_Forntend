import { api } from "../../services/api";
import { AuthTypes } from "../action";


// Action creators
export const logout = () => {
  // Perform any necessary cleanup, such as clearing local storage or making API requests
  // before dispatching the LOGOUT action
  return {
    type: AuthTypes.LOGOUT,
  };
};


export const SetUser = () => (dispatch) => {
  const url = "/auth/user/";
  api({ api: url })
    .then((data) => {
      localStorage.setItem('username', data.username);
      dispatch({ type: AuthTypes.SET_USER, payload: data });
      dispatch({ type: AuthTypes.LOGIN_SUCCESS }); // dispatch LOGIN_SUCCESS action
    })
    .catch(({ message }) => {
      console.log(message);
    });
};
