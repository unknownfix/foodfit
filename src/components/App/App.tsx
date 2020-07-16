import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "@utils/redux-like";
import store from "@stores";
import { getUser } from "@stores/user/userAction";

import IndexPage from "@pages/IndexPage";
import SettingsPage from "@pages/SettingsPage";
import LoginPage from "@pages/LoginPage";
import Theme from "@components/Theme/Theme";
import Layout from "@components/Layout/Layout";
import StyledApp from "./StyledApp";

const App: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("AuthToken")) store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <StyledApp className="container">
            <Switch>
              <Route component={LoginPage} path="/login" exact />
              <Layout>
                <Route component={IndexPage} path="/" exact />
                <Route component={SettingsPage} path="/settings" exact />
              </Layout>
            </Switch>
          </StyledApp>
        </Theme>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
