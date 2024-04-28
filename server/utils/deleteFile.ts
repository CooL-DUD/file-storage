import fs from 'fs';
import path from "path";

export function deleteFile(fileName: string) {
    return new Promise((resolve, reject) => {

        const currentModuleURL = new URL(import.meta.url);
        const currentModuleDir = path.dirname(currentModuleURL.pathname).replace('.nuxt/', '');
        const filePath = path.resolve(currentModuleDir, '..', 'public', 'storage', 'files', fileName);
        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({success: true});
            }
        });
    });
}