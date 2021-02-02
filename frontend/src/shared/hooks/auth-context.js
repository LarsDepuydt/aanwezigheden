import React from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  userId: "",
  token: "",
  csrf: "",
  login: () => {},
  logout: () => {},
});
