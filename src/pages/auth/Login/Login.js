import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../../../redux/action/auth";
import { getUserProfileId } from "../../../redux/action/user";
import { connect } from "react-redux";
import styles from "./Login.module.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email && !password) {
      setErrorMsg("Fill all form below to login!");
      setSuccessMsg(false);
    } else if (!email) {
      setErrorMsg("Fill the email below!");
      setSuccessMsg(false);
    } else if (!password) {
      setErrorMsg("Fill the password below!");
      setSuccessMsg(false);
    } else {
      props
        .login({ userEmail: email, userPassword: password })
        .then((res) => {
          setSuccessMsg(res.action.payload.data.msg);
          setErrorMsg(false);
          localStorage.setItem("token", res.value.data.data.token);
          props.getUserProfileId(res.action.payload.data.data.user_id);
          setTimeout(() => {
            props.history.push("/home");
          }, 3000);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.msg);
          setSuccessMsg(false);
        });
    }
  };

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
            <Form onSubmit={handleLogin} className="mt-4" noValidate>
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
              {successMsg && (
                <div className="alert alert-success mt-5" role="alert">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="alert alert-danger mt-5" role="alert">
                  {errorMsg}
                </div>
              )}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  login,
  getUserProfileId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
