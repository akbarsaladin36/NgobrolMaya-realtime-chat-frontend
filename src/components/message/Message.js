import React from "react";
import {
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import ProfilePicture from "../../assets/img/default-profile-icon.jpg";
import styles from "./MessageStyle.module.css";
import { getUserProfileId } from "../../redux/action/user";
import { getAllChat, sendChat } from "../../redux/action/chat";

function Message(props) {
  return (
    <div>
      <Row>
        <Col>
          <Row className={`${styles.chat_cursor} mt-3`}>
            <Col xs={1}>
              <img
                src={ProfilePicture}
                alt="profile user"
                className={styles.profile_picture_size}
              />
            </Col>
            <Col xs={3} className="mt-1">
              <p className={styles.user_text} onClick={props.showUserProfile}>
                Nama User
              </p>
              <p className={styles.user_text}>Status profil</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={1}>
          <img
            src={ProfilePicture}
            alt="profile chat user"
            className={styles.profile_chat_size}
          />
        </Col>
        <Col sm={6}>
          <div className={styles.bubble_chat}>
            <p>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
              ipsum lorem ipsum lorem
            </p>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 float-end">
        <Col sm={9}>
          <div className={styles.bubble_chat_sender}>
            <p>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
              ipsum lorem ipsum lorem
            </p>
          </div>
        </Col>
        <Col sm={1} className="ml-1">
          <img
            src={ProfilePicture}
            alt="profile chat user"
            className={styles.profile_chat_size}
          />
        </Col>
      </Row>
      <Row>
        <Form className={styles.input_message_position}>
          <Row className={styles.input_size}>
            <Col lg={9}>
              <InputGroup>
                <FormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">Add</Button>
                  <Button variant="outline-secondary">Send</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}

export default Message;
