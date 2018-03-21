const fs = require('fs');
const fse = require('fs-extra')
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
const { exec } = require('child_process');
const express = require('express');
const http = require('http');
const stoppable = require('stoppable');
const app = express();
const server = stoppable(http.Server(app));
const HOST = 'http://localhost:';
let PORT;

const {
  writeDir
} = require('./filesystem');
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

createFiles = (dir, template) => {

  switch (template) {
    case 'slides':
      console.log("create Slides");
      importFiles(dir, "dat://photo.archetype.cc/").then(deleteDat(dir)).then(createDat(dir))
      break;
    case 'photo':
      console.log("create photo");
      importFiles(dir, "dat://photo.archetype.cc/").then(deleteDat(dir)).then(createDat(dir))
      break;
    case 'music':
      console.log("create music");
      importFiles(dir, "dat://photo.archetype.cc/").then(deleteDat(dir)).then(createDat(dir))
      console.log("create music");
      break;
    default:
      importFiles(dir, template).then(deleteDat(dir)).then(createDat(dir))
      console.log("create template");
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

// startLocalServer = (dir) => {
//   console.log('Starting Server in ${argv.loc}/${dir}');
//     exec(`cd ${argv.loc}/${dir} && python -m SimpleHTTPServer 8888`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//     });
// }
//
// startLocalServer = (dir) => {
//   console.log("kill Process here");
//     // exec(`kill -9 $(lsof -t -i:8888)`, (error, stdout, stderr) => {
//     // if (error) {
//     //   console.error(`exec error: ${error}`);
//     //   return;
//     // }
//     // console.log(`stdout: ${stdout}`);
//     // console.log(`stderr: ${stderr}`);
//     // });
// }


// Start the server
const startLocalServer = (dir, port)  => {
  console.log("working?");
  PORT = port;
  app.use(express.static(`${argv.loc}/${dir}`));

  app.get('/', (req, res) => {
    res.sendFile(`${argv.loc}/${dir}/index.html`);
  });

  server.listen(PORT, () => {
    console.log(`Server running at ${HOST}${PORT}`);
  });
};

const stopLocalServer = () => {
  // Stop the watcher

  server.stop();
  console.log(`Server at ${HOST}${PORT} stopped`);
};


module.exports = {
  createTheme,
  createFiles,
  syncDat,
  startLocalServer,
  stopLocalServer
}
