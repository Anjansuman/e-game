import * as jwt from "jsonwebtoken";

export function checkUser(token: string): string | null {
    try {
        
        if(!token.startsWith("Bearer")) {
            return null;
        }

        const parsedToken = token.split(" ")[1];

        if(!parsedToken) {
            return null;
        };

        const decoded = jwt.verify(parsedToken, '');

        if(typeof decoded == 'string') return null;

        if(!decoded || !decoded.userId) return null;

        return decoded.userId;

    } catch (error) {
        return null;
    }
}