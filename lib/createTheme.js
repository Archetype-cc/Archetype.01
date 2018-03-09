const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
const { writeDir } = require('./filesystem')

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
        break;
    case 'music':
        console.log("create music");
        break;
  }

}




module.exports = { createTheme, createFiles }
