import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import HomeCss from "./styles/Home.module.css";
import "swiper/swiper-bundle.min.css";
import Image from "next/image";
import Link from "next/link";

const Advertise = ({ ads }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={5}
      pagination={{
        clickable: true,
      }}
      onSlideChange={() => { }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        280: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }}
      className={HomeCss.bigDiv}
    >
      {ads.map((ads) => (
        <SwiperSlide key={ads.id} className={HomeCss.parentAds}>
          <Link href={ads.link} target="_blank">
            <div>
              <Image
                className={HomeCss.adsImage}
                width={146}
                height={146}
                src={ads.image}
                alt={ads.name}
              ></Image>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Advertise;
