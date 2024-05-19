import CryptoJS from "crypto-js";

export function hashMessage(message: string): Promise<string> {
    return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
}