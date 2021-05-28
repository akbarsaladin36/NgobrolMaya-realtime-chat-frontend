import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { VscListSelection } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";
// import { Link } from "react-router-dom";
import styles from "./ChatStyle.module.css";
import ProfilePicture from "../../../assets/img/default-profile-icon.jpg";
import Message from "../../../components/message/Message";

function ChatHome() {
  const [showMessage, setShowMessage] = useState(false);

  const showChatMessage = () => {
    setShowMessage(true);
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col sm={3} className="bg-light">
            <Row className="mt-3">
              <Col>
                <h5>Telegram</h5>
              </Col>
              <Col>
                <i className={styles.list_icon}>
                  <VscListSelection />
                </i>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col sm={10}>
                <Form>
                  <Form.Row>
                    <InputGroup className="mb-2 mr-sm-2">
                      <InputGroup.Prepend>
                        <Button className={styles.search_icon}>
                          <VscSearch />
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl type="search" placeholder="type a search" />
                    </InputGroup>
                  </Form.Row>
                </Form>
              </Col>
              <Col>
                <i className={styles.list_icon_2}>
                  <VscAdd className="mt-2" />
                </i>
              </Col>
            </Row>
            <Row className="mt-5" onClick={showChatMessage}>
              <Col sm={3}>
                <img
                  src={ProfilePicture}
                  alt="profile user"
                  className={styles.profile_picture_size}
                />
              </Col>
              <Col sm={6}>
                <p>Nama User</p>
                <p className={styles.chat_text}>Isi chat</p>
              </Col>
              <Col sm={3}>
                <p>15:40</p>
                <div className={styles.notification_bubble_chat}>28</div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={3}>
                <img
                  src={ProfilePicture}
                  alt="profile user"
                  className={styles.profile_picture_size}
                />
              </Col>
              <Col sm={6}>
                <p>Nama User</p>
                <p className={styles.chat_text}>Isi chat</p>
              </Col>
              <Col sm={3}>
                <p>15:40</p>
                <div className={styles.notification_bubble_chat}>28</div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={3}>
                <img
                  src={ProfilePicture}
                  alt="profile user"
                  className={styles.profile_picture_size}
                />
              </Col>
              <Col sm={6}>
                <p>Nama User</p>
                <p className={styles.chat_text}>Isi chat</p>
              </Col>
              <Col sm={3}>
                <p>15:40</p>
                <div className={styles.notification_bubble_chat}>28</div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={3}>
                <img
                  src={ProfilePicture}
                  alt="profile user"
                  className={styles.profile_picture_size}
                />
              </Col>
              <Col sm={6}>
                <p>Nama User</p>
                <p>Isi chat</p>
              </Col>
              <Col sm={3}>
                <p>15:40</p>
                <div className={styles.notification_bubble_chat}>28</div>
              </Col>
            </Row>
          </Col>
          <Col lg={8} className="bg-light">
            {showMessage ? (
              <Message />
            ) : (
              <p className={`${styles.blank_text_chat} text-muted`}>
                Please select a chat to start messaging
              </p>
            )}

            {/* <Message /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChatHome;
