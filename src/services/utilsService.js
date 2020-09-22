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
