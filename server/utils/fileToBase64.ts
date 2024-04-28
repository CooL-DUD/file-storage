import fs from 'fs';
import path from 'path';

export function readFileAsBase64(fileName: string) {
    return new Promise((resolve, reject) => {

        const currentModuleURL = new URL(import.meta.url);
        const currentModuleDir = path.dirname(currentModuleURL.pathname).replace('.nuxt/', '');
        const filePath = path.resolve(currentModuleDir, '..', 'public', 'storage', 'files', fileName);
        // Read the file from the file system
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                // Encode the file contents as Base64
                const base64Data = Buffer.from(data).toString('base64');
                resolve({success: true, data: base64Data});
            }
        });
    });
}