import { eq } from "drizzle-orm";
import postgreDb from "../config/sqlclient.js";
import { usersTable } from "../model/index.js";
import common from "../utils/common.js";

export default class {
    static async createUser(userData) {
        try {
            userData.password = common.hashPassword(userData.password);
            const data = await postgreDb.insert(usersTable).values(userData).returning();
            if(data.length === 0){
                throw new Error('User creation failed');
            }
            return data[0];
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    static async getUserByEmail(email) {
        try {
            const data = await postgreDb.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));
            if(data.length){
                return data[0];
            }
            return null;
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }
}