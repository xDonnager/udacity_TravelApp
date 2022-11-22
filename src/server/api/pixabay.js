const fetch = require("node-fetch");
const { encodeParams } = require("./utils");

const getImage = async (req) => {
  console.log("getting image..");
  const reqParams = {
    key: process.env.PIXABAY_APIKEY,
    q: req.city,
  };
  const url = `https://pixabay.com/api/?`;
  const imagesUrl = url + encodeParams(reqParams);
  try {
    const res = await fetch(imagesUrl);
    if (res.status !== 200) {
      throw res.error;
    }
    const data = await res.json();
    console.log(data);
    if (data.hits.length === 0) {
      throw new Error("Images where not found ");
    }

    return { ...data.hits[0] };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getImage };
