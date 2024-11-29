import { useState } from "react";
import { Checkbox, Input, message, Button, Form } from "antd";
import { Col } from "react-bootstrap";
import ContactUsCss from "../components/style/ContactToHost.module.css";
import axios from "axios";
const { TextArea } = Input;
import React from "react";

const ContactToHost = ({ HideContactHostPopUp, propertyID }) => {
  //* IN FUNC PROPS CALLING POP CLOSE FUNCTION FROM VIEW PROPERTY PAGE
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);

  const OnClickSubmitContactToHost = async (FormData) => {
    setLoading(true);
    try {
      const ContactUsResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_VENTIFY_API_URL}/v1/contactUs`,
        {
          name: FormData.contact_to_host_name,
          email: FormData.contact_to_host_email,
          subject: FormData.contact_to_host_number,
          message: FormData.contact_to_host_message,
          property_id: propertyID
        }
      );

      if (ContactUsResponse.status === 201) {
        setLoading(false);
        form.resetFields();
        message.success(
          "Thank you for contacting us. Your message is appreciated."
        );
        HideContactHostPopUp(); //* CLOSE POPUP MODAL FUCNTION VIEW PROPERTY PAGE
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const OnClickSubmitFaildContactToHost = (value) => {
    setLoading(false);
  };
  return (
    <>
      <div className={ContactUsCss.headerReg}>
        <Form
          layout="vertical"
          form={form}
          onFinish={OnClickSubmitContactToHost}
          onFinishFailed={OnClickSubmitFaildContactToHost}
        >
          <Col className={ContactUsCss.inputParent}>
            <Form.Item
              className={ContactUsCss.form_items}
              name="contact_to_host_name"
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
              ]}
            >
              <Input className={ContactUsCss.inputA} placeholder="Name" />
            </Form.Item>
            <Form.Item
              className={ContactUsCss.form_items}
              name="contact_to_host_email"
              rules={[
                {
                  type: "email",
                  message: "Email is not valid email!",
                },
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input className={ContactUsCss.inputB} placeholder="Email" />
            </Form.Item>
            <Form.Item
              className={ContactUsCss.form_items}
              name="contact_to_host_number"
              rules={[
                {
                  required: true,
                  message: "Phone number is required!",
                },
                {
                  max: 10,
                  message: "Phone number can not be more than 10 digits!",
                },
              ]}
            >
              <Input
                className={ContactUsCss.inputC}
                placeholder="Phone Number"
              />
            </Form.Item>

            <Form.Item
              className={ContactUsCss.form_items}
              name="contact_to_host_message"
              rules={[
                {
                  required: true,
                  message: "Message is required!",
                },
              ]}
            >
              <div className={ContactUsCss.inputDParent}>
                <TextArea
                  className={ContactUsCss.inputD}
                  type="address"
                  placeholder="Message"
                  rows="3"
                  cols="50"
                />
              </div>
            </Form.Item>

            <Form.Item
              className={ContactUsCss.form_items}
              name="contact_to_host_policy"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error("Please accept privacy policy!")
                      ),
                },
              ]}
            >
              <div className={ContactUsCss.agreeBox}>
                <Checkbox
                  name="contact_to_host_policy"
                  className={ContactUsCss.agreeOptionB}
                >
                  I agree with your Privacy Policy
                </Checkbox>
              </div>
            </Form.Item>
            <Form.Item className={ContactUsCss.form_items}>
              <div className={ContactUsCss.registBtnParent}>
                <Button
                  htmlType="submit"
                  loading={Loading}
                  className={ContactUsCss.registerBtn}
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Form>
      </div>
    </>
  );
};

export default ContactToHost;
