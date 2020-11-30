import axios from "axios";
const resources = {};
const makeRequestCreator = () => {
  let token;
  return async (value, authorizeToken) => {
    if (token) {
      token.cancel();
    }
    token = axios.CancelToken.source();
    try {
      if (resources[value]) {
        return resources[value];
      }
      const res = await axios.get(
        `/api/v1/search?value=${value}`,
        { cancelToken: token.token },
        {
          headers: {
            Authorization: `Bearer ${authorizeToken}`,
          },
        }
      );
      console.log(value);
      const result = res.data;
      resources[value] = result;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log("Something went wrong: ", error.message);
      }
    }
  };
};

export const searchRequestHandler = makeRequestCreator();
