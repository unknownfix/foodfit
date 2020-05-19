import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "../../pages/IndexPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route component={Index} path="/" exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
