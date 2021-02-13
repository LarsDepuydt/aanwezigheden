import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/hooks/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";

import NieuweVereniging from "./pages/NieuweVereniging/NieuweVeringing";
import SignInUp from "./pages/SignInUp/SignInUp";
import Main from "./pages/Main/Main";
import Navigation from "./shared/components/Navigation/Navigation";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/inloggen">
          <SignInUp signIn={true} />
        </Route>
        <Route path="/registreren">
          <SignInUp signIn={false} />
        </Route>
        <Route path="/nieuwe-vereniging">
          <NieuweVereniging />
        </Route>
        <Redirect to="/inloggen" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!token,
        userId,
        token: token,
        csrf: "",
        login,
        logout,
      }}
    >
      <Router>
        <header>
          <h1>Aanwezigheden Chiro Skippy</h1>
        </header>
        {token && <Navigation />}
        <main>{routes}</main>
        <footer></footer>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
