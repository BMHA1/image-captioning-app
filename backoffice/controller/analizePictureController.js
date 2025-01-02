const analyzePictureService = require("../services/analyzePictureService");
const fs = require("fs");
const path = require("path");
const utils = require("../utils/utils");

module.exports.getAnalyze = async (req, res) => {
    try {
      let imagePath;
      const { imageUrl, typeServices } = req.body;
  
      if (req.file) {
        imagePath = `${process.env.PUBLIC_URL}/uploads/${req.file.filename}`;
      } else if (imageUrl) {
        imagePath = imageUrl;
      } else {
        return res.status(400).json({
          errors: [{ msg: "Please upload an image or provide a valid URL." }],
        });
      }
  
      const analysisResult = await analyzePictureService.handleAnalyze(imagePath, typeServices);
  
      if (req.file) {
        fs.unlink(path.join(__dirname, `../public/uploads/${req.file.filename}`), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
  
      return res.status(200).json(utils.responseDefaultSuccess(analysisResult));
    } catch (error) {
      console.error("Error in getAnalyze:", error.message || error);
      return res.status(500).json(utils.responseError("Failed to process request", [{ msg: error.message }]));

    }
  };
  