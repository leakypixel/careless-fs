const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const defaults = {
  encoding: 'utf-8'
};

function readFile(file) {
  return new Promise(function(resolve, reject) {
    file = Object.assign({}, defaults, file);
    fs.readFile(file.path, file.encoding, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(file) {
  return new Promise(function(resolve, reject) {
    file = Object.assign({}, defaults, file);
    mkdirp(path.dirname(file.path), function(error) {
      if (error) {
        reject(error);
      }
      fs.writeFile(file.path, file.data, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve(file.path);
        }
      });
    });
  });
}

module.exports = {
  read: readFile,
  write: writeFile
};
