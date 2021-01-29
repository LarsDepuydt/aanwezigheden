import { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Main from "./pages/Main/Main";
import SignInUp from "./pages/SignInUp/SignInUp";

function App() {
  const [login, setLogin] = useState(false);

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

  if (login) {
    routes = (
      <Switch>
        <Main />
      </Switch>
    );
  }

  return (
    <>
      <h1>Aanwezigheden Chiro Skippy</h1>
      <header></header>
      <main>{routes}</main>
      <footer></footer>
    </>
  );
}

export default App;
