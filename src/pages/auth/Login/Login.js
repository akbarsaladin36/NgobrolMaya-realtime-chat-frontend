import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";
import styles from "./Login.module.css";

function Login(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  useEffect(() => {
    if (auth.data.token) {
      localStorage.setItem("token", auth.data.token);
      props.history.push("/home");
    }
  }, [auth, props]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ userEmail: email, userPassword: password }));
  };

  // const changeText = (event) => {
  //   const { name } = event.target;
  //   setEmail(event.target.value);
  //   setPassword(event.target.value);
  //   setForm({ ...form, [name]: event.target.value });
  // };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Container>
        <Card className={`${styles.card_size} mt-5 mx-auto`}>
          <Card.Body>
            <h3 className={`${styles.login_text} text-center mt-4`}>Login</h3>
            <p className="mt-3">Hi, Welcome back</p>
            <Form onSubmit={handleLogin} className="mt-4">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => changeEmail(event)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => changePassword(event)}
                />
              </Form.Group>
              <Link
                to="/forgot-password"
                className={`${styles.login_text} ${styles.forgot_password_text}`}
              >
                Forgot password?
              </Link>
              <Button
                variant="primary"
                className={`${styles.login_button} mt-4`}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="text-center mt-4">
              Don't have an account? {"  "}
              <Link to="/register" className={styles.sign_up_link_text}>
                Sign Up
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
