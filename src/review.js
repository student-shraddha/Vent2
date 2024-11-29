import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const Review = () => {
  const Router = useRouter();
  const [BlogData, setBlogData] = useState([]);

  useEffect(() => {
    const GetBlogData = async () => {
      try {
        const BlogAPIRes = await axios.get(
          `${process.env.NEXT_PUBLIC_VENTIFY_API_URL}/v1/blog`
        );
        if (BlogAPIRes.status === 200) {
          setBlogData(BlogAPIRes.data.data);
          // console.log(BlogAPIRes.data.data);
        }
      } catch (error) { }
    };
    GetBlogData();
    return () => {
      GetBlogData();
    };
  }, []);

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
          alt="ventify"
          fill
          src={(error ? "/images/noImageFound.png" : src)}
          onError={() => {
            setError(true)
          }}
        ></Image>
      </>
    )
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      grabCursor={true}
      pagination={{ clickable: true }}
      onSlideChange={() => { }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        280: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 40,
          loop: false,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
          loop: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 40,
          loop: false,
        },
        1199: {
          slidesPerView: 2,
          spaceBetween: 40,
          loop: false,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 20,
          loop: false,
        },
      }}
    >
      {BlogData?.map((item, index) => {
        return (
          <SwiperSlide key={index} className={HomeCss.parentReview}>
            <div className={HomeCss.swiper_container}>
              <div
                className={HomeCss.parentOf_img_textCard}
                onClick={(e) => {
                  Router.push({
                    pathname: `blog/${encodeURIComponent(item.slug)}`,
                    // query: {
                    //   id: item.id,
                    // },
                  });
                }}
              >
                <div className={HomeCss.swiper_img}>
                  <CustomImage
                    className={HomeCss.cardReview}
                    data={item}
                  ></CustomImage>

                  <div className={HomeCss.cardTextParent}>
                    <h5 className={HomeCss.card_title}>{item.title}</h5>
                    <div className={HomeCss.contact_div}>
                      <Image
                        src="/images/vector/contact.svg"
                        alt="Contact Image"
                        width={20}
                        height={15}
                      ></Image>{" "}
                      <span className={HomeCss.byAdmin}>
                        {item.createdBy ? item.createdBy : "N/A"}
                      </span>
                    </div>

                    <div className={HomeCss.cardTextParent}>
                      <h5 className={HomeCss.card_title}>{item.title}</h5>
                      <div className={HomeCss.contact_div}>
                        <Image
                          src="/images/vector/contact.svg"
                          alt="Contact Image"
                          width={20}
                          height={15}
                        ></Image>{" "}
                        <span className={HomeCss.byAdmin}>
                          {item.createdBy ? item.createdBy : "N/A"}
                        </span>
                      </div>

                      <div className={HomeCss.bookmarkDiv}>
                        <span className={HomeCss.bookmark_text}>
                          {item.tag?.join(", ")}
                        </span>
                      </div>

                      <div className={HomeCss.learnbtn}>
                        <h6 className={HomeCss.learnbtn_text}>Learn More</h6>
                        <Image
                          className={HomeCss.learnIcon}
                          src="/images/vector/learnMore.svg"
                          alt="learnMore"
                          width={16}
                          height={16}
                        ></Image>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Review;
