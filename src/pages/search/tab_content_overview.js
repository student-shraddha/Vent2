import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";
import { Button, Input, Modal } from "antd";
const { TextArea } = Input;
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";


const TabContentOverview = (PropData) => {


  // HOST MODAL
  const [hostModalOpen, setHostModalOpen] = useState(false);

  const showHostModal = () => {
    // if (PropData?.data?.externalPropertyType) {
    // setHostModalOpen(true);
    // } else {
    //   <p>There is no data</p>
    // }
  };
  const handleHostOk = () => {
    setHostModalOpen(false);
  };
  const handleHostCancel = () => {
    setHostModalOpen(false);
  };


  return (
    <>
      <main className={ViewPropertyCss.tabOverviewSection}>
        <h3 className={ViewPropertyCss.tabOverviewPropHeading}>
          {PropData.data?.name ? PropData.data?.name : "N/A"}
        </h3>


        <div className={ViewPropertyCss.host_name_div}>
          <span className={ViewPropertyCss.owner_name}>Host: </span>
          <span
            className={ViewPropertyCss.owner_name_text}
            onClick={showHostModal}
          >
            {PropData?.data?.externalPropertyType === "Rental"
              ? `${PropData?.data?.ownerDetail?.firstName} ${PropData?.data?.ownerDetail?.surName}`
              : PropData?.data?.ownerDetail?.name}
          </span>

          <Modal
            open={hostModalOpen}
            onOk={handleHostOk}
            onCancel={handleHostCancel}
            centered
            footer={[
              <Button
                key="submit"
                className={ViewPropertyCss.modal_ok_button}
                onClick={handleHostOk}
              >
                OK
              </Button>,
            ]}
          >
            {PropData?.data?.externalPropertyType === "Rental" ? (
              <main className={ViewPropertyCss.modal_data_parent_div_host}>
                <div>
                  <Image
                    className={
                      ViewPropertyCss.modal_golf_course_banner_img_host
                    }
                    fill
                    alt="Golf Course"
                    src="/images/GolfhomCourseIndex.webp"
                  ></Image>
                </div>
                <div className={ViewPropertyCss.host_text_div}>
                  <h5 className={ViewPropertyCss.hostName}>
                    <span className={ViewPropertyCss.title_of_modal}>
                      Name:{" "}
                    </span>
                    <span className={ViewPropertyCss.owner_name_text}>
                      {PropData?.data?.ownerDetail?.firstName}{" "}
                      {PropData?.data?.ownerDetail?.surName}
                    </span>
                  </h5>
                  <h5 className={ViewPropertyCss.hostName}>
                    <span className={ViewPropertyCss.title_of_modal}>
                      Company Name:{" "}
                    </span>
                    <span className={ViewPropertyCss.owner_name_text}>
                      {PropData?.data?.ownerDetail?.companyName}
                    </span>
                  </h5>
                  <h5 className={ViewPropertyCss.hostName}>
                    <span className={ViewPropertyCss.title_of_modal}>
                      Email:{" "}
                    </span>
                    <Link
                      className={ViewPropertyCss.owner_name_text_host}
                      href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=someone@example.com"
                      target="_blank"
                    >
                      {PropData?.data?.ownerDetail?.email}
                    </Link>
                  </h5>
                  <h5 className={ViewPropertyCss.hostName}>
                    <span className={ViewPropertyCss.title_of_modal}>
                      Phone:{" "}
                    </span>
                    <span className={ViewPropertyCss.owner_name_text}>
                      {PropData?.data?.ownerDetail?.phone}
                    </span>
                  </h5>
                </div>
              </main>
            ) : (
              <main className={ViewPropertyCss.modal_data_parent_div_host}>
                <div>
                  <Image
                    className={
                      ViewPropertyCss.modal_golf_course_banner_img_host
                    }
                    fill
                    alt="Golf Course"
                    src="/images/GolfhomCourseIndex.webp"
                  ></Image>
                </div>
                <div className={ViewPropertyCss.host_text_div}>
                  <h5 className={ViewPropertyCss.hostName}>
                    <span className={ViewPropertyCss.title_of_modal}>
                      Name:{" "}
                    </span>
                    <span className={ViewPropertyCss.owner_name_text}>
                      {PropData?.data?.ownerDetail?.name
                        ? PropData?.data?.ownerDetail?.name
                        : "N/A"}
                    </span>
                  </h5>
                </div>
              </main>
            )}
          </Modal>
        </div>
        {/* PROP AMENITES DETAILS  */}
        <Row className={ViewPropertyCss.amenities_details_row}>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBedIcon}
                  height={24}
                  width={24}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="amenities"
                ></Image>
              </div>

              {PropData.data?.accomodation ? (
                <div className={ViewPropertyCss.heading_para}>
                  <h5
                    className={ViewPropertyCss.amenities_details_main_heading}
                  >
                    Accommodation
                  </h5>
                  <p
                    className={
                      ViewPropertyCss.amenities_details_main_subheading
                    }
                  >
                    {PropData.data?.accomodation
                      ? PropData.data?.accomodation
                      : "N/A"}{" "}
                    Guests
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>

          {PropData.data?.beds || PropData.data?.bedrooms ? (
            <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
              <div className={ViewPropertyCss.amenities_details_container}>
                <div
                  className={ViewPropertyCss.amenities_details_img_container}
                >
                  <Image
                    src={ViewPropBedIcon}
                    height={24}
                    width={24}
                    className={ViewPropertyCss.amenities_imgs}
                    alt="amenities"
                  ></Image>
                </div>

                <div className={ViewPropertyCss.heading_para}>
                  <h5
                    className={ViewPropertyCss.amenities_details_main_heading}
                  >
                    Bedrooms
                  </h5>
                  <p
                    className={
                      ViewPropertyCss.amenities_details_main_subheading
                    }
                  >
                    {PropData.data?.bedrooms
                      ? `Bedrooms  ${PropData.data?.bedrooms}`
                      : ""}
                    {PropData.data?.beds ? `/${PropData.data?.beds} Beds` : ""}
                  </p>
                </div>
              </div>
            </Col>
          ) : (
            ""
          )}

          {PropData.data?.bathrooms ? (
            <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
              <div className={ViewPropertyCss.amenities_details_container}>
                <div
                  className={ViewPropertyCss.amenities_details_img_container}
                >
                  <Image
                    src={ViewPropBathroomIcon}
                    height={24}
                    width={24}
                    className={ViewPropertyCss.amenities_imgs}
                    alt="amenities"
                  ></Image>
                </div>

                <div className={ViewPropertyCss.heading_para}>
                  <h5
                    className={ViewPropertyCss.amenities_details_main_heading}
                  >
                    Bathrooms
                  </h5>
                  <p
                    className={
                      ViewPropertyCss.amenities_details_main_subheading
                    }
                  >
                    {PropData.data?.bathrooms ? PropData.data?.bathrooms : "1"}{" "}
                    Full
                  </p>
                </div>
              </div>
            </Col>
          ) : (
            ""
          )}
        </Row>

        {PropData.data?.description ? (
          <Row className={ViewPropertyCss.about_section_row}>
            <Col className={ViewPropertyCss.about_section_cols}>
              <div className={ViewPropertyCss.about_section_container}>
                <h4 className={ViewPropertyCss.about_section_main_heading}>
                  Description
                </h4>
                <TextArea
                  value={
                    PropData.data?.description?.replace(/\*|BR|BA|#|/g, "")
                      ? PropData.data?.description
                      : "N/A"
                  }
                  placeholder="Controlled autosize"
                  className={ViewPropertyCss.about_section_para}
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                  readOnly
                />
              </div>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {/* ABOUT SECTION START HERE */}

        {/* Rest of the code */}
      </main>
    </>
  );
};

export default TabContentOverview;
