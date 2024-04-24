export const getUserStorage = () => {
  return {
    username: localStorage.getItem("username") || null,
    desktop: localStorage.getItem("desktop") || null,
  };
};
