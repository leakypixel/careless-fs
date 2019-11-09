const fs = require("fs");
const careless = require("../careless");
const {
  filePath,
  badFilePath,
  newFilePath,
  unauthorisedFilePath,
  fileEncoding,
  noSuchFileErrorCode,
  permissionErrorCode,
  emptyObject,
  filePathArray,
  fileObject,
  fileObjectArray,
  expectedReadFileObject,
  newFileObject,
  emptyNewFile,
  newFileObjectArray
} = require("./helpers/constants.js");

describe("File read function", function() {
  it("Should return a file object with the correct values when passed a path string", function(done) {
    careless.read(filePath).then(data => {
      expect(data).toEqual(expectedReadFileObject);
      done();
    });
  });

  it("Should return a file with the correct values when passed a file object", function(done) {
    careless.read(fileObject).then(data => {
      expect(data).toEqual(expectedReadFileObject);
      done();
    });
  });

  it("Should return an array of file objects when passed an array of path strings", function(done) {
    careless.read(filePathArray).then(data => {
      expect(data.length).toEqual(filePathArray.length);
      done();
    });
  });

  it("Should return an array of file objects when passed an array of file objects", function(done) {
    careless.read(fileObjectArray).then(data => {
      expect(data.length).toEqual(fileObjectArray.length);
      done();
    });
  });

  it("Should handle file open errors with a promise rejection", function(done) {
    careless.read(badFilePath).catch(data => {
      expect(data.code).toEqual(noSuchFileErrorCode);
      done();
    });
  });

  it("Should handle empty pathnames", function(done) {
    careless.read(emptyObject).catch(data => {
      expect(data).toEqual(emptyObject);
      done();
    });
  });
});

describe("File write function", function() {
  it("Should write a file with the correct content", function(done) {
    careless.write(newFileObject).then(() => {
      const newFile = fs.readFileSync(newFilePath, fileEncoding);

      expect(newFile.toString()).toEqual(newFileObject.content);
      done();
    });
  });

  it("Should write a file and return a file object", function(done) {
    careless.write(newFileObject).then(data => {
      expect(data).toEqual(newFileObject);
      done();
    });
  });

  it("Should write an empty file when given a file string", function(done) {
    careless.write(newFilePath).then(data => {
      expect(data).toEqual(emptyNewFile);
      done();
    });
  });

  it("Should write a list of files and return an array of file objects", function(done) {
    careless.write(newFileObjectArray).then(data => {
      expect(data).toEqual(newFileObjectArray);
      done();
    });
  });

  it("Should handle file write errors with a promise rejection, returning the original file object", function(done) {
    careless.write(emptyObject).catch(data => {
      expect(data).toEqual(emptyObject);
      done();
    });
  });

  it("Should handle file permission errors with a promise rejection", function(done) {
    careless.write(unauthorisedFilePath).catch(data => {
      expect(data.code).toEqual(permissionErrorCode);
      done();
    });
  });

  afterEach(function(done) {
    fs.unlink(newFilePath, function() {
      done();
    });
  });
});
