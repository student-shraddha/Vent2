import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import IncomeCss from "../../styles/dashboard/Income.module.css";
import Link from "next/link";
import ProtectedRoute from "../../../common components/protected_route";
import dynamic from "next/dynamic";
import React from "react";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Income = () => {
  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Ventify | Income</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <Container>
            <h3 className={IncomeCss.income_page_heading}>Income</h3>

            <div>
              <Row>
                <Col md={4} className={IncomeCss.income_page_cards_cols}>
                  <div className={IncomeCss.income_page_cards_container}>
                    <div className={IncomeCss.income_page_cards_text_container}>
                      <h4 className={IncomeCss.income_page_cards_heading}>
                        From $0
                      </h4>
                      <p className={IncomeCss.income_page_cards_subheading}>
                        Total Earnings
                      </p>
                      <p>
                        Excluding the service fee, the host fee and the security
                        deposit
                      </p>
                    </div>

                    <div>
                      <Link href="/">
                        <Button
                          className={IncomeCss.income_page_cards_btn}
                          type="primary"
                        >
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={4} className={IncomeCss.income_page_cards_cols}>
                  <div className={IncomeCss.income_page_cards_container}>
                    <div className={IncomeCss.income_page_cards_text_container}>
                      <h4 className={IncomeCss.income_page_cards_heading}>
                        From $0
                      </h4>
                      <p className={IncomeCss.income_page_cards_subheading}>
                        Available Balance
                      </p>
                      <p>
                        Gofhom.com will normally remit rental income to the host
                        as directed approximately 2 business days after the
                        agreed upon check-in date (if no complaints have been
                        registered).
                      </p>
                    </div>

                    <div>
                      <Link href="/">
                        <Button
                          className={IncomeCss.income_page_cards_btn}
                          type="primary"
                        >
                          Read FAQ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={4} className={IncomeCss.income_page_cards_cols}>
                  <div className={IncomeCss.income_page_cards_container}>
                    <div className={IncomeCss.income_page_cards_text_container}>
                      <h4 className={IncomeCss.income_page_cards_heading}>
                        From $0
                      </h4>
                      <p className={IncomeCss.income_page_cards_subheading}>
                        Total reservations
                      </p>
                      <p>
                        Represents the total number of paid reservations you
                        have received
                      </p>
                    </div>

                    <div>
                      <Link href="/">
                        <Button
                          className={IncomeCss.income_page_cards_btn}
                          type="primary"
                        >
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className={IncomeCss.income_page_payout_section}>
              <div className={IncomeCss.income_page_payout_rows}>
                <div className={IncomeCss.income_page_payout_cols}>
                  <div
                    className={IncomeCss.income_page_payout_heading_container}
                  >
                    <h4 className={IncomeCss.income_page_payout_heading}>
                      Earnings
                    </h4>
                  </div>
                  <hr className={IncomeCss.income_page_payout_hr} />
                  <div
                    className={
                      IncomeCss.income_page_payout_subheading_container
                    }
                  >
                    <p className={IncomeCss.income_page_payout_subheading}>
                      At the moment there are no earnings.
                    </p>
                  </div>
                </div>
              </div>

              <div className={IncomeCss.income_page_payout_rows}>
                <div className={IncomeCss.income_page_payout_cols}>
                  <div
                    className={IncomeCss.income_page_payout_heading_container}
                  >
                    <h4 className={IncomeCss.income_page_payout_heading}>
                      Payouts
                    </h4>

                    <p className={IncomeCss.income_page_payout_method}>
                      Setup Payout Method
                    </p>
                  </div>
                  <hr className={IncomeCss.income_page_payout_hr} />
                  <div
                    className={
                      IncomeCss.income_page_payout_subheading_container
                    }
                  >
                    <p className={IncomeCss.income_page_payout_subheading}>
                      At the moment there are no earnings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/*  ---------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}
        <BottomSection />
      </ProtectedRoute>
    </>
  );
};

export default Income;