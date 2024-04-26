import axios from "axios";

export const formatDate = (dateString) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const date = new Date(dateString);
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} (${hours}:${minutes}:${seconds})`;
};

export async function checkImageUrl(imageUrl) {
  console.log(imageUrl);
  try {
    const response = await axios.head(imageUrl);
    if (
      response.status === 200 &&
      response.headers["content-type"].startsWith("image")
    ) {
      return imageUrl;
    } else {
      return "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg";
    }
  } catch (error) {
    console.error("Error occurred while checking image URL:", error);
    return "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg";
  }
}

export const formatPrice = (price) => {
  console.log(price);
  return price
    ? price
        .toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })
        .slice(0, -3)
    : 0;
}