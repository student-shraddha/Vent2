import { useState } from "react";
import AddListing05Css from "../src/styles/dashboard/AddListing05.module.css";
import AddListing01Css from "../src/styles/dashboard/AddListing01.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import React from "react";

const AddListing04 = ({ onContinue, onBack, initialValues, setInitialValues, loadings }) => {
  const [RadioSmoking, SetRadiovalueSmoking] = useState(1);
  const [RadioPets, SetRadioPets] = useState(1);

  const [RadioChildren, SetRadioChildren] = useState(1);

  const RadioValueSmoking = (e) => {
    SetRadiovalueSmoking(e.target.value);
  };

  const RadioValuePets = (e) => {
    SetRadioPets(e.target.value);
  };

  const RadioValueChildren = (e) => {
    SetRadioChildren(e.target.value);
  };


  const [initialValue, setInitialValue] = useState({
    cancellationFees: [{
      hoursBeforeCheckIn: null,
      feePercentage: null,
      description: null
    }]
  })


  const addCancellationFees = () => {
    setInitialValue((prev) => {

      let value = {
        ...prev
      }
      value.cancellationFees.push({ "hoursBeforeCheckIn": "", "feePercentage": "", "description": "" });
      return value
    })
  }

  const removeCancellationFees = () => {
    setInitialValue((prev) => {

      let value = {
        ...prev
      }
      value.cancellationFees.pop();
      return value
    })
  }

  const handleChange = (e, field, index) => {
    // console.log("e.target", e.target.value)
    // console.log("index", index)

    // setCancellationFees((prev) => {

    //   let value = {
    //     ...prev
    //   }

    //   value[index][field] = e.target.value;
    //   return value
    // })
  }

  const CancellationFeesComponent = ({ index }) => {
    return (
      <Row className="pt-3">
        <Col md={12}>
          <div className={AddListing01Css.twoinputDropdown}>
            <Row >
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <p className={AddListing01Css.name}>Hours Before CheckIn</p>
                    <Form.Item
                      // className={RegisterToHost.form_items}
                      name={`hoursBeforeCheckIn-${index}`}
                      tooltip="Free Cancellation Policy"
                      rules={[
                        {
                          required: true,
                          message: "Please enter hours before check in",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Hours Before CheckIn"
                        className={AddListing01Css.listing}
                        onChange={(e) => { handleChange(e, 'hoursBeforeCheckIn', index) }}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12} className="pt-4">
                    <p className={AddListing01Css.price}>Fee Percentage</p>
                    <Form.Item
                      // className={RegisterToHost.form_items}
                      name={`feePercentage-${index}`}
                      tooltip="Free Cancellation Policy"
                      rules={[
                        {
                          required: true,
                          message: "Please enter fee percentage",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Fee Percentage"
                        className={AddListing01Css.listing}
                      />
                    </Form.Item>
                  </Col>
                </Row>

              </Col>

              <Col md={6}>
                <p className={AddListing01Css.type}>Description</p>
                <Form.Item
                  // className={RegisterToHost.form_items}
                  name={`description-${index}`}
                  tooltip="Write something here"
                  rules={[
                    {
                      required: true,
                      message: "Please enter description",
                      whitespace: true,
                    },
                  ]}
                >
                  <TextArea
                    className={AddListing05Css.text_area}
                    rows={5}
                    placeholder="Write something here..."
                  />
                </Form.Item>
              </Col>

              <div className={AddListing01Css.btnparent}>
                {index !== 0 && (
                  <Button className={AddListing01Css.deletebtn} onClick={removeCancellationFees}>Delete</Button>
                )}
              </div>

            </Row>
          </div>

        </Col>
      </Row>
    )
  }
  const [form] = Form.useForm();

  form.setFieldsValue({
    freeCancellation: initialValues.cancellationPolicies.freeCancellation,
    general: initialValues.termsAndConditions?.general,
    checkInTime: initialValues.termsAndConditions?.checkInTime,
    checkOutTime: initialValues.termsAndConditions?.checkOutTime,
    childrenPolicy: initialValues.termsAndConditions?.childrenPolicy,
    petPolicy: initialValues.termsAndConditions?.petPolicy,
    smokingPolicy: initialValues.termsAndConditions?.smokingPolicy
  });

  // console.log("initialValues: ", initialValues)

  return (
    <>
      {/*     -------------------------     TEXT AREA      ----------------------------    */}
      <Container>

        <Form
          form={form}
          onFinish={(val) => { onContinue({ ...val, cancellationFeesCount: initialValue.cancellationFees.length }) }}
        >
          <h3 className={AddListing05Css.addListing}>Add Listing</h3>

          <h4 className={AddListing05Css.info}>Terms & rules</h4>

          <hr />

          <Row>
            <h4 className={AddListing01Css.info}>
              Cancellation Policy*
            </h4>

            <Row className={"pb-4"}>
              <Col md={12}>
                <p className={AddListing01Css.name}>Free Cancellation</p>
                <Form.Item
                  // className={RegisterToHost.form_items}
                  name="freeCancellation"
                  tooltip="Free Cancellation Policy"
                  rules={[
                    {
                      required: true,
                      message: "Please enter free cancellation policy",
                      whitespace: true,
                    },
                  ]}
                >
                  <TextArea
                    type="text"
                    placeholder="Free Cancellation Policy"
                    className={AddListing01Css.listing}
                  />
                </Form.Item>
              </Col>
            </Row>

            {initialValue && initialValue.cancellationFees.length && initialValue.cancellationFees.map((i, inx) =>
              <CancellationFeesComponent key={inx} data={i} index={inx} />
            )}

            <div className={AddListing01Css.addbtnparent}>
              <Button className={AddListing01Css.addbtn} onClick={addCancellationFees}>
                <PlusOutlined className={AddListing01Css.plus} /> Add More
              </Button>
            </div>
          </Row>
          <hr />

          <Row className={"pb-4"}>
            <Col md={12}>

              <h4 className={AddListing01Css.info}>
                Terms & Conditions*
              </h4>
            </Col>
            <Col md={12}>
              <p className={AddListing01Css.title}>General</p>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="general"
                tooltip="General"
                rules={[
                  {
                    // required: true,
                    message: "Please enter general policy",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="General"
                  className={AddListing01Css.listing}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <p className={AddListing01Css.title}>CheckInTime</p>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="checkInTime"
                tooltip="CheckInTime"
                rules={[
                  {
                    // required: true,
                    message: "Please enter check in time policy",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="CheckInTime"
                  className={AddListing01Css.listing}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <p className={AddListing01Css.title}>CheckOutTime</p>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="checkOutTime"
                tooltip="CheckOutTime"
                rules={[
                  {
                    // required: true,
                    message: "Please enter check out time policy",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="CheckOutTime"
                  className={AddListing01Css.listing}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <p className={AddListing01Css.title}>Children Policy</p>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="childrenPolicy"
                tooltip="Children Policy"
                rules={[
                  {
                    // required: true,
                    message: "Please enter children policy",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Children Policy"
                  className={AddListing01Css.listing}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <p className={AddListing01Css.title}>Pet Policy</p>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="petPolicy"
                tooltip="Pet Policy"
                rules={[
                  {
                    // required: true,
                    message: "Please enter pet policy",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Pet Policy"
                  className={AddListing01Css.listing}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <p className={AddListing01Css.title}>Smoking Policy</p>
              <Form.Item
                // className={RegisterToHost.form_items}
                name="smokingPolicy"
                tooltip="Smoking Policy"
                rules={[
                  {
                    // required: true,
                    message: "Please enter smoking policy",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Smoking Policy"
                  className={AddListing01Css.listing}
                /></Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {/* <h5 className={AddListing05Css.title}>Cancellation Policy*</h5>
            <div className={AddListing05Css.checkbox_div}>
              <Checkbox className={AddListing05Css.checkbox}>
                RELAXED (14/7): Cancellations up to 14 days prior to check-in
                date, 100% refund, Cancellations 7 days or more before the
                stay, 50% refund. Less than 7 days, no refund
              </Checkbox>
            </div>
            <div className={AddListing05Css.checkbox_div}>
              <Checkbox className={AddListing05Css.checkbox}>
                MODERATE (30/14): Cancellations up to 30 days prior to
                check-in date, 100% refund, Cancellations 14 days or more
                before the stay, 50% refund. Less than 14 days, no refund
              </Checkbox>
            </div>
            <div className={AddListing05Css.checkbox_div}>
              <Checkbox className={AddListing05Css.checkbox}>
                STRICT (60/30): Cancellations up to 60 days prior to check-in
                date, 100% refund, Cancellations 30 days or more before the
                stay, 50% refund. Less than 30 days, no refund
              </Checkbox>
            </div>
            <div className={AddListing05Css.checkbox_div}>
              <Checkbox className={AddListing05Css.checkbox}>
                Custom Policy
              </Checkbox>
            </div>

            <div className={AddListing05Css.input_divs}>
              <Input
                type="text"
                placeholder="Enter your Cancellation policy
                    "
                className={AddListing05Css.listing}
              />
            </div> */}
              {/* <Row>
              <Col md={6}>
                <h5 className={AddListing05Css.title}>
                  Minimum Nights of a Booking*
                </h5>

                <Input
                  type="number"
                  placeholder="Enter the minimum nights 0f a booking(number only)"
                  className={AddListing05Css.listing}
                />
              </Col>

              <Col md={6}>
                <h5 className={AddListing05Css.title}>
                  Maximum Nights of a Booking*
                </h5>

                <Input
                  type="number"
                  placeholder="Enter the maxmum nights of a booking(number only)"
                  className={AddListing05Css.listing}
                />
              </Col>
            </Row> */}

              {/* <Row>
              <Col md={6}>
                <h5 className={AddListing05Css.title}>Check-in After*</h5>

                <Select
                  style={{ minWidth: "100%" }}
                  className={AddListing05Css.select_input_checkin}
                  defaultValue="lucy"
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </Col>

              <Col md={6}>
                <h5 className={AddListing05Css.title}>Check-out Before*</h5>
                <Select
                  style={{ minWidth: "100%" }}
                  className={AddListing05Css.select_input_checkin}
                  defaultValue="lucy"
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </Col>
            </Row> */}

              {/* Smoking Allowed Checkbox */}
              {/* <Row className={AddListing05Css.radio_section_main_row}>
              <Col md={4}>
                <div
                  className={
                    AddListing05Css.radioA_inputs_main_heading_container
                  }
                >
                  <p className={AddListing05Css.radioA_inputs_main_heading_p}>
                    Smoking allowed?
                  </p>
                </div>
              </Col>

              <Col md={4} className={AddListing05Css.radio_cols}>
                <Radio.Group
                  onChange={RadioValueSmoking}
                  value={RadioSmoking}
                  className={AddListing05Css.radio_group_div}
                >
                  <div className={AddListing05Css.radio_main_div}>
                    <div className={AddListing05Css.radioA}>
                      <Radio
                        className={AddListing05Css.radioA_inputs}
                        value={1}
                      >
                        Yes
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Col>

              <Col md={4} className={AddListing05Css.radio_cols}>
                <Radio.Group
                  onChange={RadioValueSmoking}
                  value={RadioSmoking}
                  className={AddListing05Css.radio_group_div}
                >
                  <div className={AddListing05Css.radio_main_div}>
                    <div className={AddListing05Css.radioA}>
                      <Radio
                        className={AddListing05Css.radioA_inputs}
                        value={2}
                      >
                        No
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Col>
            </Row> */}

              {/* Pets Allowed Checkbox */}
              {/* <Row className={AddListing05Css.radio_section_main_row}>
              <Col md={4}>
                <div
                  className={
                    AddListing05Css.radioA_inputs_main_heading_container
                  }
                >
                  <p className={AddListing05Css.radioA_inputs_main_heading_p}>
                    Pets allowed?
                  </p>
                </div>
              </Col>

              <Col md={4} className={AddListing05Css.radio_cols}>
                <Radio.Group
                  onChange={RadioValuePets}
                  value={RadioPets}
                  className={AddListing05Css.radio_group_div}
                >
                  <div className={AddListing05Css.radio_main_div}>
                    <div className={AddListing05Css.radioA}>
                      <Radio
                        className={AddListing05Css.radioA_inputs}
                        value={3}
                      >
                        Yes
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Col>

              <Col md={4} className={AddListing05Css.radio_cols}>
                <Radio.Group
                  onChange={RadioValuePets}
                  value={RadioPets}
                  className={AddListing05Css.radio_group_div}
                >
                  <div className={AddListing05Css.radio_main_div}>
                    <div className={AddListing05Css.radioA}>
                      <Radio
                        className={AddListing05Css.radioA_inputs}
                        value={4}
                      >
                        No
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Col>
            </Row> */}

              {/* Children Allowed Checkbox */}
              {/* <Row className={AddListing05Css.radio_section_main_row}>
              <Col md={4}>
                <div
                  className={
                    AddListing05Css.radioA_inputs_main_heading_container
                  }
                >
                  <p className={AddListing05Css.radioA_inputs_main_heading_p}>
                    Children allowed?
                  </p>
                </div>
              </Col>

              <Col md={4} className={AddListing05Css.radio_cols}>
                <Radio.Group
                  onChange={RadioValueChildren}
                  value={RadioChildren}
                  className={AddListing05Css.radio_group_div}
                >
                  <div className={AddListing05Css.radio_main_div}>
                    <div className={AddListing05Css.radioA}>
                      <Radio
                        className={AddListing05Css.radioA_inputs}
                        value={5}
                      >
                        Yes
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Col>

              <Col md={4} className={AddListing05Css.radio_cols}>
                <Radio.Group
                  onChange={RadioValueChildren}
                  value={RadioChildren}
                  className={AddListing05Css.radio_group_div}
                >
                  <div className={AddListing05Css.radio_main_div}>
                    <div className={AddListing05Css.radioA}>
                      <Radio
                        className={AddListing05Css.radioA_inputs}
                        value={6}
                      >
                        No
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Col>
            </Row> */}

              {/* <Row>
              <Col md={12}>
                <h5 className={AddListing05Css.title}>
                  Additional rules and information (Optional)
                </h5>
                <TextArea
                  className={AddListing05Css.text_area}
                  rows={4}
                  placeholder="Write something here..."
                />
              </Col>
            </Row> */}

              {/* <div className={AddListing05Css.twobtn}>
              <Button className={AddListing05Css.savebtn}>Back</Button>
              <Button className={AddListing05Css.savebtn}>
                Save as Draft
              </Button>
            </div> */}
              <div className={AddListing05Css.twobtn}>
                <Button className={AddListing05Css.savebtn} onClick={onBack}>Back</Button>
                <Button className={AddListing05Css.addbtn} htmlType="submit" loading={loadings}>Submit</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddListing04;