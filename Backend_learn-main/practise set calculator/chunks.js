const chunkshandler = (chunk, body) => {
  console.log(chunk);

  body.push(chunk);
};

module.exports = chunkshandler;
