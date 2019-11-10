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
  content: file.toString(),
  encoding: "utf-8"
};
const expectedReadFileObject = {
  path: filePath,
  content: file.toString(),
  encoding: "utf-8"
};
const newFileObject = {
  path: newFilePath,
  encoding: "utf-8",
  content: file.toString()
};
const emptyNewFile = {
  path: newFilePath,
  encoding: "utf-8",
  content: ""
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
