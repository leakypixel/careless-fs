const fs = require("fs");

const filePath = "./spec/helpers/test-file";
const badFilePath = "./spec/helpers/nonexistent-file";
const newFilePath = "./spec/helpers/new-test-file";
const unauthorisedFilePath = "/root/unauthorised";
const fileEncoding = "utf-8";
const noSuchFileErrorCode = "ENOENT";
const permissionErrorCode = "EACCES";
const emptyObject = {};
const filePathArray = [filePath, filePath, filePath];
const file = fs.readFileSync(filePath, fileEncoding);
const fileObject = { path: filePath };
const fileObjectArray = [fileObject, fileObject, fileObject];
const expectedWriteFileObject = {
  path: filePath,
  encoding: fileEncoding,
  content: file.toString(),
  flags: "w",
  mode: 0o666,
  autoClose: true,
  emitClose: false,
  start: 0
};
const expectedReadFileObject = {
  path: filePath,
  encoding: fileEncoding,
  content: file.toString(),
  flags: "r",
  mode: 0o666,
  autoClose: true,
  emitClose: false,
  start: 0,
  end: Infinity,
  highWaterMark: 64 * 1024
};
const newFileObject = {
  path: newFilePath,
  encoding: fileEncoding,
  content: file.toString(),
  flags: "w",
  mode: 0o666,
  autoClose: true,
  emitClose: false,
  start: 0
};
const emptyNewFile = {
  path: newFilePath,
  encoding: fileEncoding,
  flags: "w",
  mode: 0o666,
  autoClose: true,
  emitClose: false,
  start: 0
};
const newFileObjectArray = [newFileObject, newFileObject, newFileObject];

module.exports = {
  filePath,
  badFilePath,
  newFilePath,
  unauthorisedFilePath,
  fileEncoding,
  noSuchFileErrorCode,
  permissionErrorCode,
  emptyObject,
  filePathArray,
  file,
  fileObject,
  fileObjectArray,
  expectedReadFileObject,
  expectedWriteFileObject,
  newFileObject,
  emptyNewFile,
  newFileObjectArray
};
