import { useState } from "react";
import FooterCss from "./../src/styles/Footer.module.css";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import { Button, Input, message, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";

const Footer = () => {
  const DateCC = new Date().getFullYear();
  const [Loading, setLoading] = useState(false);

  const SubmitSubscribe = async (FormValue) => {
    setLoading(true);

    const SubmitSubRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/subscribe`,
      {
        subscribeBy: FormValue.subscribe_email,
      }
    );
    if (SubmitSubRes.status === 201) {
      setLoading(false);
      message.success(
        "Thank you for subscribing to our newsletter. Happy reading!"
      );
    }
  };

  return (
    <>
      <footer className={FooterCss.footer}>
        <Container className={FooterCss.footer_container}>
          <Row className={FooterCss.footer_row}>
            <Col md={4} className={FooterCss.footer_cols}>
              <div className={FooterCss.footer_divs}>
                <div className={FooterCss.footer_logo_container}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/footer-logo.svg`}
                    width={100}
                    height={100}
                    alt="ventify logo"
                  />
                </div>
                <p className={FooterCss.footer_desc_p}>
                  Our qualified team of industry experts is vetting a wide array of private event-ready homes,
                  historical residences, penthouses and estates from around the world. Rent, Event, Enjoy!

                </p>
              </div>
            </Col>

            <Col md={5} className={FooterCss.footer_cols_text}>
              <div className={FooterCss.footer_divs_unorderdlist}>
                <ul className={FooterCss.nav_link_ul}>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Home
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/about" className={FooterCss.nav_link_a}>
                      About
                    </Link>
                  </li>

                  <li className={FooterCss.nav_link_li_blog}>
                    <Link href="/blog" className={FooterCss.nav_link_a}>
                      Ventify Journal & Press
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li_blog}>
                    <Link
                      href="/blog_and_podcast"
                      className={FooterCss.nav_link_a}
                    >
                      Partner Media
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={FooterCss.footer_divs_unorderdlist}>
                <ul className={FooterCss.nav_link_ul}>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/faq" className={FooterCss.nav_link_a}>
                      FAQ’s
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/contact_us" className={FooterCss.nav_link_a}>
                      Contact Us
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link
                      href="/term_and_conditions"
                      className={FooterCss.nav_link_a}
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/privacy" className={FooterCss.nav_link_a}>
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={3} className={FooterCss.footer_cols}>
              <div className={FooterCss.footer_div_email}>
                <div className={FooterCss.newsletter_container}>
                  <h5 className={FooterCss.footer_headings}>
                    Subscribe for our newsletter
                  </h5>

                  <div className={FooterCss.input_container}>
                    <Form
                      layout="vertical"
                      name="subscribe_form"
                      onFinish={SubmitSubscribe}
                    >
                      <Form.Item
                        name="subscribe_email"
                        label="Email"
                        rules={[
                          {
                            type: "email",
                          },
                        ]}
                      >
                        <Input
                          className={FooterCss.inputs}
                          size="large"
                          required
                          placeholder="Enter Your Email Please"
                          prefix={<MailOutlined />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <div className={FooterCss.footer_div_email}>
                          <div className={FooterCss.sub_btn_container}>
                            <Button
                              loading={Loading}
                              htmlType="submit"
                              className={FooterCss.sub_btn}
                              type="primary"
                            >
                              Subscribe
                            </Button>
                          </div>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Copyright Section */}
          <div className={FooterCss.copyright_section}>
            <Row className={FooterCss.copyright_section_row}>
              <Col md={4}>
                <p className={FooterCss.copyright_section_p}>
                  {process.env.NEXT_PUBLIC_APP_NAME} LLC &nbsp; - &nbsp; {DateCC} All rights reserved
                </p>


              </Col>

              <Col md={4} className={FooterCss.copyright_section_col_icon}>

              </Col>
              <Col md={4} className={FooterCss.copyright_section_col_icon}>
                <div className={FooterCss.icons_container}>
                  <div className={FooterCss.icons_spans}>
                    <Link
                      href="https://www.linkedin.com/company/golfh%C5%8Dm/"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/linkedin.svg`}
                        className={FooterCss.social_icons}
                        alt="Linkedin"
                        fill
                      />
                    </Link>
                  </div>

                  <div className={FooterCss.icons_spans}>
                    <Link
                      href="https://www.facebook.com/golfhom1/"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/facebook.svg`}
                        className={FooterCss.social_icons}
                        alt="Facebook"
                        fill
                      />
                    </Link>
                  </div>

                  <div className={FooterCss.icons_spans}>
                    <Link
                      href="https://www.instagram.com/golfhom/"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/insta.svg`}
                        className={FooterCss.social_icons}
                        alt="Instagram"
                        fill
                      />
                    </Link>
                  </div>
                  <div className={FooterCss.icons_spans}>
                    <Link
                      href="https://twitter.com/golfhom?s=20"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/twitter.svg`}
                        className={FooterCss.social_icons}
                        alt="Twitter"
                        fill
                      />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
