import AddListing04Css from "../src/styles/dashboard/AddListing04.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input, Form } from "antd";
import React from "react";

const AddListing04 = ({ onContinue, onBack, initialValues }) => {

  const [form] = Form.useForm();
  form.setFieldsValue({
    address: initialValues.address,
  });
  return (
    <>
      {/*     -------------------------     TEXT AREA      ----------------------------    */}
      <Container>
        <Form
          form={form}
          onFinish={onContinue}
        >
          <Row>
            <Col md={10}>
              <h3 className={AddListing04Css.addListing}>Add Listing</h3>

              <h4 className={AddListing04Css.info}>Location</h4>

              <hr />
            </Col>
          </Row>

          <Row>
            <Col md={10}>
              <Row>
                <Col md={6}>
                  <h5 className={AddListing04Css.title}>Address*</h5>

                  <Form.Item
                    // className={RegisterToHost.form_items}
                    name="address"
                    tooltip="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter address",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="1170 SE 12th Terrace, Miami, FL 33132, USA"
                      className={AddListing04Css.listing}
                    />
                  </Form.Item>
                </Col>

                {/* <Col md={6}>
                <h5 className={AddListing04Css.title}>City</h5>

                <Input
                  type="text"
                  placeholder="Miami"
                  className={AddListing04Css.listing}
                />
              </Col> */}
              </Row>

              {/* <Row>
              <Col md={6}>
                <h5 className={AddListing04Css.title}>State</h5>

                <Input
                  type="text"
                  placeholder="Florida"
                  className={AddListing04Css.listing}
                />
              </Col>

              <Col md={6}>
                <h5 className={AddListing04Css.title}>Zip Code</h5>

                <Input
                  type="text"
                  placeholder="33132"
                  className={AddListing04Css.listing}
                />
              </Col>
            </Row> */}

              {/* <Row>
              <Col md={6}>
                <h5 className={AddListing04Css.title}>Country</h5>

                <Input
                  type="text"
                  placeholder="United States"
                  className={AddListing04Css.listing}
                />
              </Col>
            </Row> */}

              {/* <div className={AddListing04Css.twobtn}>
              <Button className={AddListing04Css.savebtn}>Back</Button>
              <Button className={AddListing04Css.savebtn}>
                Save as Draft
              </Button>
            </div> */}

              <div className={AddListing04Css.twobtn}>
                <Button className={AddListing04Css.savebtn} onClick={onBack}>Back</Button>
                <Button className={AddListing04Css.addbtn} htmlType="submit_signup">Continue</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddListing04;