import axios from "axios";

export default function authMethod() {
  const AUTH = async (url, body) => {
    try {
      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
        body,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const userLoginStatus = async (url, callback) => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return callback(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { AUTH, userLoginStatus };
}
