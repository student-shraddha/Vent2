/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Container, Col, Row } from "react-bootstrap";
import BlogCss from "../../styles/Blog.module.css";
import Image from "next/image";
import CategoryIcon from "../../../public/images/vector/category_icon.svg";
import ViwBlogBannerImg from "../../../public/images/view_blog_banner_img.png";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import { Skeleton } from "antd";
import React from "react";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);

const ViewBlog = (props) => {
  const [BlogData, setBlogData] = useState(null);
  const Router = useRouter();
  const UrlParams = Router.query;

  useEffect(() => {
    const GetBlogsById = async () => {
      const BlogsByIdRes = await axios.get(
        `${process.env.NEXT_PUBLIC_VENTIFY_API_URL}/v1/blog/${UrlParams.view_blog}`
      );

      if (BlogsByIdRes.status === 200) {
        setBlogData(BlogsByIdRes.data.data);
      }
    };
    GetBlogsById();

    return () => { };
  }, [UrlParams]);

  const CustomImage = ({ className, data }) => {

    const [error, setError] = useState(false);
    let src = data.image;
    if (!(/(http(s?)):\/\//i.test(src))) {
      src = "https:" + src;
    }
    return (
      <>
        <Image
          key={data.id}
          className={className}
          alt={data.naming}
          fill
          src={(error ? ViwBlogBannerImg : src)}
          onError={() => {
            setError(true)
          }}
        ></Image>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Ventify Blog: {props.view_blog}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* VIEW BLOG STARTED */}
      <Container>

        {BlogData ? (

          <div>
            <div className={BlogCss.view_blog_banner_img_section}>
              <div className={BlogCss.view_blog_date}>
                {BlogData?.createdAt ? (
                  dayjs(BlogData?.createdAt).format("MMMM DD, YYYY")
                ) : (
                  <Skeleton.Input size="small" active={true} />
                )}
              </div>
              <h4 className={BlogCss.view_blog_title}>
                {BlogData?.title ? (
                  BlogData?.title
                ) : (
                  <Skeleton.Input active={true} />
                )}
              </h4>

              <div className={BlogCss.view_blog_category_container_main}>
                <Row className={BlogCss.view_blog_category_rows}>
                  <Col md={"auto"} className={BlogCss.view_blog_category_cols}>
                    <p className={BlogCss.view_blog_category_text}>
                      by{" "}
                      <span className={BlogCss.view_blog_category_text_posted_by}>
                        {BlogData?.createdBy == null ? "N/A" : BlogData?.createdBy}
                      </span>
                    </p>
                  </Col>

                  <Col md={"auto"} className={BlogCss.view_blog_category_cols}>
                    <div className={BlogCss.view_blog_category_container}>
                      <div className={BlogCss.view_blog_category_img_container}>
                        <Image
                          width={24}
                          height={24}
                          className={BlogCss.view_blog_category_img}
                          src={CategoryIcon}
                          alt="bookmark category"
                        ></Image>
                      </div>
                      <p className={BlogCss.view_blog_category_text}>
                        {BlogData?.tag?.join(", ")}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* VIEW BLOG JS BANNER IMG */}
              <div className={BlogCss.view_blog_banner_img_container}>
                <CustomImage className={BlogCss.view_blog_banner_img} data={BlogData}></CustomImage>
                {/* <Image
              src={BlogData?.image ? BlogData?.image : ViwBlogBannerImg}
              fill
              alt="banner image blog"
              className={BlogCss.view_blog_banner_img}
            ></Image> */}
              </div>
            </div>

            {/* MIDDLE TEXT CONTAINER SECTION */}
            {BlogData?.body ? (
              <div className={BlogCss.view_blog_middle_text_section}>
                <div className={BlogCss.view_blog_middle_main_div}>
                  <div className={BlogCss.view_blog_middle_text_para}>
                    {/* {BlogData?.body ? BlogData?.body : <Skeleton active />} */}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: BlogData?.body,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : ("")}
          </div>

        ) : (
          <Skeleton active />
        )}
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export async function getServerSideProps({ params, req, res, query }) {

  const { id } = query;

  let props = {
    ...query
  };

  return {
    props: props
  }
}

export default ViewBlog;
