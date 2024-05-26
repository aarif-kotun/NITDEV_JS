

export const sanitize = (data)=> {
    const {password, ...sanitizeData} = data;
    return sanitizeData
}