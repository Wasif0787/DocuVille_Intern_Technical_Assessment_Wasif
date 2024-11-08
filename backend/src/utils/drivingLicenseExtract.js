export const getDrivingDetails = (text) => {
    const data = {};
    data.documentType = 'Driving License';

    const nameMatch = text.match(/([A-Z]+,\s*[A-Z]+)/) ||
        text.match(/LN\s+(\w+)\s+FN\s+(\w+)/i) ||
        text.match(/Name:?\s*([A-Za-z,\s]+)/i);

    if (nameMatch) {
        if (nameMatch[2]) {
            data.name = `${nameMatch[2]} ${nameMatch[1]}`.trim();
        } else {
            data.name = nameMatch[1].trim().replace(/\n/g, ' ');
        }
    } else {
        data.name = null;
    }

    const dlMatch = text.match(/DL\s*(\d+)/);
    data.documentNumber = dlMatch ? dlMatch[1].trim() : "Not a valid document";

    const expiryMatch = text.match(/Exp\s*(\d{2}\/\d{2}\/\d{4}|\d{2}\/\d{2}\/\d{3}\s*[a-z])/i);
    data.expiryDate = expiryMatch ? expiryMatch[1].trim().replace(/\n/g, '') : "Not a valid date";

    return data;
};
