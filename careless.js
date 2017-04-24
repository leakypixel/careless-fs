const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

function readFile(file) {
  return new Promise(function(resolve, reject) {
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
