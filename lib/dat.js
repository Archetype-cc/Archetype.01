const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
const yaml = require('./yaml');
var userHome = require('user-home');
var Dat = require('dat-node');

//Argv

argv.loc = argv.loc || path.join(userHome, '/Archetype');

// =>

const createDat = (dir) => {

  Dat(`${argv.loc}/${dir}`, function (err, dat) {
    // use dat
    console.log(dat.key.toString('hex'));
    const hex = dat.key.toString('hex');
  })

}

const syncDat = (dir) => {

  Dat(`${argv.loc}/${dir}`, function (err, dat) {
    // use dat
    console.log(dat.key.toString('hex'));
    const hex = dat.key.toString('hex');
  })

}

//Exports

module.exports = { createDat }
