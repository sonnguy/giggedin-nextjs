import React from "react";
import { Container, Image } from "react-bootstrap";
import arrow from "../../../public/images/home-arrow-down.png";
import "./style.scss";
import WingLine from "../common/wingLine";

const BannerHome = () => {
  const arrowClick = () => {
    const bannerH = document.querySelector(".banner-home").clientHeight;
    window.scrollTo({ top: bannerH + 108, behavior: "smooth" });
  };

  return (
    <div className="banner d-flex align-items-center justify-content-between flex-column banner-home pb-0">
      <Container className="text-center banner-home-container">
        <div className="banner-home-text-block">
          <div className="banner-home-text">
            Bringing{" "}
            <span className="banner-home-text-bolder">
              Artists <WingLine />
            </span>{" "}
            &{" "}
            <span className="banner-home-text-bolder">
              Fans <WingLine />
            </span>{" "}
            closer together
          </div>
        </div>
        <div className="banner-home-sub-title my-3 my-sm-5">
          {
            "GiggedIn Experience is a platform that helps Artists and their teams run Virtual Events & Experiences."
          }
        </div>
        <div className="banner-home-sub-des">
          {
            "From live streamed performances, to fan Q&A’s and interactive trivia nights - the Experience platform is customisable to help artists engage fans and achieve any objective"
          }
        </div>
      </Container>
      <Image
        onClick={arrowClick}
        src={arrow}
        className="banner-home-arrow-img py-4 mb-2 animated bounce"
      />
    </div>
  );
};

export default BannerHome;
