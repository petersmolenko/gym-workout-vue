export const ORIGIN = "http://localhost:8000";

const staticDir = "/static";
const mediaDir = "/media";

export const defaultTrainerImage = "/default-trainer-image.jpeg";

export const getStaticPath = (url) => {
  return `${ORIGIN}${staticDir}${url}`;
};

export const getMediaPath = (url) => {
  return `${ORIGIN}${mediaDir}${url}`;
};

export const clearUrl = (url) => {
  const pureUrl = url
    .trim()
    .split("/")
    .filter((atom) => atom !== "")
    .join("/");
  return `/${pureUrl}`;
};

export const workoutStatus = {
  free: "B",
  in_process: "A",
  completed: "C"
}
