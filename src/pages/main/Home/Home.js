import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home_background}>
      <Navbar />
      <Container className={styles.home_background}>
        <Row className="mt-5">
          <Col>
            <img
              src="/home-screenshot.jpg"
              className={styles.home_screenshot_size}
              alt="home screenshoot"
            />
          </Col>
          <Col>
            <h1 className={styles.home_big_brand_1}>NgobrolMaya</h1>
            <p className={`${styles.home_text_position} mt-5`}>
              NgobrolMaya is the realtime chat app that used to connect with
              other people. NgobrolMaya will make you get a friend from another
              country with just adding a friend to your contact and start
              chatting with them.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
