const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');

// Argv
argv.loc = argv.loc || path.join(userHome, '/Archetype');


// get datlink
const getDat = (dir, callback)  => {
  let contents = fs.readFileSync(`${argv.loc}/${dir}/dat.json`);
  let datjson = JSON.parse(contents);
  let url = datjson.url;
  callback(url);
};


module.exports = { getDat }
