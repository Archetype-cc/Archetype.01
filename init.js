const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
var argv = require('minimist')(process.argv.slice(2));
const yaml = require('./lib/yaml');
const template = require('./lib/template');
const style = require('./lib/style');
const async = require('async');
var userHome = require('user-home');
const datJson = require('./lib/datJson')

var Dat = require('dat-node');



// process.title = 'archetype';

// argv.loc = argv.loc || path.join(userHome, '/Sites/' + folder );
// argv.input = argv.input || path.join(userHome, '/Sites/' + folder + "/" + initFile);
// argv.lockfile = argv.lockfile || path.join(userHome, '/Sites/' + folder + "/" +  lockFile);

// console.log(argv.loc);

const args = (arg) => {
  console.log(JSON.stringify(arg));
  fs.writeFile(argv.loc + 'dat.json', arg, function(err){console.log(err);});
}

const init = (cb) => {
  console.log("inicializando");
  async.parallel([initInput, initLockfile], cb);

  function initInput(cb) {
    fs.readFile(argv.input, 'utf8', (err, data) => {
      if (err && err.code == 'ENOENT') {
        console.log("create");
        createFolders(createIndexAndSubDir);
        return
      }
      cb(err); // Si hay error pasar el err a function callback
    });
  }

 function initLockfile(cb) {
    fs.readFile(argv.lockfile, 'utf8', (err, data) => {
      if (err && err.code == 'ENOENT') { //ENOENT = no such file or dir
        return yaml.writeLockfile(argv.lockfile, { sites: [] }, cb);
      }
      cb(err); // Si hay error pasar el err a function callback
    });
  }
}

function createFolders(cb){
  fs.mkdir(argv.loc, function(err){console.log(err);});
  console.log('home folder ok√');
  fs.mkdir(argv.loc + '/assets', function(err){console.log(err);});
  console.log('home Assets ok√');

  cb();
}

// function createFiles() {
//
//   createIndex(createSubDirFiles);
//   console.log('creating Index');
// }

function createIndexAndSubDir() {
  fs.writeFile(argv.loc + '/index.html', template.html,function(err){console.log(err);});
  console.log('index ok√');

  fs.mkdir(argv.loc + '/assets/css', function(err){console.log(err);});
  console.log('home assets css ok√');
  fs.mkdir(argv.loc + '/assets/js', function(err){console.log(err);});
  console.log('home js Js ok√');

  createSubDirFiles();
}


function createSubDirFiles() {
  fs.writeFile(argv.loc + '/assets/css/styles.css', style.css, function(err){console.log(err);});
  console.log("css ok √");
  // fs.writeFile(argv.loc + '/assets/js/scripts.js', 'scripts');
}


const share = () => {

  Dat(argv.loc, function (err, dat) {
    // use dat
    console.log(dat);
    console.log(dat.key.toString('hex'));
    hex = dat.key.toString('hex');
  })

  exec('cd ' + argv.loc + ' && echo' + datJson + ' > dat.json ' + ' dat create' , (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log('creating');
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });


}

const getHex = () => {

  exec('cd ' + argv.loc + ' && ' + ' dat status ', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log(stdout);
    // console.log(`stderr: ${stderr}`);
  });
  // console.log(hex);

}



function err() {
  console.log('something went wrong');
}



function exit(err) {
  if (err) {
    var msg = err.message;
    console.log(msg);
    process.exit(1); // proccess failed
  }
  process.exit(0); // If code is omitted, exit uses either the 'success' code 0
}

module.exports = {init, share, getHex, args }
