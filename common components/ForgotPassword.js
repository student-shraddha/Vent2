import { useState } from "react";
import { Button, Input, Form, message } from "antd";
import ForgotPasswordCss from "../src/styles/common component/ForgotPassword.module.css";
import axios from "axios";

const ForgotPassword = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [FormRef] = Form.useForm();

  const OnClickSendEmail = (values) => {
    setIsLoading(true);
    const Email = values.email;
    const ForgetPassAPI = async () => {
      try {
        const ForgetPassRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/forgotPassword`,
          {
            email: Email,
          }
        );

        if (ForgetPassRes.status === 200) {
          message.success(
            "Please check your email for password reset instructions!"
          );
          setIsLoading(false);
        }
      } catch (error) {
        message.error(error.response.data.message);
        setIsLoading(false);
      }
    };
    ForgetPassAPI();
  };

  return (
    <>
      <div className={ForgotPasswordCss.forgot_pass_section}>
        <Form
          name="send_email_form"
          layout="vertical"
          onFinish={OnClickSendEmail}
          autoComplete="on"
          form={FormRef}
        >
          <h5 className={ForgotPasswordCss.forgotHeading}>
            Please enter your email address. You will receive a link to create a
            new password via email.
          </h5>

          {/* FORGOT EMAIL */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              className={ForgotPasswordCss.email_input}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item>
            <div className={ForgotPasswordCss.forgotBtn}>
              <Button
                className={ForgotPasswordCss.registBtn}
                loading={IsLoading}
                htmlType="submit"
              >
                Send
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
