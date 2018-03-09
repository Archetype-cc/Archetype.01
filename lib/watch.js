// todo: watch changes of files inside directories

const fs = require('fs');

const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');

argv.loc = argv.loc || path.join(userHome, '/Archetype');


const readArchetype = () => {
  return new Promise(function(resolve, reject){
    fs.readdir(`${argv.loc}`, (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
}

const watch = () => {
  readArchetype().then(data => {
    // console.log(data)

    data.map((folder, i) =>  {
      if (folder !== '.DS_Store' && folder !== ".archetype.lock" && folder !== ".dat") {
        fs.watch(file.path, { encoding: 'buffer' }, () => {
          fs.readdir(`${argv.loc}/${folder}`,(err, data) => {
            console.log(data);
          });
        })
      }
    })
  })
}
module.exports = { watch }
