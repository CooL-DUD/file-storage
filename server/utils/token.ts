import jwt from 'jsonwebtoken';
// import {TOKEN_SECRET} from "~/server/env";

interface TokenPayload {
    user_id: string,
    email: string,
    role: string
}

export function generateToken(payload: TokenPayload) {
    return jwt.sign(payload, 'qwerty123', { expiresIn: '1d' })
}
export function generateRefresh(payload: TokenPayload) {
    return jwt.sign(payload, 'qwerty123', { expiresIn: '30d' })
}

export function verifyToken(token: TokenPayload) {
    return jwt.verify(token, 'qwerty123', (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return {error: true, data: err};
        }

        return {error: false, data: decoded};
    });
}