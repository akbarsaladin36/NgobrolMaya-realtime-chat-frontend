import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { VscListSelection } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";
// import { Link } from "react-router-dom";
import styles from "./ChatStyle.module.css";
import ProfilePicture from "../../../assets/img/default-profile-icon.jpg";
import Message from "../../../components/message/Message";
import Profile from "../../../components/profile/Profile";
import { connect } from "react-redux";
import { getAllUserProfile } from "../../../redux/action/user";
import { addFriendContact, getAllContact } from "../../../redux/action/contact";
import { getRoomChat, addRoomChat } from "../../../redux/action/roomChat";
import { withRouter } from "react-router-dom";

function ChatHome(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [oldRoomId, setOldRoomId] = useState("");

  console.log(props);

  useEffect(() => {
    props.getRoomChat(props.userId);
  }, []);

  const showChatMessage = (roomId, senderId, receiverId) => {
    props.history.push(
      `/room-chat/${roomId}?sender=${senderId}&receiver=${receiverId}&oldRoom=${oldRoomId}`
    );
    setOldRoomId(roomId);
    setShowMessage(true);
    setShowProfile(false);
  };

  const showUserProfile = () => {
    setShowProfile(true);
  };

  const hideUserProfile = () => {
    setShowProfile(false);
  };

  const handleLogout = (event) => {
    localStorage.clear("token");
    props.history.push("/login");
  };

  // console.log(props);

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
                <Dropdown
                  className={`${styles.list_icon_dropdown} ${styles.list_icon}`}
                >
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-menu-align-right"
                  >
                    <i>
                      <VscListSelection />
                    </i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Edit Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Invite Friends</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Telegram FAQ</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} eventKey="1">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <i className={styles.list_icon}></i> */}
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

            {props.roomChat.map((item, index) => {
              return (
                <Row
                  className={`${styles.chat_cursor} mt-5`}
                  onClick={showChatMessage}
                  key={index}
                >
                  <Col sm={3}>
                    <img
                      src={ProfilePicture}
                      alt="profile user"
                      className={styles.profile_picture_size}
                    />
                  </Col>
                  <Col sm={6}>
                    <p>{item.friendDetail.user_name}</p>
                    <p className={styles.chat_text}>isi Chat</p>
                  </Col>
                  <Col sm={3}>
                    <p>15:40</p>
                    <div className={styles.notification_bubble_chat}>28</div>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col lg={6} className="bg-light">
            {showMessage ? (
              <Message showUserProfile={showUserProfile} />
            ) : (
              <p className={`${styles.blank_text_chat} text-muted`}>
                Please select a chat to start messaging
              </p>
            )}
          </Col>
          <Col>
            {showProfile ? (
              <Profile hideUserProfile={hideUserProfile} />
            ) : (
              <div className={styles.now_show_profile}></div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.data.user_id,
  allUser: state.user.dataAllUserProfile,
  contact: state.contact.data,
  roomChat: state.roomChat.data,
});
const mapDispatchToProps = {
  getAllUserProfile,
  addFriendContact,
  getAllContact,
  getRoomChat,
  addRoomChat,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatHome)
);
