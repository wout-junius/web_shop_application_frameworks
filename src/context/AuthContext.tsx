import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

//Tutorial https://www.youtube.com/watch?v=0Z68AHS011Y

const initialState = {
  user: null,
};
if (localStorage.getItem("token")) {
  
  const decodedToken: any = jwtDecode(localStorage.getItem("token")!);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;    
  }
}

const AuthContext = createContext({
  user: null,
  login: (jwt: string) => {},
  logout: () => {},
});

function authReducer(
  state: any,
  action: { payload?: any; type: "LOGIN" | "LOGOUT" }
) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    const userData: any = jwtDecode(jwt);
    userData.token = jwt;
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
