import { useState } from "react";
import React from "react";
import SearchByGolfCourseCss from "../src/styles/SearchByGolfCourse.module.css";
import { Input, Button, Select, Skeleton, message } from "antd";
import { Container, Col, Row } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
const placesLibrary = ["places"];
import axios from "axios";
import { useRouter } from "next/router";

const SearchByGolfCourse = () => {
  const RouterRef = useRouter();
  const [GoogleGeoData, setGoogleGeoData] = useState({
    latitude: "",
    longitude: "",
    location_name: "",
    golfcourse_name: "",
  });
  const [InputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [AllGolfCourseData, setAllGolfCourseData] = useState([{}]);
  const [SelectedGolfCourse, setSelectedGolfCourse] = useState({});
  const [IsDisableGolfCourse, setIsDisableGolfCourse] = useState(true);

  //* GOOGLE SEARCH API FUNCTIONS
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: placesLibrary,
  });

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const GetGolfCourse = async (place) => {
    const Latitude = place.geometry?.location.lat();
    const Longitude = place.geometry?.location.lng();

    try {
      const GolfCourseRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/golfcourse?latitude=${Latitude}&longitude=${Longitude}`
      );

      if (GolfCourseRes.status === 200) {
        setAllGolfCourseData(GolfCourseRes.data.data);
      }
    } catch (error) { }
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      setGoogleGeoData({
        latitude: place.geometry?.location.lat(),
        longitude: place.geometry?.location.lng(),
        location_name: formattedAddress,
      });

      name ? setIsDisableGolfCourse(false) : setIsDisableGolfCourse(true);
      GetGolfCourse(place);
      setInputValue(formattedAddress);
    } else {
      message.error("Please enter text");
    }
  };
  const OnSearchInputChange = (event) => {
    if (event.target.value === "") {
      setSelectedGolfCourse("");
      setIsDisableGolfCourse(true);
    }
    setInputValue(event.target.value);
  };
  //! GOOGLE SEARCH API FUNCTIONS END

  const SearchByGolfCourse = () => {
    if (GoogleGeoData?.location_name === "") {
      message.error("Please enter any location!");
      return;
    } else {

      if ((SelectedGolfCourse?.latitude && SelectedGolfCourse?.longitude) || (GoogleGeoData?.latitude && GoogleGeoData?.longitude)) {
        if (SelectedGolfCourse?.club_name) {
          RouterRef.push(
            `/search?latitude=${encodeURIComponent(
              Number(SelectedGolfCourse?.latitude)
            )}&longitude=${encodeURIComponent(
              Number(SelectedGolfCourse?.longitude)
            )}&location_name=${GoogleGeoData?.location_name}&golfcourse_name=${SelectedGolfCourse?.club_name
            }&limit=10`
          );
        } else {
          RouterRef.push(
            `/search?latitude=${encodeURIComponent(
              Number(GoogleGeoData?.latitude)
            )}&longitude=${encodeURIComponent(
              Number(GoogleGeoData?.longitude)
            )}&location_name=${GoogleGeoData?.location_name}&golfcourse_name=&limit=10`
          );
        }

      } else {
        message.error("Please enter any location!");
        return;
      }

    }
  };

  return (
    <>
      <main className={SearchByGolfCourseCss.search_by_golf_course_Section}>
        <Container>
          <main className={SearchByGolfCourseCss.searchSection}>
            <div className={SearchByGolfCourseCss.searchSection_overlay}>
              <div className={SearchByGolfCourseCss.content}>
                <h3 className={SearchByGolfCourseCss.Title}>
                  Search the World Over by Course (38,000+ in our database)
                </h3>

                <div
                  className={SearchByGolfCourseCss.search_by_golf_containers}
                >
                  <Row className={SearchByGolfCourseCss.search_by_golf_row}>
                    <Col
                      md={6}
                      className={SearchByGolfCourseCss.search_by_golf_cols}
                    >
                      <div
                        className={
                          SearchByGolfCourseCss.search_by_golf_input_main_container
                        }
                      >
                        <h5
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_headings
                          }
                        >
                          Search by golf course
                        </h5>
                        <p
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_subheadings
                          }
                        >
                          Choose from thousands world-wide
                        </p>

                        <div
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_parent_container
                          }
                        >
                          <div
                            className={
                              SearchByGolfCourseCss.search_by_golf_input_container
                            }
                          >
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
                                  className={
                                    SearchByGolfCourseCss.search_by_golf_inputs
                                  }
                                  prefix={<SearchOutlined />}
                                  size="large"
                                  value={InputValue}
                                  onChange={OnSearchInputChange}
                                  name="search_input"
                                  placeholder="Enter Location"
                                />
                              </Autocomplete>
                            ) : (
                              <Skeleton.Input active={true} size={"mid"} />
                            )}
                          </div>
                          <div
                            className={
                              SearchByGolfCourseCss.search_by_golf_input_container
                            }
                          >
                            <Select
                              showSearch
                              className={
                                SearchByGolfCourseCss.search_by_golf_inputs
                              }
                              onSelect={(value, option) => {
                                const selectedData = AllGolfCourseData.find(
                                  (item) => item.club_name === value
                                );
                                if (selectedData) {
                                  setSelectedGolfCourse(selectedData); //* SETTING SELECTED GOLF COURSE OBJ
                                }
                              }}
                              disabled={IsDisableGolfCourse}
                              placeholder="Golf Course"
                              optionFilterProp="clubs name"
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={AllGolfCourseData.map((item, index) => {
                                return {
                                  value: item.club_name,
                                  label: item.club_name,
                                };
                              }).sort((a, b) => a.label.localeCompare(b.label))}
                            />
                          </div>
                        </div>

                        <div
                          className={
                            SearchByGolfCourseCss.search_by_golf_btn_container
                          }
                        >
                          <Button
                            onClick={SearchByGolfCourse}
                            className={SearchByGolfCourseCss.search_by_golf_btn}
                          >
                            SEARCH
                          </Button>
                        </div>
                      </div>
                    </Col>
                    {/*//* SEARCH BY TOURNAMENT SECTION  */}
                    {/* <Col
                      md={6}
                      className={SearchByGolfCourseCss.search_by_golf_cols}
                    >
                      <div
                        className={
                          SearchByGolfCourseCss.search_by_golf_input_main_container
                        }
                      >
                        <h5
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_headings
                          }
                        >
                          Search by Tournaments
                        </h5>
                        <p
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_subheadings
                          }
                        >
                          Check out our growing list of tour-spot rentals
                        </p>

                        <div
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_parent_container
                          }
                        >
                          <div
                            className={
                              SearchByGolfCourseCss.search_by_golf_input_container_select
                            }
                          >
                            <Select
                              defaultValue=" Please select tournament"
                              options={[
                                {
                                  value: "PGA Championship",
                                  label: "PGA Championship",
                                },
                                {
                                  value: "The Master",
                                  label: "The Master",
                                },
                                {
                                  value: "The open championship",
                                  label: "The open championship",
                                },
                                {
                                  value: "The Tradition at Quinta",
                                  label: "The Tradition at Quinta",
                                },
                                {
                                  value: "US Open",
                                  label: "US Open",
                                },
                              ]}
                              trigger={["click"]}
                              className={
                                SearchByGolfCourseCss.search_by_golf_input_container_tourniA
                              }
                              size="large"
                            >
                              <Select.Option
                                onClick={(e) => e.preventDefault()}
                              >
                                <Typography.Link>
                                  <Space
                                    className={
                                      SearchByGolfCourseCss.search_by_golf_input_search_by_tourni
                                    }
                                  ></Space>
                                </Typography.Link>
                              </Select.Option>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          SearchByGolfCourseCss.search_by_golf_btn_container
                        }
                      >
                        <Link href="searchByTournaments">
                          <Button
                            className={SearchByGolfCourseCss.search_by_golf_btn}
                          >
                            SEARCH
                          </Button>
                        </Link>
                      </div>
                    </Col> */}
                  </Row>
                </div>
              </div>
            </div>
          </main>
        </Container>
      </main>
    </>
  );
};

export default SearchByGolfCourse;
