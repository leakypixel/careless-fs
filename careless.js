const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const intoStream = require("into-stream");
const isStream = require("is-stream");

const writeDefaults = {
  encoding: "utf-8",
  flags: "w",
  mode: 0o666,
  autoClose: true,
  emitClose: false,
  start: 0
};

const readDefaults = {
  encoding: "utf-8",
  flags: "r",
  mode: 0o666,
  highWaterMark: 64 * 1024,
  autoClose: true,
  emitClose: false,
  start: 0,
  end: Infinity
};

function read(something) {
  if (Array.isArray(something)) {
    return readFileList(something);
  }
  return readFile(something);
}

function write(something) {
  if (Array.isArray(something)) {
    return writeFileList(something);
  }
  return writeFile(something);
}

function readFileList(list) {
  let files = list.map(file => readFile(file));
  return Promise.all(files);
}

function writeFileList(list) {
  let files = list.map(file => writeFile(file));
  return Promise.all(files);
}

function readFile(file) {
  return new Promise(function(resolve, reject) {
    const fileObject = (() => {
      if (typeof file === "string") {
        return Object.assign({}, readDefaults, { path: file });
      }
      return Object.assign({}, readDefaults, file);
    })();
    if (!fileObject.path) {
      reject(file);
    }
    const options = {
      encoding: fileObject.encoding,
      mode: fileObject.mode,
      flags: fileObject.flags,
      highWaterMark: fileObject.highWaterMark,
      autoClose: fileObject.autoClose,
      emitClose: fileObject.emitClose,
      start: fileObject.start,
      end: fileObject.end
    };
    if (fileObject.stream) {
      resolve(
        Object.assign(fileObject, {
          content: fs.createReadStream(fileObject.path, options)
        })
      );
    }
    fs.readFile(fileObject.path, fileObject.encoding, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(Object.assign(fileObject, { content: data }));
      }
    });
  });
}

function writeFile(file) {
  return new Promise(function(resolve, reject) {
    const fileObject = (() => {
      if (typeof file === "string") {
        return Object.assign({}, writeDefaults, { path: file });
      }
      return Object.assign({}, writeDefaults, file);
    })();
    if (!fileObject.path) {
      reject(file);
    }
    const options = {
      encoding: fileObject.encoding,
      mode: fileObject.mode,
      flags: fileObject.flags,
      autoClose: fileObject.autoClose,
      emitClose: fileObject.emitClose,
      start: fileObject.start
    };
    mkdirp(path.dirname(fileObject.path), function() {
      const readStream = isStream(file.content)
        ? file.content
        : intoStream(file.content || "");
      readStream
        .pipe(fs.createWriteStream(fileObject.path, options))
        .on("error", err => {
          reject(err);
        })
        .on("finish", function() {
          resolve(fileObject);
        });
    });
  });
}

module.exports = {
  read: read,
  write: write
};
