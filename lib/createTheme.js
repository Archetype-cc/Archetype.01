const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
const { writeDir } = require('./filesystem');
var Dat = require('dat-node');


// Argv
argv.loc = argv.loc || path.join(userHome, '/Archetype');

createTheme = (dir, template) => {
  return new Promise(function(resolve, reject){
    try
    {
      writeDir(dir);
      console.log(template);
      resolve("dir created");
    } catch (error) {
      console.error(error)
    }

  });
}

createFiles = (dir, template) => {

  switch(template) {
    case 'slides':
        fs.writeFile(`${argv.loc}/${dir}/index.html`, `hello ${template}`, function(err){console.log(err);});
        break;
    case 'photo':
        console.log("create photo");
        // 1. Tell Dat where to download the files
        Dat(`${argv.loc}/${dir}`, {
          // 2. Tell Dat what link I want
          key: '6cad4dd49fdd056bddd7f675dbc3132f8ad2deeab8a39234a50c471d9475264a' // (a 64 character hash from above)
        }, function (err, dat) {
          if (err) throw err

          // 3. Join the network & download (files are automatically downloaded)
          dat.joinNetwork()
        })
        break;
    case 'music':
        console.log("create music");
        break;
  }

}




module.exports = { createTheme, createFiles }
