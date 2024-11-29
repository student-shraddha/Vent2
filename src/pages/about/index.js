/* eslint-disable react/no-unescaped-entities */
"use client";
import Head from "next/head";
import { Button } from "antd";
import Link from "next/link";
import AboutUsCss from "@/styles/AboutUs.module.css";
import Image from "next/image";
import { Container, Col, Row } from "react-bootstrap";
import Review from "../../review";
import review from "@/pages/json/review.json";
import dynamic from "next/dynamic";
import { useState } from "react";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const About = () => {

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Head>
        <title>About Ventify: Your Golf Vacation Haven</title>
        <meta
          name="description"
          content="Discover how Ventify offers a seamless experience in finding and booking luxury golf vacation rentals. With our custom-built search algorithm, you have exclusive access to a premium selection of golf course-proximate homes, condos, and villas. We are dedicated to crafting a comprehensive golf travel experience that is as sophisticated and enjoyable as the game of golf itself."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ABOUT US SECTION STARTED */}
      <div className={AboutUsCss.about_us_section}>
        {/* BANNER IMAGE SECTION */}
        <div className={AboutUsCss.about_us_section_banner_container}>
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/about_banner_img.svg`}
            fill
            className={AboutUsCss.about_us_section_banner_img}
            alt="About Banner Image"
            priority
          ></Image>
        </div>

        <Container>
          <h3 className={AboutUsCss.about_us_vacation_center_main_heading}>
            Nirvana for the Golf Vacation Renter!
          </h3>
          {/* VACATION CENTER SECTION */}
          <Row>
            <Col md={4}>
              <div className={AboutUsCss.about_us_vacation_center_cols_div}>
                <h5
                  className={AboutUsCss.about_us_vacation_center_cols_headings}
                >
                  Searchability
                </h5>
                <p className={AboutUsCss.about_us_vacation_center_cols_para}>
                  Search Ventify venue-homes by location, number of allowable event guests, or amenity.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className={AboutUsCss.about_us_vacation_center_cols_div}>
                <h5
                  className={AboutUsCss.about_us_vacation_center_cols_headings}
                >
                  Partner Resources + Discounts
                </h5>
                <p className={AboutUsCss.about_us_vacation_center_cols_para}>
                  Our platform is an event community, not just a superior database. Enjoy wedding and travel
                  articles, partner company discounts and other exclusive content and resources.

                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className={AboutUsCss.about_us_vacation_center_cols_div}>
                <h5
                  className={AboutUsCss.about_us_vacation_center_cols_headings}
                >
                  Easy to Host!
                </h5>
                <p className={AboutUsCss.about_us_vacation_center_cols_para}>
                  The privacy factor, the wow factor...
                </p>
                <p className={AboutUsCss.about_us_vacation_center_cols_para}>
                  The demand for private and unique event locations has planners increasingly turning their
                  attention to private home and estate venues. As the luster of typical banquet halls and hotel
                  ballrooms fade, the need grows for an organized platform containing the world’s most amazing
                  event-quality/permissible private residences
                </p>

                {showMore ? (
                  <>
                    <p className={AboutUsCss.about_us_vacation_center_cols_para}>
                      Our qualified team of industry experts is vetting a wide array of private event-ready homes,
                      historical residences, penthouses and estates from around the world. These luxe and
                      picturesque abodes can elevate the backdrop of your event, while maximizing safety,
                      cleanliness and operating standards so your loved ones can celebrate with elegance and peace
                      of mind.
                    </p>
                    <p className={AboutUsCss.about_us_vacation_center_cols_para}>
                      Whether you’re looking to host your guests in a quaint backyard or on a private-island estate,
                      look no further than Ventify.
                    </p>
                  </>
                ) : ``}
                <div className="cursor-pointer text-decoration-underline" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</div>

              </div>
            </Col>
          </Row>
        </Container>
        {/* ABOUT VENTIFY SECTION */}
        <div className={AboutUsCss.about_golfhom_section}>
          <Container>
            <div className={AboutUsCss.about_golfhom_main_container}>
              <h3 className={AboutUsCss.about_golfhom_heading}>
                About ventify.com
              </h3>
              <p className={AboutUsCss.about_golfhom_para}>
                Welcome to {process.env.NEXT_PUBLIC_APP_NAME}, your new haven for discovering the perfect
                golf vacation rental. Say goodbye to the days of tirelessly
                sorting through irrelevant results on generic vacation websites.
                Instead, allow yourself to dive into a platform meticulously
                curated for passionate golf enthusiasts.
              </p>

              <p className={AboutUsCss.about_golfhom_para}>
                {" "}
                At {process.env.NEXT_PUBLIC_APP_NAME}, we recognize your passion for golf and that's why
                we've custom-built our search algorithm to cater to your
                specific needs. We offer you exclusive access to a premium
                selection of golf course-proximate homes, condos, and villas.
                Whether you prefer searching by course, tournament, or city, we
                make the quest for your next golf vacation rental a breeze,
                ensuring it's as enjoyable as the sport you love.
              </p>

              <p className={AboutUsCss.about_golfhom_para}>
                {" "}
                Your safety and convenience are of paramount importance to us.
                Once you've found your ideal golf stay, you can secure your
                booking seamlessly. We've partnered with trusted payment
                platform, Stripe, to facilitate a smooth and secure checkout
                process.
              </p>

              <p className={AboutUsCss.about_golfhom_para}>
                But we don't stop at providing incredible rentals. Understanding
                that a golf vacation encapsulates more than just the stay, we
                offer an assortment of complementary services, all without the
                need to leave the platform.
              </p>

              <p className={AboutUsCss.about_golfhom_para}>
                {" "}
                Ship your clubs conveniently via Ship Sticks, leaving behind any
                concerns about transporting your valued golf gear. Effortlessly
                organize your group's tee time and plot your games to optimize
                your vacation. Looking to improve your swing? Tap into our
                online training resources and sharpen your skills before
                stepping onto the green.
              </p>

              <p className={AboutUsCss.about_golfhom_para}>
                {" "}
                A great golf experience necessitates the right gear. On {process.env.NEXT_PUBLIC_APP_NAME},
                you have the ability to shop from our partner golf swag,
                ensuring you're well-equipped to make your golf trip memorable.
                While you're at it, immerse yourself in our wide range of golf
                articles. Stay updated on the latest trends, tips, and tricks in
                the golf world, amplifying your enjoyment of your favorite
                sport.
              </p>

              <p className={AboutUsCss.about_golfhom_para}>
                {" "}
                At {process.env.NEXT_PUBLIC_APP_NAME}, we're not merely a platform for locating rentals.
                We're dedicated to crafting a comprehensive golf travel
                experience. We're redefining how golf travelers find and book
                their luxury rentals - creating an experience that's as
                sophisticated, exclusive, and enjoyable as the game of golf
                itself!
              </p>
            </div>
          </Container>
        </div>

        {/* STAFF CARD SECTION */}
        <Container>
          <div>
            <div className={AboutUsCss.viewText}>
              <h3 className={AboutUsCss.staffCard_title}>
                From the {process.env.NEXT_PUBLIC_APP_NAME} Staff and Guest Writers
              </h3>

              <Link href="/blog" className={AboutUsCss.linkUnderline}>
                <div className={AboutUsCss.viewallBtnParent}>
                  <Button className={AboutUsCss.viewallBtn}>View All</Button>
                </div>
              </Link>
            </div>
            <Review reviews={review} />
          </div>
        </Container>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </div>
    </>
  );
};

export default About;
