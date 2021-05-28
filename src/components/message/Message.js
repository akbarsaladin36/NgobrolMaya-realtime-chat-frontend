import React from "react";
import { Row, Col } from "react-bootstrap";
import ProfilePicture from "../../assets/img/default-profile-icon.jpg";
import styles from "./MessageStyle.module.css";

function Message() {
  return (
    <div>
      <Row>
        <Col>
          <Row className="mt-3">
            <Col xs={1}>
              <img
                src={ProfilePicture}
                alt="profile user"
                className={styles.profile_picture_size}
              />
            </Col>
            <Col xs={2} className="mt-1">
              <p className={styles.user_text}>Nama User</p>
              <p className={styles.user_text}>Status profil</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5 bg-dark">
        <Col sm={2}>Gambar</Col>
        <Col sm={3}>Isi teks</Col>
      </Row>
    </div>
  );
}

export default Message;
