import { Col, Row } from "react-bootstrap";
import NextImage from "next/image";
import FeatureTickIcon from "../../../../../public/images/vector/feature_tick.svg";
import ViewPropertyCss from "../../../../styles/ViewProperty.module.css";
import React from "react";

const FeatureSection = (data) => {
  return (
    <>
      <Row>
        {data?.data?.amenities?.map((data, index) => {
          return (
            <Col key={index} md={4}>
              <div className={ViewPropertyCss.feature_section_div_container}>
                <div
                  className={
                    ViewPropertyCss.feature_section_tick_icon_container
                  }
                >
                  <NextImage
                    width={24}
                    height={24}
                    src={FeatureTickIcon}
                    alt="features"
                  ></NextImage>
                </div>

                <p className={ViewPropertyCss.feature_section_text}>{data}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default FeatureSection;
