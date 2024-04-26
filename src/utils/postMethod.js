import axios from "axios";

export default function postMethod() {
  const POST = async (url, body) => {
    try {
      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
        body,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return { POST };
}
