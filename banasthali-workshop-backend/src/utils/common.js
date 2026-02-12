import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/envconfig.js";

export default class {
    static signPayload = (payload)=>{
        return jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {expiresIn: '1h'});
    }

    static verifyToken = (token)=>{
        try {
            return jwt.verify(token, ENV_CONFIG.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    static hashPassword = (password)=>{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    static comparePassword = (password, hash)=>{
        return bcrypt.compareSync(password, hash);
    }
}