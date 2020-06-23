import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "../../pages/IndexPage";

import LoginPage from "../../pages/LoginPage";
import Theme from "../Theme/Theme";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Theme>
        <div className="container">
          <Switch>
            <Route component={Index} path="/" exact />
            <Route component={LoginPage} path="/login" />
          </Switch>
        </div>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
