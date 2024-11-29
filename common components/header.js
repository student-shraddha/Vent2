/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import HeaderCss from "../src/styles/Header.module.css";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Checkbox, Input, Form, message } from "antd";
import Image from "next/image";
import UserIcon from "../public/user icon.svg";
const { TextArea } = Input;
import Logo from "../public/logo.svg";
import { signIn, signOut } from "next-auth/react";

import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { Dropdown, Space, Modal } from "antd";
import axios from "axios";
// import MobileMenuLogo from "../public/images/GOLFHOM-Logo-mobile-menu.webp";
import MobileMenuLogo from "../public/images/Logo-mobile-menu.webp";
import MobileMenuHomeLogo from "../public/images/vector/home.svg";
import ProfileIcon from "../public/images/vector/profile_icon.png";
import ProfileIconMobileMenu from "../public/images/vector/profile_loggedin.png";
import ReservationIconMobileMenu from "../public/images/vector/reservation_loggedin.png";
import InvoiceIconMobileMenu from "../public/images/vector/invoice_loggedin.png";
import LogoutIconMobileMenu from "../public/images/vector/logout_loggedin.png";
import PropertyIconMenu from "../public/images/vector/apartment.svg";
import { AuthContext } from "@/context/auth_context";
import SearchIndexCss from "../src/styles/SearchIndex.module.css";
import axiosInstance from "@/utils/axiosInstance"
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  MenuOutlined,
  ContactsFilled, PhoneOutlined
} from "@ant-design/icons";
import Blog from "../public/images/vector/Blog.svg";
import About from "../public/images/vector/About.svg";
import dynamic from "next/dynamic";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const placesLibrary = ["places"];

const ForgotPassword = dynamic(() => import("./ForgotPassword"), {
  suspense: true,
});

const Header = ({ name, ...props }) => {
  const Router = useRouter();
  const [UserName, SetUserName] = useState("");
  const [loadings, setLoadings] = useState(false);
  const RouterRef = useRouter();
  const ContextUserDetails = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");

  const { data: session, status } = useSession();

  // console.log("session: ", session?.user)
  // console.log("status: ", status)

  // console.log("ContextUserDetails: ", ContextUserDetails)
  // console.log("userRole: ", userRole)

  // ---------------------- Search - START ----------------------------
  const showSearchInHeader = Router.pathname === "/search" ? true : false;
  const param = Router.query;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: placesLibrary,
  });

  const [InputValue, setInputValue] = useState(
    param?.location_name ? param?.location_name : ""
  );

  const [UrlParamsGeoData, setUrlParamsGeoData] = useState({
    latitude: param?.latitude,
    longitude: param?.longitude,
    location_name: param?.location_name,
  });
  const [searchResult, setSearchResult] = useState("");

  const onPlaceChanged = (a) => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;

      setInputValue(formattedAddress);

      setUrlParamsGeoData({
        latitude: place.geometry?.location.lat(),
        longitude: place.geometry?.location.lng(),
        location_name: formattedAddress,
      });
    } else {
      message.error("Please enter text");
    }
  };

  useEffect(() => {
    if (UrlParamsGeoData?.location_name) {

      Router.push(
        `/search?latitude=${encodeURIComponent(
          UrlParamsGeoData?.latitude
        )}&longitude=${encodeURIComponent(
          UrlParamsGeoData?.longitude
        )}&location_name=${UrlParamsGeoData?.location_name}&nights=${(param?.nights || "")}&guest=${encodeURIComponent(
          (param?.adults ? parseInt(param?.adults) : 0) +
          (param?.childs ? parseInt(param?.childs) : 0)
        )}&adults=${encodeURIComponent(
          (param?.adults || "")
        )}&childs=${encodeURIComponent((param?.childs || ""))}&from=${param?.from ? param?.from : dayjs().format("MM-DD-YYYY")
        }&to=${param?.to ? param?.to : dayjs().add(1, "day").format("MM-DD-YYYY")
        }`
      );
    }
    return () => { };
  }, [UrlParamsGeoData]);

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const OnSearchInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // ---------------------- Search - END ----------------------------



  {
    /* -----------       SIGN UP SECTION        -----------------*/
  }

  //! SIGNUP & LOGIN FORM INSTANCE
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  //* REGISTER BTN DISABLED
  const [IsRegisterBtnDisable, SetRegisterBtnDisable] = useState(false);

  // LOGIN MODAL FOR LARGE DEVICES

  const [loginModalLgDevice, setLoginModalLgDevice] = useState(false);

  const loginLgDevice = () => {
    setLoginModalLgDevice(true);
    setShowMobileMenu(false);
  };
  const handleLoginLgDevice = () => {
    setLoginModalLgDevice(false);
  };
  const handleCancel = () => {
    setLoginModalLgDevice(false);
  };

  {
    /* -----------      REGISTER SECTION IN LARGE Device      -----------------*/
  }

  const [registerModaInLgDevice, setRegisterModaInLgDevice] = useState(false);
  const registerLgDevice = () => {
    setRegisterModaInLgDevice(true);
    handleCancel();
  };
  const handleRegisterLgDevice = () => {
    setRegisterModaInLgDevice(false);
  };
  const handleCancelRegisterLgDevice = () => {
    setRegisterModaInLgDevice(false);
  };

  //! SIGNUP API FUNCTION
  const onSubmitSignup = async (values) => {
    setLoadings(true);
    try {
      //! SIGNUP API

      const formData = new FormData();

      formData.append('email', values.email);
      formData.append('address', values.address);
      formData.append('mobile', values.mobile);
      formData.append('password', values.password);
      formData.append('username', values.user_name);
      formData.append('type', "User");
      // fileList.length && fileList.forEach((file) => {
      //   formData.append('profile', file);
      // });

      const url = `/v1/auth/user/signup`;
      // console.log("urlL ", url)
      const response = await axiosInstance({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data;`,
        },
      });

      //* Close Register Modal on Success Signup
      if (response.status === 201) {
        setLoadings(true);
        setLoginModalLgDevice(false);

        handleCancelRegisterLgDevice();

        //! User Get Profile API Call
        const Result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (Result?.error) {

          let res_error = JSON.parse(Result?.error)
          message.error(res_error.responseMessage);
          setLoadings(false);
        } else {
          setLoadings(false);
        }

        message.success(response.data.message);
      }
    } catch (error) {
      setLoadings(false);
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred during signup.";
      message.error(errorMessage);
    }
    // console.log(values);
  };

  //! LOGIN API FUNCTION
  const onSubmitLogin = async () => {
    setLoadings(true);
    const LoginEmail = form2.getFieldValue("email_login");
    const LoginPassword = form2.getFieldValue("password");
    const RememberMe = form2.getFieldValue("remember_me");
    const Result = await signIn("credentials", {
      redirect: false,
      email: LoginEmail,
      password: LoginPassword,
    });

    if (Result?.error) {

      let res_error = JSON.parse(Result?.error)
      message.error(res_error.responseMessage);
      setLoadings(false);
    } else {
      console.log("login successful");
      setLoadings(false);
      setLoginModalLgDevice(false);

      if (Result.url.includes("/host")) {
        RouterRef.push(Result.url)
      }


    }

  };

  {
    /* -----------      FORGET PASSWORD SECTION IN LARGE DEVICE       -----------------*/
  }

  const [forgotModalLgDevice, setForgotModalLgDevice] = useState(false);
  const forgotLgDevice = () => {
    setForgotModalLgDevice(true);
    handleCancel();
  };
  const handleForgotLgDevice = () => {
    setForgotModalLgDevice(false);
  };
  const handleCancelForgotLgDevice = () => {
    setForgotModalLgDevice(false);
  };

  //!------------------------------------------------------------------

  const [ShowMobileMenu, setShowMobileMenu] = useState(false);
  const CloseOffCanvas = () => setShowMobileMenu(false);
  const HamburgerMenuMobileBtn = () => setShowMobileMenu(true);

  //!----------------------------------------------------------------
  const Logout = async () => {
    // sessionStorage.removeItem("token");
    // localStorage.removeItem("token");
    // sessionStorage.removeItem("Uname");
    // localStorage.removeItem("Uname");
    // sessionStorage.removeItem("UserProfilePic");
    // localStorage.removeItem("UserProfilePic");
    // sessionStorage.removeItem("UserRole");
    // localStorage.removeItem("UserRole");

    // SetIsLoggedIn(false);
    // RouterRef.pathname.includes("/search") ? "" : RouterRef.push("/");
    // // console.log();
    // message.success("Logout successfully!");
    // ContextUserDetails.setUserState(null);
    // ContextUserDetails.setUser(null);
    // setUser(null)
    // setShowMobileMenu(false);

    const LogOutResponse = await signOut({ redirect: false });
  };


  const menu_items = [
    {
      label: "Dashboard",
      icon: MobileMenuHomeLogo,
      href: "/dashboard",
      key: "1",
      allowed_roles: ["User"]
    },
    {
      label: "Profile",
      icon: ProfileIconMobileMenu,
      href: "/dashboard/user_profile",
      key: "2",
      allowed_roles: ["User"]
    },
    {
      label: "Profile",
      icon: ProfileIconMobileMenu,
      href: "/host/settings/profile",
      key: "2",
      allowed_roles: ["Host"]
    },
    {
      label: "Reservation",
      icon: ReservationIconMobileMenu,
      href: "/dashboard/reservation",
      key: "3",
      allowed_roles: ["User"]
    },
    {
      label: "Invoices",
      icon: InvoiceIconMobileMenu,
      href: "/dashboard/invoice",
      key: "5",
      allowed_roles: ["User"]
    },
    {
      label: "Dashboard",
      icon: PropertyIconMenu,
      href: "/host/",
      key: "6",
      allowed_roles: ["Host"]
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      icon: LogoutIconMobileMenu,
      href: "/",
      key: "7",
      onClick: true,
      allowed_roles: []
      // onClick={(e) => {
      //   e.preventDefault();

      //   Logout();
      // }}
    },
    // ...(User?.role === "ddf" ? aa : [])
  ];


  return (
    <>
      <header className={HeaderCss.header}>
        <Container className={HeaderCss.container_header}>
          {/* -----------       LOGIN SECTION IN LARGE DEVICE        -----------------*/}
          <Modal
            title="Log In to your account"
            footer={null}
            open={loginModalLgDevice}
            onSignup={handleLoginLgDevice}
            onCancel={handleCancel}
            width={372}
            centered={true} // Enable centering
          >
            <div className={HeaderCss.textParent}>
              <Form
                form={form2}
                layout="vertical"
                name="login_form"
                scrollToFirstError
              >
                {/* EMAIL */}
                <Form.Item
                  name="email_login"
                  label="Email"
                  className={HeaderCss.form_items_login}
                  rules={[
                    {
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    name="email_login"
                    placeholder="Enter Email "
                    className={HeaderCss.password}
                  />
                </Form.Item>

                {/* PASSWORD */}
                <Form.Item
                  name="password"
                  label="Password"
                  className={HeaderCss.form_items_login}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password_login"
                    placeholder="Enter Password"
                    className={HeaderCss.password}
                  />
                </Form.Item>

                <div className={HeaderCss.remember}>
                  <Form.Item
                    className={HeaderCss.form_items_checkbox}
                    name="remember_me"
                    valuePropName="checked"
                  >
                    <Checkbox className={HeaderCss.meBox} name="remember_me">
                      Remember Me
                    </Checkbox>
                  </Form.Item>

                  <Button
                    onClick={onSubmitLogin}
                    htmlType="submit_login"
                    className={HeaderCss.signIn}
                    loading={loadings}
                  >
                    Log In
                  </Button>
                </div>
              </Form>
            </div>

            <div className={HeaderCss.forgotActive}>
              <Link
                href="/"
                className={HeaderCss.forgot}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <Button
                    className={HeaderCss.signUpBtn}
                    onClick={forgotLgDevice}
                    onCancel={handleCancel}
                  >
                    Forgot Password ?
                  </Button>
                </Space>
              </Link>

              <div className={HeaderCss.dont_link_parent}>
                <p className={HeaderCss.donthaveAcc}>
                  Don't you have an account?
                </p>
                <Link
                  href="/"
                  className={HeaderCss.registerLink}
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <span
                      className={HeaderCss.register}
                      onClick={registerLgDevice}
                    >
                      Register
                    </span>
                  </Space>
                </Link>
              </div>
            </div>
          </Modal>

          {/* -----------       LOGIN SECTION IN MOBILE        -----------------*/}

          <Offcanvas
            key={1}
            placement={["end"]}
            name={["end"]}
            className={HeaderCss.off_canvas}
            show={ShowMobileMenu}
            onHide={CloseOffCanvas}
            scroll={true}
            {...props}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <div className={HeaderCss.mobile_menu_logo_container}>
              <Image src={MobileMenuLogo} alt="ventify logo"></Image>
            </div>
            <Offcanvas.Body>
              {/* Mobile Menu Main Container */}


              {status === "authenticated" ? (
                <div className={HeaderCss.mobile_dropdown_parent_div}>
                  <Dropdown
                    menu={{
                      items: menu_items.map((i) => {
                        return i.type ?
                          i :
                          ((session?.user?.type && ((i.allowed_roles.includes(session?.user?.type) || (!i.allowed_roles.length && i.label == "session?.user?.type"))) || (!userRole && i.label == "Logout"))) ? {
                            label: (
                              <Link
                                className={
                                  HeaderCss.top_header_menu_logggedin_link
                                }
                                href={i.href}
                                onClick={(e) => {
                                  if (i.onClick) {
                                    e.preventDefault(); Logout();
                                  }
                                }}
                              >
                                {" "}
                                <Image
                                  src={i.icon}
                                  alt="home icon"
                                  width={18}
                                  height={18}
                                  className={
                                    HeaderCss.top_header_menu_logggedin_link_icons
                                  }
                                ></Image>
                                {i.label}

                              </Link>
                            ),
                            key: i.key,
                          } : null
                      }
                      ),


                    }}
                  >
                    <Link
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className={HeaderCss.top_header_logggedin_link_mobile}
                    >
                      <Space
                        className={HeaderCss.top_header_logggedin_space_mobile}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={session?.user?.profile || ProfileIcon}
                          alt="profile icon"
                        ></Image>
                        {session?.user?.username
                          ? session?.user?.username.charAt(0).toUpperCase() + session?.user?.username.slice(1)
                          : "Anyonums "}
                        <DownOutlined />
                      </Space>
                    </Link>
                  </Dropdown>
                </div>
              ) : (
                ""
              )}

              {/* HEADER SECTION NAVBAR IN LARGE DEVICE */}
              <nav className={HeaderCss.mobile_menu}>
                <div className={HeaderCss.mobile_menu_main_container}>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image src={MobileMenuHomeLogo} alt="home icon"></Image>
                    <Link className={HeaderCss.top_header_a} href="/">
                      Home
                    </Link>
                  </div>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image src={About} alt="About" width={20} height={20} />
                    <Link className={HeaderCss.top_header_a} href="/about">
                      About
                    </Link>
                  </div>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image src={Blog} alt="Blog" width={20} height={20} />
                    <Link className={HeaderCss.top_header_a} href="/blog">
                      Journal
                    </Link>
                  </div>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    {
                      <ContactsFilled
                        size={80}
                        className={HeaderCss.contactFill}
                      />
                    }
                    <Link className={HeaderCss.top_header_a} href="/contact_us">
                      Contact Us
                    </Link>
                  </div>

                  {/* MOBILE LOGIN MODAL BTN */}

                  {status === "loading" ? (
                    <div className="rounded spinner-grow spinner-grow-sm"></div>
                  ) : (
                    <>
                      {status === "unauthenticated" && (
                        <>

                          <div className={HeaderCss.mobile_menu_div_container}>
                            <Image src={UserIcon} alt="user icon" />

                            <Link
                              className={HeaderCss.top_header_a}
                              href="/register_to_host"
                            >
                              Register to Host
                            </Link>
                          </div>
                          <div className={HeaderCss.mobile_menu_div_container}>
                            <Image src={UserIcon} alt="user icon" />

                            <Link
                              className={HeaderCss.top_header_a}
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Space>
                                <Button
                                  className={HeaderCss.signUpBtn}
                                  onClick={loginLgDevice}
                                >
                                  Log in & Sign up
                                </Button>
                              </Space>
                            </Link>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </nav>
            </Offcanvas.Body>
          </Offcanvas>

          {/* -----------      REGISTER SECTION IN LARGE DEVICE       -----------------*/}
          <Modal
            title="Register"
            footer={null}
            open={registerModaInLgDevice}
            onSignup={handleRegisterLgDevice}
            onCancel={handleCancelRegisterLgDevice}
            width={440}
            centered={true} // Enable centering
            className={HeaderCss.headerReg}
          >
            <Form
              onFinish={onSubmitSignup}
              form={form1}
              name="register_form"
              scrollToFirstError
            >
              <Col className={HeaderCss.inputParent}>
                {/*  FORM VALIDATION SIGNUP */}

                {/* firstName */}
                {/* <Form.Item
                  className={HeaderCss.form_items}
                  name="firstName"
                  tooltip="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="firstName"
                    prefix={<UserOutlined />}
                    placeholder="Enter First Name"
                    className={HeaderCss.inputA}
                  />
                </Form.Item> */}

                {/* lastName */}
                {/* <Form.Item
                  className={HeaderCss.form_items}
                  name="lastName"
                  tooltip="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="lastName"
                    prefix={<UserOutlined />}
                    placeholder="Enter Last Name"
                    className={HeaderCss.inputB}
                  />
                </Form.Item> */}

                {/* Username */}
                <Form.Item
                  className={HeaderCss.form_items}
                  name="user_name"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input your User Name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="user_name"
                    prefix={<UserOutlined />}
                    placeholder="Enter User Name"
                    className={HeaderCss.inputA}
                  />
                </Form.Item>

                {/* EMAIL */}
                <Form.Item
                  className={HeaderCss.form_items}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    className={HeaderCss.inputB}
                  />
                </Form.Item>

                {/* PASSWORD */}

                <Form.Item
                  className={HeaderCss.form_items}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 5,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password"
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    className={HeaderCss.inputC}
                  />
                </Form.Item>

                {/* CONFIRM PASSWORD */}

                <Form.Item
                  className={HeaderCss.form_items}
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm Password"
                    className={HeaderCss.inputC}
                  />
                </Form.Item>

                {/* Username */}
                <Form.Item
                  className={HeaderCss.form_items}
                  name="mobile"
                  tooltip="Mobile Number"
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
                    name="mobile"
                    prefix={<PhoneOutlined />}
                    placeholder="Enter Mobile Number"
                    className={HeaderCss.inputC}
                  />
                </Form.Item>

                <Form.Item
                  className={HeaderCss.form_items}
                  name="address"
                  tooltip="Address"

                >
                  <TextArea
                    className={HeaderCss.inputD}
                    type="password"
                    placeholder="Address"
                  ></TextArea>
                </Form.Item>


              </Col>

              <Row className={HeaderCss.twoAgree}>
                <Form.Item
                  className={HeaderCss.form_items_checkbox}
                  name="conditions"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error("Should accept Terms & Conditions")
                          ),
                    },
                  ]}
                >
                  <Checkbox
                    name="conditions"
                    className={HeaderCss.agreeOptionA}
                  >
                    I agree with your Terms & Conditions
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  className={HeaderCss.form_items_checkbox}
                  name="privacy"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error("Should accept Privacy & Policy")
                          ),
                    },
                  ]}
                >
                  <Checkbox name="privacy" className={HeaderCss.agreeOptionB}>
                    I agree with your Privacy Policy
                  </Checkbox>
                </Form.Item>
              </Row>
              <Form.Item>
                <div className={HeaderCss.registBtnParent}>
                  <Button
                    disabled={IsRegisterBtnDisable}
                    htmlType="submit_signup"
                    loading={loadings}
                    className={HeaderCss.registerBtn}
                  >
                    Register
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Modal>

          {/* -----------       FORGET PASSWORD SECTION IN LARGE DEVICE     -----------------*/}

          <Modal
            title="Forgot Password"
            footer={null}
            open={forgotModalLgDevice}
            onSignup={handleForgotLgDevice}
            onCancel={handleCancelForgotLgDevice}
            width={600}
            centered={true} // Enable centering
            className={HeaderCss.headerForgot}
          >
            <ForgotPassword />
          </Modal>

          {/* PROFILE DROPDOWN IN LARGE DEVICE */}
          <Row className={HeaderCss.top_nav_bar_main_row}>
            <div>
              <Row
                className={`${HeaderCss.top_nav_bar_row} ${HeaderCss.register_host_btn_row}`}
              >
                <Col xs={"auto"} className={HeaderCss.logo_container}>
                  <Link href="/" className={HeaderCss.logo_container_a}>
                    <Image src={Logo} alt="ventify logo" width="140" />
                  </Link>
                </Col>

                <Col
                  xs={"auto"}
                  className={HeaderCss.search_container}
                  style={{
                    display: showSearchInHeader ? "flex" : "none",
                  }}
                >
                  <div className={HeaderCss.search_container_mobile_view}>
                    {showSearchInHeader && isLoaded ? (
                      <Autocomplete
                        options={{
                          types: ["(regions)"],
                          fields: [
                            "address_components",
                            "geometry",
                            "formatted_address",
                            "name",
                          ],
                        }}
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoad}
                      >
                        <Input
                          className={SearchIndexCss.inner_input_box}
                          size="large"
                          value={InputValue}
                          onChange={OnSearchInputChange}
                          name="search_input"
                          allowClear
                        />
                      </Autocomplete>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>

                <Col
                  md={5}
                  xs={"auto"}
                  className={HeaderCss.top_header_register_host_col_container}
                >
                  <Row className={HeaderCss.top_header_row_container}>
                    {/*//*  Off Canvas Btn  */}
                    <Col xs={"auto"} className={`${HeaderCss.off_canvas_col} `}>
                      {/* MOBILE HAMBURGER MENU BTN */}
                      <MenuOutlined
                        style={{ fontSize: "25px" }}
                        onClick={HamburgerMenuMobileBtn}
                      />
                    </Col>

                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link className={HeaderCss.below_header_a} href="/">
                        Home
                      </Link>
                    </Col>

                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link className={HeaderCss.below_header_a} href="/about">
                        About
                      </Link>
                    </Col>
                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link className={HeaderCss.below_header_a} href="/blog">
                        Journal
                      </Link>
                    </Col>

                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link
                        className={HeaderCss.below_header_a}
                        href="/contact_us"
                      >
                        Contact Us
                      </Link>
                    </Col>

                    {/* LOGGED IN USER PROFILE MENU */}

                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      {status === "loading" ? (
                        <div className="rounded spinner-grow"></div>
                      ) : (
                        <>
                          {status === "authenticated" ? (

                            <Dropdown
                              menu={{
                                items: menu_items.map((i) => {
                                  return i.type ?
                                    i :
                                    ((session?.user?.type && ((i.allowed_roles.includes(session?.user?.type) || (!i.allowed_roles.length && i.label == "Logout"))) || (!session?.user?.type && i.label == "Logout"))) ? {
                                      label: (
                                        <Link
                                          className={
                                            HeaderCss.top_header_menu_logggedin_link
                                          }
                                          href={i.href}
                                          onClick={(e) => {
                                            if (i.onClick) {
                                              e.preventDefault(); Logout();
                                            }
                                          }}
                                        >
                                          {" "}
                                          <Image
                                            src={i.icon}
                                            alt="home icon"
                                            width={18}
                                            height={18}
                                            className={
                                              HeaderCss.top_header_menu_logggedin_link_icons
                                            }
                                          ></Image>
                                          {i.label}

                                        </Link>
                                      ),
                                      key: i.key,
                                    } : null
                                }
                                ),
                              }}
                            >
                              <Link
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                                className={HeaderCss.top_header_logggedin_link}
                              >
                                <Space
                                  className={HeaderCss.top_header_logggedin_space}
                                >
                                  {session?.user?.username
                                    ? session?.user?.username.charAt(0).toUpperCase() +
                                    session?.user?.username.slice(1)
                                    : "Anyonums "}
                                  <Image
                                    width={20}
                                    height={20}
                                    src={session?.user?.profile || ProfileIcon}
                                    alt="profile icon"
                                  ></Image>
                                </Space>
                              </Link>
                            </Dropdown>

                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>

                {status === "unauthenticated" ? (
                  <>
                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Row>
                        <Col
                          xs={"auto"}
                          className={HeaderCss.top_header_Col_container}
                        >
                          <Link
                            className={HeaderCss.register_btn}
                            href="/register_to_host"
                          >
                            Register to Host
                          </Link>
                          <Link
                            href="/"
                            className={HeaderCss.top_header_a}
                            onClick={(e) => e.preventDefault()}
                          >
                            <Space>
                              <Button
                                className={HeaderCss.signUpBtn}
                                onClick={loginLgDevice}
                              >
                                Log in & Sign up
                              </Button>
                            </Space>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </>
                ) : (
                  ""
                )}
              </Row>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
