import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnGoogleVision } from "../utils/googleVision.js";
import { parseDocumentData } from "../utils/parseDocument.js";

// Controller Function for Uploading Image
export const uploadImage = asyncHandler(async (req, res) => {
    const documentLocalPath = req.files?.document[0]?.path;

    if (!documentLocalPath) {
        throw new ApiError(400, "Document file is required");
    }
    // Raw text from google api
    const text = await uploadOnGoogleVision(documentLocalPath);

    // Parsed text from custom function
    const data = parseDocumentData(text)

    return res.status(201).json(
        new ApiResponse(200, data, "Data Extracted successfully")
    );
});