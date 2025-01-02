const multer = require("multer");
const path = require("path");
const utils = require("../utils/utils");
const MAX_FILE_SIZE = 5;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
      file.originalname
    }`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP are allowed."));
    }
    cb(null, true);
  },
});

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json(
          utils.responseError("File size exceeds the limit.", [
            { msg: `File size exceeds the limit of ${MAX_FILE_SIZE}MB.` },
          ])
        );
    }
  } else if (err) {
    return res
      .status(400)
      .json(
        utils.responseError("Failed to process request", [{ msg: err.message }])
      );
   }
  next();
};

module.exports = { upload, multerErrorHandler };
