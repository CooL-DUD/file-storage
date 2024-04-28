export function getFileExtensionFromBase64(base64String) {
    // Extract the MIME type from the Base64 string
    const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

    // Extract the file extension from the MIME type
    const fileExtension = mimeType.split('/').pop();

    return fileExtension;
}