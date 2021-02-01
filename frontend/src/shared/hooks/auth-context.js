import React from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  userId: "",
  jwt: "",
  csrf: "",
  login: () => {},
  logout: () => {},
});
