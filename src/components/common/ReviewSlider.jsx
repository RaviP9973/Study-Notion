import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/free-mode';
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { getAllRating } from "../../services/operations/ratingAndReviewsApi";
import ReviewCard from "./ReviewCard";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllReviews = async () => {
      setLoading(true);
      const res = await getAllRating();
      console.log("res", res);
      if (res) {
        setReviews(res);
      }
      setLoading(false);
    };

    fetchAllReviews();
  }, []);

  return (
    loading ? (
      <div className="flex justify-center items-center  w-full">
        <div className="loader "></div>
      </div>
    ) : (
      <div className="text-white">
        <div className="w-full border ">
          <Swiper
            spaceBetween={30}
            freeMode={true}
            slidesPerView={4}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, FreeMode]}
            className="mySwiper"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} >
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
};

export default ReviewSlider;
