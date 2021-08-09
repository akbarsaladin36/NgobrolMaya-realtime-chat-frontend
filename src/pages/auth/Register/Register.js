import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../../../redux/action/auth";
import styles from "./Register.module.css";

function Register(props) {
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [form, setForm] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(
      register({ userEmail: email, userName: username, userPassword: password })
    );
    props.history.push("/login");
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  // const changeText = (event) => {
  //   const { name } = event.target;
  //   setUsername(event.target.value);
  //   setForm({ ...form, [name]: event.target.value });
  // };

  return (
    <div>
      <Container>
        <Card className={`${styles.card_size} mt-5 mx-auto`}>
          <Card.Body>
            <Link to="/login" className={styles.back_button}>
              <h5>{"<"}</h5>
            </Link>
            <h3 className={`${styles.login_text} text-center mt-4`}>
              Register
            </h3>
            <p className="mt-3">Let's create your account!</p>
            <Form onSubmit={handleRegister} className="mt-4">
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(event) => changeUsername(event)}
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
              <Button
                variant="primary"
                className={`${styles.login_button} mt-4`}
                type="submit"
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
