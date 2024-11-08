import { getAadhaarDetails } from "./aadhaarCardExtract.js";
import { getDrivingDetails } from "./drivingLicenseExtract.js";
import { getPanDetails } from "./panCardExtract.js";
import { getPassportDetails } from "./passportExtract.js";
import { getVoterDetails } from "./voterCardExtract.js";

export const parseDocumentData = (text) => {
    let data = {}
    // Identifying document type based on keywords
    if (text.match(/आधार|Aadhaar/i)) {
        data = getAadhaarDetails(text)
    } else if (text.match(/PAN|Permanent Account Number/i)) {
        data = getPanDetails(text)
    } else if (text.match(/passport/i)) {
        data = getPassportDetails(text)
    } else if (text.match(/ELECTION COMMISSION OF INDIA|EPIC/i)) {
        data = getVoterDetails(text)
    } else if (text.match(/driv(er'?s?\s|ing\s)?licen[sc]e/i)) {
        data = getDrivingDetails(text)
    }
    return data;
};