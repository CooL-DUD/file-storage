import fs from 'fs';
import path from 'path';

export function saveAvatar(fileName, base64String) {
    // Remove the data URI prefix (e.g., "data:image/png;base64,")
    const base64Data = base64String.replace(/^data:\w+\/\w+;base64,/, '');

    // Decode the Base64 string into binary data
    const binaryData = Buffer.from(base64Data, 'base64');

    // Compute the absolute file path based on the directory of the JavaScript file
    const currentModuleURL = new URL(import.meta.url);
    const currentModuleDir = path.dirname(currentModuleURL.pathname).replace('.nuxt/', '');
    const filePath = path.resolve(currentModuleDir, '..', 'public', 'storage', 'avatars', fileName);

    // Write the binary data to the file
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, binaryData, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
}