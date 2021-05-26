import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Chat from "./pages/main/Chat/Chat";
import Counter from "./pages/main/Counter/CounterFunctional";
import styles from "./App.css";

import io from "socket.io-client";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const newSocket = io.connect("http://localhost:3003", {
      path: "/backend3/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connected socket client!");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute
            restricted={true}
            path="/login"
            exact
            component={Login}
          />
          <PublicRoute path="/register" exact component={Register} />
          <PublicRoute
            path="/forgot-password"
            exact
            component={ForgotPassword}
          />
          <PrivateRoute socket={socket} path="/chat" exact component={Chat} />
          <PrivateRoute path="/counter" exact component={Counter} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
