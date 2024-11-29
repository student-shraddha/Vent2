import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import Loader from "./loader";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { useRouter } from "next/router";

import SimilarPropertiesCss from "../src/styles/SimilarProperties.module.css";
import SearchIndexCss from "../src/styles/SearchIndex.module.css";
import CarasoulMapCss from "../src/styles/CarouselMap.module.css";
import Dot from "../public/images/vector/dot.svg";


const SimilarProperties = ({ data }) => {
  const Router = useRouter();
  const limit = 4;
  const [similarProperties, setSimilarProperties] = useState([]);
  const [IsLoaderVisible, setIsLoaderVisible] = useState(true);
  const param = Router.query;

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      const GetPropertyData = axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/property?${"latitude=" + data.latitude
        }&${"longitude=" + data.longitude}&distance=300&limit=${limit}&status=active&price[gt]=0`
      );
      GetPropertyData.then((response) => {
        if (response.status === 200) {
          const property_data = (response.data.data.filter((p) => p.id != data.id)).slice(0, 3)
          setSimilarProperties(property_data);
          setIsLoaderVisible(false);
        }
      }).catch((err) => {

      });
    }

    return () => { };
  }, [data?.latitude, data?.longitude]);

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
                    pathname: `/search/${data.name
                      .replace(/\s/g, "-")
                      .replace(/\//g, "-")
                      .replace(/w\//g, "-")}/${data.id}`,
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
      <div>
        <h5 className={SimilarPropertiesCss.similar_props_section_heading}>
          Similar Properties
        </h5>

        <Row>
          {IsLoaderVisible ? (
            <>
              <div className={SearchIndexCss.loader_main_div}>
                <Loader />
              </div>
            </>
          ) : !IsLoaderVisible && similarProperties.length === 0 ? (
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
              {similarProperties.map((data, id) => (
                <Col
                  md={4}
                  key={data.id}
                  className={CarasoulMapCss.carouselBlock}
                >
                  <CustomCarousel key={data.id} data={data} />

                  <div
                    onClick={(e) => {
                      Router.push({
                        pathname: `/search/${data.name
                          .replace(/\s/g, "-")
                          .replace(/\//g, "-")
                          .replace(/w\//g, "-")}/${data.id}`,
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
                          pathname: `/search/${data.name
                            .replace(/\s/g, "-")
                            .replace(/\//g, "-")
                            .replace(/w\//g, "-")}/${data.id}`,
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
                        pathname: `/search/${data.name
                          .replace(/\s/g, "-")
                          .replace(/\//g, "-")
                          .replace(/w\//g, "-")}/${data.id}`,
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
                  </div>
                </Col>
              ))}
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default SimilarProperties;
