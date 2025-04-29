// export const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const options = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return date.toLocaleDateString("en-GB", options);
// };
// // src/utils/formatDate.js

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
