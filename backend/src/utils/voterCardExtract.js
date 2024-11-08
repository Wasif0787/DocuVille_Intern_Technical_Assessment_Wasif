export const getVoterDetails = (text) => {
    const data = {}
    data.documentType = 'Voter ID';

    const nameMatch = text.match(/(?:নাম|Name)[\s:]+([A-Za-z\s]+(?:\s+[A-Za-z]+)*)/i);
    data.name = nameMatch ? nameMatch[1].trim() : null;

    const docNumberMatch = text.match(/[A-Z]{3}\d{7}/i); // Voter ID format
    data.documentNumber = docNumberMatch ? docNumberMatch[0].trim() : null;

    const expiryMatch = text.match(/(?:Expiry|Valid Until|Valid Till)\s*[:\-]?\s*(\d{2}-\d{2}-\d{4})/i);
    data.expiryDate = expiryMatch ? expiryMatch[1].trim() : null;
    return data;
}