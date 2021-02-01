import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/hooks/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";

import Main from "./pages/Main/Main";
import SignInUp from "./pages/SignInUp/SignInUp";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes = (
    <Switch>
      <Route path="/inloggen">
        <SignInUp signIn={true} />
      </Route>
      <Route path="/registreren">
        <SignInUp signIn={false} />
      </Route>
      <Redirect to="/inloggen" />
    </Switch>
  );

  if (token) {
    routes = (
      <Switch>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!token,
        userId,
        jwt: token,
        csrf: "",
        login,
        logout,
      }}
    >
      <Router>
        <header>
          <h1>Aanwezigheden Chiro Skippy</h1>
        </header>
        <main>{routes}</main>
        <footer></footer>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
