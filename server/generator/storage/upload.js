const util = require("util");
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const dbConfig = require("../config/db");



const storage = new GridFsStorage({
  url: dbConfig.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = req.body.uniqueId;
      return filename;
    }
    console.log(req.body.uniqueId);
    return {
      bucketName: dbConfig.imgBucket,
      filename: req.body.uniqueId,
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("image");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
