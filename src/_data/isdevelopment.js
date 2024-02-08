// ********** idea from https://mefody.dev/chunks/favicon-dev/ **********

require('dotenv').config();

module.exports = function() {
    return process.env.ELEVENTY_ENV === 'dev';
};
