const fs = require('fs');

const yaml = require('js-yaml');


module.exports = {
  write: write,
  writeLockfile: writeLockfile
};


function writeLockfile(filename, data, cb) {
  var archetypeLock = [];
  archetypeLock.push(
    '# Welcome to Archetype, Dont Delete this file'
  );
  archetypeLock.push('\n');
  archetypeLock.push('# Archetype 0.0.1');
  archetypeLock.push('\n\n');
  archetypeLock = archetypeLock.join('');
  write(filename, data, { archetypeLock: archetypeLock }, cb);
}

function write(filename, data, opts, cb) {
  var cb = cb || opts;
  if (typeof opts === 'function' || !opts) opts = {};

  var archetypeLock = opts.archetypeLock || '';

  try {
    var text = archetypeLock + yaml.safeDump(data);
    fs.writeFile(filename, text, 'utf8', cb);
  } catch (err) {
    cb(err);
  }
}
