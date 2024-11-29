import AddListing01Css from "../src/styles/dashboard/AddListing01.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input, Form } from "antd";
import React, { useState } from "react";

const Addlisting01 = ({ onContinue, onBack, initialValues }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [form] = Form.useForm();
  form.setFieldsValue({
    price: initialValues.price,
  });
  return (
    <>
      {/*     -------------------------     TEXT AREA      ----------------------------    */}
      <Container>
        <Form
          form={form}
          onFinish={onContinue}
        >
          <Col md={10}>
            <h3 className={AddListing01Css.addListing}>Add Listing</h3>

            <h4 className={AddListing01Css.info}>Pricing</h4>

            <hr />

            <Row>
              <Col md={7}>
                <h5 className={AddListing01Css.title}>Nightly*</h5>

                <Form.Item
                  // className={RegisterToHost.form_items}
                  name="price"
                  tooltip="Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter price for 1 night!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter price for 1 night"
                    className={AddListing01Css.listing}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* <Row>
            <Col md={12} className={AddListing01Css.colParent}>
              <h5 className={AddListing01Css.title}>Nightly*</h5>

              <Input
                type="text"
                placeholder="Enter price for 1 night"
                className={AddListing01Css.listing}
              />
            </Col>
          </Row> */}
            {/* <hr /> */}

            {/* <Row>
            <Col md={12} className={AddListing01Css.colParent}>
              <h5 className={AddListing01Css.title}>Long-term pricing</h5>
              <p className={AddListing01Css.weekly}>Weekly - 7+ nights</p>

              <Input
                type="text"
                placeholder="Enter the Unit price for a single day"
                className={AddListing01Css.listing}
              />
            </Col>
          </Row>
          <hr /> */}

            {/* <Row>
            <h4 className={AddListing01Css.info}>
              Setup Extra Services Price
            </h4>

            <Row className={AddListing01Css.twoinputDropdown}>
              <Col md={4}>
                <p className={AddListing01Css.name}>Name</p>
                <Input
                  type="text"
                  placeholder="Enter Service name"
                  className={AddListing01Css.listing}
                />
              </Col>

              <Col md={4}>
                <p className={AddListing01Css.price}>Price</p>
                <Input
                  type="text"
                  placeholder="Enter price - only digits"
                  className={AddListing01Css.listing}
                />
              </Col>

              <Col md={4}>
                <p className={AddListing01Css.type}>Type</p>
                <Select
                  defaultValue="Location"
                  options={[
                    {
                      value: "Action",
                      label: "Action",
                    },
                    {
                      value: "Another action",
                      label: "Another action",
                    },
                    {
                      value: "Something else",
                      label: "Something else",
                    },
                  ]}
                  trigger={["click"]}
                  size="large"
                >
                  <Select.Option onClick={(e) => e.preventDefault()}>
                    <Typography.Link
                      href="https://www.google.com/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space
                        className={
                          AddListing01Css.search_by_golf_input_search_by_tourni
                        }
                      >
                        {" "}
                        Single free
                        <CaretDownOutlined />
                      </Space>
                    </Typography.Link>
                  </Select.Option>
                </Select>
              </Col>

              <div className={AddListing01Css.btnparent}>
                <Button className={AddListing01Css.deletebtn}>Delete</Button>
              </div>
            </Row>

            <div className={AddListing01Css.addbtnparent}>
              <Button className={AddListing01Css.addbtn}>
                <PlusOutlined className={AddListing01Css.plus} /> Add More
              </Button>
            </div>
          </Row>
          <hr /> */}

            <Row>
              {/* <Col md={12}>
              <h4 className={AddListing01Css.info}>Additional costs</h4>
            </Col> */}

              <Row>
                {/* <Col md={4}>
                <p className={AddListing01Css.name}>Cleaning fee</p>
                <Input
                  type="text"
                  placeholder="Enter the Unit price for a single day"
                  className={AddListing01Css.listing}
                />
              </Col> */}

                {/* <Col md={4} className={AddListing01Css.radio}>
                <div className={AddListing01Css.radioA}>
                  <Col md={8}>
                    <p className={AddListing01Css.daily}>Daily</p>
                  </Col>

                  <Col md={4} className={AddListing01Css.circle}>
                    <Input type="radio" />
                  </Col>
                </div>
              </Col>

              <Col md={4} className={AddListing01Css.radio}>
                <div className={AddListing01Css.radioA}>
                  <Col md={8}>
                    <p className={AddListing01Css.perStay}>Per Stay</p>
                  </Col>

                  <Col md={4} className={AddListing01Css.circle}>
                    <Input type="radio" className={AddListing01Css.dot} />
                  </Col>
                </div>
              </Col> */}

                {/* <div className={AddListing01Css.twobtn}>
                <Button className={AddListing01Css.savebtn}>Back</Button>
                <Button className={AddListing01Css.savebtn}>
                  Save as Draft
                </Button>
              </div> */}

                <div className={AddListing01Css.twobtn}>
                  <Button className={AddListing01Css.savebtn} onClick={onBack}>Back</Button>
                  <Button htmlType="submit_signup" className={AddListing01Css.addbtn}> Continue</Button>
                </div>
              </Row>
            </Row>
          </Col>
        </Form>
      </Container>
    </>
  );
};

export default Addlisting01;
