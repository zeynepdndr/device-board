import moment from "moment";

export const unixTimeToDate = (utcMiliSeconds: any) => {
  if (!utcMiliSeconds) return null;
  var d = new Date(0);
  d.setUTCSeconds(utcMiliSeconds / 1000);

  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

export function sortByTime(a: any, b: any) {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  return 0;
}
