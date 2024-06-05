// import CryptoJS from "crypto-js";
//
// export function hashMessage(message: string): Promise<string> {
//     return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
// }

import crypto from "crypto"

export function hashMessage(message) {
    return crypto.createHash("sha256").update(message).digest("hex")
}