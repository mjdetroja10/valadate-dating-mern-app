const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const { fileConstant } = require("../../Core/Constants");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    let uniqueCode = uuidv4();
    cb(null, uniqueCode + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (fileConstant.FILE_TYPE.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb({ message: "Invalid file type" });
  }
};

const upload = multer({
  storage: storage,
  limits: fileConstant.FILE_SIZE,
  fileFilter: fileFilter,
});

const uploadImages = upload.array("images", 5);

const imgValidationError = (errorMsg, res) => {
  let errors = {
    errors: [{ path: "images", msg: errorMsg, type: "field" }],
  };
  return res.handler.validationError(errors);
};

const MulterRequest = (req, res, nxt) => {
  try {
    uploadImages(req, res, function (err) {
      if (!req?.files || req?.files.length === 0) return imgValidationError("image is required field", res);

      if (req?.files.length < 2 || req?.files.length > 5)
        return imgValidationError("you have to upload at least 1 and max 5 images", res);

      if (err) return imgValidationError(err?.message, res);

      return nxt();
    });
  } catch (error) {
    res.handler.serverError(error);
  }
};

module.exports = MulterRequest;
