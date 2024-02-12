// *********** copied from https://github.com/saneef/shiro.ws/ ***********
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  let url = "https://api.ashur.cab/robots/v2.json";

// Based on the tutorial and data:
// https://multiline.co/mment/2023/12/building-robots-txt/

  return EleventyFetch(url, {
    duration: "1d",
    type: "json",
  });
};