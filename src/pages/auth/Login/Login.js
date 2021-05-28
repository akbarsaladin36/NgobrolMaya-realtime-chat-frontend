import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/home");
  };

  const changeText = (event) => {
    const { name } = event.target;
    setUsername(event.target.value);
    setForm({ ...form, [name]: event.target.value });
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
                  onChange={(event) => changeText(event)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
