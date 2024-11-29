import { useEffect, useState, useContext } from "react";
import UserProfieCss from "../../styles/dashboard/UserProfile.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Head from "next/head";
import UserImg from "../../../public/images/user_img.png";
import Image from "next/image";
import { Input, Button, Form, Modal, Upload } from "antd";
const { TextArea } = Input;
import ProtectedRoute from "../../../common components/protected_route";
import React from "react";
import { useSession } from "next-auth/react";

import axios from "axios";
import { AuthContext } from "@/context/auth_context";
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from "@/utils/axiosInstance"

const UserProfile = () => {
  const ContextUserDetails = useContext(AuthContext);
  const [IsFormDisabled, setIsFormDisabled] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const [fileList, setFileList] = useState([]);
  const [token, setToken] = useState(null)

  const [profilePic, setProfilePic] = useState(UserImg);

  const { data: session, update } = useSession();
  useEffect(() => {
    setToken(session?.user?.token)
    session?.user.profile && setProfilePic(session?.user.profile)
  }, [session?.user?.token]);

  useEffect(() => {
    const GetProfileData = async () => {
      try {

        const GetProfileDataRes = await axiosInstance.get(`/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (GetProfileDataRes.status === 200) {
          setIsFormDisabled(false);

          const user = GetProfileDataRes.data.data.user
          user.profile && setProfilePic(user.profile)

          form.setFieldsValue({
            username: user.username,
            email: user.email,
            // firstName: user?.firstName,
            // lastName: user?.lastName,
            mobile: user?.mobile,
            address: user?.address,
            profile: user?.profile,
          });
        }
      } catch (error) { }
    };
    token && GetProfileData();

    return () => { };
  }, [token]);

  const RefreshPopUp = () => {
    let secondsToGo = 3;
    const instance = modal.success({
      title: "Profile updated successfully!",
      content: (
        <span className={UserProfieCss.user_profile_updated_popup_text}>
          Please do not refresh the page, Redirecting in {secondsToGo} second.
        </span>
      ),
      centered: true,
      footer: null,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: (
          <span className={UserProfieCss.user_profile_updated_popup_text}>
            Please do not refresh the page, Redirecting in {secondsToGo} second.
          </span>
        ),
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      window.location.reload();
    }, secondsToGo * 1000);
  };

  const OnSubmitSave = (values) => {

    setIsLoading(true);

    const UpdateProfile = async () => {
      try {
        const formData = new FormData();
        formData.append('address', values.address);
        formData.append('username', values.username);
        fileList.length && fileList.forEach((file) => {
          formData.append('profile', file);
        });


        // console.log("urlL ", url)
        const UpdateProfileRes = await axiosInstance({
          method: 'patch',
          url: "/v1/user/updateMe",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/form-data;`,
          },
        });

        if (UpdateProfileRes.status === 200) {
          setIsLoading(false);
          // if (localStorage.getItem("Uname")) {
          //   localStorage.setItem("Uname", values.username);
          // } else if (sessionStorage.getItem("Uname")) {
          //   sessionStorage.setItem("Uname", values.username);
          // }
          // RefreshPopUp();

          update({
            address: values.address,
            username: values.username,
            ...(UpdateProfileRes.data.profile && { profile: UpdateProfileRes.data.profile })
          });
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      }
    };
    UpdateProfile();
  };
  const OnSubmitFailed = (errorInfo) => {
    setIsLoading(false);
  };



  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file) => {
      // console.log("file", file)
      const getBase64_str = await getBase64(file)
      setProfilePic(getBase64_str)
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Ventify | User Profile</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          {/* REDIRECT POP MODAL */}
          {contextHolder}
          {/* PROFILE PAGE MAIN HEADING */}
          <h3 className={UserProfieCss.user_profile_page_heading}>Profile</h3>
          <Form
            form={form}
            disabled={IsFormDisabled}
            name="user_profile_info"
            onFinish={OnSubmitSave}
            onFinishFailed={OnSubmitFailed}
            autoComplete="off"
          >
            <div className={UserProfieCss.user_profile_page_info_section}>
              {/* PROFILE SECTION */}
              <div>
                <h4 className={UserProfieCss.user_profile_page_section_heading}>
                  Profile Picture
                </h4>
                <div className={UserProfieCss.user_profile_page_pic_container}>
                  <Image
                    src={profilePic}
                    height={160}
                    width={160}
                    className={UserProfieCss.user_profile_page_pic}
                    alt="Profile pic"
                  ></Image>
                </div>
                <div className="pt-3">
                  <Upload {...props} >
                    <Button icon={<UploadOutlined />}>Change picture</Button>
                  </Upload>
                </div>
              </div>
            </div>

            {/* INFORMATION SECTION */}
            <div className={UserProfieCss.user_profile_page_info_section}>
              <h5 className={UserProfieCss.user_profile_page_section_heading}>
                Information
              </h5>

              <hr />
              <Row className={UserProfieCss.user_profile_page_rows}>
                <Col md={5}>
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      User Name
                    </label>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="User Name"
                      />
                    </Form.Item>
                  </div>


                  {/* <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Last Name
                    </label>
                    <Form.Item
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your last name!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="Last Name"
                      />
                    </Form.Item>
                  </div> */}
                </Col>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>

                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Address
                    </label>
                    <Form.Item
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="Address"
                      />
                    </Form.Item>
                  </div>

                  {/* <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Bio
                    </label>
                    <TextArea
                      autoSize
                      placeholder="Bio here..."
                      className={UserProfieCss.user_profile_page_info_input}
                    />
                  </div> */}
                </Col>
              </Row>
            </div>

            {/* <div className={UserProfieCss.user_profile_page_info_section}>
              <h5 className={UserProfieCss.user_profile_page_section_heading}>
                Address
              </h5>
              <hr className={UserProfieCss.user_profile_page_hr} />
              <Row className={UserProfieCss.user_profile_page_rows}>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Street Address
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Address"
                    />
                  </div>

                
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      State
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="State"
                    />
                  </div>

             
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Country
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Country"
                    />
                  </div>
                </Col>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                 
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      City
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="City"
                    />
                  </div>
                
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Zip Code
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Code"
                    />
                  </div>
                </Col>
              </Row>
            </div> */}

            {/* PHONE SECTION */}
            <div className={UserProfieCss.user_profile_page_info_section}>
              <h5 className={UserProfieCss.user_profile_page_section_heading}>
                Contact
              </h5>
              <hr className={UserProfieCss.user_profile_page_hr} />
              <Row className={UserProfieCss.user_profile_page_rows}>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Email
                    </label>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="Email"
                        disabled={true}
                      />
                    </Form.Item>
                  </div>

                </Col>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Mobile
                    </label>
                    <Form.Item
                      name="mobile"
                      rules={[
                        {
                          pattern: /[1-9]{1}[0-9]{7,11}$/,
                          message: "The input is not valid mobile number!",
                        },
                        {
                          required: true,
                          message: "Please input your mobile number!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="Mobile"
                        disabled={true}
                      />
                    </Form.Item>
                  </div>

                </Col>
                {/* <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Phone
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Phone"
                    />
                  </div>
                </Col> */}
                {/* SAVE BTN CONTAINER */}
                <div
                  className={UserProfieCss.user_profile_page_save_btn_container}
                >
                  <Button
                    loading={IsLoading}
                    className={UserProfieCss.user_profile_page_save_btn}
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </div>
              </Row>
            </div>
          </Form>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export default UserProfile;
