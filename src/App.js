import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";

import io from "socket.io-client";
import Home from "./pages/main/Home/Home";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import ChatHome from "./pages/main/Chat/Chat";

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
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <PublicRoute
              Route
              restricted={true}
              path="/login"
              exact
              component={Login}
            />
            <PublicRoute Route path="/register" exact component={Register} />
            <PublicRoute
              Route
              path="/forgot-password"
              exact
              component={ForgotPassword}
            />
            <PublicRoute Route path="/" exact component={Home} />
            <PrivateRoute
              socket={socket}
              path="/home"
              exact
              component={ChatHome}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
