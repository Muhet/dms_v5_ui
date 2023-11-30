export const setToken = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

export const setData = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const deleteToken = () => {
  localStorage.removeItem("access_token");
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getData = () => {
  const storedData = localStorage.getItem("data");
  return storedData ? JSON.parse(storedData) : null;
};

export const saveImage = () => {
  let image = process.env.REACT_APP_BASE_URL_IMAGE;
  localStorage.setItem("image", JSON.stringify(image));
};

export const getUserImage = () => {
  const storedImage = localStorage.getItem("image");
  return storedImage ? JSON.parse(storedImage) : null;
};

export const hasUserImage = () => {
  return !!localStorage.getItem("image");
};
