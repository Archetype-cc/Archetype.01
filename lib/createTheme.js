const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
const { writeDir } = require('./filesystem')

// Argv
argv.loc = argv.loc || path.join(userHome, '/Archetype');

createTheme = (dir, template) => {
  return new Promise(function(resolve, reject){
      writeDir(dir);
      console.log(template);
      err ? reject(err) : resolve("dir created");
  });
}

createFiles = (dir, template) => {
  fs.writeFile(`${argv.loc}/${dir}/index.html`, `hello ${template}`, function(err){console.log(err);});
}

err = () => {
  console.log("error");
}


module.exports = { createTheme, createFiles }
