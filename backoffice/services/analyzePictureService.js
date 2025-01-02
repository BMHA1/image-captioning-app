const visionGoogle = require("@google-cloud/vision");
// const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const Clarifai = require("clarifai");

const clientGoogle = new visionGoogle.ImageAnnotatorClient();

module.exports.handleAnalyze = async (imagePath, typeServices) => {
  switch (typeServices) {
    case "google":
      return await module.exports.getGoogleVisicoApi(imagePath);
    case "azure":
      return module.exports.getAzureVisionApi(imagePath);
    case "clarifai":
      return module.exports.getClarifaiApi(imagePath);
    default:
      return { error: "Invalid service type" };
  }
};

module.exports.getGoogleVisicoApi = async (imagePath) => {
  try {
    const [result] = await clientGoogle.labelDetection(imagePath);
    const labels = result.labelAnnotations.map((concept) => {
      return objectSuccessDefault(concept.description, concept.score);
    });
    
    return labels;
  } catch (error) {
    console.error(`Google Vision API error:, ${error.message}`|| error);
    throw new Error(`Failed to generate caption from Google Vision API. ${error.message}`);
  }
};

module.exports.getAzureVisionApi = async (imagePath) => {
  const endpoint = process.env.AZURE_APPLICATION_ENDPOINT;
  const apiKey = process.env.AZURE_APPLICATION_API_KEY;
  
  try {
    const credential = new AzureKeyCredential(apiKey);
    const client = createClient(endpoint, credential);
    const features = ["Caption"];

    const response = await client.path("/imageanalysis:analyze").post({
      body: { url: imagePath },
      queryParameters: { features: features },
      contentType: "application/json",
    });

    const iaResult = response.body;

    if (iaResult.error) {
      throw new Error("Error calling Azure Vision API:", iaResult.error.message);
    }

    if (iaResult.captionResult) {
      return (
        [objectSuccessDefault(iaResult.captionResult.text, iaResult.captionResult.confidence)]
      );
    }
  } catch (error) {
    console.error("Error in Azure Vision API:", error.message || error);
    throw new Error(`Failed to analyze image using Azure Vision API. ${error.message}` );
  }
};

module.exports.getClarifaiApi = async (imagePath) => {
  try {
    const app = new Clarifai.App({
      apiKey: process.env.CLARIFAI_APPLICATION_API_KEY,
    });

    const response = await app.models.predict(
      Clarifai.GENERAL_MODEL,
      imagePath
    );

    const concepts = response.outputs[0].data.concepts;

    const labels = concepts.map((concept) => {
      return objectSuccessDefault(concept.name, concept.value);
    });

    return labels;
  } catch (error) {
    console.error("Clarifai API error:", error.message || error);
    throw new Error(`Failed to analyze image using Clarifai API. ${error.message}`);
  }
};

const objectSuccessDefault = (name, confidence) =>  {
  confidence = (confidence * 100).toFixed(2);
  return {
    name: name,
    confidence: confidence,
  };
};