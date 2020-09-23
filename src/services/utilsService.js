import { appId } from "../constants/facebookConstants";
export const fullDate = (str) =>
  new Date(Number(str) * 1000).toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const compareEventDateWithCurrentDate = (str) => {
  const eventDate = new Date(Number(str) * 1000);
  const cDate = new Date();

  return eventDate.getTime() < cDate.getTime();
};

export const getSlugName = (name) => {
  return name ? name.replace(/[^A-Z0-9]+/gi, "-").toLowerCase() : "";
};
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


export const buildFbScript = () => {
  const scriptFacebook = document.createElement("script");
  scriptFacebook.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=${appId}`;
  scriptFacebook.async = true;
  scriptFacebook.defer = true;
  scriptFacebook.crossorigin = "anonymous";
  document.body.appendChild(scriptFacebook);
}