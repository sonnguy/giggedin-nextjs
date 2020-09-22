/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import "./style.scss";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../services/imageService";
import { useEffect } from "react";
import FaIcon from "../../components/fontAwesomeIcon";
import { getCampaignSuccess } from "../../actions/campaignAction";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Sticky from "react-stickynode";
import supportact from "../../../public/images/supportact.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { withRouter } from "next/router";
import Router from "next/router";
import { checkCampaignPaidApi, answerQuestionApi } from "../../api/campaignApi";
import WidgetButton from "../../components/widget/WidgetButton";
import modalBgImage from "../../../public/images/jimmy-competition-banner.jpg";
import { claimEvent, checkSharedApi, trackShare } from "../../api/checkoutApi";
import { toast } from "react-toastify";
import { spotifyFollowingApi, getFollowArtistApi } from "../../api/artistApi";
import {
  authEndpoint,
  clientId,
  scopes,
  redirectUri,
} from "../../constants/spotifyConstants";
import { connectSpotify } from "../../api/spotifyApi";
import { appId } from "../../constants/facebookConstants";
import hardback from "../../../public/images/Hardback.jpg";
import ebook from "../../../public/images/Ebook.jpg";
import audiobook from "../../../public/images/Audiobook.jpg";

const CampaignDetail = ({ experience }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [menuActive, setNenuActive] = useState("");
  const [isPaid, setPaid] = useState(false);
  const [isWinPrice, setWinPrice] = useState(false);
  const [isShowPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAnswerQuestion, setAnswerQuestion] = useState(false);

  const getCampaignSuccessFn = (campaign) =>
    dispatch(getCampaignSuccess(campaign));

  const goToCheckout = () => {
    // Mixpanel.track("Click_ClaimSpot", { experience: experience.id });
    if (!user) {
      let path = `/registration`;
      const artist = (experience.artists && experience.artists[0]) || {};
      Router.push(
        { pathname: path },
        `/registration?exp=${experience.id}&artist=${artist.id}`
      );
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
      toast.error("Something went wrong please try again", {
        containerId: "Toast",
      });
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const openSpotifyAuthWindow = () => {
    const widget = document.getElementsByClassName("fllwr-widget-container")[0]
      .children[0];
    const popupW = widget.offsetWidth;
    const popupH = widget.offsetHeight;
    const popupT = widget.offsetTop + 30;
    const popupL = widget.offsetLeft;

    const spotifyLoginWindow = window.open(
      `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=code&show_dialog=true`,
      "Login with Spotify",
      `
                scrollbars=yes,
                width=${popupW}, 
                height=${popupH}, 
                top=${popupT}, 
                left=${popupL}
                `
    );

    let timer = setInterval(() => {
      if (spotifyLoginWindow.closed) {
        clearInterval(timer);
        const code = localStorage.getItem("SPOTIFY_CODE");
        if (code) {
          connectSpotify(code).then(() => {
            followingSpotifyArtirst();
          });
        }
      }
    }, 1000);
  };

  const followingSpotifyArtirst = () => {
    const artist = (experience.artists && experience.artists[0]) || {};
    if (artist.id) {
      spotifyFollowingApi(artist.id)
        .then((res) => {
          const { following } = res.data;
          if (following) {
            setAnswerQuestion(true);
            setWinPrice(true);
          } else {
            toast.error(res.data.message, {
              containerId: "Toast",
            });
          }
        })
        .catch((err) => console.log("errrr", err));
    }
  };

  const callTrackEventShare = async () => {
    const id = experience.id;
    const res = await trackShare(id);
    const { data } = res;
    if (data.success) {
      setAnswerQuestion(true);
      setWinPrice(true);
    }
  };

  const checkWinPrice = (experience) => {
    const checkSharePromise = checkSharedApi(experience.id);
    const artist = (experience.artists && experience.artists[0]) || {};
    const checkFollowPromise = getFollowArtistApi(artist.id);
    let promises = [checkSharePromise, checkFollowPromise];

    Promise.all(promises).then((values) => {
      const { shared } = values[0].data;
      const { following } = values[1].data;
      if (shared || following) {
        setWinPrice(true);
      }
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
          callTrackEventShare();
        }
      }
    );
  };

  const onAnswerQuestion = async (answer) => {
    setLoading(true);
    const res = await answerQuestionApi(experience.id, answer);
    const { data } = res;
    if (data.success) {
      setShowPopup(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    // const ReactPixel = require("react-facebook-pixel").default;
    // ReactPixel.init(
    //   "1698442107043541",
    //   {},
    //   {
    //     autoConfig: true,
    //     debug: false,
    //   }
    // );
    // ReactPixel.track("ViewContent", { page: "Exp_Page" });
    // Mixpanel.pageView("View_Exp_Page");
    // GA.pageView();
    getCampaignSuccessFn(experience);
    if (experience.id) {
      const { tabs } = experience;
      if (tabs.length > 0) {
        setNenuActive(tabs[0].title.toLowerCase());
      }
    }


    // const scriptGoogle = document.createElement('script');
    // scriptGoogle.src = 'https://apis.google.com/js/platform.js';
    // scriptGoogle.async = true;
    // document.body.appendChild(scriptGoogle);
    const scriptFacebook = document.createElement("script");
    scriptFacebook.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=${appId}`;
    scriptFacebook.async = true;
    scriptFacebook.defer = true;
    scriptFacebook.crossorigin = "anonymous";
    document.body.appendChild(scriptFacebook);
  }, []);

  useEffect(() => {
    if (user && user.id > 0) {
      checkWinPrice(experience);
      checkCampaignPaidApi(experience.id).then((res) => {
        setPaid(res.data.paid);
        res.data.paid && setNenuActive("congrats");
      });
    } else {
      setPaid(false);
    }
  }, [user]);

  const artist = (experience.artists && experience.artists[0]) || {};
  const music_enabled = experience.music_enabled === 1;
  const the_charity = experience.charity_enabled === 1;
  const concert_enabled = experience.concert_enabled === 1;
  const spots_unlimited = experience.spots_unlimited === 1;

  const { tabs } = experience;

  return (
    <>
      {!isPaid && (
        <Sticky top={0} innerZ={999}>
          <div className="sticky-cta-bar">
            <Container className="position-relative py-2">
              <Row>
                <Col xs={12} sm={12} md={8} className="d-flex mb-2 mb-md-0">
                  <div
                    className="sticky-cta-bar__artist-image background-image-responsive"
                    style={{
                      backgroundImage: `url(${getImageUrl(
                        artist.profile_pic
                      )})`,
                    }}
                  ></div>
                  <div className="sticky-cta-bar__artist-info pl-3 d-flex flex-column justify-content-center">
                    <div className="sticky-cta-bar__artist-info__title">{`${experience.name}: ${experience.headline}`}</div>
                    {!spots_unlimited && (
                      <div className="sticky-cta-bar__artist-info__spot-left">
                        <FaIcon name="faFireAlt" size={"1x"} color={"#fff"} />
                        {" Only 10 spots left"}
                      </div>
                    )}
                  </div>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  className="sticky-cta-bar__action d-flex align-items-center px-4"
                >
                  <Button
                    onClick={goToCheckout}
                    className="px-4 py-3 sticky-cta-bar__action__claim-btn w-100"
                    size="lg"
                    variant="dark"
                  >
                    {"Claim your spot now"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Sticky>
      )}
      <Container>
        <Row className="mt-4">
          <Col xs={12} sm={12} md={8} className="pr-4">
            <div className="hdiw-block p-4 mt-2">
              <h4 className="text-uppercase mb-4 mt-2 hdiw-block-title font-weight-bolder">
                {isPaid ? "YOU’RE IN. WHAT NEXT?" : "How Does This Work?"}
              </h4>
              <div className="hdiw-text">
                {ReactHtmlParser(
                  isPaid
                    ? experience.how_it_works_member
                    : experience.how_does_it_work
                )}
              </div>
            </div>
            {user && (
              <div className="win-awesome-price-block p-4 mt-4">
                <h4 className="text-uppercase mb-4 mt-2 win-awesome-price-title font-weight-bolder text-center">
                  {isWinPrice
                    ? "You’re In!"
                    : "Want to WIN an awesome prize pack?"}
                </h4>
                <div className="win-awesome-price-body">
                  <div className="win-awesome-price-text mb-4 text-center">
                    {isWinPrice ? (
                      `Congratulations, you’ve entered the competition. The winner will be notified by Wednesday the 14th of October.`
                    ) : (
                        <>
                          <div className="mb-3">
                            {`You could win:`}
                          </div>
                          <div>
                            {`A one-of-a-kind prize pack, which includes: a signed and framed collectors' plaque featuring all three Jimmy Barnes book covers; signed copies of all three Jimmy Barnes books; a personalised video message from Jimmy; and a $150 voucher for the Jimmy Barnes Online Store.`}
                          </div>
                          <div className="mt-3">
                            {`Click the button below, and follow the prompts!`}
                          </div>
                        </>
                      )}
                  </div>
                  {!isWinPrice && (
                    <Button
                      onClick={openPopup}
                      className="px-1 px-sm-3 px-md-5 py-3 win-awesome-price-btn w-100 btn-with-icon font-weight-bolder"
                      size="lg"
                      variant="light"
                    >
                      {/* <FaIcon name="faSpotify" size={"lg"} /> */}
                      {"ENTER COMPETITION"}
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="experience-detail mt-4">
              <Row>
                <Col xs={12} sm={3} md={3} lg={2} className="pr-0">
                  <div
                    id="experience-detail-menu"
                    className="campaign-detail__menu d-flex justify-content-center flex-sm-column flex-row mt-2"
                  >
                    {!isPaid ? (
                      <>
                        {!tabs && (
                          <a
                            href="#story"
                            className={`campaign-detail__menu__item pr-2 pr-sm-0 ${menuActive === "story" && "active"
                              }`}
                            onClick={() => {
                              setNenuActive("story");
                            }}
                          >
                            <FaIcon
                              name="faLongArrowAltRight"
                              size={"lg"}
                              color={"#333"}
                            />
                            {"Story"}
                          </a>
                        )}
                        {tabs &&
                          tabs.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.title.toLowerCase()}`}
                              className={`campaign-detail__menu__item pr-2 pr-sm-0 ${menuActive === item.title.toLowerCase() &&
                                "active"
                                }`}
                              onClick={() => {
                                setNenuActive(item.title.toLowerCase());
                              }}
                            >
                              <FaIcon
                                name="faLongArrowAltRight"
                                size={"lg"}
                                color={"#333"}
                              />
                              {item.title}
                            </a>
                          ))}
                        {the_charity && (
                          <a
                            href="#charity"
                            className={`campaign-detail__menu__item pr-2 pr-sm-0 ${menuActive === "charity" && "active"
                              }`}
                            onClick={() => {
                              setNenuActive("charity");
                            }}
                          >
                            <FaIcon
                              name="faLongArrowAltRight"
                              size={"lg"}
                              color={"#333"}
                            />
                            {"  The Charity"}
                          </a>
                        )}
                        {music_enabled && (
                          <a
                            href="#music"
                            className={`campaign-detail__menu__item pr-2 pr-sm-0 ${menuActive === "music" && "active"
                              }`}
                            onClick={() => {
                              setNenuActive("music");
                            }}
                          >
                            <FaIcon
                              name="faLongArrowAltRight"
                              size={"lg"}
                              color={"#333"}
                            />
                            {" Music"}
                          </a>
                        )}
                        {concert_enabled && (
                          <a
                            href="#concerts"
                            className={`campaign-detail__menu__item pr-2 pr-sm-0 ${menuActive === "concerts" && "active"
                              }`}
                            onClick={() => {
                              setNenuActive("concerts");
                            }}
                          >
                            <FaIcon
                              name="faLongArrowAltRight"
                              size={"lg"}
                              color={"#333"}
                            />
                            {"  Upcoming Shows"}
                          </a>
                        )}
                      </>
                    ) : (
                        <>
                          <a
                            href="#congratulation"
                            className={`campaign-detail__menu__item pr-2 pr-sm-0 ${menuActive === "congrats" && "active"
                              }`}
                            onClick={() => {
                              setNenuActive("concerts");
                            }}
                          >
                            <FaIcon
                              name="faLongArrowAltRight"
                              size={"lg"}
                              color={"#333"}
                            />
                            {"More info"}
                          </a>
                        </>
                      )}
                  </div>
                </Col>
                <Col xs={12} sm={9} md={9} lg={10}>
                  <div
                    className="campaign-detail__content"
                    data-spy="scroll"
                    data-target="#experience-detail-menu"
                    data-offset="0"
                  >
                    {!isPaid ? (
                      <>
                        {!tabs && (
                          <div
                            className="campaign-detail__content__story"
                            id={"story"}
                          >
                            <h4 className="content-title mb-3 font-weight-bolder text-center">
                              {"STORY"}
                            </h4>
                            <div>{ReactHtmlParser(experience.story)}</div>
                            <div className="separate-line my-4"></div>
                          </div>
                        )}
                        {tabs &&
                          tabs.map((item, index) => (
                            <div
                              key={item.id}
                              className="campaign-detail__content__story"
                              id={item.title.toLowerCase()}
                            >
                              <h4 className="content-title mb-3 font-weight-bolder text-center">
                                {item.title.toUpperCase()}
                              </h4>
                              <div>{ReactHtmlParser(item.content)}</div>
                              {index !== tabs.length - 1 && (
                                <div className="separate-line my-4"></div>
                              )}
                            </div>
                          ))}
                      </>
                    ) : (
                        <>
                          <div
                            className="campaign-detail__content__story"
                            id={"congratulation"}
                          >
                            <h4 className="content-title mb-3 font-weight-bolder text-center">
                              {"MORE INFO"}
                            </h4>
                            <div>{ReactHtmlParser(experience.congrats_text)}</div>
                            <div className="separate-line my-4"></div>
                          </div>
                        </>
                      )}
                    {!isPaid && (
                      <>
                        <div className="text-center mb-4 mt-3">
                          <Button
                            onClick={goToCheckout}
                            className="px-5 py-3 campaign-detail__content__claim-btn"
                            size="lg"
                            variant="dark"
                          >
                            {"Claim your spot now"}
                          </Button>
                        </div>
                        <div className="separate-line my-4"></div>
                      </>
                    )}

                    {the_charity && !isPaid && (
                      <CharityContainer experience={experience} />
                    )}
                    {concert_enabled && <ConcertContainer />}
                    <div>
                      <span className="support-art-question">
                        Got any questions?{" "}
                      </span>
                      <a
                        href="mailto:contact@giggedin.com"
                        className="support-art-email-us"
                      >
                        {"Email us here"}
                      </a>
                    </div>
                    <div className="mb-5 mb-md-0 pb-3 pb-md-0"></div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} className="px-sm-0">
            <div className="support-container">
              <div className="artist-info-block p-4">
                <div className="artist-info__header d-flex">
                  <div
                    className="artist-info__header__artist-image background-image-responsive"
                    style={{
                      backgroundImage: `url(${getImageUrl(
                        artist.profile_pic
                      )})`,
                    }}
                  ></div>
                  <div className="artist-info__header__artist-info pl-3 d-flex flex-column justify-content-around py-2">
                    <div className="artist-info__header__artist-socials">
                      {artist.facebook ? (
                        <a
                          href={artist.facebook}
                          target="_blank"
                          className="pr-2"
                          rel="noopener noreferrer"
                        >
                          <FaIcon
                            name="faFacebook"
                            size={"1x"}
                            color={"#333"}
                          />
                        </a>
                      ) : null}
                      {artist.twitter ? (
                        <a
                          href={artist.twitter}
                          target="_blank"
                          className="px-2"
                          rel="noopener noreferrer"
                        >
                          <FaIcon name="faTwitter" size={"1x"} color={"#333"} />
                        </a>
                      ) : null}
                      {artist.instagram ? (
                        <a
                          href={artist.instagram}
                          target="_blank"
                          className="px-2"
                          rel="noopener noreferrer"
                        >
                          <FaIcon
                            name="faInstagram"
                            size={"1x"}
                            color={"#333"}
                          />
                        </a>
                      ) : null}
                    </div>
                    <div className="artist-info__header__artist-name">
                      {artist.name}
                    </div>
                  </div>
                </div>
                <div className="artist-info__body">
                  <div className="artist-info__body__text py-3">
                    {artist.description}
                  </div>
                </div>
                <div className="separate-line my-3"></div>
                <div className="artist-info__footer" id="music">
                  <div className="artist-info__footer__text mb-2">
                    Listen to {artist.name} music on:
                  </div>
                  <div className="artist-info__footer__artist-music">
                    {artist.apple ? (
                      <a
                        href={artist.apple}
                        target="_blank"
                        className="pr-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon name="faApple" size={"lg"} color={"#ff4a32"} />
                      </a>
                    ) : null}
                    {artist.spotify ? (
                      <a
                        href={artist.spotify}
                        target="_blank"
                        className="px-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon
                          name="faSpotify"
                          size={"lg"}
                          color={"#ff4a32"}
                        />
                      </a>
                    ) : null}
                    {artist.sound_cloud ? (
                      <a
                        href={artist.sound_cloud}
                        target="_blank"
                        className="px-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon
                          name="faSoundcloud"
                          size={"lg"}
                          color={"#ff4a32"}
                        />
                      </a>
                    ) : null}

                    {artist.youtube ? (
                      <a
                        href={artist.youtube}
                        target="_blank"
                        className="px-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon
                          name="faYoutube"
                          size={"lg"}
                          color={"#ff4a32"}
                        />
                      </a>
                    ) : null}
                  </div>
                  {!isPaid && (
                    <div className="spotify-block mt-3">
                      <iframe
                        src={artist.spotify_playlist}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        allowransparency="true"
                        allow="encrypted-media"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
              <div className="book-list-block p-4">
                <div className="book-list-block__text mb-3">
                  PRE-ORDER KILLING TIME NOW:
                </div>
                <a
                  target="_blank"
                  href="https://bit.ly/3mo0YW8"
                >
                  <LazyLoadImage
                    alt={"support-act"}
                    effect="blur"
                    src={hardback}
                    placeholderSrc={hardback}
                    className="book-item"
                  /></a>
                <a
                  target="_blank"
                  href="https://apple.co/3bX0otP"
                >
                  <LazyLoadImage
                    alt={"support-act"}
                    effect="blur"
                    src={ebook}
                    placeholderSrc={ebook}
                    className="book-item"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://adbl.co/2ZF1KEq"
                >
                  <LazyLoadImage
                    alt={"support-act"}
                    effect="blur"
                    src={audiobook}
                    placeholderSrc={audiobook}
                    className="book-item"
                  /></a>
              </div>
            </div>
          </Col>
        </Row>
        <SpotifyFllwPopup
          isShow={isShowPopup}
          isAnswerQuestion={isAnswerQuestion}
          openSpotifyAuthWindow={openSpotifyAuthWindow}
          shareOnFacebook={shareOnFacebook}
          onAnswerQuestion={onAnswerQuestion}
          loading={loading}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      </Container>
    </>
  );
};

const ConcertContainer = () => {
  return (
    <>
      <div className="campaign-detail__content__concerts" id="concerts">
        <h4 className="content-title mb-4 font-weight-bolder">
          UPCOMING CONCERTS
        </h4>
        <div className="concerts-container px-4 pb-4 pt-2">
          <div className="concerts-item">
            <div className="concerts-item__date">
              <div className="concerts-item__date__text">JUL</div>
              <div className="concerts-item__date__number">25</div>
            </div>
            <div className="d-flex w-100 concerts-item__border-top">
              <div className="concerts-item__info">
                <div className="concerts-name">Apashe with Avy and Eminem </div>
                <div className="concerts-location">
                  <FaIcon name="faMapMarkerAlt" size={"lg"} color={"#333"} />{" "}
                  7-11 Dawson Street, Brunswick VIC, Australia
                </div>
              </div>
              <div className="concerts-item__schedule">
                <div className="schedule-text">Wed, Jul 25</div>
              </div>
            </div>
          </div>
          <div className="concerts-item">
            <div className="concerts-item__date">
              <div className="concerts-item__date__text">JUL</div>
              <div className="concerts-item__date__number">30</div>
            </div>
            <div className="d-flex w-100 concerts-item__border-top">
              <div className="concerts-item__info">
                <div className="concerts-name">Apashe with Avy and Eminem </div>
                <div className="concerts-location">
                  <FaIcon name="faMapMarkerAlt" size={"lg"} color={"#333"} />{" "}
                  7-11 Dawson Street, Brunswick VIC, Australia
                </div>
              </div>
              <div className="concerts-item__schedule">
                <div className="schedule-text">Fri, Jul 30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="separate-line mt-4 mb-2"></div>
    </>
  );
};

const CharityContainer = (experience) => {
  return (
    <>
      <div className="campaign-detail__content__support-art" id="charity">
        <h4 className="content-title mb-3 font-weight-bolder">
          {"THE CHARITY"}
        </h4>
        <div>
          <div className="charity-block pb-4">
            <div className="charity-text">
              <span className="artist-name">{experience.name}</span>
              {
                " has chosen to donate a portion of all proceeds from this experience to:"
              }
            </div>
          </div>
          <div className="support-block p-3">
            <Row>
              <Col
                xs={12}
                sm={12}
                md={5}
                className="d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <LazyLoadImage
                  alt={"support-act"}
                  effect="blur"
                  src={supportact}
                  placeholderSrc={supportact}
                  className="support-act-image px-md-2 mb-2 mb-md-0"
                />
              </Col>
              <Col
                xs={12}
                sm={12}
                md={7}
                className="d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <div className="support-small-text">
                  {"Supporting music workers impacted by COVID-19."}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="separate-line my-4"></div>
    </>
  );
};

const SpotifyFllwPopup = (props) => {
  const {
    isShow,
    onClose,
    openSpotifyAuthWindow,
    shareOnFacebook,
    onAnswerQuestion,
    loading,
    isAnswerQuestion,
  } = props;

  const [fields, setFields] = useState({ answer: "" });
  const [formValidated, setFormValidated] = useState(false);

  const handleInputChange = (event) => {
    const fieldsTmp = { ...fields };
    const target = event.target;
    const value = target.value;
    const name = target.name;
    fieldsTmp[name] = value;
    setFields(fieldsTmp);
  };

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setFormValidated(true);
    if (form.checkValidity() === true) {
      onAnswerQuestion(fields.answer);
    }
  };

  return (
    <Modal
      show={isShow}
      onHide={onClose}
      size="lg"
      centered
      backdrop={isAnswerQuestion ? "static" : true}
      className="fllwr-widget-container"
    >
      <Modal.Body className="p-0">
        <Image src={modalBgImage} className="fllwr-widget-header" fluid />
        <div className="fllwr-widget-body">
          <div className="fllwr-widget-body-actions">
            <div>
              <div className="fllwr-widget-body-actions-title">
                {
                  "For your chance to WIN this awesome prize pack, follow Jimmy on Spotify or Share this event on Facebook"
                }
              </div>
              <div className="fllwr-widget-body-actions-separate d-flex flex-column align-items-center">
                <div className="fllwr-widget-body-actions-separate-line"></div>
                <div className="fllwr-widget-body-actions-separate-line"></div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="fllwr-widget-body-actions-block w-100">
                  {isAnswerQuestion ? (
                    <>
                      <div className="question-text">
                        {
                          "If you could ask Jimmy any question about his writing process or about one of his stories he’s already shared, what would it be? (25 words or less)"
                        }
                      </div>
                      <Form
                        noValidate
                        validated={formValidated}
                        onSubmit={onSubmit}
                        className="w-100 answer-form"
                      >
                        <Form.Row>
                          <Col xs={12} sm={12}>
                            <Form.Group
                              controlId="formBasic"
                              className="form-item"
                            >
                              <Form.Control
                                as="textarea"
                                rows="3"
                                required
                                size="lg"
                                name="answer"
                                placeholder="Input your answer"
                                onChange={handleInputChange}
                                value={fields.answer}
                              />
                              <Form.Control.Feedback type="invalid">
                                {"Answer cannot be empty."}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                              disabled={loading}
                              type="submit"
                              className={`fllwr-btn fllwr-submit-btn`}
                            >
                              <span className="fllwr-btn-title">
                                {"Submit"}
                              </span>
                            </Button>
                          </Col>
                        </Form.Row>
                      </Form>
                    </>
                  ) : (
                      <>
                        <WidgetButton
                          onClick={openSpotifyAuthWindow}
                          text="Follow Jimmy Barnes on Spotify"
                          icon
                          type={"spotify"}
                        />
                        <WidgetButton
                          onClick={shareOnFacebook}
                          text="Share with Facebook"
                          icon
                          type={"facebook"}
                        />
                      </>
                    )}
                </div>
                <div className="mt-sm-3 mb-sm-3"></div>
              </div>
            </div>
            <div className="fllwr-widget-footer">
              <a
                href="https://fllw.co"
                target="_blank"
                className="fllwr-widget-footer-text"
              >
                {"Powered by FLLW.co"}
              </a>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default withRouter(CampaignDetail);
