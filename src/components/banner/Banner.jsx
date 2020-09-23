import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Button,
  ProgressBar,
  Image,
} from "react-bootstrap";
import { getImageUrl } from "../../services/imageService";
import CountDownTime from "../countDownTime/CountDownTime";
import Link from "next/link";
import FaIcon from "../fontAwesomeIcon";
import BannerHome from "./BannerHome";
import LoginModal from "../modal/LoginModal";
import { useSelector, connect } from "react-redux";
import {
  fullDate,
  compareEventDateWithCurrentDate,
  getSlugName,
} from "../../services/utilsService";
import { toast } from "react-toastify";
import useWebShare from "react-use-web-share";
import { withRouter } from "next/router";
import Router from "next/router";
import VimeoLogo from "../../../public/images/vimeo-logo.png";

import "./style.scss";
import { checkCampaignPaidApi } from "../../api/campaignApi";
import { claimEvent } from "../../api/checkoutApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
var CLIENT_ID =
  "436263204673-e2i88hjktq7anm3qibcutru8pjddmdra.apps.googleusercontent.com";
var API_KEY = "AIzaSyCeSssRzeiG8hpQuKYCTD3fNRPDmfg4Wuw";
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
var SCOPES = "https://www.googleapis.com/auth/calendar.events";
const Banner = ({ router, experience }) => {
  const user = useSelector((state) => state.user.user);
  const { isSupported, share } = useWebShare();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isPaid, setPaid] = useState(false);
  const { pathname } = router;

  const goToCheckout = () => {
    if (!user) {
      let path = `/registration`;
      const artist = (experience.artists && experience.artists[0]) || {};
      Router.push({ pathname: path }, `/registration?exp=${experience.id}&artist=${artist.id}`);
    } else {
      checkout();
    }
  };
  const checkout = async () => {
    const id = experience.id;
    try {
      const res = await claimEvent(id);
      const { data = {} } = res;
      if (data.success) {
        setPaid(true);
      } else {
        toast.error(data.message, {
          containerId: "Toast",
        });
      }
    } catch (error) {
      //console.log("errrr", error);
      toast.error("Something went wrong please try again", {
        containerId: "Toast",
      });
    }
  };

  const getAboutTitle = () => {
    const aboutUrl = "/about-us/";
    switch (pathname) {
      case aboutUrl + "giggedin":
        return "ABOUT GIGGEDIN";
      case aboutUrl + "terms-and-conditions":
        return "TERMS AND CONDITIONS";
      case aboutUrl + "privacy-and-policy":
        return "PRIVACY AND POLICY";
      default:
        return "ABOUT GIGGEDIN";
    }
  };

  const copyUrl = async () => {
    let dummy = document.createElement("input"),
      text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    if (!isSupported) {
      shareOnFacebook();
    } else {
      share({
        title: document.title,
        text: experience.name,
        url: text,
      });
    }
  };
  const addToCalendar = (experience) => {
    const gapi = window.gapi;
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: `${experience.name}: ${experience.headline}`,
            location: "",
            description: `${experience.description}`,
            start: {
              dateTime: "2020-09-16T12:00:00-02:00",
              timeZone: "Australia/Sydney",
            },
            end: {
              dateTime: "2020-09-16T12:00:00-02:00",
              timeZone: "Australia/Sydney",
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    FB.ui(
      {
        display: "popup",
        method: "share",
        href: url,
      },
      function (response) {
        if (response) {
          toast.success("Share successfully!", {
            containerId: "Toast",
          });
        }
      }
    );
  };

  useEffect(() => {
    const scriptYoutube = document.createElement("script");
    scriptYoutube.src = "https://apis.google.com/js/api.js";
    scriptYoutube.async = true;
    scriptYoutube.defer = true;
    scriptYoutube.crossorigin = "anonymous";
    document.body.appendChild(scriptYoutube);
    if (user && user.id > 0 && experience && experience.id > 0) {
      checkCampaignPaidApi(experience.id).then((res) => {
        setPaid(res.data.paid);
      });
    } else {
      setPaid(false);
    }
  }, [user]);

  if (pathname === "/") {
    return <BannerHome />;
  }

  return pathname !== "/artist" &&
    pathname.indexOf("/checkout") === -1 &&
    pathname.indexOf("/about-us") === -1 &&
    pathname.indexOf("/resetpassword") === -1 &&
    pathname.indexOf("/forgotpassword") === -1 &&
    pathname.indexOf("/confirmation") === -1 &&
    pathname !== "/login" &&
    pathname !== "/experiences" ? (
      <div className="banner d-flex h-auto pt-4">
        {experience && (
          <Container>
            <div className="banner-breadcumb pb-3">
              <Link href={"/"}>
                <a className="banner-breadcumb__item">
                  <span className="mr-3">Home</span>
                  <FaIcon name="faChevronRight" size={"sm"} color={"#ff4a32"} />
                </a>
              </Link>
              <Link href={"/experiences"}>
                <a className="banner-breadcumb__item ml-3">
                  <span className="mr-3">Experiences</span>
                  <FaIcon name="faChevronRight" size={"sm"} color={"#ff4a32"} />
                </a>
              </Link>
              <a className="banner-breadcumb__item active ml-3">
                {experience.name}
              </a>
            </div>
            <div className="banner-title d-flex flex-row w-100 align-items-end mb-3">
              <h2 className="banner-title__artist-name m-0">
                {experience.name}:
              <span className="banner-title__artist-banner-text m-0 ml-2">
                  {experience.headline}
                </span>
              </h2>
            </div>
            {!isPaid && (
              <div className="mt-3 banner-title__artist-des mb-4">
                {experience.description}
              </div>
            )}

            {!isPaid ? (
              <BannerDefault
                experience={experience}
                goToCheckout={goToCheckout}
                copyUrl={copyUrl}
              />
            ) : compareEventDateWithCurrentDate(experience.end_time) ? (
              <BannerOnLive experience={experience} />
            ) : (
                  <BannerAfterRegister
                    experience={experience}
                    copyUrl={copyUrl}
                    addToCalendar={addToCalendar}
                  />
                )}
          </Container>
        )}
        <LoginModal
          showModal={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
          }}
        />
      </div>
    ) : (
      <div>
        {pathname.indexOf("/about-us") > -1 && (
          <div className="py-4 text-center">
            <div className="about-us-title">{getAboutTitle()}</div>
          </div>
        )}
        {pathname.indexOf("/forgotpassword") > -1 && (
          <div className="py-4 text-center">
            <div className="about-us-title">{'FORGOT PASSWORD'}</div>
          </div>
        )}
        {pathname.indexOf("/resetpassword") > -1 && (
          <div className="py-4 text-center">
            <div className="about-us-title">{'RESET PASSWORD'}</div>
          </div>
        )}
      </div>
    );
};

const BannerDefault = ({ experience, copyUrl, goToCheckout }) => {
  const spots_unlimited =
    (experience && experience.spots_unlimited === 1) || false;
  const tiers =
    experience && experience.tiers
      ? experience.tiers.sort((a, b) => a.price - b.price)
      : [];

  return (
    <Row>
      <Col xs={12} sm={12} md={7} lg={8} className="pr-md-0 pr-md-0">
        <LazyLoadImage
          alt={experience.name}
          effect="blur"
          src={getImageUrl(experience.banner)}
          placeholderSrc={getImageUrl(experience.banner)}
          className="banner-artist-image-mobile"
        />
        {/* <Image
          src={getImageUrl(experience.banner)}
          className="banner-artist-image-mobile"
          fluid
        /> */}
        {/* <div
          className="banner-artist-image background-image-responsive d-none d-md-block "
          style={{
            backgroundImage: `url(${getImageUrl(experience.banner)})`,
          }}
        /> */}
      </Col>
      <Col xs={12} sm={12} md={5} lg={4} className="pl-md-0 mb-4 mb-md-0">
        <div className="banner-event-info px-2 px-sm-4 py-1 d-flex flex-column justify-content-between">
          {!spots_unlimited && (
            <div>
              <div className="event-spots mb-2">
                <span className="event-spots__number mr-1">
                  {experience.spots}
                </span>
                <span className="event-spots__text">{"Spots Left"}</span>
              </div>
              <ProgressBar className="progress-bar-cus w-100 mb-3">
                <ProgressBar variant="default" now={experience.spots} key={1} />
              </ProgressBar>
            </div>
          )}
          <div>
            <h3 className="mt-3 text-center event-start-in-text">
              {"Event starts in:"}
            </h3>
            <div
              className={`${spots_unlimited && "mt-3 mb-0"} mb-2 mb-sm-0 pt-1`}
            >
              <CountDownTime end={experience.end_time} />
            </div>
          </div>
          <div>
            <div className={`${spots_unlimited && "mb-3"} text-center`}>
              <div className="time-close-text">{"Registrations will end"}</div>
              <div className="time-close-text">{`${fullDate(
                experience.end_time
              )}`}</div>
            </div>
            <div className="separate-line" />
          </div>
          {(experience.tiers && experience.tiers.length) > 0 && (
            <div
              className={`${spots_unlimited && "mt-3 mb-3"
                } banner-event-info__price-block mt-2 text-center`}
            >
              <span className="banner-event-info__price">
                {`From $${tiers[0].price / 100}`}
              </span>
            </div>
          )}
          <div className="text-center mb-4 pt-3 pt-sm-0 d-flex flex-row justify-content-between">
            <Button
              onClick={goToCheckout}
              className="banner-event-info__claim-btn w-100 py-3"
              size="lg"
              variant="dark"
            >
              {"Claim your spot now"}
            </Button>
            <div className="share-block">
              <Button
                onClick={copyUrl}
                variant="outline-primary"
                className="remind_and_share-btn px-3"
              >
                <FaIcon name="faShareAlt" size={"lg"} />
              </Button>
            </div>
          </div>
          {/* <div
            className={`${
              spots_unlimited && "mt-5"
              } remind_and_share d-flex flex-row justify-content-between mb-2`}
          >
            <div className="remind-block">
              <Button
                variant="outline-primary"
                className="remind_and_share-btn w-100"
                onClick={() => {
                  setShowLoginModal(true);
                }}
              >
                <div className="remind-icon">
                  <FaIcon name="faBookmark" size={"lg"} />
                </div>
                {"Remind Me"}
              </Button>
            </div>
           
          </div> */}
        </div>
      </Col>
    </Row>
  );
};

const BannerAfterRegister = ({ experience, copyUrl, addToCalendar }) => {
  return (
    <Row>
      <Col xs={12} sm={12} className="pl-md-0 mb-4 mb-md-0">
        <div className="banner-event-info banner-congrats px-2 px-sm-4 py-1">
          <div className="banner-congrats-icon text-center my-3 pt-2">
            <FaIcon name="faCheckCircle" size={"2x"} color={"#fff"} />
          </div>
          <div className="banner-congrats__text text-center">
            {"Congratulations!"}
          </div>
          <div className="banner-congrats__sub-text text-center mb-3">
            {"You successfully claimed a spot."}
          </div>
          <div className="px-0 mx-0 px-sm-5 mx-sm-5">
            <div className="banner-congrats__separate-line" />
            <div className="banner-congrats__cdt-text text-center mt-4">
              {"This event will begin in:"}
            </div>
            <div className={`mt-3 mb-3`}>
              <CountDownTime end={experience.end_time} isPaid={true} />
            </div>
            <div className={`text-center mb-3 pb-1`}>
              <div className="time-close-text">{`${fullDate(
                experience.end_time
              )}`}</div>
            </div>
            <div className="banner-congrats__separate-line" />
          </div>
          <div className="banner-congrats__actions d-flex justify-content-center flex-sm-row flex-column align-items-center py-2 py-sm-4">
            {/* <div
              className="banner-congrats__actions__item mb-2 mb-sm-0"
              onClick={() => addToCalendar(experience)}
            >
              <FaIcon name="faCalendarAlt" color={"#fff"} size="lg" />
              {" Add to calendar"}
            </div> */}
            <div className="banner-congrats__actions__item" onClick={copyUrl}>
              <FaIcon name="faShareAlt" color={"#fff"} size="lg" />
              {" Share this event"}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const BannerOnLive = ({ experience }) => {
  return (
    <Row>
      <Col xs={12} sm={12} className="pl-md-0 mb-4 mb-md-0">
        <div className="banner-event-info vimeo-embed-container">
          <div className="vimeo-embed-header d-flex justify-content-between px-3 py-2">
            <img src={VimeoLogo} alt="" className="vimeo-embed-header__image" />
            <div className="vimeo-embed-header__text d-flex align-items-center">
              <div className="vimeo-embed-header__text__icon"></div>
              <span>{"Live Now"}</span>
            </div>
          </div>
          <Row className="mt-2 ml-0 mr-0">
            <Col xs={12} sm={8} className="pl-2 pr-2">
              <iframe
                src="https://player.vimeo.com/video/438075368"
                frameBorder="0"
                allow="autoplay; fullscreen"
                width="100%"
                height="400"
                allowFullScreen
              ></iframe>
            </Col>
            <Col xs={12} sm={4} className="pl-2 pl-sm-0 pr-0">
              <iframe
                src="https://vimeo.com/live-chat/438075368/"
                width="100%"
                height="400"
                frameBorder="0"
              ></iframe>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default withRouter(Banner);
