const fs = require('fs');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');

argv.loc = argv.loc || path.join(userHome, '/Archetype');


class FolderList {
  constructor(){
    this.data = {};
  }

  getData() {
    return this.data;
  }


  readFolder() {
    return new Promise(function(resolve, reject){
      fs.readdir(`${argv.loc}`, (err, data) => {
          err ? reject(err) : resolve(data);
      });
    });

  }


}

const foldersRemote = new FolderList();

module.exports = { foldersRemote };
