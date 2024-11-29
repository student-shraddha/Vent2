import React from "react";
import Checkout2Css from "../../../styles/Checkout2.module.css";
import { Container, Row } from "react-bootstrap";
import UnsuccessfulGif from "../../../../public/images/vector/unsuccessful.gif";
import Image from "next/image";

const Unsuccessful = () => {
  return (
    <>
      <Container className={Checkout2Css.grand}>
        <Row className={Checkout2Css.parentRow}>
          <div className={Checkout2Css.unsuccessfulgif}>
            <Image
              src={UnsuccessfulGif}
              alt="UnsuccessfulGif"
              width={142}
              height={142}
              className={Checkout2Css.gifChild}
            />
          </div>

          <h2 className={Checkout2Css.payment_unsuccessful}>
            Payment Unsuccessful
          </h2>

          <h5 className={Checkout2Css.payment_discription}>
            Your payment has been Unsuccessful
            <br />
            hence it has not send to the receiver bank
          </h5>
        </Row>
      </Container>
    </>
  );
};

export default Unsuccessful;
