const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const defaults = {
  encoding: 'utf-8'
};

function read(something) {
  if (Array.isArray(something)) {
    return readFileList(something);
  } else {
    return readFile(something);
  }
}

function write(something) {
  if (Array.isArray(something)) {
    return writeFileList(something);
  } else {
    return writeFile(something);
  }
}

function readFileList(list) {
  let files = list.map((file) => readFile(file));
  return Promise.all(files);
}

function writeFileList(list) {
  let files = list.map((file) => writeFile(file));
  return Promise.all(files);
}

function readFile(file) {
  return new Promise(function(resolve, reject) {
    if (typeof file === "string") {
      file = {path: file};
    }
    file = Object.assign({}, defaults, file);
    fs.readFile(file.path, file.encoding, function(error, data) {
      if (error) {
        reject(error);
      } else {
        file.content = data;
        resolve(file);
      }
    });
  });
}

function writeFile(file) {
  return new Promise(function(resolve, reject) {
    if (typeof file === "string") {
      file = {path: file};
    }
    file = Object.assign({}, defaults, file);
    mkdirp(path.dirname(file.path), function(error) {
      if (error) {
        reject(error);
      }
      fs.writeFile(file.path, file.content, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve(file);
        }
      });
    });
  });
}

module.exports = {
  read: read,
  write: write
};
