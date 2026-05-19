const http = require("http");
const fs = require("fs");

const addition = (body, res) => {
  const Fullbody = Buffer.concat(body).toString();
  console.log(Fullbody);

  const params = new URLSearchParams(Fullbody);
  const bodyObject = {};
  for (const [key, value] of params.entries()) {
    bodyObject[key] = value;
  }
  console.log(bodyObject);
  const answer = Number(bodyObject["digit1"]) + Number(bodyObject["digit2"]);
  console.log(answer);
  return answer;
};

module.exports = addition;
