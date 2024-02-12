// *********** copied from https://github.com/saneef/shiro.ws/ ***********
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = {

// Based on the tutorial and data:
// https://multiline.co/mment/2023/12/building-robots-txt/

async function () {
  const url = "https://api.ashur.cab/robots/v2.json";

  return EleventyFetch(url, {
    duration: "1d",
    type: "json",
  });
}
}
