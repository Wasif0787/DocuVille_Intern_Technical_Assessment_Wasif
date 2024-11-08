import vision from "@google-cloud/vision";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: './.env' });

//credentials object from environment variables
const creds = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: "googleapis.com"
};

// Initializing the Vision API client
const client = new vision.ImageAnnotatorClient({ credentials: creds });

// Function to upload an image to Google Vision and extract text
export const uploadOnGoogleVision = async (imagePath) => {
    try {
        const [result] = await client.textDetection(imagePath);
        if (!result) {
            throw new ApiError(400, "No text detected in the image");
        }
        const detections = result.textAnnotations;
        // Delete the uploaded image after processing from public folder
        fs.unlinkSync(imagePath);
        return detections.length > 0 ? detections[0].description : "";
    } catch (error) {
        console.log("Error:", error.message);
        fs.unlinkSync(imagePath);
        throw new ApiError(500, error.message);
    }
};