/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import HomeCss from "../../styles/Home.module.css";
import Slider from "../../slider";
import slides from "../../pages/json/countries.json";
import { Container, Col, Row, Card } from "react-bootstrap";
import ads from "../../pages/json/ads.json";
import Advertise from "../../advertise";
import Image from "next/image";
import { Input, message, Button, DatePicker, Skeleton } from "antd";
const { RangePicker } = DatePicker;
import Video from "../../video";
import video from "../../pages/json/video.json";
import Review from "../../review";
import review from "../../pages/json/review.json";
import Link from "next/link";
import axios from "axios";
import dayjs from "dayjs";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
const placesLibrary = ["places"];
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const SearchByGolfCourse = dynamic(
  () => import("../../../common components/SearchByGolfCourse"),
  {
    suspense: true,
  }
);

const Home = () => {
  const Router = useRouter();
  const [searchResult, setSearchResult] = useState("");
  const [UrlParamsDateRange, setUrlParamsDateRange] = useState([]);
  const [UrlParamsGeoData, setUrlParamsGeoData] = useState({
    latitude: "",
    longitude: "",
    location_name: "",
  });
  const [InputValue, setInputValue] = useState("");
  const [AllPropertyData, setAllPropertyData] = useState([]);
  const [NightsCounter, setNightsCounter] = useState(0);
  const [IsLoading, setIsLoading] = useState(false);

  const [startDt, setStartDt] = useState();

  useEffect(() => {
    const GetPropDataFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL
          }/v1/property?limit=6&latitude=${33.6890603}&longitude=${-78.8866943}&status=active`
        );
        if (GetPropertyDataRes.status === 200) {
          setAllPropertyData(GetPropertyDataRes.data.data);
        }
      } catch (error) { }
    };
    GetPropDataFunc();

    return () => {
      GetPropDataFunc();
    };
  }, []);

  // FOR ADULT BUTTON INCREMENT AND DECREMENT
  const [adult, setAdult] = useState(0);
  // FOR CHILD BUTTON INCREMENT AND DECREMENT
  const [child, setChild] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: placesLibrary,
  });

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      setUrlParamsGeoData({
        latitude: place.geometry?.location.lat(),
        longitude: place.geometry?.location.lng(),
        location_name: formattedAddress,
      });

      setInputValue(formattedAddress);
    } else {
      message.error("Please enter text");
    }
  };

  // DROPDOWN FOR SEARCH

  const OnChangeDateRange = (LocationName, DateValue) => {
    const startDate = dayjs(DateValue[0]); // Replace with your start date
    const endDate = dayjs(DateValue[1]); // Replace with your end date


    setNightsCounter(endDate.diff(startDate, "days") || 0);
    setUrlParamsDateRange(DateValue);
  };

  const OnCalendarDateSelect = (event, SelectedDate) => {
    setStartDt(dayjs(SelectedDate?.[0]).format("YYYY-MM-DD"));
  };

  const incAdult = () => {
    setAdult(adult + 1);
  };

  const decAdult = () => {
    if (adult > 0) {
      setAdult(adult - 1);
    } else {
      message.error("Sorry, the number of adults cannot be less than 0.");
      setAdult(0);
    }
  };

  const incChild = () => {
    setChild(child + 1);
  };

  const decChild = () => {
    if (child > 0) {
      setChild(child - 1);
    } else {
      message.error("Sorry, the number of childs cannot be less than 0.");
      setChild(0);
    }
  };
  const OnSearchInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const SearchProperty = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (UrlParamsGeoData?.location_name === "") {
      message.error("Please fill the destination field");
      setIsLoading(false);

      return;
    } else {
      Router.push(
        `/search?latitude=${encodeURIComponent(
          UrlParamsGeoData?.latitude
        )}&longitude=${encodeURIComponent(
          UrlParamsGeoData?.longitude
        )}&location_name=${UrlParamsGeoData?.location_name
        }&nights=${NightsCounter}&guest=${encodeURIComponent(
          adult + child
        )}&adults=${encodeURIComponent(adult)}&childs=${encodeURIComponent(
          child
        )}&from=${UrlParamsDateRange[0]
          ? UrlParamsDateRange[0]
          : ""
        }&to=${UrlParamsDateRange[1]
          ? UrlParamsDateRange[1]
          : ""
        } `
      );
    }
  };

  const LatitudeSaoPaul = -23.533773;
  const LongitudeSaoPaul = -46.62529;
  const SpainMadridLatitude = 40.416775;
  const SpainMadridLongitude = -3.70379;
  const AnaheimLatitude = 33.835293;
  const AnaheimLongitude = -117.914505;

  const meta_data = {
    title: `Discover Luxury Golf Vacation Rentals`,
    description: `The privacy factor, the wow factor...The demand for private and unique event locations has planners increasingly turning their attention to private home and estate venues. As the luster of typical banquet halls and hotel ballrooms fade, the need grows for an organized platform containing the world’s most amazing event - quality / permissible private residences.Los Angeles, Charleston, Miami, Chicago; whether you’re looking to host your guests in a quaint backyard or on a private island estate, look no further than Ventify.`,
    image: "http://ventify.com/images/logo-large.png"
  };

  return (
    <>
      <Head>
        <title>{`Ventify | ${meta_data.title} `}</title>
        <meta name="description" content={`${meta_data.description} `} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta itemprop="name" content={`Ventify | ${meta_data.title} `} />
        <meta itemprop="description" content={`${meta_data.description} `} />
        <meta itemprop="image" content={`${meta_data.image} `} />

        <meta property="og:url" content="https://ventify.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Ventify | ${meta_data.title} `} />
        <meta property="og:description" content={`${meta_data.description} `} />
        <meta property="og:image" content={`${meta_data.image} `} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Ventify | ${meta_data.title} `} />
        <meta name="twitter:description" content={`${meta_data.description} `} />
        <meta name="twitter:image" content={`${meta_data.image} `} />
      </Head>

      {/* ---------------------------------          NAVBAR SECTION               -------------------------------    */}

      <div className={HomeCss.search_bar_img_div}>
        <div className={HomeCss.overlay}></div>
        <video
          src={`https://d1mwue7bd0e04p.cloudfront.net/videos/home_video.mp4`}
          autoPlay
          loop
          muted
          className={HomeCss.videoPlay}
        >
          <source src="/videos/home_video.mp4" type="video/mp4" />
        </video>
        <div className={HomeCss.search_bar_main_container}>
          <div className={HomeCss.search_bar_container}>
            <Row className={HomeCss.searchBar}>
              <Col lg={3} md={4} className={HomeCss.search_cols_4}>
                <div className={HomeCss.inner_input_container}>
                  <div className={HomeCss.image_destination}>
                    <Row style={{ alignItems: "center" }}>
                      <Col xs={"auto"}>
                        <div className={HomeCss.inner_icon_container}>
                          <Image
                            width={25}
                            height={25}
                            src="/images/vector/location.svg"
                            alt="Location Image"
                          ></Image>
                        </div>
                      </Col>

                      <Col>
                        <h6 className={HomeCss.destination}>
                          Destination
                          <sup className={HomeCss.important_input_mark}>
                            *
                          </sup>{" "}
                        </h6>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    {isLoaded ? (
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
                          className={HomeCss.inner_input_box}
                          size="large"
                          value={InputValue}
                          onChange={OnSearchInputChange}
                          name="search_input"
                          placeholder="Where you want to stay"
                        />
                      </Autocomplete>
                    ) : (
                      <Skeleton.Input
                        active={true}
                        size={"mid"}
                        className={HomeCss.input_skeleton}
                      />
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={3} md={4} className={HomeCss.search_cols_4}>
                <div className={HomeCss.inner_main_container}>
                  <div className={HomeCss.inner_input_container}>
                    <Row style={{ alignItems: "center" }}>
                      <Col xs={"auto"}>
                        <div className={HomeCss.inner_icon_container}>
                          <Image
                            className={HomeCss.location}
                            width={35}
                            height={35}
                            src="/images/vector/family_search_icon.svg"
                            alt="family Image"
                          ></Image>
                        </div>
                      </Col>

                      <Col>
                        <h6 className={HomeCss.destination}>
                          {adult + child} Guests
                        </h6>
                      </Col>
                    </Row>

                    <div className={HomeCss.inner_input_guest_selector}>
                      <div className={HomeCss.geust_incri_btns_div}>
                        <p className={HomeCss.geust_incri_btns_p}>Adult</p>
                        <Button className={HomeCss.increaseAdult}>
                          <div
                            className={HomeCss.decreasebtn}
                            onClick={decAdult}
                          >
                            -
                          </div>
                          <div className={HomeCss.guest_count_div}>{adult}</div>
                          <div
                            className={HomeCss.increasebtn}
                            onClick={incAdult}
                          >
                            +
                          </div>
                        </Button>
                      </div>

                      <div className={HomeCss.geust_incri_btns_div}>
                        <p className={HomeCss.geust_incri_btns_p}>Children</p>
                        <Button className={HomeCss.increaseAdult}>
                          <div
                            className={HomeCss.decreasebtn}
                            onClick={decChild}
                          >
                            -
                          </div>
                          <div className={HomeCss.guest_count_div}>{child}</div>
                          <div
                            className={HomeCss.increasebtn}
                            onClick={incChild}
                          >
                            +
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                lg={3}
                md={4}
                className={`${HomeCss.search_cols_4} ${HomeCss.search_bar_nights_col} `}
              >
                <div className={HomeCss.inner_main_container}>
                  <div className={HomeCss.inner_input_containerNight}>
                    <Row style={{ alignItems: "center" }}>
                      <Col xs={"auto"}>
                        <div className={HomeCss.inner_icon_container}>
                          <Image
                            className={HomeCss.location}
                            width={25}
                            height={25}
                            src="/images/vector/calender.svg"
                            alt="Calender Image"
                          ></Image>
                        </div>
                      </Col>
                      <Col>
                        <h6 className={HomeCss.destination}>
                          {NightsCounter} Nights
                        </h6>
                      </Col>
                    </Row>
                    <div className={HomeCss.inner_input_date_picker}>
                      <RangePicker
                        style={{
                          borderColor: "var(--btn-background-secondary)",
                        }}
                        size="large"
                        format={"MM-DD-YYYY"}
                        disabledDate={(current) => {

                          const formattedDate = current.format("YYYY-MM-DD");
                          if (formattedDate === startDt) {
                            return true;
                          }
                          return current && current < dayjs().startOf("day");
                        }}
                        onChange={OnChangeDateRange}
                        onCalendarChange={OnCalendarDateSelect}
                        className={HomeCss.inner_input_date_picker}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} className={HomeCss.search_btn_col}>
                <div className={HomeCss.search_btn_container}>
                  <Button
                    loading={IsLoading}
                    onClick={SearchProperty}
                    className={HomeCss.search_btn}
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/*  ----------------------------             SWIPER CONTAINER           -------------------------   */}

      <Container>
        <div className={HomeCss.golfCourses}>
          {/* <h3 className={HomeCss.main_golfHeading}>
            Find Great Vacation Rentals near Florida, Arizona, Hawaii & South
            Carolina
          </h3> */}
          <h1 className={HomeCss.golfHeading}>Find unique, event friendly homes, villas and estates</h1>
          <br />
          <p className={HomeCss.para}>
            The privacy factor, the wow factor…
          </p>
          <p className={HomeCss.para}>
            The demand for private and unique event locations has planners increasingly turning their
            attention to private home and estate venues. As the luster of typical banquet halls and hotel
            ballrooms fade, the need grows for an organized platform containing the world’s most amazing
            event-quality/permissible private residences.

          </p>

          <Row style={{ alignItems: "center" }}>
            <Col md={9}>
              <p className={HomeCss.para} style={{ marginBottom: 0 }}>
                Los Angeles, Charleston, Miami, Chicago; whether you’re looking to host your guests in a
                quaint backyard or on a private island estate, look no further than {process.env.NEXT_PUBLIC_APP_NAME}.

              </p>
            </Col>

            <Col md={3}>
              <span
                onClick={(e) => {
                  Router.push({
                    pathname: `search/view_all_property`,
                    query: {
                      latitude: 27.994402,
                      longitude: -81.760254,
                    },
                  });
                }}
              >
                <div className={HomeCss.viewallBtnParent}>
                  <Button className={HomeCss.viewallBtn}>View All</Button>
                </div>
              </span>
            </Col>
          </Row>
        </div>

        <Slider slides={slides} />
      </Container>

      {/* SEARCH BY GOLF COURSE  */}
      {/* <SearchByGolfCourse /> */}
      {/* SEARCH BY GOLF COURSE  */}

      {/* --------------------------------------    RESERVE A FEATURED   -----------------------------   */}

      {/*//!ORIGINAL  DATA */}
      <div div className={HomeCss.cardBg}>
        <Container>
          <h3 className={HomeCss.cardHeading}>Reserve a Featured {process.env.NEXT_PUBLIC_APP_NAME}</h3>
          <Row>
            {AllPropertyData.map((data, i) => {
              return (
                <Col md={5} lg={4} key={i}>
                  <Card
                    onClick={() => {
                      Router.push(
                        `search/${data.slug}`
                      );
                    }}
                    className={HomeCss.MainCard}
                  >
                    <Card.Img
                      variant="top"
                      className={HomeCss.cardImg}
                      src={
                        data.imageUrl
                          ? data.imageUrl
                          : "/images/noImageFound.png"
                      }
                      alt="Property Image"
                    />
                    <Card.Body>
                      <Card.Title className={HomeCss.cardImgTitle}>
                        {data.name}
                      </Card.Title>

                      <div>
                        <div className={HomeCss.icon}>
                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/bed.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.bedrooms ? data.bedrooms : 1} Bed Rooms
                            </span>
                          </div>

                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/bath-tub.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.bathrooms ? data.bathrooms : 1} Baths
                            </span>
                          </div>

                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/guest.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.accomodation ? data.accomodation : 1} Guests
                              Villa
                            </span>
                          </div>
                        </div>

                        <div className={HomeCss.parking}>
                          <Image
                            width={20}
                            height={14}
                            className={HomeCss.rightArrow}
                            src="./images/vector/right_arrow.svg"
                            alt="iconImage"
                          ></Image>
                        </div>
                      </div>
                    </Card.Body>
                  </Card >
                </Col >
              );
            })}
          </Row >
        </Container >
      </div >

      {/*//! TEMPRORY NEXT PAX DATA  FOR DEMO */}
      {/* <div div className={HomeCss.cardBg}>
        <Container>
          <h3 className={HomeCss.cardHeading}>Reserve a Featured {process.env.NEXT_PUBLIC_APP_NAME}</h3>
          <Row>
            {AllPropertyData.map((data, i) => {
              return (
                <Col md={5} lg={4} key={i}>
                  <Card
                    onClick={() => {
                      Router.push(
                        `search/${encodeURIComponent(data.name)}/${data.id}`
                      );
                    }}
                    className={HomeCss.MainCard}
                  >
                    <Card.Img
                      variant="top"
                      className={HomeCss.cardImg}
                      src={
                        data.imageUrl
                          ? data.imageUrl
                          : "/images/noImageFound.png"
                      }
                      alt="Bed Image"
                    />
                    <Card.Body>
                      <Card.Title className={HomeCss.cardImgTitle}>
                        {`${data.name} (${data.externalPropertyType})`}
                      </Card.Title>

                      <div>
                        <p className={HomeCss.saddle}>
                          {" "}
                          Saddlebrook Resort - Saddlebrook & 1 more
                        </p>

                        <div className={HomeCss.icon}>
                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/bed.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.bedrooms ? data.bedrooms : 1} Bed Rooms
                            </span>
                          </div>

                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/bath-tub.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.bathrooms ? data.bathrooms : 1} Baths
                            </span>
                          </div>

                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/guest.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.accomodation ? data.accomodation : 1} Guests
                              Villa
                            </span>
                          </div>
                        </div>

                        <div className={HomeCss.parking}>
                          <Image
                            width={20}
                            height={14}
                            className={HomeCss.rightArrow}
                            src="./images/vector/right_arrow.svg"
                            alt="iconImage"
                          ></Image>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div> */}

      {/* ------------------------------        GOLFING AND TRAVELING     ------------------------  */}

      <div className={HomeCss.ads}>
        <Container >
          <h3 className={HomeCss.adsTitle}>
            Golfing and Traveling, Both Better with Friends
          </h3>

          <Advertise ads={ads} />
        </Container>
      </div>


      {/* ------------------------------           TRAINING VIDEOS          ---------------------------   */}

      {/* <Container>
        <h3 className={HomeCss.golf_training_heading}>Jake Hutt Golf Raps</h3>
        <div className={HomeCss.paraBtn}>
          <p className={HomeCss.paratext}>
            Explore the infinite whys and hows of the golf swing with our
            partner, Jake Hutt - PGA Instructor. Follow our good friend Jake at
            @
            <Link
              href="https://www.instagram.com/jakehuttgolf"
              target="_blank"
              className={HomeCss.account_link}
            >
              jakehuttgolf
            </Link>
          </p>
        </div>

        <Video videos={video} />
      </Container> */}

      {/* ------------------------------          STAFF N WRITERS          ----------------------------- */}

      <Container>
        <Row>
          <Col md={8} className={HomeCss.staffCard_title_main_container}>
            <h3 className={HomeCss.staffCard_title}>
              From the {process.env.NEXT_PUBLIC_APP_NAME} Staff and Guest Writers
            </h3>
          </Col>

          <Col md={4} className={HomeCss.viewallBtnParent}>
            <Link href="/blog" className={HomeCss.viewallBtn_link}>
              <Button className={HomeCss.viewallBtn}>View All</Button>
            </Link>
          </Col>
        </Row>
        <Review reviews={review} />
      </Container>

      <BottomSection />
    </>
  );
};

export default Home;
