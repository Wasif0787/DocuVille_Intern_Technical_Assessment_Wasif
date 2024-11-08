export const getPassportDetails = (text) => {
    const data = {};
    data.documentType = 'Passport';

    const nameMatch = text.match(/दिया गया नाम\s*\/\s*Given Name\(s\)\s*[:\-]?\s*([A-Za-z\s]+)/i);
    data.name = nameMatch ? nameMatch[1].trim() : null;

    const docNumberMatch = text.match(/Passport No\.\s*([A-Z0-9\s]+)/i) ||
        text.match(/[A-Z][0-9]{7}\s*[0-9]+/i);
    data.documentNumber = docNumberMatch ? docNumberMatch[1].trim() : "Not a valid document";

    const expiryDateMatch = text.match(/Date of Expiry\s*(\d{2}\/\d{2}\/\d{4})/i);
    data.expiryDate = expiryDateMatch ? expiryDateMatch[1].trim() : null;

    return data;
};
