const fs = require('fs');
const fse = require('fs-extra')
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
const { exec } = require('child_process');
const { writeDir } = require('./filesystem');
var Dat = require('dat-node');


// Argv
argv.loc = argv.loc || path.join(userHome, '/Archetype');

createTheme = (dir, template) => {
  return new Promise(function(resolve, reject) {
    try {
      writeDir(dir);
      console.log(template);
      resolve("dir created");
    } catch (error) {
      console.error(error)
    }

  });
}

createFiles = (dir, template, files) => {

  switch (template) {
    case 'none':
      console.log("copying files");
      cloneFolder(dir,files).then(createDat(dir));
      console.log("created folder");
      break;
    case 'starter':
      console.log(template);
      importFiles(dir, 'dat://start.archetype.cc/').then(deleteDat(dir)).then(createDat(dir))
      console.log("created starter folder");
      break;
    default:
      console.log(template);
      importFiles(dir, template).then(deleteDat(dir)).then(createDat(dir))
      console.log("create imported template");
  }

}

importFiles = (dir, hex) => {
  return new Promise(function(resolve, reject) {
    try {
      Dat(`${argv.loc}/${dir}`, {
        key: hex // (a 64 character hash from above)
      }, function(err, dat) {
        if (err) throw err
        dat.joinNetwork()
        console.log("created");
      })
      resolve("dir created");
    } catch (error) {
      console.error(error)
    }

  });
}

deleteDat = (dir) => {
  return new Promise(function(resolve, reject) {
    try {

      setTimeout(function() {
        fse.remove(`${argv.loc}/${dir}/dat.json`)
          .then(() => {
            console.log('success dat json!')
          })
          .catch(err => {
            console.error(err)
          })

        fse.remove(`${argv.loc}/${dir}/.dat`)
          .then(() => {
            console.log('success . dat!')
          })
          .catch(err => {
            console.error(err)
          })
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  });
}

syncDat = (dir) => {
  console.log(`importing ${argv.loc}/${dir}`);

  Dat(`${argv.loc}/${dir}`, function(err, dat) {
    if (err) throw err

    var network = dat.joinNetwork()
    network.once('connection', function() {
      console.log('Connected')
    })
    var progress = dat.importFiles(`${argv.loc}/${dir}`, {
      ignore: ['**/dat-node/node_modules/**']
    }, function(err) {
      if (err) throw err
      console.log('Done importing')
      console.log('Archive size:', dat.archive.content.byteLength)
    })
    progress.on('put', function(src, dest) {
      console.log('Added', dest.name)
    })

    console.log(`Sharing: ${dat.key.toString('hex')}\n`)
  })
}

createDat = (dir) => {
  return new Promise(function(resolve, reject) {
    try {
      setTimeout(function() {

        Dat(`${argv.loc}/${dir}`, function(err, dat) {
          if (err) throw err

          var network = dat.joinNetwork()
          network.once('connection', function() {
            console.log('Connected')
          })
          var progress = dat.importFiles(`${argv.loc}/${dir}`, {
            ignore: ['**/dat-node/node_modules/**']
          }, function(err) {
            if (err) throw err
            console.log('Done importing')
            console.log('Archive size:', dat.archive.content.byteLength)
          })
          progress.on('put', function(src, dest) {
            console.log('Added', dest.name)
          })

          console.log(`Sharing: ${dat.key.toString('hex')}\n`)


          fs.writeFile(`${argv.loc}/${dir}/dat.json`, `
{
  "title": "${dir}",
  "description": "Archetype for ${dir}",
  "url": "dat://${dat.key.toString('hex')}"
}`, function(err) {
            console.log(err);
          });



        })
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  });
}

cloneFolder = (dir, files) => {
  return new Promise(function(resolve, reject) {
    console.log('cloning folder');
    files.map((f, i) => {
      fse.copy(f.path, `${argv.loc}/${dir}/${f.name}`)
      .then(() => console.log('success!'))
      .catch(err => console.error(err));
    });
  });
}


module.exports = {
  createTheme,
  createFiles,
  syncDat,
  cloneFolder,
  importFiles,
  deleteDat,
  createDat
}
