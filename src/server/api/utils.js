const encodeParams = (params) => {
  let output = [];

  for (const [key, value] of Object.entries(params)) {
    console.log(`${key}: ${value}`);
    output.push(`${key}=${encodeURIComponent(value)}`);
  }
  console.log(output);
  return output.join("&");
};

module.exports = { encodeParams };
