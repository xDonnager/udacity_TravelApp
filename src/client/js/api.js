const SERVER_PORT = process.env.SERVER_PORT || 5000;
export async function createNewTrip(tripData) {
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
      return await res.json();
    } else {
      throw new Error("Failed to add new entry");
    }
  } catch (error) {
    return error;
  }
}

export async function getCreatedTrips() {
  const url = `http://localhost:${SERVER_PORT}/savedTrips`;

  try {
    const res = await fetch(url);

    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error("Failed to get trips");
    }
  } catch (e) {
    return error;
  }
}

export async function removeTrip(id) {
  const url = `http://localhost:${SERVER_PORT}/deleteTrip`;
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error("Failed to add new entry");
    }
  } catch (error) {
    return error;
  }
}
