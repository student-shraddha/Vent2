/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import React from "react";
import SearchIndexCss from "../../styles/SearchIndex.module.css";
import {
  Button,
  Dropdown,
  Space,
  message,
  Pagination,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Image from "next/image";
import CarasoulMapCss from "../../styles/CarouselMap.module.css";
import Dot from "../../../public/images/vector/dot.svg";
import PropNotFoundImg from "../../../public/images/vector/golf-hole.png";
import Loader from "../../../common components/loader";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const placesLibrary = ["places"];
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);



const Map = dynamic(() => import("../../../common components/map"), { ssr: false })
const Index = ({ query }) => {
  const Router = useRouter();

  const initPage = Number(query.page || 1)
  const distance = 100; // In km
  const limitPerPage = 16; // 16 by defaut
  const [PropertyData, SetPropertyData] = useState([]);
  const [allPropertyData, setAllPropertyData] = useState([]);
  const [allAggregatedPropertyData, setAllAggregatedPropertyData] = useState([]);
  const [PaginationState, setPagination] = useState(initPage);
  const [Parentindex, setParentindex] = useState([]);

  const [SortBy, setSortBy] = useState(""); //updatedAt
  const [SortByParam, setSortByParam] = useState("");

  const [Available, setAvailable] = useState(false);
  const [AvailabilityCalender, setAvailabilityCalender] = useState([{}]);
  const [UpdateSortByText, setUpdateSortByText] = useState("Default");//Date New to Old
  const [TotalDataCount, setTotalDataCount] = useState();
  const param = query;
  const [IsLoaderVisible, setIsLoaderVisible] = useState(true);

  const [UrlParamsGeoData, setUrlParamsGeoData] = useState({
    latitude: param.latitude,
    longitude: param.longitude,
    location_name: param.location_name,
  });
  // FOR ADULT BUTTON INCREMENT AND DECREMENT
  const [adult, setAdult] = useState(0);
  // FOR CHILD BUTTON INCREMENT AND DECREMENT
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [pet, setPet] = useState(0);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  //   libraries: placesLibrary,
  // });

  const [InputValue, setInputValue] = useState(
    param.location_name ? param.location_name : ""
  );

  const [golfInputValue, setGolfInputValue] = useState(
    param.location_name ? param.location_name : ""
  );


  const [isOtherProperties, setIsOtherProperties] = useState(false);

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };


  const [DateInputValues, setDateInputValues] = useState([
    dayjs(param.from).format("MM-DD-YYYY"),
    dayjs(param.to).format("MM-DD-YYYY"),
  ]);

  //* THIS USE EFFECT WILL SET THE URL PARAM DATES IN ANTD CALENDAR
  useEffect(() => {
    if (Available) {
      const LengthOfAvailDate = AvailabilityCalender?.length - 1;
      const StartDate = dayjs(AvailabilityCalender[0]._attributes?.Date).format(
        "MM-DD-YYYY"
      );
      const LastDate = dayjs(
        AvailabilityCalender[LengthOfAvailDate]._attributes?.Date
      ).format("MM-DD-YYYY");

      setDateInputValues([
        dayjs(StartDate).format("MM-DD-YYYY"),
        dayjs(LastDate).format("MM-DD-YYYY"),
      ]);
    }
    return () => { };
  }, [Available, AvailabilityCalender]);

  const [isEditable, setIsEditable] = useState(false);



  const getAllOtherProperties = async () => {
    setPagination(initPage);
    const queryParams = {
      latitude: param.latitude,
      longitude: param.longitude,
      distance: distance,
      accomodation: param.guest || "",
      status: "active",
    };

    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/property/getAll?${queryParamsString}`
    ).then((response) => {
      if (response.status === 200) {

        // to filter properties price with zero
        let properties = response.data.data.filter((property) => {
          let isValid = true;

          if (!(Number(property.price) > 0)) {
            isValid = false;
          }
          if (param?.guest && param?.guest > property.accomodation) {
            isValid = false;
          }
          if (property?.status && property?.status != 'active') {
            isValid = false;
          }
          return isValid;
        });


        setAllPropertyData(properties);
        setTotalDataCount(properties.length);
        setIsLoaderVisible(false);
      }
    }).catch((err) => { });
  }

  // Fetch all properties
  const getAllProperties = async () => {

    setPagination(initPage);

    const queryParams = {
      latitude: param.latitude,
      longitude: param.longitude,
      distance: distance,
      accomodation: param.guest || "",
      from: dayjs(param.from).format("YYYY-MM-DD") || "",
      to: dayjs(param.to).format("YYYY-MM-DD") || "",
      status: "active",
      "price[gt]": 0
    };

    const urlSearchParams = new URLSearchParams(queryParams);
    const queryParamsString = urlSearchParams.toString();
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/property/getAvailableProperty?${queryParamsString}`
    ).then((response) => {
      if (response.status === 200) {

        // to filter properties price with zero
        let properties = response.data.data.rows.filter((property) => {
          return Number(property.price) > 0;
        });

        if (properties.length) {
          setAllPropertyData(properties);
          setTotalDataCount(properties.length);
          setIsLoaderVisible(false);
        } else {
          setIsOtherProperties(true);
          getAllOtherProperties();
        }
      }
    }).catch((err) => { });
  }


  // aggregate properties properties
  useEffect(() => {
    aggregateProperties();
  }, [allPropertyData]);


  // change pagination link
  const OnPaginationChange = async (pageNumber) => {

    Router.push({
      pathname: Router.pathname,
      query: { ...query, page: pageNumber },
    })

    let startIndex = (pageNumber - 1) * limitPerPage;
    let endIndex = startIndex + limitPerPage;

    SetPropertyData(allAggregatedPropertyData.slice(startIndex, endIndex));
    setPagination(pageNumber);
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // set current page properties
  useEffect(() => {

    setPagination(initPage);

    let startIndex = (initPage - 1) * limitPerPage;
    let endIndex = startIndex + limitPerPage;
    SetPropertyData(allAggregatedPropertyData.slice(startIndex, endIndex))//limitPerPage
  }, [allAggregatedPropertyData]);

  const aggregateProperties = () => {

    if (SortBy) {
      setAllAggregatedPropertyData((prev) => {
        let properties = [...allPropertyData];

        if (SortBy === "price") {
          if (SortByParam === "ASC") {
            properties.sort(function (a, b) { return a.price - b.price });
          } else {
            properties.sort(function (a, b) { return b.price - a.price });
          }
        } else if (SortBy === "updatedAt") {
          if (SortByParam === "ASC") {
            properties.sort(function (a, b) { return dayjs(a.updatedAt) - dayjs(b.updatedAt) });
          } else {
            properties.sort(function (a, b) { return dayjs(b.updatedAt) - dayjs(a.updatedAt) });
          }
        }
        return properties;
      });
    } else {
      setAllAggregatedPropertyData((prev) => {
        let properties = [...allPropertyData];
        return properties;
      });
      SetPropertyData(allAggregatedPropertyData.slice((PaginationState - 1), limitPerPage))//limitPerPage
    }
  }

  // on change sorting - handle properties
  useEffect(() => {
    aggregateProperties();
  }, [
    SortBy,
    SortByParam,
  ]);

  //* THIS WILL CALL  FIRST COMPONENT LOAD
  useEffect(() => {

    if (param?.latitude && param?.longitude) {
      setIsLoaderVisible(true)

      if (param?.from && param?.to) {
        getAllProperties();
      } else {
        getAllOtherProperties();
      }
    }

    return () => {
      setAllPropertyData([]);
      setAllAggregatedPropertyData([]);
    };
  }, [
    param.from,
    param.guest,
    param.latitude,
    param.to,
    param.longitude,
  ]);



  useEffect(() => {
    if (param.adults || param.childs) {
      setAdult(parseInt(param.adults));
      setChild(parseInt(param.childs));
    }
    // setInputValue(param.location_name);
    setGolfInputValue(param.location_name);
  }, [param]);


  const incInfant = () => {
    setInfant(infant + 1);
  };

  const decInfant = () => {
    if (infant > 0) {
      setInfant(infant - 1);
    } else {
      message.error("Sorry number of infant can not be less than 0");
      setInfant(0);
    }
  };

  const incPet = () => {
    setPet(pet + 1);
  };

  const decPet = () => {
    if (pet > 0) {
      setPet(pet - 1);
    } else {
      message.error("Sorry number of pet can not be less than 0");
      setPet(0);
    }
  };

  const incAdult = () => {
    setAdult(adult + 1);
  };

  const decAdult = () => {
    if (adult > 0) {
      setAdult(adult - 1);
    } else {
      message.error("Sorry number of adults can not be less than 0");
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
      message.error("Sorry number of children can not be less than 0");
      setChild(0);
    }
  };




  const onClick = (event) => {
    setSortBy(event.key);
    if (event.key === "price_low") {
      setSortBy("price");
      // setSortByParam("&sortBy=ASC");
      setSortByParam("ASC");
      setUpdateSortByText("Price (Low to High)");
    } else if (event.key === "price_high") {
      setSortBy("price");
      // setSortByParam("&sortBy=DESC");
      setSortByParam("DESC");
      setUpdateSortByText("Price (High to Low)");
    } else if (event.key === "updatedAt_old_to_new") {
      setSortBy("updatedAt");
      // setSortByParam("&sortBy=ASC");
      setSortByParam("ASC");
      setUpdateSortByText("Date Old to New");
    } else if (event.key === "updatedAt_new_to_old") {
      setSortBy("updatedAt");
      // setSortByParam("&sortBy=DESC");
      setSortByParam("DESC");
      setUpdateSortByText("Date New to Old");
    } else {
      setSortBy("");
      setSortByParam("");
      setUpdateSortByText("Default");
    }
  };



  const CustomImage = ({ data, element, ind }) => {
    const [error, setError] = useState(false);

    return (
      <Image
        key={`${data.id}-${ind}`}
        // loading={"lazy"}
        blurDataURL={"data:image/png;base64,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"}
        placeholder="blur"
        src={(error ? "/images/noImageFound.png" : element)}
        // src={(element)}
        quality={50}
        // priority={ind}
        // src={
        //   element
        //     ? element
        //     : "/images/noImageFound.png"
        // }
        alt={`image ${data.id}-${ind}`}
        fill="true"
        className={CarasoulMapCss.carouselImage}
        priority={ind === 0 ? true : false}
        onError={() => {
          setError(true)
        }}
      ></Image>
    )
  }

  const CustomCarousel = ({ data }) => {
    const maxLimit = 3;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex < maxLimit ? selectedIndex : 0);
    };
    return (
      <Carousel
        defaultActiveIndex={0}
        wrap={true}
        key={data.id}
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        interval={null}
        className={CarasoulMapCss.carouselParent}
      >
        {data.otherImageUrls.map((element, ind) => {
          return ind < maxLimit && (
            <Carousel.Item
              key={`${data.id}-${ind}`}
              style={{
                position: "relative",
              }}
              className={CarasoulMapCss.imageGap}
            >
              <div
                className={CarasoulMapCss.image_container}
                onClick={(e) => {
                  Router.push({
                    pathname: `search/${data.slug}`,
                    query: {
                      from: param.from,
                      to: param.to,
                      guests: param.guest,
                      adults: param.adults,
                      childs: param.childs,
                      golfcourse_name:
                        param.golfcourse_name,
                    },
                  });
                }}
                style={{
                  position: "relative",
                }}
              >
                <CustomImage key={`${data.id}-${ind}`} data={data} element={element} ind={ind} />
              </div>
            </Carousel.Item>
          ) || null;
        })}
      </Carousel>
    )
  }
  return (
    <>
      <Head>
        <title>Ventify | Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* -----------------------            ORLANDO SECTION             ---------------------  */}

      <div className={SearchIndexCss.search_main_section}>
        <Container>
          <Row>
            <h3 className={SearchIndexCss.location_name}>
              {param.location_name ? param.location_name : ""}
            </h3>
            <p className={SearchIndexCss.golfcourse_name}>
              {param.golfcourse_name ? param.golfcourse_name : ""}
            </p>
            {/*    ----------------      CARD MAP SECTION      -------------------   */}
            <Col md={8}>
              <hr />

              <div className={SearchIndexCss.orlandParent}>
                <div className={SearchIndexCss.sortSection}>
                  <h5 className={SearchIndexCss.rental}>
                    {TotalDataCount} Rentals
                  </h5>

                  <div className={SearchIndexCss.sortdiv}>
                    <h6 className={SearchIndexCss.sort}>Sort By:</h6>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: "Default",
                            key: "",
                          },
                          {
                            label: "Price (Low to High)",
                            key: "price_low",
                          },
                          {
                            label: "Price (High to Low)",
                            key: "price_high",
                          },
                          {
                            label: "Date Old to New",
                            key: "updatedAt_old_to_new",
                          },
                          {
                            label: "Date New to Old",
                            key: "updatedAt_new_to_old",
                          },
                        ],
                        onClick,
                      }}
                      className={SearchIndexCss.default}
                    >
                      <Button size="large">
                        <Space>
                          {UpdateSortByText}
                          <CaretDownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                {/* ------------------- CAROUSEL IMAGES STARTS  -----------------------  */}

                <Row>
                  {IsLoaderVisible ? (
                    <>
                      <div className={SearchIndexCss.loader_main_div}>
                        <Loader />
                      </div>
                    </>
                  ) : !IsLoaderVisible && PropertyData.length === 0 ? (
                    <div className={SearchIndexCss.no_property_main_div}>
                      <Image
                        width={70}
                        height={70}
                        src={PropNotFoundImg}
                        alt="property not found"
                        className={SearchIndexCss.no_property_image}
                      ></Image>
                      <p className={SearchIndexCss.no_property_text}>
                        No Property Found!
                      </p>
                    </div>
                  ) : (

                    <>
                      {isOtherProperties ? (
                        <div className={SearchIndexCss.no_property_other_div}>
                          <Image
                            width={70}
                            height={70}
                            src={PropNotFoundImg}
                            alt="property not found"
                            className={SearchIndexCss.no_property_image}
                          ></Image>
                          <p className={SearchIndexCss.no_property_text}>
                            No Properties Available on this Date Range ({`${param.from} to ${param.to}`})
                          </p>
                          <h5 className={SearchIndexCss.no_property_text}>
                            Other Properties Available in ({param.location_name})
                          </h5>
                        </div>
                      ) : ""}

                      {PropertyData.map((data, id) => (
                        <Col
                          md={6}
                          key={data.id}
                          className={CarasoulMapCss.carouselBlock}
                        >
                          <CustomCarousel key={data.id} data={data} />

                          <div
                            onClick={(e) => {
                              Router.push({
                                pathname: `search/${data.slug}`,
                                query: {
                                  from: param.from,
                                  to: param.to,
                                  guests: param.guest,
                                  adults: param.adults,
                                  childs: param.childs,
                                  golfcourse_name: param.golfcourse_name,
                                },
                              });
                            }}
                            className={CarasoulMapCss.image_container}
                          >
                            <p
                              className={
                                CarasoulMapCss.price_of_property_text_from
                              }
                            >
                              From{" "}
                              <span
                                className={
                                  CarasoulMapCss.price_of_property_text
                                }
                              >
                                $
                                {data.price >= 0.5
                                  ? Math.ceil(data.price)
                                  : Math.floor(data.price)}
                                /Night
                              </span>
                            </p>

                            <h4
                              onClick={(e) => {
                                Router.push({
                                  pathname: `search/${data.slug}`,
                                  query: {
                                    from: param.from,
                                    to: param.to,
                                    guests: param.guest,
                                    adults: param.adults,
                                    childs: param.childs,
                                    golfcourse_name: param.golfcourse_name,
                                  },
                                });
                              }}
                              className={CarasoulMapCss.carouselHeading}
                            >
                              {data.name}
                            </h4>
                          </div>

                          <div
                            onClick={(e) => {
                              Router.push({
                                pathname: `search/${data.slug}`,
                                query: {
                                  from: param.from,
                                  to: param.to,
                                  guests: param.guest,
                                  adults: param.adults,
                                  childs: param.childs,
                                  golfcourse_name: param.golfcourse_name,
                                },
                              });
                            }}
                            className={CarasoulMapCss.image_container}
                          >
                            <span className={CarasoulMapCss.discribeOfCard}>
                              {data.bedrooms ? data.bedrooms : 1} Bed Rooms
                            </span>
                            <Image
                              src={Dot}
                              alt="Dot"
                              className={CarasoulMapCss.dot}
                            ></Image>
                            <span className={CarasoulMapCss.discribeOfCard}>
                              {data.accomodation} Guests Villa
                            </span>

                            <p className={CarasoulMapCss.discribeOfCard}>
                              {/* {
                              // data.golfCourseName ? data.golfCourseName : "N/A"
                            } */}


                            </p>
                          </div>
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </div>
            </Col >
            {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
            < Col md={4} className={SearchIndexCss.mapParent} >
              <Map key={0} data={PropertyData} />
            </Col >
          </Row >

          <div className={SearchIndexCss.pagination_container}>
            <Pagination
              current={PaginationState}
              colorText="#FF0000"
              showQuickJumper={false}
              showSizeChanger={false}
              defaultCurrent={1}
              defaultPageSize={16}
              total={TotalDataCount}
              onChange={OnPaginationChange}
              className={SearchIndexCss.pagination}
            />
          </div>
        </Container >
      </div >

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      < BottomSection />
    </>
  );
};

export async function getServerSideProps({ query }) {
  let props = {
    query: query
  };

  return {
    props: props
  }
}

export default Index;
