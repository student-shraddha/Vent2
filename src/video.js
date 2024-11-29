import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import { Card } from "react-bootstrap";

const Video = ({ videos }) => {
  return (
    <Swiper
      className={HomeCss.videoParentdiv}
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={30}
      slidesPerView={3}
      grabCursor={true}
      pagination={{ clickable: true }}
      onSlideChange={() => {}}
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
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
    >
      {videos.map((video) => (
        <SwiperSlide key={video.id} className={HomeCss.parentVideo}>
          <Card className={HomeCss.videoData}>
            <iframe
              className={HomeCss.videoPlay_in_card}
              layout="fill"
              src={video.link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Video;
