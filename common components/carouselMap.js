import { useState } from "react";
import CarouselMapCss from "../src/styles/CarouselMap.module.css";
import { Carousel, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import HotelA from "../public/images/vector/dot.svg";
import Heart from "../public/images/vector/dot.svg";
import Dot from "../public/images/vector/dot.svg";

// HERE
const CarouselMap = () => {
  const [indexA, setIndexA] = useState(0);

  const handleSelectA = (selectedIndex) => {
    setIndexA(selectedIndex);
  };

  const [indexB, setIndexB] = useState(0);

  const handleSelectB = (selectedIndex) => {
    setIndexB(selectedIndex);
  };

  const [indexC, setIndexC] = useState(0);

  const handleSelectC = (selectedIndex) => {
    setIndexC(selectedIndex);
  };

  const [indexD, setIndexD] = useState(0);

  const handleSelectD = (selectedIndex) => {
    setIndexD(selectedIndex);
  };

  const [indexE, setIndexE] = useState(0);

  const handleSelectE = (selectedIndex) => {
    setIndexE(selectedIndex);
  };

  const [indexF, setIndexF] = useState(0);

  const handleSelectF = (selectedIndex) => {
    setIndexF(selectedIndex);
  };

  const [indexG, setIndexG] = useState(0);

  const handleSelectG = (selectedIndex) => {
    setIndexG(selectedIndex);
  };

  const [indexH, setIndexH] = useState(0);

  const handleSelectH = (selectedIndex) => {
    setIndexH(selectedIndex);
  };

  return (
    <>
      <Row>
        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexA}
            onSelect={handleSelectA}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelA}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                  priority
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelA}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelA}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexA === 0 ? "active" : ""}
                onClick={() => setIndexA(0)}
              ></li>
              <li
                className={indexA === 1 ? "active" : ""}
                onClick={() => setIndexA(1)}
              ></li>
              <li
                className={indexA === 2 ? "active" : ""}
                onClick={() => setIndexA(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h5 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h5>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>
        {/* 
        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexB}
            onSelect={handleSelectB}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelB}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelB}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelB}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexB === 0 ? "active" : ""}
                onClick={() => setIndexB(0)}
              ></li>
              <li
                className={indexB === 1 ? "active" : ""}
                onClick={() => setIndexB(1)}
              ></li>
              <li
                className={indexB === 2 ? "active" : ""}
                onClick={() => setIndexB(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col> */}
      </Row>

      {/* <Row>
        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexC}
            onSelect={handleSelectC}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelC}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelC}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelC}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexC === 0 ? "active" : ""}
                onClick={() => setIndexC(0)}
              ></li>
              <li
                className={indexC === 1 ? "active" : ""}
                onClick={() => setIndexC(1)}
              ></li>
              <li
                className={indexC === 2 ? "active" : ""}
                onClick={() => setIndexC(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>

        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexD}
            onSelect={handleSelectD}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexD === 0 ? "active" : ""}
                onClick={() => setIndexD(0)}
              ></li>
              <li
                className={indexD === 1 ? "active" : ""}
                onClick={() => setIndexD(1)}
              ></li>
              <li
                className={indexD === 2 ? "active" : ""}
                onClick={() => setIndexD(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexE}
            onSelect={handleSelectE}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelC}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelC}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelC}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexE === 0 ? "active" : ""}
                onClick={() => setIndexE(0)}
              ></li>
              <li
                className={indexE === 1 ? "active" : ""}
                onClick={() => setIndexE(1)}
              ></li>
              <li
                className={indexE === 2 ? "active" : ""}
                onClick={() => setIndexE(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>

        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexF}
            onSelect={handleSelectF}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexF === 0 ? "active" : ""}
                onClick={() => setIndexF(0)}
              ></li>
              <li
                className={indexF === 1 ? "active" : ""}
                onClick={() => setIndexF(1)}
              ></li>
              <li
                className={indexF === 2 ? "active" : ""}
                onClick={() => setIndexF(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki.
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexG}
            onSelect={handleSelectG}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={beachView}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={beachView}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={beachView}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexG === 0 ? "active" : ""}
                onClick={() => setIndexG(0)}
              ></li>
              <li
                className={indexG === 1 ? "active" : ""}
                onClick={() => setIndexG(1)}
              ></li>
              <li
                className={indexG === 2 ? "active" : ""}
                onClick={() => setIndexG(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>

        <Col md={6} className={CarouselMapCss.carouselBlock}>
          <Carousel
            wrap={true}
            activeIndex={indexH}
            onSelect={handleSelectH}
            indicators={false}
            interval={5000}
            className={CarouselMapCss.carouselParent}
          >
            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>

            <Carousel.Item className={CarouselMapCss.imageGap}>
              <Link href="/search/view_property">
                <Image
                  src={HotelD}
                  alt="Hotel View"
                  fill
                  className={CarouselMapCss.carouselImage}
                ></Image>
              </Link>

              <div className={CarouselMapCss.heartParent}>
                <Link href="/search/view_property">
                  <Image
                    src={Heart}
                    alt="Heart"
                    fill
                    className={CarouselMapCss.heart}
                  ></Image>
                </Link>
              </div>
            </Carousel.Item>
            <ol className="carousel-indicators">
              <li
                className={indexH === 0 ? "active" : ""}
                onClick={() => setIndexH(0)}
              ></li>
              <li
                className={indexH === 1 ? "active" : ""}
                onClick={() => setIndexH(1)}
              ></li>
              <li
                className={indexH === 2 ? "active" : ""}
                onClick={() => setIndexH(2)}
              ></li>
            </ol>
          </Carousel>

          <Link href="/search/view_property" style={{ textDecoration: "none" }}>
            <h4 className={CarouselMapCss.carouselHeading}>
              Hotel Empire Moscow Sokoliki
            </h4>
          </Link>
          <p className={CarouselMapCss.discribeOfCard}>
            Saddlebrook Resort - Saddlebrook & 1 more
          </p>

          <div>
            <span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
            <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
            <span className={CarouselMapCss.discribeOfCard}>
              8 Guests Villa
            </span>
          </div>
        </Col>
      </Row> */}
    </>
  );
};

export default CarouselMap;
