/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Head from "next/head";
import { Container, Col, Row, Button } from "react-bootstrap";
import Image from "next/image";
import FAQCss from "../styles/FAQ.module.css";
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const FAQ = () => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showE, setShowE] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showG, setShowG] = useState(false);
  const [showH, setShowH] = useState(false);
  const [showI, setShowI] = useState(false);
  const [showJ, setShowJ] = useState(false);
  const [showK, setShowK] = useState(false);
  const [showL, setShowL] = useState(false);

  const toggleButtonA = () => {
    setShowA(!showA);
  };

  const toggleButtonB = () => {
    setShowB(!showB);
  };

  const toggleButtonC = () => {
    setShowC(!showC);
  };

  const toggleButtonD = () => {
    setShowD(!showD);
  };

  const toggleButtonE = () => {
    setShowE(!showE);
  };

  const toggleButtonF = () => {
    setShowF(!showF);
  };

  const toggleButtonG = () => {
    setShowG(!showG);
  };

  const toggleButtonH = () => {
    setShowH(!showH);
  };

  const toggleButtonI = () => {
    setShowI(!showI);
  };

  const toggleButtonJ = () => {
    setShowJ(!showJ);
  };

  const toggleButtonK = () => {
    setShowK(!showK);
  };
  const toggleButtonL = () => {
    setShowL(!showL);
  };

  return (
    <>
      <Head>
        <title>Ventify FAQ's: Answers to Your Booking Questions</title>
        <meta
          name="description"
          content={`Get answers to frequently asked questions about booking, property amenities, cancellations, and more at Ventify. Our team is here to help you make the most of your golf vacation experience.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {/* BANNER IMAGE FAQ */}
        <div>
          <Image
            fill
            className={FAQCss.banner_img}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/faq_banner_img.jpg`}
            alt="faq banner image"
          ></Image>
        </div>
        <div className={FAQCss.below_banner_main_section}>
          <Container>
            <Row className={FAQCss.faqRow}>
              <Col md={6}>
                <h3 className={FAQCss.textTitle}>Frequently Asked Questions</h3>
                <p className={FAQCss.paragraph}>
                  Our team has provided answers below to some frequently asked questions. Please feel free to
                  reach out if further information is needed. Thanks for booking with {process.env.NEXT_PUBLIC_APP_NAME}!

                </p>
              </Col>

              <Col md={6}>
                {/* BOOKING FAQ QUESTIONS */}

                <div>

                  <div>
                    <h3 className={FAQCss.heading_question}>
                      Booking Questions
                    </h3>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        How do I contact the host regarding my event specifics (ie: parking, catering, DJ)

                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonK}>
                        {showK ? "-" : "+"}
                      </Button>
                    </div>
                    {showK && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          Our platform is set up to give you direct communication with the host via the “Contact Host”
                          button that you will find on the property’s profile page.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        Should I obtain event insurance?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonL}>
                        {showL ? "-" : "+"}
                      </Button>
                    </div>
                    {showL && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          Many of our hosts will already carry property and event insurance but we do recommend you
                          get your own single event policy. Please refer to the property listing for any specific insurance
                          requirements.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />
                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        How do I get more info about the property's amenities?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonA}>
                        {showA ? "-" : "+"}
                      </Button>
                    </div>
                    {showA && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          You can find information on a property’s amenities on
                          the home’s profile page. Reach out to the host for
                          more specific information.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        I can't find my rental confirmation email. What Should I do?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonB}>
                        {showB ? "-" : "+"}
                      </Button>
                    </div>
                    {showB && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          Please be sure to check your email inbox and spam folders. If you still can’t find your
                          confirmation, refer to your {process.env.NEXT_PUBLIC_APP_NAME} admin area or feel free to reach out to our help team.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        I'll be arriving outside check-in hours. Can I still
                        check in?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonC}>
                        {showC ? "-" : "+"}
                      </Button>
                    </div>
                    {showC && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          This depends on the individual host, who will do their
                          best to meet your needs. We recommend dealing with
                          arrival time issues as early in the process as
                          possible.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        I'd like to check out after the stated check-out time, is that possible?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonD}>
                        {showD ? "-" : "+"}
                      </Button>
                    </div>
                    {showD && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          A late check-out can only be arranged with the host and is not guaranteed. Reach out to see
                          what can be arranged and keep in mind that availability and proper cleaning time have to be
                          accounted for.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        How Do I find out if my desired property allows pets?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonE}>
                        {showE ? "-" : "+"}
                      </Button>
                    </div>
                    {showE && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          Pet policies should be clearly stated on the home’s profile page. Reach out to the Host for any
                          needed clarification or to see if a variance can be made.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        What payment methods are accepted by {process.env.NEXT_PUBLIC_APP_NAME}?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonF}>
                        {showF ? "-" : "+"}
                      </Button>
                    </div>
                    {showF && (
                      <div>
                        <p className={FAQCss.paragraph}>

                          Major credit and debit cards are acceptable payment methods for properties listed on {process.env.NEXT_PUBLIC_APP_NAME}.com. You will have your choice of payment methods at the time of booking.
                        </p>
                      </div>
                    )}
                  </div>
                  <hr />
                </div>

                {/* CANCELATION SECTION */}
                <div className={FAQCss.heading_question_main_div}>
                  <div>
                    <h3 className={FAQCss.heading_question}>
                      Cancellation Questions
                    </h3>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        Can I cancel a current reservation?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonG}>
                        {showG ? "-" : "+"}
                      </Button>
                    </div>
                    {showG && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          Yes, cancellations happen. Any cancellation fees are
                          determined by the property’s stated cancellation
                          policy, which you can find on the home’s profile page
                          and in your reservation.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        How do I know if my reservation was properly canceled?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonH}>
                        {showH ? "-" : "+"}
                      </Button>
                    </div>
                    {showH && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          After you cancel a booking, you should get an email
                          confirming said cancellation. Make sure to check your
                          inbox and spam/junk mail folders. If you don’t receive
                          an email within 24 hours, feel free to reach out to
                          our help team.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        Where can I find my chosen property's cancellation
                        policy?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonI}>
                        {showI ? "-" : "+"}
                      </Button>
                    </div>
                    {showI && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          This information is available in your booking
                          confirmation, as well as on the property’s {process.env.NEXT_PUBLIC_APP_NAME}
                          profile page.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        What is the current policy for cancellations relative to
                        coronavirus?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonJ}>
                        {showJ ? "-" : "+"}
                      </Button>
                    </div>
                    {showJ && (
                      <div>
                        <p className={FAQCss.paragraph}>
                          The up-to-date cancellation policy was viewable on the
                          property’s profile page when you made the booking on
                          our platform, and can also be viewed in your
                          reservation. Please reach out to the host to see if
                          arrangements can be made under special circumstances.
                        </p>
                      </div>
                    )}
                  </div>
                  <hr />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </div>
    </>
  );
};

export default FAQ;
