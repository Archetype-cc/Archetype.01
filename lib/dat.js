const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
const yaml = require('./yaml');
var userHome = require('user-home');
var Dat = require('dat-node');
var ram = require('random-access-memory')


//Argv

argv.loc = argv.loc || path.join(userHome, '/Archetype');

// =>

const createDat = (dir) => {

  Dat(`${argv.loc}/${dir}`, function (err, dat) {
    if (err) throw err
    dat.importFiles()
    dat.joinNetwork()
    console.log('dat://',dat.key.toString('hex'))
  })

}

const versionDat = (hex) => {
  // console.log(hex);

  Dat(ram, {key: hex }, function (e, dat) {
    if (e) throw e

    var network = dat.joinNetwork()

    const archive = dat.archive
    const stats = dat.trackStats()

    dat.trackStats()
    console.log(dat.stats.get());

    setInterval(function () {
      console.log(dat.stats.get().version);
    }, 2000)


  })

}



const syncDat = (dir) => {

}

//Exports

module.exports = { createDat, versionDat }
