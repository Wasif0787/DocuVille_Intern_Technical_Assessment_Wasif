export const getAadhaarDetails = (text) => {
    const data = {};
    data.documentType = 'Aadhaar';

    const nameMatch = text.match(/[\u0900-\u097F]+\s*\n([A-Za-z\s]+)/);
    data.name = nameMatch ? nameMatch[1].trim() : null;

    const aadhaarMatch = text.match(/(\d{4}\s?\d{4}\s?\d{4})/);
    data.documentNumber = aadhaarMatch ? aadhaarMatch[1].replace(/\s/g, '') : null;

    data.expiryDate = null;

    return data;
}