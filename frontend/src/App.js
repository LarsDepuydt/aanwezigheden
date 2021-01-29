import { Switch, Route, Redirect } from "react-router-dom";

//import Main from "./pages/Main/Main";
import SignUp from "./pages/SignInUp/SignInUp";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <SignUp />
      </div>
    </div>
  );
}

export default App;
