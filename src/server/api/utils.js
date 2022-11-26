const encodeParams = (params) => {
  let output = [];

  for (const [key, value] of Object.entries(params)) {
    output.push(`${key}=${encodeURIComponent(value)}`);
  }
  return output.join("&");
};

module.exports = { encodeParams };
