import AddListing03Css from "../src/styles/dashboard/AddListing03.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input, Form, Checkbox, Select } from "antd";
import React from "react";

const Addlisting03 = ({ onContinue, onBack, initialValues }) => {

  const [form] = Form.useForm();

  const amenities_arr = ['3 BHK Duplex', 'Temple', 'Visitor Parking', 'Reserved Parking', 'Fire Fighting Equipment', 'Security Personnel', 'Rain Water Harvesting', 'Lift', 'Landscaped Garden', 'Covered Car Parking', 'CCTV Cameras', '24Hrs Backup Electricity', 'Green spaces', 'Community garden spaces', 'Wifi', 'Swimming Pool', 'Common areas', 'Picnic tables', 'Package lockers', 'Renovated spaces', 'Washers and dryers', 'Balconies', 'Pet-friendly spaces', 'Clubhouse', 'Security', 'Elevators', 'Parking', 'Open floor plans', 'Fitness facilities', 'Kids play areas'];

  const amenities_options = []
  amenities_arr.map((i, inx) => {
    amenities_options.push({
      label: i,
      value: i,
    });
  })


  return (
    <>
      {/*     -------------------------     TEXT AREA      ----------------------------    */}
      <Container>
        <Form
          form={form}
          onFinish={onContinue}
        >
          <Col md={10}>
            <h3 className={AddListing03Css.addListing}>Add Listing</h3>

            <h4 className={AddListing03Css.info}>Features</h4>

            <hr />
          </Col>


          <Row>
            <h4 className={AddListing03Css.info}>Amenities</h4>

            <Col md={12}>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="amenities"
                tooltip="Select a amenities"
                rules={[
                  {
                    required: true,
                    message: "Please select amenities!",
                    // whitespace: true,

                  },
                ]}
              >
                <Select
                  placeholder="Select a property type"
                  mode="multiple"
                  style={{
                    width: '100%',
                  }}
                  options={amenities_options}
                  defaultValue={initialValues?.amenities}
                  // trigger={["click"]}
                  size="large"
                >
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row>
            {/* <h4 className={AddListing03Css.info}>Facilities</h4>
          <Col md={4}>{back}</Col>
          <Col md={4}>{center}</Col>
          <Col md={4}>{centeral}</Col> */}

            <Col md={10}>
              {/* <div className={AddListing03Css.twobtn}>
              <Button className={AddListing03Css.savebtn}>Back</Button>
              <Button className={AddListing03Css.savebtn}>
                Save as Draft
              </Button>
            </div> */}

              <div className={AddListing03Css.twobtn}>
                <Button className={AddListing03Css.savebtn} onClick={onBack}>Back</Button>
                <Button className={AddListing03Css.addbtn} htmlType="submit_signup"> Continue</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container >
    </>
  );
};

export default Addlisting03;