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
const fileObject = {path: filePath};
const fileObjectArray = [fileObject, fileObject, fileObject];
const expectedFileObject = {
  path: filePath,
  encoding: fileEncoding,
  content: file.toString()
};
const newFileObject = {
  path: newFilePath,
  encoding: fileEncoding,
  content: file.toString()
};
const emptyNewFile = {
  path: newFilePath,
  encoding: fileEncoding,
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
  expectedFileObject,
  newFileObject,
  emptyNewFile,
  newFileObjectArray
};
