import { handleError } from "./domVisuals";

console.log(process.env);
const SERVER_PORT = process.env.SERVER_PORT || 5000;
export async function createNewTrip(tripData) {
  console.log(tripData);
  const url = `http://localhost:${SERVER_PORT}/createNewTrip`;
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (res.status === 200) {
      console.log(res);
      return res;
    } else {
      throw new Error("Failed to add new entry");
    }
  } catch (error) {
    handleError(error);
  }
}
