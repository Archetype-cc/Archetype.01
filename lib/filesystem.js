const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
const yaml = require('./yaml');
var userHome = require('user-home');
const {createTheme, importFiles, deleteDat, createDat } = require('./create')

// Argv
argv.loc = argv.loc || path.join(userHome, '/Archetype');
// argv.input = argv.input || path.join(userHome, '/Archetype/' + dir + "/" + initFile);
// argv.lockfile = argv.lockfile || path.join(userHome, '/Archetype/' + dir + "/" +  lockFile);
// var basepath = app.getAppPath();
//
// console.log(basepath);

const mkArchetypeDir = (dir) => {
  fs.open(argv.loc,'r',function(err,fd){
    if (err && err.code=='ENOENT') {
      fs.mkdir(argv.loc, function(err){
        if (err) {
          console.log(err);
        }         //fix this
        // setTimeout(function(){
        //   // console.log(`${argv.loc}/First-Archetype`);
        //   importFiles(`First-Archetype`, 'dat://start.archetype.cc/').then(deleteDat(`First-Archetype`)).then(createDat(`First-Archetype`))
        //
        //  }, 3000);

      });
    }
  });
}

const rmArchetypeDir = (dir) => {
  fs.rmdir(argv.loc, function(err){console.log(err);});
}

const mkProjectDir = (dir) => {
  fs.mkdir(`${argv.loc}/${dir}`, function(err){console.log(err);});
  yaml.writeLockfile(`${argv.loc}/${dir}/.archetype.lock`, { sites: [] }, function(err){console.log(err);});

}

const mkDir = (dir, subdir) => {
  const base = `${argv.loc}/${dir}`;
  fs.mkdir(base , (err) => {
    if(subdir) {
      subdir.forEach(s => fs.mkdir(`${base}/${s}`))
    }
   });
}

const rmDir = (dir) => {
  fs.rmdir(argv.loc +  "/" + dir, function(err){console.log(err);});
}


const writeFile = (dir, filename, data) => {
  fs.writeFile(`${argv.loc}/${dir}/${filename}`, data, function(err){console.log(err);});
}

const writeDir = (dir) => {
    fs.open(`${argv.loc}/${dir}`,'r',function(err,fd){
      if (err && err.code=='ENOENT') {
        fs.mkdir(`${argv.loc}/${dir}`, function(err){console.log(err);});
      } else {
        console.log('nothing');
      }
  });
}



module.exports = {mkProjectDir, mkArchetypeDir, rmArchetypeDir, mkDir, rmDir, writeFile, writeDir }
