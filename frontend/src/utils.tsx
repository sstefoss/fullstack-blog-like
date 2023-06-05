export const isLoggedIn = () => {
  return typeof localStorage.getItem("token") === "string";
};
