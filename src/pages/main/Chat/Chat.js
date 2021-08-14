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
import { BsTrash, BsPencilSquare, BsLock } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import styles from "./ChatStyle.module.css";
import ProfilePicture from "../../../assets/img/default-profile-icon.jpg";
import Profile from "../../../components/profile/Profile";
import { connect } from "react-redux";
import {
  getAllUserProfile,
  getUserProfileId,
  updateUserProfileId,
  updateUserImageProfileId,
  deleteUserImageProfileId,
} from "../../../redux/action/user";
import { addFriendContact, getAllContact } from "../../../redux/action/contact";
import {
  getRoomChat,
  addRoomChat,
  getOneRoomChat,
} from "../../../redux/action/roomChat";
import { getAllChat, sendChat } from "../../../redux/action/chat";
require("dotenv").config();

function ChatHome(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [showImage, setShowImage] = useState(ProfilePicture);
  const [showProfile, setShowProfile] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [notification, setNotification] = useState({ show: false });
  const [userOnline, setUserOnline] = useState([]);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [connectedRooms, setConnectedRooms] = useState({
    room: "",
    oldRoom: "",
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState({ isTyping: false });
  const [form, setForm] = useState({
    userName: "",
    userPhoneNumber: "",
    userBio: "",
  });

  useEffect(() => {
    props.getRoomChat(props.auth.user_id);
    props.getAllContact(props.auth.user_id);
    props.getUserProfileId(props.auth.user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.socket) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket, messages]);

  const connect = () => {
    props.socket.emit("connect-server", { userId: props.auth.user_id });
    props.socket.on("list-user-online", (listUserOnline) => {
      setUserOnline(listUserOnline);
    });
    props.socket.on("chat-message", (dataMessage) => {
      setMessages([...messages, dataMessage]);
    });
    props.socket.on("notif-message", (data) => {
      setNotification(data);
    });
    props.socket.on("typing-message", (data) => {
      setTyping(data);
    });
  };

  const showChatMessage = ({ roomChat, userId }) => {
    props.getOneRoomChat(roomChat, userId);
    props.getAllChat(roomChat).then((res) => {
      setMessages(res.action.payload.data.data);
      setShowMessage(true);
    });
    props.socket.emit("join-room", {
      room: roomChat,
      oldRoom: connectedRooms.oldRoom,
    });
    setConnectedRooms({
      ...connectedRooms,
      room: roomChat,
      oldRoom: roomChat,
    });
    setShowProfile(false);
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
    props.socket.emit("typing-message", {
      room: connectedRooms.room,
      isTyping: true,
    });
  };

  const handleStopTyping = () => {
    setTimeout(() => {
      props.socket.emit("typing-message", {
        room: connectedRooms.room,
        isTyping: false,
      });
    }, 2000);
  };

  const changeInputText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendMessage = () => {
    if (message !== "") {
      const setData = {
        roomChat: connectedRooms.room,
        senderId: props.auth.user_id,
        username: props.auth.user_name,
        receiverId: props.oneRoomChat[0].friend_id,
        messageBody: message,
        show: true,
      };
      props.socket.emit("send-message", setData);
      props.socket.emit("notif-message", setData);
      props.socket.emit("typing-message", {
        room: connectedRooms.room,
        typing: false,
      });
      props.sendChat(setData).then((res) => {
        props.getAllChat(connectedRooms.room).then((res) => {
          setMessages(res.action.payload.data.data);
        });
      });
    }
    setMessage("");
  };

  const showUserProfile = () => {
    setShowProfile(true);
  };

  const hideUserProfile = () => {
    setShowProfile(false);
  };

  const showOwnProfile = () => {
    setShowMyProfile(true);
  };

  const hideOwnProfile = () => {
    setShowMyProfile(false);
  };

  const showEditOwnProfile = () => {
    setUpdateProfile(true);
  };

  const hideEditOwnProfile = () => {
    setUpdateProfile(false);
  };

  const handleUpdateProfile = () => {
    props
      .updateUserProfileId(props.auth.user_id, form)
      .then((res) => {
        setUpdateProfile(false);
        setForm(res.action.payload.data.data);
        props.getUserProfileId(props.auth.user_id);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err.response);
        setUpdateProfile(true);
      });
  };

  const handleUpdateImageProfile = (event) => {
    const formData = new FormData();
    formData.append("imageFile", event.target.files[0]);
    props
      .updateUserImageProfileId(props.auth.user_id, formData)
      .then((res) => {
        setShowImage(res.action.payload.data.data.user_image);
        props.getUserProfileId(props.auth.user_id);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err.response);
        setShowImage(false);
      });
  };

  const handleDeleteImageProfile = () => {
    props
      .deleteUserImageProfileId(props.auth.user_id)
      .then((res) => {
        setShowImage(ProfilePicture);
        props.getUserProfileId(props.auth.user_id);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    props.socket.emit("disconnect-server", { userId: props.auth.user_id });
    props.history.push("/login");
  };

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-center">
          {showMyProfile ? (
            <Col sm={3} className="bg-light">
              <Row>
                <Col xs={1}>
                  <p onClick={hideOwnProfile} style={{ cursor: "pointer" }}>
                    {"<"}
                  </p>
                </Col>
                <Col xs={10}>
                  <h5 className="text-center">{props.userById[0].user_name}</h5>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <div className={styles.image_upload}>
                    <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                      {showImage && props.userById[0].user_image.length > 0 ? (
                        <img
                          src={`http://localhost:3003/backend3/api/${props.userById[0].user_image}`}
                          className={`${styles.image_size_2} rounded-circle`}
                          alt="own profile user"
                        />
                      ) : (
                        <img
                          src={showImage}
                          className={`${styles.image_size_2} rounded-circle`}
                          alt="own profile user"
                        />
                      )}
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => handleUpdateImageProfile(event)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <p
                    className={styles.word_position_1}
                    onClick={showEditOwnProfile}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="text-primary">
                      <BsPencilSquare />
                    </i>
                  </p>
                </Col>
                <Col>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={handleDeleteImageProfile}
                  >
                    <i className="text-danger">
                      <BsTrash />
                    </i>
                  </p>
                </Col>
              </Row>

              <Row>
                {updateProfile ? (
                  <Col>
                    <b>Account</b>
                    <Form>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your phone number"
                          name="userPhoneNumber"
                          value={form.userPhoneNumber}
                          onChange={(event) => changeInputText(event)}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your username"
                          name="userName"
                          value={form.userName}
                          onChange={(event) => changeInputText(event)}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your bio"
                          name="userBio"
                          value={form.userBio}
                          onChange={(event) => changeInputText(event)}
                        />
                      </Form.Group>
                      <Form.Row className="mt-3 mb-3">
                        <Button variant="primary" onClick={handleUpdateProfile}>
                          Submit
                        </Button>
                        <Button
                          variant="primary"
                          className="ms-3"
                          onClick={hideEditOwnProfile}
                        >
                          Cancel
                        </Button>
                      </Form.Row>
                    </Form>
                  </Col>
                ) : (
                  <Col>
                    <b>Account</b>
                    <p>{props.userById[0].user_phone}</p>
                    <p className="text-muted">Phone Number</p>
                    <br />
                    <p>{props.userById[0].user_name}</p>
                    <p className="text-muted">Username</p>
                    <br />
                    <p>{props.userById[0].user_bio}</p>
                    <p className="text-muted">Bio</p>
                  </Col>
                )}
              </Row>
              <Row>
                <b>Settings</b>
                <p>
                  <i>
                    <BsLock />
                  </i>
                  {"  "}Change Password
                </p>
                <p onClick={handleLogout} style={{ cursor: "pointer" }}>
                  <i>
                    <BiLogOut />
                  </i>
                  {"  "}Logout
                </p>
              </Row>
            </Col>
          ) : (
            <Col sm={3} className="bg-light">
              <Row className="mt-3">
                <Col>
                  <h5 className={styles.logo_brand_color}>NgobrolMaya</h5>
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
                      <Dropdown.Item onClick={showOwnProfile} eventKey="1">
                        Edit Profile
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2">Invite Friends</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Telegram FAQ</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                        <FormControl
                          type="search"
                          placeholder="type a search"
                        />
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

              {/* ROOMCHAT */}

              {props.roomChat.map((item, index) => {
                return (
                  <Row
                    className={`${styles.chat_cursor} mt-5`}
                    onClick={() =>
                      showChatMessage({
                        roomChat: item.room_chat,
                        userId: props.auth.user_id,
                      })
                    }
                    key={index}
                  >
                    <Col sm={3}>
                      <img
                        src={
                          item.user_image.length > 0
                            ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}${item.user_image}`
                            : ProfilePicture
                        }
                        alt="profile user"
                        className={styles.profile_picture_size_1}
                      />
                    </Col>
                    <Col sm={6}>
                      <p>{item.user_name}</p>
                      <p className={styles.chat_text}>
                        {typing.isTyping && <p>Typing...</p>}
                      </p>
                    </Col>
                    <Col sm={3}>
                      <p>15:40</p>
                      {notification.messageBody ? (
                        <div className={styles.notification_bubble_chat}>
                          <p>new</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                );
              })}
            </Col>
          )}

          <Col lg={showProfile ? 6 : 9} className="bg-light">
            {showMessage ? (
              <div>
                <Row>
                  <Col>
                    <Row className={`${styles.chat_cursor} mt-3`}>
                      <Col xs={1}>
                        <img
                          src={
                            props.oneRoomChat[0].user_image.length > 0
                              ? `${process.env.REACT_APP_BACKEND_IMAGE_URL}${props.oneRoomChat[0].user_image}`
                              : ProfilePicture
                          }
                          alt="profile user"
                          className={styles.profile_picture_size_2}
                        />
                      </Col>
                      <Col
                        xs={3}
                        className={
                          showProfile
                            ? `${styles.user_text_position_2} mt-1`
                            : `${styles.user_text_position_1} mt-1`
                        }
                      >
                        <p
                          className={styles.user_text}
                          onClick={showUserProfile}
                        >
                          {props.oneRoomChat[0].user_name}
                        </p>
                        <p className={styles.user_text}>
                          {userOnline.includes(props.oneRoomChat[0].friend_id)
                            ? "Online"
                            : "Offline"}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {showProfile ? (
                  <Row className="mt-5 float-end">
                    {messages.map((item, index) => (
                      <Col
                        sm={6}
                        key={index}
                        className={
                          item.sender_id === props.auth.user_id ||
                          item.senderId === props.auth.user_id
                            ? styles.bubble_chat_sender
                            : styles.bubble_chat_1
                        }
                      >
                        <p>{item.message}</p>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Row className="mt-5">
                    {messages.map((item, index) => (
                      <Col
                        sm={6}
                        key={index}
                        className={
                          item.sender_id === props.auth.user_id ||
                          item.senderId === props.auth.user_id
                            ? styles.bubble_chat_sender
                            : styles.bubble_chat_2
                        }
                      >
                        <p>{item.message}</p>
                      </Col>
                    ))}
                  </Row>
                )}

                <Row className={styles.input_message_width}>
                  <Form className={styles.input_message_position}>
                    <Row className={styles.input_size}>
                      <Col lg={9} className={styles.input_message_width_2}>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Type your message here"
                            aria-label="Type your message here"
                            aria-describedby="basic-addon2"
                            name="message"
                            value={message}
                            onChange={(event) => {
                              handleChangeText(event);
                              handleStopTyping();
                            }}
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={handleSendMessage}
                          >
                            Send
                          </Button>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </div>
            ) : (
              <p className={`${styles.blank_text_chat} text-muted`}>
                Please select a chat to start messaging
              </p>
            )}
          </Col>
          <Col>
            {showProfile ? (
              <Profile
                hideUserProfile={hideUserProfile}
                oneRoomChat={props.oneRoomChat[0]}
              />
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
  auth: state.auth.data,
  allUser: state.user.dataAllUserProfile,
  userById: state.user.dataUserProfile,
  contact: state.contact.data,
  roomChat: state.roomChat.data,
  oneRoomChat: state.roomChat.dataOneChat,
  chatMessage: state.chatMessage.data,
});
const mapDispatchToProps = {
  getAllUserProfile,
  addFriendContact,
  getAllContact,
  getRoomChat,
  addRoomChat,
  getOneRoomChat,
  getAllChat,
  sendChat,
  getUserProfileId,
  updateUserProfileId,
  updateUserImageProfileId,
  deleteUserImageProfileId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);
