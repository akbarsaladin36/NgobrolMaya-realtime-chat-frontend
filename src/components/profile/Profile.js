import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./ProfileStyle.module.css";
import ProfilePicture from "../../assets/img/default-profile-icon.jpg";

function Profile(props) {
  console.log(props);
  return (
    <div>
      <Row className="bg-light">
        <Row>
          <Col onClick={props.hideUserProfile} style={{ cursor: "pointer" }}>
            X
          </Col>
        </Row>
        <p className="mt-3 text-center">{props.oneRoomChat.user_name}</p>
        <Col className="bg-light mt-3 text-center">
          <img
            src={ProfilePicture}
            alt="profile user"
            className={styles.profile_picture_size}
          />
          <div className={`${styles.text_name_position} text-left mt-3 ml-2`}>
            <p>{props.oneRoomChat.user_name}</p>
            <p>{props.oneRoomChat.user_phone}</p>
          </div>
        </Col>
      </Row>
      <Row className="bg-light">
        <Col>
          <p>Location</p>
        </Col>
        <Col>
          <p>Image</p>
        </Col>
        <Col>
          <p>Documents</p>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
