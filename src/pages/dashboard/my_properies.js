import { useEffect, useState, useContext, use } from "react";
import ProtectedRoute from "../../../common components/protected_route";
import Image from "next/image";
import { Col, Container, Row, Table } from "react-bootstrap";
import DashboardCss from "../../styles/dashboard/DashboardIndex.module.css";
import Head from "next/head";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
import dynamic from "next/dynamic";
import SearchIndexCss from "../../styles/SearchIndex.module.css";
import PropNotFoundImg from "../../../public/images/vector/golf-hole.png";
import React from "react";
import Loader from "../../../common components/loader";
import CarasoulMapCss from "../../styles/CarouselMap.module.css";
import Dot from "../../../public/images/vector/dot.svg";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import { Pagination } from "antd";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance"
import { useSession } from "next-auth/react";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const MyProperties = ({ query }) => {
  const Router = useRouter();

  const initPage = Number(query.page || 1)
  const ContextUserDetails = useContext(AuthContext);
  const [UserName, SetUserName] = useState("");
  const [allPropertiesData, setAllPropertiesData] = useState([]);
  const [TotalDataCount, setTotalDataCount] = useState(0);
  const [allAggregatedPropertyData, setAllAggregatedPropertyData] = useState([]);
  const [PropertyData, SetPropertyData] = useState([]);

  const { data: session, update } = useSession();
  const [token, setToken] = useState(null)

  const [IsLoaderVisible, setIsLoaderVisible] = useState(true);

  const limitPerPage = 9; // 16 by defaut
  const [PaginationState, setPagination] = useState(initPage);



  useEffect(() => {
    setToken(session?.user?.token)
  }, [session?.user?.token]);

  const getAllProperties = async () => {
    setIsLoaderVisible(true)
    try {
      const propertiesRes = await axios.get(
        `${process.env.NEXT_PUBLIC_VENTIFY_API_URL}/v1/properties/getMyProperty`,
        {
          headers: {
            Authorization: `Bearer ${ContextUserDetails.UserState}`,
          },
        }
      );
      if (propertiesRes.status === 200) {
        setAllPropertiesData(propertiesRes.data.data.rows);
        setTotalDataCount(propertiesRes.data.data.count);
        setIsLoaderVisible(false)
      }
    } catch (error) {
      setIsLoaderVisible(false)
    }
  };


  useEffect(() => {
    if (!UserName) {
      SetUserName(
        sessionStorage.getItem("Uname") || localStorage.getItem("Uname")
      );
    }


    token && getAllProperties();
  }, [token]);

  useEffect(() => {
    aggregateProperties();
  }, [allPropertiesData]);
  useEffect(() => {
    SetPropertyData(allAggregatedPropertyData.slice((PaginationState - 1), limitPerPage))//limitPerPage
  }, [allAggregatedPropertyData]);


  const aggregateProperties = () => {

    setAllAggregatedPropertyData((prev) => {

      let properties = [...allPropertiesData];
      return properties;
    });

  }
  const OnPaginationChange = async (pageNumber) => {

    // Router.push({
    //   pathname: Router.pathname,
    //   query: { ...query, page: pageNumber },
    // })

    let startIndex = (pageNumber - 1) * limitPerPage;
    let endIndex = startIndex + limitPerPage;

    SetPropertyData(allAggregatedPropertyData.slice(startIndex, endIndex));
    setPagination(pageNumber);
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };


  const CustomImage = ({ data, element, ind }) => {

    console.log("element", element)
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
        {data.propertyImages.length ? data.propertyImages.map((element, ind) => {
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
                style={{
                  position: "relative",
                }}
              >
                <CustomImage key={`${data.id}-${ind}`} data={data} element={element.image} ind={ind} />
              </div>
            </Carousel.Item>
          ) || null;
        }) : (
          <Carousel.Item
            key={`dummy`}
            style={{
              position: "relative",
            }}
            className={CarasoulMapCss.imageGap}
          >
            <div
              className={CarasoulMapCss.image_container}
              style={{
                position: "relative",
              }}
            >
              <CustomImage key={`dummy`} data={data} element={"/images/noImageFound.png"} ind={0} />
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    )
  }
  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Ventify | Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/*   -------------------------     BANNER IMAGE   -------------------------------   */}
        <div>
          <Image
            fill
            className={DashboardCss.banner_img}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/post-property-banner.svg`}
            alt="faq banner image"
          ></Image>
        </div>

        {/*     -------------------------     TEXT AREA      ----------------------------    */}

        <Container className={DashboardCss.introParent}>
          <Row>
            <h3 className={DashboardCss.title_words}>
              Welcome back,{" "}
              {UserName
                ? UserName.charAt(0).toUpperCase() + UserName.slice(1)
                : "Anyonums "}
            </h3>
          </Row>
          <hr />

          <Row style={{ justifyContent: "center" }}>
            <Col md={4}>
              <h4 className={DashboardCss.title_words}>Total Hosted Properties</h4>
              <h4 className={DashboardCss.price}>{TotalDataCount}</h4>
            </Col>
          </Row>
        </Container>

        <Container>
          <div className="align-items-center d-flex justify-content-between">
            <h4 className={DashboardCss.reservation}>Hosted Properties</h4>
            <Link className={DashboardCss.postProperty} href={"/dashboard/post_property"}>Post New Property</Link>
          </div>

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
                {PropertyData.map((data, id) => {
                  return (
                    <Col
                      md={4}
                      key={data.id}
                      className={CarasoulMapCss.carouselBlock}
                    >
                      <CustomCarousel key={data.id} data={data} />

                      <div className={CarasoulMapCss.image_container}>
                        <p className={CarasoulMapCss.price_of_property_text_from}>
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

                        <h4>{data.name}</h4>
                      </div>

                      <div className={CarasoulMapCss.image_container} >
                        <span className={CarasoulMapCss.discribeOfCard}>
                          {data.bedrooms ? data.bedrooms : 1} Bed Rooms
                        </span>
                        <Image
                          src={Dot}
                          alt="Dot"
                          className={CarasoulMapCss.dot}
                        ></Image>
                        <span className={CarasoulMapCss.discribeOfCard}>
                          {data.capacity} {data?.type}
                        </span>

                      </div>
                    </Col>
                  )
                })}

                <div className={SearchIndexCss.pagination_container}>
                  <Pagination
                    current={PaginationState}
                    colorText="#FF0000"
                    showQuickJumper={false}
                    showSizeChanger={false}
                    defaultCurrent={1}
                    defaultPageSize={limitPerPage}
                    total={TotalDataCount}
                    onChange={OnPaginationChange}
                    className={SearchIndexCss.pagination}
                  />
                </div>
              </>
            )}
          </Row>



        </Container>



        <BottomSection />
      </ProtectedRoute>
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

export default MyProperties;
