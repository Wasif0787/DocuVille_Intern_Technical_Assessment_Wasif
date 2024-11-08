import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { uploadImage } from "../controllers/image.controller.js";

const router = Router()

/**
 * @route POST /api/v1/image/upload
 */
router.route("/upload").post(
    upload.fields([
        {
            name: "document",
            maxCount: 1
        }
    ]),
    uploadImage
)


export default router