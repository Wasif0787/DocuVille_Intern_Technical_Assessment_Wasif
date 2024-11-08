export const getPanDetails = (text) => {
    const data = {};
    data.documentType = 'PAN';

    const nameMatch = text.match(/(?:नाम \/ Name|Name)\s*[:\-]?\s*([A-Za-z\s]+)/i);
    data.name = nameMatch ? nameMatch[1].trim() : null;

    const docNumberMatch = text.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/i);
    data.documentNumber = docNumberMatch ? docNumberMatch[0].trim() : "Not a valid number";

    data.expiryDate = null;
    return data;
};
