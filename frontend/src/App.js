import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/hooks/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";

import GetVid from "./shared/components/hoc/GetVid/GetVid";
import NieuweVereniging from "./pages/NieuweVereniging/NieuweVeringing";
import SignInUp from "./pages/SignInUp/SignInUp";
import Main from "./pages/Main/Main";
import Navigation from "./shared/components/hoc/Navigation/Navigation";

const App = () => {
  const { token, admin, login, logout, userId, vid, setVid } = useAuth();

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
        <Route path="/:verenigingNaam/inloggen">
          <GetVid>
            <SignInUp signIn={true} />
          </GetVid>
        </Route>
        <Route path="/:verenigingNaam/registreren">
          <GetVid>
            <SignInUp signIn={false} />
          </GetVid>
        </Route>
        <Route exact path="/nieuwe-vereniging">
          <NieuweVereniging />
        </Route>
        <Redirect to="/nieuwe-vereniging" />
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
        admin: admin,
        vid,
        login,
        logout,
        setVid,
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
};

export default App;
