const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
var fs = require('fs')
var createHTML = require('create-html')

argv.loc = argv.loc || path.join(userHome, '/Archetype');

var html = createHTML({
  title: 'Archetype',
  body: '<p>Publishing as Undefined Practice.</p>'
})


createDir = (dir) => {
  return new Promise(function(resolve, reject) {
    try {
      fs.mkdir(`${argv.loc}/${dir}`, function (err) { if (err) console.log(err) })
      resolve("dir created");
    } catch (error) {
      console.error(error)
    }

  });
}
createIndex = (dir) => {
  return new Promise(function(resolve, reject) {
    try {
      console.log('here');
      fs.writeFile(`${argv.loc}/${dir}/index.html`, html, function (err) {
        if (err) console.log(err)
      })
      resolve("dir created");
    } catch (error) {
      console.error(error)
    }

  });
}

module.exports = { createIndex, createDir }
