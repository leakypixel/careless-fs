const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const intoStream = require("into-stream");
const isStream = require("is-stream");

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

function getOptions(possibleOptions, defaults, givenOptions) {
  const options = possibleOptions.reduce(
    (definedOptions, option) =>
      givenOptions[option]
        ? Object.assign({}, definedOptions, { [option]: givenOptions[option] })
        : definedOptions,
    defaults
  );
  return options;
}

function getReadOptions(fileObject) {
  const readOptions = [
    "encoding",
    "mode",
    "flags",
    "highWaterMark",
    "autoClose",
    "emitClose",
    "start",
    "end"
  ];
  const readDefaults = { encoding: "utf-8" };
  return getOptions(readOptions, readDefaults, fileObject);
}

function ensureFileObject(file) {
  if (typeof file === "string") {
    return { path: file, content: "" };
  }
  return Object.assign({}, file, { content: file.content || "" });
}

function mergeToFileObject(fileObject, content, options) {
  return Object.assign({}, fileObject, { content }, options);
}

function readFile(file) {
  return new Promise(function(resolve, reject) {
    const fileObject = ensureFileObject(file);
    if (!fileObject.path) {
      reject(file);
    }

    const options = getReadOptions(fileObject);
    if (fileObject.stream) {
      resolve(
        mergeToFileObject(
          fileObject,
          fs.createReadStream(fileObject.path, options),
          options
        )
      );
    } else {
      fs.readFile(fileObject.path, options, function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(mergeToFileObject(fileObject, data, options));
        }
      });
    }
  });
}

function getWriteOptions(fileObject) {
  const writeOptions = [
    "encoding",
    "mode",
    "flags",
    "autoClose",
    "emitClose",
    "start"
  ];
  const writeDefaults = { encoding: "utf-8" };
  return getOptions(writeOptions, writeDefaults, fileObject);
}

function ensureReadStream(content) {
  return isStream(content) ? content : intoStream(content);
}

function writeFile(file) {
  return new Promise(function(resolve, reject) {
    const fileObject = ensureFileObject(file);
    if (!fileObject.path) {
      reject(file);
    }
    const options = getWriteOptions(fileObject);
    mkdirp(path.dirname(fileObject.path), function() {
      ensureReadStream(fileObject.content)
        .pipe(fs.createWriteStream(fileObject.path, options))
        .on("error", err => {
          reject(err);
        })
        .on("finish", function() {
          resolve(mergeToFileObject(fileObject, fileObject.content, options));
        });
    });
  });
}

module.exports = {
  read: read,
  write: write
};
