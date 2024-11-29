import React, { useEffect, useState } from "react";
import ViewPropertyCss from "../../../../styles/ViewProperty.module.css";
import { Col, Row } from "react-bootstrap";
import NextImage from "next/image";
import PriceSquareIcon from "../../../../../public/images/vector/price_square_icon.svg";
import RulesCrossIcon from "../../../../../public/images/vector/rules_cross_icon.svg";
import FeatureTickIcon from "../../../../../public/images/vector/feature_tick.svg";
import Blacktick from "../../../../../public/images/vector/blackTick.svg";
import dayjs from "dayjs";

const ThingsToKnow = (data) => {
  return (
    <>
      <div>
        <h5 className={ViewPropertyCss.feature_section_heading}>
          Things to know
        </h5>
        {/* PRICE SECTION */}
        <Row className={ViewPropertyCss.things_to_know_section_rows}>
          <Col md={8}>
            <div
              className={ViewPropertyCss.things_to_know_main_content_container}
            >
              <Row>
                <h5 className={ViewPropertyCss.things_to_know_section_heading}>
                  Prices
                </h5>

                {data?.data?.price ? (
                  <Col
                    className={ViewPropertyCss.things_to_know_section_cols}
                    md={6}
                  >
                    <div
                      className={ViewPropertyCss.things_to_know_price_container}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_icon_container
                        }
                      >
                        <NextImage
                          className={ViewPropertyCss.things_to_know_price_icon}
                          src={PriceSquareIcon}
                          width={15}
                          height={15}
                          alt="Prices"
                        ></NextImage>
                      </div>
                      <p className={ViewPropertyCss.things_to_know_price_text}>
                        Nights: From{" "}
                        <span
                          className={ViewPropertyCss.things_to_know_info_span}
                        >
                          $
                          {data?.data?.price >= 0.5
                            ? Math.ceil(data?.data?.price)
                            : Math.floor(data?.data?.price)}
                        </span>
                      </p>
                    </div>
                  </Col>
                ) : (
                  ""
                )}

                {data?.data?.additionalGuest ? (
                  <Col
                    className={ViewPropertyCss.things_to_know_section_cols}
                    md={6}
                  >
                    <div
                      className={ViewPropertyCss.things_to_know_price_container}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_icon_container
                        }
                      >
                        <NextImage
                          className={ViewPropertyCss.things_to_know_price_icon}
                          src={PriceSquareIcon}
                          width={15}
                          height={15}
                          alt="Prices"
                        ></NextImage>
                      </div>

                      <p className={ViewPropertyCss.things_to_know_price_text}>
                        Allow Additional Guests:{" "}
                        <span
                          className={ViewPropertyCss.things_to_know_info_span}
                        >
                          Yes
                        </span>
                      </p>
                    </div>
                  </Col>
                ) : (
                  ""
                )}

                {data?.data?.minNightsOfBooking ? (
                  <Col
                    className={ViewPropertyCss.things_to_know_section_cols}
                    md={6}
                  >
                    <div
                      className={ViewPropertyCss.things_to_know_price_container}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_icon_container
                        }
                      >
                        <NextImage
                          className={ViewPropertyCss.things_to_know_price_icon}
                          src={PriceSquareIcon}
                          width={15}
                          height={15}
                          alt="Prices"
                        ></NextImage>
                      </div>

                      <p className={ViewPropertyCss.things_to_know_price_text}>
                        Minimum Nights Of A Booking:{" "}
                        <span
                          className={ViewPropertyCss.things_to_know_info_span}
                        >
                          {data?.data?.minNightsOfBooking}
                        </span>
                      </p>
                    </div>
                  </Col>
                ) : (
                  ""
                )}

                {data?.data?.maxNightsOfBooking ? (
                  <Col
                    className={ViewPropertyCss.things_to_know_section_cols}
                    md={6}
                  >
                    <div
                      className={ViewPropertyCss.things_to_know_price_container}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_icon_container
                        }
                      >
                        <NextImage
                          className={ViewPropertyCss.things_to_know_price_icon}
                          src={PriceSquareIcon}
                          width={15}
                          height={15}
                          alt="Prices"
                        ></NextImage>
                      </div>

                      <p className={ViewPropertyCss.things_to_know_price_text}>
                        Maximum Nights Of A Booking:{" "}
                        <span
                          className={ViewPropertyCss.things_to_know_info_span}
                        >
                          {data?.data?.maxNightsOfBooking
                            ? data?.data?.maxNightsOfBooking
                            : 1}
                        </span>
                      </p>
                    </div>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </div>

            <div>
              {/* TERMS SECTION */}
              {/* <div className={ViewPropertyCss.things_to_know_section_rows}>
                <Col md={8}>
                  <div
                    className={
                      ViewPropertyCss.things_to_know_main_content_container
                    }
                  >
                    <Row>
                      <h5
                        className={
                          ViewPropertyCss.things_to_know_section_heading
                        }
                      >
                        Terms & rules
                      </h5>
                      <Col
                        className={ViewPropertyCss.things_to_know_section_cols}
                        md={6}
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_container
                          }
                        >
                          <div
                            className={
                              ViewPropertyCss.things_to_know_price_icon_container
                            }
                          >
                            <NextImage
                              className={
                                ViewPropertyCss.things_to_know_price_icon
                              }
                              src={RulesCrossIcon}
                              width={15}
                              height={15}
                              alt="Prices"
                            ></NextImage>
                          </div>

                          <p
                            className={
                              ViewPropertyCss.things_to_know_price_text
                            }
                          >
                            Smoking allowed
                          </p>
                        </div>
                      </Col>
                      <Col
                        className={ViewPropertyCss.things_to_know_section_cols}
                        md={6}
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_container
                          }
                        >
                          <div
                            className={
                              ViewPropertyCss.things_to_know_price_icon_container
                            }
                          >
                            <NextImage
                              className={
                                ViewPropertyCss.things_to_know_price_icon
                              }
                              src={RulesCrossIcon}
                              width={15}
                              height={15}
                              alt="Prices"
                            ></NextImage>
                          </div>

                          <p
                            className={
                              ViewPropertyCss.things_to_know_price_text
                            }
                          >
                            Pets allowed
                          </p>
                        </div>
                      </Col>
                      <Col
                        className={ViewPropertyCss.things_to_know_section_cols}
                        md={6}
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_container
                          }
                        >
                          <div
                            className={
                              ViewPropertyCss.things_to_know_price_icon_container
                            }
                          >
                            <NextImage
                              className={
                                ViewPropertyCss.things_to_know_price_icon
                              }
                              src={RulesCrossIcon}
                              width={15}
                              height={15}
                              alt="Prices"
                            ></NextImage>
                          </div>

                          <p
                            className={
                              ViewPropertyCss.things_to_know_price_text
                            }
                          >
                            Children allowed
                          </p>
                        </div>
                      </Col>
                      <Col
                        className={ViewPropertyCss.things_to_know_section_cols}
                        md={6}
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_container
                          }
                        >
                          <div
                            className={
                              ViewPropertyCss.things_to_know_price_icon_container
                            }
                          >
                            <NextImage
                              className={
                                ViewPropertyCss.things_to_know_price_icon
                              }
                              src={FeatureTickIcon}
                              width={24}
                              height={24}
                              alt="Prices"
                            ></NextImage>
                          </div>

                          <p
                            className={
                              ViewPropertyCss.things_to_know_price_text
                            }
                          >
                            Event allowed
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </div> */}

              {/* Cancellation  SECTION */}
              {data?.data?.cancellationPolicy ? (
                <div className={ViewPropertyCss.things_to_know_section_rows}>
                  <Col md={8}>
                    <div
                      className={
                        ViewPropertyCss.things_to_know_main_content_container
                      }
                    >
                      <Row>
                        <h5
                          className={
                            ViewPropertyCss.things_to_know_section_heading
                          }
                        >
                          Cancellation Policy
                        </h5>
                        <p
                          className={
                            ViewPropertyCss.things_to_know_privacy_text
                          }
                        >
                          {data?.data?.cancellationPolicy
                            ? data?.data?.cancellationPolicy
                            : "N/A"}
                        </p>
                      </Row>
                    </div>
                  </Col>
                </div>
              ) : (
                ""
              )}

              {/* Additional rules information  SECTION */}
              {data?.data?.additionalRulesInformation ? (
                <div className={ViewPropertyCss.things_to_know_section_rows}>
                  <Col md={8}>
                    <div
                      className={
                        ViewPropertyCss.things_to_know_main_content_container
                      }
                    >
                      <Row>
                        <h5
                          className={
                            ViewPropertyCss.things_to_know_section_heading
                          }
                        >
                          Additional rules information
                        </h5>
                        <p
                          className={
                            ViewPropertyCss.things_to_know_privacy_text
                          }
                        >
                          {data?.data?.additionalRulesInformation
                            ? data?.data?.additionalRulesInformation
                            : "N/A"}
                        </p>
                      </Row>
                    </div>
                  </Col>
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>

          <Col md={4} className={ViewPropertyCss.detailParent}>
            <div>
              <div className={ViewPropertyCss.details}>Details</div>

              {data?.data?.id ? (
                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>ID: {data?.data?.id}</p>
                </div>
              ) : (
                ""
              )}
            </div>

            {data?.data?.rooms ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Rooms: {data?.data?.rooms ? data?.data?.rooms : 1}
                </p>
              </div>
            ) : (
              ""
            )}

            {data?.data?.accomodation ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Guests:{" "}
                  {data?.data?.accomodation ? data?.data?.accomodation : 1}
                </p>
              </div>
            ) : (
              ""
            )}

            {data?.data?.checkIn ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Check-in After:{" "}
                  {dayjs(data?.data?.checkIn, "HH:mm").format("h:mm A")}{" "}
                </p>
              </div>
            ) : (
              ""
            )}

            {data?.data?.checkOut ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Check-out Before:{" "}
                  {dayjs(data?.data?.checkOut, "HH:mm").format("h:mm A")}
                </p>
              </div>
            ) : (
              ""
            )}

            {data?.data?.bedrooms ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Bedrooms: {data?.data?.bedrooms ? data?.data?.bedrooms : 1}
                </p>
              </div>
            ) : (
              ""
            )}

            {data?.data?.beds ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Beds: {data?.data?.beds ? data?.data?.beds : 1}
                </p>
              </div>
            ) : (
              ""
            )}

            {/* <div className={ViewPropertyCss.tickParent}>
              <div className={ViewPropertyCss.tick_with_blackbg_container}>
                <NextImage
                  className={ViewPropertyCss.tick_with_blackbg}
                  src={Blacktick}
                  width={24}
                  height={24}
                  alt="Prices"
                ></NextImage>
              </div>
              <p className={ViewPropertyCss.words}>
                Payment Methods:{" "}
                {data?.data?.paymentMethods
                  ? data?.data?.paymentMethods
                  : "Card"}
              </p>
            </div> */}

            {data?.data?.bathrooms ? (
              <div className={ViewPropertyCss.tickParent}>
                <div className={ViewPropertyCss.tick_with_blackbg_container}>
                  <NextImage
                    className={ViewPropertyCss.tick_with_blackbg}
                    src={Blacktick}
                    width={24}
                    height={24}
                    alt="Prices"
                  ></NextImage>
                </div>
                <p className={ViewPropertyCss.words}>
                  Bathrooms: {data?.data?.bathrooms ? data?.data?.bathrooms : 1}
                </p>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ThingsToKnow;
