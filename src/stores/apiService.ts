import axios from "axios";

const client = (token: string) => {
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };

  return {
    get: (url: string, options = {}) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: object, options = {}) =>
      axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: object, options = {}) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options = {}) =>
      axios.delete(url, { ...defaultOptions, ...options }),
  };
};

const checkStatus = (response: any) => {
  if (!response) return response;

  if (
    response.status === 401 ||
    response.data.code === "auth/id-token-expired"
  ) {
    const { location } = window;
    localStorage.clear();
    window.location = location;
  }

  return response;
};

export default () => client(localStorage.getItem("AuthToken"));
export { checkStatus };
